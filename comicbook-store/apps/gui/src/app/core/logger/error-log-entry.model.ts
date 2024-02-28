import { LogEntry } from './log-entry.model';

export interface ErrorLogEntry extends LogEntry {
    error: unknown;
}
