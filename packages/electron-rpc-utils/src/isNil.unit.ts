import assert from 'assert';

import { isNil } from './isNil';

describe('["electron-rpc-channels-names-resolver"] "isNil" function unit test', () => {
    it('"isNil(null) === true"', () => {
        assert(isNil(null), '"isNil(null)" must returns "true"');
    });
    it('"isNil(undefined) === true"', () => {
        assert(isNil(undefined), '"isNil(undefined)" must returns "true"');
    });
    it('"isNil(0) === false"', () => {
        assert(!isNil(0), '"isNil(0)" must returns "false"');
    });
    it('"isNil(false) === false"', () => {
        assert(!isNil(false), '"isNil(false)" must returns "false"');
    });
    it('"isNil(true) === false"', () => {
        assert(!isNil(true), '"isNil(true)" must returns "false"');
    });
});
