const NcmDecrypt = require("./ncm");
const KwmDecrypt = require("./kwm");
const QmcDecrypt = require("./qmc");
const RawDecrypt = require("./raw");
const TmDecrypt = require("./tm");

export async function CommonDecrypt(file) {
    let raw_ext = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length).toLowerCase();
    let raw_filename = file.name.substring(0, file.name.lastIndexOf("."));
    let rt_data;
    switch (raw_ext) {
        case "ncm":// Netease Mp3/Flac
            rt_data = await NcmDecrypt.Decrypt(file.raw, raw_filename, raw_ext);
            break;
        case "kwm"://Kuwo Mp3/Flac
            rt_data = await KwmDecrypt.Decrypt(file.raw, raw_filename, raw_ext);
            break
        case "mp3":// Raw Mp3
        case "flac"://Raw Flac
        case "m4a":// Raw M4a
        case "ogg":// Raw Ogg
            rt_data = await RawDecrypt.Decrypt(file.raw, raw_filename, raw_ext);
            break;
        case "tm0":// QQ Music IOS Mp3
        case "tm3":// QQ Music IOS Mp3
            rt_data = await RawDecrypt.Decrypt(file.raw, raw_filename, "mp3");
            break;
        case "qmc3"://QQ Music Android Mp3
        case "qmc2"://QQ Music Android Ogg
        case "qmc0"://QQ Music Android Mp3
        case "qmcflac"://QQ Music Android Flac
        case "qmcogg"://QQ Music Android Ogg
        case "tkm"://QQ Music Accompaniment M4a
        case "bkcmp3"://Moo Music Mp3
        case "bkcflac"://Moo Music Flac
        case "mflac"://QQ Music Desktop Flac
        case "mgg": //QQ Music Desktop Ogg
            rt_data = await QmcDecrypt.Decrypt(file.raw, raw_filename, raw_ext);
            break;
        case "tm2":// QQ Music IOS M4a
        case "tm6":// QQ Music IOS M4a
            rt_data = await TmDecrypt.Decrypt(file.raw, raw_filename);
            break;
        default:
            rt_data = {status: false, message: "不支持此文件格式",}
    }

    rt_data.rawExt = raw_ext;
    rt_data.rawFilename = raw_filename;

    return rt_data;
}
