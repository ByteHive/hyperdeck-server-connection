"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperdeckServer = void 0;
const socket_1 = require("./socket");
const types_1 = require("./types");
const net_1 = require("net");
class HyperdeckServer {
    constructor(ip, port = 9993, maxConnections = 1) {
        this._sockets = {};
        this._server = (0, net_1.createServer)((socket) => {
            const socketId = Math.random().toString(35).substr(-6);
            this._sockets[socketId] = new socket_1.HyperdeckSocket(socket, async (cmd) => this._receivedCommand(cmd));
            this._sockets[socketId].on('disconnected', () => {
                delete this._sockets[socketId];
            });
        });
        this._server.on('listening', () => console.log('listening'));
        this._server.maxConnections = maxConnections; // this mimics an actual hyperdeck and is useful for mocking. less useful for doing practical things.
        this._server.listen(port, ip);
    }
    close() {
        this._server.unref();
    }
    notifySlot(params) {
        this._notify(types_1.NotifyType.Slot, params);
    }
    notifyTransport(params) {
        this._notify(types_1.NotifyType.Transport, params);
    }
    _notify(type, params) {
        for (const id of Object.keys(this._sockets)) {
            this._sockets[id].notify(type, params);
        }
    }
    async _receivedCommand(cmd) {
        const intErrorCatch = (err) => {
            if (err)
                return new types_1.TResponse(err.code, err.msg);
            else
                return new types_1.TResponse(types_1.ErrorCode.InternalError, 'internal error');
        };
        let executor;
        let resHandler;
        if (cmd.name === types_1.CommandNames.DeviceInfoCommand) {
            executor = this.onDeviceInfo;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.DeviceInfo, 'device info', res);
        }
        else if (cmd.name === types_1.CommandNames.DiskListCommand) {
            executor = this.onDiskList;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.DiskList, 'disk list', res);
        }
        else if (cmd.name === types_1.CommandNames.PreviewCommand) {
            executor = this.onPreview;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.PlayCommand) {
            executor = this.onPlay;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.PlayrangeSetCommand) {
            executor = this.onPlayrangeSet;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.PlayrangeClearCommand) {
            executor = this.onPlayrangeClear;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.RecordCommand) {
            executor = this.onRecord;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.StopCommand) {
            executor = this.onStop;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.ClipsCountCommand) {
            executor = this.onClipsCount;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.ClipsCount, 'clips count', res);
        }
        else if (cmd.name === types_1.CommandNames.ClipsGetCommand) {
            executor = this.onClipsGet;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.ClipsInfo, 'clips info', res);
        }
        else if (cmd.name === types_1.CommandNames.ClipsAddCommand) {
            executor = this.onClipsAdd;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.ClipsClearCommand) {
            executor = this.onClipsClear;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.TransportInfoCommand) {
            executor = this.onTransportInfo;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.TransportInfo, 'transport info', res);
        }
        else if (cmd.name === types_1.CommandNames.SlotInfoCommand) {
            executor = this.onSlotInfo;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.SlotInfo, 'slot info', res);
        }
        else if (cmd.name === types_1.CommandNames.SlotSelectCommand) {
            executor = this.onSlotSelect;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.NotifyCommand) {
            // implemented in socket.ts
            return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.GoToCommand) {
            executor = this.onGoTo;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.JogCommand) {
            executor = this.onJog;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.ShuttleCommand) {
            executor = this.onShuttle;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.RemoteCommand) {
            executor = this.onRemote;
            resHandler = (res) => {
                if (!res)
                    return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
                else
                    return new types_1.TResponse(types_1.SynchronousCode.Remote, 'remote', res);
            };
        }
        else if (cmd.name === types_1.CommandNames.ConfigurationCommand) {
            executor = this.onConfiguration;
            resHandler = (res) => {
                if (res)
                    return new types_1.TResponse(types_1.SynchronousCode.Configuration, 'configuration', res);
                else
                    return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
            };
        }
        else if (cmd.name === types_1.CommandNames.UptimeCommand) {
            executor = this.onUptime;
            resHandler = (res) => new types_1.TResponse(types_1.SynchronousCode.Uptime, 'uptime', res);
        }
        else if (cmd.name === types_1.CommandNames.FormatCommand) {
            executor = this.onFormat;
            resHandler = (res) => {
                if (res)
                    return new types_1.TResponse(types_1.SynchronousCode.FormatReady, 'format ready', res);
                else
                    return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
            };
        }
        else if (cmd.name === types_1.CommandNames.IdentifyCommand) {
            executor = this.onIdentify;
            resHandler = () => new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.WatchdogCommand) {
            // implemented in socket.ts
            return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        else if (cmd.name === types_1.CommandNames.PingCommand) {
            // implemented in socket.ts
            return new types_1.TResponse(types_1.SynchronousCode.OK, 'ok');
        }
        if (executor && resHandler) {
            return executor(cmd).then(resHandler, intErrorCatch);
        }
        return Promise.reject();
    }
}
exports.HyperdeckServer = HyperdeckServer;
//# sourceMappingURL=server.js.map