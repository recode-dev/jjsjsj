/**
 * net/http.js
 *
 * Minimal HTTP client (HttpClient, HttpResponseBuffer) over libtools.
 *
 * Symbols: HttpResponseBuffer, HttpClient
 * Source: bundle lines 17498-17567 (2 statements)
 */


class HttpResponseBuffer {
  constructor(ptr2) {
    this.ptr = ptr2;
    return;
  }
  getData() {
    return this.ptr.readPointer();
  }
  getDataSize() {
    return this.ptr.add(Process.pointerSize).readU64();
  }
  readData() {
    return m.from(this.getData().readByteArray(this.getDataSize()));
  }
  destroy() {
    globalThis.pointers.free(this.getData());
    globalThis.pointers.free(this.ptr);
    return;
  }
}

class HttpClient {
  constructor() {
    this.keep = [];
    globalThis.pointers.httpInit();
    return;
  }
  headersToCArray(items = []) {
    const mallocResult = globalThis.pointers.malloc(8 * (items.length + 1));
    items.forEach((text2, i) => {
      const pointer = Memory.allocUtf8String(text2);
      this.keep.push(pointer);
      mallocResult.add(8 * i).writePointer(pointer);
      return;
    });
    mallocResult.add(8 * items.length).writePointer(NULL);
    return mallocResult;
  }
  GET(text2, items = [""]) {
    const headersToCArrayResult = this.headersToCArray(items);
    const httpGetResult = globalThis.pointers.httpGet(
      Memory.allocUtf8String(text2),
      headersToCArrayResult,
    );
    const httpResponseBufferInstance = new HttpResponseBuffer(httpGetResult);
    this.keep = [];
    globalThis.pointers.free(headersToCArrayResult);
    const data = httpResponseBufferInstance.readData();
    httpResponseBufferInstance.destroy();
    return data;
  }
  POST(text2, items = [""], text3) {
    const headersToCArrayResult = this.headersToCArray(items);
    const httpPostResult = globalThis.pointers.httpPost(
      Memory.allocUtf8String(text2),
      headersToCArrayResult,
      Memory.allocUtf8String(text3),
    );
    const httpResponseBufferInstance = new HttpResponseBuffer(httpPostResult);
    this.keep = [];
    globalThis.pointers.free(headersToCArrayResult);
    const data = httpResponseBufferInstance.readData();
    httpResponseBufferInstance.destroy();
    return data;
  }
  destroy() {
    this.keep = [];
    globalThis.pointers.httpDestroy();
    return;
  }
}
