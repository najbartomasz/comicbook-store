import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';

export interface LogAppender {
    info: (logEntry: Readonly<LogEntry>) => void;
    warn: (logEntry: Readonly<LogEntry>) => void;
    error: (errorLogEntry: Readonly<ErrorLogEntry>) => void;
}
