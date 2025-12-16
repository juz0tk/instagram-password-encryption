const tweetnacl = require("./js/tweetnacl")();
const blake2b = require("./js/blake2b")();

var u2 = 64;
var c2 = 1;
var d2 = 1;
var m2 = 1;
var p2 = 2;
var _2 = 32;
var f2 = 16;
var overHeadLength = 48;
var g = d2 + m2 + p2 + _2 + overHeadLength + f2;

function decodeUTF8(plain: string) {
    var n = unescape(encodeURIComponent(plain));
    var r = new Uint8Array(n.length);
    for (let t = 0; t < n.length; t++) {
        r[t] = n.charCodeAt(t);
    }

    return r;
}

function hexStringToUint8Array(hexString: string): Uint8Array {
    var byteArray: number[] = [];
    for (var i = 0; i < hexString.length; i += 2) {
        byteArray.push(parseInt(hexString.slice(i, i + 2), 16));
    }

    return new Uint8Array(byteArray);
}

// function l(e, t) {

// }

function zeroArray(arr: Uint8Array | number[]) {
    for (var i = 0; i < arr.length; i++)
        arr[i] = 0;
}

function blake2bShift(e: Uint8Array, t: Uint8Array): Uint8Array {
    var n = blake2b.blake2bInit(tweetnacl.box.nonceLength, null);
    blake2b.blake2bUpdate(n, e);
    blake2b.blake2bUpdate(n, t);
    return blake2b.blake2bFinal(n);
}

function seal(e: Uint8Array, t: Uint8Array) {
    var n = new Uint8Array(overHeadLength + e.length);
    var r = tweetnacl.box.keyPair();
    n.set(r.publicKey);
    var s = Object(blake2bShift)(r.publicKey, t);
    var u = tweetnacl.box(e, s, t, r.secretKey);
    n.set(u, r.publicKey.length);
    Object(zeroArray)(r.secretKey);
    return n;
}

function encodeBase64(e: Uint8Array) {
    var t;
    var n = [];
    var r = e.length;
    for (t = 0; t < r; t++) {
        n.push(String.fromCharCode(e[t]));
    }
    return btoa(n.join(""));
}

function encrypt(keyId: number, publicKey: string, decodedPassword: Uint8Array, decodedTimestamp: Uint8Array) {
    var l = g + decodedPassword.length;
    if (publicKey.length != u2) {
        throw new Error("public key is not a valid hex string.");
    }

    var C = hexStringToUint8Array(publicKey);
    if (!C) {
        throw new Error("public key is not a valid hex string");
    }

    var b = new Uint8Array(l);
    var v = 0;
    b[v] = c2;
    v += d2;
    b[v] = keyId;
    v += m2;

    var S = {
        name: "AES-GCM",
        length: _2 * 8,
    };
    var R = {
        name: "AES-GCM",
        iv: new Uint8Array(12),
        additionalData: decodedTimestamp,
        tagLen: f2,
    };

    return crypto.subtle
        .generateKey(S, true, ["encrypt", "decrypt"])
        .then(function (t) {
            var r = crypto.subtle.exportKey("raw", t);
            var o = crypto.subtle.encrypt(R, t, decodedPassword.buffer as ArrayBuffer);
            return Promise.all([r, o]);
        })
        .then(function (e) {
            var t = new Uint8Array(e[0]);
            var n = seal(t, C);
            b[v] = n.length & 255;
            b[v + 1] = (n.length >> 8) & 255;
            v += p2;
            b.set(n, v);
            v += _2;
            v += 48;
            if (n.length !== _2 + 48) {
                throw new Error("encrypted key is the wrong length");
            }
            var o = new Uint8Array(e[1]);
            var a = o.slice(-f2);
            var i = o.slice(0, -f2);
            b.set(a, v);
            v += f2;
            b.set(i, v);
            return b;
        });
}

function encryptPassword(keyId: number, publicKey: string, password: string, timestamp: string, version: number, tag: string) {
    var decodedPassword = decodeUTF8(password);
    var decodedTimestamp = decodeUTF8(timestamp);

    return encrypt(keyId, publicKey, decodedPassword, decodedTimestamp)
        .then(function (e) {
            return [tag, version, timestamp, encodeBase64(e)].join(":");
        });
}

(async () => {
    let password = await encryptPassword(170, "76588afa109d44bd3a90d0e9e679b4f6b1658034a8e431482331bcec5aefca4d", "your_password", Math.floor(Date.now() / 1000).toString(), 10, "#PWD_INSTAGRAM_BROWSER");
    console.log(password);
})();