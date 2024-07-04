import { DeserializedCommand, DeserializedCommands, Hash, ResponseInterface } from './types';
export declare class HyperdeckServer {
    private _sockets;
    private _server;
    onDeviceInfo?: (command: DeserializedCommand) => Promise<ResponseInterface.DeviceInfo>;
    onDiskList?: (command: DeserializedCommand) => Promise<ResponseInterface.DiskList>;
    onPreview?: (command: DeserializedCommands.PreviewCommand) => Promise<void>;
    onPlay?: (command: DeserializedCommands.PlayCommand) => Promise<void>;
    onPlayrangeSet?: (command: DeserializedCommands.PlayrangeSetCommand) => Promise<void>;
    onPlayrangeClear?: (command: DeserializedCommand) => Promise<void>;
    onRecord?: (command: DeserializedCommands.RecordCommand) => Promise<void>;
    onStop?: (command: DeserializedCommand) => Promise<void>;
    onClipsCount?: (command: DeserializedCommand) => Promise<ResponseInterface.ClipsCount>;
    onClipsGet?: (command: DeserializedCommands.ClipsGetCommand) => Promise<ResponseInterface.ClipsGet>;
    onClipsAdd?: (command: DeserializedCommands.ClipsAddCommand) => Promise<void>;
    onClipsClear?: (command: DeserializedCommand) => Promise<void>;
    onTransportInfo?: (command: DeserializedCommand) => Promise<ResponseInterface.TransportInfo>;
    onSlotInfo?: (command: DeserializedCommands.SlotInfoCommand) => Promise<ResponseInterface.SlotInfo>;
    onSlotSelect?: (command: DeserializedCommands.SlotSelectCommand) => Promise<void>;
    onGoTo?: (command: DeserializedCommands.GoToCommand) => Promise<void>;
    onJog?: (command: DeserializedCommands.JogCommand) => Promise<void>;
    onShuttle?: (command: DeserializedCommands.ShuttleCommand) => Promise<void>;
    onRemote?: (command: DeserializedCommands.RemoteCommand) => Promise<ResponseInterface.RemoteOptions>;
    onConfiguration?: (command: DeserializedCommands.ConfigurationCommand) => Promise<ResponseInterface.Configuration>;
    onUptime?: (command: DeserializedCommand) => Promise<ResponseInterface.Uptime>;
    onFormat?: (command: DeserializedCommands.FormatCommand) => Promise<ResponseInterface.Format>;
    onIdentify?: (command: DeserializedCommands.IdentifyCommand) => Promise<void>;
    onWatchdog?: (command: DeserializedCommands.WatchdogCommand) => Promise<void>;
    constructor(ip?: string, port?: number, maxConnections?: number);
    close(): void;
    notifySlot(params: Hash<string>): void;
    notifyTransport(params: Hash<string>): void;
    private _notify;
    private _receivedCommand;
}
//# sourceMappingURL=server.d.ts.map