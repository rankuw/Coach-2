import {createLogger, format, transports, Logger} from "winston";
const {combine, timestamp, printf, colorize, errors} = format

export function buildDevLogger(place: string): Logger{
    const myFormat = printf(({level, message, timestamp, stack, service}) => {
        return `${timestamp}  ${level}: ${message} [${service}]`;
    });
    
    return createLogger({
        level: "debug",
        format: combine(
            colorize(),
            timestamp({format: "HH:mm:ss"}),
            errors({stack: true}),
            myFormat
        ),
        defaultMeta: {service: place},
        transports: [
            new transports.Console(),
        ]
    });
    
    
}

