import {
    Category,
    CategoryLogger,
    CategoryServiceFactory,
    CategoryConfiguration,
    LogLevel,
    LoggerType,
} from 'typescript-logging';

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Trace, LoggerType.Console));

namespace l {
    export const log = new Category('jim');
    export function trace(message) {
        log.trace(message);
    }

    export function debug(message) {
        log.debug(message);
    }

    export function info(message) {
        log.info(message);
    }

    export function warn(message) {
        log.warn(message);
    }

    export function error(message, error: Error) {
        log.error(message, error);
    }

    export function fatal(message, error: Error) {
        log.fatal(message, error);
    }
}

export default l;
