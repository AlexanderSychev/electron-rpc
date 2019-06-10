/**
 * @fileoverview Enums from typings as native JS "enums". At other packages
 * replaced by their values.
 */

/**
 * Type of envelope
 * @enum {string}
 */
exports.EnvelopeType = {
    /** Nonblocking (several requests of this type may be executed in parallel) */
    NONBLOCKING: 'EnvelopeType.NONBLOCKING',
    /** Blocking (several requests of this type will be executed only in turn) */
    BLOCKING: 'EnvelopeType.BLOCKING'
}

/**
 * Default names of RPC channel
 * @enum {string}
 */
exports.RpcChannelDefaultNames = {
    /** Request channel default name */
    REQUEST: 'RpcChannelDefaultNames.REQUEST',
    /** Response channel default name */
    RESPONSE: 'RpcChannelDefaultNames.RESPONSE'
};
