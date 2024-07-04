"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperdeckSocket = void 0;
const events_1 = require("events");
const types_1 = require("./types");
const parser_1 = require("./parser");
class HyperdeckSocket extends events_1.EventEmitter {
    constructor(socket, receivedCommand) {
        super();
        this._notifySettings = {
            slot: false,
            transport: false,
            remote: false,
            configuration: false,
            'dropped frames': false // @todo: implement
        };
        this._parser = new parser_1.MultilineParser(false, () => null);
        this._receivedCommand = receivedCommand;
        this._socket = socket;
        this._socket.setEncoding('utf-8');
        this._socket.on('data', (data) => this._onMessage(data));
        this._socket.on('error', () => {
            this._socket.destroy();
            this.emit('disconnected');
        });
        this.sendResponse(new types_1.TResponse(types_1.AsynchronousCode.ConnectionInfo, 'connection info', {
            'protocol version': '1.8',
            model: 'NodeJS Hyperdeck Server Library'
        }));
    }
    _onMessage(data) {
        this._lastReceived = Date.now();
        const cmds = this._parser.receivedString(data);
        for (const cmd of cmds) {
            // special cases
            if (cmd.name === types_1.CommandNames.WatchdogCommand) {
                if (this._watchdogTimer)
                    clearInterval(this._watchdogTimer);
                const watchdogCmd = cmd;
                if (watchdogCmd.parameters.period) {
                    this._watchdogTimer = setInterval(() => {
                        if (this._lastReceived &&
                            Date.now() - this._lastReceived >
                                Number(watchdogCmd.parameters.period) * 1000) {
                            this._socket.destroy();
                            this.emit('disconnected');
                            clearInterval(this._watchdogTimer);
                        }
                    }, Number(watchdogCmd.parameters.period) * 1000);
                }
            }
            else if (cmd.name === types_1.CommandNames.NotifyCommand) {
                const notifyCmd = cmd;
                if (Object.keys(notifyCmd.parameters).length > 0) {
                    for (const param of Object.keys(notifyCmd.parameters)) {
                        if (this._notifySettings[param] !== undefined) {
                            this._notifySettings[param] = notifyCmd.parameters[param] === 'true';
                        }
                    }
                }
                else {
                    const settings = {};
                    for (const key of Object.keys(this._notifySettings)) {
                        settings[key] = this._notifySettings[key] ? 'true' : 'false';
                    }
                    this.sendResponse(new types_1.TResponse(types_1.SynchronousCode.Notify, 'notify', settings));
                    continue;
                }
            }
            this._receivedCommand(cmd).then((res) => {
                this.sendResponse(res);
            }, () => {
                // not implemented by client code:
                this.sendResponse(new types_1.TResponse(types_1.ErrorCode.Unsupported, 'unsupported'));
            });
        }
    }
    sendResponse(res) {
        const msg = res.build();
        this._socket.write(msg);
    }
    notify(type, params) {
        if (type === types_1.NotifyType.Configuration && this._notifySettings.configuration) {
            this.sendResponse(new types_1.TResponse(types_1.AsynchronousCode.ConfigurationInfo, 'configuration info', params));
        }
        else if (type === types_1.NotifyType.Remote && this._notifySettings.remote) {
            this.sendResponse(new types_1.TResponse(types_1.AsynchronousCode.RemoteInfo, 'remote info', params));
        }
        else if (type === types_1.NotifyType.Slot && this._notifySettings.slot) {
            this.sendResponse(new types_1.TResponse(types_1.AsynchronousCode.SlotInfo, 'slot info', params));
        }
        else if (type === types_1.NotifyType.Transport && this._notifySettings.transport) {
            this.sendResponse(new types_1.TResponse(types_1.AsynchronousCode.TransportInfo, 'transport info', params));
        }
    }
}
exports.HyperdeckSocket = HyperdeckSocket;
//# sourceMappingURL=socket.js.map