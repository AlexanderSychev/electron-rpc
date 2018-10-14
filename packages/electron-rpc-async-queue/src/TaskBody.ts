/**
 * Task body - async function which must be executed by task.
 * Generic types:
 *   A extends any[] = any[] - arguments of function
 *   R = any - function result
 */
export interface TaskBody<A extends any[] = any[], R = any> {
    (...args: A): R | Promise<R>;
}
