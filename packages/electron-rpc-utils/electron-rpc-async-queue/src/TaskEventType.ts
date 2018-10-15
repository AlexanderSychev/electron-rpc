/** Available task events types */
export enum TaskEventType {
    /** Task was started */
    START = 'TaskEventType.START',
    /** Task completed successfully */
    SUCCESS = 'TaskEventType.SUCCESS',
    /** Tasks throws an error */
    ERROR = 'TaskEventType.ERROR',
    /** Task execution ended (successfully or with error) */
    END = 'TaskEventType.END',
}
