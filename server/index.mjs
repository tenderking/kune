import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { PrismaAdapter } from '@auth/prisma-adapter';
import EmailProvider from '@auth/core/providers/email';
import { skipCSRFCheck, Auth } from '@auth/core';
import { getToken } from '@auth/core/jwt';
import { PrismaClient } from '@prisma/client';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'vue-bundle-renderer/runtime';
import { stringify as stringify$1, uneval } from 'devalue';
import { renderToString, ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderSlot, ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderStyle, ssrGetDirectiveProps } from 'vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { version, unref, hasInjectionContext, inject, ref, watchEffect, watch as watch$1, getCurrentInstance, defineAsyncComponent, toRef, isRef, computed, readonly, defineComponent, provide, createElementBlock, h as h$1, shallowReactive, Suspense, nextTick, Transition, mergeProps, useSSRContext, createApp as createApp$1, effectScope, reactive, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, shallowRef, isReadonly, withCtx, isShallow, isReactive, toRaw, useAttrs, toValue, onUnmounted, renderSlot, resolveComponent, withAsyncContext, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, onMounted, Fragment, Teleport, normalizeClass, cloneVNode, renderList, withModifiers } from 'vue';
import { createServerHead as createServerHead$1, getActiveHead } from 'unhead';
import { defineHeadPlugin, composableNames, unpackMeta } from '@unhead/shared';
import { extendTailwindMerge, twMerge, twJoin } from 'tailwind-merge';
import { createSharedComposable, useEventBus, useDebounceFn, useVModel, useMediaQuery } from '@vueuse/core';
import { Icon } from '@iconify/vue/dist/offline';
import { addAPIProvider, loadIcon } from '@iconify/vue';
import { vOnClickOutside } from '@vueuse/components';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter as createRouter$2, START_LOCATION } from 'vue-router';
import { produce } from 'immer';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function isSamePath(p1, p2) {
  return decode$1(withoutTrailingSlash(p1)) === decode$1(withoutTrailingSlash(p2));
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H$3 = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W$2 = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H$3]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H$3]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W$2[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W$2[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W$2[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W$2[i] = gamma0 + W$2[i - 7] + gamma1 + W$2[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W$2[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$2(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$2(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getMethod(event, defaultMethod = "GET") {
  return (event.node.req.method || defaultMethod).toUpperCase();
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$2({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$2({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$2({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$2(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$2({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$2({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$2({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$2(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i$6=globalThis.AbortController,l$4=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l$4;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l$4(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i$6;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch$1 = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "7bc01fd4-522f-41b1-ace4-7bacfb720a4f"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};



const appConfig$1 = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "authJs": {
      "verifyClientOnEveryRequest": false,
      "guestRedirectTo": "/",
      "authenticatedRedirectTo": "/profile",
      "baseUrl": ""
    }
  },
  "authJs": {
    "secret": ""
  },
  "nodemailer": {
    "host": "",
    "port": "",
    "user": "",
    "password": "",
    "from": ""
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig$1(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig$1));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig$1();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError$1(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError$1(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError$1(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError$1(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/runner/work/kune/kune/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config$a = useRuntimeConfig$1();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config$a.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules$1(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules$1(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig$1().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

const script = "\"use strict\";(()=>{const a=window,e=document.documentElement,c=window.localStorage,d=[\"dark\",\"light\"],n=c&&c.getItem&&c.getItem(\"nuxt-color-mode\")||\"light\";let l=n===\"system\"?f():n;const i=e.getAttribute(\"data-color-mode-forced\");i&&(l=i),r(l),a[\"__NUXT_COLOR_MODE__\"]={preference:n,value:l,getColorScheme:f,addColorScheme:r,removeColorScheme:u};function r(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.add(t):e.className+=\" \"+t,s&&e.setAttribute(\"data-\"+s,o)}function u(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp(t,\"g\"),\"\"),s&&e.removeAttribute(\"data-\"+s)}function m(o){return a.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function f(){if(a.matchMedia&&m(\"\").media!==\"not all\"){for(const o of d)if(m(\":\"+o).matches)return o}return\"light\"}})();\n";

const _Xe22K6dJTC = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins$1 = [
  _Xe22K6dJTC
];

function defineRenderHandler(handler) {
  return eventHandler(async (event) => {
    if (event.path.endsWith("/favicon.ico")) {
      setResponseHeader(event, "Content-Type", "image/x-icon");
      return send(
        event,
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
    }
    const response = await handler(event);
    if (!response) {
      const _currentStatus = getResponseStatus(event);
      setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
      return send(
        event,
        "No response returned from render handler: " + event.path
      );
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (response.headers) {
      setResponseHeaders(event, response.headers);
    }
    if (response.statusCode || response.statusMessage) {
      setResponseStatus(event, response.statusCode, response.statusMessage);
    }
    return response.body;
  });
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig$1(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return error500$1; });
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/_nuxt/09vzWB4f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1422-TSgppicf8ysk6eN6GEBxa/ozXOw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 5154,
    "path": "../public/_nuxt/09vzWB4f.js"
  },
  "/_nuxt/4I1Kf0WR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18b-AtVGaBmOcnKBy0VCuOZqKm/WG1s\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 395,
    "path": "../public/_nuxt/4I1Kf0WR.js"
  },
  "/_nuxt/B-Mz5n1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"56fc-gGOnpBxyWqaeI9W0G4EQcsg4nb8\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 22268,
    "path": "../public/_nuxt/B-Mz5n1t.js"
  },
  "/_nuxt/BIHI7g3E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21-TnSDqNzuAbz1l2Zfx/fW4jY7tlk\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 33,
    "path": "../public/_nuxt/BIHI7g3E.js"
  },
  "/_nuxt/BKkGpO6y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18a-vVYHl91EG9/kPkyZlmOOKBTKHVI\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 394,
    "path": "../public/_nuxt/BKkGpO6y.js"
  },
  "/_nuxt/BQkc-AXV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"89c-N5DjUOMZCSc8CYevkQZAQyunMP0\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2204,
    "path": "../public/_nuxt/BQkc-AXV.js"
  },
  "/_nuxt/BaBb6H35.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"120e-QfQowOeOSjjKVI/kcAFmbcy7Pdw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 4622,
    "path": "../public/_nuxt/BaBb6H35.js"
  },
  "/_nuxt/Bnyrus5O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"923-Jb0xKNRR2v9NdWIHWeTONWbIjtA\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2339,
    "path": "../public/_nuxt/Bnyrus5O.js"
  },
  "/_nuxt/Bo0FqCma.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c3-lgVUWw8rpw5HXkd35dL0D820bFw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 6339,
    "path": "../public/_nuxt/Bo0FqCma.js"
  },
  "/_nuxt/Btqvf-6O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c20-+jevAtqiD4CjHTxtcAfKRBPlsDI\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 3104,
    "path": "../public/_nuxt/Btqvf-6O.js"
  },
  "/_nuxt/BzMVkZSi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a9d-yVDx9M8IN4TRbse/La2lYj03oLc\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 6813,
    "path": "../public/_nuxt/BzMVkZSi.js"
  },
  "/_nuxt/C0HSpouq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33c7-nlds5FpDW+y3t+bYlSA5UbQOukw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 13255,
    "path": "../public/_nuxt/C0HSpouq.js"
  },
  "/_nuxt/CCMW8JJt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e3-catcbv1iYL8LceVaHcxHJs3FStw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 227,
    "path": "../public/_nuxt/CCMW8JJt.js"
  },
  "/_nuxt/CDSFXxUh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12bc-JzhPo1amAPTtNe2j58e78KRMxo0\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 4796,
    "path": "../public/_nuxt/CDSFXxUh.js"
  },
  "/_nuxt/CEVl9N56.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2903-5IaQF4/ClgUtjV4+zFDEJKMokDc\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 10499,
    "path": "../public/_nuxt/CEVl9N56.js"
  },
  "/_nuxt/CGj3w8A4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2812-59y/c2fSPkqlWZDR0tAUYCI6EVM\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 10258,
    "path": "../public/_nuxt/CGj3w8A4.js"
  },
  "/_nuxt/CHpxzGe4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"305-SvGbt9/LQSZrk+/8yH45lAUtHw0\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 773,
    "path": "../public/_nuxt/CHpxzGe4.js"
  },
  "/_nuxt/CMBaOmER.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a53-ZTBtx58wfsEXSGr4subP/wpEfpQ\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2643,
    "path": "../public/_nuxt/CMBaOmER.js"
  },
  "/_nuxt/CWCGAW4c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ff7-7fnMSnbSalYH9iQdoTxyYQnrHDY\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 8183,
    "path": "../public/_nuxt/CWCGAW4c.js"
  },
  "/_nuxt/CnLlSDBM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bfe-YsvGhTjLfAheEqVWawPOgbu02Do\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 3070,
    "path": "../public/_nuxt/CnLlSDBM.js"
  },
  "/_nuxt/CriAs86Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c88-w2c1URKNFlp2WJbjuzIVVl5eJzc\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 3208,
    "path": "../public/_nuxt/CriAs86Q.js"
  },
  "/_nuxt/CuzP4DPA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10eb-MSGHeKr1pY1j02+Gm+NCTAoF2iU\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 4331,
    "path": "../public/_nuxt/CuzP4DPA.js"
  },
  "/_nuxt/D2KX5DPY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9833-8Y1szIDUoQlbVEufH1xFtZ33nwg\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 38963,
    "path": "../public/_nuxt/D2KX5DPY.js"
  },
  "/_nuxt/DpTXaeTy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69a-9yZswnu0Gl3fnM/rbO5gmfG9i+U\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1690,
    "path": "../public/_nuxt/DpTXaeTy.js"
  },
  "/_nuxt/DvDH6DOc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20ce-LYBElHFq0J3HbyoV4LIePfzA7/Q\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 8398,
    "path": "../public/_nuxt/DvDH6DOc.js"
  },
  "/_nuxt/Htusk4DY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3eda-P/sLmuCc3EC8OOjJDg6kPB9hfWE\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 16090,
    "path": "../public/_nuxt/Htusk4DY.js"
  },
  "/_nuxt/Icon.8lQfE3Ql.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-94megyLdO4/viLdnL2Kxt/gfOjM\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 67,
    "path": "../public/_nuxt/Icon.8lQfE3Ql.css"
  },
  "/_nuxt/IconCSS.Z2BAHt_z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-h9Iv/oJ6/LJjNheNG92kJMblk/8\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.Z2BAHt_z.css"
  },
  "/_nuxt/NavBar.CCQWWsvu.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b9-UcYzAqaTdthnr6OhjobHG4mIdRg\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 697,
    "path": "../public/_nuxt/NavBar.CCQWWsvu.css"
  },
  "/_nuxt/ServicesGridItem.BsNUMInJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"452-tj+56LxH0UMKaq78gi9clzbwNME\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1106,
    "path": "../public/_nuxt/ServicesGridItem.BsNUMInJ.css"
  },
  "/_nuxt/Table.IEMpyWWa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"96f-h90+HO9bSgPvU/nflWW2Lyzrw8w\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2415,
    "path": "../public/_nuxt/Table.IEMpyWWa.css"
  },
  "/_nuxt/TdVCrsJL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"301d2-rrCqchreUwmJx/a+hTLzAlrp1+Y\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 197074,
    "path": "../public/_nuxt/TdVCrsJL.js"
  },
  "/_nuxt/_service_.DhjGWvOB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d-QgD2O4stUDYNlFxypjDgc41A8Tg\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 61,
    "path": "../public/_nuxt/_service_.DhjGWvOB.css"
  },
  "/_nuxt/_tJio95A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8e0-bx9cP01M5WREqQQUmn7qmg4whw8\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2272,
    "path": "../public/_nuxt/_tJio95A.js"
  },
  "/_nuxt/about.B99wYO9Y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"170-ftwqeB52f3UFemRp1LlVlGhMJis\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 368,
    "path": "../public/_nuxt/about.B99wYO9Y.css"
  },
  "/_nuxt/contact.xdVGS5xN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26c-U7wyz8iGOiF6DAsIQy08tOvcFkQ\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 620,
    "path": "../public/_nuxt/contact.xdVGS5xN.css"
  },
  "/_nuxt/dashboard.DALcBn5q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dc-rfy7TKorMQ09o8ubY5L1dZEDDvQ\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 220,
    "path": "../public/_nuxt/dashboard.DALcBn5q.css"
  },
  "/_nuxt/default.BNPrjmNe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a4-dNDT+OOJZRKJmssB9xlQwEuRVaI\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 164,
    "path": "../public/_nuxt/default.BNPrjmNe.css"
  },
  "/_nuxt/error-404.JekaaCis.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-+wA7grMyiBYWUxUrDrQgnZGsVuQ\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.JekaaCis.css"
  },
  "/_nuxt/error-500.CNP9nqm1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Juu+xpvMf6y/oBf0WsXvPEH0ie4\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CNP9nqm1.css"
  },
  "/_nuxt/form.DHEc0nQ3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b-mPoqdy9FQL/fHmKXkwXP9AqGmbY\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 91,
    "path": "../public/_nuxt/form.DHEc0nQ3.css"
  },
  "/_nuxt/gBcN8L89.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e8-tl7PUtE4iWfaNnkEbzpl+lBSiLM\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 5608,
    "path": "../public/_nuxt/gBcN8L89.js"
  },
  "/_nuxt/iX9wfhsD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"417-NUVDkeonm5qHhsjPKSHC6ucmcMU\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1047,
    "path": "../public/_nuxt/iX9wfhsD.js"
  },
  "/_nuxt/index.BvMUs1e2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13c-vQXf3sxWsvh0goq5XoWOw1y9HXk\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 316,
    "path": "../public/_nuxt/index.BvMUs1e2.css"
  },
  "/_nuxt/index.Cyiq81UM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2bc-2TDDyV0cFUohYwns4rhrUdgD32I\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 700,
    "path": "../public/_nuxt/index.Cyiq81UM.css"
  },
  "/_nuxt/index.m1U39CHx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"607-87Bj92aClhlZKrEloLsU9oh3jXE\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1543,
    "path": "../public/_nuxt/index.m1U39CHx.css"
  },
  "/_nuxt/j7Uk16C4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ab3-zLMQYvhw9JJrjflhj1MesSfjvqw\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 2739,
    "path": "../public/_nuxt/j7Uk16C4.js"
  },
  "/_nuxt/services.BE4RQ7fY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a-WsBUdZEGAf3BMKn4uHAw10hTtlg\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 58,
    "path": "../public/_nuxt/services.BE4RQ7fY.css"
  },
  "/_nuxt/tL50MmKh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58b-stjuCEHKOGpnBdaEajW+k0P6iXk\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 1419,
    "path": "../public/_nuxt/tL50MmKh.js"
  },
  "/_nuxt/xzM5r98A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1364-2jzVjTfeK97MHtQjP4zgxg78M3Q\"",
    "mtime": "2024-06-07T12:07:27.324Z",
    "size": 4964,
    "path": "../public/_nuxt/xzM5r98A.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-9b0iWIr2PiEQx90dNV5SkGiBKwk\"",
    "mtime": "2024-06-07T12:07:27.304Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/7bc01fd4-522f-41b1-ace4-7bacfb720a4f.json": {
    "type": "application/json",
    "etag": "\"8b-QITMobYOWZlpyf7kfldzxfVjQXQ\"",
    "mtime": "2024-06-07T12:07:27.300Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/7bc01fd4-522f-41b1-ace4-7bacfb720a4f.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$2({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_9tXeCu = () => Promise.resolve().then(function () { return ______head$1; });
const _lazy_oU8akZ = () => Promise.resolve().then(function () { return _____$1; });
const _lazy_DtUkHQ = () => Promise.resolve().then(function () { return jwt$1; });
const _lazy_dS0lAK = () => Promise.resolve().then(function () { return _slug__get$3; });
const _lazy_ZhCc5V = () => Promise.resolve().then(function () { return _slug__get$1; });
const _lazy_SMI8jt = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_en95w6 = () => Promise.resolve().then(function () { return ______get$1; });
const _lazy_rrcP3Z = () => Promise.resolve().then(function () { return _user__post$1; });
const _lazy_2KmMOf = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_FXllCR = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_NI1CAl = () => Promise.resolve().then(function () { return _tag__get$1; });
const _lazy_0ITUfK = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_i4O7u2 = () => Promise.resolve().then(function () { return favorites_get$1; });
const _lazy_161BHV = () => Promise.resolve().then(function () { return services_get$1; });
const _lazy_AmY8LV = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/**', handler: _lazy_9tXeCu, lazy: true, middleware: false, method: "head" },
  { route: '/api/auth/**', handler: _lazy_oU8akZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/jwt', handler: _lazy_DtUkHQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/services/:slug', handler: _lazy_dS0lAK, lazy: true, middleware: false, method: "get" },
  { route: '/api/services/categories/:slug', handler: _lazy_ZhCc5V, lazy: true, middleware: false, method: "get" },
  { route: '/api/services/categories', handler: _lazy_SMI8jt, lazy: true, middleware: false, method: "get" },
  { route: '/api/services/favorites/**', handler: _lazy_en95w6, lazy: true, middleware: false, method: "get" },
  { route: '/api/services/favorites/:user', handler: _lazy_rrcP3Z, lazy: true, middleware: false, method: "post" },
  { route: '/api/services', handler: _lazy_2KmMOf, lazy: true, middleware: false, method: "get" },
  { route: '/api/services', handler: _lazy_FXllCR, lazy: true, middleware: false, method: "post" },
  { route: '/api/services/tags/:tag', handler: _lazy_NI1CAl, lazy: true, middleware: false, method: "get" },
  { route: '/api/services/tags', handler: _lazy_0ITUfK, lazy: true, middleware: false, method: "get" },
  { route: '/api/users/favorites', handler: _lazy_i4O7u2, lazy: true, middleware: false, method: "get" },
  { route: '/api/users/services', handler: _lazy_161BHV, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_AmY8LV, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_AmY8LV, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig$1();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins$1) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server$1 = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server$1.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig$1().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

const _messages = {"appName":"Nuxt","version":"","statusCode":500,"statusMessage":"Server error","description":"This page is temporarily unavailable."};
const _render = function({ messages }) {
var __t, __p = '';
__p += '<!DOCTYPE html><html data-critters-container><head><title>' +
((__t = ( messages.statusCode )) == null ? '' : __t) +
' - ' +
((__t = ( messages.statusMessage )) == null ? '' : __t) +
' | ' +
((__t = ( messages.appName )) == null ? '' : __t) +
'</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1,minimum-scale=1" name="viewport"><style>.spotlight{background:linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);filter:blur(20vh)}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255 / var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0 / var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme: dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0 / var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255 / var(--un-text-opacity))}}@media (min-width: 640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll(\'link[rel="modulepreload"]\'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();</script></head><body class="font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden"><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight"></div><div class="max-w-520px text-center"><h1 class="text-8xl sm:text-10xl font-medium mb-8">' +
((__t = ( messages.statusCode )) == null ? '' : __t) +
'</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight">' +
((__t = ( messages.description )) == null ? '' : __t) +
'</p></div></body></html>';
return __p
};
const _template = (messages) => _render({ messages: { ..._messages, ...messages } });
const template$1 = _template;

const error500$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const ______head = defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
});

const ______head$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ______head
});

const prisma = new PrismaClient({
  log: ["warn", "error", "query", "info"]
});

function getAuthJsSecret(options) {
  const secret = options?.secret || process.env.NUXT_NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!secret)
    throw new Error("[authjs-nuxt] No secret found, please set a secret in your [...].ts handler or use environment variables");
  return secret;
}
function getServerOrigin(event, runtimeConfig) {
  const requestOrigin = getRequestHeaders(event).Origin;
  const serverOrigin = runtimeConfig?.public?.authJs?.baseUrl ?? "";
  const origin = requestOrigin ?? serverOrigin.length > 0 ? serverOrigin : process.env.AUTH_ORIGIN;
  if (!origin)
    throw new Error("No Origin found ...");
  return origin;
}
function checkOrigin(request, runtimeConfig) {
  if (request.method !== "POST")
    return;
  const requestOrigin = request.headers.get("Origin");
  const serverOrigin = runtimeConfig.public?.authJs?.baseUrl;
  if (serverOrigin !== requestOrigin)
    throw new Error("CSRF protected");
}
function makeCookiesFromCookieString$1(cookieString) {
  if (!cookieString)
    return {};
  return Object.fromEntries(
    Object.entries(parse(cookieString)).filter(([k]) => k.includes("next-auth"))
  );
}
async function getRequestFromEvent(event) {
  const url = new URL(getRequestURL(event));
  const method = getMethod(event);
  const body = method === "POST" ? await readRawBody(event) : void 0;
  return new Request(url, { headers: getRequestHeaders(event), method, body });
}

if (!globalThis.crypto) {
  console.log("Polyfilling crypto...");
  import('node:crypto').then((crypto) => {
    Object.defineProperty(globalThis, "crypto", {
      value: crypto.webcrypto,
      writable: false,
      configurable: true
    });
  });
}
function NuxtAuthHandler(options, runtimeConfig) {
  return eventHandler(async (event) => {
    options.trustHost ??= true;
    options.skipCSRFCheck = skipCSRFCheck;
    const request = await getRequestFromEvent(event);
    if (request.url.includes(".js.map"))
      return;
    checkOrigin(request, runtimeConfig);
    const response = await Auth(request, options);
    return response;
  });
}
async function getServerSession(event, options) {
  const response = await getServerSessionResponse(event, options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
async function getServerToken(event, options, runtimeConfig) {
  const response = await getServerSessionResponse(event, options);
  const cookies = Object.fromEntries(response.headers.entries());
  const parsedCookies = makeCookiesFromCookieString$1(cookies["set-cookie"]);
  const parameters = {
    req: {
      cookies: parsedCookies,
      headers: response.headers
    },
    // see https://github.com/nextauthjs/next-auth/blob/a79774f6e890b492ae30201f24b3f7024d0d7c9d/packages/core/src/jwt.ts
    secureCookie: getServerOrigin(event, runtimeConfig).startsWith("https://"),
    secret: getAuthJsSecret(options)
  };
  return getToken(parameters);
}
async function getServerSessionResponse(event, options) {
  options.trustHost ??= true;
  const url = new URL("/api/auth/session", getRequestURL(event));
  return Auth(
    new Request(url, { headers: getRequestHeaders(event) }),
    options
  );
}

const runtimeConfig = useRuntimeConfig$1();
const authOptions = {
  debug: true,
  secret: runtimeConfig.authJs.secret,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database"
  },
  providers: [
    EmailProvider({
      server: {
        host: runtimeConfig.nodemailer.host,
        port: runtimeConfig.nodemailer.port,
        auth: {
          user: runtimeConfig.nodemailer.user,
          pass: runtimeConfig.nodemailer.password
        }
      },
      from: runtimeConfig.nodemailer.from
    })
  ]
};
const _____ = NuxtAuthHandler(authOptions, runtimeConfig);

const _____$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  authOptions: authOptions,
  default: _____
});

const jwt = defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  const jwt = await getServerToken(event, authOptions);
  return { session, jwt };
});

const jwt$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: jwt
});

function replaceSpaceSymbol$1(str) {
  return str.replace(/%20/g, " ");
}
const _slug__get$2 = defineEventHandler(async (event) => {
  var _a;
  const query = replaceSpaceSymbol$1((_a = event.context.params) == null ? void 0 : _a.slug);
  const service = await prisma.services.findUnique({
    where: {
      name: query
    },
    select: {
      name: true,
      description: true,
      category: {
        select: {
          name: true
        }
      },
      service_tags: {
        select: {
          tags: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!service)
    throw new Error(`No service found for slug: ${query}`);
  const flattenedService = {
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map((tag) => tag.tags.name)
  };
  return flattenedService;
});

const _slug__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug__get$2
});

const _slug__get = defineEventHandler(async (event) => {
  var _a;
  const query = replaceSpaceSymbol((_a = event.context.params) == null ? void 0 : _a.slug);
  const services = await prisma.services.findMany({
    where: {
      category: {
        name: query
      }
    },
    select: {
      name: true,
      description: true,
      category: {
        select: {
          name: true
        }
      },
      service_tags: {
        select: {
          tags: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  const flattenedServices = services.map((service) => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map((tag) => tag.tags.name)
  }));
  return flattenedServices;
});
function replaceSpaceSymbol(str) {
  return str.replace(/%20/g, " ");
}

const _slug__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug__get
});

const index_get$4 = defineEventHandler(async (_event) => {
  const categories = await prisma.categories.findMany({
    select: {
      name: true
    }
  });
  return Object.values(categories).map((category) => category.name);
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const ______get = defineEventHandler(async (event) => {
  var _a, _b;
  const user = event.context.sessions ? event.context.sessions.user.id : (_a = event.context.params) == null ? void 0 : _a.user;
  const service = (_b = event.context.params) == null ? void 0 : _b.service;
  if (!user)
    throw new Error("User not found");
  if (!service)
    throw new Error("Service not found");
  const favoriteService = await prisma.favorite_Services.findUnique({
    where: {
      user_id_service_id: {
        user_id: user,
        service_id: service
      }
    }
  });
  if (!favoriteService)
    throw new Error("Favorite service not found");
  return favoriteService;
});

const ______get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ______get
});

const _user__post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const user = (_a = event.context.params) == null ? void 0 : _a.user;
  if (!user)
    throw new Error("User not found");
  const res = await prisma.favorite_Services.create({
    data: {
      user_id: user,
      service_id: body.serviceId
    }
  });
  return res;
});

const _user__post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _user__post
});

const index_get$2 = defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.category) {
    const response = await $fetch(`/api/services/categories/${query.category}`);
    return response;
  }
  if (query.tags) {
    const response = await $fetch(`/api/services/tags/${query.tags}`);
    return response;
  }
  const services = await getAllServices();
  return services;
});
async function getAllServices() {
  return prisma.services.findMany({
    select: {
      name: true,
      description: true,
      category: true,
      service_tags: {
        select: {
          tags: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  }).then(
    (services) => services.map((service) => ({
      name: service.name,
      description: service.description,
      category: service.category.name,
      tags: service.service_tags.map(
        (tagOnService) => tagOnService.tags.name
      )
    }))
  ).catch((error) => {
    console.error(error);
  });
}

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const category = await prisma.categories.upsert({
    where: { name: body.category },
    update: {},
    create: {
      name: body.category
    }
  });
  const res = await prisma.services.create({
    data: {
      name: body.name,
      description: body.description,
      category: {
        connect: {
          name: category.name
          // use the upserted category's id
        }
      },
      location: body.location,
      service_owner: {
        connect: {
          email: body.serviceowner
        }
      },
      website_url: body.website,
      service_tags: {
        create: [
          {
            tags: {
              connectOrCreate: {
                where: {
                  name: body.tags[0]
                },
                create: {
                  name: body.tags[0]
                }
              }
            }
          }
        ]
      }
    }
  });
  return res;
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

const _tag__get = defineEventHandler(async (event) => {
  var _a;
  const query = (_a = event.context.params) == null ? void 0 : _a.tag;
  const services = await prisma.services.findMany({
    where: {
      service_tags: {
        some: {
          tags: {
            name: query
          }
        }
      }
    },
    select: {
      name: true,
      description: true,
      category: {
        select: {
          name: true
        }
      },
      service_tags: {
        select: {
          tags: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!services)
    throw new Error(`No services found for tag: ${query}`);
  const flattenedServices = services.map((service) => ({
    name: service.name,
    description: service.description,
    category: service.category.name,
    tags: service.service_tags.map((tag) => tag.tags.name)
  }));
  return flattenedServices;
});

const _tag__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _tag__get
});

const index_get = defineEventHandler(async (_event) => {
  const tags = await prisma.tags.findMany({
    select: {
      name: true
    }
  });
  return Object.values(tags).map((tag) => tag.name);
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const favorites_get = defineEventHandler(async (_event) => {
  const favorites = await prisma.favorite_Services.findMany({
    where: {
      user_id: "cluen2o0d000011yn1tfbcozg"
    },
    select: {
      favorited_service: true
    }
  });
  const transformedFavorites = favorites.map((favorite) => ({
    favorited_service: favorite.favorited_service
  }));
  return transformedFavorites;
});

const favorites_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: favorites_get
});

const services_get = defineEventHandler(async (_event) => {
  const services = await prisma.services.findMany({
    where: {
      service_owner: {
        id: "cluen2o0d000011yn1tfbcozg"
      }
    },
    select: {
      name: true,
      description: true,
      category: true
      // service_tags: {
      //   select: {
      //     tags: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //   },
      // },
    }
  });
  const transformedServices = services.map((service) => ({
    name: service.name,
    description: service.description,
    category: service.category.name
    //  tags: service.service_tags.map(
    //    (tagOnService) => tagOnService.tags.name
    //  ),
  }));
  return transformedServices;
});

const services_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: services_get
});

const Vue3 = version.startsWith("3");

function resolveUnref$1(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput$1(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref$1(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput$1(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput$1(v, k)];
      })
    );
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput$1(entry.input);
    }
  }
});

const headSymbol$1 = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol$1, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = [];

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootId = "__nuxt";

const appRootTag = "div";

const appTeleportTag = "div";

const appTeleportId = "teleports";

const componentIslands = false;

function baseURL() {
  return useRuntimeConfig$1().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig$1().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig$1().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getEntryIds = () => getClientManifest().then((r) => Object.values(r).filter(
  (r2) => (
    // @ts-expect-error internal key set by CSS inlining configuration
    r2._globalCSS
  )
).map((r2) => r2.src));
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG);
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig$1(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload = {
      _errors: {},
      serverRendered: false,
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set()
    };
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const APP_TELEPORT_OPEN_TAG = `<${appTeleportTag} id="${appTeleportId}">` ;
const APP_TELEPORT_CLOSE_TAG = `</${appTeleportTag}>` ;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${` id="${appRootId}"` }>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError$2({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = componentIslands ;
  const islandContext = void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules$1(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig$1(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: {},
    modules: /* @__PURE__ */ new Set(),
    set _registeredComponents(value) {
      this.modules = value;
    },
    get _registeredComponents() {
      return this.modules;
    },
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  {
    for (const id of await getEntryIds()) {
      ssrContext.modules.add(id);
    }
  }
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []) ;
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  head.push({ style: inlinedStyles });
  {
    const link = [];
    for (const style in styles) {
      const resource = styles[style];
      {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file) });
      }
    }
    head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags, ssrContext.styles]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      _rendered.html,
      APP_TELEPORT_OPEN_TAG + (joinTags([ssrContext.teleports?.[`#${appTeleportId}`]]) ) + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify$1(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify$1(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    type: "application/json",
    id: opts.id,
    innerHTML: contents,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(opts.ssrContext.config)}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const client_manifest = {
  "_!~{00r}~.js": {
    "resourceType": "style",
    "prefetch": true,
    "preload": true,
    "file": "ServicesGridItem.BsNUMInJ.css",
    "src": "_!~{00r}~.js"
  },
  "_!~{00t}~.js": {
    "resourceType": "style",
    "prefetch": true,
    "preload": true,
    "file": "Table.IEMpyWWa.css",
    "src": "_!~{00t}~.js"
  },
  "_!~{00x}~.js": {
    "resourceType": "style",
    "prefetch": true,
    "preload": true,
    "file": "NavBar.CCQWWsvu.css",
    "src": "_!~{00x}~.js"
  },
  "_09vzWB4f.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "09vzWB4f.js",
    "name": "NavBar",
    "imports": [
      "_CuzP4DPA.js",
      "_CEVl9N56.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_CGj3w8A4.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_CriAs86Q.js"
    ],
    "css": [
      "NavBar.CCQWWsvu.css"
    ]
  },
  "NavBar.CCQWWsvu.css": {
    "file": "NavBar.CCQWWsvu.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "_BQkc-AXV.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BQkc-AXV.js",
    "name": "index"
  },
  "_Bnyrus5O.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Bnyrus5O.js",
    "name": "Badge",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js"
    ]
  },
  "_Bo0FqCma.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Bo0FqCma.js",
    "name": "Divider",
    "imports": [
      "_CEVl9N56.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js"
    ]
  },
  "_BzMVkZSi.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BzMVkZSi.js",
    "name": "ServicesGridItem",
    "imports": [
      "_DvDH6DOc.js",
      "node_modules/nuxt/dist/app/entry.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue"
    ],
    "css": [
      "ServicesGridItem.BsNUMInJ.css"
    ]
  },
  "ServicesGridItem.BsNUMInJ.css": {
    "file": "ServicesGridItem.BsNUMInJ.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "_C0HSpouq.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "C0HSpouq.js",
    "name": "Form",
    "imports": [
      "_CEVl9N56.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js",
      "_CriAs86Q.js"
    ]
  },
  "_CEVl9N56.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CEVl9N56.js",
    "name": "Button",
    "imports": [
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "node_modules/nuxt/dist/app/entry.js",
      "_CuzP4DPA.js",
      "_DvDH6DOc.js",
      "_gBcN8L89.js"
    ]
  },
  "_CGj3w8A4.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CGj3w8A4.js",
    "name": "useAuth",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_CHpxzGe4.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CHpxzGe4.js",
    "name": "Container",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js"
    ]
  },
  "_CriAs86Q.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CriAs86Q.js",
    "name": "index",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_CuzP4DPA.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CuzP4DPA.js",
    "name": "nuxt-link",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "_DvDH6DOc.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "DvDH6DOc.js",
    "name": "index"
  },
  "_Htusk4DY.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Htusk4DY.js",
    "name": "Table",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js",
      "_C0HSpouq.js",
      "_CEVl9N56.js",
      "_CriAs86Q.js"
    ],
    "css": [
      "Table.IEMpyWWa.css"
    ]
  },
  "Table.IEMpyWWa.css": {
    "file": "Table.IEMpyWWa.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "__vite-browser-external": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BIHI7g3E.js",
    "name": "__vite-browser-external",
    "src": "__vite-browser-external",
    "isDynamicEntry": true
  },
  "_gBcN8L89.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "gBcN8L89.js",
    "name": "selectMenu",
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ]
  },
  "layouts/dashboard.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CDSFXxUh.js",
    "name": "dashboard",
    "src": "layouts/dashboard.vue",
    "isDynamicEntry": true,
    "imports": [
      "_09vzWB4f.js",
      "_Bo0FqCma.js",
      "_CEVl9N56.js",
      "_Bnyrus5O.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js",
      "_CHpxzGe4.js",
      "_CuzP4DPA.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_CGj3w8A4.js",
      "_CriAs86Q.js",
      "_DvDH6DOc.js"
    ],
    "css": []
  },
  "dashboard.DALcBn5q.css": {
    "file": "dashboard.DALcBn5q.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "layouts/default.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "DpTXaeTy.js",
    "name": "default",
    "src": "layouts/default.vue",
    "isDynamicEntry": true,
    "imports": [
      "_09vzWB4f.js",
      "_CuzP4DPA.js",
      "_CHpxzGe4.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_CEVl9N56.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_DvDH6DOc.js",
      "_gBcN8L89.js",
      "_CGj3w8A4.js",
      "_CriAs86Q.js"
    ],
    "css": []
  },
  "default.BNPrjmNe.css": {
    "file": "default.BNPrjmNe.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "layouts/form.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CCMW8JJt.js",
    "name": "form",
    "src": "layouts/form.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ],
    "css": []
  },
  "form.DHEc0nQ3.css": {
    "file": "form.DHEc0nQ3.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/auth.mjs": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "4I1Kf0WR.js",
    "name": "auth",
    "src": "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/auth.mjs",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CGj3w8A4.js"
    ]
  },
  "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/client-auth.mjs": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CWCGAW4c.js",
    "name": "client-auth",
    "src": "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/client-auth.mjs",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CGj3w8A4.js"
    ],
    "dynamicImports": [
      "__vite-browser-external"
    ]
  },
  "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/guest-only.mjs": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BKkGpO6y.js",
    "name": "guest-only",
    "src": "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/guest-only.mjs",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CGj3w8A4.js"
    ]
  },
  "node_modules/@nuxt/ui-templates/dist/templates/error-404.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "Btqvf-6O.js",
    "name": "error-404",
    "src": "node_modules/@nuxt/ui-templates/dist/templates/error-404.vue",
    "isDynamicEntry": true,
    "imports": [
      "_CuzP4DPA.js",
      "node_modules/nuxt/dist/app/entry.js"
    ],
    "css": []
  },
  "error-404.JekaaCis.css": {
    "file": "error-404.JekaaCis.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/@nuxt/ui-templates/dist/templates/error-500.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "j7Uk16C4.js",
    "name": "error-500",
    "src": "node_modules/@nuxt/ui-templates/dist/templates/error-500.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ],
    "css": []
  },
  "error-500.CNP9nqm1.css": {
    "file": "error-500.CNP9nqm1.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/nuxt-icon/dist/runtime/Icon.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "B-Mz5n1t.js",
    "name": "Icon",
    "src": "node_modules/nuxt-icon/dist/runtime/Icon.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_BQkc-AXV.js"
    ],
    "css": []
  },
  "Icon.8lQfE3Ql.css": {
    "file": "Icon.8lQfE3Ql.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/nuxt-icon/dist/runtime/IconCSS.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "iX9wfhsD.js",
    "name": "IconCSS",
    "src": "node_modules/nuxt-icon/dist/runtime/IconCSS.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_BQkc-AXV.js"
    ],
    "css": []
  },
  "IconCSS.Z2BAHt_z.css": {
    "file": "IconCSS.Z2BAHt_z.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "node_modules/nuxt/dist/app/entry.js": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "TdVCrsJL.js",
    "name": "entry",
    "src": "node_modules/nuxt/dist/app/entry.js",
    "isEntry": true,
    "dynamicImports": [
      "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/auth.mjs",
      "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/guest-only.mjs",
      "node_modules/@hebilicious/authjs-nuxt/dist/runtime/middleware/client-auth.mjs",
      "layouts/dashboard.vue",
      "layouts/default.vue",
      "layouts/form.vue",
      "node_modules/@nuxt/ui-templates/dist/templates/error-404.vue",
      "node_modules/@nuxt/ui-templates/dist/templates/error-500.vue"
    ],
    "_globalCSS": true
  },
  "pages/about.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CnLlSDBM.js",
    "name": "about",
    "src": "pages/about.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js"
    ],
    "css": []
  },
  "about.B99wYO9Y.css": {
    "file": "about.B99wYO9Y.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/contact.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "BaBb6H35.js",
    "name": "contact",
    "src": "pages/contact.vue",
    "isDynamicEntry": true,
    "imports": [
      "_C0HSpouq.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js",
      "_CEVl9N56.js",
      "_CHpxzGe4.js",
      "_CriAs86Q.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_CuzP4DPA.js",
      "_DvDH6DOc.js"
    ],
    "css": []
  },
  "contact.xdVGS5xN.css": {
    "file": "contact.xdVGS5xN.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "xzM5r98A.js",
    "name": "index",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_CEVl9N56.js",
      "_BzMVkZSi.js",
      "_CuzP4DPA.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_DvDH6DOc.js",
      "_gBcN8L89.js"
    ],
    "css": []
  },
  "index.m1U39CHx.css": {
    "file": "index.m1U39CHx.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/profile/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "_tJio95A.js",
    "name": "index",
    "src": "pages/profile/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_C0HSpouq.js",
      "_Bo0FqCma.js",
      "_CEVl9N56.js",
      "_Htusk4DY.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_CGj3w8A4.js",
      "_gBcN8L89.js",
      "_CriAs86Q.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_CuzP4DPA.js",
      "_DvDH6DOc.js"
    ],
    "css": []
  },
  "index.BvMUs1e2.css": {
    "file": "index.BvMUs1e2.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/profile/services.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "D2KX5DPY.js",
    "name": "services",
    "src": "pages/profile/services.vue",
    "isDynamicEntry": true,
    "imports": [
      "_CEVl9N56.js",
      "_Htusk4DY.js",
      "_C0HSpouq.js",
      "_Bnyrus5O.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_gBcN8L89.js",
      "_CHpxzGe4.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_CuzP4DPA.js",
      "_DvDH6DOc.js",
      "_CriAs86Q.js"
    ],
    "css": []
  },
  "services.BE4RQ7fY.css": {
    "file": "services.BE4RQ7fY.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/services/[service].vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "tL50MmKh.js",
    "name": "_service_",
    "src": "pages/services/[service].vue",
    "isDynamicEntry": true,
    "imports": [
      "_BzMVkZSi.js",
      "_Bnyrus5O.js",
      "_CHpxzGe4.js",
      "node_modules/nuxt/dist/app/entry.js",
      "_DvDH6DOc.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js",
      "_gBcN8L89.js"
    ],
    "css": []
  },
  "_service_.DhjGWvOB.css": {
    "file": "_service_.DhjGWvOB.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  },
  "pages/services/index.vue": {
    "resourceType": "script",
    "module": true,
    "prefetch": true,
    "preload": true,
    "file": "CMBaOmER.js",
    "name": "index",
    "src": "pages/services/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.js",
      "_BzMVkZSi.js",
      "_CuzP4DPA.js",
      "_DvDH6DOc.js",
      "node_modules/nuxt-icon/dist/runtime/Icon.vue",
      "_BQkc-AXV.js"
    ],
    "css": []
  },
  "index.Cyiq81UM.css": {
    "file": "index.Cyiq81UM.css",
    "resourceType": "style",
    "prefetch": true,
    "preload": true
  }
};

const client_manifest$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: client_manifest
});

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$2(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch$1(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const inlineConfig = {
  "nuxt": {
    "buildId": "7bc01fd4-522f-41b1-ace4-7bacfb720a4f"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};
const appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(appConfig);
  }
  return nuxtApp._appConfig;
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": true };
const fetchDefaults = {};
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$6 = {
  middleware: "client-auth"
};
const __nuxt_page_meta$5 = {
  middleware: "client-auth"
};
const __nuxt_page_meta$4 = {
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/profile" }
};
const __nuxt_page_meta$3 = {
  layout: "dashboard",
  middleware: "auth",
  auth: { authenticatedRedirectTo: "/signin" }
};
const __nuxt_page_meta$2 = {
  layout: "dashboard"
};
const __nuxt_page_meta$1 = {
  middleware: "client-auth"
};
const __nuxt_page_meta = {
  middleware: "client-auth"
};
const _routes = [
  {
    name: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) ?? "about",
    path: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) ?? "/about",
    meta: __nuxt_page_meta$6 || {},
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: __nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect,
    component: () => Promise.resolve().then(function () { return aboutC8ORGQ6_; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) ?? "contact",
    path: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) ?? "/contact",
    meta: __nuxt_page_meta$5 || {},
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: __nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect,
    component: () => Promise.resolve().then(function () { return contactC_M0MkQ9; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) ?? "index",
    path: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) ?? "/",
    meta: __nuxt_page_meta$4 || {},
    alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
    redirect: __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect,
    component: () => Promise.resolve().then(function () { return indexCHFf6LP; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "profile",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/profile",
    meta: __nuxt_page_meta$3 || {},
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect,
    component: () => Promise.resolve().then(function () { return indexDhrZ5ciy; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "profile-services",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/profile/services",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect,
    component: () => Promise.resolve().then(function () { return servicesBYDVfHae; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "services-service",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/services/:service()",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect,
    component: () => Promise.resolve().then(function () { return _service_CjZGaiUu; }).then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "services",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/services",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect,
    component: () => Promise.resolve().then(function () { return indexOSk_BGrG; }).then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h$1(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => Promise.resolve().then(function () { return authCWVLJ6o5; }),
  "guest-only": () => Promise.resolve().then(function () { return guestOnlyBNvimKJl; }),
  "client-auth": () => Promise.resolve().then(function () { return clientAuthPUA30Nj7; })
};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter$2({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$2({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    useError();
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$2({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.fullPath !== initialURL && (to.redirectedFrom || !isSamePath(to.fullPath, initialURL))) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(function () { return IconCKURRh4; }).then((r) => r["default"] || r.default || r));
const LazyIconCSS = defineAsyncComponent(() => Promise.resolve().then(function () { return IconCSS5JRY1o6g; }).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon],
  ["IconCSS", LazyIconCSS]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function reloadNuxtApp(options = {}) {
  {
    return;
  }
}
function makeCookiesFromCookieString(cookieString) {
  if (!cookieString)
    return {};
  return Object.fromEntries(
    Object.entries(parse(cookieString)).filter(([k]) => k.includes("next-auth"))
  );
}
async function postToInternal({
  url,
  options,
  csrfToken,
  callbackUrl
}) {
  const response = await $fetch.raw(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      ...options,
      csrfToken,
      callbackUrl
    })
  });
  return response;
}
async function signIn(providerId, options, authorizationParams) {
  var _a;
  const { status } = useAuth();
  try {
    status.value = "loading";
    const { callbackUrl = (void 0).location.href, redirect = true } = options ?? {};
    const isCredentials = providerId === "credentials";
    const isEmail = providerId === "email";
    const isSupportingReturn = isCredentials || isEmail;
    const signInUrl = `/api/auth/${isCredentials ? "callback" : "signin"}/${providerId}`;
    const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;
    const response = await postToInternal({ url: _signInUrl, options, callbackUrl });
    const url = ((_a = response == null ? void 0 : response._data) == null ? void 0 : _a.url) ?? null;
    const error = url ? new URL(url).searchParams.get("error") : null;
    if (error)
      throw new Error(error);
    if (isCredentials && !redirect)
      reloadNuxtApp({ persistState: true, force: true });
    if (redirect || !isSupportingReturn) {
      const to = url ?? callbackUrl;
      console.log(`Redirecting, navigating to ${to}`);
      await navigateTo(to, { external: true });
      if (to == null ? void 0 : to.includes("#"))
        reloadNuxtApp({ persistState: true, force: true });
      return;
    }
    return response;
  } catch (error) {
    status.value = "error";
    throw error;
  }
}
async function signOut(options) {
  const { status } = useAuth();
  try {
    status.value = "unauthenticated";
    const { callbackUrl = (void 0).location.href } = options ?? {};
    const data = await $fetch("/api/auth/signout", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1"
      },
      body: new URLSearchParams({
        callbackUrl
      })
    });
    useAuth().removeSession();
    const url = (data == null ? void 0 : data.url) ?? callbackUrl;
    await useRouter().push({ path: new URL(url).pathname, force: true });
    if (url.includes("#"))
      reloadNuxtApp({ persistState: true });
  } catch (error) {
    status.value = "error";
    throw error;
  }
}
async function getProviders() {
  return $fetch("/api/auth/providers");
}
function useAuth() {
  const session = useState("auth:session", () => null);
  const cookies = useState("auth:cookies", () => ({}));
  const status = useState("auth:session:status", () => "unauthenticated");
  const sessionToken = computed(() => {
    var _a;
    return ((_a = cookies.value) == null ? void 0 : _a["next-auth.session-token"]) ?? "";
  });
  const user = computed(() => {
    var _a;
    return ((_a = session.value) == null ? void 0 : _a.user) ?? null;
  });
  watch$1(session, (newSession) => {
    if (newSession === null)
      return status.value = "unauthenticated";
    if (Object.keys(newSession).length)
      return status.value = "authenticated";
  });
  const updateSession = (u) => {
    session.value = typeof u === "function" ? produce(session.value, u) : u;
  };
  const removeSession = () => {
    cookies.value = null;
    updateSession(null);
  };
  return {
    session: readonly(session),
    user,
    updateSession,
    status,
    cookies,
    sessionToken,
    removeSession,
    signIn,
    signOut,
    getProviders
  };
}
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  {
    return _headers;
  }
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin_jBAFIEN7H9 = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  {
    const { updateSession, removeSession, cookies } = useAuth();
    const headers = useRequestHeaders();
    const data = ([__temp, __restore] = executeAsync(() => $fetch("/api/auth/session", {
      headers
    })), __temp = await __temp, __restore(), __temp);
    const hasSession = data && Object.keys(data).length;
    if (hasSession) {
      updateSession(data);
      cookies.value = makeCookiesFromCookieString(headers.cookie);
    }
    if (!hasSession)
      removeSession();
  }
});
const slidOverInjectionKey = Symbol("nuxt-ui.slideover");
function _useSlideover() {
  const slideoverState = inject(slidOverInjectionKey);
  const isOpen = ref(false);
  function open(component, props) {
    if (!slideoverState) {
      throw new Error("useSlideover() is called without provider");
    }
    slideoverState.value = {
      component,
      props: props ?? {}
    };
    isOpen.value = true;
  }
  async function close() {
    if (!slideoverState)
      return;
    isOpen.value = false;
  }
  function reset() {
    slideoverState.value = {
      component: "div",
      props: {}
    };
  }
  function patch(props) {
    if (!slideoverState)
      return;
    slideoverState.value = {
      ...slideoverState.value,
      props: {
        ...slideoverState.value.props,
        ...props
      }
    };
  }
  return {
    open,
    close,
    reset,
    patch,
    isOpen
  };
}
createSharedComposable(_useSlideover);
const slideovers_LDumGYo2KH = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const slideoverState = shallowRef({
    component: "div",
    props: {}
  });
  nuxtApp.vueApp.provide(slidOverInjectionKey, slideoverState);
});
const modalInjectionKey = Symbol("nuxt-ui.modal");
function _useModal() {
  const modalState = inject(modalInjectionKey);
  const isOpen = ref(false);
  function open(component, props) {
    if (!modalState) {
      throw new Error("useModal() is called without provider");
    }
    modalState.value = {
      component,
      props: props ?? {}
    };
    isOpen.value = true;
  }
  async function close() {
    if (!modalState)
      return;
    isOpen.value = false;
  }
  function reset() {
    modalState.value = {
      component: "div",
      props: {}
    };
  }
  function patch(props) {
    if (!modalState)
      return;
    modalState.value = {
      ...modalState.value,
      props: {
        ...modalState.value.props,
        ...props
      }
    };
  }
  return {
    open,
    close,
    reset,
    patch,
    isOpen
  };
}
createSharedComposable(_useModal);
const modals_bidRKewKK5 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const modalState = shallowRef({
    component: "div",
    props: {}
  });
  nuxtApp.vueApp.provide(modalInjectionKey, modalState);
});
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      icons: [(classPart) => /^i-/.test(classPart)]
    }
  }
});
const defuTwMerge = createDefu((obj, key, value, namespace) => {
  if (namespace === "default" || namespace.startsWith("default.")) {
    return false;
  }
  if (namespace === "popper" || namespace.startsWith("popper.")) {
    return false;
  }
  if (namespace.endsWith("avatar") && key === "size") {
    return false;
  }
  if (namespace.endsWith("chip") && key === "size") {
    return false;
  }
  if (namespace.endsWith("badge") && key === "size" || key === "color" || key === "variant") {
    return false;
  }
  if (typeof obj[key] === "string" && typeof value === "string" && obj[key] && value) {
    obj[key] = customTwMerge(obj[key], value);
    return true;
  }
});
function mergeConfig(strategy, ...configs) {
  if (strategy === "override") {
    return defu({}, ...configs);
  }
  return defuTwMerge({}, ...configs);
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(_, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
}
function looseToNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}
const _inherit = "inherit";
const _current = "currentColor";
const _transparent = "transparent";
const _black = "#000";
const _white = "#fff";
const _slate = { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a", "950": "#020617" };
const _gray = { "50": "rgb(var(--color-gray-50) / <alpha-value>)", "100": "rgb(var(--color-gray-100) / <alpha-value>)", "200": "rgb(var(--color-gray-200) / <alpha-value>)", "300": "rgb(var(--color-gray-300) / <alpha-value>)", "400": "rgb(var(--color-gray-400) / <alpha-value>)", "500": "rgb(var(--color-gray-500) / <alpha-value>)", "600": "rgb(var(--color-gray-600) / <alpha-value>)", "700": "rgb(var(--color-gray-700) / <alpha-value>)", "800": "rgb(var(--color-gray-800) / <alpha-value>)", "900": "rgb(var(--color-gray-900) / <alpha-value>)", "950": "rgb(var(--color-gray-950) / <alpha-value>)" };
const _zinc = { "50": "#fafafa", "100": "#f4f4f5", "200": "#e4e4e7", "300": "#d4d4d8", "400": "#a1a1aa", "500": "#71717a", "600": "#52525b", "700": "#3f3f46", "800": "#27272a", "900": "#18181b", "950": "#09090b" };
const _neutral = { "50": "#fafafa", "100": "#f5f5f5", "200": "#e5e5e5", "300": "#d4d4d4", "400": "#a3a3a3", "500": "#737373", "600": "#525252", "700": "#404040", "800": "#262626", "900": "#171717", "950": "#0a0a0a" };
const _stone = { "50": "#fafaf9", "100": "#f5f5f4", "200": "#e7e5e4", "300": "#d6d3d1", "400": "#a8a29e", "500": "#78716c", "600": "#57534e", "700": "#44403c", "800": "#292524", "900": "#1c1917", "950": "#0c0a09" };
const _red = { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" };
const _orange = { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12", "950": "#431407" };
const _amber = { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f", "950": "#451a03" };
const _yellow = { "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047", "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207", "800": "#854d0e", "900": "#713f12", "950": "#422006" };
const _lime = { "50": "#f7fee7", "100": "#ecfccb", "200": "#d9f99d", "300": "#bef264", "400": "#a3e635", "500": "#84cc16", "600": "#65a30d", "700": "#4d7c0f", "800": "#3f6212", "900": "#365314", "950": "#1a2e05" };
const _green = { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d", "950": "#052e16" };
const _emerald = { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b", "950": "#022c22" };
const _teal = { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a", "950": "#042f2e" };
const _cyan = { "50": "#ecfeff", "100": "#cffafe", "200": "#a5f3fc", "300": "#67e8f9", "400": "#22d3ee", "500": "#06b6d4", "600": "#0891b2", "700": "#0e7490", "800": "#155e75", "900": "#164e63", "950": "#083344" };
const _sky = { "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc", "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1", "800": "#075985", "900": "#0c4a6e", "950": "#082f49" };
const _blue = { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" };
const _indigo = { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b" };
const _violet = { "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95", "950": "#2e1065" };
const _purple = { "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#d8b4fe", "400": "#c084fc", "500": "#a855f7", "600": "#9333ea", "700": "#7e22ce", "800": "#6b21a8", "900": "#581c87", "950": "#3b0764" };
const _fuchsia = { "50": "#fdf4ff", "100": "#fae8ff", "200": "#f5d0fe", "300": "#f0abfc", "400": "#e879f9", "500": "#d946ef", "600": "#c026d3", "700": "#a21caf", "800": "#86198f", "900": "#701a75", "950": "#4a044e" };
const _pink = { "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843", "950": "#500724" };
const _rose = { "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337", "950": "#4c0519" };
const _primary = { "50": "rgb(var(--color-primary-50) / <alpha-value>)", "100": "rgb(var(--color-primary-100) / <alpha-value>)", "200": "rgb(var(--color-primary-200) / <alpha-value>)", "300": "rgb(var(--color-primary-300) / <alpha-value>)", "400": "rgb(var(--color-primary-400) / <alpha-value>)", "500": "rgb(var(--color-primary-500) / <alpha-value>)", "600": "rgb(var(--color-primary-600) / <alpha-value>)", "700": "rgb(var(--color-primary-700) / <alpha-value>)", "800": "rgb(var(--color-primary-800) / <alpha-value>)", "900": "rgb(var(--color-primary-900) / <alpha-value>)", "950": "rgb(var(--color-primary-950) / <alpha-value>)", "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)" };
const _cool = { "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827", "950": "#030712" };
const config$9 = { "inherit": _inherit, "current": _current, "transparent": _transparent, "black": _black, "white": _white, "slate": _slate, "gray": _gray, "zinc": _zinc, "neutral": _neutral, "stone": _stone, "red": _red, "orange": _orange, "amber": _amber, "yellow": _yellow, "lime": _lime, "green": _green, "emerald": _emerald, "teal": _teal, "cyan": _cyan, "sky": _sky, "blue": _blue, "indigo": _indigo, "violet": _violet, "purple": _purple, "fuchsia": _fuchsia, "pink": _pink, "rose": _rose, "primary": _primary, "cool": _cool };
const colors_244lXBzhnM = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig2 = useAppConfig();
  const root = computed(() => {
    const primary = config$9[appConfig2.ui.primary];
    const gray = config$9[appConfig2.ui.gray];
    if (!primary) {
      console.warn(`[@nuxt/ui] Primary color '${appConfig2.ui.primary}' not found in Tailwind config`);
    }
    if (!gray) {
      console.warn(`[@nuxt/ui] Gray color '${appConfig2.ui.gray}' not found in Tailwind config`);
    }
    return `:root {
${Object.entries(primary || config$9.green).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`).join("\n")}
--color-primary-DEFAULT: var(--color-primary-500);

${Object.entries(gray || config$9.cool).map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value)};`).join("\n")}
}

.dark {
  --color-primary-DEFAULT: var(--color-primary-400);
}
`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "light";
const plugin_server_XNCxeHyTuP = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const colorMode = ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  plugin_jBAFIEN7H9,
  slideovers_LDumGYo2KH,
  modals_bidRKewKK5,
  colors_244lXBzhnM,
  plugin_server_XNCxeHyTuP
];
const layouts = {
  dashboard: () => Promise.resolve().then(function () { return dashboardCYxRmqPm; }).then((m) => m.default || m),
  default: () => Promise.resolve().then(function () { return defaultCHkXj61k; }).then((m) => m.default || m),
  form: () => Promise.resolve().then(function () { return formB5HtVcUy; }).then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h$1(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0$8 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h$1(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h$1(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h$1(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h$1(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1$8 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch$1(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h$1(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h$1(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h$1(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2$7 = {};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0$8;
  const _component_NuxtPage = __nuxt_component_1$8;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2$7 = _sfc_main$2$7.setup;
_sfc_main$2$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2$7 ? _sfc_setup$2$7(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2$7, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$1$b = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => Promise.resolve().then(function () { return error404DsUmxGn; }).then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => Promise.resolve().then(function () { return error500CXqG19Iv; }).then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1$b = _sfc_main$1$b.setup;
_sfc_main$1$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1$b ? _sfc_setup$1$b(props, ctx) : void 0;
};
const _sfc_main$m = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1$b), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp$1(_sfc_main$m);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _: _export_sfc,
  a: appConfig,
  b: useNuxtApp,
  c: useAuth,
  d: useRouter,
  default: entry$1,
  e: useRuntimeConfig,
  f: navigateTo,
  g: useAppConfig,
  h: useState,
  i: asyncDataDefaults,
  j: createError,
  k: fetchDefaults,
  l: looseToNumber,
  m: mergeConfig,
  n: nuxtLinkDefaults,
  o: useRequestFetch,
  p: useRoute,
  q: defineNuxtRouteMiddleware,
  r: useSeoMeta,
  u: useHead
});

const interopDefault = r => r.default || r || [];
const styles = {
  "node_modules/nuxt/dist/app/entry.js": () => Promise.resolve().then(function () { return entryStyles_D5Cgdys$1; }).then(interopDefault),
  "pages/about.vue": () => Promise.resolve().then(function () { return aboutStyles_sRSKrDPY$1; }).then(interopDefault),
  "pages/contact.vue": () => Promise.resolve().then(function () { return contactStyles_CERuCTQB$1; }).then(interopDefault),
  "pages/index.vue": () => Promise.resolve().then(function () { return indexStyles_C3HJoUJN$1; }).then(interopDefault),
  "pages/profile/services.vue": () => Promise.resolve().then(function () { return servicesStyles_c0OhiFL$1; }).then(interopDefault),
  "pages/profile/index.vue": () => Promise.resolve().then(function () { return indexStyles_BOCo6Yn9$1; }).then(interopDefault),
  "pages/services/[service].vue": () => Promise.resolve().then(function () { return _service_Styles_C5IUS3Xz$1; }).then(interopDefault),
  "pages/services/index.vue": () => Promise.resolve().then(function () { return indexStyles_CkxAMZy$1; }).then(interopDefault),
  "node_modules/nuxt-icon/dist/runtime/Icon.vue": () => Promise.resolve().then(function () { return IconStyles_D_CRgw4L$1; }).then(interopDefault),
  "pages/about.vue?vue&type=style&index=0&scoped=211c025c&lang.css": () => Promise.resolve().then(function () { return aboutStyles_sRSKrDPY$1; }).then(interopDefault),
  "pages/contact.vue?vue&type=style&index=0&scoped=8c3eb738&lang.css": () => Promise.resolve().then(function () { return contactStyles_CERuCTQB$1; }).then(interopDefault),
  "pages/index.vue?vue&type=style&index=0&scoped=98cda535&lang.css": () => Promise.resolve().then(function () { return indexStyles_C3HJoUJN$1; }).then(interopDefault),
  "pages/profile/services.vue?vue&type=style&index=0&scoped=49d67de3&lang.css": () => Promise.resolve().then(function () { return servicesStyles_c0OhiFL$1; }).then(interopDefault),
  "pages/profile/index.vue?vue&type=style&index=0&scoped=d36c7513&lang.css": () => Promise.resolve().then(function () { return indexStyles_BOCo6Yn9$1; }).then(interopDefault),
  "pages/services/[service].vue?vue&type=style&index=0&scoped=24ec654a&lang.css": () => Promise.resolve().then(function () { return _service_Styles_C5IUS3Xz$1; }).then(interopDefault),
  "pages/services/index.vue?vue&type=style&index=0&scoped=6fcc88d3&lang.css": () => Promise.resolve().then(function () { return indexStyles_CkxAMZy$1; }).then(interopDefault),
  "node_modules/nuxt-icon/dist/runtime/Icon.vue?vue&type=style&index=0&scoped=e8d572f6&lang.css": () => Promise.resolve().then(function () { return IconStyles_D_CRgw4L$1; }).then(interopDefault),
  "node_modules/nuxt-icon/dist/runtime/IconCSS.vue": () => Promise.resolve().then(function () { return IconCSSStyles_D5ci0eBM$1; }).then(interopDefault),
  "node_modules/nuxt-icon/dist/runtime/IconCSS.vue?vue&type=style&index=0&scoped=41e8d397&lang.css": () => Promise.resolve().then(function () { return IconCSSStyles_D5ci0eBM$1; }).then(interopDefault),
  "node_modules/@nuxt/ui-templates/dist/templates/error-404.vue": () => Promise.resolve().then(function () { return error404Styles_BuFEi3h_$1; }).then(interopDefault),
  "node_modules/@nuxt/ui-templates/dist/templates/error-500.vue": () => Promise.resolve().then(function () { return error500Styles_CU3YOSM$1; }).then(interopDefault),
  "node_modules/@nuxt/ui-templates/dist/templates/error-404.vue?vue&type=style&index=0&scoped=73a07988&lang.css": () => Promise.resolve().then(function () { return error404Styles_BuFEi3h_$1; }).then(interopDefault),
  "node_modules/@nuxt/ui-templates/dist/templates/error-500.vue?vue&type=style&index=0&scoped=6fdef64d&lang.css": () => Promise.resolve().then(function () { return error500Styles_CU3YOSM$1; }).then(interopDefault),
  "layouts/form.vue": () => Promise.resolve().then(function () { return formStyles_U526UvZo$1; }).then(interopDefault),
  "components/HomeItemList.vue": () => Promise.resolve().then(function () { return HomeItemListStyles_BqRDkKx3$1; }).then(interopDefault),
  "components/ServicesGridItem.vue": () => Promise.resolve().then(function () { return ServicesGridItemStyles_DAUYnyP$1; }).then(interopDefault),
  "components/ServicesNav.vue": () => Promise.resolve().then(function () { return ServicesNavStyles_Nawzcvrj$1; }).then(interopDefault),
  "components/ServicesGrid.vue": () => Promise.resolve().then(function () { return ServicesGridStyles_B9mh3sB_$1; }).then(interopDefault),
  "layouts/dashboard.vue": () => Promise.resolve().then(function () { return dashboardStyles_8y4Z53wv$1; }).then(interopDefault),
  "layouts/default.vue": () => Promise.resolve().then(function () { return defaultStyles_DdYyQWCJ$1; }).then(interopDefault),
  "layouts/form.vue?vue&type=style&index=0&scoped=2b8f3999&lang.css": () => Promise.resolve().then(function () { return formStyles_U526UvZo$1; }).then(interopDefault),
  "components/HomeItemList.vue?vue&type=style&index=0&scoped=b17aa983&lang.css": () => Promise.resolve().then(function () { return HomeItemListStyles_BqRDkKx3$1; }).then(interopDefault),
  "components/ServicesGridItem.vue?vue&type=style&index=0&scoped=1e7ffcda&lang.css": () => Promise.resolve().then(function () { return ServicesGridItemStyles_DAUYnyP$1; }).then(interopDefault),
  "components/ServicesNav.vue?vue&type=style&index=0&scoped=cfe661e2&lang.css": () => Promise.resolve().then(function () { return ServicesNavStyles_Nawzcvrj$1; }).then(interopDefault),
  "layouts/dashboard.vue?vue&type=style&index=0&scoped=776851d6&lang.css": () => Promise.resolve().then(function () { return dashboardStyles_8y4Z53wv$1; }).then(interopDefault),
  "layouts/default.vue?vue&type=style&index=0&scoped=787ae914&lang.css": () => Promise.resolve().then(function () { return defaultStyles_DdYyQWCJ$1; }).then(interopDefault),
  "components/ServicesGrid.vue?vue&type=style&index=0&scoped=9c95de60&lang.css": () => Promise.resolve().then(function () { return ServicesGridStyles_B9mh3sB_$1; }).then(interopDefault),
  "node_modules/@nuxt/ui/dist/runtime/components/elements/Progress.vue": () => Promise.resolve().then(function () { return ProgressStyles_DcrDdMej$1; }).then(interopDefault),
  "components/TheFooter.vue": () => Promise.resolve().then(function () { return TheFooterStyles_YKmEhRV$1; }).then(interopDefault),
  "components/NavBar.vue": () => Promise.resolve().then(function () { return NavBarStyles_SpwmoT_$1; }).then(interopDefault),
  "node_modules/@nuxt/ui/dist/runtime/components/elements/Progress.vue?vue&type=style&index=0&scoped=1e545a26&lang.css": () => Promise.resolve().then(function () { return ProgressStyles_DcrDdMej$1; }).then(interopDefault),
  "components/TheFooter.vue?vue&type=style&index=0&scoped=da2811d8&lang.css": () => Promise.resolve().then(function () { return TheFooterStyles_YKmEhRV$1; }).then(interopDefault),
  "components/NavBar.vue?vue&type=style&index=0&scoped=35d5c23e&lang.css": () => Promise.resolve().then(function () { return NavBarStyles_SpwmoT_$1; }).then(interopDefault)
};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});

const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 data-v-211c025c><span class="kune" data-v-211c025c> Kune </span> Your Gateway to Zimbabwean Digital Services</h1><p data-v-211c025c> In the bustling heart of Zimbabwe, a digital revolution is taking shape. Entrepreneurs and innovators are harnessing the power of technology to create a new wave of digital services that cater to the diverse needs of Zimbabweans. Amidst this exciting landscape, Kune emerges as a beacon of discovery, providing a comprehensive platform to explore and connect with the ever-expanding array of digital solutions available in the country. </p><h2 data-v-211c025c>Addressing the Need for Visibility</h2><p data-v-211c025c> The genesis of Kune lies in the realization that while Zimbabwe boasts a vibrant digital ecosystem, many Zimbabweans remain unaware of the vast array of services at their disposal. This information gap hinders the adoption of technology and limits the potential for digital solutions to transform lives and businesses. To bridge this divide, Kune meticulously curates a directory of Zimbabwean digital services, meticulously vetting each entry to ensure its functionality and relevance to the needs of the local community. This carefully compiled catalog spans a wide spectrum of categories, encompassing everything from e-commerce and financial services to healthcare and education. </p><h2 data-v-211c025c>Simplified Access to Essential Information</h2><p data-v-211c025c> Beyond merely listing services, Kune takes an extra step to empower users with essential information. Each service entry is accompanied by crucial details, including contact information, website links, and a concise overview of the service&#39;s offerings. This user-centric approach facilitates informed decision-making and streamlines the process of connecting with the desired service. </p><h2 data-v-211c025c>Empowering Users with Collaborative Features</h2><p data-v-211c025c> Kune&#39;s vision extends beyond providing a static directory. In the future, the platform will incorporate interactive features that empower users to contribute to its growth and enhance its value. Users will be able to suggest new services, share their experiences, and curate their own personalized lists of favorites. This collaborative approach will foster a vibrant community around Kune, ensuring that it remains a dynamic and ever-evolving resource for Zimbabweans. </p><h2 data-v-211c025c>A Catalyst for Digital Transformation</h2><p data-v-211c025c> Kune embodies the spirit of Zimbabwe&#39;s digital renaissance, serving as a catalyst for innovation and growth. By providing a centralized hub for discovering and accessing digital services, Kune empowers Zimbabweans to embrace technology and harness its transformative potential. As the platform continues to evolve, it will undoubtedly play a pivotal role in shaping the future of Zimbabwe&#39;s digital landscape. </p><!--]-->`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-211c025c"]]);

const aboutC8ORGQ6_ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: about
});

function omit(object, keysToOmit) {
  const result = { ...object };
  for (const key of keysToOmit) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
const useUI = (key, $ui, $config, $wrapperClass, withAppConfig = false) => {
  const $attrs = useAttrs();
  const appConfig = useAppConfig();
  const ui = computed(() => {
    var _a;
    const _ui = toValue($ui);
    const _config = toValue($config);
    const _wrapperClass = toValue($wrapperClass);
    return mergeConfig(
      (_ui == null ? void 0 : _ui.strategy) || ((_a = appConfig.ui) == null ? void 0 : _a.strategy),
      _wrapperClass ? { wrapper: _wrapperClass } : {},
      _ui || {},
      withAppConfig ? get(appConfig.ui, key, {}) : {},
      _config || {}
    );
  });
  const attrs = computed(() => omit($attrs, ["class"]));
  return {
    ui,
    attrs
  };
};
const arrow = {
  base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
  ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-800",
  rounded: "before:rounded-sm",
  background: "before:bg-gray-200 dark:before:bg-gray-800",
  shadow: "before:shadow",
  // eslint-disable-next-line quotes
  placement: `group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1`
};
const input = {
  wrapper: "relative",
  base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0",
  form: "form-input",
  rounded: "rounded-md",
  placeholder: "placeholder-gray-400 dark:placeholder-gray-500",
  file: {
    base: "file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none"
  },
  size: {
    "2xs": "text-xs",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-sm",
    xl: "text-base"
  },
  gap: {
    "2xs": "gap-x-1",
    xs: "gap-x-1.5",
    sm: "gap-x-1.5",
    md: "gap-x-2",
    lg: "gap-x-2.5",
    xl: "gap-x-2.5"
  },
  padding: {
    "2xs": "px-2 py-1",
    xs: "px-2.5 py-1.5",
    sm: "px-2.5 py-1.5",
    md: "px-3 py-2",
    lg: "px-3.5 py-2.5",
    xl: "px-3.5 py-2.5"
  },
  leading: {
    padding: {
      "2xs": "ps-7",
      xs: "ps-8",
      sm: "ps-9",
      md: "ps-10",
      lg: "ps-11",
      xl: "ps-12"
    }
  },
  trailing: {
    padding: {
      "2xs": "pe-7",
      xs: "pe-8",
      sm: "pe-9",
      md: "pe-10",
      lg: "pe-11",
      xl: "pe-12"
    }
  },
  color: {
    white: {
      outline: "shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    },
    gray: {
      outline: "shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
    }
  },
  variant: {
    outline: "shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400",
    none: "bg-transparent focus:ring-0 focus:shadow-none"
  },
  icon: {
    base: "flex-shrink-0 text-gray-400 dark:text-gray-500",
    color: "text-{color}-500 dark:text-{color}-400",
    loading: "animate-spin",
    size: {
      "2xs": "h-4 w-4",
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-5 w-5",
      lg: "h-5 w-5",
      xl: "h-6 w-6"
    },
    leading: {
      wrapper: "absolute inset-y-0 start-0 flex items-center",
      pointer: "pointer-events-none",
      padding: {
        "2xs": "px-2",
        xs: "px-2.5",
        sm: "px-2.5",
        md: "px-3",
        lg: "px-3.5",
        xl: "px-3.5"
      }
    },
    trailing: {
      wrapper: "absolute inset-y-0 end-0 flex items-center",
      pointer: "pointer-events-none",
      padding: {
        "2xs": "px-2",
        xs: "px-2.5",
        sm: "px-2.5",
        md: "px-3",
        lg: "px-3.5",
        xl: "px-3.5"
      }
    }
  },
  default: {
    size: "sm",
    color: "white",
    variant: "outline",
    loadingIcon: "i-heroicons-arrow-path-20-solid"
  }
};
const inputMenu = {
  container: "z-20 group",
  trigger: "flex items-center w-full",
  width: "w-full",
  height: "max-h-60",
  base: "relative focus:outline-none overflow-y-auto scroll-py-1",
  background: "bg-white dark:bg-gray-800",
  shadow: "shadow-lg",
  rounded: "rounded-md",
  padding: "p-1",
  ring: "ring-1 ring-gray-200 dark:ring-gray-700",
  empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
  option: {
    base: "cursor-default select-none relative flex items-center justify-between gap-1",
    rounded: "rounded-md",
    padding: "px-1.5 py-1.5",
    size: "text-sm",
    color: "text-gray-900 dark:text-white",
    container: "flex items-center gap-1.5 min-w-0",
    active: "bg-gray-100 dark:bg-gray-900",
    inactive: "",
    selected: "pe-7",
    disabled: "cursor-not-allowed opacity-50",
    empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
    icon: {
      base: "flex-shrink-0 h-5 w-5",
      active: "text-gray-900 dark:text-white",
      inactive: "text-gray-400 dark:text-gray-500"
    },
    selectedIcon: {
      wrapper: "absolute inset-y-0 end-0 flex items-center",
      padding: "pe-2",
      base: "h-5 w-5 text-gray-900 dark:text-white flex-shrink-0"
    },
    avatar: {
      base: "flex-shrink-0",
      size: "2xs"
    },
    chip: {
      base: "flex-shrink-0 w-2 h-2 mx-1 rounded-full"
    }
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    leaveActiveClass: "transition ease-in duration-100",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0"
  },
  popper: {
    placement: "bottom-end"
  },
  default: {
    selectedIcon: "i-heroicons-check-20-solid",
    trailingIcon: "i-heroicons-chevron-down-20-solid"
  },
  arrow: {
    ...arrow,
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    background: "before:bg-white dark:before:bg-gray-700"
  }
};
const textarea = {
  ...input,
  form: "form-textarea",
  default: {
    size: "sm",
    color: "white",
    variant: "outline"
  }
};
({
  ...input,
  form: "form-select",
  placeholder: "text-gray-400 dark:text-gray-500",
  default: {
    size: "sm",
    color: "white",
    variant: "outline",
    loadingIcon: "i-heroicons-arrow-path-20-solid",
    trailingIcon: "i-heroicons-chevron-down-20-solid"
  }
});
({
  ...inputMenu,
  select: "inline-flex items-center text-left cursor-default",
  input: "block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none",
  required: "absolute inset-0 w-px opacity-0 cursor-default",
  label: "block truncate",
  option: {
    ...inputMenu.option,
    create: "block truncate"
  },
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    leaveActiveClass: "transition ease-in duration-100",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0"
  },
  popper: {
    placement: "bottom-end"
  },
  default: {
    selectedIcon: "i-heroicons-check-20-solid",
    clearSearchOnClose: false,
    showCreateOptionWhen: "empty"
  },
  arrow: {
    ...arrow,
    ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
    background: "before:bg-white dark:before:bg-gray-700"
  }
});
function useInjectButtonGroup({ ui, props }) {
  const instance = getCurrentInstance();
  provide("ButtonGroupContextConsumer", true);
  const isParentPartOfGroup = inject("ButtonGroupContextConsumer", false);
  if (isParentPartOfGroup) {
    return {
      size: computed(() => props.size),
      rounded: computed(() => ui.value.rounded)
    };
  }
  let parent = instance.parent;
  let groupContext;
  while (parent && !groupContext) {
    if (parent.type.name === "ButtonGroup") {
      groupContext = inject(`group-${parent.uid}`);
      break;
    }
    parent = parent.parent;
  }
  const positionInGroup = computed(() => groupContext == null ? void 0 : groupContext.value.children.indexOf(instance));
  onUnmounted(() => {
    groupContext == null ? void 0 : groupContext.value.unregister(instance);
  });
  return {
    size: computed(() => (groupContext == null ? void 0 : groupContext.value.size) || props.size),
    rounded: computed(() => {
      if (!groupContext || positionInGroup.value === -1)
        return ui.value.rounded;
      if (groupContext.value.children.length === 1)
        return groupContext.value.ui.rounded;
      if (positionInGroup.value === 0)
        return groupContext.value.rounded.start;
      if (positionInGroup.value === groupContext.value.children.length - 1)
        return groupContext.value.rounded.end;
      return "rounded-none";
    })
  };
}

const container = {
  base: "mx-auto",
  padding: "px-4 sm:px-6 lg:px-8",
  constrained: "max-w-7xl"
};
const config$8 = mergeConfig(appConfig.ui.strategy, appConfig.ui.container, container);
const _sfc_main$k = defineComponent({
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: "div"
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("container", toRef(props, "ui"), config$8);
    const containerClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.padding,
        ui.value.constrained
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      containerClass
    };
  }
});
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({ class: _ctx.containerClass }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Container.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __nuxt_component_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$b]]);

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a2;
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h$1(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_a2 = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _a2 : null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h$1("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$6 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}

const iconCollections = ["fluent-emoji-high-contrast", "material-symbols-light", "cryptocurrency-color", "icon-park-outline", "icon-park-twotone", "fluent-emoji-flat", "emojione-monotone", "streamline-emojis", "heroicons-outline", "simple-line-icons", "material-symbols", "flat-color-icons", "icon-park-solid", "pepicons-pencil", "heroicons-solid", "pepicons-print", "cryptocurrency", "pixelarticons", "system-uicons", "bitcoin-icons", "devicon-plain", "entypo-social", "token-branded", "grommet-icons", "vscode-icons", "pepicons-pop", "svg-spinners", "fluent-emoji", "simple-icons", "circle-flags", "medical-icon", "icomoon-free", "majesticons", "radix-icons", "humbleicons", "fa6-regular", "emojione-v1", "skill-icons", "academicons", "healthicons", "fluent-mdl2", "teenyicons", "ant-design", "gravity-ui", "akar-icons", "lets-icons", "streamline", "fa6-brands", "file-icons", "game-icons", "foundation", "fa-regular", "mono-icons", "hugeicons", "iconamoon", "zondicons", "mdi-light", "eos-icons", "gridicons", "icon-park", "heroicons", "fa6-solid", "meteocons", "arcticons", "dashicons", "fa-brands", "websymbol", "fontelico", "mingcute", "flowbite", "marketeq", "bytesize", "guidance", "openmoji", "emojione", "nonicons", "brandico", "flagpack", "fa-solid", "fontisto", "si-glyph", "pepicons", "iconoir", "tdesign", "clarity", "octicon", "codicon", "pajamas", "formkit", "line-md", "twemoji", "noto-v1", "fxemoji", "devicon", "raphael", "flat-ui", "topcoat", "feather", "tabler", "carbon", "lucide", "memory", "mynaui", "circum", "fluent", "nimbus", "entypo", "icons8", "subway", "vaadin", "solar", "basil", "typcn", "charm", "prime", "quill", "logos", "token", "covid", "maki", "gala", "mage", "ooui", "noto", "unjs", "flag", "iwwa", "zmdi", "bpmn", "mdi", "ion", "uil", "bxs", "cil", "uiw", "uim", "uit", "uis", "jam", "oui", "bxl", "cib", "cbi", "cif", "gis", "map", "geo", "fad", "eva", "wpf", "whh", "ic", "ph", "ri", "bi", "bx", "gg", "ci", "ep", "fe", "mi", "f7", "ei", "wi", "la", "fa", "oi", "et", "el", "ls", "vs", "il", "ps"];
function resolveIconName(name = "") {
  let prefix;
  let provider = "";
  if (name[0] === "@" && name.includes(":")) {
    provider = name.split(":")[0].slice(1);
    name = name.split(":").slice(1).join(":");
  }
  if (name.startsWith("i-")) {
    name = name.replace(/^i-/, "");
    for (const collectionName of iconCollections) {
      if (name.startsWith(collectionName)) {
        prefix = collectionName;
        name = name.slice(collectionName.length + 1);
        break;
      }
    }
  } else if (name.includes(":")) {
    const [_prefix, _name] = name.split(":");
    prefix = _prefix;
    name = _name;
  }
  return {
    provider,
    prefix: prefix || "",
    name: name || ""
  };
}

const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const nuxtApp = useNuxtApp();
    const appConfig = useAppConfig();
    const props = __props;
    watch$1(() => {
      var _a;
      return (_a = appConfig.nuxtIcon) == null ? void 0 : _a.iconifyApiOptions;
    }, () => {
      var _a, _b, _c, _d, _e, _f;
      if (!((_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.iconifyApiOptions) == null ? void 0 : _b.url))
        return;
      try {
        new URL(appConfig.nuxtIcon.iconifyApiOptions.url);
      } catch (e) {
        console.warn("Nuxt Icon: Invalid custom Iconify API URL");
        return;
      }
      if ((_d = (_c = appConfig.nuxtIcon) == null ? void 0 : _c.iconifyApiOptions) == null ? void 0 : _d.publicApiFallback) {
        addAPIProvider("custom", {
          resources: [(_e = appConfig.nuxtIcon) == null ? void 0 : _e.iconifyApiOptions.url],
          index: 0
        });
        return;
      }
      addAPIProvider("", {
        resources: [(_f = appConfig.nuxtIcon) == null ? void 0 : _f.iconifyApiOptions.url]
      });
    }, { immediate: true });
    const state = useState("icons", () => ({}));
    const isFetching = ref(false);
    const iconName = computed(() => {
      var _a, _b;
      if ((_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.aliases) == null ? void 0 : _b[props.name]) {
        return appConfig.nuxtIcon.aliases[props.name];
      }
      return props.name;
    });
    const resolvedIcon = computed(() => resolveIconName(iconName.value));
    const iconKey = computed(() => [resolvedIcon.value.provider, resolvedIcon.value.prefix, resolvedIcon.value.name].filter(Boolean).join(":"));
    const icon = computed(() => {
      var _a;
      return (_a = state.value) == null ? void 0 : _a[iconKey.value];
    });
    const component = computed(() => {
      var _a;
      return (_a = nuxtApp.vueApp) == null ? void 0 : _a.component(iconName.value);
    });
    const sSize = computed(() => {
      var _a, _b, _c;
      if (!props.size && typeof ((_a = appConfig.nuxtIcon) == null ? void 0 : _a.size) === "boolean" && !((_b = appConfig.nuxtIcon) == null ? void 0 : _b.size)) {
        return void 0;
      }
      const size = props.size || ((_c = appConfig.nuxtIcon) == null ? void 0 : _c.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    const className = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = appConfig == null ? void 0 : appConfig.nuxtIcon) == null ? void 0 : _a.class) != null ? _a2 : "icon";
    });
    async function loadIconComponent() {
      var _a;
      if (component.value) {
        return;
      }
      if (!((_a = state.value) == null ? void 0 : _a[iconKey.value])) {
        isFetching.value = true;
        state.value[iconKey.value] = await loadIcon(resolvedIcon.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    watch$1(iconName, loadIconComponent);
    !component.value && ([__temp, __restore] = withAsyncContext(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (isFetching.value) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-e8d572f6></span>`);
      } else if (icon.value) {
        _push(ssrRenderComponent(unref(Icon), mergeProps({
          icon: icon.value,
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null, _parent));
      } else if (component.value) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null), _parent);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { fontSize: sSize.value, lineHeight: sSize.value, width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-e8d572f6>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.name)}`);
        }, _push, _parent);
        _push(`</span>`);
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icon/dist/runtime/Icon.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __nuxt_component_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-e8d572f6"]]);

const IconCKURRh4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: __nuxt_component_2$4
});

const nuxtLinkProps = {
  to: {
    type: [String, Object],
    default: void 0,
    required: false
  },
  href: {
    type: [String, Object],
    default: void 0,
    required: false
  },
  // Attributes
  target: {
    type: String,
    default: void 0,
    required: false
  },
  rel: {
    type: String,
    default: void 0,
    required: false
  },
  noRel: {
    type: Boolean,
    default: void 0,
    required: false
  },
  // Prefetching
  prefetch: {
    type: Boolean,
    default: void 0,
    required: false
  },
  noPrefetch: {
    type: Boolean,
    default: void 0,
    required: false
  },
  // Styling
  activeClass: {
    type: String,
    default: void 0,
    required: false
  },
  exactActiveClass: {
    type: String,
    default: void 0,
    required: false
  },
  prefetchedClass: {
    type: String,
    default: void 0,
    required: false
  },
  // Vue Router's `<RouterLink>` additional props
  replace: {
    type: Boolean,
    default: void 0,
    required: false
  },
  ariaCurrentValue: {
    type: String,
    default: void 0,
    required: false
  },
  // Edge cases handling
  external: {
    type: Boolean,
    default: void 0,
    required: false
  }
};
const uLinkProps = {
  as: {
    type: String,
    default: "button"
  },
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: null
  },
  active: {
    type: Boolean,
    default: void 0
  },
  exact: {
    type: Boolean,
    default: false
  },
  exactQuery: {
    type: Boolean,
    default: false
  },
  exactHash: {
    type: Boolean,
    default: false
  },
  inactiveClass: {
    type: String,
    default: void 0
  }
};
const getNuxtLinkProps = (props) => {
  const keys = Object.keys(nuxtLinkProps);
  return keys.reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};
const getULinkProps = (props) => {
  const keys = [...Object.keys(nuxtLinkProps), ...Object.keys(uLinkProps)];
  return keys.reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};
const button = {
  base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0",
  font: "font-medium",
  rounded: "rounded-md",
  truncate: "text-left break-all line-clamp-1",
  block: "w-full flex justify-center items-center",
  inline: "inline-flex items-center",
  size: {
    "2xs": "text-xs",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-sm",
    xl: "text-base"
  },
  gap: {
    "2xs": "gap-x-1",
    xs: "gap-x-1.5",
    sm: "gap-x-1.5",
    md: "gap-x-2",
    lg: "gap-x-2.5",
    xl: "gap-x-2.5"
  },
  padding: {
    "2xs": "px-2 py-1",
    xs: "px-2.5 py-1.5",
    sm: "px-2.5 py-1.5",
    md: "px-3 py-2",
    lg: "px-3.5 py-2.5",
    xl: "px-3.5 py-2.5"
  },
  square: {
    "2xs": "p-1",
    xs: "p-1.5",
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
    xl: "p-2.5"
  },
  color: {
    white: {
      solid: "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      ghost: "text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
    },
    gray: {
      solid: "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      ghost: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      link: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
    },
    black: {
      solid: "shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      link: "text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
    }
  },
  variant: {
    solid: "shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
    outline: "ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
    soft: "text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
    ghost: "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
    link: "text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400"
  },
  icon: {
    base: "flex-shrink-0",
    loading: "animate-spin",
    size: {
      "2xs": "h-4 w-4",
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-5 w-5",
      lg: "h-5 w-5",
      xl: "h-6 w-6"
    }
  },
  default: {
    size: "sm",
    variant: "solid",
    color: "primary",
    loadingIcon: "i-heroicons-arrow-path-20-solid"
  }
};
const _sfc_main$2$6 = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    dynamic: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const appConfig2 = useAppConfig();
    const dynamic = computed(() => {
      var _a, _b;
      return props.dynamic || ((_b = (_a = appConfig2.ui) == null ? void 0 : _a.icons) == null ? void 0 : _b.dynamic);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      dynamic
    };
  }
});
function _sfc_ssrRender$2$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_2$4;
  if (_ctx.dynamic) {
    _push(ssrRenderComponent(_component_Icon, mergeProps({ name: _ctx.name }, _attrs), null, _parent));
  } else {
    _push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.name }, _attrs))}></span>`);
  }
}
const _sfc_setup$2$6 = _sfc_main$2$6.setup;
_sfc_main$2$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Icon.vue");
  return _sfc_setup$2$6 ? _sfc_setup$2$6(props, ctx) : void 0;
};
const __nuxt_component_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$2$6, [["ssrRender", _sfc_ssrRender$2$3]]);
const _sfc_main$1$a = defineComponent({
  inheritAttrs: false,
  props: {
    ...nuxtLinkProps,
    as: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "button"
    },
    disabled: {
      type: Boolean,
      default: null
    },
    active: {
      type: Boolean,
      default: void 0
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactQuery: {
      type: Boolean,
      default: false
    },
    exactHash: {
      type: Boolean,
      default: false
    },
    inactiveClass: {
      type: String,
      default: void 0
    }
  },
  setup(props) {
    function resolveLinkClass(route, $route, { isActive, isExactActive }) {
      if (props.exactQuery && !isEqual(route.query, $route.query)) {
        return props.inactiveClass;
      }
      if (props.exactHash && route.hash !== $route.hash) {
        return props.inactiveClass;
      }
      if (props.exact && isExactActive) {
        return props.activeClass;
      }
      if (!props.exact && isActive) {
        return props.activeClass;
      }
      return props.inactiveClass;
    }
    return {
      resolveLinkClass
    };
  }
});
function _sfc_ssrRender$1$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$6;
  if (!_ctx.to) {
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
      type: _ctx.type,
      disabled: _ctx.disabled
    }, _ctx.$attrs, {
      class: _ctx.active ? _ctx.activeClass : _ctx.inactiveClass
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "default", { isActive: _ctx.active }, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "default", { isActive: _ctx.active })
          ];
        }
      }),
      _: 3
    }), _parent);
  } else {
    _push(ssrRenderComponent(_component_NuxtLink, mergeProps(_ctx.$props, { custom: "" }, _attrs), {
      default: withCtx(({ route, href, target, rel, navigate, isActive, isExactActive, isExternal }, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<a${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
            href: !_ctx.disabled ? href : void 0,
            "aria-disabled": _ctx.disabled ? "true" : void 0,
            role: _ctx.disabled ? "link" : void 0,
            rel,
            target,
            class: _ctx.active !== void 0 ? _ctx.active ? _ctx.activeClass : _ctx.inactiveClass : _ctx.resolveLinkClass(route, _ctx.$route, { isActive, isExactActive })
          }))}${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "default", { isActive: _ctx.active !== void 0 ? _ctx.active : _ctx.exact ? isExactActive : isActive }, null, _push2, _parent2, _scopeId);
          _push2(`</a>`);
        } else {
          return [
            createVNode("a", mergeProps(_ctx.$attrs, {
              href: !_ctx.disabled ? href : void 0,
              "aria-disabled": _ctx.disabled ? "true" : void 0,
              role: _ctx.disabled ? "link" : void 0,
              rel,
              target,
              class: _ctx.active !== void 0 ? _ctx.active ? _ctx.activeClass : _ctx.inactiveClass : _ctx.resolveLinkClass(route, _ctx.$route, { isActive, isExactActive }),
              onClick: (e) => !isExternal && !_ctx.disabled && navigate(e)
            }), [
              renderSlot(_ctx.$slots, "default", { isActive: _ctx.active !== void 0 ? _ctx.active : _ctx.exact ? isExactActive : isActive })
            ], 16, ["href", "aria-disabled", "role", "rel", "target", "onClick"])
          ];
        }
      }),
      _: 3
    }, _parent));
  }
}
const _sfc_setup$1$a = _sfc_main$1$a.setup;
_sfc_main$1$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Link.vue");
  return _sfc_setup$1$a ? _sfc_setup$1$a(props, ctx) : void 0;
};
const __nuxt_component_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$1$a, [["ssrRender", _sfc_ssrRender$1$4]]);
const config$7 = mergeConfig(appConfig.ui.strategy, appConfig.ui.button, button);
const _sfc_main$i = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3,
    ULink: __nuxt_component_0$5
  },
  inheritAttrs: false,
  props: {
    ...nuxtLinkProps,
    type: {
      type: String,
      default: "button"
    },
    block: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: () => config$7.default.size,
      validator(value) {
        return Object.keys(config$7.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$7.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config$7.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config$7.default.variant,
      validator(value) {
        return [
          ...Object.keys(config$7.variant),
          ...Object.values(config$7.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config$7.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: null
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    truncate: {
      type: Boolean,
      default: false
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const { ui, attrs } = useUI("button", toRef(props, "ui"), config$7);
    const { size, rounded } = useInjectButtonGroup({ ui, props });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const isSquare = computed(() => props.square || !slots.default && !props.label);
    const buttonClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[props.color]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.font,
        rounded.value,
        ui.value.size[size.value],
        ui.value.gap[size.value],
        props.padded && ui.value[isSquare.value ? "square" : "padding"][size.value],
        variant == null ? void 0 : variant.replaceAll("{color}", props.color),
        props.block ? ui.value.block : ui.value.inline
      ), props.class);
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[size.value],
        props.loading && ui.value.icon.loading
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && ui.value.icon.loading
      );
    });
    const linkProps = computed(() => getNuxtLinkProps(props));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      isLeading,
      isTrailing,
      isSquare,
      buttonClass,
      leadingIconName,
      trailingIconName,
      leadingIconClass,
      trailingIconClass,
      linkProps
    };
  }
});
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ULink = __nuxt_component_0$5;
  const _component_UIcon = __nuxt_component_2$3;
  _push(ssrRenderComponent(_component_ULink, mergeProps({
    type: _ctx.type,
    disabled: _ctx.disabled || _ctx.loading,
    class: _ctx.buttonClass
  }, { ..._ctx.linkProps, ..._ctx.attrs }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "leading", {
          disabled: _ctx.disabled,
          loading: _ctx.loading
        }, () => {
          if (_ctx.isLeading && _ctx.leadingIconName) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: _ctx.leadingIconName,
              class: _ctx.leadingIconClass,
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
        }, _push2, _parent2, _scopeId);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          if (_ctx.label) {
            _push2(`<span class="${ssrRenderClass([_ctx.truncate ? _ctx.ui.truncate : ""])}"${_scopeId}>${ssrInterpolate(_ctx.label)}</span>`);
          } else {
            _push2(`<!---->`);
          }
        }, _push2, _parent2, _scopeId);
        ssrRenderSlot(_ctx.$slots, "trailing", {
          disabled: _ctx.disabled,
          loading: _ctx.loading
        }, () => {
          if (_ctx.isTrailing && _ctx.trailingIconName) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: _ctx.trailingIconName,
              class: _ctx.trailingIconClass,
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
        }, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "leading", {
            disabled: _ctx.disabled,
            loading: _ctx.loading
          }, () => [
            _ctx.isLeading && _ctx.leadingIconName ? (openBlock(), createBlock(_component_UIcon, {
              key: 0,
              name: _ctx.leadingIconName,
              class: _ctx.leadingIconClass,
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.label ? (openBlock(), createBlock("span", {
              key: 0,
              class: [_ctx.truncate ? _ctx.ui.truncate : ""]
            }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
          ]),
          renderSlot(_ctx.$slots, "trailing", {
            disabled: _ctx.disabled,
            loading: _ctx.loading
          }, () => [
            _ctx.isTrailing && _ctx.trailingIconName ? (openBlock(), createBlock(_component_UIcon, {
              key: 0,
              name: _ctx.trailingIconName,
              class: _ctx.trailingIconClass,
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __nuxt_component_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$a]]);

const ATTR_KEY = "data-n-ids";
const SEPARATOR = "-";
function useId(key) {
  var _a;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [useId] key must be a string.");
  }
  key = `n${key.slice(1)}`;
  const nuxtApp = useNuxtApp();
  const instance = getCurrentInstance();
  if (!instance) {
    throw new TypeError("[nuxt] `useId` must be called within a component setup function.");
  }
  nuxtApp._id || (nuxtApp._id = 0);
  instance._nuxtIdIndex || (instance._nuxtIdIndex = {});
  (_a = instance._nuxtIdIndex)[key] || (_a[key] = 0);
  const instanceIndex = key + SEPARATOR + instance._nuxtIdIndex[key]++;
  {
    const ids = JSON.parse(instance.attrs[ATTR_KEY] || "{}");
    ids[instanceIndex] = key + SEPARATOR + nuxtApp._id++;
    instance.attrs[ATTR_KEY] = JSON.stringify(ids);
    return ids[instanceIndex];
  }
}
const formGroup = {
  wrapper: "",
  inner: "",
  label: {
    wrapper: "flex content-center items-center justify-between",
    base: "block font-medium text-gray-700 dark:text-gray-200",
    // eslint-disable-next-line quotes
    required: `after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400`
  },
  size: {
    "2xs": "text-xs",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-sm",
    xl: "text-base"
  },
  container: "mt-1 relative",
  description: "text-gray-500 dark:text-gray-400",
  hint: "text-gray-500 dark:text-gray-400",
  help: "mt-2 text-gray-500 dark:text-gray-400",
  error: "mt-2 text-red-500 dark:text-red-400",
  default: {
    size: "sm"
  }
};
class FormException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, FormException.prototype);
  }
}
const _sfc_main$2$5 = defineComponent({
  props: {
    schema: {
      type: Object,
      default: void 0
    },
    state: {
      type: Object,
      required: true
    },
    validate: {
      type: Function,
      default: () => []
    },
    validateOn: {
      type: Array,
      default: () => ["blur", "input", "change", "submit"]
    }
  },
  emits: ["submit", "error"],
  setup(props, { expose, emit }) {
    const formId = useId("$Z55GngiEgp");
    const bus = useEventBus(`form-${formId}`);
    onUnmounted(() => {
      bus.reset();
    });
    const errors = ref([]);
    provide("form-errors", errors);
    provide("form-events", bus);
    const inputs = ref({});
    provide("form-inputs", inputs);
    async function getErrors() {
      let errs = await props.validate(props.state);
      if (props.schema) {
        if (isZodSchema(props.schema)) {
          errs = errs.concat(await getZodErrors(props.state, props.schema));
        } else if (isYupSchema(props.schema)) {
          errs = errs.concat(await getYupErrors(props.state, props.schema));
        } else if (isJoiSchema(props.schema)) {
          errs = errs.concat(await getJoiErrors(props.state, props.schema));
        } else if (isValibotSchema(props.schema)) {
          errs = errs.concat(await getValibotError(props.state, props.schema));
        } else {
          throw new Error("Form validation failed: Unsupported form schema");
        }
      }
      return errs;
    }
    async function validate(path, opts = { silent: false }) {
      let paths = path;
      if (path && !Array.isArray(path)) {
        paths = [path];
      }
      if (paths) {
        const otherErrors = errors.value.filter(
          (error) => !paths.includes(error.path)
        );
        const pathErrors = (await getErrors()).filter(
          (error) => paths.includes(error.path)
        );
        errors.value = otherErrors.concat(pathErrors);
      } else {
        errors.value = await getErrors();
      }
      if (errors.value.length > 0) {
        if (opts.silent)
          return false;
        throw new FormException(
          `Form validation failed: ${JSON.stringify(errors.value, null, 2)}`
        );
      }
      return props.state;
    }
    async function onSubmit(payload) {
      var _a;
      const event = payload;
      try {
        if ((_a = props.validateOn) == null ? void 0 : _a.includes("submit")) {
          await validate();
        }
        const submitEvent = {
          ...event,
          data: props.state
        };
        emit("submit", submitEvent);
      } catch (error) {
        if (!(error instanceof FormException)) {
          throw error;
        }
        const errorEvent = {
          ...event,
          errors: errors.value.map((err) => ({
            ...err,
            id: inputs.value[err.path]
          }))
        };
        emit("error", errorEvent);
      }
    }
    expose({
      validate,
      errors,
      setErrors(errs, path) {
        errors.value = errs;
        if (path) {
          errors.value = errors.value.filter(
            (error) => error.path !== path
          ).concat(errs);
        } else {
          errors.value = errs;
        }
      },
      async submit() {
        await onSubmit(new Event("submit"));
      },
      getErrors(path) {
        if (path) {
          return errors.value.filter((err) => err.path === path);
        }
        return errors.value;
      },
      clear(path) {
        if (path) {
          errors.value = errors.value.filter((err) => err.path !== path);
        } else {
          errors.value = [];
        }
      }
    });
    return {
      onSubmit
    };
  }
});
function isYupSchema(schema) {
  return schema.validate && schema.__isYupSchema__;
}
function isYupError(error) {
  return error.inner !== void 0;
}
async function getYupErrors(state, schema) {
  try {
    await schema.validate(state, { abortEarly: false });
    return [];
  } catch (error) {
    if (isYupError(error)) {
      return error.inner.map((issue) => {
        var _a;
        return {
          path: (_a = issue.path) != null ? _a : "",
          message: issue.message
        };
      });
    } else {
      throw error;
    }
  }
}
function isZodSchema(schema) {
  return schema.parse !== void 0;
}
async function getZodErrors(state, schema) {
  const result = await schema.safeParseAsync(state);
  if (result.success === false) {
    return result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
  }
  return [];
}
function isJoiSchema(schema) {
  return schema.validateAsync !== void 0 && schema.id !== void 0;
}
function isJoiError(error) {
  return error.isJoi === true;
}
async function getJoiErrors(state, schema) {
  try {
    await schema.validateAsync(state, { abortEarly: false });
    return [];
  } catch (error) {
    if (isJoiError(error)) {
      return error.details.map((detail) => ({
        path: detail.path.join("."),
        message: detail.message
      }));
    } else {
      throw error;
    }
  }
}
function isValibotSchema(schema) {
  return schema._parse !== void 0;
}
async function getValibotError(state, schema) {
  const result = await schema._parse(state);
  if (result.issues) {
    return result.issues.map((issue) => {
      var _a;
      return {
        path: ((_a = issue.path) == null ? void 0 : _a.map((p) => p.key).join(".")) || "",
        message: issue.message
      };
    });
  }
  return [];
}
function _sfc_ssrRender$2$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<form${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</form>`);
}
const _sfc_setup$2$5 = _sfc_main$2$5.setup;
_sfc_main$2$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Form.vue");
  return _sfc_setup$2$5 ? _sfc_setup$2$5(props, ctx) : void 0;
};
const __nuxt_component_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$2$5, [["ssrRender", _sfc_ssrRender$2$2]]);
const config$1$3 = mergeConfig(appConfig.ui.strategy, appConfig.ui.formGroup, formGroup);
const _sfc_main$1$9 = defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config$1$3.size).includes(value);
      }
    },
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    eagerValidation: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("formGroup", toRef(props, "ui"), config$1$3, toRef(props, "class"));
    const formErrors = inject("form-errors", null);
    const error = computed(() => {
      var _a, _b;
      return props.error && typeof props.error === "string" || typeof props.error === "boolean" ? props.error : (_b = (_a = formErrors == null ? void 0 : formErrors.value) == null ? void 0 : _a.find((error2) => error2.path === props.name)) == null ? void 0 : _b.message;
    });
    const size = computed(() => {
      var _a;
      return ui.value.size[(_a = props.size) != null ? _a : config$1$3.default.size];
    });
    const inputId = ref(useId("$K7dDJpdOWE"));
    provide("form-group", {
      error,
      inputId,
      name: computed(() => props.name),
      size: computed(() => props.size),
      eagerValidation: computed(() => props.eagerValidation)
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      size,
      // eslint-disable-next-line vue/no-dupe-keys
      error
    };
  }
});
function _sfc_ssrRender$1$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.ui.inner)}">`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass([_ctx.ui.label.wrapper, _ctx.size])}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass([_ctx.ui.label.base, _ctx.required ? _ctx.ui.label.required : ""])}">`);
    if (_ctx.$slots.label) {
      ssrRenderSlot(_ctx.$slots, "label", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.label)}<!--]-->`);
    }
    _push(`</label>`);
    if (_ctx.hint || _ctx.$slots.hint) {
      _push(`<span class="${ssrRenderClass([_ctx.ui.hint])}">`);
      if (_ctx.$slots.hint) {
        ssrRenderSlot(_ctx.$slots, "hint", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.hint)}<!--]-->`);
      }
      _push(`</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.description || _ctx.$slots.description) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.description, _ctx.size])}">`);
    if (_ctx.$slots.description) {
      ssrRenderSlot(_ctx.$slots, "description", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.description)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="${ssrRenderClass([_ctx.label ? _ctx.ui.container : ""])}">`);
  ssrRenderSlot(_ctx.$slots, "default", { error: _ctx.error }, null, _push, _parent);
  if (typeof _ctx.error === "string" && _ctx.error || _ctx.$slots.error) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.error, _ctx.size])}">`);
    if (_ctx.$slots.error) {
      ssrRenderSlot(_ctx.$slots, "error", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.error)}<!--]-->`);
    }
    _push(`</p>`);
  } else if (_ctx.help || _ctx.$slots.help) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.help, _ctx.size])}">`);
    if (_ctx.$slots.help) {
      ssrRenderSlot(_ctx.$slots, "help", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.help)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1$9 = _sfc_main$1$9.setup;
_sfc_main$1$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue");
  return _sfc_setup$1$9 ? _sfc_setup$1$9(props, ctx) : void 0;
};
const __nuxt_component_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$1$9, [["ssrRender", _sfc_ssrRender$1$3]]);
const useFormGroup = (inputProps, config2) => {
  const formBus = inject("form-events", void 0);
  const formGroup2 = inject("form-group", void 0);
  const formInputs = inject("form-inputs", void 0);
  if (formGroup2) {
    if (inputProps == null ? void 0 : inputProps.id) {
      formGroup2.inputId.value = inputProps == null ? void 0 : inputProps.id;
    }
    if (formInputs) {
      formInputs.value[formGroup2.name.value] = formGroup2.inputId.value;
    }
  }
  const blurred = ref(false);
  function emitFormEvent(type, path) {
    if (formBus) {
      formBus.emit({ type, path });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formGroup2 == null ? void 0 : formGroup2.name.value);
    blurred.value = true;
  }
  function emitFormChange() {
    emitFormEvent("change", formGroup2 == null ? void 0 : formGroup2.name.value);
  }
  const emitFormInput = useDebounceFn(() => {
    if (blurred.value || (formGroup2 == null ? void 0 : formGroup2.eagerValidation.value)) {
      emitFormEvent("input", formGroup2 == null ? void 0 : formGroup2.name.value);
    }
  }, 300);
  return {
    inputId: computed(() => {
      var _a;
      return (_a = inputProps == null ? void 0 : inputProps.id) != null ? _a : formGroup2 == null ? void 0 : formGroup2.inputId.value;
    }),
    name: computed(() => {
      var _a;
      return (_a = inputProps == null ? void 0 : inputProps.name) != null ? _a : formGroup2 == null ? void 0 : formGroup2.name.value;
    }),
    size: computed(() => {
      var _a2, _b;
      var _a;
      const formGroupSize = config2.size[formGroup2 == null ? void 0 : formGroup2.size.value] ? formGroup2 == null ? void 0 : formGroup2.size.value : null;
      return (_b = (_a2 = inputProps == null ? void 0 : inputProps.size) != null ? _a2 : formGroupSize) != null ? _b : (_a = config2 == null ? void 0 : config2.default) == null ? void 0 : _a.size;
    }),
    color: computed(() => {
      var _a;
      return ((_a = formGroup2 == null ? void 0 : formGroup2.error) == null ? void 0 : _a.value) ? "red" : inputProps == null ? void 0 : inputProps.color;
    }),
    emitFormBlur,
    emitFormInput,
    emitFormChange
  };
};
const config$6 = mergeConfig(appConfig.ui.strategy, appConfig.ui.input, input);
const _sfc_main$h = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autofocusDelay: {
      type: Number,
      default: 100
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config$6.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: null
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config$6.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$6.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config$6.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config$6.default.variant,
      validator(value) {
        return [
          ...Object.keys(config$6.variant),
          ...Object.values(config$6.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    inputClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("input", toRef(props, "ui"), config$6, toRef(props, "class"));
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({ ui, props });
    const { emitFormBlur, emitFormInput, size: sizeFormGroup, color, inputId, name } = useFormGroup(props, config$6);
    const size = computed(() => sizeButtonGroup.value || sizeFormGroup.value);
    const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false }));
    const input2 = ref(null);
    const updateInput = (value) => {
      if (modelModifiers.value.trim) {
        value = value.trim();
      }
      if (modelModifiers.value.number || props.type === "number") {
        value = looseToNumber(value);
      }
      emit("update:modelValue", value);
      emitFormInput();
    };
    const onInput = (event) => {
      if (!modelModifiers.value.lazy) {
        updateInput(event.target.value);
      }
    };
    const onChange = (event) => {
      if (props.type === "file") {
        const value = event.target.files;
        emit("change", value);
      } else {
        const value = event.target.value;
        emit("change", value);
        if (modelModifiers.value.lazy) {
          updateInput(value);
        }
        if (modelModifiers.value.trim) {
          event.target.value = value.trim();
        }
      }
    };
    const onBlur = (event) => {
      emitFormBlur();
      emit("blur", event);
    };
    const inputClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        rounded.value,
        ui.value.placeholder,
        props.type === "file" && ui.value.file.base,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        (isLeading.value || slots.leading) && ui.value.leading.padding[size.value],
        (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]
      ), props.inputClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.leading.wrapper,
        ui.value.icon.leading.pointer,
        ui.value.icon.leading.padding[size.value]
      );
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && ui.value.icon.loading
      );
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.trailing.wrapper,
        ui.value.icon.trailing.pointer,
        ui.value.icon.trailing.padding[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && ui.value.icon.loading
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      input: input2,
      isLeading,
      isTrailing,
      // eslint-disable-next-line vue/no-dupe-keys
      inputClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      onInput,
      onChange,
      onBlur
    };
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_2$3;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><input${ssrRenderAttrs(mergeProps({
    id: _ctx.inputId,
    ref: "input",
    name: _ctx.name,
    value: _ctx.modelValue,
    type: _ctx.type,
    required: _ctx.required,
    placeholder: _ctx.placeholder,
    disabled: _ctx.disabled,
    class: _ctx.inputClass
  }, _ctx.attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
    _push(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "leading", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
    _push(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "trailing", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Input.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$9]]);

const config$5 = mergeConfig(appConfig.ui.strategy, appConfig.ui.textarea, textarea);
const _sfc_main$1$8 = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxrows: {
      type: Number,
      default: 0
    },
    autoresize: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autofocusDelay: {
      type: Number,
      default: 100
    },
    resize: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config$5.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$5.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config$5.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config$5.default.variant,
      validator(value) {
        return [
          ...Object.keys(config$5.variant),
          ...Object.values(config$5.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    textareaClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("textarea", toRef(props, "ui"), config$5, toRef(props, "class"));
    const { emitFormBlur, emitFormInput, inputId, color, size, name } = useFormGroup(props, config$5);
    const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false }));
    const textarea2 = ref(null);
    const autoResize = () => {
      if (props.autoresize) {
        if (!textarea2.value) {
          return;
        }
        textarea2.value.rows = props.rows;
        const styles = (void 0).getComputedStyle(textarea2.value);
        const paddingTop = parseInt(styles.paddingTop);
        const paddingBottom = parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = parseInt(styles.lineHeight);
        const { scrollHeight } = textarea2.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textarea2.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
      }
    };
    const updateInput = (value) => {
      if (modelModifiers.value.trim) {
        value = value.trim();
      }
      if (modelModifiers.value.number) {
        value = looseToNumber(value);
      }
      emit("update:modelValue", value);
      emitFormInput();
    };
    const onInput = (event) => {
      autoResize();
      if (!modelModifiers.value.lazy) {
        updateInput(event.target.value);
      }
    };
    const onChange = (event) => {
      const value = event.target.value;
      emit("change", value);
      if (modelModifiers.value.lazy) {
        updateInput(value);
      }
      if (modelModifiers.value.trim) {
        event.target.value = value.trim();
      }
    };
    const onBlur = (event) => {
      emit("blur", event);
      emitFormBlur();
    };
    watch$1(() => props.modelValue, () => {
      nextTick(autoResize);
    });
    const textareaClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        !props.resize && "resize-none"
      ), props.textareaClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      textarea: textarea2,
      // eslint-disable-next-line vue/no-dupe-keys
      textareaClass,
      onInput,
      onChange,
      onBlur
    };
  }
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><textarea${ssrRenderAttrs(_temp0 = mergeProps({
    id: _ctx.inputId,
    ref: "textarea",
    value: _ctx.modelValue,
    name: _ctx.name,
    rows: _ctx.rows,
    required: _ctx.required,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    class: _ctx.textareaClass
  }, _ctx.attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1$8 = _sfc_main$1$8.setup;
_sfc_main$1$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Textarea.vue");
  return _sfc_setup$1$8 ? _sfc_setup$1$8(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1$8, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$7;
      const _component_UForm = __nuxt_component_0$4;
      const _component_UFormGroup = __nuxt_component_1$6;
      const _component_UInput = __nuxt_component_2$2;
      const _component_UTextarea = __nuxt_component_4$1;
      const _component_UButton = __nuxt_component_1$7;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "my-5 py-8 flex flex-col items-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 data-v-8c3eb738${_scopeId}>Contact Us</h1><p class="max-w-lg" data-v-8c3eb738${_scopeId}> We&#39;re always happy to hear from you. Please feel free to reach out with any questions, suggestions, or feedback. </p>`);
            _push2(ssrRenderComponent(_component_UForm, {
              action: "mailto:info@kune.com",
              method: "post",
              enctype: "text/plain"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Your Name",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          type: "text",
                          name: "name"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            type: "text",
                            name: "name"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Your Email",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          type: "email",
                          name: "email"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            type: "email",
                            name: "email"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Subject",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          type: "text",
                          name: "subject"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            type: "text",
                            name: "subject"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Message",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, { name: "message" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, { name: "message" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    color: "orange",
                    class: "mt-10"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Send Message `);
                      } else {
                        return [
                          createTextVNode(" Send Message ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UFormGroup, {
                      label: "Your Name",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          type: "text",
                          name: "name"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Your Email",
                      required: "",
                      class: "mt-5"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          type: "email",
                          name: "email"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Subject",
                      required: "",
                      class: "mt-5"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          type: "text",
                          name: "subject"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "Message",
                      required: "",
                      class: "mt-5"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, { name: "message" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      type: "submit",
                      color: "orange",
                      class: "mt-10"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Send Message ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", null, "Contact Us"),
              createVNode("p", { class: "max-w-lg" }, " We're always happy to hear from you. Please feel free to reach out with any questions, suggestions, or feedback. "),
              createVNode(_component_UForm, {
                action: "mailto:info@kune.com",
                method: "post",
                enctype: "text/plain"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UFormGroup, {
                    label: "Your Name",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        type: "text",
                        name: "name"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Your Email",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        type: "email",
                        name: "email"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Subject",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        type: "text",
                        name: "subject"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, {
                    label: "Message",
                    required: "",
                    class: "mt-5"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, { name: "message" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UButton, {
                    type: "submit",
                    color: "orange",
                    class: "mt-10"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Send Message ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-8c3eb738"]]);

const contactC_M0MkQ9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: contact
});

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = null;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref((_i = options.getCachedData(key, nuxtApp)) != null ? _i : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = null;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = null;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key].cancelled = true;
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    if (timeoutLength) {
      setTimeout(() => controller.abort(), timeoutLength);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAssAAAHfCAMAAACReWX5AAAA51BMVEVpXM3TwL6wn8Pl0byHeMmbi8a5qMKHfdH/6rillcXBsMF7bct9b8pqXc365bn+6bjRv75xZMxvYszt2brItsCSg8fSwL6gkMV/ccp7bcrLuL+qmcTZxr13acvn1Lt1aMuGeMn24rmDdcnFs8D04LmUhcejk8Xj0LyzosOhkcXjz7ziz7xxY8yyocOxoMOBcsqunsPArsGuncOPgMjRvr9+b8rv2rqNf8iejsaMfcj757iKe8jLub9rXs3cyb3Jt7+qmsR5bMt5a8upmMT65rmIesl2aMt0Z8uGd8m1pMKXh8f14bmWhsfTbQknAAADrElEQVR42uzc106VURSF0a1IXBaKYG+AXWPvxth7ef/nkXNU5AKM5cjPno7xDF+yd+bFagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMHTpdQ5g9eKDBJN2brYEcbDBJJ2oosw0maWcNpoGWYbOWd28xLaNl0DLptEwKLZNCy6TQMim0TAotk0LLpNAyKbRMCi2TQsuk0DIptEwKLZNCy6TQMim0TAotk0LL9OjtrpHlA1qmbwt366vXr7RM167Xd3M3tEzPDteay1qmZztqzWMt07MfLd/yX6Zr45YXp6en39sx6Nu45Sn7Mv3TMim0TAotk0LLpNAyKbRMCi2TQsuk0DIptEwKLZNCy6TQMim0TAotk0LLpNAyKbRMCi2TQst06NSRPd88fKdlOvZopdace6Nl+jVV65zUMv2aq3Xua5l+1XrHtUy/ap2nS1qmXzXybP/IC5scPauRvfZl+qdlUmiZFFomhZZJoWVSaJkUWiaFlkmhZVJomRRaJoWWSaFlUmiZFFomxe+1PAQto2X+L1W/3vLNGspcg0m2/LmGMtVgki3PHK9hrNxpMLGWxx7sGcKRUw3+uGUPO73RMim0TAotk0LLpNAyKbRMiu3U8szy0ZkG/be8dKXq5NUG3bd8tlZ9aNB9yxdr1Y4G3bc8pWW0DFomh5ZJoWVSaJkUWiaFlkmhZVJomRQ/aXlxemstapl/0fIQtIyWYbOWD9cGtMy2VrVRy5dqKNcaTLLlhfkaxvxCg4m1PHZs1xCONfjLlqF7WiaFlkmhZVJomRRaJoWWSTFMy2eef3Q5joSWL8xVzYuZ/lt+8qlWnW/Qe8sva+R2g95b3lcjOxtoGbRMLi2TQsuk0DIptEwKLX9pl45NAISBAAB+JY9FQFAQBBdwA3H/ucQB7KKBcDfD0QuX6YXL9CIfx/Cr0WU+kC24jMvwqmQrW0BNVzZyrgE1TXPJFvYlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIuAHhdnvCvNaURQAAAABJRU5ErkJggg==";
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "ServicesGridItem",
  __ssrInlineRender: true,
  props: {
    service: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-1e7ffcda><div class="card__image" data-v-1e7ffcda><img class="service-item-image"${ssrRenderAttr("alt", `${_ctx.service.name}-img`)}${ssrRenderAttr("src", _imports_0)} data-v-1e7ffcda></div><div class="card__text" data-v-1e7ffcda><h3 class="card__text-title" data-v-1e7ffcda>${ssrInterpolate(_ctx.service.name)}</h3><p class="card__text-description" data-v-1e7ffcda>${ssrInterpolate(_ctx.service.description)}</p></div><div class="flex" data-v-1e7ffcda>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-whatsapp",
        width: "16px",
        height: "16px"
      }, null, _parent));
      _push(`<span data-v-1e7ffcda> 077-233-222-999 </span></div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesGridItem.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-1e7ffcda"]]);

const _sfc_main$2$4 = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    width: "552",
    height: "344",
    viewBox: "0 0 652 644",
    fill: "none",
    class: "mondrian"
  }, _attrs))}><rect opacity="0.05" x="1" width="163" height="60" rx="10" fill="var(--color--text)"></rect><rect x="424" width="193" height="60" rx="10" fill="var(--color--secondary)"></rect><rect x="424" y="68" width="193" height="175" rx="10" fill="var(--color--secondary)"></rect><rect opacity="0.2" x="424" y="401" width="193" height="79" rx="10" fill="var(--clr--primary)"></rect><rect x="255" y="626" width="362" height="18" rx="9" fill="var(--color--bg)"></rect><rect x="80" y="579" width="166" height="65" rx="10" fill="var(--color--bg)"></rect><rect x="255" y="579" width="160" height="40" rx="10" fill="var(--color--text)"></rect><rect opacity="0.05" x="255" y="490" width="160" height="80" rx="10" fill="var(--color--text)"></rect><rect opacity="0.05" x="255" y="400" width="160" height="80" rx="10" fill="var(--color--text)"></rect><rect x="80" y="68" width="335" height="324" rx="10" fill="var(--clr--primary)"></rect><rect x="80" y="401" width="166" height="169" rx="10" fill="var(--color--text)"></rect><rect x="424" y="490" width="193" height="129" rx="10" fill="var(--color--accent)"></rect><rect x="626" y="490" width="26" height="154" rx="10" fill="var(--clr--primary)"></rect><rect x="424" y="252" width="91" height="140" rx="10" fill="var(--color--bg)"></rect><rect x="524" y="252" width="93" height="140" rx="10" fill="var(--color--bg)"></rect><rect opacity="0.05" x="626" width="26" height="480" rx="10" fill="var(--color--text)"></rect><rect x="173" width="242" height="60" rx="10" fill="var(--color--bg)"></rect><rect x="1" y="68" width="70" height="157" rx="10" fill="var(--color--bg)"></rect><rect opacity="0.05" x="1" y="234" width="70" height="259" rx="10" fill="var(--color--text)"></rect><rect x="1" y="502" width="70" height="142" rx="10" fill="var(--color--secondary)"></rect></svg>`);
}
const _sfc_setup$2$4 = _sfc_main$2$4.setup;
_sfc_main$2$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HomeIllustration.vue");
  return _sfc_setup$2$4 ? _sfc_setup$2$4(props, ctx) : void 0;
};
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$2$4, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$1$7 = /* @__PURE__ */ defineComponent({
  __name: "HomeItemList",
  __ssrInlineRender: true,
  props: {
    services: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_ServicesGridItem = __nuxt_component_1$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-picker" }, _attrs))} data-v-b17aa983><h3 class="subtitle" data-v-b17aa983> Discover the best local businesses and services in your area </h3>`);
      if (_ctx.services) {
        _push(`<div class="category-container" data-v-b17aa983><!--[-->`);
        ssrRenderList(_ctx.services.slice(0, 3), (service) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/services/${service.name}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="rands" data-v-b17aa983${_scopeId}>`);
                _push2(ssrRenderComponent(_component_ServicesGridItem, { service }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "rands" }, [
                    createVNode(_component_ServicesGridItem, { service }, null, 8, ["service"])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div data-v-b17aa983> No services </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1$7 = _sfc_main$1$7.setup;
_sfc_main$1$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HomeItemList.vue");
  return _sfc_setup$1$7 ? _sfc_setup$1$7(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1$7, [["__scopeId", "data-v-b17aa983"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const nuxtApp = useNuxtApp();
    const { data: services } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/services", {
      headers: { Accept: "application/json" },
      getCachedData(key) {
        const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (!cachedData)
          return;
        return cachedData;
      }
    }, "$pqtWcjQkdb")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeIllustration = __nuxt_component_0$3;
      const _component_UButton = __nuxt_component_1$7;
      const _component_HomeItemList = __nuxt_component_2$1;
      _push(`<!--[--><header data-v-98cda535>`);
      _push(ssrRenderComponent(_component_HomeIllustration, null, null, _parent));
      _push(`<div class="home-text" data-v-98cda535><h1 class="subtitle" data-v-98cda535><span class="kune" data-v-98cda535> Kune </span>, Digital discovery<br data-v-98cda535> made easy </h1><p data-v-98cda535> Are you looking for place to easily find businesses that you need in one place? <span class="kune" data-v-98cda535> Kune </span> makes it a pleasant journey. You will find innovation and convience. We provide an overwiew of Zimbabwean digital services </p>`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/signup",
        external: "",
        color: "orange"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="motivation-section" data-v-98cda535><div class="motivation-card" data-v-98cda535><h3 data-v-98cda535>Digital</h3> Our focus is promoting a digital Zimbabwe. More and more people are starting to use internet, and in the vastness of the internet, we provide the opportunity for a rich experience. </div><div class="motivation-card" data-v-98cda535><h3 data-v-98cda535>Discover</h3> At <span class="kune" data-v-98cda535> Kune </span>we showcase a vast number of Zimbabwean websites, what type of services they offer and where they a located. You can easily bookmark the services you find interesting if you want to come back to them </div><div class="motivation-card" data-v-98cda535><h3 data-v-98cda535>Advertise</h3><p data-v-98cda535> Are you a business owner and looking for the place to showcase your business and attract customers. At <span class="kune" data-v-98cda535> Kune </span> you can do exaclty just that. </p></div></main>`);
      if (unref(services)) {
        _push(ssrRenderComponent(_component_HomeItemList, { services: unref(services) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const index$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-98cda535"]]);

const indexCHFf6LP = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

const avatar = {
  wrapper: "relative inline-flex items-center justify-center flex-shrink-0",
  background: "bg-gray-100 dark:bg-gray-800",
  rounded: "rounded-full",
  text: "font-medium leading-none text-gray-900 dark:text-white truncate",
  placeholder: "font-medium leading-none text-gray-500 dark:text-gray-400 truncate",
  size: {
    "3xs": "h-4 w-4 text-[8px]",
    "2xs": "h-5 w-5 text-[10px]",
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-14 w-14 text-xl",
    "2xl": "h-16 w-16 text-2xl",
    "3xl": "h-20 w-20 text-3xl"
  },
  chip: {
    base: "absolute rounded-full ring-1 ring-white dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium",
    background: "bg-{color}-500 dark:bg-{color}-400",
    position: {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    size: {
      "3xs": "h-[4px] min-w-[4px] text-[4px] p-px",
      "2xs": "h-[5px] min-w-[5px] text-[5px] p-px",
      xs: "h-1.5 min-w-[0.375rem] text-[6px] p-px",
      sm: "h-2 min-w-[0.5rem] text-[7px] p-0.5",
      md: "h-2.5 min-w-[0.625rem] text-[8px] p-0.5",
      lg: "h-3 min-w-[0.75rem] text-[10px] p-0.5",
      xl: "h-3.5 min-w-[0.875rem] text-[11px] p-1",
      "2xl": "h-4 min-w-[1rem] text-[12px] p-1",
      "3xl": "h-5 min-w-[1.25rem] text-[14px] p-1"
    }
  },
  icon: {
    base: "text-gray-500 dark:text-gray-400 flex-shrink-0",
    size: {
      "3xs": "h-2 w-2",
      "2xs": "h-2.5 w-2.5",
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
      "2xl": "h-8 w-8",
      "3xl": "h-10 w-10"
    }
  },
  default: {
    size: "sm",
    icon: null,
    chipColor: null,
    chipPosition: "top-right"
  }
};
const divider = {
  wrapper: {
    base: "flex items-center align-center text-center",
    horizontal: "w-full flex-row",
    vertical: "flex-col"
  },
  container: {
    base: "font-medium text-gray-700 dark:text-gray-200 flex",
    horizontal: "mx-3 whitespace-nowrap",
    vertical: "my-2"
  },
  border: {
    base: "flex border-gray-200 dark:border-gray-800",
    horizontal: "w-full",
    vertical: "h-full",
    size: {
      horizontal: {
        "2xs": "border-t",
        xs: "border-t-[2px]",
        sm: "border-t-[3px]",
        md: "border-t-[4px]",
        lg: "border-t-[5px]",
        xl: "border-t-[6px]"
      },
      vertical: {
        "2xs": "border-s",
        xs: "border-s-[2px]",
        sm: "border-s-[3px]",
        md: "border-s-[4px]",
        lg: "border-s-[5px]",
        xl: "border-s-[6px]"
      }
    },
    type: {
      solid: "border-solid",
      dotted: "border-dotted",
      dashed: "border-dashed"
    }
  },
  icon: {
    base: "flex-shrink-0 w-5 h-5"
  },
  avatar: {
    base: "flex-shrink-0",
    size: "2xs"
  },
  label: "text-sm",
  default: {
    size: "2xs"
  }
};
const config$1$2 = mergeConfig(appConfig.ui.strategy, appConfig.ui.avatar, avatar);
const _sfc_main$1$6 = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3
  },
  inheritAttrs: false,
  props: {
    as: {
      type: [String, Object],
      default: "img"
    },
    src: {
      type: [String, Boolean],
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: () => config$1$2.default.icon
    },
    size: {
      type: String,
      default: () => config$1$2.default.size,
      validator(value) {
        return Object.keys(config$1$2.size).includes(value);
      }
    },
    chipColor: {
      type: String,
      default: () => config$1$2.default.chipColor,
      validator(value) {
        return ["gray", ...appConfig.ui.colors].includes(value);
      }
    },
    chipPosition: {
      type: String,
      default: () => config$1$2.default.chipPosition,
      validator(value) {
        return Object.keys(config$1$2.chip.position).includes(value);
      }
    },
    chipText: {
      type: [String, Number],
      default: null
    },
    imgClass: {
      type: String,
      default: ""
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("avatar", toRef(props, "ui"), config$1$2);
    const url = computed(() => {
      if (typeof props.src === "boolean") {
        return null;
      }
      return props.src;
    });
    const placeholder = computed(() => {
      return (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2);
    });
    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper,
        (error.value || !url.value) && ui.value.background,
        ui.value.rounded,
        ui.value.size[props.size]
      ), props.class);
    });
    const imgClass = computed(() => {
      return twMerge(twJoin(
        ui.value.rounded,
        ui.value.size[props.size]
      ), props.imgClass);
    });
    const iconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        ui.value.icon.size[props.size]
      );
    });
    const chipClass = computed(() => {
      return twJoin(
        ui.value.chip.base,
        ui.value.chip.size[props.size],
        ui.value.chip.position[props.chipPosition],
        ui.value.chip.background.replaceAll("{color}", props.chipColor)
      );
    });
    const error = ref(false);
    watch$1(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      wrapperClass,
      // eslint-disable-next-line vue/no-dupe-keys
      imgClass,
      iconClass,
      chipClass,
      url,
      placeholder,
      error,
      onError
    };
  }
});
function _sfc_ssrRender$1$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_2$3;
  _push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _attrs))}>`);
  if (_ctx.url && !_ctx.error) {
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
      class: _ctx.imgClass,
      alt: _ctx.alt,
      src: _ctx.url
    }, _ctx.attrs, { onError: _ctx.onError }), null), _parent);
  } else if (_ctx.text) {
    _push(`<span class="${ssrRenderClass(_ctx.ui.text)}">${ssrInterpolate(_ctx.text)}</span>`);
  } else if (_ctx.icon) {
    _push(ssrRenderComponent(_component_UIcon, {
      name: _ctx.icon,
      class: _ctx.iconClass
    }, null, _parent));
  } else if (_ctx.placeholder) {
    _push(`<span class="${ssrRenderClass(_ctx.ui.placeholder)}">${ssrInterpolate(_ctx.placeholder)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.chipColor) {
    _push(`<span class="${ssrRenderClass(_ctx.chipClass)}">${ssrInterpolate(_ctx.chipText)}</span>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$1$6 = _sfc_main$1$6.setup;
_sfc_main$1$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Avatar.vue");
  return _sfc_setup$1$6 ? _sfc_setup$1$6(props, ctx) : void 0;
};
const __nuxt_component_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$1$6, [["ssrRender", _sfc_ssrRender$1$2]]);
const config$4 = mergeConfig(appConfig.ui.strategy, appConfig.ui.divider, divider);
const _sfc_main$d = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3,
    UAvatar: __nuxt_component_1$4
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    avatar: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: () => config$4.default.size,
      validator(value) {
        return Object.keys(config$4.border.size.horizontal).includes(value) || Object.keys(config$4.border.size.vertical).includes(value);
      }
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    type: {
      type: String,
      default: "solid",
      validator: (value) => ["solid", "dotted", "dashed"].includes(value)
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("divider", toRef(props, "ui"), config$4);
    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper.base,
        ui.value.wrapper[props.orientation]
      ), props.class);
    });
    const containerClass = computed(() => {
      return twJoin(
        ui.value.container.base,
        ui.value.container[props.orientation]
      );
    });
    const borderClass = computed(() => {
      return twJoin(
        ui.value.border.base,
        ui.value.border[props.orientation],
        ui.value.border.size[props.orientation][props.size],
        ui.value.border.type[props.type]
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      wrapperClass,
      containerClass,
      borderClass
    };
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_2$3;
  const _component_UAvatar = __nuxt_component_1$4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.borderClass)}"></div>`);
  if (_ctx.label || _ctx.icon || _ctx.avatar || _ctx.$slots.default) {
    _push(`<!--[--><div class="${ssrRenderClass(_ctx.containerClass)}">`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      if (_ctx.label) {
        _push(`<span class="${ssrRenderClass(_ctx.ui.label)}">${ssrInterpolate(_ctx.label)}</span>`);
      } else if (_ctx.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.icon,
          class: _ctx.ui.icon.base
        }, null, _parent));
      } else if (_ctx.avatar) {
        _push(ssrRenderComponent(_component_UAvatar, mergeProps({ size: _ctx.ui.avatar.size, ..._ctx.avatar }, {
          class: _ctx.ui.avatar.base
        }), null, _parent));
      } else {
        _push(`<!---->`);
      }
    }, _push, _parent);
    _push(`</div><div class="${ssrRenderClass(_ctx.borderClass)}"></div><!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Divider.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$6]]);

const table = {
  wrapper: "relative overflow-x-auto",
  base: "min-w-full table-fixed",
  divide: "divide-y divide-gray-300 dark:divide-gray-700",
  thead: "relative",
  tbody: "divide-y divide-gray-200 dark:divide-gray-800",
  caption: "sr-only",
  tr: {
    base: "",
    selected: "bg-gray-50 dark:bg-gray-800/50",
    active: "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
  },
  th: {
    base: "text-left rtl:text-right",
    padding: "px-4 py-3.5",
    color: "text-gray-900 dark:text-white",
    font: "font-semibold",
    size: "text-sm"
  },
  td: {
    base: "whitespace-nowrap",
    padding: "px-4 py-4",
    color: "text-gray-500 dark:text-gray-400",
    font: "",
    size: "text-sm"
  },
  checkbox: {
    padding: "ps-4"
  },
  loadingState: {
    wrapper: "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
    label: "text-sm text-center text-gray-900 dark:text-white",
    icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin"
  },
  emptyState: {
    wrapper: "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
    label: "text-sm text-center text-gray-900 dark:text-white",
    icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"
  },
  progress: {
    wrapper: "absolute inset-x-0 -bottom-[0.5px] p-0"
  },
  default: {
    sortAscIcon: "i-heroicons-bars-arrow-up-20-solid",
    sortDescIcon: "i-heroicons-bars-arrow-down-20-solid",
    sortButton: {
      icon: "i-heroicons-arrows-up-down-20-solid",
      trailing: true,
      square: true,
      color: "gray",
      variant: "ghost",
      class: "-m-1.5"
    },
    checkbox: {
      color: "primary"
    },
    progress: {
      color: "primary",
      animation: "carousel"
    },
    loadingState: {
      icon: "i-heroicons-arrow-path-20-solid",
      label: "Loading..."
    },
    emptyState: {
      icon: "i-heroicons-circle-stack-20-solid",
      label: "No items."
    }
  }
};
const progress = {
  wrapper: "w-full flex flex-col gap-2",
  indicator: {
    container: {
      base: "flex flex-row justify-end",
      width: "min-w-fit",
      transition: "transition-all"
    },
    align: "text-end",
    width: "w-fit",
    color: "text-gray-400 dark:text-gray-500",
    size: {
      "2xs": "text-xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
      "2xl": "text-base"
    }
  },
  progress: {
    base: "block appearance-none border-none overflow-hidden",
    width: "w-full [&::-webkit-progress-bar]:w-full",
    size: {
      "2xs": "h-px",
      xs: "h-0.5",
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
      xl: "h-4",
      "2xl": "h-5"
    },
    rounded: "rounded-full [&::-webkit-progress-bar]:rounded-full",
    track: "[&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:dark:bg-gray-700 [@supports(selector(&::-moz-progress-bar))]:bg-gray-200 [@supports(selector(&::-moz-progress-bar))]:dark:bg-gray-700",
    bar: "[&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:ease-in-out [&::-moz-progress-bar]:rounded-full",
    color: "text-{color}-500 dark:text-{color}-400",
    background: "[&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current",
    indeterminate: {
      base: "indeterminate:relative",
      rounded: "indeterminate:after:rounded-full [&:indeterminate::-webkit-progress-value]:rounded-full [&:indeterminate::-moz-progress-bar]:rounded-full"
    }
  },
  steps: {
    base: "grid grid-cols-1",
    color: "text-{color}-500 dark:text-{color}-400",
    size: {
      "2xs": "text-xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
      "2xl": "text-base"
    }
  },
  step: {
    base: "transition-all opacity-0 truncate row-start-1 col-start-1",
    align: "text-end",
    active: "opacity-100",
    first: "text-gray-500 dark:text-gray-400"
  },
  animation: {
    carousel: "bar-animation-carousel",
    "carousel-inverse": "bar-animation-carousel-inverse",
    swing: "bar-animation-swing",
    elastic: "bar-animation-elastic"
  },
  default: {
    color: "primary",
    size: "md",
    animation: "carousel"
  }
};
const checkbox = {
  wrapper: "relative flex items-start",
  container: "flex items-center h-5",
  base: "h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
  form: "form-checkbox",
  rounded: "rounded",
  color: "text-{color}-500 dark:text-{color}-400",
  background: "bg-white dark:bg-gray-900",
  border: "border border-gray-300 dark:border-gray-700",
  ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  inner: "ms-3 flex flex-col",
  label: "text-sm font-medium text-gray-700 dark:text-gray-200",
  required: "text-sm text-red-500 dark:text-red-400",
  help: "text-sm text-gray-500 dark:text-gray-400",
  default: {
    color: "primary"
  }
};
const config$2$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.checkbox, checkbox);
const _sfc_main$2$3 = defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: () => null
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    },
    modelValue: {
      type: [Boolean, Array],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: void 0
    },
    help: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => config$2$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    inputClass: {
      type: String,
      default: ""
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    var _a;
    const { ui, attrs } = useUI("checkbox", toRef(props, "ui"), config$2$1, toRef(props, "class"));
    const { emitFormChange, color, name, inputId: _inputId } = useFormGroup(props);
    const inputId = (_a = _inputId.value) != null ? _a : useId("$YWrWuPJ69t");
    const toggle = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const onChange = (event) => {
      emit("change", event.target.checked);
      emitFormChange();
    };
    const inputClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.background,
        ui.value.border,
        color.value && ui.value.ring.replaceAll("{color}", color.value),
        color.value && ui.value.color.replaceAll("{color}", color.value)
      ), props.inputClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      toggle,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      // eslint-disable-next-line vue/no-dupe-keys
      inputClass,
      onChange
    };
  }
});
function _sfc_ssrRender$2$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper,
    "data-n-ids": _ctx.attrs["data-n-ids"]
  }, _attrs))}><div class="${ssrRenderClass(_ctx.ui.container)}"><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: _ctx.inputId,
    checked: Array.isArray(_ctx.toggle) ? ssrLooseContain(_ctx.toggle, _ctx.value) : _ctx.toggle,
    name: _ctx.name,
    required: _ctx.required,
    value: _ctx.value,
    disabled: _ctx.disabled,
    indeterminate: _ctx.indeterminate,
    type: "checkbox",
    class: _ctx.inputClass
  }, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.toggle))))}></div>`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass(_ctx.ui.inner)}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass(_ctx.ui.label)}">`);
    ssrRenderSlot(_ctx.$slots, "label", {}, () => {
      _push(`${ssrInterpolate(_ctx.label)}`);
    }, _push, _parent);
    if (_ctx.required) {
      _push(`<span class="${ssrRenderClass(_ctx.ui.required)}">*</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</label>`);
    if (_ctx.help) {
      _push(`<p class="${ssrRenderClass(_ctx.ui.help)}">${ssrInterpolate(_ctx.help)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2$3 = _sfc_main$2$3.setup;
_sfc_main$2$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Checkbox.vue");
  return _sfc_setup$2$3 ? _sfc_setup$2$3(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$2$3, [["ssrRender", _sfc_ssrRender$2$1]]);
const config$1$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.progress, progress);
const _sfc_main$1$5 = defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: null
    },
    max: {
      type: [Number, Array],
      default: 100
    },
    indicator: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: () => config$1$1.default.animation,
      validator(value) {
        return Object.keys(config$1$1.animation).includes(value);
      }
    },
    size: {
      type: String,
      default: () => config$1$1.default.size,
      validator(value) {
        return Object.keys(config$1$1.progress.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$1$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("progress", toRef(props, "ui"), config$1$1, toRef(props, "class"));
    const indicatorContainerClass = computed(() => {
      return twJoin(
        ui.value.indicator.container.base,
        ui.value.indicator.container.width,
        ui.value.indicator.container.transition
      );
    });
    const indicatorClass = computed(() => {
      return twJoin(
        ui.value.indicator.align,
        ui.value.indicator.width,
        ui.value.indicator.color,
        ui.value.indicator.size[props.size]
      );
    });
    const progressClass = computed(() => {
      var _a;
      const classes = [
        ui.value.progress.base,
        ui.value.progress.width,
        ui.value.progress.size[props.size],
        ui.value.progress.rounded,
        ui.value.progress.track,
        ui.value.progress.bar,
        // Intermediate class to allow thumb ring or background color (set to `current`) as it's impossible to safelist with arbitrary values
        (_a = ui.value.progress.color) == null ? void 0 : _a.replaceAll("{color}", props.color),
        ui.value.progress.background,
        ui.value.progress.indeterminate.base,
        ui.value.progress.indeterminate.rounded
      ];
      if (isIndeterminate.value) {
        classes.push(ui.value.animation[props.animation]);
      }
      return twJoin(...classes);
    });
    const stepsClass = computed(() => {
      var _a;
      return twJoin(
        ui.value.steps.base,
        (_a = ui.value.steps.color) == null ? void 0 : _a.replaceAll("{color}", props.color),
        ui.value.steps.size[props.size]
      );
    });
    const stepClass = computed(() => {
      return twJoin(
        ui.value.step.base,
        ui.value.step.align
      );
    });
    const stepActiveClass = computed(() => {
      return twJoin(
        ui.value.step.active
      );
    });
    const stepFirstClass = computed(() => {
      return twJoin(
        ui.value.step.first
      );
    });
    function isActive(index) {
      return index === Number(props.value);
    }
    function isFirst(index) {
      return index === 0;
    }
    function stepClasses(index) {
      index = Number(index);
      const classes = [stepClass.value];
      if (isFirst(index)) {
        classes.push(stepFirstClass.value);
      }
      if (isActive(index)) {
        classes.push(stepActiveClass.value);
      }
      return classes.join(" ");
    }
    const isIndeterminate = computed(() => props.value === void 0 || props.value === null);
    const isSteps = computed(() => Array.isArray(props.max));
    const realMax = computed(() => {
      if (isIndeterminate.value) {
        return null;
      }
      if (Array.isArray(props.max)) {
        return props.max.length - 1;
      }
      return Number(props.max);
    });
    const percent = computed(() => {
      if (isIndeterminate.value) {
        return void 0;
      }
      switch (true) {
        case props.value < 0:
          return 0;
        case props.value > realMax.value:
          return 100;
        default:
          return props.value / realMax.value * 100;
      }
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      indicatorContainerClass,
      indicatorClass,
      progressClass,
      stepsClass,
      stepClasses,
      isIndeterminate,
      isSteps,
      realMax,
      percent
    };
  }
});
function _sfc_ssrRender$1$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))} data-v-1e545a26>`);
  if (_ctx.indicator || _ctx.$slots.indicator) {
    ssrRenderSlot(_ctx.$slots, "indicator", { percent: _ctx.percent }, () => {
      if (!_ctx.isSteps) {
        _push(`<div class="${ssrRenderClass(_ctx.indicatorContainerClass)}" style="${ssrRenderStyle({ width: `${_ctx.percent}%` })}" data-v-1e545a26><div class="${ssrRenderClass(_ctx.indicatorClass)}" data-v-1e545a26>${ssrInterpolate(Math.round(_ctx.percent))}% </div></div>`);
      } else {
        _push(`<!---->`);
      }
    }, _push, _parent);
  } else {
    _push(`<!---->`);
  }
  _push(`<progress${ssrRenderAttrs(mergeProps({ class: _ctx.progressClass }, { value: _ctx.value, max: _ctx.realMax }))} data-v-1e545a26>${ssrInterpolate(_ctx.percent !== void 0 ? `${Math.round(_ctx.percent)}%` : void 0)}</progress>`);
  if (_ctx.isSteps) {
    _push(`<div class="${ssrRenderClass(_ctx.stepsClass)}" data-v-1e545a26><!--[-->`);
    ssrRenderList(_ctx.max, (step, index) => {
      _push(`<div class="${ssrRenderClass(_ctx.stepClasses(index))}" data-v-1e545a26>`);
      ssrRenderSlot(_ctx.$slots, `step-${index}`, mergeProps({ ref_for: true }, { step }), () => {
        _push(`${ssrInterpolate(step)}`);
      }, _push, _parent);
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1$5 = _sfc_main$1$5.setup;
_sfc_main$1$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Progress.vue");
  return _sfc_setup$1$5 ? _sfc_setup$1$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1$5, [["ssrRender", _sfc_ssrRender$1$1], ["__scopeId", "data-v-1e545a26"]]);
const config$3 = mergeConfig(appConfig.ui.strategy, appConfig.ui.table, table);
function defaultComparator(a, z) {
  return a === z;
}
function defaultSort(a, b, direction) {
  if (a === b) {
    return 0;
  }
  if (direction === "asc") {
    return a < b ? -1 : 1;
  } else {
    return a > b ? -1 : 1;
  }
}
const _sfc_main$c = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3,
    UButton: __nuxt_component_1$7,
    UProgress: __nuxt_component_2,
    UCheckbox: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: null
    },
    by: {
      type: [String, Function],
      default: () => defaultComparator
    },
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: null
    },
    columnAttribute: {
      type: String,
      default: "label"
    },
    sort: {
      type: Object,
      default: () => ({})
    },
    sortMode: {
      type: String,
      default: "auto"
    },
    sortButton: {
      type: Object,
      default: () => config$3.default.sortButton
    },
    sortAscIcon: {
      type: String,
      default: () => config$3.default.sortAscIcon
    },
    sortDescIcon: {
      type: String,
      default: () => config$3.default.sortDescIcon
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingState: {
      type: Object,
      default: () => config$3.default.loadingState
    },
    emptyState: {
      type: Object,
      default: () => config$3.default.emptyState
    },
    caption: {
      type: String,
      default: null
    },
    progress: {
      type: Object,
      default: () => config$3.default.progress
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "update:sort"],
  setup(props, { emit, attrs: $attrs }) {
    const { ui, attrs } = useUI("table", toRef(props, "ui"), config$3, toRef(props, "class"));
    const columns = computed(() => {
      var _a, _b;
      return (_b = props.columns) != null ? _b : Object.keys((_a = props.rows[0]) != null ? _a : {}).map((key) => ({ key, label: upperFirst(key), sortable: false, class: void 0, sort: defaultSort }));
    });
    const sort = useVModel(props, "sort", emit, { passive: true, defaultValue: defu({}, props.sort, { column: null, direction: "asc" }) });
    const savedSort = { column: sort.value.column, direction: null };
    const rows = computed(() => {
      var _a;
      if (!((_a = sort.value) == null ? void 0 : _a.column) || props.sortMode === "manual") {
        return props.rows;
      }
      const { column, direction } = sort.value;
      return props.rows.slice().sort((a, b) => {
        var _a3;
        var _a2;
        const aValue = get(a, column);
        const bValue = get(b, column);
        const sort2 = (_a3 = (_a2 = columns.value.find((col) => col.key === column)) == null ? void 0 : _a2.sort) != null ? _a3 : defaultSort;
        return sort2(aValue, bValue, direction);
      });
    });
    const selected = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const indeterminate = computed(() => selected.value && selected.value.length > 0 && selected.value.length < props.rows.length);
    const emptyState = computed(() => {
      if (props.emptyState === null)
        return null;
      return { ...ui.value.default.emptyState, ...props.emptyState };
    });
    const loadingState = computed(() => {
      if (props.loadingState === null)
        return null;
      return { ...ui.value.default.loadingState, ...props.loadingState };
    });
    function compare(a, z) {
      if (typeof props.by === "string") {
        const property = props.by;
        return (a == null ? void 0 : a[property]) === (z == null ? void 0 : z[property]);
      }
      return props.by(a, z);
    }
    function isSelected(row) {
      if (!props.modelValue) {
        return false;
      }
      return selected.value.some((item) => compare(toRaw(item), toRaw(row)));
    }
    function onSort(column) {
      if (sort.value.column === column.key) {
        const direction = !column.direction || column.direction === "asc" ? "desc" : "asc";
        if (sort.value.direction === direction) {
          sort.value = defu({}, savedSort, { column: null, direction: "asc" });
        } else {
          sort.value = { column: sort.value.column, direction: sort.value.direction === "asc" ? "desc" : "asc" };
        }
      } else {
        sort.value = { column: column.key, direction: column.direction || "asc" };
      }
    }
    function onSelect(row) {
      if (!$attrs.onSelect) {
        return;
      }
      $attrs.onSelect(row);
    }
    function selectAllRows() {
      props.rows.forEach((row) => {
        if (isSelected(row)) {
          return;
        }
        selected.value.push(row);
      });
    }
    function onChange(checked) {
      if (checked) {
        selectAllRows();
      } else {
        selected.value = [];
      }
    }
    function getRowData(row, rowKey, defaultValue = "") {
      return get(row, rowKey, defaultValue);
    }
    function getAriaSort(column) {
      if (!column.sortable) {
        return void 0;
      }
      if (sort.value.column !== column.key) {
        return "none";
      }
      if (sort.value.direction === "asc") {
        return "ascending";
      }
      if (sort.value.direction === "desc") {
        return "descending";
      }
      return void 0;
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      sort,
      // eslint-disable-next-line vue/no-dupe-keys
      columns,
      // eslint-disable-next-line vue/no-dupe-keys
      rows,
      selected,
      indeterminate,
      // eslint-disable-next-line vue/no-dupe-keys
      emptyState,
      // eslint-disable-next-line vue/no-dupe-keys
      loadingState,
      isSelected,
      onSort,
      onSelect,
      onChange,
      getRowData,
      getAriaSort
    };
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UCheckbox = __nuxt_component_0$2;
  const _component_UButton = __nuxt_component_1$7;
  const _component_UProgress = __nuxt_component_2;
  const _component_UIcon = __nuxt_component_2$3;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><table class="${ssrRenderClass([_ctx.ui.base, _ctx.ui.divide])}">`);
  if (_ctx.$slots.caption || _ctx.caption) {
    ssrRenderSlot(_ctx.$slots, "caption", {}, () => {
      _push(`<caption class="${ssrRenderClass(_ctx.ui.caption)}">${ssrInterpolate(_ctx.caption)}</caption>`);
    }, _push, _parent);
  } else {
    _push(`<!---->`);
  }
  _push(`<thead class="${ssrRenderClass(_ctx.ui.thead)}"><tr class="${ssrRenderClass(_ctx.ui.tr.base)}">`);
  if (_ctx.modelValue) {
    _push(`<th scope="col" class="${ssrRenderClass(_ctx.ui.checkbox.padding)}">`);
    _push(ssrRenderComponent(_component_UCheckbox, mergeProps({
      "model-value": _ctx.indeterminate || _ctx.selected.length === _ctx.rows.length,
      indeterminate: _ctx.indeterminate
    }, _ctx.ui.default.checkbox, {
      "aria-label": "Select all",
      onChange: _ctx.onChange
    }), null, _parent));
    _push(`</th>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList(_ctx.columns, (column, index) => {
    _push(`<th scope="col" class="${ssrRenderClass([_ctx.ui.th.base, _ctx.ui.th.padding, _ctx.ui.th.color, _ctx.ui.th.font, _ctx.ui.th.size, column.class])}"${ssrRenderAttr("aria-sort", _ctx.getAriaSort(column))}>`);
    ssrRenderSlot(_ctx.$slots, `${column.key}-header`, {
      column,
      sort: _ctx.sort,
      onSort: _ctx.onSort
    }, () => {
      if (column.sortable) {
        _push(ssrRenderComponent(_component_UButton, mergeProps({ ref_for: true }, { ..._ctx.ui.default.sortButton || {}, ..._ctx.sortButton }, {
          icon: !_ctx.sort.column || _ctx.sort.column !== column.key ? _ctx.sortButton.icon || _ctx.ui.default.sortButton.icon : _ctx.sort.direction === "asc" ? _ctx.sortAscIcon : _ctx.sortDescIcon,
          label: column[_ctx.columnAttribute],
          onClick: ($event) => _ctx.onSort(column)
        }), null, _parent));
      } else {
        _push(`<span>${ssrInterpolate(column[_ctx.columnAttribute])}</span>`);
      }
    }, _push, _parent);
    _push(`</th>`);
  });
  _push(`<!--]--></tr>`);
  if (_ctx.loading && _ctx.progress) {
    _push(`<tr><td${ssrRenderAttr("colspan", 0)} class="${ssrRenderClass(_ctx.ui.progress.wrapper)}">`);
    _push(ssrRenderComponent(_component_UProgress, mergeProps({ ..._ctx.ui.default.progress || {}, ..._ctx.progress }, { size: "2xs" }), null, _parent));
    _push(`</td></tr>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</thead><tbody class="${ssrRenderClass(_ctx.ui.tbody)}">`);
  if (_ctx.loadingState && _ctx.loading && !_ctx.rows.length) {
    _push(`<tr><td${ssrRenderAttr("colspan", _ctx.columns.length + (_ctx.modelValue ? 1 : 0))}>`);
    ssrRenderSlot(_ctx.$slots, "loading-state", {}, () => {
      _push(`<div class="${ssrRenderClass(_ctx.ui.loadingState.wrapper)}">`);
      if (_ctx.loadingState.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.loadingState.icon,
          class: _ctx.ui.loadingState.icon,
          "aria-hidden": "true"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass(_ctx.ui.loadingState.label)}">${ssrInterpolate(_ctx.loadingState.label)}</p></div>`);
    }, _push, _parent);
    _push(`</td></tr>`);
  } else if (_ctx.emptyState && !_ctx.rows.length) {
    _push(`<tr><td${ssrRenderAttr("colspan", _ctx.columns.length + (_ctx.modelValue ? 1 : 0))}>`);
    ssrRenderSlot(_ctx.$slots, "empty-state", {}, () => {
      _push(`<div class="${ssrRenderClass(_ctx.ui.emptyState.wrapper)}">`);
      if (_ctx.emptyState.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.emptyState.icon,
          class: _ctx.ui.emptyState.icon,
          "aria-hidden": "true"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass(_ctx.ui.emptyState.label)}">${ssrInterpolate(_ctx.emptyState.label)}</p></div>`);
    }, _push, _parent);
    _push(`</td></tr>`);
  } else {
    _push(`<!--[-->`);
    ssrRenderList(_ctx.rows, (row, index) => {
      _push(`<tr class="${ssrRenderClass([_ctx.ui.tr.base, _ctx.isSelected(row) && _ctx.ui.tr.selected, _ctx.$attrs.onSelect && _ctx.ui.tr.active, row == null ? void 0 : row.class])}">`);
      if (_ctx.modelValue) {
        _push(`<td class="${ssrRenderClass(_ctx.ui.checkbox.padding)}">`);
        _push(ssrRenderComponent(_component_UCheckbox, mergeProps({
          modelValue: _ctx.selected,
          "onUpdate:modelValue": ($event) => _ctx.selected = $event,
          value: row,
          ref_for: true
        }, _ctx.ui.default.checkbox, {
          "aria-label": "Select row",
          onClick: () => {
          }
        }), null, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(_ctx.columns, (column, subIndex) => {
        var _a;
        _push(`<td class="${ssrRenderClass([_ctx.ui.td.base, _ctx.ui.td.padding, _ctx.ui.td.color, _ctx.ui.td.font, _ctx.ui.td.size, (_a = row[column.key]) == null ? void 0 : _a.class])}">`);
        ssrRenderSlot(_ctx.$slots, `${column.key}-data`, {
          column,
          row,
          index,
          getRowData: (defaultValue) => _ctx.getRowData(row, column.key, defaultValue)
        }, () => {
          _push(`${ssrInterpolate(_ctx.getRowData(row, column.key))}`);
        }, _push, _parent);
        _push(`</td>`);
      });
      _push(`<!--]--></tr>`);
    });
    _push(`<!--]-->`);
  }
  _push(`</tbody></table></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/data/Table.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$5]]);

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d;
    const { session } = useAuth();
    const columns = [
      {
        key: "service",
        label: "Service"
      },
      {
        key: "actions"
      }
    ];
    const profile = reactive({
      name: ((_b = (_a = session == null ? void 0 : session.value) == null ? void 0 : _a.user) == null ? void 0 : _b.name) || "",
      email: ((_d = (_c = session == null ? void 0 : session.value) == null ? void 0 : _c.user) == null ? void 0 : _d.email) || ""
    });
    const services = [
      {
        service: "service 1"
      },
      {
        service: "service 2"
      },
      {
        service: "service 3"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = __nuxt_component_0$4;
      const _component_UFormGroup = __nuxt_component_1$6;
      const _component_UInput = __nuxt_component_2$2;
      const _component_UDivider = __nuxt_component_4;
      const _component_UButton = __nuxt_component_1$7;
      const _component_UTable = __nuxt_component_1$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-4 grid grid-cols-3 gap-16" }, _attrs))} data-v-d36c7513><h3 data-v-d36c7513>Profile</h3>`);
      _push(ssrRenderComponent(_component_UForm, { class: "card p-4 col-span-3 row-gap-4 rounded-md" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Your Name",
              description: "We'll only use this for spam.",
              help: "We will never share your email with anyone else.",
              required: "",
              class: "grid grid-cols-2 gap-2 items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(profile).name,
                    "onUpdate:modelValue": ($event) => unref(profile).name = $event,
                    type: "text",
                    name: "name"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(profile).name,
                      "onUpdate:modelValue": ($event) => unref(profile).name = $event,
                      type: "text",
                      name: "name"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UDivider, { class: "py-4" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "Your Email",
              description: "We'll only use this for spam.",
              help: "We will never share your email with anyone else.",
              required: "",
              class: "grid grid-cols-2 gap-2 items-centern"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(profile).email,
                    "onUpdate:modelValue": ($event) => unref(profile).email = $event,
                    type: "email",
                    name: "email"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(profile).email,
                      "onUpdate:modelValue": ($event) => unref(profile).email = $event,
                      type: "email",
                      name: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UDivider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              color: "orange",
              class: "mt-10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormGroup, {
                label: "Your Name",
                description: "We'll only use this for spam.",
                help: "We will never share your email with anyone else.",
                required: "",
                class: "grid grid-cols-2 gap-2 items-center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(profile).name,
                    "onUpdate:modelValue": ($event) => unref(profile).name = $event,
                    type: "text",
                    name: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UDivider, { class: "py-4" }),
              createVNode(_component_UFormGroup, {
                label: "Your Email",
                description: "We'll only use this for spam.",
                help: "We will never share your email with anyone else.",
                required: "",
                class: "grid grid-cols-2 gap-2 items-centern"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(profile).email,
                    "onUpdate:modelValue": ($event) => unref(profile).email = $event,
                    type: "email",
                    name: "email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UDivider),
              createVNode(_component_UButton, {
                type: "submit",
                color: "orange",
                class: "mt-10"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="col-span-3 p-4 rounded-md flex flex-col gap-4 min-w-[300px]" data-v-d36c7513><h3 data-v-d36c7513>Favorites</h3>`);
      if (services.length === 0) {
        _push(`<!--[--><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_UTable, {
          columns,
          rows: services,
          ui: { tbody: "divide-green-500" },
          class: "card rounded-md min-w-max"
        }, {
          "actions-data": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "gray",
                variant: "ghost",
                icon: "i-heroicons-trash-20-solid"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  color: "gray",
                  variant: "ghost",
                  icon: "i-heroicons-trash-20-solid"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const index$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-d36c7513"]]);

const indexDhrZ5ciy = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$1
});

const badge = {
  base: "inline-flex items-center",
  rounded: "rounded-md",
  font: "font-medium",
  size: {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2 py-1",
    lg: "text-sm px-2.5 py-1.5"
  },
  color: {
    white: {
      solid: "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900"
    },
    gray: {
      solid: "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
    },
    black: {
      solid: "text-white dark:text-gray-900 bg-gray-900 dark:bg-white"
    }
  },
  variant: {
    solid: "bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900",
    outline: "text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400",
    soft: "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400",
    subtle: "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25"
  },
  default: {
    size: "sm",
    variant: "solid",
    color: "primary"
  }
};
const config$2 = mergeConfig(appConfig.ui.strategy, appConfig.ui.badge, badge);
const _sfc_main$a = defineComponent({
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: () => config$2.default.size,
      validator(value) {
        return Object.keys(config$2.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config$2.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config$2.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config$2.default.variant,
      validator(value) {
        return [
          ...Object.keys(config$2.variant),
          ...Object.values(config$2.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    label: {
      type: [String, Number],
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("badge", toRef(props, "ui"), config$2);
    const { size, rounded } = useInjectButtonGroup({ ui, props });
    const badgeClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[props.color]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.font,
        rounded.value,
        ui.value.size[size.value],
        variant == null ? void 0 : variant.replaceAll("{color}", props.color)
      ), props.class);
    });
    return {
      attrs,
      badgeClass
    };
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.badgeClass }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`${ssrInterpolate(_ctx.label)}`);
  }, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Badge.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$4]]);

const modal = {
  wrapper: "relative z-50",
  inner: "fixed inset-0 overflow-y-auto",
  container: "flex min-h-full items-end sm:items-center justify-center text-center",
  padding: "p-4 sm:p-0",
  margin: "sm:my-8",
  base: "relative text-left rtl:text-right flex flex-col",
  overlay: {
    base: "fixed inset-0 transition-opacity",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    // Syntax for `<TransitionRoot>` component https://headlessui.com/vue/transition#basic-example
    transition: {
      enter: "ease-out duration-300",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in duration-200",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0"
    }
  },
  background: "bg-white dark:bg-gray-900",
  ring: "",
  rounded: "rounded-lg",
  shadow: "shadow-xl",
  width: "w-full sm:max-w-lg",
  height: "",
  fullscreen: "w-screen h-screen",
  // Syntax for `<TransitionRoot>` component https://headlessui.com/vue/transition#basic-example
  transition: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
    enterTo: "opacity-100 translate-y-0 sm:scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
    leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  }
};
function t$5(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
function o$2() {
  let a2 = [], s3 = { addEventListener(e2, t2, r, i2) {
    return e2.addEventListener(t2, r, i2), s3.add(() => e2.removeEventListener(t2, r, i2));
  }, requestAnimationFrame(...e2) {
    let t2 = requestAnimationFrame(...e2);
    s3.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e2) {
    s3.requestAnimationFrame(() => {
      s3.requestAnimationFrame(...e2);
    });
  }, setTimeout(...e2) {
    let t2 = setTimeout(...e2);
    s3.add(() => clearTimeout(t2));
  }, microTask(...e2) {
    let t2 = { current: true };
    return t$5(() => {
      t2.current && e2[0]();
    }), s3.add(() => {
      t2.current = false;
    });
  }, style(e2, t2, r) {
    let i2 = e2.style.getPropertyValue(t2);
    return Object.assign(e2.style, { [t2]: r }), this.add(() => {
      Object.assign(e2.style, { [t2]: i2 });
    });
  }, group(e2) {
    let t2 = o$2();
    return e2(t2), this.add(() => t2.dispose());
  }, add(e2) {
    return a2.push(e2), () => {
      let t2 = a2.indexOf(e2);
      if (t2 >= 0)
        for (let r of a2.splice(t2, 1))
          r();
    };
  }, dispose() {
    for (let e2 of a2.splice(0))
      e2();
  } };
  return s3;
}
let t$4 = Symbol("headlessui.useid"), i$5 = 0;
function I$1() {
  return inject(t$4, () => `${++i$5}`)();
}
function l$3(e2) {
  provide(t$4, e2);
}
function o$1(e2) {
  var l2;
  if (e2 == null || e2.value == null)
    return null;
  let n2 = (l2 = e2.value.$el) != null ? l2 : e2.value;
  return n2 instanceof Node ? n2 : null;
}
function u$5(r, n2, ...a2) {
  if (r in n2) {
    let e2 = n2[r];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t2 = new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u$5), t2;
}
var i$4 = Object.defineProperty;
var d$4 = (t2, e2, r) => e2 in t2 ? i$4(t2, e2, { enumerable: true, configurable: true, writable: true, value: r }) : t2[e2] = r;
var n$3 = (t2, e2, r) => (d$4(t2, typeof e2 != "symbol" ? e2 + "" : e2, r), r);
let s$3 = class s {
  constructor() {
    n$3(this, "current", this.detect());
    n$3(this, "currentId", 0);
  }
  set(e2) {
    this.current !== e2 && (this.currentId = 0, this.current = e2);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return "server";
  }
};
let c$2 = new s$3();
function i$3(r) {
  if (c$2.isServer)
    return null;
  if (r instanceof Node)
    return r.ownerDocument;
  if (r != null && r.hasOwnProperty("value")) {
    let n2 = o$1(r);
    if (n2)
      return n2.ownerDocument;
  }
  return void 0;
}
let c$1 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var N$4 = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(N$4 || {}), T$2 = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T$2 || {}), F$1 = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(F$1 || {});
function E$2(e2 = (void 0).body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(c$1)).sort((r, t2) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(h || {});
function w$4(e2, r = 0) {
  var t2;
  return e2 === ((t2 = i$3(e2)) == null ? void 0 : t2.body) ? false : u$5(r, { [0]() {
    return e2.matches(c$1);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(c$1))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
var y$2 = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(y$2 || {});
function S$1(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let H$2 = ["textarea", "input"].join(",");
function I(e2) {
  var r, t2;
  return (t2 = (r = e2 == null ? void 0 : e2.matches) == null ? void 0 : r.call(e2, H$2)) != null ? t2 : false;
}
function O(e2, r = (t2) => t2) {
  return e2.slice().sort((t2, l2) => {
    let o2 = r(t2), i2 = r(l2);
    if (o2 === null || i2 === null)
      return 0;
    let n2 = o2.compareDocumentPosition(i2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function P(e2, r, { sorted: t2 = true, relativeTo: l2 = null, skipElements: o2 = [] } = {}) {
  var m2;
  let i2 = (m2 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : void 0 : e2 == null ? void 0 : e2.ownerDocument) != null ? m2 : void 0, n2 = Array.isArray(e2) ? t2 ? O(e2) : e2 : E$2(e2);
  o2.length > 0 && n2.length > 1 && (n2 = n2.filter((s3) => !o2.includes(s3))), l2 = l2 != null ? l2 : i2.activeElement;
  let x2 = (() => {
    if (r & 5)
      return 1;
    if (r & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = (() => {
    if (r & 1)
      return 0;
    if (r & 2)
      return Math.max(0, n2.indexOf(l2)) - 1;
    if (r & 4)
      return Math.max(0, n2.indexOf(l2)) + 1;
    if (r & 8)
      return n2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), L2 = r & 32 ? { preventScroll: true } : {}, a2 = 0, d2 = n2.length, u2;
  do {
    if (a2 >= d2 || a2 + d2 <= 0)
      return 0;
    let s3 = p + a2;
    if (r & 16)
      s3 = (s3 + d2) % d2;
    else {
      if (s3 < 0)
        return 3;
      if (s3 >= d2)
        return 1;
    }
    u2 = n2[s3], u2 == null || u2.focus(L2), a2 += x2;
  } while (u2 !== i2.activeElement);
  return r & 6 && I(u2) && u2.select(), 2;
}
function t$3() {
  return /iPhone/gi.test((void 0).navigator.platform) || /Mac/gi.test((void 0).navigator.platform) && (void 0).navigator.maxTouchPoints > 0;
}
function i$2() {
  return /Android/gi.test((void 0).navigator.userAgent);
}
function n$2() {
  return t$3() || i$2();
}
function u$4(e2, t2, n2) {
  c$2.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e2, t2, n2), o2(() => (void 0).removeEventListener(e2, t2, n2));
  });
}
function w$3(e2, n2, t2) {
  c$2.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e2, n2, t2), o2(() => (void 0).removeEventListener(e2, n2, t2));
  });
}
function w$2(f2, m2, l2 = computed(() => true)) {
  function a2(e2, r) {
    if (!l2.value || e2.defaultPrevented)
      return;
    let t2 = r(e2);
    if (t2 === null || !t2.getRootNode().contains(t2))
      return;
    let c2 = function o2(n2) {
      return typeof n2 == "function" ? o2(n2()) : Array.isArray(n2) || n2 instanceof Set ? n2 : [n2];
    }(f2);
    for (let o2 of c2) {
      if (o2 === null)
        continue;
      let n2 = o2 instanceof HTMLElement ? o2 : o$1(o2);
      if (n2 != null && n2.contains(t2) || e2.composed && e2.composedPath().includes(n2))
        return;
    }
    return !w$4(t2, h.Loose) && t2.tabIndex !== -1 && e2.preventDefault(), m2(e2, t2);
  }
  let u2 = ref(null);
  u$4("pointerdown", (e2) => {
    var r, t2;
    l2.value && (u2.value = ((t2 = (r = e2.composedPath) == null ? void 0 : r.call(e2)) == null ? void 0 : t2[0]) || e2.target);
  }, true), u$4("mousedown", (e2) => {
    var r, t2;
    l2.value && (u2.value = ((t2 = (r = e2.composedPath) == null ? void 0 : r.call(e2)) == null ? void 0 : t2[0]) || e2.target);
  }, true), u$4("click", (e2) => {
    n$2() || u2.value && (a2(e2, () => u2.value), u2.value = null);
  }, true), u$4("touchend", (e2) => a2(e2, () => e2.target instanceof HTMLElement ? e2.target : null), true), w$3("blur", (e2) => a2(e2, () => (void 0).document.activeElement instanceof HTMLIFrameElement ? (void 0).document.activeElement : null), true);
}
var N$3 = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(N$3 || {}), S = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(S || {});
function A$2({ visible: r = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i2 }) {
  var a2;
  let n2 = j(o2, e2), l2 = Object.assign(i2, { props: n2 });
  if (r || t2 & 2 && n2.static)
    return y$1(l2);
  if (t2 & 1) {
    let d2 = (a2 = n2.unmount) == null || a2 ? 0 : 1;
    return u$5(d2, { [0]() {
      return null;
    }, [1]() {
      return y$1({ ...i2, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return y$1(l2);
}
function y$1({ props: r, attrs: t2, slots: e2, slot: o2, name: i2 }) {
  var m2, h2;
  let { as: n2, ...l2 } = T$1(r, ["unmount", "static"]), a2 = (m2 = e2.default) == null ? void 0 : m2.call(e2, o2), d2 = {};
  if (o2) {
    let u2 = false, c2 = [];
    for (let [p, f2] of Object.entries(o2))
      typeof f2 == "boolean" && (u2 = true), f2 === true && c2.push(p);
    u2 && (d2["data-headlessui-state"] = c2.join(" "));
  }
  if (n2 === "template") {
    if (a2 = b(a2 != null ? a2 : []), Object.keys(l2).length > 0 || Object.keys(t2).length > 0) {
      let [u2, ...c2] = a2 != null ? a2 : [];
      if (!v(u2) || c2.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i2} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l2).concat(Object.keys(t2)).map((s3) => s3.trim()).filter((s3, g2, R2) => R2.indexOf(s3) === g2).sort((s3, g2) => s3.localeCompare(g2)).map((s3) => `  - ${s3}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((s3) => `  - ${s3}`).join(`
`)].join(`
`));
      let p = j((h2 = u2.props) != null ? h2 : {}, l2, d2), f2 = cloneVNode(u2, p, true);
      for (let s3 in p)
        s3.startsWith("on") && (f2.props || (f2.props = {}), f2.props[s3] = p[s3]);
      return f2;
    }
    return Array.isArray(a2) && a2.length === 1 ? a2[0] : a2;
  }
  return h$1(n2, Object.assign({}, l2, d2), { default: () => a2 });
}
function b(r) {
  return r.flatMap((t2) => t2.type === Fragment ? b(t2.children) : [t2]);
}
function j(...r) {
  if (r.length === 0)
    return {};
  if (r.length === 1)
    return r[0];
  let t2 = {}, e2 = {};
  for (let i2 of r)
    for (let n2 in i2)
      n2.startsWith("on") && typeof i2[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i2[n2])) : t2[n2] = i2[n2];
  if (t2.disabled || t2["aria-disabled"])
    return Object.assign(t2, Object.fromEntries(Object.keys(e2).map((i2) => [i2, void 0])));
  for (let i2 in e2)
    Object.assign(t2, { [i2](n2, ...l2) {
      let a2 = e2[i2];
      for (let d2 of a2) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        d2(n2, ...l2);
      }
    } });
  return t2;
}
function T$1(r, t2 = []) {
  let e2 = Object.assign({}, r);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function v(r) {
  return r == null ? false : typeof r.type == "string" || typeof r.type == "object" || typeof r.type == "function";
}
var u$3 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(u$3 || {});
let f$1 = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(t2, { slots: n2, attrs: i2 }) {
  return () => {
    var r;
    let { features: e2, ...d2 } = t2, o2 = { "aria-hidden": (e2 & 2) === 2 ? true : (r = d2["aria-hidden"]) != null ? r : void 0, hidden: (e2 & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e2 & 4) === 4 && (e2 & 2) !== 2 && { display: "none" } } };
    return A$2({ ourProps: o2, theirProps: d2, slot: {}, attrs: i2, slots: n2, name: "Hidden" });
  };
} });
let n$1 = Symbol("Context");
var i$1 = ((e2) => (e2[e2.Open = 1] = "Open", e2[e2.Closed = 2] = "Closed", e2[e2.Closing = 4] = "Closing", e2[e2.Opening = 8] = "Opening", e2))(i$1 || {});
function s$2() {
  return l$2() !== null;
}
function l$2() {
  return inject(n$1, null);
}
function t$2(o2) {
  provide(n$1, o2);
}
var o = ((r) => (r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o || {});
let t$1 = [];
function E$1(n2, e2, o2, r) {
  c$2.isServer || watchEffect((t2) => {
    n2 = n2 != null ? n2 : void 0, n2.addEventListener(e2, o2, r), t2(() => n2.removeEventListener(e2, o2, r));
  });
}
var d$3 = ((r) => (r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(d$3 || {});
function n() {
  let o2 = ref(0);
  return w$3("keydown", (e2) => {
    e2.key === "Tab" && (o2.value = e2.shiftKey ? 1 : 0);
  }), o2;
}
function B(t2) {
  if (!t2)
    return /* @__PURE__ */ new Set();
  if (typeof t2 == "function")
    return new Set(t2());
  let n2 = /* @__PURE__ */ new Set();
  for (let r of t2.value) {
    let l2 = o$1(r);
    l2 instanceof HTMLElement && n2.add(l2);
  }
  return n2;
}
var A$1 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.InitialFocus = 2] = "InitialFocus", e2[e2.TabLock = 4] = "TabLock", e2[e2.FocusLock = 8] = "FocusLock", e2[e2.RestoreFocus = 16] = "RestoreFocus", e2[e2.All = 30] = "All", e2))(A$1 || {});
let ue = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(t2, { attrs: n$12, slots: r, expose: l2 }) {
  let o2 = ref(null);
  l2({ el: o2, $el: o2 });
  let i2 = computed(() => i$3(o2)), e2 = ref(false);
  onMounted(() => e2.value = true), onUnmounted(() => e2.value = false), $$1({ ownerDocument: i2 }, computed(() => e2.value && Boolean(t2.features & 16)));
  let m2 = z$1({ ownerDocument: i2, container: o2, initialFocus: computed(() => t2.initialFocus) }, computed(() => e2.value && Boolean(t2.features & 2)));
  J({ ownerDocument: i2, container: o2, containers: t2.containers, previousActiveElement: m2 }, computed(() => e2.value && Boolean(t2.features & 8)));
  let f2 = n();
  function a2(u2) {
    let T2 = o$1(o2);
    if (!T2)
      return;
    ((w2) => w2())(() => {
      u$5(f2.value, { [d$3.Forwards]: () => {
        P(T2, N$4.First, { skipElements: [u2.relatedTarget] });
      }, [d$3.Backwards]: () => {
        P(T2, N$4.Last, { skipElements: [u2.relatedTarget] });
      } });
    });
  }
  let s3 = ref(false);
  function F2(u2) {
    u2.key === "Tab" && (s3.value = true, requestAnimationFrame(() => {
      s3.value = false;
    }));
  }
  function H2(u2) {
    if (!e2.value)
      return;
    let T2 = B(t2.containers);
    o$1(o2) instanceof HTMLElement && T2.add(o$1(o2));
    let d2 = u2.relatedTarget;
    d2 instanceof HTMLElement && d2.dataset.headlessuiFocusGuard !== "true" && (N$2(T2, d2) || (s3.value ? P(o$1(o2), u$5(f2.value, { [d$3.Forwards]: () => N$4.Next, [d$3.Backwards]: () => N$4.Previous }) | N$4.WrapAround, { relativeTo: u2.target }) : u2.target instanceof HTMLElement && S$1(u2.target)));
  }
  return () => {
    let u2 = {}, T2 = { ref: o2, onKeydown: F2, onFocusout: H2 }, { features: d2, initialFocus: w2, containers: Q2, ...O2 } = t2;
    return h$1(Fragment, [Boolean(d2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: a2, features: u$3.Focusable }), A$2({ ourProps: T2, theirProps: { ...n$12, ...O2 }, slot: u2, attrs: n$12, slots: r, name: "FocusTrap" }), Boolean(d2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: a2, features: u$3.Focusable })]);
  };
} }), { features: A$1 });
function W$1(t2) {
  let n2 = ref(t$1.slice());
  return watch$1([t2], ([r], [l2]) => {
    l2 === true && r === false ? t$5(() => {
      n2.value.splice(0);
    }) : l2 === false && r === true && (n2.value = t$1.slice());
  }, { flush: "post" }), () => {
    var r;
    return (r = n2.value.find((l2) => l2 != null && l2.isConnected)) != null ? r : null;
  };
}
function $$1({ ownerDocument: t2 }, n2) {
  let r = W$1(n2);
  onMounted(() => {
    watchEffect(() => {
      var l2, o2;
      n2.value || ((l2 = t2.value) == null ? void 0 : l2.activeElement) === ((o2 = t2.value) == null ? void 0 : o2.body) && S$1(r());
    }, { flush: "post" });
  }), onUnmounted(() => {
    n2.value && S$1(r());
  });
}
function z$1({ ownerDocument: t2, container: n2, initialFocus: r }, l2) {
  let o2 = ref(null), i2 = ref(false);
  return onMounted(() => i2.value = true), onUnmounted(() => i2.value = false), onMounted(() => {
    watch$1([n2, r, l2], (e2, m2) => {
      if (e2.every((a2, s3) => (m2 == null ? void 0 : m2[s3]) === a2) || !l2.value)
        return;
      let f2 = o$1(n2);
      f2 && t$5(() => {
        var F2, H2;
        if (!i2.value)
          return;
        let a2 = o$1(r), s3 = (F2 = t2.value) == null ? void 0 : F2.activeElement;
        if (a2) {
          if (a2 === s3) {
            o2.value = s3;
            return;
          }
        } else if (f2.contains(s3)) {
          o2.value = s3;
          return;
        }
        a2 ? S$1(a2) : P(f2, N$4.First | N$4.NoScroll) === T$2.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o2.value = (H2 = t2.value) == null ? void 0 : H2.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), o2;
}
function J({ ownerDocument: t2, container: n2, containers: r, previousActiveElement: l2 }, o2) {
  var i2;
  E$1((i2 = t2.value) == null ? void 0 : i2.defaultView, "focus", (e2) => {
    if (!o2.value)
      return;
    let m2 = B(r);
    o$1(n2) instanceof HTMLElement && m2.add(o$1(n2));
    let f2 = l2.value;
    if (!f2)
      return;
    let a2 = e2.target;
    a2 && a2 instanceof HTMLElement ? N$2(m2, a2) ? (l2.value = a2, S$1(a2)) : (e2.preventDefault(), e2.stopPropagation(), S$1(f2)) : S$1(l2.value);
  }, true);
}
function N$2(t2, n2) {
  for (let r of t2)
    if (r.contains(n2))
      return true;
  return false;
}
function m$2(t2) {
  let e2 = shallowRef(t2.getSnapshot());
  return onUnmounted(t2.subscribe(() => {
    e2.value = t2.getSnapshot();
  })), e2;
}
function a$1(o2, r) {
  let t2 = o2(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s3) {
    let i2 = r[e2].call(t2, ...s3);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function c() {
  let o2;
  return { before({ doc: e2 }) {
    var l2;
    let n2 = e2.documentElement;
    o2 = ((l2 = e2.defaultView) != null ? l2 : void 0).innerWidth - n2.clientWidth;
  }, after({ doc: e2, d: n2 }) {
    let t2 = e2.documentElement, l2 = t2.clientWidth - t2.offsetWidth, r = o2 - l2;
    n2.style(t2, "paddingRight", `${r}px`);
  } };
}
function w$1() {
  return t$3() ? { before({ doc: r, d: n2, meta: c2 }) {
    function a2(o2) {
      return c2.containers.flatMap((l2) => l2()).some((l2) => l2.contains(o2));
    }
    n2.microTask(() => {
      var s3;
      if ((void 0).getComputedStyle(r.documentElement).scrollBehavior !== "auto") {
        let t2 = o$2();
        t2.style(r.documentElement, "scrollBehavior", "auto"), n2.add(() => n2.microTask(() => t2.dispose()));
      }
      let o2 = (s3 = (void 0).scrollY) != null ? s3 : (void 0).pageYOffset, l2 = null;
      n2.addEventListener(r, "click", (t2) => {
        if (t2.target instanceof HTMLElement)
          try {
            let e2 = t2.target.closest("a");
            if (!e2)
              return;
            let { hash: f2 } = new URL(e2.href), i2 = r.querySelector(f2);
            i2 && !a2(i2) && (l2 = i2);
          } catch {
          }
      }, true), n2.addEventListener(r, "touchstart", (t2) => {
        if (t2.target instanceof HTMLElement)
          if (a2(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && a2(e2.parentElement); )
              e2 = e2.parentElement;
            n2.style(e2, "overscrollBehavior", "contain");
          } else
            n2.style(t2.target, "touchAction", "none");
      }), n2.addEventListener(r, "touchmove", (t2) => {
        if (t2.target instanceof HTMLElement) {
          if (t2.target.tagName === "INPUT")
            return;
          if (a2(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && e2.dataset.headlessuiPortal !== "" && !(e2.scrollHeight > e2.clientHeight || e2.scrollWidth > e2.clientWidth); )
              e2 = e2.parentElement;
            e2.dataset.headlessuiPortal === "" && t2.preventDefault();
          } else
            t2.preventDefault();
        }
      }, { passive: false }), n2.add(() => {
        var e2;
        let t2 = (e2 = (void 0).scrollY) != null ? e2 : (void 0).pageYOffset;
        o2 !== t2 && (void 0).scrollTo(0, o2), l2 && l2.isConnected && (l2.scrollIntoView({ block: "nearest" }), l2 = null);
      });
    });
  } } : {};
}
function l$1() {
  return { before({ doc: e2, d: o2 }) {
    o2.style(e2.documentElement, "overflow", "hidden");
  } };
}
function m$1(e2) {
  let n2 = {};
  for (let t2 of e2)
    Object.assign(n2, t2(n2));
  return n2;
}
let a = a$1(() => /* @__PURE__ */ new Map(), { PUSH(e2, n2) {
  var o2;
  let t2 = (o2 = this.get(e2)) != null ? o2 : { doc: e2, count: 0, d: o$2(), meta: /* @__PURE__ */ new Set() };
  return t2.count++, t2.meta.add(n2), this.set(e2, t2), this;
}, POP(e2, n2) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(n2)), this;
}, SCROLL_PREVENT({ doc: e2, d: n2, meta: t2 }) {
  let o2 = { doc: e2, d: n2, meta: m$1(t2) }, c$12 = [w$1(), c(), l$1()];
  c$12.forEach(({ before: r }) => r == null ? void 0 : r(o2)), c$12.forEach(({ after: r }) => r == null ? void 0 : r(o2));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
a.subscribe(() => {
  let e2 = a.getSnapshot(), n2 = /* @__PURE__ */ new Map();
  for (let [t2] of e2)
    n2.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let o2 = n2.get(t2.doc) === "hidden", c2 = t2.count !== 0;
    (c2 && !o2 || !c2 && o2) && a.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && a.dispatch("TEARDOWN", t2);
  }
});
function d$2(t2, a$12, n2) {
  let i2 = m$2(a), l2 = computed(() => {
    let e2 = t2.value ? i2.value.get(t2.value) : void 0;
    return e2 ? e2.count > 0 : false;
  });
  return watch$1([t2, a$12], ([e2, m2], [r], o2) => {
    if (!e2 || !m2)
      return;
    a.dispatch("PUSH", e2, n2);
    let f2 = false;
    o2(() => {
      f2 || (a.dispatch("POP", r != null ? r : e2, n2), f2 = true);
    });
  }, { immediate: true }), l2;
}
let i = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
function E(d2, f2 = ref(true)) {
  watchEffect((o2) => {
    var a2;
    if (!f2.value)
      return;
    let e2 = o$1(d2);
    if (!e2)
      return;
    o2(function() {
      var u2;
      if (!e2)
        return;
      let r = (u2 = t.get(e2)) != null ? u2 : 1;
      if (r === 1 ? t.delete(e2) : t.set(e2, r - 1), r !== 1)
        return;
      let n2 = i.get(e2);
      n2 && (n2["aria-hidden"] === null ? e2.removeAttribute("aria-hidden") : e2.setAttribute("aria-hidden", n2["aria-hidden"]), e2.inert = n2.inert, i.delete(e2));
    });
    let l2 = (a2 = t.get(e2)) != null ? a2 : 0;
    t.set(e2, l2 + 1), l2 === 0 && (i.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), e2.setAttribute("aria-hidden", "true"), e2.inert = true);
  });
}
function N$1({ defaultContainers: o2 = [], portals: i2, mainTreeNodeRef: H2 } = {}) {
  let t2 = ref(null), r = i$3(t2);
  function u2() {
    var l2, f2, a2;
    let n2 = [];
    for (let e2 of o2)
      e2 !== null && (e2 instanceof HTMLElement ? n2.push(e2) : "value" in e2 && e2.value instanceof HTMLElement && n2.push(e2.value));
    if (i2 != null && i2.value)
      for (let e2 of i2.value)
        n2.push(e2);
    for (let e2 of (l2 = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? l2 : [])
      e2 !== (void 0).body && e2 !== (void 0).head && e2 instanceof HTMLElement && e2.id !== "headlessui-portal-root" && (e2.contains(o$1(t2)) || e2.contains((a2 = (f2 = o$1(t2)) == null ? void 0 : f2.getRootNode()) == null ? void 0 : a2.host) || n2.some((M2) => e2.contains(M2)) || n2.push(e2));
    return n2;
  }
  return { resolveContainers: u2, contains(n2) {
    return u2().some((l2) => l2.contains(n2));
  }, mainTreeNodeRef: t2, MainTreeNode() {
    return H2 != null ? null : h$1(f$1, { features: u$3.Hidden, ref: t2 });
  } };
}
let e = Symbol("ForcePortalRootContext");
function s$1() {
  return inject(e, false);
}
let u$2 = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o2, { slots: t2, attrs: r }) {
  return provide(e, o2.force), () => {
    let { force: f2, ...n2 } = o2;
    return A$2({ theirProps: n2, ourProps: {}, slot: {}, slots: t2, attrs: r, name: "ForcePortalRoot" });
  };
} });
let u$1 = Symbol("StackContext");
var s2 = ((e2) => (e2[e2.Add = 0] = "Add", e2[e2.Remove = 1] = "Remove", e2))(s2 || {});
function y() {
  return inject(u$1, () => {
  });
}
function R$1({ type: o2, enabled: r, element: e2, onUpdate: i2 }) {
  let a2 = y();
  function t2(...n2) {
    i2 == null || i2(...n2), a2(...n2);
  }
  onMounted(() => {
    watch$1(r, (n2, d2) => {
      n2 ? t2(0, o2, e2) : d2 === true && t2(1, o2, e2);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r.value && t2(1, o2, e2);
  }), provide(u$1, t2);
}
let u = Symbol("DescriptionContext");
function w() {
  let t2 = inject(u, null);
  if (t2 === null)
    throw new Error("Missing parent");
  return t2;
}
function k({ slot: t2 = ref({}), name: o2 = "Description", props: s3 = {} } = {}) {
  let e2 = ref([]);
  function r(n2) {
    return e2.value.push(n2), () => {
      let i2 = e2.value.indexOf(n2);
      i2 !== -1 && e2.value.splice(i2, 1);
    };
  }
  return provide(u, { register: r, slot: t2, name: o2, props: s3 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(t2, { attrs: o2, slots: s3 }) {
  var n2;
  let e2 = (n2 = t2.id) != null ? n2 : `headlessui-description-${I$1()}`, r = w();
  return onMounted(() => onUnmounted(r.register(e2))), () => {
    let { name: i2 = "Description", slot: l2 = ref({}), props: d2 = {} } = r, { ...c2 } = t2, f2 = { ...Object.entries(d2).reduce((a2, [g2, m2]) => Object.assign(a2, { [g2]: unref(m2) }), {}), id: e2 };
    return A$2({ ourProps: f2, theirProps: c2, slot: l2.value, attrs: o2, slots: s3, name: i2 });
  };
} });
function x(e2) {
  let t2 = i$3(e2);
  if (!t2) {
    if (e2 === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e2}`);
  }
  let l2 = t2.getElementById("headlessui-portal-root");
  if (l2)
    return l2;
  let r = t2.createElement("div");
  return r.setAttribute("id", "headlessui-portal-root"), t2.body.appendChild(r);
}
const f = /* @__PURE__ */ new WeakMap();
function U(e2) {
  var t2;
  return (t2 = f.get(e2)) != null ? t2 : 0;
}
function M(e2, t2) {
  let l2 = t2(U(e2));
  return l2 <= 0 ? f.delete(e2) : f.set(e2, l2), l2;
}
let $ = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e2, { slots: t2, attrs: l2 }) {
  let r = ref(null), i2 = computed(() => i$3(r)), o2 = s$1(), u2 = inject(H$1, null), n2 = ref(o2 === true || u2 == null ? x(r.value) : u2.resolveTarget());
  n2.value && M(n2.value, (a2) => a2 + 1);
  let c2 = ref(false);
  onMounted(() => {
    c2.value = true;
  }), watchEffect(() => {
    o2 || u2 != null && (n2.value = u2.resolveTarget());
  });
  let v2 = inject(d$1, null), g2 = false, b2 = getCurrentInstance();
  return watch$1(r, () => {
    if (g2 || !v2)
      return;
    let a2 = o$1(r);
    a2 && (onUnmounted(v2.register(a2), b2), g2 = true);
  }), onUnmounted(() => {
    var P2, T2;
    let a2 = (P2 = i2.value) == null ? void 0 : P2.getElementById("headlessui-portal-root");
    !a2 || n2.value !== a2 || M(n2.value, (L2) => L2 - 1) || n2.value.children.length > 0 || (T2 = n2.value.parentElement) == null || T2.removeChild(n2.value);
  }), () => {
    if (!c2.value || n2.value === null)
      return null;
    let a2 = { ref: r, "data-headlessui-portal": "" };
    return h$1(Teleport, { to: n2.value }, A$2({ ourProps: a2, theirProps: e2, slot: {}, attrs: l2, slots: t2, name: "Portal" }));
  };
} }), d$1 = Symbol("PortalParentContext");
function q() {
  let e2 = inject(d$1, null), t2 = ref([]);
  function l2(o2) {
    return t2.value.push(o2), e2 && e2.register(o2), () => r(o2);
  }
  function r(o2) {
    let u2 = t2.value.indexOf(o2);
    u2 !== -1 && t2.value.splice(u2, 1), e2 && e2.unregister(o2);
  }
  let i2 = { register: l2, unregister: r, portals: t2 };
  return [t2, defineComponent({ name: "PortalWrapper", setup(o2, { slots: u2 }) {
    return provide(d$1, i2), () => {
      var n2;
      return (n2 = u2.default) == null ? void 0 : n2.call(u2);
    };
  } })];
}
let H$1 = Symbol("PortalGroupContext"), z = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e2, { attrs: t2, slots: l2 }) {
  let r = reactive({ resolveTarget() {
    return e2.target;
  } });
  return provide(H$1, r), () => {
    let { target: i2, ...o2 } = e2;
    return A$2({ theirProps: o2, ourProps: {}, slot: {}, attrs: t2, slots: l2, name: "PortalGroup" });
  };
} });
var Te$1 = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(Te$1 || {});
let H = Symbol("DialogContext");
function T(t2) {
  let i2 = inject(H, null);
  if (i2 === null) {
    let l2 = new Error(`<${t2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, T), l2;
  }
  return i2;
}
let A = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Ye = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: A }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (t2) => true }, setup(t2, { emit: i2, attrs: l2, slots: p, expose: s$12 }) {
  var q$1, W2;
  let n2 = (q$1 = t2.id) != null ? q$1 : `headlessui-dialog-${I$1()}`, u2 = ref(false);
  onMounted(() => {
    u2.value = true;
  });
  let r = false, g2 = computed(() => t2.role === "dialog" || t2.role === "alertdialog" ? t2.role : (r || (r = true, console.warn(`Invalid role [${g2}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), D = ref(0), S2 = l$2(), R2 = computed(() => t2.open === A && S2 !== null ? (S2.value & i$1.Open) === i$1.Open : t2.open), m2 = ref(null), E$22 = computed(() => i$3(m2));
  if (s$12({ el: m2, $el: m2 }), !(t2.open !== A || S2 !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof R2.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${R2.value === A ? void 0 : t2.open}`);
  let c2 = computed(() => u2.value && R2.value ? 0 : 1), k$1 = computed(() => c2.value === 0), w2 = computed(() => D.value > 1), N2 = inject(H, null) !== null, [Q2, X] = q(), { resolveContainers: B2, mainTreeNodeRef: K, MainTreeNode: Z } = N$1({ portals: Q2, defaultContainers: [computed(() => {
    var e2;
    return (e2 = h2.panelRef.value) != null ? e2 : m2.value;
  })] }), ee = computed(() => w2.value ? "parent" : "leaf"), U2 = computed(() => S2 !== null ? (S2.value & i$1.Closing) === i$1.Closing : false), te = computed(() => N2 || U2.value ? false : k$1.value), le = computed(() => {
    var e2, a2, d2;
    return (d2 = Array.from((a2 = (e2 = E$22.value) == null ? void 0 : e2.querySelectorAll("body > *")) != null ? a2 : []).find((f2) => f2.id === "headlessui-portal-root" ? false : f2.contains(o$1(K)) && f2 instanceof HTMLElement)) != null ? d2 : null;
  });
  E(le, te);
  let ae = computed(() => w2.value ? true : k$1.value), oe = computed(() => {
    var e2, a2, d2;
    return (d2 = Array.from((a2 = (e2 = E$22.value) == null ? void 0 : e2.querySelectorAll("[data-headlessui-portal]")) != null ? a2 : []).find((f2) => f2.contains(o$1(K)) && f2 instanceof HTMLElement)) != null ? d2 : null;
  });
  E(oe, ae), R$1({ type: "Dialog", enabled: computed(() => c2.value === 0), element: m2, onUpdate: (e2, a2) => {
    if (a2 === "Dialog")
      return u$5(e2, { [s2.Add]: () => D.value += 1, [s2.Remove]: () => D.value -= 1 });
  } });
  let re = k({ name: "DialogDescription", slot: computed(() => ({ open: R2.value })) }), M2 = ref(null), h2 = { titleId: M2, panelRef: ref(null), dialogState: c2, setTitleId(e2) {
    M2.value !== e2 && (M2.value = e2);
  }, close() {
    i2("close", false);
  } };
  provide(H, h2);
  let ne = computed(() => !(!k$1.value || w2.value));
  w$2(B2, (e2, a2) => {
    e2.preventDefault(), h2.close(), nextTick(() => a2 == null ? void 0 : a2.focus());
  }, ne);
  let ie = computed(() => !(w2.value || c2.value !== 0));
  E$1((W2 = E$22.value) == null ? void 0 : W2.defaultView, "keydown", (e2) => {
    ie.value && (e2.defaultPrevented || e2.key === o.Escape && (e2.preventDefault(), e2.stopPropagation(), h2.close()));
  });
  let ue$1 = computed(() => !(U2.value || c2.value !== 0 || N2));
  return d$2(E$22, ue$1, (e2) => {
    var a2;
    return { containers: [...(a2 = e2.containers) != null ? a2 : [], B2] };
  }), watchEffect((e2) => {
    if (c2.value !== 0)
      return;
    let a2 = o$1(m2);
    if (!a2)
      return;
    let d2 = new ResizeObserver((f2) => {
      for (let L2 of f2) {
        let x2 = L2.target.getBoundingClientRect();
        x2.x === 0 && x2.y === 0 && x2.width === 0 && x2.height === 0 && h2.close();
      }
    });
    d2.observe(a2), e2(() => d2.disconnect());
  }), () => {
    let { open: e2, initialFocus: a2, ...d2 } = t2, f2 = { ...l2, ref: m2, id: n2, role: g2.value, "aria-modal": c2.value === 0 ? true : void 0, "aria-labelledby": M2.value, "aria-describedby": re.value }, L2 = { open: c2.value === 0 };
    return h$1(u$2, { force: true }, () => [h$1($, () => h$1(z, { target: m2.value }, () => h$1(u$2, { force: false }, () => h$1(ue, { initialFocus: a2, containers: B2, features: k$1.value ? u$5(ee.value, { parent: ue.features.RestoreFocus, leaf: ue.features.All & ~ue.features.FocusLock }) : ue.features.None }, () => h$1(X, {}, () => A$2({ ourProps: f2, theirProps: { ...d2, ...l2 }, slot: L2, attrs: l2, slots: p, visible: c2.value === 0, features: N$3.RenderStrategy | N$3.Static, name: "Dialog" })))))), h$1(Z)]);
  };
} });
defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(t2, { attrs: i2, slots: l2 }) {
  var u2;
  let p = (u2 = t2.id) != null ? u2 : `headlessui-dialog-overlay-${I$1()}`, s3 = T("DialogOverlay");
  function n2(r) {
    r.target === r.currentTarget && (r.preventDefault(), r.stopPropagation(), s3.close());
  }
  return () => {
    let { ...r } = t2;
    return A$2({ ourProps: { id: p, "aria-hidden": true, onClick: n2 }, theirProps: r, slot: { open: s3.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogOverlay" });
  };
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: false, setup(t2, { attrs: i2, slots: l2, expose: p }) {
  var r;
  let s3 = (r = t2.id) != null ? r : `headlessui-dialog-backdrop-${I$1()}`, n2 = T("DialogBackdrop"), u2 = ref(null);
  return p({ el: u2, $el: u2 }), onMounted(() => {
    if (n2.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...g2 } = t2, D = { id: s3, ref: u2, "aria-hidden": true };
    return h$1(u$2, { force: true }, () => h$1($, () => A$2({ ourProps: D, theirProps: { ...i2, ...g2 }, slot: { open: n2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogBackdrop" })));
  };
} });
let Ge = defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(t2, { attrs: i2, slots: l2, expose: p }) {
  var r;
  let s3 = (r = t2.id) != null ? r : `headlessui-dialog-panel-${I$1()}`, n2 = T("DialogPanel");
  p({ el: n2.panelRef, $el: n2.panelRef });
  function u2(g2) {
    g2.stopPropagation();
  }
  return () => {
    let { ...g2 } = t2, D = { id: s3, ref: n2.panelRef, onClick: u2 };
    return A$2({ ourProps: D, theirProps: g2, slot: { open: n2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogPanel" });
  };
} });
defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(t2, { attrs: i2, slots: l2 }) {
  var n2;
  let p = (n2 = t2.id) != null ? n2 : `headlessui-dialog-title-${I$1()}`, s3 = T("DialogTitle");
  return onMounted(() => {
    s3.setTitleId(p), onUnmounted(() => s3.setTitleId(null));
  }), () => {
    let { ...u2 } = t2;
    return A$2({ ourProps: { id: p }, theirProps: u2, slot: { open: s3.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogTitle" });
  };
} });
function l(r) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g$1 = ((i2) => (i2.Finished = "finished", i2.Cancelled = "cancelled", i2))(g$1 || {});
function F(e2, t2) {
  let i2 = o$2();
  if (!e2)
    return i2.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s3] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r) => r.includes("ms") ? parseFloat(r) : parseFloat(r) * 1e3).sort((r, c2) => c2 - r);
    return u2;
  });
  return l2 !== 0 ? i2.setTimeout(() => t2("finished"), l2 + s3) : t2("finished"), i2.add(() => t2("cancelled")), i2.dispose;
}
function L$1(e2, t2, i2, n2, a2, l$12) {
  let s3 = o$2(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d(e2, ...a2), m(e2, ...t2, ...i2), s3.nextFrame(() => {
    d(e2, ...i2), m(e2, ...n2), s3.add(F(e2, (u2) => (d(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s3.add(() => d(e2, ...t2, ...i2, ...n2, ...a2)), s3.add(() => o2("cancelled")), s3.dispose;
}
function g(e2 = "") {
  return e2.split(/\s+/).filter((t2) => t2.length > 1);
}
let R = Symbol("TransitionContext");
var pe = ((a2) => (a2.Visible = "visible", a2.Hidden = "hidden", a2))(pe || {});
function me() {
  return inject(R, null) !== null;
}
function Te() {
  let e2 = inject(R, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function ge() {
  let e2 = inject(N, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let N = Symbol("NestingContext");
function L(e2) {
  return "children" in e2 ? L(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function Q(e2) {
  let t2 = ref([]), a2 = ref(false);
  onMounted(() => a2.value = true), onUnmounted(() => a2.value = false);
  function s3(n2, r = S.Hidden) {
    let l2 = t2.value.findIndex(({ id: f2 }) => f2 === n2);
    l2 !== -1 && (u$5(r, { [S.Unmount]() {
      t2.value.splice(l2, 1);
    }, [S.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !L(t2) && a2.value && (e2 == null || e2()));
  }
  function h2(n2) {
    let r = t2.value.find(({ id: l2 }) => l2 === n2);
    return r ? r.state !== "visible" && (r.state = "visible") : t2.value.push({ id: n2, state: "visible" }), () => s3(n2, S.Unmount);
  }
  return { children: t2, register: h2, unregister: s3 };
}
let W = N$3.RenderStrategy, he = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s3, expose: h2 }) {
  let n2 = ref(0);
  function r() {
    n2.value |= i$1.Opening, t2("beforeEnter");
  }
  function l2() {
    n2.value &= ~i$1.Opening, t2("afterEnter");
  }
  function f2() {
    n2.value |= i$1.Closing, t2("beforeLeave");
  }
  function S$12() {
    n2.value &= ~i$1.Closing, t2("afterLeave");
  }
  if (!me() && s$2())
    return () => h$1(Se, { ...e2, onBeforeEnter: r, onAfterEnter: l2, onBeforeLeave: f2, onAfterLeave: S$12 }, s3);
  let d2 = ref(null), y2 = computed(() => e2.unmount ? S.Unmount : S.Hidden);
  h2({ el: d2, $el: d2 });
  let { show: v2, appear: A2 } = Te(), { register: D, unregister: H2 } = ge(), i2 = ref(v2.value ? "visible" : "hidden"), I2 = { value: true }, c2 = I$1(), b2 = { value: false }, P2 = Q(() => {
    !b2.value && i2.value !== "hidden" && (i2.value = "hidden", H2(c2), S$12());
  });
  onMounted(() => {
    let o2 = D(c2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (y2.value === S.Hidden && c2) {
      if (v2.value && i2.value !== "visible") {
        i2.value = "visible";
        return;
      }
      u$5(i2.value, { ["hidden"]: () => H2(c2), ["visible"]: () => D(c2) });
    }
  });
  let j2 = g(e2.enter), M2 = g(e2.enterFrom), X = g(e2.enterTo), _ = g(e2.entered), Y = g(e2.leave), Z = g(e2.leaveFrom), ee = g(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (i2.value === "visible") {
        let o2 = o$1(d2);
        if (o2 instanceof Comment && o2.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function te(o2) {
    let E2 = I2.value && !A2.value, p = o$1(d2);
    !p || !(p instanceof HTMLElement) || E2 || (b2.value = true, v2.value && r(), v2.value || f2(), o2(v2.value ? L$1(p, j2, M2, X, _, (V) => {
      b2.value = false, V === g$1.Finished && l2();
    }) : L$1(p, Y, Z, ee, _, (V) => {
      b2.value = false, V === g$1.Finished && (L(P2) || (i2.value = "hidden", H2(c2), S$12()));
    })));
  }
  return onMounted(() => {
    watch$1([v2], (o2, E2, p) => {
      te(p), I2.value = false;
    }, { immediate: true });
  }), provide(N, P2), t$2(computed(() => u$5(i2.value, { ["visible"]: i$1.Open, ["hidden"]: i$1.Closed }) | n2.value)), () => {
    let { appear: o2, show: E2, enter: p, enterFrom: V, enterTo: Ce, entered: ye, leave: be, leaveFrom: Ee, leaveTo: Ve, ...U2 } = e2, ne = { ref: d2 }, re = { ...U2, ...A2.value && v2.value && c$2.isServer ? { class: normalizeClass([a2.class, U2.class, ...j2, ...M2]) } : {} };
    return A$2({ theirProps: re, ourProps: ne, slot: {}, slots: s3, attrs: a2, features: W, visible: i2.value === "visible", name: "TransitionChild" });
  };
} }), ce = he, Se = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s3 }) {
  let h2 = l$2(), n2 = computed(() => e2.show === null && h2 !== null ? (h2.value & i$1.Open) === i$1.Open : e2.show);
  watchEffect(() => {
    if (![true, false].includes(n2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let r = ref(n2.value ? "visible" : "hidden"), l2 = Q(() => {
    r.value = "hidden";
  }), f2 = ref(true), S2 = { show: n2, appear: computed(() => e2.appear || !f2.value) };
  return onMounted(() => {
    watchEffect(() => {
      f2.value = false, n2.value ? r.value = "visible" : L(l2) || (r.value = "hidden");
    });
  }), provide(N, l2), provide(R, S2), () => {
    let d2 = T$1(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), y2 = { unmount: e2.unmount };
    return A$2({ ourProps: { ...y2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s3, default: () => [h$1(ce, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a2, ...y2, ...d2 }, s3.default)] }, attrs: {}, features: W, visible: r.value === "visible", name: "Transition" });
  };
} });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.modal, modal);
const _sfc_main$2$2 = defineComponent({
  components: {
    HDialog: Ye,
    HDialogPanel: Ge,
    TransitionRoot: Se,
    TransitionChild: he
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: true
    },
    preventClose: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "close", "close-prevented", "after-leave"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("modal", toRef(props, "ui"), config$1, toRef(props, "class"));
    const isOpen = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const transitionClass = computed(() => {
      if (!props.transition) {
        return {};
      }
      return {
        ...ui.value.transition
      };
    });
    function close(value) {
      if (props.preventClose) {
        emit("close-prevented");
        return;
      }
      isOpen.value = value;
      emit("close");
    }
    const onAfterLeave = () => {
      emit("after-leave");
    };
    l$3(() => useId("$HAJMhYDoe7"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      isOpen,
      transitionClass,
      onAfterLeave,
      close
    };
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  const _component_HDialog = resolveComponent("HDialog");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_HDialogPanel = resolveComponent("HDialogPanel");
  _push(ssrRenderComponent(_component_TransitionRoot, mergeProps({
    appear: _ctx.appear,
    show: _ctx.isOpen,
    as: "template",
    onAfterLeave: _ctx.onAfterLeave
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HDialog, mergeProps({
          class: _ctx.ui.wrapper
        }, _ctx.attrs, { onClose: _ctx.close }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.overlay) {
                _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition), {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId3}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`<div class="${ssrRenderClass(_ctx.ui.inner)}"${_scopeId2}><div class="${ssrRenderClass([_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding])}"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                as: "template",
                appear: _ctx.appear
              }, _ctx.transitionClass), {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_HDialogPanel, {
                      class: [
                        _ctx.ui.base,
                        _ctx.ui.background,
                        _ctx.ui.ring,
                        _ctx.ui.shadow,
                        _ctx.fullscreen ? _ctx.ui.fullscreen : [_ctx.ui.width, _ctx.ui.height, _ctx.ui.rounded, _ctx.ui.margin]
                      ]
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_HDialogPanel, {
                        class: [
                          _ctx.ui.base,
                          _ctx.ui.background,
                          _ctx.ui.ring,
                          _ctx.ui.shadow,
                          _ctx.fullscreen ? _ctx.ui.fullscreen : [_ctx.ui.width, _ctx.ui.height, _ctx.ui.rounded, _ctx.ui.margin]
                        ]
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 8, ["class"])
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
              _push3(`</div></div>`);
            } else {
              return [
                _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                  key: 0,
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition), {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                    }, null, 2)
                  ]),
                  _: 1
                }, 16, ["appear"])) : createCommentVNode("", true),
                createVNode("div", {
                  class: _ctx.ui.inner
                }, [
                  createVNode("div", {
                    class: [_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding]
                  }, [
                    createVNode(_component_TransitionChild, mergeProps({
                      as: "template",
                      appear: _ctx.appear
                    }, _ctx.transitionClass), {
                      default: withCtx(() => [
                        createVNode(_component_HDialogPanel, {
                          class: [
                            _ctx.ui.base,
                            _ctx.ui.background,
                            _ctx.ui.ring,
                            _ctx.ui.shadow,
                            _ctx.fullscreen ? _ctx.ui.fullscreen : [_ctx.ui.width, _ctx.ui.height, _ctx.ui.rounded, _ctx.ui.margin]
                          ]
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                        }, 8, ["class"])
                      ]),
                      _: 3
                    }, 16, ["appear"])
                  ], 2)
                ], 2)
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HDialog, mergeProps({
            class: _ctx.ui.wrapper
          }, _ctx.attrs, { onClose: _ctx.close }), {
            default: withCtx(() => [
              _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                key: 0,
                as: "template",
                appear: _ctx.appear
              }, _ctx.ui.overlay.transition), {
                default: withCtx(() => [
                  createVNode("div", {
                    class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                  }, null, 2)
                ]),
                _: 1
              }, 16, ["appear"])) : createCommentVNode("", true),
              createVNode("div", {
                class: _ctx.ui.inner
              }, [
                createVNode("div", {
                  class: [_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding]
                }, [
                  createVNode(_component_TransitionChild, mergeProps({
                    as: "template",
                    appear: _ctx.appear
                  }, _ctx.transitionClass), {
                    default: withCtx(() => [
                      createVNode(_component_HDialogPanel, {
                        class: [
                          _ctx.ui.base,
                          _ctx.ui.background,
                          _ctx.ui.ring,
                          _ctx.ui.shadow,
                          _ctx.fullscreen ? _ctx.ui.fullscreen : [_ctx.ui.width, _ctx.ui.height, _ctx.ui.rounded, _ctx.ui.margin]
                        ]
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 8, ["class"])
                    ]),
                    _: 3
                  }, 16, ["appear"])
                ], 2)
              ], 2)
            ]),
            _: 3
          }, 16, ["class", "onClose"])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$2$2 = _sfc_main$2$2.setup;
_sfc_main$2$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Modal.vue");
  return _sfc_setup$2$2 ? _sfc_setup$2$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2$2, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$1$4 = /* @__PURE__ */ defineComponent({
  __name: "ServiceFormPost",
  __ssrInlineRender: true,
  setup(__props) {
    const Category = ref("");
    const Description = ref("");
    const Address = ref("");
    const ServiceName = ref("");
    const Website = ref("");
    const ImgUrl = ref("");
    const taginput = ref("");
    const errors = ref({
      Category: "",
      Description: "",
      Address: "",
      ServiceName: "",
      Website: "",
      ImgUrl: "",
      Tags: "",
      ServiceID: ""
    });
    const onSubmit = handleSubmit();
    function handleSubmit() {
    }
    const fields = ref([{ key: 0, value: "" }]);
    function remove(idx) {
      fields.value.splice(idx, 1);
    }
    function push(value) {
      fields.value.push({ key: fields.value.length, value });
      taginput.value = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = __nuxt_component_0$4;
      const _component_UFormGroup = __nuxt_component_1$6;
      const _component_UInput = __nuxt_component_2$2;
      const _component_UBadge = __nuxt_component_3$1;
      const _component_UButton = __nuxt_component_1$7;
      _push(ssrRenderComponent(_component_UForm, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Category" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(Category),
                    "onUpdate:modelValue": ($event) => isRef(Category) ? Category.value = $event : null,
                    name: "Category"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(Category),
                      "onUpdate:modelValue": ($event) => isRef(Category) ? Category.value = $event : null,
                      name: "Category"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Description" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(Description),
                    "onUpdate:modelValue": ($event) => isRef(Description) ? Description.value = $event : null,
                    type: "text",
                    name: "Description"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(unref(errors).Description)}</span>`);
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(Description),
                      "onUpdate:modelValue": ($event) => isRef(Description) ? Description.value = $event : null,
                      type: "text",
                      name: "Description"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(errors).Description), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Address" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(Address),
                    "onUpdate:modelValue": ($event) => isRef(Address) ? Address.value = $event : null,
                    type: "text",
                    name: "Address"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(unref(errors).Address)}</span>`);
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(Address),
                      "onUpdate:modelValue": ($event) => isRef(Address) ? Address.value = $event : null,
                      type: "text",
                      name: "Address"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(errors).Address), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "ServiceName" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(ServiceName),
                    "onUpdate:modelValue": ($event) => isRef(ServiceName) ? ServiceName.value = $event : null,
                    type: "text",
                    name: "ServiceName"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(unref(errors).ServiceName)}</span>`);
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(ServiceName),
                      "onUpdate:modelValue": ($event) => isRef(ServiceName) ? ServiceName.value = $event : null,
                      type: "text",
                      name: "ServiceName"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(errors).ServiceName), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Website" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(Website),
                    "onUpdate:modelValue": ($event) => isRef(Website) ? Website.value = $event : null,
                    type: "text",
                    name: "Website"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(unref(errors).Website)}</span>`);
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(Website),
                      "onUpdate:modelValue": ($event) => isRef(Website) ? Website.value = $event : null,
                      type: "text",
                      name: "Website"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(errors).Website), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "ImgUrl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(ImgUrl),
                    "onUpdate:modelValue": ($event) => isRef(ImgUrl) ? ImgUrl.value = $event : null,
                    type: "text",
                    name: "ImgUrl"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>${ssrInterpolate(unref(errors).ImgUrl)}</span>`);
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(ImgUrl),
                      "onUpdate:modelValue": ($event) => isRef(ImgUrl) ? ImgUrl.value = $event : null,
                      type: "text",
                      name: "ImgUrl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("span", null, toDisplayString(unref(errors).ImgUrl), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Tag" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(fields), (field, idx) => {
                    _push3(ssrRenderComponent(_component_UFormGroup, {
                      key: field.key
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (field.value.length) {
                            _push4(ssrRenderComponent(_component_UBadge, {
                              size: "md",
                              class: "mr-2"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(field.value)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(field.value), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (field.value.length) {
                            _push4(ssrRenderComponent(_component_UButton, {
                              size: "xs",
                              onClick: ($event) => remove(idx)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` Remove `);
                                } else {
                                  return [
                                    createTextVNode(" Remove ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            field.value.length ? (openBlock(), createBlock(_component_UBadge, {
                              key: 0,
                              size: "md",
                              class: "mr-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(field.value), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true),
                            field.value.length ? (openBlock(), createBlock(_component_UButton, {
                              key: 1,
                              size: "xs",
                              onClick: ($event) => remove(idx)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Remove ")
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(taginput),
                    "onUpdate:modelValue": ($event) => isRef(taginput) ? taginput.value = $event : null,
                    type: "text"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    class: "border-gray-600",
                    onClick: ($event) => push(unref(taginput))
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Add Tag `);
                      } else {
                        return [
                          createTextVNode(" Add Tag ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, idx) => {
                      return openBlock(), createBlock(_component_UFormGroup, {
                        key: field.key
                      }, {
                        default: withCtx(() => [
                          field.value.length ? (openBlock(), createBlock(_component_UBadge, {
                            key: 0,
                            size: "md",
                            class: "mr-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(field.value), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          field.value.length ? (openBlock(), createBlock(_component_UButton, {
                            key: 1,
                            size: "xs",
                            onClick: ($event) => remove(idx)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Remove ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    createVNode(_component_UInput, {
                      modelValue: unref(taginput),
                      "onUpdate:modelValue": ($event) => isRef(taginput) ? taginput.value = $event : null,
                      type: "text"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UButton, {
                      size: "xs",
                      class: "border-gray-600",
                      onClick: ($event) => push(unref(taginput))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Add Tag ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, { onClick: unref(onSubmit) }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Submit `);
                } else {
                  return [
                    createTextVNode(" Submit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormGroup, { label: "Category" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(Category),
                    "onUpdate:modelValue": ($event) => isRef(Category) ? Category.value = $event : null,
                    name: "Category"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "Description" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(Description),
                    "onUpdate:modelValue": ($event) => isRef(Description) ? Description.value = $event : null,
                    type: "text",
                    name: "Description"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", null, toDisplayString(unref(errors).Description), 1)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "Address" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(Address),
                    "onUpdate:modelValue": ($event) => isRef(Address) ? Address.value = $event : null,
                    type: "text",
                    name: "Address"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", null, toDisplayString(unref(errors).Address), 1)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "ServiceName" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(ServiceName),
                    "onUpdate:modelValue": ($event) => isRef(ServiceName) ? ServiceName.value = $event : null,
                    type: "text",
                    name: "ServiceName"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", null, toDisplayString(unref(errors).ServiceName), 1)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "Website" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(Website),
                    "onUpdate:modelValue": ($event) => isRef(Website) ? Website.value = $event : null,
                    type: "text",
                    name: "Website"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", null, toDisplayString(unref(errors).Website), 1)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "ImgUrl" }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(ImgUrl),
                    "onUpdate:modelValue": ($event) => isRef(ImgUrl) ? ImgUrl.value = $event : null,
                    type: "text",
                    name: "ImgUrl"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("span", null, toDisplayString(unref(errors).ImgUrl), 1)
                ]),
                _: 1
              }),
              createVNode(_component_UFormGroup, { label: "Tag" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(fields), (field, idx) => {
                    return openBlock(), createBlock(_component_UFormGroup, {
                      key: field.key
                    }, {
                      default: withCtx(() => [
                        field.value.length ? (openBlock(), createBlock(_component_UBadge, {
                          key: 0,
                          size: "md",
                          class: "mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(field.value), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        field.value.length ? (openBlock(), createBlock(_component_UButton, {
                          key: 1,
                          size: "xs",
                          onClick: ($event) => remove(idx)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Remove ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  createVNode(_component_UInput, {
                    modelValue: unref(taginput),
                    "onUpdate:modelValue": ($event) => isRef(taginput) ? taginput.value = $event : null,
                    type: "text"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UButton, {
                    size: "xs",
                    class: "border-gray-600",
                    onClick: ($event) => push(unref(taginput))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Add Tag ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_UButton, { onClick: unref(onSubmit) }, {
                default: withCtx(() => [
                  createTextVNode(" Submit ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1$4 = _sfc_main$1$4.setup;
_sfc_main$1$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServiceFormPost.vue");
  return _sfc_setup$1$4 ? _sfc_setup$1$4(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const isOpen = ref(false);
    const services2 = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/users/services")), __temp = await __temp, __restore(), __temp);
    const columns = [
      {
        key: "name",
        label: "Service"
      },
      {
        key: "category",
        label: "Category"
      },
      {
        key: "actions",
        label: "Actions"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$7;
      const _component_UTable = __nuxt_component_1$3;
      const _component_UButton = __nuxt_component_1$7;
      const _component_UModal = __nuxt_component_3;
      const _component_ServiceFormPost = _sfc_main$1$4;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "rounded-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-49d67de3${_scopeId}>Services</h2>`);
            if (unref(services2).length === 0) {
              _push2(`<p data-v-49d67de3${_scopeId}>no Services</p>`);
            } else {
              _push2(ssrRenderComponent(_component_UTable, {
                columns,
                rows: unref(services2),
                class: "card rounded-md lg:w-1/2"
              }, {
                "actions-data": withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-heroicons-trash-20-solid"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-heroicons-pencil-square-20-solid"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        color: "gray",
                        variant: "ghost",
                        icon: "i-heroicons-trash-20-solid"
                      }),
                      createVNode(_component_UButton, {
                        color: "gray",
                        variant: "ghost",
                        icon: "i-heroicons-pencil-square-20-solid"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(ssrRenderComponent(_component_UButton, {
              label: "Add service",
              class: "mt-4",
              color: "orange",
              onClick: ($event) => isOpen.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UModal, {
              modelValue: unref(isOpen),
              "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 flex-1" data-v-49d67de3${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ServiceFormPost, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 flex-1" }, [
                      createVNode(_component_ServiceFormPost)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h2", null, "Services"),
              unref(services2).length === 0 ? (openBlock(), createBlock("p", { key: 0 }, "no Services")) : (openBlock(), createBlock(_component_UTable, {
                key: 1,
                columns,
                rows: unref(services2),
                class: "card rounded-md lg:w-1/2"
              }, {
                "actions-data": withCtx(() => [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-trash-20-solid"
                  }),
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-pencil-square-20-solid"
                  })
                ]),
                _: 1
              }, 8, ["rows"])),
              createVNode(_component_UButton, {
                label: "Add service",
                class: "mt-4",
                color: "orange",
                onClick: withModifiers(($event) => isOpen.value = true, ["prevent"])
              }, null, 8, ["onClick"]),
              createVNode(_component_UModal, {
                modelValue: unref(isOpen),
                "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 flex-1" }, [
                    createVNode(_component_ServiceFormPost)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/services.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const services = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-49d67de3"]]);

const servicesBYDVfHae = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: services
});

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "[service]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    let serviceTags = [];
    const my_path = ref(route.fullPath.split("/services/")[1]);
    const { data: service } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/services/${my_path.value}`, {
      onResponseError({ response }) {
        console.error("Error fetching data:", response);
      }
    }, "$v5qgww3VYq")), __temp = await __temp, __restore(), __temp);
    if (service.value) {
      if (typeof service.value === "object" && "tags" in service.value)
        serviceTags = ([__temp, __restore] = withAsyncContext(() => service.value.tags), __temp = await __temp, __restore(), __temp);
    }
    async function getServicesByTags(tag) {
      router.push({
        path: "/services",
        query: { tags: tag }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$7;
      const _component_ServicesGridItem = __nuxt_component_1$5;
      const _component_UBadge = __nuxt_component_3$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-24ec654a><h2 data-v-24ec654a>Details</h2>`);
      _push(ssrRenderComponent(_component_UContainer, { ui: {
        base: "flex",
        padding: "p-8"
      } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(service)) {
              _push2(ssrRenderComponent(_component_ServicesGridItem, { service: unref(service) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(service)) {
              _push2(ssrRenderComponent(_component_UContainer, {
                ui: {
                  padding: "p-8 gap-4",
                  constrained: "max-w-7xl"
                },
                class: "Ucontainer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(serviceTags)) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(serviceTags), (tag) => {
                        _push3(ssrRenderComponent(_component_UBadge, {
                          key: tag,
                          onClick: ($event) => getServicesByTags(tag)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(tag)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(tag), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(serviceTags) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(serviceTags), (tag) => {
                        return openBlock(), createBlock(_component_UBadge, {
                          key: tag,
                          onClick: ($event) => getServicesByTags(tag)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tag), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 128)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(service) ? (openBlock(), createBlock(_component_ServicesGridItem, {
                key: 0,
                service: unref(service)
              }, null, 8, ["service"])) : createCommentVNode("", true),
              unref(service) ? (openBlock(), createBlock(_component_UContainer, {
                key: 1,
                ui: {
                  padding: "p-8 gap-4",
                  constrained: "max-w-7xl"
                },
                class: "Ucontainer"
              }, {
                default: withCtx(() => [
                  unref(serviceTags) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(serviceTags), (tag) => {
                    return openBlock(), createBlock(_component_UBadge, {
                      key: tag,
                      onClick: ($event) => getServicesByTags(tag)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(tag), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]);
                  }), 128)) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[service].vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _service_ = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-24ec654a"]]);

const _service_CjZGaiUu = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _service_
});

const _sfc_main$2$1 = /* @__PURE__ */ defineComponent({
  __name: "ServicesNav",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const sortOrder = ref("Ascending");
    ref("");
    const nuxtApp = useNuxtApp();
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/services/categories", {
      headers: { Accept: "application/json" },
      getCachedData(key) {
        const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (!cachedData)
          return;
        return cachedData;
      }
    }, "$X22vnpswai")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(_attrs)} data-v-cfe661e2><div class="select-container" data-v-cfe661e2><label for="category-select" data-v-cfe661e2>Choose a category:</label>`);
      if (unref(categories)) {
        _push(`<select id="category-select" name="categories" data-v-cfe661e2><option value="" data-v-cfe661e2> Select By Category </option><!--[-->`);
        ssrRenderList(unref(categories), (category, index2) => {
          _push(`<option${ssrRenderAttr("value", category)} data-v-cfe661e2>${ssrInterpolate(category)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="sort-services" data-v-cfe661e2><span class="sort-services-heading" data-v-cfe661e2>sort</span><span class="sort-services-type" data-v-cfe661e2>${ssrInterpolate(unref(sortOrder))}</span></div></nav>`);
    };
  }
});
const _sfc_setup$2$1 = _sfc_main$2$1.setup;
_sfc_main$2$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesNav.vue");
  return _sfc_setup$2$1 ? _sfc_setup$2$1(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2$1, [["__scopeId", "data-v-cfe661e2"]]);
const _sfc_main$1$3 = /* @__PURE__ */ defineComponent({
  __name: "ServicesGrid",
  __ssrInlineRender: true,
  props: {
    services: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_ServicesGridItem = __nuxt_component_1$5;
      if (_ctx.services) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid-wrap" }, _attrs))} data-v-9c95de60><!--[-->`);
        ssrRenderList(_ctx.services, (service) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/services/${service.name}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="rands" data-v-9c95de60${_scopeId}>`);
                _push2(ssrRenderComponent(_component_ServicesGridItem, { service }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "rands" }, [
                    createVNode(_component_ServicesGridItem, { service }, null, 8, ["service"])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-9c95de60> No services </div>`);
      }
    };
  }
});
const _sfc_setup$1$3 = _sfc_main$1$3.setup;
_sfc_main$1$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesGrid.vue");
  return _sfc_setup$1$3 ? _sfc_setup$1$3(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$1$3, [["__scopeId", "data-v-9c95de60"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const category = computed(() => route.query.category);
    const tags = computed(() => route.query.tags);
    const nuxtApp = useNuxtApp();
    const { data: services, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/services", {
      headers: { Accept: "application/json" },
      query: { category, tags },
      getCachedData(key) {
        const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (!cachedData)
          return;
        return cachedData;
      }
    }, "$5empMEoHo2")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ServicesNav = __nuxt_component_0$1;
      const _component_ServicesGrid = __nuxt_component_1$2;
      _push(`<!--[--><header class="container" data-v-6fcc88d3>`);
      _push(ssrRenderComponent(_component_ServicesNav, null, null, _parent));
      _push(`</header><main class="container" data-v-6fcc88d3>`);
      if (unref(pending)) {
        _push(`<h2 data-v-6fcc88d3>Loading...</h2>`);
      } else if (unref(services)) {
        _push(ssrRenderComponent(_component_ServicesGrid, { services: unref(services) }, null, _parent));
      } else {
        _push(`<h2 data-v-6fcc88d3> No services </h2>`);
      }
      _push(`</main><!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6fcc88d3"]]);

const indexOSk_BGrG = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const auth = defineNuxtRouteMiddleware((to) => {
  var _a2, _b2;
  var _a, _b, _c, _d, _e;
  const { status } = useAuth();
  if (status.value === "authenticated")
    return;
  const route = (_b2 = (_a2 = (_b = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.guestRedirectTo) != null ? _a2 : (_e = (_d = (_c = useRuntimeConfig()) == null ? void 0 : _c.public) == null ? void 0 : _d.authJs) == null ? void 0 : _e.guestRedirectTo) != null ? _b2 : "/";
  return navigateTo(route);
});

const authCWVLJ6o5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: auth
});

const guestOnly = defineNuxtRouteMiddleware((to) => {
  var _a2, _b2;
  var _a, _b, _c, _d, _e;
  const { status } = useAuth();
  if (status.value === "authenticated") {
    return navigateTo((_b2 = (_a2 = (_b = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.auth) == null ? void 0 : _b.authenticatedRedirectTo) != null ? _a2 : (_e = (_d = (_c = useRuntimeConfig()) == null ? void 0 : _c.public) == null ? void 0 : _d.authJs) == null ? void 0 : _e.authenticatedRedirectTo) != null ? _b2 : "/");
  }
});

const guestOnlyBNvimKJl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: guestOnly
});

if (!globalThis.crypto) {
  console.log("Polyfilling crypto...");
  import('node:crypto').then((crypto) => {
    Object.defineProperty(globalThis, "crypto", {
      value: crypto.webcrypto,
      writable: false,
      configurable: true
    });
  });
}
const clientAuth = defineNuxtRouteMiddleware(async (to) => {
  return;
});

const clientAuthPUA30Nj7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: clientAuth
});

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "IconCSS",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const appConfig = useAppConfig();
    const props = __props;
    const iconName = computed(() => {
      var _a, _b;
      if ((_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.aliases) == null ? void 0 : _b[props.name]) {
        return appConfig.nuxtIcon.aliases[props.name];
      }
      return props.name;
    });
    const resolvedIcon = computed(() => resolveIconName(iconName.value));
    const iconUrl = computed(() => {
      var _a, _b;
      const customUrl = (_b = (_a = appConfig.nuxtIcon) == null ? void 0 : _a.iconifyApiOptions) == null ? void 0 : _b.url;
      if (customUrl) {
        try {
          new URL(customUrl);
        } catch (e) {
          console.warn("Nuxt IconCSS: Invalid custom Iconify API URL");
          return;
        }
      }
      const baseUrl = customUrl || "https://api.iconify.design";
      return `url('${baseUrl}/${resolvedIcon.value.prefix}/${resolvedIcon.value.name}.svg')`;
    });
    const sSize = computed(() => {
      var _a, _b, _c;
      if (!props.size && typeof ((_a = appConfig.nuxtIcon) == null ? void 0 : _a.size) === "boolean" && !((_b = appConfig.nuxtIcon) == null ? void 0 : _b.size)) {
        return void 0;
      }
      const size = props.size || ((_c = appConfig.nuxtIcon) == null ? void 0 : _c.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--efdb04fa": iconUrl.value
      } };
      _push(`<span${ssrRenderAttrs(mergeProps({
        style: { width: sSize.value, height: sSize.value }
      }, _attrs, _cssVars))} data-v-41e8d397></span>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icon/dist/runtime/IconCSS.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const IconCSS = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-41e8d397"]]);

const IconCSS5JRY1o6g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: IconCSS
});

const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const { session } = useAuth();
    const colorMode = useColorMode();
    const isHidden = ref(true);
    const isMobile = useMediaQuery("(max-width: 550px)");
    const isDark = computed({
      get() {
        return colorMode.value === "dark";
      },
      set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      }
    });
    function closeModal() {
      isHidden.value = true;
    }
    function isFixed() {
      return props.fixed ? "sticky  top-0 left-0 z-40 transition-transform -translate-x-full sm:translate-x-0" : "";
    }
    function openModal() {
      isHidden.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UButton = __nuxt_component_1$7;
      const _component_Icon = __nuxt_component_2$4;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["flex justify-between p-4 h-max relative bgDark", isFixed()]
      }, _attrs))} data-v-35d5c23e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "logo",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-35d5c23e${_scopeId}> Kune </span>`);
          } else {
            return [
              createVNode("span", null, " Kune ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav data-v-35d5c23e><ul${ssrRenderAttrs(mergeProps({
        class: ["nav-small-screen", unref(isHidden) ? "hidden" : "show"]
      }, ssrGetDirectiveProps(_ctx, unref(vOnClickOutside), closeModal)))} data-v-35d5c23e><li data-v-35d5c23e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        onClick: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Browse Services `);
          } else {
            return [
              createTextVNode(" Browse Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-35d5c23e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        onClick: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About `);
          } else {
            return [
              createTextVNode(" About ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-35d5c23e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        onClick: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact us `);
          } else {
            return [
              createTextVNode(" Contact us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-35d5c23e>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: unref(isDark) ? "i-heroicons-sun-20-solid" : "i-heroicons-moon-20-solid",
        color: "orange",
        onClick: ($event) => isDark.value = !unref(isDark)
      }, null, _parent));
      _push(`</li><li data-v-35d5c23e>`);
      if (!unref(session)) {
        _push(ssrRenderComponent(_component_UButton, {
          to: "/api/auth/signin",
          external: "",
          color: "orange"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign in `);
            } else {
              return [
                createTextVNode(" Sign in ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_UButton, {
          to: "/api/auth/signout",
          external: "",
          color: "orange"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign out `);
            } else {
              return [
                createTextVNode(" Sign out ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</li></ul>`);
      if (unref(isMobile)) {
        _push(`<i class="i-blue" data-v-35d5c23e>`);
        if (unref(isHidden)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:menu",
            class: "i-green",
            onClick: openModal
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:close",
            onClick: closeModal
          }, null, _parent));
        }
        _push(`</i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></header>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-35d5c23e"]]);

const verticalNavigation = {
  wrapper: "relative",
  base: "group relative flex items-center gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75",
  ring: "focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
  padding: "px-2.5 py-1.5",
  width: "w-full",
  rounded: "rounded-md",
  font: "font-medium",
  size: "text-sm",
  active: "text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800",
  inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50",
  label: "truncate relative",
  icon: {
    base: "flex-shrink-0 w-5 h-5 relative",
    active: "text-gray-700 dark:text-gray-200",
    inactive: "text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
  },
  avatar: {
    base: "flex-shrink-0",
    size: "2xs"
  },
  badge: {
    base: "flex-shrink-0 ml-auto relative rounded",
    color: "gray",
    variant: "solid",
    size: "xs"
  },
  divider: {
    wrapper: {
      base: "p-2"
    }
  }
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.verticalNavigation, verticalNavigation);
const _sfc_main$1$2 = defineComponent({
  components: {
    UIcon: __nuxt_component_2$3,
    UAvatar: __nuxt_component_1$4,
    UBadge: __nuxt_component_3$1,
    ULink: __nuxt_component_0$5,
    UDivider: __nuxt_component_4
  },
  inheritAttrs: false,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("verticalNavigation", toRef(props, "ui"), config, toRef(props, "class"));
    const sections = computed(() => Array.isArray(props.links[0]) ? props.links : [props.links]);
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      sections,
      getULinkProps,
      twMerge,
      twJoin
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ULink = __nuxt_component_0$5;
  const _component_UAvatar = __nuxt_component_1$4;
  const _component_UIcon = __nuxt_component_2$3;
  const _component_UBadge = __nuxt_component_3$1;
  const _component_UDivider = __nuxt_component_4;
  _push(`<nav${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.sections, (section, sectionIndex) => {
    _push(`<ul><!--[-->`);
    ssrRenderList(section, (link, index) => {
      _push(`<li>`);
      _push(ssrRenderComponent(_component_ULink, mergeProps({ ref_for: true }, _ctx.getULinkProps(link), {
        class: [_ctx.ui.base, _ctx.ui.padding, _ctx.ui.width, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.font, _ctx.ui.size],
        "active-class": _ctx.ui.active,
        "inactive-class": _ctx.ui.inactive,
        onClick: link.click,
        onKeyup: ($event) => $event.target.blur()
      }), {
        default: withCtx(({ isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "avatar", {
              link,
              isActive
            }, () => {
              if (link.avatar) {
                _push2(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, { size: _ctx.ui.avatar.size, ...link.avatar }, {
                  class: [_ctx.ui.avatar.base]
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "icon", {
              link,
              isActive
            }, () => {
              if (link.icon) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: link.icon,
                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {
              link,
              isActive
            }, () => {
              if (link.label) {
                _push2(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.label, link.labelClass))}"${_scopeId}>`);
                if (isActive) {
                  _push2(`<span class="sr-only"${_scopeId}> Current page: </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(link.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "badge", {
              link,
              isActive
            }, () => {
              if (link.badge) {
                _push2(ssrRenderComponent(_component_UBadge, mergeProps({ ref_for: true }, {
                  size: _ctx.ui.badge.size,
                  color: _ctx.ui.badge.color,
                  variant: _ctx.ui.badge.variant,
                  ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
                }, {
                  class: _ctx.ui.badge.base
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "avatar", {
                link,
                isActive
              }, () => [
                link.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                  key: 0,
                  ref_for: true
                }, { size: _ctx.ui.avatar.size, ...link.avatar }, {
                  class: [_ctx.ui.avatar.base]
                }), null, 16, ["class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "icon", {
                link,
                isActive
              }, () => [
                link.icon ? (openBlock(), createBlock(_component_UIcon, {
                  key: 0,
                  name: link.icon,
                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", {
                link,
                isActive
              }, () => [
                link.label ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: _ctx.twMerge(_ctx.ui.label, link.labelClass)
                }, [
                  isActive ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "sr-only"
                  }, " Current page: ")) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(link.label), 1)
                ], 2)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "badge", {
                link,
                isActive
              }, () => [
                link.badge ? (openBlock(), createBlock(_component_UBadge, mergeProps({
                  key: 0,
                  ref_for: true
                }, {
                  size: _ctx.ui.badge.size,
                  color: _ctx.ui.badge.color,
                  variant: _ctx.ui.badge.variant,
                  ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
                }, {
                  class: _ctx.ui.badge.base
                }), null, 16, ["class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</li>`);
    });
    _push(`<!--]-->`);
    if (sectionIndex < _ctx.sections.length - 1) {
      _push(ssrRenderComponent(_component_UDivider, {
        ui: _ctx.ui.divider
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</ul>`);
  });
  _push(`<!--]--></nav>`);
}
const _sfc_setup$1$2 = _sfc_main$1$2.setup;
_sfc_main$1$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/VerticalNavigation.vue");
  return _sfc_setup$1$2 ? _sfc_setup$1$2(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const links = [
      {
        label: "Profile",
        icon: "i-heroicons-face-smile",
        to: "/profile",
        badge: 100
      },
      {
        label: "Services",
        icon: "i-heroicons-chart-bar",
        to: "/profile/services"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = __nuxt_component_0;
      const _component_divider = resolveComponent("divider");
      const _component_UVerticalNavigation = __nuxt_component_1$1;
      const _component_UContainer = __nuxt_component_0$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NavBar, {
        class: "main",
        fixed: true
      }, null, _parent));
      _push(`<aside class="fixed dashboard p-4 top-20 rounded-md left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-10" data-v-776851d6>`);
      _push(ssrRenderComponent(_component_divider, null, null, _parent));
      _push(ssrRenderComponent(_component_UVerticalNavigation, {
        links,
        ui: {
          inactive: "border-transparent dashboard-cards flex justify-between hover:border-gray-400 dark:hover:border-gray-500 text-green-700 hover:text-gray-900 ",
          active: "active"
        }
      }, null, _parent));
      _push(`</aside><main class="pt-4 sm:ml-64" data-v-776851d6>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "p-4 mx-2 rounded-md dashboard max-w-none" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-776851d6${_scopeId}>Dashboard</h2>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("h2", null, "Dashboard"),
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</main><!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-776851d6"]]);

const dashboardCYxRmqPm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: dashboard
});

const _sfc_main$1$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_u_container = __nuxt_component_0$7;
  const _component_NuxtLink = __nuxt_component_0$6;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "p-10" }, _attrs))} data-v-da2811d8>`);
  _push(ssrRenderComponent(_component_u_container, { class: "flex justify-between align-center max-w-6xl" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="footer-logo" data-v-da2811d8${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtLink, {
          class: "logo",
          to: "/"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Kune `);
            } else {
              return [
                createTextVNode(" Kune ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><nav data-v-da2811d8${_scopeId}><ul class="bar" data-v-da2811d8${_scopeId}><li data-v-da2811d8${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` About `);
            } else {
              return [
                createTextVNode(" About ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li><li data-v-da2811d8${_scopeId}>`);
        _push2(ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Contact Us `);
            } else {
              return [
                createTextVNode(" Contact Us ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li></ul></nav><div class="footer-copyright" data-v-da2811d8${_scopeId}><p data-v-da2811d8${_scopeId}>\xA9 copyright ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}</p></div>`);
      } else {
        return [
          createVNode("div", { class: "footer-logo" }, [
            createVNode(_component_NuxtLink, {
              class: "logo",
              to: "/"
            }, {
              default: withCtx(() => [
                createTextVNode(" Kune ")
              ]),
              _: 1
            })
          ]),
          createVNode("nav", null, [
            createVNode("ul", { class: "bar" }, [
              createVNode("li", null, [
                createVNode(_component_NuxtLink, { to: "/about" }, {
                  default: withCtx(() => [
                    createTextVNode(" About ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("li", null, [
                createVNode(_component_NuxtLink, { to: "/contact" }, {
                  default: withCtx(() => [
                    createTextVNode(" Contact Us ")
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          createVNode("div", { class: "footer-copyright" }, [
            createVNode("p", null, "\xA9 copyright " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</footer>`);
}
const _sfc_setup$1$1 = _sfc_main$1$1.setup;
_sfc_main$1$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheFooter.vue");
  return _sfc_setup$1$1 ? _sfc_setup$1$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-da2811d8"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Kune - Digital discovery made easy",
      ogTitle: "Kune",
      description: "Digital discovery made easy",
      ogDescription: "Digital discovery made easy"
      // ogImage: "https://example.com/image.png",
    });
    useHead({
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=yes, maximum-scale=2.0"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavBar = __nuxt_component_0;
      const _component_TheFooter = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NavBar, { class: "main" }, null, _parent));
      _push(`<main class="main" data-v-787ae914>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-787ae914"]]);

const defaultCHkXj61k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _default
});

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(_attrs)} data-v-2b8f3999>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/form.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const form = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2b8f3999"]]);

const formB5HtVcUy = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: form
});

const _sfc_main$1 = {
  __name: "error-404",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 404
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-73a07988><div class="fixed left-0 right-0 spotlight z-10" data-v-73a07988></div><div class="max-w-520px text-center z-20" data-v-73a07988><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-73a07988>${ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-73a07988>${ssrInterpolate(__props.description)}</p><div class="w-full flex items-center justify-center" data-v-73a07988>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.backHome)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.backHome), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-404.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const error404 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-73a07988"]]);

const error404DsUmxGn = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: error404
});

const _sfc_main = {
  __name: "error-500",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 500
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-6fdef64d><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-6fdef64d></div><div class="max-w-520px text-center" data-v-6fdef64d><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-6fdef64d>${ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-6fdef64d>${ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error500 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6fdef64d"]]);

const error500CXqG19Iv = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: error500
});

const tailwind = `/*! tailwindcss v3.4.4 | MIT License | https://tailwindcss.com*/*,:after,:before{border-color:rgb(var(--color-gray-200)/1);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-feature-settings:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{color:rgb(var(--color-gray-400)/1);opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.form-input,.form-multiselect,.form-select,.form-textarea{appearance:none;background-color:#fff;border-color:rgb(var(--color-gray-500)/var(--tw-border-opacity,1));border-radius:0;border-width:1px;font-size:1rem;line-height:1.5rem;padding:.5rem .75rem;--tw-shadow:0 0 #0000}.form-input:focus,.form-multiselect:focus,.form-select:focus,.form-textarea:focus{outline:2px solid #0000;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);border-color:#2563eb;box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.form-input::placeholder,.form-textarea::placeholder{color:rgb(var(--color-gray-500)/var(--tw-text-opacity,1));opacity:1}.form-input::-webkit-datetime-edit-fields-wrapper{padding:0}.form-input::-webkit-date-and-time-value{min-height:1.5em;text-align:inherit}.form-input::-webkit-datetime-edit{display:inline-flex}.form-input::-webkit-datetime-edit,.form-input::-webkit-datetime-edit-day-field,.form-input::-webkit-datetime-edit-hour-field,.form-input::-webkit-datetime-edit-meridiem-field,.form-input::-webkit-datetime-edit-millisecond-field,.form-input::-webkit-datetime-edit-minute-field,.form-input::-webkit-datetime-edit-month-field,.form-input::-webkit-datetime-edit-second-field,.form-input::-webkit-datetime-edit-year-field{padding-bottom:0;padding-top:0}.form-select{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='rgb(var(--color-gray-500) / var(--tw-stroke-opacity, 1))' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}.form-select:where([size]:not([size="1"])){background-image:none;background-position:0 0;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}.form-checkbox,.form-radio{appearance:none;background-color:#fff;background-origin:border-box;border-color:rgb(var(--color-gray-500)/var(--tw-border-opacity,1));border-width:1px;color:#2563eb;display:inline-block;flex-shrink:0;height:1rem;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;-webkit-user-select:none;user-select:none;vertical-align:middle;width:1rem;--tw-shadow:0 0 #0000}.form-checkbox{border-radius:0}.form-radio{border-radius:100%}.form-checkbox:focus,.form-radio:focus{outline:2px solid #0000;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:2px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.form-checkbox:checked,.form-radio:checked{background-color:currentColor;background-position:50%;background-repeat:no-repeat;background-size:100% 100%;border-color:#0000}.form-checkbox:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E")}@media (forced-colors:active) {.form-checkbox:checked{appearance:auto}}.form-radio:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E")}@media (forced-colors:active) {.form-radio:checked{appearance:auto}}.form-checkbox:checked:focus,.form-checkbox:checked:hover,.form-checkbox:indeterminate,.form-radio:checked:focus,.form-radio:checked:hover{background-color:currentColor;border-color:#0000}.form-checkbox:indeterminate{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3E%3C/svg%3E");background-position:50%;background-repeat:no-repeat;background-size:100% 100%}@media (forced-colors:active) {.form-checkbox:indeterminate{appearance:auto}}.form-checkbox:indeterminate:focus,.form-checkbox:indeterminate:hover{background-color:currentColor;border-color:#0000}.i-heroicons-arrow-path-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39m1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-arrow-path-20-solid,.i-heroicons-arrows-up-down-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-arrows-up-down-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1v8.59a.75.75 0 0 0 1.5 0V4.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L2.2 5.74a.75.75 0 0 0 .04 1.06m8 6.4a.75.75 0 0 0-.04 1.06l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75a.75.75 0 0 0-1.5 0v8.59l-1.95-2.1a.75.75 0 0 0-1.06-.04' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-bars-arrow-down-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75M2 7.5a.75.75 0 0 1 .75-.75h7.508a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5M14 7a.75.75 0 0 1 .75.75v6.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V7.75A.75.75 0 0 1 14 7M2 11.25a.75.75 0 0 1 .75-.75h4.562a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-bars-arrow-down-20-solid,.i-heroicons-bars-arrow-up-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-bars-arrow-up-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75M2 7.5a.75.75 0 0 1 .75-.75h6.365a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5M14 7a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02l-1.95-2.1v6.59a.75.75 0 0 1-1.5 0V9.66l-1.95 2.1a.75.75 0 1 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 14 7M2 11.25a.75.75 0 0 1 .75-.75H7A.75.75 0 0 1 7 12H2.75a.75.75 0 0 1-.75-.75' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chart-bar{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125z'/%3E%3C/svg%3E")}.i-heroicons-chart-bar,.i-heroicons-check-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-check-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M16.705 4.153a.75.75 0 0 1 .142 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-double-left-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-double-left-20-solid,.i-heroicons-chevron-double-right-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-chevron-double-right-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06zM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-down-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-down-20-solid,.i-heroicons-chevron-left-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-chevron-left-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-right-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-chevron-right-20-solid,.i-heroicons-circle-stack-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-circle-stack-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4m5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178a7 7 0 0 0 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37M3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822a7 7 0 0 1-1.306.953C14.162 15.006 12.146 15.5 10 15.5s-4.162-.494-5.694-1.37A7 7 0 0 1 3 13.179' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-face-smile{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75m-.375 0h.008v.015h-.008zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75m-.375 0h.008v.015h-.008z'/%3E%3C/svg%3E")}.i-heroicons-face-smile,.i-heroicons-magnifying-glass-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-magnifying-glass-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-minus-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-minus-20-solid,.i-heroicons-moon-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-moon-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-pencil-square-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65'/%3E%3Cpath d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25z'/%3E%3C/svg%3E")}.i-heroicons-pencil-square-20-solid,.i-heroicons-sun-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-sun-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2m0 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15m0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6m5.657-1.596a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06zm-9.193 9.192a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06zM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10M5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10m9.596 5.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06zM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06z'/%3E%3C/svg%3E")}.i-heroicons-trash-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443q-1.193.115-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41 41 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1zM10 4q1.26 0 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325Q8.74 4 10 4M8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06z' clip-rule='evenodd'/%3E%3C/svg%3E")}.i-heroicons-trash-20-solid,.i-heroicons-x-mark-20-solid{background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em}.i-heroicons-x-mark-20-solid{--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94z'/%3E%3C/svg%3E")}.sr-only{height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;clip:rect(0,0,0,0);border-width:0;white-space:nowrap}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{inset:0}.inset-x-0{left:0;right:0}.inset-y-0{bottom:0;top:0}.-bottom-1{bottom:-.25rem}.-bottom-\\[0\\.5px\\]{bottom:-.5px}.-left-1{left:-.25rem}.-right-1{right:-.25rem}.-top-1{top:-.25rem}.bottom-0{bottom:0}.bottom-4{bottom:1rem}.end-0{inset-inline-end:0}.end-4{inset-inline-end:1rem}.left-0{left:0}.left-4{left:1rem}.left-\\[4px\\]{left:4px}.right-0{right:0}.right-4{right:1rem}.start-0{inset-inline-start:0}.start-4{inset-inline-start:1rem}.top-0{top:0}.top-1\\/2{top:50%}.top-20{top:5rem}.top-\\[4px\\]{top:4px}.z-10{z-index:10}.z-20{z-index:20}.z-40{z-index:40}.z-50{z-index:50}.z-\\[1\\]{z-index:1}.z-\\[55\\]{z-index:55}.col-span-3{grid-column:span 3/span 3}.col-start-1{grid-column-start:1}.row-start-1{grid-row-start:1}.-m-1{margin:-.25rem}.-m-1\\.5{margin:-.375rem}.-mx-1{margin-left:-.25rem;margin-right:-.25rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-2{margin-left:.5rem;margin-right:.5rem}.mx-3{margin-left:.75rem;margin-right:.75rem}.mx-auto{margin-left:auto;margin-right:auto}.my-2{margin-bottom:.5rem;margin-top:.5rem}.my-5{margin-bottom:1.25rem;margin-top:1.25rem}.-me-1{margin-inline-end:-.25rem}.-me-1\\.5{margin-inline-end:-.375rem}.-mt-1{margin-top:-.25rem}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-4{margin-bottom:1rem}.ml-auto{margin-left:auto}.mr-2{margin-right:.5rem}.ms-3{margin-inline-start:.75rem}.ms-auto{margin-inline-start:auto}.mt-0{margin-top:0}.mt-1{margin-top:.25rem}.mt-10{margin-top:2.5rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.line-clamp-1{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:1}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.inline-grid{display:inline-grid}.hidden{display:none}.h-0{height:0}.h-0\\.5{height:.125rem}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-16{height:4rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-\\[4px\\]{height:4px}.h-\\[5px\\]{height:5px}.h-full{height:100%}.h-max{height:max-content}.h-px{height:1px}.h-screen{height:100vh}.max-h-60{max-height:15rem}.min-h-0{min-height:0}.min-h-full{min-height:100%}.w-0{width:0}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-3{width:.75rem}.w-4{width:1rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-\\[3\\.25rem\\]{width:3.25rem}.w-\\[3\\.75rem\\]{width:3.75rem}.w-\\[calc\\(100\\%\\+0\\.5rem\\)\\]{width:calc(100% + .5rem)}.w-fit{width:fit-content}.w-full{width:100%}.w-px{width:1px}.w-screen{width:100vw}.min-w-0{min-width:0}.min-w-\\[0\\.375rem\\]{min-width:.375rem}.min-w-\\[0\\.5rem\\]{min-width:.5rem}.min-w-\\[0\\.625rem\\]{min-width:.625rem}.min-w-\\[0\\.75rem\\]{min-width:.75rem}.min-w-\\[0\\.875rem\\]{min-width:.875rem}.min-w-\\[1\\.25rem\\]{min-width:1.25rem}.min-w-\\[16px\\]{min-width:16px}.min-w-\\[1rem\\]{min-width:1rem}.min-w-\\[20px\\]{min-width:20px}.min-w-\\[24px\\]{min-width:24px}.min-w-\\[300px\\]{min-width:300px}.min-w-\\[4px\\]{min-width:4px}.min-w-\\[5px\\]{min-width:5px}.min-w-fit{min-width:fit-content}.min-w-full{min-width:100%}.min-w-max{min-width:max-content}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.max-w-none{max-width:none}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-none{flex:none}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x:-50%}.-translate-x-1\\/2,.-translate-x-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x:-100%}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.translate-x-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x:0px}.translate-x-1\\/2{--tw-translate-x:50%}.translate-x-1\\/2,.translate-x-2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-2{--tw-translate-x:0.5rem}.translate-x-2\\.5{--tw-translate-x:0.625rem}.translate-x-2\\.5,.translate-x-3{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-3{--tw-translate-x:0.75rem}.translate-x-4{--tw-translate-x:1rem}.translate-x-4,.translate-x-5{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-5{--tw-translate-x:1.25rem}.translate-x-6{--tw-translate-x:1.5rem}.translate-x-6,.translate-x-7{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-7{--tw-translate-x:1.75rem}.translate-x-full{--tw-translate-x:100%}.translate-x-full,.translate-y-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-0{--tw-translate-y:0px}.translate-y-1{--tw-translate-y:0.25rem}.translate-y-1,.translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-1\\/2{--tw-translate-y:50%}.translate-y-2{--tw-translate-y:0.5rem}.translate-y-2,.translate-y-4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-4{--tw-translate-y:1rem}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.scale-95{--tw-scale-x:.95;--tw-scale-y:.95}.scale-95,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;user-select:none}.resize-none{resize:none}.resize{resize:both}.snap-x{scroll-snap-type:x var(--tw-scroll-snap-strictness)}.snap-mandatory{--tw-scroll-snap-strictness:mandatory}.snap-center{scroll-snap-align:center}.scroll-py-1{scroll-padding-bottom:.25rem;scroll-padding-top:.25rem}.scroll-py-2{scroll-padding-bottom:.5rem;scroll-padding-top:.5rem}.list-inside{list-style-position:inside}.list-disc{list-style-type:disc}.appearance-none{appearance:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.flex-col{flex-direction:column}.flex-nowrap{flex-wrap:nowrap}.content-center{align-content:center}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0{gap:0}.gap-0\\.5{gap:.125rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-16{gap:4rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-x-1{column-gap:.25rem}.gap-x-1\\.5{column-gap:.375rem}.gap-x-2{column-gap:.5rem}.gap-x-2\\.5{column-gap:.625rem}.-space-x-px>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(-1px*(1 - var(--tw-space-x-reverse)));margin-right:calc(-1px*var(--tw-space-x-reverse))}.-space-y-px>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(-1px*var(--tw-space-y-reverse));margin-top:calc(-1px*(1 - var(--tw-space-y-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.5rem*var(--tw-space-y-reverse));margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.75rem*var(--tw-space-y-reverse));margin-top:calc(.75rem*(1 - var(--tw-space-y-reverse)))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse:0;border-bottom-width:calc(1px*var(--tw-divide-y-reverse));border-top-width:calc(1px*(1 - var(--tw-divide-y-reverse)))}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--color-gray-100)/var(--tw-divide-opacity))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--color-gray-200)/var(--tw-divide-opacity))}.divide-gray-300>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--color-gray-300)/var(--tw-divide-opacity))}.divide-green-500>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(34 197 94/var(--tw-divide-opacity))}.self-center{align-self:center}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-y-hidden{overflow-y:hidden}.scroll-smooth{scroll-behavior:smooth}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-3xl{border-radius:1.5rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-none{border-radius:0}.rounded-sm{border-radius:.125rem}.rounded-xl{border-radius:.75rem}.rounded-b{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-b-2xl{border-bottom-left-radius:1rem;border-bottom-right-radius:1rem}.rounded-b-3xl{border-bottom-left-radius:1.5rem;border-bottom-right-radius:1.5rem}.rounded-b-full{border-bottom-left-radius:9999px;border-bottom-right-radius:9999px}.rounded-b-lg{border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem}.rounded-b-md{border-bottom-left-radius:.375rem;border-bottom-right-radius:.375rem}.rounded-b-none{border-bottom-left-radius:0;border-bottom-right-radius:0}.rounded-b-sm{border-bottom-left-radius:.125rem;border-bottom-right-radius:.125rem}.rounded-b-xl{border-bottom-left-radius:.75rem;border-bottom-right-radius:.75rem}.rounded-e{border-end-end-radius:.25rem;border-start-end-radius:.25rem}.rounded-e-2xl{border-end-end-radius:1rem;border-start-end-radius:1rem}.rounded-e-3xl{border-end-end-radius:1.5rem;border-start-end-radius:1.5rem}.rounded-e-full{border-end-end-radius:9999px;border-start-end-radius:9999px}.rounded-e-lg{border-end-end-radius:.5rem;border-start-end-radius:.5rem}.rounded-e-md{border-end-end-radius:.375rem;border-start-end-radius:.375rem}.rounded-e-none{border-end-end-radius:0;border-start-end-radius:0}.rounded-e-sm{border-end-end-radius:.125rem;border-start-end-radius:.125rem}.rounded-e-xl{border-end-end-radius:.75rem;border-start-end-radius:.75rem}.rounded-s{border-end-start-radius:.25rem;border-start-start-radius:.25rem}.rounded-s-2xl{border-end-start-radius:1rem;border-start-start-radius:1rem}.rounded-s-3xl{border-end-start-radius:1.5rem;border-start-start-radius:1.5rem}.rounded-s-full{border-end-start-radius:9999px;border-start-start-radius:9999px}.rounded-s-lg{border-end-start-radius:.5rem;border-start-start-radius:.5rem}.rounded-s-md{border-end-start-radius:.375rem;border-start-start-radius:.375rem}.rounded-s-none{border-end-start-radius:0;border-start-start-radius:0}.rounded-s-sm{border-end-start-radius:.125rem;border-start-start-radius:.125rem}.rounded-s-xl{border-end-start-radius:.75rem;border-start-start-radius:.75rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-t-2xl{border-top-left-radius:1rem;border-top-right-radius:1rem}.rounded-t-3xl{border-top-left-radius:1.5rem;border-top-right-radius:1.5rem}.rounded-t-full{border-top-left-radius:9999px;border-top-right-radius:9999px}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.rounded-t-none{border-top-left-radius:0;border-top-right-radius:0}.rounded-t-sm{border-top-left-radius:.125rem;border-top-right-radius:.125rem}.rounded-t-xl{border-top-left-radius:.75rem;border-top-right-radius:.75rem}.border{border-width:1px}.border-0{border-width:0}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-s{border-inline-start-width:1px}.border-s-\\[2px\\]{border-inline-start-width:2px}.border-s-\\[3px\\]{border-inline-start-width:3px}.border-s-\\[4px\\]{border-inline-start-width:4px}.border-s-\\[5px\\]{border-inline-start-width:5px}.border-s-\\[6px\\]{border-inline-start-width:6px}.border-t{border-top-width:1px}.border-t-\\[2px\\]{border-top-width:2px}.border-t-\\[3px\\]{border-top-width:3px}.border-t-\\[4px\\]{border-top-width:4px}.border-t-\\[5px\\]{border-top-width:5px}.border-t-\\[6px\\]{border-top-width:6px}.border-solid{border-style:solid}.border-dashed{border-style:dashed}.border-dotted{border-style:dotted}.border-none{border-style:none}.border-gray-200{--tw-border-opacity:1;border-color:rgb(var(--color-gray-200)/var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(var(--color-gray-300)/var(--tw-border-opacity))}.border-gray-600{--tw-border-opacity:1;border-color:rgb(var(--color-gray-600)/var(--tw-border-opacity))}.border-transparent{border-color:#0000}.bg-amber-400{--tw-bg-opacity:1;background-color:rgb(251 191 36/var(--tw-bg-opacity))}.bg-amber-400\\/0{background-color:#fbbf2400}.bg-amber-400\\/10{background-color:#fbbf241a}.bg-amber-400\\/100{background-color:#fbbf24}.bg-amber-400\\/15{background-color:#fbbf2426}.bg-amber-400\\/20{background-color:#fbbf2433}.bg-amber-400\\/25{background-color:#fbbf2440}.bg-amber-400\\/30{background-color:#fbbf244d}.bg-amber-400\\/35{background-color:#fbbf2459}.bg-amber-400\\/40{background-color:#fbbf2466}.bg-amber-400\\/45{background-color:#fbbf2473}.bg-amber-400\\/5{background-color:#fbbf240d}.bg-amber-400\\/50{background-color:#fbbf2480}.bg-amber-400\\/55{background-color:#fbbf248c}.bg-amber-400\\/60{background-color:#fbbf2499}.bg-amber-400\\/65{background-color:#fbbf24a6}.bg-amber-400\\/70{background-color:#fbbf24b3}.bg-amber-400\\/75{background-color:#fbbf24bf}.bg-amber-400\\/80{background-color:#fbbf24cc}.bg-amber-400\\/85{background-color:#fbbf24d9}.bg-amber-400\\/90{background-color:#fbbf24e6}.bg-amber-400\\/95{background-color:#fbbf24f2}.bg-amber-500{--tw-bg-opacity:1;background-color:rgb(245 158 11/var(--tw-bg-opacity))}.bg-amber-500\\/0{background-color:#f59e0b00}.bg-amber-500\\/10{background-color:#f59e0b1a}.bg-amber-500\\/100{background-color:#f59e0b}.bg-amber-500\\/15{background-color:#f59e0b26}.bg-amber-500\\/20{background-color:#f59e0b33}.bg-amber-500\\/25{background-color:#f59e0b40}.bg-amber-500\\/30{background-color:#f59e0b4d}.bg-amber-500\\/35{background-color:#f59e0b59}.bg-amber-500\\/40{background-color:#f59e0b66}.bg-amber-500\\/45{background-color:#f59e0b73}.bg-amber-500\\/5{background-color:#f59e0b0d}.bg-amber-500\\/50{background-color:#f59e0b80}.bg-amber-500\\/55{background-color:#f59e0b8c}.bg-amber-500\\/60{background-color:#f59e0b99}.bg-amber-500\\/65{background-color:#f59e0ba6}.bg-amber-500\\/70{background-color:#f59e0bb3}.bg-amber-500\\/75{background-color:#f59e0bbf}.bg-amber-500\\/80{background-color:#f59e0bcc}.bg-amber-500\\/85{background-color:#f59e0bd9}.bg-amber-500\\/90{background-color:#f59e0be6}.bg-amber-500\\/95{background-color:#f59e0bf2}.bg-blue-400{--tw-bg-opacity:1;background-color:rgb(96 165 250/var(--tw-bg-opacity))}.bg-blue-400\\/0{background-color:#60a5fa00}.bg-blue-400\\/10{background-color:#60a5fa1a}.bg-blue-400\\/100{background-color:#60a5fa}.bg-blue-400\\/15{background-color:#60a5fa26}.bg-blue-400\\/20{background-color:#60a5fa33}.bg-blue-400\\/25{background-color:#60a5fa40}.bg-blue-400\\/30{background-color:#60a5fa4d}.bg-blue-400\\/35{background-color:#60a5fa59}.bg-blue-400\\/40{background-color:#60a5fa66}.bg-blue-400\\/45{background-color:#60a5fa73}.bg-blue-400\\/5{background-color:#60a5fa0d}.bg-blue-400\\/50{background-color:#60a5fa80}.bg-blue-400\\/55{background-color:#60a5fa8c}.bg-blue-400\\/60{background-color:#60a5fa99}.bg-blue-400\\/65{background-color:#60a5faa6}.bg-blue-400\\/70{background-color:#60a5fab3}.bg-blue-400\\/75{background-color:#60a5fabf}.bg-blue-400\\/80{background-color:#60a5facc}.bg-blue-400\\/85{background-color:#60a5fad9}.bg-blue-400\\/90{background-color:#60a5fae6}.bg-blue-400\\/95{background-color:#60a5faf2}.bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246/var(--tw-bg-opacity))}.bg-blue-500\\/0{background-color:#3b82f600}.bg-blue-500\\/10{background-color:#3b82f61a}.bg-blue-500\\/100{background-color:#3b82f6}.bg-blue-500\\/15{background-color:#3b82f626}.bg-blue-500\\/20{background-color:#3b82f633}.bg-blue-500\\/25{background-color:#3b82f640}.bg-blue-500\\/30{background-color:#3b82f64d}.bg-blue-500\\/35{background-color:#3b82f659}.bg-blue-500\\/40{background-color:#3b82f666}.bg-blue-500\\/45{background-color:#3b82f673}.bg-blue-500\\/5{background-color:#3b82f60d}.bg-blue-500\\/50{background-color:#3b82f680}.bg-blue-500\\/55{background-color:#3b82f68c}.bg-blue-500\\/60{background-color:#3b82f699}.bg-blue-500\\/65{background-color:#3b82f6a6}.bg-blue-500\\/70{background-color:#3b82f6b3}.bg-blue-500\\/75{background-color:#3b82f6bf}.bg-blue-500\\/80{background-color:#3b82f6cc}.bg-blue-500\\/85{background-color:#3b82f6d9}.bg-blue-500\\/90{background-color:#3b82f6e6}.bg-blue-500\\/95{background-color:#3b82f6f2}.bg-current{background-color:currentColor}.bg-cyan-400{--tw-bg-opacity:1;background-color:rgb(34 211 238/var(--tw-bg-opacity))}.bg-cyan-400\\/0{background-color:#22d3ee00}.bg-cyan-400\\/10{background-color:#22d3ee1a}.bg-cyan-400\\/100{background-color:#22d3ee}.bg-cyan-400\\/15{background-color:#22d3ee26}.bg-cyan-400\\/20{background-color:#22d3ee33}.bg-cyan-400\\/25{background-color:#22d3ee40}.bg-cyan-400\\/30{background-color:#22d3ee4d}.bg-cyan-400\\/35{background-color:#22d3ee59}.bg-cyan-400\\/40{background-color:#22d3ee66}.bg-cyan-400\\/45{background-color:#22d3ee73}.bg-cyan-400\\/5{background-color:#22d3ee0d}.bg-cyan-400\\/50{background-color:#22d3ee80}.bg-cyan-400\\/55{background-color:#22d3ee8c}.bg-cyan-400\\/60{background-color:#22d3ee99}.bg-cyan-400\\/65{background-color:#22d3eea6}.bg-cyan-400\\/70{background-color:#22d3eeb3}.bg-cyan-400\\/75{background-color:#22d3eebf}.bg-cyan-400\\/80{background-color:#22d3eecc}.bg-cyan-400\\/85{background-color:#22d3eed9}.bg-cyan-400\\/90{background-color:#22d3eee6}.bg-cyan-400\\/95{background-color:#22d3eef2}.bg-cyan-500{--tw-bg-opacity:1;background-color:rgb(6 182 212/var(--tw-bg-opacity))}.bg-cyan-500\\/0{background-color:#06b6d400}.bg-cyan-500\\/10{background-color:#06b6d41a}.bg-cyan-500\\/100{background-color:#06b6d4}.bg-cyan-500\\/15{background-color:#06b6d426}.bg-cyan-500\\/20{background-color:#06b6d433}.bg-cyan-500\\/25{background-color:#06b6d440}.bg-cyan-500\\/30{background-color:#06b6d44d}.bg-cyan-500\\/35{background-color:#06b6d459}.bg-cyan-500\\/40{background-color:#06b6d466}.bg-cyan-500\\/45{background-color:#06b6d473}.bg-cyan-500\\/5{background-color:#06b6d40d}.bg-cyan-500\\/50{background-color:#06b6d480}.bg-cyan-500\\/55{background-color:#06b6d48c}.bg-cyan-500\\/60{background-color:#06b6d499}.bg-cyan-500\\/65{background-color:#06b6d4a6}.bg-cyan-500\\/70{background-color:#06b6d4b3}.bg-cyan-500\\/75{background-color:#06b6d4bf}.bg-cyan-500\\/80{background-color:#06b6d4cc}.bg-cyan-500\\/85{background-color:#06b6d4d9}.bg-cyan-500\\/90{background-color:#06b6d4e6}.bg-cyan-500\\/95{background-color:#06b6d4f2}.bg-emerald-400{--tw-bg-opacity:1;background-color:rgb(52 211 153/var(--tw-bg-opacity))}.bg-emerald-400\\/0{background-color:#34d39900}.bg-emerald-400\\/10{background-color:#34d3991a}.bg-emerald-400\\/100{background-color:#34d399}.bg-emerald-400\\/15{background-color:#34d39926}.bg-emerald-400\\/20{background-color:#34d39933}.bg-emerald-400\\/25{background-color:#34d39940}.bg-emerald-400\\/30{background-color:#34d3994d}.bg-emerald-400\\/35{background-color:#34d39959}.bg-emerald-400\\/40{background-color:#34d39966}.bg-emerald-400\\/45{background-color:#34d39973}.bg-emerald-400\\/5{background-color:#34d3990d}.bg-emerald-400\\/50{background-color:#34d39980}.bg-emerald-400\\/55{background-color:#34d3998c}.bg-emerald-400\\/60{background-color:#34d39999}.bg-emerald-400\\/65{background-color:#34d399a6}.bg-emerald-400\\/70{background-color:#34d399b3}.bg-emerald-400\\/75{background-color:#34d399bf}.bg-emerald-400\\/80{background-color:#34d399cc}.bg-emerald-400\\/85{background-color:#34d399d9}.bg-emerald-400\\/90{background-color:#34d399e6}.bg-emerald-400\\/95{background-color:#34d399f2}.bg-emerald-500{--tw-bg-opacity:1;background-color:rgb(16 185 129/var(--tw-bg-opacity))}.bg-emerald-500\\/0{background-color:#10b98100}.bg-emerald-500\\/10{background-color:#10b9811a}.bg-emerald-500\\/100{background-color:#10b981}.bg-emerald-500\\/15{background-color:#10b98126}.bg-emerald-500\\/20{background-color:#10b98133}.bg-emerald-500\\/25{background-color:#10b98140}.bg-emerald-500\\/30{background-color:#10b9814d}.bg-emerald-500\\/35{background-color:#10b98159}.bg-emerald-500\\/40{background-color:#10b98166}.bg-emerald-500\\/45{background-color:#10b98173}.bg-emerald-500\\/5{background-color:#10b9810d}.bg-emerald-500\\/50{background-color:#10b98180}.bg-emerald-500\\/55{background-color:#10b9818c}.bg-emerald-500\\/60{background-color:#10b98199}.bg-emerald-500\\/65{background-color:#10b981a6}.bg-emerald-500\\/70{background-color:#10b981b3}.bg-emerald-500\\/75{background-color:#10b981bf}.bg-emerald-500\\/80{background-color:#10b981cc}.bg-emerald-500\\/85{background-color:#10b981d9}.bg-emerald-500\\/90{background-color:#10b981e6}.bg-emerald-500\\/95{background-color:#10b981f2}.bg-fuchsia-400{--tw-bg-opacity:1;background-color:rgb(232 121 249/var(--tw-bg-opacity))}.bg-fuchsia-400\\/0{background-color:#e879f900}.bg-fuchsia-400\\/10{background-color:#e879f91a}.bg-fuchsia-400\\/100{background-color:#e879f9}.bg-fuchsia-400\\/15{background-color:#e879f926}.bg-fuchsia-400\\/20{background-color:#e879f933}.bg-fuchsia-400\\/25{background-color:#e879f940}.bg-fuchsia-400\\/30{background-color:#e879f94d}.bg-fuchsia-400\\/35{background-color:#e879f959}.bg-fuchsia-400\\/40{background-color:#e879f966}.bg-fuchsia-400\\/45{background-color:#e879f973}.bg-fuchsia-400\\/5{background-color:#e879f90d}.bg-fuchsia-400\\/50{background-color:#e879f980}.bg-fuchsia-400\\/55{background-color:#e879f98c}.bg-fuchsia-400\\/60{background-color:#e879f999}.bg-fuchsia-400\\/65{background-color:#e879f9a6}.bg-fuchsia-400\\/70{background-color:#e879f9b3}.bg-fuchsia-400\\/75{background-color:#e879f9bf}.bg-fuchsia-400\\/80{background-color:#e879f9cc}.bg-fuchsia-400\\/85{background-color:#e879f9d9}.bg-fuchsia-400\\/90{background-color:#e879f9e6}.bg-fuchsia-400\\/95{background-color:#e879f9f2}.bg-fuchsia-500{--tw-bg-opacity:1;background-color:rgb(217 70 239/var(--tw-bg-opacity))}.bg-fuchsia-500\\/0{background-color:#d946ef00}.bg-fuchsia-500\\/10{background-color:#d946ef1a}.bg-fuchsia-500\\/100{background-color:#d946ef}.bg-fuchsia-500\\/15{background-color:#d946ef26}.bg-fuchsia-500\\/20{background-color:#d946ef33}.bg-fuchsia-500\\/25{background-color:#d946ef40}.bg-fuchsia-500\\/30{background-color:#d946ef4d}.bg-fuchsia-500\\/35{background-color:#d946ef59}.bg-fuchsia-500\\/40{background-color:#d946ef66}.bg-fuchsia-500\\/45{background-color:#d946ef73}.bg-fuchsia-500\\/5{background-color:#d946ef0d}.bg-fuchsia-500\\/50{background-color:#d946ef80}.bg-fuchsia-500\\/55{background-color:#d946ef8c}.bg-fuchsia-500\\/60{background-color:#d946ef99}.bg-fuchsia-500\\/65{background-color:#d946efa6}.bg-fuchsia-500\\/70{background-color:#d946efb3}.bg-fuchsia-500\\/75{background-color:#d946efbf}.bg-fuchsia-500\\/80{background-color:#d946efcc}.bg-fuchsia-500\\/85{background-color:#d946efd9}.bg-fuchsia-500\\/90{background-color:#d946efe6}.bg-fuchsia-500\\/95{background-color:#d946eff2}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-100)/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.bg-gray-200\\/75{background-color:rgb(var(--color-gray-200)/.75)}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-50)/var(--tw-bg-opacity))}.bg-gray-500{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-500)/var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.bg-green-400{--tw-bg-opacity:1;background-color:rgb(74 222 128/var(--tw-bg-opacity))}.bg-green-400\\/0{background-color:#4ade8000}.bg-green-400\\/10{background-color:#4ade801a}.bg-green-400\\/100{background-color:#4ade80}.bg-green-400\\/15{background-color:#4ade8026}.bg-green-400\\/20{background-color:#4ade8033}.bg-green-400\\/25{background-color:#4ade8040}.bg-green-400\\/30{background-color:#4ade804d}.bg-green-400\\/35{background-color:#4ade8059}.bg-green-400\\/40{background-color:#4ade8066}.bg-green-400\\/45{background-color:#4ade8073}.bg-green-400\\/5{background-color:#4ade800d}.bg-green-400\\/50{background-color:#4ade8080}.bg-green-400\\/55{background-color:#4ade808c}.bg-green-400\\/60{background-color:#4ade8099}.bg-green-400\\/65{background-color:#4ade80a6}.bg-green-400\\/70{background-color:#4ade80b3}.bg-green-400\\/75{background-color:#4ade80bf}.bg-green-400\\/80{background-color:#4ade80cc}.bg-green-400\\/85{background-color:#4ade80d9}.bg-green-400\\/90{background-color:#4ade80e6}.bg-green-400\\/95{background-color:#4ade80f2}.bg-green-500{--tw-bg-opacity:1;background-color:rgb(34 197 94/var(--tw-bg-opacity))}.bg-green-500\\/0{background-color:#22c55e00}.bg-green-500\\/10{background-color:#22c55e1a}.bg-green-500\\/100{background-color:#22c55e}.bg-green-500\\/15{background-color:#22c55e26}.bg-green-500\\/20{background-color:#22c55e33}.bg-green-500\\/25{background-color:#22c55e40}.bg-green-500\\/30{background-color:#22c55e4d}.bg-green-500\\/35{background-color:#22c55e59}.bg-green-500\\/40{background-color:#22c55e66}.bg-green-500\\/45{background-color:#22c55e73}.bg-green-500\\/5{background-color:#22c55e0d}.bg-green-500\\/50{background-color:#22c55e80}.bg-green-500\\/55{background-color:#22c55e8c}.bg-green-500\\/60{background-color:#22c55e99}.bg-green-500\\/65{background-color:#22c55ea6}.bg-green-500\\/70{background-color:#22c55eb3}.bg-green-500\\/75{background-color:#22c55ebf}.bg-green-500\\/80{background-color:#22c55ecc}.bg-green-500\\/85{background-color:#22c55ed9}.bg-green-500\\/90{background-color:#22c55ee6}.bg-green-500\\/95{background-color:#22c55ef2}.bg-indigo-400{--tw-bg-opacity:1;background-color:rgb(129 140 248/var(--tw-bg-opacity))}.bg-indigo-400\\/0{background-color:#818cf800}.bg-indigo-400\\/10{background-color:#818cf81a}.bg-indigo-400\\/100{background-color:#818cf8}.bg-indigo-400\\/15{background-color:#818cf826}.bg-indigo-400\\/20{background-color:#818cf833}.bg-indigo-400\\/25{background-color:#818cf840}.bg-indigo-400\\/30{background-color:#818cf84d}.bg-indigo-400\\/35{background-color:#818cf859}.bg-indigo-400\\/40{background-color:#818cf866}.bg-indigo-400\\/45{background-color:#818cf873}.bg-indigo-400\\/5{background-color:#818cf80d}.bg-indigo-400\\/50{background-color:#818cf880}.bg-indigo-400\\/55{background-color:#818cf88c}.bg-indigo-400\\/60{background-color:#818cf899}.bg-indigo-400\\/65{background-color:#818cf8a6}.bg-indigo-400\\/70{background-color:#818cf8b3}.bg-indigo-400\\/75{background-color:#818cf8bf}.bg-indigo-400\\/80{background-color:#818cf8cc}.bg-indigo-400\\/85{background-color:#818cf8d9}.bg-indigo-400\\/90{background-color:#818cf8e6}.bg-indigo-400\\/95{background-color:#818cf8f2}.bg-indigo-500{--tw-bg-opacity:1;background-color:rgb(99 102 241/var(--tw-bg-opacity))}.bg-indigo-500\\/0{background-color:#6366f100}.bg-indigo-500\\/10{background-color:#6366f11a}.bg-indigo-500\\/100{background-color:#6366f1}.bg-indigo-500\\/15{background-color:#6366f126}.bg-indigo-500\\/20{background-color:#6366f133}.bg-indigo-500\\/25{background-color:#6366f140}.bg-indigo-500\\/30{background-color:#6366f14d}.bg-indigo-500\\/35{background-color:#6366f159}.bg-indigo-500\\/40{background-color:#6366f166}.bg-indigo-500\\/45{background-color:#6366f173}.bg-indigo-500\\/5{background-color:#6366f10d}.bg-indigo-500\\/50{background-color:#6366f180}.bg-indigo-500\\/55{background-color:#6366f18c}.bg-indigo-500\\/60{background-color:#6366f199}.bg-indigo-500\\/65{background-color:#6366f1a6}.bg-indigo-500\\/70{background-color:#6366f1b3}.bg-indigo-500\\/75{background-color:#6366f1bf}.bg-indigo-500\\/80{background-color:#6366f1cc}.bg-indigo-500\\/85{background-color:#6366f1d9}.bg-indigo-500\\/90{background-color:#6366f1e6}.bg-indigo-500\\/95{background-color:#6366f1f2}.bg-lime-400{--tw-bg-opacity:1;background-color:rgb(163 230 53/var(--tw-bg-opacity))}.bg-lime-400\\/0{background-color:#a3e63500}.bg-lime-400\\/10{background-color:#a3e6351a}.bg-lime-400\\/100{background-color:#a3e635}.bg-lime-400\\/15{background-color:#a3e63526}.bg-lime-400\\/20{background-color:#a3e63533}.bg-lime-400\\/25{background-color:#a3e63540}.bg-lime-400\\/30{background-color:#a3e6354d}.bg-lime-400\\/35{background-color:#a3e63559}.bg-lime-400\\/40{background-color:#a3e63566}.bg-lime-400\\/45{background-color:#a3e63573}.bg-lime-400\\/5{background-color:#a3e6350d}.bg-lime-400\\/50{background-color:#a3e63580}.bg-lime-400\\/55{background-color:#a3e6358c}.bg-lime-400\\/60{background-color:#a3e63599}.bg-lime-400\\/65{background-color:#a3e635a6}.bg-lime-400\\/70{background-color:#a3e635b3}.bg-lime-400\\/75{background-color:#a3e635bf}.bg-lime-400\\/80{background-color:#a3e635cc}.bg-lime-400\\/85{background-color:#a3e635d9}.bg-lime-400\\/90{background-color:#a3e635e6}.bg-lime-400\\/95{background-color:#a3e635f2}.bg-lime-500{--tw-bg-opacity:1;background-color:rgb(132 204 22/var(--tw-bg-opacity))}.bg-lime-500\\/0{background-color:#84cc1600}.bg-lime-500\\/10{background-color:#84cc161a}.bg-lime-500\\/100{background-color:#84cc16}.bg-lime-500\\/15{background-color:#84cc1626}.bg-lime-500\\/20{background-color:#84cc1633}.bg-lime-500\\/25{background-color:#84cc1640}.bg-lime-500\\/30{background-color:#84cc164d}.bg-lime-500\\/35{background-color:#84cc1659}.bg-lime-500\\/40{background-color:#84cc1666}.bg-lime-500\\/45{background-color:#84cc1673}.bg-lime-500\\/5{background-color:#84cc160d}.bg-lime-500\\/50{background-color:#84cc1680}.bg-lime-500\\/55{background-color:#84cc168c}.bg-lime-500\\/60{background-color:#84cc1699}.bg-lime-500\\/65{background-color:#84cc16a6}.bg-lime-500\\/70{background-color:#84cc16b3}.bg-lime-500\\/75{background-color:#84cc16bf}.bg-lime-500\\/80{background-color:#84cc16cc}.bg-lime-500\\/85{background-color:#84cc16d9}.bg-lime-500\\/90{background-color:#84cc16e6}.bg-lime-500\\/95{background-color:#84cc16f2}.bg-orange-100{--tw-bg-opacity:1;background-color:rgb(255 237 213/var(--tw-bg-opacity))}.bg-orange-400{--tw-bg-opacity:1;background-color:rgb(251 146 60/var(--tw-bg-opacity))}.bg-orange-400\\/0{background-color:#fb923c00}.bg-orange-400\\/10{background-color:#fb923c1a}.bg-orange-400\\/100{background-color:#fb923c}.bg-orange-400\\/15{background-color:#fb923c26}.bg-orange-400\\/20{background-color:#fb923c33}.bg-orange-400\\/25{background-color:#fb923c40}.bg-orange-400\\/30{background-color:#fb923c4d}.bg-orange-400\\/35{background-color:#fb923c59}.bg-orange-400\\/40{background-color:#fb923c66}.bg-orange-400\\/45{background-color:#fb923c73}.bg-orange-400\\/5{background-color:#fb923c0d}.bg-orange-400\\/50{background-color:#fb923c80}.bg-orange-400\\/55{background-color:#fb923c8c}.bg-orange-400\\/60{background-color:#fb923c99}.bg-orange-400\\/65{background-color:#fb923ca6}.bg-orange-400\\/70{background-color:#fb923cb3}.bg-orange-400\\/75{background-color:#fb923cbf}.bg-orange-400\\/80{background-color:#fb923ccc}.bg-orange-400\\/85{background-color:#fb923cd9}.bg-orange-400\\/90{background-color:#fb923ce6}.bg-orange-400\\/95{background-color:#fb923cf2}.bg-orange-50{--tw-bg-opacity:1;background-color:rgb(255 247 237/var(--tw-bg-opacity))}.bg-orange-500{--tw-bg-opacity:1;background-color:rgb(249 115 22/var(--tw-bg-opacity))}.bg-orange-500\\/0{background-color:#f9731600}.bg-orange-500\\/10{background-color:#f973161a}.bg-orange-500\\/100{background-color:#f97316}.bg-orange-500\\/15{background-color:#f9731626}.bg-orange-500\\/20{background-color:#f9731633}.bg-orange-500\\/25{background-color:#f9731640}.bg-orange-500\\/30{background-color:#f973164d}.bg-orange-500\\/35{background-color:#f9731659}.bg-orange-500\\/40{background-color:#f9731666}.bg-orange-500\\/45{background-color:#f9731673}.bg-orange-500\\/5{background-color:#f973160d}.bg-orange-500\\/50{background-color:#f9731680}.bg-orange-500\\/55{background-color:#f973168c}.bg-orange-500\\/60{background-color:#f9731699}.bg-orange-500\\/65{background-color:#f97316a6}.bg-orange-500\\/70{background-color:#f97316b3}.bg-orange-500\\/75{background-color:#f97316bf}.bg-orange-500\\/80{background-color:#f97316cc}.bg-orange-500\\/85{background-color:#f97316d9}.bg-orange-500\\/90{background-color:#f97316e6}.bg-orange-500\\/95{background-color:#f97316f2}.bg-orange-600{--tw-bg-opacity:1;background-color:rgb(234 88 12/var(--tw-bg-opacity))}.bg-orange-900{--tw-bg-opacity:1;background-color:rgb(124 45 18/var(--tw-bg-opacity))}.bg-orange-950{--tw-bg-opacity:1;background-color:rgb(67 20 7/var(--tw-bg-opacity))}.bg-pink-400{--tw-bg-opacity:1;background-color:rgb(244 114 182/var(--tw-bg-opacity))}.bg-pink-400\\/0{background-color:#f472b600}.bg-pink-400\\/10{background-color:#f472b61a}.bg-pink-400\\/100{background-color:#f472b6}.bg-pink-400\\/15{background-color:#f472b626}.bg-pink-400\\/20{background-color:#f472b633}.bg-pink-400\\/25{background-color:#f472b640}.bg-pink-400\\/30{background-color:#f472b64d}.bg-pink-400\\/35{background-color:#f472b659}.bg-pink-400\\/40{background-color:#f472b666}.bg-pink-400\\/45{background-color:#f472b673}.bg-pink-400\\/5{background-color:#f472b60d}.bg-pink-400\\/50{background-color:#f472b680}.bg-pink-400\\/55{background-color:#f472b68c}.bg-pink-400\\/60{background-color:#f472b699}.bg-pink-400\\/65{background-color:#f472b6a6}.bg-pink-400\\/70{background-color:#f472b6b3}.bg-pink-400\\/75{background-color:#f472b6bf}.bg-pink-400\\/80{background-color:#f472b6cc}.bg-pink-400\\/85{background-color:#f472b6d9}.bg-pink-400\\/90{background-color:#f472b6e6}.bg-pink-400\\/95{background-color:#f472b6f2}.bg-pink-500{--tw-bg-opacity:1;background-color:rgb(236 72 153/var(--tw-bg-opacity))}.bg-pink-500\\/0{background-color:#ec489900}.bg-pink-500\\/10{background-color:#ec48991a}.bg-pink-500\\/100{background-color:#ec4899}.bg-pink-500\\/15{background-color:#ec489926}.bg-pink-500\\/20{background-color:#ec489933}.bg-pink-500\\/25{background-color:#ec489940}.bg-pink-500\\/30{background-color:#ec48994d}.bg-pink-500\\/35{background-color:#ec489959}.bg-pink-500\\/40{background-color:#ec489966}.bg-pink-500\\/45{background-color:#ec489973}.bg-pink-500\\/5{background-color:#ec48990d}.bg-pink-500\\/50{background-color:#ec489980}.bg-pink-500\\/55{background-color:#ec48998c}.bg-pink-500\\/60{background-color:#ec489999}.bg-pink-500\\/65{background-color:#ec4899a6}.bg-pink-500\\/70{background-color:#ec4899b3}.bg-pink-500\\/75{background-color:#ec4899bf}.bg-pink-500\\/80{background-color:#ec4899cc}.bg-pink-500\\/85{background-color:#ec4899d9}.bg-pink-500\\/90{background-color:#ec4899e6}.bg-pink-500\\/95{background-color:#ec4899f2}.bg-primary-100{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-100)/var(--tw-bg-opacity))}.bg-primary-100\\/0{background-color:rgb(var(--color-primary-100)/0)}.bg-primary-100\\/10{background-color:rgb(var(--color-primary-100)/.1)}.bg-primary-100\\/100{background-color:rgb(var(--color-primary-100)/1)}.bg-primary-100\\/15{background-color:rgb(var(--color-primary-100)/.15)}.bg-primary-100\\/20{background-color:rgb(var(--color-primary-100)/.2)}.bg-primary-100\\/25{background-color:rgb(var(--color-primary-100)/.25)}.bg-primary-100\\/30{background-color:rgb(var(--color-primary-100)/.3)}.bg-primary-100\\/35{background-color:rgb(var(--color-primary-100)/.35)}.bg-primary-100\\/40{background-color:rgb(var(--color-primary-100)/.4)}.bg-primary-100\\/45{background-color:rgb(var(--color-primary-100)/.45)}.bg-primary-100\\/5{background-color:rgb(var(--color-primary-100)/.05)}.bg-primary-100\\/50{background-color:rgb(var(--color-primary-100)/.5)}.bg-primary-100\\/55{background-color:rgb(var(--color-primary-100)/.55)}.bg-primary-100\\/60{background-color:rgb(var(--color-primary-100)/.6)}.bg-primary-100\\/65{background-color:rgb(var(--color-primary-100)/.65)}.bg-primary-100\\/70{background-color:rgb(var(--color-primary-100)/.7)}.bg-primary-100\\/75{background-color:rgb(var(--color-primary-100)/.75)}.bg-primary-100\\/80{background-color:rgb(var(--color-primary-100)/.8)}.bg-primary-100\\/85{background-color:rgb(var(--color-primary-100)/.85)}.bg-primary-100\\/90{background-color:rgb(var(--color-primary-100)/.9)}.bg-primary-100\\/95{background-color:rgb(var(--color-primary-100)/.95)}.bg-primary-400{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-400)/var(--tw-bg-opacity))}.bg-primary-400\\/0{background-color:rgb(var(--color-primary-400)/0)}.bg-primary-400\\/10{background-color:rgb(var(--color-primary-400)/.1)}.bg-primary-400\\/100{background-color:rgb(var(--color-primary-400)/1)}.bg-primary-400\\/15{background-color:rgb(var(--color-primary-400)/.15)}.bg-primary-400\\/20{background-color:rgb(var(--color-primary-400)/.2)}.bg-primary-400\\/25{background-color:rgb(var(--color-primary-400)/.25)}.bg-primary-400\\/30{background-color:rgb(var(--color-primary-400)/.3)}.bg-primary-400\\/35{background-color:rgb(var(--color-primary-400)/.35)}.bg-primary-400\\/40{background-color:rgb(var(--color-primary-400)/.4)}.bg-primary-400\\/45{background-color:rgb(var(--color-primary-400)/.45)}.bg-primary-400\\/5{background-color:rgb(var(--color-primary-400)/.05)}.bg-primary-400\\/50{background-color:rgb(var(--color-primary-400)/.5)}.bg-primary-400\\/55{background-color:rgb(var(--color-primary-400)/.55)}.bg-primary-400\\/60{background-color:rgb(var(--color-primary-400)/.6)}.bg-primary-400\\/65{background-color:rgb(var(--color-primary-400)/.65)}.bg-primary-400\\/70{background-color:rgb(var(--color-primary-400)/.7)}.bg-primary-400\\/75{background-color:rgb(var(--color-primary-400)/.75)}.bg-primary-400\\/80{background-color:rgb(var(--color-primary-400)/.8)}.bg-primary-400\\/85{background-color:rgb(var(--color-primary-400)/.85)}.bg-primary-400\\/90{background-color:rgb(var(--color-primary-400)/.9)}.bg-primary-400\\/95{background-color:rgb(var(--color-primary-400)/.95)}.bg-primary-50{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-50)/var(--tw-bg-opacity))}.bg-primary-50\\/0{background-color:rgb(var(--color-primary-50)/0)}.bg-primary-50\\/10{background-color:rgb(var(--color-primary-50)/.1)}.bg-primary-50\\/100{background-color:rgb(var(--color-primary-50)/1)}.bg-primary-50\\/15{background-color:rgb(var(--color-primary-50)/.15)}.bg-primary-50\\/20{background-color:rgb(var(--color-primary-50)/.2)}.bg-primary-50\\/25{background-color:rgb(var(--color-primary-50)/.25)}.bg-primary-50\\/30{background-color:rgb(var(--color-primary-50)/.3)}.bg-primary-50\\/35{background-color:rgb(var(--color-primary-50)/.35)}.bg-primary-50\\/40{background-color:rgb(var(--color-primary-50)/.4)}.bg-primary-50\\/45{background-color:rgb(var(--color-primary-50)/.45)}.bg-primary-50\\/5{background-color:rgb(var(--color-primary-50)/.05)}.bg-primary-50\\/50{background-color:rgb(var(--color-primary-50)/.5)}.bg-primary-50\\/55{background-color:rgb(var(--color-primary-50)/.55)}.bg-primary-50\\/60{background-color:rgb(var(--color-primary-50)/.6)}.bg-primary-50\\/65{background-color:rgb(var(--color-primary-50)/.65)}.bg-primary-50\\/70{background-color:rgb(var(--color-primary-50)/.7)}.bg-primary-50\\/75{background-color:rgb(var(--color-primary-50)/.75)}.bg-primary-50\\/80{background-color:rgb(var(--color-primary-50)/.8)}.bg-primary-50\\/85{background-color:rgb(var(--color-primary-50)/.85)}.bg-primary-50\\/90{background-color:rgb(var(--color-primary-50)/.9)}.bg-primary-50\\/95{background-color:rgb(var(--color-primary-50)/.95)}.bg-primary-500{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-500)/var(--tw-bg-opacity))}.bg-primary-500\\/0{background-color:rgb(var(--color-primary-500)/0)}.bg-primary-500\\/10{background-color:rgb(var(--color-primary-500)/.1)}.bg-primary-500\\/100{background-color:rgb(var(--color-primary-500)/1)}.bg-primary-500\\/15{background-color:rgb(var(--color-primary-500)/.15)}.bg-primary-500\\/20{background-color:rgb(var(--color-primary-500)/.2)}.bg-primary-500\\/25{background-color:rgb(var(--color-primary-500)/.25)}.bg-primary-500\\/30{background-color:rgb(var(--color-primary-500)/.3)}.bg-primary-500\\/35{background-color:rgb(var(--color-primary-500)/.35)}.bg-primary-500\\/40{background-color:rgb(var(--color-primary-500)/.4)}.bg-primary-500\\/45{background-color:rgb(var(--color-primary-500)/.45)}.bg-primary-500\\/5{background-color:rgb(var(--color-primary-500)/.05)}.bg-primary-500\\/50{background-color:rgb(var(--color-primary-500)/.5)}.bg-primary-500\\/55{background-color:rgb(var(--color-primary-500)/.55)}.bg-primary-500\\/60{background-color:rgb(var(--color-primary-500)/.6)}.bg-primary-500\\/65{background-color:rgb(var(--color-primary-500)/.65)}.bg-primary-500\\/70{background-color:rgb(var(--color-primary-500)/.7)}.bg-primary-500\\/75{background-color:rgb(var(--color-primary-500)/.75)}.bg-primary-500\\/80{background-color:rgb(var(--color-primary-500)/.8)}.bg-primary-500\\/85{background-color:rgb(var(--color-primary-500)/.85)}.bg-primary-500\\/90{background-color:rgb(var(--color-primary-500)/.9)}.bg-primary-500\\/95{background-color:rgb(var(--color-primary-500)/.95)}.bg-primary-600{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-600)/var(--tw-bg-opacity))}.bg-primary-600\\/0{background-color:rgb(var(--color-primary-600)/0)}.bg-primary-600\\/10{background-color:rgb(var(--color-primary-600)/.1)}.bg-primary-600\\/100{background-color:rgb(var(--color-primary-600)/1)}.bg-primary-600\\/15{background-color:rgb(var(--color-primary-600)/.15)}.bg-primary-600\\/20{background-color:rgb(var(--color-primary-600)/.2)}.bg-primary-600\\/25{background-color:rgb(var(--color-primary-600)/.25)}.bg-primary-600\\/30{background-color:rgb(var(--color-primary-600)/.3)}.bg-primary-600\\/35{background-color:rgb(var(--color-primary-600)/.35)}.bg-primary-600\\/40{background-color:rgb(var(--color-primary-600)/.4)}.bg-primary-600\\/45{background-color:rgb(var(--color-primary-600)/.45)}.bg-primary-600\\/5{background-color:rgb(var(--color-primary-600)/.05)}.bg-primary-600\\/50{background-color:rgb(var(--color-primary-600)/.5)}.bg-primary-600\\/55{background-color:rgb(var(--color-primary-600)/.55)}.bg-primary-600\\/60{background-color:rgb(var(--color-primary-600)/.6)}.bg-primary-600\\/65{background-color:rgb(var(--color-primary-600)/.65)}.bg-primary-600\\/70{background-color:rgb(var(--color-primary-600)/.7)}.bg-primary-600\\/75{background-color:rgb(var(--color-primary-600)/.75)}.bg-primary-600\\/80{background-color:rgb(var(--color-primary-600)/.8)}.bg-primary-600\\/85{background-color:rgb(var(--color-primary-600)/.85)}.bg-primary-600\\/90{background-color:rgb(var(--color-primary-600)/.9)}.bg-primary-600\\/95{background-color:rgb(var(--color-primary-600)/.95)}.bg-primary-900{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-900)/var(--tw-bg-opacity))}.bg-primary-900\\/0{background-color:rgb(var(--color-primary-900)/0)}.bg-primary-900\\/10{background-color:rgb(var(--color-primary-900)/.1)}.bg-primary-900\\/100{background-color:rgb(var(--color-primary-900)/1)}.bg-primary-900\\/15{background-color:rgb(var(--color-primary-900)/.15)}.bg-primary-900\\/20{background-color:rgb(var(--color-primary-900)/.2)}.bg-primary-900\\/25{background-color:rgb(var(--color-primary-900)/.25)}.bg-primary-900\\/30{background-color:rgb(var(--color-primary-900)/.3)}.bg-primary-900\\/35{background-color:rgb(var(--color-primary-900)/.35)}.bg-primary-900\\/40{background-color:rgb(var(--color-primary-900)/.4)}.bg-primary-900\\/45{background-color:rgb(var(--color-primary-900)/.45)}.bg-primary-900\\/5{background-color:rgb(var(--color-primary-900)/.05)}.bg-primary-900\\/50{background-color:rgb(var(--color-primary-900)/.5)}.bg-primary-900\\/55{background-color:rgb(var(--color-primary-900)/.55)}.bg-primary-900\\/60{background-color:rgb(var(--color-primary-900)/.6)}.bg-primary-900\\/65{background-color:rgb(var(--color-primary-900)/.65)}.bg-primary-900\\/70{background-color:rgb(var(--color-primary-900)/.7)}.bg-primary-900\\/75{background-color:rgb(var(--color-primary-900)/.75)}.bg-primary-900\\/80{background-color:rgb(var(--color-primary-900)/.8)}.bg-primary-900\\/85{background-color:rgb(var(--color-primary-900)/.85)}.bg-primary-900\\/90{background-color:rgb(var(--color-primary-900)/.9)}.bg-primary-900\\/95{background-color:rgb(var(--color-primary-900)/.95)}.bg-primary-950{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-950)/var(--tw-bg-opacity))}.bg-primary-950\\/0{background-color:rgb(var(--color-primary-950)/0)}.bg-primary-950\\/10{background-color:rgb(var(--color-primary-950)/.1)}.bg-primary-950\\/100{background-color:rgb(var(--color-primary-950)/1)}.bg-primary-950\\/15{background-color:rgb(var(--color-primary-950)/.15)}.bg-primary-950\\/20{background-color:rgb(var(--color-primary-950)/.2)}.bg-primary-950\\/25{background-color:rgb(var(--color-primary-950)/.25)}.bg-primary-950\\/30{background-color:rgb(var(--color-primary-950)/.3)}.bg-primary-950\\/35{background-color:rgb(var(--color-primary-950)/.35)}.bg-primary-950\\/40{background-color:rgb(var(--color-primary-950)/.4)}.bg-primary-950\\/45{background-color:rgb(var(--color-primary-950)/.45)}.bg-primary-950\\/5{background-color:rgb(var(--color-primary-950)/.05)}.bg-primary-950\\/50{background-color:rgb(var(--color-primary-950)/.5)}.bg-primary-950\\/55{background-color:rgb(var(--color-primary-950)/.55)}.bg-primary-950\\/60{background-color:rgb(var(--color-primary-950)/.6)}.bg-primary-950\\/65{background-color:rgb(var(--color-primary-950)/.65)}.bg-primary-950\\/70{background-color:rgb(var(--color-primary-950)/.7)}.bg-primary-950\\/75{background-color:rgb(var(--color-primary-950)/.75)}.bg-primary-950\\/80{background-color:rgb(var(--color-primary-950)/.8)}.bg-primary-950\\/85{background-color:rgb(var(--color-primary-950)/.85)}.bg-primary-950\\/90{background-color:rgb(var(--color-primary-950)/.9)}.bg-primary-950\\/95{background-color:rgb(var(--color-primary-950)/.95)}.bg-purple-400{--tw-bg-opacity:1;background-color:rgb(192 132 252/var(--tw-bg-opacity))}.bg-purple-400\\/0{background-color:#c084fc00}.bg-purple-400\\/10{background-color:#c084fc1a}.bg-purple-400\\/100{background-color:#c084fc}.bg-purple-400\\/15{background-color:#c084fc26}.bg-purple-400\\/20{background-color:#c084fc33}.bg-purple-400\\/25{background-color:#c084fc40}.bg-purple-400\\/30{background-color:#c084fc4d}.bg-purple-400\\/35{background-color:#c084fc59}.bg-purple-400\\/40{background-color:#c084fc66}.bg-purple-400\\/45{background-color:#c084fc73}.bg-purple-400\\/5{background-color:#c084fc0d}.bg-purple-400\\/50{background-color:#c084fc80}.bg-purple-400\\/55{background-color:#c084fc8c}.bg-purple-400\\/60{background-color:#c084fc99}.bg-purple-400\\/65{background-color:#c084fca6}.bg-purple-400\\/70{background-color:#c084fcb3}.bg-purple-400\\/75{background-color:#c084fcbf}.bg-purple-400\\/80{background-color:#c084fccc}.bg-purple-400\\/85{background-color:#c084fcd9}.bg-purple-400\\/90{background-color:#c084fce6}.bg-purple-400\\/95{background-color:#c084fcf2}.bg-purple-500{--tw-bg-opacity:1;background-color:rgb(168 85 247/var(--tw-bg-opacity))}.bg-purple-500\\/0{background-color:#a855f700}.bg-purple-500\\/10{background-color:#a855f71a}.bg-purple-500\\/100{background-color:#a855f7}.bg-purple-500\\/15{background-color:#a855f726}.bg-purple-500\\/20{background-color:#a855f733}.bg-purple-500\\/25{background-color:#a855f740}.bg-purple-500\\/30{background-color:#a855f74d}.bg-purple-500\\/35{background-color:#a855f759}.bg-purple-500\\/40{background-color:#a855f766}.bg-purple-500\\/45{background-color:#a855f773}.bg-purple-500\\/5{background-color:#a855f70d}.bg-purple-500\\/50{background-color:#a855f780}.bg-purple-500\\/55{background-color:#a855f78c}.bg-purple-500\\/60{background-color:#a855f799}.bg-purple-500\\/65{background-color:#a855f7a6}.bg-purple-500\\/70{background-color:#a855f7b3}.bg-purple-500\\/75{background-color:#a855f7bf}.bg-purple-500\\/80{background-color:#a855f7cc}.bg-purple-500\\/85{background-color:#a855f7d9}.bg-purple-500\\/90{background-color:#a855f7e6}.bg-purple-500\\/95{background-color:#a855f7f2}.bg-red-400{--tw-bg-opacity:1;background-color:rgb(248 113 113/var(--tw-bg-opacity))}.bg-red-400\\/0{background-color:#f8717100}.bg-red-400\\/10{background-color:#f871711a}.bg-red-400\\/100{background-color:#f87171}.bg-red-400\\/15{background-color:#f8717126}.bg-red-400\\/20{background-color:#f8717133}.bg-red-400\\/25{background-color:#f8717140}.bg-red-400\\/30{background-color:#f871714d}.bg-red-400\\/35{background-color:#f8717159}.bg-red-400\\/40{background-color:#f8717166}.bg-red-400\\/45{background-color:#f8717173}.bg-red-400\\/5{background-color:#f871710d}.bg-red-400\\/50{background-color:#f8717180}.bg-red-400\\/55{background-color:#f871718c}.bg-red-400\\/60{background-color:#f8717199}.bg-red-400\\/65{background-color:#f87171a6}.bg-red-400\\/70{background-color:#f87171b3}.bg-red-400\\/75{background-color:#f87171bf}.bg-red-400\\/80{background-color:#f87171cc}.bg-red-400\\/85{background-color:#f87171d9}.bg-red-400\\/90{background-color:#f87171e6}.bg-red-400\\/95{background-color:#f87171f2}.bg-red-500{--tw-bg-opacity:1;background-color:rgb(239 68 68/var(--tw-bg-opacity))}.bg-red-500\\/0{background-color:#ef444400}.bg-red-500\\/10{background-color:#ef44441a}.bg-red-500\\/100{background-color:#ef4444}.bg-red-500\\/15{background-color:#ef444426}.bg-red-500\\/20{background-color:#ef444433}.bg-red-500\\/25{background-color:#ef444440}.bg-red-500\\/30{background-color:#ef44444d}.bg-red-500\\/35{background-color:#ef444459}.bg-red-500\\/40{background-color:#ef444466}.bg-red-500\\/45{background-color:#ef444473}.bg-red-500\\/5{background-color:#ef44440d}.bg-red-500\\/50{background-color:#ef444480}.bg-red-500\\/55{background-color:#ef44448c}.bg-red-500\\/60{background-color:#ef444499}.bg-red-500\\/65{background-color:#ef4444a6}.bg-red-500\\/70{background-color:#ef4444b3}.bg-red-500\\/75{background-color:#ef4444bf}.bg-red-500\\/80{background-color:#ef4444cc}.bg-red-500\\/85{background-color:#ef4444d9}.bg-red-500\\/90{background-color:#ef4444e6}.bg-red-500\\/95{background-color:#ef4444f2}.bg-rose-400{--tw-bg-opacity:1;background-color:rgb(251 113 133/var(--tw-bg-opacity))}.bg-rose-400\\/0{background-color:#fb718500}.bg-rose-400\\/10{background-color:#fb71851a}.bg-rose-400\\/100{background-color:#fb7185}.bg-rose-400\\/15{background-color:#fb718526}.bg-rose-400\\/20{background-color:#fb718533}.bg-rose-400\\/25{background-color:#fb718540}.bg-rose-400\\/30{background-color:#fb71854d}.bg-rose-400\\/35{background-color:#fb718559}.bg-rose-400\\/40{background-color:#fb718566}.bg-rose-400\\/45{background-color:#fb718573}.bg-rose-400\\/5{background-color:#fb71850d}.bg-rose-400\\/50{background-color:#fb718580}.bg-rose-400\\/55{background-color:#fb71858c}.bg-rose-400\\/60{background-color:#fb718599}.bg-rose-400\\/65{background-color:#fb7185a6}.bg-rose-400\\/70{background-color:#fb7185b3}.bg-rose-400\\/75{background-color:#fb7185bf}.bg-rose-400\\/80{background-color:#fb7185cc}.bg-rose-400\\/85{background-color:#fb7185d9}.bg-rose-400\\/90{background-color:#fb7185e6}.bg-rose-400\\/95{background-color:#fb7185f2}.bg-rose-500{--tw-bg-opacity:1;background-color:rgb(244 63 94/var(--tw-bg-opacity))}.bg-rose-500\\/0{background-color:#f43f5e00}.bg-rose-500\\/10{background-color:#f43f5e1a}.bg-rose-500\\/100{background-color:#f43f5e}.bg-rose-500\\/15{background-color:#f43f5e26}.bg-rose-500\\/20{background-color:#f43f5e33}.bg-rose-500\\/25{background-color:#f43f5e40}.bg-rose-500\\/30{background-color:#f43f5e4d}.bg-rose-500\\/35{background-color:#f43f5e59}.bg-rose-500\\/40{background-color:#f43f5e66}.bg-rose-500\\/45{background-color:#f43f5e73}.bg-rose-500\\/5{background-color:#f43f5e0d}.bg-rose-500\\/50{background-color:#f43f5e80}.bg-rose-500\\/55{background-color:#f43f5e8c}.bg-rose-500\\/60{background-color:#f43f5e99}.bg-rose-500\\/65{background-color:#f43f5ea6}.bg-rose-500\\/70{background-color:#f43f5eb3}.bg-rose-500\\/75{background-color:#f43f5ebf}.bg-rose-500\\/80{background-color:#f43f5ecc}.bg-rose-500\\/85{background-color:#f43f5ed9}.bg-rose-500\\/90{background-color:#f43f5ee6}.bg-rose-500\\/95{background-color:#f43f5ef2}.bg-sky-400{--tw-bg-opacity:1;background-color:rgb(56 189 248/var(--tw-bg-opacity))}.bg-sky-400\\/0{background-color:#38bdf800}.bg-sky-400\\/10{background-color:#38bdf81a}.bg-sky-400\\/100{background-color:#38bdf8}.bg-sky-400\\/15{background-color:#38bdf826}.bg-sky-400\\/20{background-color:#38bdf833}.bg-sky-400\\/25{background-color:#38bdf840}.bg-sky-400\\/30{background-color:#38bdf84d}.bg-sky-400\\/35{background-color:#38bdf859}.bg-sky-400\\/40{background-color:#38bdf866}.bg-sky-400\\/45{background-color:#38bdf873}.bg-sky-400\\/5{background-color:#38bdf80d}.bg-sky-400\\/50{background-color:#38bdf880}.bg-sky-400\\/55{background-color:#38bdf88c}.bg-sky-400\\/60{background-color:#38bdf899}.bg-sky-400\\/65{background-color:#38bdf8a6}.bg-sky-400\\/70{background-color:#38bdf8b3}.bg-sky-400\\/75{background-color:#38bdf8bf}.bg-sky-400\\/80{background-color:#38bdf8cc}.bg-sky-400\\/85{background-color:#38bdf8d9}.bg-sky-400\\/90{background-color:#38bdf8e6}.bg-sky-400\\/95{background-color:#38bdf8f2}.bg-sky-500{--tw-bg-opacity:1;background-color:rgb(14 165 233/var(--tw-bg-opacity))}.bg-sky-500\\/0{background-color:#0ea5e900}.bg-sky-500\\/10{background-color:#0ea5e91a}.bg-sky-500\\/100{background-color:#0ea5e9}.bg-sky-500\\/15{background-color:#0ea5e926}.bg-sky-500\\/20{background-color:#0ea5e933}.bg-sky-500\\/25{background-color:#0ea5e940}.bg-sky-500\\/30{background-color:#0ea5e94d}.bg-sky-500\\/35{background-color:#0ea5e959}.bg-sky-500\\/40{background-color:#0ea5e966}.bg-sky-500\\/45{background-color:#0ea5e973}.bg-sky-500\\/5{background-color:#0ea5e90d}.bg-sky-500\\/50{background-color:#0ea5e980}.bg-sky-500\\/55{background-color:#0ea5e98c}.bg-sky-500\\/60{background-color:#0ea5e999}.bg-sky-500\\/65{background-color:#0ea5e9a6}.bg-sky-500\\/70{background-color:#0ea5e9b3}.bg-sky-500\\/75{background-color:#0ea5e9bf}.bg-sky-500\\/80{background-color:#0ea5e9cc}.bg-sky-500\\/85{background-color:#0ea5e9d9}.bg-sky-500\\/90{background-color:#0ea5e9e6}.bg-sky-500\\/95{background-color:#0ea5e9f2}.bg-teal-400{--tw-bg-opacity:1;background-color:rgb(45 212 191/var(--tw-bg-opacity))}.bg-teal-400\\/0{background-color:#2dd4bf00}.bg-teal-400\\/10{background-color:#2dd4bf1a}.bg-teal-400\\/100{background-color:#2dd4bf}.bg-teal-400\\/15{background-color:#2dd4bf26}.bg-teal-400\\/20{background-color:#2dd4bf33}.bg-teal-400\\/25{background-color:#2dd4bf40}.bg-teal-400\\/30{background-color:#2dd4bf4d}.bg-teal-400\\/35{background-color:#2dd4bf59}.bg-teal-400\\/40{background-color:#2dd4bf66}.bg-teal-400\\/45{background-color:#2dd4bf73}.bg-teal-400\\/5{background-color:#2dd4bf0d}.bg-teal-400\\/50{background-color:#2dd4bf80}.bg-teal-400\\/55{background-color:#2dd4bf8c}.bg-teal-400\\/60{background-color:#2dd4bf99}.bg-teal-400\\/65{background-color:#2dd4bfa6}.bg-teal-400\\/70{background-color:#2dd4bfb3}.bg-teal-400\\/75{background-color:#2dd4bfbf}.bg-teal-400\\/80{background-color:#2dd4bfcc}.bg-teal-400\\/85{background-color:#2dd4bfd9}.bg-teal-400\\/90{background-color:#2dd4bfe6}.bg-teal-400\\/95{background-color:#2dd4bff2}.bg-teal-500{--tw-bg-opacity:1;background-color:rgb(20 184 166/var(--tw-bg-opacity))}.bg-teal-500\\/0{background-color:#14b8a600}.bg-teal-500\\/10{background-color:#14b8a61a}.bg-teal-500\\/100{background-color:#14b8a6}.bg-teal-500\\/15{background-color:#14b8a626}.bg-teal-500\\/20{background-color:#14b8a633}.bg-teal-500\\/25{background-color:#14b8a640}.bg-teal-500\\/30{background-color:#14b8a64d}.bg-teal-500\\/35{background-color:#14b8a659}.bg-teal-500\\/40{background-color:#14b8a666}.bg-teal-500\\/45{background-color:#14b8a673}.bg-teal-500\\/5{background-color:#14b8a60d}.bg-teal-500\\/50{background-color:#14b8a680}.bg-teal-500\\/55{background-color:#14b8a68c}.bg-teal-500\\/60{background-color:#14b8a699}.bg-teal-500\\/65{background-color:#14b8a6a6}.bg-teal-500\\/70{background-color:#14b8a6b3}.bg-teal-500\\/75{background-color:#14b8a6bf}.bg-teal-500\\/80{background-color:#14b8a6cc}.bg-teal-500\\/85{background-color:#14b8a6d9}.bg-teal-500\\/90{background-color:#14b8a6e6}.bg-teal-500\\/95{background-color:#14b8a6f2}.bg-transparent{background-color:initial}.bg-violet-400{--tw-bg-opacity:1;background-color:rgb(167 139 250/var(--tw-bg-opacity))}.bg-violet-400\\/0{background-color:#a78bfa00}.bg-violet-400\\/10{background-color:#a78bfa1a}.bg-violet-400\\/100{background-color:#a78bfa}.bg-violet-400\\/15{background-color:#a78bfa26}.bg-violet-400\\/20{background-color:#a78bfa33}.bg-violet-400\\/25{background-color:#a78bfa40}.bg-violet-400\\/30{background-color:#a78bfa4d}.bg-violet-400\\/35{background-color:#a78bfa59}.bg-violet-400\\/40{background-color:#a78bfa66}.bg-violet-400\\/45{background-color:#a78bfa73}.bg-violet-400\\/5{background-color:#a78bfa0d}.bg-violet-400\\/50{background-color:#a78bfa80}.bg-violet-400\\/55{background-color:#a78bfa8c}.bg-violet-400\\/60{background-color:#a78bfa99}.bg-violet-400\\/65{background-color:#a78bfaa6}.bg-violet-400\\/70{background-color:#a78bfab3}.bg-violet-400\\/75{background-color:#a78bfabf}.bg-violet-400\\/80{background-color:#a78bfacc}.bg-violet-400\\/85{background-color:#a78bfad9}.bg-violet-400\\/90{background-color:#a78bfae6}.bg-violet-400\\/95{background-color:#a78bfaf2}.bg-violet-500{--tw-bg-opacity:1;background-color:rgb(139 92 246/var(--tw-bg-opacity))}.bg-violet-500\\/0{background-color:#8b5cf600}.bg-violet-500\\/10{background-color:#8b5cf61a}.bg-violet-500\\/100{background-color:#8b5cf6}.bg-violet-500\\/15{background-color:#8b5cf626}.bg-violet-500\\/20{background-color:#8b5cf633}.bg-violet-500\\/25{background-color:#8b5cf640}.bg-violet-500\\/30{background-color:#8b5cf64d}.bg-violet-500\\/35{background-color:#8b5cf659}.bg-violet-500\\/40{background-color:#8b5cf666}.bg-violet-500\\/45{background-color:#8b5cf673}.bg-violet-500\\/5{background-color:#8b5cf60d}.bg-violet-500\\/50{background-color:#8b5cf680}.bg-violet-500\\/55{background-color:#8b5cf68c}.bg-violet-500\\/60{background-color:#8b5cf699}.bg-violet-500\\/65{background-color:#8b5cf6a6}.bg-violet-500\\/70{background-color:#8b5cf6b3}.bg-violet-500\\/75{background-color:#8b5cf6bf}.bg-violet-500\\/80{background-color:#8b5cf6cc}.bg-violet-500\\/85{background-color:#8b5cf6d9}.bg-violet-500\\/90{background-color:#8b5cf6e6}.bg-violet-500\\/95{background-color:#8b5cf6f2}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-yellow-400{--tw-bg-opacity:1;background-color:rgb(250 204 21/var(--tw-bg-opacity))}.bg-yellow-400\\/0{background-color:#facc1500}.bg-yellow-400\\/10{background-color:#facc151a}.bg-yellow-400\\/100{background-color:#facc15}.bg-yellow-400\\/15{background-color:#facc1526}.bg-yellow-400\\/20{background-color:#facc1533}.bg-yellow-400\\/25{background-color:#facc1540}.bg-yellow-400\\/30{background-color:#facc154d}.bg-yellow-400\\/35{background-color:#facc1559}.bg-yellow-400\\/40{background-color:#facc1566}.bg-yellow-400\\/45{background-color:#facc1573}.bg-yellow-400\\/5{background-color:#facc150d}.bg-yellow-400\\/50{background-color:#facc1580}.bg-yellow-400\\/55{background-color:#facc158c}.bg-yellow-400\\/60{background-color:#facc1599}.bg-yellow-400\\/65{background-color:#facc15a6}.bg-yellow-400\\/70{background-color:#facc15b3}.bg-yellow-400\\/75{background-color:#facc15bf}.bg-yellow-400\\/80{background-color:#facc15cc}.bg-yellow-400\\/85{background-color:#facc15d9}.bg-yellow-400\\/90{background-color:#facc15e6}.bg-yellow-400\\/95{background-color:#facc15f2}.bg-yellow-500{--tw-bg-opacity:1;background-color:rgb(234 179 8/var(--tw-bg-opacity))}.bg-yellow-500\\/0{background-color:#eab30800}.bg-yellow-500\\/10{background-color:#eab3081a}.bg-yellow-500\\/100{background-color:#eab308}.bg-yellow-500\\/15{background-color:#eab30826}.bg-yellow-500\\/20{background-color:#eab30833}.bg-yellow-500\\/25{background-color:#eab30840}.bg-yellow-500\\/30{background-color:#eab3084d}.bg-yellow-500\\/35{background-color:#eab30859}.bg-yellow-500\\/40{background-color:#eab30866}.bg-yellow-500\\/45{background-color:#eab30873}.bg-yellow-500\\/5{background-color:#eab3080d}.bg-yellow-500\\/50{background-color:#eab30880}.bg-yellow-500\\/55{background-color:#eab3088c}.bg-yellow-500\\/60{background-color:#eab30899}.bg-yellow-500\\/65{background-color:#eab308a6}.bg-yellow-500\\/70{background-color:#eab308b3}.bg-yellow-500\\/75{background-color:#eab308bf}.bg-yellow-500\\/80{background-color:#eab308cc}.bg-yellow-500\\/85{background-color:#eab308d9}.bg-yellow-500\\/90{background-color:#eab308e6}.bg-yellow-500\\/95{background-color:#eab308f2}.bg-none{background-image:none}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-10{padding:2.5rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-4{padding:1rem}.p-8{padding:2rem}.p-px{padding:1px}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-3\\.5{padding-left:.875rem;padding-right:.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0{padding-bottom:0;padding-top:0}.py-0\\.5{padding-bottom:.125rem;padding-top:.125rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.py-14{padding-bottom:3.5rem;padding-top:3.5rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-2\\.5{padding-bottom:.625rem;padding-top:.625rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.py-3\\.5{padding-bottom:.875rem;padding-top:.875rem}.py-4{padding-bottom:1rem;padding-top:1rem}.py-5{padding-bottom:1.25rem;padding-top:1.25rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.py-8{padding-bottom:2rem;padding-top:2rem}.pb-3{padding-bottom:.75rem}.pe-10{padding-inline-end:2.5rem}.pe-11{padding-inline-end:2.75rem}.pe-12{padding-inline-end:3rem}.pe-2{padding-inline-end:.5rem}.pe-7{padding-inline-end:1.75rem}.pe-8{padding-inline-end:2rem}.pe-9{padding-inline-end:2.25rem}.ps-10{padding-inline-start:2.5rem}.ps-11{padding-inline-start:2.75rem}.ps-12{padding-inline-start:3rem}.ps-4{padding-inline-start:1rem}.ps-7{padding-inline-start:1.75rem}.ps-8{padding-inline-start:2rem}.ps-9{padding-inline-start:2.25rem}.pt-1{padding-top:.25rem}.pt-1\\.5{padding-top:.375rem}.pt-4{padding-top:1rem}.text-left{text-align:left}.text-center{text-align:center}.text-end{text-align:end}.font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[14px\\]{font-size:14px}.text-\\[4px\\]{font-size:4px}.text-\\[5px\\]{font-size:5px}.text-\\[6px\\]{font-size:6px}.text-\\[7px\\]{font-size:7px}.text-\\[8px\\]{font-size:8px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.leading-4{line-height:1rem}.leading-5{line-height:1.25rem}.leading-6{line-height:1.5rem}.leading-none{line-height:1}.text-amber-400{--tw-text-opacity:1;color:rgb(251 191 36/var(--tw-text-opacity))}.text-amber-400\\/0{color:#fbbf2400}.text-amber-400\\/10{color:#fbbf241a}.text-amber-400\\/100{color:#fbbf24}.text-amber-400\\/15{color:#fbbf2426}.text-amber-400\\/20{color:#fbbf2433}.text-amber-400\\/25{color:#fbbf2440}.text-amber-400\\/30{color:#fbbf244d}.text-amber-400\\/35{color:#fbbf2459}.text-amber-400\\/40{color:#fbbf2466}.text-amber-400\\/45{color:#fbbf2473}.text-amber-400\\/5{color:#fbbf240d}.text-amber-400\\/50{color:#fbbf2480}.text-amber-400\\/55{color:#fbbf248c}.text-amber-400\\/60{color:#fbbf2499}.text-amber-400\\/65{color:#fbbf24a6}.text-amber-400\\/70{color:#fbbf24b3}.text-amber-400\\/75{color:#fbbf24bf}.text-amber-400\\/80{color:#fbbf24cc}.text-amber-400\\/85{color:#fbbf24d9}.text-amber-400\\/90{color:#fbbf24e6}.text-amber-400\\/95{color:#fbbf24f2}.text-amber-500{--tw-text-opacity:1;color:rgb(245 158 11/var(--tw-text-opacity))}.text-amber-500\\/0{color:#f59e0b00}.text-amber-500\\/10{color:#f59e0b1a}.text-amber-500\\/100{color:#f59e0b}.text-amber-500\\/15{color:#f59e0b26}.text-amber-500\\/20{color:#f59e0b33}.text-amber-500\\/25{color:#f59e0b40}.text-amber-500\\/30{color:#f59e0b4d}.text-amber-500\\/35{color:#f59e0b59}.text-amber-500\\/40{color:#f59e0b66}.text-amber-500\\/45{color:#f59e0b73}.text-amber-500\\/5{color:#f59e0b0d}.text-amber-500\\/50{color:#f59e0b80}.text-amber-500\\/55{color:#f59e0b8c}.text-amber-500\\/60{color:#f59e0b99}.text-amber-500\\/65{color:#f59e0ba6}.text-amber-500\\/70{color:#f59e0bb3}.text-amber-500\\/75{color:#f59e0bbf}.text-amber-500\\/80{color:#f59e0bcc}.text-amber-500\\/85{color:#f59e0bd9}.text-amber-500\\/90{color:#f59e0be6}.text-amber-500\\/95{color:#f59e0bf2}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.text-blue-400{--tw-text-opacity:1;color:rgb(96 165 250/var(--tw-text-opacity))}.text-blue-400\\/0{color:#60a5fa00}.text-blue-400\\/10{color:#60a5fa1a}.text-blue-400\\/100{color:#60a5fa}.text-blue-400\\/15{color:#60a5fa26}.text-blue-400\\/20{color:#60a5fa33}.text-blue-400\\/25{color:#60a5fa40}.text-blue-400\\/30{color:#60a5fa4d}.text-blue-400\\/35{color:#60a5fa59}.text-blue-400\\/40{color:#60a5fa66}.text-blue-400\\/45{color:#60a5fa73}.text-blue-400\\/5{color:#60a5fa0d}.text-blue-400\\/50{color:#60a5fa80}.text-blue-400\\/55{color:#60a5fa8c}.text-blue-400\\/60{color:#60a5fa99}.text-blue-400\\/65{color:#60a5faa6}.text-blue-400\\/70{color:#60a5fab3}.text-blue-400\\/75{color:#60a5fabf}.text-blue-400\\/80{color:#60a5facc}.text-blue-400\\/85{color:#60a5fad9}.text-blue-400\\/90{color:#60a5fae6}.text-blue-400\\/95{color:#60a5faf2}.text-blue-500{--tw-text-opacity:1;color:rgb(59 130 246/var(--tw-text-opacity))}.text-blue-500\\/0{color:#3b82f600}.text-blue-500\\/10{color:#3b82f61a}.text-blue-500\\/100{color:#3b82f6}.text-blue-500\\/15{color:#3b82f626}.text-blue-500\\/20{color:#3b82f633}.text-blue-500\\/25{color:#3b82f640}.text-blue-500\\/30{color:#3b82f64d}.text-blue-500\\/35{color:#3b82f659}.text-blue-500\\/40{color:#3b82f666}.text-blue-500\\/45{color:#3b82f673}.text-blue-500\\/5{color:#3b82f60d}.text-blue-500\\/50{color:#3b82f680}.text-blue-500\\/55{color:#3b82f68c}.text-blue-500\\/60{color:#3b82f699}.text-blue-500\\/65{color:#3b82f6a6}.text-blue-500\\/70{color:#3b82f6b3}.text-blue-500\\/75{color:#3b82f6bf}.text-blue-500\\/80{color:#3b82f6cc}.text-blue-500\\/85{color:#3b82f6d9}.text-blue-500\\/90{color:#3b82f6e6}.text-blue-500\\/95{color:#3b82f6f2}.text-cyan-400{--tw-text-opacity:1;color:rgb(34 211 238/var(--tw-text-opacity))}.text-cyan-400\\/0{color:#22d3ee00}.text-cyan-400\\/10{color:#22d3ee1a}.text-cyan-400\\/100{color:#22d3ee}.text-cyan-400\\/15{color:#22d3ee26}.text-cyan-400\\/20{color:#22d3ee33}.text-cyan-400\\/25{color:#22d3ee40}.text-cyan-400\\/30{color:#22d3ee4d}.text-cyan-400\\/35{color:#22d3ee59}.text-cyan-400\\/40{color:#22d3ee66}.text-cyan-400\\/45{color:#22d3ee73}.text-cyan-400\\/5{color:#22d3ee0d}.text-cyan-400\\/50{color:#22d3ee80}.text-cyan-400\\/55{color:#22d3ee8c}.text-cyan-400\\/60{color:#22d3ee99}.text-cyan-400\\/65{color:#22d3eea6}.text-cyan-400\\/70{color:#22d3eeb3}.text-cyan-400\\/75{color:#22d3eebf}.text-cyan-400\\/80{color:#22d3eecc}.text-cyan-400\\/85{color:#22d3eed9}.text-cyan-400\\/90{color:#22d3eee6}.text-cyan-400\\/95{color:#22d3eef2}.text-cyan-500{--tw-text-opacity:1;color:rgb(6 182 212/var(--tw-text-opacity))}.text-cyan-500\\/0{color:#06b6d400}.text-cyan-500\\/10{color:#06b6d41a}.text-cyan-500\\/100{color:#06b6d4}.text-cyan-500\\/15{color:#06b6d426}.text-cyan-500\\/20{color:#06b6d433}.text-cyan-500\\/25{color:#06b6d440}.text-cyan-500\\/30{color:#06b6d44d}.text-cyan-500\\/35{color:#06b6d459}.text-cyan-500\\/40{color:#06b6d466}.text-cyan-500\\/45{color:#06b6d473}.text-cyan-500\\/5{color:#06b6d40d}.text-cyan-500\\/50{color:#06b6d480}.text-cyan-500\\/55{color:#06b6d48c}.text-cyan-500\\/60{color:#06b6d499}.text-cyan-500\\/65{color:#06b6d4a6}.text-cyan-500\\/70{color:#06b6d4b3}.text-cyan-500\\/75{color:#06b6d4bf}.text-cyan-500\\/80{color:#06b6d4cc}.text-cyan-500\\/85{color:#06b6d4d9}.text-cyan-500\\/90{color:#06b6d4e6}.text-cyan-500\\/95{color:#06b6d4f2}.text-emerald-400{--tw-text-opacity:1;color:rgb(52 211 153/var(--tw-text-opacity))}.text-emerald-400\\/0{color:#34d39900}.text-emerald-400\\/10{color:#34d3991a}.text-emerald-400\\/100{color:#34d399}.text-emerald-400\\/15{color:#34d39926}.text-emerald-400\\/20{color:#34d39933}.text-emerald-400\\/25{color:#34d39940}.text-emerald-400\\/30{color:#34d3994d}.text-emerald-400\\/35{color:#34d39959}.text-emerald-400\\/40{color:#34d39966}.text-emerald-400\\/45{color:#34d39973}.text-emerald-400\\/5{color:#34d3990d}.text-emerald-400\\/50{color:#34d39980}.text-emerald-400\\/55{color:#34d3998c}.text-emerald-400\\/60{color:#34d39999}.text-emerald-400\\/65{color:#34d399a6}.text-emerald-400\\/70{color:#34d399b3}.text-emerald-400\\/75{color:#34d399bf}.text-emerald-400\\/80{color:#34d399cc}.text-emerald-400\\/85{color:#34d399d9}.text-emerald-400\\/90{color:#34d399e6}.text-emerald-400\\/95{color:#34d399f2}.text-emerald-500{--tw-text-opacity:1;color:rgb(16 185 129/var(--tw-text-opacity))}.text-emerald-500\\/0{color:#10b98100}.text-emerald-500\\/10{color:#10b9811a}.text-emerald-500\\/100{color:#10b981}.text-emerald-500\\/15{color:#10b98126}.text-emerald-500\\/20{color:#10b98133}.text-emerald-500\\/25{color:#10b98140}.text-emerald-500\\/30{color:#10b9814d}.text-emerald-500\\/35{color:#10b98159}.text-emerald-500\\/40{color:#10b98166}.text-emerald-500\\/45{color:#10b98173}.text-emerald-500\\/5{color:#10b9810d}.text-emerald-500\\/50{color:#10b98180}.text-emerald-500\\/55{color:#10b9818c}.text-emerald-500\\/60{color:#10b98199}.text-emerald-500\\/65{color:#10b981a6}.text-emerald-500\\/70{color:#10b981b3}.text-emerald-500\\/75{color:#10b981bf}.text-emerald-500\\/80{color:#10b981cc}.text-emerald-500\\/85{color:#10b981d9}.text-emerald-500\\/90{color:#10b981e6}.text-emerald-500\\/95{color:#10b981f2}.text-fuchsia-400{--tw-text-opacity:1;color:rgb(232 121 249/var(--tw-text-opacity))}.text-fuchsia-400\\/0{color:#e879f900}.text-fuchsia-400\\/10{color:#e879f91a}.text-fuchsia-400\\/100{color:#e879f9}.text-fuchsia-400\\/15{color:#e879f926}.text-fuchsia-400\\/20{color:#e879f933}.text-fuchsia-400\\/25{color:#e879f940}.text-fuchsia-400\\/30{color:#e879f94d}.text-fuchsia-400\\/35{color:#e879f959}.text-fuchsia-400\\/40{color:#e879f966}.text-fuchsia-400\\/45{color:#e879f973}.text-fuchsia-400\\/5{color:#e879f90d}.text-fuchsia-400\\/50{color:#e879f980}.text-fuchsia-400\\/55{color:#e879f98c}.text-fuchsia-400\\/60{color:#e879f999}.text-fuchsia-400\\/65{color:#e879f9a6}.text-fuchsia-400\\/70{color:#e879f9b3}.text-fuchsia-400\\/75{color:#e879f9bf}.text-fuchsia-400\\/80{color:#e879f9cc}.text-fuchsia-400\\/85{color:#e879f9d9}.text-fuchsia-400\\/90{color:#e879f9e6}.text-fuchsia-400\\/95{color:#e879f9f2}.text-fuchsia-500{--tw-text-opacity:1;color:rgb(217 70 239/var(--tw-text-opacity))}.text-fuchsia-500\\/0{color:#d946ef00}.text-fuchsia-500\\/10{color:#d946ef1a}.text-fuchsia-500\\/100{color:#d946ef}.text-fuchsia-500\\/15{color:#d946ef26}.text-fuchsia-500\\/20{color:#d946ef33}.text-fuchsia-500\\/25{color:#d946ef40}.text-fuchsia-500\\/30{color:#d946ef4d}.text-fuchsia-500\\/35{color:#d946ef59}.text-fuchsia-500\\/40{color:#d946ef66}.text-fuchsia-500\\/45{color:#d946ef73}.text-fuchsia-500\\/5{color:#d946ef0d}.text-fuchsia-500\\/50{color:#d946ef80}.text-fuchsia-500\\/55{color:#d946ef8c}.text-fuchsia-500\\/60{color:#d946ef99}.text-fuchsia-500\\/65{color:#d946efa6}.text-fuchsia-500\\/70{color:#d946efb3}.text-fuchsia-500\\/75{color:#d946efbf}.text-fuchsia-500\\/80{color:#d946efcc}.text-fuchsia-500\\/85{color:#d946efd9}.text-fuchsia-500\\/90{color:#d946efe6}.text-fuchsia-500\\/95{color:#d946eff2}.text-gray-400{--tw-text-opacity:1;color:rgb(var(--color-gray-400)/var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgb(var(--color-gray-500)/var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgb(var(--color-gray-700)/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(var(--color-gray-900)/var(--tw-text-opacity))}.text-green-400{--tw-text-opacity:1;color:rgb(74 222 128/var(--tw-text-opacity))}.text-green-400\\/0{color:#4ade8000}.text-green-400\\/10{color:#4ade801a}.text-green-400\\/100{color:#4ade80}.text-green-400\\/15{color:#4ade8026}.text-green-400\\/20{color:#4ade8033}.text-green-400\\/25{color:#4ade8040}.text-green-400\\/30{color:#4ade804d}.text-green-400\\/35{color:#4ade8059}.text-green-400\\/40{color:#4ade8066}.text-green-400\\/45{color:#4ade8073}.text-green-400\\/5{color:#4ade800d}.text-green-400\\/50{color:#4ade8080}.text-green-400\\/55{color:#4ade808c}.text-green-400\\/60{color:#4ade8099}.text-green-400\\/65{color:#4ade80a6}.text-green-400\\/70{color:#4ade80b3}.text-green-400\\/75{color:#4ade80bf}.text-green-400\\/80{color:#4ade80cc}.text-green-400\\/85{color:#4ade80d9}.text-green-400\\/90{color:#4ade80e6}.text-green-400\\/95{color:#4ade80f2}.text-green-500{--tw-text-opacity:1;color:rgb(34 197 94/var(--tw-text-opacity))}.text-green-500\\/0{color:#22c55e00}.text-green-500\\/10{color:#22c55e1a}.text-green-500\\/100{color:#22c55e}.text-green-500\\/15{color:#22c55e26}.text-green-500\\/20{color:#22c55e33}.text-green-500\\/25{color:#22c55e40}.text-green-500\\/30{color:#22c55e4d}.text-green-500\\/35{color:#22c55e59}.text-green-500\\/40{color:#22c55e66}.text-green-500\\/45{color:#22c55e73}.text-green-500\\/5{color:#22c55e0d}.text-green-500\\/50{color:#22c55e80}.text-green-500\\/55{color:#22c55e8c}.text-green-500\\/60{color:#22c55e99}.text-green-500\\/65{color:#22c55ea6}.text-green-500\\/70{color:#22c55eb3}.text-green-500\\/75{color:#22c55ebf}.text-green-500\\/80{color:#22c55ecc}.text-green-500\\/85{color:#22c55ed9}.text-green-500\\/90{color:#22c55ee6}.text-green-500\\/95{color:#22c55ef2}.text-green-700{--tw-text-opacity:1;color:rgb(21 128 61/var(--tw-text-opacity))}.text-indigo-400{--tw-text-opacity:1;color:rgb(129 140 248/var(--tw-text-opacity))}.text-indigo-400\\/0{color:#818cf800}.text-indigo-400\\/10{color:#818cf81a}.text-indigo-400\\/100{color:#818cf8}.text-indigo-400\\/15{color:#818cf826}.text-indigo-400\\/20{color:#818cf833}.text-indigo-400\\/25{color:#818cf840}.text-indigo-400\\/30{color:#818cf84d}.text-indigo-400\\/35{color:#818cf859}.text-indigo-400\\/40{color:#818cf866}.text-indigo-400\\/45{color:#818cf873}.text-indigo-400\\/5{color:#818cf80d}.text-indigo-400\\/50{color:#818cf880}.text-indigo-400\\/55{color:#818cf88c}.text-indigo-400\\/60{color:#818cf899}.text-indigo-400\\/65{color:#818cf8a6}.text-indigo-400\\/70{color:#818cf8b3}.text-indigo-400\\/75{color:#818cf8bf}.text-indigo-400\\/80{color:#818cf8cc}.text-indigo-400\\/85{color:#818cf8d9}.text-indigo-400\\/90{color:#818cf8e6}.text-indigo-400\\/95{color:#818cf8f2}.text-indigo-500{--tw-text-opacity:1;color:rgb(99 102 241/var(--tw-text-opacity))}.text-indigo-500\\/0{color:#6366f100}.text-indigo-500\\/10{color:#6366f11a}.text-indigo-500\\/100{color:#6366f1}.text-indigo-500\\/15{color:#6366f126}.text-indigo-500\\/20{color:#6366f133}.text-indigo-500\\/25{color:#6366f140}.text-indigo-500\\/30{color:#6366f14d}.text-indigo-500\\/35{color:#6366f159}.text-indigo-500\\/40{color:#6366f166}.text-indigo-500\\/45{color:#6366f173}.text-indigo-500\\/5{color:#6366f10d}.text-indigo-500\\/50{color:#6366f180}.text-indigo-500\\/55{color:#6366f18c}.text-indigo-500\\/60{color:#6366f199}.text-indigo-500\\/65{color:#6366f1a6}.text-indigo-500\\/70{color:#6366f1b3}.text-indigo-500\\/75{color:#6366f1bf}.text-indigo-500\\/80{color:#6366f1cc}.text-indigo-500\\/85{color:#6366f1d9}.text-indigo-500\\/90{color:#6366f1e6}.text-indigo-500\\/95{color:#6366f1f2}.text-lime-400{--tw-text-opacity:1;color:rgb(163 230 53/var(--tw-text-opacity))}.text-lime-400\\/0{color:#a3e63500}.text-lime-400\\/10{color:#a3e6351a}.text-lime-400\\/100{color:#a3e635}.text-lime-400\\/15{color:#a3e63526}.text-lime-400\\/20{color:#a3e63533}.text-lime-400\\/25{color:#a3e63540}.text-lime-400\\/30{color:#a3e6354d}.text-lime-400\\/35{color:#a3e63559}.text-lime-400\\/40{color:#a3e63566}.text-lime-400\\/45{color:#a3e63573}.text-lime-400\\/5{color:#a3e6350d}.text-lime-400\\/50{color:#a3e63580}.text-lime-400\\/55{color:#a3e6358c}.text-lime-400\\/60{color:#a3e63599}.text-lime-400\\/65{color:#a3e635a6}.text-lime-400\\/70{color:#a3e635b3}.text-lime-400\\/75{color:#a3e635bf}.text-lime-400\\/80{color:#a3e635cc}.text-lime-400\\/85{color:#a3e635d9}.text-lime-400\\/90{color:#a3e635e6}.text-lime-400\\/95{color:#a3e635f2}.text-lime-500{--tw-text-opacity:1;color:rgb(132 204 22/var(--tw-text-opacity))}.text-lime-500\\/0{color:#84cc1600}.text-lime-500\\/10{color:#84cc161a}.text-lime-500\\/100{color:#84cc16}.text-lime-500\\/15{color:#84cc1626}.text-lime-500\\/20{color:#84cc1633}.text-lime-500\\/25{color:#84cc1640}.text-lime-500\\/30{color:#84cc164d}.text-lime-500\\/35{color:#84cc1659}.text-lime-500\\/40{color:#84cc1666}.text-lime-500\\/45{color:#84cc1673}.text-lime-500\\/5{color:#84cc160d}.text-lime-500\\/50{color:#84cc1680}.text-lime-500\\/55{color:#84cc168c}.text-lime-500\\/60{color:#84cc1699}.text-lime-500\\/65{color:#84cc16a6}.text-lime-500\\/70{color:#84cc16b3}.text-lime-500\\/75{color:#84cc16bf}.text-lime-500\\/80{color:#84cc16cc}.text-lime-500\\/85{color:#84cc16d9}.text-lime-500\\/90{color:#84cc16e6}.text-lime-500\\/95{color:#84cc16f2}.text-orange-400{--tw-text-opacity:1;color:rgb(251 146 60/var(--tw-text-opacity))}.text-orange-400\\/0{color:#fb923c00}.text-orange-400\\/10{color:#fb923c1a}.text-orange-400\\/100{color:#fb923c}.text-orange-400\\/15{color:#fb923c26}.text-orange-400\\/20{color:#fb923c33}.text-orange-400\\/25{color:#fb923c40}.text-orange-400\\/30{color:#fb923c4d}.text-orange-400\\/35{color:#fb923c59}.text-orange-400\\/40{color:#fb923c66}.text-orange-400\\/45{color:#fb923c73}.text-orange-400\\/5{color:#fb923c0d}.text-orange-400\\/50{color:#fb923c80}.text-orange-400\\/55{color:#fb923c8c}.text-orange-400\\/60{color:#fb923c99}.text-orange-400\\/65{color:#fb923ca6}.text-orange-400\\/70{color:#fb923cb3}.text-orange-400\\/75{color:#fb923cbf}.text-orange-400\\/80{color:#fb923ccc}.text-orange-400\\/85{color:#fb923cd9}.text-orange-400\\/90{color:#fb923ce6}.text-orange-400\\/95{color:#fb923cf2}.text-orange-500{--tw-text-opacity:1;color:rgb(249 115 22/var(--tw-text-opacity))}.text-orange-500\\/0{color:#f9731600}.text-orange-500\\/10{color:#f973161a}.text-orange-500\\/100{color:#f97316}.text-orange-500\\/15{color:#f9731626}.text-orange-500\\/20{color:#f9731633}.text-orange-500\\/25{color:#f9731640}.text-orange-500\\/30{color:#f973164d}.text-orange-500\\/35{color:#f9731659}.text-orange-500\\/40{color:#f9731666}.text-orange-500\\/45{color:#f9731673}.text-orange-500\\/5{color:#f973160d}.text-orange-500\\/50{color:#f9731680}.text-orange-500\\/55{color:#f973168c}.text-orange-500\\/60{color:#f9731699}.text-orange-500\\/65{color:#f97316a6}.text-orange-500\\/70{color:#f97316b3}.text-orange-500\\/75{color:#f97316bf}.text-orange-500\\/80{color:#f97316cc}.text-orange-500\\/85{color:#f97316d9}.text-orange-500\\/90{color:#f97316e6}.text-orange-500\\/95{color:#f97316f2}.text-orange-600{--tw-text-opacity:1;color:rgb(234 88 12/var(--tw-text-opacity))}.text-pink-400{--tw-text-opacity:1;color:rgb(244 114 182/var(--tw-text-opacity))}.text-pink-400\\/0{color:#f472b600}.text-pink-400\\/10{color:#f472b61a}.text-pink-400\\/100{color:#f472b6}.text-pink-400\\/15{color:#f472b626}.text-pink-400\\/20{color:#f472b633}.text-pink-400\\/25{color:#f472b640}.text-pink-400\\/30{color:#f472b64d}.text-pink-400\\/35{color:#f472b659}.text-pink-400\\/40{color:#f472b666}.text-pink-400\\/45{color:#f472b673}.text-pink-400\\/5{color:#f472b60d}.text-pink-400\\/50{color:#f472b680}.text-pink-400\\/55{color:#f472b68c}.text-pink-400\\/60{color:#f472b699}.text-pink-400\\/65{color:#f472b6a6}.text-pink-400\\/70{color:#f472b6b3}.text-pink-400\\/75{color:#f472b6bf}.text-pink-400\\/80{color:#f472b6cc}.text-pink-400\\/85{color:#f472b6d9}.text-pink-400\\/90{color:#f472b6e6}.text-pink-400\\/95{color:#f472b6f2}.text-pink-500{--tw-text-opacity:1;color:rgb(236 72 153/var(--tw-text-opacity))}.text-pink-500\\/0{color:#ec489900}.text-pink-500\\/10{color:#ec48991a}.text-pink-500\\/100{color:#ec4899}.text-pink-500\\/15{color:#ec489926}.text-pink-500\\/20{color:#ec489933}.text-pink-500\\/25{color:#ec489940}.text-pink-500\\/30{color:#ec48994d}.text-pink-500\\/35{color:#ec489959}.text-pink-500\\/40{color:#ec489966}.text-pink-500\\/45{color:#ec489973}.text-pink-500\\/5{color:#ec48990d}.text-pink-500\\/50{color:#ec489980}.text-pink-500\\/55{color:#ec48998c}.text-pink-500\\/60{color:#ec489999}.text-pink-500\\/65{color:#ec4899a6}.text-pink-500\\/70{color:#ec4899b3}.text-pink-500\\/75{color:#ec4899bf}.text-pink-500\\/80{color:#ec4899cc}.text-pink-500\\/85{color:#ec4899d9}.text-pink-500\\/90{color:#ec4899e6}.text-pink-500\\/95{color:#ec4899f2}.text-primary-400{--tw-text-opacity:1;color:rgb(var(--color-primary-400)/var(--tw-text-opacity))}.text-primary-400\\/0{color:rgb(var(--color-primary-400)/0)}.text-primary-400\\/10{color:rgb(var(--color-primary-400)/.1)}.text-primary-400\\/100{color:rgb(var(--color-primary-400)/1)}.text-primary-400\\/15{color:rgb(var(--color-primary-400)/.15)}.text-primary-400\\/20{color:rgb(var(--color-primary-400)/.2)}.text-primary-400\\/25{color:rgb(var(--color-primary-400)/.25)}.text-primary-400\\/30{color:rgb(var(--color-primary-400)/.3)}.text-primary-400\\/35{color:rgb(var(--color-primary-400)/.35)}.text-primary-400\\/40{color:rgb(var(--color-primary-400)/.4)}.text-primary-400\\/45{color:rgb(var(--color-primary-400)/.45)}.text-primary-400\\/5{color:rgb(var(--color-primary-400)/.05)}.text-primary-400\\/50{color:rgb(var(--color-primary-400)/.5)}.text-primary-400\\/55{color:rgb(var(--color-primary-400)/.55)}.text-primary-400\\/60{color:rgb(var(--color-primary-400)/.6)}.text-primary-400\\/65{color:rgb(var(--color-primary-400)/.65)}.text-primary-400\\/70{color:rgb(var(--color-primary-400)/.7)}.text-primary-400\\/75{color:rgb(var(--color-primary-400)/.75)}.text-primary-400\\/80{color:rgb(var(--color-primary-400)/.8)}.text-primary-400\\/85{color:rgb(var(--color-primary-400)/.85)}.text-primary-400\\/90{color:rgb(var(--color-primary-400)/.9)}.text-primary-400\\/95{color:rgb(var(--color-primary-400)/.95)}.text-primary-500{--tw-text-opacity:1;color:rgb(var(--color-primary-500)/var(--tw-text-opacity))}.text-primary-500\\/0{color:rgb(var(--color-primary-500)/0)}.text-primary-500\\/10{color:rgb(var(--color-primary-500)/.1)}.text-primary-500\\/100{color:rgb(var(--color-primary-500)/1)}.text-primary-500\\/15{color:rgb(var(--color-primary-500)/.15)}.text-primary-500\\/20{color:rgb(var(--color-primary-500)/.2)}.text-primary-500\\/25{color:rgb(var(--color-primary-500)/.25)}.text-primary-500\\/30{color:rgb(var(--color-primary-500)/.3)}.text-primary-500\\/35{color:rgb(var(--color-primary-500)/.35)}.text-primary-500\\/40{color:rgb(var(--color-primary-500)/.4)}.text-primary-500\\/45{color:rgb(var(--color-primary-500)/.45)}.text-primary-500\\/5{color:rgb(var(--color-primary-500)/.05)}.text-primary-500\\/50{color:rgb(var(--color-primary-500)/.5)}.text-primary-500\\/55{color:rgb(var(--color-primary-500)/.55)}.text-primary-500\\/60{color:rgb(var(--color-primary-500)/.6)}.text-primary-500\\/65{color:rgb(var(--color-primary-500)/.65)}.text-primary-500\\/70{color:rgb(var(--color-primary-500)/.7)}.text-primary-500\\/75{color:rgb(var(--color-primary-500)/.75)}.text-primary-500\\/80{color:rgb(var(--color-primary-500)/.8)}.text-primary-500\\/85{color:rgb(var(--color-primary-500)/.85)}.text-primary-500\\/90{color:rgb(var(--color-primary-500)/.9)}.text-primary-500\\/95{color:rgb(var(--color-primary-500)/.95)}.text-primary-600{--tw-text-opacity:1;color:rgb(var(--color-primary-600)/var(--tw-text-opacity))}.text-primary-600\\/0{color:rgb(var(--color-primary-600)/0)}.text-primary-600\\/10{color:rgb(var(--color-primary-600)/.1)}.text-primary-600\\/100{color:rgb(var(--color-primary-600)/1)}.text-primary-600\\/15{color:rgb(var(--color-primary-600)/.15)}.text-primary-600\\/20{color:rgb(var(--color-primary-600)/.2)}.text-primary-600\\/25{color:rgb(var(--color-primary-600)/.25)}.text-primary-600\\/30{color:rgb(var(--color-primary-600)/.3)}.text-primary-600\\/35{color:rgb(var(--color-primary-600)/.35)}.text-primary-600\\/40{color:rgb(var(--color-primary-600)/.4)}.text-primary-600\\/45{color:rgb(var(--color-primary-600)/.45)}.text-primary-600\\/5{color:rgb(var(--color-primary-600)/.05)}.text-primary-600\\/50{color:rgb(var(--color-primary-600)/.5)}.text-primary-600\\/55{color:rgb(var(--color-primary-600)/.55)}.text-primary-600\\/60{color:rgb(var(--color-primary-600)/.6)}.text-primary-600\\/65{color:rgb(var(--color-primary-600)/.65)}.text-primary-600\\/70{color:rgb(var(--color-primary-600)/.7)}.text-primary-600\\/75{color:rgb(var(--color-primary-600)/.75)}.text-primary-600\\/80{color:rgb(var(--color-primary-600)/.8)}.text-primary-600\\/85{color:rgb(var(--color-primary-600)/.85)}.text-primary-600\\/90{color:rgb(var(--color-primary-600)/.9)}.text-primary-600\\/95{color:rgb(var(--color-primary-600)/.95)}.text-purple-400{--tw-text-opacity:1;color:rgb(192 132 252/var(--tw-text-opacity))}.text-purple-400\\/0{color:#c084fc00}.text-purple-400\\/10{color:#c084fc1a}.text-purple-400\\/100{color:#c084fc}.text-purple-400\\/15{color:#c084fc26}.text-purple-400\\/20{color:#c084fc33}.text-purple-400\\/25{color:#c084fc40}.text-purple-400\\/30{color:#c084fc4d}.text-purple-400\\/35{color:#c084fc59}.text-purple-400\\/40{color:#c084fc66}.text-purple-400\\/45{color:#c084fc73}.text-purple-400\\/5{color:#c084fc0d}.text-purple-400\\/50{color:#c084fc80}.text-purple-400\\/55{color:#c084fc8c}.text-purple-400\\/60{color:#c084fc99}.text-purple-400\\/65{color:#c084fca6}.text-purple-400\\/70{color:#c084fcb3}.text-purple-400\\/75{color:#c084fcbf}.text-purple-400\\/80{color:#c084fccc}.text-purple-400\\/85{color:#c084fcd9}.text-purple-400\\/90{color:#c084fce6}.text-purple-400\\/95{color:#c084fcf2}.text-purple-500{--tw-text-opacity:1;color:rgb(168 85 247/var(--tw-text-opacity))}.text-purple-500\\/0{color:#a855f700}.text-purple-500\\/10{color:#a855f71a}.text-purple-500\\/100{color:#a855f7}.text-purple-500\\/15{color:#a855f726}.text-purple-500\\/20{color:#a855f733}.text-purple-500\\/25{color:#a855f740}.text-purple-500\\/30{color:#a855f74d}.text-purple-500\\/35{color:#a855f759}.text-purple-500\\/40{color:#a855f766}.text-purple-500\\/45{color:#a855f773}.text-purple-500\\/5{color:#a855f70d}.text-purple-500\\/50{color:#a855f780}.text-purple-500\\/55{color:#a855f78c}.text-purple-500\\/60{color:#a855f799}.text-purple-500\\/65{color:#a855f7a6}.text-purple-500\\/70{color:#a855f7b3}.text-purple-500\\/75{color:#a855f7bf}.text-purple-500\\/80{color:#a855f7cc}.text-purple-500\\/85{color:#a855f7d9}.text-purple-500\\/90{color:#a855f7e6}.text-purple-500\\/95{color:#a855f7f2}.text-red-400{--tw-text-opacity:1;color:rgb(248 113 113/var(--tw-text-opacity))}.text-red-400\\/0{color:#f8717100}.text-red-400\\/10{color:#f871711a}.text-red-400\\/100{color:#f87171}.text-red-400\\/15{color:#f8717126}.text-red-400\\/20{color:#f8717133}.text-red-400\\/25{color:#f8717140}.text-red-400\\/30{color:#f871714d}.text-red-400\\/35{color:#f8717159}.text-red-400\\/40{color:#f8717166}.text-red-400\\/45{color:#f8717173}.text-red-400\\/5{color:#f871710d}.text-red-400\\/50{color:#f8717180}.text-red-400\\/55{color:#f871718c}.text-red-400\\/60{color:#f8717199}.text-red-400\\/65{color:#f87171a6}.text-red-400\\/70{color:#f87171b3}.text-red-400\\/75{color:#f87171bf}.text-red-400\\/80{color:#f87171cc}.text-red-400\\/85{color:#f87171d9}.text-red-400\\/90{color:#f87171e6}.text-red-400\\/95{color:#f87171f2}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-red-500\\/0{color:#ef444400}.text-red-500\\/10{color:#ef44441a}.text-red-500\\/100{color:#ef4444}.text-red-500\\/15{color:#ef444426}.text-red-500\\/20{color:#ef444433}.text-red-500\\/25{color:#ef444440}.text-red-500\\/30{color:#ef44444d}.text-red-500\\/35{color:#ef444459}.text-red-500\\/40{color:#ef444466}.text-red-500\\/45{color:#ef444473}.text-red-500\\/5{color:#ef44440d}.text-red-500\\/50{color:#ef444480}.text-red-500\\/55{color:#ef44448c}.text-red-500\\/60{color:#ef444499}.text-red-500\\/65{color:#ef4444a6}.text-red-500\\/70{color:#ef4444b3}.text-red-500\\/75{color:#ef4444bf}.text-red-500\\/80{color:#ef4444cc}.text-red-500\\/85{color:#ef4444d9}.text-red-500\\/90{color:#ef4444e6}.text-red-500\\/95{color:#ef4444f2}.text-rose-400{--tw-text-opacity:1;color:rgb(251 113 133/var(--tw-text-opacity))}.text-rose-400\\/0{color:#fb718500}.text-rose-400\\/10{color:#fb71851a}.text-rose-400\\/100{color:#fb7185}.text-rose-400\\/15{color:#fb718526}.text-rose-400\\/20{color:#fb718533}.text-rose-400\\/25{color:#fb718540}.text-rose-400\\/30{color:#fb71854d}.text-rose-400\\/35{color:#fb718559}.text-rose-400\\/40{color:#fb718566}.text-rose-400\\/45{color:#fb718573}.text-rose-400\\/5{color:#fb71850d}.text-rose-400\\/50{color:#fb718580}.text-rose-400\\/55{color:#fb71858c}.text-rose-400\\/60{color:#fb718599}.text-rose-400\\/65{color:#fb7185a6}.text-rose-400\\/70{color:#fb7185b3}.text-rose-400\\/75{color:#fb7185bf}.text-rose-400\\/80{color:#fb7185cc}.text-rose-400\\/85{color:#fb7185d9}.text-rose-400\\/90{color:#fb7185e6}.text-rose-400\\/95{color:#fb7185f2}.text-rose-500{--tw-text-opacity:1;color:rgb(244 63 94/var(--tw-text-opacity))}.text-rose-500\\/0{color:#f43f5e00}.text-rose-500\\/10{color:#f43f5e1a}.text-rose-500\\/100{color:#f43f5e}.text-rose-500\\/15{color:#f43f5e26}.text-rose-500\\/20{color:#f43f5e33}.text-rose-500\\/25{color:#f43f5e40}.text-rose-500\\/30{color:#f43f5e4d}.text-rose-500\\/35{color:#f43f5e59}.text-rose-500\\/40{color:#f43f5e66}.text-rose-500\\/45{color:#f43f5e73}.text-rose-500\\/5{color:#f43f5e0d}.text-rose-500\\/50{color:#f43f5e80}.text-rose-500\\/55{color:#f43f5e8c}.text-rose-500\\/60{color:#f43f5e99}.text-rose-500\\/65{color:#f43f5ea6}.text-rose-500\\/70{color:#f43f5eb3}.text-rose-500\\/75{color:#f43f5ebf}.text-rose-500\\/80{color:#f43f5ecc}.text-rose-500\\/85{color:#f43f5ed9}.text-rose-500\\/90{color:#f43f5ee6}.text-rose-500\\/95{color:#f43f5ef2}.text-sky-400{--tw-text-opacity:1;color:rgb(56 189 248/var(--tw-text-opacity))}.text-sky-400\\/0{color:#38bdf800}.text-sky-400\\/10{color:#38bdf81a}.text-sky-400\\/100{color:#38bdf8}.text-sky-400\\/15{color:#38bdf826}.text-sky-400\\/20{color:#38bdf833}.text-sky-400\\/25{color:#38bdf840}.text-sky-400\\/30{color:#38bdf84d}.text-sky-400\\/35{color:#38bdf859}.text-sky-400\\/40{color:#38bdf866}.text-sky-400\\/45{color:#38bdf873}.text-sky-400\\/5{color:#38bdf80d}.text-sky-400\\/50{color:#38bdf880}.text-sky-400\\/55{color:#38bdf88c}.text-sky-400\\/60{color:#38bdf899}.text-sky-400\\/65{color:#38bdf8a6}.text-sky-400\\/70{color:#38bdf8b3}.text-sky-400\\/75{color:#38bdf8bf}.text-sky-400\\/80{color:#38bdf8cc}.text-sky-400\\/85{color:#38bdf8d9}.text-sky-400\\/90{color:#38bdf8e6}.text-sky-400\\/95{color:#38bdf8f2}.text-sky-500{--tw-text-opacity:1;color:rgb(14 165 233/var(--tw-text-opacity))}.text-sky-500\\/0{color:#0ea5e900}.text-sky-500\\/10{color:#0ea5e91a}.text-sky-500\\/100{color:#0ea5e9}.text-sky-500\\/15{color:#0ea5e926}.text-sky-500\\/20{color:#0ea5e933}.text-sky-500\\/25{color:#0ea5e940}.text-sky-500\\/30{color:#0ea5e94d}.text-sky-500\\/35{color:#0ea5e959}.text-sky-500\\/40{color:#0ea5e966}.text-sky-500\\/45{color:#0ea5e973}.text-sky-500\\/5{color:#0ea5e90d}.text-sky-500\\/50{color:#0ea5e980}.text-sky-500\\/55{color:#0ea5e98c}.text-sky-500\\/60{color:#0ea5e999}.text-sky-500\\/65{color:#0ea5e9a6}.text-sky-500\\/70{color:#0ea5e9b3}.text-sky-500\\/75{color:#0ea5e9bf}.text-sky-500\\/80{color:#0ea5e9cc}.text-sky-500\\/85{color:#0ea5e9d9}.text-sky-500\\/90{color:#0ea5e9e6}.text-sky-500\\/95{color:#0ea5e9f2}.text-teal-400{--tw-text-opacity:1;color:rgb(45 212 191/var(--tw-text-opacity))}.text-teal-400\\/0{color:#2dd4bf00}.text-teal-400\\/10{color:#2dd4bf1a}.text-teal-400\\/100{color:#2dd4bf}.text-teal-400\\/15{color:#2dd4bf26}.text-teal-400\\/20{color:#2dd4bf33}.text-teal-400\\/25{color:#2dd4bf40}.text-teal-400\\/30{color:#2dd4bf4d}.text-teal-400\\/35{color:#2dd4bf59}.text-teal-400\\/40{color:#2dd4bf66}.text-teal-400\\/45{color:#2dd4bf73}.text-teal-400\\/5{color:#2dd4bf0d}.text-teal-400\\/50{color:#2dd4bf80}.text-teal-400\\/55{color:#2dd4bf8c}.text-teal-400\\/60{color:#2dd4bf99}.text-teal-400\\/65{color:#2dd4bfa6}.text-teal-400\\/70{color:#2dd4bfb3}.text-teal-400\\/75{color:#2dd4bfbf}.text-teal-400\\/80{color:#2dd4bfcc}.text-teal-400\\/85{color:#2dd4bfd9}.text-teal-400\\/90{color:#2dd4bfe6}.text-teal-400\\/95{color:#2dd4bff2}.text-teal-500{--tw-text-opacity:1;color:rgb(20 184 166/var(--tw-text-opacity))}.text-teal-500\\/0{color:#14b8a600}.text-teal-500\\/10{color:#14b8a61a}.text-teal-500\\/100{color:#14b8a6}.text-teal-500\\/15{color:#14b8a626}.text-teal-500\\/20{color:#14b8a633}.text-teal-500\\/25{color:#14b8a640}.text-teal-500\\/30{color:#14b8a64d}.text-teal-500\\/35{color:#14b8a659}.text-teal-500\\/40{color:#14b8a666}.text-teal-500\\/45{color:#14b8a673}.text-teal-500\\/5{color:#14b8a60d}.text-teal-500\\/50{color:#14b8a680}.text-teal-500\\/55{color:#14b8a68c}.text-teal-500\\/60{color:#14b8a699}.text-teal-500\\/65{color:#14b8a6a6}.text-teal-500\\/70{color:#14b8a6b3}.text-teal-500\\/75{color:#14b8a6bf}.text-teal-500\\/80{color:#14b8a6cc}.text-teal-500\\/85{color:#14b8a6d9}.text-teal-500\\/90{color:#14b8a6e6}.text-teal-500\\/95{color:#14b8a6f2}.text-violet-400{--tw-text-opacity:1;color:rgb(167 139 250/var(--tw-text-opacity))}.text-violet-400\\/0{color:#a78bfa00}.text-violet-400\\/10{color:#a78bfa1a}.text-violet-400\\/100{color:#a78bfa}.text-violet-400\\/15{color:#a78bfa26}.text-violet-400\\/20{color:#a78bfa33}.text-violet-400\\/25{color:#a78bfa40}.text-violet-400\\/30{color:#a78bfa4d}.text-violet-400\\/35{color:#a78bfa59}.text-violet-400\\/40{color:#a78bfa66}.text-violet-400\\/45{color:#a78bfa73}.text-violet-400\\/5{color:#a78bfa0d}.text-violet-400\\/50{color:#a78bfa80}.text-violet-400\\/55{color:#a78bfa8c}.text-violet-400\\/60{color:#a78bfa99}.text-violet-400\\/65{color:#a78bfaa6}.text-violet-400\\/70{color:#a78bfab3}.text-violet-400\\/75{color:#a78bfabf}.text-violet-400\\/80{color:#a78bfacc}.text-violet-400\\/85{color:#a78bfad9}.text-violet-400\\/90{color:#a78bfae6}.text-violet-400\\/95{color:#a78bfaf2}.text-violet-500{--tw-text-opacity:1;color:rgb(139 92 246/var(--tw-text-opacity))}.text-violet-500\\/0{color:#8b5cf600}.text-violet-500\\/10{color:#8b5cf61a}.text-violet-500\\/100{color:#8b5cf6}.text-violet-500\\/15{color:#8b5cf626}.text-violet-500\\/20{color:#8b5cf633}.text-violet-500\\/25{color:#8b5cf640}.text-violet-500\\/30{color:#8b5cf64d}.text-violet-500\\/35{color:#8b5cf659}.text-violet-500\\/40{color:#8b5cf666}.text-violet-500\\/45{color:#8b5cf673}.text-violet-500\\/5{color:#8b5cf60d}.text-violet-500\\/50{color:#8b5cf680}.text-violet-500\\/55{color:#8b5cf68c}.text-violet-500\\/60{color:#8b5cf699}.text-violet-500\\/65{color:#8b5cf6a6}.text-violet-500\\/70{color:#8b5cf6b3}.text-violet-500\\/75{color:#8b5cf6bf}.text-violet-500\\/80{color:#8b5cf6cc}.text-violet-500\\/85{color:#8b5cf6d9}.text-violet-500\\/90{color:#8b5cf6e6}.text-violet-500\\/95{color:#8b5cf6f2}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.text-yellow-400{--tw-text-opacity:1;color:rgb(250 204 21/var(--tw-text-opacity))}.text-yellow-400\\/0{color:#facc1500}.text-yellow-400\\/10{color:#facc151a}.text-yellow-400\\/100{color:#facc15}.text-yellow-400\\/15{color:#facc1526}.text-yellow-400\\/20{color:#facc1533}.text-yellow-400\\/25{color:#facc1540}.text-yellow-400\\/30{color:#facc154d}.text-yellow-400\\/35{color:#facc1559}.text-yellow-400\\/40{color:#facc1566}.text-yellow-400\\/45{color:#facc1573}.text-yellow-400\\/5{color:#facc150d}.text-yellow-400\\/50{color:#facc1580}.text-yellow-400\\/55{color:#facc158c}.text-yellow-400\\/60{color:#facc1599}.text-yellow-400\\/65{color:#facc15a6}.text-yellow-400\\/70{color:#facc15b3}.text-yellow-400\\/75{color:#facc15bf}.text-yellow-400\\/80{color:#facc15cc}.text-yellow-400\\/85{color:#facc15d9}.text-yellow-400\\/90{color:#facc15e6}.text-yellow-400\\/95{color:#facc15f2}.text-yellow-500{--tw-text-opacity:1;color:rgb(234 179 8/var(--tw-text-opacity))}.text-yellow-500\\/0{color:#eab30800}.text-yellow-500\\/10{color:#eab3081a}.text-yellow-500\\/100{color:#eab308}.text-yellow-500\\/15{color:#eab30826}.text-yellow-500\\/20{color:#eab30833}.text-yellow-500\\/25{color:#eab30840}.text-yellow-500\\/30{color:#eab3084d}.text-yellow-500\\/35{color:#eab30859}.text-yellow-500\\/40{color:#eab30866}.text-yellow-500\\/45{color:#eab30873}.text-yellow-500\\/5{color:#eab3080d}.text-yellow-500\\/50{color:#eab30880}.text-yellow-500\\/55{color:#eab3088c}.text-yellow-500\\/60{color:#eab30899}.text-yellow-500\\/65{color:#eab308a6}.text-yellow-500\\/70{color:#eab308b3}.text-yellow-500\\/75{color:#eab308bf}.text-yellow-500\\/80{color:#eab308cc}.text-yellow-500\\/85{color:#eab308d9}.text-yellow-500\\/90{color:#eab308e6}.text-yellow-500\\/95{color:#eab308f2}.underline-offset-4{text-underline-offset:4px}.placeholder-gray-400::placeholder{--tw-placeholder-opacity:1;color:rgb(var(--color-gray-400)/var(--tw-placeholder-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-50{opacity:.5}.opacity-90{opacity:.9}.mix-blend-overlay{mix-blend-mode:overlay}.shadow{--tw-shadow:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px #0000001a,0 4px 6px -4px #0000001a;--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.shadow-sm,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.outline{outline-style:solid}.outline-orange-400{outline-color:#fb923c}.outline-orange-500{outline-color:#f97316}.outline-primary-400{outline-color:rgb(var(--color-primary-400)/1)}.outline-primary-400\\/0{outline-color:rgb(var(--color-primary-400)/0)}.outline-primary-400\\/10{outline-color:rgb(var(--color-primary-400)/.1)}.outline-primary-400\\/100{outline-color:rgb(var(--color-primary-400)/1)}.outline-primary-400\\/15{outline-color:rgb(var(--color-primary-400)/.15)}.outline-primary-400\\/20{outline-color:rgb(var(--color-primary-400)/.2)}.outline-primary-400\\/25{outline-color:rgb(var(--color-primary-400)/.25)}.outline-primary-400\\/30{outline-color:rgb(var(--color-primary-400)/.3)}.outline-primary-400\\/35{outline-color:rgb(var(--color-primary-400)/.35)}.outline-primary-400\\/40{outline-color:rgb(var(--color-primary-400)/.4)}.outline-primary-400\\/45{outline-color:rgb(var(--color-primary-400)/.45)}.outline-primary-400\\/5{outline-color:rgb(var(--color-primary-400)/.05)}.outline-primary-400\\/50{outline-color:rgb(var(--color-primary-400)/.5)}.outline-primary-400\\/55{outline-color:rgb(var(--color-primary-400)/.55)}.outline-primary-400\\/60{outline-color:rgb(var(--color-primary-400)/.6)}.outline-primary-400\\/65{outline-color:rgb(var(--color-primary-400)/.65)}.outline-primary-400\\/70{outline-color:rgb(var(--color-primary-400)/.7)}.outline-primary-400\\/75{outline-color:rgb(var(--color-primary-400)/.75)}.outline-primary-400\\/80{outline-color:rgb(var(--color-primary-400)/.8)}.outline-primary-400\\/85{outline-color:rgb(var(--color-primary-400)/.85)}.outline-primary-400\\/90{outline-color:rgb(var(--color-primary-400)/.9)}.outline-primary-400\\/95{outline-color:rgb(var(--color-primary-400)/.95)}.outline-primary-500{outline-color:rgb(var(--color-primary-500)/1)}.outline-primary-500\\/0{outline-color:rgb(var(--color-primary-500)/0)}.outline-primary-500\\/10{outline-color:rgb(var(--color-primary-500)/.1)}.outline-primary-500\\/100{outline-color:rgb(var(--color-primary-500)/1)}.outline-primary-500\\/15{outline-color:rgb(var(--color-primary-500)/.15)}.outline-primary-500\\/20{outline-color:rgb(var(--color-primary-500)/.2)}.outline-primary-500\\/25{outline-color:rgb(var(--color-primary-500)/.25)}.outline-primary-500\\/30{outline-color:rgb(var(--color-primary-500)/.3)}.outline-primary-500\\/35{outline-color:rgb(var(--color-primary-500)/.35)}.outline-primary-500\\/40{outline-color:rgb(var(--color-primary-500)/.4)}.outline-primary-500\\/45{outline-color:rgb(var(--color-primary-500)/.45)}.outline-primary-500\\/5{outline-color:rgb(var(--color-primary-500)/.05)}.outline-primary-500\\/50{outline-color:rgb(var(--color-primary-500)/.5)}.outline-primary-500\\/55{outline-color:rgb(var(--color-primary-500)/.55)}.outline-primary-500\\/60{outline-color:rgb(var(--color-primary-500)/.6)}.outline-primary-500\\/65{outline-color:rgb(var(--color-primary-500)/.65)}.outline-primary-500\\/70{outline-color:rgb(var(--color-primary-500)/.7)}.outline-primary-500\\/75{outline-color:rgb(var(--color-primary-500)/.75)}.outline-primary-500\\/80{outline-color:rgb(var(--color-primary-500)/.8)}.outline-primary-500\\/85{outline-color:rgb(var(--color-primary-500)/.85)}.outline-primary-500\\/90{outline-color:rgb(var(--color-primary-500)/.9)}.outline-primary-500\\/95{outline-color:rgb(var(--color-primary-500)/.95)}.ring{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring,.ring-0{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-0{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring-1{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring-1,.ring-2{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-2{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring-inset{--tw-ring-inset:inset}.ring-current{--tw-ring-color:currentColor}.ring-gray-200{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-200)/var(--tw-ring-opacity))}.ring-gray-300{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-300)/var(--tw-ring-opacity))}.ring-orange-400{--tw-ring-opacity:1;--tw-ring-color:rgb(251 146 60/var(--tw-ring-opacity))}.ring-orange-500{--tw-ring-opacity:1;--tw-ring-color:rgb(249 115 22/var(--tw-ring-opacity))}.ring-primary-400{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}.ring-primary-400\\/0{--tw-ring-color:rgb(var(--color-primary-400)/0)}.ring-primary-400\\/10{--tw-ring-color:rgb(var(--color-primary-400)/0.1)}.ring-primary-400\\/100{--tw-ring-color:rgb(var(--color-primary-400)/1)}.ring-primary-400\\/15{--tw-ring-color:rgb(var(--color-primary-400)/0.15)}.ring-primary-400\\/20{--tw-ring-color:rgb(var(--color-primary-400)/0.2)}.ring-primary-400\\/25{--tw-ring-color:rgb(var(--color-primary-400)/0.25)}.ring-primary-400\\/30{--tw-ring-color:rgb(var(--color-primary-400)/0.3)}.ring-primary-400\\/35{--tw-ring-color:rgb(var(--color-primary-400)/0.35)}.ring-primary-400\\/40{--tw-ring-color:rgb(var(--color-primary-400)/0.4)}.ring-primary-400\\/45{--tw-ring-color:rgb(var(--color-primary-400)/0.45)}.ring-primary-400\\/5{--tw-ring-color:rgb(var(--color-primary-400)/0.05)}.ring-primary-400\\/50{--tw-ring-color:rgb(var(--color-primary-400)/0.5)}.ring-primary-400\\/55{--tw-ring-color:rgb(var(--color-primary-400)/0.55)}.ring-primary-400\\/60{--tw-ring-color:rgb(var(--color-primary-400)/0.6)}.ring-primary-400\\/65{--tw-ring-color:rgb(var(--color-primary-400)/0.65)}.ring-primary-400\\/70{--tw-ring-color:rgb(var(--color-primary-400)/0.7)}.ring-primary-400\\/75{--tw-ring-color:rgb(var(--color-primary-400)/0.75)}.ring-primary-400\\/80{--tw-ring-color:rgb(var(--color-primary-400)/0.8)}.ring-primary-400\\/85{--tw-ring-color:rgb(var(--color-primary-400)/0.85)}.ring-primary-400\\/90{--tw-ring-color:rgb(var(--color-primary-400)/0.9)}.ring-primary-400\\/95{--tw-ring-color:rgb(var(--color-primary-400)/0.95)}.ring-primary-500{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-500)/var(--tw-ring-opacity))}.ring-primary-500\\/0{--tw-ring-color:rgb(var(--color-primary-500)/0)}.ring-primary-500\\/10{--tw-ring-color:rgb(var(--color-primary-500)/0.1)}.ring-primary-500\\/100{--tw-ring-color:rgb(var(--color-primary-500)/1)}.ring-primary-500\\/15{--tw-ring-color:rgb(var(--color-primary-500)/0.15)}.ring-primary-500\\/20{--tw-ring-color:rgb(var(--color-primary-500)/0.2)}.ring-primary-500\\/25{--tw-ring-color:rgb(var(--color-primary-500)/0.25)}.ring-primary-500\\/30{--tw-ring-color:rgb(var(--color-primary-500)/0.3)}.ring-primary-500\\/35{--tw-ring-color:rgb(var(--color-primary-500)/0.35)}.ring-primary-500\\/40{--tw-ring-color:rgb(var(--color-primary-500)/0.4)}.ring-primary-500\\/45{--tw-ring-color:rgb(var(--color-primary-500)/0.45)}.ring-primary-500\\/5{--tw-ring-color:rgb(var(--color-primary-500)/0.05)}.ring-primary-500\\/50{--tw-ring-color:rgb(var(--color-primary-500)/0.5)}.ring-primary-500\\/55{--tw-ring-color:rgb(var(--color-primary-500)/0.55)}.ring-primary-500\\/60{--tw-ring-color:rgb(var(--color-primary-500)/0.6)}.ring-primary-500\\/65{--tw-ring-color:rgb(var(--color-primary-500)/0.65)}.ring-primary-500\\/70{--tw-ring-color:rgb(var(--color-primary-500)/0.7)}.ring-primary-500\\/75{--tw-ring-color:rgb(var(--color-primary-500)/0.75)}.ring-primary-500\\/80{--tw-ring-color:rgb(var(--color-primary-500)/0.8)}.ring-primary-500\\/85{--tw-ring-color:rgb(var(--color-primary-500)/0.85)}.ring-primary-500\\/90{--tw-ring-color:rgb(var(--color-primary-500)/0.9)}.ring-primary-500\\/95{--tw-ring-color:rgb(var(--color-primary-500)/0.95)}.ring-red-400{--tw-ring-opacity:1;--tw-ring-color:rgb(248 113 113/var(--tw-ring-opacity))}.ring-red-400\\/0{--tw-ring-color:#f8717100}.ring-red-400\\/10{--tw-ring-color:#f871711a}.ring-red-400\\/100{--tw-ring-color:#f87171}.ring-red-400\\/15{--tw-ring-color:#f8717126}.ring-red-400\\/20{--tw-ring-color:#f8717133}.ring-red-400\\/25{--tw-ring-color:#f8717140}.ring-red-400\\/30{--tw-ring-color:#f871714d}.ring-red-400\\/35{--tw-ring-color:#f8717159}.ring-red-400\\/40{--tw-ring-color:#f8717166}.ring-red-400\\/45{--tw-ring-color:#f8717173}.ring-red-400\\/5{--tw-ring-color:#f871710d}.ring-red-400\\/50{--tw-ring-color:#f8717180}.ring-red-400\\/55{--tw-ring-color:#f871718c}.ring-red-400\\/60{--tw-ring-color:#f8717199}.ring-red-400\\/65{--tw-ring-color:#f87171a6}.ring-red-400\\/70{--tw-ring-color:#f87171b3}.ring-red-400\\/75{--tw-ring-color:#f87171bf}.ring-red-400\\/80{--tw-ring-color:#f87171cc}.ring-red-400\\/85{--tw-ring-color:#f87171d9}.ring-red-400\\/90{--tw-ring-color:#f87171e6}.ring-red-400\\/95{--tw-ring-color:#f87171f2}.ring-red-500{--tw-ring-opacity:1;--tw-ring-color:rgb(239 68 68/var(--tw-ring-opacity))}.ring-red-500\\/0{--tw-ring-color:#ef444400}.ring-red-500\\/10{--tw-ring-color:#ef44441a}.ring-red-500\\/100{--tw-ring-color:#ef4444}.ring-red-500\\/15{--tw-ring-color:#ef444426}.ring-red-500\\/20{--tw-ring-color:#ef444433}.ring-red-500\\/25{--tw-ring-color:#ef444440}.ring-red-500\\/30{--tw-ring-color:#ef44444d}.ring-red-500\\/35{--tw-ring-color:#ef444459}.ring-red-500\\/40{--tw-ring-color:#ef444466}.ring-red-500\\/45{--tw-ring-color:#ef444473}.ring-red-500\\/5{--tw-ring-color:#ef44440d}.ring-red-500\\/50{--tw-ring-color:#ef444480}.ring-red-500\\/55{--tw-ring-color:#ef44448c}.ring-red-500\\/60{--tw-ring-color:#ef444499}.ring-red-500\\/65{--tw-ring-color:#ef4444a6}.ring-red-500\\/70{--tw-ring-color:#ef4444b3}.ring-red-500\\/75{--tw-ring-color:#ef4444bf}.ring-red-500\\/80{--tw-ring-color:#ef4444cc}.ring-red-500\\/85{--tw-ring-color:#ef4444d9}.ring-red-500\\/90{--tw-ring-color:#ef4444e6}.ring-red-500\\/95{--tw-ring-color:#ef4444f2}.ring-white{--tw-ring-opacity:1;--tw-ring-color:rgb(255 255 255/var(--tw-ring-opacity))}.ring-opacity-25{--tw-ring-opacity:0.25}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-\\[height\\]{transition-duration:.15s;transition-property:height;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-colors{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-100{transition-duration:.1s}.duration-150{transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.duration-500{transition-duration:.5s}.duration-75{transition-duration:75ms}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.content-\\[\\"\\"\\]{--tw-content:"";content:var(--tw-content)}.rtl\\:i-heroicons-chevron-left-20-solid:where([dir=rtl],[dir=rtl] *){background-color:currentColor;display:inline-block;height:1em;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;width:1em;--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill-rule='evenodd' d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0' clip-rule='evenodd'/%3E%3C/svg%3E")}.file\\:mr-1::file-selector-button{margin-right:.25rem}.file\\:mr-1\\.5::file-selector-button{margin-right:.375rem}.file\\:border-0::file-selector-button{border-width:0}.file\\:bg-transparent::file-selector-button{background-color:initial}.file\\:p-0::file-selector-button{padding:0}.file\\:font-medium::file-selector-button{font-weight:500}.file\\:text-gray-500::file-selector-button{--tw-text-opacity:1;color:rgb(var(--color-gray-500)/var(--tw-text-opacity))}.file\\:outline-none::file-selector-button{outline:2px solid #0000;outline-offset:2px}.before\\:visible:before{content:var(--tw-content);visibility:visible}.before\\:absolute:before{content:var(--tw-content);position:absolute}.before\\:inset-px:before{content:var(--tw-content);inset:1px}.before\\:inset-x-0:before{content:var(--tw-content);left:0;right:0}.before\\:inset-y-2:before{bottom:.5rem;content:var(--tw-content);top:.5rem}.before\\:z-\\[-1\\]:before{content:var(--tw-content);z-index:-1}.before\\:block:before{content:var(--tw-content);display:block}.before\\:h-2:before{content:var(--tw-content);height:.5rem}.before\\:w-2:before{content:var(--tw-content);width:.5rem}.before\\:rotate-45:before{content:var(--tw-content);--tw-rotate:45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.before\\:rounded-md:before{border-radius:.375rem;content:var(--tw-content)}.before\\:rounded-sm:before{border-radius:.125rem;content:var(--tw-content)}.before\\:bg-gray-100:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-gray-100)/var(--tw-bg-opacity))}.before\\:bg-gray-200:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.before\\:bg-white:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.before\\:shadow:before{content:var(--tw-content);--tw-shadow:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.before\\:ring-1:before{content:var(--tw-content);--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.before\\:ring-gray-200:before{content:var(--tw-content);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-200)/var(--tw-ring-opacity))}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:inset-x-2:after{content:var(--tw-content);left:.5rem;right:.5rem}.after\\:inset-x-2\\.5:after{content:var(--tw-content);left:.625rem;right:.625rem}.after\\:bottom-0:after{bottom:0;content:var(--tw-content)}.after\\:ms-0:after{content:var(--tw-content);margin-inline-start:0}.after\\:ms-0\\.5:after{content:var(--tw-content);margin-inline-start:.125rem}.after\\:mt-2:after{content:var(--tw-content);margin-top:.5rem}.after\\:block:after{content:var(--tw-content);display:block}.after\\:h-\\[2px\\]:after{content:var(--tw-content);height:2px}.after\\:rounded-full:after{border-radius:9999px;content:var(--tw-content)}.after\\:bg-primary-500:after{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-primary-500)/var(--tw-bg-opacity))}.after\\:text-red-500:after{content:var(--tw-content);--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.after\\:content-\\[\\'\\*\\'\\]:after{--tw-content:"*";content:var(--tw-content)}.first\\:me-0:first-child{margin-inline-end:0}.first\\:rounded-s-md:first-child{border-end-start-radius:.375rem;border-start-start-radius:.375rem}.last\\:rounded-e-md:last-child{border-end-end-radius:.375rem;border-start-end-radius:.375rem}.indeterminate\\:relative:indeterminate{position:relative}.indeterminate\\:after\\:rounded-full:indeterminate:after{border-radius:9999px;content:var(--tw-content)}.hover\\:border-gray-400:hover{--tw-border-opacity:1;border-color:rgb(var(--color-gray-400)/var(--tw-border-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-100)/var(--tw-bg-opacity))}.hover\\:bg-gray-50:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-50)/var(--tw-bg-opacity))}.hover\\:bg-gray-800:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-800)/var(--tw-bg-opacity))}.hover\\:bg-orange-100:hover{--tw-bg-opacity:1;background-color:rgb(255 237 213/var(--tw-bg-opacity))}.hover\\:bg-orange-50:hover{--tw-bg-opacity:1;background-color:rgb(255 247 237/var(--tw-bg-opacity))}.hover\\:bg-orange-600:hover{--tw-bg-opacity:1;background-color:rgb(234 88 12/var(--tw-bg-opacity))}.hover\\:bg-primary-100:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-100)/var(--tw-bg-opacity))}.hover\\:bg-primary-100\\/0:hover{background-color:rgb(var(--color-primary-100)/0)}.hover\\:bg-primary-100\\/10:hover{background-color:rgb(var(--color-primary-100)/.1)}.hover\\:bg-primary-100\\/100:hover{background-color:rgb(var(--color-primary-100)/1)}.hover\\:bg-primary-100\\/15:hover{background-color:rgb(var(--color-primary-100)/.15)}.hover\\:bg-primary-100\\/20:hover{background-color:rgb(var(--color-primary-100)/.2)}.hover\\:bg-primary-100\\/25:hover{background-color:rgb(var(--color-primary-100)/.25)}.hover\\:bg-primary-100\\/30:hover{background-color:rgb(var(--color-primary-100)/.3)}.hover\\:bg-primary-100\\/35:hover{background-color:rgb(var(--color-primary-100)/.35)}.hover\\:bg-primary-100\\/40:hover{background-color:rgb(var(--color-primary-100)/.4)}.hover\\:bg-primary-100\\/45:hover{background-color:rgb(var(--color-primary-100)/.45)}.hover\\:bg-primary-100\\/5:hover{background-color:rgb(var(--color-primary-100)/.05)}.hover\\:bg-primary-100\\/50:hover{background-color:rgb(var(--color-primary-100)/.5)}.hover\\:bg-primary-100\\/55:hover{background-color:rgb(var(--color-primary-100)/.55)}.hover\\:bg-primary-100\\/60:hover{background-color:rgb(var(--color-primary-100)/.6)}.hover\\:bg-primary-100\\/65:hover{background-color:rgb(var(--color-primary-100)/.65)}.hover\\:bg-primary-100\\/70:hover{background-color:rgb(var(--color-primary-100)/.7)}.hover\\:bg-primary-100\\/75:hover{background-color:rgb(var(--color-primary-100)/.75)}.hover\\:bg-primary-100\\/80:hover{background-color:rgb(var(--color-primary-100)/.8)}.hover\\:bg-primary-100\\/85:hover{background-color:rgb(var(--color-primary-100)/.85)}.hover\\:bg-primary-100\\/90:hover{background-color:rgb(var(--color-primary-100)/.9)}.hover\\:bg-primary-100\\/95:hover{background-color:rgb(var(--color-primary-100)/.95)}.hover\\:bg-primary-50:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-50)/var(--tw-bg-opacity))}.hover\\:bg-primary-50\\/0:hover{background-color:rgb(var(--color-primary-50)/0)}.hover\\:bg-primary-50\\/10:hover{background-color:rgb(var(--color-primary-50)/.1)}.hover\\:bg-primary-50\\/100:hover{background-color:rgb(var(--color-primary-50)/1)}.hover\\:bg-primary-50\\/15:hover{background-color:rgb(var(--color-primary-50)/.15)}.hover\\:bg-primary-50\\/20:hover{background-color:rgb(var(--color-primary-50)/.2)}.hover\\:bg-primary-50\\/25:hover{background-color:rgb(var(--color-primary-50)/.25)}.hover\\:bg-primary-50\\/30:hover{background-color:rgb(var(--color-primary-50)/.3)}.hover\\:bg-primary-50\\/35:hover{background-color:rgb(var(--color-primary-50)/.35)}.hover\\:bg-primary-50\\/40:hover{background-color:rgb(var(--color-primary-50)/.4)}.hover\\:bg-primary-50\\/45:hover{background-color:rgb(var(--color-primary-50)/.45)}.hover\\:bg-primary-50\\/5:hover{background-color:rgb(var(--color-primary-50)/.05)}.hover\\:bg-primary-50\\/50:hover{background-color:rgb(var(--color-primary-50)/.5)}.hover\\:bg-primary-50\\/55:hover{background-color:rgb(var(--color-primary-50)/.55)}.hover\\:bg-primary-50\\/60:hover{background-color:rgb(var(--color-primary-50)/.6)}.hover\\:bg-primary-50\\/65:hover{background-color:rgb(var(--color-primary-50)/.65)}.hover\\:bg-primary-50\\/70:hover{background-color:rgb(var(--color-primary-50)/.7)}.hover\\:bg-primary-50\\/75:hover{background-color:rgb(var(--color-primary-50)/.75)}.hover\\:bg-primary-50\\/80:hover{background-color:rgb(var(--color-primary-50)/.8)}.hover\\:bg-primary-50\\/85:hover{background-color:rgb(var(--color-primary-50)/.85)}.hover\\:bg-primary-50\\/90:hover{background-color:rgb(var(--color-primary-50)/.9)}.hover\\:bg-primary-50\\/95:hover{background-color:rgb(var(--color-primary-50)/.95)}.hover\\:bg-primary-500:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-500)/var(--tw-bg-opacity))}.hover\\:bg-primary-500\\/0:hover{background-color:rgb(var(--color-primary-500)/0)}.hover\\:bg-primary-500\\/10:hover{background-color:rgb(var(--color-primary-500)/.1)}.hover\\:bg-primary-500\\/100:hover{background-color:rgb(var(--color-primary-500)/1)}.hover\\:bg-primary-500\\/15:hover{background-color:rgb(var(--color-primary-500)/.15)}.hover\\:bg-primary-500\\/20:hover{background-color:rgb(var(--color-primary-500)/.2)}.hover\\:bg-primary-500\\/25:hover{background-color:rgb(var(--color-primary-500)/.25)}.hover\\:bg-primary-500\\/30:hover{background-color:rgb(var(--color-primary-500)/.3)}.hover\\:bg-primary-500\\/35:hover{background-color:rgb(var(--color-primary-500)/.35)}.hover\\:bg-primary-500\\/40:hover{background-color:rgb(var(--color-primary-500)/.4)}.hover\\:bg-primary-500\\/45:hover{background-color:rgb(var(--color-primary-500)/.45)}.hover\\:bg-primary-500\\/5:hover{background-color:rgb(var(--color-primary-500)/.05)}.hover\\:bg-primary-500\\/50:hover{background-color:rgb(var(--color-primary-500)/.5)}.hover\\:bg-primary-500\\/55:hover{background-color:rgb(var(--color-primary-500)/.55)}.hover\\:bg-primary-500\\/60:hover{background-color:rgb(var(--color-primary-500)/.6)}.hover\\:bg-primary-500\\/65:hover{background-color:rgb(var(--color-primary-500)/.65)}.hover\\:bg-primary-500\\/70:hover{background-color:rgb(var(--color-primary-500)/.7)}.hover\\:bg-primary-500\\/75:hover{background-color:rgb(var(--color-primary-500)/.75)}.hover\\:bg-primary-500\\/80:hover{background-color:rgb(var(--color-primary-500)/.8)}.hover\\:bg-primary-500\\/85:hover{background-color:rgb(var(--color-primary-500)/.85)}.hover\\:bg-primary-500\\/90:hover{background-color:rgb(var(--color-primary-500)/.9)}.hover\\:bg-primary-500\\/95:hover{background-color:rgb(var(--color-primary-500)/.95)}.hover\\:bg-primary-600:hover{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-600)/var(--tw-bg-opacity))}.hover\\:bg-primary-600\\/0:hover{background-color:rgb(var(--color-primary-600)/0)}.hover\\:bg-primary-600\\/10:hover{background-color:rgb(var(--color-primary-600)/.1)}.hover\\:bg-primary-600\\/100:hover{background-color:rgb(var(--color-primary-600)/1)}.hover\\:bg-primary-600\\/15:hover{background-color:rgb(var(--color-primary-600)/.15)}.hover\\:bg-primary-600\\/20:hover{background-color:rgb(var(--color-primary-600)/.2)}.hover\\:bg-primary-600\\/25:hover{background-color:rgb(var(--color-primary-600)/.25)}.hover\\:bg-primary-600\\/30:hover{background-color:rgb(var(--color-primary-600)/.3)}.hover\\:bg-primary-600\\/35:hover{background-color:rgb(var(--color-primary-600)/.35)}.hover\\:bg-primary-600\\/40:hover{background-color:rgb(var(--color-primary-600)/.4)}.hover\\:bg-primary-600\\/45:hover{background-color:rgb(var(--color-primary-600)/.45)}.hover\\:bg-primary-600\\/5:hover{background-color:rgb(var(--color-primary-600)/.05)}.hover\\:bg-primary-600\\/50:hover{background-color:rgb(var(--color-primary-600)/.5)}.hover\\:bg-primary-600\\/55:hover{background-color:rgb(var(--color-primary-600)/.55)}.hover\\:bg-primary-600\\/60:hover{background-color:rgb(var(--color-primary-600)/.6)}.hover\\:bg-primary-600\\/65:hover{background-color:rgb(var(--color-primary-600)/.65)}.hover\\:bg-primary-600\\/70:hover{background-color:rgb(var(--color-primary-600)/.7)}.hover\\:bg-primary-600\\/75:hover{background-color:rgb(var(--color-primary-600)/.75)}.hover\\:bg-primary-600\\/80:hover{background-color:rgb(var(--color-primary-600)/.8)}.hover\\:bg-primary-600\\/85:hover{background-color:rgb(var(--color-primary-600)/.85)}.hover\\:bg-primary-600\\/90:hover{background-color:rgb(var(--color-primary-600)/.9)}.hover\\:bg-primary-600\\/95:hover{background-color:rgb(var(--color-primary-600)/.95)}.hover\\:bg-white:hover{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.hover\\:text-gray-700:hover{--tw-text-opacity:1;color:rgb(var(--color-gray-700)/var(--tw-text-opacity))}.hover\\:text-gray-900:hover{--tw-text-opacity:1;color:rgb(var(--color-gray-900)/var(--tw-text-opacity))}.hover\\:text-orange-600:hover{--tw-text-opacity:1;color:rgb(234 88 12/var(--tw-text-opacity))}.hover\\:text-primary-600:hover{--tw-text-opacity:1;color:rgb(var(--color-primary-600)/var(--tw-text-opacity))}.hover\\:text-primary-600\\/0:hover{color:rgb(var(--color-primary-600)/0)}.hover\\:text-primary-600\\/10:hover{color:rgb(var(--color-primary-600)/.1)}.hover\\:text-primary-600\\/100:hover{color:rgb(var(--color-primary-600)/1)}.hover\\:text-primary-600\\/15:hover{color:rgb(var(--color-primary-600)/.15)}.hover\\:text-primary-600\\/20:hover{color:rgb(var(--color-primary-600)/.2)}.hover\\:text-primary-600\\/25:hover{color:rgb(var(--color-primary-600)/.25)}.hover\\:text-primary-600\\/30:hover{color:rgb(var(--color-primary-600)/.3)}.hover\\:text-primary-600\\/35:hover{color:rgb(var(--color-primary-600)/.35)}.hover\\:text-primary-600\\/40:hover{color:rgb(var(--color-primary-600)/.4)}.hover\\:text-primary-600\\/45:hover{color:rgb(var(--color-primary-600)/.45)}.hover\\:text-primary-600\\/5:hover{color:rgb(var(--color-primary-600)/.05)}.hover\\:text-primary-600\\/50:hover{color:rgb(var(--color-primary-600)/.5)}.hover\\:text-primary-600\\/55:hover{color:rgb(var(--color-primary-600)/.55)}.hover\\:text-primary-600\\/60:hover{color:rgb(var(--color-primary-600)/.6)}.hover\\:text-primary-600\\/65:hover{color:rgb(var(--color-primary-600)/.65)}.hover\\:text-primary-600\\/70:hover{color:rgb(var(--color-primary-600)/.7)}.hover\\:text-primary-600\\/75:hover{color:rgb(var(--color-primary-600)/.75)}.hover\\:text-primary-600\\/80:hover{color:rgb(var(--color-primary-600)/.8)}.hover\\:text-primary-600\\/85:hover{color:rgb(var(--color-primary-600)/.85)}.hover\\:text-primary-600\\/90:hover{color:rgb(var(--color-primary-600)/.9)}.hover\\:text-primary-600\\/95:hover{color:rgb(var(--color-primary-600)/.95)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:before\\:bg-gray-50:hover:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-gray-50)/var(--tw-bg-opacity))}.focus\\:shadow-none:focus{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.focus\\:outline-none:focus{outline:2px solid #0000;outline-offset:2px}.focus\\:ring-0:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-0:focus,.focus\\:ring-2:focus{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-primary-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-500)/var(--tw-ring-opacity))}.focus\\:ring-primary-500\\/0:focus{--tw-ring-color:rgb(var(--color-primary-500)/0)}.focus\\:ring-primary-500\\/10:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.1)}.focus\\:ring-primary-500\\/100:focus{--tw-ring-color:rgb(var(--color-primary-500)/1)}.focus\\:ring-primary-500\\/15:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.15)}.focus\\:ring-primary-500\\/20:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.2)}.focus\\:ring-primary-500\\/25:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.25)}.focus\\:ring-primary-500\\/30:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.3)}.focus\\:ring-primary-500\\/35:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.35)}.focus\\:ring-primary-500\\/40:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.4)}.focus\\:ring-primary-500\\/45:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.45)}.focus\\:ring-primary-500\\/5:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.05)}.focus\\:ring-primary-500\\/50:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.5)}.focus\\:ring-primary-500\\/55:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.55)}.focus\\:ring-primary-500\\/60:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.6)}.focus\\:ring-primary-500\\/65:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.65)}.focus\\:ring-primary-500\\/70:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.7)}.focus\\:ring-primary-500\\/75:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.75)}.focus\\:ring-primary-500\\/80:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.8)}.focus\\:ring-primary-500\\/85:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.85)}.focus\\:ring-primary-500\\/90:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.9)}.focus\\:ring-primary-500\\/95:focus{--tw-ring-color:rgb(var(--color-primary-500)/0.95)}.focus\\:ring-red-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(239 68 68/var(--tw-ring-opacity))}.focus\\:ring-red-500\\/0:focus{--tw-ring-color:#ef444400}.focus\\:ring-red-500\\/10:focus{--tw-ring-color:#ef44441a}.focus\\:ring-red-500\\/100:focus{--tw-ring-color:#ef4444}.focus\\:ring-red-500\\/15:focus{--tw-ring-color:#ef444426}.focus\\:ring-red-500\\/20:focus{--tw-ring-color:#ef444433}.focus\\:ring-red-500\\/25:focus{--tw-ring-color:#ef444440}.focus\\:ring-red-500\\/30:focus{--tw-ring-color:#ef44444d}.focus\\:ring-red-500\\/35:focus{--tw-ring-color:#ef444459}.focus\\:ring-red-500\\/40:focus{--tw-ring-color:#ef444466}.focus\\:ring-red-500\\/45:focus{--tw-ring-color:#ef444473}.focus\\:ring-red-500\\/5:focus{--tw-ring-color:#ef44440d}.focus\\:ring-red-500\\/50:focus{--tw-ring-color:#ef444480}.focus\\:ring-red-500\\/55:focus{--tw-ring-color:#ef44448c}.focus\\:ring-red-500\\/60:focus{--tw-ring-color:#ef444499}.focus\\:ring-red-500\\/65:focus{--tw-ring-color:#ef4444a6}.focus\\:ring-red-500\\/70:focus{--tw-ring-color:#ef4444b3}.focus\\:ring-red-500\\/75:focus{--tw-ring-color:#ef4444bf}.focus\\:ring-red-500\\/80:focus{--tw-ring-color:#ef4444cc}.focus\\:ring-red-500\\/85:focus{--tw-ring-color:#ef4444d9}.focus\\:ring-red-500\\/90:focus{--tw-ring-color:#ef4444e6}.focus\\:ring-red-500\\/95:focus{--tw-ring-color:#ef4444f2}.focus\\:ring-transparent:focus{--tw-ring-color:#0000}.focus\\:ring-offset-transparent:focus{--tw-ring-offset-color:#0000}.focus-visible\\:outline-none:focus-visible{outline:2px solid #0000;outline-offset:2px}.focus-visible\\:outline:focus-visible{outline-style:solid}.focus-visible\\:outline-0:focus-visible{outline-width:0}.focus-visible\\:outline-2:focus-visible{outline-width:2px}.focus-visible\\:outline-offset-2:focus-visible{outline-offset:2px}.focus-visible\\:outline-orange-500:focus-visible{outline-color:#f97316}.focus-visible\\:outline-primary-500:focus-visible{outline-color:rgb(var(--color-primary-500)/1)}.focus-visible\\:outline-primary-500\\/0:focus-visible{outline-color:rgb(var(--color-primary-500)/0)}.focus-visible\\:outline-primary-500\\/10:focus-visible{outline-color:rgb(var(--color-primary-500)/.1)}.focus-visible\\:outline-primary-500\\/100:focus-visible{outline-color:rgb(var(--color-primary-500)/1)}.focus-visible\\:outline-primary-500\\/15:focus-visible{outline-color:rgb(var(--color-primary-500)/.15)}.focus-visible\\:outline-primary-500\\/20:focus-visible{outline-color:rgb(var(--color-primary-500)/.2)}.focus-visible\\:outline-primary-500\\/25:focus-visible{outline-color:rgb(var(--color-primary-500)/.25)}.focus-visible\\:outline-primary-500\\/30:focus-visible{outline-color:rgb(var(--color-primary-500)/.3)}.focus-visible\\:outline-primary-500\\/35:focus-visible{outline-color:rgb(var(--color-primary-500)/.35)}.focus-visible\\:outline-primary-500\\/40:focus-visible{outline-color:rgb(var(--color-primary-500)/.4)}.focus-visible\\:outline-primary-500\\/45:focus-visible{outline-color:rgb(var(--color-primary-500)/.45)}.focus-visible\\:outline-primary-500\\/5:focus-visible{outline-color:rgb(var(--color-primary-500)/.05)}.focus-visible\\:outline-primary-500\\/50:focus-visible{outline-color:rgb(var(--color-primary-500)/.5)}.focus-visible\\:outline-primary-500\\/55:focus-visible{outline-color:rgb(var(--color-primary-500)/.55)}.focus-visible\\:outline-primary-500\\/60:focus-visible{outline-color:rgb(var(--color-primary-500)/.6)}.focus-visible\\:outline-primary-500\\/65:focus-visible{outline-color:rgb(var(--color-primary-500)/.65)}.focus-visible\\:outline-primary-500\\/70:focus-visible{outline-color:rgb(var(--color-primary-500)/.7)}.focus-visible\\:outline-primary-500\\/75:focus-visible{outline-color:rgb(var(--color-primary-500)/.75)}.focus-visible\\:outline-primary-500\\/80:focus-visible{outline-color:rgb(var(--color-primary-500)/.8)}.focus-visible\\:outline-primary-500\\/85:focus-visible{outline-color:rgb(var(--color-primary-500)/.85)}.focus-visible\\:outline-primary-500\\/90:focus-visible{outline-color:rgb(var(--color-primary-500)/.9)}.focus-visible\\:outline-primary-500\\/95:focus-visible{outline-color:rgb(var(--color-primary-500)/.95)}.focus-visible\\:ring-2:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}.focus-visible\\:ring-orange-500:focus-visible{--tw-ring-opacity:1;--tw-ring-color:rgb(249 115 22/var(--tw-ring-opacity))}.focus-visible\\:ring-primary-500:focus-visible{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-500)/var(--tw-ring-opacity))}.focus-visible\\:ring-primary-500\\/0:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0)}.focus-visible\\:ring-primary-500\\/10:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.1)}.focus-visible\\:ring-primary-500\\/100:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/1)}.focus-visible\\:ring-primary-500\\/15:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.15)}.focus-visible\\:ring-primary-500\\/20:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.2)}.focus-visible\\:ring-primary-500\\/25:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.25)}.focus-visible\\:ring-primary-500\\/30:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.3)}.focus-visible\\:ring-primary-500\\/35:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.35)}.focus-visible\\:ring-primary-500\\/40:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.4)}.focus-visible\\:ring-primary-500\\/45:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.45)}.focus-visible\\:ring-primary-500\\/5:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.05)}.focus-visible\\:ring-primary-500\\/50:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.5)}.focus-visible\\:ring-primary-500\\/55:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.55)}.focus-visible\\:ring-primary-500\\/60:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.6)}.focus-visible\\:ring-primary-500\\/65:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.65)}.focus-visible\\:ring-primary-500\\/70:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.7)}.focus-visible\\:ring-primary-500\\/75:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.75)}.focus-visible\\:ring-primary-500\\/80:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.8)}.focus-visible\\:ring-primary-500\\/85:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.85)}.focus-visible\\:ring-primary-500\\/90:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.9)}.focus-visible\\:ring-primary-500\\/95:focus-visible{--tw-ring-color:rgb(var(--color-primary-500)/0.95)}.focus-visible\\:ring-red-500:focus-visible{--tw-ring-opacity:1;--tw-ring-color:rgb(239 68 68/var(--tw-ring-opacity))}.focus-visible\\:ring-red-500\\/0:focus-visible{--tw-ring-color:#ef444400}.focus-visible\\:ring-red-500\\/10:focus-visible{--tw-ring-color:#ef44441a}.focus-visible\\:ring-red-500\\/100:focus-visible{--tw-ring-color:#ef4444}.focus-visible\\:ring-red-500\\/15:focus-visible{--tw-ring-color:#ef444426}.focus-visible\\:ring-red-500\\/20:focus-visible{--tw-ring-color:#ef444433}.focus-visible\\:ring-red-500\\/25:focus-visible{--tw-ring-color:#ef444440}.focus-visible\\:ring-red-500\\/30:focus-visible{--tw-ring-color:#ef44444d}.focus-visible\\:ring-red-500\\/35:focus-visible{--tw-ring-color:#ef444459}.focus-visible\\:ring-red-500\\/40:focus-visible{--tw-ring-color:#ef444466}.focus-visible\\:ring-red-500\\/45:focus-visible{--tw-ring-color:#ef444473}.focus-visible\\:ring-red-500\\/5:focus-visible{--tw-ring-color:#ef44440d}.focus-visible\\:ring-red-500\\/50:focus-visible{--tw-ring-color:#ef444480}.focus-visible\\:ring-red-500\\/55:focus-visible{--tw-ring-color:#ef44448c}.focus-visible\\:ring-red-500\\/60:focus-visible{--tw-ring-color:#ef444499}.focus-visible\\:ring-red-500\\/65:focus-visible{--tw-ring-color:#ef4444a6}.focus-visible\\:ring-red-500\\/70:focus-visible{--tw-ring-color:#ef4444b3}.focus-visible\\:ring-red-500\\/75:focus-visible{--tw-ring-color:#ef4444bf}.focus-visible\\:ring-red-500\\/80:focus-visible{--tw-ring-color:#ef4444cc}.focus-visible\\:ring-red-500\\/85:focus-visible{--tw-ring-color:#ef4444d9}.focus-visible\\:ring-red-500\\/90:focus-visible{--tw-ring-color:#ef4444e6}.focus-visible\\:ring-red-500\\/95:focus-visible{--tw-ring-color:#ef4444f2}.focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px}.focus-visible\\:ring-offset-white:focus-visible{--tw-ring-offset-color:#fff}.focus-visible\\:before\\:ring-1:focus-visible:before{content:var(--tw-content);--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible\\:before\\:ring-inset:focus-visible:before{content:var(--tw-content);--tw-ring-inset:inset}.focus-visible\\:before\\:ring-primary-500:focus-visible:before{content:var(--tw-content);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-500)/var(--tw-ring-opacity))}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:bg-gray-50:disabled{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-50)/var(--tw-bg-opacity))}.disabled\\:bg-gray-900:disabled{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.disabled\\:bg-orange-50:disabled{--tw-bg-opacity:1;background-color:rgb(255 247 237/var(--tw-bg-opacity))}.disabled\\:bg-orange-500:disabled{--tw-bg-opacity:1;background-color:rgb(249 115 22/var(--tw-bg-opacity))}.disabled\\:bg-primary-50:disabled{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-50)/var(--tw-bg-opacity))}.disabled\\:bg-primary-50\\/0:disabled{background-color:rgb(var(--color-primary-50)/0)}.disabled\\:bg-primary-50\\/10:disabled{background-color:rgb(var(--color-primary-50)/.1)}.disabled\\:bg-primary-50\\/100:disabled{background-color:rgb(var(--color-primary-50)/1)}.disabled\\:bg-primary-50\\/15:disabled{background-color:rgb(var(--color-primary-50)/.15)}.disabled\\:bg-primary-50\\/20:disabled{background-color:rgb(var(--color-primary-50)/.2)}.disabled\\:bg-primary-50\\/25:disabled{background-color:rgb(var(--color-primary-50)/.25)}.disabled\\:bg-primary-50\\/30:disabled{background-color:rgb(var(--color-primary-50)/.3)}.disabled\\:bg-primary-50\\/35:disabled{background-color:rgb(var(--color-primary-50)/.35)}.disabled\\:bg-primary-50\\/40:disabled{background-color:rgb(var(--color-primary-50)/.4)}.disabled\\:bg-primary-50\\/45:disabled{background-color:rgb(var(--color-primary-50)/.45)}.disabled\\:bg-primary-50\\/5:disabled{background-color:rgb(var(--color-primary-50)/.05)}.disabled\\:bg-primary-50\\/50:disabled{background-color:rgb(var(--color-primary-50)/.5)}.disabled\\:bg-primary-50\\/55:disabled{background-color:rgb(var(--color-primary-50)/.55)}.disabled\\:bg-primary-50\\/60:disabled{background-color:rgb(var(--color-primary-50)/.6)}.disabled\\:bg-primary-50\\/65:disabled{background-color:rgb(var(--color-primary-50)/.65)}.disabled\\:bg-primary-50\\/70:disabled{background-color:rgb(var(--color-primary-50)/.7)}.disabled\\:bg-primary-50\\/75:disabled{background-color:rgb(var(--color-primary-50)/.75)}.disabled\\:bg-primary-50\\/80:disabled{background-color:rgb(var(--color-primary-50)/.8)}.disabled\\:bg-primary-50\\/85:disabled{background-color:rgb(var(--color-primary-50)/.85)}.disabled\\:bg-primary-50\\/90:disabled{background-color:rgb(var(--color-primary-50)/.9)}.disabled\\:bg-primary-50\\/95:disabled{background-color:rgb(var(--color-primary-50)/.95)}.disabled\\:bg-primary-500:disabled{--tw-bg-opacity:1;background-color:rgb(var(--color-primary-500)/var(--tw-bg-opacity))}.disabled\\:bg-primary-500\\/0:disabled{background-color:rgb(var(--color-primary-500)/0)}.disabled\\:bg-primary-500\\/10:disabled{background-color:rgb(var(--color-primary-500)/.1)}.disabled\\:bg-primary-500\\/100:disabled{background-color:rgb(var(--color-primary-500)/1)}.disabled\\:bg-primary-500\\/15:disabled{background-color:rgb(var(--color-primary-500)/.15)}.disabled\\:bg-primary-500\\/20:disabled{background-color:rgb(var(--color-primary-500)/.2)}.disabled\\:bg-primary-500\\/25:disabled{background-color:rgb(var(--color-primary-500)/.25)}.disabled\\:bg-primary-500\\/30:disabled{background-color:rgb(var(--color-primary-500)/.3)}.disabled\\:bg-primary-500\\/35:disabled{background-color:rgb(var(--color-primary-500)/.35)}.disabled\\:bg-primary-500\\/40:disabled{background-color:rgb(var(--color-primary-500)/.4)}.disabled\\:bg-primary-500\\/45:disabled{background-color:rgb(var(--color-primary-500)/.45)}.disabled\\:bg-primary-500\\/5:disabled{background-color:rgb(var(--color-primary-500)/.05)}.disabled\\:bg-primary-500\\/50:disabled{background-color:rgb(var(--color-primary-500)/.5)}.disabled\\:bg-primary-500\\/55:disabled{background-color:rgb(var(--color-primary-500)/.55)}.disabled\\:bg-primary-500\\/60:disabled{background-color:rgb(var(--color-primary-500)/.6)}.disabled\\:bg-primary-500\\/65:disabled{background-color:rgb(var(--color-primary-500)/.65)}.disabled\\:bg-primary-500\\/70:disabled{background-color:rgb(var(--color-primary-500)/.7)}.disabled\\:bg-primary-500\\/75:disabled{background-color:rgb(var(--color-primary-500)/.75)}.disabled\\:bg-primary-500\\/80:disabled{background-color:rgb(var(--color-primary-500)/.8)}.disabled\\:bg-primary-500\\/85:disabled{background-color:rgb(var(--color-primary-500)/.85)}.disabled\\:bg-primary-500\\/90:disabled{background-color:rgb(var(--color-primary-500)/.9)}.disabled\\:bg-primary-500\\/95:disabled{background-color:rgb(var(--color-primary-500)/.95)}.disabled\\:bg-transparent:disabled{background-color:initial}.disabled\\:bg-white:disabled{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.disabled\\:bg-opacity-50:disabled{--tw-bg-opacity:0.5}.disabled\\:text-orange-500:disabled{--tw-text-opacity:1;color:rgb(249 115 22/var(--tw-text-opacity))}.disabled\\:text-primary-500:disabled{--tw-text-opacity:1;color:rgb(var(--color-primary-500)/var(--tw-text-opacity))}.disabled\\:text-primary-500\\/0:disabled{color:rgb(var(--color-primary-500)/0)}.disabled\\:text-primary-500\\/10:disabled{color:rgb(var(--color-primary-500)/.1)}.disabled\\:text-primary-500\\/100:disabled{color:rgb(var(--color-primary-500)/1)}.disabled\\:text-primary-500\\/15:disabled{color:rgb(var(--color-primary-500)/.15)}.disabled\\:text-primary-500\\/20:disabled{color:rgb(var(--color-primary-500)/.2)}.disabled\\:text-primary-500\\/25:disabled{color:rgb(var(--color-primary-500)/.25)}.disabled\\:text-primary-500\\/30:disabled{color:rgb(var(--color-primary-500)/.3)}.disabled\\:text-primary-500\\/35:disabled{color:rgb(var(--color-primary-500)/.35)}.disabled\\:text-primary-500\\/40:disabled{color:rgb(var(--color-primary-500)/.4)}.disabled\\:text-primary-500\\/45:disabled{color:rgb(var(--color-primary-500)/.45)}.disabled\\:text-primary-500\\/5:disabled{color:rgb(var(--color-primary-500)/.05)}.disabled\\:text-primary-500\\/50:disabled{color:rgb(var(--color-primary-500)/.5)}.disabled\\:text-primary-500\\/55:disabled{color:rgb(var(--color-primary-500)/.55)}.disabled\\:text-primary-500\\/60:disabled{color:rgb(var(--color-primary-500)/.6)}.disabled\\:text-primary-500\\/65:disabled{color:rgb(var(--color-primary-500)/.65)}.disabled\\:text-primary-500\\/70:disabled{color:rgb(var(--color-primary-500)/.7)}.disabled\\:text-primary-500\\/75:disabled{color:rgb(var(--color-primary-500)/.75)}.disabled\\:text-primary-500\\/80:disabled{color:rgb(var(--color-primary-500)/.8)}.disabled\\:text-primary-500\\/85:disabled{color:rgb(var(--color-primary-500)/.85)}.disabled\\:text-primary-500\\/90:disabled{color:rgb(var(--color-primary-500)/.9)}.disabled\\:text-primary-500\\/95:disabled{color:rgb(var(--color-primary-500)/.95)}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-75:disabled{opacity:.75}.group:hover .group-hover\\:text-gray-700{--tw-text-opacity:1;color:rgb(var(--color-gray-700)/var(--tw-text-opacity))}.peer:disabled~.peer-disabled\\:bg-opacity-50{--tw-bg-opacity:0.5}.group[data-popper-placement*=bottom] .group-data-\\[popper-placement\\*\\=\\'bottom\\'\\]\\:-top-1{top:-.25rem}.group[data-popper-placement*=left] .group-data-\\[popper-placement\\*\\=\\'left\\'\\]\\:-right-1{right:-.25rem}.group[data-popper-placement*=right] .group-data-\\[popper-placement\\*\\=\\'right\\'\\]\\:-left-1{left:-.25rem}.group[data-popper-placement*=top] .group-data-\\[popper-placement\\*\\=\\'top\\'\\]\\:-bottom-1{bottom:-.25rem}:where([data-headlessui-focus-visible]) .ui-focus-visible\\:outline-0:focus{outline-width:0}:where([data-headlessui-focus-visible]) .ui-focus-visible\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}:where([data-headlessui-focus-visible]) .ui-focus-visible\\:ring-primary-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-500)/var(--tw-ring-opacity))}.ui-not-focus-visible\\:outline-none:focus:where(:not([data-headlessui-focus-visible] .ui-not-focus-visible\\:outline-none)){outline:2px solid #0000;outline-offset:2px}.dark\\:divide-gray-700:is(.dark *)>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--color-gray-700)/var(--tw-divide-opacity))}.dark\\:divide-gray-800:is(.dark *)>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--color-gray-800)/var(--tw-divide-opacity))}.dark\\:border-gray-700:is(.dark *){--tw-border-opacity:1;border-color:rgb(var(--color-gray-700)/var(--tw-border-opacity))}.dark\\:border-gray-800:is(.dark *){--tw-border-opacity:1;border-color:rgb(var(--color-gray-800)/var(--tw-border-opacity))}.dark\\:bg-amber-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(251 191 36/var(--tw-bg-opacity))}.dark\\:bg-amber-400\\/0:is(.dark *){background-color:#fbbf2400}.dark\\:bg-amber-400\\/10:is(.dark *){background-color:#fbbf241a}.dark\\:bg-amber-400\\/100:is(.dark *){background-color:#fbbf24}.dark\\:bg-amber-400\\/15:is(.dark *){background-color:#fbbf2426}.dark\\:bg-amber-400\\/20:is(.dark *){background-color:#fbbf2433}.dark\\:bg-amber-400\\/25:is(.dark *){background-color:#fbbf2440}.dark\\:bg-amber-400\\/30:is(.dark *){background-color:#fbbf244d}.dark\\:bg-amber-400\\/35:is(.dark *){background-color:#fbbf2459}.dark\\:bg-amber-400\\/40:is(.dark *){background-color:#fbbf2466}.dark\\:bg-amber-400\\/45:is(.dark *){background-color:#fbbf2473}.dark\\:bg-amber-400\\/5:is(.dark *){background-color:#fbbf240d}.dark\\:bg-amber-400\\/50:is(.dark *){background-color:#fbbf2480}.dark\\:bg-amber-400\\/55:is(.dark *){background-color:#fbbf248c}.dark\\:bg-amber-400\\/60:is(.dark *){background-color:#fbbf2499}.dark\\:bg-amber-400\\/65:is(.dark *){background-color:#fbbf24a6}.dark\\:bg-amber-400\\/70:is(.dark *){background-color:#fbbf24b3}.dark\\:bg-amber-400\\/75:is(.dark *){background-color:#fbbf24bf}.dark\\:bg-amber-400\\/80:is(.dark *){background-color:#fbbf24cc}.dark\\:bg-amber-400\\/85:is(.dark *){background-color:#fbbf24d9}.dark\\:bg-amber-400\\/90:is(.dark *){background-color:#fbbf24e6}.dark\\:bg-amber-400\\/95:is(.dark *){background-color:#fbbf24f2}.dark\\:bg-blue-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(96 165 250/var(--tw-bg-opacity))}.dark\\:bg-blue-400\\/0:is(.dark *){background-color:#60a5fa00}.dark\\:bg-blue-400\\/10:is(.dark *){background-color:#60a5fa1a}.dark\\:bg-blue-400\\/100:is(.dark *){background-color:#60a5fa}.dark\\:bg-blue-400\\/15:is(.dark *){background-color:#60a5fa26}.dark\\:bg-blue-400\\/20:is(.dark *){background-color:#60a5fa33}.dark\\:bg-blue-400\\/25:is(.dark *){background-color:#60a5fa40}.dark\\:bg-blue-400\\/30:is(.dark *){background-color:#60a5fa4d}.dark\\:bg-blue-400\\/35:is(.dark *){background-color:#60a5fa59}.dark\\:bg-blue-400\\/40:is(.dark *){background-color:#60a5fa66}.dark\\:bg-blue-400\\/45:is(.dark *){background-color:#60a5fa73}.dark\\:bg-blue-400\\/5:is(.dark *){background-color:#60a5fa0d}.dark\\:bg-blue-400\\/50:is(.dark *){background-color:#60a5fa80}.dark\\:bg-blue-400\\/55:is(.dark *){background-color:#60a5fa8c}.dark\\:bg-blue-400\\/60:is(.dark *){background-color:#60a5fa99}.dark\\:bg-blue-400\\/65:is(.dark *){background-color:#60a5faa6}.dark\\:bg-blue-400\\/70:is(.dark *){background-color:#60a5fab3}.dark\\:bg-blue-400\\/75:is(.dark *){background-color:#60a5fabf}.dark\\:bg-blue-400\\/80:is(.dark *){background-color:#60a5facc}.dark\\:bg-blue-400\\/85:is(.dark *){background-color:#60a5fad9}.dark\\:bg-blue-400\\/90:is(.dark *){background-color:#60a5fae6}.dark\\:bg-blue-400\\/95:is(.dark *){background-color:#60a5faf2}.dark\\:bg-cyan-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(34 211 238/var(--tw-bg-opacity))}.dark\\:bg-cyan-400\\/0:is(.dark *){background-color:#22d3ee00}.dark\\:bg-cyan-400\\/10:is(.dark *){background-color:#22d3ee1a}.dark\\:bg-cyan-400\\/100:is(.dark *){background-color:#22d3ee}.dark\\:bg-cyan-400\\/15:is(.dark *){background-color:#22d3ee26}.dark\\:bg-cyan-400\\/20:is(.dark *){background-color:#22d3ee33}.dark\\:bg-cyan-400\\/25:is(.dark *){background-color:#22d3ee40}.dark\\:bg-cyan-400\\/30:is(.dark *){background-color:#22d3ee4d}.dark\\:bg-cyan-400\\/35:is(.dark *){background-color:#22d3ee59}.dark\\:bg-cyan-400\\/40:is(.dark *){background-color:#22d3ee66}.dark\\:bg-cyan-400\\/45:is(.dark *){background-color:#22d3ee73}.dark\\:bg-cyan-400\\/5:is(.dark *){background-color:#22d3ee0d}.dark\\:bg-cyan-400\\/50:is(.dark *){background-color:#22d3ee80}.dark\\:bg-cyan-400\\/55:is(.dark *){background-color:#22d3ee8c}.dark\\:bg-cyan-400\\/60:is(.dark *){background-color:#22d3ee99}.dark\\:bg-cyan-400\\/65:is(.dark *){background-color:#22d3eea6}.dark\\:bg-cyan-400\\/70:is(.dark *){background-color:#22d3eeb3}.dark\\:bg-cyan-400\\/75:is(.dark *){background-color:#22d3eebf}.dark\\:bg-cyan-400\\/80:is(.dark *){background-color:#22d3eecc}.dark\\:bg-cyan-400\\/85:is(.dark *){background-color:#22d3eed9}.dark\\:bg-cyan-400\\/90:is(.dark *){background-color:#22d3eee6}.dark\\:bg-cyan-400\\/95:is(.dark *){background-color:#22d3eef2}.dark\\:bg-emerald-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(52 211 153/var(--tw-bg-opacity))}.dark\\:bg-emerald-400\\/0:is(.dark *){background-color:#34d39900}.dark\\:bg-emerald-400\\/10:is(.dark *){background-color:#34d3991a}.dark\\:bg-emerald-400\\/100:is(.dark *){background-color:#34d399}.dark\\:bg-emerald-400\\/15:is(.dark *){background-color:#34d39926}.dark\\:bg-emerald-400\\/20:is(.dark *){background-color:#34d39933}.dark\\:bg-emerald-400\\/25:is(.dark *){background-color:#34d39940}.dark\\:bg-emerald-400\\/30:is(.dark *){background-color:#34d3994d}.dark\\:bg-emerald-400\\/35:is(.dark *){background-color:#34d39959}.dark\\:bg-emerald-400\\/40:is(.dark *){background-color:#34d39966}.dark\\:bg-emerald-400\\/45:is(.dark *){background-color:#34d39973}.dark\\:bg-emerald-400\\/5:is(.dark *){background-color:#34d3990d}.dark\\:bg-emerald-400\\/50:is(.dark *){background-color:#34d39980}.dark\\:bg-emerald-400\\/55:is(.dark *){background-color:#34d3998c}.dark\\:bg-emerald-400\\/60:is(.dark *){background-color:#34d39999}.dark\\:bg-emerald-400\\/65:is(.dark *){background-color:#34d399a6}.dark\\:bg-emerald-400\\/70:is(.dark *){background-color:#34d399b3}.dark\\:bg-emerald-400\\/75:is(.dark *){background-color:#34d399bf}.dark\\:bg-emerald-400\\/80:is(.dark *){background-color:#34d399cc}.dark\\:bg-emerald-400\\/85:is(.dark *){background-color:#34d399d9}.dark\\:bg-emerald-400\\/90:is(.dark *){background-color:#34d399e6}.dark\\:bg-emerald-400\\/95:is(.dark *){background-color:#34d399f2}.dark\\:bg-fuchsia-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(232 121 249/var(--tw-bg-opacity))}.dark\\:bg-fuchsia-400\\/0:is(.dark *){background-color:#e879f900}.dark\\:bg-fuchsia-400\\/10:is(.dark *){background-color:#e879f91a}.dark\\:bg-fuchsia-400\\/100:is(.dark *){background-color:#e879f9}.dark\\:bg-fuchsia-400\\/15:is(.dark *){background-color:#e879f926}.dark\\:bg-fuchsia-400\\/20:is(.dark *){background-color:#e879f933}.dark\\:bg-fuchsia-400\\/25:is(.dark *){background-color:#e879f940}.dark\\:bg-fuchsia-400\\/30:is(.dark *){background-color:#e879f94d}.dark\\:bg-fuchsia-400\\/35:is(.dark *){background-color:#e879f959}.dark\\:bg-fuchsia-400\\/40:is(.dark *){background-color:#e879f966}.dark\\:bg-fuchsia-400\\/45:is(.dark *){background-color:#e879f973}.dark\\:bg-fuchsia-400\\/5:is(.dark *){background-color:#e879f90d}.dark\\:bg-fuchsia-400\\/50:is(.dark *){background-color:#e879f980}.dark\\:bg-fuchsia-400\\/55:is(.dark *){background-color:#e879f98c}.dark\\:bg-fuchsia-400\\/60:is(.dark *){background-color:#e879f999}.dark\\:bg-fuchsia-400\\/65:is(.dark *){background-color:#e879f9a6}.dark\\:bg-fuchsia-400\\/70:is(.dark *){background-color:#e879f9b3}.dark\\:bg-fuchsia-400\\/75:is(.dark *){background-color:#e879f9bf}.dark\\:bg-fuchsia-400\\/80:is(.dark *){background-color:#e879f9cc}.dark\\:bg-fuchsia-400\\/85:is(.dark *){background-color:#e879f9d9}.dark\\:bg-fuchsia-400\\/90:is(.dark *){background-color:#e879f9e6}.dark\\:bg-fuchsia-400\\/95:is(.dark *){background-color:#e879f9f2}.dark\\:bg-gray-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-400)/var(--tw-bg-opacity))}.dark\\:bg-gray-700:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}.dark\\:bg-gray-800:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-800)/var(--tw-bg-opacity))}.dark\\:bg-gray-800\\/50:is(.dark *){background-color:rgb(var(--color-gray-800)/.5)}.dark\\:bg-gray-800\\/75:is(.dark *){background-color:rgb(var(--color-gray-800)/.75)}.dark\\:bg-gray-900:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.dark\\:bg-green-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(74 222 128/var(--tw-bg-opacity))}.dark\\:bg-green-400\\/0:is(.dark *){background-color:#4ade8000}.dark\\:bg-green-400\\/10:is(.dark *){background-color:#4ade801a}.dark\\:bg-green-400\\/100:is(.dark *){background-color:#4ade80}.dark\\:bg-green-400\\/15:is(.dark *){background-color:#4ade8026}.dark\\:bg-green-400\\/20:is(.dark *){background-color:#4ade8033}.dark\\:bg-green-400\\/25:is(.dark *){background-color:#4ade8040}.dark\\:bg-green-400\\/30:is(.dark *){background-color:#4ade804d}.dark\\:bg-green-400\\/35:is(.dark *){background-color:#4ade8059}.dark\\:bg-green-400\\/40:is(.dark *){background-color:#4ade8066}.dark\\:bg-green-400\\/45:is(.dark *){background-color:#4ade8073}.dark\\:bg-green-400\\/5:is(.dark *){background-color:#4ade800d}.dark\\:bg-green-400\\/50:is(.dark *){background-color:#4ade8080}.dark\\:bg-green-400\\/55:is(.dark *){background-color:#4ade808c}.dark\\:bg-green-400\\/60:is(.dark *){background-color:#4ade8099}.dark\\:bg-green-400\\/65:is(.dark *){background-color:#4ade80a6}.dark\\:bg-green-400\\/70:is(.dark *){background-color:#4ade80b3}.dark\\:bg-green-400\\/75:is(.dark *){background-color:#4ade80bf}.dark\\:bg-green-400\\/80:is(.dark *){background-color:#4ade80cc}.dark\\:bg-green-400\\/85:is(.dark *){background-color:#4ade80d9}.dark\\:bg-green-400\\/90:is(.dark *){background-color:#4ade80e6}.dark\\:bg-green-400\\/95:is(.dark *){background-color:#4ade80f2}.dark\\:bg-indigo-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(129 140 248/var(--tw-bg-opacity))}.dark\\:bg-indigo-400\\/0:is(.dark *){background-color:#818cf800}.dark\\:bg-indigo-400\\/10:is(.dark *){background-color:#818cf81a}.dark\\:bg-indigo-400\\/100:is(.dark *){background-color:#818cf8}.dark\\:bg-indigo-400\\/15:is(.dark *){background-color:#818cf826}.dark\\:bg-indigo-400\\/20:is(.dark *){background-color:#818cf833}.dark\\:bg-indigo-400\\/25:is(.dark *){background-color:#818cf840}.dark\\:bg-indigo-400\\/30:is(.dark *){background-color:#818cf84d}.dark\\:bg-indigo-400\\/35:is(.dark *){background-color:#818cf859}.dark\\:bg-indigo-400\\/40:is(.dark *){background-color:#818cf866}.dark\\:bg-indigo-400\\/45:is(.dark *){background-color:#818cf873}.dark\\:bg-indigo-400\\/5:is(.dark *){background-color:#818cf80d}.dark\\:bg-indigo-400\\/50:is(.dark *){background-color:#818cf880}.dark\\:bg-indigo-400\\/55:is(.dark *){background-color:#818cf88c}.dark\\:bg-indigo-400\\/60:is(.dark *){background-color:#818cf899}.dark\\:bg-indigo-400\\/65:is(.dark *){background-color:#818cf8a6}.dark\\:bg-indigo-400\\/70:is(.dark *){background-color:#818cf8b3}.dark\\:bg-indigo-400\\/75:is(.dark *){background-color:#818cf8bf}.dark\\:bg-indigo-400\\/80:is(.dark *){background-color:#818cf8cc}.dark\\:bg-indigo-400\\/85:is(.dark *){background-color:#818cf8d9}.dark\\:bg-indigo-400\\/90:is(.dark *){background-color:#818cf8e6}.dark\\:bg-indigo-400\\/95:is(.dark *){background-color:#818cf8f2}.dark\\:bg-lime-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(163 230 53/var(--tw-bg-opacity))}.dark\\:bg-lime-400\\/0:is(.dark *){background-color:#a3e63500}.dark\\:bg-lime-400\\/10:is(.dark *){background-color:#a3e6351a}.dark\\:bg-lime-400\\/100:is(.dark *){background-color:#a3e635}.dark\\:bg-lime-400\\/15:is(.dark *){background-color:#a3e63526}.dark\\:bg-lime-400\\/20:is(.dark *){background-color:#a3e63533}.dark\\:bg-lime-400\\/25:is(.dark *){background-color:#a3e63540}.dark\\:bg-lime-400\\/30:is(.dark *){background-color:#a3e6354d}.dark\\:bg-lime-400\\/35:is(.dark *){background-color:#a3e63559}.dark\\:bg-lime-400\\/40:is(.dark *){background-color:#a3e63566}.dark\\:bg-lime-400\\/45:is(.dark *){background-color:#a3e63573}.dark\\:bg-lime-400\\/5:is(.dark *){background-color:#a3e6350d}.dark\\:bg-lime-400\\/50:is(.dark *){background-color:#a3e63580}.dark\\:bg-lime-400\\/55:is(.dark *){background-color:#a3e6358c}.dark\\:bg-lime-400\\/60:is(.dark *){background-color:#a3e63599}.dark\\:bg-lime-400\\/65:is(.dark *){background-color:#a3e635a6}.dark\\:bg-lime-400\\/70:is(.dark *){background-color:#a3e635b3}.dark\\:bg-lime-400\\/75:is(.dark *){background-color:#a3e635bf}.dark\\:bg-lime-400\\/80:is(.dark *){background-color:#a3e635cc}.dark\\:bg-lime-400\\/85:is(.dark *){background-color:#a3e635d9}.dark\\:bg-lime-400\\/90:is(.dark *){background-color:#a3e635e6}.dark\\:bg-lime-400\\/95:is(.dark *){background-color:#a3e635f2}.dark\\:bg-orange-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(251 146 60/var(--tw-bg-opacity))}.dark\\:bg-orange-400\\/0:is(.dark *){background-color:#fb923c00}.dark\\:bg-orange-400\\/10:is(.dark *){background-color:#fb923c1a}.dark\\:bg-orange-400\\/100:is(.dark *){background-color:#fb923c}.dark\\:bg-orange-400\\/15:is(.dark *){background-color:#fb923c26}.dark\\:bg-orange-400\\/20:is(.dark *){background-color:#fb923c33}.dark\\:bg-orange-400\\/25:is(.dark *){background-color:#fb923c40}.dark\\:bg-orange-400\\/30:is(.dark *){background-color:#fb923c4d}.dark\\:bg-orange-400\\/35:is(.dark *){background-color:#fb923c59}.dark\\:bg-orange-400\\/40:is(.dark *){background-color:#fb923c66}.dark\\:bg-orange-400\\/45:is(.dark *){background-color:#fb923c73}.dark\\:bg-orange-400\\/5:is(.dark *){background-color:#fb923c0d}.dark\\:bg-orange-400\\/50:is(.dark *){background-color:#fb923c80}.dark\\:bg-orange-400\\/55:is(.dark *){background-color:#fb923c8c}.dark\\:bg-orange-400\\/60:is(.dark *){background-color:#fb923c99}.dark\\:bg-orange-400\\/65:is(.dark *){background-color:#fb923ca6}.dark\\:bg-orange-400\\/70:is(.dark *){background-color:#fb923cb3}.dark\\:bg-orange-400\\/75:is(.dark *){background-color:#fb923cbf}.dark\\:bg-orange-400\\/80:is(.dark *){background-color:#fb923ccc}.dark\\:bg-orange-400\\/85:is(.dark *){background-color:#fb923cd9}.dark\\:bg-orange-400\\/90:is(.dark *){background-color:#fb923ce6}.dark\\:bg-orange-400\\/95:is(.dark *){background-color:#fb923cf2}.dark\\:bg-orange-950:is(.dark *){--tw-bg-opacity:1;background-color:rgb(67 20 7/var(--tw-bg-opacity))}.dark\\:bg-pink-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(244 114 182/var(--tw-bg-opacity))}.dark\\:bg-pink-400\\/0:is(.dark *){background-color:#f472b600}.dark\\:bg-pink-400\\/10:is(.dark *){background-color:#f472b61a}.dark\\:bg-pink-400\\/100:is(.dark *){background-color:#f472b6}.dark\\:bg-pink-400\\/15:is(.dark *){background-color:#f472b626}.dark\\:bg-pink-400\\/20:is(.dark *){background-color:#f472b633}.dark\\:bg-pink-400\\/25:is(.dark *){background-color:#f472b640}.dark\\:bg-pink-400\\/30:is(.dark *){background-color:#f472b64d}.dark\\:bg-pink-400\\/35:is(.dark *){background-color:#f472b659}.dark\\:bg-pink-400\\/40:is(.dark *){background-color:#f472b666}.dark\\:bg-pink-400\\/45:is(.dark *){background-color:#f472b673}.dark\\:bg-pink-400\\/5:is(.dark *){background-color:#f472b60d}.dark\\:bg-pink-400\\/50:is(.dark *){background-color:#f472b680}.dark\\:bg-pink-400\\/55:is(.dark *){background-color:#f472b68c}.dark\\:bg-pink-400\\/60:is(.dark *){background-color:#f472b699}.dark\\:bg-pink-400\\/65:is(.dark *){background-color:#f472b6a6}.dark\\:bg-pink-400\\/70:is(.dark *){background-color:#f472b6b3}.dark\\:bg-pink-400\\/75:is(.dark *){background-color:#f472b6bf}.dark\\:bg-pink-400\\/80:is(.dark *){background-color:#f472b6cc}.dark\\:bg-pink-400\\/85:is(.dark *){background-color:#f472b6d9}.dark\\:bg-pink-400\\/90:is(.dark *){background-color:#f472b6e6}.dark\\:bg-pink-400\\/95:is(.dark *){background-color:#f472b6f2}.dark\\:bg-primary-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-400)/var(--tw-bg-opacity))}.dark\\:bg-primary-400\\/0:is(.dark *){background-color:rgb(var(--color-primary-400)/0)}.dark\\:bg-primary-400\\/10:is(.dark *){background-color:rgb(var(--color-primary-400)/.1)}.dark\\:bg-primary-400\\/100:is(.dark *){background-color:rgb(var(--color-primary-400)/1)}.dark\\:bg-primary-400\\/15:is(.dark *){background-color:rgb(var(--color-primary-400)/.15)}.dark\\:bg-primary-400\\/20:is(.dark *){background-color:rgb(var(--color-primary-400)/.2)}.dark\\:bg-primary-400\\/25:is(.dark *){background-color:rgb(var(--color-primary-400)/.25)}.dark\\:bg-primary-400\\/30:is(.dark *){background-color:rgb(var(--color-primary-400)/.3)}.dark\\:bg-primary-400\\/35:is(.dark *){background-color:rgb(var(--color-primary-400)/.35)}.dark\\:bg-primary-400\\/40:is(.dark *){background-color:rgb(var(--color-primary-400)/.4)}.dark\\:bg-primary-400\\/45:is(.dark *){background-color:rgb(var(--color-primary-400)/.45)}.dark\\:bg-primary-400\\/5:is(.dark *){background-color:rgb(var(--color-primary-400)/.05)}.dark\\:bg-primary-400\\/50:is(.dark *){background-color:rgb(var(--color-primary-400)/.5)}.dark\\:bg-primary-400\\/55:is(.dark *){background-color:rgb(var(--color-primary-400)/.55)}.dark\\:bg-primary-400\\/60:is(.dark *){background-color:rgb(var(--color-primary-400)/.6)}.dark\\:bg-primary-400\\/65:is(.dark *){background-color:rgb(var(--color-primary-400)/.65)}.dark\\:bg-primary-400\\/70:is(.dark *){background-color:rgb(var(--color-primary-400)/.7)}.dark\\:bg-primary-400\\/75:is(.dark *){background-color:rgb(var(--color-primary-400)/.75)}.dark\\:bg-primary-400\\/80:is(.dark *){background-color:rgb(var(--color-primary-400)/.8)}.dark\\:bg-primary-400\\/85:is(.dark *){background-color:rgb(var(--color-primary-400)/.85)}.dark\\:bg-primary-400\\/90:is(.dark *){background-color:rgb(var(--color-primary-400)/.9)}.dark\\:bg-primary-400\\/95:is(.dark *){background-color:rgb(var(--color-primary-400)/.95)}.dark\\:bg-primary-950:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-950)/var(--tw-bg-opacity))}.dark\\:bg-primary-950\\/0:is(.dark *){background-color:rgb(var(--color-primary-950)/0)}.dark\\:bg-primary-950\\/10:is(.dark *){background-color:rgb(var(--color-primary-950)/.1)}.dark\\:bg-primary-950\\/100:is(.dark *){background-color:rgb(var(--color-primary-950)/1)}.dark\\:bg-primary-950\\/15:is(.dark *){background-color:rgb(var(--color-primary-950)/.15)}.dark\\:bg-primary-950\\/20:is(.dark *){background-color:rgb(var(--color-primary-950)/.2)}.dark\\:bg-primary-950\\/25:is(.dark *){background-color:rgb(var(--color-primary-950)/.25)}.dark\\:bg-primary-950\\/30:is(.dark *){background-color:rgb(var(--color-primary-950)/.3)}.dark\\:bg-primary-950\\/35:is(.dark *){background-color:rgb(var(--color-primary-950)/.35)}.dark\\:bg-primary-950\\/40:is(.dark *){background-color:rgb(var(--color-primary-950)/.4)}.dark\\:bg-primary-950\\/45:is(.dark *){background-color:rgb(var(--color-primary-950)/.45)}.dark\\:bg-primary-950\\/5:is(.dark *){background-color:rgb(var(--color-primary-950)/.05)}.dark\\:bg-primary-950\\/50:is(.dark *){background-color:rgb(var(--color-primary-950)/.5)}.dark\\:bg-primary-950\\/55:is(.dark *){background-color:rgb(var(--color-primary-950)/.55)}.dark\\:bg-primary-950\\/60:is(.dark *){background-color:rgb(var(--color-primary-950)/.6)}.dark\\:bg-primary-950\\/65:is(.dark *){background-color:rgb(var(--color-primary-950)/.65)}.dark\\:bg-primary-950\\/70:is(.dark *){background-color:rgb(var(--color-primary-950)/.7)}.dark\\:bg-primary-950\\/75:is(.dark *){background-color:rgb(var(--color-primary-950)/.75)}.dark\\:bg-primary-950\\/80:is(.dark *){background-color:rgb(var(--color-primary-950)/.8)}.dark\\:bg-primary-950\\/85:is(.dark *){background-color:rgb(var(--color-primary-950)/.85)}.dark\\:bg-primary-950\\/90:is(.dark *){background-color:rgb(var(--color-primary-950)/.9)}.dark\\:bg-primary-950\\/95:is(.dark *){background-color:rgb(var(--color-primary-950)/.95)}.dark\\:bg-purple-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(192 132 252/var(--tw-bg-opacity))}.dark\\:bg-purple-400\\/0:is(.dark *){background-color:#c084fc00}.dark\\:bg-purple-400\\/10:is(.dark *){background-color:#c084fc1a}.dark\\:bg-purple-400\\/100:is(.dark *){background-color:#c084fc}.dark\\:bg-purple-400\\/15:is(.dark *){background-color:#c084fc26}.dark\\:bg-purple-400\\/20:is(.dark *){background-color:#c084fc33}.dark\\:bg-purple-400\\/25:is(.dark *){background-color:#c084fc40}.dark\\:bg-purple-400\\/30:is(.dark *){background-color:#c084fc4d}.dark\\:bg-purple-400\\/35:is(.dark *){background-color:#c084fc59}.dark\\:bg-purple-400\\/40:is(.dark *){background-color:#c084fc66}.dark\\:bg-purple-400\\/45:is(.dark *){background-color:#c084fc73}.dark\\:bg-purple-400\\/5:is(.dark *){background-color:#c084fc0d}.dark\\:bg-purple-400\\/50:is(.dark *){background-color:#c084fc80}.dark\\:bg-purple-400\\/55:is(.dark *){background-color:#c084fc8c}.dark\\:bg-purple-400\\/60:is(.dark *){background-color:#c084fc99}.dark\\:bg-purple-400\\/65:is(.dark *){background-color:#c084fca6}.dark\\:bg-purple-400\\/70:is(.dark *){background-color:#c084fcb3}.dark\\:bg-purple-400\\/75:is(.dark *){background-color:#c084fcbf}.dark\\:bg-purple-400\\/80:is(.dark *){background-color:#c084fccc}.dark\\:bg-purple-400\\/85:is(.dark *){background-color:#c084fcd9}.dark\\:bg-purple-400\\/90:is(.dark *){background-color:#c084fce6}.dark\\:bg-purple-400\\/95:is(.dark *){background-color:#c084fcf2}.dark\\:bg-red-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(248 113 113/var(--tw-bg-opacity))}.dark\\:bg-red-400\\/0:is(.dark *){background-color:#f8717100}.dark\\:bg-red-400\\/10:is(.dark *){background-color:#f871711a}.dark\\:bg-red-400\\/100:is(.dark *){background-color:#f87171}.dark\\:bg-red-400\\/15:is(.dark *){background-color:#f8717126}.dark\\:bg-red-400\\/20:is(.dark *){background-color:#f8717133}.dark\\:bg-red-400\\/25:is(.dark *){background-color:#f8717140}.dark\\:bg-red-400\\/30:is(.dark *){background-color:#f871714d}.dark\\:bg-red-400\\/35:is(.dark *){background-color:#f8717159}.dark\\:bg-red-400\\/40:is(.dark *){background-color:#f8717166}.dark\\:bg-red-400\\/45:is(.dark *){background-color:#f8717173}.dark\\:bg-red-400\\/5:is(.dark *){background-color:#f871710d}.dark\\:bg-red-400\\/50:is(.dark *){background-color:#f8717180}.dark\\:bg-red-400\\/55:is(.dark *){background-color:#f871718c}.dark\\:bg-red-400\\/60:is(.dark *){background-color:#f8717199}.dark\\:bg-red-400\\/65:is(.dark *){background-color:#f87171a6}.dark\\:bg-red-400\\/70:is(.dark *){background-color:#f87171b3}.dark\\:bg-red-400\\/75:is(.dark *){background-color:#f87171bf}.dark\\:bg-red-400\\/80:is(.dark *){background-color:#f87171cc}.dark\\:bg-red-400\\/85:is(.dark *){background-color:#f87171d9}.dark\\:bg-red-400\\/90:is(.dark *){background-color:#f87171e6}.dark\\:bg-red-400\\/95:is(.dark *){background-color:#f87171f2}.dark\\:bg-rose-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(251 113 133/var(--tw-bg-opacity))}.dark\\:bg-rose-400\\/0:is(.dark *){background-color:#fb718500}.dark\\:bg-rose-400\\/10:is(.dark *){background-color:#fb71851a}.dark\\:bg-rose-400\\/100:is(.dark *){background-color:#fb7185}.dark\\:bg-rose-400\\/15:is(.dark *){background-color:#fb718526}.dark\\:bg-rose-400\\/20:is(.dark *){background-color:#fb718533}.dark\\:bg-rose-400\\/25:is(.dark *){background-color:#fb718540}.dark\\:bg-rose-400\\/30:is(.dark *){background-color:#fb71854d}.dark\\:bg-rose-400\\/35:is(.dark *){background-color:#fb718559}.dark\\:bg-rose-400\\/40:is(.dark *){background-color:#fb718566}.dark\\:bg-rose-400\\/45:is(.dark *){background-color:#fb718573}.dark\\:bg-rose-400\\/5:is(.dark *){background-color:#fb71850d}.dark\\:bg-rose-400\\/50:is(.dark *){background-color:#fb718580}.dark\\:bg-rose-400\\/55:is(.dark *){background-color:#fb71858c}.dark\\:bg-rose-400\\/60:is(.dark *){background-color:#fb718599}.dark\\:bg-rose-400\\/65:is(.dark *){background-color:#fb7185a6}.dark\\:bg-rose-400\\/70:is(.dark *){background-color:#fb7185b3}.dark\\:bg-rose-400\\/75:is(.dark *){background-color:#fb7185bf}.dark\\:bg-rose-400\\/80:is(.dark *){background-color:#fb7185cc}.dark\\:bg-rose-400\\/85:is(.dark *){background-color:#fb7185d9}.dark\\:bg-rose-400\\/90:is(.dark *){background-color:#fb7185e6}.dark\\:bg-rose-400\\/95:is(.dark *){background-color:#fb7185f2}.dark\\:bg-sky-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(56 189 248/var(--tw-bg-opacity))}.dark\\:bg-sky-400\\/0:is(.dark *){background-color:#38bdf800}.dark\\:bg-sky-400\\/10:is(.dark *){background-color:#38bdf81a}.dark\\:bg-sky-400\\/100:is(.dark *){background-color:#38bdf8}.dark\\:bg-sky-400\\/15:is(.dark *){background-color:#38bdf826}.dark\\:bg-sky-400\\/20:is(.dark *){background-color:#38bdf833}.dark\\:bg-sky-400\\/25:is(.dark *){background-color:#38bdf840}.dark\\:bg-sky-400\\/30:is(.dark *){background-color:#38bdf84d}.dark\\:bg-sky-400\\/35:is(.dark *){background-color:#38bdf859}.dark\\:bg-sky-400\\/40:is(.dark *){background-color:#38bdf866}.dark\\:bg-sky-400\\/45:is(.dark *){background-color:#38bdf873}.dark\\:bg-sky-400\\/5:is(.dark *){background-color:#38bdf80d}.dark\\:bg-sky-400\\/50:is(.dark *){background-color:#38bdf880}.dark\\:bg-sky-400\\/55:is(.dark *){background-color:#38bdf88c}.dark\\:bg-sky-400\\/60:is(.dark *){background-color:#38bdf899}.dark\\:bg-sky-400\\/65:is(.dark *){background-color:#38bdf8a6}.dark\\:bg-sky-400\\/70:is(.dark *){background-color:#38bdf8b3}.dark\\:bg-sky-400\\/75:is(.dark *){background-color:#38bdf8bf}.dark\\:bg-sky-400\\/80:is(.dark *){background-color:#38bdf8cc}.dark\\:bg-sky-400\\/85:is(.dark *){background-color:#38bdf8d9}.dark\\:bg-sky-400\\/90:is(.dark *){background-color:#38bdf8e6}.dark\\:bg-sky-400\\/95:is(.dark *){background-color:#38bdf8f2}.dark\\:bg-teal-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(45 212 191/var(--tw-bg-opacity))}.dark\\:bg-teal-400\\/0:is(.dark *){background-color:#2dd4bf00}.dark\\:bg-teal-400\\/10:is(.dark *){background-color:#2dd4bf1a}.dark\\:bg-teal-400\\/100:is(.dark *){background-color:#2dd4bf}.dark\\:bg-teal-400\\/15:is(.dark *){background-color:#2dd4bf26}.dark\\:bg-teal-400\\/20:is(.dark *){background-color:#2dd4bf33}.dark\\:bg-teal-400\\/25:is(.dark *){background-color:#2dd4bf40}.dark\\:bg-teal-400\\/30:is(.dark *){background-color:#2dd4bf4d}.dark\\:bg-teal-400\\/35:is(.dark *){background-color:#2dd4bf59}.dark\\:bg-teal-400\\/40:is(.dark *){background-color:#2dd4bf66}.dark\\:bg-teal-400\\/45:is(.dark *){background-color:#2dd4bf73}.dark\\:bg-teal-400\\/5:is(.dark *){background-color:#2dd4bf0d}.dark\\:bg-teal-400\\/50:is(.dark *){background-color:#2dd4bf80}.dark\\:bg-teal-400\\/55:is(.dark *){background-color:#2dd4bf8c}.dark\\:bg-teal-400\\/60:is(.dark *){background-color:#2dd4bf99}.dark\\:bg-teal-400\\/65:is(.dark *){background-color:#2dd4bfa6}.dark\\:bg-teal-400\\/70:is(.dark *){background-color:#2dd4bfb3}.dark\\:bg-teal-400\\/75:is(.dark *){background-color:#2dd4bfbf}.dark\\:bg-teal-400\\/80:is(.dark *){background-color:#2dd4bfcc}.dark\\:bg-teal-400\\/85:is(.dark *){background-color:#2dd4bfd9}.dark\\:bg-teal-400\\/90:is(.dark *){background-color:#2dd4bfe6}.dark\\:bg-teal-400\\/95:is(.dark *){background-color:#2dd4bff2}.dark\\:bg-violet-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(167 139 250/var(--tw-bg-opacity))}.dark\\:bg-violet-400\\/0:is(.dark *){background-color:#a78bfa00}.dark\\:bg-violet-400\\/10:is(.dark *){background-color:#a78bfa1a}.dark\\:bg-violet-400\\/100:is(.dark *){background-color:#a78bfa}.dark\\:bg-violet-400\\/15:is(.dark *){background-color:#a78bfa26}.dark\\:bg-violet-400\\/20:is(.dark *){background-color:#a78bfa33}.dark\\:bg-violet-400\\/25:is(.dark *){background-color:#a78bfa40}.dark\\:bg-violet-400\\/30:is(.dark *){background-color:#a78bfa4d}.dark\\:bg-violet-400\\/35:is(.dark *){background-color:#a78bfa59}.dark\\:bg-violet-400\\/40:is(.dark *){background-color:#a78bfa66}.dark\\:bg-violet-400\\/45:is(.dark *){background-color:#a78bfa73}.dark\\:bg-violet-400\\/5:is(.dark *){background-color:#a78bfa0d}.dark\\:bg-violet-400\\/50:is(.dark *){background-color:#a78bfa80}.dark\\:bg-violet-400\\/55:is(.dark *){background-color:#a78bfa8c}.dark\\:bg-violet-400\\/60:is(.dark *){background-color:#a78bfa99}.dark\\:bg-violet-400\\/65:is(.dark *){background-color:#a78bfaa6}.dark\\:bg-violet-400\\/70:is(.dark *){background-color:#a78bfab3}.dark\\:bg-violet-400\\/75:is(.dark *){background-color:#a78bfabf}.dark\\:bg-violet-400\\/80:is(.dark *){background-color:#a78bfacc}.dark\\:bg-violet-400\\/85:is(.dark *){background-color:#a78bfad9}.dark\\:bg-violet-400\\/90:is(.dark *){background-color:#a78bfae6}.dark\\:bg-violet-400\\/95:is(.dark *){background-color:#a78bfaf2}.dark\\:bg-white:is(.dark *){--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.dark\\:bg-yellow-400:is(.dark *){--tw-bg-opacity:1;background-color:rgb(250 204 21/var(--tw-bg-opacity))}.dark\\:bg-yellow-400\\/0:is(.dark *){background-color:#facc1500}.dark\\:bg-yellow-400\\/10:is(.dark *){background-color:#facc151a}.dark\\:bg-yellow-400\\/100:is(.dark *){background-color:#facc15}.dark\\:bg-yellow-400\\/15:is(.dark *){background-color:#facc1526}.dark\\:bg-yellow-400\\/20:is(.dark *){background-color:#facc1533}.dark\\:bg-yellow-400\\/25:is(.dark *){background-color:#facc1540}.dark\\:bg-yellow-400\\/30:is(.dark *){background-color:#facc154d}.dark\\:bg-yellow-400\\/35:is(.dark *){background-color:#facc1559}.dark\\:bg-yellow-400\\/40:is(.dark *){background-color:#facc1566}.dark\\:bg-yellow-400\\/45:is(.dark *){background-color:#facc1573}.dark\\:bg-yellow-400\\/5:is(.dark *){background-color:#facc150d}.dark\\:bg-yellow-400\\/50:is(.dark *){background-color:#facc1580}.dark\\:bg-yellow-400\\/55:is(.dark *){background-color:#facc158c}.dark\\:bg-yellow-400\\/60:is(.dark *){background-color:#facc1599}.dark\\:bg-yellow-400\\/65:is(.dark *){background-color:#facc15a6}.dark\\:bg-yellow-400\\/70:is(.dark *){background-color:#facc15b3}.dark\\:bg-yellow-400\\/75:is(.dark *){background-color:#facc15bf}.dark\\:bg-yellow-400\\/80:is(.dark *){background-color:#facc15cc}.dark\\:bg-yellow-400\\/85:is(.dark *){background-color:#facc15d9}.dark\\:bg-yellow-400\\/90:is(.dark *){background-color:#facc15e6}.dark\\:bg-yellow-400\\/95:is(.dark *){background-color:#facc15f2}.dark\\:bg-opacity-10:is(.dark *){--tw-bg-opacity:0.1}.dark\\:text-amber-400:is(.dark *){--tw-text-opacity:1;color:rgb(251 191 36/var(--tw-text-opacity))}.dark\\:text-amber-400\\/0:is(.dark *){color:#fbbf2400}.dark\\:text-amber-400\\/10:is(.dark *){color:#fbbf241a}.dark\\:text-amber-400\\/100:is(.dark *){color:#fbbf24}.dark\\:text-amber-400\\/15:is(.dark *){color:#fbbf2426}.dark\\:text-amber-400\\/20:is(.dark *){color:#fbbf2433}.dark\\:text-amber-400\\/25:is(.dark *){color:#fbbf2440}.dark\\:text-amber-400\\/30:is(.dark *){color:#fbbf244d}.dark\\:text-amber-400\\/35:is(.dark *){color:#fbbf2459}.dark\\:text-amber-400\\/40:is(.dark *){color:#fbbf2466}.dark\\:text-amber-400\\/45:is(.dark *){color:#fbbf2473}.dark\\:text-amber-400\\/5:is(.dark *){color:#fbbf240d}.dark\\:text-amber-400\\/50:is(.dark *){color:#fbbf2480}.dark\\:text-amber-400\\/55:is(.dark *){color:#fbbf248c}.dark\\:text-amber-400\\/60:is(.dark *){color:#fbbf2499}.dark\\:text-amber-400\\/65:is(.dark *){color:#fbbf24a6}.dark\\:text-amber-400\\/70:is(.dark *){color:#fbbf24b3}.dark\\:text-amber-400\\/75:is(.dark *){color:#fbbf24bf}.dark\\:text-amber-400\\/80:is(.dark *){color:#fbbf24cc}.dark\\:text-amber-400\\/85:is(.dark *){color:#fbbf24d9}.dark\\:text-amber-400\\/90:is(.dark *){color:#fbbf24e6}.dark\\:text-amber-400\\/95:is(.dark *){color:#fbbf24f2}.dark\\:text-black:is(.dark *){--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.dark\\:text-blue-400:is(.dark *){--tw-text-opacity:1;color:rgb(96 165 250/var(--tw-text-opacity))}.dark\\:text-blue-400\\/0:is(.dark *){color:#60a5fa00}.dark\\:text-blue-400\\/10:is(.dark *){color:#60a5fa1a}.dark\\:text-blue-400\\/100:is(.dark *){color:#60a5fa}.dark\\:text-blue-400\\/15:is(.dark *){color:#60a5fa26}.dark\\:text-blue-400\\/20:is(.dark *){color:#60a5fa33}.dark\\:text-blue-400\\/25:is(.dark *){color:#60a5fa40}.dark\\:text-blue-400\\/30:is(.dark *){color:#60a5fa4d}.dark\\:text-blue-400\\/35:is(.dark *){color:#60a5fa59}.dark\\:text-blue-400\\/40:is(.dark *){color:#60a5fa66}.dark\\:text-blue-400\\/45:is(.dark *){color:#60a5fa73}.dark\\:text-blue-400\\/5:is(.dark *){color:#60a5fa0d}.dark\\:text-blue-400\\/50:is(.dark *){color:#60a5fa80}.dark\\:text-blue-400\\/55:is(.dark *){color:#60a5fa8c}.dark\\:text-blue-400\\/60:is(.dark *){color:#60a5fa99}.dark\\:text-blue-400\\/65:is(.dark *){color:#60a5faa6}.dark\\:text-blue-400\\/70:is(.dark *){color:#60a5fab3}.dark\\:text-blue-400\\/75:is(.dark *){color:#60a5fabf}.dark\\:text-blue-400\\/80:is(.dark *){color:#60a5facc}.dark\\:text-blue-400\\/85:is(.dark *){color:#60a5fad9}.dark\\:text-blue-400\\/90:is(.dark *){color:#60a5fae6}.dark\\:text-blue-400\\/95:is(.dark *){color:#60a5faf2}.dark\\:text-cyan-400:is(.dark *){--tw-text-opacity:1;color:rgb(34 211 238/var(--tw-text-opacity))}.dark\\:text-cyan-400\\/0:is(.dark *){color:#22d3ee00}.dark\\:text-cyan-400\\/10:is(.dark *){color:#22d3ee1a}.dark\\:text-cyan-400\\/100:is(.dark *){color:#22d3ee}.dark\\:text-cyan-400\\/15:is(.dark *){color:#22d3ee26}.dark\\:text-cyan-400\\/20:is(.dark *){color:#22d3ee33}.dark\\:text-cyan-400\\/25:is(.dark *){color:#22d3ee40}.dark\\:text-cyan-400\\/30:is(.dark *){color:#22d3ee4d}.dark\\:text-cyan-400\\/35:is(.dark *){color:#22d3ee59}.dark\\:text-cyan-400\\/40:is(.dark *){color:#22d3ee66}.dark\\:text-cyan-400\\/45:is(.dark *){color:#22d3ee73}.dark\\:text-cyan-400\\/5:is(.dark *){color:#22d3ee0d}.dark\\:text-cyan-400\\/50:is(.dark *){color:#22d3ee80}.dark\\:text-cyan-400\\/55:is(.dark *){color:#22d3ee8c}.dark\\:text-cyan-400\\/60:is(.dark *){color:#22d3ee99}.dark\\:text-cyan-400\\/65:is(.dark *){color:#22d3eea6}.dark\\:text-cyan-400\\/70:is(.dark *){color:#22d3eeb3}.dark\\:text-cyan-400\\/75:is(.dark *){color:#22d3eebf}.dark\\:text-cyan-400\\/80:is(.dark *){color:#22d3eecc}.dark\\:text-cyan-400\\/85:is(.dark *){color:#22d3eed9}.dark\\:text-cyan-400\\/90:is(.dark *){color:#22d3eee6}.dark\\:text-cyan-400\\/95:is(.dark *){color:#22d3eef2}.dark\\:text-emerald-400:is(.dark *){--tw-text-opacity:1;color:rgb(52 211 153/var(--tw-text-opacity))}.dark\\:text-emerald-400\\/0:is(.dark *){color:#34d39900}.dark\\:text-emerald-400\\/10:is(.dark *){color:#34d3991a}.dark\\:text-emerald-400\\/100:is(.dark *){color:#34d399}.dark\\:text-emerald-400\\/15:is(.dark *){color:#34d39926}.dark\\:text-emerald-400\\/20:is(.dark *){color:#34d39933}.dark\\:text-emerald-400\\/25:is(.dark *){color:#34d39940}.dark\\:text-emerald-400\\/30:is(.dark *){color:#34d3994d}.dark\\:text-emerald-400\\/35:is(.dark *){color:#34d39959}.dark\\:text-emerald-400\\/40:is(.dark *){color:#34d39966}.dark\\:text-emerald-400\\/45:is(.dark *){color:#34d39973}.dark\\:text-emerald-400\\/5:is(.dark *){color:#34d3990d}.dark\\:text-emerald-400\\/50:is(.dark *){color:#34d39980}.dark\\:text-emerald-400\\/55:is(.dark *){color:#34d3998c}.dark\\:text-emerald-400\\/60:is(.dark *){color:#34d39999}.dark\\:text-emerald-400\\/65:is(.dark *){color:#34d399a6}.dark\\:text-emerald-400\\/70:is(.dark *){color:#34d399b3}.dark\\:text-emerald-400\\/75:is(.dark *){color:#34d399bf}.dark\\:text-emerald-400\\/80:is(.dark *){color:#34d399cc}.dark\\:text-emerald-400\\/85:is(.dark *){color:#34d399d9}.dark\\:text-emerald-400\\/90:is(.dark *){color:#34d399e6}.dark\\:text-emerald-400\\/95:is(.dark *){color:#34d399f2}.dark\\:text-fuchsia-400:is(.dark *){--tw-text-opacity:1;color:rgb(232 121 249/var(--tw-text-opacity))}.dark\\:text-fuchsia-400\\/0:is(.dark *){color:#e879f900}.dark\\:text-fuchsia-400\\/10:is(.dark *){color:#e879f91a}.dark\\:text-fuchsia-400\\/100:is(.dark *){color:#e879f9}.dark\\:text-fuchsia-400\\/15:is(.dark *){color:#e879f926}.dark\\:text-fuchsia-400\\/20:is(.dark *){color:#e879f933}.dark\\:text-fuchsia-400\\/25:is(.dark *){color:#e879f940}.dark\\:text-fuchsia-400\\/30:is(.dark *){color:#e879f94d}.dark\\:text-fuchsia-400\\/35:is(.dark *){color:#e879f959}.dark\\:text-fuchsia-400\\/40:is(.dark *){color:#e879f966}.dark\\:text-fuchsia-400\\/45:is(.dark *){color:#e879f973}.dark\\:text-fuchsia-400\\/5:is(.dark *){color:#e879f90d}.dark\\:text-fuchsia-400\\/50:is(.dark *){color:#e879f980}.dark\\:text-fuchsia-400\\/55:is(.dark *){color:#e879f98c}.dark\\:text-fuchsia-400\\/60:is(.dark *){color:#e879f999}.dark\\:text-fuchsia-400\\/65:is(.dark *){color:#e879f9a6}.dark\\:text-fuchsia-400\\/70:is(.dark *){color:#e879f9b3}.dark\\:text-fuchsia-400\\/75:is(.dark *){color:#e879f9bf}.dark\\:text-fuchsia-400\\/80:is(.dark *){color:#e879f9cc}.dark\\:text-fuchsia-400\\/85:is(.dark *){color:#e879f9d9}.dark\\:text-fuchsia-400\\/90:is(.dark *){color:#e879f9e6}.dark\\:text-fuchsia-400\\/95:is(.dark *){color:#e879f9f2}.dark\\:text-gray-200:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-200)/var(--tw-text-opacity))}.dark\\:text-gray-400:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-400)/var(--tw-text-opacity))}.dark\\:text-gray-500:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-500)/var(--tw-text-opacity))}.dark\\:text-gray-900:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-900)/var(--tw-text-opacity))}.dark\\:text-green-400:is(.dark *){--tw-text-opacity:1;color:rgb(74 222 128/var(--tw-text-opacity))}.dark\\:text-green-400\\/0:is(.dark *){color:#4ade8000}.dark\\:text-green-400\\/10:is(.dark *){color:#4ade801a}.dark\\:text-green-400\\/100:is(.dark *){color:#4ade80}.dark\\:text-green-400\\/15:is(.dark *){color:#4ade8026}.dark\\:text-green-400\\/20:is(.dark *){color:#4ade8033}.dark\\:text-green-400\\/25:is(.dark *){color:#4ade8040}.dark\\:text-green-400\\/30:is(.dark *){color:#4ade804d}.dark\\:text-green-400\\/35:is(.dark *){color:#4ade8059}.dark\\:text-green-400\\/40:is(.dark *){color:#4ade8066}.dark\\:text-green-400\\/45:is(.dark *){color:#4ade8073}.dark\\:text-green-400\\/5:is(.dark *){color:#4ade800d}.dark\\:text-green-400\\/50:is(.dark *){color:#4ade8080}.dark\\:text-green-400\\/55:is(.dark *){color:#4ade808c}.dark\\:text-green-400\\/60:is(.dark *){color:#4ade8099}.dark\\:text-green-400\\/65:is(.dark *){color:#4ade80a6}.dark\\:text-green-400\\/70:is(.dark *){color:#4ade80b3}.dark\\:text-green-400\\/75:is(.dark *){color:#4ade80bf}.dark\\:text-green-400\\/80:is(.dark *){color:#4ade80cc}.dark\\:text-green-400\\/85:is(.dark *){color:#4ade80d9}.dark\\:text-green-400\\/90:is(.dark *){color:#4ade80e6}.dark\\:text-green-400\\/95:is(.dark *){color:#4ade80f2}.dark\\:text-indigo-400:is(.dark *){--tw-text-opacity:1;color:rgb(129 140 248/var(--tw-text-opacity))}.dark\\:text-indigo-400\\/0:is(.dark *){color:#818cf800}.dark\\:text-indigo-400\\/10:is(.dark *){color:#818cf81a}.dark\\:text-indigo-400\\/100:is(.dark *){color:#818cf8}.dark\\:text-indigo-400\\/15:is(.dark *){color:#818cf826}.dark\\:text-indigo-400\\/20:is(.dark *){color:#818cf833}.dark\\:text-indigo-400\\/25:is(.dark *){color:#818cf840}.dark\\:text-indigo-400\\/30:is(.dark *){color:#818cf84d}.dark\\:text-indigo-400\\/35:is(.dark *){color:#818cf859}.dark\\:text-indigo-400\\/40:is(.dark *){color:#818cf866}.dark\\:text-indigo-400\\/45:is(.dark *){color:#818cf873}.dark\\:text-indigo-400\\/5:is(.dark *){color:#818cf80d}.dark\\:text-indigo-400\\/50:is(.dark *){color:#818cf880}.dark\\:text-indigo-400\\/55:is(.dark *){color:#818cf88c}.dark\\:text-indigo-400\\/60:is(.dark *){color:#818cf899}.dark\\:text-indigo-400\\/65:is(.dark *){color:#818cf8a6}.dark\\:text-indigo-400\\/70:is(.dark *){color:#818cf8b3}.dark\\:text-indigo-400\\/75:is(.dark *){color:#818cf8bf}.dark\\:text-indigo-400\\/80:is(.dark *){color:#818cf8cc}.dark\\:text-indigo-400\\/85:is(.dark *){color:#818cf8d9}.dark\\:text-indigo-400\\/90:is(.dark *){color:#818cf8e6}.dark\\:text-indigo-400\\/95:is(.dark *){color:#818cf8f2}.dark\\:text-lime-400:is(.dark *){--tw-text-opacity:1;color:rgb(163 230 53/var(--tw-text-opacity))}.dark\\:text-lime-400\\/0:is(.dark *){color:#a3e63500}.dark\\:text-lime-400\\/10:is(.dark *){color:#a3e6351a}.dark\\:text-lime-400\\/100:is(.dark *){color:#a3e635}.dark\\:text-lime-400\\/15:is(.dark *){color:#a3e63526}.dark\\:text-lime-400\\/20:is(.dark *){color:#a3e63533}.dark\\:text-lime-400\\/25:is(.dark *){color:#a3e63540}.dark\\:text-lime-400\\/30:is(.dark *){color:#a3e6354d}.dark\\:text-lime-400\\/35:is(.dark *){color:#a3e63559}.dark\\:text-lime-400\\/40:is(.dark *){color:#a3e63566}.dark\\:text-lime-400\\/45:is(.dark *){color:#a3e63573}.dark\\:text-lime-400\\/5:is(.dark *){color:#a3e6350d}.dark\\:text-lime-400\\/50:is(.dark *){color:#a3e63580}.dark\\:text-lime-400\\/55:is(.dark *){color:#a3e6358c}.dark\\:text-lime-400\\/60:is(.dark *){color:#a3e63599}.dark\\:text-lime-400\\/65:is(.dark *){color:#a3e635a6}.dark\\:text-lime-400\\/70:is(.dark *){color:#a3e635b3}.dark\\:text-lime-400\\/75:is(.dark *){color:#a3e635bf}.dark\\:text-lime-400\\/80:is(.dark *){color:#a3e635cc}.dark\\:text-lime-400\\/85:is(.dark *){color:#a3e635d9}.dark\\:text-lime-400\\/90:is(.dark *){color:#a3e635e6}.dark\\:text-lime-400\\/95:is(.dark *){color:#a3e635f2}.dark\\:text-orange-400:is(.dark *){--tw-text-opacity:1;color:rgb(251 146 60/var(--tw-text-opacity))}.dark\\:text-orange-400\\/0:is(.dark *){color:#fb923c00}.dark\\:text-orange-400\\/10:is(.dark *){color:#fb923c1a}.dark\\:text-orange-400\\/100:is(.dark *){color:#fb923c}.dark\\:text-orange-400\\/15:is(.dark *){color:#fb923c26}.dark\\:text-orange-400\\/20:is(.dark *){color:#fb923c33}.dark\\:text-orange-400\\/25:is(.dark *){color:#fb923c40}.dark\\:text-orange-400\\/30:is(.dark *){color:#fb923c4d}.dark\\:text-orange-400\\/35:is(.dark *){color:#fb923c59}.dark\\:text-orange-400\\/40:is(.dark *){color:#fb923c66}.dark\\:text-orange-400\\/45:is(.dark *){color:#fb923c73}.dark\\:text-orange-400\\/5:is(.dark *){color:#fb923c0d}.dark\\:text-orange-400\\/50:is(.dark *){color:#fb923c80}.dark\\:text-orange-400\\/55:is(.dark *){color:#fb923c8c}.dark\\:text-orange-400\\/60:is(.dark *){color:#fb923c99}.dark\\:text-orange-400\\/65:is(.dark *){color:#fb923ca6}.dark\\:text-orange-400\\/70:is(.dark *){color:#fb923cb3}.dark\\:text-orange-400\\/75:is(.dark *){color:#fb923cbf}.dark\\:text-orange-400\\/80:is(.dark *){color:#fb923ccc}.dark\\:text-orange-400\\/85:is(.dark *){color:#fb923cd9}.dark\\:text-orange-400\\/90:is(.dark *){color:#fb923ce6}.dark\\:text-orange-400\\/95:is(.dark *){color:#fb923cf2}.dark\\:text-pink-400:is(.dark *){--tw-text-opacity:1;color:rgb(244 114 182/var(--tw-text-opacity))}.dark\\:text-pink-400\\/0:is(.dark *){color:#f472b600}.dark\\:text-pink-400\\/10:is(.dark *){color:#f472b61a}.dark\\:text-pink-400\\/100:is(.dark *){color:#f472b6}.dark\\:text-pink-400\\/15:is(.dark *){color:#f472b626}.dark\\:text-pink-400\\/20:is(.dark *){color:#f472b633}.dark\\:text-pink-400\\/25:is(.dark *){color:#f472b640}.dark\\:text-pink-400\\/30:is(.dark *){color:#f472b64d}.dark\\:text-pink-400\\/35:is(.dark *){color:#f472b659}.dark\\:text-pink-400\\/40:is(.dark *){color:#f472b666}.dark\\:text-pink-400\\/45:is(.dark *){color:#f472b673}.dark\\:text-pink-400\\/5:is(.dark *){color:#f472b60d}.dark\\:text-pink-400\\/50:is(.dark *){color:#f472b680}.dark\\:text-pink-400\\/55:is(.dark *){color:#f472b68c}.dark\\:text-pink-400\\/60:is(.dark *){color:#f472b699}.dark\\:text-pink-400\\/65:is(.dark *){color:#f472b6a6}.dark\\:text-pink-400\\/70:is(.dark *){color:#f472b6b3}.dark\\:text-pink-400\\/75:is(.dark *){color:#f472b6bf}.dark\\:text-pink-400\\/80:is(.dark *){color:#f472b6cc}.dark\\:text-pink-400\\/85:is(.dark *){color:#f472b6d9}.dark\\:text-pink-400\\/90:is(.dark *){color:#f472b6e6}.dark\\:text-pink-400\\/95:is(.dark *){color:#f472b6f2}.dark\\:text-primary-400:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-primary-400)/var(--tw-text-opacity))}.dark\\:text-primary-400\\/0:is(.dark *){color:rgb(var(--color-primary-400)/0)}.dark\\:text-primary-400\\/10:is(.dark *){color:rgb(var(--color-primary-400)/.1)}.dark\\:text-primary-400\\/100:is(.dark *){color:rgb(var(--color-primary-400)/1)}.dark\\:text-primary-400\\/15:is(.dark *){color:rgb(var(--color-primary-400)/.15)}.dark\\:text-primary-400\\/20:is(.dark *){color:rgb(var(--color-primary-400)/.2)}.dark\\:text-primary-400\\/25:is(.dark *){color:rgb(var(--color-primary-400)/.25)}.dark\\:text-primary-400\\/30:is(.dark *){color:rgb(var(--color-primary-400)/.3)}.dark\\:text-primary-400\\/35:is(.dark *){color:rgb(var(--color-primary-400)/.35)}.dark\\:text-primary-400\\/40:is(.dark *){color:rgb(var(--color-primary-400)/.4)}.dark\\:text-primary-400\\/45:is(.dark *){color:rgb(var(--color-primary-400)/.45)}.dark\\:text-primary-400\\/5:is(.dark *){color:rgb(var(--color-primary-400)/.05)}.dark\\:text-primary-400\\/50:is(.dark *){color:rgb(var(--color-primary-400)/.5)}.dark\\:text-primary-400\\/55:is(.dark *){color:rgb(var(--color-primary-400)/.55)}.dark\\:text-primary-400\\/60:is(.dark *){color:rgb(var(--color-primary-400)/.6)}.dark\\:text-primary-400\\/65:is(.dark *){color:rgb(var(--color-primary-400)/.65)}.dark\\:text-primary-400\\/70:is(.dark *){color:rgb(var(--color-primary-400)/.7)}.dark\\:text-primary-400\\/75:is(.dark *){color:rgb(var(--color-primary-400)/.75)}.dark\\:text-primary-400\\/80:is(.dark *){color:rgb(var(--color-primary-400)/.8)}.dark\\:text-primary-400\\/85:is(.dark *){color:rgb(var(--color-primary-400)/.85)}.dark\\:text-primary-400\\/90:is(.dark *){color:rgb(var(--color-primary-400)/.9)}.dark\\:text-primary-400\\/95:is(.dark *){color:rgb(var(--color-primary-400)/.95)}.dark\\:text-purple-400:is(.dark *){--tw-text-opacity:1;color:rgb(192 132 252/var(--tw-text-opacity))}.dark\\:text-purple-400\\/0:is(.dark *){color:#c084fc00}.dark\\:text-purple-400\\/10:is(.dark *){color:#c084fc1a}.dark\\:text-purple-400\\/100:is(.dark *){color:#c084fc}.dark\\:text-purple-400\\/15:is(.dark *){color:#c084fc26}.dark\\:text-purple-400\\/20:is(.dark *){color:#c084fc33}.dark\\:text-purple-400\\/25:is(.dark *){color:#c084fc40}.dark\\:text-purple-400\\/30:is(.dark *){color:#c084fc4d}.dark\\:text-purple-400\\/35:is(.dark *){color:#c084fc59}.dark\\:text-purple-400\\/40:is(.dark *){color:#c084fc66}.dark\\:text-purple-400\\/45:is(.dark *){color:#c084fc73}.dark\\:text-purple-400\\/5:is(.dark *){color:#c084fc0d}.dark\\:text-purple-400\\/50:is(.dark *){color:#c084fc80}.dark\\:text-purple-400\\/55:is(.dark *){color:#c084fc8c}.dark\\:text-purple-400\\/60:is(.dark *){color:#c084fc99}.dark\\:text-purple-400\\/65:is(.dark *){color:#c084fca6}.dark\\:text-purple-400\\/70:is(.dark *){color:#c084fcb3}.dark\\:text-purple-400\\/75:is(.dark *){color:#c084fcbf}.dark\\:text-purple-400\\/80:is(.dark *){color:#c084fccc}.dark\\:text-purple-400\\/85:is(.dark *){color:#c084fcd9}.dark\\:text-purple-400\\/90:is(.dark *){color:#c084fce6}.dark\\:text-purple-400\\/95:is(.dark *){color:#c084fcf2}.dark\\:text-red-400:is(.dark *){--tw-text-opacity:1;color:rgb(248 113 113/var(--tw-text-opacity))}.dark\\:text-red-400\\/0:is(.dark *){color:#f8717100}.dark\\:text-red-400\\/10:is(.dark *){color:#f871711a}.dark\\:text-red-400\\/100:is(.dark *){color:#f87171}.dark\\:text-red-400\\/15:is(.dark *){color:#f8717126}.dark\\:text-red-400\\/20:is(.dark *){color:#f8717133}.dark\\:text-red-400\\/25:is(.dark *){color:#f8717140}.dark\\:text-red-400\\/30:is(.dark *){color:#f871714d}.dark\\:text-red-400\\/35:is(.dark *){color:#f8717159}.dark\\:text-red-400\\/40:is(.dark *){color:#f8717166}.dark\\:text-red-400\\/45:is(.dark *){color:#f8717173}.dark\\:text-red-400\\/5:is(.dark *){color:#f871710d}.dark\\:text-red-400\\/50:is(.dark *){color:#f8717180}.dark\\:text-red-400\\/55:is(.dark *){color:#f871718c}.dark\\:text-red-400\\/60:is(.dark *){color:#f8717199}.dark\\:text-red-400\\/65:is(.dark *){color:#f87171a6}.dark\\:text-red-400\\/70:is(.dark *){color:#f87171b3}.dark\\:text-red-400\\/75:is(.dark *){color:#f87171bf}.dark\\:text-red-400\\/80:is(.dark *){color:#f87171cc}.dark\\:text-red-400\\/85:is(.dark *){color:#f87171d9}.dark\\:text-red-400\\/90:is(.dark *){color:#f87171e6}.dark\\:text-red-400\\/95:is(.dark *){color:#f87171f2}.dark\\:text-rose-400:is(.dark *){--tw-text-opacity:1;color:rgb(251 113 133/var(--tw-text-opacity))}.dark\\:text-rose-400\\/0:is(.dark *){color:#fb718500}.dark\\:text-rose-400\\/10:is(.dark *){color:#fb71851a}.dark\\:text-rose-400\\/100:is(.dark *){color:#fb7185}.dark\\:text-rose-400\\/15:is(.dark *){color:#fb718526}.dark\\:text-rose-400\\/20:is(.dark *){color:#fb718533}.dark\\:text-rose-400\\/25:is(.dark *){color:#fb718540}.dark\\:text-rose-400\\/30:is(.dark *){color:#fb71854d}.dark\\:text-rose-400\\/35:is(.dark *){color:#fb718559}.dark\\:text-rose-400\\/40:is(.dark *){color:#fb718566}.dark\\:text-rose-400\\/45:is(.dark *){color:#fb718573}.dark\\:text-rose-400\\/5:is(.dark *){color:#fb71850d}.dark\\:text-rose-400\\/50:is(.dark *){color:#fb718580}.dark\\:text-rose-400\\/55:is(.dark *){color:#fb71858c}.dark\\:text-rose-400\\/60:is(.dark *){color:#fb718599}.dark\\:text-rose-400\\/65:is(.dark *){color:#fb7185a6}.dark\\:text-rose-400\\/70:is(.dark *){color:#fb7185b3}.dark\\:text-rose-400\\/75:is(.dark *){color:#fb7185bf}.dark\\:text-rose-400\\/80:is(.dark *){color:#fb7185cc}.dark\\:text-rose-400\\/85:is(.dark *){color:#fb7185d9}.dark\\:text-rose-400\\/90:is(.dark *){color:#fb7185e6}.dark\\:text-rose-400\\/95:is(.dark *){color:#fb7185f2}.dark\\:text-sky-400:is(.dark *){--tw-text-opacity:1;color:rgb(56 189 248/var(--tw-text-opacity))}.dark\\:text-sky-400\\/0:is(.dark *){color:#38bdf800}.dark\\:text-sky-400\\/10:is(.dark *){color:#38bdf81a}.dark\\:text-sky-400\\/100:is(.dark *){color:#38bdf8}.dark\\:text-sky-400\\/15:is(.dark *){color:#38bdf826}.dark\\:text-sky-400\\/20:is(.dark *){color:#38bdf833}.dark\\:text-sky-400\\/25:is(.dark *){color:#38bdf840}.dark\\:text-sky-400\\/30:is(.dark *){color:#38bdf84d}.dark\\:text-sky-400\\/35:is(.dark *){color:#38bdf859}.dark\\:text-sky-400\\/40:is(.dark *){color:#38bdf866}.dark\\:text-sky-400\\/45:is(.dark *){color:#38bdf873}.dark\\:text-sky-400\\/5:is(.dark *){color:#38bdf80d}.dark\\:text-sky-400\\/50:is(.dark *){color:#38bdf880}.dark\\:text-sky-400\\/55:is(.dark *){color:#38bdf88c}.dark\\:text-sky-400\\/60:is(.dark *){color:#38bdf899}.dark\\:text-sky-400\\/65:is(.dark *){color:#38bdf8a6}.dark\\:text-sky-400\\/70:is(.dark *){color:#38bdf8b3}.dark\\:text-sky-400\\/75:is(.dark *){color:#38bdf8bf}.dark\\:text-sky-400\\/80:is(.dark *){color:#38bdf8cc}.dark\\:text-sky-400\\/85:is(.dark *){color:#38bdf8d9}.dark\\:text-sky-400\\/90:is(.dark *){color:#38bdf8e6}.dark\\:text-sky-400\\/95:is(.dark *){color:#38bdf8f2}.dark\\:text-teal-400:is(.dark *){--tw-text-opacity:1;color:rgb(45 212 191/var(--tw-text-opacity))}.dark\\:text-teal-400\\/0:is(.dark *){color:#2dd4bf00}.dark\\:text-teal-400\\/10:is(.dark *){color:#2dd4bf1a}.dark\\:text-teal-400\\/100:is(.dark *){color:#2dd4bf}.dark\\:text-teal-400\\/15:is(.dark *){color:#2dd4bf26}.dark\\:text-teal-400\\/20:is(.dark *){color:#2dd4bf33}.dark\\:text-teal-400\\/25:is(.dark *){color:#2dd4bf40}.dark\\:text-teal-400\\/30:is(.dark *){color:#2dd4bf4d}.dark\\:text-teal-400\\/35:is(.dark *){color:#2dd4bf59}.dark\\:text-teal-400\\/40:is(.dark *){color:#2dd4bf66}.dark\\:text-teal-400\\/45:is(.dark *){color:#2dd4bf73}.dark\\:text-teal-400\\/5:is(.dark *){color:#2dd4bf0d}.dark\\:text-teal-400\\/50:is(.dark *){color:#2dd4bf80}.dark\\:text-teal-400\\/55:is(.dark *){color:#2dd4bf8c}.dark\\:text-teal-400\\/60:is(.dark *){color:#2dd4bf99}.dark\\:text-teal-400\\/65:is(.dark *){color:#2dd4bfa6}.dark\\:text-teal-400\\/70:is(.dark *){color:#2dd4bfb3}.dark\\:text-teal-400\\/75:is(.dark *){color:#2dd4bfbf}.dark\\:text-teal-400\\/80:is(.dark *){color:#2dd4bfcc}.dark\\:text-teal-400\\/85:is(.dark *){color:#2dd4bfd9}.dark\\:text-teal-400\\/90:is(.dark *){color:#2dd4bfe6}.dark\\:text-teal-400\\/95:is(.dark *){color:#2dd4bff2}.dark\\:text-violet-400:is(.dark *){--tw-text-opacity:1;color:rgb(167 139 250/var(--tw-text-opacity))}.dark\\:text-violet-400\\/0:is(.dark *){color:#a78bfa00}.dark\\:text-violet-400\\/10:is(.dark *){color:#a78bfa1a}.dark\\:text-violet-400\\/100:is(.dark *){color:#a78bfa}.dark\\:text-violet-400\\/15:is(.dark *){color:#a78bfa26}.dark\\:text-violet-400\\/20:is(.dark *){color:#a78bfa33}.dark\\:text-violet-400\\/25:is(.dark *){color:#a78bfa40}.dark\\:text-violet-400\\/30:is(.dark *){color:#a78bfa4d}.dark\\:text-violet-400\\/35:is(.dark *){color:#a78bfa59}.dark\\:text-violet-400\\/40:is(.dark *){color:#a78bfa66}.dark\\:text-violet-400\\/45:is(.dark *){color:#a78bfa73}.dark\\:text-violet-400\\/5:is(.dark *){color:#a78bfa0d}.dark\\:text-violet-400\\/50:is(.dark *){color:#a78bfa80}.dark\\:text-violet-400\\/55:is(.dark *){color:#a78bfa8c}.dark\\:text-violet-400\\/60:is(.dark *){color:#a78bfa99}.dark\\:text-violet-400\\/65:is(.dark *){color:#a78bfaa6}.dark\\:text-violet-400\\/70:is(.dark *){color:#a78bfab3}.dark\\:text-violet-400\\/75:is(.dark *){color:#a78bfabf}.dark\\:text-violet-400\\/80:is(.dark *){color:#a78bfacc}.dark\\:text-violet-400\\/85:is(.dark *){color:#a78bfad9}.dark\\:text-violet-400\\/90:is(.dark *){color:#a78bfae6}.dark\\:text-violet-400\\/95:is(.dark *){color:#a78bfaf2}.dark\\:text-white:is(.dark *){--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.dark\\:text-yellow-400:is(.dark *){--tw-text-opacity:1;color:rgb(250 204 21/var(--tw-text-opacity))}.dark\\:text-yellow-400\\/0:is(.dark *){color:#facc1500}.dark\\:text-yellow-400\\/10:is(.dark *){color:#facc151a}.dark\\:text-yellow-400\\/100:is(.dark *){color:#facc15}.dark\\:text-yellow-400\\/15:is(.dark *){color:#facc1526}.dark\\:text-yellow-400\\/20:is(.dark *){color:#facc1533}.dark\\:text-yellow-400\\/25:is(.dark *){color:#facc1540}.dark\\:text-yellow-400\\/30:is(.dark *){color:#facc154d}.dark\\:text-yellow-400\\/35:is(.dark *){color:#facc1559}.dark\\:text-yellow-400\\/40:is(.dark *){color:#facc1566}.dark\\:text-yellow-400\\/45:is(.dark *){color:#facc1573}.dark\\:text-yellow-400\\/5:is(.dark *){color:#facc150d}.dark\\:text-yellow-400\\/50:is(.dark *){color:#facc1580}.dark\\:text-yellow-400\\/55:is(.dark *){color:#facc158c}.dark\\:text-yellow-400\\/60:is(.dark *){color:#facc1599}.dark\\:text-yellow-400\\/65:is(.dark *){color:#facc15a6}.dark\\:text-yellow-400\\/70:is(.dark *){color:#facc15b3}.dark\\:text-yellow-400\\/75:is(.dark *){color:#facc15bf}.dark\\:text-yellow-400\\/80:is(.dark *){color:#facc15cc}.dark\\:text-yellow-400\\/85:is(.dark *){color:#facc15d9}.dark\\:text-yellow-400\\/90:is(.dark *){color:#facc15e6}.dark\\:text-yellow-400\\/95:is(.dark *){color:#facc15f2}.dark\\:placeholder-gray-500:is(.dark *)::placeholder{--tw-placeholder-opacity:1;color:rgb(var(--color-gray-500)/var(--tw-placeholder-opacity))}.dark\\:ring-gray-700:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-700)/var(--tw-ring-opacity))}.dark\\:ring-gray-800:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-800)/var(--tw-ring-opacity))}.dark\\:ring-gray-900:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-900)/var(--tw-ring-opacity))}.dark\\:ring-primary-400:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}.dark\\:ring-primary-400\\/0:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0)}.dark\\:ring-primary-400\\/10:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.1)}.dark\\:ring-primary-400\\/100:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/1)}.dark\\:ring-primary-400\\/15:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.15)}.dark\\:ring-primary-400\\/20:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.2)}.dark\\:ring-primary-400\\/25:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.25)}.dark\\:ring-primary-400\\/30:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.3)}.dark\\:ring-primary-400\\/35:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.35)}.dark\\:ring-primary-400\\/40:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.4)}.dark\\:ring-primary-400\\/45:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.45)}.dark\\:ring-primary-400\\/5:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.05)}.dark\\:ring-primary-400\\/50:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.5)}.dark\\:ring-primary-400\\/55:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.55)}.dark\\:ring-primary-400\\/60:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.6)}.dark\\:ring-primary-400\\/65:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.65)}.dark\\:ring-primary-400\\/70:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.7)}.dark\\:ring-primary-400\\/75:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.75)}.dark\\:ring-primary-400\\/80:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.8)}.dark\\:ring-primary-400\\/85:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.85)}.dark\\:ring-primary-400\\/90:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.9)}.dark\\:ring-primary-400\\/95:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.95)}.dark\\:ring-red-400:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(248 113 113/var(--tw-ring-opacity))}.dark\\:ring-red-400\\/0:is(.dark *){--tw-ring-color:#f8717100}.dark\\:ring-red-400\\/10:is(.dark *){--tw-ring-color:#f871711a}.dark\\:ring-red-400\\/100:is(.dark *){--tw-ring-color:#f87171}.dark\\:ring-red-400\\/15:is(.dark *){--tw-ring-color:#f8717126}.dark\\:ring-red-400\\/20:is(.dark *){--tw-ring-color:#f8717133}.dark\\:ring-red-400\\/25:is(.dark *){--tw-ring-color:#f8717140}.dark\\:ring-red-400\\/30:is(.dark *){--tw-ring-color:#f871714d}.dark\\:ring-red-400\\/35:is(.dark *){--tw-ring-color:#f8717159}.dark\\:ring-red-400\\/40:is(.dark *){--tw-ring-color:#f8717166}.dark\\:ring-red-400\\/45:is(.dark *){--tw-ring-color:#f8717173}.dark\\:ring-red-400\\/5:is(.dark *){--tw-ring-color:#f871710d}.dark\\:ring-red-400\\/50:is(.dark *){--tw-ring-color:#f8717180}.dark\\:ring-red-400\\/55:is(.dark *){--tw-ring-color:#f871718c}.dark\\:ring-red-400\\/60:is(.dark *){--tw-ring-color:#f8717199}.dark\\:ring-red-400\\/65:is(.dark *){--tw-ring-color:#f87171a6}.dark\\:ring-red-400\\/70:is(.dark *){--tw-ring-color:#f87171b3}.dark\\:ring-red-400\\/75:is(.dark *){--tw-ring-color:#f87171bf}.dark\\:ring-red-400\\/80:is(.dark *){--tw-ring-color:#f87171cc}.dark\\:ring-red-400\\/85:is(.dark *){--tw-ring-color:#f87171d9}.dark\\:ring-red-400\\/90:is(.dark *){--tw-ring-color:#f87171e6}.dark\\:ring-red-400\\/95:is(.dark *){--tw-ring-color:#f87171f2}.dark\\:ring-opacity-25:is(.dark *){--tw-ring-opacity:0.25}.dark\\:file\\:text-gray-400:is(.dark *)::file-selector-button{--tw-text-opacity:1;color:rgb(var(--color-gray-400)/var(--tw-text-opacity))}.dark\\:before\\:bg-gray-700:is(.dark *):before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}.dark\\:before\\:bg-gray-800:is(.dark *):before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-gray-800)/var(--tw-bg-opacity))}.dark\\:before\\:ring-gray-700:is(.dark *):before{content:var(--tw-content);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-700)/var(--tw-ring-opacity))}.dark\\:before\\:ring-gray-800:is(.dark *):before{content:var(--tw-content);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-gray-800)/var(--tw-ring-opacity))}.dark\\:after\\:bg-primary-400:is(.dark *):after{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(var(--color-primary-400)/var(--tw-bg-opacity))}.dark\\:after\\:text-red-400:is(.dark *):after{content:var(--tw-content);--tw-text-opacity:1;color:rgb(248 113 113/var(--tw-text-opacity))}.dark\\:checked\\:border-transparent:checked:is(.dark *){border-color:#0000}.dark\\:checked\\:bg-current:checked:is(.dark *){background-color:currentColor}.dark\\:indeterminate\\:border-transparent:indeterminate:is(.dark *){border-color:#0000}.dark\\:indeterminate\\:bg-current:indeterminate:is(.dark *){background-color:currentColor}.dark\\:hover\\:border-gray-500:hover:is(.dark *){--tw-border-opacity:1;border-color:rgb(var(--color-gray-500)/var(--tw-border-opacity))}.dark\\:hover\\:bg-gray-100:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-100)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-gray-700\\/50:hover:is(.dark *){background-color:rgb(var(--color-gray-700)/.5)}.dark\\:hover\\:bg-gray-800:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-800)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-gray-800\\/50:hover:is(.dark *){background-color:rgb(var(--color-gray-800)/.5)}.dark\\:hover\\:bg-gray-900:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-orange-500:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(249 115 22/var(--tw-bg-opacity))}.dark\\:hover\\:bg-orange-900:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(124 45 18/var(--tw-bg-opacity))}.dark\\:hover\\:bg-orange-950:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(67 20 7/var(--tw-bg-opacity))}.dark\\:hover\\:bg-primary-500:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-500)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-primary-500\\/0:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/0)}.dark\\:hover\\:bg-primary-500\\/10:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.1)}.dark\\:hover\\:bg-primary-500\\/100:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/1)}.dark\\:hover\\:bg-primary-500\\/15:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.15)}.dark\\:hover\\:bg-primary-500\\/20:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.2)}.dark\\:hover\\:bg-primary-500\\/25:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.25)}.dark\\:hover\\:bg-primary-500\\/30:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.3)}.dark\\:hover\\:bg-primary-500\\/35:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.35)}.dark\\:hover\\:bg-primary-500\\/40:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.4)}.dark\\:hover\\:bg-primary-500\\/45:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.45)}.dark\\:hover\\:bg-primary-500\\/5:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.05)}.dark\\:hover\\:bg-primary-500\\/50:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.5)}.dark\\:hover\\:bg-primary-500\\/55:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.55)}.dark\\:hover\\:bg-primary-500\\/60:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.6)}.dark\\:hover\\:bg-primary-500\\/65:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.65)}.dark\\:hover\\:bg-primary-500\\/70:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.7)}.dark\\:hover\\:bg-primary-500\\/75:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.75)}.dark\\:hover\\:bg-primary-500\\/80:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.8)}.dark\\:hover\\:bg-primary-500\\/85:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.85)}.dark\\:hover\\:bg-primary-500\\/90:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.9)}.dark\\:hover\\:bg-primary-500\\/95:hover:is(.dark *){background-color:rgb(var(--color-primary-500)/.95)}.dark\\:hover\\:bg-primary-900:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-900)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-primary-900\\/0:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/0)}.dark\\:hover\\:bg-primary-900\\/10:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.1)}.dark\\:hover\\:bg-primary-900\\/100:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/1)}.dark\\:hover\\:bg-primary-900\\/15:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.15)}.dark\\:hover\\:bg-primary-900\\/20:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.2)}.dark\\:hover\\:bg-primary-900\\/25:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.25)}.dark\\:hover\\:bg-primary-900\\/30:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.3)}.dark\\:hover\\:bg-primary-900\\/35:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.35)}.dark\\:hover\\:bg-primary-900\\/40:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.4)}.dark\\:hover\\:bg-primary-900\\/45:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.45)}.dark\\:hover\\:bg-primary-900\\/5:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.05)}.dark\\:hover\\:bg-primary-900\\/50:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.5)}.dark\\:hover\\:bg-primary-900\\/55:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.55)}.dark\\:hover\\:bg-primary-900\\/60:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.6)}.dark\\:hover\\:bg-primary-900\\/65:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.65)}.dark\\:hover\\:bg-primary-900\\/70:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.7)}.dark\\:hover\\:bg-primary-900\\/75:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.75)}.dark\\:hover\\:bg-primary-900\\/80:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.8)}.dark\\:hover\\:bg-primary-900\\/85:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.85)}.dark\\:hover\\:bg-primary-900\\/90:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.9)}.dark\\:hover\\:bg-primary-900\\/95:hover:is(.dark *){background-color:rgb(var(--color-primary-900)/.95)}.dark\\:hover\\:bg-primary-950:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-950)/var(--tw-bg-opacity))}.dark\\:hover\\:bg-primary-950\\/0:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/0)}.dark\\:hover\\:bg-primary-950\\/10:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.1)}.dark\\:hover\\:bg-primary-950\\/100:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/1)}.dark\\:hover\\:bg-primary-950\\/15:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.15)}.dark\\:hover\\:bg-primary-950\\/20:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.2)}.dark\\:hover\\:bg-primary-950\\/25:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.25)}.dark\\:hover\\:bg-primary-950\\/30:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.3)}.dark\\:hover\\:bg-primary-950\\/35:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.35)}.dark\\:hover\\:bg-primary-950\\/40:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.4)}.dark\\:hover\\:bg-primary-950\\/45:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.45)}.dark\\:hover\\:bg-primary-950\\/5:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.05)}.dark\\:hover\\:bg-primary-950\\/50:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.5)}.dark\\:hover\\:bg-primary-950\\/55:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.55)}.dark\\:hover\\:bg-primary-950\\/60:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.6)}.dark\\:hover\\:bg-primary-950\\/65:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.65)}.dark\\:hover\\:bg-primary-950\\/70:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.7)}.dark\\:hover\\:bg-primary-950\\/75:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.75)}.dark\\:hover\\:bg-primary-950\\/80:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.8)}.dark\\:hover\\:bg-primary-950\\/85:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.85)}.dark\\:hover\\:bg-primary-950\\/90:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.9)}.dark\\:hover\\:bg-primary-950\\/95:hover:is(.dark *){background-color:rgb(var(--color-primary-950)/.95)}.dark\\:hover\\:text-gray-200:hover:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-200)/var(--tw-text-opacity))}.dark\\:hover\\:text-orange-500:hover:is(.dark *){--tw-text-opacity:1;color:rgb(249 115 22/var(--tw-text-opacity))}.dark\\:hover\\:text-primary-500:hover:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-primary-500)/var(--tw-text-opacity))}.dark\\:hover\\:text-primary-500\\/0:hover:is(.dark *){color:rgb(var(--color-primary-500)/0)}.dark\\:hover\\:text-primary-500\\/10:hover:is(.dark *){color:rgb(var(--color-primary-500)/.1)}.dark\\:hover\\:text-primary-500\\/100:hover:is(.dark *){color:rgb(var(--color-primary-500)/1)}.dark\\:hover\\:text-primary-500\\/15:hover:is(.dark *){color:rgb(var(--color-primary-500)/.15)}.dark\\:hover\\:text-primary-500\\/20:hover:is(.dark *){color:rgb(var(--color-primary-500)/.2)}.dark\\:hover\\:text-primary-500\\/25:hover:is(.dark *){color:rgb(var(--color-primary-500)/.25)}.dark\\:hover\\:text-primary-500\\/30:hover:is(.dark *){color:rgb(var(--color-primary-500)/.3)}.dark\\:hover\\:text-primary-500\\/35:hover:is(.dark *){color:rgb(var(--color-primary-500)/.35)}.dark\\:hover\\:text-primary-500\\/40:hover:is(.dark *){color:rgb(var(--color-primary-500)/.4)}.dark\\:hover\\:text-primary-500\\/45:hover:is(.dark *){color:rgb(var(--color-primary-500)/.45)}.dark\\:hover\\:text-primary-500\\/5:hover:is(.dark *){color:rgb(var(--color-primary-500)/.05)}.dark\\:hover\\:text-primary-500\\/50:hover:is(.dark *){color:rgb(var(--color-primary-500)/.5)}.dark\\:hover\\:text-primary-500\\/55:hover:is(.dark *){color:rgb(var(--color-primary-500)/.55)}.dark\\:hover\\:text-primary-500\\/60:hover:is(.dark *){color:rgb(var(--color-primary-500)/.6)}.dark\\:hover\\:text-primary-500\\/65:hover:is(.dark *){color:rgb(var(--color-primary-500)/.65)}.dark\\:hover\\:text-primary-500\\/70:hover:is(.dark *){color:rgb(var(--color-primary-500)/.7)}.dark\\:hover\\:text-primary-500\\/75:hover:is(.dark *){color:rgb(var(--color-primary-500)/.75)}.dark\\:hover\\:text-primary-500\\/80:hover:is(.dark *){color:rgb(var(--color-primary-500)/.8)}.dark\\:hover\\:text-primary-500\\/85:hover:is(.dark *){color:rgb(var(--color-primary-500)/.85)}.dark\\:hover\\:text-primary-500\\/90:hover:is(.dark *){color:rgb(var(--color-primary-500)/.9)}.dark\\:hover\\:text-primary-500\\/95:hover:is(.dark *){color:rgb(var(--color-primary-500)/.95)}.dark\\:hover\\:text-white:hover:is(.dark *){--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.dark\\:hover\\:before\\:bg-gray-800\\/50:hover:is(.dark *):before{background-color:rgb(var(--color-gray-800)/.5);content:var(--tw-content)}.dark\\:focus\\:ring-primary-400:focus:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}.dark\\:focus\\:ring-primary-400\\/0:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0)}.dark\\:focus\\:ring-primary-400\\/10:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.1)}.dark\\:focus\\:ring-primary-400\\/100:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/1)}.dark\\:focus\\:ring-primary-400\\/15:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.15)}.dark\\:focus\\:ring-primary-400\\/20:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.2)}.dark\\:focus\\:ring-primary-400\\/25:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.25)}.dark\\:focus\\:ring-primary-400\\/30:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.3)}.dark\\:focus\\:ring-primary-400\\/35:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.35)}.dark\\:focus\\:ring-primary-400\\/40:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.4)}.dark\\:focus\\:ring-primary-400\\/45:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.45)}.dark\\:focus\\:ring-primary-400\\/5:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.05)}.dark\\:focus\\:ring-primary-400\\/50:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.5)}.dark\\:focus\\:ring-primary-400\\/55:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.55)}.dark\\:focus\\:ring-primary-400\\/60:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.6)}.dark\\:focus\\:ring-primary-400\\/65:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.65)}.dark\\:focus\\:ring-primary-400\\/70:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.7)}.dark\\:focus\\:ring-primary-400\\/75:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.75)}.dark\\:focus\\:ring-primary-400\\/80:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.8)}.dark\\:focus\\:ring-primary-400\\/85:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.85)}.dark\\:focus\\:ring-primary-400\\/90:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.9)}.dark\\:focus\\:ring-primary-400\\/95:focus:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.95)}.dark\\:focus\\:ring-red-400:focus:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(248 113 113/var(--tw-ring-opacity))}.dark\\:focus\\:ring-red-400\\/0:focus:is(.dark *){--tw-ring-color:#f8717100}.dark\\:focus\\:ring-red-400\\/10:focus:is(.dark *){--tw-ring-color:#f871711a}.dark\\:focus\\:ring-red-400\\/100:focus:is(.dark *){--tw-ring-color:#f87171}.dark\\:focus\\:ring-red-400\\/15:focus:is(.dark *){--tw-ring-color:#f8717126}.dark\\:focus\\:ring-red-400\\/20:focus:is(.dark *){--tw-ring-color:#f8717133}.dark\\:focus\\:ring-red-400\\/25:focus:is(.dark *){--tw-ring-color:#f8717140}.dark\\:focus\\:ring-red-400\\/30:focus:is(.dark *){--tw-ring-color:#f871714d}.dark\\:focus\\:ring-red-400\\/35:focus:is(.dark *){--tw-ring-color:#f8717159}.dark\\:focus\\:ring-red-400\\/40:focus:is(.dark *){--tw-ring-color:#f8717166}.dark\\:focus\\:ring-red-400\\/45:focus:is(.dark *){--tw-ring-color:#f8717173}.dark\\:focus\\:ring-red-400\\/5:focus:is(.dark *){--tw-ring-color:#f871710d}.dark\\:focus\\:ring-red-400\\/50:focus:is(.dark *){--tw-ring-color:#f8717180}.dark\\:focus\\:ring-red-400\\/55:focus:is(.dark *){--tw-ring-color:#f871718c}.dark\\:focus\\:ring-red-400\\/60:focus:is(.dark *){--tw-ring-color:#f8717199}.dark\\:focus\\:ring-red-400\\/65:focus:is(.dark *){--tw-ring-color:#f87171a6}.dark\\:focus\\:ring-red-400\\/70:focus:is(.dark *){--tw-ring-color:#f87171b3}.dark\\:focus\\:ring-red-400\\/75:focus:is(.dark *){--tw-ring-color:#f87171bf}.dark\\:focus\\:ring-red-400\\/80:focus:is(.dark *){--tw-ring-color:#f87171cc}.dark\\:focus\\:ring-red-400\\/85:focus:is(.dark *){--tw-ring-color:#f87171d9}.dark\\:focus\\:ring-red-400\\/90:focus:is(.dark *){--tw-ring-color:#f87171e6}.dark\\:focus\\:ring-red-400\\/95:focus:is(.dark *){--tw-ring-color:#f87171f2}.dark\\:focus-visible\\:outline-none:focus-visible:is(.dark *){outline:2px solid #0000;outline-offset:2px}.dark\\:focus-visible\\:outline-orange-400:focus-visible:is(.dark *){outline-color:#fb923c}.dark\\:focus-visible\\:outline-primary-400:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/1)}.dark\\:focus-visible\\:outline-primary-400\\/0:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/0)}.dark\\:focus-visible\\:outline-primary-400\\/10:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.1)}.dark\\:focus-visible\\:outline-primary-400\\/100:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/1)}.dark\\:focus-visible\\:outline-primary-400\\/15:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.15)}.dark\\:focus-visible\\:outline-primary-400\\/20:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.2)}.dark\\:focus-visible\\:outline-primary-400\\/25:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.25)}.dark\\:focus-visible\\:outline-primary-400\\/30:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.3)}.dark\\:focus-visible\\:outline-primary-400\\/35:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.35)}.dark\\:focus-visible\\:outline-primary-400\\/40:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.4)}.dark\\:focus-visible\\:outline-primary-400\\/45:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.45)}.dark\\:focus-visible\\:outline-primary-400\\/5:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.05)}.dark\\:focus-visible\\:outline-primary-400\\/50:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.5)}.dark\\:focus-visible\\:outline-primary-400\\/55:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.55)}.dark\\:focus-visible\\:outline-primary-400\\/60:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.6)}.dark\\:focus-visible\\:outline-primary-400\\/65:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.65)}.dark\\:focus-visible\\:outline-primary-400\\/70:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.7)}.dark\\:focus-visible\\:outline-primary-400\\/75:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.75)}.dark\\:focus-visible\\:outline-primary-400\\/80:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.8)}.dark\\:focus-visible\\:outline-primary-400\\/85:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.85)}.dark\\:focus-visible\\:outline-primary-400\\/90:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.9)}.dark\\:focus-visible\\:outline-primary-400\\/95:focus-visible:is(.dark *){outline-color:rgb(var(--color-primary-400)/.95)}.dark\\:focus-visible\\:ring-orange-400:focus-visible:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(251 146 60/var(--tw-ring-opacity))}.dark\\:focus-visible\\:ring-primary-400:focus-visible:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}.dark\\:focus-visible\\:ring-primary-400\\/0:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0)}.dark\\:focus-visible\\:ring-primary-400\\/10:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.1)}.dark\\:focus-visible\\:ring-primary-400\\/100:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/1)}.dark\\:focus-visible\\:ring-primary-400\\/15:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.15)}.dark\\:focus-visible\\:ring-primary-400\\/20:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.2)}.dark\\:focus-visible\\:ring-primary-400\\/25:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.25)}.dark\\:focus-visible\\:ring-primary-400\\/30:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.3)}.dark\\:focus-visible\\:ring-primary-400\\/35:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.35)}.dark\\:focus-visible\\:ring-primary-400\\/40:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.4)}.dark\\:focus-visible\\:ring-primary-400\\/45:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.45)}.dark\\:focus-visible\\:ring-primary-400\\/5:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.05)}.dark\\:focus-visible\\:ring-primary-400\\/50:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.5)}.dark\\:focus-visible\\:ring-primary-400\\/55:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.55)}.dark\\:focus-visible\\:ring-primary-400\\/60:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.6)}.dark\\:focus-visible\\:ring-primary-400\\/65:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.65)}.dark\\:focus-visible\\:ring-primary-400\\/70:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.7)}.dark\\:focus-visible\\:ring-primary-400\\/75:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.75)}.dark\\:focus-visible\\:ring-primary-400\\/80:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.8)}.dark\\:focus-visible\\:ring-primary-400\\/85:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.85)}.dark\\:focus-visible\\:ring-primary-400\\/90:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.9)}.dark\\:focus-visible\\:ring-primary-400\\/95:focus-visible:is(.dark *){--tw-ring-color:rgb(var(--color-primary-400)/0.95)}.dark\\:focus-visible\\:ring-red-400:focus-visible:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(248 113 113/var(--tw-ring-opacity))}.dark\\:focus-visible\\:ring-red-400\\/0:focus-visible:is(.dark *){--tw-ring-color:#f8717100}.dark\\:focus-visible\\:ring-red-400\\/10:focus-visible:is(.dark *){--tw-ring-color:#f871711a}.dark\\:focus-visible\\:ring-red-400\\/100:focus-visible:is(.dark *){--tw-ring-color:#f87171}.dark\\:focus-visible\\:ring-red-400\\/15:focus-visible:is(.dark *){--tw-ring-color:#f8717126}.dark\\:focus-visible\\:ring-red-400\\/20:focus-visible:is(.dark *){--tw-ring-color:#f8717133}.dark\\:focus-visible\\:ring-red-400\\/25:focus-visible:is(.dark *){--tw-ring-color:#f8717140}.dark\\:focus-visible\\:ring-red-400\\/30:focus-visible:is(.dark *){--tw-ring-color:#f871714d}.dark\\:focus-visible\\:ring-red-400\\/35:focus-visible:is(.dark *){--tw-ring-color:#f8717159}.dark\\:focus-visible\\:ring-red-400\\/40:focus-visible:is(.dark *){--tw-ring-color:#f8717166}.dark\\:focus-visible\\:ring-red-400\\/45:focus-visible:is(.dark *){--tw-ring-color:#f8717173}.dark\\:focus-visible\\:ring-red-400\\/5:focus-visible:is(.dark *){--tw-ring-color:#f871710d}.dark\\:focus-visible\\:ring-red-400\\/50:focus-visible:is(.dark *){--tw-ring-color:#f8717180}.dark\\:focus-visible\\:ring-red-400\\/55:focus-visible:is(.dark *){--tw-ring-color:#f871718c}.dark\\:focus-visible\\:ring-red-400\\/60:focus-visible:is(.dark *){--tw-ring-color:#f8717199}.dark\\:focus-visible\\:ring-red-400\\/65:focus-visible:is(.dark *){--tw-ring-color:#f87171a6}.dark\\:focus-visible\\:ring-red-400\\/70:focus-visible:is(.dark *){--tw-ring-color:#f87171b3}.dark\\:focus-visible\\:ring-red-400\\/75:focus-visible:is(.dark *){--tw-ring-color:#f87171bf}.dark\\:focus-visible\\:ring-red-400\\/80:focus-visible:is(.dark *){--tw-ring-color:#f87171cc}.dark\\:focus-visible\\:ring-red-400\\/85:focus-visible:is(.dark *){--tw-ring-color:#f87171d9}.dark\\:focus-visible\\:ring-red-400\\/90:focus-visible:is(.dark *){--tw-ring-color:#f87171e6}.dark\\:focus-visible\\:ring-red-400\\/95:focus-visible:is(.dark *){--tw-ring-color:#f87171f2}.dark\\:focus-visible\\:ring-offset-gray-900:focus-visible:is(.dark *){--tw-ring-offset-color:rgb(var(--color-gray-900)/1)}.dark\\:focus-visible\\:before\\:ring-primary-400:focus-visible:is(.dark *):before{content:var(--tw-content);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}.dark\\:disabled\\:bg-gray-800:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-800)/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-gray-900:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-orange-400:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(251 146 60/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-orange-950:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(67 20 7/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-primary-400:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-400)/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-primary-400\\/0:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/0)}.dark\\:disabled\\:bg-primary-400\\/10:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.1)}.dark\\:disabled\\:bg-primary-400\\/100:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/1)}.dark\\:disabled\\:bg-primary-400\\/15:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.15)}.dark\\:disabled\\:bg-primary-400\\/20:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.2)}.dark\\:disabled\\:bg-primary-400\\/25:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.25)}.dark\\:disabled\\:bg-primary-400\\/30:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.3)}.dark\\:disabled\\:bg-primary-400\\/35:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.35)}.dark\\:disabled\\:bg-primary-400\\/40:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.4)}.dark\\:disabled\\:bg-primary-400\\/45:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.45)}.dark\\:disabled\\:bg-primary-400\\/5:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.05)}.dark\\:disabled\\:bg-primary-400\\/50:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.5)}.dark\\:disabled\\:bg-primary-400\\/55:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.55)}.dark\\:disabled\\:bg-primary-400\\/60:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.6)}.dark\\:disabled\\:bg-primary-400\\/65:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.65)}.dark\\:disabled\\:bg-primary-400\\/70:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.7)}.dark\\:disabled\\:bg-primary-400\\/75:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.75)}.dark\\:disabled\\:bg-primary-400\\/80:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.8)}.dark\\:disabled\\:bg-primary-400\\/85:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.85)}.dark\\:disabled\\:bg-primary-400\\/90:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.9)}.dark\\:disabled\\:bg-primary-400\\/95:disabled:is(.dark *){background-color:rgb(var(--color-primary-400)/.95)}.dark\\:disabled\\:bg-primary-950:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-primary-950)/var(--tw-bg-opacity))}.dark\\:disabled\\:bg-primary-950\\/0:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/0)}.dark\\:disabled\\:bg-primary-950\\/10:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.1)}.dark\\:disabled\\:bg-primary-950\\/100:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/1)}.dark\\:disabled\\:bg-primary-950\\/15:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.15)}.dark\\:disabled\\:bg-primary-950\\/20:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.2)}.dark\\:disabled\\:bg-primary-950\\/25:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.25)}.dark\\:disabled\\:bg-primary-950\\/30:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.3)}.dark\\:disabled\\:bg-primary-950\\/35:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.35)}.dark\\:disabled\\:bg-primary-950\\/40:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.4)}.dark\\:disabled\\:bg-primary-950\\/45:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.45)}.dark\\:disabled\\:bg-primary-950\\/5:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.05)}.dark\\:disabled\\:bg-primary-950\\/50:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.5)}.dark\\:disabled\\:bg-primary-950\\/55:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.55)}.dark\\:disabled\\:bg-primary-950\\/60:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.6)}.dark\\:disabled\\:bg-primary-950\\/65:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.65)}.dark\\:disabled\\:bg-primary-950\\/70:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.7)}.dark\\:disabled\\:bg-primary-950\\/75:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.75)}.dark\\:disabled\\:bg-primary-950\\/80:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.8)}.dark\\:disabled\\:bg-primary-950\\/85:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.85)}.dark\\:disabled\\:bg-primary-950\\/90:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.9)}.dark\\:disabled\\:bg-primary-950\\/95:disabled:is(.dark *){background-color:rgb(var(--color-primary-950)/.95)}.dark\\:disabled\\:bg-transparent:disabled:is(.dark *){background-color:initial}.dark\\:disabled\\:bg-white:disabled:is(.dark *){--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.dark\\:disabled\\:text-orange-400:disabled:is(.dark *){--tw-text-opacity:1;color:rgb(251 146 60/var(--tw-text-opacity))}.dark\\:disabled\\:text-primary-400:disabled:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-primary-400)/var(--tw-text-opacity))}.dark\\:disabled\\:text-primary-400\\/0:disabled:is(.dark *){color:rgb(var(--color-primary-400)/0)}.dark\\:disabled\\:text-primary-400\\/10:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.1)}.dark\\:disabled\\:text-primary-400\\/100:disabled:is(.dark *){color:rgb(var(--color-primary-400)/1)}.dark\\:disabled\\:text-primary-400\\/15:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.15)}.dark\\:disabled\\:text-primary-400\\/20:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.2)}.dark\\:disabled\\:text-primary-400\\/25:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.25)}.dark\\:disabled\\:text-primary-400\\/30:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.3)}.dark\\:disabled\\:text-primary-400\\/35:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.35)}.dark\\:disabled\\:text-primary-400\\/40:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.4)}.dark\\:disabled\\:text-primary-400\\/45:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.45)}.dark\\:disabled\\:text-primary-400\\/5:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.05)}.dark\\:disabled\\:text-primary-400\\/50:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.5)}.dark\\:disabled\\:text-primary-400\\/55:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.55)}.dark\\:disabled\\:text-primary-400\\/60:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.6)}.dark\\:disabled\\:text-primary-400\\/65:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.65)}.dark\\:disabled\\:text-primary-400\\/70:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.7)}.dark\\:disabled\\:text-primary-400\\/75:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.75)}.dark\\:disabled\\:text-primary-400\\/80:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.8)}.dark\\:disabled\\:text-primary-400\\/85:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.85)}.dark\\:disabled\\:text-primary-400\\/90:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.9)}.dark\\:disabled\\:text-primary-400\\/95:disabled:is(.dark *){color:rgb(var(--color-primary-400)/.95)}.group:hover .dark\\:group-hover\\:text-gray-200:is(.dark *){--tw-text-opacity:1;color:rgb(var(--color-gray-200)/var(--tw-text-opacity))}:where([data-headlessui-focus-visible]) .dark\\:ui-focus-visible\\:ring-primary-400:focus:is(.dark *){--tw-ring-opacity:1;--tw-ring-color:rgb(var(--color-primary-400)/var(--tw-ring-opacity))}@media (min-width:640px){.sm\\:my-8{margin-bottom:2rem;margin-top:2rem}.sm\\:ml-64{margin-left:16rem}.sm\\:w-96{width:24rem}.sm\\:max-w-lg{max-width:32rem}.sm\\:translate-x-0{--tw-translate-x:0px}.sm\\:translate-x-0,.sm\\:translate-x-2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:translate-x-2{--tw-translate-x:0.5rem}.sm\\:translate-y-0{--tw-translate-y:0px}.sm\\:scale-100,.sm\\:translate-y-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:scale-100{--tw-scale-x:1;--tw-scale-y:1}.sm\\:scale-95{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:items-center{align-items:center}.sm\\:p-0{padding:0}.sm\\:p-6{padding:1.5rem}.sm\\:px-14{padding-left:3.5rem;padding-right:3.5rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\:inline-flex{display:inline-flex}}@media (min-width:1024px){.lg\\:w-1\\/2{width:50%}.lg\\:px-8{padding-left:2rem;padding-right:2rem}}.rtl\\:-translate-x-0:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-2:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-0.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-2\\.5:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-0.625rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-3:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-0.75rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-4:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-1rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-5:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-1.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-6:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-7:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-1.75rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:-translate-x-full:where([dir=rtl],[dir=rtl] *){--tw-translate-x:-100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:translate-x-full:where([dir=rtl],[dir=rtl] *){--tw-translate-x:100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:text-right:where([dir=rtl],[dir=rtl] *){text-align:right}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-0\\.5::-moz-meter-bar{height:.125rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-1::-moz-meter-bar{height:.25rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-2::-moz-meter-bar{height:.5rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-3::-moz-meter-bar{height:.75rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-4::-moz-meter-bar{height:1rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-5::-moz-meter-bar{height:1.25rem}.\\[\\&\\:\\:-moz-meter-bar\\]\\:h-px::-moz-meter-bar{height:1px}.\\[\\&\\:\\:-moz-meter-bar\\]\\:rounded-full::-moz-meter-bar{border-radius:9999px}.\\[\\&\\:\\:-moz-meter-bar\\]\\:border-none::-moz-meter-bar{border-style:none}.\\[\\&\\:\\:-moz-meter-bar\\]\\:bg-current::-moz-meter-bar{background-color:currentColor}.\\[\\&\\:\\:-moz-meter-bar\\]\\:bg-none::-moz-meter-bar{background-image:none}.\\[\\&\\:\\:-moz-meter-bar\\]\\:transition-all::-moz-meter-bar{transition-duration:.15s;-moz-transition-property:all;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.\\[\\&\\:\\:-moz-progress-bar\\]\\:rounded-full::-moz-progress-bar{border-radius:9999px}.\\[\\&\\:\\:-moz-progress-bar\\]\\:bg-current::-moz-progress-bar{background-color:currentColor}.\\[\\&\\:\\:-moz-range-thumb\\]\\:relative::-moz-range-thumb{position:relative}.\\[\\&\\:\\:-moz-range-thumb\\]\\:z-\\[1\\]::-moz-range-thumb{z-index:1}.\\[\\&\\:\\:-moz-range-thumb\\]\\:-mt-1::-moz-range-thumb{margin-top:-.25rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:mt-\\[-2\\.5px\\]::-moz-range-thumb{margin-top:-2.5px}.\\[\\&\\:\\:-moz-range-thumb\\]\\:mt-\\[-3px\\]::-moz-range-thumb{margin-top:-3px}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-1\\.5::-moz-range-thumb{height:.375rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-2::-moz-range-thumb{height:.5rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-3::-moz-range-thumb{height:.75rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-4::-moz-range-thumb{height:1rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-5::-moz-range-thumb{height:1.25rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-6::-moz-range-thumb{height:1.5rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:h-7::-moz-range-thumb{height:1.75rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-1\\.5::-moz-range-thumb{width:.375rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-2::-moz-range-thumb{width:.5rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-3::-moz-range-thumb{width:.75rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-4::-moz-range-thumb{width:1rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-5::-moz-range-thumb{width:1.25rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-6::-moz-range-thumb{width:1.5rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:w-7::-moz-range-thumb{width:1.75rem}.\\[\\&\\:\\:-moz-range-thumb\\]\\:appearance-none::-moz-range-thumb{appearance:none}.\\[\\&\\:\\:-moz-range-thumb\\]\\:rounded-full::-moz-range-thumb{border-radius:9999px}.\\[\\&\\:\\:-moz-range-thumb\\]\\:border-0::-moz-range-thumb{border-width:0}.\\[\\&\\:\\:-moz-range-thumb\\]\\:bg-current::-moz-range-thumb{background-color:currentColor}.\\[\\&\\:\\:-moz-range-track\\]\\:h-0\\.5::-moz-range-track{height:.125rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-1::-moz-range-track{height:.25rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-2::-moz-range-track{height:.5rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-3::-moz-range-track{height:.75rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-4::-moz-range-track{height:1rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-5::-moz-range-track{height:1.25rem}.\\[\\&\\:\\:-moz-range-track\\]\\:h-px::-moz-range-track{height:1px}.\\[\\&\\:\\:-moz-range-track\\]\\:rounded-lg::-moz-range-track{border-radius:.5rem}.\\[\\&\\:\\:-moz-range-track\\]\\:bg-gray-200::-moz-range-track{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.group:disabled .\\[\\&\\:\\:-moz-range-track\\]\\:group-disabled\\:bg-opacity-50::-moz-range-track{--tw-bg-opacity:0.5}.\\[\\&\\:\\:-moz-range-track\\]\\:dark\\:bg-gray-700:is(.dark *)::-moz-range-track{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}.\\[\\&\\:\\:-webkit-meter-bar\\]\\:border-none::-webkit-meter-bar{border-style:none}.\\[\\&\\:\\:-webkit-meter-bar\\]\\:bg-transparent::-webkit-meter-bar{background-color:initial}.\\[\\&\\:\\:-webkit-meter-bar\\]\\:bg-none::-webkit-meter-bar{background-image:none}.\\[\\&\\:\\:-webkit-meter-inner-element\\]\\:relative::-webkit-meter-inner-element{position:relative}.\\[\\&\\:\\:-webkit-meter-inner-element\\]\\:block::-webkit-meter-inner-element{display:block}.\\[\\&\\:\\:-webkit-meter-inner-element\\]\\:border-none::-webkit-meter-inner-element{border-style:none}.\\[\\&\\:\\:-webkit-meter-inner-element\\]\\:bg-transparent::-webkit-meter-inner-element{background-color:initial}.\\[\\&\\:\\:-webkit-meter-inner-element\\]\\:bg-none::-webkit-meter-inner-element{background-image:none}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-0\\.5::-webkit-meter-optimum-value{height:.125rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-1::-webkit-meter-optimum-value{height:.25rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-2::-webkit-meter-optimum-value{height:.5rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-3::-webkit-meter-optimum-value{height:.75rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-4::-webkit-meter-optimum-value{height:1rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-5::-webkit-meter-optimum-value{height:1.25rem}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:h-px::-webkit-meter-optimum-value{height:1px}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:rounded-full::-webkit-meter-optimum-value{border-radius:9999px}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:border-none::-webkit-meter-optimum-value{border-style:none}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:bg-current::-webkit-meter-optimum-value{background-color:currentColor}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:bg-none::-webkit-meter-optimum-value{background-image:none}.\\[\\&\\:\\:-webkit-meter-optimum-value\\]\\:transition-all::-webkit-meter-optimum-value{transition-duration:.15s;-webkit-transition-property:all;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.\\[\\&\\:\\:-webkit-progress-bar\\]\\:w-full::-webkit-progress-bar{width:100%}.\\[\\&\\:\\:-webkit-progress-bar\\]\\:rounded-full::-webkit-progress-bar{border-radius:9999px}.\\[\\&\\:\\:-webkit-progress-bar\\]\\:bg-gray-200::-webkit-progress-bar{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.\\[\\&\\:\\:-webkit-progress-bar\\]\\:dark\\:bg-gray-700:is(.dark *)::-webkit-progress-bar{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}.\\[\\&\\:\\:-webkit-progress-value\\]\\:rounded-full::-webkit-progress-value{border-radius:9999px}.\\[\\&\\:\\:-webkit-progress-value\\]\\:bg-current::-webkit-progress-value{background-color:currentColor}.\\[\\&\\:\\:-webkit-progress-value\\]\\:transition-all::-webkit-progress-value{transition-duration:.15s;-webkit-transition-property:all;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.\\[\\&\\:\\:-webkit-progress-value\\]\\:ease-in-out::-webkit-progress-value{transition-timing-function:cubic-bezier(.4,0,.2,1)}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-0\\.5::-webkit-slider-runnable-track{height:.125rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-1::-webkit-slider-runnable-track{height:.25rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-2::-webkit-slider-runnable-track{height:.5rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-3::-webkit-slider-runnable-track{height:.75rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-4::-webkit-slider-runnable-track{height:1rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-5::-webkit-slider-runnable-track{height:1.25rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:h-px::-webkit-slider-runnable-track{height:1px}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:rounded-lg::-webkit-slider-runnable-track{border-radius:.5rem}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:bg-gray-200::-webkit-slider-runnable-track{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.group:disabled .\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:group-disabled\\:bg-opacity-50::-webkit-slider-runnable-track{--tw-bg-opacity:0.5}.\\[\\&\\:\\:-webkit-slider-runnable-track\\]\\:dark\\:bg-gray-700:is(.dark *)::-webkit-slider-runnable-track{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:relative::-webkit-slider-thumb{position:relative}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:z-\\[1\\]::-webkit-slider-thumb{z-index:1}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:-mt-1::-webkit-slider-thumb{margin-top:-.25rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:mt-\\[-2\\.5px\\]::-webkit-slider-thumb{margin-top:-2.5px}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:mt-\\[-3px\\]::-webkit-slider-thumb{margin-top:-3px}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-1\\.5::-webkit-slider-thumb{height:.375rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-2::-webkit-slider-thumb{height:.5rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-3::-webkit-slider-thumb{height:.75rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-4::-webkit-slider-thumb{height:1rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-5::-webkit-slider-thumb{height:1.25rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-6::-webkit-slider-thumb{height:1.5rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:h-7::-webkit-slider-thumb{height:1.75rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-1\\.5::-webkit-slider-thumb{width:.375rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-2::-webkit-slider-thumb{width:.5rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-3::-webkit-slider-thumb{width:.75rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-4::-webkit-slider-thumb{width:1rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-5::-webkit-slider-thumb{width:1.25rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-6::-webkit-slider-thumb{width:1.5rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:w-7::-webkit-slider-thumb{width:1.75rem}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:appearance-none::-webkit-slider-thumb{appearance:none}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:rounded-full::-webkit-slider-thumb{border-radius:9999px}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:bg-white::-webkit-slider-thumb{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:ring-2::-webkit-slider-thumb{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:ring-current::-webkit-slider-thumb{--tw-ring-color:currentColor}.\\[\\&\\:\\:-webkit-slider-thumb\\]\\:dark\\:bg-gray-900:is(.dark *)::-webkit-slider-thumb{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-900)/var(--tw-bg-opacity))}.\\[\\&\\:indeterminate\\:\\:-moz-progress-bar\\]\\:rounded-full:indeterminate::-moz-progress-bar{border-radius:9999px}.\\[\\&\\:indeterminate\\:\\:-webkit-progress-value\\]\\:rounded-full:indeterminate::-webkit-progress-value{border-radius:9999px}.rtl\\:\\[\\&_span\\:first-child\\]\\:rotate-180 span:first-child:where([dir=rtl],[dir=rtl] *){--tw-rotate:180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:\\[\\&_span\\:last-child\\]\\:rotate-180 span:last-child:where([dir=rtl],[dir=rtl] *){--tw-rotate:180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media(pointer:coarse){.\\[\\@media\\(pointer\\:coarse\\)\\]\\:hidden{display:none}}@supports(selector(&::-moz-progress-bar)){.\\[\\@supports\\(selector\\(\\&\\:\\:-moz-progress-bar\\)\\)\\]\\:bg-gray-200{--tw-bg-opacity:1;background-color:rgb(var(--color-gray-200)/var(--tw-bg-opacity))}.\\[\\@supports\\(selector\\(\\&\\:\\:-moz-progress-bar\\)\\)\\]\\:dark\\:bg-gray-700:is(.dark *){--tw-bg-opacity:1;background-color:rgb(var(--color-gray-700)/var(--tw-bg-opacity))}}`;

const main = ":root{--sc--sm:40em;--sc--md:60em;--clr--text:#171717;--clr--bg:#e3f3fc;--clr--primary:#fc851d;--clr--secondary:#9ec1cc;--clr--accent:#1f1f20;--clr--text-dark:#e3f3fc;--clr--bg-dark:#181818;--clr--secondary-dark:#17262b;--radius-sm:0.5em;--step--2:clamp(0.78rem,calc(0.77rem + 0.03vw),0.80rem);--step--1:clamp(0.94rem,calc(0.92rem + 0.11vw),1.00rem);--step-0:clamp(1.13rem,calc(1.08rem + 0.22vw),1.25rem);--step-1:clamp(1.35rem,calc(1.28rem + 0.37vw),1.56rem);--step-2:clamp(1.62rem,calc(1.5rem + 0.58vw),1.95rem);--step-3:clamp(1.94rem,calc(1.77rem + 0.87vw),2.44rem);--step-4:clamp(2.33rem,calc(2.08rem + 1.25vw),3.05rem);--step-5:clamp(2.80rem,calc(2.45rem + 1.77vw),3.82rem)}@media (prefers-color-scheme:light){:root{--color--bg:var(--clr--bg);--color--heading:var(--clr--text);--color--text:var(--clr--text);--clr--gradient:linear-gradient(46deg,var(--clr--primary),var(--clr--secondary));--color--secondary:var(--clr--secondary);--color-card-bg:var(--clr--secondary)}}@media (prefers-color-scheme:dark){:root{--color--bg:var(--clr--bg-dark);--color--heading:var(--clr--text-dark);--color--text:var(--clr--text-dark);--color--secondary:var(--clr--secondary-dark);--color-card-bg:var(--clr--accent)}}.light{--color--bg:var(--clr--bg);--color--heading:var(--clr--text);--color--text:var(--clr--text);--clr--gradient:linear-gradient(46deg,var(--clr--primary),var(--clr--secondary));--color--secondary:var(--clr--secondary);--color-card-bg:var(--clr--secondary)}*,:after,:before{box-sizing:border-box;font-weight:400;margin:0}html{height:100%}body{background:var(--color--bg);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:var(--step--1);min-height:100%;text-rendering:optimizeLegibility;transition:color .5s,background-color .5s}button,input,option,select,textarea{background-color:var(--clr--accent);border:none;color:var(--clr--text-dark);font-family:inherit;font-size:inherit;line-height:1;margin:0;padding:.5rem 1rem;width:-moz-max-content;width:max-content}input\n#app{display:grid;grid-template-rows:1fr 500px 1fr;grid-template-rows:auto 1fr auto;min-height:100%}a,a:visited{color:inherit;text-decoration:none}ul{list-style:none;margin:0;padding:0}.h1,h1{font-size:var(--step-3);font-weight:700;line-height:1.1;margin:0}h2{font-size:var(--step-2)}h3{font-size:var(--step-1);font-weight:700}";

const ui = ".dark{color-scheme:dark}a:focus-visible{outline-color:rgb(var(--color-primary-DEFAULT)/1)}::-moz-selection{background-color:rgb(var(--color-primary-DEFAULT)/.4)}::selection{background-color:rgb(var(--color-primary-DEFAULT)/.4)}";

const entryStyles_D5Cgdys = [tailwind, main, ui];

const entryStyles_D5Cgdys$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: entryStyles_D5Cgdys
});

const about_vue_vue_type_style_index_0_scoped_211c025c_lang = "p[data-v-211c025c]{margin-bottom:2em;max-width:65ch}h1[data-v-211c025c],h2[data-v-211c025c],h3[data-v-211c025c],h4[data-v-211c025c],h5[data-v-211c025c],h6[data-v-211c025c]{line-height:1.2;margin-bottom:.75em;max-width:25ch}h2[data-v-211c025c]{font-weight:700}.kune[data-v-211c025c],h2[data-v-211c025c]{color:var(--clr--primary)}.kune[data-v-211c025c]{font-weight:900}";

const aboutStyles_sRSKrDPY = [about_vue_vue_type_style_index_0_scoped_211c025c_lang];

const aboutStyles_sRSKrDPY$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: aboutStyles_sRSKrDPY
});

const contact_vue_vue_type_style_index_0_scoped_8c3eb738_lang = "main[data-v-8c3eb738]{padding:20px}h1[data-v-8c3eb738],p[data-v-8c3eb738]{margin-bottom:20px}p[data-v-8c3eb738]{line-height:1.5}form[data-v-8c3eb738]{display:flex;flex-direction:column;width:500px}label[data-v-8c3eb738]{display:block;margin-bottom:5px;margin-top:1em}input[data-v-8c3eb738],textarea[data-v-8c3eb738]{border:1px solid #ccc;border-radius:var(--radius-sm);padding:10px;width:100%}textarea[data-v-8c3eb738]{height:100px}input[type=submit][data-v-8c3eb738]{background-color:var(--clr--primary);border:none;border-radius:var(--radius-sm);color:var(--clr--text);cursor:pointer;margin-top:1em;padding:10px 20px}";

const contactStyles_CERuCTQB = [contact_vue_vue_type_style_index_0_scoped_8c3eb738_lang];

const contactStyles_CERuCTQB$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: contactStyles_CERuCTQB
});

const index_vue_vue_type_style_index_0_scoped_98cda535_lang = "header[data-v-98cda535]{align-items:center;display:flex;flex-direction:column;gap:2em;margin-bottom:2em;max-width:-moz-max-content;max-width:max-content;padding:1em}.mondrian[data-v-98cda535]{max-width:100%}header p[data-v-98cda535]{margin-bottom:2em}header h2[data-v-98cda535]{font-weight:700;margin-bottom:.5em}img.illustration[data-v-98cda535]{max-width:350px}.home-text[data-v-98cda535]{max-width:50ch}.main__title[data-v-98cda535]{background:linear-gradient(315deg,var(--clr--primary) 25%,var(--clr--accent));background-clip:border-box;background-clip:text;-webkit-background-clip:text;font-weight:900}.kune[data-v-98cda535]{color:var(--clr--primary);font-weight:900}@media (min-width:550px){header[data-v-98cda535]{align-items:center;display:flex;flex-direction:row-reverse;justify-content:space-between}}footer[data-v-98cda535],main[data-v-98cda535]{margin-bottom:2em;padding:1em}div[data-v-98cda535],section[data-v-98cda535]{margin-bottom:1rem}.motivation-card[data-v-98cda535]{background-color:var(--color-card-bg);border-radius:.5em;padding:2em}@media (min-width:550px){main[data-v-98cda535]{display:flex;gap:1em;justify-content:space-between}main.motivation-section[data-v-98cda535]>*{max-width:35ch}}";

const indexStyles_C3HJoUJN = [index_vue_vue_type_style_index_0_scoped_98cda535_lang];

const indexStyles_C3HJoUJN$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: indexStyles_C3HJoUJN
});

const services_vue_vue_type_style_index_0_scoped_49d67de3_lang = ".card[data-v-49d67de3]{background-color:var(--color--bg)}";

const servicesStyles_c0OhiFL = [services_vue_vue_type_style_index_0_scoped_49d67de3_lang];

const servicesStyles_c0OhiFL$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: servicesStyles_c0OhiFL
});

const index_vue_vue_type_style_index_0_scoped_d36c7513_lang = ".wrapper[data-v-d36c7513]{background-color:var(--color-card-bg);border-radius:.5em;display:flex;flex-direction:column;gap:1em;margin-bottom:2em;padding:2em}.wrapper a[data-v-d36c7513]{max-width:-moz-fit-content;max-width:fit-content}.bgDark[data-v-d36c7513],.card[data-v-d36c7513]{background-color:var(--color--bg)}";

const indexStyles_BOCo6Yn9 = [index_vue_vue_type_style_index_0_scoped_d36c7513_lang];

const indexStyles_BOCo6Yn9$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: indexStyles_BOCo6Yn9
});

const _service__vue_vue_type_style_index_0_scoped_24ec654a_lang = ".Ucontainer[data-v-24ec654a]{margin:0 auto;max-width:1200px}";

const _service_Styles_C5IUS3Xz = [_service__vue_vue_type_style_index_0_scoped_24ec654a_lang];

const _service_Styles_C5IUS3Xz$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _service_Styles_C5IUS3Xz
});

const index_vue_vue_type_style_index_0_scoped_6fcc88d3_lang = "header.container[data-v-6fcc88d3]{border-bottom:2px solid var(--clr--accent)}.container[data-v-6fcc88d3]{padding:1em}";

const indexStyles_CkxAMZy = [index_vue_vue_type_style_index_0_scoped_6fcc88d3_lang];

const indexStyles_CkxAMZy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: indexStyles_CkxAMZy
});

const Icon_vue_vue_type_style_index_0_scoped_e8d572f6_lang = ".icon[data-v-e8d572f6]{display:inline-block;vertical-align:middle}";

const IconStyles_D_CRgw4L = [Icon_vue_vue_type_style_index_0_scoped_e8d572f6_lang];

const IconStyles_D_CRgw4L$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: IconStyles_D_CRgw4L
});

const IconCSS_vue_vue_type_style_index_0_scoped_41e8d397_lang = "span[data-v-41e8d397]{background-color:currentColor;display:inline-block;-webkit-mask-image:var(--efdb04fa);mask-image:var(--efdb04fa);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;vertical-align:middle}";

const IconCSSStyles_D5ci0eBM = [IconCSS_vue_vue_type_style_index_0_scoped_41e8d397_lang];

const IconCSSStyles_D5ci0eBM$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: IconCSSStyles_D5ci0eBM
});

const error404_vue_vue_type_style_index_0_scoped_73a07988_lang = '.spotlight[data-v-73a07988]{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-30vh;filter:blur(20vh);height:40vh}.gradient-border[data-v-73a07988]{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:.5rem;position:relative}@media (prefers-color-scheme:light){.gradient-border[data-v-73a07988]{background-color:hsla(0,0%,100%,.3)}.gradient-border[data-v-73a07988]:before{background:linear-gradient(90deg,#e2e2e2,#e2e2e2 25%,#00dc82 50%,#36e4da 75%,#0047e1)}}@media (prefers-color-scheme:dark){.gradient-border[data-v-73a07988]{background-color:hsla(0,0%,8%,.3)}.gradient-border[data-v-73a07988]:before{background:linear-gradient(90deg,#303030,#303030 25%,#00dc82 50%,#36e4da 75%,#0047e1)}}.gradient-border[data-v-73a07988]:before{background-size:400% auto;border-radius:.5rem;bottom:0;content:"";left:0;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.5;padding:2px;position:absolute;right:0;top:0;transition:background-position .3s ease-in-out,opacity .2s ease-in-out;width:100%}.gradient-border[data-v-73a07988]:hover:before{background-position:-50% 0;opacity:1}.fixed[data-v-73a07988]{position:fixed}.left-0[data-v-73a07988]{left:0}.right-0[data-v-73a07988]{right:0}.z-10[data-v-73a07988]{z-index:10}.z-20[data-v-73a07988]{z-index:20}.grid[data-v-73a07988]{display:grid}.mb-16[data-v-73a07988]{margin-bottom:4rem}.mb-8[data-v-73a07988]{margin-bottom:2rem}.max-w-520px[data-v-73a07988]{max-width:520px}.min-h-screen[data-v-73a07988]{min-height:100vh}.w-full[data-v-73a07988]{width:100%}.flex[data-v-73a07988]{display:flex}.cursor-pointer[data-v-73a07988]{cursor:pointer}.place-content-center[data-v-73a07988]{place-content:center}.items-center[data-v-73a07988]{align-items:center}.justify-center[data-v-73a07988]{justify-content:center}.overflow-hidden[data-v-73a07988]{overflow:hidden}.bg-white[data-v-73a07988]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-4[data-v-73a07988]{padding-left:1rem;padding-right:1rem}.px-8[data-v-73a07988]{padding-left:2rem;padding-right:2rem}.py-2[data-v-73a07988]{padding-bottom:.5rem;padding-top:.5rem}.text-center[data-v-73a07988]{text-align:center}.text-8xl[data-v-73a07988]{font-size:6rem;line-height:1}.text-xl[data-v-73a07988]{font-size:1.25rem;line-height:1.75rem}.text-black[data-v-73a07988]{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light[data-v-73a07988]{font-weight:300}.font-medium[data-v-73a07988]{font-weight:500}.leading-tight[data-v-73a07988]{line-height:1.25}.font-sans[data-v-73a07988]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased[data-v-73a07988]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black[data-v-73a07988]{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white[data-v-73a07988]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:px-0[data-v-73a07988]{padding-left:0;padding-right:0}.sm\\:px-6[data-v-73a07988]{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-3[data-v-73a07988]{padding-bottom:.75rem;padding-top:.75rem}.sm\\:text-4xl[data-v-73a07988]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-xl[data-v-73a07988]{font-size:1.25rem;line-height:1.75rem}}';

const error404Styles_BuFEi3h_ = [error404_vue_vue_type_style_index_0_scoped_73a07988_lang];

const error404Styles_BuFEi3h_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: error404Styles_BuFEi3h_
});

const error500_vue_vue_type_style_index_0_scoped_6fdef64d_lang = ".spotlight[data-v-6fdef64d]{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}.fixed[data-v-6fdef64d]{position:fixed}.-bottom-1\\/2[data-v-6fdef64d]{bottom:-50%}.left-0[data-v-6fdef64d]{left:0}.right-0[data-v-6fdef64d]{right:0}.grid[data-v-6fdef64d]{display:grid}.mb-16[data-v-6fdef64d]{margin-bottom:4rem}.mb-8[data-v-6fdef64d]{margin-bottom:2rem}.h-1\\/2[data-v-6fdef64d]{height:50%}.max-w-520px[data-v-6fdef64d]{max-width:520px}.min-h-screen[data-v-6fdef64d]{min-height:100vh}.place-content-center[data-v-6fdef64d]{place-content:center}.overflow-hidden[data-v-6fdef64d]{overflow:hidden}.bg-white[data-v-6fdef64d]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8[data-v-6fdef64d]{padding-left:2rem;padding-right:2rem}.text-center[data-v-6fdef64d]{text-align:center}.text-8xl[data-v-6fdef64d]{font-size:6rem;line-height:1}.text-xl[data-v-6fdef64d]{font-size:1.25rem;line-height:1.75rem}.text-black[data-v-6fdef64d]{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light[data-v-6fdef64d]{font-weight:300}.font-medium[data-v-6fdef64d]{font-weight:500}.leading-tight[data-v-6fdef64d]{line-height:1.25}.font-sans[data-v-6fdef64d]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased[data-v-6fdef64d]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black[data-v-6fdef64d]{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white[data-v-6fdef64d]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:px-0[data-v-6fdef64d]{padding-left:0;padding-right:0}.sm\\:text-4xl[data-v-6fdef64d]{font-size:2.25rem;line-height:2.5rem}}";

const error500Styles_CU3YOSM = [error500_vue_vue_type_style_index_0_scoped_6fdef64d_lang];

const error500Styles_CU3YOSM$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: error500Styles_CU3YOSM
});

const form_vue_vue_type_style_index_0_scoped_2b8f3999_lang = "main[data-v-2b8f3999]{align-items:center;display:grid;height:100vh;justify-content:center}";

const formStyles_U526UvZo = [form_vue_vue_type_style_index_0_scoped_2b8f3999_lang];

const formStyles_U526UvZo$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: formStyles_U526UvZo
});

const HomeItemList_vue_vue_type_style_index_0_scoped_b17aa983_lang = ".category-container[data-v-b17aa983]{align-items:center;display:flex;flex-direction:column;gap:4em;margin-bottom:2em}@media (min-width:768px){.category-container[data-v-b17aa983]{display:flex;flex-direction:row;gap:1em;justify-content:space-evenly;margin-bottom:2em}}.subtitle[data-v-b17aa983]{margin-bottom:2em;text-align:center}";

const HomeItemListStyles_BqRDkKx3 = [HomeItemList_vue_vue_type_style_index_0_scoped_b17aa983_lang];

const HomeItemListStyles_BqRDkKx3$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: HomeItemListStyles_BqRDkKx3
});

const ServicesGridItem_vue_vue_type_style_index_0_scoped_1e7ffcda_lang = ".card-container[data-v-1e7ffcda]{max-width:-moz-max-content;max-width:max-content}.card[data-v-1e7ffcda]{align-items:center;background-color:var(--color-card-bg);border-radius:6px;display:flex;flex-direction:column;height:375px;outline:solid var(--color--secondary);position:relative;width:275px}.card__image[data-v-1e7ffcda]{border-radius:6px 6px 0 0;display:inline-block;height:40%;justify-items:center;margin-top:0;overflow:hidden;width:100%}.card__text[data-v-1e7ffcda]{background-color:var(--color-card-bg);display:flex;flex-direction:column;height:60%;justify-content:flex-start;padding:1em;width:100%}.card__text-description[data-v-1e7ffcda]{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:4}.card__text-title[data-v-1e7ffcda]{color:var(--color--primary);-webkit-text-decoration:double var(--color--primary) 2px;text-decoration:double var(--color--primary) 2px}.card__icons[data-v-1e7ffcda]:hover{background-color:#fffaf0;cursor:pointer}.flex[data-v-1e7ffcda]{align-items:center;background-color:var(---color-card-bg);display:flex;gap:.5em}";

const ServicesGridItemStyles_DAUYnyP = [ServicesGridItem_vue_vue_type_style_index_0_scoped_1e7ffcda_lang];

const ServicesGridItemStyles_DAUYnyP$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ServicesGridItemStyles_DAUYnyP
});

const ServicesNav_vue_vue_type_style_index_0_scoped_cfe661e2_lang = "nav[data-v-cfe661e2]{display:flex;justify-content:space-between}.select-container[data-v-cfe661e2]{display:flex;flex-direction:column}select[data-v-cfe661e2]{background-color:var(--color--bg);border-radius:6px;color:var(--color--text);outline:none;padding:.25em 1em}.sort-services[data-v-cfe661e2]{display:flex;flex-direction:column;justify-content:flex-end;padding:.25em 1em;text-align:right}";

const ServicesNavStyles_Nawzcvrj = [ServicesNav_vue_vue_type_style_index_0_scoped_cfe661e2_lang];

const ServicesNavStyles_Nawzcvrj$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ServicesNavStyles_Nawzcvrj
});

const ServicesGrid_vue_vue_type_style_index_0_scoped_9c95de60_lang = ".grid-wrap[data-v-9c95de60]{align-items:stretch;display:grid;gap:1em;grid-template-columns:repeat(auto-fill,275px);justify-content:center;row-gap:2em}.rands[data-v-9c95de60]{outline:salmon}";

const ServicesGridStyles_B9mh3sB_ = [ServicesGrid_vue_vue_type_style_index_0_scoped_9c95de60_lang];

const ServicesGridStyles_B9mh3sB_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ServicesGridStyles_B9mh3sB_
});

const dashboard_vue_vue_type_style_index_0_scoped_776851d6_lang = ".dashboard[data-v-776851d6]{background-color:var(--color-card-bg)}.dashboard-cards[data-v-776851d6]{background-color:var(--color--bg)}.active[data-v-776851d6]{background-color:var(--clr--primary);color:var(--clr--text)}";

const dashboardStyles_8y4Z53wv = [dashboard_vue_vue_type_style_index_0_scoped_776851d6_lang];

const dashboardStyles_8y4Z53wv$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: dashboardStyles_8y4Z53wv
});

const default_vue_vue_type_style_index_0_scoped_787ae914_lang = ".main[data-v-787ae914]{margin:0 1em}@media (min-width:950px){.main[data-v-787ae914]{margin:0 15%}}";

const defaultStyles_DdYyQWCJ = [default_vue_vue_type_style_index_0_scoped_787ae914_lang];

const defaultStyles_DdYyQWCJ$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: defaultStyles_DdYyQWCJ
});

const Progress_vue_vue_type_style_index_0_scoped_1e545a26_lang = 'progress[data-v-1e545a26]:indeterminate{position:relative}progress[data-v-1e545a26]:indeterminate:after{--tw-content:"";background-color:currentColor;content:var(--tw-content);inset:0;position:absolute}progress[data-v-1e545a26]:indeterminate::-webkit-progress-value{background-color:currentColor}progress[data-v-1e545a26]:indeterminate::-moz-progress-bar{background-color:currentColor}progress:indeterminate.bar-animation-carousel[data-v-1e545a26]:after{animation:carousel-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-carousel[data-v-1e545a26]::-webkit-progress-value{animation:carousel-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-carousel[data-v-1e545a26]::-moz-progress-bar{animation:carousel-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-carousel-inverse[data-v-1e545a26]:after{animation:carousel-inverse-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-carousel-inverse[data-v-1e545a26]::-webkit-progress-value{animation:carousel-inverse-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-carousel-inverse[data-v-1e545a26]::-moz-progress-bar{animation:carousel-inverse-1e545a26 2s ease-in-out infinite}progress:indeterminate.bar-animation-swing[data-v-1e545a26]:after{animation:swing-1e545a26 3s ease-in-out infinite}progress:indeterminate.bar-animation-swing[data-v-1e545a26]::-webkit-progress-value{animation:swing-1e545a26 3s ease-in-out infinite}progress:indeterminate.bar-animation-swing[data-v-1e545a26]::-moz-progress-bar{animation:swing-1e545a26 3s ease-in-out infinite}progress:indeterminate.bar-animation-elastic[data-v-1e545a26]:after{animation:elastic-1e545a26 3s ease-in-out infinite}progress:indeterminate.bar-animation-elastic[data-v-1e545a26]::-webkit-progress-value{animation:elastic-1e545a26 3s ease-in-out infinite}progress:indeterminate.bar-animation-elastic[data-v-1e545a26]::-moz-progress-bar{animation:elastic-1e545a26 3s ease-in-out infinite}@keyframes carousel-1e545a26{0%,to{width:50%}0%{transform:translateX(-100%)}to{transform:translateX(200%)}}@keyframes carousel-inverse-1e545a26{0%,to{width:50%}0%{transform:translateX(200%)}to{transform:translateX(-100%)}}@keyframes swing-1e545a26{0%,to{transform:translateX(-25%);width:50%}50%{transform:translateX(125%)}}@keyframes elastic-1e545a26{0%,to{margin-left:25%;width:50%}50%{margin-left:5%;width:90%}}';

const ProgressStyles_DcrDdMej = [Progress_vue_vue_type_style_index_0_scoped_1e545a26_lang];

const ProgressStyles_DcrDdMej$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: ProgressStyles_DcrDdMej
});

const TheFooter_vue_vue_type_style_index_0_scoped_da2811d8_lang = "footer[data-v-da2811d8]{background-color:var(--color--secondary)}";

const TheFooterStyles_YKmEhRV = [TheFooter_vue_vue_type_style_index_0_scoped_da2811d8_lang];

const TheFooterStyles_YKmEhRV$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: TheFooterStyles_YKmEhRV
});

const NavBar_vue_vue_type_style_index_0_scoped_35d5c23e_lang = ".bgDark[data-v-35d5c23e]{background-color:var(--color--bg)}i[data-v-35d5c23e]{align-items:center;display:flex;justify-content:space-between}.hidden[data-v-35d5c23e],ul[data-v-35d5c23e]{display:none}ul[data-v-35d5c23e]{background-color:var(--color--bg);left:1em;margin-inline:1em;margin-inline:auto;position:absolute;right:1em;top:100%}button[data-v-35d5c23e]{background-color:inherit;border:none;color:var(--color--text)}.show[data-v-35d5c23e]{border-radius:1em;display:flex;flex-direction:column;padding:2em}nav ul[data-v-35d5c23e]{gap:1rem}@media (min-width:550px){ul[data-v-35d5c23e]{background-color:var(--color--bg);position:static}.hidden[data-v-35d5c23e],ul[data-v-35d5c23e]{display:flex}}";

const NavBarStyles_SpwmoT_ = [NavBar_vue_vue_type_style_index_0_scoped_35d5c23e_lang];

const NavBarStyles_SpwmoT_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: NavBarStyles_SpwmoT_
});

export { nodeServer as default };
//# sourceMappingURL=index.mjs.map
