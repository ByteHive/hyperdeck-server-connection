import * as DeserializedCommands from './types/DeserializedCommands';
import * as ResponseInterface from './types/ResponseInterface';
export { DeserializedCommands, ResponseInterface };
export declare const CRLF = "\r\n";
export interface Hash<T> {
    [key: string]: T;
}
export interface NotififcationConfig {
    transport: boolean;
    remote: boolean;
    slot: boolean;
    configuration: boolean;
}
export declare class TResponse {
    code: ResponseCode;
    name: string;
    params?: Hash<string>;
    constructor(code: ResponseCode, name: string, params: Hash<string> | void);
    build(): string;
}
export interface DeserializedCommand {
    raw: string;
    name: string;
    parameters: {
        [key: string]: string | undefined;
    };
}
export type ResponseCode = ErrorCode | SynchronousCode | AsynchronousCode;
export declare enum ErrorCode {
    SyntaxError = 100,
    UnsupportedParameter = 101,
    InvalidValue = 102,
    Unsupported = 103,
    DiskFull = 104,
    NoDisk = 105,
    DiskError = 106,
    TimelineEmpty = 107,
    InternalError = 108,
    OutOfRange = 109,
    NoInput = 110,
    RemoteControlDisabled = 111,
    ConnectionRejected = 120,
    InvalidState = 150,
    InvalidCodec = 151,
    InvalidFormat = 160,
    InvalidToken = 161,
    FormatNotPrepared = 162
}
export declare enum SynchronousCode {
    OK = 200,
    SlotInfo = 202,
    DeviceInfo = 204,
    ClipsInfo = 205,
    DiskList = 206,
    TransportInfo = 208,
    Notify = 209,
    Remote = 210,
    Configuration = 211,
    ClipsCount = 214,
    Uptime = 215,
    FormatReady = 216
}
export declare enum AsynchronousCode {
    ConnectionInfo = 500,
    SlotInfo = 502,
    TransportInfo = 508,
    RemoteInfo = 510,
    ConfigurationInfo = 511
}
export declare enum NotifyType {
    Slot = 0,
    Transport = 1,
    Remote = 2,
    Configuration = 3
}
export declare enum CommandNames {
    DeviceInfoCommand = "device info",
    DiskListCommand = "disk list",
    PreviewCommand = "preview",
    PlayCommand = "play",
    PlayrangeSetCommand = "playrange set",
    PlayrangeClearCommand = "playrange clear",
    RecordCommand = "record",
    StopCommand = "stop",
    ClipsCountCommand = "clips count",
    ClipsGetCommand = "clips get",
    ClipsAddCommand = "clips add",
    ClipsClearCommand = "clips clear",
    TransportInfoCommand = "transport info",
    SlotInfoCommand = "slot info",
    SlotSelectCommand = "slot select",
    NotifyCommand = "notify",
    GoToCommand = "goto",
    JogCommand = "jog",
    ShuttleCommand = "shuttle",
    RemoteCommand = "remote",
    ConfigurationCommand = "configuration",
    UptimeCommand = "uptime",
    FormatCommand = "format",
    IdentifyCommand = "identify",
    WatchdogCommand = "watchdog",
    PingCommand = "ping"
}
export declare const ParameterMap: {
    help: never[];
    commands: never[];
    'device info': never[];
    'disk list': string[];
    quit: never[];
    ping: never[];
    preview: string[];
    play: string[];
    'playrange set': string[];
    'playrange clear': never[];
    record: string[];
    stop: never[];
    'clips count': never[];
    'clips get': string[];
    'clips add': string[];
    'clips clear': never[];
    'transport info': never[];
    'slot info': string[];
    'slot select': string[];
    notify: string[];
    goto: string[];
    jog: string[];
    shuttle: string[];
    remote: string[];
    configuration: string[];
    uptime: never[];
    format: string[];
    identify: string[];
    watchdog: string[];
};
export type Response = Hash<string> | ResponseInterface.DeviceInfo | ResponseInterface.DiskList | ResponseInterface.ClipsCount | ResponseInterface.ClipsGet | ResponseInterface.TransportInfo | ResponseInterface.SlotInfo | ResponseInterface.Configuration | ResponseInterface.Uptime | ResponseInterface.Format;
export declare enum SlotStatus {
    EMPTY = "empty",
    MOUNTING = "mounting",
    ERROR = "error",
    MOUNTED = "mounted"
}
export declare enum VideoFormat {
    NTSC = "NTSC",
    PAL = "PAL",
    NTSCp = "NTSCp",
    PALp = "PALp",
    _720p50 = "720p50",
    _720p5994 = "720p5994",
    _720p60 = "720p60",
    _1080p23976 = "1080p23976",
    _1080p24 = "1080p24",
    _1080p25 = "1080p25",
    _1080p2997 = "1080p2997",
    _1080p30 = "1080p30",
    _1080i50 = "1080i50",
    _1080i5994 = "1080i5994",
    _1080i60 = "1080i60",
    _4Kp23976 = "4Kp23976",
    _4Kp24 = "4Kp24",
    _4Kp25 = "4Kp25",
    _4Kp2997 = "4Kp2997",
    _4Kp30 = "4Kp30",
    _4Kp50 = "4Kp50",
    _4Kp5994 = "4Kp5994",
    _4Kp60 = "4Kp60"
}
export declare enum TransportStatus {
    PREVIEW = "preview",
    STOPPED = "stopped",
    PLAY = "play",
    FORWARD = "forward",
    REWIND = "rewind",
    JOG = "jog",
    SHUTTLE = "shuttle",
    RECORD = "record"
}
export declare enum FileFormats {
    QuickTimeUncompressed = "QuickTimeUncompressed",
    QuickTimeProResHQ = "QuickTimeProResHQ",
    QuickTimeProRes = "QuickTimeProRes",
    QuickTimeProResLT = "QuickTimeProResLT",
    QuickTimeProResProxy = "QuickTimeProResProxy",
    QuickTimeDNxHR220 = "QuickTimeDNxHR220",
    DNxHR220 = "DNxHR220"
}
export declare enum AudioInputs {
    embedded = "embedded",
    XLR = "XLR",
    RCA = "RCA"
}
export declare enum VideoInputs {
    SDI = "SDI",
    HDMI = "HDMI",
    component = "component"
}
//# sourceMappingURL=types.d.ts.map