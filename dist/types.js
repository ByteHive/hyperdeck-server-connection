"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoInputs = exports.AudioInputs = exports.FileFormats = exports.TransportStatus = exports.VideoFormat = exports.SlotStatus = exports.ParameterMap = exports.CommandNames = exports.NotifyType = exports.AsynchronousCode = exports.SynchronousCode = exports.ErrorCode = exports.TResponse = exports.CRLF = exports.ResponseInterface = exports.DeserializedCommands = void 0;
const util = require("util");
const DeserializedCommands = require("./types/DeserializedCommands");
exports.DeserializedCommands = DeserializedCommands;
const ResponseInterface = require("./types/ResponseInterface");
exports.ResponseInterface = ResponseInterface;
exports.CRLF = '\r\n';
class TResponse {
    constructor(code, name, params) {
        this.code = code;
        this.name = name;
        if (params)
            this.params = params;
    }
    build() {
        let data = util.format('%d %s', this.code, this.name);
        if (this.params) {
            data += ':' + exports.CRLF;
            for (const key in this.params) {
                if (this.params[key]) {
                    data += util.format('%s: %s', key, this.params[key]) + exports.CRLF;
                }
            }
        }
        data += exports.CRLF;
        return data;
    }
}
exports.TResponse = TResponse;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SyntaxError"] = 100] = "SyntaxError";
    ErrorCode[ErrorCode["UnsupportedParameter"] = 101] = "UnsupportedParameter";
    ErrorCode[ErrorCode["InvalidValue"] = 102] = "InvalidValue";
    ErrorCode[ErrorCode["Unsupported"] = 103] = "Unsupported";
    ErrorCode[ErrorCode["DiskFull"] = 104] = "DiskFull";
    ErrorCode[ErrorCode["NoDisk"] = 105] = "NoDisk";
    ErrorCode[ErrorCode["DiskError"] = 106] = "DiskError";
    ErrorCode[ErrorCode["TimelineEmpty"] = 107] = "TimelineEmpty";
    ErrorCode[ErrorCode["InternalError"] = 108] = "InternalError";
    ErrorCode[ErrorCode["OutOfRange"] = 109] = "OutOfRange";
    ErrorCode[ErrorCode["NoInput"] = 110] = "NoInput";
    ErrorCode[ErrorCode["RemoteControlDisabled"] = 111] = "RemoteControlDisabled";
    ErrorCode[ErrorCode["ConnectionRejected"] = 120] = "ConnectionRejected";
    ErrorCode[ErrorCode["InvalidState"] = 150] = "InvalidState";
    ErrorCode[ErrorCode["InvalidCodec"] = 151] = "InvalidCodec";
    ErrorCode[ErrorCode["InvalidFormat"] = 160] = "InvalidFormat";
    ErrorCode[ErrorCode["InvalidToken"] = 161] = "InvalidToken";
    ErrorCode[ErrorCode["FormatNotPrepared"] = 162] = "FormatNotPrepared";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var SynchronousCode;
(function (SynchronousCode) {
    SynchronousCode[SynchronousCode["OK"] = 200] = "OK";
    SynchronousCode[SynchronousCode["SlotInfo"] = 202] = "SlotInfo";
    SynchronousCode[SynchronousCode["DeviceInfo"] = 204] = "DeviceInfo";
    SynchronousCode[SynchronousCode["ClipsInfo"] = 205] = "ClipsInfo";
    SynchronousCode[SynchronousCode["DiskList"] = 206] = "DiskList";
    SynchronousCode[SynchronousCode["TransportInfo"] = 208] = "TransportInfo";
    SynchronousCode[SynchronousCode["Notify"] = 209] = "Notify";
    SynchronousCode[SynchronousCode["Remote"] = 210] = "Remote";
    SynchronousCode[SynchronousCode["Configuration"] = 211] = "Configuration";
    SynchronousCode[SynchronousCode["ClipsCount"] = 214] = "ClipsCount";
    SynchronousCode[SynchronousCode["Uptime"] = 215] = "Uptime";
    SynchronousCode[SynchronousCode["FormatReady"] = 216] = "FormatReady";
})(SynchronousCode = exports.SynchronousCode || (exports.SynchronousCode = {}));
var AsynchronousCode;
(function (AsynchronousCode) {
    AsynchronousCode[AsynchronousCode["ConnectionInfo"] = 500] = "ConnectionInfo";
    AsynchronousCode[AsynchronousCode["SlotInfo"] = 502] = "SlotInfo";
    AsynchronousCode[AsynchronousCode["TransportInfo"] = 508] = "TransportInfo";
    AsynchronousCode[AsynchronousCode["RemoteInfo"] = 510] = "RemoteInfo";
    AsynchronousCode[AsynchronousCode["ConfigurationInfo"] = 511] = "ConfigurationInfo";
})(AsynchronousCode = exports.AsynchronousCode || (exports.AsynchronousCode = {}));
var NotifyType;
(function (NotifyType) {
    NotifyType[NotifyType["Slot"] = 0] = "Slot";
    NotifyType[NotifyType["Transport"] = 1] = "Transport";
    NotifyType[NotifyType["Remote"] = 2] = "Remote";
    NotifyType[NotifyType["Configuration"] = 3] = "Configuration";
})(NotifyType = exports.NotifyType || (exports.NotifyType = {}));
var CommandNames;
(function (CommandNames) {
    CommandNames["DeviceInfoCommand"] = "device info";
    CommandNames["DiskListCommand"] = "disk list";
    CommandNames["PreviewCommand"] = "preview";
    CommandNames["PlayCommand"] = "play";
    CommandNames["PlayrangeSetCommand"] = "playrange set";
    CommandNames["PlayrangeClearCommand"] = "playrange clear";
    CommandNames["RecordCommand"] = "record";
    CommandNames["StopCommand"] = "stop";
    CommandNames["ClipsCountCommand"] = "clips count";
    CommandNames["ClipsGetCommand"] = "clips get";
    CommandNames["ClipsAddCommand"] = "clips add";
    CommandNames["ClipsClearCommand"] = "clips clear";
    CommandNames["TransportInfoCommand"] = "transport info";
    CommandNames["SlotInfoCommand"] = "slot info";
    CommandNames["SlotSelectCommand"] = "slot select";
    CommandNames["NotifyCommand"] = "notify";
    CommandNames["GoToCommand"] = "goto";
    CommandNames["JogCommand"] = "jog";
    CommandNames["ShuttleCommand"] = "shuttle";
    CommandNames["RemoteCommand"] = "remote";
    CommandNames["ConfigurationCommand"] = "configuration";
    CommandNames["UptimeCommand"] = "uptime";
    CommandNames["FormatCommand"] = "format";
    CommandNames["IdentifyCommand"] = "identify";
    CommandNames["WatchdogCommand"] = "watchdog";
    CommandNames["PingCommand"] = "ping";
})(CommandNames = exports.CommandNames || (exports.CommandNames = {}));
exports.ParameterMap = {
    help: [],
    commands: [],
    'device info': [],
    'disk list': ['slot id'],
    quit: [],
    ping: [],
    preview: ['enable'],
    play: ['speed', 'loop', 'single clip'],
    'playrange set': ['clip id', 'in', 'out'],
    'playrange clear': [],
    record: ['name'],
    stop: [],
    'clips count': [],
    'clips get': ['clip id', 'count'],
    'clips add': ['name'],
    'clips clear': [],
    'transport info': [],
    'slot info': ['slot id'],
    'slot select': ['slot id', 'video format'],
    notify: ['remote', 'transport', 'slot', 'configuration', 'dropped frames'],
    goto: ['clip id', 'clip', 'timeline', 'timecode', 'slot id'],
    jog: ['timecode'],
    shuttle: ['speed'],
    remote: ['enable', 'override'],
    configuration: ['video input', 'audio input', 'file format'],
    uptime: [],
    format: ['prepare', 'confirm'],
    identify: ['enable'],
    watchdog: ['period']
};
var SlotStatus;
(function (SlotStatus) {
    SlotStatus["EMPTY"] = "empty";
    SlotStatus["MOUNTING"] = "mounting";
    SlotStatus["ERROR"] = "error";
    SlotStatus["MOUNTED"] = "mounted";
})(SlotStatus = exports.SlotStatus || (exports.SlotStatus = {}));
var VideoFormat;
(function (VideoFormat) {
    VideoFormat["NTSC"] = "NTSC";
    VideoFormat["PAL"] = "PAL";
    VideoFormat["NTSCp"] = "NTSCp";
    VideoFormat["PALp"] = "PALp";
    VideoFormat["_720p50"] = "720p50";
    VideoFormat["_720p5994"] = "720p5994";
    VideoFormat["_720p60"] = "720p60";
    VideoFormat["_1080p23976"] = "1080p23976";
    VideoFormat["_1080p24"] = "1080p24";
    VideoFormat["_1080p25"] = "1080p25";
    VideoFormat["_1080p2997"] = "1080p2997";
    VideoFormat["_1080p30"] = "1080p30";
    VideoFormat["_1080i50"] = "1080i50";
    VideoFormat["_1080i5994"] = "1080i5994";
    VideoFormat["_1080i60"] = "1080i60";
    VideoFormat["_4Kp23976"] = "4Kp23976";
    VideoFormat["_4Kp24"] = "4Kp24";
    VideoFormat["_4Kp25"] = "4Kp25";
    VideoFormat["_4Kp2997"] = "4Kp2997";
    VideoFormat["_4Kp30"] = "4Kp30";
    VideoFormat["_4Kp50"] = "4Kp50";
    VideoFormat["_4Kp5994"] = "4Kp5994";
    VideoFormat["_4Kp60"] = "4Kp60";
})(VideoFormat = exports.VideoFormat || (exports.VideoFormat = {}));
var TransportStatus;
(function (TransportStatus) {
    TransportStatus["PREVIEW"] = "preview";
    TransportStatus["STOPPED"] = "stopped";
    TransportStatus["PLAY"] = "play";
    TransportStatus["FORWARD"] = "forward";
    TransportStatus["REWIND"] = "rewind";
    TransportStatus["JOG"] = "jog";
    TransportStatus["SHUTTLE"] = "shuttle";
    TransportStatus["RECORD"] = "record";
})(TransportStatus = exports.TransportStatus || (exports.TransportStatus = {}));
var FileFormats;
(function (FileFormats) {
    FileFormats["QuickTimeUncompressed"] = "QuickTimeUncompressed";
    FileFormats["QuickTimeProResHQ"] = "QuickTimeProResHQ";
    FileFormats["QuickTimeProRes"] = "QuickTimeProRes";
    FileFormats["QuickTimeProResLT"] = "QuickTimeProResLT";
    FileFormats["QuickTimeProResProxy"] = "QuickTimeProResProxy";
    FileFormats["QuickTimeDNxHR220"] = "QuickTimeDNxHR220";
    FileFormats["DNxHR220"] = "DNxHR220";
})(FileFormats = exports.FileFormats || (exports.FileFormats = {}));
var AudioInputs;
(function (AudioInputs) {
    AudioInputs["embedded"] = "embedded";
    AudioInputs["XLR"] = "XLR";
    AudioInputs["RCA"] = "RCA";
})(AudioInputs = exports.AudioInputs || (exports.AudioInputs = {}));
var VideoInputs;
(function (VideoInputs) {
    VideoInputs["SDI"] = "SDI";
    VideoInputs["HDMI"] = "HDMI";
    VideoInputs["component"] = "component";
})(VideoInputs = exports.VideoInputs || (exports.VideoInputs = {}));
//# sourceMappingURL=types.js.map