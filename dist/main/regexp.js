"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConvertableRegexp = void 0;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags
const isConvertableRegexp = (maybeRegexp) => /^\/.*\/[dgimsuy]*$/.test(maybeRegexp);
exports.isConvertableRegexp = isConvertableRegexp;
