/**
 * vendor/crypto.js
 *
 * NaCl / tweetnacl implementation (box, secretbox, sign, hash, PRNG).
 *
 * Symbols: tn, en, sn, an, nn, rn, on, ln, hn, dn, un, gn, pn, mn, fn, bn, yn, vn, wn, Sn, Va, Tn, Mn, Cn, Nn, xn, An, kn, Pn, _n, In, Bn, Wa, Fn, Dn, Ln, Rn, On, Un, Gn, Vn, Hn, Yn, Wn, zn, Xn, $n, qn, Kn, Jn, Qn, qa, Zn, tr, keyLength, nonceLength, yr, publicKeyLength, secretKeyLength, vr, wr, Mr, Nr, xr, Ar, sr, overheadLength, groupElementLength, scalarLength, sharedKeyLength, nonceLength2, dr, ur, signatureLength, publicKeyLength2, secretKeyLength2, seedLength, hashLength, kr
 * Source: bundle lines 2565-30386 (148 statements)
 */


function tn(t, e, i, s) {
  t[e] = (i >> 24) & 255;
  t[e + 1] = (i >> 16) & 255;
  t[e + 2] = (i >> 8) & 255;
  t[e + 3] = 255 & i;
  t[e + 4] = (s >> 24) & 255;
  t[e + 5] = (s >> 16) & 255;
  t[e + 6] = (s >> 8) & 255;
  t[e + 7] = 255 & s;
  return;
}

function en(t, e, i, s, a) {
  var r = 0;
  for (var index = 0; index < a; ++index) {
    r |= t[e + index] ^ i[s + index];
  }
  return (1 & ((r - 1) >>> 8)) - 1;
}

function sn(t, e, i, s) {
  return en(t, e, i, s, 16);
}

function an(t, e, i, s) {
  return en(t, e, i, s, 32);
}

function nn(t, e, i, s) {
  let a;
  var n = (255 & s[0]) | ((255 & s[1]) << 8) | ((255 & s[2]) << 16) | ((255 & s[3]) << 24);
  var r = (255 & i[0]) | ((255 & i[1]) << 8) | ((255 & i[2]) << 16) | ((255 & i[3]) << 24);
  var o = (255 & i[4]) | ((255 & i[5]) << 8) | ((255 & i[6]) << 16) | ((255 & i[7]) << 24);
  var l = (255 & i[8]) | ((255 & i[9]) << 8) | ((255 & i[10]) << 16) | ((255 & i[11]) << 24);
  var c = (255 & i[12]) | ((255 & i[13]) << 8) | ((255 & i[14]) << 16) | ((255 & i[15]) << 24);
  var h = (255 & s[4]) | ((255 & s[5]) << 8) | ((255 & s[6]) << 16) | ((255 & s[7]) << 24);
  var d = (255 & e[0]) | ((255 & e[1]) << 8) | ((255 & e[2]) << 16) | ((255 & e[3]) << 24);
  var u = (255 & e[4]) | ((255 & e[5]) << 8) | ((255 & e[6]) << 16) | ((255 & e[7]) << 24);
  var g = (255 & e[8]) | ((255 & e[9]) << 8) | ((255 & e[10]) << 16) | ((255 & e[11]) << 24);
  var p = (255 & e[12]) | ((255 & e[13]) << 8) | ((255 & e[14]) << 16) | ((255 & e[15]) << 24);
  var m = (255 & s[8]) | ((255 & s[9]) << 8) | ((255 & s[10]) << 16) | ((255 & s[11]) << 24);
  var f = (255 & i[16]) | ((255 & i[17]) << 8) | ((255 & i[18]) << 16) | ((255 & i[19]) << 24);
  var b = (255 & i[20]) | ((255 & i[21]) << 8) | ((255 & i[22]) << 16) | ((255 & i[23]) << 24);
  var y = (255 & i[24]) | ((255 & i[25]) << 8) | ((255 & i[26]) << 16) | ((255 & i[27]) << 24);
  var v = (255 & i[28]) | ((255 & i[29]) << 8) | ((255 & i[30]) << 16) | ((255 & i[31]) << 24);
  var w = (255 & s[12]) | ((255 & s[13]) << 8) | ((255 & s[14]) << 16) | ((255 & s[15]) << 24);
  var S = n;
  var T = r;
  var M = o;
  var C = l;
  var N = c;
  var x = h;
  var A = d;
  var k = u;
  var P = g;
  var _ = p;
  var I = m;
  var B = f;
  var F = b;
  var D = y;
  var L = v;
  var R = w;
  for (var index = 0; index < 20; index += 2) {
    S ^=
      ((a =
        ((F ^=
          ((a =
            ((P ^=
              ((a = ((N ^= ((a = (S + F) | 0) << 7) | (a >>> 25)) + S) | 0) << 9) | (a >>> 23)) +
              N) |
            0) <<
            13) |
          (a >>> 19)) +
          P) |
        0) <<
        18) |
      (a >>> 14);
    x ^=
      ((a =
        ((T ^=
          ((a =
            ((D ^=
              ((a = ((_ ^= ((a = (x + T) | 0) << 7) | (a >>> 25)) + x) | 0) << 9) | (a >>> 23)) +
              _) |
            0) <<
            13) |
          (a >>> 19)) +
          D) |
        0) <<
        18) |
      (a >>> 14);
    I ^=
      ((a =
        ((A ^=
          ((a =
            ((M ^=
              ((a = ((L ^= ((a = (I + A) | 0) << 7) | (a >>> 25)) + I) | 0) << 9) | (a >>> 23)) +
              L) |
            0) <<
            13) |
          (a >>> 19)) +
          M) |
        0) <<
        18) |
      (a >>> 14);
    R ^=
      ((a =
        ((B ^=
          ((a =
            ((k ^=
              ((a = ((C ^= ((a = (R + B) | 0) << 7) | (a >>> 25)) + R) | 0) << 9) | (a >>> 23)) +
              C) |
            0) <<
            13) |
          (a >>> 19)) +
          k) |
        0) <<
        18) |
      (a >>> 14);
    S ^=
      ((a =
        ((C ^=
          ((a =
            ((M ^=
              ((a = ((T ^= ((a = (S + C) | 0) << 7) | (a >>> 25)) + S) | 0) << 9) | (a >>> 23)) +
              T) |
            0) <<
            13) |
          (a >>> 19)) +
          M) |
        0) <<
        18) |
      (a >>> 14);
    x ^=
      ((a =
        ((N ^=
          ((a =
            ((k ^=
              ((a = ((A ^= ((a = (x + N) | 0) << 7) | (a >>> 25)) + x) | 0) << 9) | (a >>> 23)) +
              A) |
            0) <<
            13) |
          (a >>> 19)) +
          k) |
        0) <<
        18) |
      (a >>> 14);
    I ^=
      ((a =
        ((_ ^=
          ((a =
            ((P ^=
              ((a = ((B ^= ((a = (I + _) | 0) << 7) | (a >>> 25)) + I) | 0) << 9) | (a >>> 23)) +
              B) |
            0) <<
            13) |
          (a >>> 19)) +
          P) |
        0) <<
        18) |
      (a >>> 14);
    R ^=
      ((a =
        ((L ^=
          ((a =
            ((D ^=
              ((a = ((F ^= ((a = (R + L) | 0) << 7) | (a >>> 25)) + R) | 0) << 9) | (a >>> 23)) +
              F) |
            0) <<
            13) |
          (a >>> 19)) +
          D) |
        0) <<
        18) |
      (a >>> 14);
  }
  S = (S + n) | 0;
  T = (T + r) | 0;
  M = (M + o) | 0;
  C = (C + l) | 0;
  N = (N + c) | 0;
  x = (x + h) | 0;
  A = (A + d) | 0;
  k = (k + u) | 0;
  P = (P + g) | 0;
  _ = (_ + p) | 0;
  I = (I + m) | 0;
  B = (B + f) | 0;
  F = (F + b) | 0;
  D = (D + y) | 0;
  L = (L + v) | 0;
  R = (R + w) | 0;
  t[0] = (S >>> 0) & 255;
  t[1] = (S >>> 8) & 255;
  t[2] = (S >>> 16) & 255;
  t[3] = (S >>> 24) & 255;
  t[4] = (T >>> 0) & 255;
  t[5] = (T >>> 8) & 255;
  t[6] = (T >>> 16) & 255;
  t[7] = (T >>> 24) & 255;
  t[8] = (M >>> 0) & 255;
  t[9] = (M >>> 8) & 255;
  t[10] = (M >>> 16) & 255;
  t[11] = (M >>> 24) & 255;
  t[12] = (C >>> 0) & 255;
  t[13] = (C >>> 8) & 255;
  t[14] = (C >>> 16) & 255;
  t[15] = (C >>> 24) & 255;
  t[16] = (N >>> 0) & 255;
  t[17] = (N >>> 8) & 255;
  t[18] = (N >>> 16) & 255;
  t[19] = (N >>> 24) & 255;
  t[20] = (x >>> 0) & 255;
  t[21] = (x >>> 8) & 255;
  t[22] = (x >>> 16) & 255;
  t[23] = (x >>> 24) & 255;
  t[24] = (A >>> 0) & 255;
  t[25] = (A >>> 8) & 255;
  t[26] = (A >>> 16) & 255;
  t[27] = (A >>> 24) & 255;
  t[28] = (k >>> 0) & 255;
  t[29] = (k >>> 8) & 255;
  t[30] = (k >>> 16) & 255;
  t[31] = (k >>> 24) & 255;
  t[32] = (P >>> 0) & 255;
  t[33] = (P >>> 8) & 255;
  t[34] = (P >>> 16) & 255;
  t[35] = (P >>> 24) & 255;
  t[36] = (_ >>> 0) & 255;
  t[37] = (_ >>> 8) & 255;
  t[38] = (_ >>> 16) & 255;
  t[39] = (_ >>> 24) & 255;
  t[40] = (I >>> 0) & 255;
  t[41] = (I >>> 8) & 255;
  t[42] = (I >>> 16) & 255;
  t[43] = (I >>> 24) & 255;
  t[44] = (B >>> 0) & 255;
  t[45] = (B >>> 8) & 255;
  t[46] = (B >>> 16) & 255;
  t[47] = (B >>> 24) & 255;
  t[48] = (F >>> 0) & 255;
  t[49] = (F >>> 8) & 255;
  t[50] = (F >>> 16) & 255;
  t[51] = (F >>> 24) & 255;
  t[52] = (D >>> 0) & 255;
  t[53] = (D >>> 8) & 255;
  t[54] = (D >>> 16) & 255;
  t[55] = (D >>> 24) & 255;
  t[56] = (L >>> 0) & 255;
  t[57] = (L >>> 8) & 255;
  t[58] = (L >>> 16) & 255;
  t[59] = (L >>> 24) & 255;
  t[60] = (R >>> 0) & 255;
  t[61] = (R >>> 8) & 255;
  t[62] = (R >>> 16) & 255;
  t[63] = (R >>> 24) & 255;
  return;
}

function rn(t, e, i, s) {
  let a;
  var n = (255 & s[0]) | ((255 & s[1]) << 8) | ((255 & s[2]) << 16) | ((255 & s[3]) << 24);
  var r = (255 & i[0]) | ((255 & i[1]) << 8) | ((255 & i[2]) << 16) | ((255 & i[3]) << 24);
  var o = (255 & i[4]) | ((255 & i[5]) << 8) | ((255 & i[6]) << 16) | ((255 & i[7]) << 24);
  var l = (255 & i[8]) | ((255 & i[9]) << 8) | ((255 & i[10]) << 16) | ((255 & i[11]) << 24);
  var c = (255 & i[12]) | ((255 & i[13]) << 8) | ((255 & i[14]) << 16) | ((255 & i[15]) << 24);
  var h = (255 & s[4]) | ((255 & s[5]) << 8) | ((255 & s[6]) << 16) | ((255 & s[7]) << 24);
  var d = (255 & e[0]) | ((255 & e[1]) << 8) | ((255 & e[2]) << 16) | ((255 & e[3]) << 24);
  var u = (255 & e[4]) | ((255 & e[5]) << 8) | ((255 & e[6]) << 16) | ((255 & e[7]) << 24);
  var g = (255 & e[8]) | ((255 & e[9]) << 8) | ((255 & e[10]) << 16) | ((255 & e[11]) << 24);
  var p = (255 & e[12]) | ((255 & e[13]) << 8) | ((255 & e[14]) << 16) | ((255 & e[15]) << 24);
  var m = (255 & s[8]) | ((255 & s[9]) << 8) | ((255 & s[10]) << 16) | ((255 & s[11]) << 24);
  var f = (255 & i[16]) | ((255 & i[17]) << 8) | ((255 & i[18]) << 16) | ((255 & i[19]) << 24);
  var b = (255 & i[20]) | ((255 & i[21]) << 8) | ((255 & i[22]) << 16) | ((255 & i[23]) << 24);
  var y = (255 & i[24]) | ((255 & i[25]) << 8) | ((255 & i[26]) << 16) | ((255 & i[27]) << 24);
  var v = (255 & i[28]) | ((255 & i[29]) << 8) | ((255 & i[30]) << 16) | ((255 & i[31]) << 24);
  var w = (255 & s[12]) | ((255 & s[13]) << 8) | ((255 & s[14]) << 16) | ((255 & s[15]) << 24);
  for (var index = 0; index < 20; index += 2) {
    n ^=
      ((a =
        ((b ^=
          ((a =
            ((g ^=
              ((a = ((c ^= ((a = (n + b) | 0) << 7) | (a >>> 25)) + n) | 0) << 9) | (a >>> 23)) +
              c) |
            0) <<
            13) |
          (a >>> 19)) +
          g) |
        0) <<
        18) |
      (a >>> 14);
    h ^=
      ((a =
        ((r ^=
          ((a =
            ((y ^=
              ((a = ((p ^= ((a = (h + r) | 0) << 7) | (a >>> 25)) + h) | 0) << 9) | (a >>> 23)) +
              p) |
            0) <<
            13) |
          (a >>> 19)) +
          y) |
        0) <<
        18) |
      (a >>> 14);
    m ^=
      ((a =
        ((d ^=
          ((a =
            ((o ^=
              ((a = ((v ^= ((a = (m + d) | 0) << 7) | (a >>> 25)) + m) | 0) << 9) | (a >>> 23)) +
              v) |
            0) <<
            13) |
          (a >>> 19)) +
          o) |
        0) <<
        18) |
      (a >>> 14);
    w ^=
      ((a =
        ((f ^=
          ((a =
            ((u ^=
              ((a = ((l ^= ((a = (w + f) | 0) << 7) | (a >>> 25)) + w) | 0) << 9) | (a >>> 23)) +
              l) |
            0) <<
            13) |
          (a >>> 19)) +
          u) |
        0) <<
        18) |
      (a >>> 14);
    n ^=
      ((a =
        ((l ^=
          ((a =
            ((o ^=
              ((a = ((r ^= ((a = (n + l) | 0) << 7) | (a >>> 25)) + n) | 0) << 9) | (a >>> 23)) +
              r) |
            0) <<
            13) |
          (a >>> 19)) +
          o) |
        0) <<
        18) |
      (a >>> 14);
    h ^=
      ((a =
        ((c ^=
          ((a =
            ((u ^=
              ((a = ((d ^= ((a = (h + c) | 0) << 7) | (a >>> 25)) + h) | 0) << 9) | (a >>> 23)) +
              d) |
            0) <<
            13) |
          (a >>> 19)) +
          u) |
        0) <<
        18) |
      (a >>> 14);
    m ^=
      ((a =
        ((p ^=
          ((a =
            ((g ^=
              ((a = ((f ^= ((a = (m + p) | 0) << 7) | (a >>> 25)) + m) | 0) << 9) | (a >>> 23)) +
              f) |
            0) <<
            13) |
          (a >>> 19)) +
          g) |
        0) <<
        18) |
      (a >>> 14);
    w ^=
      ((a =
        ((v ^=
          ((a =
            ((y ^=
              ((a = ((b ^= ((a = (w + v) | 0) << 7) | (a >>> 25)) + w) | 0) << 9) | (a >>> 23)) +
              b) |
            0) <<
            13) |
          (a >>> 19)) +
          y) |
        0) <<
        18) |
      (a >>> 14);
  }
  t[0] = (n >>> 0) & 255;
  t[1] = (n >>> 8) & 255;
  t[2] = (n >>> 16) & 255;
  t[3] = (n >>> 24) & 255;
  t[4] = (h >>> 0) & 255;
  t[5] = (h >>> 8) & 255;
  t[6] = (h >>> 16) & 255;
  t[7] = (h >>> 24) & 255;
  t[8] = (m >>> 0) & 255;
  t[9] = (m >>> 8) & 255;
  t[10] = (m >>> 16) & 255;
  t[11] = (m >>> 24) & 255;
  t[12] = (w >>> 0) & 255;
  t[13] = (w >>> 8) & 255;
  t[14] = (w >>> 16) & 255;
  t[15] = (w >>> 24) & 255;
  t[16] = (d >>> 0) & 255;
  t[17] = (d >>> 8) & 255;
  t[18] = (d >>> 16) & 255;
  t[19] = (d >>> 24) & 255;
  t[20] = (u >>> 0) & 255;
  t[21] = (u >>> 8) & 255;
  t[22] = (u >>> 16) & 255;
  t[23] = (u >>> 24) & 255;
  t[24] = (g >>> 0) & 255;
  t[25] = (g >>> 8) & 255;
  t[26] = (g >>> 16) & 255;
  t[27] = (g >>> 24) & 255;
  t[28] = (p >>> 0) & 255;
  t[29] = (p >>> 8) & 255;
  t[30] = (p >>> 16) & 255;
  t[31] = (p >>> 24) & 255;
  return;
}

function on(t, e, i, s) {
  nn(t, e, i, s);
  return;
}

function ln(t, e, i, s) {
  rn(t, e, i, s);
  return;
}

function hn(t, e, i, s, a, n, r) {
  let l;
  var bytes = new Uint8Array(16);
  var bytes2 = new Uint8Array(64);
  for (l = 0; l < 16; ++l) {
    bytes[l] = 0;
  }
  l = 0;
  while (l < 8) {
    bytes[l] = n[l];
    ++l;
  }
  while (a >= 64) {
    on(bytes2, bytes, r, cn);
    l = 0;
    while (l < 64) {
      t[e + l] = i[s + l] ^ bytes2[l];
      ++l;
    }
    var o = 1;
    l = 8;
    while (l < 16) {
      o = (o + (255 & bytes[l])) | 0;
      bytes[l] = 255 & o;
      o >>>= 8;
      ++l;
    }
    a -= 64;
    e += 64;
    s += 64;
  }
  if (a > 0) {
    on(bytes2, bytes, r, cn);
    l = 0;
    while (l < a) {
      t[e + l] = i[s + l] ^ bytes2[l];
      ++l;
    }
  }
  return 0;
}

function dn(t, e, i, s, a) {
  let r;
  var bytes = new Uint8Array(16);
  var bytes2 = new Uint8Array(64);
  for (r = 0; r < 16; ++r) {
    bytes[r] = 0;
  }
  r = 0;
  while (r < 8) {
    bytes[r] = s[r];
    ++r;
  }
  while (i >= 64) {
    on(bytes2, bytes, a, cn);
    r = 0;
    while (r < 64) {
      t[e + r] = bytes2[r];
      ++r;
    }
    var n = 1;
    r = 8;
    while (r < 16) {
      n = (n + (255 & bytes[r])) | 0;
      bytes[r] = 255 & n;
      n >>>= 8;
      ++r;
    }
    i -= 64;
    e += 64;
  }
  if (i > 0) {
    on(bytes2, bytes, a, cn);
    r = 0;
    while (r < i) {
      t[e + r] = bytes2[r];
      ++r;
    }
  }
  return 0;
}

function un(t, e, i, s, a) {
  var bytes = new Uint8Array(32);
  ln(bytes, s, a, cn);
  var bytes2 = new Uint8Array(8);
  for (var index = 0; index < 8; ++index) {
    bytes2[index] = s[index + 16];
  }
  return dn(t, e, i, bytes2, bytes);
}

function gn(t, e, i, s, a, n, r) {
  var bytes = new Uint8Array(32);
  ln(bytes, n, r, cn);
  var bytes2 = new Uint8Array(8);
  for (var index = 0; index < 8; ++index) {
    bytes2[index] = n[index + 16];
  }
  return hn(t, e, i, s, a, bytes2, bytes);
}

var pn;

function mn(t, e, i, s, a, n) {
  let r;
  (r = new pn(n)).update(i, s, a);
  r.finish(t, e);
  return 0;
}

function fn(t, e, i, s, a, n) {
  var bytes = new Uint8Array(16);
  mn(bytes, 0, i, s, a, n);
  return sn(t, e, bytes, 0);
}

function bn(t, e, i, s, a) {
  if (i < 32) {
    return -1;
  }
  gn(t, 0, e, 0, i, s, a);
  mn(t, 16, t, 32, i - 32, t);
  for (var index = 0; index < 16; ++index) {
    t[index] = 0;
  }
  return 0;
}

function yn(t, e, i, s, a) {
  var bytes = new Uint8Array(32);
  if (i < 32) {
    return -1;
  }
  un(bytes, 0, 32, s, a);
  if (fn(e, 16, e, 32, i - 32, bytes) !== 0) {
    return -1;
  }
  gn(t, 0, e, 0, i, s, a);
  for (var index = 0; index < 32; ++index) {
    t[index] = 0;
  }
  return 0;
}

function vn(t, e) {
  for (var index = 0; index < 16; ++index) {
    t[index] = 0 | e[index];
  }
  return;
}

function wn(t) {
  var s = 1;
  for (var index = 0; index < 16; ++index) {
    var combinedValue = t[index] + s + 65535;
    s = Math.floor(combinedValue / 65536);
    t[index] = combinedValue - 65536 * s;
  }
  t[0] += s - 1 + 37 * (s - 1);
  return;
}

function Sn(t, e, i) {
  var a = ~(i - 1);
  for (var index = 0; index < 16; ++index) {
    var s = a & (t[index] ^ e[index]);
    t[index] ^= s;
    e[index] ^= s;
  }
  return;
}

var Va;

function Tn(t, e) {
  let i;
  var n = Va();
  var r = Va();
  for (i = 0; i < 16; ++i) {
    r[i] = e[i];
  }
  wn(r);
  wn(r);
  wn(r);
  for (var index = 0; index < 2; ++index) {
    n[0] = r[0] - 65517;
    i = 1;
    while (i < 15) {
      n[i] = r[i] - 65535 - ((n[i - 1] >> 16) & 1);
      n[i - 1] &= 65535;
      ++i;
    }
    n[15] = r[15] - 32767 - ((n[14] >> 16) & 1);
    var a = (n[15] >> 16) & 1;
    n[14] &= 65535;
    Sn(r, n, 1 - a);
  }
  i = 0;
  while (i < 16) {
    t[2 * i] = 255 & r[i];
    t[2 * i + 1] = r[i] >> 8;
    ++i;
  }
  return;
}

function Mn(t, e) {
  var bytes = new Uint8Array(32);
  var bytes2 = new Uint8Array(32);
  Tn(bytes, t);
  Tn(bytes2, e);
  return an(bytes, 0, bytes2, 0);
}

function Cn(t) {
  var bytes = new Uint8Array(32);
  Tn(bytes, t);
  return 1 & bytes[0];
}

function Nn(t, e) {
  for (var index = 0; index < 16; ++index) {
    t[index] = e[2 * index] + (e[2 * index + 1] << 8);
  }
  t[15] &= 32767;
  return;
}

function xn(t, e, i) {
  for (var index = 0; index < 16; ++index) {
    t[index] = e[index] + i[index];
  }
  return;
}

function An(t, e, i) {
  for (var index = 0; index < 16; ++index) {
    t[index] = e[index] - i[index];
  }
  return;
}

function kn(t, e, i) {
  let s;
  let a;
  var n = 0;
  var r = 0;
  var o = 0;
  var l = 0;
  var c = 0;
  var h = 0;
  var d = 0;
  var u = 0;
  var g = 0;
  var p = 0;
  var m = 0;
  var f = 0;
  var b = 0;
  var y = 0;
  var v = 0;
  var w = 0;
  var S = 0;
  var T = 0;
  var M = 0;
  var C = 0;
  var N = 0;
  var x = 0;
  var A = 0;
  var k = 0;
  var P = 0;
  var _ = 0;
  var I = 0;
  var B = 0;
  var F = 0;
  var D = 0;
  var L = 0;
  var R = i[0];
  var E = i[1];
  var O = i[2];
  var U = i[3];
  var j = i[4];
  var G = i[5];
  var V = i[6];
  var H = i[7];
  var Y = i[8];
  var W = i[9];
  var z = i[10];
  var X = i[11];
  var $ = i[12];
  var q = i[13];
  var K = i[14];
  var J = i[15];
  n += (s = e[0]) * R;
  r += s * E;
  o += s * O;
  l += s * U;
  c += s * j;
  h += s * G;
  d += s * V;
  u += s * H;
  g += s * Y;
  p += s * W;
  m += s * z;
  f += s * X;
  b += s * $;
  y += s * q;
  v += s * K;
  w += s * J;
  r += (s = e[1]) * R;
  o += s * E;
  l += s * O;
  c += s * U;
  h += s * j;
  d += s * G;
  u += s * V;
  g += s * H;
  p += s * Y;
  m += s * W;
  f += s * z;
  b += s * X;
  y += s * $;
  v += s * q;
  w += s * K;
  S += s * J;
  o += (s = e[2]) * R;
  l += s * E;
  c += s * O;
  h += s * U;
  d += s * j;
  u += s * G;
  g += s * V;
  p += s * H;
  m += s * Y;
  f += s * W;
  b += s * z;
  y += s * X;
  v += s * $;
  w += s * q;
  S += s * K;
  T += s * J;
  l += (s = e[3]) * R;
  c += s * E;
  h += s * O;
  d += s * U;
  u += s * j;
  g += s * G;
  p += s * V;
  m += s * H;
  f += s * Y;
  b += s * W;
  y += s * z;
  v += s * X;
  w += s * $;
  S += s * q;
  T += s * K;
  M += s * J;
  c += (s = e[4]) * R;
  h += s * E;
  d += s * O;
  u += s * U;
  g += s * j;
  p += s * G;
  m += s * V;
  f += s * H;
  b += s * Y;
  y += s * W;
  v += s * z;
  w += s * X;
  S += s * $;
  T += s * q;
  M += s * K;
  C += s * J;
  h += (s = e[5]) * R;
  d += s * E;
  u += s * O;
  g += s * U;
  p += s * j;
  m += s * G;
  f += s * V;
  b += s * H;
  y += s * Y;
  v += s * W;
  w += s * z;
  S += s * X;
  T += s * $;
  M += s * q;
  C += s * K;
  N += s * J;
  d += (s = e[6]) * R;
  u += s * E;
  g += s * O;
  p += s * U;
  m += s * j;
  f += s * G;
  b += s * V;
  y += s * H;
  v += s * Y;
  w += s * W;
  S += s * z;
  T += s * X;
  M += s * $;
  C += s * q;
  N += s * K;
  x += s * J;
  u += (s = e[7]) * R;
  g += s * E;
  p += s * O;
  m += s * U;
  f += s * j;
  b += s * G;
  y += s * V;
  v += s * H;
  w += s * Y;
  S += s * W;
  T += s * z;
  M += s * X;
  C += s * $;
  N += s * q;
  x += s * K;
  A += s * J;
  g += (s = e[8]) * R;
  p += s * E;
  m += s * O;
  f += s * U;
  b += s * j;
  y += s * G;
  v += s * V;
  w += s * H;
  S += s * Y;
  T += s * W;
  M += s * z;
  C += s * X;
  N += s * $;
  x += s * q;
  A += s * K;
  k += s * J;
  p += (s = e[9]) * R;
  m += s * E;
  f += s * O;
  b += s * U;
  y += s * j;
  v += s * G;
  w += s * V;
  S += s * H;
  T += s * Y;
  M += s * W;
  C += s * z;
  N += s * X;
  x += s * $;
  A += s * q;
  k += s * K;
  P += s * J;
  m += (s = e[10]) * R;
  f += s * E;
  b += s * O;
  y += s * U;
  v += s * j;
  w += s * G;
  S += s * V;
  T += s * H;
  M += s * Y;
  C += s * W;
  N += s * z;
  x += s * X;
  A += s * $;
  k += s * q;
  P += s * K;
  _ += s * J;
  f += (s = e[11]) * R;
  b += s * E;
  y += s * O;
  v += s * U;
  w += s * j;
  S += s * G;
  T += s * V;
  M += s * H;
  C += s * Y;
  N += s * W;
  x += s * z;
  A += s * X;
  k += s * $;
  P += s * q;
  _ += s * K;
  I += s * J;
  b += (s = e[12]) * R;
  y += s * E;
  v += s * O;
  w += s * U;
  S += s * j;
  T += s * G;
  M += s * V;
  C += s * H;
  N += s * Y;
  x += s * W;
  A += s * z;
  k += s * X;
  P += s * $;
  _ += s * q;
  I += s * K;
  B += s * J;
  y += (s = e[13]) * R;
  v += s * E;
  w += s * O;
  S += s * U;
  T += s * j;
  M += s * G;
  C += s * V;
  N += s * H;
  x += s * Y;
  A += s * W;
  k += s * z;
  P += s * X;
  _ += s * $;
  I += s * q;
  B += s * K;
  F += s * J;
  v += (s = e[14]) * R;
  w += s * E;
  S += s * O;
  T += s * U;
  M += s * j;
  C += s * G;
  N += s * V;
  x += s * H;
  A += s * Y;
  k += s * W;
  P += s * z;
  _ += s * X;
  I += s * $;
  B += s * q;
  F += s * K;
  D += s * J;
  w += (s = e[15]) * R;
  r += 38 * (T += s * O);
  o += 38 * (M += s * U);
  l += 38 * (C += s * j);
  c += 38 * (N += s * G);
  h += 38 * (x += s * V);
  d += 38 * (A += s * H);
  u += 38 * (k += s * Y);
  g += 38 * (P += s * W);
  p += 38 * (_ += s * z);
  m += 38 * (I += s * X);
  f += 38 * (B += s * $);
  b += 38 * (F += s * q);
  y += 38 * (D += s * K);
  v += 38 * (L += s * J);
  n += 38 * (S += s * E);
  n = (s = n + (a = 1) + 65535) - 65536 * (a = Math.floor(s / 65536));
  r = (s = r + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  o = (s = o + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  l = (s = l + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  c = (s = c + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  h = (s = h + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  d = (s = d + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  u = (s = u + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  g = (s = g + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  p = (s = p + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  m = (s = m + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  f = (s = f + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  b = (s = b + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  y = (s = y + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  v = (s = v + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  w = (s = w + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  n += a - 1 + 37 * (a - 1);
  n = (s = n + (a = 1) + 65535) - 65536 * (a = Math.floor(s / 65536));
  r = (s = r + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  o = (s = o + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  l = (s = l + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  c = (s = c + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  h = (s = h + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  d = (s = d + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  u = (s = u + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  g = (s = g + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  p = (s = p + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  m = (s = m + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  f = (s = f + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  b = (s = b + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  y = (s = y + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  v = (s = v + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  w = (s = w + a + 65535) - 65536 * (a = Math.floor(s / 65536));
  n += a - 1 + 37 * (a - 1);
  t[0] = n;
  t[1] = r;
  t[2] = o;
  t[3] = l;
  t[4] = c;
  t[5] = h;
  t[6] = d;
  t[7] = u;
  t[8] = g;
  t[9] = p;
  t[10] = m;
  t[11] = f;
  t[12] = b;
  t[13] = y;
  t[14] = v;
  t[15] = w;
  return;
}

function Pn(t, e) {
  kn(t, e, e);
  return;
}

function _n(t, e) {
  let i;
  var s = Va();
  for (i = 0; i < 16; ++i) {
    s[i] = e[i];
  }
  i = 253;
  while (i >= 0) {
    Pn(s, s);
    if (i !== 2 && i !== 4) {
      kn(s, s, e);
    }
    --i;
  }
  i = 0;
  while (i < 16) {
    t[i] = s[i];
    ++i;
  }
  return;
}

function In(t, e) {
  let i;
  var s = Va();
  for (i = 0; i < 16; ++i) {
    s[i] = e[i];
  }
  i = 250;
  while (i >= 0) {
    Pn(s, s);
    if (i !== 1) {
      kn(s, s, e);
    }
    --i;
  }
  i = 0;
  while (i < 16) {
    t[i] = s[i];
    ++i;
  }
  return;
}

function Bn(t, e, i) {
  let s;
  let a;
  var bytes = new Uint8Array(32);
  var float64Values = new Float64Array(80);
  var o = Va();
  var l = Va();
  var c = Va();
  var h = Va();
  var d = Va();
  var u = Va();
  for (a = 0; a < 31; ++a) {
    bytes[a] = e[a];
  }
  bytes[31] = (127 & e[31]) | 64;
  bytes[0] &= 248;
  Nn(float64Values, i);
  a = 0;
  while (a < 16) {
    l[a] = float64Values[a];
    h[a] = o[a] = c[a] = 0;
    ++a;
  }
  o[0] = h[0] = 1;
  a = 254;
  while (a >= 0) {
    Sn(o, l, (s = (bytes[a >>> 3] >>> (7 & a)) & 1));
    Sn(c, h, s);
    xn(d, o, c);
    An(o, o, c);
    xn(c, l, h);
    An(l, l, h);
    Pn(h, d);
    Pn(u, o);
    kn(o, c, o);
    kn(c, l, d);
    xn(d, o, c);
    An(o, o, c);
    Pn(l, o);
    An(c, h, u);
    kn(o, c, $a);
    xn(o, o, h);
    kn(c, c, o);
    kn(o, h, u);
    kn(h, l, float64Values);
    Pn(l, d);
    Sn(o, l, s);
    Sn(c, h, s);
    --a;
  }
  a = 0;
  while (a < 16) {
    float64Values[a + 16] = o[a];
    float64Values[a + 32] = c[a];
    float64Values[a + 48] = l[a];
    float64Values[a + 64] = h[a];
    ++a;
  }
  var subarrayResult = float64Values.subarray(32);
  var subarrayResult2 = float64Values.subarray(16);
  _n(subarrayResult, subarrayResult);
  kn(subarrayResult2, subarrayResult2, subarrayResult);
  Tn(t, subarrayResult2);
  return 0;
}

var Wa;

function Fn(t, e) {
  return Bn(t, e, Wa);
}

function Dn(t, e) {
  Ha(e, 32);
  return Fn(t, e);
}

function Ln(t, e, i) {
  var bytes = new Uint8Array(32);
  Bn(bytes, i, e);
  return ln(t, Ya, bytes, cn);
}

var Rn;

function On(t, e, i, s, a, n) {
  var bytes = new Uint8Array(32);
  Ln(bytes, a, n);
  return Rn(t, e, i, s, bytes);
}

function Un(t, e, i, s, a, n) {
  var bytes = new Uint8Array(32);
  Ln(bytes, a, n);
  return En(t, e, i, s, bytes);
}

function Gn(t, e, i, s) {
  let w;
  let S;
  let T;
  let M;
  let C;
  let N;
  let x;
  let A;
  let k;
  let P;
  var int32ArrayInstance = new Int32Array(16);
  var int32ArrayInstance2 = new Int32Array(16);
  var B = t[0];
  var F = t[1];
  var D = t[2];
  var L = t[3];
  var R = t[4];
  var E = t[5];
  var O = t[6];
  var U = t[7];
  var j = e[0];
  var G = e[1];
  var V = e[2];
  var H = e[3];
  var Y = e[4];
  var W = e[5];
  var z = e[6];
  var X = e[7];
  var $ = 0;
  while (s >= 128) {
    for (T = 0; T < 16; ++T) {
      M = 8 * T + $;
      int32ArrayInstance[T] = (i[M + 0] << 24) | (i[M + 1] << 16) | (i[M + 2] << 8) | i[M + 3];
      int32ArrayInstance2[T] = (i[M + 4] << 24) | (i[M + 5] << 16) | (i[M + 6] << 8) | i[M + 7];
    }
    T = 0;
    while (T < 80) {
      var a = B;
      var n = F;
      var r = D;
      var o = L;
      var l = R;
      var c = E;
      var h = O;
      var u = j;
      var g = G;
      var p = V;
      var m = H;
      var f = Y;
      var b = W;
      var y = z;
      x = 65535 & (N = X);
      A = N >>> 16;
      k = 65535 & (C = U);
      P = C >>> 16;
      x +=
        65535 & (N = ((Y >>> 14) | (R << 18)) ^ ((Y >>> 18) | (R << 14)) ^ ((R >>> 9) | (Y << 23)));
      A += N >>> 16;
      k +=
        65535 & (C = ((R >>> 14) | (Y << 18)) ^ ((R >>> 18) | (Y << 14)) ^ ((Y >>> 9) | (R << 23)));
      P += C >>> 16;
      x += 65535 & (N = (Y & W) ^ (~Y & z));
      A += N >>> 16;
      k += 65535 & (C = (R & E) ^ (~R & O));
      P += C >>> 16;
      C = jn[2 * T];
      x += 65535 & (N = jn[2 * T + 1]);
      A += N >>> 16;
      k += 65535 & C;
      P += C >>> 16;
      C = int32ArrayInstance[T % 16];
      A += (N = int32ArrayInstance2[T % 16]) >>> 16;
      k += 65535 & C;
      P += C >>> 16;
      k += (A += (x += 65535 & N) >>> 16) >>> 16;
      x = 65535 & (N = S = (65535 & x) | (A << 16));
      A = N >>> 16;
      k = 65535 & (C = w = (65535 & k) | ((P += k >>> 16) << 16));
      P = C >>> 16;
      x +=
        65535 & (N = ((j >>> 28) | (B << 4)) ^ ((B >>> 2) | (j << 30)) ^ ((B >>> 7) | (j << 25)));
      A += N >>> 16;
      k +=
        65535 & (C = ((B >>> 28) | (j << 4)) ^ ((j >>> 2) | (B << 30)) ^ ((j >>> 7) | (B << 25)));
      P += C >>> 16;
      A += (N = (j & G) ^ (j & V) ^ (G & V)) >>> 16;
      k += 65535 & (C = (B & F) ^ (B & D) ^ (F & D));
      P += C >>> 16;
      var d = (65535 & (k += (A += (x += 65535 & N) >>> 16) >>> 16)) | ((P += k >>> 16) << 16);
      var v = (65535 & x) | (A << 16);
      x = 65535 & (N = m);
      A = N >>> 16;
      k = 65535 & (C = o);
      P = C >>> 16;
      A += (N = S) >>> 16;
      k += 65535 & (C = w);
      P += C >>> 16;
      F = a;
      D = n;
      L = r;
      R = o = (65535 & (k += (A += (x += 65535 & N) >>> 16) >>> 16)) | ((P += k >>> 16) << 16);
      E = l;
      O = c;
      U = h;
      B = d;
      G = u;
      V = g;
      H = p;
      Y = m = (65535 & x) | (A << 16);
      W = f;
      z = b;
      X = y;
      j = v;
      if (T % 16 == 15) {
        M = 0;
        while (M < 16) {
          C = int32ArrayInstance[M];
          x = 65535 & (N = int32ArrayInstance2[M]);
          A = N >>> 16;
          k = 65535 & C;
          P = C >>> 16;
          C = int32ArrayInstance[(M + 9) % 16];
          x += 65535 & (N = int32ArrayInstance2[(M + 9) % 16]);
          A += N >>> 16;
          k += 65535 & C;
          P += C >>> 16;
          w = int32ArrayInstance[(M + 1) % 16];
          x +=
            65535 &
            (N =
              (((S = int32ArrayInstance2[(M + 1) % 16]) >>> 1) | (w << 31)) ^
              ((S >>> 8) | (w << 24)) ^
              ((S >>> 7) | (w << 25)));
          A += N >>> 16;
          k += 65535 & (C = ((w >>> 1) | (S << 31)) ^ ((w >>> 8) | (S << 24)) ^ (w >>> 7));
          P += C >>> 16;
          w = int32ArrayInstance[(M + 14) % 16];
          A +=
            (N =
              (((S = int32ArrayInstance2[(M + 14) % 16]) >>> 19) | (w << 13)) ^
              ((w >>> 29) | (S << 3)) ^
              ((S >>> 6) | (w << 26))) >>> 16;
          k += 65535 & (C = ((w >>> 19) | (S << 13)) ^ ((S >>> 29) | (w << 3)) ^ (w >>> 6));
          P += C >>> 16;
          P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
          int32ArrayInstance[M] = (65535 & k) | (P << 16);
          int32ArrayInstance2[M] = (65535 & x) | (A << 16);
          ++M;
        }
      }
      ++T;
    }
    x = 65535 & (N = j);
    A = N >>> 16;
    k = 65535 & (C = B);
    P = C >>> 16;
    C = t[0];
    A += (N = e[0]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[0] = B = (65535 & k) | (P << 16);
    e[0] = j = (65535 & x) | (A << 16);
    x = 65535 & (N = G);
    A = N >>> 16;
    k = 65535 & (C = F);
    P = C >>> 16;
    C = t[1];
    A += (N = e[1]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[1] = F = (65535 & k) | (P << 16);
    e[1] = G = (65535 & x) | (A << 16);
    x = 65535 & (N = V);
    A = N >>> 16;
    k = 65535 & (C = D);
    P = C >>> 16;
    C = t[2];
    A += (N = e[2]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[2] = D = (65535 & k) | (P << 16);
    e[2] = V = (65535 & x) | (A << 16);
    x = 65535 & (N = H);
    A = N >>> 16;
    k = 65535 & (C = L);
    P = C >>> 16;
    C = t[3];
    A += (N = e[3]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[3] = L = (65535 & k) | (P << 16);
    e[3] = H = (65535 & x) | (A << 16);
    x = 65535 & (N = Y);
    A = N >>> 16;
    k = 65535 & (C = R);
    P = C >>> 16;
    C = t[4];
    A += (N = e[4]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[4] = R = (65535 & k) | (P << 16);
    e[4] = Y = (65535 & x) | (A << 16);
    x = 65535 & (N = W);
    A = N >>> 16;
    k = 65535 & (C = E);
    P = C >>> 16;
    C = t[5];
    A += (N = e[5]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[5] = E = (65535 & k) | (P << 16);
    e[5] = W = (65535 & x) | (A << 16);
    x = 65535 & (N = z);
    A = N >>> 16;
    k = 65535 & (C = O);
    P = C >>> 16;
    C = t[6];
    A += (N = e[6]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[6] = O = (65535 & k) | (P << 16);
    e[6] = z = (65535 & x) | (A << 16);
    x = 65535 & (N = X);
    A = N >>> 16;
    k = 65535 & (C = U);
    P = C >>> 16;
    C = t[7];
    A += (N = e[7]) >>> 16;
    k += 65535 & C;
    P += C >>> 16;
    P += (k += (A += (x += 65535 & N) >>> 16) >>> 16) >>> 16;
    t[7] = U = (65535 & k) | (P << 16);
    e[7] = X = (65535 & x) | (A << 16);
    $ += 128;
    s -= 128;
  }
  return s;
}

function Vn(t, e, i) {
  let s;
  var int32ArrayInstance = new Int32Array(8);
  var int32ArrayInstance2 = new Int32Array(8);
  var bytes = new Uint8Array(256);
  var o = i;
  int32ArrayInstance[0] = 1779033703;
  int32ArrayInstance[1] = 3144134277;
  int32ArrayInstance[2] = 1013904242;
  int32ArrayInstance[3] = 2773480762;
  int32ArrayInstance[4] = 1359893119;
  int32ArrayInstance[5] = 2600822924;
  int32ArrayInstance[6] = 528734635;
  int32ArrayInstance[7] = 1541459225;
  int32ArrayInstance2[0] = 4089235720;
  int32ArrayInstance2[1] = 2227873595;
  int32ArrayInstance2[2] = 4271175723;
  int32ArrayInstance2[3] = 1595750129;
  int32ArrayInstance2[4] = 2917565137;
  int32ArrayInstance2[5] = 725511199;
  int32ArrayInstance2[6] = 4215389547;
  int32ArrayInstance2[7] = 327033209;
  Gn(int32ArrayInstance, int32ArrayInstance2, e, i);
  i %= 128;
  for (s = 0; s < i; ++s) {
    bytes[s] = e[o - i + s];
  }
  bytes[i] = 128;
  bytes[(i = 256 - 128 * (i < 112 ? 1 : 0)) - 9] = 0;
  tn(bytes, i - 8, (o / 536870912) | 0, o << 3);
  Gn(int32ArrayInstance, int32ArrayInstance2, bytes, i);
  s = 0;
  while (s < 8) {
    tn(t, 8 * s, int32ArrayInstance[s], int32ArrayInstance2[s]);
    ++s;
  }
  return 0;
}

function Hn(t, e) {
  var i = Va();
  var s = Va();
  var a = Va();
  var n = Va();
  var r = Va();
  var o = Va();
  var l = Va();
  var c = Va();
  var h = Va();
  An(i, t[1], t[0]);
  An(h, e[1], e[0]);
  kn(i, i, h);
  xn(s, t[0], t[1]);
  xn(h, e[0], e[1]);
  kn(s, s, h);
  kn(a, t[3], e[3]);
  kn(a, a, Ka);
  kn(n, t[2], e[2]);
  xn(n, n, n);
  An(r, s, i);
  An(o, n, a);
  xn(l, n, a);
  xn(c, s, i);
  kn(t[0], r, o);
  kn(t[1], c, l);
  kn(t[2], l, o);
  kn(t[3], r, c);
  return;
}

function Yn(t, e, i) {
  for (var index = 0; index < 4; ++index) {
    Sn(t[index], e[index], i);
  }
  return;
}

function Wn(t, e) {
  var i = Va();
  var s = Va();
  var a = Va();
  _n(a, e[2]);
  kn(i, e[0], a);
  kn(s, e[1], a);
  Tn(t, s);
  t[31] ^= Cn(i) << 7;
  return;
}

function zn(t, e, i) {
  let s;
  vn(t[0], za);
  vn(t[1], Xa);
  vn(t[2], Xa);
  vn(t[3], za);
  for (var index = 255; index >= 0; --index) {
    Yn(t, e, (s = (i[(index / 8) | 0] >> (7 & index)) & 1));
    Hn(e, t);
    Hn(t, t);
    Yn(t, e, s);
  }
  return;
}

function Xn(t, e) {
  var items = [Va(), Va(), Va(), Va()];
  vn(items[0], Ja);
  vn(items[1], Qa);
  vn(items[2], Xa);
  kn(items[3], Ja, Qa);
  zn(t, items, e);
  return;
}

function $n(t, e, i) {
  var bytes = new Uint8Array(64);
  var items = [Va(), Va(), Va(), Va()];
  if (!i) {
    Ha(e, 32);
  }
  Vn(bytes, e, 32);
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  Xn(items, bytes);
  Wn(t, items);
  for (var index = 0; index < 32; ++index) {
    e[index + 32] = t[index];
  }
  return 0;
}

var qn;

function Kn(t, e) {
  let i;
  let s;
  let a;
  for (s = 63; s >= 32; --s) {
    i = 0;
    a = s - 32;
    var difference = s - 12;
    while (a < difference) {
      e[a] += i - 16 * e[s] * qn[a - (s - 32)];
      i = Math.floor((e[a] + 128) / 256);
      e[a] -= 256 * i;
      ++a;
    }
    e[a] += i;
    e[s] = 0;
  }
  i = 0;
  a = 0;
  while (a < 32) {
    e[a] += i - (e[31] >> 4) * qn[a];
    i = e[a] >> 8;
    e[a] &= 255;
    ++a;
  }
  a = 0;
  while (a < 32) {
    e[a] -= i * qn[a];
    ++a;
  }
  s = 0;
  while (s < 32) {
    e[s + 1] += e[s] >> 8;
    t[s] = 255 & e[s];
    ++s;
  }
  return;
}

function Jn(t) {
  let e;
  var float64Values = new Float64Array(64);
  for (e = 0; e < 64; ++e) {
    float64Values[e] = t[e];
  }
  e = 0;
  while (e < 64) {
    t[e] = 0;
    ++e;
  }
  Kn(t, float64Values);
  return;
}

function Qn(t, e, i, s) {
  let a;
  var bytes = new Uint8Array(64);
  var bytes2 = new Uint8Array(64);
  var bytes3 = new Uint8Array(64);
  var float64Values = new Float64Array(64);
  var items = [Va(), Va(), Va(), Va()];
  Vn(bytes, s, 32);
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  var combinedValue = i + 64;
  for (a = 0; a < i; ++a) {
    t[64 + a] = e[a];
  }
  a = 0;
  while (a < 32) {
    t[32 + a] = bytes[32 + a];
    ++a;
  }
  Vn(bytes3, t.subarray(32), i + 32);
  Jn(bytes3);
  Xn(items, bytes3);
  Wn(t, items);
  a = 32;
  while (a < 64) {
    t[a] = s[a];
    ++a;
  }
  Vn(bytes2, t, i + 64);
  Jn(bytes2);
  a = 0;
  while (a < 64) {
    float64Values[a] = 0;
    ++a;
  }
  a = 0;
  while (a < 32) {
    float64Values[a] = bytes3[a];
    ++a;
  }
  a = 0;
  while (a < 32) {
    for (var index = 0; index < 32; ++index) {
      float64Values[a + index] += bytes2[a] * bytes[index];
    }
    ++a;
  }
  Kn(t.subarray(32), float64Values);
  return combinedValue;
}

var qa;

function Zn(t, e) {
  var i = Va();
  var s = Va();
  var a = Va();
  var n = Va();
  var r = Va();
  var o = Va();
  var l = Va();
  vn(t[2], Xa);
  Nn(t[1], e);
  Pn(a, t[1]);
  kn(n, a, qa);
  An(a, a, t[2]);
  xn(n, t[2], n);
  Pn(r, n);
  Pn(o, r);
  kn(l, o, r);
  kn(i, l, a);
  kn(i, i, n);
  In(i, i);
  kn(i, i, a);
  kn(i, i, n);
  kn(i, i, n);
  kn(t[0], i, n);
  Pn(s, t[0]);
  kn(s, s, n);
  if (Mn(s, a)) {
    kn(t[0], t[0], Za);
  }
  Pn(s, t[0]);
  kn(s, s, n);
  if (Mn(s, a)) {
    return -1;
  }
  if (Cn(t[0]) === e[31] >> 7) {
    An(t[0], za, t[0]);
  }
  kn(t[3], t[0], t[1]);
  return 0;
}

function tr(t, e, i, s) {
  let a;
  var bytes = new Uint8Array(32);
  var bytes2 = new Uint8Array(64);
  var items = [Va(), Va(), Va(), Va()];
  var items2 = [Va(), Va(), Va(), Va()];
  if (i < 64) {
    return -1;
  }
  if (Zn(items2, s)) {
    return -1;
  }
  for (a = 0; a < i; ++a) {
    t[a] = e[a];
  }
  a = 0;
  while (a < 32) {
    t[a + 32] = s[a];
    ++a;
  }
  Vn(bytes2, t, i);
  Jn(bytes2);
  zn(items, items2, bytes2);
  Xn(items2, e.subarray(32));
  Hn(items, items2);
  Wn(bytes, items);
  i -= 64;
  if (an(e, 0, bytes, 0)) {
    a = 0;
    while (a < i) {
      t[a] = 0;
      ++a;
    }
    return -1;
  }
  a = 0;
  while (a < i) {
    t[a] = e[a + 64];
    ++a;
  }
  return i;
}

var keyLength;

var nonceLength;

function yr(t, e) {
  if (t.length !== keyLength) {
    throw new Error("bad key size");
  }
  if (e.length !== nonceLength) {
    throw new Error("bad nonce size");
  }
  return;
}

var publicKeyLength;

var secretKeyLength;

function vr(t, e) {
  if (t.length !== publicKeyLength) {
    throw new Error("bad public key size");
  }
  if (e.length !== secretKeyLength) {
    throw new Error("bad secret key size");
  }
  return;
}

function wr() {
  var var1 = arguments;
  for (var index = 0; index < var1.length; ++index) {
    if (!(var1[index] instanceof Uint8Array)) {
      throw new TypeError("unexpected type, use Uint8Array");
    }
  }
  return;
}

function Mr(t) {
  let e = "";
  for (let index = 0; index < t.length; index += 3) {
    const s = (t[index] << 16) | ((t[index + 1] || 0) << 8) | (t[index + 2] || 0);
    e +=
      Tr[(s >>> 18) & 63] +
      Tr[(s >>> 12) & 63] +
      (index + 1 < t.length ? Tr[(s >>> 6) & 63] : "=") +
      (index + 2 < t.length ? Tr[63 & s] : "=");
  }
  return e;
}

function Nr(text2) {
  if (
    typeof text2 != "string" ||
    !/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(text2)
  ) {
    throw new Error("Invalid base64");
  }
  const bytes = new Uint8Array(
    (text2.length / 4) * 3 - (text2.endsWith("==") ? 2 : text2.endsWith("=") ? 1 : 0),
  );
  let i = 0;
  for (let index = 0; index < text2.length; index += 4) {
    const a =
      (Cr[text2.charCodeAt(index)] << 18) |
      (Cr[text2.charCodeAt(index + 1)] << 12) |
      (Cr[text2.charCodeAt(index + 2)] << 6) |
      Cr[text2.charCodeAt(index + 3)];
    if (i < bytes.length) {
      bytes[i++] = (a >>> 16) & 255;
    }
    if (i < bytes.length) {
      bytes[i++] = (a >>> 8) & 255;
    }
    if (i < bytes.length) {
      bytes[i++] = 255 & a;
    }
  }
  return bytes;
}

function xr(t) {
  const unescapeResult = unescape(encodeURIComponent(t));
  return Uint8Array.from(unescapeResult, (text2) => text2.charCodeAt(0));
}

function Ar(t) {
  let e = "";
  for (let index = 0; index < t.length; index += 32768) {
    e += String.fromCharCode.apply(
      null,
      t.subarray
        ? t.subarray(index, index + 32768)
        : Array.prototype.slice.call(t, index, index + 32768),
    );
  }
  return decodeURIComponent(escape(e));
}

var record9 = {};

Va = function (t) {
  var float64Values = new Float64Array(16);
  if (t) {
    for (var index = 0; index < t.length; ++index) {
      float64Values[index] = t[index];
    }
  }
  return float64Values;
};

Ha = function () {
  throw new Error("no PRNG");
};

Ya = new Uint8Array(16);

Wa = new Uint8Array(32);

Wa[0] = 9;

za = Va();

Xa = Va([1]);

$a = Va([56129, 1]);

qa = Va([
  30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119,
  27886, 20995,
]);

Ka = Va([
  61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239,
  55772, 9222,
]);

Ja = Va([
  54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590,
  14035, 8553,
]);

Qa = Va([
  26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
  26214, 26214,
]);

Za = Va([
  41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417,
  9344, 11139,
]);

cn = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

pn = function (t) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;
  var e = (255 & t[0]) | ((255 & t[1]) << 8);
  this.r[0] = 8191 & e;
  var i = (255 & t[2]) | ((255 & t[3]) << 8);
  this.r[1] = 8191 & ((e >>> 13) | (i << 3));
  var s = (255 & t[4]) | ((255 & t[5]) << 8);
  this.r[2] = 7939 & ((i >>> 10) | (s << 6));
  var a = (255 & t[6]) | ((255 & t[7]) << 8);
  this.r[3] = 8191 & ((s >>> 7) | (a << 9));
  var n = (255 & t[8]) | ((255 & t[9]) << 8);
  this.r[4] = 255 & ((a >>> 4) | (n << 12));
  this.r[5] = (n >>> 1) & 8190;
  var r = (255 & t[10]) | ((255 & t[11]) << 8);
  this.r[6] = 8191 & ((n >>> 14) | (r << 2));
  var o = (255 & t[12]) | ((255 & t[13]) << 8);
  this.r[7] = 8065 & ((r >>> 11) | (o << 5));
  var l = (255 & t[14]) | ((255 & t[15]) << 8);
  this.r[8] = 8191 & ((o >>> 8) | (l << 8));
  this.r[9] = (l >>> 5) & 127;
  this.pad[0] = (255 & t[16]) | ((255 & t[17]) << 8);
  this.pad[1] = (255 & t[18]) | ((255 & t[19]) << 8);
  this.pad[2] = (255 & t[20]) | ((255 & t[21]) << 8);
  this.pad[3] = (255 & t[22]) | ((255 & t[23]) << 8);
  this.pad[4] = (255 & t[24]) | ((255 & t[25]) << 8);
  this.pad[5] = (255 & t[26]) | ((255 & t[27]) << 8);
  this.pad[6] = (255 & t[28]) | ((255 & t[29]) << 8);
  this.pad[7] = (255 & t[30]) | ((255 & t[31]) << 8);
  return;
};

pn.prototype.blocks = function (t, e, i) {
  let s;
  let a;
  let n;
  let r;
  let o;
  let l;
  let c;
  let h;
  var T = this.fin ? 0 : 2048;
  var M = this.h[0];
  var C = this.h[1];
  var N = this.h[2];
  var x = this.h[3];
  var A = this.h[4];
  var k = this.h[5];
  var P = this.h[6];
  var _ = this.h[7];
  var I = this.h[8];
  var B = this.h[9];
  var F = this.r[0];
  var D = this.r[1];
  var L = this.r[2];
  var R = this.r[3];
  var E = this.r[4];
  var O = this.r[5];
  var U = this.r[6];
  var j = this.r[7];
  var G = this.r[8];
  var V = this.r[9];
  while (i >= 16) {
    combinedValue =
      (combinedValue = d = 0) + (M += 8191 & (s = (255 & t[e + 0]) | ((255 & t[e + 1]) << 8))) * F;
    combinedValue +=
      (C += 8191 & ((s >>> 13) | ((a = (255 & t[e + 2]) | ((255 & t[e + 3]) << 8)) << 3))) * 5 * V;
    combinedValue +=
      (N += 8191 & ((a >>> 10) | ((n = (255 & t[e + 4]) | ((255 & t[e + 5]) << 8)) << 6))) * 5 * G;
    combinedValue +=
      (x += 8191 & ((n >>> 7) | ((r = (255 & t[e + 6]) | ((255 & t[e + 7]) << 8)) << 9))) * 5 * j;
    combinedValue +=
      (A += 8191 & ((r >>> 4) | ((o = (255 & t[e + 8]) | ((255 & t[e + 9]) << 8)) << 12))) * 5 * U;
    var d = combinedValue >>> 13;
    combinedValue &= 8191;
    combinedValue += (k += (o >>> 1) & 8191) * 5 * O;
    combinedValue +=
      (P += 8191 & ((o >>> 14) | ((l = (255 & t[e + 10]) | ((255 & t[e + 11]) << 8)) << 2))) *
      5 *
      E;
    combinedValue +=
      (_ += 8191 & ((l >>> 11) | ((c = (255 & t[e + 12]) | ((255 & t[e + 13]) << 8)) << 5))) *
      5 *
      R;
    var combinedValue =
      combinedValue +
      (I += 8191 & ((c >>> 8) | ((h = (255 & t[e + 14]) | ((255 & t[e + 15]) << 8)) << 8))) * 5 * L;
    d += (combinedValue += (B += (h >>> 5) | T) * 5 * D) >>> 13;
    combinedValue2 = (combinedValue2 = d) + M * D;
    combinedValue2 += C * F;
    combinedValue2 += N * 5 * V;
    combinedValue2 += x * 5 * G;
    combinedValue2 += A * 5 * j;
    d = combinedValue2 >>> 13;
    combinedValue2 &= 8191;
    combinedValue2 += k * 5 * U;
    combinedValue2 += P * 5 * O;
    combinedValue2 += _ * 5 * E;
    var combinedValue2 = combinedValue2 + I * 5 * R;
    d += (combinedValue2 += B * 5 * L) >>> 13;
    combinedValue2 &= 8191;
    combinedValue3 = (combinedValue3 = d) + M * L;
    combinedValue3 += C * D;
    combinedValue3 += N * F;
    combinedValue3 += x * 5 * V;
    combinedValue3 += A * 5 * G;
    d = combinedValue3 >>> 13;
    combinedValue3 &= 8191;
    combinedValue3 += k * 5 * j;
    combinedValue3 += P * 5 * U;
    combinedValue3 += _ * 5 * O;
    var combinedValue3 = combinedValue3 + I * 5 * E;
    d += (combinedValue3 += B * 5 * R) >>> 13;
    combinedValue4 = (combinedValue4 = d) + M * R;
    combinedValue4 += C * L;
    combinedValue4 += N * D;
    combinedValue4 += x * F;
    combinedValue4 += A * 5 * V;
    d = combinedValue4 >>> 13;
    combinedValue4 &= 8191;
    combinedValue4 += k * 5 * G;
    combinedValue4 += P * 5 * j;
    combinedValue4 += _ * 5 * U;
    var combinedValue4 = combinedValue4 + I * 5 * O;
    d += (combinedValue4 += B * 5 * E) >>> 13;
    combinedValue5 = (combinedValue5 = d) + M * E;
    combinedValue5 += C * R;
    combinedValue5 += N * L;
    combinedValue5 += x * D;
    combinedValue5 += A * F;
    d = combinedValue5 >>> 13;
    combinedValue5 &= 8191;
    combinedValue5 += k * 5 * V;
    combinedValue5 += P * 5 * G;
    combinedValue5 += _ * 5 * j;
    var combinedValue5 = combinedValue5 + I * 5 * U;
    d += (combinedValue5 += B * 5 * O) >>> 13;
    combinedValue6 = (combinedValue6 = d) + M * O;
    combinedValue6 += C * E;
    combinedValue6 += N * R;
    combinedValue6 += x * L;
    combinedValue6 += A * D;
    d = combinedValue6 >>> 13;
    combinedValue6 &= 8191;
    combinedValue6 += k * F;
    combinedValue6 += P * 5 * V;
    combinedValue6 += _ * 5 * G;
    var combinedValue6 = combinedValue6 + I * 5 * j;
    d += (combinedValue6 += B * 5 * U) >>> 13;
    combinedValue7 = (combinedValue7 = d) + M * U;
    combinedValue7 += C * O;
    combinedValue7 += N * E;
    combinedValue7 += x * R;
    combinedValue7 += A * L;
    d = combinedValue7 >>> 13;
    combinedValue7 &= 8191;
    combinedValue7 += k * D;
    combinedValue7 += P * F;
    combinedValue7 += _ * 5 * V;
    var combinedValue7 = combinedValue7 + I * 5 * G;
    d += (combinedValue7 += B * 5 * j) >>> 13;
    combinedValue8 = (combinedValue8 = d) + M * j;
    combinedValue8 += C * U;
    combinedValue8 += N * O;
    combinedValue8 += x * E;
    combinedValue8 += A * R;
    d = combinedValue8 >>> 13;
    combinedValue8 &= 8191;
    combinedValue8 += k * L;
    combinedValue8 += P * D;
    combinedValue8 += _ * F;
    var combinedValue8 = combinedValue8 + I * 5 * V;
    d += (combinedValue8 += B * 5 * G) >>> 13;
    combinedValue9 = (combinedValue9 = d) + M * G;
    combinedValue9 += C * j;
    combinedValue9 += N * U;
    combinedValue9 += x * O;
    combinedValue9 += A * E;
    d = combinedValue9 >>> 13;
    combinedValue9 &= 8191;
    combinedValue9 += k * R;
    combinedValue9 += P * L;
    combinedValue9 += _ * D;
    var combinedValue9 = combinedValue9 + I * F;
    d += (combinedValue9 += B * 5 * V) >>> 13;
    combinedValue10 = (combinedValue10 = d) + M * V;
    combinedValue10 += C * G;
    combinedValue10 += N * j;
    combinedValue10 += x * U;
    combinedValue10 += A * O;
    d = combinedValue10 >>> 13;
    combinedValue10 &= 8191;
    combinedValue10 += k * E;
    combinedValue10 += P * R;
    combinedValue10 += _ * L;
    var combinedValue10 = combinedValue10 + I * D;
    combinedValue =
      8191 &
      (d =
        ((d = (((d += (combinedValue10 += B * F) >>> 13) << 2) + d) | 0) +
          (combinedValue &= 8191)) |
        0);
    M = combinedValue;
    combinedValue2 += d >>>= 13;
    C = combinedValue2;
    combinedValue3 &= 8191;
    N = combinedValue3;
    combinedValue4 &= 8191;
    x = combinedValue4;
    combinedValue5 &= 8191;
    A = combinedValue5;
    combinedValue6 &= 8191;
    k = combinedValue6;
    combinedValue7 &= 8191;
    P = combinedValue7;
    combinedValue8 &= 8191;
    _ = combinedValue8;
    combinedValue9 &= 8191;
    I = combinedValue9;
    combinedValue10 &= 8191;
    B = combinedValue10;
    e += 16;
    i -= 16;
  }
  this.h[0] = M;
  this.h[1] = C;
  this.h[2] = N;
  this.h[3] = x;
  this.h[4] = A;
  this.h[5] = k;
  this.h[6] = P;
  this.h[7] = _;
  this.h[8] = I;
  this.h[9] = B;
  return;
};

pn.prototype.finish = function (t, e) {
  let n;
  var uint16Values = new Uint16Array(10);
  if (this.leftover) {
    n = this.leftover;
    this.buffer[n++] = 1;
    while (n < 16) {
      this.buffer[n] = 0;
      ++n;
    }
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }
  var i = this.h[1] >>> 13;
  this.h[1] &= 8191;
  n = 2;
  while (n < 10) {
    this.h[n] += i;
    i = this.h[n] >>> 13;
    this.h[n] &= 8191;
    ++n;
  }
  this.h[0] += 5 * i;
  i = this.h[0] >>> 13;
  this.h[0] &= 8191;
  this.h[1] += i;
  i = this.h[1] >>> 13;
  this.h[1] &= 8191;
  this.h[2] += i;
  uint16Values[0] = this.h[0] + 5;
  i = uint16Values[0] >>> 13;
  uint16Values[0] &= 8191;
  n = 1;
  while (n < 10) {
    uint16Values[n] = this.h[n] + i;
    i = uint16Values[n] >>> 13;
    uint16Values[n] &= 8191;
    ++n;
  }
  uint16Values[9] -= 8192;
  var difference = (1 ^ i) - 1;
  n = 0;
  while (n < 10) {
    uint16Values[n] &= difference;
    ++n;
  }
  difference = ~difference;
  n = 0;
  while (n < 10) {
    this.h[n] = (this.h[n] & difference) | uint16Values[n];
    ++n;
  }
  this.h[0] = 65535 & (this.h[0] | (this.h[1] << 13));
  this.h[1] = 65535 & ((this.h[1] >>> 3) | (this.h[2] << 10));
  this.h[2] = 65535 & ((this.h[2] >>> 6) | (this.h[3] << 7));
  this.h[3] = 65535 & ((this.h[3] >>> 9) | (this.h[4] << 4));
  this.h[4] = 65535 & ((this.h[4] >>> 12) | (this.h[5] << 1) | (this.h[6] << 14));
  this.h[5] = 65535 & ((this.h[6] >>> 2) | (this.h[7] << 11));
  this.h[6] = 65535 & ((this.h[7] >>> 5) | (this.h[8] << 8));
  this.h[7] = 65535 & ((this.h[8] >>> 8) | (this.h[9] << 5));
  var combinedValue = this.h[0] + this.pad[0];
  this.h[0] = 65535 & combinedValue;
  n = 1;
  while (n < 8) {
    combinedValue = (((this.h[n] + this.pad[n]) | 0) + (combinedValue >>> 16)) | 0;
    this.h[n] = 65535 & combinedValue;
    ++n;
  }
  t[e + 0] = (this.h[0] >>> 0) & 255;
  t[e + 1] = (this.h[0] >>> 8) & 255;
  t[e + 2] = (this.h[1] >>> 0) & 255;
  t[e + 3] = (this.h[1] >>> 8) & 255;
  t[e + 4] = (this.h[2] >>> 0) & 255;
  t[e + 5] = (this.h[2] >>> 8) & 255;
  t[e + 6] = (this.h[3] >>> 0) & 255;
  t[e + 7] = (this.h[3] >>> 8) & 255;
  t[e + 8] = (this.h[4] >>> 0) & 255;
  t[e + 9] = (this.h[4] >>> 8) & 255;
  t[e + 10] = (this.h[5] >>> 0) & 255;
  t[e + 11] = (this.h[5] >>> 8) & 255;
  t[e + 12] = (this.h[6] >>> 0) & 255;
  t[e + 13] = (this.h[6] >>> 8) & 255;
  t[e + 14] = (this.h[7] >>> 0) & 255;
  t[e + 15] = (this.h[7] >>> 8) & 255;
  return;
};

pn.prototype.update = function (t, e, i) {
  let s;
  let a;
  if (this.leftover) {
    a = 16 - this.leftover;
    if (a > i) {
      a = i;
    }
    for (s = 0; s < a; ++s) {
      this.buffer[this.leftover + s] = t[e + s];
    }
    i -= a;
    e += a;
    this.leftover += a;
    if (this.leftover < 16) {
      return;
    }
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }
  if (i >= 16) {
    a = i - (i % 16);
    this.blocks(t, e, a);
    e += a;
  }
  i -= a;
  if (i) {
    s = 0;
    while (s < i) {
      this.buffer[this.leftover + s] = t[e + s];
      ++s;
    }
    this.leftover += i;
  }
  return;
};

Rn = bn;

En = yn;

jn = [
  1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548,
  961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560,
  3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
  1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868,
  3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933,
  770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
  2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956,
  3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936,
  666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
  1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
  2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008,
  3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
  430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280,
  958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899,
  1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
  2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427,
  3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992,
  116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
  685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676,
  1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591,
];

qn = new Float64Array([
  237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 16,
]);

keyLength = 32;

nonceLength = 24;

var sr = 32;

var overheadLength = 16;

var groupElementLength = 32;

var scalarLength = 32;

publicKeyLength = 32;

secretKeyLength = 32;

var sharedKeyLength = 32;

var nonceLength2 = nonceLength;

var dr = sr;

var ur = overheadLength;

var signatureLength = 64;

var publicKeyLength2 = 32;

var secretKeyLength2 = 64;

var seedLength = 32;

var hashLength = 64;

record9.lowlevel = {
  crypto_core_hsalsa20: ln,
  crypto_stream_xor: gn,
  crypto_stream: un,
  crypto_stream_salsa20_xor: hn,
  crypto_stream_salsa20: dn,
  crypto_onetimeauth: mn,
  crypto_onetimeauth_verify: fn,
  crypto_verify_16: sn,
  crypto_verify_32: an,
  crypto_secretbox: bn,
  crypto_secretbox_open: yn,
  crypto_scalarmult: Bn,
  crypto_scalarmult_base: Fn,
  crypto_box_beforenm: Ln,
  crypto_box_afternm: Rn,
  crypto_box: On,
  crypto_box_open: Un,
  crypto_box_keypair: Dn,
  crypto_hash: Vn,
  crypto_sign: Qn,
  crypto_sign_keypair: $n,
  crypto_sign_open: tr,
  crypto_secretbox_KEYBYTES: keyLength,
  crypto_secretbox_NONCEBYTES: nonceLength,
  crypto_secretbox_ZEROBYTES: sr,
  crypto_secretbox_BOXZEROBYTES: overheadLength,
  crypto_scalarmult_BYTES: groupElementLength,
  crypto_scalarmult_SCALARBYTES: scalarLength,
  crypto_box_PUBLICKEYBYTES: publicKeyLength,
  crypto_box_SECRETKEYBYTES: secretKeyLength,
  crypto_box_BEFORENMBYTES: sharedKeyLength,
  crypto_box_NONCEBYTES: nonceLength2,
  crypto_box_ZEROBYTES: dr,
  crypto_box_BOXZEROBYTES: ur,
  crypto_sign_BYTES: signatureLength,
  crypto_sign_PUBLICKEYBYTES: publicKeyLength2,
  crypto_sign_SECRETKEYBYTES: secretKeyLength2,
  crypto_sign_SEEDBYTES: seedLength,
  crypto_hash_BYTES: hashLength,
  gf: Va,
  D: qa,
  L: qn,
  pack25519: Tn,
  unpack25519: Nn,
  M: kn,
  A: xn,
  S: Pn,
  Z: An,
  pow2523: In,
  add: Hn,
  set25519: vn,
  modL: Kn,
  scalarmult: zn,
  scalarbase: Xn,
};

record9.randomBytes = function (t) {
  var bytes = new Uint8Array(t);
  Ha(bytes, t);
  return bytes;
};

record9.secretbox = function (t, e, i) {
  wr(t, e, i);
  yr(i, e);
  var bytes = new Uint8Array(sr + t.length);
  var bytes2 = new Uint8Array(bytes.length);
  for (var index = 0; index < t.length; ++index) {
    bytes[index + sr] = t[index];
  }
  bn(bytes2, bytes, bytes.length, e, i);
  return bytes2.subarray(overheadLength);
};

record9.secretbox.open = function (t, e, i) {
  wr(t, e, i);
  yr(i, e);
  var bytes = new Uint8Array(overheadLength + t.length);
  var bytes2 = new Uint8Array(bytes.length);
  for (var index = 0; index < t.length; ++index) {
    bytes[index + overheadLength] = t[index];
  }
  if (bytes.length < 32 || yn(bytes2, bytes, bytes.length, e, i) !== 0) {
    return null;
  }
  return bytes2.subarray(sr);
};

record9.secretbox.keyLength = keyLength;

record9.secretbox.nonceLength = nonceLength;

record9.secretbox.overheadLength = overheadLength;

record9.scalarMult = function (t, e) {
  wr(t, e);
  if (t.length !== scalarLength) {
    throw new Error("bad n size");
  }
  if (e.length !== groupElementLength) {
    throw new Error("bad p size");
  }
  var bytes = new Uint8Array(groupElementLength);
  Bn(bytes, t, e);
  return bytes;
};

record9.scalarMult.base = function (t) {
  wr(t);
  if (t.length !== scalarLength) {
    throw new Error("bad n size");
  }
  var bytes = new Uint8Array(groupElementLength);
  Fn(bytes, t);
  return bytes;
};

record9.scalarMult.scalarLength = scalarLength;

record9.scalarMult.groupElementLength = groupElementLength;

record9.box = function (t, e, i, s) {
  var beforeResult = record9.box.before(i, s);
  return record9.secretbox(t, e, beforeResult);
};

record9.box.before = function (t, e) {
  wr(t, e);
  vr(t, e);
  var bytes = new Uint8Array(sharedKeyLength);
  Ln(bytes, t, e);
  return bytes;
};

record9.box.after = record9.secretbox;

record9.box.open = function (t, e, i, s) {
  var beforeResult = record9.box.before(i, s);
  return record9.secretbox.open(t, e, beforeResult);
};

record9.box.open.after = record9.secretbox.open;

record9.box.keyPair = function () {
  var bytes = new Uint8Array(publicKeyLength);
  var bytes2 = new Uint8Array(secretKeyLength);
  Dn(bytes, bytes2);
  return {
    publicKey: bytes,
    secretKey: bytes2,
  };
};

record9.box.keyPair.fromSecretKey = function (t) {
  wr(t);
  if (t.length !== secretKeyLength) {
    throw new Error("bad secret key size");
  }
  var bytes = new Uint8Array(publicKeyLength);
  Fn(bytes, t);
  return {
    publicKey: bytes,
    secretKey: new Uint8Array(t),
  };
};

record9.box.publicKeyLength = publicKeyLength;

record9.box.secretKeyLength = secretKeyLength;

record9.box.sharedKeyLength = sharedKeyLength;

record9.box.nonceLength = nonceLength2;

record9.box.overheadLength = record9.secretbox.overheadLength;

record9.sign = function (t, e) {
  wr(t, e);
  if (e.length !== secretKeyLength2) {
    throw new Error("bad secret key size");
  }
  var bytes = new Uint8Array(signatureLength + t.length);
  Qn(bytes, t, t.length, e);
  return bytes;
};

record9.sign.open = function (t, e) {
  let s;
  wr(t, e);
  if (e.length !== publicKeyLength2) {
    throw new Error("bad public key size");
  }
  var bytes = new Uint8Array(t.length);
  if ((s = tr(bytes, t, t.length, e)) < 0) {
    return null;
  }
  var bytes2 = new Uint8Array(s);
  for (var index = 0; index < bytes2.length; ++index) {
    bytes2[index] = bytes[index];
  }
  return bytes2;
};

record9.sign.detached = function (t, e) {
  var signResult = record9.sign(t, e);
  var bytes = new Uint8Array(signatureLength);
  for (var index = 0; index < bytes.length; ++index) {
    bytes[index] = signResult[index];
  }
  return bytes;
};

record9.sign.detached.verify = function (t, e, i) {
  let s;
  wr(t, e, i);
  if (e.length !== signatureLength) {
    throw new Error("bad signature size");
  }
  if (i.length !== publicKeyLength2) {
    throw new Error("bad public key size");
  }
  var bytes = new Uint8Array(signatureLength + t.length);
  var bytes2 = new Uint8Array(signatureLength + t.length);
  for (s = 0; s < signatureLength; ++s) {
    bytes[s] = e[s];
  }
  s = 0;
  while (s < t.length) {
    bytes[s + signatureLength] = t[s];
    ++s;
  }
  return tr(bytes2, bytes, bytes.length, i) >= 0;
};

record9.sign.keyPair = function () {
  var bytes = new Uint8Array(publicKeyLength2);
  var bytes2 = new Uint8Array(secretKeyLength2);
  $n(bytes, bytes2);
  return {
    publicKey: bytes,
    secretKey: bytes2,
  };
};

record9.sign.keyPair.fromSecretKey = function (t) {
  wr(t);
  if (t.length !== secretKeyLength2) {
    throw new Error("bad secret key size");
  }
  var bytes = new Uint8Array(publicKeyLength2);
  for (var index = 0; index < bytes.length; ++index) {
    bytes[index] = t[32 + index];
  }
  return {
    publicKey: bytes,
    secretKey: new Uint8Array(t),
  };
};

record9.sign.keyPair.fromSeed = function (t) {
  wr(t);
  if (t.length !== seedLength) {
    throw new Error("bad seed size");
  }
  var bytes = new Uint8Array(publicKeyLength2);
  var bytes2 = new Uint8Array(secretKeyLength2);
  for (var index = 0; index < 32; ++index) {
    bytes2[index] = t[index];
  }
  $n(bytes, bytes2, true);
  return {
    publicKey: bytes,
    secretKey: bytes2,
  };
};

record9.sign.publicKeyLength = publicKeyLength2;

record9.sign.secretKeyLength = secretKeyLength2;

record9.sign.seedLength = seedLength;

record9.sign.signatureLength = signatureLength;

record9.hash = function (t) {
  wr(t);
  var bytes = new Uint8Array(hashLength);
  Vn(bytes, t, t.length);
  return bytes;
};

record9.hash.hashLength = hashLength;

record9.verify = function (t, e) {
  wr(t, e);
  return (
    t.length !== 0 && e.length !== 0 && t.length === e.length && en(t, 0, e, 0, t.length) === 0
  );
};

record9.setPRNG = function (t) {
  Ha = t;
  return;
};

var record10 = record9;

Tr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

Cr = (() => {
  const fillResult = new Int16Array(128).fill(0);
  for (let index = 0; index < Tr.length; index++) {
    fillResult[Tr.charCodeAt(index)] = index;
  }
  return fillResult;
})();

var kr = class t66 {
  constructor({
    timeoutMs: timeoutMs = 30000,
    maxResponseBytes: maxResponseBytes = 16777216,
  } = {}) {
    var maxResponseBytes2 = maxResponseBytes;
    var timeoutMs2 = timeoutMs;
    this.api = t66.bind();
    this.timeoutMs = timeoutMs2;
    this.maxResponseBytes = maxResponseBytes2;
    return;
  }
  static bind() {
    if (this.api) {
      return this.api;
    }
    const module = Process.getModuleByName("libc.so");
    const e = (exportName, i, s) => new NativeFunction(module.getExportByName(exportName), i, s);
    const api = {
      error: 0,
    };
    const s = (exportName, s, a) => {
      const systemFunctionInstance = new SystemFunction(module.getExportByName(exportName), s, a);
      return (...t) => {
        const systemFunctionInstanceResult = systemFunctionInstance(...t);
        api.error = systemFunctionInstanceResult.errno;
        return systemFunctionInstanceResult.value;
      };
    };
    Object.assign(api, {
      socket: e("socket", "int", ["int", "int", "int"]),
      connect: s("connect", "int", ["int", "pointer", "uint"]),
      fcntl: e("fcntl", "int", ["int", "int", "int"]),
      poll: s("poll", "int", ["pointer", "ulong", "int"]),
      send: s("send", "long", ["int", "pointer", "ulong", "int"]),
      recv: s("recv", "long", ["int", "pointer", "ulong", "int"]),
      close: e("close", "int", ["int"]),
      errno: () => {
        return {
          readS32: () => api.error,
        };
      },
      getsockopt: e("getsockopt", "int", ["int", "int", "int", "pointer", "pointer"]),
      clock: e("clock_gettime", "int", ["int", "pointer"]),
    });
    this.api = api;
    return this.api;
  }
  now() {
    const memoryBuffer = Memory.alloc(16);
    if (this.api.clock(1, memoryBuffer) !== 0) {
      throw Error("Clock unavailable");
    }
    return (
      1000 * memoryBuffer.readS64().toNumber() + memoryBuffer.add(8).readS64().toNumber() / 1000000
    );
  }
  wait(t, e, i) {
    const memoryBuffer = Memory.alloc(8);
    memoryBuffer.writeS32(t);
    memoryBuffer.add(4).writeS16(e);
    while (true) {
      const ceilResult = Math.ceil(i - this.now());
      if (ceilResult <= 0) {
        break;
      }
      memoryBuffer.add(6).writeS16(0);
      const pollResult = this.api.poll(memoryBuffer, 1, ceilResult);
      if (!(pollResult < 0) || this.api.errno().readS32() !== 4) {
        if (pollResult <= 0) {
          throw Error("TCP timeout");
        }
        const s16 = memoryBuffer.add(6).readS16();
        if (s16 & e) {
          return;
        }
        if (56 & s16) {
          throw Error("TCP connection closed");
        }
      }
    }
    throw Error("TCP timeout");
  }
  transfer(t, e, i, s, a) {
    let n = 0;
    while (n < i) {
      this.wait(t, s ? 4 : 1, a);
      const numberResult = Number(
        s ? this.api.send(t, e.add(n), i - n, 16384) : this.api.recv(t, e.add(n), i - n, 0),
      );
      if (numberResult < 0) {
        const s32 = this.api.errno().readS32();
        if (s32 !== 4 && s32 !== 11) {
          throw Error("TCP transfer failed");
        }
      } else {
        if (numberResult === 0) {
          throw Error("TCP connection closed");
        }
        n += numberResult;
      }
    }
    return;
  }
  request(t, e, i) {
    const parts = t.split(".");
    if (
      parts.length !== 4 ||
      parts.some((t) => !/^\d{1,3}$/.test(t) || Number(t) > 255) ||
      !Number.isInteger(e) ||
      e < 1 ||
      e > 65535
    ) {
      throw Error("Configure a TCP IPv4 address and port");
    }
    const bytes = xr(JSON.stringify(i));
    if (!bytes.length || bytes.length > 32768) {
      throw Error("TCP request too large");
    }
    const socketResult = this.api.socket(2, 524289, 0);
    if (socketResult < 0) {
      throw Error("TCP socket unavailable");
    }
    try {
      const combinedValue = this.now() + this.timeoutMs;
      const fcntlResult = this.api.fcntl(socketResult, 3, 0);
      if (fcntlResult < 0 || this.api.fcntl(socketResult, 4, 2048 | fcntlResult) < 0) {
        throw Error("TCP socket setup failed");
      }
      const memoryBuffer = Memory.alloc(16);
      memoryBuffer.writeByteArray(new Uint8Array(16));
      memoryBuffer.writeU16(2);
      memoryBuffer.add(2).writeU8(e >>> 8);
      memoryBuffer.add(3).writeU8(255 & e);
      memoryBuffer.add(4).writeByteArray(parts.map(Number));
      if (this.api.connect(socketResult, memoryBuffer, 16) !== 0) {
        const s32 = this.api.errno().readS32();
        if (s32 !== 115 && s32 !== 4) {
          throw Error("TCP connect failed");
        }
        this.wait(socketResult, 4, combinedValue);
        const memoryBuffer2 = Memory.alloc(4);
        const memoryBuffer3 = Memory.alloc(4);
        memoryBuffer3.writeU32(4);
        if (
          this.api.getsockopt(socketResult, 1, 4, memoryBuffer2, memoryBuffer3) !== 0 ||
          memoryBuffer2.readS32() !== 0
        ) {
          throw Error("TCP connect failed");
        }
      }
      const memoryBuffer4 = Memory.alloc(bytes.length + 4);
      memoryBuffer4.writeByteArray([
        (bytes.length >>> 24) & 255,
        (bytes.length >>> 16) & 255,
        (bytes.length >>> 8) & 255,
        255 & bytes.length,
      ]);
      memoryBuffer4.add(4).writeByteArray(bytes);
      this.transfer(socketResult, memoryBuffer4, bytes.length + 4, true, combinedValue);
      const memoryBuffer5 = Memory.alloc(4);
      this.transfer(socketResult, memoryBuffer5, 4, false, combinedValue);
      const bytes2 = new Uint8Array(memoryBuffer5.readByteArray(4));
      const combinedValue2 = 16777216 * bytes2[0] + 65536 * bytes2[1] + 256 * bytes2[2] + bytes2[3];
      if (!combinedValue2 || combinedValue2 > this.maxResponseBytes) {
        throw Error("Invalid TCP response length");
      }
      const memoryBuffer6 = Memory.alloc(combinedValue2);
      this.transfer(socketResult, memoryBuffer6, combinedValue2, false, combinedValue);
      return JSON.parse(Ar(new Uint8Array(memoryBuffer6.readByteArray(combinedValue2))));
    } finally {
      this.api.close(socketResult);
    }
  }
};

var record11 = {
  tcpHost: "2.27.22.190",
  tcpPort: 9339,
  serverPublicKey: "iT9PWO2iw3f/MgrOYhWDr8LK22VMxckZ6aClgaeqhSc=",
  loaderVersion: "1.0",
};
