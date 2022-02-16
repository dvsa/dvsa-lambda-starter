import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }));
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

export default logger;
