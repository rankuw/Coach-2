import {createLogger, format, transports, Logger} from "winston";
const {combine, timestamp, printf, errors, json} = format



export function buildProdLogger(place: string): Logger{
    return createLogger({ // default level info.
        format: combine(
            timestamp(),
            errors({stack: true}),
            json()
        ),
        defaultMeta: {service: place},
        transports: [
            new transports.Console(),
            new transports.File({filename: "./src/logger/combine.log"})
        ]
    });
    
    
}
