import { DeserializedCommand } from './types';
export declare class MultilineParser {
    private _debug;
    private _log;
    private _linesQueue;
    constructor(debug: boolean, log: (...args: unknown[]) => void);
    receivedString(data: string): DeserializedCommand[];
    parseResponse(lines: string[]): DeserializedCommand | null;
}
//# sourceMappingURL=parser.d.ts.map