/**
 * game/sound.js
 *
 * SoundSystem / FMOD bindings for sound playback.
 *
 * Symbols: t59, Sa, Ta
 * Source: bundle lines 28154-28373 (3 statements)
 */


class t59 {
  static musicSystem;
  static musicChannelGroup;
  constructor() {
    this.currentChannel = 0;
    this.currentSoundId = 0;
    this.currentSoundPath = "";
    this.duration = 0;
    this.position = 0;
    this.positionUpdatedAt = 0;
    this.paused = false;
    this.sounds = new Map();
    return;
  }
  static {
    this.musicSystem = null;
    this.musicChannelGroup = null;
  }
  get instance() {
    return globalThis.natives.SoundSystem_getInstance();
  }
  static getMusicChannelGroup(pointer) {
    const pointer2 = pointer.readPointer();
    if (pointer2.isNull()) {
      return ptr(0);
    }
    const musicSystem = pointer2.readPointer();
    if (musicSystem.isNull()) {
      return ptr(0);
    }
    if (
      t59.musicSystem?.equals(musicSystem) &&
      t59.musicChannelGroup &&
      !t59.musicChannelGroup.isNull()
    ) {
      return t59.musicChannelGroup;
    }
    const memoryBuffer = Memory.alloc(Process.pointerSize);
    memoryBuffer.writePointer(ptr(0));
    if (
      globalThis.natives.FMOD_System_createChannelGroup(
        musicSystem,
        Memory.allocUtf8String("NullRythm Music"),
        memoryBuffer,
      ) !== 0
    ) {
      return ptr(0);
    }
    t59.musicSystem = musicSystem;
    t59.musicChannelGroup = memoryBuffer.readPointer();
    return t59.musicChannelGroup;
  }
  load(text2) {
    if (typeof text2 != "string" || text2.length === 0) {
      return 0;
    }
    const instance = this.instance;
    if (instance.isNull()) {
      return 0;
    }
    if (this.sounds.has(text2)) {
      return this.sounds.get(text2);
    }
    const soundSystem_loadSoundResult = globalThis.natives.SoundSystem_loadSound(
      instance,
      Memory.allocUtf8String(text2),
    );
    if (soundSystem_loadSoundResult !== 0) {
      this.sounds.set(text2, soundSystem_loadSoundResult);
    }
    return soundSystem_loadSoundResult;
  }
  play(currentSoundPath, { loop: loop = true, volume: volume = 1 } = {}) {
    var volume2 = volume;
    var loop2 = loop;
    if (this.currentChannel !== 0) {
      this.stop();
    }
    const instance = this.instance;
    if (instance.isNull()) {
      return false;
    }
    const currentSoundId = this.load(currentSoundPath);
    if (currentSoundId === 0) {
      return false;
    }
    const currentChannel = globalThis.natives.SoundSystem_playSound(
      instance,
      currentSoundId,
      loop2 ? -1 : 0,
      volume2,
    );
    if (currentChannel === 0) {
      return false;
    }
    const pointer = instance.readPointer().readPointer();
    const musicChannelGroup = t59.getMusicChannelGroup(instance);
    const memoryBuffer = Memory.alloc(Process.pointerSize);
    memoryBuffer.writePointer(ptr(0));
    const fMOD_System_getChannelResult = globalThis.natives.FMOD_System_getChannel(
      pointer,
      currentChannel - 1,
      memoryBuffer,
    );
    const pointer2 = memoryBuffer.readPointer();
    if (
      (musicChannelGroup.isNull() || fMOD_System_getChannelResult !== 0 || pointer2.isNull()
        ? -1
        : globalThis.natives.FMOD_Channel_setChannelGroup(pointer2, musicChannelGroup)) !== 0
    ) {
      globalThis.natives.SoundSystem_stopChannel(instance, currentChannel);
      globalThis.natives.SoundSystem_unloadSound(instance, currentSoundId);
      this.sounds.delete(currentSoundPath);
      return false;
    }
    this.currentChannel = currentChannel;
    this.currentSoundId = currentSoundId;
    this.currentSoundPath = currentSoundPath;
    this.duration = Math.max(
      0,
      globalThis.natives.SoundSystem_getSoundLength(instance, currentSoundId),
    );
    this.position = 0;
    this.positionUpdatedAt = Date.now();
    this.paused = false;
    return true;
  }
  getChannelPointer() {
    if (this.currentChannel === 0) {
      return ptr(0);
    }
    const instance = this.instance;
    if (instance.isNull()) {
      return ptr(0);
    }
    const pointer = instance.readPointer().readPointer();
    if (pointer.isNull()) {
      return ptr(0);
    }
    const memoryBuffer = Memory.alloc(Process.pointerSize);
    memoryBuffer.writePointer(ptr(0));
    if (
      globalThis.natives.FMOD_System_getChannel(pointer, this.currentChannel - 1, memoryBuffer) !==
      0
    ) {
      return ptr(0);
    }
    return memoryBuffer.readPointer();
  }
  getPosition() {
    if (this.currentChannel === 0) {
      return 0;
    }
    if (!this.paused) {
      this.position = Math.min(
        this.duration || 1 / 0,
        this.position + (Date.now() - this.positionUpdatedAt) / 1000,
      );
      this.positionUpdatedAt = Date.now();
    }
    return this.position;
  }
  seek(t) {
    if (this.currentChannel === 0 || !Number.isFinite(t)) {
      return false;
    }
    const channelPointer = this.getChannelPointer();
    if (channelPointer.isNull()) {
      return false;
    }
    const position = Math.max(0, Math.min(this.duration, t));
    return (
      globalThis.natives.FMOD_Channel_setPosition(
        channelPointer,
        Math.round(1000 * position),
        1,
      ) === 0 && ((this.position = position), (this.positionUpdatedAt = Date.now()), true)
    );
  }
  setPaused(paused) {
    if (this.currentChannel === 0 || this.paused === paused) {
      return false;
    }
    const channelPointer = this.getChannelPointer();
    return (
      !channelPointer.isNull() &&
      globalThis.natives.FMOD_ChannelControl_setPaused(channelPointer, paused ? 1 : 0) === 0 &&
      ((this.paused = paused), (this.positionUpdatedAt = Date.now()), true)
    );
  }
  stop() {
    if (this.currentChannel === 0) {
      return false;
    }
    const instance = this.instance;
    if (instance.isNull()) {
      return false;
    }
    const {
      currentChannel: currentChannel,
      currentSoundId: currentSoundId,
      currentSoundPath: currentSoundPath,
    } = this;
    return (
      globalThis.natives.SoundSystem_stopChannel(instance, currentChannel) === 0 &&
      (globalThis.natives.SoundSystem_unloadSound(instance, currentSoundId),
      (this.currentChannel = 0),
      (this.currentSoundId = 0),
      (this.currentSoundPath = ""),
      (this.duration = 0),
      (this.position = 0),
      (this.positionUpdatedAt = 0),
      (this.paused = false),
      this.sounds.delete(currentSoundPath),
      true)
    );
  }
}

var Sa = t59;

var Ta = Sa;
