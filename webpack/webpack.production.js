const fs = require('fs-extra')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const archiver = require('archiver');
const branchName = require('current-git-branch');

const LAMBDA_NAME = 'GetLambdaFunction';
const OUTPUT_FOLDER = './dist'
const REPO_NAME = 'dvsa-lambda-starter';
const BRANCH_NAME = branchName().replace(/\//g,"-");

class BundlePlugin {
  constructor(params) {
    this.archives = params.archives;
    this.assets = params.assets || [];
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('zip-pack-plugin', async (compilation) => {
      this.archives.forEach(async (archive) => {
        await this.createArchive(archive.inputPath, archive.outputPath, archive.outputName, archive.ignore);
      })

      this.assets.forEach((asset) => {
        fs.copySync(asset.inputPath, asset.outputPath);
      })
    });
  }

  createArchive(inputPath, outputPath, outputName, ignore) {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath)
    };
    const output = fs.createWriteStream(`${outputPath}/${outputName}.zip`);
    const archive = archiver('zip');

    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    archive.glob(
      `**/*`, 
      { 
        cwd: inputPath,
        skip: ignore
      }
    );
    return archive.finalize();
  }
};


module.exports = env => {
  let commit = env ? env.commit ? env.commit : 'local' : 'local' ;
  return merge(common, {
    mode: 'production',
    plugins: [
      new BundlePlugin({
        archives: [
          {
            inputPath: `.aws-sam/build/${LAMBDA_NAME}`,
            outputPath: `${OUTPUT_FOLDER}`,
            outputName: `${REPO_NAME}-${BRANCH_NAME}-${commit}`,
          }
        ],
      }),
    ],
  });
};
