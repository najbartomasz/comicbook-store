export interface LogEntry {
    readonly timestamp: Date;
    readonly loggerName: string;
    readonly message: string;
}
