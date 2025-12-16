
var e = {};
var l = {
    exports: e,
};
function s() {
    var e = "Input must be an string, Buffer or Uint8Array";
    function t(t) {
        var n;
        if (t instanceof Uint8Array) {
            n = t;
        } else if (t instanceof Buffer) {
            n = new Uint8Array(t);
        } else if (typeof t == "string") {
            n = new Uint8Array(Buffer.from(t, "utf8"));
        } else {
            throw new Error(e);
        }
        return n;
    }
    function n(e) {
        return Array.prototype.map
            .call(e, function (e) {
                return (e < 16 ? "0" : "") + e.toString(16);
            })
            .join("");
    }
    function r(e) {
        return (4294967296 + e).toString(16).substring(1);
    }
    function o(e, t, n) {
        var o = "\n" + e + " = ";
        for (var a = 0; a < t.length; a += 2) {
            if (n === 32) {
                o += r(t[a]).toUpperCase();
                o += " ";
                o += r(t[a + 1]).toUpperCase();
            } else if (n === 64) {
                o += r(t[a + 1]).toUpperCase();
                o += r(t[a]).toUpperCase();
            } else {
                throw new Error("Invalid size " + n);
            }
            if (a % 6 === 4) {
                o += "\n" + new Array(e.length + 4).join(" ");
            } else if (a < t.length - 2) {
                o += " ";
            }
        }
    }
    function a(e, t, n) {
        var r = new Date().getTime();
        var o = new Uint8Array(t);
        for (var a = 0; a < t; a++) {
            o[a] = a % 256;
        }
        var i = new Date().getTime();
        "" + (i - r);
        r = i;
        a = 0;
        for (; a < n; a++) {
            var l = e(o);
            var s = new Date().getTime();
            var u = s - r;
            r = s;
            "" + u + l.substring(0, 20);
            Math.round((t / 1048576 / (u / 1000)) * 100) / 100 + "";
        }
    }
    l.exports = {
        normalizeInput: t,
        toHex: n,
        debugPrint: o,
        testSpeed: a,
    };
}
var u = false;
function c() {
    if (!u) {
        u = true;
        s();
    }
    return l.exports;
}
var d = {};
var m = {
    exports: d,
};
function p() {
    var e = c();
    function t(e, t, n) {
        var r = e[t] + e[n];
        var o = e[t + 1] + e[n + 1];
        if (r >= 4294967296) {
            o++;
        }
        e[t] = r;
        e[t + 1] = o;
    }
    function n(e, t, n, r) {
        var o = e[t] + n;
        if (n < 0) {
            o += 4294967296;
        }
        var a = e[t + 1] + r;
        if (o >= 4294967296) {
            a++;
        }
        e[t] = o;
        e[t + 1] = a;
    }
    function r(e, t) {
        return (
            e[t] ^ (e[t + 1] << 8) ^ (e[t + 2] << 16) ^ (e[t + 3] << 24)
        );
    }
    function o(e, r, o, a, i, l) {
        var c = u[i];
        var d = u[i + 1];
        var m = u[l];
        var p = u[l + 1];
        t(s, e, r);
        n(s, e, c, d);
        var _ = s[a] ^ s[e];
        var f = s[a + 1] ^ s[e + 1];
        s[a] = f;
        s[a + 1] = _;
        t(s, o, a);
        _ = s[r] ^ s[o];
        f = s[r + 1] ^ s[o + 1];
        s[r] = (_ >>> 24) ^ (f << 8);
        s[r + 1] = (f >>> 24) ^ (_ << 8);
        t(s, e, r);
        n(s, e, m, p);
        _ = s[a] ^ s[e];
        f = s[a + 1] ^ s[e + 1];
        s[a] = (_ >>> 16) ^ (f << 16);
        s[a + 1] = (f >>> 16) ^ (_ << 16);
        t(s, o, a);
        _ = s[r] ^ s[o];
        f = s[r + 1] ^ s[o + 1];
        s[r] = (f >>> 31) ^ (_ << 1);
        s[r + 1] = (_ >>> 31) ^ (f << 1);
    }
    var a = new Uint32Array([
        4089235720, 1779033703, 2227873595, 3144134277, 4271175723,
        1013904242, 1595750129, 2773480762, 2917565137, 1359893119,
        725511199, 2600822924, 4215389547, 528734635, 327033209,
        1541459225,
    ]);
    var i = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4,
        8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2,
        15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2,
        6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12,
        6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1,
        9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11,
        7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11,
        3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15,
        11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7,
        5, 3,
    ];
    var l = new Uint8Array(
        i.map(function (e) {
            return e * 2;
        })
    );
    var s = new Uint32Array(32);
    var u = new Uint32Array(32);
    function d(e, t) {
        var n = 0;
        for (n = 0; n < 16; n++) {
            s[n] = e.h[n];
            s[n + 16] = a[n];
        }
        s[24] = s[24] ^ e.t;
        s[25] = s[25] ^ (e.t / 4294967296);
        if (t) {
            s[28] = ~s[28];
            s[29] = ~s[29];
        }
        n = 0;
        for (; n < 32; n++) {
            u[n] = r(e.b, n * 4);
        }
        for (n = 0; n < 12; n++) {
            o(0, 8, 16, 24, l[n * 16 + 0], l[n * 16 + 1]);
            o(2, 10, 18, 26, l[n * 16 + 2], l[n * 16 + 3]);
            o(4, 12, 20, 28, l[n * 16 + 4], l[n * 16 + 5]);
            o(6, 14, 22, 30, l[n * 16 + 6], l[n * 16 + 7]);
            o(0, 10, 20, 30, l[n * 16 + 8], l[n * 16 + 9]);
            o(2, 12, 22, 24, l[n * 16 + 10], l[n * 16 + 11]);
            o(4, 14, 16, 26, l[n * 16 + 12], l[n * 16 + 13]);
            o(6, 8, 18, 28, l[n * 16 + 14], l[n * 16 + 15]);
        }
        for (n = 0; n < 16; n++) {
            e.h[n] = e.h[n] ^ s[n] ^ s[n + 16];
        }
    }
    function p(e, t) {
        if (e === 0 || e > 64) {
            throw new Error(
                "Illegal output length, expected 0 < length <= 64"
            );
        }
        if (t && t.length > 64) {
            throw new Error(
                "Illegal key, expected Uint8Array with 0 < length <= 64"
            );
        }
        var n = {
            b: new Uint8Array(128),
            h: new Uint32Array(16),
            t: 0,
            c: 0,
            outlen: e,
        };
        for (var r = 0; r < 16; r++) {
            n.h[r] = a[r];
        }
        var o = t ? t.length : 0;
        n.h[0] ^= (o << 8) ^ 16842752 ^ e;
        if (t) {
            _(n, t);
            n.c = 128;
        }
        return n;
    }
    function _(e, t) {
        for (var n = 0; n < t.length; n++) {
            if (e.c === 128) {
                e.t += e.c;
                d(e, false);
                e.c = 0;
            }
            e.b[e.c++] = t[n];
        }
    }
    function f(e) {
        for (e.t += e.c; e.c < 128; ) {
            e.b[e.c++] = 0;
        }
        d(e, true);
        var t = new Uint8Array(e.outlen);
        for (var n = 0; n < e.outlen; n++) {
            t[n] = e.h[n >> 2] >> ((n & 3) * 8);
        }
        return t;
    }
    function g(t, n, r) {
        r = r || 64;
        t = e.normalizeInput(t);
        var o = p(r, n);
        _(o, t);
        return f(o);
    }
    function h(t, n, r) {
        var o = g(t, n, r);
        return e.toHex(o);
    }
    m.exports = {
        blake2b: g,
        blake2bHex: h,
        blake2bInit: p,
        blake2bUpdate: _,
        blake2bFinal: f,
    };
}
var _ = false;
function f() {
    if (!_) {
        _ = true;
        p();
    }
    return m.exports;
}
var g = {};
var h = {
    exports: g,
};
function y() {
    var e = c();
    function t(e, t) {
        return (
            e[t] ^ (e[t + 1] << 8) ^ (e[t + 2] << 16) ^ (e[t + 3] << 24)
        );
    }
    function n(e, t, n, o, a, l) {
        i[e] = i[e] + i[t] + a;
        i[o] = r(i[o] ^ i[e], 16);
        i[n] = i[n] + i[o];
        i[t] = r(i[t] ^ i[n], 12);
        i[e] = i[e] + i[t] + l;
        i[o] = r(i[o] ^ i[e], 8);
        i[n] = i[n] + i[o];
        i[t] = r(i[t] ^ i[n], 7);
    }
    function r(e, t) {
        return (e >>> t) ^ (e << (32 - t));
    }
    var o = new Uint32Array([
        1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
        2600822924, 528734635, 1541459225,
    ]);
    var a = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4,
        8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2,
        15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2,
        6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12,
        6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1,
        9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11,
        7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11,
        3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15,
        11, 9, 14, 3, 12, 13, 0,
    ]);
    var i = new Uint32Array(16);
    var l = new Uint32Array(16);
    function s(e, r) {
        var s = 0;
        for (s = 0; s < 8; s++) {
            i[s] = e.h[s];
            i[s + 8] = o[s];
        }
        i[12] ^= e.t;
        i[13] ^= e.t / 4294967296;
        if (r) {
            i[14] = ~i[14];
        }
        s = 0;
        for (; s < 16; s++) {
            l[s] = t(e.b, s * 4);
        }
        for (s = 0; s < 10; s++) {
            n(0, 4, 8, 12, l[a[s * 16 + 0]], l[a[s * 16 + 1]]);
            n(1, 5, 9, 13, l[a[s * 16 + 2]], l[a[s * 16 + 3]]);
            n(2, 6, 10, 14, l[a[s * 16 + 4]], l[a[s * 16 + 5]]);
            n(3, 7, 11, 15, l[a[s * 16 + 6]], l[a[s * 16 + 7]]);
            n(0, 5, 10, 15, l[a[s * 16 + 8]], l[a[s * 16 + 9]]);
            n(1, 6, 11, 12, l[a[s * 16 + 10]], l[a[s * 16 + 11]]);
            n(2, 7, 8, 13, l[a[s * 16 + 12]], l[a[s * 16 + 13]]);
            n(3, 4, 9, 14, l[a[s * 16 + 14]], l[a[s * 16 + 15]]);
        }
        for (s = 0; s < 8; s++) {
            e.h[s] ^= i[s] ^ i[s + 8];
        }
    }
    function u(e, t) {
        if (!(e > 0) || !(e <= 32)) {
            throw new Error(
                "Incorrect output length, should be in [1, 32]"
            );
        }
        var n = t ? t.length : 0;
        if (t && (!(n > 0) || !(n <= 32))) {
            throw new Error(
                "Incorrect key length, should be in [1, 32]"
            );
        }
        var r = {
            h: new Uint32Array(o),
            b: new Uint32Array(64),
            c: 0,
            t: 0,
            outlen: e,
        };
        r.h[0] ^= (n << 8) ^ 16842752 ^ e;
        if (n > 0) {
            d(r, t);
            r.c = 64;
        }
        return r;
    }
    function d(e, t) {
        for (var n = 0; n < t.length; n++) {
            if (e.c === 64) {
                e.t += e.c;
                s(e, false);
                e.c = 0;
            }
            e.b[e.c++] = t[n];
        }
    }
    function m(e) {
        for (e.t += e.c; e.c < 64; ) {
            e.b[e.c++] = 0;
        }
        s(e, true);
        var t = new Uint8Array(e.outlen);
        for (var n = 0; n < e.outlen; n++) {
            t[n] = (e.h[n >> 2] >> ((n & 3) * 8)) & 255;
        }
        return t;
    }
    function p(t, n, r) {
        r = r || 32;
        t = e.normalizeInput(t);
        var o = u(r, n);
        d(o, t);
        return m(o);
    }
    function _(t, n, r) {
        var o = p(t, n, r);
        return e.toHex(o);
    }
    h.exports = {
        blake2s: p,
        blake2sHex: _,
        blake2sInit: u,
        blake2sUpdate: d,
        blake2sFinal: m,
    };
}
var C = false;
function b() {
    if (!C) {
        C = true;
        y();
    }
    return h.exports;
}
var v = {};
var S = {
    exports: v,
};
function R() {
    var e = f();
    var t = b();
    S.exports = {
        blake2b: e.blake2b,
        blake2bHex: e.blake2bHex,
        blake2bInit: e.blake2bInit,
        blake2bUpdate: e.blake2bUpdate,
        blake2bFinal: e.blake2bFinal,
        blake2s: t.blake2s,
        blake2sHex: t.blake2sHex,
        blake2sInit: t.blake2sInit,
        blake2sUpdate: t.blake2sUpdate,
        blake2sFinal: t.blake2sFinal,
    };
}
var L = false;
function E() {
    if (!L) {
        L = true;
        R();
    }
    return S.exports;
}
function k(e) {
    switch (e) {
        case undefined:
            return E();
        case "/blake2b":
            return f();
    }
}
module.exports = k;