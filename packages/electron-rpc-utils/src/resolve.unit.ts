import * as assert from 'assert';
import { RpcChannelDefaultNames } from 'electron-rpc-types';

import { resolve } from './resolve';

describe('["electron-rpc-channels-names-resolver"] "resolve" function unit test', () => {
    it('No argument resolve to defaults', () => {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve();
        assert.equal(
            rpcRequestChannelName,
            RpcChannelDefaultNames.REQUEST,
            `"rpcRequestChannelName" must equal "${RpcChannelDefaultNames.REQUEST}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            RpcChannelDefaultNames.RESPONSE,
            `"rpcResponseChannelName" must equal "${RpcChannelDefaultNames.RESPONSE}"`,
        );
    });
    it('"undefined" argument resolve to defaults', () => {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(undefined);
        assert.equal(
            rpcRequestChannelName,
            RpcChannelDefaultNames.REQUEST,
            `"rpcRequestChannelName" must equal "${RpcChannelDefaultNames.REQUEST}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            RpcChannelDefaultNames.RESPONSE,
            `"rpcResponseChannelName" must equal "${RpcChannelDefaultNames.RESPONSE}"`,
        );
    });
    it('"null" argument resolve to defaults', () => {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve(null);
        assert.equal(
            rpcRequestChannelName,
            RpcChannelDefaultNames.REQUEST,
            `"rpcRequestChannelName" must equal "${RpcChannelDefaultNames.REQUEST}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            RpcChannelDefaultNames.RESPONSE,
            `"rpcResponseChannelName" must equal "${RpcChannelDefaultNames.RESPONSE}"`,
        );
    });
    it('Empty argument resolve to defaults', () => {
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve({});
        assert.equal(
            rpcRequestChannelName,
            RpcChannelDefaultNames.REQUEST,
            `"rpcRequestChannelName" must equal "${RpcChannelDefaultNames.REQUEST}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            RpcChannelDefaultNames.RESPONSE,
            `"rpcResponseChannelName" must equal "${RpcChannelDefaultNames.RESPONSE}"`,
        );
    });
    it('Defined "rpcResponseChannelName" replaces default value', () => {
        const $rpcResponseChannelName: string = 'MY_RESPONSE';
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve({
            rpcResponseChannelName: $rpcResponseChannelName,
        });
        assert.equal(
            rpcRequestChannelName,
            RpcChannelDefaultNames.REQUEST,
            `"rpcRequestChannelName" must equal "${RpcChannelDefaultNames.REQUEST}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            $rpcResponseChannelName,
            `"rpcResponseChannelName" must equal "${$rpcResponseChannelName}"`,
        );
    });
    it('Defined "rpcRequestChannelName" replaces default value', () => {
        const $rpcRequestChannelName: string = 'MY_REQUEST';
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve({
            rpcRequestChannelName: $rpcRequestChannelName,
        });
        assert.equal(
            rpcRequestChannelName,
            $rpcRequestChannelName,
            `"rpcRequestChannelName" must equal "${$rpcRequestChannelName}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            RpcChannelDefaultNames.RESPONSE,
            `"rpcResponseChannelName" must equal "${RpcChannelDefaultNames.RESPONSE}"`,
        );
    });
    it('Defined "rpcRequestChannelName" and "rpcResponseChannelName" replaces default value', () => {
        const $rpcRequestChannelName: string = 'MY_REQUEST';
        const $rpcResponseChannelName: string = 'MY_RESPONSE';
        const { rpcRequestChannelName, rpcResponseChannelName } = resolve({
            rpcRequestChannelName: $rpcRequestChannelName,
            rpcResponseChannelName: $rpcResponseChannelName,
        });
        assert.equal(
            rpcRequestChannelName,
            $rpcRequestChannelName,
            `"rpcRequestChannelName" must equal "${$rpcRequestChannelName}"`,
        );
        assert.equal(
            rpcResponseChannelName,
            $rpcResponseChannelName,
            `"rpcResponseChannelName" must equal "${$rpcResponseChannelName}"`,
        );
    });
});
