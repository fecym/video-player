import { ElMessage } from "element-plus";
/**
 *
 * @param {*} options
 */
export function videoScreenshot(options) {
  const width = options?.width || 300;
  const height = options?.height || 300;
  const videoEl = options?.videoEl
    ? document.querySelector(options.videoEl)
    : document.getElementById("video");
  if (!videoEl) {
    throw new TypeError("没有要截图的视频dom");
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoEl, 0, 0, width, height);
  const url = canvas.toDataURL();
  if (options?.download) {
    return download(url, Date.now() + ".jpg");
  }
  const dom = options?.el ? document.querySelector(options.el) : document.body;
  const img = document.createElement("img");
  img.crossOrigin = "";
  img.src = url;
  dom.append(img);
}

export function download(url, name) {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export class MediaRecord {
  constructor(options) {
    this.chunks = [];
    this.download = options?.download == null ? true : options.download;
    this.mediaConstraints = options?.mediaConstraints
      ? options.mediaConstraints
      : { audio: true, video: true };
    this.recorder = null;
    this.mediaStream = null;
    this.url = "";
  }
  async start() {
    try {
      this.reset();
      this.mediaStream = await navigator.mediaDevices.getUserMedia(
        this.mediaConstraints
      );
      this.recorder = new MediaRecorder(this.mediaStream);
      this.bindEvent();
      this.recorder.start(10);
    } catch (e) {
      this.onError(e);
    }
  }
  pause() {
    this.recorder.pause();
  }
  resume() {
    this.recorder.resume();
  }
  stop() {
    this.recorder.stop();
    this.reset();
  }
  reset() {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    const videoTracks = this.mediaStream?.getVideoTracks() ?? [];
    for (let i = 0; i !== videoTracks.length; ++i) {
      videoTracks[i].stop();
    }
  }
  play(url) {
    const subWindow = window.open(url);
    subWindow.addEventListener("close", () => {
      URL.revokeObjectURL(url);
    });
  }
  onError(e) {
    ElMessage.warning(e?.toString() ?? e ?? "出错了");
    throw new Error(e);
  }
  bindEvent() {
    this.recorder.ondataavailable = (e) => {
      console.log("录制中...", e);
      this.chunks.push(e.data);
    };
    this.recorder.onstop = () => {
      this.url = URL.createObjectURL(
        new Blob(this.chunks, { type: "video/mp4" })
      );
      if (this.download) {
        download(this.url, Date.now() + ".mp4");
        URL.revokeObjectURL(this.url);
      } else {
        this.play(this.url);
      }
    };
  }
}

export class CanvasRecorder extends MediaRecord {
  constructor(options) {
    super(options);
    this.canvas = options.el
      ? document.querySelector(options.el)
      : document.querySelector("canvas");
  }
  start() {
    if (!this.canvas) {
      throw new TypeError("未获取到canvas");
    }
    this.mediaStream = this.canvas.captureStream(60);
    let mimeType;
    if (MediaRecorder.isTypeSupported("video/mp4")) {
      mimeType = "video/mp4;codecs=vp9";
    } else {
      mimeType = "video/webm;codecs=vp9";
    }
    this.recorder = new MediaRecorder(this.mediaStream, { mimeType });
    this.bindEvent();
    this.recorder.start(10);
  }
}

export class ScreenMediaRecorder extends MediaRecord {
  constructor(options) {
    super(options);
  }
  async start() {
    try {
      this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
        this.mediaConstraints
      );
      this.recorder = new MediaRecorder(this.mediaStream);
      this.bindEvent();
      this.recorder.start(10);
    } catch (e) {
      this.onError(e);
    }
  }
}
