/**
 * features/music.js
 *
 * Music player + ID3 tag parsing and download from the music server.
 *
 * Symbols: Ma, Ca, Na, MusicPlayer
 * Source: bundle lines 2509-28692 (4 statements)
 */


function Ma(t) {
  if (t.toString("ascii", 0, 3) !== "ID3" || t.length < 10) {
    return null;
  }
  const e = t[3];
  const minResult = Math.min(
    t.length,
    10 + ((127 & t[6]) << 21) + ((127 & t[7]) << 14) + ((127 & t[8]) << 7) + (127 & t[9]),
  );
  let s = 10;
  while (s + 10 <= minResult) {
    const text2 = t.toString("ascii", s, s + 4);
    if (!text2 || text2 === "\u0000\u0000\u0000\u0000") {
      break;
    }
    let n =
      e === 4
        ? ((127 & t[s + 4]) << 21) +
          ((127 & t[s + 5]) << 14) +
          ((127 & t[s + 6]) << 7) +
          (127 & t[s + 7])
        : (t[s + 4] << 24) | (t[s + 5] << 16) | (t[s + 6] << 8) | t[s + 7];
    const combinedValue = s + 10;
    const combinedValue2 = combinedValue + n;
    if (!Number.isFinite(n) || n <= 0 || combinedValue2 > minResult) {
      break;
    }
    if (text2 === "TIT2" && n > 1) {
      const e2 = t[combinedValue];
      let i2;
      if (e2 === 1 || e2 === 2) {
        let combinedValue3 = combinedValue + 1;
        const a2 = e2 === 1 && (t[combinedValue3] !== 254 || t[combinedValue3 + 1] !== 255);
        if (e2 === 1 && (t[combinedValue3] === 255 || t[combinedValue3] === 254)) {
          combinedValue3 += 2;
        }
        const items = [];
        for (let index = combinedValue3; index < combinedValue2; index += 2) {
          const i3 = t[index];
          const s3 = index + 1 < combinedValue2 ? t[index + 1] : 0;
          items.push(a2 ? i3 : s3, a2 ? s3 : i3);
        }
        i2 = m.from(items).toString("utf16le");
      } else {
        i2 = t.toString(e2 === 3 ? "utf8" : "latin1", combinedValue + 1, combinedValue2);
      }
      i2 = i2.replace(/\0/g, "").trim();
      if (i2) {
        return i2;
      }
    }
    s = combinedValue2;
  }
  return null;
}

class Ca {
  constructor(t) {
    this.serverUrl = String(t || "").replace(/\/+$/, "");
    this.http = new HttpClient();
    return;
  }
  download(t, concatResult = "track-".concat(Date.now(), ".mp3")) {
    if (!this.serverUrl) {
      throw new Error("Music server URL is not configured");
    }
    if (!/^https?:\/\//i.test(t)) {
      throw new Error("Source URL must use HTTP or HTTPS");
    }
    const concatResult2 = "".concat(this.serverUrl, "/audio?url=", encodeURIComponent(t));
    const responseBytes = this.http.GET(concatResult2, ["Accept: audio/mpeg"]);
    if (!responseBytes || responseBytes.length < 4) {
      throw new Error("Music server returned an empty response");
    }
    const a = responseBytes.toString("ascii", 0, 3) === "ID3";
    const n = responseBytes[0] === 255 && !(224 & ~responseBytes[1]);
    if (!a && !n) {
      throw new Error("Music server response is not an MP3 file");
    }
    const updatePath = Is.getUpdatePath();
    if (!updatePath) {
      throw new Error("Could not get the app update directory");
    }
    const text2 = "".concat(updatePath.replace(/[\\\/]+$/, ""), "/music");
    if (
      globalThis.pointers.mkdir(Memory.allocUtf8String(text2), 511) < 0 &&
      !Is.isFileExist(text2)
    ) {
      throw new Error("Could not create the update music directory");
    }
    const concatResult3 = "".concat(
      text2,
      "/",
      String(Ma(responseBytes) || concatResult)
        .replace(/[<>:"\/\\|?*\x00-\x1f]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\.mp3$/i, "")
        .slice(0, 120) || "track-".concat(Date.now()),
      ".mp3",
    );
    const fileInstance = new File(concatResult3, "wb");
    try {
      fileInstance.write(responseBytes);
    } finally {
      fileInstance.close();
    }
    return concatResult3;
  }
  destroy() {
    this.http.destroy();
    return;
  }
}

var Na = "http://188.245.255.253:33463";

class MusicPlayer {
  constructor() {
    this.playlists = ["default"];
    this.selectedPlaylist = "default";
    this.playlistTracks = new Map([["default", []]]);
    this.onTracksChanged = null;
    this.onTrackChanged = null;
    this.nextPlaylistNumber = 2;
    this.selectedTrackPath = null;
    this.soundManager = new Ta();
    return;
  }
  loadConfig(record = {}) {
    const e = Array.isArray(record.playlists) ? record.playlists : [];
    this.playlists = [];
    this.playlistTracks = new Map();
    for (const t2 of e) {
      if (typeof t2?.name == "string" && t2.name.trim()) {
        const name = t2.name;
        if (!this.playlists.includes(name)) {
          this.playlists.push(name);
          const i = Array.isArray(t2.tracks)
            ? t2.tracks
                .filter((t) => typeof t?.name == "string" && typeof t?.path == "string")
                .map((t) => {
                  return {
                    name: t.name,
                    path: t.path,
                  };
                })
            : [];
          this.playlistTracks.set(name, i);
        }
      }
    }
    if (!this.playlists.includes("default")) {
      this.playlists.unshift("default");
      this.playlistTracks.set("default", []);
    }
    const getResult = this.playlistTracks.get("default");
    if (getResult.length === 0) {
      const updatePath = Is.getUpdatePath();
      if (updatePath) {
        const concatResult = "".concat(
          updatePath.replace(/[\\\/]+$/, ""),
          "/music/music-player-test.mp3",
        );
        if (Is.isFileExist(concatResult)) {
          const replaceResult = concatResult
            .split(/[\\\/]/)
            .pop()
            .replace(/\.mp3$/i, "");
          getResult.push({
            name: replaceResult,
            path: concatResult,
          });
        }
      }
    }
    this.selectedPlaylist = this.playlists.includes(record.selectedPlaylist)
      ? record.selectedPlaylist
      : "default";
    const numberResult = Number(record.nextPlaylistNumber);
    this.nextPlaylistNumber = Number.isInteger(numberResult)
      ? numberResult > 1
        ? numberResult
        : 2
      : 2;
    this.selectedTrackPath =
      typeof record.selectedTrackPath == "string" ? record.selectedTrackPath : null;
    return;
  }
  getConfig() {
    return {
      playlists: this.playlists.map((t) => {
        return {
          name: t,
          tracks: this.getTracks(t).map((t) => {
            return {
              name: t.name,
              path: t.path,
            };
          }),
        };
      }),
      selectedPlaylist: this.selectedPlaylist,
      nextPlaylistNumber: this.nextPlaylistNumber,
      selectedTrackPath: this.selectedTrackPath,
    };
  }
  selectPlaylist(selectedPlaylist) {
    if (this.playlists.includes(selectedPlaylist)) {
      this.selectedPlaylist = selectedPlaylist;
      return this.selectedPlaylist;
    }
    return this.selectedPlaylist;
  }
  addPlaylist(selectedPlaylist) {
    selectedPlaylist = String(selectedPlaylist || "").trim();
    if (!selectedPlaylist || this.playlists.includes(selectedPlaylist)) {
      return null;
    }
    this.playlists.push(selectedPlaylist);
    this.playlistTracks.set(selectedPlaylist, []);
    this.selectedPlaylist = selectedPlaylist;
    return selectedPlaylist;
  }
  removePlaylist(selectedPlaylist = this.selectedPlaylist) {
    return selectedPlaylist !== "default" && this.playlists.includes(selectedPlaylist)
      ? (this.getTracks(selectedPlaylist).some((t) => t.path === this.selectedTrackPath) &&
          (this.soundManager.stop(), (this.selectedTrackPath = null), this.onTrackChanged?.(null)),
        this.playlistTracks.delete(selectedPlaylist),
        (this.playlists = this.playlists.filter((e) => e !== selectedPlaylist)),
        this.selectedPlaylist === selectedPlaylist && (this.selectedPlaylist = "default"),
        this.onTracksChanged?.(selectedPlaylist),
        true)
      : selectedPlaylist !== "default" && !!this.playlists.includes(selectedPlaylist);
  }
  addTrack(t, e, selectedPlaylist = this.selectedPlaylist, s = true) {
    if (!this.playlistTracks.has(selectedPlaylist)) {
      this.playlistTracks.set(selectedPlaylist, []);
    }
    const getResult = this.playlistTracks.get(selectedPlaylist);
    const findResult = getResult.find((t) => t.path === e);
    if (findResult) {
      return findResult;
    }
    const record = {
      name: t,
      path: e,
    };
    getResult.push(record);
    if (s) {
      this.onTracksChanged?.(selectedPlaylist);
    }
    return record;
  }
  removeTrack(t, selectedPlaylist = this.selectedPlaylist) {
    const tracks = this.getTracks(selectedPlaylist);
    const index = tracks.findIndex((e) => e.path === t);
    return (
      !(index < 0) &&
      !(tracks.splice(index, 1),
      this.selectedTrackPath === t &&
        (this.soundManager.stop(), (this.selectedTrackPath = null), this.onTrackChanged?.(null)),
      this.onTracksChanged?.(selectedPlaylist),
      0)
    );
  }
  downloadTrack(t) {
    const trimmedText = String(t).trim();
    const execResult = /^(https?):\/\/([^\/?#]+)([^?#]*)(?:\?([^#]*))?/i.exec(trimmedText);
    if (!execResult) {
      throw new Error("Enter a valid HTTP/HTTPS link");
    }
    const toLowerCaseResult = execResult[2].toLowerCase();
    const a = execResult[3] || "";
    const n = execResult[4] || "";
    const r =
      n
        .split("&")
        .map((t) => t.split("="))
        .find(([t]) => t === "v") == null
        ? undefined
        : n
            .split("&")
            .map((t) => t.split("="))
            .find(([t]) => t === "v")[1];
    const popResult = a.split("/").filter(Boolean).pop();
    const l =
      toLowerCaseResult === "youtube.com" ||
      toLowerCaseResult.endsWith(".youtube.com") ||
      toLowerCaseResult === "youtu.be" ||
      toLowerCaseResult.endsWith(".youtu.be");
    const c = r || (l ? popResult : null);
    let h = c || popResult || toLowerCaseResult;
    try {
      h = decodeURIComponent(h.replace(/\+/g, "%20"));
    } catch {}
    h = h.replace(/\.mp3$/i, "");
    const d = l ? (c ? "https://www.youtube.com/watch?v=".concat(c) : trimmedText) : trimmedText;
    const u = new Ca(Na);
    try {
      const downloadResult = u.download(d, h);
      const replaceResult = downloadResult
        .split(/[\\\/]/)
        .pop()
        .replace(/\.mp3$/i, "");
      return this.addTrack(replaceResult, downloadResult);
    } finally {
      u.destroy();
    }
  }
  getTracks(selectedPlaylist = this.selectedPlaylist) {
    if (!this.playlistTracks.has(selectedPlaylist)) {
      this.playlistTracks.set(selectedPlaylist, []);
    }
    return this.playlistTracks.get(selectedPlaylist);
  }
  playTrack(t) {
    if (!t?.path) {
      return false;
    }
    const playResult = this.soundManager.play(t.path, {
      loop: false,
    });
    if (playResult) {
      this.selectedTrackPath = t.path;
      this.onTrackChanged?.(t.path);
    }
    return playResult;
  }
  togglePlayback() {
    if (this.soundManager.currentChannel === 0) {
      const t = this.getTracks()[0];
      if (t) {
        return this.playTrack(t);
      }
      return null;
    }
    return this.soundManager.setPaused(!this.soundManager.paused);
  }
  seek(t) {
    return this.soundManager.seek(t);
  }
  update() {
    if (this.progressSlider && this.soundManager.currentChannel !== 0) {
      const {
        soundManager: { duration: duration },
      } = this;
      const position = this.soundManager.getPosition();
      if (!this.soundManager.paused && duration > 0 && position >= duration) {
        const tracks = this.getTracks();
        if (tracks.length > 0) {
          const index = tracks.findIndex((t) => t.path === this.selectedTrackPath);
          const i = tracks[(index + 1 + tracks.length) % tracks.length];
          this.playTrack(i);
        }
      }
      const ceilResult = Math.ceil(this.soundManager.duration);
      const position2 = this.soundManager.getPosition();
      this.progressSlider.slider.maxValue = Math.max(1, ceilResult);
      this.progressSlider.slider.value = Math.min(ceilResult, Math.floor(position2));
      this.progressSlider.text = "Playing: ".concat(
        this.formatTime(position2),
        " / ",
        this.formatTime(ceilResult),
      );
      this.playPauseButton.text = (this.soundManager.paused ? "Play" : "Pause").toScString();
    }
    return;
  }
  formatTime(t) {
    const maxResult = Math.max(0, Math.floor(Number(t) || 0));
    return "".concat(Math.floor(maxResult / 60), ":", String(maxResult % 60).padStart(2, "0"));
  }
  pause() {
    return this.soundManager.stop();
  }
}
