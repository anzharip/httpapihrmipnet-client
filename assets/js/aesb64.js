"use strict";

// function _base64ToArrayBuffer(base64) {
//     var binary_string = window.atob(base64);
//     var len = binary_string.length;
//     var bytes = new Uint8Array(len);
//     // return bytes;
//     for (var i = 0; i < len; i++) {
//         bytes[i] = binary_string.charCodeAt(i);
//     }
//     return bytes.buffer;
// }

function base64ToUInt8(s) {
    return new Uint8Array(atob(s).split('').map(charCodeAt))
}

function charCodeAt(c) {
    return c.charCodeAt(0)
}

class AESData {
    constructor(key, data) {
        this.key = base64ToUInt8(key);
        // this.key = Buffer.from(key, "base64");
        this.data = aesjs.utils.utf8.toBytes(data);
    };
    encrypt() {
        var aesCtr = new aesjs.ModeOfOperation.ctr(this.key);
        var encryptedBytes = aesCtr.encrypt(this.data);
        var b64_encryptedBytes = Buffer.from(encryptedBytes).toString("base64");
        return b64_encryptedBytes;
    }
}

class AESCipher {
    constructor(key, data) {
        // this.key = Buffer.from(key, "base64");
        // this.data = Buffer.from(data, "base64");
        this.key = base64ToUInt8(key);
        this.data = base64ToUInt8(data);
    };
    decrypt() {
        var aesCtr = new aesjs.ModeOfOperation.ctr(this.key);
        var decryptedBytes = aesCtr.decrypt(this.data);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText
    }

}