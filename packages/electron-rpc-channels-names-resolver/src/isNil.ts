/** Returns "true" if argument is "null" or "undefined" */
export const isNil = (value: any): value is null | undefined => value === null || value === undefined;
