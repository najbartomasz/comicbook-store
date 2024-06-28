import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';

export interface LogAppender {
    info(logEntry: LogEntry): void;
    warn(logEntry: LogEntry): void;
    error(logEntry: ErrorLogEntry): void;
}
