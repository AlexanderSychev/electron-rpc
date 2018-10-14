/** Builds remote procedure name for controller and service */
export const getControllerMethodName = (rpcServiceName: string, rpcMethodName: string): string =>
    `${rpcServiceName}.${rpcMethodName}`;
