# How to contribute

We welcome all contributions, suggestions and feedback! If you've cloned this repo and added functionality that your service is benefiting from, consider pushing your changes here for everyone to use.

## Feature requests or suggestions

Raise an issue on the GitHub issues board with as much information as possible. Provide use cases and examples if you can. Check there isn't already an open issue for your suggestions first and if there is you can add a +1 and a comment so we know you're interested in it too.

## Report a bug

If you've found a bug, check the open issues to see if it's already been reported - if it's not raise an issue and tag it was a bug. Give clear steps to replicate and as much information as you can.

## Testing

See the README for how to run the tests, ensure you've run them before contributing any code and add tests if you're adding or extending any functionality.

## Submitting changes

To add changes, make a new branch off master.

If you're not a member of the project or you're outside of the DVSA organization, you'll need to fork the project and create a branch on your fork. See full instructions [here](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/working-with-forks).

We recommended the following branch naming, for a new feature use `feature/<issue-number>-add-extra-endpoint` and for bug use `bug/<issue-number>-fix-returning-wrong-status`.

We don't squash merge to preserve the history of the work so always write clear log message for your commits. You can squash commits if you feel they could be tidied up. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."

Here's a [handy resource](https://github.com/alphagov/styleguides/blob/master/git.md) for writing good commit messages and general git housekeeping.

Once you have committed your changes, raise a pull request into master. Add as much information as you can to the pull request, make sure you complete the template and to include the issue number you're changes are addressing.

Before raising a pull request, ensure all tests pass and you have run the linting tools. See the README for instructions on how to do this.

## Need help?

Contact Shaun Hare or Anna Dodson for help with this project.

## Code of Conduct

This project follows the [alphagov Github organisation's Code of Conduct](https://github.com/alphagov/.github/blob/master/CODE_OF_CONDUCT.md).
