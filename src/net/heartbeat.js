/**
 * net/heartbeat.js
 *
 * Heartbeat controller keeping the remote session alive.
 *
 * Symbols: HeartbeatController, HeartbeatControllerAlias, HeartbeatControllerAlias2
 * Source: bundle lines 30661-30823 (3 statements)
 */


class HeartbeatController {
  static version;
  static intervalMs;
  static graceMs;
  constructor({
    messages: messages = new Ua(),
    transport: transport = new _r(),
    now: now = () => HeartbeatController.monotonic(),
    schedule: schedule = setTimeout,
    cancel: cancel = clearTimeout,
    terminate: terminate = () => HeartbeatController.exitProcess(),
    foreground: foreground = () => Br.isForeground(),
  } = {}) {
    var foreground2 = foreground;
    var terminate2 = terminate;
    var cancel2 = cancel;
    var schedule2 = schedule;
    var now2 = now;
    var transport2 = transport;
    var messages2 = messages;
    Object.assign(this, {
      messages: messages2,
      transport: transport2,
      now: now2,
      schedule: schedule2,
      cancel: cancel2,
      terminate: terminate2,
      foreground: foreground2,
    });
    this.background = false;
    this.timer = null;
    this.terminationTimer = null;
    this.terminating = false;
    this.stopped = false;
    this.deadline = this.now() + HeartbeatController.graceMs;
    this.#Le();
    this.#Re();
    return;
  }
  static {
    this.version = "1.0.2";
    this.intervalMs = 10000;
    this.graceMs = 35000;
  }
  #Re(e = false) {
    if (this.stopped) {
      return;
    }
    if (this.timer !== null) {
      this.cancel(this.timer);
      this.timer = null;
    }
    if (!this.foreground()) {
      this.background = true;
      if (this.terminationTimer !== null) {
        this.cancel(this.terminationTimer);
        this.terminationTimer = null;
      }
      this.timer = this.schedule(() => {
        this.timer = null;
        this.#Re(true);
        return;
      }, 1000);
      return;
    }
    const background = this.background;
    this.background = false;
    const nowResult = this.now();
    if (nowResult >= this.deadline && !e && !background) {
      this.#Ee();
      return;
    }
    try {
      const requestResult = this.transport.request(
        HeartbeatController.version,
        this.messages.acknowledgements(),
      );
      if (requestResult.activated !== true) {
        this.#Ee();
        return;
      }
      const difference = requestResult.heartbeat.expiresAt - requestResult.heartbeat.serverTime;
      this.deadline = nowResult + Math.min(HeartbeatController.graceMs, difference);
      try {
        this.messages.receive(
          requestResult.game_messages || [],
          requestResult.heartbeat.serverTime,
        );
      } catch (t) {}
    } catch (t2) {}
    this.now() >= this.deadline
      ? this.#Ee()
      : (this.#Le(),
        (this.timer = this.schedule(
          () => {
            this.timer = null;
            this.#Re(true);
            return;
          },
          Math.min(HeartbeatController.intervalMs, this.deadline - this.now()),
        )));
    return;
  }
  #Le() {
    if (this.terminationTimer !== null) {
      this.cancel(this.terminationTimer);
    }
    this.terminationTimer = this.schedule(
      () => {
        this.terminationTimer = null;
        if (this.now() >= this.deadline) {
          this.#Re(true);
          return;
        }
        this.#Le();
        return;
      },
      Math.max(0, this.deadline - this.now()),
    );
    return;
  }
  #Ee() {
    if (!this.terminating && !this.stopped) {
      this.terminating = true;
      this.stop();
      this.terminate();
    }
    return;
  }
  static monotonic() {
    this.clock ||= new NativeFunction(
      Process.getModuleByName("libc.so").getExportByName("clock_gettime"),
      "int",
      ["int", "pointer"],
    );
    const memoryBuffer = Memory.alloc(16);
    if (this.clock(1, memoryBuffer) !== 0) {
      throw new Error("Monotonic clock unavailable");
    }
    return (
      1000 * memoryBuffer.readS64().toNumber() + memoryBuffer.add(8).readS64().toNumber() / 1000000
    );
  }
  static exitProcess() {
    const exportPointer = Process.getModuleByName("libc.so").getExportByName("_exit");
    new NativeFunction(exportPointer, "void", ["int"])(0);
    return;
  }
  stop() {
    this.stopped = true;
    this.messages.stop();
    if (this.timer !== null) {
      this.cancel(this.timer);
    }
    if (this.terminationTimer !== null) {
      this.cancel(this.terminationTimer);
    }
    this.timer = this.terminationTimer = null;
    return;
  }
}

var HeartbeatControllerAlias = HeartbeatController;

var HeartbeatControllerAlias2 = HeartbeatControllerAlias;
