var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-m6qtEp/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// ../garden-api.js
var fg = Object.create;
var _u = Object.defineProperty;
var pg = Object.getOwnPropertyDescriptor;
var dg = Object.getOwnPropertyNames;
var hg = Object.getPrototypeOf;
var mg = Object.prototype.hasOwnProperty;
var fp = /* @__PURE__ */ __name((t15, e) => () => {
  try {
    return e || t15((e = { exports: {} }).exports, e), e.exports;
  } catch (r) {
    throw e = 0, r;
  }
}, "fp");
var Ut = /* @__PURE__ */ __name((t15, e) => {
  for (var r in e)
    _u(t15, r, { get: e[r], enumerable: true });
}, "Ut");
var yg = /* @__PURE__ */ __name((t15, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of dg(e))
      !mg.call(t15, n) && n !== r && _u(t15, n, { get: () => e[n], enumerable: !(o = pg(e, n)) || o.enumerable });
  return t15;
}, "yg");
var Cu = /* @__PURE__ */ __name((t15, e, r) => (r = t15 != null ? fg(hg(t15)) : {}, yg(e || !t15 || !t15.__esModule ? _u(r, "default", { value: t15, enumerable: true }) : r, t15)), "Cu");
var Lu = fp((Fn) => {
  "use strict";
  var tv = "[object ArrayBuffer]", Sr = /* @__PURE__ */ __name(class t15 {
    static isArrayBuffer(e) {
      return Object.prototype.toString.call(e) === tv;
    }
    static toArrayBuffer(e) {
      return this.isArrayBuffer(e) ? e : e.byteLength === e.buffer.byteLength || e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : this.toUint8Array(e.buffer).slice(e.byteOffset, e.byteOffset + e.byteLength).buffer;
    }
    static toUint8Array(e) {
      return this.toView(e, Uint8Array);
    }
    static toView(e, r) {
      if (e.constructor === r)
        return e;
      if (this.isArrayBuffer(e))
        return new r(e);
      if (this.isArrayBufferView(e))
        return new r(e.buffer, e.byteOffset, e.byteLength);
      throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
    }
    static isBufferSource(e) {
      return this.isArrayBufferView(e) || this.isArrayBuffer(e);
    }
    static isArrayBufferView(e) {
      return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer);
    }
    static isEqual(e, r) {
      let o = t15.toUint8Array(e), n = t15.toUint8Array(r);
      if (o.length !== n.byteLength)
        return false;
      for (let i = 0; i < o.length; i++)
        if (o[i] !== n[i])
          return false;
      return true;
    }
    static concat(...e) {
      let r;
      Array.isArray(e[0]) && !(e[1] instanceof Function) || Array.isArray(e[0]) && e[1] instanceof Function ? r = e[0] : e[e.length - 1] instanceof Function ? r = e.slice(0, e.length - 1) : r = e;
      let o = 0;
      for (let s of r)
        o += s.byteLength;
      let n = new Uint8Array(o), i = 0;
      for (let s of r) {
        let c = this.toUint8Array(s);
        n.set(c, i), i += c.length;
      }
      return e[e.length - 1] instanceof Function ? this.toView(n, e[e.length - 1]) : n.buffer;
    }
  }, "t"), Uu = "string", rv = /^[0-9a-f\s]+$/i, ov = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, nv = /^[a-zA-Z0-9-_]+$/, Ga = /* @__PURE__ */ __name(class {
    static fromString(e) {
      let r = unescape(encodeURIComponent(e)), o = new Uint8Array(r.length);
      for (let n = 0; n < r.length; n++)
        o[n] = r.charCodeAt(n);
      return o.buffer;
    }
    static toString(e) {
      let r = Sr.toUint8Array(e), o = "";
      for (let i = 0; i < r.length; i++)
        o += String.fromCharCode(r[i]);
      return decodeURIComponent(escape(o));
    }
  }, "Ga"), vt = /* @__PURE__ */ __name(class {
    static toString(e, r = false) {
      let o = Sr.toArrayBuffer(e), n = new DataView(o), i = "";
      for (let s = 0; s < o.byteLength; s += 2) {
        let c = n.getUint16(s, r);
        i += String.fromCharCode(c);
      }
      return i;
    }
    static fromString(e, r = false) {
      let o = new ArrayBuffer(e.length * 2), n = new DataView(o);
      for (let i = 0; i < e.length; i++)
        n.setUint16(i * 2, e.charCodeAt(i), r);
      return o;
    }
  }, "vt"), Wa = /* @__PURE__ */ __name(class t15 {
    static isHex(e) {
      return typeof e === Uu && rv.test(e);
    }
    static isBase64(e) {
      return typeof e === Uu && ov.test(e);
    }
    static isBase64Url(e) {
      return typeof e === Uu && nv.test(e);
    }
    static ToString(e, r = "utf8") {
      let o = Sr.toUint8Array(e);
      switch (r.toLowerCase()) {
        case "utf8":
          return this.ToUtf8String(o);
        case "binary":
          return this.ToBinary(o);
        case "hex":
          return this.ToHex(o);
        case "base64":
          return this.ToBase64(o);
        case "base64url":
          return this.ToBase64Url(o);
        case "utf16le":
          return vt.toString(o, true);
        case "utf16":
        case "utf16be":
          return vt.toString(o);
        default:
          throw new Error(`Unknown type of encoding '${r}'`);
      }
    }
    static FromString(e, r = "utf8") {
      if (!e)
        return new ArrayBuffer(0);
      switch (r.toLowerCase()) {
        case "utf8":
          return this.FromUtf8String(e);
        case "binary":
          return this.FromBinary(e);
        case "hex":
          return this.FromHex(e);
        case "base64":
          return this.FromBase64(e);
        case "base64url":
          return this.FromBase64Url(e);
        case "utf16le":
          return vt.fromString(e, true);
        case "utf16":
        case "utf16be":
          return vt.fromString(e);
        default:
          throw new Error(`Unknown type of encoding '${r}'`);
      }
    }
    static ToBase64(e) {
      let r = Sr.toUint8Array(e);
      if (typeof btoa < "u") {
        let o = this.ToString(r, "binary");
        return btoa(o);
      } else
        return Buffer.from(r).toString("base64");
    }
    static FromBase64(e) {
      let r = this.formatString(e);
      if (!r)
        return new ArrayBuffer(0);
      if (!t15.isBase64(r))
        throw new TypeError("Argument 'base64Text' is not Base64 encoded");
      return typeof atob < "u" ? this.FromBinary(atob(r)) : new Uint8Array(Buffer.from(r, "base64")).buffer;
    }
    static FromBase64Url(e) {
      let r = this.formatString(e);
      if (!r)
        return new ArrayBuffer(0);
      if (!t15.isBase64Url(r))
        throw new TypeError("Argument 'base64url' is not Base64Url encoded");
      return this.FromBase64(this.Base64Padding(r.replace(/\-/g, "+").replace(/\_/g, "/")));
    }
    static ToBase64Url(e) {
      return this.ToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    }
    static FromUtf8String(e, r = t15.DEFAULT_UTF8_ENCODING) {
      switch (r) {
        case "ascii":
          return this.FromBinary(e);
        case "utf8":
          return Ga.fromString(e);
        case "utf16":
        case "utf16be":
          return vt.fromString(e);
        case "utf16le":
        case "usc2":
          return vt.fromString(e, true);
        default:
          throw new Error(`Unknown type of encoding '${r}'`);
      }
    }
    static ToUtf8String(e, r = t15.DEFAULT_UTF8_ENCODING) {
      switch (r) {
        case "ascii":
          return this.ToBinary(e);
        case "utf8":
          return Ga.toString(e);
        case "utf16":
        case "utf16be":
          return vt.toString(e);
        case "utf16le":
        case "usc2":
          return vt.toString(e, true);
        default:
          throw new Error(`Unknown type of encoding '${r}'`);
      }
    }
    static FromBinary(e) {
      let r = e.length, o = new Uint8Array(r);
      for (let n = 0; n < r; n++)
        o[n] = e.charCodeAt(n);
      return o.buffer;
    }
    static ToBinary(e) {
      let r = Sr.toUint8Array(e), o = "";
      for (let n = 0; n < r.length; n++)
        o += String.fromCharCode(r[n]);
      return o;
    }
    static ToHex(e) {
      let r = Sr.toUint8Array(e), o = "", n = r.length;
      for (let i = 0; i < n; i++) {
        let s = r[i];
        s < 16 && (o += "0"), o += s.toString(16);
      }
      return o;
    }
    static FromHex(e) {
      let r = this.formatString(e);
      if (!r)
        return new ArrayBuffer(0);
      if (!t15.isHex(r))
        throw new TypeError("Argument 'hexString' is not HEX encoded");
      r.length % 2 && (r = `0${r}`);
      let o = new Uint8Array(r.length / 2);
      for (let n = 0; n < r.length; n = n + 2) {
        let i = r.slice(n, n + 2);
        o[n / 2] = parseInt(i, 16);
      }
      return o.buffer;
    }
    static ToUtf16String(e, r = false) {
      return vt.toString(e, r);
    }
    static FromUtf16String(e, r = false) {
      return vt.fromString(e, r);
    }
    static Base64Padding(e) {
      let r = 4 - e.length % 4;
      if (r < 4)
        for (let o = 0; o < r; o++)
          e += "=";
      return e;
    }
    static formatString(e) {
      return e?.replace(/[\n\r\t ]/g, "") || "";
    }
  }, "t");
  Wa.DEFAULT_UTF8_ENCODING = "utf8";
  function iv(t15, ...e) {
    let r = arguments[0];
    for (let o = 1; o < arguments.length; o++) {
      let n = arguments[o];
      for (let i in n)
        r[i] = n[i];
    }
    return r;
  }
  __name(iv, "iv");
  function sv(...t15) {
    let e = t15.map((n) => n.byteLength).reduce((n, i) => n + i), r = new Uint8Array(e), o = 0;
    return t15.map((n) => new Uint8Array(n)).forEach((n) => {
      for (let i of n)
        r[o++] = i;
    }), r.buffer;
  }
  __name(sv, "sv");
  function av(t15, e) {
    if (!(t15 && e) || t15.byteLength !== e.byteLength)
      return false;
    let r = new Uint8Array(t15), o = new Uint8Array(e);
    for (let n = 0; n < t15.byteLength; n++)
      if (r[n] !== o[n])
        return false;
    return true;
  }
  __name(av, "av");
  Fn.BufferSourceConverter = Sr;
  Fn.Convert = Wa;
  Fn.assign = iv;
  Fn.combine = sv;
  Fn.isEqual = av;
});
var Eh = fp(() => {
  var xh;
  (function(t15) {
    (function(e) {
      var r = typeof globalThis == "object" ? globalThis : typeof global == "object" ? global : typeof self == "object" ? self : typeof this == "object" ? this : c(), o = n(t15);
      typeof r.Reflect < "u" && (o = n(r.Reflect, o)), e(o, r), typeof r.Reflect > "u" && (r.Reflect = t15);
      function n(l, f) {
        return function(d, h) {
          Object.defineProperty(l, d, { configurable: true, writable: true, value: h }), f && f(d, h);
        };
      }
      __name(n, "n");
      function i() {
        try {
          return Function("return this;")();
        } catch {
        }
      }
      __name(i, "i");
      function s() {
        try {
          return (0, eval)("(function() { return this; })()");
        } catch {
        }
      }
      __name(s, "s");
      function c() {
        return i() || s();
      }
      __name(c, "c");
    })(function(e, r) {
      var o = Object.prototype.hasOwnProperty, n = typeof Symbol == "function", i = n && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", s = n && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", c = typeof Object.create == "function", l = { __proto__: [] } instanceof Array, f = !c && !l, d = { create: c ? function() {
        return Su(/* @__PURE__ */ Object.create(null));
      } : l ? function() {
        return Su({ __proto__: null });
      } : function() {
        return Su({});
      }, has: f ? function(y, A) {
        return o.call(y, A);
      } : function(y, A) {
        return A in y;
      }, get: f ? function(y, A) {
        return o.call(y, A) ? y[A] : void 0;
      } : function(y, A) {
        return y[A];
      } }, h = Object.getPrototypeOf(Function), g = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : sg(), C = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : ag(), k = typeof WeakMap == "function" ? WeakMap : cg(), j = n ? Symbol.for("@reflect-metadata:registry") : void 0, D = og(), F = ng(D);
      function ne(y, A, w, B) {
        if (V(w)) {
          if (!op(y))
            throw new TypeError();
          if (!np(A))
            throw new TypeError();
          return Dt(y, A);
        } else {
          if (!op(y))
            throw new TypeError();
          if (!z(A))
            throw new TypeError();
          if (!z(B) && !V(B) && !Xt(B))
            throw new TypeError();
          return Xt(B) && (B = void 0), w = zt(w), Kr(y, A, w, B);
        }
      }
      __name(ne, "ne");
      e("decorate", ne);
      function J(y, A) {
        function w(B, $) {
          if (!z(B))
            throw new TypeError();
          if (!V($) && !tg($))
            throw new TypeError();
          qt(y, A, B, $);
        }
        __name(w, "w");
        return w;
      }
      __name(J, "J");
      e("metadata", J);
      function b(y, A, w, B) {
        if (!z(w))
          throw new TypeError();
        return V(B) || (B = zt(B)), qt(y, A, w, B);
      }
      __name(b, "b");
      e("defineMetadata", b);
      function T(y, A, w) {
        if (!z(A))
          throw new TypeError();
        return V(w) || (w = zt(w)), Be(y, A, w);
      }
      __name(T, "T");
      e("hasMetadata", T);
      function H(y, A, w) {
        if (!z(A))
          throw new TypeError();
        return V(w) || (w = zt(w)), He(y, A, w);
      }
      __name(H, "H");
      e("hasOwnMetadata", H);
      function Y(y, A, w) {
        if (!z(A))
          throw new TypeError();
        return V(w) || (w = zt(w)), Ve(y, A, w);
      }
      __name(Y, "Y");
      e("getMetadata", Y);
      function se(y, A, w) {
        if (!z(A))
          throw new TypeError();
        return V(w) || (w = zt(w)), Uo(y, A, w);
      }
      __name(se, "se");
      e("getOwnMetadata", se);
      function he(y, A) {
        if (!z(y))
          throw new TypeError();
        return V(A) || (A = zt(A)), br(y, A);
      }
      __name(he, "he");
      e("getMetadataKeys", he);
      function Le(y, A) {
        if (!z(y))
          throw new TypeError();
        return V(A) || (A = zt(A)), xr(y, A);
      }
      __name(Le, "Le");
      e("getOwnMetadataKeys", Le);
      function yt(y, A, w) {
        if (!z(A))
          throw new TypeError();
        if (V(w) || (w = zt(w)), !z(A))
          throw new TypeError();
        V(w) || (w = zt(w));
        var B = $i(A, w, false);
        return V(B) ? false : B.OrdinaryDeleteMetadata(y, A, w);
      }
      __name(yt, "yt");
      e("deleteMetadata", yt);
      function Dt(y, A) {
        for (var w = y.length - 1; w >= 0; --w) {
          var B = y[w], $ = B(A);
          if (!V($) && !Xt($)) {
            if (!np($))
              throw new TypeError();
            A = $;
          }
        }
        return A;
      }
      __name(Dt, "Dt");
      function Kr(y, A, w, B) {
        for (var $ = y.length - 1; $ >= 0; --$) {
          var be = y[$], Ie = be(A, w, B);
          if (!V(Ie) && !Xt(Ie)) {
            if (!z(Ie))
              throw new TypeError();
            B = Ie;
          }
        }
        return B;
      }
      __name(Kr, "Kr");
      function Be(y, A, w) {
        var B = He(y, A, w);
        if (B)
          return true;
        var $ = Eu(A);
        return Xt($) ? false : Be(y, $, w);
      }
      __name(Be, "Be");
      function He(y, A, w) {
        var B = $i(A, w, false);
        return V(B) ? false : Xr(B.OrdinaryHasOwnMetadata(y, A, w));
      }
      __name(He, "He");
      function Ve(y, A, w) {
        var B = He(y, A, w);
        if (B)
          return Uo(y, A, w);
        var $ = Eu(A);
        if (!Xt($))
          return Ve(y, $, w);
      }
      __name(Ve, "Ve");
      function Uo(y, A, w) {
        var B = $i(A, w, false);
        if (!V(B))
          return B.OrdinaryGetOwnMetadata(y, A, w);
      }
      __name(Uo, "Uo");
      function qt(y, A, w, B) {
        var $ = $i(w, B, true);
        $.OrdinaryDefineOwnMetadata(y, A, w, B);
      }
      __name(qt, "qt");
      function br(y, A) {
        var w = xr(y, A), B = Eu(y);
        if (B === null)
          return w;
        var $ = br(B, A);
        if ($.length <= 0)
          return w;
        if (w.length <= 0)
          return $;
        for (var be = new C(), Ie = [], re = 0, I = w; re < I.length; re++) {
          var P = I[re], M = be.has(P);
          M || (be.add(P), Ie.push(P));
        }
        for (var L = 0, ie = $; L < ie.length; L++) {
          var P = ie[L], M = be.has(P);
          M || (be.add(P), Ie.push(P));
        }
        return Ie;
      }
      __name(br, "br");
      function xr(y, A) {
        var w = $i(y, A, false);
        return w ? w.OrdinaryOwnMetadataKeys(y, A) : [];
      }
      __name(xr, "xr");
      function at(y) {
        if (y === null)
          return 1;
        switch (typeof y) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return y === null ? 1 : 6;
          default:
            return 6;
        }
      }
      __name(at, "at");
      function V(y) {
        return y === void 0;
      }
      __name(V, "V");
      function Xt(y) {
        return y === null;
      }
      __name(Xt, "Xt");
      function Dn(y) {
        return typeof y == "symbol";
      }
      __name(Dn, "Dn");
      function z(y) {
        return typeof y == "object" ? y !== null : typeof y == "function";
      }
      __name(z, "z");
      function ct(y, A) {
        switch (at(y)) {
          case 0:
            return y;
          case 1:
            return y;
          case 2:
            return y;
          case 3:
            return y;
          case 4:
            return y;
          case 5:
            return y;
        }
        var w = A === 3 ? "string" : A === 5 ? "number" : "default", B = ip(y, i);
        if (B !== void 0) {
          var $ = B.call(y, w);
          if (z($))
            throw new TypeError();
          return $;
        }
        return qr(y, w === "default" ? "number" : w);
      }
      __name(ct, "ct");
      function qr(y, A) {
        if (A === "string") {
          var w = y.toString;
          if (jn(w)) {
            var B = w.call(y);
            if (!z(B))
              return B;
          }
          var $ = y.valueOf;
          if (jn($)) {
            var B = $.call(y);
            if (!z(B))
              return B;
          }
        } else {
          var $ = y.valueOf;
          if (jn($)) {
            var B = $.call(y);
            if (!z(B))
              return B;
          }
          var be = y.toString;
          if (jn(be)) {
            var B = be.call(y);
            if (!z(B))
              return B;
          }
        }
        throw new TypeError();
      }
      __name(qr, "qr");
      function Xr(y) {
        return !!y;
      }
      __name(Xr, "Xr");
      function Lo(y) {
        return "" + y;
      }
      __name(Lo, "Lo");
      function zt(y) {
        var A = ct(y, 3);
        return Dn(A) ? A : Lo(A);
      }
      __name(zt, "zt");
      function op(y) {
        return Array.isArray ? Array.isArray(y) : y instanceof Object ? y instanceof Array : Object.prototype.toString.call(y) === "[object Array]";
      }
      __name(op, "op");
      function jn(y) {
        return typeof y == "function";
      }
      __name(jn, "jn");
      function np(y) {
        return typeof y == "function";
      }
      __name(np, "np");
      function tg(y) {
        switch (at(y)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      __name(tg, "tg");
      function xu(y, A) {
        return y === A || y !== y && A !== A;
      }
      __name(xu, "xu");
      function ip(y, A) {
        var w = y[A];
        if (w != null) {
          if (!jn(w))
            throw new TypeError();
          return w;
        }
      }
      __name(ip, "ip");
      function sp(y) {
        var A = ip(y, s);
        if (!jn(A))
          throw new TypeError();
        var w = A.call(y);
        if (!z(w))
          throw new TypeError();
        return w;
      }
      __name(sp, "sp");
      function ap(y) {
        return y.value;
      }
      __name(ap, "ap");
      function cp(y) {
        var A = y.next();
        return A.done ? false : A;
      }
      __name(cp, "cp");
      function up(y) {
        var A = y.return;
        A && A.call(y);
      }
      __name(up, "up");
      function Eu(y) {
        var A = Object.getPrototypeOf(y);
        if (typeof y != "function" || y === h || A !== h)
          return A;
        var w = y.prototype, B = w && Object.getPrototypeOf(w);
        if (B == null || B === Object.prototype)
          return A;
        var $ = B.constructor;
        return typeof $ != "function" || $ === y ? A : $;
      }
      __name(Eu, "Eu");
      function rg() {
        var y;
        !V(j) && typeof r.Reflect < "u" && !(j in r.Reflect) && typeof r.Reflect.defineMetadata == "function" && (y = ig(r.Reflect));
        var A, w, B, $ = new k(), be = { registerProvider: Ie, getProvider: I, setProvider: M };
        return be;
        function Ie(L) {
          if (!Object.isExtensible(be))
            throw new Error("Cannot add provider to a frozen registry.");
          switch (true) {
            case y === L:
              break;
            case V(A):
              A = L;
              break;
            case A === L:
              break;
            case V(w):
              w = L;
              break;
            case w === L:
              break;
            default:
              B === void 0 && (B = new C()), B.add(L);
              break;
          }
        }
        __name(Ie, "Ie");
        function re(L, ie) {
          if (!V(A)) {
            if (A.isProviderFor(L, ie))
              return A;
            if (!V(w)) {
              if (w.isProviderFor(L, ie))
                return A;
              if (!V(B))
                for (var fe = sp(B); ; ) {
                  var xe = cp(fe);
                  if (!xe)
                    return;
                  var jt = ap(xe);
                  if (jt.isProviderFor(L, ie))
                    return up(fe), jt;
                }
            }
          }
          if (!V(y) && y.isProviderFor(L, ie))
            return y;
        }
        __name(re, "re");
        function I(L, ie) {
          var fe = $.get(L), xe;
          return V(fe) || (xe = fe.get(ie)), V(xe) && (xe = re(L, ie), V(xe) || (V(fe) && (fe = new g(), $.set(L, fe)), fe.set(ie, xe))), xe;
        }
        __name(I, "I");
        function P(L) {
          if (V(L))
            throw new TypeError();
          return A === L || w === L || !V(B) && B.has(L);
        }
        __name(P, "P");
        function M(L, ie, fe) {
          if (!P(fe))
            throw new Error("Metadata provider not registered.");
          var xe = I(L, ie);
          if (xe !== fe) {
            if (!V(xe))
              return false;
            var jt = $.get(L);
            V(jt) && (jt = new g(), $.set(L, jt)), jt.set(ie, fe);
          }
          return true;
        }
        __name(M, "M");
      }
      __name(rg, "rg");
      function og() {
        var y;
        return !V(j) && z(r.Reflect) && Object.isExtensible(r.Reflect) && (y = r.Reflect[j]), V(y) && (y = rg()), !V(j) && z(r.Reflect) && Object.isExtensible(r.Reflect) && Object.defineProperty(r.Reflect, j, { enumerable: false, configurable: false, writable: false, value: y }), y;
      }
      __name(og, "og");
      function ng(y) {
        var A = new k(), w = { isProviderFor: function(P, M) {
          var L = A.get(P);
          return V(L) ? false : L.has(M);
        }, OrdinaryDefineOwnMetadata: Ie, OrdinaryHasOwnMetadata: $, OrdinaryGetOwnMetadata: be, OrdinaryOwnMetadataKeys: re, OrdinaryDeleteMetadata: I };
        return D.registerProvider(w), w;
        function B(P, M, L) {
          var ie = A.get(P), fe = false;
          if (V(ie)) {
            if (!L)
              return;
            ie = new g(), A.set(P, ie), fe = true;
          }
          var xe = ie.get(M);
          if (V(xe)) {
            if (!L)
              return;
            if (xe = new g(), ie.set(M, xe), !y.setProvider(P, M, w))
              throw ie.delete(M), fe && A.delete(P), new Error("Wrong provider for target.");
          }
          return xe;
        }
        __name(B, "B");
        function $(P, M, L) {
          var ie = B(M, L, false);
          return V(ie) ? false : Xr(ie.has(P));
        }
        __name($, "$");
        function be(P, M, L) {
          var ie = B(M, L, false);
          if (!V(ie))
            return ie.get(P);
        }
        __name(be, "be");
        function Ie(P, M, L, ie) {
          var fe = B(L, ie, true);
          fe.set(P, M);
        }
        __name(Ie, "Ie");
        function re(P, M) {
          var L = [], ie = B(P, M, false);
          if (V(ie))
            return L;
          for (var fe = ie.keys(), xe = sp(fe), jt = 0; ; ) {
            var lp = cp(xe);
            if (!lp)
              return L.length = jt, L;
            var ug = ap(lp);
            try {
              L[jt] = ug;
            } catch (lg) {
              try {
                up(xe);
              } finally {
                throw lg;
              }
            }
            jt++;
          }
        }
        __name(re, "re");
        function I(P, M, L) {
          var ie = B(M, L, false);
          if (V(ie) || !ie.delete(P))
            return false;
          if (ie.size === 0) {
            var fe = A.get(M);
            V(fe) || (fe.delete(L), fe.size === 0 && A.delete(fe));
          }
          return true;
        }
        __name(I, "I");
      }
      __name(ng, "ng");
      function ig(y) {
        var A = y.defineMetadata, w = y.hasOwnMetadata, B = y.getOwnMetadata, $ = y.getOwnMetadataKeys, be = y.deleteMetadata, Ie = new k(), re = { isProviderFor: function(I, P) {
          var M = Ie.get(I);
          return !V(M) && M.has(P) ? true : $(I, P).length ? (V(M) && (M = new C(), Ie.set(I, M)), M.add(P), true) : false;
        }, OrdinaryDefineOwnMetadata: A, OrdinaryHasOwnMetadata: w, OrdinaryGetOwnMetadata: B, OrdinaryOwnMetadataKeys: $, OrdinaryDeleteMetadata: be };
        return re;
      }
      __name(ig, "ig");
      function $i(y, A, w) {
        var B = D.getProvider(y, A);
        if (!V(B))
          return B;
        if (w) {
          if (D.setProvider(y, A, F))
            return F;
          throw new Error("Illegal state.");
        }
      }
      __name($i, "$i");
      function sg() {
        var y = {}, A = [], w = function() {
          function re(I, P, M) {
            this._index = 0, this._keys = I, this._values = P, this._selector = M;
          }
          __name(re, "re");
          return re.prototype["@@iterator"] = function() {
            return this;
          }, re.prototype[s] = function() {
            return this;
          }, re.prototype.next = function() {
            var I = this._index;
            if (I >= 0 && I < this._keys.length) {
              var P = this._selector(this._keys[I], this._values[I]);
              return I + 1 >= this._keys.length ? (this._index = -1, this._keys = A, this._values = A) : this._index++, { value: P, done: false };
            }
            return { value: void 0, done: true };
          }, re.prototype.throw = function(I) {
            throw this._index >= 0 && (this._index = -1, this._keys = A, this._values = A), I;
          }, re.prototype.return = function(I) {
            return this._index >= 0 && (this._index = -1, this._keys = A, this._values = A), { value: I, done: true };
          }, re;
        }(), B = function() {
          function re() {
            this._keys = [], this._values = [], this._cacheKey = y, this._cacheIndex = -2;
          }
          __name(re, "re");
          return Object.defineProperty(re.prototype, "size", { get: function() {
            return this._keys.length;
          }, enumerable: true, configurable: true }), re.prototype.has = function(I) {
            return this._find(I, false) >= 0;
          }, re.prototype.get = function(I) {
            var P = this._find(I, false);
            return P >= 0 ? this._values[P] : void 0;
          }, re.prototype.set = function(I, P) {
            var M = this._find(I, true);
            return this._values[M] = P, this;
          }, re.prototype.delete = function(I) {
            var P = this._find(I, false);
            if (P >= 0) {
              for (var M = this._keys.length, L = P + 1; L < M; L++)
                this._keys[L - 1] = this._keys[L], this._values[L - 1] = this._values[L];
              return this._keys.length--, this._values.length--, xu(I, this._cacheKey) && (this._cacheKey = y, this._cacheIndex = -2), true;
            }
            return false;
          }, re.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = y, this._cacheIndex = -2;
          }, re.prototype.keys = function() {
            return new w(this._keys, this._values, $);
          }, re.prototype.values = function() {
            return new w(this._keys, this._values, be);
          }, re.prototype.entries = function() {
            return new w(this._keys, this._values, Ie);
          }, re.prototype["@@iterator"] = function() {
            return this.entries();
          }, re.prototype[s] = function() {
            return this.entries();
          }, re.prototype._find = function(I, P) {
            if (!xu(this._cacheKey, I)) {
              this._cacheIndex = -1;
              for (var M = 0; M < this._keys.length; M++)
                if (xu(this._keys[M], I)) {
                  this._cacheIndex = M;
                  break;
                }
            }
            return this._cacheIndex < 0 && P && (this._cacheIndex = this._keys.length, this._keys.push(I), this._values.push(void 0)), this._cacheIndex;
          }, re;
        }();
        return B;
        function $(re, I) {
          return re;
        }
        __name($, "$");
        function be(re, I) {
          return I;
        }
        __name(be, "be");
        function Ie(re, I) {
          return [re, I];
        }
        __name(Ie, "Ie");
      }
      __name(sg, "sg");
      function ag() {
        var y = function() {
          function A() {
            this._map = new g();
          }
          __name(A, "A");
          return Object.defineProperty(A.prototype, "size", { get: function() {
            return this._map.size;
          }, enumerable: true, configurable: true }), A.prototype.has = function(w) {
            return this._map.has(w);
          }, A.prototype.add = function(w) {
            return this._map.set(w, w), this;
          }, A.prototype.delete = function(w) {
            return this._map.delete(w);
          }, A.prototype.clear = function() {
            this._map.clear();
          }, A.prototype.keys = function() {
            return this._map.keys();
          }, A.prototype.values = function() {
            return this._map.keys();
          }, A.prototype.entries = function() {
            return this._map.entries();
          }, A.prototype["@@iterator"] = function() {
            return this.keys();
          }, A.prototype[s] = function() {
            return this.keys();
          }, A;
        }();
        return y;
      }
      __name(ag, "ag");
      function cg() {
        var y = 16, A = d.create(), w = B();
        return function() {
          function I() {
            this._key = B();
          }
          __name(I, "I");
          return I.prototype.has = function(P) {
            var M = $(P, false);
            return M !== void 0 ? d.has(M, this._key) : false;
          }, I.prototype.get = function(P) {
            var M = $(P, false);
            return M !== void 0 ? d.get(M, this._key) : void 0;
          }, I.prototype.set = function(P, M) {
            var L = $(P, true);
            return L[this._key] = M, this;
          }, I.prototype.delete = function(P) {
            var M = $(P, false);
            return M !== void 0 ? delete M[this._key] : false;
          }, I.prototype.clear = function() {
            this._key = B();
          }, I;
        }();
        function B() {
          var I;
          do
            I = "@@WeakMap@@" + re();
          while (d.has(A, I));
          return A[I] = true, I;
        }
        __name(B, "B");
        function $(I, P) {
          if (!o.call(I, w)) {
            if (!P)
              return;
            Object.defineProperty(I, w, { value: d.create() });
          }
          return I[w];
        }
        __name($, "$");
        function be(I, P) {
          for (var M = 0; M < P; ++M)
            I[M] = Math.random() * 255 | 0;
          return I;
        }
        __name(be, "be");
        function Ie(I) {
          if (typeof Uint8Array == "function") {
            var P = new Uint8Array(I);
            return typeof crypto < "u" ? crypto.getRandomValues(P) : typeof msCrypto < "u" ? msCrypto.getRandomValues(P) : be(P, I), P;
          }
          return be(new Array(I), I);
        }
        __name(Ie, "Ie");
        function re() {
          var I = Ie(y);
          I[6] = I[6] & 79 | 64, I[8] = I[8] & 191 | 128;
          for (var P = "", M = 0; M < y; ++M) {
            var L = I[M];
            (M === 4 || M === 6 || M === 8) && (P += "-"), L < 16 && (P += "0"), P += L.toString(16).toLowerCase();
          }
          return P;
        }
        __name(re, "re");
      }
      __name(cg, "cg");
      function Su(y) {
        return y.__ = void 0, delete y.__, y;
      }
      __name(Su, "Su");
    });
  })(xh || (xh = {}));
});
var G = {};
Ut(G, { fromBuffer: () => xg, fromUTF8String: () => Sg, isBase64: () => Cg, isBase64URL: () => Tg, toBase64: () => Eg, toBuffer: () => bg, toUTF8String: () => _g, trimPadding: () => hp });
var Tu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var pp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var dp = /* @__PURE__ */ __name((t15) => {
  let e = typeof Uint8Array > "u" ? [] : new Uint8Array(256), r = Tu.length;
  for (let o = 0; o < r; o++)
    e[t15.charCodeAt(o)] = o;
  return e;
}, "dp");
var gg = dp(Tu);
var vg = dp(pp);
var Ag = /^[-A-Za-z0-9\-_]*$/;
var wg = /^[-A-Za-z0-9+/]*={0,3}$/;
var Jt = {};
Jt.toArrayBuffer = (t15, e) => {
  let r = t15.length, o = t15.length * 0.75, n, i = 0, s, c, l, f;
  t15[t15.length - 1] === "=" && (o--, t15[t15.length - 2] === "=" && o--);
  let d = new ArrayBuffer(o), h = new Uint8Array(d), g = e ? vg : gg;
  for (n = 0; n < r; n += 4)
    s = g[t15.charCodeAt(n)], c = g[t15.charCodeAt(n + 1)], l = g[t15.charCodeAt(n + 2)], f = g[t15.charCodeAt(n + 3)], h[i++] = s << 2 | c >> 4, h[i++] = (c & 15) << 4 | l >> 2, h[i++] = (l & 3) << 6 | f & 63;
  return d;
};
Jt.fromArrayBuffer = (t15, e) => {
  let r = new Uint8Array(t15), o, n = "", i = r.length, s = e ? pp : Tu;
  for (o = 0; o < i; o += 3)
    n += s[r[o] >> 2], n += s[(r[o] & 3) << 4 | r[o + 1] >> 4], n += s[(r[o + 1] & 15) << 2 | r[o + 2] >> 6], n += s[r[o + 2] & 63];
  let c = i % 3;
  return c === 2 ? n = n.substring(0, n.length - 1) + (e ? "" : "=") : c === 1 && (n = n.substring(0, n.length - 2) + (e ? "" : "==")), n;
};
Jt.toString = (t15, e) => new TextDecoder().decode(Jt.toArrayBuffer(t15, e));
Jt.fromString = (t15, e) => Jt.fromArrayBuffer(new TextEncoder().encode(t15), e);
Jt.validate = (t15, e) => {
  if (!(typeof t15 == "string" || t15 instanceof String))
    return false;
  try {
    return e ? Ag.test(t15) : wg.test(t15);
  } catch {
    return false;
  }
};
Jt.base64 = Jt;
var Er = Jt;
function bg(t15, e = "base64url") {
  let r = Er.toArrayBuffer(t15, e === "base64url");
  return new Uint8Array(r);
}
__name(bg, "bg");
function xg(t15, e = "base64url") {
  let r = new Uint8Array(t15);
  return Er.fromArrayBuffer(r.buffer, e === "base64url");
}
__name(xg, "xg");
function Eg(t15) {
  let e = Er.toArrayBuffer(t15, true);
  return Er.fromArrayBuffer(e);
}
__name(Eg, "Eg");
function Sg(t15) {
  return Er.fromString(t15, true);
}
__name(Sg, "Sg");
function _g(t15) {
  return Er.toString(t15, true);
}
__name(_g, "_g");
function Cg(t15) {
  return Er.validate(t15, false);
}
__name(Cg, "Cg");
function Tg(t15) {
  return t15 = hp(t15), Er.validate(t15, true);
}
__name(Tg, "Tg");
function hp(t15) {
  return t15.replace(/=/g, "");
}
__name(hp, "hp");
var Xe = {};
Ut(Xe, { decodeFirst: () => qg, encode: () => Xg });
function Un(t15, e, r) {
  if (e < 24)
    return [e, 1];
  let o = t15.byteLength - r - 1, n = new DataView(t15.buffer, r + 1), i, s = 0;
  switch (e) {
    case 24: {
      o > 0 && (i = n.getUint8(0), s = 2);
      break;
    }
    case 25: {
      o > 1 && (i = n.getUint16(0, false), s = 3);
      break;
    }
    case 26: {
      o > 3 && (i = n.getUint32(0, false), s = 5);
      break;
    }
    case 27: {
      if (o > 7) {
        let c = n.getBigUint64(0, false);
        if (c >= 24n && c <= Number.MAX_SAFE_INTEGER)
          return [Number(c), 9];
      }
      break;
    }
  }
  if (i && i >= 24)
    return [i, s];
  throw new Error("Length not supported or not well formed");
}
__name(Un, "Un");
var ja = 0;
var Ki = 1;
var Bu = 2;
var Iu = 3;
var Ou = 4;
var Nu = 5;
var ku = 6;
var mp = 7;
function Qt(t15, e) {
  let r = t15 << 5;
  if (e < 0)
    throw new Error("CBOR Data Item argument must not be negative");
  let o;
  if (typeof e == "number") {
    if (!Number.isInteger(e))
      throw new Error("CBOR Data Item argument must be an integer");
    o = BigInt(e);
  } else
    o = e;
  if (t15 == Ki) {
    if (o == 0n)
      throw new Error("CBOR Data Item argument cannot be zero when negative");
    o = o - 1n;
  }
  if (o > 18446744073709551615n)
    throw new Error("CBOR number out of range");
  let n = new Uint8Array(8);
  return new DataView(n.buffer).setBigUint64(0, o, false), o <= 23 ? [r | n[7]] : o <= 255 ? [r | 24, n[7]] : o <= 65535 ? [r | 25, ...n.slice(6)] : o <= 4294967295 ? [r | 26, ...n.slice(4)] : [r | 27, ...n];
}
__name(Qt, "Qt");
var qi = /* @__PURE__ */ __name(class {
  constructor(e, r) {
    Object.defineProperty(this, "tagId", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "tagValue", { enumerable: true, configurable: true, writable: true, value: void 0 }), this.tagId = e, this.tagValue = r;
  }
  get tag() {
    return this.tagId;
  }
  get value() {
    return this.tagValue;
  }
}, "qi");
function yp(t15, e, r) {
  return Un(t15, e, r);
}
__name(yp, "yp");
function Bg(t15, e, r) {
  let [o, n] = yp(t15, e, r);
  return [-o - 1, n];
}
__name(Bg, "Bg");
function gp(t15, e, r) {
  let [o, n] = Un(t15, e, r), i = r + n;
  return [new Uint8Array(t15.buffer.slice(i, i + o)), n + o];
}
__name(gp, "gp");
var Ig = new TextDecoder();
function Og(t15, e, r) {
  let [o, n] = gp(t15, e, r);
  return [Ig.decode(o), n];
}
__name(Og, "Og");
function Ng(t15, e, r) {
  if (e === 0)
    return [[], 1];
  let [o, n] = Un(t15, e, r), i = n, s = [];
  for (let c = 0; c < o; c++) {
    if (t15.byteLength - r - i <= 0)
      throw new Error("array is not supported or well formed");
    let [f, d] = Ho(t15, r + i);
    s.push(f), i += d;
  }
  return [s, i];
}
__name(Ng, "Ng");
var Ua = "Map is not supported or well formed";
function kg(t15, e, r) {
  if (e === 0)
    return [/* @__PURE__ */ new Map(), 1];
  let [o, n] = Un(t15, e, r), i = n, s = /* @__PURE__ */ new Map();
  for (let c = 0; c < o; c++) {
    let l = t15.byteLength - r - i;
    if (l <= 0)
      throw new Error(Ua);
    let [f, d] = Ho(t15, r + i);
    if (i += d, l -= d, l <= 0)
      throw new Error(Ua);
    if (typeof f != "string" && typeof f != "number")
      throw new Error(Ua);
    if (s.has(f))
      throw new Error(Ua);
    let [h, g] = Ho(t15, r + i);
    i += g, s.set(f, h);
  }
  return [s, i];
}
__name(kg, "kg");
function Pg(t15, e) {
  if (e + 3 > t15.byteLength)
    throw new Error("CBOR stream ended before end of Float 16");
  let r = t15.getUint16(e + 1, false);
  if (r == 31744)
    return [1 / 0, 3];
  if (r == 32256)
    return [NaN, 3];
  if (r == 64512)
    return [-1 / 0, 3];
  throw new Error("Float16 data is unsupported");
}
__name(Pg, "Pg");
function Rg(t15, e) {
  if (e + 5 > t15.byteLength)
    throw new Error("CBOR stream ended before end of Float 32");
  return [t15.getFloat32(e + 1, false), 5];
}
__name(Rg, "Rg");
function Mg(t15, e) {
  if (e + 9 > t15.byteLength)
    throw new Error("CBOR stream ended before end of Float 64");
  return [t15.getFloat64(e + 1, false), 9];
}
__name(Mg, "Mg");
function Dg(t15, e, r) {
  let [o, n] = Un(t15, e, r), [i, s] = Ho(t15, r + n);
  return [new qi(o, i), n + s];
}
__name(Dg, "Dg");
function Ho(t15, e) {
  if (e >= t15.byteLength)
    throw new Error("CBOR stream ended before tag value");
  let r = t15.getUint8(e), o = r >> 5, n = r & 31;
  switch (o) {
    case ja:
      return yp(t15, n, e);
    case Ki:
      return Bg(t15, n, e);
    case Bu:
      return gp(t15, n, e);
    case Iu:
      return Og(t15, n, e);
    case Ou:
      return Ng(t15, n, e);
    case Nu:
      return kg(t15, n, e);
    case ku:
      return Dg(t15, n, e);
    case mp:
      switch (n) {
        case 20:
          return [false, 1];
        case 21:
          return [true, 1];
        case 22:
          return [null, 1];
        case 23:
          return [void 0, 1];
        case 25:
          return Pg(t15, e);
        case 26:
          return Rg(t15, e);
        case 27:
          return Mg(t15, e);
      }
  }
  throw new Error(`Unsupported or not well formed at ${e}`);
}
__name(Ho, "Ho");
function jg(t15) {
  return t15 === true ? 245 : t15 === false ? 244 : t15 === null ? 246 : 247;
}
__name(jg, "jg");
function Ug(t15) {
  if (Math.fround(t15) == t15 || !Number.isFinite(t15) || Number.isNaN(t15)) {
    let e = new Uint8Array(5);
    return e[0] = 250, new DataView(e.buffer).setFloat32(1, t15, false), e;
  } else {
    let e = new Uint8Array(9);
    return e[0] = 251, new DataView(e.buffer).setFloat64(1, t15, false), e;
  }
}
__name(Ug, "Ug");
function Lg(t15) {
  return typeof t15 == "number" ? Number.isSafeInteger(t15) ? t15 < 0 ? Qt(Ki, Math.abs(t15)) : Qt(ja, t15) : [Ug(t15)] : t15 < 0n ? Qt(Ki, t15 * -1n) : Qt(ja, t15);
}
__name(Lg, "Lg");
var Hg = new TextEncoder();
function Vg(t15, e) {
  e.push(...Qt(Iu, t15.length)), e.push(Hg.encode(t15));
}
__name(Vg, "Vg");
function Fg(t15, e) {
  e.push(...Qt(Bu, t15.length)), e.push(t15);
}
__name(Fg, "Fg");
function Gg(t15, e) {
  e.push(...Qt(Ou, t15.length));
  for (let r of t15)
    Xi(r, e);
}
__name(Gg, "Gg");
function Wg(t15, e) {
  e.push(new Uint8Array(Qt(Nu, t15.size)));
  for (let [r, o] of t15.entries())
    Xi(r, e), Xi(o, e);
}
__name(Wg, "Wg");
function $g(t15, e) {
  e.push(...Qt(ku, t15.tag)), Xi(t15.value, e);
}
__name($g, "$g");
function Xi(t15, e) {
  if (typeof t15 == "boolean" || t15 === null || t15 == null) {
    e.push(jg(t15));
    return;
  }
  if (typeof t15 == "number" || typeof t15 == "bigint") {
    e.push(...Lg(t15));
    return;
  }
  if (typeof t15 == "string") {
    Vg(t15, e);
    return;
  }
  if (t15 instanceof Uint8Array) {
    Fg(t15, e);
    return;
  }
  if (Array.isArray(t15)) {
    Gg(t15, e);
    return;
  }
  if (t15 instanceof Map) {
    Wg(t15, e);
    return;
  }
  if (t15 instanceof qi) {
    $g(t15, e);
    return;
  }
  throw new Error("Not implemented");
}
__name(Xi, "Xi");
function Pu(t15, e) {
  if (t15.byteLength === 0 || t15.byteLength <= e || e < 0)
    throw new Error("No data");
  return t15 instanceof Uint8Array ? Ho(new DataView(t15.buffer), e) : t15 instanceof ArrayBuffer ? Ho(new DataView(t15), e) : Ho(t15, e);
}
__name(Pu, "Pu");
function Ru(t15) {
  let e = [];
  Xi(t15, e);
  let r = 0;
  for (let i of e)
    typeof i == "number" ? r += 1 : r += i.length;
  let o = new Uint8Array(r), n = 0;
  for (let i of e)
    typeof i == "number" ? (o[n] = i, n += 1) : (o.set(i, n), n += i.length);
  return o;
}
__name(Ru, "Ru");
function qg(t15) {
  let e = new Uint8Array(t15), r = Pu(e, 0), [o] = r;
  return o;
}
__name(qg, "qg");
function Xg(t15) {
  return Ru(t15);
}
__name(Xg, "Xg");
var Zt = {};
Ut(Zt, { digest: () => wp, getRandomValues: () => bp, verify: () => Ny });
function vp(t15) {
  let e = t15.get(q.kty);
  return Mu(e) && e === ut.OKP;
}
__name(vp, "vp");
function zr(t15) {
  let e = t15.get(q.kty);
  return Mu(e) && e === ut.EC2;
}
__name(zr, "zr");
function Ln(t15) {
  let e = t15.get(q.kty);
  return Mu(e) && e === ut.RSA;
}
__name(Ln, "Ln");
var q;
(function(t15) {
  t15[t15.kty = 1] = "kty", t15[t15.alg = 3] = "alg", t15[t15.crv = -1] = "crv", t15[t15.x = -2] = "x", t15[t15.y = -3] = "y", t15[t15.n = -1] = "n", t15[t15.e = -2] = "e";
})(q || (q = {}));
var ut;
(function(t15) {
  t15[t15.OKP = 1] = "OKP", t15[t15.EC2 = 2] = "EC2", t15[t15.RSA = 3] = "RSA";
})(ut || (ut = {}));
function Mu(t15) {
  return Object.values(ut).indexOf(t15) >= 0;
}
__name(Mu, "Mu");
var Fe;
(function(t15) {
  t15[t15.P256 = 1] = "P256", t15[t15.P384 = 2] = "P384", t15[t15.P521 = 3] = "P521", t15[t15.ED25519 = 6] = "ED25519", t15[t15.SECP256K1 = 8] = "SECP256K1";
})(Fe || (Fe = {}));
function Ap(t15) {
  return Object.values(Fe).indexOf(t15) >= 0;
}
__name(Ap, "Ap");
var X;
(function(t15) {
  t15[t15.ES256 = -7] = "ES256", t15[t15.EdDSA = -8] = "EdDSA", t15[t15.ES384 = -35] = "ES384", t15[t15.ES512 = -36] = "ES512", t15[t15.PS256 = -37] = "PS256", t15[t15.PS384 = -38] = "PS384", t15[t15.PS512 = -39] = "PS512", t15[t15.ES256K = -47] = "ES256K", t15[t15.RS256 = -257] = "RS256", t15[t15.RS384 = -258] = "RS384", t15[t15.RS512 = -259] = "RS512", t15[t15.RS1 = -65535] = "RS1";
})(X || (X = {}));
function Yt(t15) {
  return Object.values(X).indexOf(t15) >= 0;
}
__name(Yt, "Yt");
function Jr(t15) {
  if ([X.RS1].indexOf(t15) >= 0)
    return "SHA-1";
  if ([X.ES256, X.PS256, X.RS256].indexOf(t15) >= 0)
    return "SHA-256";
  if ([X.ES384, X.PS384, X.RS384].indexOf(t15) >= 0)
    return "SHA-384";
  if ([X.ES512, X.PS512, X.RS512, X.EdDSA].indexOf(t15) >= 0)
    return "SHA-512";
  throw new Error(`Could not map COSE alg value of ${t15} to a WebCrypto alg`);
}
__name(Jr, "Jr");
var zi;
function gt() {
  return new Promise((e, r) => {
    if (zi)
      return e(zi);
    let o = Jg.stubThisGlobalThisCrypto();
    return o ? (zi = o, e(zi)) : r(new Du());
  });
}
__name(gt, "gt");
var Du = /* @__PURE__ */ __name(class extends Error {
  constructor() {
    super("An instance of the Crypto API could not be located"), this.name = "MissingWebCrypto";
  }
}, "Du");
var Jg = { stubThisGlobalThisCrypto: () => globalThis.crypto, setCachedCrypto: (t15) => {
  zi = t15;
} };
async function wp(t15, e) {
  let r = await gt(), o = Jr(e), n = await r.subtle.digest(o, t15);
  return new Uint8Array(n);
}
__name(wp, "wp");
async function bp(t15) {
  return (await gt()).getRandomValues(t15), t15;
}
__name(bp, "bp");
async function Hn(t15) {
  let e = await gt(), { keyData: r, algorithm: o } = t15;
  return e.subtle.importKey("jwk", r, o, false, ["verify"]);
}
__name(Hn, "Hn");
async function La(t15) {
  let { cosePublicKey: e, signature: r, data: o, shaHashOverride: n } = t15, i = await gt(), s = e.get(q.alg), c = e.get(q.crv), l = e.get(q.x), f = e.get(q.y);
  if (!s)
    throw new Error("Public key was missing alg (EC2)");
  if (!c)
    throw new Error("Public key was missing crv (EC2)");
  if (!l)
    throw new Error("Public key was missing x (EC2)");
  if (!f)
    throw new Error("Public key was missing y (EC2)");
  let d;
  if (c === Fe.P256)
    d = "P-256";
  else if (c === Fe.P384)
    d = "P-384";
  else if (c === Fe.P521)
    d = "P-521";
  else
    throw new Error(`Unexpected COSE crv value of ${c} (EC2)`);
  let h = { kty: "EC", crv: d, x: G.fromBuffer(l), y: G.fromBuffer(f), ext: false }, C = await Hn({ keyData: h, algorithm: { name: "ECDSA", namedCurve: d } }), k = Jr(s);
  n && (k = Jr(n));
  let j = { name: "ECDSA", hash: { name: k } };
  return i.subtle.verify(j, C, r, o);
}
__name(La, "La");
function ju(t15) {
  if ([X.EdDSA].indexOf(t15) >= 0)
    return "Ed25519";
  if ([X.ES256, X.ES384, X.ES512, X.ES256K].indexOf(t15) >= 0)
    return "ECDSA";
  if ([X.RS256, X.RS384, X.RS512, X.RS1].indexOf(t15) >= 0)
    return "RSASSA-PKCS1-v1_5";
  if ([X.PS256, X.PS384, X.PS512].indexOf(t15) >= 0)
    return "RSA-PSS";
  throw new Error(`Could not map COSE alg value of ${t15} to a WebCrypto key alg name`);
}
__name(ju, "ju");
async function Ha(t15) {
  let { cosePublicKey: e, signature: r, data: o, shaHashOverride: n } = t15, i = await gt(), s = e.get(q.alg), c = e.get(q.n), l = e.get(q.e);
  if (!s)
    throw new Error("Public key was missing alg (RSA)");
  if (!Yt(s))
    throw new Error(`Public key had invalid alg ${s} (RSA)`);
  if (!c)
    throw new Error("Public key was missing n (RSA)");
  if (!l)
    throw new Error("Public key was missing e (RSA)");
  let f = { kty: "RSA", alg: "", n: G.fromBuffer(c), e: G.fromBuffer(l), ext: false }, d = { name: ju(s), hash: { name: Jr(s) } }, h = { name: ju(s) };
  if (n && (d.hash.name = Jr(n)), d.name === "RSASSA-PKCS1-v1_5")
    d.hash.name === "SHA-256" ? f.alg = "RS256" : d.hash.name === "SHA-384" ? f.alg = "RS384" : d.hash.name === "SHA-512" ? f.alg = "RS512" : d.hash.name === "SHA-1" && (f.alg = "RS1");
  else if (d.name === "RSA-PSS") {
    let C = 0;
    d.hash.name === "SHA-256" ? (f.alg = "PS256", C = 32) : d.hash.name === "SHA-384" ? (f.alg = "PS384", C = 48) : d.hash.name === "SHA-512" && (f.alg = "PS512", C = 64), h.saltLength = C;
  } else
    throw new Error(`Unexpected RSA key algorithm ${s} (${d.name})`);
  let g = await Hn({ keyData: f, algorithm: d });
  return i.subtle.verify(h, g, r, o);
}
__name(Ha, "Ha");
function Va(t15) {
  let e = U.toHex(t15);
  return [e.slice(0, 8), e.slice(8, 12), e.slice(12, 16), e.slice(16, 20), e.slice(20, 32)].join("-");
}
__name(Va, "Va");
function Se(t15) {
  let e;
  if (typeof t15 == "string")
    if (G.isBase64URL(t15))
      e = G.toBase64(t15);
    else if (G.isBase64(t15))
      e = t15;
    else
      throw new Error("Certificate is not a valid base64 or base64url string");
  else
    e = G.fromBuffer(t15, "base64");
  let r = "";
  for (let o = 0; o < Math.ceil(e.length / 64); o += 1) {
    let n = 64 * o;
    r += `${e.substr(n, 64)}
`;
  }
  return r = `-----BEGIN CERTIFICATE-----
${r}-----END CERTIFICATE-----
`, r;
}
__name(Se, "Se");
function Vn(t15) {
  let e = Xe.decodeFirst(t15), r = Uint8Array.from([4]), o = e.get(q.x), n = e.get(q.y);
  if (!o)
    throw new Error("COSE public key was missing x");
  return n ? U.concat([r, o, n]) : U.concat([r, o]);
}
__name(Vn, "Vn");
function xp(t15) {
  return Qg.stubThis(Xe.decodeFirst(t15));
}
__name(xp, "xp");
var Qg = { stubThis: (t15) => t15 };
function Fa(t15) {
  let e = G.toUTF8String(t15), r = JSON.parse(e);
  return Yg.stubThis(r);
}
__name(Fa, "Fa");
var Yg = { stubThis: (t15) => t15 };
function Qr(t15) {
  return Zg.stubThis(Xe.decodeFirst(t15));
}
__name(Qr, "Qr");
var Zg = { stubThis: (t15) => t15 };
async function Ep() {
  let t15 = new Uint8Array(32);
  return await Zt.getRandomValues(t15), ev.stubThis(t15);
}
__name(Ep, "Ep");
var ev = { stubThis: (t15) => t15 };
var nr = {};
Ut(nr, { Any: () => tr, BaseBlock: () => ye, BaseStringBlock: () => Yi, BitString: () => xt, BmpString: () => Ko, Boolean: () => Fo, CharacterString: () => tn, Choice: () => qn, Constructed: () => Ee, DATE: () => rs, DEFAULT_MAX_CONTENT_LENGTH: () => Vp, DEFAULT_MAX_DEPTH: () => Lp, DEFAULT_MAX_NODES: () => Hp, DateTime: () => ns, Duration: () => is, EndOfContent: () => Zi, Enumerated: () => Go, GeneralString: () => en, GeneralizedTime: () => rn, GraphicString: () => Zo, HexBlock: () => or, IA5String: () => Yo, Integer: () => Lt, Null: () => wt, NumericString: () => Xo, ObjectIdentifier: () => Wo, OctetString: () => bt, Primitive: () => er, PrintableString: () => zo, RawData: () => Ku, RelativeObjectIdentifier: () => $o, Repeated: () => on, Sequence: () => ke, Set: () => Ge, TIME: () => ss, TeletexString: () => Jo, TimeOfDay: () => os, UTCTime: () => no, UniversalString: () => qo, Utf8String: () => Et, ValueBlock: () => Ne, VideotexString: () => Qo, ViewWriter: () => Cr, VisibleString: () => oo, compareSchema: () => _r, fromBER: () => Br, verifySchema: () => uA });
var Z = Cu(Lu());
function Vo(t15, e) {
  let r = 0;
  if (t15.length === 1)
    return t15[0];
  for (let o = t15.length - 1; o >= 0; o--)
    r += t15[t15.length - 1 - o] * Math.pow(2, e * o);
  return r;
}
__name(Vo, "Vo");
function Yr(t15, e, r = -1) {
  let o = r, n = t15, i = 0, s = Math.pow(2, e);
  for (let c = 1; c < 8; c++) {
    if (t15 < s) {
      let l;
      if (o < 0)
        l = new ArrayBuffer(c), i = c;
      else {
        if (o < c)
          return new ArrayBuffer(0);
        l = new ArrayBuffer(o), i = o;
      }
      let f = new Uint8Array(l);
      for (let d = c - 1; d >= 0; d--) {
        let h = Math.pow(2, d * e);
        f[i - d - 1] = Math.floor(n / h), n -= f[i - d - 1] * h;
      }
      return l;
    }
    s *= Math.pow(2, e);
  }
  return new ArrayBuffer(0);
}
__name(Yr, "Yr");
function Hu() {
  let t15 = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    let c = t15[0] === 255 && t15[1] & 128, l = t15[0] === 0 && (t15[1] & 128) === 0;
    (c || l) && this.warnings.push("Needlessly long format");
  }
  let e = new ArrayBuffer(this.valueHex.byteLength), r = new Uint8Array(e);
  for (let c = 0; c < this.valueHex.byteLength; c++)
    r[c] = 0;
  r[0] = t15[0] & 128;
  let o = Vo(r, 8), n = new ArrayBuffer(this.valueHex.byteLength), i = new Uint8Array(n);
  for (let c = 0; c < this.valueHex.byteLength; c++)
    i[c] = t15[c];
  return i[0] &= 127, Vo(i, 8) - o;
}
__name(Hu, "Hu");
function Sp(t15) {
  let e = t15 < 0 ? t15 * -1 : t15, r = 128;
  for (let o = 1; o < 8; o++) {
    if (e <= r) {
      if (t15 < 0) {
        let s = r - e, c = Yr(s, 8, o), l = new Uint8Array(c);
        return l[0] |= 128, c;
      }
      let n = Yr(e, 8, o), i = new Uint8Array(n);
      if (i[0] & 128) {
        let s = n.slice(0), c = new Uint8Array(s);
        n = new ArrayBuffer(n.byteLength + 1), i = new Uint8Array(n);
        for (let l = 0; l < s.byteLength; l++)
          i[l + 1] = c[l];
        i[0] = 0;
      }
      return n;
    }
    r *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
__name(Sp, "Sp");
function _p(t15, e) {
  if (t15.byteLength !== e.byteLength)
    return false;
  let r = new Uint8Array(t15), o = new Uint8Array(e);
  for (let n = 0; n < r.length; n++)
    if (r[n] !== o[n])
      return false;
  return true;
}
__name(_p, "_p");
function Ye(t15, e) {
  let r = t15.toString(10);
  if (e < r.length)
    return "";
  let o = e - r.length, n = Array.from({ length: o });
  for (let s = 0; s < o; s++)
    n[s] = "0";
  return n.join("").concat(r);
}
__name(Ye, "Ye");
var db = Math.log(2);
function qa() {
  if (typeof BigInt > "u")
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
}
__name(qa, "qa");
function Xa(t15) {
  let e = 0, r = 0;
  for (let n = 0; n < t15.length; n++) {
    let i = t15[n];
    e += i.byteLength;
  }
  let o = new Uint8Array(e);
  for (let n = 0; n < t15.length; n++) {
    let i = t15[n];
    o.set(i instanceof Uint8Array ? i : new Uint8Array(i), r), r += i.byteLength;
  }
  return o.buffer;
}
__name(Xa, "Xa");
function Tr(t15, e, r, o) {
  return e instanceof Uint8Array ? e.byteLength ? r < 0 ? (t15.error = "Wrong parameter: inputOffset less than zero", false) : o < 0 ? (t15.error = "Wrong parameter: inputLength less than zero", false) : e.byteLength - r - o < 0 ? (t15.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", false) : true : (t15.error = "Wrong parameter: inputBuffer has zero length", false) : (t15.error = "Wrong parameter: inputBuffer must be 'Uint8Array'", false);
}
__name(Tr, "Tr");
var Cr = /* @__PURE__ */ __name(class {
  constructor() {
    this.items = [];
  }
  write(e) {
    this.items.push(e instanceof ArrayBuffer ? e : Xa([e]));
  }
  final() {
    return Xa(this.items);
  }
}, "Cr");
var uv = Cr.prototype.write;
var lv = Cr.prototype.final;
var Vu = "name";
var Cp = "valueHexView";
var fv = "isHexOnly";
var pv = "idBlock";
var dv = "tagClass";
var hv = "tagNumber";
var mv = "isConstructed";
var yv = "fromBER";
var gv = "toBER";
var vv = "local";
var Ze = "";
var rr = new ArrayBuffer(0);
var nc = new Uint8Array(0);
var Qi = "EndOfContent";
var Ip = "OCTET STRING";
var Op = "BIT STRING";
function or(t15) {
  var e;
  return e = /* @__PURE__ */ __name(class extends t15 {
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(o) {
      this.valueHexView = new Uint8Array(o);
    }
    constructor(...o) {
      var n;
      super(...o);
      let i = o[0] || {};
      this.isHexOnly = (n = i.isHexOnly) !== null && n !== void 0 ? n : false, this.valueHexView = i.valueHex ? Z.BufferSourceConverter.toUint8Array(i.valueHex) : nc;
    }
    fromBER(o, n, i, s) {
      let c = o instanceof ArrayBuffer ? new Uint8Array(o) : o;
      if (!Tr(this, c, n, i))
        return -1;
      let l = n + i;
      return this.valueHexView = c.subarray(n, l), this.valueHexView.length ? (this.blockLength = i, l) : (this.warnings.push("Zero buffer length"), n);
    }
    toBER(o = false) {
      return this.isHexOnly ? o ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.buffer instanceof ArrayBuffer && this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : Z.BufferSourceConverter.toArrayBuffer(this.valueHexView) : (this.error = "Flag 'isHexOnly' is not set, abort", rr);
    }
    toJSON() {
      return { ...super.toJSON(), isHexOnly: this.isHexOnly, valueHex: Z.Convert.ToHex(this.valueHexView) };
    }
  }, "e"), e.NAME = "hexBlock", e;
}
__name(or, "or");
var Zr = /* @__PURE__ */ __name(class {
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(e) {
    this.valueBeforeDecodeView = new Uint8Array(e);
  }
  constructor({ blockLength: e = 0, error: r = Ze, warnings: o = [], valueBeforeDecode: n = nc } = {}) {
    this.blockLength = e, this.error = r, this.warnings = o, this.valueBeforeDecodeView = Z.BufferSourceConverter.toUint8Array(n);
  }
  toJSON() {
    return { blockName: this.constructor.NAME, blockLength: this.blockLength, error: this.error, warnings: this.warnings, valueBeforeDecode: Z.Convert.ToHex(this.valueBeforeDecodeView) };
  }
}, "Zr");
Zr.NAME = "baseBlock";
var Ne = /* @__PURE__ */ __name(class extends Zr {
  fromBER(e, r, o, n) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(e, r) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
}, "Ne");
Ne.NAME = "valueBlock";
var eo = /* @__PURE__ */ __name(class extends or(Zr) {
  constructor({ idBlock: e = {} } = {}) {
    var r, o, n, i;
    super(), e ? (this.isHexOnly = (r = e.isHexOnly) !== null && r !== void 0 ? r : false, this.valueHexView = e.valueHex ? Z.BufferSourceConverter.toUint8Array(e.valueHex) : nc, this.tagClass = (o = e.tagClass) !== null && o !== void 0 ? o : -1, this.tagNumber = (n = e.tagNumber) !== null && n !== void 0 ? n : -1, this.isConstructed = (i = e.isConstructed) !== null && i !== void 0 ? i : false) : (this.tagClass = -1, this.tagNumber = -1, this.isConstructed = false);
  }
  toBER(e = false) {
    let r = 0;
    switch (this.tagClass) {
      case 1:
        r |= 0;
        break;
      case 2:
        r |= 64;
        break;
      case 3:
        r |= 128;
        break;
      case 4:
        r |= 192;
        break;
      default:
        return this.error = "Unknown tag class", rr;
    }
    if (this.isConstructed && (r |= 32), this.tagNumber < 31 && !this.isHexOnly) {
      let n = new Uint8Array(1);
      if (!e) {
        let i = this.tagNumber;
        i &= 31, r |= i, n[0] = r;
      }
      return n.buffer;
    }
    if (!this.isHexOnly) {
      let n = Yr(this.tagNumber, 7), i = new Uint8Array(n), s = n.byteLength, c = new Uint8Array(s + 1);
      if (c[0] = r | 31, !e) {
        for (let l = 0; l < s - 1; l++)
          c[l + 1] = i[l] | 128;
        c[s] = i[s - 1];
      }
      return c.buffer;
    }
    let o = new Uint8Array(this.valueHexView.byteLength + 1);
    if (o[0] = r | 31, !e) {
      let n = this.valueHexView;
      for (let i = 0; i < n.length - 1; i++)
        o[i + 1] = n[i] | 128;
      o[this.valueHexView.byteLength] = n[n.length - 1];
    }
    return o.buffer;
  }
  fromBER(e, r, o) {
    let n = Z.BufferSourceConverter.toUint8Array(e);
    if (!Tr(this, n, r, o))
      return -1;
    let i = Number.isInteger(r) && Number.isInteger(o), s = i ? n : n.subarray(r, r + o), c = i ? r : 0, l = i ? o : s.length;
    if (l === 0)
      return this.error = "Zero buffer length", -1;
    switch (s[c] & 192) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        return this.error = "Unknown tag class", -1;
    }
    this.isConstructed = (s[c] & 32) === 32, this.isHexOnly = false;
    let d = s[c] & 31;
    if (d !== 31)
      this.tagNumber = d, this.blockLength = 1;
    else {
      let h = 0;
      for (; ; ) {
        let C = h + 1;
        if (C >= l)
          return this.error = "End of input reached before message was fully decoded", -1;
        if (h++, (s[c + C] & 128) === 0)
          break;
      }
      this.blockLength = h + 1;
      let g = this.valueHexView = new Uint8Array(h);
      for (let C = 0; C < h; C++)
        g[C] = s[c + C + 1] & 127;
      this.blockLength <= 9 ? this.tagNumber = Vo(g, 7) : (this.isHexOnly = true, this.warnings.push("Tag too long, represented as hex-coded"));
    }
    if (this.tagClass === 1 && this.isConstructed)
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          return this.error = "Constructed encoding used for primitive type", -1;
      }
    return r + this.blockLength;
  }
  toJSON() {
    return { ...super.toJSON(), tagClass: this.tagClass, tagNumber: this.tagNumber, isConstructed: this.isConstructed };
  }
}, "eo");
eo.NAME = "identificationBlock";
var Av = eo.prototype.toBER;
var wv = eo.prototype.fromBER;
var to = /* @__PURE__ */ __name(class extends Zr {
  constructor({ lenBlock: e = {} } = {}) {
    var r, o, n;
    super(), this.isIndefiniteForm = (r = e.isIndefiniteForm) !== null && r !== void 0 ? r : false, this.longFormUsed = (o = e.longFormUsed) !== null && o !== void 0 ? o : false, this.length = (n = e.length) !== null && n !== void 0 ? n : 0;
  }
  fromBER(e, r, o) {
    let n = Z.BufferSourceConverter.toUint8Array(e);
    if (!Tr(this, n, r, o))
      return -1;
    let i = Number.isInteger(r) && Number.isInteger(o), s = i ? n : n.subarray(r, r + o), c = i ? r : 0, l = i ? o : s.length;
    if (l === 0)
      return this.error = "Zero buffer length", -1;
    if (s[c] === 255)
      return this.error = "Length block 0xFF is reserved by standard", -1;
    if (this.isIndefiniteForm = s[c] === 128, this.isIndefiniteForm)
      return this.blockLength = 1, r + this.blockLength;
    if (this.longFormUsed = !!(s[c] & 128), this.longFormUsed === false)
      return this.length = s[c], this.blockLength = 1, r + this.blockLength;
    let f = s[c] & 127;
    if (f > 8)
      return this.error = "Too big integer", -1;
    if (f + 1 > l)
      return this.error = "End of input reached before message was fully decoded", -1;
    let d = r + 1, h = n.subarray(d, d + f);
    return h[f - 1] === 0 && this.warnings.push("Needlessly long encoded length"), this.length = Vo(h, 8), this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = f + 1, r + this.blockLength;
  }
  toBER(e = false) {
    let r, o;
    if (this.length > 127 && (this.longFormUsed = true), this.isIndefiniteForm)
      return r = new ArrayBuffer(1), e === false && (o = new Uint8Array(r), o[0] = 128), r;
    if (this.longFormUsed) {
      let n = Yr(this.length, 8);
      if (n.byteLength > 127)
        return this.error = "Too big length", rr;
      if (r = new ArrayBuffer(n.byteLength + 1), e)
        return r;
      let i = new Uint8Array(n);
      o = new Uint8Array(r), o[0] = n.byteLength | 128;
      for (let s = 0; s < n.byteLength; s++)
        o[s + 1] = i[s];
      return r;
    }
    return r = new ArrayBuffer(1), e === false && (o = new Uint8Array(r), o[0] = this.length), r;
  }
  toJSON() {
    return { ...super.toJSON(), isIndefiniteForm: this.isIndefiniteForm, longFormUsed: this.longFormUsed, length: this.length };
  }
}, "to");
to.NAME = "lengthBlock";
var bv = to.prototype.toBER;
var xv = to.prototype.fromBER;
var O = {};
var Fu;
var Gu;
var Wu;
var Ev = Nv(Uint8Array.prototype, "slice");
var Sv = (Fu = Object.getOwnPropertyDescriptor(Uint8Array.prototype, "constructor")) === null || Fu === void 0 ? void 0 : Fu.value;
var _v = (Gu = Object.getOwnPropertyDescriptor(Array.prototype, Symbol.iterator)) === null || Gu === void 0 ? void 0 : Gu.value;
var Tp = (Wu = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype), "byteLength")) === null || Wu === void 0 ? void 0 : Wu.get;
var Cv = 16384;
var Np = 64;
var Ka;
function Tv(t15, e) {
  let o = e || Ka;
  if (!o) {
    Ka = void 0;
    return;
  }
  Ka = { ...o, ...t15 };
}
__name(Tv, "Tv");
function me(t15, e) {
  let r = Object.getOwnPropertyDescriptor(t15, e);
  if (!(!r || !("value" in r)))
    return r.value;
}
__name(me, "me");
function Bv(t15) {
  if (!(!Tp || !t15 || typeof t15 != "object"))
    try {
      let e = Tp.call(t15);
      return typeof e == "number" ? e : void 0;
    } catch {
      return;
    }
}
__name(Bv, "Bv");
function kp(t15, e) {
  if (e > Np || !t15 || typeof t15 != "object")
    return false;
  let r = Object.getOwnPropertyDescriptor(t15, "valueBlock");
  if (!r || !("value" in r))
    return false;
  let o = r.value;
  if (!o || typeof o != "object")
    return false;
  let n = Object.getOwnPropertyDescriptor(o, "valueHexView");
  if (n) {
    if (!("value" in n))
      return false;
    let f = Bv(n.value);
    return f !== void 0 && f >= Cv;
  }
  let i = Object.getOwnPropertyDescriptor(o, "value");
  if (!i || !("value" in i) || !Array.isArray(i.value))
    return false;
  let s = i.value, c = Object.getOwnPropertyDescriptor(s, "length");
  if (!c || !("value" in c) || c.value !== 1)
    return false;
  let l = Object.getOwnPropertyDescriptor(s, "0");
  return !l || !("value" in l) ? false : kp(l.value, e + 1);
}
__name(kp, "kp");
function Iv(t15) {
  try {
    return kp(t15, 0);
  } catch {
    return false;
  }
}
__name(Iv, "Iv");
function Bp(t15, e) {
  return !!t15 && "value" in t15 && t15.value === e && t15.writable === true && t15.enumerable === false && t15.configurable === true;
}
__name(Bp, "Bp");
function Ov(t15) {
  return Bp(Object.getOwnPropertyDescriptor(t15.ViewWriter.prototype, "write"), t15.originalWriterWrite) && Bp(Object.getOwnPropertyDescriptor(t15.ViewWriter.prototype, "final"), t15.originalWriterFinal);
}
__name(Ov, "Ov");
function Nv(t15, e) {
  let r = t15;
  for (; r; ) {
    let o = Object.getOwnPropertyDescriptor(r, e);
    if (o)
      return "value" in o && typeof o.value == "function" ? { declaringPrototype: r, method: o.value } : void 0;
    r = Object.getPrototypeOf(r);
  }
}
__name(Nv, "Nv");
function kv(t15, e, r) {
  if (!r)
    return false;
  let o = t15;
  for (; o; ) {
    let n = Object.getOwnPropertyDescriptor(o, e);
    if (o === r.declaringPrototype)
      return !!n && "value" in n && n.value === r.method;
    if (n)
      return false;
    o = Object.getPrototypeOf(o);
  }
  return false;
}
__name(kv, "kv");
function Gn(t15, e, r, o) {
  if (Object.prototype.hasOwnProperty.call(t15, r) || Object.getPrototypeOf(t15) !== e)
    return false;
  let n = Object.getOwnPropertyDescriptor(e, r);
  return !!n && "value" in n && n.value === o;
}
__name(Gn, "Gn");
function Pv(t15, e, r, o) {
  if (Object.prototype.hasOwnProperty.call(t15, e))
    return false;
  let n = Object.getPrototypeOf(t15), i = Object.getPrototypeOf(o.prototype);
  if (n !== o.prototype || Object.getPrototypeOf(n) !== i || n && Object.getOwnPropertyDescriptor(n, e))
    return false;
  let c = Object.getOwnPropertyDescriptor(i, e);
  return !!c && "value" in c && c.value === r;
}
__name(Pv, "Pv");
function qu(t15, e = false) {
  if (!(t15 instanceof Uint8Array) || Object.getPrototypeOf(t15) !== Uint8Array.prototype)
    return;
  for (let o of ["buffer", "byteOffset", "byteLength", "length", "slice", "constructor"])
    if (Object.prototype.hasOwnProperty.call(t15, o))
      return;
  let r = Object.getOwnPropertyDescriptor(Uint8Array.prototype, "constructor");
  if (!(!r || !("value" in r) || r.value !== Sv) && kv(Uint8Array.prototype, "slice", Ev)) {
    try {
      let o = t15.buffer;
      if (!(o instanceof ArrayBuffer) || Object.getPrototypeOf(o) !== ArrayBuffer.prototype || Object.prototype.hasOwnProperty.call(o, "byteLength") || t15.byteLength !== t15.length || !e && t15.byteLength === 0 || t15.byteOffset < 0 || t15.byteOffset + t15.byteLength > o.byteLength)
        return;
    } catch {
      return;
    }
    return t15;
  }
}
__name(qu, "qu");
function Rv(t15, e, r) {
  if (Object.getPrototypeOf(t15) !== r.LocalIdentificationBlock.prototype || !Gn(t15, r.LocalIdentificationBlock.prototype, "toBER", r.originalIdentificationToBER))
    return false;
  let o = me(t15, "tagClass"), n = me(t15, "tagNumber"), i = me(t15, "isConstructed"), s = me(t15, "isHexOnly"), c = me(t15, "valueHexView");
  return typeof o != "number" || !Number.isInteger(o) || o < 1 || o > 4 || typeof n != "number" || !Number.isInteger(n) || n < 0 || i !== e || typeof s != "boolean" ? false : s ? !!qu(c) : Number.isSafeInteger(n);
}
__name(Rv, "Rv");
function Mv(t15, e, r) {
  if (Object.getPrototypeOf(t15) !== r.LocalLengthBlock.prototype || !Gn(t15, r.LocalLengthBlock.prototype, "toBER", r.originalLengthToBER))
    return false;
  let o = me(t15, "isIndefiniteForm"), n = me(t15, "longFormUsed"), i = Object.getOwnPropertyDescriptor(t15, "length"), s = i && "value" in i ? i.value : void 0, c = Object.getOwnPropertyDescriptor(t15, "longFormUsed");
  return typeof o == "boolean" && (o === false || e) && typeof n == "boolean" && !!c && "value" in c && c.writable === true && !!i && "value" in i && i.writable === true && typeof s == "number" && Number.isSafeInteger(s) && s >= 0;
}
__name(Mv, "Mv");
function Dv(t15, e, r) {
  let o = me(t15, "idBlock"), n = me(t15, "lenBlock");
  return !!o && !!n && Rv(o, e, r) && Mv(n, e, r);
}
__name(Dv, "Dv");
function jv(t15, e) {
  let r = me(t15, "valueBlock");
  if (!r || Object.getPrototypeOf(r) !== e.LocalConstructedValueBlock.prototype || !Gn(r, e.LocalConstructedValueBlock.prototype, "toBER", e.originalConstructedToBER))
    return;
  let o = me(r, "value");
  if (!Array.isArray(o) || Object.getPrototypeOf(o) !== Array.prototype)
    return;
  let n = Object.getOwnPropertyDescriptor(o, "length");
  if (!n || !("value" in n) || n.value !== 1 || Object.prototype.hasOwnProperty.call(o, Symbol.iterator))
    return;
  let i = Object.getOwnPropertyDescriptor(Array.prototype, Symbol.iterator);
  if (!i || !("value" in i) || i.value !== _v)
    return;
  let s = Object.getOwnPropertyDescriptor(o, "0");
  if (!(!s || !("value" in s)) && Object.getOwnPropertyNames(o).length === 2)
    return s.value;
}
__name(jv, "jv");
function Uv(t15, e) {
  let r = me(t15, "valueBlock");
  if (!r || Object.getPrototypeOf(r) !== e.LocalBitStringValueBlock.prototype || !Gn(r, e.LocalBitStringValueBlock.prototype, "toBER", e.originalBitStringToBER) || me(r, "isConstructed") !== false)
    return;
  let o = me(r, "unusedBits");
  if (typeof o != "number" || !Number.isInteger(o) || o < 0 || o > 7)
    return;
  let n = qu(me(r, "valueHexView"), true);
  if (n)
    return { payload: n, prefix: Uint8Array.of(n.byteLength ? o : 0) };
}
__name(Uv, "Uv");
function Lv(t15, e, r) {
  let o = me(t15, "valueBlock");
  if (o) {
    if (e === "integer") {
      if (Object.getPrototypeOf(o) !== r.LocalIntegerValueBlock.prototype || !Gn(o, r.LocalIntegerValueBlock.prototype, "toBER", r.originalIntegerToBER))
        return;
    } else if (e === "octet") {
      if (Object.getPrototypeOf(o) !== r.LocalOctetStringValueBlock.prototype || !Gn(o, r.LocalOctetStringValueBlock.prototype, "toBER", r.originalOctetStringToBER) || me(o, "isConstructed") !== false)
        return;
    } else if (Object.getPrototypeOf(o) !== r.LocalPrimitiveValueBlock.prototype || !Pv(o, "toBER", r.originalPrimitiveToBER, r.LocalPrimitiveValueBlock))
      return;
    if (!(e === "primitive" && me(o, "isHexOnly") !== true) && typeof me(o, "isHexOnly") == "boolean")
      return qu(me(o, "valueHexView"));
  }
}
__name(Lv, "Lv");
function Hv(t15, e) {
  if (Object.prototype.hasOwnProperty.call(t15, "toBER"))
    return false;
  let r = t15;
  for (; r; ) {
    let o = Object.getOwnPropertyDescriptor(r, "toBER");
    if (o)
      return "value" in o && o.value === e.originalBaseBlockToBER;
    r = Object.getPrototypeOf(r);
  }
  return false;
}
__name(Hv, "Hv");
function $a(t15, e, r) {
  let o = r[e];
  return !!o && Object.getPrototypeOf(t15) === o.prototype;
}
__name($a, "$a");
function Vv(t15, e) {
  return Object.getPrototypeOf(t15) === e.Sequence.prototype || Object.getPrototypeOf(t15) === e.Set.prototype || Object.getPrototypeOf(t15) === e.Constructed.prototype;
}
__name(Vv, "Vv");
function Pp(t15, e, r) {
  if (!(e > Np || !t15 || typeof t15 != "object"))
    try {
      if (!Hv(t15, r))
        return;
      let o = $a(t15, "BitString", r) ? "bit" : $a(t15, "Integer", r) ? "integer" : $a(t15, "OctetString", r) ? "octet" : $a(t15, "Primitive", r) ? "primitive" : void 0, n = o === void 0 && Vv(t15, r);
      if (!o && !n || !Dv(t15, n, r))
        return;
      let i = me(t15, "idBlock"), s = me(t15, "lenBlock");
      if (!i || !s)
        return;
      if (o) {
        let d = o === "bit" ? Uv(t15, r) : void 0, h = o === "bit" ? d?.payload : Lv(t15, o, r);
        return h ? { block: t15, kind: o, idBlock: i, lenBlock: s, indefinite: false, payload: h, prefix: d?.prefix } : void 0;
      }
      let c = jv(t15, r), l = c && Pp(c, e + 1, r), f = me(s, "isIndefiniteForm");
      return l ? { block: t15, kind: "constructed", idBlock: i, lenBlock: s, indefinite: f === true, child: l } : void 0;
    } catch {
      return;
    }
}
__name(Pp, "Pp");
function Rp(t15, e, r) {
  var o, n;
  let i = Reflect.apply(r.originalIdentificationToBER, t15.idBlock, [e]);
  if (!(i instanceof ArrayBuffer) || i.byteLength === 0)
    throw TypeError("Built-in identifier encoding failed");
  let s;
  t15.kind === "constructed" ? s = Rp(t15.child, e, r) : s = t15.payload;
  let c = (s instanceof Uint8Array ? s.byteLength : s.total) + ((n = (o = t15.prefix) === null || o === void 0 ? void 0 : o.byteLength) !== null && n !== void 0 ? n : 0), l;
  if (t15.indefinite)
    l = Uint8Array.of(128).buffer;
  else if (t15.lenBlock.length = c, l = Reflect.apply(r.originalLengthToBER, t15.lenBlock, [e]), !(l instanceof ArrayBuffer) || l.byteLength === 0)
    throw TypeError("Built-in length encoding failed");
  let f = i.byteLength + l.byteLength + c + (t15.indefinite ? 2 : 0);
  if (!Number.isSafeInteger(f))
    throw RangeError("Built-in encoding is too large");
  return { id: i, len: l, payload: s, length: c, total: f, indefinite: t15.indefinite, prefix: t15.prefix };
}
__name(Rp, "Rp");
function Mp(t15, e, r, o) {
  return e.set(new Uint8Array(t15.id), r), r += t15.id.byteLength, e.set(new Uint8Array(t15.len), r), r += t15.len.byteLength, t15.prefix && (o || e.set(t15.prefix, r), r += t15.prefix.byteLength), t15.payload instanceof Uint8Array ? (o || e.set(t15.payload, r), r += t15.payload.byteLength) : r = Mp(t15.payload, e, r, o), t15.indefinite && (r += 2), r;
}
__name(Mp, "Mp");
function Fv(t15, e = false) {
  let r = Ka;
  if (!r || !Ov(r))
    return;
  let o = Pp(t15, 0, r);
  if (!o)
    return;
  let n = Rp(o, e, r), i = new Uint8Array(n.total);
  return Mp(n, i, 0, e), i.buffer;
}
__name(Fv, "Fv");
var ye = /* @__PURE__ */ __name(class extends Zr {
  constructor({ name: e = Ze, optional: r = false, primitiveSchema: o, ...n } = {}, i) {
    super(n), this.name = e, this.optional = r, o && (this.primitiveSchema = o), this.idBlock = new eo(n), this.lenBlock = new to(n), this.valueBlock = i ? new i(n) : new Ne(n);
  }
  fromBER(e, r, o, n) {
    let i = this.valueBlock.fromBER(e, r, this.lenBlock.isIndefiniteForm ? o : this.lenBlock.length, n);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  toBER(e, r) {
    let o = r || new Cr();
    if (!r && (Dp(this), (e === true || e === false || e === void 0) && Iv(this))) {
      let i = Fv(this, e === true);
      if (i)
        return i;
    }
    let n = this.idBlock.toBER(e);
    if (o.write(n), this.lenBlock.isIndefiniteForm)
      o.write(new Uint8Array([128]).buffer), this.valueBlock.toBER(e, o), o.write(new ArrayBuffer(2));
    else {
      let i = this.valueBlock.toBER(e);
      this.lenBlock.length = i.byteLength;
      let s = this.lenBlock.toBER(e);
      o.write(s), o.write(i);
    }
    return r ? rr : o.final();
  }
  toJSON() {
    let e = { ...super.toJSON(), idBlock: this.idBlock.toJSON(), lenBlock: this.lenBlock.toJSON(), valueBlock: this.valueBlock.toJSON(), name: this.name, optional: this.optional };
    return this.primitiveSchema && (e.primitiveSchema = this.primitiveSchema.toJSON()), e;
  }
  toString(e = "ascii") {
    return e === "ascii" ? this.onAsciiEncoding() : Z.Convert.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    let e = this.constructor.NAME, r = Z.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);
    return `${e} : ${r}`;
  }
  isEqual(e) {
    if (this === e)
      return true;
    if (!(e instanceof this.constructor))
      return false;
    let r = this.toBER(), o = e.toBER();
    return _p(r, o);
  }
}, "ye");
ye.NAME = "BaseBlock";
var Gv = ye.prototype.toBER;
function Dp(t15) {
  var e;
  if (t15 instanceof O.Constructed)
    for (let r of t15.valueBlock.value)
      Dp(r) && (t15.lenBlock.isIndefiniteForm = true);
  return !!(!((e = t15.lenBlock) === null || e === void 0) && e.isIndefiniteForm);
}
__name(Dp, "Dp");
var Yi = /* @__PURE__ */ __name(class extends ye {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  constructor({ value: e = Ze, ...r } = {}, o) {
    super(r, o), e && this.fromString(e);
  }
  fromBER(e, r, o) {
    let n = this.valueBlock.fromBER(e, r, this.lenBlock.isIndefiniteForm ? o : this.lenBlock.length);
    return n === -1 ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHexView), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), n);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
}, "Yi");
Yi.NAME = "BaseStringBlock";
var $u;
var Wn = /* @__PURE__ */ __name(class extends or(Ne) {
  constructor({ isHexOnly: e = true, ...r } = {}) {
    super(r), this.isHexOnly = e;
  }
}, "Wn");
Wn.NAME = "PrimitiveValueBlock";
var Wv = ($u = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Wn.prototype), "toBER")) === null || $u === void 0 ? void 0 : $u.value;
var jp;
var er = /* @__PURE__ */ __name(class extends ye {
  constructor(e = {}) {
    super(e, Wn), this.idBlock.isConstructed = false;
  }
}, "er");
jp = er;
O.Primitive = jp;
er.NAME = "PRIMITIVE";
var Up;
function $v(t15) {
  Up = { Integer: t15.Integer, Null: t15.Null, Sequence: t15.Sequence };
}
__name($v, "$v");
function Kv(t15) {
  let e = Object.getOwnPropertyDescriptor(t15, "nodesCount"), r = Object.getOwnPropertyDescriptor(t15, "maxNodes"), o = Object.getOwnPropertyDescriptor(t15, "maxContentLength");
  return !e || !("value" in e) || e.writable !== true || !r || !("value" in r) || !o || !("value" in o) ? false : typeof e.value == "number" && Number.isSafeInteger(e.value) && e.value >= 0 && typeof r.value == "number" && Number.isSafeInteger(r.value) && r.value >= 0 && typeof o.value == "number" && Number.isSafeInteger(o.value) && o.value >= 0 && e.value < r.value;
}
__name(Kv, "Kv");
function qv(t15, e, r) {
  let o = Object.getOwnPropertyDescriptor(t15, e);
  return !!o && "value" in o && o.value === r;
}
__name(qv, "qv");
function Xv(t15, e, r, o) {
  let n = Up;
  if (!n)
    return;
  let i, s = 0;
  try {
    if (Object.getPrototypeOf(t15) !== Uint8Array.prototype || !Number.isSafeInteger(e) || e < 0 || !Number.isSafeInteger(r) || r < 2 || e > t15.byteLength || r > t15.byteLength - e)
      return;
    let f = t15[e];
    if (f !== 2 && f !== 5 && f !== 48 || (s = t15[e + 1], s >= 128 || s > r - 2) || f === 5 && s !== 0 || !Kv(o) || s > Object.getOwnPropertyDescriptor(o, "maxContentLength").value)
      return;
    let d = f === 2 ? "Integer" : f === 5 ? "Null" : "Sequence";
    if (i = n[d], !qv(O, d, i))
      return;
    let h = Object.getOwnPropertyDescriptor(eo.prototype, "fromBER"), g = Object.getOwnPropertyDescriptor(to.prototype, "fromBER");
    if (!h || !("value" in h) || h.value !== wv || !g || !("value" in g) || g.value !== xv)
      return;
  } catch {
    return;
  }
  if (!i)
    return;
  let c = new i();
  c.idBlock.tagClass = 1, c.idBlock.tagNumber = t15[e] & 31, c.idBlock.isConstructed = t15[e] === 48, c.idBlock.isHexOnly = false, c.idBlock.blockLength = 1, c.lenBlock.isIndefiniteForm = false, c.lenBlock.longFormUsed = false, c.lenBlock.length = s, c.lenBlock.blockLength = 1, o.nodesCount += 1;
  let l = c.fromBER(t15, e + 2, s, o);
  return c.valueBeforeDecodeView = t15.subarray(e, e + c.blockLength), { offset: l, result: c };
}
__name(Xv, "Xv");
var Lp = 100;
var Hp = 1e4;
var Vp = 16 * 1024 * 1024;
var zv = "Maximum ASN.1 nesting depth exceeded";
var Jv = "Maximum ASN.1 node count exceeded";
var Qv = "Maximum ASN.1 content length exceeded";
function as(t15 = {}) {
  var e, r, o, n;
  return { depth: 0, maxDepth: (e = t15.maxDepth) !== null && e !== void 0 ? e : Lp, nodesCount: 0, maxNodes: (r = t15.maxNodes) !== null && r !== void 0 ? r : Hp, maxContentLength: (o = t15.maxContentLength) !== null && o !== void 0 ? o : Vp, parseEmbedded: (n = t15.parseEmbedded) !== null && n !== void 0 ? n : true };
}
__name(as, "as");
function Yv(t15) {
  let e = new ye({}, Ne);
  return e.error = t15, { offset: -1, result: e };
}
__name(Yv, "Yv");
function Zv(t15) {
  if (t15.nodesCount += 1, t15.nodesCount > t15.maxNodes)
    return Jv;
}
__name(Zv, "Zv");
function eA(t15, e) {
  if (t15 > e.maxContentLength)
    return Qv;
}
__name(eA, "eA");
function Xu(t15, e, r, o) {
  let n = o.depth + 1;
  if (n > o.maxDepth)
    return Yv(zv);
  o.depth = n;
  try {
    return ic(t15, e, r, o);
  } finally {
    o.depth -= 1;
  }
}
__name(Xu, "Xu");
function tA(t15, e) {
  if (t15 instanceof e)
    return t15;
  let r = new e();
  return r.idBlock = t15.idBlock, r.lenBlock = t15.lenBlock, r.warnings = t15.warnings, r.valueBeforeDecodeView = t15.valueBeforeDecodeView, r;
}
__name(tA, "tA");
function ic(t15, e = 0, r = t15.length, o = as()) {
  let n = Xv(t15, e, r, o);
  if (n)
    return n;
  let i = e, s = new ye({}, Ne);
  if (!Tr(s, t15, e, r))
    return { offset: -1, result: s };
  if (Number.isInteger(e) && Number.isInteger(r) ? r === 0 : t15.subarray(e, e + r).length === 0)
    return s.error = "Zero buffer length", { offset: -1, result: s };
  let l = Zv(o);
  if (l)
    return s.error = l, { offset: -1, result: s };
  let f = s.idBlock.fromBER(t15, e, r);
  if (s.idBlock.warnings.length && s.warnings.concat(s.idBlock.warnings), f === -1)
    return s.error = s.idBlock.error, { offset: -1, result: s };
  if (e = f, r -= s.idBlock.blockLength, f = s.lenBlock.fromBER(t15, e, r), s.lenBlock.warnings.length && s.warnings.concat(s.lenBlock.warnings), f === -1)
    return s.error = s.lenBlock.error, { offset: -1, result: s };
  e = f, r -= s.lenBlock.blockLength;
  let d = s.lenBlock.isIndefiniteForm ? r : s.lenBlock.length, h = eA(d, o);
  if (h)
    return s.error = h, { offset: -1, result: s };
  if (!s.idBlock.isConstructed && s.lenBlock.isIndefiniteForm)
    return s.error = "Indefinite length form used for primitive encoding form", { offset: -1, result: s };
  let g = ye;
  switch (s.idBlock.tagClass) {
    case 1:
      if (s.idBlock.tagNumber >= 37 && s.idBlock.isHexOnly === false)
        return s.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", { offset: -1, result: s };
      switch (s.idBlock.tagNumber) {
        case 0:
          if (s.idBlock.isConstructed && s.lenBlock.length > 0)
            return s.error = "Type [UNIVERSAL 0] is reserved", { offset: -1, result: s };
          g = O.EndOfContent;
          break;
        case 1:
          g = O.Boolean;
          break;
        case 2:
          g = O.Integer;
          break;
        case 3:
          g = O.BitString;
          break;
        case 4:
          g = O.OctetString;
          break;
        case 5:
          g = O.Null;
          break;
        case 6:
          g = O.ObjectIdentifier;
          break;
        case 10:
          g = O.Enumerated;
          break;
        case 12:
          g = O.Utf8String;
          break;
        case 13:
          g = O.RelativeObjectIdentifier;
          break;
        case 14:
          g = O.TIME;
          break;
        case 15:
          return s.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", { offset: -1, result: s };
        case 16:
          g = O.Sequence;
          break;
        case 17:
          g = O.Set;
          break;
        case 18:
          g = O.NumericString;
          break;
        case 19:
          g = O.PrintableString;
          break;
        case 20:
          g = O.TeletexString;
          break;
        case 21:
          g = O.VideotexString;
          break;
        case 22:
          g = O.IA5String;
          break;
        case 23:
          g = O.UTCTime;
          break;
        case 24:
          g = O.GeneralizedTime;
          break;
        case 25:
          g = O.GraphicString;
          break;
        case 26:
          g = O.VisibleString;
          break;
        case 27:
          g = O.GeneralString;
          break;
        case 28:
          g = O.UniversalString;
          break;
        case 29:
          g = O.CharacterString;
          break;
        case 30:
          g = O.BmpString;
          break;
        case 31:
          g = O.DATE;
          break;
        case 32:
          g = O.TimeOfDay;
          break;
        case 33:
          g = O.DateTime;
          break;
        case 34:
          g = O.Duration;
          break;
        default: {
          let C = s.idBlock.isConstructed ? new O.Constructed() : new O.Primitive();
          C.idBlock = s.idBlock, C.lenBlock = s.lenBlock, C.warnings = s.warnings, s = C;
        }
      }
      break;
    default:
      g = s.idBlock.isConstructed ? O.Constructed : O.Primitive;
  }
  return s = tA(s, g), f = s.fromBER(t15, e, d, o), s.valueBeforeDecodeView = t15.subarray(i, i + s.blockLength), { offset: f, result: s };
}
__name(ic, "ic");
function Br(t15, e = {}) {
  if (!t15.byteLength) {
    let n = new ye({}, Ne);
    return n.error = "Input buffer has zero length", { offset: -1, result: n };
  }
  let r = Z.BufferSourceConverter.toUint8Array(t15), o = e.copyInput === false ? r : r.slice();
  return ic(o, 0, t15.byteLength, as(e));
}
__name(Br, "Br");
function rA(t15, e) {
  return t15 ? 1 : e;
}
__name(rA, "rA");
var At = /* @__PURE__ */ __name(class extends Ne {
  constructor({ value: e = [], isIndefiniteForm: r = false, ...o } = {}) {
    super(o), this.value = e, this.isIndefiniteForm = r;
  }
  fromBER(e, r, o, n) {
    let i = Z.BufferSourceConverter.toUint8Array(e), s = n ?? as();
    if (!Tr(this, i, r, o))
      return -1;
    if (this.valueBeforeDecodeView = i.subarray(r, r + o), this.valueBeforeDecodeView.length === 0)
      return this.warnings.push("Zero buffer length"), r;
    let c = r;
    for (; rA(this.isIndefiniteForm, o) > 0; ) {
      let l = Xu(i, c, o, s);
      if (l.offset === -1)
        return this.error = l.result.error, this.warnings.concat(l.result.warnings), -1;
      if (c = l.offset, this.blockLength += l.result.blockLength, o -= l.result.blockLength, this.value.push(l.result), this.isIndefiniteForm && l.result.constructor.NAME === Qi)
        break;
    }
    return this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.NAME === Qi ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), c;
  }
  toBER(e, r) {
    let o = r || new Cr();
    for (let n = 0; n < this.value.length; n++)
      this.value[n].toBER(e, o);
    return r ? rr : o.final();
  }
  toJSON() {
    let e = { ...super.toJSON(), isIndefiniteForm: this.isIndefiniteForm, value: [] };
    for (let r of this.value)
      e.value.push(r.toJSON());
    return e;
  }
}, "At");
At.NAME = "ConstructedValueBlock";
var oA = At.prototype.toBER;
var Fp;
var Ee = /* @__PURE__ */ __name(class extends ye {
  constructor(e = {}) {
    super(e, At), this.idBlock.isConstructed = true;
  }
  fromBER(e, r, o, n) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    let i = this.valueBlock.fromBER(e, r, this.lenBlock.isIndefiniteForm ? o : this.lenBlock.length, n);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  onAsciiEncoding() {
    let e = [];
    for (let o of this.valueBlock.value)
      e.push(o.toString("ascii").split(`
`).map((n) => `  ${n}`).join(`
`));
    let r = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return e.length ? `${r} :
${e.join(`
`)}` : `${r} :`;
  }
}, "Ee");
Fp = Ee;
O.Constructed = Fp;
Ee.NAME = "CONSTRUCTED";
var za = /* @__PURE__ */ __name(class extends Ne {
  fromBER(e, r, o) {
    return r;
  }
  toBER(e) {
    return rr;
  }
}, "za");
za.override = "EndOfContentValueBlock";
var Gp;
var Zi = /* @__PURE__ */ __name(class extends ye {
  constructor(e = {}) {
    super(e, za), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0;
  }
}, "Zi");
Gp = Zi;
O.EndOfContent = Gp;
Zi.NAME = Qi;
var Wp;
var wt = /* @__PURE__ */ __name(class extends ye {
  constructor(e = {}) {
    super(e, Ne), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5;
  }
  fromBER(e, r, o) {
    return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.blockLength += o, r + o > e.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", -1) : r + o;
  }
  toBER(e, r) {
    let o = new ArrayBuffer(2);
    if (!e) {
      let n = new Uint8Array(o);
      n[0] = 5, n[1] = 0;
    }
    return r && r.write(o), o;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
}, "wt");
Wp = wt;
O.Null = Wp;
wt.NAME = "NULL";
var Ja = /* @__PURE__ */ __name(class extends or(Ne) {
  get value() {
    for (let e of this.valueHexView)
      if (e > 0)
        return true;
    return false;
  }
  set value(e) {
    this.valueHexView[0] = e ? 255 : 0;
  }
  constructor({ value: e, ...r } = {}) {
    super(r), r.valueHex ? this.valueHexView = Z.BufferSourceConverter.toUint8Array(r.valueHex) : this.valueHexView = new Uint8Array(1), e && (this.value = e);
  }
  fromBER(e, r, o) {
    let n = Z.BufferSourceConverter.toUint8Array(e);
    return Tr(this, n, r, o) ? (this.valueHexView = n.subarray(r, r + o), o > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = true, Hu.call(this), this.blockLength = o, r + o) : -1;
  }
  toBER() {
    return this.valueHexView.slice().buffer;
  }
  toJSON() {
    return { ...super.toJSON(), value: this.value };
  }
}, "Ja");
Ja.NAME = "BooleanValueBlock";
var $p;
var Fo = /* @__PURE__ */ __name(class extends ye {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  constructor(e = {}) {
    super(e, Ja), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
}, "Fo");
$p = Fo;
O.Boolean = $p;
Fo.NAME = "BOOLEAN";
var $n = /* @__PURE__ */ __name(class extends or(At) {
  constructor({ isConstructed: e = false, ...r } = {}) {
    super(r), this.isConstructed = e;
  }
  fromBER(e, r, o, n) {
    let i = 0;
    if (this.isConstructed) {
      if (this.isHexOnly = false, i = At.prototype.fromBER.call(this, e, r, o, n), i === -1)
        return i;
      for (let s = 0; s < this.value.length; s++) {
        let c = this.value[s].constructor.NAME;
        if (c === Qi) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
        }
        if (c !== Ip)
          return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
      }
    } else
      this.isHexOnly = true, i = super.fromBER(e, r, o), this.blockLength = o;
    return i;
  }
  toBER(e, r) {
    return this.isConstructed ? At.prototype.toBER.call(this, e, r) : e ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return { ...super.toJSON(), isConstructed: this.isConstructed };
  }
}, "$n");
$n.NAME = "OctetStringValueBlock";
var nA = $n.prototype.toBER;
var zu;
var bt = /* @__PURE__ */ __name(class extends ye {
  constructor({ idBlock: e = {}, lenBlock: r = {}, ...o } = {}) {
    var n, i;
    (n = o.isConstructed) !== null && n !== void 0 || (o.isConstructed = !!(!((i = o.value) === null || i === void 0) && i.length)), super({ idBlock: { isConstructed: o.isConstructed, ...e }, lenBlock: { ...r, isIndefiniteForm: !!o.isIndefiniteForm }, ...o }, $n), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 4;
  }
  fromBER(e, r, o, n) {
    if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, o === 0)
      return this.idBlock.error.length === 0 && (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length === 0 && (this.blockLength += this.lenBlock.blockLength), r;
    if (!this.valueBlock.isConstructed && n?.parseEmbedded !== false) {
      let s = (e instanceof ArrayBuffer ? new Uint8Array(e) : e).subarray(r, r + o);
      try {
        if (s.byteLength) {
          let c = n ?? as(), l = Xu(s, 0, s.byteLength, c);
          l.offset !== -1 && l.offset === o && (this.valueBlock.value = [l.result]);
        }
      } catch {
      }
    }
    return super.fromBER(e, r, o, n);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
      return Ee.prototype.onAsciiEncoding.call(this);
    let e = this.constructor.NAME, r = Z.Convert.ToHex(this.valueBlock.valueHexView);
    return `${e} : ${r}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed)
      return this.valueBlock.valueHexView.slice().buffer;
    let e = [];
    for (let r of this.valueBlock.value)
      r instanceof zu && e.push(r.valueBlock.valueHexView);
    return Z.BufferSourceConverter.concat(e);
  }
}, "bt");
zu = bt;
O.OctetString = zu;
bt.NAME = Ip;
var Kn = /* @__PURE__ */ __name(class extends or(At) {
  constructor({ unusedBits: e = 0, isConstructed: r = false, ...o } = {}) {
    super(o), this.unusedBits = e, this.isConstructed = r, this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(e, r, o, n) {
    if (!o)
      return r;
    let i = -1;
    if (this.isConstructed) {
      if (i = At.prototype.fromBER.call(this, e, r, o, n), i === -1)
        return i;
      for (let l of this.value) {
        let f = l.constructor.NAME;
        if (f === Qi) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
        }
        if (f !== Op)
          return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
        let d = l.valueBlock;
        if (this.unusedBits > 0 && d.unusedBits > 0)
          return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
        this.unusedBits = d.unusedBits;
      }
      return i;
    }
    let s = Z.BufferSourceConverter.toUint8Array(e);
    if (!Tr(this, s, r, o))
      return -1;
    let c = s.subarray(r, r + o);
    if (this.unusedBits = c[0], this.unusedBits > 7)
      return this.error = "Unused bits for BitString must be in range 0-7", -1;
    if (!this.unusedBits && n?.parseEmbedded !== false) {
      let l = c.subarray(1);
      try {
        if (l.byteLength) {
          let f = n ?? as(), d = Xu(l, 0, l.byteLength, f);
          d.offset !== -1 && d.offset === o - 1 && (this.value = [d.result]);
        }
      } catch {
      }
    }
    return this.valueHexView = c.subarray(1), this.blockLength = c.length, r + o;
  }
  toBER(e, r) {
    if (this.isConstructed)
      return At.prototype.toBER.call(this, e, r);
    if (e)
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    if (!this.valueHexView.byteLength) {
      let n = new Uint8Array(1);
      return n[0] = 0, n.buffer;
    }
    let o = new Uint8Array(this.valueHexView.length + 1);
    return o[0] = this.unusedBits, o.set(this.valueHexView, 1), o.buffer;
  }
  toJSON() {
    return { ...super.toJSON(), unusedBits: this.unusedBits, isConstructed: this.isConstructed };
  }
}, "Kn");
Kn.NAME = "BitStringValueBlock";
var iA = Kn.prototype.toBER;
var Kp;
var xt = /* @__PURE__ */ __name(class extends ye {
  constructor({ idBlock: e = {}, lenBlock: r = {}, ...o } = {}) {
    var n, i;
    (n = o.isConstructed) !== null && n !== void 0 || (o.isConstructed = !!(!((i = o.value) === null || i === void 0) && i.length)), super({ idBlock: { isConstructed: o.isConstructed, ...e }, lenBlock: { ...r, isIndefiniteForm: !!o.isIndefiniteForm }, ...o }, Kn), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 3;
  }
  fromBER(e, r, o, n) {
    return this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, super.fromBER(e, r, o, n);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
      return Ee.prototype.onAsciiEncoding.call(this);
    {
      let e = [], r = this.valueBlock.valueHexView;
      for (let s of r)
        e.push(s.toString(2).padStart(8, "0"));
      let o = e.join(""), n = this.constructor.NAME, i = o.substring(0, o.length - this.valueBlock.unusedBits);
      return `${n} : ${i}`;
    }
  }
}, "xt");
Kp = xt;
O.BitString = Kp;
xt.NAME = Op;
function qp(t15) {
  if (!t15.byteLength)
    return BigInt(0);
  let e = BigInt(`0x${Z.Convert.ToHex(t15)}`);
  return t15[0] & 128 ? e - (BigInt(1) << BigInt(t15.byteLength * 8)) : e;
}
__name(qp, "qp");
function sA(t15) {
  if (typeof BigInt < "u")
    return qp(t15).toString(10);
  let e = 1e7, r = 7;
  if (!t15.byteLength)
    return "0";
  let o = !!(t15[0] & 128), n = t15;
  if (o) {
    n = new Uint8Array(t15.length);
    let l = 1;
    for (let f = t15.length - 1; f >= 0; f--) {
      let d = (t15[f] ^ 255) + l;
      n[f] = d & 255, l = d >> 8;
    }
  }
  let i = [0];
  for (let l = 0; l < n.length; l++) {
    let f = n[l];
    for (let d = 0; d < i.length; d++) {
      let h = i[d] * 256 + f;
      i[d] = h % e, f = Math.floor(h / e);
    }
    f && i.push(f);
  }
  let s = i.length - 1;
  for (; s > 0 && i[s] === 0; )
    s--;
  let c = String(i[s]);
  for (let l = s - 1; l >= 0; l--)
    c += String(i[l]).padStart(r, "0");
  return o && c !== "0" ? `-${c}` : c;
}
__name(sA, "sA");
var Xp;
var ro = /* @__PURE__ */ __name(class extends or(Ne) {
  setValueHex() {
    this.valueHexView.length >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = true, this._valueDec = 0) : (this.isHexOnly = false, this.valueHexView.length > 0 && (this._valueDec = Hu.call(this)));
  }
  constructor({ value: e, ...r } = {}) {
    super(r), this._valueDec = 0, r.valueHex && this.setValueHex(), e !== void 0 && (this.valueDec = e);
  }
  set valueDec(e) {
    this._valueDec = e, this.isHexOnly = false, this.valueHexView = new Uint8Array(Sp(e));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(e, r, o, n = 0) {
    let i = this.fromBER(e, r, o);
    if (i === -1)
      return i;
    let s = this.valueHexView;
    return s[0] === 0 && (s[1] & 128) !== 0 ? this.valueHexView = s.subarray(1) : n !== 0 && s.length < n && (n - s.length > 1 && (n = s.length + 1), this.valueHexView = s.subarray(n - s.length)), i;
  }
  toDER(e = false) {
    let r = this.valueHexView;
    switch (true) {
      case (r[0] & 128) !== 0:
        {
          let o = new Uint8Array(this.valueHexView.length + 1);
          o[0] = 0, o.set(r, 1), this.valueHexView = o;
        }
        break;
      case (r[0] === 0 && (r[1] & 128) === 0):
        this.valueHexView = this.valueHexView.subarray(1);
        break;
    }
    return this.toBER(e);
  }
  fromBER(e, r, o) {
    let n = super.fromBER(e, r, o);
    return n === -1 || this.setValueHex(), n;
  }
  toBER(e) {
    return e ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return { ...super.toJSON(), valueDec: this.valueDec };
  }
  toString() {
    return sA(this.valueHexView);
  }
}, "ro");
Xp = ro;
ro.NAME = "IntegerValueBlock";
Object.defineProperty(Xp.prototype, "valueHex", { set: function(t15) {
  this.valueHexView = new Uint8Array(t15), this.setValueHex();
}, get: function() {
  return this.valueHexView.slice().buffer;
} });
var aA = ro.prototype.toBER;
var cA = ro.prototype.toString;
var Ji;
var Lt = /* @__PURE__ */ __name(class extends ye {
  constructor(e = {}) {
    super(e, ro), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    qa();
    let e = this.valueBlock, r = e.toString;
    return r === cA ? qp(e.valueHexView) : BigInt(Reflect.apply(r, e, []));
  }
  static fromBigInt(e) {
    qa();
    let r = BigInt(e), o = new Cr(), n = r.toString(16).replace(/^-/, ""), i = new Uint8Array(Z.Convert.FromHex(n));
    if (r < 0) {
      let c = new Uint8Array(i.length + (i[0] & 128 ? 1 : 0));
      c[0] |= 128;
      let f = BigInt(`0x${Z.Convert.ToHex(c)}`) + r, d = Z.BufferSourceConverter.toUint8Array(Z.Convert.FromHex(f.toString(16)));
      d[0] |= 128, o.write(d);
    } else
      i[0] & 128 && o.write(new Uint8Array([0])), o.write(i);
    return new Ji({ valueHex: o.final() });
  }
  convertToDER() {
    let e = new Ji({ valueHex: this.valueBlock.valueHexView });
    return e.valueBlock.toDER(), e;
  }
  convertFromDER() {
    return new Ji({ valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
}, "Lt");
Ji = Lt;
O.Integer = Ji;
Lt.NAME = "INTEGER";
var zp;
var Go = /* @__PURE__ */ __name(class extends Lt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10;
  }
}, "Go");
zp = Go;
O.Enumerated = zp;
Go.NAME = "ENUMERATED";
var es = /* @__PURE__ */ __name(class extends or(Ne) {
  constructor({ valueDec: e = -1, isFirstSid: r = false, ...o } = {}) {
    super(o), this.valueDec = e, this.isFirstSid = r;
  }
  fromBER(e, r, o) {
    if (!o)
      return r;
    let n = Z.BufferSourceConverter.toUint8Array(e);
    if (!Tr(this, n, r, o))
      return -1;
    let i = n.subarray(r, r + o);
    if (this.blockLength === 0 && Number.isInteger(r) && Number.isInteger(o)) {
      let c = 0;
      for (; c < o; ) {
        let l = i[c];
        if (c++, (l & 128) === 0)
          break;
      }
      this.blockLength = c, this.valueHexView = new Uint8Array(c);
      for (let l = 0; l < c; l++)
        this.valueHexView[l] = i[l] & 127;
    } else {
      this.valueHexView = new Uint8Array(o);
      for (let l = 0; l < o && (this.valueHexView[l] = i[l] & 127, this.blockLength++, (i[l] & 128) !== 0); l++)
        ;
      let c = new Uint8Array(this.blockLength);
      for (let l = 0; l < this.blockLength; l++)
        c[l] = this.valueHexView[l];
      this.valueHexView = c;
    }
    return (i[this.blockLength - 1] & 128) !== 0 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = Vo(this.valueHexView, 7) : (this.isHexOnly = true, this.warnings.push("Too big SID for decoding, hex only")), r + this.blockLength);
  }
  set valueBigInt(e) {
    qa();
    let r = BigInt(e).toString(2);
    for (; r.length % 7; )
      r = "0" + r;
    let o = new Uint8Array(r.length / 7);
    for (let n = 0; n < o.length; n++)
      o[n] = parseInt(r.slice(n * 7, n * 7 + 7), 2) + (n + 1 < o.length ? 128 : 0);
    this.fromBER(o.buffer, 0, o.length);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      let n = this.valueHexView, i = new Uint8Array(this.blockLength);
      for (let s = 0; s < this.blockLength - 1; s++)
        i[s] = n[s] | 128;
      return i[this.blockLength - 1] = n[this.blockLength - 1], Z.BufferSourceConverter.toArrayBuffer(i);
    }
    let r = Yr(this.valueDec, 7);
    if (r.byteLength === 0)
      return this.error = "Error during encoding SID value", rr;
    let o = new Uint8Array(r.byteLength);
    if (!e) {
      let n = new Uint8Array(r), i = r.byteLength - 1;
      for (let s = 0; s < i; s++)
        o[s] = n[s] | 128;
      o[i] = n[i];
    }
    return Z.BufferSourceConverter.toArrayBuffer(o);
  }
  toString() {
    let e = "";
    if (this.isHexOnly)
      e = Z.Convert.ToHex(this.valueHexView);
    else if (this.isFirstSid) {
      let r = this.valueDec;
      this.valueDec <= 39 ? e = "0." : this.valueDec <= 79 ? (e = "1.", r -= 40) : (e = "2.", r -= 80), e += r.toString();
    } else
      e = this.valueDec.toString();
    return e;
  }
  toJSON() {
    return { ...super.toJSON(), valueDec: this.valueDec, isFirstSid: this.isFirstSid };
  }
}, "es");
es.NAME = "sidBlock";
var Qa = /* @__PURE__ */ __name(class extends Ne {
  constructor({ value: e = Ze, ...r } = {}) {
    super(r), this.value = [], e && this.fromString(e);
  }
  fromBER(e, r, o) {
    let n = r;
    for (; o > 0; ) {
      let i = new es();
      if (n = i.fromBER(e, n, o), n === -1)
        return this.blockLength = 0, this.error = i.error, n;
      this.value.length === 0 && (i.isFirstSid = true), this.blockLength += i.blockLength, o -= i.blockLength, this.value.push(i);
    }
    return n;
  }
  toBER(e) {
    let r = [];
    for (let o = 0; o < this.value.length; o++) {
      let n = this.value[o].toBER(e);
      if (n.byteLength === 0)
        return this.error = this.value[o].error, rr;
      r.push(n);
    }
    return Xa(r);
  }
  fromString(e) {
    this.value = [];
    let r = 0, o = 0, n = "", i = false;
    do
      if (o = e.indexOf(".", r), o === -1 ? n = e.substring(r) : n = e.substring(r, o), r = o + 1, i) {
        let s = this.value[0], c = 0;
        switch (s.valueDec) {
          case 0:
            break;
          case 1:
            c = 40;
            break;
          case 2:
            c = 80;
            break;
          default:
            this.value = [];
            return;
        }
        let l = parseInt(n, 10);
        if (isNaN(l))
          return;
        s.valueDec = l + c, i = false;
      } else {
        let s = new es();
        if (n > Number.MAX_SAFE_INTEGER) {
          qa();
          let c = BigInt(n);
          s.valueBigInt = c;
        } else if (s.valueDec = parseInt(n, 10), isNaN(s.valueDec))
          return;
        this.value.length || (s.isFirstSid = true, i = true), this.value.push(s);
      }
    while (o !== -1);
  }
  toString() {
    let e = "", r = false;
    for (let o = 0; o < this.value.length; o++) {
      r = this.value[o].isHexOnly;
      let n = this.value[o].toString();
      o !== 0 && (e = `${e}.`), r ? (n = `{${n}}`, this.value[o].isFirstSid ? e = `2.{${n} - 80}` : e += n) : e += n;
    }
    return e;
  }
  toJSON() {
    let e = { ...super.toJSON(), value: this.toString(), sidArray: [] };
    for (let r = 0; r < this.value.length; r++)
      e.sidArray.push(this.value[r].toJSON());
    return e;
  }
}, "Qa");
Qa.NAME = "ObjectIdentifierValueBlock";
var Jp;
var Wo = /* @__PURE__ */ __name(class extends ye {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  constructor(e = {}) {
    super(e, Qa), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return { ...super.toJSON(), value: this.getValue() };
  }
}, "Wo");
Jp = Wo;
O.ObjectIdentifier = Jp;
Wo.NAME = "OBJECT IDENTIFIER";
var ts = /* @__PURE__ */ __name(class extends or(Zr) {
  constructor({ valueDec: e = 0, ...r } = {}) {
    super(r), this.valueDec = e;
  }
  fromBER(e, r, o) {
    if (o === 0)
      return r;
    let n = Z.BufferSourceConverter.toUint8Array(e);
    if (!Tr(this, n, r, o))
      return -1;
    let i = n.subarray(r, r + o);
    if (this.blockLength === 0 && Number.isInteger(r) && Number.isInteger(o)) {
      let c = 0;
      for (; c < o; ) {
        let l = i[c];
        if (c++, (l & 128) === 0)
          break;
      }
      this.blockLength = c, this.valueHexView = new Uint8Array(c);
      for (let l = 0; l < c; l++)
        this.valueHexView[l] = i[l] & 127;
    } else {
      this.valueHexView = new Uint8Array(o);
      for (let l = 0; l < o && (this.valueHexView[l] = i[l] & 127, this.blockLength++, (i[l] & 128) !== 0); l++)
        ;
      let c = new Uint8Array(this.blockLength);
      for (let l = 0; l < this.blockLength; l++)
        c[l] = this.valueHexView[l];
      this.valueHexView = c;
    }
    return (i[this.blockLength - 1] & 128) !== 0 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = Vo(this.valueHexView, 7) : (this.isHexOnly = true, this.warnings.push("Too big SID for decoding, hex only")), r + this.blockLength);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      let n = this.valueHexView, i = new Uint8Array(this.blockLength);
      for (let s = 0; s < this.blockLength - 1; s++)
        i[s] = n[s] | 128;
      return i[this.blockLength - 1] = n[this.blockLength - 1], i.buffer;
    }
    let r = Yr(this.valueDec, 7);
    if (r.byteLength === 0)
      return this.error = "Error during encoding SID value", rr;
    let o = new Uint8Array(r.byteLength);
    if (!e) {
      let n = new Uint8Array(r), i = r.byteLength - 1;
      for (let s = 0; s < i; s++)
        o[s] = n[s] | 128;
      o[i] = n[i];
    }
    return o.buffer;
  }
  toString() {
    let e = "";
    return this.isHexOnly ? e = Z.Convert.ToHex(this.valueHexView) : e = this.valueDec.toString(), e;
  }
  toJSON() {
    return { ...super.toJSON(), valueDec: this.valueDec };
  }
}, "ts");
ts.NAME = "relativeSidBlock";
var Ya = /* @__PURE__ */ __name(class extends Ne {
  constructor({ value: e = Ze, ...r } = {}) {
    super(r), this.value = [], e && this.fromString(e);
  }
  fromBER(e, r, o) {
    let n = r;
    for (; o > 0; ) {
      let i = new ts();
      if (n = i.fromBER(e, n, o), n === -1)
        return this.blockLength = 0, this.error = i.error, n;
      this.blockLength += i.blockLength, o -= i.blockLength, this.value.push(i);
    }
    return n;
  }
  toBER(e, r) {
    let o = [];
    for (let n = 0; n < this.value.length; n++) {
      let i = this.value[n].toBER(e);
      if (i.byteLength === 0)
        return this.error = this.value[n].error, rr;
      o.push(i);
    }
    return Xa(o);
  }
  fromString(e) {
    this.value = [];
    let r = 0, o = 0, n = "";
    do {
      o = e.indexOf(".", r), o === -1 ? n = e.substring(r) : n = e.substring(r, o), r = o + 1;
      let i = new ts();
      if (i.valueDec = parseInt(n, 10), isNaN(i.valueDec))
        return true;
      this.value.push(i);
    } while (o !== -1);
    return true;
  }
  toString() {
    let e = "", r = false;
    for (let o = 0; o < this.value.length; o++) {
      r = this.value[o].isHexOnly;
      let n = this.value[o].toString();
      o !== 0 && (e = `${e}.`), r && (n = `{${n}}`), e += n;
    }
    return e;
  }
  toJSON() {
    let e = { ...super.toJSON(), value: this.toString(), sidArray: [] };
    for (let r = 0; r < this.value.length; r++)
      e.sidArray.push(this.value[r].toJSON());
    return e;
  }
}, "Ya");
Ya.NAME = "RelativeObjectIdentifierValueBlock";
var Qp;
var $o = /* @__PURE__ */ __name(class extends ye {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  constructor(e = {}) {
    super(e, Ya), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return { ...super.toJSON(), value: this.getValue() };
  }
}, "$o");
Qp = $o;
O.RelativeObjectIdentifier = Qp;
$o.NAME = "RelativeObjectIdentifier";
var Yp;
var ke = /* @__PURE__ */ __name(class extends Ee {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16;
  }
}, "ke");
Yp = ke;
O.Sequence = Yp;
ke.NAME = "SEQUENCE";
var Zp;
var Ge = /* @__PURE__ */ __name(class extends Ee {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17;
  }
}, "Ge");
Zp = Ge;
O.Set = Zp;
Ge.NAME = "SET";
var Za = /* @__PURE__ */ __name(class extends or(Ne) {
  constructor({ ...e } = {}) {
    super(e), this.isHexOnly = true, this.value = Ze;
  }
  toJSON() {
    return { ...super.toJSON(), value: this.value };
  }
}, "Za");
Za.NAME = "StringValueBlock";
var ec = /* @__PURE__ */ __name(class extends Za {
}, "ec");
ec.NAME = "SimpleStringValueBlock";
var ze = /* @__PURE__ */ __name(class extends Yi {
  constructor({ ...e } = {}) {
    super(e, ec);
  }
  fromBuffer(e) {
    this.valueBlock.value = String.fromCharCode.apply(null, Z.BufferSourceConverter.toUint8Array(e));
  }
  fromString(e) {
    let r = e.length, o = this.valueBlock.valueHexView = new Uint8Array(r);
    for (let n = 0; n < r; n++)
      o[n] = e.charCodeAt(n);
    this.valueBlock.value = e;
  }
}, "ze");
ze.NAME = "SIMPLE STRING";
var tc = /* @__PURE__ */ __name(class extends ze {
  fromBuffer(e) {
    this.valueBlock.valueHexView = Z.BufferSourceConverter.toUint8Array(e);
    try {
      this.valueBlock.value = Z.Convert.ToUtf8String(e);
    } catch (r) {
      this.warnings.push(`Error during "decodeURIComponent": ${r}, using raw string`), this.valueBlock.value = Z.Convert.ToBinary(e);
    }
  }
  fromString(e) {
    this.valueBlock.valueHexView = new Uint8Array(Z.Convert.FromUtf8String(e)), this.valueBlock.value = e;
  }
}, "tc");
tc.NAME = "Utf8StringValueBlock";
var ed;
var Et = /* @__PURE__ */ __name(class extends tc {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12;
  }
}, "Et");
ed = Et;
O.Utf8String = ed;
Et.NAME = "UTF8String";
var rc = /* @__PURE__ */ __name(class extends ze {
  fromBuffer(e) {
    this.valueBlock.value = Z.Convert.ToUtf16String(e), this.valueBlock.valueHexView = Z.BufferSourceConverter.toUint8Array(e);
  }
  fromString(e) {
    this.valueBlock.value = e, this.valueBlock.valueHexView = new Uint8Array(Z.Convert.FromUtf16String(e));
  }
}, "rc");
rc.NAME = "BmpStringValueBlock";
var td;
var Ko = /* @__PURE__ */ __name(class extends rc {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30;
  }
}, "Ko");
td = Ko;
O.BmpString = td;
Ko.NAME = "BMPString";
var oc = /* @__PURE__ */ __name(class extends ze {
  fromBuffer(e) {
    let r = ArrayBuffer.isView(e) ? e.slice().buffer : e.slice(0), o = new Uint8Array(r);
    for (let n = 0; n < o.length; n += 4)
      o[n] = o[n + 3], o[n + 1] = o[n + 2], o[n + 2] = 0, o[n + 3] = 0;
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(r));
  }
  fromString(e) {
    let r = e.length, o = this.valueBlock.valueHexView = new Uint8Array(r * 4);
    for (let n = 0; n < r; n++) {
      let i = Yr(e.charCodeAt(n), 8), s = new Uint8Array(i);
      if (s.length > 4)
        continue;
      let c = 4 - s.length;
      for (let l = s.length - 1; l >= 0; l--)
        o[n * 4 + l + c] = s[l];
    }
    this.valueBlock.value = e;
  }
}, "oc");
oc.NAME = "UniversalStringValueBlock";
var rd;
var qo = /* @__PURE__ */ __name(class extends oc {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28;
  }
}, "qo");
rd = qo;
O.UniversalString = rd;
qo.NAME = "UniversalString";
var od;
var Xo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18;
  }
}, "Xo");
od = Xo;
O.NumericString = od;
Xo.NAME = "NumericString";
var nd;
var zo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19;
  }
}, "zo");
nd = zo;
O.PrintableString = nd;
zo.NAME = "PrintableString";
var id;
var Jo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20;
  }
}, "Jo");
id = Jo;
O.TeletexString = id;
Jo.NAME = "TeletexString";
var sd;
var Qo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21;
  }
}, "Qo");
sd = Qo;
O.VideotexString = sd;
Qo.NAME = "VideotexString";
var ad;
var Yo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22;
  }
}, "Yo");
ad = Yo;
O.IA5String = ad;
Yo.NAME = "IA5String";
var cd;
var Zo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25;
  }
}, "Zo");
cd = Zo;
O.GraphicString = cd;
Zo.NAME = "GraphicString";
var ud;
var oo = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26;
  }
}, "oo");
ud = oo;
O.VisibleString = ud;
oo.NAME = "VisibleString";
var ld;
var en = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27;
  }
}, "en");
ld = en;
O.GeneralString = ld;
en.NAME = "GeneralString";
var fd;
var tn = /* @__PURE__ */ __name(class extends ze {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29;
  }
}, "tn");
fd = tn;
O.CharacterString = fd;
tn.NAME = "CharacterString";
var pd;
var no = /* @__PURE__ */ __name(class extends oo {
  constructor({ value: e, valueDate: r, ...o } = {}) {
    if (super(o), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, e) {
      this.fromString(e), this.valueBlock.valueHexView = new Uint8Array(e.length);
      for (let n = 0; n < e.length; n++)
        this.valueBlock.valueHexView[n] = e.charCodeAt(n);
    }
    r && (this.fromDate(r), this.valueBlock.valueHexView = new Uint8Array(this.toBuffer())), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 23;
  }
  fromBuffer(e) {
    this.fromString(String.fromCharCode.apply(null, Z.BufferSourceConverter.toUint8Array(e)));
  }
  toBuffer() {
    let e = this.toString(), r = new ArrayBuffer(e.length), o = new Uint8Array(r);
    for (let n = 0; n < e.length; n++)
      o[n] = e.charCodeAt(n);
    return r;
  }
  fromDate(e) {
    this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(e) {
    let o = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(e);
    if (o === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    let n = parseInt(o[1], 10);
    n >= 50 ? this.year = 1900 + n : this.year = 2e3 + n, this.month = parseInt(o[2], 10), this.day = parseInt(o[3], 10), this.hour = parseInt(o[4], 10), this.minute = parseInt(o[5], 10), this.second = parseInt(o[6], 10);
  }
  toString(e = "iso") {
    if (e === "iso") {
      let r = Array.from({ length: 7 });
      return r[0] = Ye(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), r[1] = Ye(this.month, 2), r[2] = Ye(this.day, 2), r[3] = Ye(this.hour, 2), r[4] = Ye(this.minute, 2), r[5] = Ye(this.second, 2), r[6] = "Z", r.join("");
    }
    return super.toString(e);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return { ...super.toJSON(), year: this.year, month: this.month, day: this.day, hour: this.hour, minute: this.minute, second: this.second };
  }
}, "no");
pd = no;
O.UTCTime = pd;
no.NAME = "UTCTime";
var dd;
var rn = /* @__PURE__ */ __name(class extends no {
  constructor(e = {}) {
    var r;
    super(e), (r = this.millisecond) !== null && r !== void 0 || (this.millisecond = 0), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 24;
  }
  fromDate(e) {
    super.fromDate(e), this.millisecond = e.getUTCMilliseconds();
  }
  toDate() {
    let e = Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
    return new Date(e);
  }
  fromString(e) {
    let r = false, o = "", n = "", i = 0, s, c = 0, l = 0;
    if (e[e.length - 1] === "Z")
      o = e.substring(0, e.length - 1), r = true;
    else {
      let h = new Number(e[e.length - 1]);
      if (isNaN(h.valueOf()))
        throw new Error("Wrong input string for conversion");
      o = e;
    }
    if (r) {
      if (o.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (o.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let h = 1, g = o.indexOf("+"), C = "";
      if (g === -1 && (g = o.indexOf("-"), h = -1), g !== -1) {
        if (C = o.substring(g + 1), o = o.substring(0, g), C.length !== 2 && C.length !== 4)
          throw new Error("Wrong input string for conversion");
        let k = parseInt(C.substring(0, 2), 10);
        if (isNaN(k.valueOf()))
          throw new Error("Wrong input string for conversion");
        if (c = h * k, C.length === 4) {
          if (k = parseInt(C.substring(2, 4), 10), isNaN(k.valueOf()))
            throw new Error("Wrong input string for conversion");
          l = h * k;
        }
      }
    }
    let f = o.indexOf(".");
    if (f === -1 && (f = o.indexOf(",")), f !== -1) {
      let h = new Number(`0${o.substring(f)}`);
      if (isNaN(h.valueOf()))
        throw new Error("Wrong input string for conversion");
      i = h.valueOf(), n = o.substring(0, f);
    } else
      n = o;
    switch (true) {
      case n.length === 8:
        if (s = /(\d{4})(\d{2})(\d{2})/gi, f !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case n.length === 10:
        if (s = /(\d{4})(\d{2})(\d{2})(\d{2})/gi, f !== -1) {
          let h = 60 * i;
          this.minute = Math.floor(h), h = 60 * (h - this.minute), this.second = Math.floor(h), h = 1e3 * (h - this.second), this.millisecond = Math.floor(h);
        }
        break;
      case n.length === 12:
        if (s = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi, f !== -1) {
          let h = 60 * i;
          this.second = Math.floor(h), h = 1e3 * (h - this.second), this.millisecond = Math.floor(h);
        }
        break;
      case n.length === 14:
        if (s = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi, f !== -1) {
          let h = 1e3 * i;
          this.millisecond = Math.floor(h);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    let d = s.exec(n);
    if (d === null)
      throw new Error("Wrong input string for conversion");
    for (let h = 1; h < d.length; h++)
      switch (h) {
        case 1:
          this.year = parseInt(d[h], 10);
          break;
        case 2:
          this.month = parseInt(d[h], 10);
          break;
        case 3:
          this.day = parseInt(d[h], 10);
          break;
        case 4:
          this.hour = parseInt(d[h], 10) + c;
          break;
        case 5:
          this.minute = parseInt(d[h], 10) + l;
          break;
        case 6:
          this.second = parseInt(d[h], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    if (r === false) {
      let h = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = h.getUTCFullYear(), this.month = h.getUTCMonth(), this.day = h.getUTCDay(), this.hour = h.getUTCHours(), this.minute = h.getUTCMinutes(), this.second = h.getUTCSeconds(), this.millisecond = h.getUTCMilliseconds();
    }
  }
  toString(e = "iso") {
    if (e === "iso") {
      let r = [];
      return r.push(Ye(this.year, 4)), r.push(Ye(this.month, 2)), r.push(Ye(this.day, 2)), r.push(Ye(this.hour, 2)), r.push(Ye(this.minute, 2)), r.push(Ye(this.second, 2)), this.millisecond !== 0 && (r.push("."), r.push(Ye(this.millisecond, 3).replace(/0+$/, ""))), r.push("Z"), r.join("");
    }
    return super.toString(e);
  }
  toJSON() {
    return { ...super.toJSON(), millisecond: this.millisecond };
  }
}, "rn");
dd = rn;
O.GeneralizedTime = dd;
rn.NAME = "GeneralizedTime";
var hd;
var rs = /* @__PURE__ */ __name(class extends Et {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31;
  }
}, "rs");
hd = rs;
O.DATE = hd;
rs.NAME = "DATE";
var md;
var os = /* @__PURE__ */ __name(class extends Et {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32;
  }
}, "os");
md = os;
O.TimeOfDay = md;
os.NAME = "TimeOfDay";
var yd;
var ns = /* @__PURE__ */ __name(class extends Et {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33;
  }
}, "ns");
yd = ns;
O.DateTime = yd;
ns.NAME = "DateTime";
var gd;
var is = /* @__PURE__ */ __name(class extends Et {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34;
  }
}, "is");
gd = is;
O.Duration = gd;
is.NAME = "Duration";
var vd;
var ss = /* @__PURE__ */ __name(class extends Et {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14;
  }
}, "ss");
vd = ss;
O.TIME = vd;
ss.NAME = "TIME";
var tr = /* @__PURE__ */ __name(class {
  constructor({ name: e = Ze, optional: r = false } = {}) {
    this.name = e, this.optional = r;
  }
}, "tr");
var qn = /* @__PURE__ */ __name(class extends tr {
  constructor({ value: e = [], ...r } = {}) {
    super(r), this.value = e;
  }
}, "qn");
var on = /* @__PURE__ */ __name(class extends tr {
  constructor({ value: e = new tr(), local: r = false, ...o } = {}) {
    super(o), this.value = e, this.local = r;
  }
}, "on");
var Ku = /* @__PURE__ */ __name(class {
  get data() {
    return this.dataView.slice().buffer;
  }
  set data(e) {
    this.dataView = Z.BufferSourceConverter.toUint8Array(e);
  }
  constructor({ data: e = nc } = {}) {
    this.dataView = Z.BufferSourceConverter.toUint8Array(e);
  }
  fromBER(e, r, o) {
    let n = r + o;
    return this.dataView = Z.BufferSourceConverter.toUint8Array(e).subarray(r, n), n;
  }
  toBER(e) {
    return this.dataView.slice().buffer;
  }
}, "Ku");
function _r(t15, e, r) {
  if (r instanceof qn) {
    for (let i of r.value)
      if (_r(t15, e, i).verified)
        return { verified: true, result: t15 };
    {
      let i = { verified: false, result: { error: "Wrong values for Choice type" } };
      return r.hasOwnProperty(Vu) && (i.name = r.name), i;
    }
  }
  if (r instanceof tr)
    return r.hasOwnProperty(Vu) && (t15[r.name] = e), { verified: true, result: t15 };
  if (!(t15 instanceof Object))
    return { verified: false, result: { error: "Wrong root object" } };
  if (!(e instanceof Object))
    return { verified: false, result: { error: "Wrong ASN.1 data" } };
  if (!(r instanceof Object))
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (!(pv in r))
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (!(yv in r.idBlock))
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (!(gv in r.idBlock))
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  let o = r.idBlock.toBER(false);
  if (o.byteLength === 0)
    return { verified: false, result: { error: "Error encoding idBlock for ASN.1 schema" } };
  if (r.idBlock.fromBER(o, 0, o.byteLength) === -1)
    return { verified: false, result: { error: "Error decoding idBlock for ASN.1 schema" } };
  if (r.idBlock.hasOwnProperty(dv) === false)
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (r.idBlock.tagClass !== e.idBlock.tagClass)
    return { verified: false, result: t15 };
  if (r.idBlock.hasOwnProperty(hv) === false)
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (r.idBlock.tagNumber !== e.idBlock.tagNumber)
    return { verified: false, result: t15 };
  if (r.idBlock.hasOwnProperty(mv) === false)
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (r.idBlock.isConstructed !== e.idBlock.isConstructed)
    return { verified: false, result: t15 };
  if (!(fv in r.idBlock))
    return { verified: false, result: { error: "Wrong ASN.1 schema" } };
  if (r.idBlock.isHexOnly !== e.idBlock.isHexOnly)
    return { verified: false, result: t15 };
  if (r.idBlock.isHexOnly) {
    if (!(Cp in r.idBlock))
      return { verified: false, result: { error: "Wrong ASN.1 schema" } };
    let i = r.idBlock.valueHexView, s = e.idBlock.valueHexView;
    if (i.length !== s.length)
      return { verified: false, result: t15 };
    for (let c = 0; c < i.length; c++)
      if (i[c] !== s[1])
        return { verified: false, result: t15 };
  }
  if (r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && (t15[r.name] = e)), r instanceof O.Constructed) {
    let i = 0, s = { verified: false, result: { error: "Unknown error" } }, c = r.valueBlock.value.length;
    if (c > 0 && r.valueBlock.value[0] instanceof on && (c = e.valueBlock.value.length), c === 0)
      return { verified: true, result: t15 };
    if (e.valueBlock.value.length === 0 && r.valueBlock.value.length !== 0) {
      let l = true;
      for (let f = 0; f < r.valueBlock.value.length; f++)
        l = l && (r.valueBlock.value[f].optional || false);
      return l ? { verified: true, result: t15 } : (r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && delete t15[r.name]), t15.error = "Inconsistent object length", { verified: false, result: t15 });
    }
    for (let l = 0; l < c; l++)
      if (l - i >= e.valueBlock.value.length) {
        if (r.valueBlock.value[l].optional === false) {
          let f = { verified: false, result: t15 };
          return t15.error = "Inconsistent length between ASN.1 data and schema", r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && (delete t15[r.name], f.name = r.name)), f;
        }
      } else if (r.valueBlock.value[0] instanceof on) {
        if (s = _r(t15, e.valueBlock.value[l], r.valueBlock.value[0].value), s.verified === false)
          if (r.valueBlock.value[0].optional)
            i++;
          else
            return r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && delete t15[r.name]), s;
        if (Vu in r.valueBlock.value[0] && r.valueBlock.value[0].name.length > 0) {
          let f = {};
          vv in r.valueBlock.value[0] && r.valueBlock.value[0].local ? f = e : f = t15, typeof f[r.valueBlock.value[0].name] > "u" && (f[r.valueBlock.value[0].name] = []), f[r.valueBlock.value[0].name].push(e.valueBlock.value[l]);
        }
      } else if (s = _r(t15, e.valueBlock.value[l - i], r.valueBlock.value[l]), s.verified === false)
        if (r.valueBlock.value[l].optional)
          i++;
        else
          return r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && delete t15[r.name]), s;
    if (s.verified === false) {
      let l = { verified: false, result: t15 };
      return r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && (delete t15[r.name], l.name = r.name)), l;
    }
    return { verified: true, result: t15 };
  }
  if (r.primitiveSchema && Cp in e.valueBlock) {
    let i = ic(e.valueBlock.valueHexView);
    if (i.offset === -1) {
      let s = { verified: false, result: i.result };
      return r.name && (r.name = r.name.replace(/^\s+|\s+$/g, Ze), r.name && (delete t15[r.name], s.name = r.name)), s;
    }
    return _r(t15, i.result, r.primitiveSchema);
  }
  return { verified: true, result: t15 };
}
__name(_r, "_r");
function uA(t15, e) {
  if (!(e instanceof Object))
    return { verified: false, result: { error: "Wrong ASN.1 schema type" } };
  let r = ic(Z.BufferSourceConverter.toUint8Array(t15));
  return r.offset === -1 ? { verified: false, result: r.result } : _r(r.result, r.result, e);
}
__name(uA, "uA");
Tv({ BitString: xt, Integer: Lt, OctetString: bt, Primitive: er, Constructed: Ee, Sequence: ke, Set: Ge }, { BaseBlock: ye, ViewWriter: Cr, LocalIdentificationBlock: eo, LocalLengthBlock: to, LocalIntegerValueBlock: ro, LocalOctetStringValueBlock: $n, LocalConstructedValueBlock: At, LocalBitStringValueBlock: Kn, LocalPrimitiveValueBlock: Wn, originalBaseBlockToBER: Gv, originalWriterWrite: uv, originalWriterFinal: lv, originalIdentificationToBER: Av, originalLengthToBER: bv, originalIntegerToBER: aA, originalOctetStringToBER: nA, originalBitStringToBER: iA, originalConstructedToBER: oA, originalPrimitiveToBER: Wv });
$v({ Integer: Lt, Null: wt, Sequence: ke });
var lA = "[object ArrayBuffer]";
var fA = "[object SharedArrayBuffer]";
function Ad(t15) {
  return Object.prototype.toString.call(t15);
}
__name(Ad, "Ad");
function pA(t15) {
  if (ArrayBuffer.isView(t15))
    return true;
  if (!t15 || typeof t15 != "object")
    return false;
  let e = t15;
  return typeof e.byteOffset == "number" && typeof e.byteLength == "number" && ac(e.buffer);
}
__name(pA, "pA");
function sc(t15) {
  return Ad(t15) === lA;
}
__name(sc, "sc");
function wd(t15) {
  return typeof SharedArrayBuffer < "u" && Ad(t15) === fA;
}
__name(wd, "wd");
function ac(t15) {
  return sc(t15) || wd(t15);
}
__name(ac, "ac");
function Ju(t15) {
  return pA(t15);
}
__name(Ju, "Ju");
function ir(t15) {
  return ac(t15) || Ju(t15);
}
__name(ir, "ir");
function Qu(t15) {
  if (!ir(t15))
    throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView");
}
__name(Qu, "Qu");
function We(t15) {
  return Qu(t15), ac(t15) ? new Uint8Array(t15) : new Uint8Array(t15.buffer, t15.byteOffset, t15.byteLength);
}
__name(We, "We");
function ae(t15) {
  if (Qu(t15), sc(t15))
    return t15;
  let e = new ArrayBuffer(t15.byteLength);
  return new Uint8Array(e).set(We(t15)), e;
}
__name(ae, "ae");
function cs(t15, e, r = {}) {
  let o = We(t15), n = We(e);
  if (!r.constantTime && o.byteLength !== n.byteLength)
    return false;
  let i = Math.max(o.byteLength, n.byteLength), s = o.byteLength ^ n.byteLength;
  for (let c = 0; c < i; c++)
    s |= (o[c] ?? 0) ^ (n[c] ?? 0);
  return s === 0;
}
__name(cs, "cs");
var Ir = {};
Ut(Ir, { binary: () => mA, decode: () => uc, encode: () => cc, is: () => Ed });
function cc(t15) {
  let e = We(t15), r = "";
  for (let o of e)
    r += String.fromCharCode(o);
  return r;
}
__name(cc, "cc");
function uc(t15) {
  let e = new Uint8Array(t15.length);
  for (let r = 0; r < t15.length; r++)
    e[r] = t15.charCodeAt(r) & 255;
  return e;
}
__name(uc, "uc");
function Ed(t15) {
  return typeof t15 == "string";
}
__name(Ed, "Ed");
var mA = { encode: cc, decode: uc, is: Ed };
var Pe = {};
Ut(Pe, { decode: () => Zu, encode: () => Yu, format: () => Bd, formats: () => Id, hex: () => CA, is: () => Cd, normalize: () => us, parse: () => Td });
var yA = /^[0-9a-f]$/i;
var gA = [" ", "	", `
`, "\r", ":", "-", "."];
function vA(t15) {
  return t15.separators === "none" ? [] : !t15.separators || t15.separators === "common" ? gA : t15.separators;
}
__name(vA, "vA");
function AA(t15) {
  if (!t15)
    throw new TypeError("Hex separators must be non-empty strings");
}
__name(AA, "AA");
function wA(t15, e, r) {
  for (let o of r)
    if (t15.startsWith(o, e))
      return o;
}
__name(wA, "wA");
function bA(t15) {
  let e = /[A-F]/.test(t15), r = /[a-f]/.test(t15);
  return e && !r ? "upper" : "lower";
}
__name(bA, "bA");
function xA(t15) {
  let e = /\r\n|\n/.exec(t15);
  if (e)
    return e[0] === `\r
` ? `\r
` : `
`;
}
__name(xA, "xA");
function Sd(t15) {
  return t15.replace(/[^0-9a-f]/gi, "");
}
__name(Sd, "Sd");
function EA(t15) {
  let e = t15.match(/[0-9A-Fa-f]+|[^0-9A-Fa-f]+/g) ?? [];
  if (e.length < 3)
    return;
  let r = e.filter((s, c) => c % 2 === 0), o = e.filter((s, c) => c % 2 === 1), n = o[0];
  if (!n || o.some((s) => s !== n) || r.some((s) => s.length === 0 || s.length % 2 !== 0))
    return;
  let i = r[0]?.length ?? 0;
  if (i && !r.slice(0, -1).some((s) => s.length !== i) && !((r[r.length - 1]?.length ?? 0) > i))
    return { size: i / 2, separator: n };
}
__name(EA, "EA");
function SA(t15) {
  let e = t15.trim(), r = /^0x/i.test(e) ? "0x" : "", o = r ? e.slice(2) : e, n = xA(o), i = o.split(/\r\n|\n/).filter((f) => f.length > 0), s = i[0]?.trim() ?? "", c = EA(s), l = { case: bA(e), prefix: r };
  if (c && (l.group = c), n && i.length > 1) {
    let f = Sd(i[0] ?? "").length / 2;
    f > 0 && i.slice(0, -1).every((d) => Sd(d).length / 2 === f) && (l.line = { bytesPerLine: f, separator: n });
  }
  return l;
}
__name(SA, "SA");
function _A(t15, e) {
  let r = e.allowPrefix ?? true, o = [...vA(e)].sort((c, l) => l.length - c.length);
  for (let c of o)
    AA(c);
  let n = t15.trim();
  if (/^0x/i.test(n)) {
    if (!r)
      throw new TypeError("Hexadecimal text must not include a 0x prefix");
    n = n.slice(2);
  }
  let i = "", s = false;
  for (let c = 0; c < n.length; ) {
    let l = n[c] ?? "";
    if (yA.test(l)) {
      i += l, s = false, c += 1;
      continue;
    }
    let f = wA(n, c, o);
    if (!f)
      throw new TypeError("Input is not valid hexadecimal text");
    if (e.strict && (s || i.length === 0))
      throw new TypeError("Hexadecimal text contains misplaced separators");
    s = true, c += f.length;
  }
  if (e.strict && s && i.length > 0)
    throw new TypeError("Hexadecimal text must not end with a separator");
  if (i.length % 2 !== 0) {
    if (!e.allowOddLength)
      throw new TypeError("Hexadecimal text must contain an even number of characters");
    i = `0${i}`;
  }
  return i.toLowerCase();
}
__name(_A, "_A");
function _d(t15, e) {
  if (!e)
    return t15.join("");
  if (!Number.isInteger(e.size) || e.size < 1)
    throw new RangeError("Hex group size must be a positive integer");
  let r = [];
  for (let o = 0; o < t15.length; o += e.size)
    r.push(t15.slice(o, o + e.size).join(""));
  return r.join(e.separator);
}
__name(_d, "_d");
function us(t15, e = {}) {
  return _A(t15, e);
}
__name(us, "us");
function Cd(t15, e = {}) {
  if (typeof t15 != "string")
    return false;
  try {
    return us(t15, e), true;
  } catch {
    return false;
  }
}
__name(Cd, "Cd");
function Yu(t15, e = {}) {
  let r = We(t15), o = e.case ?? "lower", n = Array.from(r, (s) => {
    let c = s.toString(16).padStart(2, "0");
    return o === "upper" ? c.toUpperCase() : c;
  }), i = "";
  if (e.line) {
    let s = e.line.bytesPerLine;
    if (!Number.isInteger(s) || s < 1)
      throw new RangeError("Hex bytesPerLine must be a positive integer");
    let c = e.line.separator ?? `
`, l = [];
    for (let f = 0; f < n.length; f += s)
      l.push(_d(n.slice(f, f + s), e.group));
    i = l.join(c);
  } else
    i = _d(n, e.group);
  return `${e.prefix ?? ""}${i}`;
}
__name(Yu, "Yu");
function Zu(t15, e = {}) {
  let r = us(t15, e), o = new Uint8Array(r.length / 2);
  for (let n = 0; n < r.length; n += 2)
    o[n / 2] = Number.parseInt(r.slice(n, n + 2), 16);
  return o;
}
__name(Zu, "Zu");
function Td(t15, e = {}) {
  let r = us(t15, e);
  return { bytes: Zu(r), format: SA(t15), normalized: r };
}
__name(Td, "Td");
function Bd(t15, e) {
  return Yu(t15, e);
}
__name(Bd, "Bd");
var Id = { compact: Object.freeze({}), upper: Object.freeze({ case: "upper" }), colon: Object.freeze({ group: { size: 1, separator: ":" } }), colonUpper: Object.freeze({ case: "upper", group: { size: 1, separator: ":" } }), groupsOf4: Object.freeze({ group: { size: 4, separator: " " } }), prefixed: Object.freeze({ prefix: "0x" }) };
var CA = { encode: Yu, decode: Zu, format: Bd, formats: Id, is: Cd, normalize: us, parse: Td };
var io = {};
Ut(io, { decode: () => Nd, encode: () => Od, utf8: () => TA });
function Od(t15) {
  return new TextEncoder().encode(t15);
}
__name(Od, "Od");
function Nd(t15) {
  return new TextDecoder("utf-8", { fatal: false }).decode(We(t15));
}
__name(Nd, "Nd");
var TA = { encode: Od, decode: Nd };
var sr = {};
Ut(sr, { decode: () => Pd, encode: () => kd, utf16: () => BA });
function kd(t15, e = {}) {
  let r = new ArrayBuffer(t15.length * 2), o = new DataView(r);
  for (let n = 0; n < t15.length; n++)
    o.setUint16(n * 2, t15.charCodeAt(n), e.littleEndian ?? false);
  return new Uint8Array(r);
}
__name(kd, "kd");
function Pd(t15, e = {}) {
  let r = ae(t15), o = new DataView(r), n = "";
  for (let i = 0; i < r.byteLength; i += 2)
    n += String.fromCharCode(o.getUint16(i, e.littleEndian ?? false));
  return n;
}
__name(Pd, "Pd");
var BA = { encode: kd, decode: Pd };
var St = {};
Ut(St, { base64: () => so, decode: () => jd, encode: () => Dd, is: () => el, normalize: () => lc, pad: () => Md });
var IA = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
function Rd() {
  return globalThis.Buffer;
}
__name(Rd, "Rd");
function lc(t15) {
  return t15.replace(/[\n\r\t ]/g, "");
}
__name(lc, "lc");
function Md(t15) {
  let e = t15.length % 4;
  return e ? t15 + "=".repeat(4 - e) : t15;
}
__name(Md, "Md");
function el(t15) {
  if (typeof t15 != "string")
    return false;
  let e = lc(t15);
  return e === "" || IA.test(e);
}
__name(el, "el");
function Dd(t15, e) {
  let r = We(t15), o = Rd();
  return o ? o.from(r).toString("base64") : btoa(cc(r));
}
__name(Dd, "Dd");
function jd(t15, e) {
  let r = lc(t15);
  if (!el(r))
    throw new TypeError("Input is not valid Base64 text");
  let o = Rd();
  return o ? new Uint8Array(o.from(r, "base64")) : uc(atob(r));
}
__name(jd, "jd");
var so = { encode: Dd, decode: jd, is: el, normalize: lc, pad: Md };
var Ht = {};
Ut(Ht, { base64url: () => NA, decode: () => Ld, encode: () => Ud, is: () => tl, normalize: () => fc });
var OA = /^[A-Za-z0-9_-]*$/;
function fc(t15) {
  return t15.replace(/[\n\r\t ]/g, "");
}
__name(fc, "fc");
function tl(t15) {
  return typeof t15 == "string" && OA.test(fc(t15));
}
__name(tl, "tl");
function Ud(t15, e) {
  return so.encode(t15).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(Ud, "Ud");
function Ld(t15, e) {
  let r = fc(t15);
  if (!tl(r))
    throw new TypeError("Input is not valid Base64Url text");
  return so.decode(so.pad(r.replace(/-/g, "+").replace(/_/g, "/")));
}
__name(Ld, "Ld");
var NA = { encode: Ud, decode: Ld, is: tl, normalize: fc };
var kA = /^[A-Z0-9][A-Z0-9 ._-]*[A-Z0-9]$/i;
var Hd = /-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/g;
function Vd(t15) {
  if (!kA.test(t15))
    throw new TypeError(`Invalid PEM label '${t15}'`);
}
__name(Vd, "Vd");
function PA(t15, e) {
  let r = [];
  for (let o = 0; o < t15.length; o += e)
    r.push(t15.slice(o, o + e));
  return r;
}
__name(PA, "PA");
function RA(t15) {
  let r = t15.trim().replace(/\r\n/g, `
`).split(`
`).map((i) => i.trim()).filter(Boolean), o = {}, n = 0;
  for (; n < r.length; n++) {
    let i = r[n], s = i.indexOf(":");
    if (s <= 0)
      break;
    o[i.slice(0, s).trim()] = i.slice(s + 1).trim();
  }
  return { headers: Object.keys(o).length ? o : void 0, base64Lines: r.slice(n), base64Text: r.slice(n).join("") };
}
__name(RA, "RA");
function MA(t15) {
  return /\r\n/.test(t15) ? `\r
` : `
`;
}
__name(MA, "MA");
function Fd(t15, e = {}) {
  let r = [], o = e.label, n;
  for (Hd.lastIndex = 0; n = Hd.exec(t15); ) {
    let i = n[1].trim();
    if (o && i !== o)
      continue;
    Vd(i);
    let s = RA(n[2]);
    r.push({ label: i, data: so.decode(s.base64Text), headers: s.headers, lineLength: s.base64Lines[0]?.length ?? 64, newline: MA(n[0]) });
  }
  if (e.strict && r.length === 0)
    throw new TypeError(o ? `No PEM block with label '${o}' was found` : "No PEM blocks were found");
  return r;
}
__name(Fd, "Fd");
function pc(t15, e, r = {}) {
  Vd(t15);
  let o = r.lineLength ?? 64;
  if (!Number.isInteger(o) || o < 1)
    throw new RangeError("PEM lineLength must be a positive integer");
  let n = r.newline ?? `
`, i = [`-----BEGIN ${t15}-----`];
  if (r.headers) {
    for (let [s, c] of Object.entries(r.headers))
      i.push(`${s}: ${c}`);
    i.push("");
  }
  return i.push(...PA(so.encode(e), o)), i.push(`-----END ${t15}-----`), `${i.join(n)}${n}`;
}
__name(pc, "pc");
function Gd(t15, e = {}) {
  return Fd(t15, e).map(({ lineLength: r, newline: o, ...n }) => n);
}
__name(Gd, "Gd");
function Wd(t15, e) {
  let [r] = Gd(t15, { label: e, strict: true });
  return r.data;
}
__name(Wd, "Wd");
function $d(t15, e = {}) {
  let [r] = Fd(t15, { ...e, strict: true }), o = { label: r.label, headers: r.headers, lineLength: r.lineLength, newline: r.newline };
  return { bytes: r.data, format: o, normalized: pc(r.label, r.data, o) };
}
__name($d, "$d");
function Kd(t15, e) {
  return pc(e.label, t15, e);
}
__name(Kd, "Kd");
var ls = { name: "pem", encode: (t15, e) => {
  if (!e?.label)
    throw new TypeError("PEM label is required");
  return pc(e.label, t15, e);
}, decode: (t15, e) => Wd(t15, e?.label), format: Kd, is: (t15) => typeof t15 == "string" && /-----BEGIN [^-]+-----/.test(t15), parse: $d };
function ar(t15) {
  return t15.trim().toLowerCase();
}
__name(ar, "ar");
function DA(t15) {
  return t15 instanceof Error ? t15 : new Error(String(t15));
}
__name(DA, "DA");
function qd(t15, e, r) {
  for (let o of [r.name, ...r.aliases ?? []])
    t15.delete(ar(o));
  e.delete(ar(r.name));
}
__name(qd, "qd");
function rl(t15, e, r) {
  let o = t15[r];
  if (typeof o != "function")
    throw new Error(`Converter '${e}' does not support ${r}()`);
  return o;
}
__name(rl, "rl");
function jA(t15, e, r) {
  let o = ar(r.name || t15), n = e.trim();
  if (!n)
    return 0;
  let i = false;
  r.is && (i = r.is(e));
  let s = false;
  try {
    r.decode(e), s = true;
  } catch {
    s = false;
  }
  if (!i && !s)
    return 0;
  switch (o) {
    case "pem":
      return /-----BEGIN [^-]+-----/.test(e) ? 1 : 0;
    case "hex": {
      let c = n.replace(/^0x/i, "").replace(/[\s:.-]/g, "");
      return !c || /[^0-9a-f]/i.test(c) || c.length % 2 !== 0 ? 0 : /^0x/i.test(n) || /[:\s.-]/.test(n) ? 0.95 : /[a-f]/.test(n) || /[A-F]/.test(n) ? 0.8 : 0.45;
    }
    case "base64url":
      return /[-_]/.test(n) ? 0.95 : /=/.test(n) ? 0.1 : 0.6;
    case "base64":
      return /[+/=]/.test(n) ? 0.9 : 0.55;
    case "binary":
    case "utf8":
    case "utf16be":
    case "utf16le":
      return 0;
    default:
      return i && s ? 0.75 : 0.5;
  }
}
__name(jA, "jA");
function ol(t15 = []) {
  let e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = { register(n, i = {}) {
    if (!n.name || !ar(n.name))
      throw new TypeError("Converter name is required");
    let s = [...new Set([n.name, ...n.aliases ?? []].map(ar))], c = /* @__PURE__ */ new Set();
    for (let l of s) {
      let f = e.get(l);
      if (f) {
        if (!i.override)
          throw new Error(`Converter '${l}' is already registered`);
        c.add(f);
      }
    }
    for (let l of c)
      qd(e, r, l);
    for (let l of s)
      e.set(l, n);
    return r.add(ar(n.name)), this;
  }, unregister(n) {
    let i = e.get(ar(n));
    return i ? (qd(e, r, i), true) : false;
  }, has(n) {
    return e.has(ar(n));
  }, get(n) {
    let i = e.get(ar(n));
    if (!i)
      throw new Error(`Converter '${n}' is not registered`);
    return i;
  }, list() {
    return [...r].map((n) => this.get(n));
  }, encode(n, i, s) {
    return this.get(n).encode(i, s);
  }, decode(n, i, s) {
    return this.get(n).decode(i, s);
  }, tryDecode(n, i, s) {
    try {
      return { ok: true, bytes: this.decode(n, i, s) };
    } catch (c) {
      return { ok: false, error: DA(c) };
    }
  }, normalize(n, i, s) {
    let c = this.get(n);
    return rl(c, n, "normalize").call(c, i, s);
  }, parse(n, i, s) {
    let c = this.get(n);
    return rl(c, n, "parse").call(c, i, s);
  }, format(n, i, s) {
    let c = this.get(n);
    return rl(c, n, "format").call(c, i, s);
  }, transcode(n, i) {
    let s = this.decode(i.from, n, i.fromOptions);
    return this.encode(i.to, s, i.toOptions);
  }, detect(n, i = {}) {
    let s = i.formats?.length ? i.formats.map((l) => String(l)) : this.list().map((l) => l.name).filter((l) => !["binary", "utf8", "utf16be", "utf16le"].includes(ar(l))), c = /* @__PURE__ */ new Map();
    for (let l of s) {
      let f = this.get(l), d = jA(l, n, f);
      if (d <= 0)
        continue;
      let h = f.name, g = c.get(h);
      (!g || d > g.confidence) && c.set(h, { format: h, confidence: d });
    }
    return [...c.values()].sort((l, f) => f.confidence - l.confidence);
  } };
  for (let n of t15)
    o.register(n);
  return o;
}
__name(ol, "ol");
var Xd = { name: "binary", aliases: ["latin1"], encode: Ir.encode, decode: Ir.decode, is: Ir.is };
var zd = { name: "hex", encode: Pe.encode, decode: Pe.decode, format: Pe.format, is: Pe.is, normalize: Pe.normalize, parse: Pe.parse };
var Jd = { name: "base64", aliases: ["b64"], encode: St.encode, decode: St.decode, is: St.is, normalize: St.normalize };
var Qd = { name: "base64url", aliases: ["base64-url", "b64url"], encode: Ht.encode, decode: Ht.decode, is: Ht.is, normalize: Ht.normalize };
var Yd = { name: "utf8", aliases: ["utf-8"], encode: (t15) => io.decode(t15), decode: (t15) => io.encode(t15), is: (t15) => typeof t15 == "string" };
var Zd = { name: "utf16be", aliases: ["utf16", "utf-16", "utf-16be"], encode: (t15) => sr.decode(t15), decode: (t15) => sr.encode(t15), is: (t15) => typeof t15 == "string" };
var eh = { name: "utf16le", aliases: ["utf-16le", "ucs2", "usc2"], encode: (t15) => sr.decode(t15, { littleEndian: true }), decode: (t15) => sr.encode(t15, { littleEndian: true }), is: (t15) => typeof t15 == "string" };
var th = [Xd, zd, Jd, Qd, Yd, Zd, eh, ls];
var cr = ol(th);
function nl(t15, e, ...r) {
  return cr.encode(t15, e, ...r);
}
__name(nl, "nl");
function il(t15, e, ...r) {
  return cr.decode(t15, e, ...r);
}
__name(il, "il");
function UA(t15, e, ...r) {
  return cr.tryDecode(t15, e, ...r);
}
__name(UA, "UA");
function LA(t15, e, ...r) {
  return cr.normalize(t15, e, ...r);
}
__name(LA, "LA");
function HA(t15, e, ...r) {
  return cr.parse(t15, e, ...r);
}
__name(HA, "HA");
function VA(t15, e, r) {
  return cr.format(t15, e, r);
}
__name(VA, "VA");
function FA(t15, e) {
  return cr.transcode(t15, e);
}
__name(FA, "FA");
function GA(t15, e) {
  return cr.detect(t15, e);
}
__name(GA, "GA");
function WA(t15) {
  return t15.toLowerCase();
}
__name(WA, "WA");
var rh = { encode: nl, decode: il, tryDecode: UA, normalize: LA, parse: HA, format: VA, transcode: FA, detect: GA, to(t15, e, ...r) {
  return nl(t15, e, ...r);
}, from(t15, e, ...r) {
  return il(t15, e, ...r);
}, toString(t15, e = "utf8") {
  return nl(e, t15);
}, fromString(t15, e = "utf8") {
  return WA(e) === "hex" ? ae(Pe.decode(t15, { allowOddLength: true })) : ae(il(e, t15));
}, toBase64: St.encode, fromBase64: (t15) => ae(St.decode(t15)), toBase64Url: Ht.encode, fromBase64Url: (t15) => ae(Ht.decode(t15)), toHex: Pe.encode, fromHex: (t15) => ae(Pe.decode(t15, { allowOddLength: true })), toBinary: Ir.encode, fromBinary: (t15) => ae(Ir.decode(t15)), toUtf8String: io.decode, fromUtf8String: (t15) => ae(io.encode(t15)), toUtf16String: (t15, e = false) => sr.decode(t15, { littleEndian: e }), fromUtf16String: (t15, e = false) => ae(sr.encode(t15, { littleEndian: e })), isHex: Pe.is, isBase64: St.is, isBase64Url: Ht.is, formatString: St.normalize };
var m;
(function(t15) {
  t15[t15.Sequence = 0] = "Sequence", t15[t15.Set = 1] = "Set", t15[t15.Choice = 2] = "Choice";
})(m || (m = {}));
var p;
(function(t15) {
  t15[t15.Any = 1] = "Any", t15[t15.Boolean = 2] = "Boolean", t15[t15.OctetString = 3] = "OctetString", t15[t15.BitString = 4] = "BitString", t15[t15.Integer = 5] = "Integer", t15[t15.Enumerated = 6] = "Enumerated", t15[t15.ObjectIdentifier = 7] = "ObjectIdentifier", t15[t15.Utf8String = 8] = "Utf8String", t15[t15.BmpString = 9] = "BmpString", t15[t15.UniversalString = 10] = "UniversalString", t15[t15.NumericString = 11] = "NumericString", t15[t15.PrintableString = 12] = "PrintableString", t15[t15.TeletexString = 13] = "TeletexString", t15[t15.VideotexString = 14] = "VideotexString", t15[t15.IA5String = 15] = "IA5String", t15[t15.GraphicString = 16] = "GraphicString", t15[t15.VisibleString = 17] = "VisibleString", t15[t15.GeneralString = 18] = "GeneralString", t15[t15.CharacterString = 19] = "CharacterString", t15[t15.UTCTime = 20] = "UTCTime", t15[t15.GeneralizedTime = 21] = "GeneralizedTime", t15[t15.DATE = 22] = "DATE", t15[t15.TimeOfDay = 23] = "TimeOfDay", t15[t15.DateTime = 24] = "DateTime", t15[t15.Duration = 25] = "Duration", t15[t15.TIME = 26] = "TIME", t15[t15.Null = 27] = "Null", t15[t15.RelativeObjectIdentifier = 28] = "RelativeObjectIdentifier";
})(p || (p = {}));
var ur = /* @__PURE__ */ __name(class {
  unusedBits = 0;
  value = new ArrayBuffer(0);
  constructor(e, r = 0) {
    if (e)
      if (typeof e == "number")
        this.fromNumber(e);
      else if (ir(e))
        this.unusedBits = r, this.value = ae(e);
      else
        throw TypeError("Unsupported type of 'params' argument for BitString");
  }
  fromASN(e) {
    if (!(e instanceof xt))
      throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
    return this.unusedBits = e.valueBlock.unusedBits, this.value = ae(e.valueBlock.valueHex), this;
  }
  toASN() {
    return new xt({ unusedBits: this.unusedBits, valueHex: this.value });
  }
  toSchema(e) {
    return new xt({ name: e });
  }
  toNumber() {
    let e = "", r = new Uint8Array(this.value);
    for (let o of r)
      e += o.toString(2).padStart(8, "0");
    return e = e.split("").reverse().join(""), this.unusedBits && (e = e.slice(this.unusedBits).padStart(this.unusedBits, "0")), parseInt(e, 2);
  }
  fromNumber(e) {
    let r = e.toString(2), o = r.length + 7 >> 3;
    this.unusedBits = (o << 3) - r.length;
    let n = new Uint8Array(o);
    r = r.padStart(o << 3, "0").split("").reverse().join("");
    let i = 0;
    for (; i < o; )
      n[i] = parseInt(r.slice(i << 3, (i << 3) + 8), 2), i++;
    this.value = n.buffer;
  }
}, "ur");
var S = /* @__PURE__ */ __name(class {
  buffer;
  get byteLength() {
    return this.buffer.byteLength;
  }
  get byteOffset() {
    return 0;
  }
  constructor(e) {
    typeof e == "number" ? this.buffer = new ArrayBuffer(e) : ir(e) ? this.buffer = ae(e) : Array.isArray(e) ? this.buffer = new Uint8Array(e).buffer : this.buffer = new ArrayBuffer(0);
  }
  fromASN(e) {
    if (!(e instanceof bt))
      throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
    return this.buffer = ae(e.valueBlock.valueHex), this;
  }
  toASN() {
    return new bt({ valueHex: this.buffer });
  }
  toSchema(e) {
    return new bt({ name: e });
  }
}, "S");
var $A = { fromASN: (t15) => t15 instanceof wt ? null : ae(t15.valueBeforeDecodeView), toASN: (t15) => {
  if (t15 === null)
    return new wt();
  let e = Br(t15, { maxDepth: 1 / 0, maxNodes: 1 / 0, maxContentLength: 1 / 0 });
  if (e.result.error)
    throw new Error(e.result.error);
  return e.result;
} };
var KA = { fromASN: (t15) => t15.valueBlock.valueHexView.byteLength >= 4 ? t15.valueBlock.toString() : t15.valueBlock.valueDec, toASN: (t15) => new Lt({ value: +t15 }) };
var qA = { fromASN: (t15) => t15.valueBlock.valueDec, toASN: (t15) => new Go({ value: t15 }) };
var te = { fromASN: (t15) => ae(t15.valueBlock.valueHexView), toASN: (t15) => new Lt({ valueHex: t15 }) };
var XA = { fromASN: (t15) => ae(t15.valueBlock.valueHexView), toASN: (t15) => new xt({ valueHex: t15 }) };
var zA = { fromASN: (t15) => t15.valueBlock.toString(), toASN: (t15) => new Wo({ value: t15 }) };
var JA = { fromASN: (t15) => t15.valueBlock.toString(), toASN: (t15) => new $o({ value: t15 }) };
var QA = { fromASN: (t15) => t15.valueBlock.value, toASN: (t15) => new Fo({ value: t15 }) };
var Xn = { fromASN: (t15) => ae(t15.valueBlock.valueHexView), toASN: (t15) => new bt({ valueHex: t15 }) };
var oh = { fromASN: (t15) => new S(t15.getValue()), toASN: (t15) => t15.toASN() };
function _t(t15) {
  return { fromASN: (e) => e.valueBlock.value, toASN: (e) => new t15({ value: e }) };
}
__name(_t, "_t");
var sl = _t(Et);
var YA = _t(Ko);
var ZA = _t(qo);
var ew = _t(Xo);
var tw = _t(zo);
var rw = _t(Jo);
var ow = _t(Qo);
var nw = _t(Yo);
var iw = _t(Zo);
var sw = _t(oo);
var aw = _t(en);
var cw = _t(tn);
var uw = { fromASN: (t15) => t15.toDate(), toASN: (t15) => new no({ valueDate: t15 }) };
var lw = { fromASN: (t15) => t15.toDate(), toASN: (t15) => new rn({ valueDate: t15 }) };
var fw = { fromASN: () => null, toASN: () => new wt() };
function ao(t15) {
  switch (t15) {
    case p.Any:
      return $A;
    case p.BitString:
      return XA;
    case p.BmpString:
      return YA;
    case p.Boolean:
      return QA;
    case p.CharacterString:
      return cw;
    case p.Enumerated:
      return qA;
    case p.GeneralString:
      return aw;
    case p.GeneralizedTime:
      return lw;
    case p.GraphicString:
      return iw;
    case p.IA5String:
      return nw;
    case p.Integer:
      return KA;
    case p.Null:
      return fw;
    case p.NumericString:
      return ew;
    case p.ObjectIdentifier:
      return zA;
    case p.RelativeObjectIdentifier:
      return JA;
    case p.OctetString:
      return Xn;
    case p.PrintableString:
      return tw;
    case p.TeletexString:
      return rw;
    case p.UTCTime:
      return uw;
    case p.UniversalString:
      return ZA;
    case p.Utf8String:
      return sl;
    case p.VideotexString:
      return ow;
    case p.VisibleString:
      return sw;
    default:
      return null;
  }
}
__name(ao, "ao");
function Ct(t15) {
  return typeof t15 == "function" && t15.prototype ? t15.prototype.toASN && t15.prototype.fromASN ? true : Ct(t15.prototype) : !!(t15 && typeof t15 == "object" && "toASN" in t15 && "fromASN" in t15);
}
__name(Ct, "Ct");
function cl(t15) {
  if (t15) {
    let e = Object.getPrototypeOf(t15);
    return e?.prototype?.constructor === Array ? true : cl(e);
  }
  return false;
}
__name(cl, "cl");
function nh(t15, e) {
  if (!(t15 && e) || t15.byteLength !== e.byteLength)
    return false;
  let r = new Uint8Array(t15), o = new Uint8Array(e);
  for (let n = 0; n < t15.byteLength; n++)
    if (r[n] !== o[n])
      return false;
  return true;
}
__name(nh, "nh");
var dc = /* @__PURE__ */ __name(class {
  items = /* @__PURE__ */ new WeakMap();
  has(e) {
    return this.items.has(e);
  }
  get(e, r = false) {
    let o = this.items.get(e);
    if (!o)
      throw new Error(`Cannot get schema for '${e.prototype.constructor.name}' target`);
    if (r && !o.schema)
      throw new Error(`Schema '${e.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);
    return o;
  }
  cache(e) {
    let r = this.get(e);
    r.schema || (r.schema = this.create(e, true));
  }
  createDefault(e) {
    let r = { type: m.Sequence, items: {} }, o = this.findParentSchema(e);
    return o && (Object.assign(r, o), r.items = Object.assign({}, r.items, o.items)), r;
  }
  create(e, r) {
    let o = this.items.get(e) || this.createDefault(e), n = [];
    for (let i in o.items) {
      let s = o.items[i], c = r ? i : "", l;
      if (typeof s.type == "number") {
        let d = p[s.type], h = nr[d];
        if (!h)
          throw new Error(`Cannot get ASN1 class by name '${d}'`);
        l = new h({ name: c });
      } else
        Ct(s.type) ? l = new s.type().toSchema(c) : s.optional ? this.get(s.type).type === m.Choice ? l = new tr({ name: c }) : (l = this.create(s.type, false), l.name = c) : l = new tr({ name: c });
      let f = !!s.optional || s.defaultValue !== void 0;
      if (s.repeated) {
        l.name = "";
        let d = s.repeated === "set" ? Ge : ke;
        l = new d({ name: "", value: [new on({ name: c, value: l })] });
      }
      if (s.context !== null && s.context !== void 0)
        if (s.implicit)
          if (typeof s.type == "number" || Ct(s.type)) {
            let d = s.repeated ? Ee : er;
            n.push(new d({ name: c, optional: f, idBlock: { tagClass: 3, tagNumber: s.context } }));
          } else {
            this.cache(s.type);
            let d = !!s.repeated, h = d ? l : this.get(s.type, true).schema;
            h = "valueBlock" in h ? h.valueBlock.value : h.value, n.push(new Ee({ name: d ? "" : c, optional: f, idBlock: { tagClass: 3, tagNumber: s.context }, value: h }));
          }
        else
          n.push(new Ee({ optional: f, idBlock: { tagClass: 3, tagNumber: s.context }, value: [l] }));
      else
        l.optional = f, n.push(l);
    }
    switch (o.type) {
      case m.Sequence:
        return new ke({ value: n, name: "" });
      case m.Set:
        return new Ge({ value: n, name: "" });
      case m.Choice:
        return new qn({ value: n, name: "" });
      default:
        throw new Error("Unsupported ASN1 type in use");
    }
  }
  set(e, r) {
    return this.items.set(e, r), this;
  }
  findParentSchema(e) {
    let r = Object.getPrototypeOf(e);
    return r ? this.items.get(r) || this.findParentSchema(r) : null;
  }
}, "dc");
var _e = new dc();
var v = /* @__PURE__ */ __name((t15) => (e) => {
  let r;
  _e.has(e) ? r = _e.get(e) : (r = _e.createDefault(e), _e.set(e, r)), Object.assign(r, t15);
}, "v");
var u = /* @__PURE__ */ __name((t15) => (e, r) => {
  let o;
  _e.has(e.constructor) ? o = _e.get(e.constructor) : (o = _e.createDefault(e.constructor), _e.set(e.constructor, o));
  let n = Object.assign({}, t15);
  if (typeof n.type == "number" && !n.converter) {
    let i = ao(t15.type);
    if (!i)
      throw new Error(`Cannot get default converter for property '${r}' of ${e.constructor.name}`);
    n.converter = i;
  }
  n.raw = t15.raw, o.items[r] = n;
}, "u");
var co = /* @__PURE__ */ __name(class extends Error {
  schemas = [];
}, "co");
var pe = /* @__PURE__ */ __name(class {
  static parse(e, r, o) {
    let n = Br(ae(e), o?.berOptions);
    if (n.result.error)
      throw new Error(n.result.error);
    return this.fromASN(n.result, r, o);
  }
  static fromASN(e, r, o) {
    try {
      if (Ct(r))
        return new r().fromASN(e);
      let n = _e.get(r);
      _e.cache(r);
      let i = n.schema, s = this.handleChoiceTypes(e, n, r, i, o);
      if (s?.result)
        return s.result;
      s?.targetSchema && (i = s.targetSchema);
      let c = this.handleSequenceTypes(e, n, r, i), l = new r();
      return cl(r) ? this.handleArrayTypes(e, n, r, o) : (this.processSchemaItems(n, c, l, o), l);
    } catch (n) {
      throw n instanceof co && n.schemas.push(r.name), n;
    }
  }
  static handleChoiceTypes(e, r, o, n, i) {
    if (e.constructor === Ee && r.type === m.Choice && e.idBlock.tagClass === 3)
      for (let s in r.items) {
        let c = r.items[s];
        if (c.context === e.idBlock.tagNumber && c.implicit && typeof c.type == "function" && _e.has(c.type)) {
          let l = _e.get(c.type);
          if (l && l.type === m.Sequence) {
            let f = new ke();
            if ("value" in e.valueBlock && Array.isArray(e.valueBlock.value) && "value" in f.valueBlock) {
              f.valueBlock.value = e.valueBlock.value;
              let d = this.fromASN(f, c.type, i), h = new o();
              return h[s] = d, { result: h };
            }
          }
        }
      }
    else if (e.constructor === Ee && r.type !== m.Choice) {
      let s = new Ee({ idBlock: { tagClass: 3, tagNumber: e.idBlock.tagNumber }, value: r.schema.valueBlock.value });
      for (let c in r.items)
        delete e[c];
      return { targetSchema: s };
    }
    return null;
  }
  static handleSequenceTypes(e, r, o, n) {
    if (r.type === m.Sequence) {
      let i = _r({}, e, n);
      if (!i.verified)
        throw new co(`Data does not match to ${o.name} ASN1 schema.${i.result.error ? ` ${i.result.error}` : ""}`);
      return i;
    } else {
      let i = _r({}, e, n);
      if (!i.verified)
        throw new co(`Data does not match to ${o.name} ASN1 schema.${i.result.error ? ` ${i.result.error}` : ""}`);
      return i;
    }
  }
  static processRepeatedField(e, r, o) {
    let n = e.slice(r);
    if (n.length === 1 && n[0].constructor.name === "Sequence") {
      let i = n[0];
      i.valueBlock && i.valueBlock.value && Array.isArray(i.valueBlock.value) && (n = i.valueBlock.value);
    }
    if (typeof o.type == "number") {
      let i = ao(o.type);
      if (!i)
        throw new Error(`No converter for ASN.1 type ${o.type}`);
      return n.filter((s) => s && s.valueBlock).map((s) => {
        try {
          return i.fromASN(s);
        } catch {
          return;
        }
      }).filter((s) => s !== void 0);
    } else
      return n.filter((i) => i && i.valueBlock).map((i) => {
        try {
          return this.fromASN(i, o.type);
        } catch {
          return;
        }
      }).filter((i) => i !== void 0);
  }
  static processPrimitiveField(e, r) {
    let o = ao(r.type);
    if (!o)
      throw new Error(`No converter for ASN.1 type ${r.type}`);
    return o.fromASN(e);
  }
  static isOptionalChoiceField(e) {
    return e.optional && typeof e.type == "function" && _e.has(e.type) && _e.get(e.type).type === m.Choice;
  }
  static processOptionalChoiceField(e, r) {
    try {
      return { processed: true, value: this.fromASN(e, r.type) };
    } catch (o) {
      if (o instanceof co && /Wrong values for Choice type/.test(o.message))
        return { processed: false };
      throw o;
    }
  }
  static handleArrayTypes(e, r, o, n) {
    if (!("value" in e.valueBlock && Array.isArray(e.valueBlock.value)))
      throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
    let i = r.itemType;
    if (typeof i == "number") {
      let s = ao(i);
      if (!s)
        throw new Error(`Cannot get default converter for array item of ${o.name} ASN1 schema`);
      return o.from(e.valueBlock.value, (c) => s.fromASN(c));
    } else
      return o.from(e.valueBlock.value, (s) => this.fromASN(s, i, n));
  }
  static processSchemaItems(e, r, o, n) {
    for (let i in e.items) {
      let s = r.result[i];
      if (!s)
        continue;
      let c = e.items[i], l = c.type, f;
      typeof l == "number" || Ct(l) ? f = this.processPrimitiveSchemaItem(s, c, l, n) : f = this.processComplexSchemaItem(s, c, l, n), f && typeof f == "object" && "value" in f && "raw" in f ? (o[i] = f.value, o[`${i}Raw`] = f.raw) : o[i] = f;
    }
  }
  static processPrimitiveSchemaItem(e, r, o, n) {
    let i = r.converter ?? (Ct(o) ? new o() : null);
    if (!i)
      throw new Error("Converter is empty");
    return r.repeated ? this.processRepeatedPrimitiveItem(e, r, i, n) : this.processSinglePrimitiveItem(e, r, o, i, n);
  }
  static processRepeatedPrimitiveItem(e, r, o, n) {
    if (r.implicit) {
      let i = r.repeated === "sequence" ? ke : Ge, s = new i();
      s.valueBlock = e.valueBlock;
      let c = Br(s.toBER(false), n?.berOptions);
      if (c.offset === -1)
        throw new Error(`Cannot parse the child item. ${c.result.error}`);
      if (!("value" in c.result.valueBlock && Array.isArray(c.result.valueBlock.value)))
        throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
      let l = c.result.valueBlock.value;
      return Array.from(l, (f) => o.fromASN(f));
    } else
      return Array.from(e, (i) => o.fromASN(i));
  }
  static processSinglePrimitiveItem(e, r, o, n, i) {
    let s = e;
    if (r.implicit) {
      let c;
      if (Ct(o))
        c = new o().toSchema("");
      else {
        let l = p[o], f = nr[l];
        if (!f)
          throw new Error(`Cannot get '${l}' class from asn1js module`);
        c = new f();
      }
      c.valueBlock = s.valueBlock, s = Br(c.toBER(false), i?.berOptions).result;
    }
    return n.fromASN(s);
  }
  static processComplexSchemaItem(e, r, o, n) {
    if (r.repeated) {
      if (!Array.isArray(e))
        throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
      return Array.from(e, (i) => this.fromASN(i, o, n));
    } else {
      let i = this.handleImplicitTagging(e, r, o);
      if (this.isOptionalChoiceField(r))
        try {
          return this.fromASN(i, o, n);
        } catch (s) {
          if (s instanceof co && /Wrong values for Choice type/.test(s.message))
            return;
          throw s;
        }
      else {
        let s = this.fromASN(i, o, n);
        return r.raw ? { value: s, raw: e.valueBeforeDecodeView } : s;
      }
    }
  }
  static handleImplicitTagging(e, r, o) {
    if (r.implicit && typeof r.context == "number") {
      let n = _e.get(o);
      if (n.type === m.Sequence) {
        let i = new ke();
        if ("value" in e.valueBlock && Array.isArray(e.valueBlock.value) && "value" in i.valueBlock)
          return i.valueBlock.value = e.valueBlock.value, i;
      } else if (n.type === m.Set) {
        let i = new Ge();
        if ("value" in e.valueBlock && Array.isArray(e.valueBlock.value) && "value" in i.valueBlock)
          return i.valueBlock.value = e.valueBlock.value, i;
      }
    }
    return e;
  }
}, "pe");
var fs = /* @__PURE__ */ __name(class t {
  static serialize(e) {
    return e instanceof ye ? e.toBER(false) : this.toASN(e).toBER(false);
  }
  static toASN(e) {
    if (e && typeof e == "object" && Ct(e))
      return e.toASN();
    if (!(e && typeof e == "object"))
      throw new TypeError("Parameter 1 should be type of Object.");
    let r = e.constructor, o = _e.get(r);
    _e.cache(r);
    let n = [];
    if (o.itemType) {
      if (!Array.isArray(e))
        throw new TypeError("Parameter 1 should be type of Array.");
      if (typeof o.itemType == "number") {
        let s = ao(o.itemType);
        if (!s)
          throw new Error(`Cannot get default converter for array item of ${r.name} ASN1 schema`);
        n = e.map((c) => s.toASN(c));
      } else
        n = e.map((s) => this.toAsnItem({ type: o.itemType }, "[]", r, s));
    } else
      for (let s in o.items) {
        let c = o.items[s], l = e[s];
        if (l === void 0 || c.defaultValue === l || typeof c.defaultValue == "object" && typeof l == "object" && nh(this.serialize(c.defaultValue), this.serialize(l)))
          continue;
        let f = t.toAsnItem(c, s, r, l);
        if (typeof c.context == "number")
          if (c.implicit)
            if (!c.repeated && (typeof c.type == "number" || Ct(c.type))) {
              let d = {};
              d.valueHex = f instanceof wt ? ae(f.valueBeforeDecodeView) : f.valueBlock.toBER(), n.push(new er({ optional: c.optional, idBlock: { tagClass: 3, tagNumber: c.context }, ...d }));
            } else
              n.push(new Ee({ optional: c.optional, idBlock: { tagClass: 3, tagNumber: c.context }, value: f.valueBlock.value }));
          else
            n.push(new Ee({ optional: c.optional, idBlock: { tagClass: 3, tagNumber: c.context }, value: [f] }));
        else
          c.repeated ? n = n.concat(f) : n.push(f);
      }
    let i;
    switch (o.type) {
      case m.Sequence:
        i = new ke({ value: n });
        break;
      case m.Set:
        i = new Ge({ value: n });
        break;
      case m.Choice:
        if (!n[0])
          throw new Error(`Schema '${r.name}' has wrong data. Choice cannot be empty.`);
        i = n[0];
        break;
    }
    return i;
  }
  static toAsnItem(e, r, o, n) {
    let i;
    if (typeof e.type == "number") {
      let s = e.converter;
      if (!s)
        throw new Error(`Property '${r}' doesn't have converter for type ${p[e.type]} in schema '${o.name}'`);
      if (e.repeated) {
        if (!Array.isArray(n))
          throw new TypeError("Parameter 'objProp' should be type of Array.");
        let c = Array.from(n, (f) => s.toASN(f)), l = e.repeated === "sequence" ? ke : Ge;
        i = new l({ value: c });
      } else
        i = s.toASN(n);
    } else if (e.repeated) {
      if (!Array.isArray(n))
        throw new TypeError("Parameter 'objProp' should be type of Array.");
      let s = Array.from(n, (l) => this.toASN(l)), c = e.repeated === "sequence" ? ke : Ge;
      i = new c({ value: s });
    } else
      i = this.toASN(n);
    return i;
  }
}, "t");
var R = /* @__PURE__ */ __name(class extends Array {
  constructor(e = []) {
    if (typeof e == "number")
      super(e);
    else {
      super();
      for (let r of e)
        this.push(r);
    }
  }
}, "R");
var E = /* @__PURE__ */ __name(class t2 {
  static serialize(e) {
    return fs.serialize(e);
  }
  static parse(e, r, o) {
    return pe.parse(e, r, o);
  }
  static toString(e, r) {
    let o = ir(e) ? ae(e) : t2.serialize(e), n = Br(o, r?.berOptions);
    if (n.offset === -1)
      throw new Error(`Cannot decode ASN.1 data. ${n.result.error}`);
    return n.result.toString();
  }
}, "t");
function a(t15, e, r, o) {
  var n = arguments.length, i = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(t15, e, r, o);
  else
    for (var c = t15.length - 1; c >= 0; c--)
      (s = t15[c]) && (i = (n < 3 ? s(i) : n > 3 ? s(e, r, i) : s(e, r)) || i);
  return n > 3 && i && Object.defineProperty(e, r, i), i;
}
__name(a, "a");
function N(t15, e, r, o) {
  if (r === "a" && !o)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t15 !== e || !o : !e.has(t15))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? o : r === "a" ? o.call(t15) : o ? o.value : e.get(t15);
}
__name(N, "N");
function ee(t15, e, r, o, n) {
  if (o === "m")
    throw new TypeError("Private method is not writable");
  if (o === "a" && !n)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? t15 !== e || !n : !e.has(t15))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return o === "a" ? n.call(t15, r) : n ? n.value = r : e.set(t15, r), r;
}
__name(ee, "ee");
var ps = /* @__PURE__ */ __name(class {
  static isIPv4(e) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(e);
  }
  static parseIPv4(e) {
    let r = e.split(".");
    if (r.length !== 4)
      throw new Error("Invalid IPv4 address");
    return r.map((o) => {
      let n = parseInt(o, 10);
      if (isNaN(n) || n < 0 || n > 255)
        throw new Error("Invalid IPv4 address part");
      return n;
    });
  }
  static parseIPv6(e) {
    let o = this.expandIPv6(e).split(":");
    if (o.length !== 8)
      throw new Error("Invalid IPv6 address");
    return o.reduce((n, i) => {
      let s = parseInt(i, 16);
      if (isNaN(s) || s < 0 || s > 65535)
        throw new Error("Invalid IPv6 address part");
      return n.push(s >> 8 & 255), n.push(s & 255), n;
    }, []);
  }
  static expandIPv6(e) {
    if (!e.includes("::"))
      return e;
    let r = e.split("::");
    if (r.length > 2)
      throw new Error("Invalid IPv6 address");
    let o = r[0] ? r[0].split(":") : [], n = r[1] ? r[1].split(":") : [], i = 8 - (o.length + n.length);
    if (i < 0)
      throw new Error("Invalid IPv6 address");
    return [...o, ...Array(i).fill("0"), ...n].join(":");
  }
  static formatIPv6(e) {
    let r = [];
    for (let o = 0; o < 16; o += 2)
      r.push((e[o] << 8 | e[o + 1]).toString(16));
    return this.compressIPv6(r.join(":"));
  }
  static compressIPv6(e) {
    let r = e.split(":"), o = -1, n = 0, i = -1, s = 0;
    for (let c = 0; c < r.length; c++)
      r[c] === "0" ? (i === -1 && (i = c), s++) : (s > n && (o = i, n = s), i = -1, s = 0);
    if (s > n && (o = i, n = s), n > 1) {
      let c = r.slice(0, o).join(":"), l = r.slice(o + n).join(":");
      return `${c}::${l}`;
    }
    return e;
  }
  static parseCIDR(e) {
    let [r, o] = e.split("/"), n = parseInt(o, 10);
    if (this.isIPv4(r)) {
      if (n < 0 || n > 32)
        throw new Error("Invalid IPv4 prefix length");
      return [this.parseIPv4(r), n];
    } else {
      if (n < 0 || n > 128)
        throw new Error("Invalid IPv6 prefix length");
      return [this.parseIPv6(r), n];
    }
  }
  static decodeIP(e) {
    if (e.length === 64 && parseInt(e, 16) === 0)
      return "::/0";
    if (e.length !== 16)
      return e;
    let r = parseInt(e.slice(8), 16).toString(2).split("").reduce((n, i) => n + +i, 0), o = e.slice(0, 8).replace(/(.{2})/g, (n) => `${parseInt(n, 16)}.`);
    return o = o.slice(0, -1), `${o}/${r}`;
  }
  static toString(e) {
    let r = new Uint8Array(e);
    if (r.length === 4)
      return Array.from(r).join(".");
    if (r.length === 16)
      return this.formatIPv6(r);
    if (r.length === 8 || r.length === 32) {
      let o = r.length / 2, n = r.slice(0, o), i = r.slice(o);
      if (r.every((l) => l === 0))
        return r.length === 8 ? "0.0.0.0/0" : "::/0";
      let c = i.reduce((l, f) => l + (f.toString(2).match(/1/g) || []).length, 0);
      return r.length === 8 ? `${Array.from(n).join(".")}/${c}` : `${this.formatIPv6(n)}/${c}`;
    }
    return this.decodeIP(Pe.encode(e));
  }
  static fromString(e) {
    if (e.includes("/")) {
      let [o, n] = this.parseCIDR(e), i = new Uint8Array(o.length), s = n;
      for (let l = 0; l < i.length; l++)
        s >= 8 ? (i[l] = 255, s -= 8) : s > 0 && (i[l] = 255 << 8 - s, s = 0);
      let c = new Uint8Array(o.length * 2);
      return c.set(o, 0), c.set(i, o.length), c.buffer;
    }
    let r = this.isIPv4(e) ? this.parseIPv4(e) : this.parseIPv6(e);
    return new Uint8Array(r).buffer;
  }
}, "ps");
var ul;
var ll;
var fl;
var Ce = /* @__PURE__ */ __name(class {
  teletexString;
  printableString;
  universalString;
  utf8String;
  bmpString;
  constructor(e = {}) {
    Object.assign(this, e);
  }
  toString() {
    return this.bmpString || this.printableString || this.teletexString || this.universalString || this.utf8String || "";
  }
}, "Ce");
a([u({ type: p.TeletexString })], Ce.prototype, "teletexString", void 0);
a([u({ type: p.PrintableString })], Ce.prototype, "printableString", void 0);
a([u({ type: p.UniversalString })], Ce.prototype, "universalString", void 0);
a([u({ type: p.Utf8String })], Ce.prototype, "utf8String", void 0);
a([u({ type: p.BmpString })], Ce.prototype, "bmpString", void 0);
Ce = a([v({ type: m.Choice })], Ce);
var zn = /* @__PURE__ */ __name(class extends Ce {
  ia5String;
  anyValue;
  constructor(e = {}) {
    super(e), Object.assign(this, e);
  }
  toString() {
    return this.ia5String || (this.anyValue ? Pe.encode(this.anyValue) : super.toString());
  }
}, "zn");
a([u({ type: p.IA5String })], zn.prototype, "ia5String", void 0);
a([u({ type: p.Any })], zn.prototype, "anyValue", void 0);
zn = a([v({ type: m.Choice })], zn);
var nn = /* @__PURE__ */ __name(class {
  type = "";
  value = new zn();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "nn");
a([u({ type: p.ObjectIdentifier })], nn.prototype, "type", void 0);
a([u({ type: zn })], nn.prototype, "value", void 0);
var uo = ul = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, ul.prototype);
  }
}, "ul");
uo = ul = a([v({ type: m.Set, itemType: nn })], uo);
var pl = ll = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, ll.prototype);
  }
}, "ll");
pl = ll = a([v({ type: m.Sequence, itemType: uo })], pl);
var ue = fl = /* @__PURE__ */ __name(class extends pl {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, fl.prototype);
  }
}, "fl");
ue = fl = a([v({ type: m.Sequence })], ue);
var pw = { fromASN: (t15) => ps.toString(Xn.fromASN(t15)), toASN: (t15) => Xn.toASN(ps.fromString(t15)) };
var lo = /* @__PURE__ */ __name(class {
  typeId = "";
  value = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "lo");
a([u({ type: p.ObjectIdentifier })], lo.prototype, "typeId", void 0);
a([u({ type: p.Any, context: 0 })], lo.prototype, "value", void 0);
var ds = /* @__PURE__ */ __name(class {
  nameAssigner;
  partyName = new Ce();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ds");
a([u({ type: Ce, optional: true, context: 0, implicit: true })], ds.prototype, "nameAssigner", void 0);
a([u({ type: Ce, context: 1, implicit: true })], ds.prototype, "partyName", void 0);
var K = /* @__PURE__ */ __name(class {
  otherName;
  rfc822Name;
  dNSName;
  x400Address;
  directoryName;
  ediPartyName;
  uniformResourceIdentifier;
  iPAddress;
  registeredID;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "K");
a([u({ type: lo, context: 0, implicit: true })], K.prototype, "otherName", void 0);
a([u({ type: p.IA5String, context: 1, implicit: true })], K.prototype, "rfc822Name", void 0);
a([u({ type: p.IA5String, context: 2, implicit: true })], K.prototype, "dNSName", void 0);
a([u({ type: p.Any, context: 3, implicit: true })], K.prototype, "x400Address", void 0);
a([u({ type: ue, context: 4, implicit: false })], K.prototype, "directoryName", void 0);
a([u({ type: ds, context: 5 })], K.prototype, "ediPartyName", void 0);
a([u({ type: p.IA5String, context: 6, implicit: true })], K.prototype, "uniformResourceIdentifier", void 0);
a([u({ type: p.OctetString, context: 7, implicit: true, converter: pw })], K.prototype, "iPAddress", void 0);
a([u({ type: p.ObjectIdentifier, context: 8, implicit: true })], K.prototype, "registeredID", void 0);
K = a([v({ type: m.Choice })], K);
var fo = "1.3.6.1.5.5.7";
var po = `${fo}.1`;
var ih = `${fo}.2`;
var sn = `${fo}.3`;
var hc = `${fo}.48`;
var QE = `${ih}.1`;
var YE = `${ih}.2`;
var dl = `${hc}.1`;
var hl = `${hc}.2`;
var ml = `${hc}.3`;
var yl = `${hc}.5`;
var Q = "2.5.29";
var gl;
var mc = `${po}.1`;
var Or = /* @__PURE__ */ __name(class {
  accessMethod = "";
  accessLocation = new K();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Or");
a([u({ type: p.ObjectIdentifier })], Or.prototype, "accessMethod", void 0);
a([u({ type: K })], Or.prototype, "accessLocation", void 0);
var an = gl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, gl.prototype);
  }
}, "gl");
an = gl = a([v({ type: m.Sequence, itemType: Or })], an);
var hs = `${Q}.35`;
var cn = /* @__PURE__ */ __name(class extends S {
}, "cn");
var lr = /* @__PURE__ */ __name(class {
  keyIdentifier;
  authorityCertIssuer;
  authorityCertSerialNumber;
  constructor(e = {}) {
    e && Object.assign(this, e);
  }
}, "lr");
a([u({ type: cn, context: 0, optional: true, implicit: true })], lr.prototype, "keyIdentifier", void 0);
a([u({ type: K, context: 1, optional: true, implicit: true, repeated: "sequence" })], lr.prototype, "authorityCertIssuer", void 0);
a([u({ type: p.Integer, context: 2, optional: true, implicit: true, converter: te })], lr.prototype, "authorityCertSerialNumber", void 0);
var Jn = `${Q}.19`;
var Nr = /* @__PURE__ */ __name(class {
  cA = false;
  pathLenConstraint;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Nr");
a([u({ type: p.Boolean, defaultValue: false })], Nr.prototype, "cA", void 0);
a([u({ type: p.Integer, optional: true })], Nr.prototype, "pathLenConstraint", void 0);
var vl;
var de = vl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, vl.prototype);
  }
}, "vl");
de = vl = a([v({ type: m.Sequence, itemType: K })], de);
var Al;
var dw = `${Q}.29`;
var sh = Al = /* @__PURE__ */ __name(class extends de {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Al.prototype);
  }
}, "Al");
sh = Al = a([v({ type: m.Sequence })], sh);
var wl;
var gc = `${Q}.32`;
var IS = `${gc}.0`;
var kr = /* @__PURE__ */ __name(class {
  ia5String;
  visibleString;
  bmpString;
  utf8String;
  constructor(e = {}) {
    Object.assign(this, e);
  }
  toString() {
    return this.ia5String || this.visibleString || this.bmpString || this.utf8String || "";
  }
}, "kr");
a([u({ type: p.IA5String })], kr.prototype, "ia5String", void 0);
a([u({ type: p.VisibleString })], kr.prototype, "visibleString", void 0);
a([u({ type: p.BmpString })], kr.prototype, "bmpString", void 0);
a([u({ type: p.Utf8String })], kr.prototype, "utf8String", void 0);
kr = a([v({ type: m.Choice })], kr);
var ms = /* @__PURE__ */ __name(class {
  organization = new kr();
  noticeNumbers = [];
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ms");
a([u({ type: kr })], ms.prototype, "organization", void 0);
a([u({ type: p.Integer, repeated: "sequence" })], ms.prototype, "noticeNumbers", void 0);
var ys = /* @__PURE__ */ __name(class {
  noticeRef;
  explicitText;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ys");
a([u({ type: ms, optional: true })], ys.prototype, "noticeRef", void 0);
a([u({ type: kr, optional: true })], ys.prototype, "explicitText", void 0);
var yc = /* @__PURE__ */ __name(class {
  cPSuri;
  userNotice;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "yc");
a([u({ type: p.IA5String })], yc.prototype, "cPSuri", void 0);
a([u({ type: ys })], yc.prototype, "userNotice", void 0);
yc = a([v({ type: m.Choice })], yc);
var gs = /* @__PURE__ */ __name(class {
  policyQualifierId = "";
  qualifier = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "gs");
a([u({ type: p.ObjectIdentifier })], gs.prototype, "policyQualifierId", void 0);
a([u({ type: p.Any })], gs.prototype, "qualifier", void 0);
var un = /* @__PURE__ */ __name(class {
  policyIdentifier = "";
  policyQualifiers;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "un");
a([u({ type: p.ObjectIdentifier })], un.prototype, "policyIdentifier", void 0);
a([u({ type: gs, repeated: "sequence", optional: true })], un.prototype, "policyQualifiers", void 0);
var vs = wl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, wl.prototype);
  }
}, "wl");
vs = wl = a([v({ type: m.Sequence, itemType: un })], vs);
var jS = `${Q}.20`;
var As = /* @__PURE__ */ __name(class {
  value;
  constructor(e = 0) {
    this.value = e;
  }
}, "As");
a([u({ type: p.Integer })], As.prototype, "value", void 0);
As = a([v({ type: m.Choice })], As);
var WS = `${Q}.27`;
var ah = /* @__PURE__ */ __name(class extends As {
}, "ah");
ah = a([v({ type: m.Choice })], ah);
var bl;
var vc = `${Q}.31`;
var Vt;
(function(t15) {
  t15[t15.unused = 1] = "unused", t15[t15.keyCompromise = 2] = "keyCompromise", t15[t15.cACompromise = 4] = "cACompromise", t15[t15.affiliationChanged = 8] = "affiliationChanged", t15[t15.superseded = 16] = "superseded", t15[t15.cessationOfOperation = 32] = "cessationOfOperation", t15[t15.certificateHold = 64] = "certificateHold", t15[t15.privilegeWithdrawn = 128] = "privilegeWithdrawn", t15[t15.aACompromise = 256] = "aACompromise";
})(Vt || (Vt = {}));
var ws = /* @__PURE__ */ __name(class extends ur {
  toJSON() {
    let e = [], r = this.toNumber();
    return r & Vt.aACompromise && e.push("aACompromise"), r & Vt.affiliationChanged && e.push("affiliationChanged"), r & Vt.cACompromise && e.push("cACompromise"), r & Vt.certificateHold && e.push("certificateHold"), r & Vt.cessationOfOperation && e.push("cessationOfOperation"), r & Vt.keyCompromise && e.push("keyCompromise"), r & Vt.privilegeWithdrawn && e.push("privilegeWithdrawn"), r & Vt.superseded && e.push("superseded"), r & Vt.unused && e.push("unused"), e;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}, "ws");
var Pr = /* @__PURE__ */ __name(class {
  fullName;
  nameRelativeToCRLIssuer;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Pr");
a([u({ type: K, context: 0, repeated: "sequence", implicit: true })], Pr.prototype, "fullName", void 0);
a([u({ type: uo, context: 1, implicit: true })], Pr.prototype, "nameRelativeToCRLIssuer", void 0);
Pr = a([v({ type: m.Choice })], Pr);
var fr = /* @__PURE__ */ __name(class {
  distributionPoint;
  reasons;
  cRLIssuer;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "fr");
a([u({ type: Pr, context: 0, optional: true })], fr.prototype, "distributionPoint", void 0);
a([u({ type: ws, context: 1, optional: true, implicit: true })], fr.prototype, "reasons", void 0);
a([u({ type: K, context: 2, optional: true, repeated: "sequence", implicit: true })], fr.prototype, "cRLIssuer", void 0);
var ho = bl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, bl.prototype);
  }
}, "bl");
ho = bl = a([v({ type: m.Sequence, itemType: fr })], ho);
var xl;
var i1 = `${Q}.46`;
var ch = xl = /* @__PURE__ */ __name(class extends ho {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, xl.prototype);
  }
}, "xl");
ch = xl = a([v({ type: m.Sequence, itemType: fr })], ch);
var p1 = `${Q}.28`;
var _a;
var Tt = (/* @__PURE__ */ __name(_a = class {
  distributionPoint;
  onlyContainsUserCerts = _a.ONLY;
  onlyContainsCACerts = _a.ONLY;
  onlySomeReasons;
  indirectCRL = _a.ONLY;
  onlyContainsAttributeCerts = _a.ONLY;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "t"), __publicField(_a, "ONLY", false), _a);
a([u({ type: Pr, context: 0, optional: true })], Tt.prototype, "distributionPoint", void 0);
a([u({ type: p.Boolean, context: 1, defaultValue: Tt.ONLY, implicit: true })], Tt.prototype, "onlyContainsUserCerts", void 0);
a([u({ type: p.Boolean, context: 2, defaultValue: Tt.ONLY, implicit: true })], Tt.prototype, "onlyContainsCACerts", void 0);
a([u({ type: ws, context: 3, optional: true, implicit: true })], Tt.prototype, "onlySomeReasons", void 0);
a([u({ type: p.Boolean, context: 4, defaultValue: Tt.ONLY, implicit: true })], Tt.prototype, "indirectCRL", void 0);
a([u({ type: p.Boolean, context: 5, defaultValue: Tt.ONLY, implicit: true })], Tt.prototype, "onlyContainsAttributeCerts", void 0);
var El = `${Q}.21`;
var bs;
(function(t15) {
  t15[t15.unspecified = 0] = "unspecified", t15[t15.keyCompromise = 1] = "keyCompromise", t15[t15.cACompromise = 2] = "cACompromise", t15[t15.affiliationChanged = 3] = "affiliationChanged", t15[t15.superseded = 4] = "superseded", t15[t15.cessationOfOperation = 5] = "cessationOfOperation", t15[t15.certificateHold = 6] = "certificateHold", t15[t15.removeFromCRL = 8] = "removeFromCRL", t15[t15.privilegeWithdrawn = 9] = "privilegeWithdrawn", t15[t15.aACompromise = 10] = "aACompromise";
})(bs || (bs = {}));
var Qn = /* @__PURE__ */ __name(class {
  reason = bs.unspecified;
  constructor(e = bs.unspecified) {
    this.reason = e;
  }
  toJSON() {
    return bs[this.reason];
  }
  toString() {
    return this.toJSON();
  }
}, "Qn");
a([u({ type: p.Enumerated })], Qn.prototype, "reason", void 0);
Qn = a([v({ type: m.Choice })], Qn);
var Sl;
var Yn = `${Q}.37`;
var ln = Sl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Sl.prototype);
  }
}, "Sl");
ln = Sl = a([v({ type: m.Sequence, itemType: p.ObjectIdentifier })], ln);
var E1 = `${Yn}.0`;
var uh = `${sn}.1`;
var lh = `${sn}.2`;
var fh = `${sn}.3`;
var ph = `${sn}.4`;
var dh = `${sn}.8`;
var hh = `${sn}.9`;
var B1 = `${Q}.54`;
var _l = /* @__PURE__ */ __name(class {
  value;
  constructor(e = new ArrayBuffer(0)) {
    this.value = e;
  }
}, "_l");
a([u({ type: p.Integer, converter: te })], _l.prototype, "value", void 0);
_l = a([v({ type: m.Choice })], _l);
var Cl = `${Q}.24`;
var Zn = /* @__PURE__ */ __name(class {
  value = /* @__PURE__ */ new Date();
  constructor(e) {
    e && (this.value = e);
  }
}, "Zn");
a([u({ type: p.GeneralizedTime })], Zn.prototype, "value", void 0);
Zn = a([v({ type: m.Choice })], Zn);
var Tl;
var Bl = `${Q}.18`;
var mh = Tl = /* @__PURE__ */ __name(class extends de {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Tl.prototype);
  }
}, "Tl");
mh = Tl = a([v({ type: m.Sequence })], mh);
var Ac = `${Q}.15`;
var Ft;
(function(t15) {
  t15[t15.digitalSignature = 1] = "digitalSignature", t15[t15.nonRepudiation = 2] = "nonRepudiation", t15[t15.keyEncipherment = 4] = "keyEncipherment", t15[t15.dataEncipherment = 8] = "dataEncipherment", t15[t15.keyAgreement = 16] = "keyAgreement", t15[t15.keyCertSign = 32] = "keyCertSign", t15[t15.cRLSign = 64] = "cRLSign", t15[t15.encipherOnly = 128] = "encipherOnly", t15[t15.decipherOnly = 256] = "decipherOnly";
})(Ft || (Ft = {}));
var ei = /* @__PURE__ */ __name(class extends ur {
  toJSON() {
    let e = this.toNumber(), r = [];
    return e & Ft.cRLSign && r.push("crlSign"), e & Ft.dataEncipherment && r.push("dataEncipherment"), e & Ft.decipherOnly && r.push("decipherOnly"), e & Ft.digitalSignature && r.push("digitalSignature"), e & Ft.encipherOnly && r.push("encipherOnly"), e & Ft.keyAgreement && r.push("keyAgreement"), e & Ft.keyCertSign && r.push("keyCertSign"), e & Ft.keyEncipherment && r.push("keyEncipherment"), e & Ft.nonRepudiation && r.push("nonRepudiation"), r;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}, "ei");
var Il;
var z1 = `${Q}.30`;
var ti = /* @__PURE__ */ __name(class {
  base = new K();
  minimum = 0;
  maximum;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ti");
a([u({ type: K })], ti.prototype, "base", void 0);
a([u({ type: p.Integer, context: 0, defaultValue: 0, implicit: true })], ti.prototype, "minimum", void 0);
a([u({ type: p.Integer, context: 1, optional: true, implicit: true })], ti.prototype, "maximum", void 0);
var wc = Il = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Il.prototype);
  }
}, "Il");
wc = Il = a([v({ type: m.Sequence, itemType: ti })], wc);
var bc = /* @__PURE__ */ __name(class {
  permittedSubtrees;
  excludedSubtrees;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "bc");
a([u({ type: wc, context: 0, optional: true, implicit: true })], bc.prototype, "permittedSubtrees", void 0);
a([u({ type: wc, context: 1, optional: true, implicit: true })], bc.prototype, "excludedSubtrees", void 0);
var t_ = `${Q}.36`;
var xc = /* @__PURE__ */ __name(class {
  requireExplicitPolicy;
  inhibitPolicyMapping;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "xc");
a([u({ type: p.Integer, context: 0, implicit: true, optional: true, converter: te })], xc.prototype, "requireExplicitPolicy", void 0);
a([u({ type: p.Integer, context: 1, implicit: true, optional: true, converter: te })], xc.prototype, "inhibitPolicyMapping", void 0);
var Ol;
var s_ = `${Q}.33`;
var xs = /* @__PURE__ */ __name(class {
  issuerDomainPolicy = "";
  subjectDomainPolicy = "";
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "xs");
a([u({ type: p.ObjectIdentifier })], xs.prototype, "issuerDomainPolicy", void 0);
a([u({ type: p.ObjectIdentifier })], xs.prototype, "subjectDomainPolicy", void 0);
var yh = Ol = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ol.prototype);
  }
}, "Ol");
yh = Ol = a([v({ type: m.Sequence, itemType: xs })], yh);
var Nl;
var oi = `${Q}.17`;
var ri = Nl = /* @__PURE__ */ __name(class extends de {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Nl.prototype);
  }
}, "Nl");
ri = Nl = a([v({ type: m.Sequence })], ri);
var Me = /* @__PURE__ */ __name(class {
  type = "";
  values = [];
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Me");
a([u({ type: p.ObjectIdentifier })], Me.prototype, "type", void 0);
a([u({ type: p.Any, repeated: "set" })], Me.prototype, "values", void 0);
var kl;
var x_ = `${Q}.9`;
var gh = kl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, kl.prototype);
  }
}, "kl");
gh = kl = a([v({ type: m.Sequence, itemType: Me })], gh);
var Ec = `${Q}.14`;
var et = /* @__PURE__ */ __name(class extends cn {
}, "et");
var N_ = `${Q}.16`;
var Sc = /* @__PURE__ */ __name(class {
  notBefore;
  notAfter;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Sc");
a([u({ type: p.GeneralizedTime, context: 0, implicit: true, optional: true })], Sc.prototype, "notBefore", void 0);
a([u({ type: p.GeneralizedTime, context: 1, implicit: true, optional: true })], Sc.prototype, "notAfter", void 0);
var Es;
(function(t15) {
  t15[t15.keyUpdateAllowed = 1] = "keyUpdateAllowed", t15[t15.newExtensions = 2] = "newExtensions", t15[t15.pKIXCertificate = 4] = "pKIXCertificate";
})(Es || (Es = {}));
var _c = /* @__PURE__ */ __name(class extends ur {
  toJSON() {
    let e = [], r = this.toNumber();
    return r & Es.pKIXCertificate && e.push("pKIXCertificate"), r & Es.newExtensions && e.push("newExtensions"), r & Es.keyUpdateAllowed && e.push("keyUpdateAllowed"), e;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
}, "_c");
var Cc = /* @__PURE__ */ __name(class {
  entrustVers = "";
  entrustInfoFlags = new _c();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Cc");
a([u({ type: p.GeneralString })], Cc.prototype, "entrustVers", void 0);
a([u({ type: _c })], Cc.prototype, "entrustInfoFlags", void 0);
var Pl;
var H_ = `${po}.11`;
var vh = Pl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Pl.prototype);
  }
}, "Pl");
vh = Pl = a([v({ type: m.Sequence, itemType: Or })], vh);
var _ = /* @__PURE__ */ __name(class t3 {
  algorithm = "";
  parameters;
  constructor(e = {}) {
    Object.assign(this, e);
  }
  isEqual(e) {
    return e instanceof t3 && e.algorithm == this.algorithm && (e.parameters && this.parameters && cs(e.parameters, this.parameters) || e.parameters === this.parameters);
  }
}, "t");
a([u({ type: p.ObjectIdentifier })], _.prototype, "algorithm", void 0);
a([u({ type: p.Any, optional: true })], _.prototype, "parameters", void 0);
var $e = /* @__PURE__ */ __name(class {
  algorithm = new _();
  subjectPublicKey = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "$e");
a([u({ type: _ })], $e.prototype, "algorithm", void 0);
a([u({ type: p.BitString })], $e.prototype, "subjectPublicKey", void 0);
var ge = /* @__PURE__ */ __name(class {
  utcTime;
  generalTime;
  constructor(e) {
    if (e)
      if (typeof e == "string" || typeof e == "number" || e instanceof Date) {
        let r = new Date(e);
        r.setUTCMilliseconds(0), r.getUTCFullYear() > 2049 ? this.generalTime = r : this.utcTime = r;
      } else
        Object.assign(this, e);
  }
  getTime() {
    let e = this.utcTime || this.generalTime;
    if (!e)
      throw new Error("Cannot get time from CHOICE object");
    return e;
  }
}, "ge");
a([u({ type: p.UTCTime })], ge.prototype, "utcTime", void 0);
a([u({ type: p.GeneralizedTime })], ge.prototype, "generalTime", void 0);
ge = a([v({ type: m.Choice })], ge);
var mo = /* @__PURE__ */ __name(class {
  notBefore = new ge(/* @__PURE__ */ new Date());
  notAfter = new ge(/* @__PURE__ */ new Date());
  constructor(e) {
    e && (this.notBefore = new ge(e.notBefore), this.notAfter = new ge(e.notAfter));
  }
}, "mo");
a([u({ type: ge })], mo.prototype, "notBefore", void 0);
a([u({ type: ge })], mo.prototype, "notAfter", void 0);
var Rl;
var _a2;
var Je = (/* @__PURE__ */ __name(_a2 = class {
  extnID = "";
  critical = _a2.CRITICAL;
  extnValue = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "t"), __publicField(_a2, "CRITICAL", false), _a2);
a([u({ type: p.ObjectIdentifier })], Je.prototype, "extnID", void 0);
a([u({ type: p.Boolean, defaultValue: Je.CRITICAL })], Je.prototype, "critical", void 0);
a([u({ type: S })], Je.prototype, "extnValue", void 0);
var Bt = Rl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Rl.prototype);
  }
}, "Rl");
Bt = Rl = a([v({ type: m.Sequence, itemType: Je })], Bt);
var Rr;
(function(t15) {
  t15[t15.v1 = 0] = "v1", t15[t15.v2 = 1] = "v2", t15[t15.v3 = 2] = "v3";
})(Rr || (Rr = {}));
var Ke = /* @__PURE__ */ __name(class {
  version = Rr.v1;
  serialNumber = new ArrayBuffer(0);
  signature = new _();
  issuer = new ue();
  validity = new mo();
  subject = new ue();
  subjectPublicKeyInfo = new $e();
  issuerUniqueID;
  subjectUniqueID;
  extensions;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ke");
a([u({ type: p.Integer, context: 0, defaultValue: Rr.v1 })], Ke.prototype, "version", void 0);
a([u({ type: p.Integer, converter: te })], Ke.prototype, "serialNumber", void 0);
a([u({ type: _ })], Ke.prototype, "signature", void 0);
a([u({ type: ue })], Ke.prototype, "issuer", void 0);
a([u({ type: mo })], Ke.prototype, "validity", void 0);
a([u({ type: ue })], Ke.prototype, "subject", void 0);
a([u({ type: $e })], Ke.prototype, "subjectPublicKeyInfo", void 0);
a([u({ type: p.BitString, context: 1, implicit: true, optional: true })], Ke.prototype, "issuerUniqueID", void 0);
a([u({ type: p.BitString, context: 2, implicit: true, optional: true })], Ke.prototype, "subjectUniqueID", void 0);
a([u({ type: Bt, context: 3, optional: true })], Ke.prototype, "extensions", void 0);
var Ae = /* @__PURE__ */ __name(class {
  tbsCertificate = new Ke();
  tbsCertificateRaw;
  signatureAlgorithm = new _();
  signatureValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ae");
a([u({ type: Ke, raw: true })], Ae.prototype, "tbsCertificate", void 0);
a([u({ type: _ })], Ae.prototype, "signatureAlgorithm", void 0);
a([u({ type: p.BitString })], Ae.prototype, "signatureValue", void 0);
var pr = /* @__PURE__ */ __name(class {
  userCertificate = new ArrayBuffer(0);
  revocationDate = new ge();
  crlEntryExtensions;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "pr");
a([u({ type: p.Integer, converter: te })], pr.prototype, "userCertificate", void 0);
a([u({ type: ge })], pr.prototype, "revocationDate", void 0);
a([u({ type: Je, optional: true, repeated: "sequence" })], pr.prototype, "crlEntryExtensions", void 0);
var lt = /* @__PURE__ */ __name(class {
  version;
  signature = new _();
  issuer = new ue();
  thisUpdate = new ge();
  nextUpdate;
  revokedCertificates;
  crlExtensions;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "lt");
a([u({ type: p.Integer, optional: true })], lt.prototype, "version", void 0);
a([u({ type: _ })], lt.prototype, "signature", void 0);
a([u({ type: ue })], lt.prototype, "issuer", void 0);
a([u({ type: ge })], lt.prototype, "thisUpdate", void 0);
a([u({ type: ge, optional: true })], lt.prototype, "nextUpdate", void 0);
a([u({ type: pr, repeated: "sequence", optional: true })], lt.prototype, "revokedCertificates", void 0);
a([u({ type: Je, optional: true, context: 0, repeated: "sequence" })], lt.prototype, "crlExtensions", void 0);
var yo = /* @__PURE__ */ __name(class {
  tbsCertList = new lt();
  tbsCertListRaw;
  signatureAlgorithm = new _();
  signature = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "yo");
a([u({ type: lt, raw: true })], yo.prototype, "tbsCertList", void 0);
a([u({ type: _ })], yo.prototype, "signatureAlgorithm", void 0);
a([u({ type: p.BitString })], yo.prototype, "signature", void 0);
var wh = { "2.5.4.6": "C", "2.5.4.10": "O", "2.5.4.11": "OU", "2.5.4.3": "CN" };
function ni(t15) {
  let e = pe.parse(t15, Ae), r = e.tbsCertificate, o = { combined: "" };
  r.issuer.forEach(([s]) => {
    let c = wh[s.type];
    c && (o[c] = s.value.toString());
  }), o.combined = bh(o);
  let n = { combined: "" };
  r.subject.forEach(([s]) => {
    let c = wh[s.type];
    c && (n[c] = s.value.toString());
  }), n.combined = bh(n);
  let i = false;
  if (r.extensions)
    for (let s of r.extensions)
      s.extnID === Jn && (i = pe.parse(s.extnValue, Nr).cA);
  return { issuer: o, subject: n, version: r.version, basicConstraintsCA: i, notBefore: r.validity.notBefore.getTime(), notAfter: r.validity.notAfter.getTime(), parsedCertificate: e };
}
__name(ni, "ni");
function bh(t15) {
  let e = [];
  return t15.C && e.push(t15.C), t15.O && e.push(t15.O), t15.OU && e.push(t15.OU), t15.CN && e.push(t15.CN), e.join(" : ");
}
__name(bh, "bh");
var b4 = Cu(Eh());
var x = Cu(Lu());
var Gt = /* @__PURE__ */ __name(class {
  issuer = new ue();
  serialNumber = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Gt");
a([u({ type: ue })], Gt.prototype, "issuer", void 0);
a([u({ type: p.Integer, converter: te })], Gt.prototype, "serialNumber", void 0);
var fn = /* @__PURE__ */ __name(class {
  subjectKeyIdentifier;
  issuerAndSerialNumber;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "fn");
a([u({ type: et, context: 0, implicit: true })], fn.prototype, "subjectKeyIdentifier", void 0);
a([u({ type: Gt })], fn.prototype, "issuerAndSerialNumber", void 0);
fn = a([v({ type: m.Choice })], fn);
var Re;
(function(t15) {
  t15[t15.v0 = 0] = "v0", t15[t15.v1 = 1] = "v1", t15[t15.v2 = 2] = "v2", t15[t15.v3 = 3] = "v3", t15[t15.v4 = 4] = "v4", t15[t15.v5 = 5] = "v5";
})(Re || (Re = {}));
var pn = /* @__PURE__ */ __name(class extends _ {
}, "pn");
pn = a([v({ type: m.Sequence })], pn);
var Ss = /* @__PURE__ */ __name(class extends _ {
}, "Ss");
Ss = a([v({ type: m.Sequence })], Ss);
var tt = /* @__PURE__ */ __name(class extends _ {
}, "tt");
tt = a([v({ type: m.Sequence })], tt);
var _s = /* @__PURE__ */ __name(class extends _ {
}, "_s");
_s = a([v({ type: m.Sequence })], _s);
var Sh = /* @__PURE__ */ __name(class extends _ {
}, "Sh");
Sh = a([v({ type: m.Sequence })], Sh);
var Tc = /* @__PURE__ */ __name(class extends _ {
}, "Tc");
Tc = a([v({ type: m.Sequence })], Tc);
var Wt = /* @__PURE__ */ __name(class {
  attrType = "";
  attrValues = [];
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Wt");
a([u({ type: p.ObjectIdentifier })], Wt.prototype, "attrType", void 0);
a([u({ type: p.Any, repeated: "set" })], Wt.prototype, "attrValues", void 0);
var Ml;
var rt = /* @__PURE__ */ __name(class {
  version = Re.v0;
  sid = new fn();
  digestAlgorithm = new pn();
  signedAttrs;
  signedAttrsRaw;
  signatureAlgorithm = new Ss();
  signature = new S();
  unsignedAttrs;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "rt");
a([u({ type: p.Integer })], rt.prototype, "version", void 0);
a([u({ type: fn })], rt.prototype, "sid", void 0);
a([u({ type: pn })], rt.prototype, "digestAlgorithm", void 0);
a([u({ type: Wt, repeated: "set", context: 0, implicit: true, optional: true, raw: true })], rt.prototype, "signedAttrs", void 0);
a([u({ type: Ss })], rt.prototype, "signatureAlgorithm", void 0);
a([u({ type: S })], rt.prototype, "signature", void 0);
a([u({ type: Wt, repeated: "set", context: 1, implicit: true, optional: true })], rt.prototype, "unsignedAttrs", void 0);
var Cs = Ml = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Ml.prototype);
  }
}, "Ml");
Cs = Ml = a([v({ type: m.Set, itemType: rt })], Cs);
var _h = /* @__PURE__ */ __name(class extends rt {
}, "_h");
_h = a([v({ type: m.Sequence })], _h);
var Ch = /* @__PURE__ */ __name(class extends ge {
}, "Ch");
Ch = a([v({ type: m.Choice })], Ch);
var Ts = /* @__PURE__ */ __name(class {
  acIssuer = new K();
  acSerial = 0;
  attrs = [];
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ts");
a([u({ type: K })], Ts.prototype, "acIssuer", void 0);
a([u({ type: p.Integer })], Ts.prototype, "acSerial", void 0);
a([u({ type: Me, repeated: "sequence" })], Ts.prototype, "attrs", void 0);
var Dl;
var Bs = Dl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Dl.prototype);
  }
}, "Dl");
Bs = Dl = a([v({ type: m.Sequence, itemType: p.ObjectIdentifier })], Bs);
var ii = /* @__PURE__ */ __name(class {
  pathLenConstraint;
  permittedAttrs;
  excludedAttrs;
  permitUnSpecified = true;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ii");
a([u({ type: p.Integer, optional: true })], ii.prototype, "pathLenConstraint", void 0);
a([u({ type: Bs, implicit: true, context: 0, optional: true })], ii.prototype, "permittedAttrs", void 0);
a([u({ type: Bs, implicit: true, context: 1, optional: true })], ii.prototype, "excludedAttrs", void 0);
a([u({ type: p.Boolean, defaultValue: true })], ii.prototype, "permitUnSpecified", void 0);
var It = /* @__PURE__ */ __name(class {
  issuer = new de();
  serial = new ArrayBuffer(0);
  issuerUID = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "It");
a([u({ type: de })], It.prototype, "issuer", void 0);
a([u({ type: p.Integer, converter: te })], It.prototype, "serial", void 0);
a([u({ type: p.BitString, optional: true })], It.prototype, "issuerUID", void 0);
var jl;
(function(t15) {
  t15[t15.publicKey = 0] = "publicKey", t15[t15.publicKeyCert = 1] = "publicKeyCert", t15[t15.otherObjectTypes = 2] = "otherObjectTypes";
})(jl || (jl = {}));
var Ot = /* @__PURE__ */ __name(class {
  digestedObjectType = jl.publicKey;
  otherObjectTypeID;
  digestAlgorithm = new _();
  objectDigest = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ot");
a([u({ type: p.Enumerated })], Ot.prototype, "digestedObjectType", void 0);
a([u({ type: p.ObjectIdentifier, optional: true })], Ot.prototype, "otherObjectTypeID", void 0);
a([u({ type: _ })], Ot.prototype, "digestAlgorithm", void 0);
a([u({ type: p.BitString })], Ot.prototype, "objectDigest", void 0);
var dn = /* @__PURE__ */ __name(class {
  issuerName;
  baseCertificateID;
  objectDigestInfo;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "dn");
a([u({ type: de, optional: true })], dn.prototype, "issuerName", void 0);
a([u({ type: It, context: 0, implicit: true, optional: true })], dn.prototype, "baseCertificateID", void 0);
a([u({ type: Ot, context: 1, implicit: true, optional: true })], dn.prototype, "objectDigestInfo", void 0);
var hn = /* @__PURE__ */ __name(class {
  v1Form;
  v2Form;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "hn");
a([u({ type: K, repeated: "sequence" })], hn.prototype, "v1Form", void 0);
a([u({ type: dn, context: 0, implicit: true })], hn.prototype, "v2Form", void 0);
hn = a([v({ type: m.Choice })], hn);
var mn = /* @__PURE__ */ __name(class {
  notBeforeTime = /* @__PURE__ */ new Date();
  notAfterTime = /* @__PURE__ */ new Date();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "mn");
a([u({ type: p.GeneralizedTime })], mn.prototype, "notBeforeTime", void 0);
a([u({ type: p.GeneralizedTime })], mn.prototype, "notAfterTime", void 0);
var go = /* @__PURE__ */ __name(class {
  baseCertificateID;
  entityName;
  objectDigestInfo;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "go");
a([u({ type: It, implicit: true, context: 0, optional: true })], go.prototype, "baseCertificateID", void 0);
a([u({ type: de, implicit: true, context: 1, optional: true })], go.prototype, "entityName", void 0);
a([u({ type: Ot, implicit: true, context: 2, optional: true })], go.prototype, "objectDigestInfo", void 0);
var Ul;
(function(t15) {
  t15[t15.v2 = 1] = "v2";
})(Ul || (Ul = {}));
var ot = /* @__PURE__ */ __name(class {
  version = Ul.v2;
  holder = new go();
  issuer = new hn();
  signature = new _();
  serialNumber = new ArrayBuffer(0);
  attrCertValidityPeriod = new mn();
  attributes = [];
  issuerUniqueID;
  extensions;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ot");
a([u({ type: p.Integer })], ot.prototype, "version", void 0);
a([u({ type: go })], ot.prototype, "holder", void 0);
a([u({ type: hn })], ot.prototype, "issuer", void 0);
a([u({ type: _ })], ot.prototype, "signature", void 0);
a([u({ type: p.Integer, converter: te })], ot.prototype, "serialNumber", void 0);
a([u({ type: mn })], ot.prototype, "attrCertValidityPeriod", void 0);
a([u({ type: Me, repeated: "sequence" })], ot.prototype, "attributes", void 0);
a([u({ type: p.BitString, optional: true })], ot.prototype, "issuerUniqueID", void 0);
a([u({ type: Bt, optional: true })], ot.prototype, "extensions", void 0);
var yn = /* @__PURE__ */ __name(class {
  acinfo = new ot();
  signatureAlgorithm = new _();
  signatureValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "yn");
a([u({ type: ot })], yn.prototype, "acinfo", void 0);
a([u({ type: _ })], yn.prototype, "signatureAlgorithm", void 0);
a([u({ type: p.BitString })], yn.prototype, "signatureValue", void 0);
var Is;
(function(t15) {
  t15[t15.unmarked = 1] = "unmarked", t15[t15.unclassified = 2] = "unclassified", t15[t15.restricted = 4] = "restricted", t15[t15.confidential = 8] = "confidential", t15[t15.secret = 16] = "secret", t15[t15.topSecret = 32] = "topSecret";
})(Is || (Is = {}));
var si = /* @__PURE__ */ __name(class extends ur {
}, "si");
var ai = /* @__PURE__ */ __name(class {
  type = "";
  value = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ai");
a([u({ type: p.ObjectIdentifier, implicit: true, context: 0 })], ai.prototype, "type", void 0);
a([u({ type: p.Any, implicit: true, context: 1 })], ai.prototype, "value", void 0);
var Os = /* @__PURE__ */ __name(class {
  policyId = "";
  classList = new si(Is.unclassified);
  securityCategories;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Os");
a([u({ type: p.ObjectIdentifier })], Os.prototype, "policyId", void 0);
a([u({ type: si, defaultValue: new si(Is.unclassified) })], Os.prototype, "classList", void 0);
a([u({ type: ai, repeated: "set" })], Os.prototype, "securityCategories", void 0);
var ci = /* @__PURE__ */ __name(class {
  cotets;
  oid;
  string;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ci");
a([u({ type: S })], ci.prototype, "cotets", void 0);
a([u({ type: p.ObjectIdentifier })], ci.prototype, "oid", void 0);
a([u({ type: p.Utf8String })], ci.prototype, "string", void 0);
var Bc = /* @__PURE__ */ __name(class {
  policyAuthority;
  values = [];
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Bc");
a([u({ type: de, implicit: true, context: 0, optional: true })], Bc.prototype, "policyAuthority", void 0);
a([u({ type: ci, repeated: "sequence" })], Bc.prototype, "values", void 0);
var MI = `${po}.4`;
var DI = `${po}.6`;
var jI = `${po}.10`;
var UI = `${Q}.55`;
var Ns = `${fo}.10`;
var LI = `${Ns}.1`;
var HI = `${Ns}.2`;
var VI = `${Ns}.3`;
var FI = `${Ns}.4`;
var GI = `${Ns}.6`;
var Ll = "2.5.4";
var WI = `${Ll}.72`;
var Hl;
var ui = /* @__PURE__ */ __name(class {
  targetCertificate = new It();
  targetName;
  certDigestInfo;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ui");
a([u({ type: It })], ui.prototype, "targetCertificate", void 0);
a([u({ type: K, optional: true })], ui.prototype, "targetName", void 0);
a([u({ type: Ot, optional: true })], ui.prototype, "certDigestInfo", void 0);
var li = /* @__PURE__ */ __name(class {
  targetName;
  targetGroup;
  targetCert;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "li");
a([u({ type: K, context: 0, implicit: true })], li.prototype, "targetName", void 0);
a([u({ type: K, context: 1, implicit: true })], li.prototype, "targetGroup", void 0);
a([u({ type: ui, context: 2, implicit: true })], li.prototype, "targetCert", void 0);
li = a([v({ type: m.Choice })], li);
var Ic = Hl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Hl.prototype);
  }
}, "Hl");
Ic = Hl = a([v({ type: m.Sequence, itemType: li })], Ic);
var Vl;
var Th = Vl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Vl.prototype);
  }
}, "Vl");
Th = Vl = a([v({ type: m.Sequence, itemType: Ic })], Th);
var Oc = /* @__PURE__ */ __name(class {
  roleAuthority;
  roleName;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Oc");
a([u({ type: de, implicit: true, context: 0, optional: true })], Oc.prototype, "roleAuthority", void 0);
a([u({ type: K, implicit: true, context: 1 })], Oc.prototype, "roleName", void 0);
var ks = /* @__PURE__ */ __name(class {
  service = new K();
  ident = new K();
  authInfo;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ks");
a([u({ type: K })], ks.prototype, "service", void 0);
a([u({ type: K })], ks.prototype, "ident", void 0);
a([u({ type: S, optional: true })], ks.prototype, "authInfo", void 0);
var Fl;
var Ps = /* @__PURE__ */ __name(class {
  otherCertFormat = "";
  otherCert = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ps");
a([u({ type: p.ObjectIdentifier })], Ps.prototype, "otherCertFormat", void 0);
a([u({ type: p.Any })], Ps.prototype, "otherCert", void 0);
var vo = /* @__PURE__ */ __name(class {
  certificate;
  v2AttrCert;
  other;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "vo");
a([u({ type: Ae })], vo.prototype, "certificate", void 0);
a([u({ type: yn, context: 2, implicit: true })], vo.prototype, "v2AttrCert", void 0);
a([u({ type: Ps, context: 3, implicit: true })], vo.prototype, "other", void 0);
vo = a([v({ type: m.Choice })], vo);
var Ao = Fl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Fl.prototype);
  }
}, "Fl");
Ao = Fl = a([v({ type: m.Set, itemType: vo })], Ao);
var Qe = /* @__PURE__ */ __name(class {
  contentType = "";
  content = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Qe");
a([u({ type: p.ObjectIdentifier })], Qe.prototype, "contentType", void 0);
a([u({ type: p.Any, context: 0 })], Qe.prototype, "content", void 0);
var gn = /* @__PURE__ */ __name(class {
  single;
  any;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "gn");
a([u({ type: S })], gn.prototype, "single", void 0);
a([u({ type: p.Any })], gn.prototype, "any", void 0);
gn = a([v({ type: m.Choice })], gn);
var vn = /* @__PURE__ */ __name(class {
  eContentType = "";
  eContent;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "vn");
a([u({ type: p.ObjectIdentifier })], vn.prototype, "eContentType", void 0);
a([u({ type: gn, context: 0, optional: true })], vn.prototype, "eContent", void 0);
var Rs = /* @__PURE__ */ __name(class {
  value;
  constructedValue;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Rs");
a([u({ type: S, context: 0, implicit: true, optional: true })], Rs.prototype, "value", void 0);
a([u({ type: S, converter: oh, context: 0, implicit: true, optional: true, repeated: "sequence" })], Rs.prototype, "constructedValue", void 0);
Rs = a([v({ type: m.Choice })], Rs);
var wo = /* @__PURE__ */ __name(class {
  contentType = "";
  contentEncryptionAlgorithm = new _s();
  encryptedContent;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "wo");
a([u({ type: p.ObjectIdentifier })], wo.prototype, "contentType", void 0);
a([u({ type: _s })], wo.prototype, "contentEncryptionAlgorithm", void 0);
a([u({ type: Rs, optional: true })], wo.prototype, "encryptedContent", void 0);
var bo = /* @__PURE__ */ __name(class {
  keyAttrId = "";
  keyAttr;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "bo");
a([u({ type: p.ObjectIdentifier })], bo.prototype, "keyAttrId", void 0);
a([u({ type: p.Any, optional: true })], bo.prototype, "keyAttr", void 0);
var Gl;
var fi = /* @__PURE__ */ __name(class {
  subjectKeyIdentifier = new et();
  date;
  other;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "fi");
a([u({ type: et })], fi.prototype, "subjectKeyIdentifier", void 0);
a([u({ type: p.GeneralizedTime, optional: true })], fi.prototype, "date", void 0);
a([u({ type: bo, optional: true })], fi.prototype, "other", void 0);
var pi = /* @__PURE__ */ __name(class {
  rKeyId;
  issuerAndSerialNumber;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "pi");
a([u({ type: fi, context: 0, implicit: true, optional: true })], pi.prototype, "rKeyId", void 0);
a([u({ type: Gt, optional: true })], pi.prototype, "issuerAndSerialNumber", void 0);
pi = a([v({ type: m.Choice })], pi);
var Ms = /* @__PURE__ */ __name(class {
  rid = new pi();
  encryptedKey = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ms");
a([u({ type: pi })], Ms.prototype, "rid", void 0);
a([u({ type: S })], Ms.prototype, "encryptedKey", void 0);
var Nc = Gl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Gl.prototype);
  }
}, "Gl");
Nc = Gl = a([v({ type: m.Sequence, itemType: Ms })], Nc);
var Ds = /* @__PURE__ */ __name(class {
  algorithm = new _();
  publicKey = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ds");
a([u({ type: _ })], Ds.prototype, "algorithm", void 0);
a([u({ type: p.BitString })], Ds.prototype, "publicKey", void 0);
var An = /* @__PURE__ */ __name(class {
  subjectKeyIdentifier;
  originatorKey;
  issuerAndSerialNumber;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "An");
a([u({ type: et, context: 0, implicit: true, optional: true })], An.prototype, "subjectKeyIdentifier", void 0);
a([u({ type: Ds, context: 1, implicit: true, optional: true })], An.prototype, "originatorKey", void 0);
a([u({ type: Gt, optional: true })], An.prototype, "issuerAndSerialNumber", void 0);
An = a([v({ type: m.Choice })], An);
var Mr = /* @__PURE__ */ __name(class {
  version = Re.v3;
  originator = new An();
  ukm;
  keyEncryptionAlgorithm = new tt();
  recipientEncryptedKeys = new Nc();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Mr");
a([u({ type: p.Integer })], Mr.prototype, "version", void 0);
a([u({ type: An, context: 0 })], Mr.prototype, "originator", void 0);
a([u({ type: S, context: 1, optional: true })], Mr.prototype, "ukm", void 0);
a([u({ type: tt })], Mr.prototype, "keyEncryptionAlgorithm", void 0);
a([u({ type: Nc })], Mr.prototype, "recipientEncryptedKeys", void 0);
var di = /* @__PURE__ */ __name(class {
  subjectKeyIdentifier;
  issuerAndSerialNumber;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "di");
a([u({ type: et, context: 0, implicit: true })], di.prototype, "subjectKeyIdentifier", void 0);
a([u({ type: Gt })], di.prototype, "issuerAndSerialNumber", void 0);
di = a([v({ type: m.Choice })], di);
var xo = /* @__PURE__ */ __name(class {
  version = Re.v0;
  rid = new di();
  keyEncryptionAlgorithm = new tt();
  encryptedKey = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "xo");
a([u({ type: p.Integer })], xo.prototype, "version", void 0);
a([u({ type: di })], xo.prototype, "rid", void 0);
a([u({ type: tt })], xo.prototype, "keyEncryptionAlgorithm", void 0);
a([u({ type: S })], xo.prototype, "encryptedKey", void 0);
var wn = /* @__PURE__ */ __name(class {
  keyIdentifier = new S();
  date;
  other;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "wn");
a([u({ type: S })], wn.prototype, "keyIdentifier", void 0);
a([u({ type: p.GeneralizedTime, optional: true })], wn.prototype, "date", void 0);
a([u({ type: bo, optional: true })], wn.prototype, "other", void 0);
var Eo = /* @__PURE__ */ __name(class {
  version = Re.v4;
  kekid = new wn();
  keyEncryptionAlgorithm = new tt();
  encryptedKey = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Eo");
a([u({ type: p.Integer })], Eo.prototype, "version", void 0);
a([u({ type: wn })], Eo.prototype, "kekid", void 0);
a([u({ type: tt })], Eo.prototype, "keyEncryptionAlgorithm", void 0);
a([u({ type: S })], Eo.prototype, "encryptedKey", void 0);
var So = /* @__PURE__ */ __name(class {
  version = Re.v0;
  keyDerivationAlgorithm;
  keyEncryptionAlgorithm = new tt();
  encryptedKey = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "So");
a([u({ type: p.Integer })], So.prototype, "version", void 0);
a([u({ type: Tc, context: 0, optional: true })], So.prototype, "keyDerivationAlgorithm", void 0);
a([u({ type: tt })], So.prototype, "keyEncryptionAlgorithm", void 0);
a([u({ type: S })], So.prototype, "encryptedKey", void 0);
var js = /* @__PURE__ */ __name(class {
  oriType = "";
  oriValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "js");
a([u({ type: p.ObjectIdentifier })], js.prototype, "oriType", void 0);
a([u({ type: p.Any })], js.prototype, "oriValue", void 0);
var Dr = /* @__PURE__ */ __name(class {
  ktri;
  kari;
  kekri;
  pwri;
  ori;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Dr");
a([u({ type: xo, optional: true })], Dr.prototype, "ktri", void 0);
a([u({ type: Mr, context: 1, implicit: true, optional: true })], Dr.prototype, "kari", void 0);
a([u({ type: Eo, context: 2, implicit: true, optional: true })], Dr.prototype, "kekri", void 0);
a([u({ type: So, context: 3, implicit: true, optional: true })], Dr.prototype, "pwri", void 0);
a([u({ type: js, context: 4, implicit: true, optional: true })], Dr.prototype, "ori", void 0);
Dr = a([v({ type: m.Choice })], Dr);
var Wl;
var Us = Wl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Wl.prototype);
  }
}, "Wl");
Us = Wl = a([v({ type: m.Set, itemType: Dr })], Us);
var $l;
var Bh = `${fo}.16`;
var GN = `${Bh}.2`;
var WN = `${Bh}.4`;
var hi = /* @__PURE__ */ __name(class {
  otherRevInfoFormat = "";
  otherRevInfo = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "hi");
a([u({ type: p.ObjectIdentifier })], hi.prototype, "otherRevInfoFormat", void 0);
a([u({ type: p.Any })], hi.prototype, "otherRevInfo", void 0);
var kc = /* @__PURE__ */ __name(class {
  other = new hi();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "kc");
a([u({ type: hi, context: 1, implicit: true })], kc.prototype, "other", void 0);
kc = a([v({ type: m.Choice })], kc);
var mi = $l = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, $l.prototype);
  }
}, "$l");
mi = $l = a([v({ type: m.Set, itemType: kc })], mi);
var yi = /* @__PURE__ */ __name(class {
  certs;
  crls;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "yi");
a([u({ type: Ao, context: 0, implicit: true, optional: true })], yi.prototype, "certs", void 0);
a([u({ type: mi, context: 1, implicit: true, optional: true })], yi.prototype, "crls", void 0);
var Kl;
var ql = Kl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Kl.prototype);
  }
}, "Kl");
ql = Kl = a([v({ type: m.Set, itemType: Wt })], ql);
var bn = /* @__PURE__ */ __name(class {
  version = Re.v0;
  originatorInfo;
  recipientInfos = new Us();
  encryptedContentInfo = new wo();
  unprotectedAttrs;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "bn");
a([u({ type: p.Integer })], bn.prototype, "version", void 0);
a([u({ type: yi, context: 0, implicit: true, optional: true })], bn.prototype, "originatorInfo", void 0);
a([u({ type: Us })], bn.prototype, "recipientInfos", void 0);
a([u({ type: wo })], bn.prototype, "encryptedContentInfo", void 0);
a([u({ type: ql, context: 1, implicit: true, optional: true })], bn.prototype, "unprotectedAttrs", void 0);
var Ih = "1.2.840.113549.1.7.1";
var Pc = "1.2.840.113549.1.7.2";
var Xl;
var Rc = Xl = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Xl.prototype);
  }
}, "Xl");
Rc = Xl = a([v({ type: m.Set, itemType: pn })], Rc);
var Nt = /* @__PURE__ */ __name(class {
  version = Re.v0;
  digestAlgorithms = new Rc();
  encapContentInfo = new vn();
  certificates;
  crls;
  signerInfos = new Cs();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Nt");
a([u({ type: p.Integer })], Nt.prototype, "version", void 0);
a([u({ type: Rc })], Nt.prototype, "digestAlgorithms", void 0);
a([u({ type: vn })], Nt.prototype, "encapContentInfo", void 0);
a([u({ type: Ao, context: 0, implicit: true, optional: true })], Nt.prototype, "certificates", void 0);
a([u({ type: mi, context: 1, implicit: true, optional: true })], Nt.prototype, "crls", void 0);
a([u({ type: Cs })], Nt.prototype, "signerInfos", void 0);
var jr = "1.2.840.10045.2.1";
var Ls = "1.2.840.10045.4.1";
var Mc = "1.2.840.10045.4.3.1";
var Hs = "1.2.840.10045.4.3.2";
var Vs = "1.2.840.10045.4.3.3";
var Fs = "1.2.840.10045.4.3.4";
var Gs = "1.2.840.10045.3.1.7";
var Ws = "1.3.132.0.34";
var zl = "1.3.132.0.35";
function $s(t15) {
  return new _({ algorithm: t15 });
}
__name($s, "$s");
var Nh = $s(Ls);
var Hk = $s(Mc);
var kh = $s(Hs);
var Ph = $s(Vs);
var Rh = $s(Fs);
var Ks = /* @__PURE__ */ __name(class {
  fieldType;
  parameters;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ks");
a([u({ type: p.ObjectIdentifier })], Ks.prototype, "fieldType", void 0);
a([u({ type: p.Any })], Ks.prototype, "parameters", void 0);
Ks = a([v({ type: m.Sequence })], Ks);
var Jl = /* @__PURE__ */ __name(class extends S {
}, "Jl");
var gi = /* @__PURE__ */ __name(class {
  a;
  b;
  seed;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "gi");
a([u({ type: p.OctetString })], gi.prototype, "a", void 0);
a([u({ type: p.OctetString })], gi.prototype, "b", void 0);
a([u({ type: p.BitString, optional: true })], gi.prototype, "seed", void 0);
gi = a([v({ type: m.Sequence })], gi);
var Ql;
(function(t15) {
  t15[t15.ecpVer1 = 1] = "ecpVer1";
})(Ql || (Ql = {}));
var dr = /* @__PURE__ */ __name(class {
  version = Ql.ecpVer1;
  fieldID;
  curve;
  base;
  order;
  cofactor;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "dr");
a([u({ type: p.Integer })], dr.prototype, "version", void 0);
a([u({ type: Ks })], dr.prototype, "fieldID", void 0);
a([u({ type: gi })], dr.prototype, "curve", void 0);
a([u({ type: Jl })], dr.prototype, "base", void 0);
a([u({ type: p.Integer, converter: te })], dr.prototype, "order", void 0);
a([u({ type: p.Integer, optional: true })], dr.prototype, "cofactor", void 0);
dr = a([v({ type: m.Sequence })], dr);
var kt = /* @__PURE__ */ __name(class {
  namedCurve;
  implicitCurve;
  specifiedCurve;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "kt");
a([u({ type: p.ObjectIdentifier })], kt.prototype, "namedCurve", void 0);
a([u({ type: p.Null })], kt.prototype, "implicitCurve", void 0);
a([u({ type: dr })], kt.prototype, "specifiedCurve", void 0);
kt = a([v({ type: m.Choice })], kt);
var vi = /* @__PURE__ */ __name(class {
  version = 1;
  privateKey = new S();
  parameters;
  publicKey;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "vi");
a([u({ type: p.Integer })], vi.prototype, "version", void 0);
a([u({ type: S })], vi.prototype, "privateKey", void 0);
a([u({ type: kt, context: 0, optional: true })], vi.prototype, "parameters", void 0);
a([u({ type: p.BitString, context: 1, optional: true })], vi.prototype, "publicKey", void 0);
var Ur = /* @__PURE__ */ __name(class {
  r = new ArrayBuffer(0);
  s = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ur");
a([u({ type: p.Integer, converter: te })], Ur.prototype, "r", void 0);
a([u({ type: p.Integer, converter: te })], Ur.prototype, "s", void 0);
var nt = "1.2.840.113549.1.1";
var Pt = `${nt}.1`;
var Mh = `${nt}.7`;
var Dh = `${nt}.9`;
var _o = `${nt}.10`;
var jh = `${nt}.2`;
var Uh = `${nt}.4`;
var Ai = `${nt}.5`;
var Lh = `${nt}.14`;
var Dc = `${nt}.11`;
var wi = `${nt}.12`;
var bi = `${nt}.13`;
var Yl = `${nt}.15`;
var Zl = `${nt}.16`;
var xn = "1.3.14.3.2.26";
var jc = "2.16.840.1.101.3.4.2.4";
var En = "2.16.840.1.101.3.4.2.1";
var Sn = "2.16.840.1.101.3.4.2.2";
var _n = "2.16.840.1.101.3.4.2.3";
var Hh = "2.16.840.1.101.3.4.2.5";
var Vh = "2.16.840.1.101.3.4.2.6";
var Fh = "1.2.840.113549.2.2";
var Gh = "1.2.840.113549.2.5";
var Co = `${nt}.8`;
function Oe(t15) {
  return new _({ algorithm: t15, parameters: null });
}
__name(Oe, "Oe");
var hP = Oe(Fh);
var mP = Oe(Gh);
var Lr = Oe(xn);
var yP = Oe(jc);
var gP = Oe(En);
var vP = Oe(Sn);
var AP = Oe(_n);
var wP = Oe(Hh);
var bP = Oe(Vh);
var Uc = new _({ algorithm: Co, parameters: E.serialize(Lr) });
var ef = new _({ algorithm: Dh, parameters: E.serialize(Xn.toASN(new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]).buffer)) });
var xP = Oe(Pt);
var EP = Oe(jh);
var SP = Oe(Uh);
var _P = Oe(Ai);
var CP = Oe(Yl);
var TP = Oe(Zl);
var BP = Oe(wi);
var IP = Oe(bi);
var OP = Oe(Yl);
var NP = Oe(Zl);
var xi = /* @__PURE__ */ __name(class {
  hashAlgorithm = new _(Lr);
  maskGenAlgorithm = new _({ algorithm: Co, parameters: E.serialize(Lr) });
  pSourceAlgorithm = new _(ef);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "xi");
a([u({ type: _, context: 0, defaultValue: Lr })], xi.prototype, "hashAlgorithm", void 0);
a([u({ type: _, context: 1, defaultValue: Uc })], xi.prototype, "maskGenAlgorithm", void 0);
a([u({ type: _, context: 2, defaultValue: ef })], xi.prototype, "pSourceAlgorithm", void 0);
var UP = new _({ algorithm: Mh, parameters: E.serialize(new xi()) });
var hr = /* @__PURE__ */ __name(class {
  hashAlgorithm = new _(Lr);
  maskGenAlgorithm = new _({ algorithm: Co, parameters: E.serialize(Lr) });
  saltLength = 20;
  trailerField = 1;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "hr");
a([u({ type: _, context: 0, defaultValue: Lr })], hr.prototype, "hashAlgorithm", void 0);
a([u({ type: _, context: 1, defaultValue: Uc })], hr.prototype, "maskGenAlgorithm", void 0);
a([u({ type: p.Integer, context: 2, defaultValue: 20 })], hr.prototype, "saltLength", void 0);
a([u({ type: p.Integer, context: 3, defaultValue: 1 })], hr.prototype, "trailerField", void 0);
var $P = new _({ algorithm: _o, parameters: E.serialize(new hr()) });
var Cn = /* @__PURE__ */ __name(class {
  digestAlgorithm = new _();
  digest = new S();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Cn");
a([u({ type: _ })], Cn.prototype, "digestAlgorithm", void 0);
a([u({ type: S })], Cn.prototype, "digest", void 0);
var tf;
var Ei = /* @__PURE__ */ __name(class {
  prime = new ArrayBuffer(0);
  exponent = new ArrayBuffer(0);
  coefficient = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ei");
a([u({ type: p.Integer, converter: te })], Ei.prototype, "prime", void 0);
a([u({ type: p.Integer, converter: te })], Ei.prototype, "exponent", void 0);
a([u({ type: p.Integer, converter: te })], Ei.prototype, "coefficient", void 0);
var Lc = tf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, tf.prototype);
  }
}, "tf");
Lc = tf = a([v({ type: m.Sequence, itemType: Ei })], Lc);
var Rt = /* @__PURE__ */ __name(class {
  version = 0;
  modulus = new ArrayBuffer(0);
  publicExponent = new ArrayBuffer(0);
  privateExponent = new ArrayBuffer(0);
  prime1 = new ArrayBuffer(0);
  prime2 = new ArrayBuffer(0);
  exponent1 = new ArrayBuffer(0);
  exponent2 = new ArrayBuffer(0);
  coefficient = new ArrayBuffer(0);
  otherPrimeInfos;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Rt");
a([u({ type: p.Integer })], Rt.prototype, "version", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "modulus", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "publicExponent", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "privateExponent", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "prime1", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "prime2", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "exponent1", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "exponent2", void 0);
a([u({ type: p.Integer, converter: te })], Rt.prototype, "coefficient", void 0);
a([u({ type: Lc, optional: true })], Rt.prototype, "otherPrimeInfos", void 0);
var To = /* @__PURE__ */ __name(class {
  modulus = new ArrayBuffer(0);
  publicExponent = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "To");
a([u({ type: p.Integer, converter: te })], To.prototype, "modulus", void 0);
a([u({ type: p.Integer, converter: te })], To.prototype, "publicExponent", void 0);
var rf;
(function(t15) {
  t15[t15.Transient = 0] = "Transient", t15[t15.Singleton = 1] = "Singleton", t15[t15.ResolutionScoped = 2] = "ResolutionScoped", t15[t15.ContainerScoped = 3] = "ContainerScoped";
})(rf || (rf = {}));
var De = rf;
var of = /* @__PURE__ */ __name(function(t15, e) {
  return of = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, o) {
    r.__proto__ = o;
  } || function(r, o) {
    for (var n in o)
      o.hasOwnProperty(n) && (r[n] = o[n]);
  }, of(t15, e);
}, "of");
function qs(t15, e) {
  of(t15, e);
  function r() {
    this.constructor = t15;
  }
  __name(r, "r");
  t15.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
__name(qs, "qs");
function Wh(t15, e, r, o) {
  function n(i) {
    return i instanceof r ? i : new r(function(s) {
      s(i);
    });
  }
  __name(n, "n");
  return new (r || (r = Promise))(function(i, s) {
    function c(d) {
      try {
        f(o.next(d));
      } catch (h) {
        s(h);
      }
    }
    __name(c, "c");
    function l(d) {
      try {
        f(o.throw(d));
      } catch (h) {
        s(h);
      }
    }
    __name(l, "l");
    function f(d) {
      d.done ? i(d.value) : n(d.value).then(c, l);
    }
    __name(f, "f");
    f((o = o.apply(t15, e || [])).next());
  });
}
__name(Wh, "Wh");
function $h(t15, e) {
  var r = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, o, n, i, s;
  return s = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function c(f) {
    return function(d) {
      return l([f, d]);
    };
  }
  __name(c, "c");
  function l(f) {
    if (o)
      throw new TypeError("Generator is already executing.");
    for (; r; )
      try {
        if (o = 1, n && (i = f[0] & 2 ? n.return : f[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, f[1])).done)
          return i;
        switch (n = 0, i && (f = [f[0] & 2, i.value]), f[0]) {
          case 0:
          case 1:
            i = f;
            break;
          case 4:
            return r.label++, { value: f[1], done: false };
          case 5:
            r.label++, n = f[1], f = [0];
            continue;
          case 7:
            f = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              r = 0;
              continue;
            }
            if (f[0] === 3 && (!i || f[1] > i[0] && f[1] < i[3])) {
              r.label = f[1];
              break;
            }
            if (f[0] === 6 && r.label < i[1]) {
              r.label = i[1], i = f;
              break;
            }
            if (i && r.label < i[2]) {
              r.label = i[2], r.ops.push(f);
              break;
            }
            i[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        f = e.call(t15, r);
      } catch (d) {
        f = [6, d], n = 0;
      } finally {
        o = i = 0;
      }
    if (f[0] & 5)
      throw f[1];
    return { value: f[0] ? f[1] : void 0, done: true };
  }
  __name(l, "l");
}
__name($h, "$h");
function Xs(t15) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t15[e], o = 0;
  if (r)
    return r.call(t15);
  if (t15 && typeof t15.length == "number")
    return { next: function() {
      return t15 && o >= t15.length && (t15 = void 0), { value: t15 && t15[o++], done: !t15 };
    } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
__name(Xs, "Xs");
function Si(t15, e) {
  var r = typeof Symbol == "function" && t15[Symbol.iterator];
  if (!r)
    return t15;
  var o = r.call(t15), n, i = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = o.next()).done; )
      i.push(n.value);
  } catch (c) {
    s = { error: c };
  } finally {
    try {
      n && !n.done && (r = o.return) && r.call(o);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return i;
}
__name(Si, "Si");
function mr() {
  for (var t15 = [], e = 0; e < arguments.length; e++)
    t15 = t15.concat(Si(arguments[e]));
  return t15;
}
__name(mr, "mr");
var Aw = "injectionTokens";
function nf(t15) {
  var e = Reflect.getMetadata("design:paramtypes", t15) || [], r = Reflect.getOwnMetadata(Aw, t15) || {};
  return Object.keys(r).forEach(function(o) {
    e[+o] = r[o];
  }), e;
}
__name(nf, "nf");
function zs(t15) {
  return !!t15.useClass;
}
__name(zs, "zs");
function _i(t15) {
  return !!t15.useFactory;
}
__name(_i, "_i");
var Hc = function() {
  function t15(e) {
    this.wrap = e, this.reflectMethods = ["get", "getPrototypeOf", "setPrototypeOf", "getOwnPropertyDescriptor", "defineProperty", "has", "set", "deleteProperty", "apply", "construct", "ownKeys"];
  }
  __name(t15, "t");
  return t15.prototype.createProxy = function(e) {
    var r = this, o = {}, n = false, i, s = /* @__PURE__ */ __name(function() {
      return n || (i = e(r.wrap()), n = true), i;
    }, "s");
    return new Proxy(o, this.createHandler(s));
  }, t15.prototype.createHandler = function(e) {
    var r = {}, o = /* @__PURE__ */ __name(function(n) {
      r[n] = function() {
        for (var i = [], s = 0; s < arguments.length; s++)
          i[s] = arguments[s];
        i[0] = e();
        var c = Reflect[n];
        return c.apply(void 0, mr(i));
      };
    }, "o");
    return this.reflectMethods.forEach(o), r;
  }, t15;
}();
function Bo(t15) {
  return typeof t15 == "string" || typeof t15 == "symbol";
}
__name(Bo, "Bo");
function sf(t15) {
  return typeof t15 == "object" && "token" in t15 && "multiple" in t15;
}
__name(sf, "sf");
function Vc(t15) {
  return typeof t15 == "object" && "token" in t15 && "transform" in t15;
}
__name(Vc, "Vc");
function Kh(t15) {
  return typeof t15 == "function" || t15 instanceof Hc;
}
__name(Kh, "Kh");
function Tn(t15) {
  return !!t15.useToken;
}
__name(Tn, "Tn");
function Bn(t15) {
  return t15.useValue != null;
}
__name(Bn, "Bn");
function qh(t15) {
  return zs(t15) || Bn(t15) || Tn(t15) || _i(t15);
}
__name(qh, "qh");
var ww = function() {
  function t15() {
    this._registryMap = /* @__PURE__ */ new Map();
  }
  __name(t15, "t");
  return t15.prototype.entries = function() {
    return this._registryMap.entries();
  }, t15.prototype.getAll = function(e) {
    return this.ensure(e), this._registryMap.get(e);
  }, t15.prototype.get = function(e) {
    this.ensure(e);
    var r = this._registryMap.get(e);
    return r[r.length - 1] || null;
  }, t15.prototype.set = function(e, r) {
    this.ensure(e), this._registryMap.get(e).push(r);
  }, t15.prototype.setAll = function(e, r) {
    this._registryMap.set(e, r);
  }, t15.prototype.has = function(e) {
    return this.ensure(e), this._registryMap.get(e).length > 0;
  }, t15.prototype.clear = function() {
    this._registryMap.clear();
  }, t15.prototype.ensure = function(e) {
    this._registryMap.has(e) || this._registryMap.set(e, []);
  }, t15;
}();
var Js = ww;
var bw = function(t15) {
  qs(e, t15);
  function e() {
    return t15 !== null && t15.apply(this, arguments) || this;
  }
  __name(e, "e");
  return e;
}(Js);
var Xh = bw;
var xw = function() {
  function t15() {
    this.scopedResolutions = /* @__PURE__ */ new Map();
  }
  __name(t15, "t");
  return t15;
}();
var Qs = xw;
function Ew(t15, e) {
  if (t15 === null)
    return "at position #" + e;
  var r = t15.split(",")[e].trim();
  return '"' + r + '" at position #' + e;
}
__name(Ew, "Ew");
function Sw(t15, e, r) {
  return r === void 0 && (r = "    "), mr([t15], e.message.split(`
`).map(function(o) {
    return r + o;
  })).join(`
`);
}
__name(Sw, "Sw");
function af(t15, e, r) {
  var o = Si(t15.toString().match(/constructor\(([\w, ]+)\)/) || [], 2), n = o[1], i = n === void 0 ? null : n, s = Ew(i, e);
  return Sw("Cannot inject the dependency " + s + ' of "' + t15.name + '" constructor. Reason:', r);
}
__name(af, "af");
function zh(t15) {
  if (typeof t15.dispose != "function")
    return false;
  var e = t15.dispose;
  return !(e.length > 0);
}
__name(zh, "zh");
var _w = function(t15) {
  qs(e, t15);
  function e() {
    return t15 !== null && t15.apply(this, arguments) || this;
  }
  __name(e, "e");
  return e;
}(Js);
var Cw = function(t15) {
  qs(e, t15);
  function e() {
    return t15 !== null && t15.apply(this, arguments) || this;
  }
  __name(e, "e");
  return e;
}(Js);
var Tw = function() {
  function t15() {
    this.preResolution = new _w(), this.postResolution = new Cw();
  }
  __name(t15, "t");
  return t15;
}();
var Jh = Tw;
var cf = /* @__PURE__ */ new Map();
var Bw = function() {
  function t15(e) {
    this.parent = e, this._registry = new Xh(), this.interceptors = new Jh(), this.disposed = false, this.disposables = /* @__PURE__ */ new Set();
  }
  __name(t15, "t");
  return t15.prototype.register = function(e, r, o) {
    o === void 0 && (o = { lifecycle: De.Transient }), this.ensureNotDisposed();
    var n;
    if (qh(r) ? n = r : n = { useClass: r }, Tn(n))
      for (var i = [e], s = n; s != null; ) {
        var c = s.useToken;
        if (i.includes(c))
          throw new Error("Token registration cycle detected! " + mr(i, [c]).join(" -> "));
        i.push(c);
        var l = this._registry.get(c);
        l && Tn(l.provider) ? s = l.provider : s = null;
      }
    if ((o.lifecycle === De.Singleton || o.lifecycle == De.ContainerScoped || o.lifecycle == De.ResolutionScoped) && (Bn(n) || _i(n)))
      throw new Error('Cannot use lifecycle "' + De[o.lifecycle] + '" with ValueProviders or FactoryProviders');
    return this._registry.set(e, { provider: n, options: o }), this;
  }, t15.prototype.registerType = function(e, r) {
    return this.ensureNotDisposed(), Bo(r) ? this.register(e, { useToken: r }) : this.register(e, { useClass: r });
  }, t15.prototype.registerInstance = function(e, r) {
    return this.ensureNotDisposed(), this.register(e, { useValue: r });
  }, t15.prototype.registerSingleton = function(e, r) {
    if (this.ensureNotDisposed(), Bo(e)) {
      if (Bo(r))
        return this.register(e, { useToken: r }, { lifecycle: De.Singleton });
      if (r)
        return this.register(e, { useClass: r }, { lifecycle: De.Singleton });
      throw new Error('Cannot register a type name as a singleton without a "to" token');
    }
    var o = e;
    return r && !Bo(r) && (o = r), this.register(e, { useClass: o }, { lifecycle: De.Singleton });
  }, t15.prototype.resolve = function(e, r, o) {
    r === void 0 && (r = new Qs()), o === void 0 && (o = false), this.ensureNotDisposed();
    var n = this.getRegistration(e);
    if (!n && Bo(e)) {
      if (o)
        return;
      throw new Error('Attempted to resolve unregistered dependency token: "' + e.toString() + '"');
    }
    if (this.executePreResolutionInterceptor(e, "Single"), n) {
      var i = this.resolveRegistration(n, r);
      return this.executePostResolutionInterceptor(e, i, "Single"), i;
    }
    if (Kh(e)) {
      var i = this.construct(e, r);
      return this.executePostResolutionInterceptor(e, i, "Single"), i;
    }
    throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
  }, t15.prototype.executePreResolutionInterceptor = function(e, r) {
    var o, n;
    if (this.interceptors.preResolution.has(e)) {
      var i = [];
      try {
        for (var s = Xs(this.interceptors.preResolution.getAll(e)), c = s.next(); !c.done; c = s.next()) {
          var l = c.value;
          l.options.frequency != "Once" && i.push(l), l.callback(e, r);
        }
      } catch (f) {
        o = { error: f };
      } finally {
        try {
          c && !c.done && (n = s.return) && n.call(s);
        } finally {
          if (o)
            throw o.error;
        }
      }
      this.interceptors.preResolution.setAll(e, i);
    }
  }, t15.prototype.executePostResolutionInterceptor = function(e, r, o) {
    var n, i;
    if (this.interceptors.postResolution.has(e)) {
      var s = [];
      try {
        for (var c = Xs(this.interceptors.postResolution.getAll(e)), l = c.next(); !l.done; l = c.next()) {
          var f = l.value;
          f.options.frequency != "Once" && s.push(f), f.callback(e, r, o);
        }
      } catch (d) {
        n = { error: d };
      } finally {
        try {
          l && !l.done && (i = c.return) && i.call(c);
        } finally {
          if (n)
            throw n.error;
        }
      }
      this.interceptors.postResolution.setAll(e, s);
    }
  }, t15.prototype.resolveRegistration = function(e, r) {
    if (this.ensureNotDisposed(), e.options.lifecycle === De.ResolutionScoped && r.scopedResolutions.has(e))
      return r.scopedResolutions.get(e);
    var o = e.options.lifecycle === De.Singleton, n = e.options.lifecycle === De.ContainerScoped, i = o || n, s;
    return Bn(e.provider) ? s = e.provider.useValue : Tn(e.provider) ? s = i ? e.instance || (e.instance = this.resolve(e.provider.useToken, r)) : this.resolve(e.provider.useToken, r) : zs(e.provider) ? s = i ? e.instance || (e.instance = this.construct(e.provider.useClass, r)) : this.construct(e.provider.useClass, r) : _i(e.provider) ? s = e.provider.useFactory(this) : s = this.construct(e.provider, r), e.options.lifecycle === De.ResolutionScoped && r.scopedResolutions.set(e, s), s;
  }, t15.prototype.resolveAll = function(e, r, o) {
    var n = this;
    r === void 0 && (r = new Qs()), o === void 0 && (o = false), this.ensureNotDisposed();
    var i = this.getAllRegistrations(e);
    if (!i && Bo(e)) {
      if (o)
        return [];
      throw new Error('Attempted to resolve unregistered dependency token: "' + e.toString() + '"');
    }
    if (this.executePreResolutionInterceptor(e, "All"), i) {
      var s = i.map(function(l) {
        return n.resolveRegistration(l, r);
      });
      return this.executePostResolutionInterceptor(e, s, "All"), s;
    }
    var c = [this.construct(e, r)];
    return this.executePostResolutionInterceptor(e, c, "All"), c;
  }, t15.prototype.isRegistered = function(e, r) {
    return r === void 0 && (r = false), this.ensureNotDisposed(), this._registry.has(e) || r && (this.parent || false) && this.parent.isRegistered(e, true);
  }, t15.prototype.reset = function() {
    this.ensureNotDisposed(), this._registry.clear(), this.interceptors.preResolution.clear(), this.interceptors.postResolution.clear();
  }, t15.prototype.clearInstances = function() {
    var e, r;
    this.ensureNotDisposed();
    try {
      for (var o = Xs(this._registry.entries()), n = o.next(); !n.done; n = o.next()) {
        var i = Si(n.value, 2), s = i[0], c = i[1];
        this._registry.setAll(s, c.filter(function(l) {
          return !Bn(l.provider);
        }).map(function(l) {
          return l.instance = void 0, l;
        }));
      }
    } catch (l) {
      e = { error: l };
    } finally {
      try {
        n && !n.done && (r = o.return) && r.call(o);
      } finally {
        if (e)
          throw e.error;
      }
    }
  }, t15.prototype.createChildContainer = function() {
    var e, r;
    this.ensureNotDisposed();
    var o = new t15(this);
    try {
      for (var n = Xs(this._registry.entries()), i = n.next(); !i.done; i = n.next()) {
        var s = Si(i.value, 2), c = s[0], l = s[1];
        l.some(function(f) {
          var d = f.options;
          return d.lifecycle === De.ContainerScoped;
        }) && o._registry.setAll(c, l.map(function(f) {
          return f.options.lifecycle === De.ContainerScoped ? { provider: f.provider, options: f.options } : f;
        }));
      }
    } catch (f) {
      e = { error: f };
    } finally {
      try {
        i && !i.done && (r = n.return) && r.call(n);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return o;
  }, t15.prototype.beforeResolution = function(e, r, o) {
    o === void 0 && (o = { frequency: "Always" }), this.interceptors.preResolution.set(e, { callback: r, options: o });
  }, t15.prototype.afterResolution = function(e, r, o) {
    o === void 0 && (o = { frequency: "Always" }), this.interceptors.postResolution.set(e, { callback: r, options: o });
  }, t15.prototype.dispose = function() {
    return Wh(this, void 0, void 0, function() {
      var e;
      return $h(this, function(r) {
        switch (r.label) {
          case 0:
            return this.disposed = true, e = [], this.disposables.forEach(function(o) {
              var n = o.dispose();
              n && e.push(n);
            }), [4, Promise.all(e)];
          case 1:
            return r.sent(), [2];
        }
      });
    });
  }, t15.prototype.getRegistration = function(e) {
    return this.isRegistered(e) ? this._registry.get(e) : this.parent ? this.parent.getRegistration(e) : null;
  }, t15.prototype.getAllRegistrations = function(e) {
    return this.isRegistered(e) ? this._registry.getAll(e) : this.parent ? this.parent.getAllRegistrations(e) : null;
  }, t15.prototype.construct = function(e, r) {
    var o = this;
    if (e instanceof Hc)
      return e.createProxy(function(i) {
        return o.resolve(i, r);
      });
    var n = function() {
      var i = cf.get(e);
      if (!i || i.length === 0) {
        if (e.length === 0)
          return new e();
        throw new Error('TypeInfo not known for "' + e.name + '"');
      }
      var s = i.map(o.resolveParams(r, e));
      return new (e.bind.apply(e, mr([void 0], s)))();
    }();
    return zh(n) && this.disposables.add(n), n;
  }, t15.prototype.resolveParams = function(e, r) {
    var o = this;
    return function(n, i) {
      var s, c, l;
      try {
        return sf(n) ? Vc(n) ? n.multiple ? (s = o.resolve(n.transform)).transform.apply(s, mr([o.resolveAll(n.token, new Qs(), n.isOptional)], n.transformArgs)) : (c = o.resolve(n.transform)).transform.apply(c, mr([o.resolve(n.token, e, n.isOptional)], n.transformArgs)) : n.multiple ? o.resolveAll(n.token, new Qs(), n.isOptional) : o.resolve(n.token, e, n.isOptional) : Vc(n) ? (l = o.resolve(n.transform, e)).transform.apply(l, mr([o.resolve(n.token, e)], n.transformArgs)) : o.resolve(n, e);
      } catch (f) {
        throw new Error(af(r, i, f));
      }
    };
  }, t15.prototype.ensureNotDisposed = function() {
    if (this.disposed)
      throw new Error("This container has been disposed, you cannot interact with a disposed container");
  }, t15;
}();
var le = new Bw();
function Iw(t15) {
  return function(e) {
    cf.set(e, nf(e)), t15 && t15.token && (Array.isArray(t15.token) ? t15.token.forEach(function(r) {
      le.register(r, e);
    }) : le.register(t15.token, e));
  };
}
__name(Iw, "Iw");
var Io = Iw;
if (typeof Reflect > "u" || !Reflect.getMetadata)
  throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);
var lf;
var In = /* @__PURE__ */ __name(class {
  attrId = "";
  attrValues = [];
  constructor(e = {}) {
    Object.assign(e);
  }
}, "In");
a([u({ type: p.ObjectIdentifier })], In.prototype, "attrId", void 0);
a([u({ type: p.Any, repeated: "set" })], In.prototype, "attrValues", void 0);
var Qh = lf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, lf.prototype);
  }
}, "lf");
Qh = lf = a([v({ type: m.Sequence, itemType: In })], Qh);
var ff;
var Yh = ff = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, ff.prototype);
  }
}, "ff");
Yh = ff = a([v({ type: m.Sequence, itemType: Qe })], Yh);
var Ow = "1.2.840.113549";
var Nw = `${Ow}.1`;
var Zh = `${Nw}.12`;
var Ci = `${Zh}.1`;
var BM = `${Ci}.1`;
var IM = `${Ci}.2`;
var OM = `${Ci}.3`;
var NM = `${Ci}.4`;
var kM = `${Ci}.5`;
var PM = `${Ci}.6`;
var On = `${Zh}.10.1`;
var DM = `${On}.1`;
var jM = `${On}.2`;
var UM = `${On}.3`;
var LM = `${On}.4`;
var HM = `${On}.5`;
var VM = `${On}.6`;
var Fc = "1.2.840.113549.1.9";
var Gc = /* @__PURE__ */ __name(class {
  certId = "";
  certValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Gc");
a([u({ type: p.ObjectIdentifier })], Gc.prototype, "certId", void 0);
a([u({ type: p.Any, context: 0 })], Gc.prototype, "certValue", void 0);
var em = `${Fc}.22`;
var KM = `${em}.1`;
var qM = `${em}.2`;
var Wc = /* @__PURE__ */ __name(class {
  crlId = "";
  crltValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Wc");
a([u({ type: p.ObjectIdentifier })], Wc.prototype, "crlId", void 0);
a([u({ type: p.Any, context: 0 })], Wc.prototype, "crltValue", void 0);
var kw = `${Fc}.23`;
var YM = `${kw}.1`;
var $c = /* @__PURE__ */ __name(class extends S {
}, "$c");
var Oo = /* @__PURE__ */ __name(class {
  encryptionAlgorithm = new _();
  encryptedData = new $c();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Oo");
a([u({ type: _ })], Oo.prototype, "encryptionAlgorithm", void 0);
a([u({ type: $c })], Oo.prototype, "encryptedData", void 0);
var pf;
var df;
(function(t15) {
  t15[t15.v1 = 0] = "v1";
})(df || (df = {}));
var Kc = /* @__PURE__ */ __name(class extends S {
}, "Kc");
var hf = pf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, pf.prototype);
  }
}, "pf");
hf = pf = a([v({ type: m.Sequence, itemType: Me })], hf);
var No = /* @__PURE__ */ __name(class {
  version = df.v1;
  privateKeyAlgorithm = new _();
  privateKey = new Kc();
  attributes;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "No");
a([u({ type: p.Integer })], No.prototype, "version", void 0);
a([u({ type: _ })], No.prototype, "privateKeyAlgorithm", void 0);
a([u({ type: Kc })], No.prototype, "privateKey", void 0);
a([u({ type: hf, implicit: true, context: 0, optional: true })], No.prototype, "attributes", void 0);
var tm = /* @__PURE__ */ __name(class extends No {
}, "tm");
tm = a([v({ type: m.Sequence })], tm);
var rm = /* @__PURE__ */ __name(class extends Oo {
}, "rm");
rm = a([v({ type: m.Sequence })], rm);
var qc = /* @__PURE__ */ __name(class {
  secretTypeId = "";
  secretValue = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "qc");
a([u({ type: p.ObjectIdentifier })], qc.prototype, "secretTypeId", void 0);
a([u({ type: p.Any, context: 0 })], qc.prototype, "secretValue", void 0);
var ko = /* @__PURE__ */ __name(class {
  mac = new Cn();
  macSalt = new S();
  iterations = 1;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "ko");
a([u({ type: Cn })], ko.prototype, "mac", void 0);
a([u({ type: S })], ko.prototype, "macSalt", void 0);
a([u({ type: p.Integer, defaultValue: 1 })], ko.prototype, "iterations", void 0);
var Nn = /* @__PURE__ */ __name(class {
  version = 3;
  authSafe = new Qe();
  macData = new ko();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Nn");
a([u({ type: p.Integer })], Nn.prototype, "version", void 0);
a([u({ type: Qe })], Nn.prototype, "authSafe", void 0);
a([u({ type: ko, optional: true })], Nn.prototype, "macData", void 0);
var mf;
var Ti = /* @__PURE__ */ __name(class {
  bagId = "";
  bagValue = new ArrayBuffer(0);
  bagAttributes;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Ti");
a([u({ type: p.ObjectIdentifier })], Ti.prototype, "bagId", void 0);
a([u({ type: p.Any, context: 0 })], Ti.prototype, "bagValue", void 0);
a([u({ type: In, repeated: "set", optional: true })], Ti.prototype, "bagAttributes", void 0);
var om = mf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, mf.prototype);
  }
}, "mf");
om = mf = a([v({ type: m.Sequence, itemType: Ti })], om);
var yf;
var gf;
var vf;
var we = "1.2.840.113549.1.9";
var ej = `${we}.0`;
var gm = `${we}.24`;
var Zs = `${we}.25`;
var vm = `${we}.26`;
var Am = `${we}.27`;
var tj = `${gm}.1`;
var rj = `${gm}.2`;
var oj = `${we}.1`;
var nj = `${we}.2`;
var ij = `${we}.3`;
var sj = `${we}.4`;
var aj = `${we}.5`;
var cj = `${we}.6`;
var Cf = `${we}.7`;
var uj = `${we}.8`;
var lj = `${we}.9`;
var fj = `${we}.13`;
var ea = `${we}.14`;
var pj = `${we}.15`;
var dj = `${we}.20`;
var hj = `${we}.21`;
var mj = `${Zs}.1`;
var yj = `${Zs}.2`;
var gj = `${Zs}.3`;
var vj = `${Zs}.4`;
var Aj = `${Zs}.5`;
var ta = "1.3.6.1.5.5.7.9";
var wj = `${ta}.1`;
var bj = `${ta}.2`;
var xj = `${ta}.3`;
var Ej = `${ta}.4`;
var Sj = `${ta}.5`;
var _j = `${vm}.1`;
var Cj = `${vm}.2`;
var Tj = `${Am}.1`;
var Bj = `${Am}.2`;
var Ij = `${we}.16`;
var Oj = `${we}.22`;
var Nj = `${we}.23`;
var kj = `${Ll}.65`;
var Xc = /* @__PURE__ */ __name(class extends Ce {
  ia5String;
  constructor(e = {}) {
    super(e);
  }
  toString() {
    return {}.toString(), this.ia5String || super.toString();
  }
}, "Xc");
a([u({ type: p.IA5String })], Xc.prototype, "ia5String", void 0);
Xc = a([v({ type: m.Choice })], Xc);
var nm = /* @__PURE__ */ __name(class extends Qe {
}, "nm");
nm = a([v({ type: m.Sequence })], nm);
var im = /* @__PURE__ */ __name(class extends Nn {
}, "im");
im = a([v({ type: m.Sequence })], im);
var sm = /* @__PURE__ */ __name(class extends Oo {
}, "sm");
sm = a([v({ type: m.Sequence })], sm);
var Af = /* @__PURE__ */ __name(class {
  value;
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
}, "Af");
a([u({ type: p.IA5String })], Af.prototype, "value", void 0);
Af = a([v({ type: m.Choice })], Af);
var am = /* @__PURE__ */ __name(class extends Xc {
}, "am");
am = a([v({ type: m.Choice })], am);
var cm = /* @__PURE__ */ __name(class extends Ce {
}, "cm");
cm = a([v({ type: m.Choice })], cm);
var wf = /* @__PURE__ */ __name(class {
  value;
  constructor(e = /* @__PURE__ */ new Date()) {
    this.value = e;
  }
}, "wf");
a([u({ type: p.GeneralizedTime })], wf.prototype, "value", void 0);
wf = a([v({ type: m.Choice })], wf);
var um = /* @__PURE__ */ __name(class extends Ce {
}, "um");
um = a([v({ type: m.Choice })], um);
var bf = /* @__PURE__ */ __name(class {
  value;
  constructor(e = "M") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
}, "bf");
a([u({ type: p.PrintableString })], bf.prototype, "value", void 0);
bf = a([v({ type: m.Choice })], bf);
var zc = /* @__PURE__ */ __name(class {
  value;
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
}, "zc");
a([u({ type: p.PrintableString })], zc.prototype, "value", void 0);
zc = a([v({ type: m.Choice })], zc);
var lm = /* @__PURE__ */ __name(class extends zc {
}, "lm");
lm = a([v({ type: m.Choice })], lm);
var fm = /* @__PURE__ */ __name(class extends Ce {
}, "fm");
fm = a([v({ type: m.Choice })], fm);
var xf = /* @__PURE__ */ __name(class {
  value;
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
}, "xf");
a([u({ type: p.ObjectIdentifier })], xf.prototype, "value", void 0);
xf = a([v({ type: m.Choice })], xf);
var pm = /* @__PURE__ */ __name(class extends ge {
}, "pm");
pm = a([v({ type: m.Choice })], pm);
var Ef = /* @__PURE__ */ __name(class {
  value;
  constructor(e = 0) {
    this.value = e;
  }
  toString() {
    return this.value.toString();
  }
}, "Ef");
a([u({ type: p.Integer })], Ef.prototype, "value", void 0);
Ef = a([v({ type: m.Choice })], Ef);
var dm = /* @__PURE__ */ __name(class extends rt {
}, "dm");
dm = a([v({ type: m.Sequence })], dm);
var Ys = /* @__PURE__ */ __name(class extends Ce {
}, "Ys");
Ys = a([v({ type: m.Choice })], Ys);
var hm = yf = /* @__PURE__ */ __name(class extends Bt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, yf.prototype);
  }
}, "yf");
hm = yf = a([v({ type: m.Sequence })], hm);
var mm = gf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, gf.prototype);
  }
}, "gf");
mm = gf = a([v({ type: m.Set, itemType: Wt })], mm);
var Sf = /* @__PURE__ */ __name(class {
  value;
  constructor(e = "") {
    this.value = e;
  }
  toString() {
    return this.value;
  }
}, "Sf");
a([u({ type: p.BmpString })], Sf.prototype, "value", void 0);
Sf = a([v({ type: m.Choice })], Sf);
var _f = /* @__PURE__ */ __name(class extends _ {
}, "_f");
_f = a([v({ type: m.Sequence })], _f);
var ym = vf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, vf.prototype);
  }
}, "vf");
ym = vf = a([v({ type: m.Sequence, itemType: _f })], ym);
var Tf;
var ra = Tf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Tf.prototype);
  }
}, "Tf");
ra = Tf = a([v({ type: m.Sequence, itemType: Me })], ra);
var yr = /* @__PURE__ */ __name(class {
  version = 0;
  subject = new ue();
  subjectPKInfo = new $e();
  attributes = new ra();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "yr");
a([u({ type: p.Integer })], yr.prototype, "version", void 0);
a([u({ type: ue })], yr.prototype, "subject", void 0);
a([u({ type: $e })], yr.prototype, "subjectPKInfo", void 0);
a([u({ type: ra, implicit: true, context: 0, optional: true })], yr.prototype, "attributes", void 0);
var Po = /* @__PURE__ */ __name(class {
  certificationRequestInfo = new yr();
  certificationRequestInfoRaw;
  signatureAlgorithm = new _();
  signature = new ArrayBuffer(0);
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Po");
a([u({ type: yr, raw: true })], Po.prototype, "certificationRequestInfo", void 0);
a([u({ type: _ })], Po.prototype, "signatureAlgorithm", void 0);
a([u({ type: p.BitString })], Po.prototype, "signature", void 0);
var Ra = "crypto.algorithm";
var jf = /* @__PURE__ */ __name(class {
  getAlgorithms() {
    return le.resolveAll(Ra);
  }
  toAsnAlgorithm(e) {
    ({ ...e });
    for (let r of this.getAlgorithms()) {
      let o = r.toAsnAlgorithm(e);
      if (o)
        return o;
    }
    if (/^[0-9.]+$/.test(e.name)) {
      let r = new _({ algorithm: e.name });
      if ("parameters" in e) {
        let o = e;
        r.parameters = o.parameters;
      }
      return r;
    }
    throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm");
  }
  toWebAlgorithm(e) {
    for (let o of this.getAlgorithms()) {
      let n = o.toWebAlgorithm(e);
      if (n)
        return n;
    }
    return { name: e.algorithm, parameters: e.parameters };
  }
}, "jf");
var kn = "crypto.algorithmProvider";
le.registerSingleton(kn, jf);
var Zc;
var st = "1.3.36.3.3.2.8.1.1";
var wm = `${st}.1`;
var bm = `${st}.2`;
var xm = `${st}.3`;
var Em = `${st}.4`;
var Sm = `${st}.5`;
var _m = `${st}.6`;
var Cm = `${st}.7`;
var Tm = `${st}.8`;
var Bm = `${st}.9`;
var Im = `${st}.10`;
var Om = `${st}.11`;
var Nm = `${st}.12`;
var km = `${st}.13`;
var Pm = `${st}.14`;
var Rm = "brainpoolP160r1";
var Mm = "brainpoolP160t1";
var Dm = "brainpoolP192r1";
var jm = "brainpoolP192t1";
var Um = "brainpoolP224r1";
var Lm = "brainpoolP224t1";
var Hm = "brainpoolP256r1";
var Vm = "brainpoolP256t1";
var Fm = "brainpoolP320r1";
var Gm = "brainpoolP320t1";
var Wm = "brainpoolP384r1";
var $m = "brainpoolP384t1";
var Km = "brainpoolP512r1";
var qm = "brainpoolP512t1";
var ve = "ECDSA";
var Oa = Zc = /* @__PURE__ */ __name(class {
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case ve.toLowerCase():
        if ("hash" in e)
          switch ((typeof e.hash == "string" ? e.hash : e.hash.name).toLowerCase()) {
            case "sha-1":
              return Nh;
            case "sha-256":
              return kh;
            case "sha-384":
              return Ph;
            case "sha-512":
              return Rh;
          }
        else if ("namedCurve" in e) {
          let r = "";
          switch (e.namedCurve) {
            case "P-256":
              r = Gs;
              break;
            case "K-256":
              r = Zc.SECP256K1;
              break;
            case "P-384":
              r = Ws;
              break;
            case "P-521":
              r = zl;
              break;
            case Rm:
              r = wm;
              break;
            case Mm:
              r = bm;
              break;
            case Dm:
              r = xm;
              break;
            case jm:
              r = Em;
              break;
            case Um:
              r = Sm;
              break;
            case Lm:
              r = _m;
              break;
            case Hm:
              r = Cm;
              break;
            case Vm:
              r = Tm;
              break;
            case Fm:
              r = Bm;
              break;
            case Gm:
              r = Im;
              break;
            case Wm:
              r = Om;
              break;
            case $m:
              r = Nm;
              break;
            case Km:
              r = km;
              break;
            case qm:
              r = Pm;
              break;
          }
          if (r)
            return new _({ algorithm: jr, parameters: E.serialize(new kt({ namedCurve: r })) });
        }
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case Ls:
        return { name: ve, hash: { name: "SHA-1" } };
      case Hs:
        return { name: ve, hash: { name: "SHA-256" } };
      case Vs:
        return { name: ve, hash: { name: "SHA-384" } };
      case Fs:
        return { name: ve, hash: { name: "SHA-512" } };
      case jr: {
        if (!e.parameters)
          throw new TypeError("Cannot get required parameters from EC algorithm");
        switch (E.parse(e.parameters, kt).namedCurve) {
          case Gs:
            return { name: ve, namedCurve: "P-256" };
          case Zc.SECP256K1:
            return { name: ve, namedCurve: "K-256" };
          case Ws:
            return { name: ve, namedCurve: "P-384" };
          case zl:
            return { name: ve, namedCurve: "P-521" };
          case wm:
            return { name: ve, namedCurve: Rm };
          case bm:
            return { name: ve, namedCurve: Mm };
          case xm:
            return { name: ve, namedCurve: Dm };
          case Em:
            return { name: ve, namedCurve: jm };
          case Sm:
            return { name: ve, namedCurve: Um };
          case _m:
            return { name: ve, namedCurve: Lm };
          case Cm:
            return { name: ve, namedCurve: Hm };
          case Tm:
            return { name: ve, namedCurve: Vm };
          case Bm:
            return { name: ve, namedCurve: Fm };
          case Im:
            return { name: ve, namedCurve: Gm };
          case Om:
            return { name: ve, namedCurve: Wm };
          case Nm:
            return { name: ve, namedCurve: $m };
          case km:
            return { name: ve, namedCurve: Km };
          case Pm:
            return { name: ve, namedCurve: qm };
        }
      }
    }
    return null;
  }
}, "Zc");
Oa.SECP256K1 = "1.3.132.0.10";
Oa = Zc = a([Io()], Oa);
le.registerSingleton(Ra, Oa);
var ny = Symbol("name");
var iy = Symbol("value");
var oe = /* @__PURE__ */ __name(class {
  constructor(e, r = {}, o = "") {
    this[ny] = e, this[iy] = o;
    for (let n in r)
      this[n] = r[n];
  }
}, "oe");
oe.NAME = ny;
oe.VALUE = iy;
var Uf = /* @__PURE__ */ __name(class {
  static toTextObject(e) {
    let r = new oe("Algorithm Identifier", {}, $t.toString(e.algorithm));
    if (e.parameters)
      if (e.algorithm === jr) {
        let o = new Oa().toWebAlgorithm(e);
        o && "namedCurve" in o ? r["Named Curve"] = o.namedCurve : r.Parameters = e.parameters;
      } else
        r.Parameters = e.parameters;
    return r;
  }
}, "Uf");
var $t = /* @__PURE__ */ __name(class {
  static toString(e) {
    let r = this.items[e];
    return r || e;
  }
}, "$t");
$t.items = { [xn]: "sha1", [jc]: "sha224", [En]: "sha256", [Sn]: "sha384", [_n]: "sha512", [Pt]: "rsaEncryption", [Ai]: "sha1WithRSAEncryption", [Lh]: "sha224WithRSAEncryption", [Dc]: "sha256WithRSAEncryption", [wi]: "sha384WithRSAEncryption", [bi]: "sha512WithRSAEncryption", [jr]: "ecPublicKey", [Ls]: "ecdsaWithSHA1", [Mc]: "ecdsaWithSHA224", [Hs]: "ecdsaWithSHA256", [Vs]: "ecdsaWithSHA384", [Fs]: "ecdsaWithSHA512", [uh]: "TLS WWW server authentication", [lh]: "TLS WWW client authentication", [fh]: "Code Signing", [ph]: "E-mail Protection", [dh]: "Time Stamping", [hh]: "OCSP Signing", [Pc]: "Signed Data" };
var vr = /* @__PURE__ */ __name(class {
  static serialize(e) {
    return this.serializeObj(e).join(`
`);
  }
  static pad(e = 0) {
    return "".padStart(2 * e, " ");
  }
  static serializeObj(e, r = 0) {
    let o = [], n = this.pad(r++), i = "", s = e[oe.VALUE];
    s && (i = ` ${s}`), o.push(`${n}${e[oe.NAME]}:${i}`), n = this.pad(r);
    for (let c in e) {
      if (typeof c == "symbol")
        continue;
      let l = e[c], f = c ? `${c}: ` : "";
      if (typeof l == "string" || typeof l == "number" || typeof l == "boolean")
        o.push(`${n}${f}${l}`);
      else if (l instanceof Date)
        o.push(`${n}${f}${l.toUTCString()}`);
      else if (Array.isArray(l))
        for (let d of l)
          d[oe.NAME] = c, o.push(...this.serializeObj(d, r));
      else if (l instanceof oe)
        l[oe.NAME] = c, o.push(...this.serializeObj(l, r));
      else if (x.BufferSourceConverter.isBufferSource(l))
        c ? (o.push(`${n}${f}`), o.push(...this.serializeBufferSource(l, r + 1))) : o.push(...this.serializeBufferSource(l, r));
      else if ("toTextObject" in l) {
        let d = l.toTextObject();
        d[oe.NAME] = c, o.push(...this.serializeObj(d, r));
      } else
        throw new TypeError("Cannot serialize data in text format. Unsupported type.");
    }
    return o;
  }
  static serializeBufferSource(e, r = 0) {
    let o = this.pad(r), n = x.BufferSourceConverter.toUint8Array(e), i = [];
    for (let s = 0; s < n.length; ) {
      let c = [];
      for (let l = 0; l < 16 && s < n.length; l++) {
        l === 8 && c.push("");
        let f = n[s++].toString(16).padStart(2, "0");
        c.push(f);
      }
      i.push(`${o}${c.join(" ")}`);
    }
    return i;
  }
  static serializeAlgorithm(e) {
    return this.algorithmSerializer.toTextObject(e);
  }
}, "vr");
vr.oidSerializer = $t;
vr.algorithmSerializer = Uf;
var Bi;
var Vr = /* @__PURE__ */ __name(class t4 {
  get rawData() {
    return N(this, Bi, "f") || ee(this, Bi, E.serialize(this.asn), "f"), N(this, Bi, "f");
  }
  constructor(...e) {
    Bi.set(this, void 0), x.BufferSourceConverter.isBufferSource(e[0]) ? (this.asn = E.parse(e[0], e[1]), ee(this, Bi, x.BufferSourceConverter.toArrayBuffer(e[0]), "f"), this.onInit(this.asn)) : (this.asn = e[0], this.onInit(this.asn));
  }
  equal(e) {
    return e instanceof t4 ? (0, x.isEqual)(e.rawData, this.rawData) : false;
  }
  toString(e = "text") {
    switch (e) {
      case "asn":
        return E.toString(this.rawData);
      case "text":
        return vr.serialize(this.toTextObject());
      case "hex":
        return x.Convert.ToHex(this.rawData);
      case "base64":
        return x.Convert.ToBase64(this.rawData);
      case "base64url":
        return x.Convert.ToBase64Url(this.rawData);
      default:
        throw TypeError("Argument 'format' is unsupported value");
    }
  }
  getTextName() {
    return this.constructor.NAME;
  }
  toTextObject() {
    let e = this.toTextObjectEmpty();
    return e[""] = this.rawData, e;
  }
  toTextObjectEmpty(e) {
    return new oe(this.getTextName(), {}, e);
  }
}, "t");
Bi = /* @__PURE__ */ new WeakMap();
Vr.NAME = "ASN";
var ft = /* @__PURE__ */ __name(class t5 extends Vr {
  constructor(...e) {
    let r;
    x.BufferSourceConverter.isBufferSource(e[0]) ? r = x.BufferSourceConverter.toArrayBuffer(e[0]) : r = E.serialize(new Je({ extnID: e[0], critical: e[1], extnValue: new S(x.BufferSourceConverter.toArrayBuffer(e[2])) })), super(r, Je);
  }
  onInit(e) {
    this.type = e.extnID, this.critical = e.critical, this.value = e.extnValue.buffer;
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e[""] = this.value, e;
  }
  toTextObjectWithoutValue() {
    let e = this.toTextObjectEmpty(this.critical ? "critical" : void 0);
    return e[oe.NAME] === t5.NAME && (e[oe.NAME] = $t.toString(this.type)), e;
  }
}, "t");
var sy;
var Na = /* @__PURE__ */ __name(class t6 {
  static isCryptoKeyPair(e) {
    return e && e.privateKey && e.publicKey;
  }
  static isCryptoKey(e) {
    return e && e.usages && e.type && e.algorithm && e.extractable !== void 0;
  }
  constructor() {
    this.items = /* @__PURE__ */ new Map(), this[sy] = "CryptoProvider", typeof self < "u" && typeof crypto < "u" ? this.set(t6.DEFAULT, crypto) : typeof global < "u" && global.crypto && global.crypto.subtle && this.set(t6.DEFAULT, global.crypto);
  }
  clear() {
    this.items.clear();
  }
  delete(e) {
    return this.items.delete(e);
  }
  forEach(e, r) {
    return this.items.forEach(e, r);
  }
  has(e) {
    return this.items.has(e);
  }
  get size() {
    return this.items.size;
  }
  entries() {
    return this.items.entries();
  }
  keys() {
    return this.items.keys();
  }
  values() {
    return this.items.values();
  }
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  get(e = t6.DEFAULT) {
    let r = this.items.get(e.toLowerCase());
    if (!r)
      throw new Error(`Cannot get Crypto by name '${e}'`);
    return r;
  }
  set(e, r) {
    if (typeof e == "string") {
      if (!r)
        throw new TypeError("Argument 'value' is required");
      this.items.set(e.toLowerCase(), r);
    } else
      this.items.set(t6.DEFAULT, e);
    return this;
  }
}, "t");
sy = Symbol.toStringTag;
Na.DEFAULT = "default";
var Te = new Na();
var Dw = /^[0-2](?:\.[1-9][0-9]*)+$/;
function jw(t15) {
  return new RegExp(Dw).test(t15);
}
__name(jw, "jw");
var tu = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    this.items = {};
    for (let r in e)
      this.register(r, e[r]);
  }
  get(e) {
    return this.items[e] || null;
  }
  findId(e) {
    return jw(e) ? e : this.get(e);
  }
  register(e, r) {
    this.items[e] = r, this.items[r] = e;
  }
}, "tu");
var it = new tu();
it.register("CN", "2.5.4.3");
it.register("L", "2.5.4.7");
it.register("ST", "2.5.4.8");
it.register("O", "2.5.4.10");
it.register("OU", "2.5.4.11");
it.register("C", "2.5.4.6");
it.register("DC", "0.9.2342.19200300.100.1.25");
it.register("E", "1.2.840.113549.1.9.1");
it.register("G", "2.5.4.42");
it.register("I", "2.5.4.43");
it.register("SN", "2.5.4.4");
it.register("T", "2.5.4.12");
function Uw(t15, e) {
  return `\\${x.Convert.ToHex(x.Convert.FromUtf8String(e)).toUpperCase()}`;
}
__name(Uw, "Uw");
function Lw(t15) {
  return t15.replace(/([,+"\\<>;])/g, "\\$1").replace(/^([ #])/, "\\$1").replace(/([ ]$)/, "\\$1").replace(/([\r\n\t])/, Uw);
}
__name(Lw, "Lw");
var Ro = /* @__PURE__ */ __name(class t7 {
  static isASCII(e) {
    for (let r = 0; r < e.length; r++)
      if (e.charCodeAt(r) > 255)
        return false;
    return true;
  }
  static isPrintableString(e) {
    return /^[A-Za-z0-9 '()+,-./:=?]*$/g.test(e);
  }
  constructor(e, r = {}) {
    this.extraNames = new tu(), this.asn = new ue();
    for (let o in r)
      if (Object.prototype.hasOwnProperty.call(r, o)) {
        let n = r[o];
        this.extraNames.register(o, n);
      }
    typeof e == "string" ? this.asn = this.fromString(e) : e instanceof ue ? this.asn = e : x.BufferSourceConverter.isBufferSource(e) ? this.asn = E.parse(e, ue) : this.asn = this.fromJSON(e);
  }
  getField(e) {
    let r = this.extraNames.findId(e) || it.findId(e), o = [];
    for (let n of this.asn)
      for (let i of n)
        i.type === r && o.push(i.value.toString());
    return o;
  }
  getName(e) {
    return this.extraNames.get(e) || it.get(e);
  }
  toString() {
    return this.asn.map((e) => e.map((r) => {
      let o = this.getName(r.type) || r.type, n = r.value.anyValue ? `#${x.Convert.ToHex(r.value.anyValue)}` : Lw(r.value.toString());
      return `${o}=${n}`;
    }).join("+")).join(", ");
  }
  toJSON() {
    var e;
    let r = [];
    for (let o of this.asn) {
      let n = {};
      for (let i of o) {
        let s = this.getName(i.type) || i.type;
        (e = n[s]) !== null && e !== void 0 || (n[s] = []), n[s].push(i.value.anyValue ? `#${x.Convert.ToHex(i.value.anyValue)}` : i.value.toString());
      }
      r.push(n);
    }
    return r;
  }
  fromString(e) {
    let r = new ue(), o = /(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g, n = null, i = ",";
    for (; n = o.exec(`${e},`); ) {
      let [, s, c] = n, l = c[c.length - 1];
      (l === "," || l === "+") && (c = c.slice(0, c.length - 1), n[3] = l);
      let f = n[3];
      s = this.getTypeOid(s);
      let d = this.createAttribute(s, c);
      i === "+" ? r[r.length - 1].push(d) : r.push(new uo([d])), i = f;
    }
    return r;
  }
  fromJSON(e) {
    let r = new ue();
    for (let o of e) {
      let n = new uo();
      for (let i in o) {
        let s = this.getTypeOid(i), c = o[i];
        for (let l of c) {
          let f = this.createAttribute(s, l);
          n.push(f);
        }
      }
      r.push(n);
    }
    return r;
  }
  getTypeOid(e) {
    if (/[\d.]+/.test(e) || (e = this.getName(e) || ""), !e)
      throw new Error(`Cannot get OID for name type '${e}'`);
    return e;
  }
  createAttribute(e, r) {
    let o = new nn({ type: e });
    if (typeof r == "object")
      for (let n in r)
        switch (n) {
          case "ia5String":
            o.value.ia5String = r[n];
            break;
          case "utf8String":
            o.value.utf8String = r[n];
            break;
          case "universalString":
            o.value.universalString = r[n];
            break;
          case "bmpString":
            o.value.bmpString = r[n];
            break;
          case "printableString":
            o.value.printableString = r[n];
            break;
        }
    else if (r[0] === "#")
      o.value.anyValue = x.Convert.FromHex(r.slice(1));
    else {
      let n = this.processStringValue(r);
      e === this.getName("E") || e === this.getName("DC") ? o.value.ia5String = n : t7.isPrintableString(n) ? o.value.printableString = n : o.value.utf8String = n;
    }
    return o;
  }
  processStringValue(e) {
    let r = /"(.*?[^\\])?"/.exec(e);
    return r && (e = r[1]), e.replace(/\\0a/ig, `
`).replace(/\\0d/ig, "\r").replace(/\\0g/ig, "	").replace(/\\(.)/g, "$1");
  }
  toArrayBuffer() {
    return E.serialize(this.asn);
  }
  async getThumbprint(...e) {
    var r;
    let o, n = "SHA-1";
    return e.length >= 1 && !(!((r = e[0]) === null || r === void 0) && r.subtle) ? (n = e[0] || n, o = e[1] || Te.get()) : o = e[0] || Te.get(), await o.subtle.digest(n, this.toArrayBuffer());
  }
}, "t");
var ay = "Cannot initialize GeneralName from ASN.1 data.";
var Xm = `${ay} Unsupported string format in use.`;
var Hw = `${ay} Value doesn't match to GUID regular expression.`;
var zm = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i;
var Jm = "1.3.6.1.4.1.311.25.1";
var Qm = "1.3.6.1.4.1.311.20.2.3";
var Bf = "dns";
var If = "dn";
var Of = "email";
var Nf = "ip";
var kf = "url";
var Pf = "guid";
var Rf = "upn";
var Jc = "id";
var gr = /* @__PURE__ */ __name(class extends Vr {
  constructor(...e) {
    let r;
    if (e.length === 2)
      switch (e[0]) {
        case If: {
          let o = new Ro(e[1]).toArrayBuffer(), n = E.parse(o, ue);
          r = new K({ directoryName: n });
          break;
        }
        case Bf:
          r = new K({ dNSName: e[1] });
          break;
        case Of:
          r = new K({ rfc822Name: e[1] });
          break;
        case Pf: {
          let o = new RegExp(zm, "i").exec(e[1]);
          if (!o)
            throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");
          let n = o.slice(1).map((i, s) => s < 3 ? x.Convert.ToHex(new Uint8Array(x.Convert.FromHex(i)).reverse()) : i).join("");
          r = new K({ otherName: new lo({ typeId: Jm, value: E.serialize(new S(x.Convert.FromHex(n))) }) });
          break;
        }
        case Nf:
          r = new K({ iPAddress: e[1] });
          break;
        case Jc:
          r = new K({ registeredID: e[1] });
          break;
        case Rf: {
          r = new K({ otherName: new lo({ typeId: Qm, value: E.serialize(sl.toASN(e[1])) }) });
          break;
        }
        case kf:
          r = new K({ uniformResourceIdentifier: e[1] });
          break;
        default:
          throw new Error("Cannot create GeneralName. Unsupported type of the name");
      }
    else
      x.BufferSourceConverter.isBufferSource(e[0]) ? r = E.parse(e[0], K) : r = e[0];
    super(r);
  }
  onInit(e) {
    if (e.dNSName != null)
      this.type = Bf, this.value = e.dNSName;
    else if (e.rfc822Name != null)
      this.type = Of, this.value = e.rfc822Name;
    else if (e.iPAddress != null)
      this.type = Nf, this.value = e.iPAddress;
    else if (e.uniformResourceIdentifier != null)
      this.type = kf, this.value = e.uniformResourceIdentifier;
    else if (e.registeredID != null)
      this.type = Jc, this.value = e.registeredID;
    else if (e.directoryName != null)
      this.type = If, this.value = new Ro(e.directoryName).toString();
    else if (e.otherName != null)
      if (e.otherName.typeId === Jm) {
        this.type = Pf;
        let r = E.parse(e.otherName.value, S), o = new RegExp(zm, "i").exec(x.Convert.ToHex(r));
        if (!o)
          throw new Error(Hw);
        this.value = o.slice(1).map((n, i) => i < 3 ? x.Convert.ToHex(new Uint8Array(x.Convert.FromHex(n)).reverse()) : n).join("-");
      } else if (e.otherName.typeId === Qm)
        this.type = Rf, this.value = E.parse(e.otherName.value, Ce).toString();
      else
        throw new Error(Xm);
    else
      throw new Error(Xm);
  }
  toJSON() {
    return { type: this.type, value: this.value };
  }
  toTextObject() {
    let e;
    switch (this.type) {
      case If:
      case Bf:
      case Pf:
      case Nf:
      case Jc:
      case Rf:
      case kf:
        e = this.type.toUpperCase();
        break;
      case Of:
        e = "Email";
        break;
      default:
        throw new Error("Unsupported GeneralName type");
    }
    let r = this.value;
    return this.type === Jc && (r = $t.toString(r)), new oe(e, void 0, r);
  }
}, "gr");
var Fr = /* @__PURE__ */ __name(class extends Vr {
  constructor(e) {
    let r;
    if (e instanceof de)
      r = e;
    else if (Array.isArray(e)) {
      let o = [];
      for (let n of e)
        if (n instanceof K)
          o.push(n);
        else {
          let i = E.parse(new gr(n.type, n.value).rawData, K);
          o.push(i);
        }
      r = new de(o);
    } else if (x.BufferSourceConverter.isBufferSource(e))
      r = E.parse(e, de);
    else
      throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");
    super(r);
  }
  onInit(e) {
    let r = [];
    for (let o of e) {
      let n = null;
      try {
        n = new gr(o);
      } catch {
        continue;
      }
      r.push(n);
    }
    this.items = r;
  }
  toJSON() {
    return this.items.map((e) => e.toJSON());
  }
  toTextObject() {
    let e = super.toTextObjectEmpty();
    for (let r of this.items) {
      let o = r.toTextObject(), n = e[o[oe.NAME]];
      Array.isArray(n) || (n = [], e[o[oe.NAME]] = n), n.push(o);
    }
    return e;
  }
}, "Fr");
Fr.NAME = "GeneralNames";
var Ia = "-{5}";
var ka = "\\n";
var Vw = `[^${ka}]+`;
var Fw = `${Ia}BEGIN (${Vw}(?=${Ia}))${Ia}`;
var Gw = `${Ia}END \\1${Ia}`;
var Mi = "\\n";
var Ww = `[^:${ka}]+`;
var $w = `(?:[^${ka}]+${Mi}(?: +[^${ka}]+${Mi})*)`;
var Kw = "[a-zA-Z0-9=+/]+";
var qw = `(?:${Kw}${Mi})+`;
var Ym = `${Fw}${Mi}(?:((?:${Ww}: ${$w})+))?${Mi}?(${qw})${Gw}`;
var je = /* @__PURE__ */ __name(class {
  static isPem(e) {
    return typeof e == "string" && new RegExp(Ym, "g").test(e.replace(/\r/g, ""));
  }
  static decodeWithHeaders(e) {
    e = e.replace(/\r/g, "");
    let r = new RegExp(Ym, "g"), o = [], n = null;
    for (; n = r.exec(e); ) {
      let i = n[3].replace(new RegExp(`[${ka}]+`, "g"), ""), s = { type: n[1], headers: [], rawData: x.Convert.FromBase64(i) }, c = n[2];
      if (c) {
        let l = c.split(new RegExp(Mi, "g")), f = null;
        for (let d of l) {
          let [h, g] = d.split(/:(.*)/);
          if (g === void 0) {
            if (!f)
              throw new Error("Cannot parse PEM string. Incorrect header value");
            f.value += h.trim();
          } else
            f && s.headers.push(f), f = { key: h, value: g.trim() };
        }
        f && s.headers.push(f);
      }
      o.push(s);
    }
    return o;
  }
  static decode(e) {
    return this.decodeWithHeaders(e).map((o) => o.rawData);
  }
  static decodeFirst(e) {
    let r = this.decode(e);
    if (!r.length)
      throw new RangeError("PEM string doesn't contain any objects");
    return r[0];
  }
  static encode(e, r) {
    if (Array.isArray(e)) {
      let o = new Array();
      return r ? e.forEach((n) => {
        if (!x.BufferSourceConverter.isBufferSource(n))
          throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");
        o.push(this.encodeStruct({ type: r, rawData: x.BufferSourceConverter.toArrayBuffer(n) }));
      }) : e.forEach((n) => {
        if (!("type" in n))
          throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");
        o.push(this.encodeStruct(n));
      }), o.join(`
`);
    } else {
      if (!r)
        throw new Error("Required argument 'tag' is missed");
      return this.encodeStruct({ type: r, rawData: x.BufferSourceConverter.toArrayBuffer(e) });
    }
  }
  static encodeStruct(e) {
    var r;
    let o = e.type.toLocaleUpperCase(), n = [];
    if (n.push(`-----BEGIN ${o}-----`), !((r = e.headers) === null || r === void 0) && r.length) {
      for (let f of e.headers)
        n.push(`${f.key}: ${f.value}`);
      n.push("");
    }
    let i = x.Convert.ToBase64(e.rawData), s, c = 0, l = Array();
    for (; c < i.length && (i.length - c < 64 ? s = i.substring(c) : (s = i.substring(c, c + 64), c += 64), s.length !== 0); )
      if (l.push(s), s.length < 64)
        break;
    return n.push(...l), n.push(`-----END ${o}-----`), n.join(`
`);
  }
}, "je");
je.CertificateTag = "CERTIFICATE";
je.CrlTag = "CRL";
je.CertificateRequestTag = "CERTIFICATE REQUEST";
je.PublicKeyTag = "PUBLIC KEY";
je.PrivateKeyTag = "PRIVATE KEY";
var Mt = /* @__PURE__ */ __name(class t8 extends Vr {
  static isAsnEncoded(e) {
    return x.BufferSourceConverter.isBufferSource(e) || typeof e == "string";
  }
  static toArrayBuffer(e) {
    if (typeof e == "string") {
      if (je.isPem(e))
        return je.decode(e)[0];
      if (x.Convert.isHex(e))
        return x.Convert.FromHex(e);
      if (x.Convert.isBase64(e))
        return x.Convert.FromBase64(e);
      if (x.Convert.isBase64Url(e))
        return x.Convert.FromBase64Url(e);
      throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
    } else {
      let r = x.BufferSourceConverter.toUint8Array(e);
      if (r.length > 0 && r[0] === 48)
        return x.BufferSourceConverter.toArrayBuffer(e);
      let o = x.Convert.ToBinary(e);
      if (je.isPem(o))
        return je.decode(o)[0];
      if (x.Convert.isHex(o))
        return x.Convert.FromHex(o);
      if (x.Convert.isBase64(o))
        return x.Convert.FromBase64(o);
      if (x.Convert.isBase64Url(o))
        return x.Convert.FromBase64Url(o);
      throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
    }
  }
  constructor(...e) {
    t8.isAsnEncoded(e[0]) ? super(t8.toArrayBuffer(e[0]), e[1]) : super(e[0]);
  }
  toString(e = "pem") {
    return e === "pem" ? je.encode(this.rawData, this.tag) : super.toString(e);
  }
}, "t");
var Hr = /* @__PURE__ */ __name(class t9 extends Mt {
  static async create(e, r = Te.get()) {
    if (e instanceof t9)
      return e;
    if (Na.isCryptoKey(e)) {
      if (e.type !== "public")
        throw new TypeError("Public key is required");
      let o = await r.subtle.exportKey("spki", e);
      return new t9(o);
    } else {
      if (e.publicKey)
        return e.publicKey;
      if (x.BufferSourceConverter.isBufferSource(e))
        return new t9(e);
      throw new TypeError("Unsupported PublicKeyType");
    }
  }
  constructor(e) {
    Mt.isAsnEncoded(e) ? super(e, $e) : super(e), this.tag = je.PublicKeyTag;
  }
  async export(...e) {
    let r, o = ["verify"], n = { hash: "SHA-256", ...this.algorithm };
    e.length > 1 ? (n = e[0] || n, o = e[1] || o, r = e[2] || Te.get()) : r = e[0] || Te.get();
    let i = this.rawData, s = E.parse(this.rawData, $e);
    return s.algorithm.algorithm === _o && (i = Xw(s, i)), r.subtle.importKey("spki", i, n, true, o);
  }
  onInit(e) {
    let r = le.resolve(kn), o = this.algorithm = r.toWebAlgorithm(e.algorithm);
    if (e.algorithm.algorithm === Pt) {
      let n = E.parse(e.subjectPublicKey, To), i = x.BufferSourceConverter.toUint8Array(n.modulus);
      o.publicExponent = x.BufferSourceConverter.toUint8Array(n.publicExponent), o.modulusLength = (i[0] ? i : i.slice(1)).byteLength << 3;
    }
  }
  async getThumbprint(...e) {
    var r;
    let o, n = "SHA-1";
    return e.length >= 1 && !(!((r = e[0]) === null || r === void 0) && r.subtle) ? (n = e[0] || n, o = e[1] || Te.get()) : o = e[0] || Te.get(), await o.subtle.digest(n, this.rawData);
  }
  async getKeyIdentifier(...e) {
    let r, o = "SHA-1";
    e.length === 1 ? typeof e[0] == "string" ? (o = e[0], r = Te.get()) : r = e[0] : e.length === 2 ? (o = e[0], r = e[1]) : r = Te.get();
    let n = E.parse(this.rawData, $e);
    return await r.subtle.digest(o, n.subjectPublicKey);
  }
  toTextObject() {
    let e = this.toTextObjectEmpty(), r = E.parse(this.rawData, $e);
    switch (e.Algorithm = vr.serializeAlgorithm(r.algorithm), r.algorithm.algorithm) {
      case jr:
        e["EC Point"] = r.subjectPublicKey;
        break;
      case Pt:
      default:
        e["Raw Data"] = r.subjectPublicKey;
    }
    return e;
  }
}, "t");
function Xw(t15, e) {
  return t15.algorithm = new _({ algorithm: Pt, parameters: null }), e = E.serialize(t15), e;
}
__name(Xw, "Xw");
var Di = /* @__PURE__ */ __name(class t10 extends ft {
  static async create(e, r = false, o = Te.get()) {
    if ("name" in e && "serialNumber" in e)
      return new t10(e, r);
    let i = await (await Hr.create(e, o)).getKeyIdentifier(o);
    return new t10(x.Convert.ToHex(i), r);
  }
  constructor(...e) {
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      super(e[0]);
    else if (typeof e[0] == "string") {
      let r = new lr({ keyIdentifier: new cn(x.Convert.FromHex(e[0])) });
      super(hs, e[1], E.serialize(r));
    } else {
      let r = e[0], o = r.name instanceof Fr ? E.parse(r.name.rawData, de) : r.name, n = new lr({ authorityCertIssuer: o, authorityCertSerialNumber: x.Convert.FromHex(r.serialNumber) });
      super(hs, e[1], E.serialize(n));
    }
  }
  onInit(e) {
    super.onInit(e);
    let r = E.parse(e.extnValue, lr);
    r.keyIdentifier && (this.keyId = x.Convert.ToHex(r.keyIdentifier)), (r.authorityCertIssuer || r.authorityCertSerialNumber) && (this.certId = { name: r.authorityCertIssuer || [], serialNumber: r.authorityCertSerialNumber ? x.Convert.ToHex(r.authorityCertSerialNumber) : "" });
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = E.parse(this.value, lr);
    return r.authorityCertIssuer && (e["Authority Issuer"] = new Fr(r.authorityCertIssuer).toTextObject()), r.authorityCertSerialNumber && (e["Authority Serial Number"] = r.authorityCertSerialNumber), r.keyIdentifier && (e[""] = r.keyIdentifier), e;
  }
}, "t");
Di.NAME = "Authority Key Identifier";
var ru = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    if (x.BufferSourceConverter.isBufferSource(e[0])) {
      super(e[0]);
      let r = E.parse(this.value, Nr);
      this.ca = r.cA, this.pathLength = r.pathLenConstraint;
    } else {
      let r = new Nr({ cA: e[0], pathLenConstraint: e[1] });
      super(Jn, e[2], E.serialize(r)), this.ca = e[0], this.pathLength = e[1];
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return this.ca && (e.CA = this.ca), this.pathLength !== void 0 && (e["Path Length"] = this.pathLength), e;
  }
}, "ru");
ru.NAME = "Basic Constraints";
var Zm;
(function(t15) {
  t15.serverAuth = "1.3.6.1.5.5.7.3.1", t15.clientAuth = "1.3.6.1.5.5.7.3.2", t15.codeSigning = "1.3.6.1.5.5.7.3.3", t15.emailProtection = "1.3.6.1.5.5.7.3.4", t15.timeStamping = "1.3.6.1.5.5.7.3.8", t15.ocspSigning = "1.3.6.1.5.5.7.3.9";
})(Zm || (Zm = {}));
var ou = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    if (x.BufferSourceConverter.isBufferSource(e[0])) {
      super(e[0]);
      let r = E.parse(this.value, ln);
      this.usages = r.map((o) => o);
    } else {
      let r = new ln(e[0]);
      super(Yn, e[1], E.serialize(r)), this.usages = e[0];
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e[""] = this.usages.map((r) => $t.toString(r)).join(", "), e;
  }
}, "ou");
ou.NAME = "Extended Key Usages";
var ey;
(function(t15) {
  t15[t15.digitalSignature = 1] = "digitalSignature", t15[t15.nonRepudiation = 2] = "nonRepudiation", t15[t15.keyEncipherment = 4] = "keyEncipherment", t15[t15.dataEncipherment = 8] = "dataEncipherment", t15[t15.keyAgreement = 16] = "keyAgreement", t15[t15.keyCertSign = 32] = "keyCertSign", t15[t15.cRLSign = 64] = "cRLSign", t15[t15.encipherOnly = 128] = "encipherOnly", t15[t15.decipherOnly = 256] = "decipherOnly";
})(ey || (ey = {}));
var nu = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    if (x.BufferSourceConverter.isBufferSource(e[0])) {
      super(e[0]);
      let r = E.parse(this.value, ei);
      this.usages = r.toNumber();
    } else {
      let r = new ei(e[0]);
      super(Ac, e[1], E.serialize(r)), this.usages = e[0];
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = E.parse(this.value, ei);
    return e[""] = r.toJSON().join(", "), e;
  }
}, "nu");
nu.NAME = "Key Usages";
var ji = /* @__PURE__ */ __name(class t11 extends ft {
  static async create(e, r = false, o = Te.get()) {
    let i = await (await Hr.create(e, o)).getKeyIdentifier(o);
    return new t11(x.Convert.ToHex(i), r);
  }
  constructor(...e) {
    if (x.BufferSourceConverter.isBufferSource(e[0])) {
      super(e[0]);
      let r = E.parse(this.value, et);
      this.keyId = x.Convert.ToHex(r);
    } else {
      let r = typeof e[0] == "string" ? x.Convert.FromHex(e[0]) : e[0], o = new et(r);
      super(Ec, e[1], E.serialize(o)), this.keyId = x.Convert.ToHex(r);
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = E.parse(this.value, et);
    return e[""] = r, e;
  }
}, "t");
ji.NAME = "Subject Key Identifier";
var iu = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    x.BufferSourceConverter.isBufferSource(e[0]) ? super(e[0]) : super(oi, e[1], new Fr(e[0] || []).rawData);
  }
  onInit(e) {
    super.onInit(e);
    let r = E.parse(e.extnValue, ri);
    this.names = new Fr(r);
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = this.names.toTextObject();
    for (let o in r)
      e[o] = r[o];
    return e;
  }
}, "iu");
iu.NAME = "Subject Alternative Name";
var Ue = /* @__PURE__ */ __name(class {
  static register(e, r) {
    this.items.set(e, r);
  }
  static create(e) {
    let r = new ft(e), o = this.items.get(r.type);
    return o ? new o(e) : r;
  }
}, "Ue");
Ue.items = /* @__PURE__ */ new Map();
var su = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    var r;
    if (x.BufferSourceConverter.isBufferSource(e[0])) {
      super(e[0]);
      let o = E.parse(this.value, vs);
      this.policies = o.map((n) => n.policyIdentifier);
    } else {
      let o = e[0], n = (r = e[1]) !== null && r !== void 0 ? r : false, i = new vs(o.map((s) => new un({ policyIdentifier: s })));
      super(gc, n, E.serialize(i)), this.policies = o;
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e.Policy = this.policies.map((r) => new oe("", {}, $t.toString(r))), e;
  }
}, "su");
su.NAME = "Certificate Policies";
Ue.register(gc, su);
var Ui = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    var r;
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      super(e[0]);
    else if (Array.isArray(e[0]) && typeof e[0][0] == "string") {
      let n = e[0].map((s) => new fr({ distributionPoint: new Pr({ fullName: [new K({ uniformResourceIdentifier: s })] }) })), i = new ho(n);
      super(vc, e[1], E.serialize(i));
    } else {
      let o = new ho(e[0]);
      super(vc, e[1], E.serialize(o));
    }
    (r = this.distributionPoints) !== null && r !== void 0 || (this.distributionPoints = []);
  }
  onInit(e) {
    super.onInit(e);
    let r = E.parse(e.extnValue, ho);
    this.distributionPoints = r;
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e["Distribution Point"] = this.distributionPoints.map((r) => {
      var o;
      let n = {};
      return r.distributionPoint && (n[""] = (o = r.distributionPoint.fullName) === null || o === void 0 ? void 0 : o.map((i) => new gr(i).toString()).join(", ")), r.reasons && (n.Reasons = r.reasons.toString()), r.cRLIssuer && (n["CRL Issuer"] = r.cRLIssuer.map((i) => i.toString()).join(", ")), n;
    }), e;
  }
}, "Ui");
Ui.NAME = "CRL Distribution Points";
var au = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    var r, o, n, i;
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      super(e[0]);
    else if (e[0] instanceof an) {
      let s = new an(e[0]);
      super(mc, e[1], E.serialize(s));
    } else {
      let s = e[0], c = new an();
      Yc(c, s, dl, "ocsp"), Yc(c, s, hl, "caIssuers"), Yc(c, s, ml, "timeStamping"), Yc(c, s, yl, "caRepository"), super(mc, e[1], E.serialize(c));
    }
    (r = this.ocsp) !== null && r !== void 0 || (this.ocsp = []), (o = this.caIssuers) !== null && o !== void 0 || (this.caIssuers = []), (n = this.timeStamping) !== null && n !== void 0 || (this.timeStamping = []), (i = this.caRepository) !== null && i !== void 0 || (this.caRepository = []);
  }
  onInit(e) {
    super.onInit(e), this.ocsp = [], this.caIssuers = [], this.timeStamping = [], this.caRepository = [], E.parse(e.extnValue, an).forEach((o) => {
      switch (o.accessMethod) {
        case dl:
          this.ocsp.push(new gr(o.accessLocation));
          break;
        case hl:
          this.caIssuers.push(new gr(o.accessLocation));
          break;
        case ml:
          this.timeStamping.push(new gr(o.accessLocation));
          break;
        case yl:
          this.caRepository.push(new gr(o.accessLocation));
          break;
      }
    });
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return this.ocsp.length && Qc(e, "OCSP", this.ocsp), this.caIssuers.length && Qc(e, "CA Issuers", this.caIssuers), this.timeStamping.length && Qc(e, "Time Stamping", this.timeStamping), this.caRepository.length && Qc(e, "CA Repository", this.caRepository), e;
  }
}, "au");
au.NAME = "Authority Info Access";
function Qc(t15, e, r) {
  if (r.length === 1)
    t15[e] = r[0].toTextObject();
  else {
    let o = new oe("");
    r.forEach((n, i) => {
      let s = n.toTextObject(), c = `${s[oe.NAME]} ${i + 1}`, l = o[c];
      Array.isArray(l) || (l = [], o[c] = l), l.push(s);
    }), t15[e] = o;
  }
}
__name(Qc, "Qc");
function Yc(t15, e, r, o) {
  let n = e[o];
  n && (Array.isArray(n) ? n : [n]).forEach((s) => {
    typeof s == "string" && (s = new gr("url", s)), t15.push(new Or({ accessMethod: r, accessLocation: E.parse(s.rawData, K) }));
  });
}
__name(Yc, "Yc");
var cu = /* @__PURE__ */ __name(class extends ft {
  constructor(...e) {
    x.BufferSourceConverter.isBufferSource(e[0]) ? super(e[0]) : super(Bl, e[1], new Fr(e[0] || []).rawData);
  }
  onInit(e) {
    super.onInit(e);
    let r = E.parse(e.extnValue, de);
    this.names = new Fr(r);
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = this.names.toTextObject();
    for (let o in r)
      e[o] = r[o];
    return e;
  }
}, "cu");
cu.NAME = "Issuer Alternative Name";
var Li = /* @__PURE__ */ __name(class t12 extends Vr {
  constructor(...e) {
    let r;
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      r = x.BufferSourceConverter.toArrayBuffer(e[0]);
    else {
      let o = e[0], n = Array.isArray(e[1]) ? e[1].map((i) => x.BufferSourceConverter.toArrayBuffer(i)) : [];
      r = E.serialize(new Me({ type: o, values: n }));
    }
    super(r, Me);
  }
  onInit(e) {
    this.type = e.type, this.values = e.values;
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e.Value = this.values.map((r) => new oe("", { "": r })), e;
  }
  toTextObjectWithoutValue() {
    let e = this.toTextObjectEmpty();
    return e[oe.NAME] === t12.NAME && (e[oe.NAME] = $t.toString(this.type)), e;
  }
}, "t");
Li.NAME = "Attribute";
var uu = /* @__PURE__ */ __name(class extends Li {
  constructor(...e) {
    var r;
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      super(e[0]);
    else {
      let o = new Ys({ printableString: e[0] });
      super(Cf, [E.serialize(o)]);
    }
    (r = this.password) !== null && r !== void 0 || (this.password = "");
  }
  onInit(e) {
    if (super.onInit(e), this.values[0]) {
      let r = E.parse(this.values[0], Ys);
      this.password = r.toString();
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue();
    return e[oe.VALUE] = this.password, e;
  }
}, "uu");
uu.NAME = "Challenge Password";
var Pa = /* @__PURE__ */ __name(class extends Li {
  constructor(...e) {
    var r;
    if (x.BufferSourceConverter.isBufferSource(e[0]))
      super(e[0]);
    else {
      let o = e[0], n = new Bt();
      for (let i of o)
        n.push(E.parse(i.rawData, Je));
      super(ea, [E.serialize(n)]);
    }
    (r = this.items) !== null && r !== void 0 || (this.items = []);
  }
  onInit(e) {
    if (super.onInit(e), this.values[0]) {
      let r = E.parse(this.values[0], Bt);
      this.items = r.map((o) => Ue.create(E.serialize(o)));
    }
  }
  toTextObject() {
    let e = this.toTextObjectWithoutValue(), r = this.items.map((o) => o.toTextObject());
    for (let o of r)
      e[o[oe.NAME]] = o;
    return e;
  }
}, "Pa");
Pa.NAME = "Extensions";
var Hi = /* @__PURE__ */ __name(class {
  static register(e, r) {
    this.items.set(e, r);
  }
  static create(e) {
    let r = new Li(e), o = this.items.get(r.type);
    return o ? new o(e) : r;
  }
}, "Hi");
Hi.items = /* @__PURE__ */ new Map();
var Ma = "crypto.signatureFormatter";
var Lf = /* @__PURE__ */ __name(class {
  toAsnSignature(e, r) {
    return x.BufferSourceConverter.toArrayBuffer(r);
  }
  toWebSignature(e, r) {
    return x.BufferSourceConverter.toArrayBuffer(r);
  }
}, "Lf");
var eu;
var Hf = eu = /* @__PURE__ */ __name(class {
  static createPssParams(e, r) {
    let o = eu.getHashAlgorithm(e);
    return o ? new hr({ hashAlgorithm: o, maskGenAlgorithm: new _({ algorithm: Co, parameters: E.serialize(o) }), saltLength: r }) : null;
  }
  static getHashAlgorithm(e) {
    let r = le.resolve(kn);
    return typeof e == "string" ? r.toAsnAlgorithm({ name: e }) : typeof e == "object" && e && "name" in e ? r.toAsnAlgorithm(e) : null;
  }
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case "rsassa-pkcs1-v1_5":
        if ("hash" in e) {
          let r;
          if (typeof e.hash == "string")
            r = e.hash;
          else if (e.hash && typeof e.hash == "object" && "name" in e.hash && typeof e.hash.name == "string")
            r = e.hash.name.toUpperCase();
          else
            throw new Error("Cannot get hash algorithm name");
          switch (r.toLowerCase()) {
            case "sha-1":
              return new _({ algorithm: Ai, parameters: null });
            case "sha-256":
              return new _({ algorithm: Dc, parameters: null });
            case "sha-384":
              return new _({ algorithm: wi, parameters: null });
            case "sha-512":
              return new _({ algorithm: bi, parameters: null });
          }
        } else
          return new _({ algorithm: Pt, parameters: null });
        break;
      case "rsa-pss":
        if ("hash" in e) {
          if (!("saltLength" in e && typeof e.saltLength == "number"))
            throw new Error("Cannot get 'saltLength' from 'alg' argument");
          let r = eu.createPssParams(e.hash, e.saltLength);
          if (!r)
            throw new Error("Cannot create PSS parameters");
          return new _({ algorithm: _o, parameters: E.serialize(r) });
        } else
          return new _({ algorithm: _o, parameters: null });
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case Pt:
        return { name: "RSASSA-PKCS1-v1_5" };
      case Ai:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } };
      case Dc:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
      case wi:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } };
      case bi:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } };
      case _o:
        if (e.parameters) {
          let r = E.parse(e.parameters, hr);
          return { name: "RSA-PSS", hash: le.resolve(kn).toWebAlgorithm(r.hashAlgorithm), saltLength: r.saltLength };
        } else
          return { name: "RSA-PSS" };
    }
    return null;
  }
}, "eu");
Hf = eu = a([Io()], Hf);
le.registerSingleton(Ra, Hf);
var Vf = /* @__PURE__ */ __name(class {
  toAsnAlgorithm(e) {
    switch (e.name.toLowerCase()) {
      case "sha-1":
        return new _({ algorithm: xn });
      case "sha-256":
        return new _({ algorithm: En });
      case "sha-384":
        return new _({ algorithm: Sn });
      case "sha-512":
        return new _({ algorithm: _n });
    }
    return null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case xn:
        return { name: "SHA-1" };
      case En:
        return { name: "SHA-256" };
      case Sn:
        return { name: "SHA-384" };
      case _n:
        return { name: "SHA-512" };
    }
    return null;
  }
}, "Vf");
Vf = a([Io()], Vf);
le.registerSingleton(Ra, Vf);
var Gr = /* @__PURE__ */ __name(class t13 {
  addPadding(e, r) {
    let o = x.BufferSourceConverter.toUint8Array(r), n = new Uint8Array(e);
    return n.set(o, e - o.length), n.buffer;
  }
  removePadding(e, r = false) {
    let o = x.BufferSourceConverter.toUint8Array(e);
    for (let n = 0; n < o.length; n++)
      if (o[n]) {
        o = o.slice(n);
        break;
      }
    if (r && o[0] > 127) {
      let n = new Uint8Array(o.length + 1);
      return n.set(o, 1), n.buffer;
    }
    return o.buffer;
  }
  toAsnSignature(e, r) {
    if (e.name === "ECDSA") {
      let o = e.namedCurve, n = t13.namedCurveSize.get(o) || t13.defaultNamedCurveSize, i = new Ur(), s = x.BufferSourceConverter.toUint8Array(r);
      return i.r = this.removePadding(s.slice(0, n), true), i.s = this.removePadding(s.slice(n, n + n), true), E.serialize(i);
    }
    return null;
  }
  toWebSignature(e, r) {
    if (e.name === "ECDSA") {
      let o = E.parse(r, Ur), n = e.namedCurve, i = t13.namedCurveSize.get(n) || t13.defaultNamedCurveSize, s = this.addPadding(i, this.removePadding(o.r)), c = this.addPadding(i, this.removePadding(o.s));
      return (0, x.combine)(s, c);
    }
    return null;
  }
}, "t");
Gr.namedCurveSize = /* @__PURE__ */ new Map();
Gr.defaultNamedCurveSize = 32;
var Mf = "1.3.101.110";
var ty = "1.3.101.111";
var Df = "1.3.101.112";
var ry = "1.3.101.113";
var Ff = /* @__PURE__ */ __name(class {
  toAsnAlgorithm(e) {
    let r = null;
    switch (e.name.toLowerCase()) {
      case "ed25519":
        r = Df;
        break;
      case "x25519":
        r = Mf;
        break;
      case "eddsa":
        switch (e.namedCurve.toLowerCase()) {
          case "ed25519":
            r = Df;
            break;
          case "ed448":
            r = ry;
            break;
        }
        break;
      case "ecdh-es":
        switch (e.namedCurve.toLowerCase()) {
          case "x25519":
            r = Mf;
            break;
          case "x448":
            r = ty;
            break;
        }
    }
    return r ? new _({ algorithm: r }) : null;
  }
  toWebAlgorithm(e) {
    switch (e.algorithm) {
      case Df:
        return { name: "Ed25519" };
      case ry:
        return { name: "EdDSA", namedCurve: "Ed448" };
      case Mf:
        return { name: "X25519" };
      case ty:
        return { name: "ECDH-ES", namedCurve: "X448" };
    }
    return null;
  }
}, "Ff");
Ff = a([Io()], Ff);
le.registerSingleton(Ra, Ff);
var oa;
var na;
var ia;
var sa;
var aa;
var ca;
var ua;
var Ii;
var Gf = /* @__PURE__ */ __name(class extends Mt {
  get subjectName() {
    return N(this, na, "f") || ee(this, na, new Ro(this.asn.certificationRequestInfo.subject), "f"), N(this, na, "f");
  }
  get subject() {
    return N(this, ia, "f") || ee(this, ia, this.subjectName.toString(), "f"), N(this, ia, "f");
  }
  get signatureAlgorithm() {
    if (!N(this, sa, "f")) {
      let e = le.resolve(kn);
      ee(this, sa, e.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
    }
    return N(this, sa, "f");
  }
  get signature() {
    return N(this, aa, "f") || ee(this, aa, this.asn.signature, "f"), N(this, aa, "f");
  }
  get publicKey() {
    return N(this, ca, "f") || ee(this, ca, new Hr(this.asn.certificationRequestInfo.subjectPKInfo), "f"), N(this, ca, "f");
  }
  get attributes() {
    return N(this, ua, "f") || ee(this, ua, this.asn.certificationRequestInfo.attributes.map((e) => Hi.create(E.serialize(e))), "f"), N(this, ua, "f");
  }
  get extensions() {
    if (!N(this, Ii, "f")) {
      ee(this, Ii, [], "f");
      let e = this.getAttribute(ea);
      e instanceof Pa && ee(this, Ii, e.items, "f");
    }
    return N(this, Ii, "f");
  }
  get tbs() {
    return N(this, oa, "f") || ee(this, oa, this.asn.certificationRequestInfoRaw || E.serialize(this.asn.certificationRequestInfo), "f"), N(this, oa, "f");
  }
  constructor(e) {
    let r = Mt.isAsnEncoded(e) ? [e, Po] : [e];
    super(r[0], r[1]), oa.set(this, void 0), na.set(this, void 0), ia.set(this, void 0), sa.set(this, void 0), aa.set(this, void 0), ca.set(this, void 0), ua.set(this, void 0), Ii.set(this, void 0), this.tag = je.CertificateRequestTag;
  }
  onInit(e) {
  }
  getAttribute(e) {
    for (let r of this.attributes)
      if (r.type === e)
        return r;
    return null;
  }
  getAttributes(e) {
    return this.attributes.filter((r) => r.type === e);
  }
  getExtension(e) {
    for (let r of this.extensions)
      if (r.type === e)
        return r;
    return null;
  }
  getExtensions(e) {
    return this.extensions.filter((r) => r.type === e);
  }
  async verify(e = Te.get()) {
    let r = { ...this.publicKey.algorithm, ...this.signatureAlgorithm }, o = await this.publicKey.export(r, ["verify"], e), n = le.resolveAll(Ma).reverse(), i = null;
    for (let c of n)
      if (i = c.toWebSignature(r, this.signature), i)
        break;
    if (!i)
      throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
    return await e.subtle.verify(this.signatureAlgorithm, o, i, this.tbs);
  }
  toTextObject() {
    let e = this.toTextObjectEmpty(), r = E.parse(this.rawData, Po), o = r.certificationRequestInfo, n = new oe("", { Version: `${Rr[o.version]} (${o.version})`, Subject: this.subject, "Subject Public Key Info": this.publicKey });
    if (this.attributes.length) {
      let i = new oe("");
      for (let s of this.attributes) {
        let c = s.toTextObject();
        i[c[oe.NAME]] = c;
      }
      n.Attributes = i;
    }
    return e.Data = n, e.Signature = new oe("", { Algorithm: vr.serializeAlgorithm(r.signatureAlgorithm), "": r.signature }), e;
  }
}, "Gf");
oa = /* @__PURE__ */ new WeakMap(), na = /* @__PURE__ */ new WeakMap(), ia = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), ua = /* @__PURE__ */ new WeakMap(), Ii = /* @__PURE__ */ new WeakMap();
Gf.NAME = "PKCS#10 Certificate Request";
var la;
var fa;
var pa;
var da;
var ha;
var ma;
var ya;
var ga;
var va;
var Aa;
var Oi;
var wa;
var Wr = /* @__PURE__ */ __name(class extends Mt {
  get publicKey() {
    return N(this, wa, "f") || ee(this, wa, new Hr(this.asn.tbsCertificate.subjectPublicKeyInfo), "f"), N(this, wa, "f");
  }
  get serialNumber() {
    if (!N(this, fa, "f")) {
      let e = this.asn.tbsCertificate, r = new Uint8Array(e.serialNumber);
      r.length > 1 && r[0] === 0 && r[1] > 127 && (r = r.slice(1)), ee(this, fa, x.Convert.ToHex(r), "f");
    }
    return N(this, fa, "f");
  }
  get subjectName() {
    return N(this, pa, "f") || ee(this, pa, new Ro(this.asn.tbsCertificate.subject), "f"), N(this, pa, "f");
  }
  get subject() {
    return N(this, da, "f") || ee(this, da, this.subjectName.toString(), "f"), N(this, da, "f");
  }
  get issuerName() {
    return N(this, ha, "f") || ee(this, ha, new Ro(this.asn.tbsCertificate.issuer), "f"), N(this, ha, "f");
  }
  get issuer() {
    return N(this, ma, "f") || ee(this, ma, this.issuerName.toString(), "f"), N(this, ma, "f");
  }
  get notBefore() {
    if (!N(this, ya, "f")) {
      let e = this.asn.tbsCertificate.validity.notBefore.utcTime || this.asn.tbsCertificate.validity.notBefore.generalTime;
      if (!e)
        throw new Error("Cannot get 'notBefore' value");
      ee(this, ya, e, "f");
    }
    return N(this, ya, "f");
  }
  get notAfter() {
    if (!N(this, ga, "f")) {
      let e = this.asn.tbsCertificate.validity.notAfter.utcTime || this.asn.tbsCertificate.validity.notAfter.generalTime;
      if (!e)
        throw new Error("Cannot get 'notAfter' value");
      ee(this, ga, e, "f");
    }
    return N(this, ga, "f");
  }
  get signatureAlgorithm() {
    if (!N(this, va, "f")) {
      let e = le.resolve(kn);
      ee(this, va, e.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
    }
    return N(this, va, "f");
  }
  get signature() {
    return N(this, Aa, "f") || ee(this, Aa, this.asn.signatureValue, "f"), N(this, Aa, "f");
  }
  get extensions() {
    return N(this, Oi, "f") || (ee(this, Oi, [], "f"), this.asn.tbsCertificate.extensions && ee(this, Oi, this.asn.tbsCertificate.extensions.map((e) => Ue.create(E.serialize(e))), "f")), N(this, Oi, "f");
  }
  get tbs() {
    return N(this, la, "f") || ee(this, la, this.asn.tbsCertificateRaw || E.serialize(this.asn.tbsCertificate), "f"), N(this, la, "f");
  }
  constructor(e) {
    let r = Mt.isAsnEncoded(e) ? [e, Ae] : [e];
    super(r[0], r[1]), la.set(this, void 0), fa.set(this, void 0), pa.set(this, void 0), da.set(this, void 0), ha.set(this, void 0), ma.set(this, void 0), ya.set(this, void 0), ga.set(this, void 0), va.set(this, void 0), Aa.set(this, void 0), Oi.set(this, void 0), wa.set(this, void 0), this.tag = je.CertificateTag;
  }
  onInit(e) {
  }
  getExtension(e) {
    for (let r of this.extensions)
      if (typeof e == "string") {
        if (r.type === e)
          return r;
      } else if (r instanceof e)
        return r;
    return null;
  }
  getExtensions(e) {
    return this.extensions.filter((r) => typeof e == "string" ? r.type === e : r instanceof e);
  }
  async verify(e = {}, r = Te.get()) {
    let o, n, i = e.publicKey;
    try {
      if (!i)
        o = { ...this.publicKey.algorithm, ...this.signatureAlgorithm }, n = await this.publicKey.export(o, ["verify"], r);
      else if ("publicKey" in i)
        o = { ...i.publicKey.algorithm, ...this.signatureAlgorithm }, n = await i.publicKey.export(o, ["verify"], r);
      else if (i instanceof Hr)
        o = { ...i.algorithm, ...this.signatureAlgorithm }, n = await i.export(o, ["verify"], r);
      else if (x.BufferSourceConverter.isBufferSource(i)) {
        let f = new Hr(i);
        o = { ...f.algorithm, ...this.signatureAlgorithm }, n = await f.export(o, ["verify"], r);
      } else
        o = { ...i.algorithm, ...this.signatureAlgorithm }, n = i;
    } catch {
      return false;
    }
    let s = le.resolveAll(Ma).reverse(), c = null;
    for (let f of s)
      if (c = f.toWebSignature(o, this.signature), c)
        break;
    if (!c)
      throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
    let l = await r.subtle.verify(this.signatureAlgorithm, n, c, this.tbs);
    if (e.signatureOnly)
      return l;
    {
      let d = (e.date || /* @__PURE__ */ new Date()).getTime();
      return l && this.notBefore.getTime() < d && d < this.notAfter.getTime();
    }
  }
  async getThumbprint(...e) {
    let r, o = "SHA-1";
    return e[0] && (e[0].subtle ? r = e[0] : (o = e[0] || o, r = e[1])), r ?? (r = Te.get()), await r.subtle.digest(o, this.rawData);
  }
  async isSelfSigned(e = Te.get()) {
    return this.subject === this.issuer && await this.verify({ signatureOnly: true }, e);
  }
  toTextObject() {
    let e = this.toTextObjectEmpty(), r = E.parse(this.rawData, Ae), o = r.tbsCertificate, n = new oe("", { Version: `${Rr[o.version]} (${o.version})`, "Serial Number": o.serialNumber, "Signature Algorithm": vr.serializeAlgorithm(o.signature), Issuer: this.issuer, Validity: new oe("", { "Not Before": o.validity.notBefore.getTime(), "Not After": o.validity.notAfter.getTime() }), Subject: this.subject, "Subject Public Key Info": this.publicKey });
    if (o.issuerUniqueID && (n["Issuer Unique ID"] = o.issuerUniqueID), o.subjectUniqueID && (n["Subject Unique ID"] = o.subjectUniqueID), this.extensions.length) {
      let i = new oe("");
      for (let s of this.extensions) {
        let c = s.toTextObject();
        i[c[oe.NAME]] = c;
      }
      n.Extensions = i;
    }
    return e.Data = n, e.Signature = new oe("", { Algorithm: vr.serializeAlgorithm(r.signatureAlgorithm), "": r.signatureValue }), e;
  }
}, "Wr");
la = /* @__PURE__ */ new WeakMap(), fa = /* @__PURE__ */ new WeakMap(), pa = /* @__PURE__ */ new WeakMap(), da = /* @__PURE__ */ new WeakMap(), ha = /* @__PURE__ */ new WeakMap(), ma = /* @__PURE__ */ new WeakMap(), ya = /* @__PURE__ */ new WeakMap(), ga = /* @__PURE__ */ new WeakMap(), va = /* @__PURE__ */ new WeakMap(), Aa = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), wa = /* @__PURE__ */ new WeakMap();
Wr.NAME = "Certificate";
var Wf = /* @__PURE__ */ __name(class extends Array {
  constructor(e) {
    if (super(), Mt.isAsnEncoded(e))
      this.import(e);
    else if (e instanceof Wr)
      this.push(e);
    else if (Array.isArray(e))
      for (let r of e)
        this.push(r);
  }
  export(e) {
    let r = new Nt();
    r.version = 1, r.encapContentInfo.eContentType = Ih, r.encapContentInfo.eContent = new gn({ single: new S() }), r.certificates = new Ao(this.map((i) => new vo({ certificate: E.parse(i.rawData, Ae) })));
    let o = new Qe({ contentType: Pc, content: E.serialize(r) }), n = E.serialize(o);
    return e === "raw" ? n : this.toString(e);
  }
  import(e) {
    let r = Mt.toArrayBuffer(e), o = E.parse(r, Qe);
    if (o.contentType !== Pc)
      throw new TypeError("Cannot parse CMS package. Incoming data is not a SignedData object.");
    let n = E.parse(o.content, Nt);
    this.clear();
    for (let i of n.certificates || [])
      i.certificate && this.push(new Wr(i.certificate));
  }
  clear() {
    for (; this.pop(); )
      ;
  }
  toString(e = "pem") {
    let r = this.export("raw");
    switch (e) {
      case "pem":
        return je.encode(r, "CMS");
      case "pem-chain":
        return this.map((o) => o.toString("pem")).join(`
`);
      case "asn":
        return E.toString(r);
      case "hex":
        return x.Convert.ToHex(r);
      case "base64":
        return x.Convert.ToBase64(r);
      case "base64url":
        return x.Convert.ToBase64Url(r);
      case "text":
        return vr.serialize(this.toTextObject());
      default:
        throw TypeError("Argument 'format' is unsupported value");
    }
  }
  toTextObject() {
    let e = E.parse(this.export("raw"), Qe), r = E.parse(e.content, Nt);
    return new oe("X509Certificates", { "Content Type": $t.toString(e.contentType), Content: new oe("", { Version: `${Re[r.version]} (${r.version})`, Certificates: new oe("", { Certificate: this.map((n) => n.toTextObject()) }) }) });
  }
}, "Wf");
var lu = /* @__PURE__ */ __name(class {
  constructor(e = {}) {
    this.certificates = [], e.certificates && (this.certificates = e.certificates);
  }
  async build(e, r = Te.get()) {
    let o = new Wf(e), n = e;
    for (; n = await this.findIssuer(n, r); ) {
      let i = await n.getThumbprint(r);
      for (let s of o) {
        let c = await s.getThumbprint(r);
        if ((0, x.isEqual)(i, c))
          throw new Error("Cannot build a certificate chain. Circular dependency.");
      }
      o.push(n);
    }
    return o;
  }
  async findIssuer(e, r = Te.get()) {
    if (!await e.isSelfSigned(r)) {
      let o = e.getExtension(hs);
      for (let n of this.certificates)
        if (n.subject === e.issuer) {
          if (o) {
            if (o.keyId) {
              let i = n.getExtension(Ec);
              if (i && i.keyId !== o.keyId)
                continue;
            } else if (o.certId) {
              let i = n.getExtension(oi);
              if (i && !(o.certId.serialNumber === n.serialNumber && (0, x.isEqual)(E.serialize(o.certId.name), E.serialize(i))))
                continue;
            }
          }
          try {
            let i = { ...n.publicKey.algorithm, ...e.signatureAlgorithm }, s = await n.publicKey.export(i, ["verify"], r);
            if (!await e.verify({ publicKey: s, signatureOnly: true }, r))
              continue;
          } catch {
            continue;
          }
          return n;
        }
    }
    return null;
  }
}, "lu");
function cy(t15, e = Te.get()) {
  let r = x.BufferSourceConverter.toUint8Array(x.Convert.FromHex(t15 || "")), o = r && r.length && r.some((i) => i > 0) ? new Uint8Array(r) : void 0;
  o || (o = e.getRandomValues(new Uint8Array(16)));
  let n = 0;
  for (; n < o.length - 1 && o[n] === 0; )
    n++;
  if (o = o.slice(n), o[0] > 127) {
    let i = new Uint8Array(o.length + 1);
    i[0] = 0, i.set(o, 1), o = i;
  }
  return o.buffer;
}
__name(cy, "cy");
var ba;
var xa;
var Ni;
var ki;
var Pi;
var oy;
(function(t15) {
  t15[t15.unspecified = 0] = "unspecified", t15[t15.keyCompromise = 1] = "keyCompromise", t15[t15.cACompromise = 2] = "cACompromise", t15[t15.affiliationChanged = 3] = "affiliationChanged", t15[t15.superseded = 4] = "superseded", t15[t15.cessationOfOperation = 5] = "cessationOfOperation", t15[t15.certificateHold = 6] = "certificateHold", t15[t15.removeFromCRL = 8] = "removeFromCRL", t15[t15.privilegeWithdrawn = 9] = "privilegeWithdrawn", t15[t15.aACompromise = 10] = "aACompromise";
})(oy || (oy = {}));
var fu = /* @__PURE__ */ __name(class extends Vr {
  get serialNumber() {
    return N(this, ba, "f") || ee(this, ba, x.Convert.ToHex(this.asn.userCertificate), "f"), N(this, ba, "f");
  }
  get revocationDate() {
    return N(this, xa, "f") || ee(this, xa, this.asn.revocationDate.getTime(), "f"), N(this, xa, "f");
  }
  get reason() {
    return N(this, Ni, "f") === void 0 && this.extensions, N(this, Ni, "f");
  }
  get invalidity() {
    return N(this, ki, "f") === void 0 && this.extensions, N(this, ki, "f");
  }
  get extensions() {
    return N(this, Pi, "f") || (ee(this, Pi, [], "f"), this.asn.crlEntryExtensions && ee(this, Pi, this.asn.crlEntryExtensions.map((e) => {
      let r = Ue.create(E.serialize(e));
      switch (r.type) {
        case El:
          N(this, Ni, "f") === void 0 && ee(this, Ni, E.parse(r.value, Qn).reason, "f");
          break;
        case Cl:
          N(this, ki, "f") === void 0 && ee(this, ki, E.parse(r.value, Zn).value, "f");
          break;
      }
      return r;
    }), "f")), N(this, Pi, "f");
  }
  constructor(...e) {
    let r;
    if (x.BufferSourceConverter.isBufferSource(e[0]) ? r = x.BufferSourceConverter.toArrayBuffer(e[0]) : typeof e[0] == "string" ? r = E.serialize(new pr({ userCertificate: cy(e[0]), revocationDate: new ge(e[1]), crlEntryExtensions: e[2] })) : e[0] instanceof pr && (r = e[0]), !r)
      throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");
    super(r, pr), ba.set(this, void 0), xa.set(this, void 0), Ni.set(this, void 0), ki.set(this, void 0), Pi.set(this, void 0);
  }
  onInit(e) {
  }
}, "fu");
ba = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Ni = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap();
var Ea;
var Sa;
var _a3;
var Ca;
var Ta;
var Ba;
var Ri;
var pu = /* @__PURE__ */ __name(class extends Mt {
  get version() {
    return this.asn.tbsCertList.version;
  }
  get signatureAlgorithm() {
    if (!N(this, Sa, "f")) {
      let e = le.resolve(kn);
      ee(this, Sa, e.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
    }
    return N(this, Sa, "f");
  }
  get signature() {
    return this.asn.signature;
  }
  get issuer() {
    return this.issuerName.toString();
  }
  get issuerName() {
    return N(this, _a3, "f") || ee(this, _a3, new Ro(this.asn.tbsCertList.issuer), "f"), N(this, _a3, "f");
  }
  get thisUpdate() {
    if (!N(this, Ca, "f")) {
      let e = this.asn.tbsCertList.thisUpdate.getTime();
      if (!e)
        throw new Error("Cannot get 'thisUpdate' value");
      ee(this, Ca, e, "f");
    }
    return N(this, Ca, "f");
  }
  get nextUpdate() {
    var e;
    return N(this, Ta, "f") === void 0 && ee(this, Ta, ((e = this.asn.tbsCertList.nextUpdate) === null || e === void 0 ? void 0 : e.getTime()) || void 0, "f"), N(this, Ta, "f");
  }
  get entries() {
    var e;
    return N(this, Ba, "f") || ee(this, Ba, ((e = this.asn.tbsCertList.revokedCertificates) === null || e === void 0 ? void 0 : e.map((r) => new fu(r))) || [], "f"), N(this, Ba, "f");
  }
  get extensions() {
    return N(this, Ri, "f") || (ee(this, Ri, [], "f"), this.asn.tbsCertList.crlExtensions && ee(this, Ri, this.asn.tbsCertList.crlExtensions.map((e) => Ue.create(E.serialize(e))), "f")), N(this, Ri, "f");
  }
  get tbs() {
    return N(this, Ea, "f") || ee(this, Ea, this.asn.tbsCertListRaw || E.serialize(this.asn.tbsCertList), "f"), N(this, Ea, "f");
  }
  get tbsCertListSignatureAlgorithm() {
    return this.asn.tbsCertList.signature;
  }
  get certListSignatureAlgorithm() {
    return this.asn.signatureAlgorithm;
  }
  constructor(e) {
    super(e, Mt.isAsnEncoded(e) ? yo : void 0), this.tag = je.CrlTag, Ea.set(this, void 0), Sa.set(this, void 0), _a3.set(this, void 0), Ca.set(this, void 0), Ta.set(this, void 0), Ba.set(this, void 0), Ri.set(this, void 0);
  }
  onInit(e) {
  }
  getExtension(e) {
    for (let r of this.extensions)
      if (typeof e == "string") {
        if (r.type === e)
          return r;
      } else if (r instanceof e)
        return r;
    return null;
  }
  getExtensions(e) {
    return this.extensions.filter((r) => typeof e == "string" ? r.type === e : r instanceof e);
  }
  async verify(e, r = Te.get()) {
    if (!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm))
      throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");
    let o, n, i = e.publicKey;
    try {
      i instanceof Wr ? (o = { ...i.publicKey.algorithm, ...i.signatureAlgorithm }, n = await i.publicKey.export(o, ["verify"])) : i instanceof Hr ? (o = { ...i.algorithm, ...this.signatureAlgorithm }, n = await i.export(o, ["verify"])) : (o = { ...i.algorithm, ...this.signatureAlgorithm }, n = i);
    } catch {
      return false;
    }
    let s = le.resolveAll(Ma).reverse(), c = null;
    for (let l of s)
      if (c = l.toWebSignature(o, this.signature), c)
        break;
    if (!c)
      throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
    return await r.subtle.verify(this.signatureAlgorithm, n, c, this.tbs);
  }
  async getThumbprint(...e) {
    let r, o = "SHA-1";
    return e[0] && (e[0].subtle ? r = e[0] : (o = e[0] || o, r = e[1])), r ?? (r = Te.get()), await r.subtle.digest(o, this.rawData);
  }
  findRevoked(e) {
    let r = typeof e == "string" ? e : e.serialNumber, o = cy(r);
    for (let n of this.asn.tbsCertList.revokedCertificates || [])
      if (x.BufferSourceConverter.isEqual(n.userCertificate, o))
        return new fu(E.serialize(n));
    return null;
  }
}, "pu");
Ea = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap(), _a3 = /* @__PURE__ */ new WeakMap(), Ca = /* @__PURE__ */ new WeakMap(), Ta = /* @__PURE__ */ new WeakMap(), Ba = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap();
Ue.register(Jn, ru);
Ue.register(Yn, ou);
Ue.register(Ac, nu);
Ue.register(Ec, ji);
Ue.register(hs, Di);
Ue.register(oi, iu);
Ue.register(vc, Ui);
Ue.register(mc, au);
Ue.register(Bl, cu);
Hi.register(Cf, uu);
Hi.register(ea, Pa);
le.registerSingleton(Ma, Lf);
le.registerSingleton(Ma, Gr);
Gr.namedCurveSize.set("P-256", 32);
Gr.namedCurveSize.set("K-256", 32);
Gr.namedCurveSize.set("P-384", 48);
Gr.namedCurveSize.set("P-521", 66);
function du(t15) {
  return zw.stubThis(t15);
}
__name(du, "du");
var zw = { stubThis: (t15) => globalThis.fetch(t15) };
var uy = {};
async function ly(t15) {
  let { extensions: e } = t15;
  if (!e)
    return false;
  let r, o, n;
  e.forEach((h) => {
    h instanceof Di ? r = h : h instanceof ji ? o = h : h instanceof Ui && (n = h);
  });
  let i;
  if (r && r.keyId ? i = r.keyId : o && (i = o.keyId), i) {
    let h = uy[i];
    if (h) {
      let g = /* @__PURE__ */ new Date();
      if (!h.nextUpdate || h.nextUpdate > g)
        return h.revokedCerts.indexOf(t15.serialNumber) >= 0;
    }
  }
  let s = n?.distributionPoints?.[0].distributionPoint?.fullName?.[0].uniformResourceIdentifier;
  if (!s)
    return false;
  let c;
  try {
    c = await (await du(s)).arrayBuffer();
  } catch {
    return false;
  }
  let l;
  try {
    l = new pu(c);
  } catch {
    return false;
  }
  let f = { revokedCerts: [], nextUpdate: void 0 };
  l.nextUpdate && (f.nextUpdate = l.nextUpdate);
  let d = l.entries;
  if (d) {
    for (let h of d) {
      let g = h.serialNumber;
      f.revokedCerts.push(g);
    }
    return i && (uy[i] = f), f.revokedCerts.indexOf(t15.serialNumber) >= 0;
  }
  return false;
}
__name(ly, "ly");
function fy(t15) {
  let e;
  try {
    e = Xe.decodeFirst(t15);
  } catch (r) {
    let o = r;
    throw new Error(`Error decoding authenticator extensions: ${o.message}`);
  }
  return py(e);
}
__name(fy, "fy");
function py(t15) {
  let e = {};
  for (let [r, o] of t15)
    o instanceof Map ? e[r] = py(o) : e[r] = o;
  return e;
}
__name(py, "py");
function hu(t15) {
  if (t15.byteLength < 37)
    throw new Error(`Authenticator data was ${t15.byteLength} bytes, expected at least 37 bytes`);
  let e = 0, r = U.toDataView(t15), o = t15.slice(e, e += 32), n = t15.slice(e, e += 1), i = n[0], s = { up: !!(i & 1), uv: !!(i & 4), be: !!(i & 8), bs: !!(i & 16), at: !!(i & 64), ed: !!(i & 128), flagsInt: i }, c = t15.slice(e, e + 4), l = r.getUint32(e, false);
  e += 4;
  let f, d, h;
  if (s.at) {
    f = t15.slice(e, e += 16);
    let k = r.getUint16(e);
    e += 2, d = t15.slice(e, e += k);
    let j = U.fromHex("a301634f4b500327206745643235353139"), D = t15.slice(e, e + j.byteLength), F = false;
    U.areEqual(j, D) && (F = true, t15[e] = 164);
    let ne = Xe.decodeFirst(t15.slice(e)), J = Uint8Array.from(Xe.encode(ne));
    F && (t15[e] = 163), h = J, e += J.byteLength;
  }
  let g, C;
  if (s.ed) {
    let k = Xe.decodeFirst(t15.slice(e));
    C = Uint8Array.from(Xe.encode(k)), g = fy(C), e += C.byteLength;
  }
  if (t15.byteLength > e)
    throw new Error("Leftover bytes detected while parsing authenticator data");
  return Jw.stubThis({ rpIdHash: o, flagsBuf: n, flags: s, counter: l, counterBuf: c, aaguid: f, credentialID: d, credentialPublicKey: h, extensionsData: g, extensionsDataBuffer: C });
}
__name(hu, "hu");
var Jw = { stubThis: (t15) => t15 };
function pt(t15, e = -7) {
  return typeof t15 == "string" && (t15 = U.fromUTF8String(t15)), Zt.digest(t15, e);
}
__name(pt, "pt");
async function qe(t15, e = []) {
  if (e.length === 0)
    return true;
  let r = t15.map((s) => new Wr(s));
  for (let s = 0; s < r.length; s++) {
    let c = r[s], l = t15[s];
    try {
      await dy(c);
    } catch {
      throw new Error(`Found revoked certificate in x5c:
${l}`);
    }
    try {
      hy(c.notBefore, c.notAfter);
    } catch {
      throw new Error(`Found certificate out of validity period in x5c:
${l}`);
    }
  }
  let o = e.map((s) => {
    try {
      return new Wr(s);
    } catch (c) {
      let l = c;
      throw new Error(`Could not parse trust anchor certificate:
${s}`, { cause: l });
    }
  }), n = [];
  for (let s = 0; s < o.length; s++) {
    let c = o[s];
    try {
      await dy(c);
    } catch {
      continue;
    }
    try {
      hy(c.notBefore, c.notAfter);
    } catch {
      continue;
    }
    n.push(c);
  }
  if (n.length === 0)
    throw new Error("No specified trust anchor was valid for verifying x5c");
  let i = true;
  for (let s of n)
    try {
      let c = r.concat([s]), l = new Set(c.map((C) => C.toString("pem"))).size;
      if (l !== c.length)
        throw new Error("Invalid certificate path: found duplicate certificates");
      let f = r[0], d = [];
      r.length > 1 && (d = r.slice(1));
      let g = await new lu({ certificates: [...d, s] }).build(f);
      if (g.length < l || g[g.length - 1].subject !== s.subject)
        continue;
      i = false;
      break;
    } catch (c) {
      throw new Error("Unexpected error while validating certificate path", { cause: c });
    }
  if (i)
    throw new $f();
  return true;
}
__name(qe, "qe");
async function dy(t15) {
  if (await ly(t15))
    throw new Error("Found revoked certificate in certificate path");
}
__name(dy, "dy");
function hy(t15, e) {
  let r = new Date(Date.now());
  if (t15 > r || e < r)
    throw new Error("Certificate is not yet valid or expired");
}
__name(hy, "hy");
var $f = /* @__PURE__ */ __name(class extends Error {
  constructor() {
    super("x5c could not be chained to any specified trust anchor"), this.name = "InvalidX5CChain";
  }
}, "$f");
function Kf(t15) {
  let e;
  if (t15 === "1.2.840.10045.4.3.2")
    e = X.ES256;
  else if (t15 === "1.2.840.10045.4.3.3")
    e = X.ES384;
  else if (t15 === "1.2.840.10045.4.3.4")
    e = X.ES512;
  else if (t15 === "1.2.840.113549.1.1.11")
    e = X.RS256;
  else if (t15 === "1.2.840.113549.1.1.12")
    e = X.RS384;
  else if (t15 === "1.2.840.113549.1.1.13")
    e = X.RS512;
  else if (t15 === "1.2.840.113549.1.1.5")
    e = X.RS1;
  else
    throw new Error(`Unable to map X.509 signature algorithm ${t15} to a COSE algorithm`);
  return e;
}
__name(Kf, "Kf");
function mu(t15) {
  let e = /* @__PURE__ */ new Map(), r = pe.parse(t15, Ae), { tbsCertificate: o } = r, { subjectPublicKeyInfo: n, signature: i } = o, s = i.algorithm, c = n.algorithm.algorithm;
  if (c === jr) {
    if (!n.algorithm.parameters)
      throw new Error("Certificate public key was missing parameters (EC2)");
    let l = pe.parse(new Uint8Array(n.algorithm.parameters), kt), f = -999, { namedCurve: d } = l;
    if (d === Gs)
      f = Fe.P256;
    else if (d === Ws)
      f = Fe.P384;
    else
      throw new Error(`Certificate public key contained unexpected namedCurve ${d} (EC2)`);
    let h = new Uint8Array(n.subjectPublicKey), g, C;
    if (h[0] === 4) {
      let j = 1, D = (h.length - 1) / 2;
      g = h.slice(j, j += D), C = h.slice(j);
    } else
      throw new Error('TODO: Figure out how to handle public keys in "compressed form"');
    let k = /* @__PURE__ */ new Map();
    k.set(q.kty, ut.EC2), k.set(q.alg, Kf(s)), k.set(q.crv, f), k.set(q.x, g), k.set(q.y, C), e = k;
  } else if (c === Pt) {
    let l = pe.parse(n.subjectPublicKey, To), f = /* @__PURE__ */ new Map();
    f.set(q.kty, ut.RSA), f.set(q.alg, Kf(s)), f.set(q.n, new Uint8Array(l.modulus)), f.set(q.e, new Uint8Array(l.publicExponent)), e = f;
  } else
    throw new Error(`Certificate public key contained unexpected algorithm ID ${c}`);
  return e;
}
__name(mu, "mu");
function dt(t15) {
  let { signature: e, data: r, credentialPublicKey: o, x509Certificate: n, hashAlgorithm: i } = t15;
  if (!n && !o)
    throw new Error('Must declare either "leafCert" or "credentialPublicKey"');
  if (n && o)
    throw new Error('Must not declare both "leafCert" and "credentialPublicKey"');
  let s = /* @__PURE__ */ new Map();
  return o ? s = Qr(o) : n && (s = mu(n)), Qw.stubThis(Zt.verify({ cosePublicKey: s, signature: e, data: r, shaHashOverride: i }));
}
__name(dt, "dt");
var Qw = { stubThis: (t15) => t15 };
function my(t15) {
  let e = t15.split(".");
  return [JSON.parse(G.toUTF8String(e[0])), JSON.parse(G.toUTF8String(e[1])), e[2]];
}
__name(my, "my");
function yy(t15) {
  let e;
  if (t15 === "ES256")
    e = X.ES256;
  else if (t15 === "ES384")
    e = X.ES384;
  else if (t15 === "ES512")
    e = X.ES512;
  else if (t15 === "RS256")
    e = X.RS256;
  else if (t15 === "RS384")
    e = X.RS384;
  else if (t15 === "RS512")
    e = X.RS512;
  else
    throw new Error(`Unable to map JWS algorithm "${t15}" to a COSE algorithm`);
  return e;
}
__name(yy, "yy");
function gy(t15, e) {
  let [r, o, n] = t15.split("."), i = mu(e), s = U.fromUTF8String(`${r}.${o}`), c = G.toBuffer(n), l = JSON.parse(G.toUTF8String(r)), f = yy(l.alg);
  if (zr(i))
    return La({ data: s, signature: c, cosePublicKey: i, shaHashOverride: f });
  if (Ln(i))
    return Ha({ data: s, signature: c, cosePublicKey: i, shaHashOverride: f });
  let d = i.get(q.kty);
  throw new Error(`JWT verification with public key of kty ${d} is not supported by this method`);
}
__name(gy, "gy");
function vy(t15) {
  let e = t15.replace("-----BEGIN CERTIFICATE-----", "").replace("-----END CERTIFICATE-----", "").replace(/[\n ]/g, "");
  return G.toBuffer(e, "base64");
}
__name(vy, "vy");
var Ay = `-----BEGIN CERTIFICATE-----
MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNAQEFBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
MDBaFw0yODAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBRge2YaRQ2XyolQL30EzTSo//z9SzANBgkqhkiG9w0B
AQUFAAOCAQEA1nPnfE920I2/7LqivjTFKDK1fPxsnCwrvQmeU79rXqoRSLblCKOz
yj1hTdNGCbM+w6DjY1Ub8rrvrTnhQ7k4o+YviiY776BQVvnGCv04zcQLcFGUl5gE
38NflNUVyRRBnMRddWQVDf9VMOyGj/8N7yy5Y0b2qvzfvGn9LhJIZJrglfCm7ymP
AbEVtQwdpf5pLGkkeB6zpxxxYu7KyJesF12KwvhHhm4qxFYxldBniYUr+WymXUad
DKqC5JlR3XC321Y9YeRq4VzW9v493kHMB65jUr9TU/Qr6cf9tveCX4XSQRjbgbME
HMUfpIBvFSDJ3gyICh3WZlXi/EjJKSZp4A==
-----END CERTIFICATE-----
`;
var wy = `-----BEGIN CERTIFICATE-----
MIIFYDCCA0igAwIBAgIJAOj6GWMU0voYMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTYwNTI2MTYyODUyWhcNMjYwNTI0MTYy
ODUyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaOBpjCBozAdBgNVHQ4EFgQUNmHhAHyIBQlRi0RsR/8aTMnqTxIwHwYD
VR0jBBgwFoAUNmHhAHyIBQlRi0RsR/8aTMnqTxIwDwYDVR0TAQH/BAUwAwEB/zAO
BgNVHQ8BAf8EBAMCAYYwQAYDVR0fBDkwNzA1oDOgMYYvaHR0cHM6Ly9hbmRyb2lk
Lmdvb2dsZWFwaXMuY29tL2F0dGVzdGF0aW9uL2NybC8wDQYJKoZIhvcNAQELBQAD
ggIBACDIw41L3KlXG0aMiS//cqrG+EShHUGo8HNsw30W1kJtjn6UBwRM6jnmiwfB
Pb8VA91chb2vssAtX2zbTvqBJ9+LBPGCdw/E53Rbf86qhxKaiAHOjpvAy5Y3m00m
qC0w/Zwvju1twb4vhLaJ5NkUJYsUS7rmJKHHBnETLi8GFqiEsqTWpG/6ibYCv7rY
DBJDcR9W62BW9jfIoBQcxUCUJouMPH25lLNcDc1ssqvC2v7iUgI9LeoM1sNovqPm
QUiG9rHli1vXxzCyaMTjwftkJLkf6724DFhuKug2jITV0QkXvaJWF4nUaHOTNA4u
JU9WDvZLI1j83A+/xnAJUucIv/zGJ1AMH2boHqF8CY16LpsYgBt6tKxxWH00XcyD
CdW2KlBCeqbQPcsFmWyWugxdcekhYsAWyoSf818NUsZdBWBaR/OukXrNLfkQ79Iy
ZohZbvabO/X+MVT3rriAoKc8oE2Uws6DF+60PV7/WIPjNvXySdqspImSN78mflxD
qwLqRBYkA3I75qppLGG9rp7UCdRjxMl8ZDBld+7yvHVgt1cVzJx9xnyGCC23Uaic
MDSXYrB4I4WHXPGjxhZuCuPBLTdOLU8YRvMYdEvYebWHMpvwGCF6bAx3JBpIeOQ1
wDB5y0USicV3YgYGmi+NZfhA4URSh77Yd6uuJOJENRaNVTzk
-----END CERTIFICATE-----
`;
var by = `-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJANUP8luj8tazMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTkxMTIyMjAzNzU4WhcNMzQxMTE4MjAz
NzU4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBOMaBc8oumXb2voc7XCWnu
XKhBBK3e2KMGz39t7lA3XXRe2ZLLAkLM5y3J7tURkf5a1SutfdOyXAmeE6SRo83U
h6WszodmMkxK5GM4JGrnt4pBisu5igXEydaW7qq2CdC6DOGjG+mEkN8/TA6p3cno
L/sPyz6evdjLlSeJ8rFBH6xWyIZCbrcpYEJzXaUOEaxxXxgYz5/cTiVKN2M1G2ok
QBUIYSY6bjEL4aUN5cfo7ogP3UvliEo3Eo0YgwuzR2v0KR6C1cZqZJSTnghIC/vA
D32KdNQ+c3N+vl2OTsUVMC1GiWkngNx1OO1+kXW+YTnnTUOtOIswUP/Vqd5SYgAI
mMAfY8U9/iIgkQj6T2W6FsScy94IN9fFhE1UtzmLoBIuUFsVXJMTz+Jucth+IqoW
Fua9v1R93/k98p41pjtFX+H8DslVgfP097vju4KDlqN64xV1grw3ZLl4CiOe/A91
oeLm2UHOq6wn3esB4r2EIQKb6jTVGu5sYCcdWpXr0AUVqcABPdgL+H7qJguBw09o
jm6xNIrw2OocrDKsudk/okr/AwqEyPKw9WnMlQgLIKw1rODG2NvU9oR3GVGdMkUB
ZutL8VuFkERQGt6vQ2OCw0sV47VMkuYbacK/xyZFiRcrPJPb41zgbQj9XAEyLKCH
ex0SdDrx+tWUDqG8At2JHA==
-----END CERTIFICATE-----
`;
var xy = `
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAMNrfES5rhgxMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjExMTE3MjMxMDQyWhcNMzYxMTEzMjMx
MDQyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBTNNZe5cuf8oiq+jV0itTG
zWVhSTjOBEk2FQvh11J3o3lna0o7rd8RFHnN00q4hi6TapFhh4qaw/iG6Xg+xOan
63niLWIC5GOPFgPeYXM9+nBb3zZzC8ABypYuCusWCmt6Tn3+Pjbz3MTVhRGXuT/T
QH4KGFY4PhvzAyXwdjTOCXID+aHud4RLcSySr0Fq/L+R8TWalvM1wJJPhyRjqRCJ
erGtfBagiALzvhnmY7U1qFcS0NCnKjoO7oFedKdWlZz0YAfu3aGCJd4KHT0MsGiL
Zez9WP81xYSrKMNEsDK+zK5fVzw6jA7cxmpXcARTnmAuGUeI7VVDhDzKeVOctf3a
0qQLwC+d0+xrETZ4r2fRGNw2YEs2W8Qj6oDcfPvq9JySe7pJ6wcHnl5EZ0lwc4xH
7Y4Dx9RA1JlfooLMw3tOdJZH0enxPXaydfAD3YifeZpFaUzicHeLzVJLt9dvGB0b
HQLE4+EqKFgOZv2EoP686DQqbVS1u+9k0p2xbMA105TBIk7npraa8VM0fnrRKi7w
lZKwdH+aNAyhbXRW9xsnODJ+g8eF452zvbiKKngEKirK5LGieoXBX7tZ9D1GNBH2
Ob3bKOwwIWdEFle/YF/h6zWgdeoaNGDqVBrLr2+0DtWoiB1aDEjLWl9FmyIUyUm7
mD/vFDkzF+wm7cyWpQpCVQ==
-----END CERTIFICATE-----
`;
var Ey = `
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAPHBcqaZ6vUdMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjIwMzIwMTgwNzQ4WhcNNDIwMzE1MTgw
NzQ4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQB8cMqTllHc8U+qCrOlg3H7
174lmaCsbo/bJ0C17JEgMLb4kvrqsXZs01U3mB/qABg/1t5Pd5AORHARs1hhqGIC
W/nKMav574f9rZN4PC2ZlufGXb7sIdJpGiO9ctRhiLuYuly10JccUZGEHpHSYM2G
tkgYbZba6lsCPYAAP83cyDV+1aOkTf1RCp/lM0PKvmxYN10RYsK631jrleGdcdkx
oSK//mSQbgcWnmAEZrzHoF1/0gso1HZgIn0YLzVhLSA/iXCX4QT2h3J5z3znluKG
1nv8NQdxei2DIIhASWfu804CA96cQKTTlaae2fweqXjdN1/v2nqOhngNyz1361mF
mr4XmaKH/ItTwOe72NI9ZcwS1lVaCvsIkTDCEXdm9rCNPAY10iTunIHFXRh+7KPz
lHGewCq/8TOohBRn0/NNfh7uRslOSZ/xKbN9tMBtw37Z8d2vvnXq/YWdsm1+JLVw
n6yYD/yacNJBlwpddla8eaVMjsF6nBnIgQOf9zKSe06nSTqvgwUHosgOECZJZ1Eu
zbH4yswbt02tKtKEFhx+v+OTge/06V+jGsqTWLsfrOCNLuA8H++z+pUENmpqnnHo
vaI47gC+TNpkgYGkkBT6B/m/U01BuOBBTzhIlMEZq9qkDWuM2cA5kW5V3FJUcfHn
w1IdYIg2Wxg7yHcQZemFQg==
-----END CERTIFICATE-----
`;
var Sy = `-----BEGIN CERTIFICATE-----
MIICEjCCAZmgAwIBAgIQaB0BbHo84wIlpQGUKEdXcTAKBggqhkjOPQQDAzBLMR8w
HQYDVQQDDBZBcHBsZSBXZWJBdXRobiBSb290IENBMRMwEQYDVQQKDApBcHBsZSBJ
bmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIwMDMxODE4MjEzMloXDTQ1MDMx
NTAwMDAwMFowSzEfMB0GA1UEAwwWQXBwbGUgV2ViQXV0aG4gUm9vdCBDQTETMBEG
A1UECgwKQXBwbGUgSW5jLjETMBEGA1UECAwKQ2FsaWZvcm5pYTB2MBAGByqGSM49
AgEGBSuBBAAiA2IABCJCQ2pTVhzjl4Wo6IhHtMSAzO2cv+H9DQKev3//fG59G11k
xu9eI0/7o6V5uShBpe1u6l6mS19S1FEh6yGljnZAJ+2GNP1mi/YK2kSXIuTHjxA/
pcoRf7XkOtO4o1qlcaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUJtdk
2cV4wlpn0afeaxLQG2PxxtcwDgYDVR0PAQH/BAQDAgEGMAoGCCqGSM49BAMDA2cA
MGQCMFrZ+9DsJ1PW9hfNdBywZDsWDbWFp28it1d/5w2RPkRX3Bbn/UbDTNLx7Jr3
jAGGiQIwHFj+dJZYUJR786osByBelJYsVZd2GbHQu209b5RCmGQ21gpSAk9QZW4B
1bWeT0vT
-----END CERTIFICATE-----
`;
var _y = `-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----
 `;
var Cy = `-----BEGIN CERTIFICATE-----
MIIFWjCCA0KgAwIBAgISEdK7udcjGJ5AXwqdLdDfJWfRMA0GCSqGSIb3DQEBDAUA
MEYxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52LXNhMRwwGgYD
VQQDExNHbG9iYWxTaWduIFJvb3QgUjQ2MB4XDTE5MDMyMDAwMDAwMFoXDTQ2MDMy
MDAwMDAwMFowRjELMAkGA1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYt
c2ExHDAaBgNVBAMTE0dsb2JhbFNpZ24gUm9vdCBSNDYwggIiMA0GCSqGSIb3DQEB
AQUAA4ICDwAwggIKAoICAQCsrHQy6LNl5brtQyYdpokNRbopiLKkHWPd08EsCVeJ
OaFV6Wc0dwxu5FUdUiXSE2te4R2pt32JMl8Nnp8semNgQB+msLZ4j5lUlghYruQG
vGIFAha/r6gjA7aUD7xubMLL1aa7DOn2wQL7Id5m3RerdELv8HQvJfTqa1VbkNud
316HCkD7rRlr+/fKYIje2sGP1q7Vf9Q8g+7XFkyDRTNrJ9CG0Bwta/OrffGFqfUo
0q3v84RLHIf8E6M6cqJaESvWJ3En7YEtbWaBkoe0G1h6zD8K+kZPTXhc+CtI4wSE
y132tGqzZfxCnlEmIyDLPRT5ge1lFgBPGmSXZgjPjHvjK8Cd+RTyG/FWaha/LIWF
zXg4mutCagI0GIMXTpRW+LaCtfOW3T3zvn8gdz57GSNrLNRyc0NXfeD412lPFzYE
+cCQYDdF3uYM2HSNrpyibXRdQr4G9dlkbgIQrImwTDsHTUB+JMWKmIJ5jqSngiCN
I/onccnfxkF0oE32kRbcRoxfKWMxWXEM2G/CtjJ9++ZdU6Z+Ffy7dXxd7Pj2Fxzs
x2sZy/N78CsHpdlseVR2bJ0cpm4O6XkMqCNqo98bMDGfsVR7/mrLZqrcZdCinkqa
ByFrgY/bxFn63iLABJzjqls2k+g9vXqhnQt2sQvHnf3PmKgGwvgqo6GDoLclcqUC
4wIDAQABo0IwQDAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNV
HQ4EFgQUA1yrc4GHqMywptWU4jaWSf8FmSwwDQYJKoZIhvcNAQEMBQADggIBAHx4
7PYCLLtbfpIrXTncvtgdokIzTfnvpCo7RGkerNlFo048p9gkUbJUHJNOxO97k4Vg
JuoJSOD1u8fpaNK7ajFxzHmuEajwmf3lH7wvqMxX63bEIaZHU1VNaL8FpO7XJqti
2kM3S+LGteWygxk6x9PbTZ4IevPuzz5i+6zoYMzRx6Fcg0XERczzF2sUyQQCPtIk
pnnpHs6i58FZFZ8d4kuaPp92CC1r2LpXFNqD6v6MVenQTqnMdzGxRBF6XLE+0xRF
FRhiJBPSy03OXIPBNvIQtQ6IbbjhVp+J3pZmOUdkLG5NrmJ7v2B0GbhWrJKsFjLt
rWhV/pi60zTe9Mlhww6G9kuEYO4Ne7UyWHmRVSyBQ7N0H3qqJZ4d16GLuc1CLgSk
ZoNNiTW2bKg2SnkheCLQQrzRQDGQob4Ez8pn7fXwgNNgyYMqIgXQBztSvwyeqiv5
u+YfjyW6hY0XHgL+XVAEV8/+LbzvXMAaq7afJMbfc2hIkCwU9D9SGuTSyxTDYWnP
4vkYxboznxSjBF25cfe1lNj2M8FawTSLfJvdkzrnE6JwYZ+vj+vYxXX4M2bUdGc6
N3ec592kD3ZDZopD8p/7DEJ4Y9HiD2971KE9dJeFt0g5QdYg/NA6s/rob8SKunE3
vouXsXgxT7PntgMTzlSdriVZzH81Xwj3QEUxeCp6
-----END CERTIFICATE-----
`;
var qf = /* @__PURE__ */ __name(class {
  constructor() {
    Object.defineProperty(this, "pemCertificates", { enumerable: true, configurable: true, writable: true, value: void 0 }), this.pemCertificates = /* @__PURE__ */ new Map();
  }
  setRootCertificates(e) {
    let { identifier: r, certificates: o } = e, n = [];
    for (let i of o)
      i instanceof Uint8Array ? n.push(Se(i)) : n.push(i);
    this.pemCertificates.set(r, n);
  }
  getRootCertificates(e) {
    let { identifier: r } = e;
    return this.pemCertificates.get(r) ?? [];
  }
}, "qf");
var Mo = new qf();
Mo.setRootCertificates({ identifier: "android-key", certificates: [wy, by, xy, Ey] });
Mo.setRootCertificates({ identifier: "android-safetynet", certificates: [Ay] });
Mo.setRootCertificates({ identifier: "apple", certificates: [Sy] });
Mo.setRootCertificates({ identifier: "mds", certificates: [_y, Cy] });
async function Ty(t15) {
  let e = my(t15), r = e[0], o = e[1], n = r.x5c.map(Se);
  try {
    let g = Mo.getRootCertificates({ identifier: "mds" });
    await qe(n, g);
  } catch (g) {
    let C = g;
    throw new Error("BLOB certificate path could not be validated", { cause: C });
  }
  let i = n[0];
  if (!await gy(t15, vy(i)))
    throw new Error("BLOB signature could not be verified");
  let c = [];
  for (let g of o.entries)
    g.aaguid && g.metadataStatement && c.push(g.metadataStatement);
  let [l, f, d] = o.nextUpdate.split("-"), h = new Date(parseInt(l, 10), parseInt(f, 10) - 1, parseInt(d, 10));
  return { statements: c, parsedNextUpdate: h, payload: o };
}
__name(Ty, "Ty");
async function By(t15) {
  let { cosePublicKey: e, signature: r, data: o } = t15, n = await gt(), i = e.get(q.alg), s = e.get(q.crv), c = e.get(q.x);
  if (!i)
    throw new Error("Public key was missing alg (OKP)");
  if (!Yt(i))
    throw new Error(`Public key had invalid alg ${i} (OKP)`);
  if (!s)
    throw new Error("Public key was missing crv (OKP)");
  if (!c)
    throw new Error("Public key was missing x (OKP)");
  let l;
  if (s === Fe.ED25519)
    l = "Ed25519";
  else
    throw new Error(`Unexpected COSE crv value of ${s} (OKP)`);
  let f = { kty: "OKP", crv: l, alg: "EdDSA", x: G.fromBuffer(c), ext: false }, h = await Hn({ keyData: f, algorithm: { name: l, namedCurve: l } }), g = { name: l };
  return n.subtle.verify(g, h, r, o);
}
__name(By, "By");
function Oy(t15, e) {
  let r = pe.parse(t15, Ur), o = new Uint8Array(r.r), n = new Uint8Array(r.s), i = Yw(e), s = Iy(o, i), c = Iy(n, i);
  return U.concat([s, c]);
}
__name(Oy, "Oy");
function Yw(t15) {
  switch (t15) {
    case Fe.P256:
      return 32;
    case Fe.P384:
      return 48;
    case Fe.P521:
      return 66;
    default:
      throw new Error(`Unexpected COSE crv value of ${t15} (EC2)`);
  }
}
__name(Yw, "Yw");
function Iy(t15, e) {
  let r;
  if (t15.length < e)
    r = new Uint8Array(e), r.set(t15, e - t15.length);
  else if (t15.length === e)
    r = t15;
  else if (t15.length === e + 1 && t15[0] === 0 && (t15[1] & 128) === 128)
    r = t15.subarray(1);
  else
    throw new Error(`Invalid signature component length ${t15.length}, expected ${e}`);
  return r;
}
__name(Iy, "Iy");
function Ny(t15) {
  let { cosePublicKey: e, signature: r, data: o, shaHashOverride: n } = t15;
  if (zr(e)) {
    let s = e.get(q.crv);
    if (!Ap(s))
      throw new Error(`unknown COSE curve ${s}`);
    let c = Oy(r, s);
    return La({ cosePublicKey: e, signature: c, data: o, shaHashOverride: n });
  } else {
    if (Ln(e))
      return Ha({ cosePublicKey: e, signature: r, data: o, shaHashOverride: n });
    if (vp(e))
      return By({ cosePublicKey: e, signature: r, data: o });
  }
  let i = e.get(q.kty);
  throw new Error(`Signature verification with public key of kty ${i} is not supported by this method`);
}
__name(Ny, "Ny");
var U = {};
Ut(U, { areEqual: () => Zw, concat: () => r0, fromASCIIString: () => i0, fromHex: () => t0, fromUTF8String: () => n0, toDataView: () => s0, toHex: () => e0, toUTF8String: () => o0 });
function Zw(t15, e) {
  return t15.length != e.length ? false : t15.every((r, o) => r === e[o]);
}
__name(Zw, "Zw");
function e0(t15) {
  return Array.from(t15, (r) => r.toString(16).padStart(2, "0")).join("");
}
__name(e0, "e0");
function t0(t15) {
  if (!t15)
    return Uint8Array.from([]);
  if (!(t15.length !== 0 && t15.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(t15)))
    throw new Error("Invalid hex string");
  let r = t15.match(/.{1,2}/g) ?? [];
  return Uint8Array.from(r.map((o) => parseInt(o, 16)));
}
__name(t0, "t0");
function r0(t15) {
  let e = 0, r = t15.reduce((n, i) => n + i.length, 0), o = new Uint8Array(r);
  return t15.forEach((n) => {
    o.set(n, e), e += n.length;
  }), o;
}
__name(r0, "r0");
function o0(t15) {
  return new globalThis.TextDecoder("utf-8").decode(t15);
}
__name(o0, "o0");
function n0(t15) {
  return new globalThis.TextEncoder().encode(t15);
}
__name(n0, "n0");
function i0(t15) {
  return Uint8Array.from(t15.split("").map((e) => e.charCodeAt(0)));
}
__name(i0, "i0");
function s0(t15) {
  return new DataView(t15.buffer, t15.byteOffset, t15.length);
}
__name(s0, "s0");
async function yu() {
  let t15 = new Uint8Array(32);
  return await Zt.getRandomValues(t15), a0.stubThis(t15);
}
__name(yu, "yu");
var a0 = { stubThis: (t15) => t15 };
var ky = [-8, -7, -36, -37, -38, -39, -257, -258, -259, -65535];
var c0 = { residentKey: "preferred", userVerification: "preferred" };
var u0 = [-8, -7, -257];
async function Py(t15) {
  let { rpName: e, rpID: r, userName: o, userID: n, challenge: i = await yu(), userDisplayName: s = "", timeout: c = 6e4, attestationType: l = "none", excludeCredentials: f = [], authenticatorSelection: d = c0, extensions: h, supportedAlgorithmIDs: g = u0, preferredAuthenticatorType: C } = t15, k = g.map((ne) => ({ alg: ne, type: "public-key" }));
  d.residentKey === void 0 ? d.requireResidentKey && (d.residentKey = "required") : d.requireResidentKey = d.residentKey === "required";
  let j = i;
  if (typeof j == "string" && (j = U.fromUTF8String(j)), typeof n == "string")
    throw new Error("String values for `userID` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids");
  let D = n;
  D || (D = await Ep());
  let F = [];
  return C && (C === "securityKey" ? (F.push("security-key"), d.authenticatorAttachment = "cross-platform") : C === "localDevice" ? (F.push("client-device"), d.authenticatorAttachment = "platform") : C === "remoteDevice" && (F.push("hybrid"), d.authenticatorAttachment = "cross-platform")), { challenge: G.fromBuffer(j), rp: { name: e, id: r }, user: { id: G.fromBuffer(D), name: o, displayName: s }, pubKeyCredParams: k, timeout: c, attestation: l, excludeCredentials: f.map((ne) => {
    if (!G.isBase64URL(ne.id))
      throw new Error(`excludeCredential id "${ne.id}" is not a valid base64url string`);
    return { ...ne, id: G.trimPadding(ne.id), type: "public-key" };
  }), authenticatorSelection: d, extensions: { ...h, credProps: true }, hints: F };
}
__name(Py, "Py");
function gu({ be: t15, bs: e }) {
  let r = e, o = "singleDevice";
  if (t15 && (o = "multiDevice"), o === "singleDevice" && r)
    throw new Xf("Single-device credential indicated that it was backed up, which should be impossible.");
  return { credentialDeviceType: o, credentialBackedUp: r };
}
__name(gu, "gu");
var Xf = /* @__PURE__ */ __name(class extends Error {
  constructor(e) {
    super(e), this.name = "InvalidBackupFlags";
  }
}, "Xf");
async function vu(t15, e) {
  try {
    return await Promise.any(e.map((o) => new Promise((n, i) => {
      pt(U.fromASCIIString(o)).then((s) => {
        U.areEqual(t15, s) ? n(o) : i();
      });
    })));
  } catch (r) {
    throw r.name === "AggregateError" ? new zf() : r;
  }
}
__name(vu, "vu");
var zf = /* @__PURE__ */ __name(class extends Error {
  constructor() {
    super("Unexpected RP ID hash"), this.name = "UnexpectedRPIDHash";
  }
}, "zf");
async function Ry(t15) {
  let { attStmt: e, clientDataHash: r, rpIdHash: o, credentialID: n, credentialPublicKey: i, aaguid: s, rootCertificates: c } = t15, l = Uint8Array.from([0]), f = Vn(i), d = U.concat([l, o, r, n, f]), h = e.get("sig"), g = e.get("x5c");
  if (!g)
    throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");
  if (!h)
    throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");
  let C = Number.parseInt(U.toHex(s), 16);
  if (C !== 0)
    throw new Error(`AAGUID "${C}" was not expected value`);
  try {
    await qe(g.map(Se), c);
  } catch (k) {
    let j = k;
    throw new Error(`${j.message} (FIDOU2F)`);
  }
  return dt({ signature: h, data: d, x509Certificate: g[0], hashAlgorithm: X.ES256 });
}
__name(Ry, "Ry");
var My = "1.3.6.1.4.1.45724.1.1.4";
function Au(t15, e) {
  if (!t15)
    return true;
  let r = t15.find((s) => s.extnID === My);
  if (!r)
    return true;
  let o = pe.parse(r.extnValue, S), n = new Uint8Array(o.buffer);
  if (!U.areEqual(e, n)) {
    let s = U.toHex(n), c = U.toHex(e);
    throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${My}) value of "${s}" was present but not equal to attestation statement AAGUID value of "${c}"`);
  }
  return true;
}
__name(Au, "Au");
function Dy(t15) {
  return (e, ...r) => {
  };
}
__name(Dy, "Dy");
var l0 = { url: "", no: 0, nextUpdate: /* @__PURE__ */ new Date(0) };
var f0 = "https://mds.fidoalliance.org/";
var ht;
(function(t15) {
  t15[t15.DISABLED = 0] = "DISABLED", t15[t15.REFRESHING = 1] = "REFRESHING", t15[t15.READY = 2] = "READY";
})(ht || (ht = {}));
var Pn = Dy("MetadataService");
var Jf = /* @__PURE__ */ __name(class {
  constructor() {
    Object.defineProperty(this, "mdsCache", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(this, "statementCache", { enumerable: true, configurable: true, writable: true, value: {} }), Object.defineProperty(this, "state", { enumerable: true, configurable: true, writable: true, value: ht.DISABLED }), Object.defineProperty(this, "verificationMode", { enumerable: true, configurable: true, writable: true, value: "strict" });
  }
  async initialize(e = {}) {
    this.statementCache = {};
    let { mdsServers: r = [f0], statements: o, verificationMode: n } = e;
    if (this.setState(ht.REFRESHING), o?.length) {
      let i = 0;
      o.forEach((s) => {
        s.aaguid && (this.statementCache[s.aaguid] = { entry: { metadataStatement: s, statusReports: [], timeOfLastStatusChange: "1970-01-01" }, url: l0.url }, i += 1);
      }), Pn(`Cached ${i} local statements`);
    }
    if (r?.length) {
      let i = Object.keys(this.statementCache).length, s = r.length;
      for (let f of r)
        try {
          let d = { url: f, no: 0, nextUpdate: /* @__PURE__ */ new Date(0) }, h = await this.downloadBlob(d);
          await this.verifyBlob(h, d);
        } catch (d) {
          Pn(`Could not download BLOB from ${f}:`, d), s -= 1;
        }
      let l = Object.keys(this.statementCache).length - i;
      Pn(`Cached ${l} statements from ${s} metadata server(s)`);
    }
    n && (this.verificationMode = n), this.setState(ht.READY);
  }
  async getStatement(e) {
    if (this.state === ht.DISABLED || !e)
      return;
    e instanceof Uint8Array && (e = Va(e)), await this.pauseUntilReady();
    let r = this.statementCache[e];
    if (!r) {
      if (this.verificationMode === "strict")
        throw new Error(`No metadata statement found for aaguid "${e}"`);
      return;
    }
    if (r.url) {
      let n = this.mdsCache[r.url];
      if (/* @__PURE__ */ new Date() > n.nextUpdate)
        try {
          this.setState(ht.REFRESHING);
          let s = await this.downloadBlob(n);
          await this.verifyBlob(s, n);
        } finally {
          this.setState(ht.READY);
        }
    }
    let { entry: o } = r;
    for (let n of o.statusReports) {
      let { status: i } = n;
      if (i === "USER_VERIFICATION_BYPASS" || i === "ATTESTATION_KEY_COMPROMISE" || i === "USER_KEY_REMOTE_COMPROMISE" || i === "USER_KEY_PHYSICAL_COMPROMISE")
        throw new Error(`Detected compromised aaguid "${e}"`);
    }
    return o.metadataStatement;
  }
  async downloadBlob(e) {
    let { url: r } = e;
    return await (await du(r)).text();
  }
  async verifyBlob(e, r) {
    let { url: o, no: n } = r, { payload: i, parsedNextUpdate: s } = await Ty(e);
    if (i.no <= n)
      throw new Error(`Latest BLOB no. ${i.no} is not greater than previous no. ${n}`);
    for (let c of i.entries)
      c.aaguid && (this.statementCache[c.aaguid] = { entry: c, url: o });
    o ? this.mdsCache[o] = { ...r, no: i.no, nextUpdate: s } : s < /* @__PURE__ */ new Date() && Pn(`\u26A0\uFE0F This MDS blob (serial: ${i.no}) contains stale data as of ${s.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`);
  }
  pauseUntilReady() {
    return this.state === ht.READY ? new Promise((r) => {
      r();
    }) : new Promise((r, o) => {
      let s = 700, c = globalThis.setInterval(() => {
        s < 1 ? (clearInterval(c), o(`State did not become ready in ${7e4 / 1e3} seconds`)) : this.state === ht.READY && (clearInterval(c), r()), s -= 1;
      }, 100);
    });
  }
  setState(e) {
    this.state = e, e === ht.DISABLED ? Pn("MetadataService is DISABLED") : e === ht.REFRESHING ? Pn("MetadataService is REFRESHING") : e === ht.READY && Pn("MetadataService is READY");
  }
}, "Jf");
var Do = new Jf();
async function jo({ statement: t15, credentialPublicKey: e, x5c: r, attestationStatementAlg: o }) {
  let { authenticationAlgorithms: n, authenticatorGetInfo: i, attestationRootCertificates: s } = t15, c = /* @__PURE__ */ new Set();
  n.forEach((D) => {
    let F = jy[D];
    F && c.add(F);
  });
  let l = Qr(e), f = l.get(q.kty), d = l.get(q.alg);
  if (!f)
    throw new Error("Credential public key was missing kty");
  if (!d)
    throw new Error("Credential public key was missing alg");
  if (!f)
    throw new Error("Credential public key was missing kty");
  let h = { kty: f, alg: d };
  if (zr(l)) {
    let D = l.get(q.crv);
    h.crv = D;
  }
  let g = false;
  for (let D of c)
    if (D.alg === h.alg && D.kty === h.kty && ((D.kty === ut.EC2 || D.kty === ut.OKP) && (D.crv, h.crv), g = true), g)
      break;
  if (!g) {
    let D = n.map((J) => `'${J}' (COSE info: ${Uy(jy[J])})`), F = JSON.stringify(D, null, 2).replace(/"/g, ""), ne = Uy(h);
    throw new Error(`Public key parameters ${ne} did not match any of the following metadata algorithms:
${F}`);
  }
  if (o !== void 0 && i?.algorithms !== void 0) {
    let D = i.algorithms.map((F) => F.alg);
    if (D.indexOf(o) < 0)
      throw new Error(`Attestation statement alg ${o} did not match one of ${D}`);
  }
  let C = r.map(Se), k = s.map(Se), j = false;
  if (C.length === 1 && k.indexOf(C[0]) >= 0 && (j = true), !j)
    try {
      await qe(C, k);
    } catch (D) {
      let F = D;
      throw new Error(`Could not validate certificate path with any metadata root certificates: ${F.message}`);
    }
  return true;
}
__name(jo, "jo");
var jy = { secp256r1_ecdsa_sha256_raw: { kty: 2, alg: -7, crv: 1 }, secp256r1_ecdsa_sha256_der: { kty: 2, alg: -7, crv: 1 }, rsassa_pss_sha256_raw: { kty: 3, alg: -37 }, rsassa_pss_sha256_der: { kty: 3, alg: -37 }, secp256k1_ecdsa_sha256_raw: { kty: 2, alg: -47, crv: 8 }, secp256k1_ecdsa_sha256_der: { kty: 2, alg: -47, crv: 8 }, rsassa_pss_sha384_raw: { kty: 3, alg: -38 }, rsassa_pkcsv15_sha256_raw: { kty: 3, alg: -257 }, rsassa_pkcsv15_sha384_raw: { kty: 3, alg: -258 }, rsassa_pkcsv15_sha512_raw: { kty: 3, alg: -259 }, rsassa_pkcsv15_sha1_raw: { kty: 3, alg: -65535 }, secp384r1_ecdsa_sha384_raw: { kty: 2, alg: -35, crv: 2 }, secp512r1_ecdsa_sha256_raw: { kty: 2, alg: -36, crv: 3 }, ed25519_eddsa_sha512_raw: { kty: 1, alg: -8, crv: 6 } };
function Uy(t15) {
  let { kty: e, alg: r, crv: o } = t15, n = "";
  return e !== ut.RSA ? n = `{ kty: ${e}, alg: ${r}, crv: ${o} }` : n = `{ kty: ${e}, alg: ${r} }`, n;
}
__name(Uy, "Uy");
async function Ly(t15) {
  let { attStmt: e, clientDataHash: r, authData: o, credentialPublicKey: n, aaguid: i, rootCertificates: s } = t15, c = e.get("sig"), l = e.get("x5c"), f = e.get("alg");
  if (!c)
    throw new Error("No attestation signature provided in attestation statement (Packed)");
  if (!f)
    throw new Error("Attestation statement did not contain alg (Packed)");
  if (!Yt(f))
    throw new Error(`Attestation statement contained invalid alg ${f} (Packed)`);
  let d = U.concat([o, r]), h = false;
  if (l) {
    let { subject: g, basicConstraintsCA: C, version: k, notBefore: j, notAfter: D, parsedCertificate: F } = ni(l[0]), { OU: ne, CN: J, O: b, C: T } = g;
    if (ne !== "Authenticator Attestation")
      throw new Error('Certificate OU was not "Authenticator Attestation" (Packed|Full)');
    if (!J)
      throw new Error("Certificate CN was empty (Packed|Full)");
    if (!b)
      throw new Error("Certificate O was empty (Packed|Full)");
    if (!T || T.length !== 2)
      throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");
    if (C)
      throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");
    if (k !== 2)
      throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");
    let H = /* @__PURE__ */ new Date();
    if (j > H)
      throw new Error(`Certificate not good before "${j.toString()}" (Packed|Full)`);
    if (H = /* @__PURE__ */ new Date(), D < H)
      throw new Error(`Certificate not good after "${D.toString()}" (Packed|Full)`);
    try {
      await Au(F.tbsCertificate.extensions, i);
    } catch (se) {
      let he = se;
      throw new Error(`${he.message} (Packed|Full)`);
    }
    let Y = await Do.getStatement(i);
    if (Y) {
      if (Y.attestationTypes.indexOf("basic_full") < 0)
        throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");
      try {
        await jo({ statement: Y, credentialPublicKey: n, x5c: l, attestationStatementAlg: f });
      } catch (se) {
        let he = se;
        throw new Error(`${he.message} (Packed|Full)`);
      }
    } else
      try {
        await qe(l.map(Se), s);
      } catch (se) {
        let he = se;
        throw new Error(`${he.message} (Packed|Full)`);
      }
    h = await dt({ signature: c, data: d, x509Certificate: l[0], hashAlgorithm: f });
  } else
    h = await dt({ signature: c, data: d, credentialPublicKey: n, hashAlgorithm: f });
  return h;
}
__name(Ly, "Ly");
async function Hy(t15) {
  let { attStmt: e, clientDataHash: r, authData: o, aaguid: n, rootCertificates: i, verifyTimestampMS: s = true, credentialPublicKey: c, attestationSafetyNetEnforceCTSCheck: l } = t15, f = e.get("alg"), d = e.get("response");
  if (!e.get("ver"))
    throw new Error("No ver value in attestation (SafetyNet)");
  if (!d)
    throw new Error("No response was included in attStmt by authenticator (SafetyNet)");
  let C = U.toUTF8String(d).split("."), k = JSON.parse(G.toUTF8String(C[0])), j = JSON.parse(G.toUTF8String(C[1])), D = C[2], { nonce: F, ctsProfileMatch: ne, timestampMs: J } = j;
  if (s) {
    let Be = Date.now();
    if (J > Date.now())
      throw new Error(`Payload timestamp "${J}" was later than "${Be}" (SafetyNet)`);
    let He = J + 60 * 1e3;
    if (Be = Date.now(), He < Be)
      throw new Error(`Payload timestamp "${He}" has expired (SafetyNet)`);
  }
  let b = U.concat([o, r]), T = await pt(b), H = G.fromBuffer(T, "base64");
  if (F !== H)
    throw new Error("Could not verify payload nonce (SafetyNet)");
  if (l && !ne)
    throw new Error("Could not verify device integrity (SafetyNet)");
  let Y = G.toBuffer(k.x5c[0], "base64"), se = ni(Y), { subject: he } = se;
  if (he.CN !== "attest.android.com")
    throw new Error('Certificate common name was not "attest.android.com" (SafetyNet)');
  let Le = await Do.getStatement(n);
  if (Le)
    try {
      await jo({ statement: Le, credentialPublicKey: c, x5c: k.x5c, attestationStatementAlg: f });
    } catch (Be) {
      let He = Be;
      throw new Error(`${He.message} (SafetyNet)`);
    }
  else
    try {
      await qe(k.x5c.map(Se), i);
    } catch (Be) {
      let He = Be;
      throw new Error(`${He.message} (SafetyNet)`);
    }
  let yt = U.fromUTF8String(`${C[0]}.${C[1]}`), Dt = G.toBuffer(D);
  return await dt({ signature: Dt, data: yt, x509Certificate: Y, hashAlgorithm: f });
}
__name(Hy, "Hy");
var Vy = { 196: "TPM_ST_RSP_COMMAND", 32768: "TPM_ST_NULL", 32769: "TPM_ST_NO_SESSIONS", 32770: "TPM_ST_SESSIONS", 32788: "TPM_ST_ATTEST_NV", 32789: "TPM_ST_ATTEST_COMMAND_AUDIT", 32790: "TPM_ST_ATTEST_SESSION_AUDIT", 32791: "TPM_ST_ATTEST_CERTIFY", 32792: "TPM_ST_ATTEST_QUOTE", 32793: "TPM_ST_ATTEST_TIME", 32794: "TPM_ST_ATTEST_CREATION", 32801: "TPM_ST_CREATION", 32802: "TPM_ST_VERIFIED", 32803: "TPM_ST_AUTH_SECRET", 32804: "TPM_ST_HASHCHECK", 32805: "TPM_ST_AUTH_SIGNED", 32809: "TPM_ST_FU_MANIFEST" };
var Ar = { 0: "TPM_ALG_ERROR", 1: "TPM_ALG_RSA", 4: "TPM_ALG_SHA", 4: "TPM_ALG_SHA1", 5: "TPM_ALG_HMAC", 6: "TPM_ALG_AES", 7: "TPM_ALG_MGF1", 8: "TPM_ALG_KEYEDHASH", 10: "TPM_ALG_XOR", 11: "TPM_ALG_SHA256", 12: "TPM_ALG_SHA384", 13: "TPM_ALG_SHA512", 16: "TPM_ALG_NULL", 18: "TPM_ALG_SM3_256", 19: "TPM_ALG_SM4", 20: "TPM_ALG_RSASSA", 21: "TPM_ALG_RSAES", 22: "TPM_ALG_RSAPSS", 23: "TPM_ALG_OAEP", 24: "TPM_ALG_ECDSA", 25: "TPM_ALG_ECDH", 26: "TPM_ALG_ECDAA", 27: "TPM_ALG_SM2", 28: "TPM_ALG_ECSCHNORR", 29: "TPM_ALG_ECMQV", 32: "TPM_ALG_KDF1_SP800_56A", 33: "TPM_ALG_KDF2", 34: "TPM_ALG_KDF1_SP800_108", 35: "TPM_ALG_ECC", 37: "TPM_ALG_SYMCIPHER", 38: "TPM_ALG_CAMELLIA", 64: "TPM_ALG_CTR", 65: "TPM_ALG_OFB", 66: "TPM_ALG_CBC", 67: "TPM_ALG_CFB", 68: "TPM_ALG_ECB" };
var Fy = { 0: "TPM_ECC_NONE", 1: "TPM_ECC_NIST_P192", 2: "TPM_ECC_NIST_P224", 3: "TPM_ECC_NIST_P256", 4: "TPM_ECC_NIST_P384", 5: "TPM_ECC_NIST_P521", 16: "TPM_ECC_BN_P256", 17: "TPM_ECC_BN_P638", 32: "TPM_ECC_SM2_P256" };
var Gy = { "id:414D4400": { name: "AMD", id: "AMD" }, "id:414E5400": { name: "Ant Group", id: "ANT" }, "id:41544D4C": { name: "Atmel", id: "ATML" }, "id:4252434D": { name: "Broadcom", id: "BRCM" }, "id:4353434F": { name: "Cisco", id: "CSCO" }, "id:464C5953": { name: "Flyslice Technologies", id: "FLYS" }, "id:524F4343": { name: "Fuzhou Rockchip", id: "ROCC" }, "id:474F4F47": { name: "Google", id: "GOOG" }, "id:48504900": { name: "HPI", id: "HPI" }, "id:48504500": { name: "HPE", id: "HPE" }, "id:48495349": { name: "Huawei", id: "HISI" }, "id:49424d00": { name: "IBM", id: "IBM" }, "id:49424D00": { name: "IBM", id: "IBM" }, "id:49465800": { name: "Infineon", id: "IFX" }, "id:494E5443": { name: "Intel", id: "INTC" }, "id:4C454E00": { name: "Lenovo", id: "LEN" }, "id:4D534654": { name: "Microsoft", id: "MSFT" }, "id:4E534D20": { name: "National Semiconductor", id: "NSM" }, "id:4E545A00": { name: "Nationz", id: "NTZ" }, "id:4E534700": { name: "NSING", id: "NSG" }, "id:4E544300": { name: "Nuvoton Technology", id: "NTC" }, "id:51434F4D": { name: "Qualcomm", id: "QCOM" }, "id:534D534E": { name: "Samsung", id: "SMSN" }, "id:53454345": { name: "SecEdge", id: "SECE" }, "id:534E5300": { name: "Sinosun", id: "SNS" }, "id:534D5343": { name: "SMSC", id: "SMSC" }, "id:53544D20": { name: "STMicroelectronics", id: "STM" }, "id:54584E00": { name: "Texas Instruments", id: "TXN" }, "id:57454300": { name: "Winbond", id: "WEC" }, "id:5345414C": { name: "Wisekey", id: "SEAL" }, "id:FFFFF1D0": { name: "FIDO Alliance", id: "FIDO" } };
var Wy = { TPM_ECC_NIST_P256: 1, TPM_ECC_NIST_P384: 2, TPM_ECC_NIST_P521: 3, TPM_ECC_BN_P256: 1, TPM_ECC_SM2_P256: 1 };
function $y(t15) {
  let e = 0, r = U.toDataView(t15), o = r.getUint32(e);
  e += 4;
  let n = r.getUint16(e);
  e += 2;
  let i = Vy[n], s = r.getUint16(e);
  e += 2;
  let c = t15.slice(e, e += s), l = r.getUint16(e);
  e += 2;
  let f = t15.slice(e, e += l), d = t15.slice(e, e += 8), h = r.getUint32(e);
  e += 4;
  let g = r.getUint32(e);
  e += 4;
  let C = !!t15.slice(e, e += 1), k = { clock: d, resetCount: h, restartCount: g, safe: C }, j = t15.slice(e, e += 8), D = r.getUint16(e);
  e += 2;
  let F = t15.slice(e, e += D), ne = U.toDataView(F), J = r.getUint16(e);
  e += 2;
  let b = t15.slice(e, e += J), T = { nameAlg: Ar[ne.getUint16(0)], nameAlgBuffer: F.slice(0, 2), name: F, qualifiedName: b };
  return { magic: o, type: i, qualifiedSigner: c, extraData: f, clockInfo: k, firmwareVersion: j, attested: T };
}
__name($y, "$y");
function Ky(t15) {
  let e = 0, r = U.toDataView(t15), o = Ar[r.getUint16(e)];
  e += 2;
  let n = Ar[r.getUint16(e)];
  e += 2;
  let i = r.getUint32(e);
  e += 4;
  let s = { fixedTPM: !!(i & 1), stClear: !!(i & 2), fixedParent: !!(i & 8), sensitiveDataOrigin: !!(i & 16), userWithAuth: !!(i & 32), adminWithPolicy: !!(i & 64), noDA: !!(i & 512), encryptedDuplication: !!(i & 1024), restricted: !!(i & 32768), decrypt: !!(i & 65536), signOrEncrypt: !!(i & 131072) }, c = r.getUint16(e);
  e += 2;
  let l = t15.slice(e, e += c), f = {}, d = Uint8Array.from([]);
  if (o === "TPM_ALG_RSA") {
    let h = Ar[r.getUint16(e)];
    e += 2;
    let g = Ar[r.getUint16(e)];
    e += 2;
    let C = r.getUint16(e);
    e += 2;
    let k = r.getUint32(e);
    e += 4, f.rsa = { symmetric: h, scheme: g, keyBits: C, exponent: k };
    let j = r.getUint16(e);
    e += 2, d = t15.slice(e, e += j);
  } else if (o === "TPM_ALG_ECC") {
    let h = Ar[r.getUint16(e)];
    e += 2;
    let g = Ar[r.getUint16(e)];
    e += 2;
    let C = Fy[r.getUint16(e)];
    e += 2;
    let k = Ar[r.getUint16(e)];
    e += 2, f.ecc = { symmetric: h, scheme: g, curveID: C, kdf: k };
    let j = r.getUint16(e);
    e += 2;
    let D = t15.slice(e, e += j), F = r.getUint16(e);
    e += 2;
    let ne = t15.slice(e, e += F);
    d = U.concat([D, ne]);
  } else
    throw new Error(`Unexpected type "${o}" (TPM)`);
  return { type: o, nameAlg: n, objectAttributes: s, authPolicy: l, parameters: f, unique: d };
}
__name(Ky, "Ky");
async function qy(t15) {
  let { aaguid: e, attStmt: r, authData: o, credentialPublicKey: n, clientDataHash: i, rootCertificates: s } = t15, c = r.get("ver"), l = r.get("sig"), f = r.get("alg"), d = r.get("x5c"), h = r.get("pubArea"), g = r.get("certInfo");
  if (c !== "2.0")
    throw new Error(`Unexpected ver "${c}", expected "2.0" (TPM)`);
  if (!l)
    throw new Error("No attestation signature provided in attestation statement (TPM)");
  if (!f)
    throw new Error("Attestation statement did not contain alg (TPM)");
  if (!Yt(f))
    throw new Error(`Attestation statement contained invalid alg ${f} (TPM)`);
  if (!d)
    throw new Error("No attestation certificate provided in attestation statement (TPM)");
  if (!h)
    throw new Error("Attestation statement did not contain pubArea (TPM)");
  if (!g)
    throw new Error("Attestation statement did not contain certInfo (TPM)");
  let C = Ky(h), { unique: k, type: j, parameters: D } = C, F = Qr(n);
  if (j === "TPM_ALG_RSA") {
    if (!Ln(F))
      throw new Error(`Credential public key with kty ${F.get(q.kty)} did not match ${j}`);
    let z = F.get(q.n), ct = F.get(q.e);
    if (!z)
      throw new Error("COSE public key missing n (TPM|RSA)");
    if (!ct)
      throw new Error("COSE public key missing e (TPM|RSA)");
    if (!U.areEqual(k, z))
      throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");
    if (!D.rsa)
      throw new Error("Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)");
    let qr = ct, Xr = D.rsa.exponent || 65537, Lo = qr[0] + (qr[1] << 8) + (qr[2] << 16);
    if (Xr !== Lo)
      throw new Error(`Unexpected public key exp ${Lo}, expected ${Xr} (TPM|RSA)`);
  } else if (j === "TPM_ALG_ECC") {
    if (!zr(F))
      throw new Error(`Credential public key with kty ${F.get(q.kty)} did not match ${j}`);
    let z = F.get(q.crv), ct = F.get(q.x), qr = F.get(q.y);
    if (!z)
      throw new Error("COSE public key missing crv (TPM|ECC)");
    if (!ct)
      throw new Error("COSE public key missing x (TPM|ECC)");
    if (!qr)
      throw new Error("COSE public key missing y (TPM|ECC)");
    if (!U.areEqual(k, U.concat([ct, qr])))
      throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");
    if (!D.ecc)
      throw new Error("Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)");
    let Xr = D.ecc.curveID, Lo = Wy[Xr];
    if (Lo !== z)
      throw new Error(`Public area key curve ID "${Xr}" mapped to "${Lo}" which did not match public key crv of "${z}" (TPM|ECC)`);
  } else
    throw new Error(`Unsupported pubArea.type "${j}"`);
  let ne = $y(g), { magic: J, type: b, attested: T, extraData: H } = ne;
  if (J !== 4283712327)
    throw new Error(`Unexpected magic value "${J}", expected "0xff544347" (TPM)`);
  if (b !== "TPM_ST_ATTEST_CERTIFY")
    throw new Error(`Unexpected type "${b}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);
  let Y = await pt(h, d0(T.nameAlg)), se = U.concat([T.nameAlgBuffer, Y]);
  if (!U.areEqual(T.name, se))
    throw new Error("Attested name comparison failed (TPM)");
  let he = U.concat([o, i]), Le = await pt(he, f);
  if (!U.areEqual(H, Le))
    throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");
  if (d.length < 1)
    throw new Error("No certificates present in x5c array (TPM)");
  let yt = ni(d[0]), { basicConstraintsCA: Dt, version: Kr, subject: Be, notAfter: He, notBefore: Ve } = yt;
  if (Dt)
    throw new Error("Certificate basic constraints CA was not `false` (TPM)");
  if (Kr !== 2)
    throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");
  if (Be.combined.length > 0)
    throw new Error("Certificate subject was not empty (TPM)");
  let Uo = /* @__PURE__ */ new Date();
  if (Ve > Uo)
    throw new Error(`Certificate not good before "${Ve.toString()}" (TPM)`);
  if (Uo = /* @__PURE__ */ new Date(), He < Uo)
    throw new Error(`Certificate not good after "${He.toString()}" (TPM)`);
  let qt = pe.parse(d[0], Ae);
  if (!qt.tbsCertificate.extensions)
    throw new Error("Certificate was missing extensions (TPM)");
  let br, xr;
  if (qt.tbsCertificate.extensions.forEach((z) => {
    z.extnID === oi ? br = pe.parse(z.extnValue, ri) : z.extnID === Yn && (xr = pe.parse(z.extnValue, ln));
  }), !br)
    throw new Error("Certificate did not contain subjectAltName extension (TPM)");
  if (!br[0].directoryName?.[0].length)
    throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");
  let { tcgAtTpmManufacturer: at, tcgAtTpmModel: V, tcgAtTpmVersion: Xt } = p0(br[0].directoryName);
  if (!at || !V || !Xt)
    throw new Error("Certificate contained incomplete subjectAltName data (TPM)");
  if (!xr)
    throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");
  if (!Gy[at])
    throw new Error(`Could not match TPM manufacturer "${at}" (TPM)`);
  if (xr[0] !== "2.23.133.8.3")
    throw new Error(`Unexpected extKeyUsage "${xr[0]}", expected "2.23.133.8.3" (TPM)`);
  try {
    await Au(qt.tbsCertificate.extensions, e);
  } catch (z) {
    let ct = z;
    throw new Error(`${ct.message} (TPM)`);
  }
  let Dn = await Do.getStatement(e);
  if (Dn)
    try {
      await jo({ statement: Dn, credentialPublicKey: n, x5c: d, attestationStatementAlg: f });
    } catch (z) {
      let ct = z;
      throw new Error(`${ct.message} (TPM)`);
    }
  else
    try {
      await qe(d.map(Se), s);
    } catch (z) {
      let ct = z;
      throw new Error(`${ct.message} (TPM)`);
    }
  return dt({ signature: l, data: g, x509Certificate: d[0], hashAlgorithm: f });
}
__name(qy, "qy");
function p0(t15) {
  let e = "2.23.133.2.1", r = "2.23.133.2.2", o = "2.23.133.2.3", n, i, s;
  return t15.forEach((c) => {
    c.forEach((l) => {
      l.type === e ? n = l.value.toString() : l.type === r ? i = l.value.toString() : l.type === o && (s = l.value.toString());
    });
  }), { tcgAtTpmManufacturer: n, tcgAtTpmModel: i, tcgAtTpmVersion: s };
}
__name(p0, "p0");
function d0(t15) {
  if (t15 === "TPM_ALG_SHA256")
    return X.ES256;
  if (t15 === "TPM_ALG_SHA384")
    return X.ES384;
  if (t15 === "TPM_ALG_SHA512")
    return X.ES512;
  throw new Error(`Unexpected TPM attested name alg ${t15}`);
}
__name(d0, "d0");
var Qf;
var Xy = "1.3.6.1.4.1.11129.2.1.17";
var Yf;
(function(t15) {
  t15[t15.verified = 0] = "verified", t15[t15.selfSigned = 1] = "selfSigned", t15[t15.unverified = 2] = "unverified", t15[t15.failed = 3] = "failed";
})(Yf || (Yf = {}));
var Rn = /* @__PURE__ */ __name(class {
  verifiedBootKey = new S();
  deviceLocked = false;
  verifiedBootState = Yf.verified;
  verifiedBootHash;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Rn");
a([u({ type: S })], Rn.prototype, "verifiedBootKey", void 0);
a([u({ type: p.Boolean })], Rn.prototype, "deviceLocked", void 0);
a([u({ type: p.Enumerated })], Rn.prototype, "verifiedBootState", void 0);
a([u({ type: S, optional: true })], Rn.prototype, "verifiedBootHash", void 0);
var Vi = Qf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Qf.prototype);
  }
}, "Qf");
Vi = Qf = a([v({ type: m.Set, itemType: p.Integer })], Vi);
var W = /* @__PURE__ */ __name(class {
  purpose;
  algorithm;
  keySize;
  digest;
  padding;
  ecCurve;
  rsaPublicExponent;
  mgfDigest;
  rollbackResistance;
  earlyBootOnly;
  activeDateTime;
  originationExpireDateTime;
  usageExpireDateTime;
  usageCountLimit;
  noAuthRequired;
  userAuthType;
  authTimeout;
  allowWhileOnBody;
  trustedUserPresenceRequired;
  trustedConfirmationRequired;
  unlockedDeviceRequired;
  allApplications;
  applicationId;
  creationDateTime;
  origin;
  rollbackResistant;
  rootOfTrust;
  osVersion;
  osPatchLevel;
  attestationApplicationId;
  attestationIdBrand;
  attestationIdDevice;
  attestationIdProduct;
  attestationIdSerial;
  attestationIdImei;
  attestationIdMeid;
  attestationIdManufacturer;
  attestationIdModel;
  vendorPatchLevel;
  bootPatchLevel;
  deviceUniqueAttestation;
  attestationIdSecondImei;
  moduleHash;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "W");
a([u({ context: 1, type: Vi, optional: true })], W.prototype, "purpose", void 0);
a([u({ context: 2, type: p.Integer, optional: true })], W.prototype, "algorithm", void 0);
a([u({ context: 3, type: p.Integer, optional: true })], W.prototype, "keySize", void 0);
a([u({ context: 5, type: Vi, optional: true })], W.prototype, "digest", void 0);
a([u({ context: 6, type: Vi, optional: true })], W.prototype, "padding", void 0);
a([u({ context: 10, type: p.Integer, optional: true })], W.prototype, "ecCurve", void 0);
a([u({ context: 200, type: p.Integer, optional: true })], W.prototype, "rsaPublicExponent", void 0);
a([u({ context: 203, type: Vi, optional: true })], W.prototype, "mgfDigest", void 0);
a([u({ context: 303, type: p.Null, optional: true })], W.prototype, "rollbackResistance", void 0);
a([u({ context: 305, type: p.Null, optional: true })], W.prototype, "earlyBootOnly", void 0);
a([u({ context: 400, type: p.Integer, optional: true })], W.prototype, "activeDateTime", void 0);
a([u({ context: 401, type: p.Integer, optional: true })], W.prototype, "originationExpireDateTime", void 0);
a([u({ context: 402, type: p.Integer, optional: true })], W.prototype, "usageExpireDateTime", void 0);
a([u({ context: 405, type: p.Integer, optional: true })], W.prototype, "usageCountLimit", void 0);
a([u({ context: 503, type: p.Null, optional: true })], W.prototype, "noAuthRequired", void 0);
a([u({ context: 504, type: p.Integer, optional: true })], W.prototype, "userAuthType", void 0);
a([u({ context: 505, type: p.Integer, optional: true })], W.prototype, "authTimeout", void 0);
a([u({ context: 506, type: p.Null, optional: true })], W.prototype, "allowWhileOnBody", void 0);
a([u({ context: 507, type: p.Null, optional: true })], W.prototype, "trustedUserPresenceRequired", void 0);
a([u({ context: 508, type: p.Null, optional: true })], W.prototype, "trustedConfirmationRequired", void 0);
a([u({ context: 509, type: p.Null, optional: true })], W.prototype, "unlockedDeviceRequired", void 0);
a([u({ context: 600, type: p.Null, optional: true })], W.prototype, "allApplications", void 0);
a([u({ context: 601, type: S, optional: true })], W.prototype, "applicationId", void 0);
a([u({ context: 701, type: p.Integer, optional: true })], W.prototype, "creationDateTime", void 0);
a([u({ context: 702, type: p.Integer, optional: true })], W.prototype, "origin", void 0);
a([u({ context: 703, type: p.Null, optional: true })], W.prototype, "rollbackResistant", void 0);
a([u({ context: 704, type: Rn, optional: true })], W.prototype, "rootOfTrust", void 0);
a([u({ context: 705, type: p.Integer, optional: true })], W.prototype, "osVersion", void 0);
a([u({ context: 706, type: p.Integer, optional: true })], W.prototype, "osPatchLevel", void 0);
a([u({ context: 709, type: S, optional: true })], W.prototype, "attestationApplicationId", void 0);
a([u({ context: 710, type: S, optional: true })], W.prototype, "attestationIdBrand", void 0);
a([u({ context: 711, type: S, optional: true })], W.prototype, "attestationIdDevice", void 0);
a([u({ context: 712, type: S, optional: true })], W.prototype, "attestationIdProduct", void 0);
a([u({ context: 713, type: S, optional: true })], W.prototype, "attestationIdSerial", void 0);
a([u({ context: 714, type: S, optional: true })], W.prototype, "attestationIdImei", void 0);
a([u({ context: 715, type: S, optional: true })], W.prototype, "attestationIdMeid", void 0);
a([u({ context: 716, type: S, optional: true })], W.prototype, "attestationIdManufacturer", void 0);
a([u({ context: 717, type: S, optional: true })], W.prototype, "attestationIdModel", void 0);
a([u({ context: 718, type: p.Integer, optional: true })], W.prototype, "vendorPatchLevel", void 0);
a([u({ context: 719, type: p.Integer, optional: true })], W.prototype, "bootPatchLevel", void 0);
a([u({ context: 720, type: p.Null, optional: true })], W.prototype, "deviceUniqueAttestation", void 0);
a([u({ context: 723, type: S, optional: true })], W.prototype, "attestationIdSecondImei", void 0);
a([u({ context: 724, type: S, optional: true })], W.prototype, "moduleHash", void 0);
var $r;
(function(t15) {
  t15[t15.software = 0] = "software", t15[t15.trustedEnvironment = 1] = "trustedEnvironment", t15[t15.strongBox = 2] = "strongBox";
})($r || ($r = {}));
var Fi;
(function(t15) {
  t15[t15.KM2 = 1] = "KM2", t15[t15.KM3 = 2] = "KM3", t15[t15.KM4 = 3] = "KM4", t15[t15.KM4_1 = 4] = "KM4_1", t15[t15.keyMint1 = 100] = "keyMint1", t15[t15.keyMint2 = 200] = "keyMint2", t15[t15.keyMint3 = 300] = "keyMint3", t15[t15.keyMint4 = 400] = "keyMint4";
})(Fi || (Fi = {}));
var mt = /* @__PURE__ */ __name(class {
  attestationVersion = Fi.KM4;
  attestationSecurityLevel = $r.software;
  keymasterVersion = 0;
  keymasterSecurityLevel = $r.software;
  attestationChallenge = new S();
  uniqueId = new S();
  softwareEnforced = new W();
  teeEnforced = new W();
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "mt");
a([u({ type: p.Integer })], mt.prototype, "attestationVersion", void 0);
a([u({ type: p.Enumerated })], mt.prototype, "attestationSecurityLevel", void 0);
a([u({ type: p.Integer })], mt.prototype, "keymasterVersion", void 0);
a([u({ type: p.Enumerated })], mt.prototype, "keymasterSecurityLevel", void 0);
a([u({ type: S })], mt.prototype, "attestationChallenge", void 0);
a([u({ type: S })], mt.prototype, "uniqueId", void 0);
a([u({ type: W })], mt.prototype, "softwareEnforced", void 0);
a([u({ type: W })], mt.prototype, "teeEnforced", void 0);
var wr = /* @__PURE__ */ __name(class t14 {
  attestationVersion = Fi.keyMint4;
  attestationSecurityLevel = $r.software;
  keyMintVersion = 0;
  keyMintSecurityLevel = $r.software;
  attestationChallenge = new S();
  uniqueId = new S();
  softwareEnforced = new W();
  hardwareEnforced = new W();
  constructor(e = {}) {
    Object.assign(this, e);
  }
  toLegacyKeyDescription() {
    return new mt({ attestationVersion: this.attestationVersion, attestationSecurityLevel: this.attestationSecurityLevel, keymasterVersion: this.keyMintVersion, keymasterSecurityLevel: this.keyMintSecurityLevel, attestationChallenge: this.attestationChallenge, uniqueId: this.uniqueId, softwareEnforced: this.softwareEnforced, teeEnforced: this.hardwareEnforced });
  }
  static fromLegacyKeyDescription(e) {
    return new t14({ attestationVersion: e.attestationVersion, attestationSecurityLevel: e.attestationSecurityLevel, keyMintVersion: e.keymasterVersion, keyMintSecurityLevel: e.keymasterSecurityLevel, attestationChallenge: e.attestationChallenge, uniqueId: e.uniqueId, softwareEnforced: e.softwareEnforced, hardwareEnforced: e.teeEnforced });
  }
}, "t");
a([u({ type: p.Integer })], wr.prototype, "attestationVersion", void 0);
a([u({ type: p.Enumerated })], wr.prototype, "attestationSecurityLevel", void 0);
a([u({ type: p.Integer })], wr.prototype, "keyMintVersion", void 0);
a([u({ type: p.Enumerated })], wr.prototype, "keyMintSecurityLevel", void 0);
a([u({ type: S })], wr.prototype, "attestationChallenge", void 0);
a([u({ type: S })], wr.prototype, "uniqueId", void 0);
a([u({ type: W })], wr.prototype, "softwareEnforced", void 0);
a([u({ type: W })], wr.prototype, "hardwareEnforced", void 0);
var Zf;
var ep = /* @__PURE__ */ __name(class extends W {
}, "ep");
ep = a([v({ type: m.Choice })], ep);
var Gi = Zf = /* @__PURE__ */ __name(class extends R {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, Zf.prototype);
  }
  findProperty(e) {
    let r = this.find((o) => o[e] !== void 0);
    if (r)
      return r[e];
  }
}, "Zf");
Gi = Zf = a([v({ type: m.Sequence, itemType: ep })], Gi);
var Kt = /* @__PURE__ */ __name(class {
  attestationVersion = Fi.KM4;
  attestationSecurityLevel = $r.software;
  keymasterVersion = 0;
  keymasterSecurityLevel = $r.software;
  attestationChallenge = new S();
  uniqueId = new S();
  softwareEnforced = new Gi();
  teeEnforced = new Gi();
  get keyMintVersion() {
    return this.keymasterVersion;
  }
  set keyMintVersion(e) {
    this.keymasterVersion = e;
  }
  get keyMintSecurityLevel() {
    return this.keymasterSecurityLevel;
  }
  set keyMintSecurityLevel(e) {
    this.keymasterSecurityLevel = e;
  }
  get hardwareEnforced() {
    return this.teeEnforced;
  }
  set hardwareEnforced(e) {
    this.teeEnforced = e;
  }
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Kt");
a([u({ type: p.Integer })], Kt.prototype, "attestationVersion", void 0);
a([u({ type: p.Enumerated })], Kt.prototype, "attestationSecurityLevel", void 0);
a([u({ type: p.Integer })], Kt.prototype, "keymasterVersion", void 0);
a([u({ type: p.Enumerated })], Kt.prototype, "keymasterSecurityLevel", void 0);
a([u({ type: S })], Kt.prototype, "attestationChallenge", void 0);
a([u({ type: S })], Kt.prototype, "uniqueId", void 0);
a([u({ type: Gi })], Kt.prototype, "softwareEnforced", void 0);
a([u({ type: Gi })], Kt.prototype, "teeEnforced", void 0);
var zy = /* @__PURE__ */ __name(class extends Kt {
  constructor(e = {}) {
    "keymasterVersion" in e && !("keyMintVersion" in e) && (e.keyMintVersion = e.keymasterVersion), "keymasterSecurityLevel" in e && !("keyMintSecurityLevel" in e) && (e.keyMintSecurityLevel = e.keymasterSecurityLevel), "teeEnforced" in e && !("hardwareEnforced" in e) && (e.hardwareEnforced = e.teeEnforced), super(e);
  }
}, "zy");
zy = a([v({ type: m.Sequence })], zy);
var Da = /* @__PURE__ */ __name(class {
  packageName;
  version;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "Da");
a([u({ type: p.OctetString })], Da.prototype, "packageName", void 0);
a([u({ type: p.Integer })], Da.prototype, "version", void 0);
var wu = /* @__PURE__ */ __name(class {
  packageInfos;
  signatureDigests;
  constructor(e = {}) {
    Object.assign(this, e);
  }
}, "wu");
a([u({ type: Da, repeated: "set" })], wu.prototype, "packageInfos", void 0);
a([u({ type: p.OctetString, repeated: "set" })], wu.prototype, "signatureDigests", void 0);
async function Jy(t15) {
  let { authData: e, clientDataHash: r, attStmt: o, credentialPublicKey: n, aaguid: i, rootCertificates: s } = t15, c = o.get("x5c"), l = o.get("sig"), f = o.get("alg");
  if (!c)
    throw new Error("No attestation certificate provided in attestation statement (Android Key)");
  if (!l)
    throw new Error("No attestation signature provided in attestation statement (Android Key)");
  if (!f)
    throw new Error("Attestation statement did not contain alg (Android Key)");
  if (!Yt(f))
    throw new Error(`Attestation statement contained invalid alg ${f} (Android Key)`);
  let d = pe.parse(c[0], Ae), h = new Uint8Array(d.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey), g = Vn(n);
  if (!U.areEqual(g, h))
    throw new Error("Credential public key does not equal leaf cert public key (Android Key)");
  let C = d.tbsCertificate.extensions?.find((b) => b.extnID === Xy);
  if (!C)
    throw new Error("Certificate did not contain extKeyStore (Android Key)");
  let k = pe.parse(C.extnValue, mt), { attestationChallenge: j, teeEnforced: D, softwareEnforced: F } = k;
  if (!U.areEqual(new Uint8Array(j.buffer), r))
    throw new Error("Attestation challenge was not equal to client data hash (Android Key)");
  if (D.allApplications !== void 0)
    throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');
  if (F.allApplications !== void 0)
    throw new Error('teeEnforced contained "allApplications [600]" tag (Android Key)');
  let ne = await Do.getStatement(i);
  if (ne)
    try {
      await jo({ statement: ne, credentialPublicKey: n, x5c: c, attestationStatementAlg: f });
    } catch (b) {
      let T = b;
      throw new Error(`${T.message} (Android Key)`, { cause: T });
    }
  else {
    let b = c.slice(0, -1).map(Se), T = c.slice(-1).map(Se);
    try {
      await qe(b, T);
    } catch (H) {
      let Y = H;
      throw new Error(`${Y.message} (Android Key)`, { cause: Y });
    }
    if (s.length > 0 && s.indexOf(T[0]) < 0)
      throw new Error("x5c root certificate was not a known root certificate (Android Key)");
  }
  let J = U.concat([e, r]);
  return dt({ signature: l, data: J, x509Certificate: c[0], hashAlgorithm: f });
}
__name(Jy, "Jy");
async function Qy(t15) {
  let { attStmt: e, authData: r, clientDataHash: o, credentialPublicKey: n, rootCertificates: i } = t15, s = e.get("x5c");
  if (!s)
    throw new Error("No attestation certificate provided in attestation statement (Apple)");
  try {
    await qe(s.map(Se), i);
  } catch (D) {
    let F = D;
    throw new Error(`${F.message} (Apple)`);
  }
  let c = pe.parse(s[0], Ae), { extensions: l, subjectPublicKeyInfo: f } = c.tbsCertificate;
  if (!l)
    throw new Error("credCert missing extensions (Apple)");
  let d = l.find((D) => D.extnID === "1.2.840.113635.100.8.2");
  if (!d)
    throw new Error('credCert missing "1.2.840.113635.100.8.2" extension (Apple)');
  let h = U.concat([r, o]), g = await pt(h), C = new Uint8Array(d.extnValue.buffer).slice(6);
  if (!U.areEqual(g, C))
    throw new Error("credCert nonce was not expected value (Apple)");
  let k = Vn(n), j = new Uint8Array(f.subjectPublicKey);
  if (!U.areEqual(k, j))
    throw new Error("Credential public key does not equal credCert public key (Apple)");
  return true;
}
__name(Qy, "Qy");
async function Yy(t15) {
  let { response: e, expectedChallenge: r, expectedOrigin: o, expectedRPID: n, expectedType: i, requireUserPresence: s = true, requireUserVerification: c = true, supportedAlgorithmIDs: l = ky, attestationSafetyNetEnforceCTSCheck: f = true } = t15, { id: d, rawId: h, type: g, response: C } = e;
  if (!d)
    throw new Error("Missing credential ID");
  if (d !== h)
    throw new Error("Credential ID was not base64url-encoded");
  if (g !== "public-key")
    throw new Error(`Unexpected credential type ${g}, expected "public-key"`);
  let k = Fa(C.clientDataJSON), { type: j, origin: D, challenge: F, tokenBinding: ne } = k;
  if (Array.isArray(i)) {
    if (!i.includes(j)) {
      let z = i.join(", ");
      throw new Error(`Unexpected registration response type "${j}", expected one of: ${z}`);
    }
  } else if (i) {
    if (j !== i)
      throw new Error(`Unexpected registration response type "${j}", expected "${i}"`);
  } else if (j !== "webauthn.create")
    throw new Error(`Unexpected registration response type: ${j}`);
  if (typeof r == "function") {
    if (!await r(F))
      throw new Error(`Custom challenge verifier returned false for registration response challenge "${F}"`);
  } else if (F !== r)
    throw new Error(`Unexpected registration response challenge "${F}", expected "${r}"`);
  if (Array.isArray(o)) {
    if (!o.includes(D))
      throw new Error(`Unexpected registration response origin "${D}", expected one of: ${o.join(", ")}`);
  } else if (D !== o)
    throw new Error(`Unexpected registration response origin "${D}", expected "${o}"`);
  if (ne) {
    if (typeof ne != "object")
      throw new Error(`Unexpected value for TokenBinding "${ne}"`);
    if (["present", "supported", "not-supported"].indexOf(ne.status) < 0)
      throw new Error(`Unexpected tokenBinding.status value of "${ne.status}"`);
  }
  let J = G.toBuffer(C.attestationObject), b = xp(J), T = b.get("fmt"), H = b.get("authData"), Y = b.get("attStmt"), se = hu(H), { aaguid: he, rpIdHash: Le, flags: yt, credentialID: Dt, counter: Kr, credentialPublicKey: Be, extensionsData: He } = se, Ve;
  if (n) {
    let z = [];
    typeof n == "string" ? z = [n] : z = n, Ve = await vu(Le, z);
  }
  if (s && !yt.up)
    throw new Error("User presence was required, but user was not present");
  if (c && !yt.uv)
    throw new Error("User verification was required, but user could not be verified");
  if (!Dt)
    throw new Error("No credential ID was provided by authenticator");
  if (!Be)
    throw new Error("No public key was provided by authenticator");
  if (!he)
    throw new Error("No AAGUID was present during registration");
  let qt = Qr(Be).get(q.alg);
  if (typeof qt != "number")
    throw new Error("Credential public key was missing numeric alg");
  if (!l.includes(qt)) {
    let z = l.join(", ");
    throw new Error(`Unexpected public key alg "${qt}", expected one of "${z}"`);
  }
  let br = await pt(G.toBuffer(C.clientDataJSON)), xr = Mo.getRootCertificates({ identifier: T }), at = { aaguid: he, attStmt: Y, authData: H, clientDataHash: br, credentialID: Dt, credentialPublicKey: Be, rootCertificates: xr, rpIdHash: Le, attestationSafetyNetEnforceCTSCheck: f }, V = false;
  if (T === "fido-u2f")
    V = await Ry(at);
  else if (T === "packed")
    V = await Ly(at);
  else if (T === "android-safetynet")
    V = await Hy(at);
  else if (T === "android-key")
    V = await Jy(at);
  else if (T === "tpm")
    V = await qy(at);
  else if (T === "apple")
    V = await Qy(at);
  else if (T === "none") {
    if (Y.size > 0)
      throw new Error("None attestation had unexpected attestation statement");
    V = true;
  } else
    throw new Error(`Unsupported Attestation Format: ${T}`);
  if (!V)
    return { verified: false };
  let { credentialDeviceType: Xt, credentialBackedUp: Dn } = gu(yt);
  return { verified: true, registrationInfo: { fmt: T, aaguid: Va(he), credentialType: g, credential: { id: G.fromBuffer(Dt), publicKey: Be, counter: Kr, transports: e.response.transports }, attestationObject: J, userVerified: yt.uv, credentialDeviceType: Xt, credentialBackedUp: Dn, origin: k.origin, rpID: Ve, authenticatorExtensionResults: He } };
}
__name(Yy, "Yy");
async function Zy(t15) {
  let { allowCredentials: e, challenge: r = await yu(), timeout: o = 6e4, userVerification: n = "preferred", extensions: i, rpID: s } = t15, c = r;
  return typeof c == "string" && (c = U.fromUTF8String(c)), { rpId: s, challenge: G.fromBuffer(c), allowCredentials: e?.map((l) => {
    if (!G.isBase64URL(l.id))
      throw new Error(`allowCredential id "${l.id}" is not a valid base64url string`);
    return { ...l, id: G.trimPadding(l.id), type: "public-key" };
  }), timeout: o, userVerification: n, extensions: i };
}
__name(Zy, "Zy");
async function eg(t15) {
  let { response: e, expectedChallenge: r, expectedOrigin: o, expectedRPID: n, expectedType: i, credential: s, requireUserVerification: c = true, advancedFIDOConfig: l } = t15, { id: f, rawId: d, type: h, response: g } = e;
  if (!f)
    throw new Error("Missing credential ID");
  if (f !== d)
    throw new Error("Credential ID was not base64url-encoded");
  if (h !== "public-key")
    throw new Error(`Unexpected credential type ${h}, expected "public-key"`);
  if (!e)
    throw new Error("Credential missing response");
  if (typeof g?.clientDataJSON != "string")
    throw new Error("Credential response clientDataJSON was not a string");
  let C = Fa(g.clientDataJSON), { type: k, origin: j, challenge: D, tokenBinding: F } = C;
  if (Array.isArray(i)) {
    if (!i.includes(k)) {
      let Ve = i.join(", ");
      throw new Error(`Unexpected authentication response type "${k}", expected one of: ${Ve}`);
    }
  } else if (i) {
    if (k !== i)
      throw new Error(`Unexpected authentication response type "${k}", expected "${i}"`);
  } else if (k !== "webauthn.get")
    throw new Error(`Unexpected authentication response type: ${k}`);
  if (typeof r == "function") {
    if (!await r(D))
      throw new Error(`Custom challenge verifier returned false for registration response challenge "${D}"`);
  } else if (D !== r)
    throw new Error(`Unexpected authentication response challenge "${D}", expected "${r}"`);
  if (Array.isArray(o)) {
    if (!o.includes(j)) {
      let Ve = o.join(", ");
      throw new Error(`Unexpected authentication response origin "${j}", expected one of: ${Ve}`);
    }
  } else if (j !== o)
    throw new Error(`Unexpected authentication response origin "${j}", expected "${o}"`);
  if (!G.isBase64URL(g.authenticatorData))
    throw new Error("Credential response authenticatorData was not a base64url string");
  if (!G.isBase64URL(g.signature))
    throw new Error("Credential response signature was not a base64url string");
  if (g.userHandle && typeof g.userHandle != "string")
    throw new Error("Credential response userHandle was not a string");
  if (F) {
    if (typeof F != "object")
      throw new Error("ClientDataJSON tokenBinding was not an object");
    if (["present", "supported", "notSupported"].indexOf(F.status) < 0)
      throw new Error(`Unexpected tokenBinding status ${F.status}`);
  }
  let ne = G.toBuffer(g.authenticatorData), J = hu(ne), { rpIdHash: b, flags: T, counter: H, extensionsData: Y } = J, se = [];
  typeof n == "string" ? se = [n] : se = n;
  let he = await vu(b, se);
  if (l !== void 0) {
    let { userVerification: Ve } = l;
    if (Ve === "required" && !T.uv)
      throw new Error("User verification required, but user could not be verified");
  } else {
    if (!T.up)
      throw new Error("User not present during authentication");
    if (c && !T.uv)
      throw new Error("User verification required, but user could not be verified");
  }
  let Le = await pt(G.toBuffer(g.clientDataJSON)), yt = U.concat([ne, Le]), Dt = G.toBuffer(g.signature);
  if ((H > 0 || s.counter > 0) && H <= s.counter)
    throw new Error(`Response counter value ${H} was lower than expected ${s.counter}`);
  let { credentialDeviceType: Kr, credentialBackedUp: Be } = gu(T);
  return { verified: await dt({ signature: Dt, data: yt, credentialPublicKey: s.publicKey }), authenticationInfo: { newCounter: H, credentialID: s.id, userVerified: T.uv, credentialDeviceType: Kr, credentialBackedUp: Be, authenticatorExtensionResults: Y, origin: C.origin, rpID: he } };
}
__name(eg, "eg");
var h0 = ["CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, created INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS creds (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, public_key TEXT NOT NULL, counter INTEGER NOT NULL, transports TEXT, created INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS challenges (id TEXT PRIMARY KEY, challenge TEXT NOT NULL, user_id TEXT, name TEXT, expires INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS gardens (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, name TEXT NOT NULL, updated INTEGER NOT NULL, size INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS allotments (id TEXT PRIMARY KEY, name TEXT NOT NULL, keeper_id TEXT NOT NULL, created INTEGER NOT NULL)", "CREATE TABLE IF NOT EXISTS members (allotment_id TEXT NOT NULL, user_id TEXT NOT NULL, joined INTEGER NOT NULL, PRIMARY KEY (allotment_id, user_id))", "CREATE TABLE IF NOT EXISTS plots (allotment_id TEXT NOT NULL, garden_id TEXT NOT NULL, added INTEGER NOT NULL, PRIMARY KEY (allotment_id, garden_id))", "CREATE TABLE IF NOT EXISTS invites (code TEXT PRIMARY KEY, allotment_id TEXT NOT NULL, made_by TEXT NOT NULL, expires INTEGER NOT NULL, uses_left INTEGER NOT NULL)"];
var bu = null;
var tp = 864e5;
var m0 = 60;
var y0 = 20 * 1024 * 1024;
var Wi = /* @__PURE__ */ __name((t15 = 16) => G.fromBuffer(crypto.getRandomValues(new Uint8Array(t15))), "Wi");
var rp = /* @__PURE__ */ __name(async (t15) => G.fromBuffer(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t15)))), "rp");
var Mn = /* @__PURE__ */ __name((t15, e) => String(t15 || "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, e), "Mn");
var ce = /* @__PURE__ */ __name(class extends Error {
  constructor(e, r) {
    super(r), this.status = e;
  }
}, "ce");
var p6 = { async fetch(t15, e) {
  let r = (e.ORIGINS || "https://caitkne.github.io").split(",").map((c) => c.trim()), o = t15.headers.get("Origin") || "", n = r.includes(o), i = n ? { "Access-Control-Allow-Origin": o, Vary: "Origin" } : {}, s = /* @__PURE__ */ __name((c, l = 200) => new Response(JSON.stringify(c), { status: l, headers: { ...i, "Content-Type": "application/json", "Cache-Control": "no-store" } }), "s");
  if (t15.method === "OPTIONS")
    return new Response(null, { status: n ? 204 : 403, headers: { ...i, "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Max-Age": "86400" } });
  if (!n)
    return s({ error: "not allowed" }, 403);
  if (!e.DB || !e.GARDENS)
    return s({ error: "The worker needs its DB and GARDENS bindings" }, 500);
  try {
    return bu = bu || e.DB.batch(h0.map((c) => e.DB.prepare(c))).catch((c) => {
      throw bu = null, c;
    }), await bu, s(await g0(t15, e, { rpID: e.RP_ID || "caitkne.github.io", origin: o, origins: r }));
  } catch (c) {
    return s({ error: c instanceof ce ? c.message : "Something went wrong" }, c.status || 500);
  }
} };
async function g0(t15, e, r) {
  let o = new URL(t15.url), n = o.pathname.replace(/\/+$/, "") || "/", i = t15.method, s = e.DB, c = Date.now(), l = /* @__PURE__ */ __name(async () => {
    try {
      return await t15.json();
    } catch {
      throw new ce(400, "Bad request");
    }
  }, "l"), f = /* @__PURE__ */ __name((b, ...T) => s.prepare(b).bind(...T).first(), "f"), d = /* @__PURE__ */ __name(async (b, ...T) => (await s.prepare(b).bind(...T).all()).results, "d"), h = /* @__PURE__ */ __name((b, ...T) => s.prepare(b).bind(...T).run(), "h"), g = null, C = (t15.headers.get("Authorization") || "").replace(/^Bearer /, "");
  if (C) {
    let b = await f("SELECT s.user_id, s.expires, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.hash = ?", await rp(C));
    b && b.expires > c && (g = { id: b.user_id, name: b.name });
  }
  let k = /* @__PURE__ */ __name(() => {
    if (!g)
      throw new ce(401, "Sign in first");
    return g;
  }, "k"), j = /* @__PURE__ */ __name(async (b) => {
    let T = Wi(32);
    return await h("INSERT INTO sessions (hash, user_id, expires) VALUES (?, ?, ?)", await rp(T), b.id, c + m0 * tp), await h("DELETE FROM sessions WHERE expires < ?", c), { token: T, user: { id: b.id, name: b.name } };
  }, "j"), D = /* @__PURE__ */ __name(async (b) => {
    let T = await f("SELECT * FROM challenges WHERE id = ?", String(b || ""));
    if (await h("DELETE FROM challenges WHERE id = ? OR expires < ?", String(b || ""), c), !T || T.expires < c)
      throw new ce(400, "That took too long. Try again");
    return T;
  }, "D"), F = /* @__PURE__ */ __name(async (b, T) => !!await f("SELECT 1 AS x FROM members WHERE allotment_id = ? AND user_id = ?", b, T), "F"), ne = /* @__PURE__ */ __name(async (b) => {
    let T = await f("SELECT * FROM allotments WHERE id = ?", b);
    if (!T || !await F(b, k().id))
      throw new ce(404, "No such allotment");
    return T;
  }, "ne"), J = n.split("/").filter(Boolean);
  if (i === "POST" && n === "/auth/register/start") {
    let { name: b } = await l(), T = Mn(b, 40);
    if (!T)
      throw new ce(400, "Choose a name your friends will see");
    let H = g ? g.id : Wi(16), Y = g ? await d("SELECT id, transports FROM creds WHERE user_id = ?", g.id) : [], se = await Py({ rpName: "Drift Garden", rpID: r.rpID, userName: T, userDisplayName: T, userID: G.toBuffer(H), attestationType: "none", authenticatorSelection: { residentKey: "required", userVerification: "preferred" }, excludeCredentials: Y.map((Le) => ({ id: Le.id, transports: Le.transports ? JSON.parse(Le.transports) : void 0 })) }), he = Wi();
    return await h("INSERT INTO challenges (id, challenge, user_id, name, expires) VALUES (?, ?, ?, ?, ?)", he, se.challenge, H, g ? g.name : T, c + 5 * 6e4), { id: he, options: se };
  }
  if (i === "POST" && n === "/auth/register/finish") {
    let b = await l(), T = await D(b.id), H;
    try {
      H = await Yy({ response: b.response, expectedChallenge: T.challenge, expectedOrigin: r.origins, expectedRPID: r.rpID });
    } catch {
      throw new ce(400, "That passkey could not be checked");
    }
    if (!H.verified)
      throw new ce(400, "That passkey could not be checked");
    let Y = H.registrationInfo.credential, se = await f("SELECT * FROM users WHERE id = ?", T.user_id);
    return se || (se = { id: T.user_id, name: T.name }, await h("INSERT INTO users (id, name, created) VALUES (?, ?, ?)", se.id, se.name, c)), await h("INSERT INTO creds (id, user_id, public_key, counter, transports, created) VALUES (?, ?, ?, ?, ?, ?)", Y.id, se.id, G.fromBuffer(Y.publicKey), Y.counter, JSON.stringify(Y.transports || b.response?.response?.transports || []), c), j(se);
  }
  if (i === "POST" && n === "/auth/login/start") {
    let b = await Zy({ rpID: r.rpID, userVerification: "preferred", allowCredentials: [] }), T = Wi();
    return await h("INSERT INTO challenges (id, challenge, expires) VALUES (?, ?, ?)", T, b.challenge, c + 5 * 6e4), { id: T, options: b };
  }
  if (i === "POST" && n === "/auth/login/finish") {
    let b = await l(), T = await D(b.id), H = await f("SELECT * FROM creds WHERE id = ?", String(b.response?.id || ""));
    if (!H)
      throw new ce(400, "That passkey isn\u2019t known here. Make an account first");
    let Y;
    try {
      Y = await eg({ response: b.response, expectedChallenge: T.challenge, expectedOrigin: r.origins, expectedRPID: r.rpID, credential: { id: H.id, publicKey: G.toBuffer(H.public_key), counter: H.counter, transports: H.transports ? JSON.parse(H.transports) : void 0 } });
    } catch {
      throw new ce(400, "That passkey could not be checked");
    }
    if (!Y.verified)
      throw new ce(400, "That passkey could not be checked");
    return await h("UPDATE creds SET counter = ? WHERE id = ?", Y.authenticationInfo.newCounter, H.id), j(await f("SELECT * FROM users WHERE id = ?", H.user_id));
  }
  if (i === "POST" && n === "/auth/logout")
    return C && await h("DELETE FROM sessions WHERE hash = ?", await rp(C)), { ok: true };
  if (i === "GET" && n === "/me") {
    k();
    let b = await d("SELECT id, name, updated, size FROM gardens WHERE owner_id = ? ORDER BY updated DESC", g.id), T = await d(`SELECT a.id, a.name, a.keeper_id = ? AS keeper, (SELECT COUNT(*) FROM members x WHERE x.allotment_id = a.id) AS members,
      (SELECT COUNT(*) FROM plots p WHERE p.allotment_id = a.id) AS plots FROM allotments a JOIN members mm ON mm.allotment_id = a.id AND mm.user_id = ? ORDER BY a.created DESC`, g.id, g.id);
    return { user: g, gardens: b, allotments: T };
  }
  if (i === "PUT" && n === "/me") {
    k();
    let b = Mn((await l()).name, 40);
    if (!b)
      throw new ce(400, "A name, please");
    return await h("UPDATE users SET name = ? WHERE id = ?", b, g.id), { user: { id: g.id, name: b } };
  }
  if (J[0] === "gardens" && J.length === 2) {
    let b = Mn(J[1], 40);
    if (!/^[\w-]{8,40}$/.test(b))
      throw new ce(400, "Bad garden id");
    let T = await f("SELECT * FROM gardens WHERE id = ?", b);
    if (i === "PUT") {
      if (k(), T && T.owner_id !== g.id)
        throw new ce(403, "That garden belongs to someone else");
      let Y = await t15.text();
      if (Y.length > y0)
        throw new ce(413, "This garden is too big to save (over 20 MB)");
      let se;
      try {
        se = JSON.parse(Y);
      } catch {
        throw new ce(400, "Bad garden");
      }
      if (!se || typeof se.keys != "object")
        throw new ce(400, "Bad garden");
      let he = Mn(se.name, 60) || "A garden";
      return await e.GARDENS.put("garden:" + b, Y), T ? await h("UPDATE gardens SET name = ?, updated = ?, size = ? WHERE id = ?", he, c, Y.length, b) : await h("INSERT INTO gardens (id, owner_id, name, updated, size) VALUES (?, ?, ?, ?, ?)", b, g.id, he, c, Y.length), { id: b, updated: c };
    }
    if (!T)
      throw new ce(404, "No such garden");
    k();
    let H = T.owner_id === g.id;
    if (i === "GET") {
      if (!H && !await f("SELECT 1 AS x FROM plots p JOIN members mm ON mm.allotment_id = p.allotment_id WHERE p.garden_id = ? AND mm.user_id = ?", b, g.id))
        throw new ce(404, "No such garden");
      let Y = await f("SELECT name FROM users WHERE id = ?", T.owner_id);
      return { id: b, name: T.name, owner: Y?.name || "", mine: H, updated: T.updated, data: JSON.parse(await e.GARDENS.get("garden:" + b) || '{"keys":{}}') };
    }
    if (i === "DELETE") {
      if (!H)
        throw new ce(403, "That garden belongs to someone else");
      return await s.batch([s.prepare("DELETE FROM gardens WHERE id = ?").bind(b), s.prepare("DELETE FROM plots WHERE garden_id = ?").bind(b)]), await e.GARDENS.delete("garden:" + b), { ok: true };
    }
  }
  if (i === "POST" && n === "/allotments") {
    k();
    let b = Mn((await l()).name, 60);
    if (!b)
      throw new ce(400, "Name the allotment");
    let T = Wi(12);
    return await s.batch([s.prepare("INSERT INTO allotments (id, name, keeper_id, created) VALUES (?, ?, ?, ?)").bind(T, b, g.id, c), s.prepare("INSERT INTO members (allotment_id, user_id, joined) VALUES (?, ?, ?)").bind(T, g.id, c)]), { id: T, name: b };
  }
  if (J[0] === "allotments" && J[1]) {
    let b = await ne(J[1]), T = b.keeper_id === g.id;
    if (i === "GET" && J.length === 2) {
      let H = await d("SELECT u.id, u.name FROM members mm JOIN users u ON u.id = mm.user_id WHERE mm.allotment_id = ? ORDER BY mm.joined", b.id), Y = await d("SELECT g.id, g.name, g.updated, g.owner_id, u.name AS owner FROM plots p JOIN gardens g ON g.id = p.garden_id JOIN users u ON u.id = g.owner_id WHERE p.allotment_id = ? ORDER BY p.added", b.id);
      return { id: b.id, name: b.name, keeper: T, keeperId: b.keeper_id, members: H, plots: Y };
    }
    if (J[2] === "plots" && i === "POST") {
      let H = Mn((await l()).garden, 40);
      if (!await f("SELECT * FROM gardens WHERE id = ? AND owner_id = ?", H, g.id))
        throw new ce(404, "Save that garden first");
      return await h("INSERT OR IGNORE INTO plots (allotment_id, garden_id, added) VALUES (?, ?, ?)", b.id, H, c), { ok: true };
    }
    if (J[2] === "plots" && J[3] && i === "DELETE") {
      let H = await f("SELECT owner_id FROM gardens WHERE id = ?", J[3]);
      if (!H || H.owner_id !== g.id && !T)
        throw new ce(403, "Only its gardener or the keeper can take it out");
      return await h("DELETE FROM plots WHERE allotment_id = ? AND garden_id = ?", b.id, J[3]), { ok: true };
    }
    if (J[2] === "invites" && i === "POST") {
      let H = Wi(18);
      return await h("INSERT INTO invites (code, allotment_id, made_by, expires, uses_left) VALUES (?, ?, ?, ?, ?)", H, b.id, g.id, c + 7 * tp, 10), await h("DELETE FROM invites WHERE expires < ?", c), { code: H, expires: c + 7 * tp };
    }
    if (J[2] === "members" && J[3] && i === "DELETE") {
      let H = J[3] === "me" ? g.id : J[3];
      if (H !== g.id && !T)
        throw new ce(403, "Only the keeper can remove someone");
      if (H === b.keeper_id) {
        let Y = await f("SELECT user_id FROM members WHERE allotment_id = ? AND user_id != ? ORDER BY joined LIMIT 1", b.id, H);
        if (Y)
          await h("UPDATE allotments SET keeper_id = ? WHERE id = ?", Y.user_id, b.id);
        else
          return await s.batch(["allotments WHERE id", "members WHERE allotment_id", "plots WHERE allotment_id", "invites WHERE allotment_id"].map((se) => s.prepare("DELETE FROM " + se + " = ?").bind(b.id))), { ok: true, gone: true };
      }
      return await s.batch([s.prepare("DELETE FROM members WHERE allotment_id = ? AND user_id = ?").bind(b.id, H), s.prepare("DELETE FROM plots WHERE allotment_id = ? AND garden_id IN (SELECT id FROM gardens WHERE owner_id = ?)").bind(b.id, H)]), H !== g.id && await h("DELETE FROM invites WHERE allotment_id = ? AND made_by = ?", b.id, H), { ok: true };
    }
  }
  if (J[0] === "invites" && J[1]) {
    let b = await f("SELECT i.*, a.name FROM invites i JOIN allotments a ON a.id = i.allotment_id WHERE i.code = ?", Mn(J[1], 40));
    if (!b || b.expires < c || b.uses_left < 1)
      throw new ce(404, "That invite has expired. Ask for a new one");
    if (i === "GET")
      return { allotment: b.name };
    if (i === "POST")
      return k(), await F(b.allotment_id, g.id) || await s.batch([s.prepare("INSERT INTO members (allotment_id, user_id, joined) VALUES (?, ?, ?)").bind(b.allotment_id, g.id, c), s.prepare("UPDATE invites SET uses_left = uses_left - 1 WHERE code = ?").bind(b.code)]), { id: b.allotment_id, name: b.name };
  }
  throw new ce(404, "Nothing here");
}
__name(g0, "g0");

// ../../../../../tmp/claude-0/-home-user-drift-garden/c82c223b-df38-55fe-bd97-360581c9732a/scratchpad/wa/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../tmp/claude-0/-home-user-drift-garden/c82c223b-df38-55fe-bd97-360581c9732a/scratchpad/wa/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-m6qtEp/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = p6;

// ../../../../../tmp/claude-0/-home-user-drift-garden/c82c223b-df38-55fe-bd97-360581c9732a/scratchpad/wa/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-m6qtEp/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

pvtsutils/build/index.js:
  (*!
   * MIT License
   * 
   * Copyright (c) 2017-2024 Peculiar Ventures, LLC
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

pvutils/build/utils.es.js:
  (*!
   Copyright (c) Peculiar Ventures, LLC
  *)

asn1js/build/index.es.js:
  (*!
   * Copyright (c) 2014, GMO GlobalSign
   * Copyright (c) 2015-2022, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the copyright holder nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@peculiar/x509/build/x509.es.js:
  (*!
   * MIT License
   * 
   * Copyright (c) Peculiar Ventures. All rights reserved.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)
*/
//# sourceMappingURL=garden-api.js.map
