declare module 'micro-events' {
    /** Event emitter class */
    class MicroEventEmitter {
        /** Max listeners count */
        public maxListeners: number;
        /** Attach listener */
        public on(type: string, handler: MicroEventEmitter.EventHandler): MicroEventEmitter;
        /** Detach listener */
        public off(type: string, handler?: MicroEventEmitter.EventHandler): MicroEventEmitter;
        /** Trigger event */
        public emit(type: string, ...arguments: any[]): MicroEventEmitter;
        /** Add other emitter to forward events to it */
        public pipe(emitter: MicroEventEmitter): MicroEventEmitter;
        /** Remove other emitter */
        public unpipe(emitter: MicroEventEmitter): MicroEventEmitter;
    }
    namespace MicroEventEmitter {
        /** Event handler function signature */
        interface EventHandler {
            (...args: any[]): any;
        }
    }
    export = MicroEventEmitter;
}
