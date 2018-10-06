import { RequestLoggingFunction, SuccessLoggingFunction, ErrorLoggingFunction, Envelope } from 'electron-rpc-types';

import { isNil } from './isNil';

/** Abstract loggable entity */
export abstract class Loggable {
    /** Request logging function */
    private requestLogger: RequestLoggingFunction | null;
    /** Success logging function */
    private successLogger: SuccessLoggingFunction | null;
    /** Error logging function */
    private errorLogger: ErrorLoggingFunction | null;
    /** @constructor */
    protected constructor() {
        this.requestLogger = null;
        this.successLogger = null;
        this.errorLogger = null;
    }
    /** Add request logging function */
    public setRequestLogger(requestLogger: RequestLoggingFunction | null): void {
        this.requestLogger = requestLogger;
    }
    /** Add success logging function */
    public setSuccessLogger(successLogger: SuccessLoggingFunction | null): void {
        this.successLogger = successLogger;
    }
    /** Add error logging function */
    public setErrorLogger(errorLogger: ErrorLoggingFunction | null): void {
        this.errorLogger = errorLogger;
    }
    /** Log request */
    protected logRequest(envelope: Envelope, args: any[]): void {
        if (!isNil(this.requestLogger)) {
            this.requestLogger(envelope, args);
        }
    }
    /** Log success */
    protected logSuccess(envelope: Envelope, args: any[], response: any): void {
        if (!isNil(this.successLogger)) {
            this.successLogger(envelope, args, response);
        }
    }
    /** Log request */
    protected logError(envelope: Envelope, args: any[], error: string): void {
        if (!isNil(this.errorLogger)) {
            this.errorLogger(envelope, args, error);
        }
    }
}
