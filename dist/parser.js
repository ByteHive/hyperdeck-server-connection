"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultilineParser = void 0;
const types_1 = require("./types");
class MultilineParser {
    constructor(debug, log) {
        this._linesQueue = [];
        this._debug = debug;
        this._log = log;
    }
    receivedString(data) {
        const res = [];
        // add new lines to processing queue
        const newLines = data.split('\r\n');
        // remove the blank line at the end from the intentionally trailing \r\n
        if (newLines.length > 0 && newLines[newLines.length - 1] === '')
            newLines.pop();
        this._linesQueue = this._linesQueue.concat(newLines);
        while (this._linesQueue.length > 0) {
            // skip any blank lines
            if (this._linesQueue[0] === '') {
                this._linesQueue.shift();
                continue;
            }
            // if the first line has no colon, then it is a single line command
            if (this._linesQueue[0].indexOf(':') === -1 ||
                (this._linesQueue.length === 1 && this._linesQueue[0].indexOf(':') > 0)) {
                const r = this.parseResponse(this._linesQueue.splice(0, 1));
                if (r) {
                    res.push(r);
                }
                continue;
            }
            const endLine = this._linesQueue.indexOf('');
            if (endLine === -1) {
                // Not got full response yet
                break;
            }
            const lines = this._linesQueue.splice(0, endLine + 1);
            const r = this.parseResponse(lines);
            if (r)
                res.push(r);
        }
        return res;
    }
    parseResponse(lines) {
        lines = lines.map((l) => l.trim());
        if (lines.length === 1 && lines[0].indexOf(':') > -1) {
            const bits = lines[0].split(': ');
            const msg = bits.shift();
            if (!msg)
                throw new Error('Unrecognised command');
            const params = {};
            const paramNames = new Set(types_1.ParameterMap[msg]);
            let param = bits.shift();
            if (!param)
                throw new Error('No named parameters found');
            for (let i = 0; i < bits.length - 1; i++) {
                const bobs = bits[i].split(' ');
                let nextParam = '';
                for (let i = bobs.length - 1; i >= 0; i--) {
                    nextParam = (bobs.pop() + ' ' + nextParam).trim();
                    if (paramNames.has(nextParam)) {
                        break;
                    }
                }
                if (!bobs.length)
                    throw new Error('Command malformed / paramName not recognised');
                params[param] = bobs.join(' ');
                param = nextParam;
            }
            params[param] = bits[bits.length - 1];
            return {
                raw: lines.join('\r\n'),
                name: msg,
                parameters: params
            };
        }
        else {
            const headerMatch = lines[0].match(/(.+?)(:|)$/im);
            if (!headerMatch) {
                if (this._debug)
                    this._log('failed to parse header', lines[0]);
                return null;
            }
            const msg = headerMatch[1];
            const params = {};
            for (let i = 1; i < lines.length; i++) {
                const lineMatch = lines[i].match(/^(.*?): (.*)$/im);
                if (!lineMatch) {
                    if (this._debug)
                        this._log('failed to parse line', lines[i]);
                    continue;
                }
                params[lineMatch[1]] = lineMatch[2];
            }
            const res = {
                raw: lines.join('\r\n'),
                name: msg,
                parameters: params
            };
            return res;
        }
    }
}
exports.MultilineParser = MultilineParser;
//# sourceMappingURL=parser.js.map