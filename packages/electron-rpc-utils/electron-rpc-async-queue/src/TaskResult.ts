/** Result of task execution */
export interface TaskResult<A extends any[] = any[], R = any> {
    /** Task body arguments */
    args: A;
    /** Execution error message */
    error: string | null;
    /** Execution result */
    result: R | null;
}
