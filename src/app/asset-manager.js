/**
 * app/asset-manager.js
 *
 * Asset manager (download/load game assets).
 *
 * Symbols: AssetManager, AssetManagerAlias
 * Source: bundle lines 29063-29111 (2 statements)
 */


class AssetManager {
  static client;
  static assets;
  constructor() {
    return;
  }
  static {
    this.client = null;
    this.assets = [];
  }
  static init() {
    AssetManager.client = new HttpClient();
    AssetManager.initAssets();
    AssetManager.downloadAndLoadAssetsIfNecessary();
    return;
  }
  static initAssets() {
    AssetManager.assets.push({
      url: "https://randomname132333.github.io/some%20shit/gui.sc",
      path: "gui.sc",
    });
    return;
  }
  static downloadAsset(e, i) {
    const responseBytes = AssetManager.client.GET(e);
    const combinedValue = Is.getUpdatePath() + "/" + i;
    const fileInstance = new File(combinedValue, "w");
    const r =
      responseBytes instanceof ArrayBuffer
        ? responseBytes
        : responseBytes.buffer.slice(
            responseBytes.byteOffset,
            responseBytes.byteOffset + responseBytes.byteLength,
          );
    fileInstance.write(r);
    fileInstance.close();
    return;
  }
  static downloadAndLoadAssetsIfNecessary() {
    Is.getUpdatePath();
    AssetManager.assets.forEach((e) => {
      AssetManager.downloadAsset(e.url, e.path);
      ws.loadAsset(e.path);
      return;
    });
    return;
  }
}

var AssetManagerAlias = AssetManager;
