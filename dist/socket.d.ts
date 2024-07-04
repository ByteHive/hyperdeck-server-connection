/// <reference types="node" />
/// <reference types="node" />
import { Socket } from 'net';
import { EventEmitter } from 'events';
import { TResponse, DeserializedCommand, NotifyType, Hash } from './types';
export declare class HyperdeckSocket extends EventEmitter {
    private _socket;
    private _parser;
    private _receivedCommand;
    private _lastReceived?;
    private _watchdogTimer?;
    private _notifySettings;
    constructor(socket: Socket, receivedCommand: (cmd: DeserializedCommand) => Promise<TResponse>);
    private _onMessage;
    sendResponse(res: TResponse): void;
    notify(type: NotifyType, params: Hash<string>): void;
}
//# sourceMappingURL=socket.d.ts.map