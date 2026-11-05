/**
 * vendor/buffer.js
 *
 * Node Buffer polyfill (base64, IEEE754, encodings) used by the packet layer.
 *
 * Symbols: a, n, r, o, l, c, h, d, p, m, f, b, y, v, w, S, T, M, C, N, byteLength, A, k, P, _, I, B, F, D, L, R, E, U, j, G, V, H, Y, W, z, X, $, q, K, Q, Z, tt, et, it, st, nt, rt, ot, lt, ct, ht, t2, length3
 * Source: bundle lines 111-5350 (150 statements)
 */


function a(t) {
  const length = t.length;
  if (length % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  let indexOfResult = t.indexOf("=");
  if (indexOfResult === -1) {
    indexOfResult = length;
  }
  return [indexOfResult, indexOfResult === length ? 0 : 4 - (indexOfResult % 4)];
}

function n(t, e, i) {
  return (3 * (e + i)) / 4 - i;
}

function r(text2) {
  const e = a(text2);
  const s = e[0];
  const bytes = new Uint8Array(n(text2, s, r));
  let l = 0;
  const c = r > 0 ? s - 4 : s;
  let h = 0;
  while (h < c) {
    const e2 =
      (i[text2.charCodeAt(h)] << 18) |
      (i[text2.charCodeAt(h + 1)] << 12) |
      (i[text2.charCodeAt(h + 2)] << 6) |
      i[text2.charCodeAt(h + 3)];
    bytes[l++] = (e2 >> 16) & 255;
    bytes[l++] = (e2 >> 8) & 255;
    bytes[l++] = 255 & e2;
    h += 4;
  }
  if (r === 2) {
    const e3 = (i[text2.charCodeAt(h)] << 2) | (i[text2.charCodeAt(h + 1)] >> 4);
    bytes[l++] = 255 & e3;
  }
  if (r === 1) {
    const e4 =
      (i[text2.charCodeAt(h)] << 10) |
      (i[text2.charCodeAt(h + 1)] << 4) |
      (i[text2.charCodeAt(h + 2)] >> 2);
    bytes[l++] = (e4 >> 8) & 255;
    bytes[l++] = 255 & e4;
  }
  return bytes;
}

function o(t) {
  return e[(t >> 18) & 63] + e[(t >> 12) & 63] + e[(t >> 6) & 63] + e[63 & t];
}

function l(t, e, i) {
  const items = [];
  for (let index = e; index < i; index += 3) {
    const combinedValue =
      ((t[index] << 16) & 16711680) + ((t[index + 1] << 8) & 65280) + (255 & t[index + 2]);
    items.push(o(combinedValue));
  }
  return items.join("");
}

function c(t) {
  const length = t.length;
  const remainder = length % 3;
  const items = [];
  let e2 = 0;
  let difference = length - remainder;
  while (e2 < difference) {
    items.push(l(t, e2, e2 + 16383 > difference ? difference : e2 + 16383));
    e2 += 16383;
  }
  switch (remainder) {
    case 1:
      const s2 = t[length - 1];
      items.push(e[s2 >> 2] + e[(s2 << 4) & 63] + "==");
      break;
    case 2:
      const combinedValue = (t[length - 2] << 8) + t[length - 1];
      items.push(
        e[combinedValue >> 10] + e[(combinedValue >> 4) & 63] + e[(combinedValue << 2) & 63] + "=",
      );
      break;
  }
  return items.join("");
}

function h(t, e, i, s, a) {
  let n;
  let r;
  const difference = 8 * a - s - 1;
  const difference2 = (1 << difference) - 1;
  const c = difference2 >> 1;
  let d = i ? a - 1 : 0;
  const u = i ? -1 : 1;
  let g = t[e + d];
  d += u;
  n = g & ((1 << -h) - 1);
  g >>= -h;
  h += difference;
  while (h > 0) {
    n = 256 * n + t[e + d];
    d += u;
    h -= 8;
  }
  r = n & ((1 << -h) - 1);
  n >>= -h;
  h += s;
  while (h > 0) {
    r = 256 * r + t[e + d];
    d += u;
    h -= 8;
  }
  if (n === 0) {
    n = 1 - c;
  } else {
    if (n === difference2) {
      if (r) {
        return NaN;
      }
      return (1 / 0) * (g ? -1 : 1);
    }
    r += Math.pow(2, s);
    n -= c;
  }
  return (g ? -1 : 1) * r * Math.pow(2, n - s);
}

function d(t, e, i, s, a, n) {
  let r;
  let o;
  let l;
  let difference = 8 * n - a - 1;
  const difference2 = (1 << difference) - 1;
  const u = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  let g = s ? 0 : n - 1;
  const p = s ? 1 : -1;
  if (e >= 0 && e !== 0) {
  }
  const m = e < 0;
  e = Math.abs(e);
  isNaN(e) || e === 1 / 0
    ? ((o = isNaN(e) ? 1 : 0), (r = difference2))
    : ((r = Math.floor(Math.log(e) / Math.LN2)),
      e * (l = Math.pow(2, -r)) < 1 && (r--, (l *= 2)),
      (e += r + d >= 1 ? u / l : u * Math.pow(2, 1 - d)) * l >= 2 && (r++, (l /= 2)),
      r + d >= difference2
        ? ((o = 0), (r = difference2))
        : r + d >= 1
          ? ((o = (e * l - 1) * Math.pow(2, a)), (r += d))
          : ((o = e * Math.pow(2, d - 1) * Math.pow(2, a)), (r = 0)));
  while (a >= 8) {
    t[i + g] = 255 & o;
    g += p;
    o /= 256;
    a -= 8;
  }
  r = (r << a) | o;
  difference += a;
  while (difference > 0) {
    t[i + g] = 255 & r;
    g += p;
    r /= 256;
    difference -= 8;
  }
  t[i + g - p] |= 128 * m;
  return;
}

function p(t) {
  if (t > g) {
    throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  const bytes = new Uint8Array(t);
  Object.setPrototypeOf(bytes, m.prototype);
  return bytes;
}

function m(t, e, i) {
  if (typeof t == "number") {
    if (typeof e == "string") {
      throw new TypeError('The "string" argument must be of type string. Received type number');
    }
    return v(t);
  }
  return f(t, e, i);
}

function f(t, e, i) {
  let s;
  let a;
  if (typeof t == "string") {
    return w(t, e);
  }
  if (ArrayBuffer.isView(t)) {
    return T(t);
  }
  if (t == null) {
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof t,
    );
  }
  if (!(t instanceof ArrayBuffer) && !t) {
    if (!(t instanceof SharedArrayBuffer) && !t) {
      if (typeof t == "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number',
        );
      }
      s = t.valueOf && t.valueOf();
      if (s != null && s !== t) {
        return m.from(s, e, i);
      }
      a = C(t);
      if (a) {
        return a;
      }
      if (
        typeof Symbol != "undefined" &&
        Symbol.toPrimitive != null &&
        typeof t[Symbol.toPrimitive] == "function"
      ) {
        return m.from(t[Symbol.toPrimitive]("string"), e, i);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof t,
      );
    }
    if (t.buffer instanceof SharedArrayBuffer) {
      return M(t, e, i);
    }
    if (typeof t == "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    s = t.valueOf && t.valueOf();
    if (s != null && s !== t) {
      return m.from(s, e, i);
    }
    a = C(t);
    if (a) {
      return a;
    }
    if (
      typeof Symbol != "undefined" &&
      Symbol.toPrimitive != null &&
      typeof t[Symbol.toPrimitive] == "function"
    ) {
      return m.from(t[Symbol.toPrimitive]("string"), e, i);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof t,
    );
  }
  if (t.buffer instanceof ArrayBuffer) {
    return M(t, e, i);
  }
  if (!(t instanceof SharedArrayBuffer) && !t) {
    if (typeof t == "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    s = t.valueOf && t.valueOf();
    if (s != null && s !== t) {
      return m.from(s, e, i);
    }
    a = C(t);
    if (a) {
      return a;
    }
    if (
      typeof Symbol != "undefined" &&
      Symbol.toPrimitive != null &&
      typeof t[Symbol.toPrimitive] == "function"
    ) {
      return m.from(t[Symbol.toPrimitive]("string"), e, i);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof t,
    );
  }
  if (t.buffer instanceof SharedArrayBuffer) {
    return M(t, e, i);
  }
  if (typeof t == "number") {
    throw new TypeError('The "value" argument must not be of type number. Received type number');
  }
  s = t.valueOf && t.valueOf();
  if (s != null && s !== t) {
    return m.from(s, e, i);
  }
  a = C(t);
  if (a) {
    return a;
  }
  if (
    typeof Symbol != "undefined" &&
    Symbol.toPrimitive != null &&
    typeof t[Symbol.toPrimitive] == "function"
  ) {
    return m.from(t[Symbol.toPrimitive]("string"), e, i);
  }
  throw new TypeError(
    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
      typeof t,
  );
}

function b(t) {
  if (typeof t != "number") {
    throw new TypeError('"size" argument must be of type number');
  }
  if (t < 0) {
    throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  return;
}

function y(t, e, i) {
  b(t);
  if (t <= 0) {
    return p(t);
  }
  if (e !== undefined) {
    if (typeof i == "string") {
      return p(t).fill(e, i);
    }
    return p(t).fill(e);
  }
  return p(t);
}

function v(t) {
  b(t);
  return p(t < 0 ? 0 : 0 | N(t));
}

function w(t, e) {
  if (typeof e != "string" || e === "") {
    e = "utf8";
  }
  if (!m.isEncoding(e)) {
    throw new TypeError("Unknown encoding: " + e);
  }
  const i = 0 | byteLength(t, e);
  let s = p(i);
  const writeResult = s.write(t, e);
  if (writeResult !== i) {
    s = s.slice(0, writeResult);
  }
  return s;
}

function S(t) {
  const e = t.length < 0 ? 0 : 0 | N(t.length);
  const i = p(e);
  for (let index = 0; index < e; index += 1) {
    i[index] = 255 & t[index];
  }
  return i;
}

function T(t) {
  if (t instanceof Uint8Array) {
    const bytes = new Uint8Array(t);
    return M(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  return S(t);
}

function M(t, e, i) {
  if (e < 0 || t.byteLength < e) {
    throw new RangeError('"offset" is outside of buffer bounds');
  }
  if (t.byteLength < e + (i || 0)) {
    throw new RangeError('"length" is outside of buffer bounds');
  }
  let s =
    e === undefined
      ? i === undefined
        ? new Uint8Array(t)
        : i === undefined
          ? new Uint8Array(t, e)
          : new Uint8Array(t, e, i)
      : i === undefined
        ? new Uint8Array(t, e)
        : new Uint8Array(t, e, i);
  Object.setPrototypeOf(s, m.prototype);
  return s;
}

function C(t) {
  if (m.isBuffer(t)) {
    const e = 0 | N(t.length);
    const i = p(e);
    if (i.length !== 0) {
      t.copy(i, 0, 0, e);
    }
    return i;
  }
  if (t.length !== undefined) {
    if (typeof t.length != "number" || Number.isNaN(t.length)) {
      return p(0);
    }
    return S(t);
  }
  if (t.type === "Buffer" && Array.isArray(t.data)) {
    return S(t.data);
  }
  return;
}

function N(t) {
  if (t >= g) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + g.toString(16) + " bytes",
    );
  }
  return 0 | t;
}

function byteLength(t, e) {
  var var1 = arguments;
  if (m.isBuffer(t)) {
    return t.length;
  }
  if (ArrayBuffer.isView(t) || t instanceof ArrayBuffer) {
    return t.byteLength;
  }
  if (typeof t != "string") {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
        typeof t,
    );
  }
  const length = t.length;
  const s = var1.length > 2 && var1[2] === true;
  if (!s && length === 0) {
    return 0;
  }
  let a = false;
  while (e !== "ascii") {
    if (e === "latin1") {
      break;
    }
    if (e === "binary") {
      break;
    }
    if (e !== "utf8" && e !== "utf-8") {
      if (e !== "ucs2" && e !== "ucs-2" && e !== "utf16le" && e !== "utf-16le") {
        if (e === "hex") {
          return length >>> 1;
        }
        if (e === "base64") {
          return ct(t).length;
        }
        if (a) {
          if (s) {
            return -1;
          }
          return rt(t).length;
        }
        e = ("" + e).toLowerCase();
        a = true;
        continue;
      }
      return 2 * length;
    }
    return rt(t).length;
  }
  return length;
}

function A(t, e, i) {
  let s = false;
  if (e === undefined || e < 0) {
    e = 0;
  }
  if (e > this.length) {
    return "";
  }
  if (i === undefined || i > this.length) {
    i = this.length;
  }
  if (i <= 0) {
    return "";
  }
  if ((i >>>= 0) <= (e >>>= 0)) {
    return "";
  }
  t ||= "utf8";
  while (t !== "hex") {
    if (t !== "utf8" && t !== "utf-8") {
      if (t === "ascii") {
        return j(this, e, i);
      }
      if (t !== "latin1" && t !== "binary") {
        if (t === "base64") {
          return R(this, e, i);
        }
        if (t !== "ucs2" && t !== "ucs-2" && t !== "utf16le" && t !== "utf-16le") {
          if (s) {
            throw new TypeError("Unknown encoding: " + t);
          }
          t = (t + "").toLowerCase();
          s = true;
          continue;
        }
        return H(this, e, i);
      }
      return G(this, e, i);
    }
    return E(this, e, i);
  }
  return V(this, e, i);
}

function k(t, e, i) {
  const s = t[e];
  t[e] = t[i];
  t[i] = s;
  return;
}

function P(t, e, i, s, a) {
  if (t.length === 0) {
    return -1;
  }
  typeof i == "string"
    ? ((s = i), (i = 0))
    : i > 2147483647
      ? (i = 2147483647)
      : i < -2147483648 && (i = -2147483648);
  i = +i;
  if (Number.isNaN(i)) {
    i = a ? 0 : t.length - 1;
  }
  if (i < 0) {
    i = t.length + i;
  }
  if (i >= t.length) {
    if (a) {
      return -1;
    }
    i = t.length - 1;
  } else if (i < 0) {
    if (!a) {
      return -1;
    }
    i = 0;
  }
  if (typeof e == "string") {
    e = m.from(e, s);
  }
  if (m.isBuffer(e)) {
    if (e.length === 0) {
      return -1;
    }
    return _(t, e, i, s, a);
  }
  if (typeof e == "number") {
    e &= 255;
    if (typeof Uint8Array.prototype.indexOf == "function") {
      if (a) {
        return Uint8Array.prototype.indexOf.call(t, e, i);
      }
      return Uint8Array.prototype.lastIndexOf.call(t, e, i);
    }
    return _(t, [e], i, s, a);
  }
  throw new TypeError("val must be string, number or Buffer");
}

function _(t, e, i, s, a) {
  function c(t, e) {
    if (r === 1) {
      return t[e];
    }
    return t.readUInt16BE(e * r);
  }
  let n;
  let r = 1;
  let length = t.length;
  let length2 = e.length;
  if (
    s !== undefined &&
    ((s = String(s).toLowerCase()) === "ucs2" ||
      (s === "ucs-2" ? s === "utf16le" : s === "utf16le" || s === "utf-16le"))
  ) {
    if (t.length < 2 || e.length < 2) {
      return -1;
    }
    r = 2;
    length /= 2;
    length2 /= 2;
    i /= 2;
  }
  if (a) {
    let s2 = -1;
    n = i;
    while (n < length) {
      if (c(t, n) === c(e, s2 === -1 ? 0 : n - s2)) {
        if (s2 === -1) {
          s2 = n;
        }
        if (n - s2 + 1 === length2) {
          return s2 * r;
        }
      } else {
        if (s2 !== -1) {
          n -= n - s2;
        }
        s2 = -1;
      }
      n++;
    }
  } else {
    if (i + length2 > length) {
      i = length - length2;
    }
    n = i;
    while (n >= 0) {
      let i2 = true;
      for (let index = 0; index < length2; index++) {
        if (c(t, n + index) !== c(e, index)) {
          i2 = false;
          break;
        }
      }
      if (i2) {
        return n;
      }
      n--;
    }
  }
  return -1;
}

function I(t, e, i, s) {
  i = Number(i) || 0;
  const difference = t.length - i;
  s ? (s = Number(s)) > difference && (s = difference) : (s = difference);
  const length = e.length;
  let r;
  if (s > length / 2) {
    s = length / 2;
  }
  r = 0;
  while (r < s) {
    const parseIntResult = parseInt(e.substr(2 * r, 2), 16);
    if (Number.isNaN(parseIntResult)) {
      return r;
    }
    t[i + r] = parseIntResult;
    ++r;
  }
  return r;
}

function B(t, e, i, s) {
  return ht(rt(e, t.length - i), t, i, s);
}

function F(t, e, i, s) {
  return ht(ot(e), t, i, s);
}

function D(t, e, i, s) {
  return ht(ct(e), t, i, s);
}

function L(t, e, i, s) {
  return ht(lt(e, t.length - i), t, i, s);
}

function R(t, e, i) {
  if (e === 0 && i === t.length) {
    return c(t);
  }
  return c(t.slice(e, i));
}

function E(t, e, i) {
  i = Math.min(t.length, i);
  const items = [];
  let a = e;
  while (a < i) {
    const e2 = t[a];
    let n = null;
    let r = e2 > 239 ? 4 : e2 > 223 ? 3 : e2 > 191 ? 2 : 1;
    if (a + r <= i) {
      let i2;
      let s2;
      let o;
      let l;
      switch (r) {
        case 1:
          if (e2 < 128) {
            n = e2;
          }
          break;
        case 2:
          i2 = t[a + 1];
          if ((192 & i2) == 128) {
            l = ((31 & e2) << 6) | (63 & i2);
            if (l > 127) {
              n = l;
            }
          }
          break;
        default:
          switch (r) {
            case 3:
              i2 = t[a + 1];
              s2 = t[a + 2];
              if ((192 & i2) == 128 && (192 & s2) == 128) {
                l = ((15 & e2) << 12) | ((63 & i2) << 6) | (63 & s2);
                if (l > 2047 && (l < 55296 || l > 57343)) {
                  n = l;
                }
              }
              break;
            case 4:
              i2 = t[a + 1];
              s2 = t[a + 2];
              o = t[a + 3];
              if ((192 & i2) == 128 && (192 & s2) == 128 && (192 & o) == 128) {
                l = ((15 & e2) << 18) | ((63 & i2) << 12) | ((63 & s2) << 6) | (63 & o);
                if (l > 65535 && l < 1114112) {
                  n = l;
                }
              }
              break;
          }
          break;
      }
    }
    n === null
      ? ((n = 65533), (r = 1))
      : n > 65535 &&
        ((n -= 65536), items.push(((n >>> 10) & 1023) | 55296), (n = 56320 | (1023 & n)));
    items.push(n);
    a += r;
  }
  return U(items);
}

function U(t) {
  const length = t.length;
  if (length <= O) {
    return String.fromCharCode.apply(String, t);
  }
  let i = "";
  let s = 0;
  while (s < length) {
    i += String.fromCharCode.apply(String, t.slice(s, (s += O)));
  }
  return i;
}

function j(t, e, i) {
  let s = "";
  i = Math.min(t.length, i);
  for (let index = e; index < i; ++index) {
    s += String.fromCharCode(127 & t[index]);
  }
  return s;
}

function G(t, e, i) {
  let s = "";
  i = Math.min(t.length, i);
  for (let index = e; index < i; ++index) {
    s += String.fromCharCode(t[index]);
  }
  return s;
}

function V(t, e, i) {
  const length = t.length;
  if (!e || e < 0) {
    e = 0;
  }
  if (!i || i < 0 || i > length) {
    i = length;
  }
  let a = "";
  for (let index = e; index < i; ++index) {
    a += dt[t[index]];
  }
  return a;
}

function H(t, e, i) {
  const sliceResult = t.slice(e, i);
  let a = "";
  for (let index = 0; index < sliceResult.length - 1; index += 2) {
    a += String.fromCharCode(sliceResult[index] + 256 * sliceResult[index + 1]);
  }
  return a;
}

function Y(t, e, i) {
  if (t % 1 != 0 || t < 0) {
    throw new RangeError("offset is not uint");
  }
  if (t + e > i) {
    throw new RangeError("Trying to access beyond buffer length");
  }
  return;
}

function W(t, e, i, s, a, n) {
  if (!m.isBuffer(t)) {
    throw new TypeError('"buffer" argument must be a Buffer instance');
  }
  if (e > a || e < n) {
    throw new RangeError('"value" argument is out of bounds');
  }
  if (i + s > t.length) {
    throw new RangeError("Index out of range");
  }
  return;
}

function z(t, e, i, s, a) {
  et(e, s, a, t, i, 7);
  let numberResult = Number(e & BigInt(4294967295));
  t[i++] = numberResult;
  numberResult >>= 8;
  t[i++] = numberResult;
  numberResult >>= 8;
  t[i++] = numberResult;
  numberResult >>= 8;
  t[i++] = numberResult;
  let numberResult2 = Number((e >> BigInt(32)) & BigInt(4294967295));
  t[i++] = numberResult2;
  numberResult2 >>= 8;
  t[i++] = numberResult2;
  numberResult2 >>= 8;
  t[i++] = numberResult2;
  numberResult2 >>= 8;
  t[i++] = numberResult2;
  return i;
}

function X(t, e, i, s, a) {
  et(e, s, a, t, i, 7);
  let numberResult = Number(e & BigInt(4294967295));
  t[i + 7] = numberResult;
  numberResult >>= 8;
  t[i + 6] = numberResult;
  numberResult >>= 8;
  t[i + 5] = numberResult;
  numberResult >>= 8;
  t[i + 4] = numberResult;
  let numberResult2 = Number((e >> BigInt(32)) & BigInt(4294967295));
  t[i + 3] = numberResult2;
  numberResult2 >>= 8;
  t[i + 2] = numberResult2;
  numberResult2 >>= 8;
  t[i + 1] = numberResult2;
  numberResult2 >>= 8;
  t[i] = numberResult2;
  return i + 8;
}

function $(t, e, i, s, a, n) {
  if (i + s > t.length) {
    throw new RangeError("Index out of range");
  }
  if (i < 0) {
    throw new RangeError("Index out of range");
  }
  return;
}

function q(t, e, i, s, a) {
  e = +e;
  i >>>= 0;
  if (!a) {
    $(t, e, i, 4, 3.4028234663852886e38, -3.4028234663852886e38);
  }
  d(t, e, i, s, 23, 4);
  return i + 4;
}

function K(t, e, i, s, a) {
  e = +e;
  i >>>= 0;
  if (!a) {
    $(t, e, i, 8, 1.7976931348623157e308, -1.7976931348623157e308);
  }
  d(t, e, i, s, 52, 8);
  return i + 8;
}

function Q(t, e, i) {
  J[t] = class extends i {
    constructor() {
      var var2 = arguments;
      super();
      Object.defineProperty(this, "message", {
        value: e.apply(this, var2),
        writable: true,
        configurable: true,
      });
      this.name = "".concat(this.name, " [", t, "]");
      delete this.name;
      return this;
    }
    get code() {
      return t;
    }
    set code(t) {
      Object.defineProperty(this, "code", {
        configurable: true,
        enumerable: true,
        value: t,
        writable: true,
      });
      return;
    }
    toString() {
      return "".concat(this.name, " [", t, "]: ", this.message);
    }
  };
  return;
}

function Z(t) {
  let e = "";
  let length = t.length;
  const s = t[0] === "-" ? 1 : 0;
  while (length >= s + 4) {
    e = "_".concat(t.slice(length - 3, length), e);
    length -= 3;
  }
  return "".concat(t.slice(0, length), e);
}

function tt(t, e, i) {
  it(e, "offset");
  if (t[e] === undefined || t[e + i] === undefined) {
    st(e, t.length - (i + 1));
  }
  return;
}

function et(t, e, i, s, a, n) {
  if (t > i || t < e) {
    const s2 = typeof e == "bigint" ? "n" : "";
    let a2 =
      n > 3
        ? e === 0 || e === BigInt(0)
          ? ">= 0".concat(s2, " and < 2", s2, " ** ", 8 * (n + 1), s2)
          : ">= -(2".concat(s2, " ** ", 8 * (n + 1) - 1, s2, ") and < 2 ** ", 8 * (n + 1) - 1, s2)
        : ">= ".concat(e, s2, " and <= ", i, s2);
    throw new J.ERR_OUT_OF_RANGE("value", a2, t);
  }
  tt(s, a, n);
  return;
}

function it(t, e) {
  if (typeof t != "number") {
    throw new J.ERR_INVALID_ARG_TYPE(e, "number", t);
  }
  return;
}

function st(t, e, i) {
  if (Math.floor(t) !== t) {
    it(t, i);
    throw new J.ERR_OUT_OF_RANGE(i || "offset", "an integer", t);
  }
  if (e < 0) {
    throw new J.ERR_BUFFER_OUT_OF_BOUNDS();
  }
  throw new J.ERR_OUT_OF_RANGE(i || "offset", ">= ".concat(i ? 1 : 0, " and <= ", e), t);
}

function nt(t) {
  t = (t = t.split("=")[0]).trim().replace(at, "");
  if (t.length < 2) {
    return "";
  }
  while (t.length % 4 != 0) {
    t += "=";
  }
  return t;
}

function rt(text2, e) {
  let i;
  e = e || 1 / 0;
  const length = text2.length;
  let a = null;
  const items = [];
  for (let index = 0; index < length; ++index) {
    i = text2.charCodeAt(index);
    var2: {
      if (i > 55295 && i < 57344) {
        if (!a) {
          if (i > 56319) {
            if ((e -= 3) > -1) {
              items.push(239, 191, 189);
            }
          } else if (index + 1 === length) {
            if ((e -= 3) > -1) {
              items.push(239, 191, 189);
            }
          } else {
            a = i;
          }
        } else if (i < 56320) {
          if ((e -= 3) > -1) {
            items.push(239, 191, 189);
          }
          a = i;
        } else {
          i = 65536 + (((a - 55296) << 10) | (i - 56320));
          break var2;
        }
        continue;
      }
      if (a && (e -= 3) > -1) {
        items.push(239, 191, 189);
      }
    }
    a = null;
    if (i < 128) {
      if ((e -= 1) < 0) {
        break;
      }
      items.push(i);
    } else if (i < 2048) {
      if ((e -= 2) < 0) {
        break;
      }
      items.push((i >> 6) | 192, (63 & i) | 128);
    } else if (i < 65536) {
      if ((e -= 3) < 0) {
        break;
      }
      items.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
    } else {
      if (!(i < 1114112)) {
        throw new Error("Invalid code point");
      }
      if ((e -= 4) < 0) {
        break;
      }
      items.push((i >> 18) | 240, ((i >> 12) & 63) | 128, ((i >> 6) & 63) | 128, (63 & i) | 128);
    }
  }
  return items;
}

function ot(text2) {
  const items = [];
  for (let index = 0; index < text2.length; ++index) {
    items.push(255 & text2.charCodeAt(index));
  }
  return items;
}

function lt(text2, e) {
  let i;
  let s;
  let a;
  const items = [];
  let r = 0;
  while (r < text2.length) {
    if (!((e -= 2) < 0)) {
      i = text2.charCodeAt(r);
      s = i >> 8;
      a = i % 256;
      items.push(a);
      items.push(s);
      ++r;
    } else {
      break;
    }
  }
  return items;
}

function ct(t) {
  return r(nt(t));
}

function ht(t, e, i, s) {
  let a = 0;
  while (a < s) {
    if (!(a + i >= e.length) && !(a >= t.length)) {
      e[a + i] = t[a];
      ++a;
    } else {
      break;
    }
  }
  return a;
}

e = [];

i = [];

text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

let t2 = 0;

let length3 = text.length;

while (t2 < length3) {
  e[t2] = text[t2];
  i[text.charCodeAt(t2)] = t2;
  ++t2;
}

i["-".charCodeAt(0)] = 62;

i["_".charCodeAt(0)] = 63;

u = {
  INSPECT_MAX_BYTES: 50,
};

g = 2147483647;

m.TYPED_ARRAY_SUPPORT = true;

Object.defineProperty(m.prototype, "parent", {
  enumerable: true,
  get: function () {
    if (m.isBuffer(this)) {
      return this.buffer;
    }
    return;
  },
});

Object.defineProperty(m.prototype, "offset", {
  enumerable: true,
  get: function () {
    if (m.isBuffer(this)) {
      return this.byteOffset;
    }
    return;
  },
});

m.poolSize = 8192;

m.from = function (t, e, i) {
  return f(t, e, i);
};

Object.setPrototypeOf(m.prototype, Uint8Array.prototype);

Object.setPrototypeOf(m, Uint8Array);

m.alloc = function (t, e, i) {
  return y(t, e, i);
};

m.allocUnsafe = function (t) {
  return v(t);
};

m.allocUnsafeSlow = function (t) {
  return v(t);
};

m.isBuffer = function (t) {
  return t != null && t._isBuffer === true && t !== m.prototype;
};

m.compare = function (t, e) {
  if (t instanceof Uint8Array) {
    t = m.from(t, t.offset, t.byteLength);
  }
  if (e instanceof Uint8Array) {
    e = m.from(e, e.offset, e.byteLength);
  }
  if (!m.isBuffer(t) || !m.isBuffer(e)) {
    throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
  }
  if (t === e) {
    return 0;
  }
  let length = t.length;
  let length2 = e.length;
  let a = 0;
  let minResult = Math.min(length, length2);
  while (a < minResult) {
    if (t[a] !== e[a]) {
      length = t[a];
      length2 = e[a];
      break;
    }
    ++a;
  }
  if (length < length2) {
    return -1;
  }
  if (length2 < length) {
    return 1;
  }
  return 0;
};

m.isEncoding = function (t) {
  let var1 = String(t).toLowerCase();
  switch (var1) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      break;
    default:
      return false;
  }
  return true;
};

m.concat = function (t, e) {
  if (!Array.isArray(t)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (t.length === 0) {
    return m.alloc(0);
  }
  let i;
  if (e === undefined) {
    e = 0;
    i = 0;
    while (i < t.length) {
      e += t[i].length;
      ++i;
    }
  }
  const allocUnsafeResult = m.allocUnsafe(e);
  let a = 0;
  i = 0;
  while (i < t.length) {
    let e2 = t[i];
    if (e2 instanceof Uint8Array) {
      a + e2.length > allocUnsafeResult.length
        ? (m.isBuffer(e2) || (e2 = m.from(e2.buffer, e2.byteOffset, e2.byteLength)),
          e2.copy(allocUnsafeResult, a))
        : Uint8Array.prototype.set.call(allocUnsafeResult, e2, a);
    } else {
      if (!m.isBuffer(e2)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      e2.copy(allocUnsafeResult, a);
    }
    a += e2.length;
    ++i;
  }
  return allocUnsafeResult;
};

m.byteLength = byteLength;

m.prototype._isBuffer = true;

m.prototype.swap16 = function () {
  const length = this.length;
  if (length % 2 != 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (let index = 0; index < length; index += 2) {
    k(this, index, index + 1);
  }
  return this;
};

m.prototype.swap32 = function () {
  const length = this.length;
  if (length % 4 != 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (let index = 0; index < length; index += 4) {
    k(this, index, index + 3);
    k(this, index + 1, index + 2);
  }
  return this;
};

m.prototype.swap64 = function () {
  const length = this.length;
  if (length % 8 != 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (let index = 0; index < length; index += 8) {
    k(this, index, index + 7);
    k(this, index + 1, index + 6);
    k(this, index + 2, index + 5);
    k(this, index + 3, index + 4);
  }
  return this;
};

m.prototype.toString = function () {
  var var2 = arguments;
  const length = this.length;
  if (length === 0) {
    return "";
  }
  if (var2.length === 0) {
    return E(this, 0, length);
  }
  return A.apply(this, var2);
};

m.prototype.toLocaleString = m.prototype.toString;

m.prototype.equals = function (t) {
  if (!m.isBuffer(t)) {
    throw new TypeError("Argument must be a Buffer");
  }
  return t === this || m.compare(this, t) === 0;
};

m.prototype.inspect = function () {
  let t = "";
  const iNSPECT_MAX_BYTES = u.INSPECT_MAX_BYTES;
  t = this.toString("hex", 0, iNSPECT_MAX_BYTES)
    .replace(/(.{2})/g, "$1 ")
    .trim();
  if (this.length > iNSPECT_MAX_BYTES) {
    t += " ... ";
  }
  return "<Buffer " + t + ">";
};

m.prototype[Symbol.for("nodejs.util.inspect.custom")] = m.prototype.inspect;

m.prototype.compare = function (t, e, i, s, a) {
  if (t instanceof Uint8Array) {
    t = m.from(t, t.offset, t.byteLength);
  }
  if (!m.isBuffer(t)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t,
    );
  }
  if (e === undefined) {
    e = 0;
  }
  if (i === undefined) {
    i = t ? t.length : 0;
  }
  if (s === undefined) {
    s = 0;
  }
  if (a === undefined) {
    a = this.length;
  }
  if (e < 0 || i > t.length || s < 0 || a > this.length) {
    throw new RangeError("out of range index");
  }
  if (s >= a && e >= i) {
    return 0;
  }
  if (s >= a) {
    return -1;
  }
  if (e >= i) {
    return 1;
  }
  if (t === this) {
    return 0;
  }
  let difference = (a >>>= 0) - (s >>>= 0);
  let difference2 = (i >>>= 0) - (e >>>= 0);
  const minResult = Math.min(difference, difference2);
  const sliceResult = this.slice(s, a);
  const sliceResult2 = t.slice(e, i);
  for (let index = 0; index < minResult; ++index) {
    if (sliceResult[index] !== sliceResult2[index]) {
      difference = sliceResult[index];
      difference2 = sliceResult2[index];
      break;
    }
  }
  if (difference < difference2) {
    return -1;
  }
  if (difference2 < difference) {
    return 1;
  }
  return 0;
};

m.prototype.includes = function (t, e, i) {
  return this.indexOf(t, e, i) !== -1;
};

m.prototype.indexOf = function (t, e, i) {
  return P(this, t, e, i, true);
};

m.prototype.lastIndexOf = function (t, e, i) {
  return P(this, t, e, i, false);
};

m.prototype.write = function (t, e, i, s) {
  if (e === undefined) {
    s = "utf8";
    i = this.length;
    e = 0;
  } else if (i === undefined) {
    if (typeof e == "string") {
      s = e;
      i = this.length;
      e = 0;
    }
  } else {
    if (!isFinite(e)) {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    e >>>= 0;
    isFinite(i) ? ((i >>>= 0), s === undefined && (s = "utf8")) : ((s = i), (i = undefined));
  }
  const difference = this.length - e;
  if (i === undefined || i > difference) {
    i = difference;
  }
  if ((t.length > 0 && (i < 0 || e < 0)) || e > this.length) {
    throw new RangeError("Attempt to write outside buffer bounds");
  }
  s ||= "utf8";
  let n = false;
  while (s !== "hex") {
    if (s !== "utf8" && s !== "utf-8") {
      if (s !== "ascii" && s !== "latin1" && s !== "binary") {
        if (s === "base64") {
          return D(this, t, e, i);
        }
        if (s !== "ucs2" && s !== "ucs-2" && s !== "utf16le" && s !== "utf-16le") {
          if (n) {
            throw new TypeError("Unknown encoding: " + s);
          }
          s = ("" + s).toLowerCase();
          n = true;
          continue;
        }
        return L(this, t, e, i);
      }
      return F(this, t, e, i);
    }
    return B(this, t, e, i);
  }
  return I(this, t, e, i);
};

m.prototype.toJSON = function () {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0),
  };
};

O = 4096;

m.prototype.slice = function (t, e) {
  const length = this.length;
  (t |= 0) < 0 ? (t += length) < 0 && (t = 0) : t > length && (t = length);
  e = e === undefined ? length : e | 0;
  e < 0 ? (e += length) < 0 && (e = 0) : e > length && (e = length);
  if (e < t) {
    e = t;
  }
  const subarrayResult = this.subarray(t, e);
  Object.setPrototypeOf(subarrayResult, m.prototype);
  return subarrayResult;
};

m.prototype.readUintLE = m.prototype.readUIntLE = function (t, e, i) {
  t >>>= 0;
  e >>>= 0;
  if (!i) {
    Y(t, e, this.length);
  }
  let s = this[t];
  let a = 1;
  let n = 0;
  while (++n < e) {
    if ((a *= 256)) {
      s += this[t + n] * a;
    } else {
      break;
    }
  }
  return s;
};

m.prototype.readUintBE = m.prototype.readUIntBE = function (t, e, i) {
  t >>>= 0;
  e >>>= 0;
  if (!i) {
    Y(t, e, this.length);
  }
  let s = this[t + --e];
  let a = 1;
  while (e > 0) {
    if ((a *= 256)) {
      s += this[t + --e] * a;
    } else {
      break;
    }
  }
  return s;
};

m.prototype.readUint8 = m.prototype.readUInt8 = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 1, this.length);
  }
  return this[t];
};

m.prototype.readUint16LE = m.prototype.readUInt16LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 2, this.length);
  }
  return this[t] | (this[t + 1] << 8);
};

m.prototype.readUint16BE = m.prototype.readUInt16BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 2, this.length);
  }
  return (this[t] << 8) | this[t + 1];
};

m.prototype.readUint32LE = m.prototype.readUInt32LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3];
};

m.prototype.readUint32BE = m.prototype.readUInt32BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]);
};

m.prototype.readBigUInt64LE = function (t) {
  it((t >>>= 0), "offset");
  const e = this[t];
  const i = this[t + 7];
  if (e === undefined || i === undefined) {
    st(t, this.length - 8);
  }
  const combinedValue = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24;
  const combinedValue2 = this[++t] + 256 * this[++t] + 65536 * this[++t] + i * 2 ** 24;
  return BigInt(combinedValue) + (BigInt(combinedValue2) << BigInt(32));
};

m.prototype.readBigUInt64BE = function (t) {
  it((t >>>= 0), "offset");
  const e = this[t];
  const i = this[t + 7];
  if (e === undefined || i === undefined) {
    st(t, this.length - 8);
  }
  const combinedValue = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t];
  const combinedValue2 = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + i;
  return (BigInt(combinedValue) << BigInt(32)) + BigInt(combinedValue2);
};

m.prototype.readIntLE = function (t, e, i) {
  t >>>= 0;
  e >>>= 0;
  if (!i) {
    Y(t, e, this.length);
  }
  let s = this[t];
  let a = 1;
  let n = 0;
  while (++n < e) {
    if ((a *= 256)) {
      s += this[t + n] * a;
    } else {
      break;
    }
  }
  a *= 128;
  if (s >= a) {
    s -= Math.pow(2, 8 * e);
  }
  return s;
};

m.prototype.readIntBE = function (t, e, i) {
  t >>>= 0;
  e >>>= 0;
  if (!i) {
    Y(t, e, this.length);
  }
  let s = e;
  let a = 1;
  let n = this[t + --s];
  while (s > 0) {
    if ((a *= 256)) {
      n += this[t + --s] * a;
    } else {
      break;
    }
  }
  a *= 128;
  if (n >= a) {
    n -= Math.pow(2, 8 * e);
  }
  return n;
};

m.prototype.readInt8 = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 1, this.length);
  }
  if (128 & this[t]) {
    return -1 * (255 - this[t] + 1);
  }
  return this[t];
};

m.prototype.readInt16LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 2, this.length);
  }
  const i = this[t] | (this[t + 1] << 8);
  if (32768 & i) {
    return 4294901760 | i;
  }
  return i;
};

m.prototype.readInt16BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 2, this.length);
  }
  const i = this[t + 1] | (this[t] << 8);
  if (32768 & i) {
    return 4294901760 | i;
  }
  return i;
};

m.prototype.readInt32LE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24);
};

m.prototype.readInt32BE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3];
};

m.prototype.readBigInt64LE = function (t) {
  it((t >>>= 0), "offset");
  const e = this[t];
  const i = this[t + 7];
  if (e === undefined || i === undefined) {
    st(t, this.length - 8);
  }
  const combinedValue = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (i << 24);
  return (
    (BigInt(combinedValue) << BigInt(32)) +
    BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
  );
};

m.prototype.readBigInt64BE = function (t) {
  it((t >>>= 0), "offset");
  const e = this[t];
  const i = this[t + 7];
  if (e === undefined || i === undefined) {
    st(t, this.length - 8);
  }
  const combinedValue = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
  return (
    (BigInt(combinedValue) << BigInt(32)) +
    BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + i)
  );
};

m.prototype.readFloatLE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return h(this, t, true, 23, 4);
};

m.prototype.readFloatBE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 4, this.length);
  }
  return h(this, t, false, 23, 4);
};

m.prototype.readDoubleLE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 8, this.length);
  }
  return h(this, t, true, 52, 8);
};

m.prototype.readDoubleBE = function (t, e) {
  t >>>= 0;
  if (!e) {
    Y(t, 8, this.length);
  }
  return h(this, t, false, 52, 8);
};

m.prototype.writeUintLE = m.prototype.writeUIntLE = function (t, e, i, s) {
  t = +t;
  e >>>= 0;
  i >>>= 0;
  if (!s) {
    W(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
  }
  let a = 1;
  let n = 0;
  this[e] = 255 & t;
  while (++n < i) {
    if ((a *= 256)) {
      this[e + n] = (t / a) & 255;
    } else {
      break;
    }
  }
  return e + i;
};

m.prototype.writeUintBE = m.prototype.writeUIntBE = function (t, e, i, s) {
  t = +t;
  e >>>= 0;
  i >>>= 0;
  if (!s) {
    W(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
  }
  let difference = i - 1;
  let n = 1;
  this[e + difference] = 255 & t;
  while (--difference >= 0) {
    if ((n *= 256)) {
      this[e + difference] = (t / n) & 255;
    } else {
      break;
    }
  }
  return e + i;
};

m.prototype.writeUint8 = m.prototype.writeUInt8 = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 1, 255, 0);
  }
  this[e] = 255 & t;
  return e + 1;
};

m.prototype.writeUint16LE = m.prototype.writeUInt16LE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 2, 65535, 0);
  }
  this[e] = 255 & t;
  this[e + 1] = t >>> 8;
  return e + 2;
};

m.prototype.writeUint16BE = m.prototype.writeUInt16BE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 2, 65535, 0);
  }
  this[e] = t >>> 8;
  this[e + 1] = 255 & t;
  return e + 2;
};

m.prototype.writeUint32LE = m.prototype.writeUInt32LE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 4, 4294967295, 0);
  }
  this[e + 3] = t >>> 24;
  this[e + 2] = t >>> 16;
  this[e + 1] = t >>> 8;
  this[e] = 255 & t;
  return e + 4;
};

m.prototype.writeUint32BE = m.prototype.writeUInt32BE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 4, 4294967295, 0);
  }
  this[e] = t >>> 24;
  this[e + 1] = t >>> 16;
  this[e + 2] = t >>> 8;
  this[e + 3] = 255 & t;
  return e + 4;
};

m.prototype.writeBigUInt64LE = function (t, e = 0) {
  return z(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
};

m.prototype.writeBigUInt64BE = function (t, e = 0) {
  return X(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
};

m.prototype.writeIntLE = function (t, e, i, s) {
  t = +t;
  e >>>= 0;
  if (!s) {
    const powResult = Math.pow(2, 8 * i - 1);
    W(this, t, e, i, powResult - 1, -powResult);
  }
  let a = 0;
  let n = 1;
  let r = 0;
  this[e] = 255 & t;
  while (++a < i) {
    if ((n *= 256)) {
      if (t < 0 && r === 0 && this[e + a - 1] !== 0) {
        r = 1;
      }
      this[e + a] = (((t / n) | 0) - r) & 255;
    } else {
      break;
    }
  }
  return e + i;
};

m.prototype.writeIntBE = function (t, e, i, s) {
  t = +t;
  e >>>= 0;
  if (!s) {
    const powResult = Math.pow(2, 8 * i - 1);
    W(this, t, e, i, powResult - 1, -powResult);
  }
  let difference = i - 1;
  let n = 1;
  let r = 0;
  this[e + difference] = 255 & t;
  while (--difference >= 0) {
    if ((n *= 256)) {
      if (t < 0 && r === 0 && this[e + difference + 1] !== 0) {
        r = 1;
      }
      this[e + difference] = (((t / n) | 0) - r) & 255;
    } else {
      break;
    }
  }
  return e + i;
};

m.prototype.writeInt8 = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 1, 127, -128);
  }
  if (t < 0) {
    t = 255 + t + 1;
  }
  this[e] = 255 & t;
  return e + 1;
};

m.prototype.writeInt16LE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 2, 32767, -32768);
  }
  this[e] = 255 & t;
  this[e + 1] = t >>> 8;
  return e + 2;
};

m.prototype.writeInt16BE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 2, 32767, -32768);
  }
  this[e] = t >>> 8;
  this[e + 1] = 255 & t;
  return e + 2;
};

m.prototype.writeInt32LE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 4, 2147483647, -2147483648);
  }
  this[e] = 255 & t;
  this[e + 1] = t >>> 8;
  this[e + 2] = t >>> 16;
  this[e + 3] = t >>> 24;
  return e + 4;
};

m.prototype.writeInt32BE = function (t, e, i) {
  t = +t;
  e >>>= 0;
  if (!i) {
    W(this, t, e, 4, 2147483647, -2147483648);
  }
  if (t < 0) {
    t = 4294967295 + t + 1;
  }
  this[e] = t >>> 24;
  this[e + 1] = t >>> 16;
  this[e + 2] = t >>> 8;
  this[e + 3] = 255 & t;
  return e + 4;
};

m.prototype.writeBigInt64LE = function (t, e = 0) {
  return z(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
};

m.prototype.writeBigInt64BE = function (t, e = 0) {
  return X(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
};

m.prototype.writeFloatLE = function (t, e, i) {
  return q(this, t, e, true, i);
};

m.prototype.writeFloatBE = function (t, e, i) {
  return q(this, t, e, false, i);
};

m.prototype.writeDoubleLE = function (t, e, i) {
  return K(this, t, e, true, i);
};

m.prototype.writeDoubleBE = function (t, e, i) {
  return K(this, t, e, false, i);
};

m.prototype.copy = function (t, e, i, s) {
  if (!m.isBuffer(t)) {
    throw new TypeError("argument should be a Buffer");
  }
  i ||= 0;
  if (!s && s !== 0) {
    s = this.length;
  }
  if (e >= t.length) {
    e = t.length;
  }
  e ||= 0;
  if (s > 0 && s < i) {
    s = i;
  }
  if (s === i) {
    return 0;
  }
  if (t.length === 0 || this.length === 0) {
    return 0;
  }
  if (e < 0) {
    throw new RangeError("targetStart out of bounds");
  }
  if (i < 0 || i >= this.length) {
    throw new RangeError("Index out of range");
  }
  if (s < 0) {
    throw new RangeError("sourceEnd out of bounds");
  }
  if (s > this.length) {
    s = this.length;
  }
  if (t.length - e < s - i) {
    s = t.length - e + i;
  }
  const difference = s - i;
  t === this ? this.copyWithin(e, i, s) : Uint8Array.prototype.set.call(t, this.subarray(i, s), e);
  return difference;
};

m.prototype.fill = function (text2, e, i, s) {
  if (typeof text2 == "string") {
    typeof e == "string"
      ? ((s = e), (e = 0), (i = this.length))
      : typeof i == "string" && ((s = i), (i = this.length));
    if (s !== undefined && typeof s != "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof s == "string" && !m.isEncoding(s)) {
      throw new TypeError("Unknown encoding: " + s);
    }
    if (text2.length === 1) {
      const charCodeAtResult = text2.charCodeAt(0);
      if ((s === "utf8" && charCodeAtResult < 128) || s === "latin1") {
        text2 = charCodeAtResult;
      }
    }
  } else {
    typeof text2 == "number"
      ? (text2 &= 255)
      : typeof text2 == "boolean" && (text2 = Number(text2));
  }
  if (e < 0 || this.length < e || this.length < i) {
    throw new RangeError("Out of range index");
  }
  if (i <= e) {
    return this;
  }
  let a;
  e >>>= 0;
  i = i === undefined ? this.length : i >>> 0;
  text2 ||= 0;
  if (typeof text2 == "number") {
    a = e;
    while (a < i) {
      this[a] = text2;
      ++a;
    }
  } else {
    const n = m.isBuffer(text2) ? text2 : m.from(text2, s);
    const length = n.length;
    if (length === 0) {
      throw new TypeError('The value "' + text2 + '" is invalid for argument "value"');
    }
    a = 0;
    while (a < i - e) {
      this[a + e] = n[a % length];
      ++a;
    }
  }
  return this;
};

J = {};

Q(
  "ERR_BUFFER_OUT_OF_BOUNDS",
  function (t) {
    if (t) {
      return "".concat(t, " is outside of buffer bounds");
    }
    return "Attempt to access memory outside buffer bounds";
  },
  RangeError,
);

Q(
  "ERR_INVALID_ARG_TYPE",
  function (t, e) {
    return 'The "'.concat(t, '" argument must be of type number. Received type ', typeof e);
  },
  TypeError,
);

Q(
  "ERR_OUT_OF_RANGE",
  function (t, e, i) {
    let concatResult = 'The value of "'.concat(t, '" is out of range.');
    let a = i;
    Number.isInteger(i)
      ? Math.abs(i) > 2 ** 32
        ? (a = Z(String(i)))
        : typeof i == "bigint" &&
          ((a = String(i)),
          (i > BigInt(2) ** BigInt(32) || i < -(BigInt(2) ** BigInt(32))) && (a = Z(a)),
          (a += "n"))
      : typeof i == "bigint" &&
        ((a = String(i)),
        (i > BigInt(2) ** BigInt(32) || i < -(BigInt(2) ** BigInt(32))) && (a = Z(a)),
        (a += "n"));
    concatResult += " It must be ".concat(e, ". Received ", a);
    return concatResult;
  },
  RangeError,
);

at = /[^+\/0-9A-Za-z-_]/g;

dt = (function () {
  const items = new Array(256);
  for (let index = 0; index < 16; ++index) {
    const product = 16 * index;
    for (let index2 = 0; index2 < 16; ++index2) {
      items[product + index2] = "0123456789abcdef"[index] + "0123456789abcdef"[index2];
    }
  }
  return items;
})();
