<template>
  <video
    id="video"
    src="../../assets/1d13c7cba4e03cea81ba27c397280214.mp4"
    style="display: none"
    controls
    muted
    @ended="onEnded"
  />
  <canvas id="canvas" width="600" height="400" style="border: 1px solid blue" />
  <div>
    <el-button @click="onPlay" type="primary">播放</el-button>
    <el-button @click="onPause" type="primary">暂停</el-button>
    <el-button
      @click="onScreenshot"
      :disabled="!videoInfo.startDraw"
      type="primary"
      >截图</el-button
    >
    <el-button
      @click="onVideotape"
      :disabled="!videoInfo.startDraw"
      type="primary"
      >{{ !videoInfo.startVideotape ? "录制" : "停止" }}</el-button
    >
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { CanvasRecorder, videoScreenshot } from "@/utils";

const videoInfo = reactive({
  startDraw: false,
  startVideotape: false,
  videoEl: null,
  canvasEl: null,
  ctx: null,
  animateId: null,
  videotape: null,
});

onMounted(() => {
  videoInfo.videoEl = document.getElementById("video");
  videoInfo.canvasEl = document.getElementById("canvas");
  videoInfo.ctx = videoInfo.canvasEl.getContext("2d");
  videoInfo.videotape = new CanvasRecorder({ el: "#canvas", download: false });
});

function draw() {
  if (videoInfo.videoEl.paused || videoInfo.videoEl.ended) return;
  videoInfo.startDraw = true;
  const { width, height } = videoInfo.canvasEl;
  videoInfo.ctx.clearRect(0, 0, width, height);
  videoInfo.ctx.drawImage(videoInfo.videoEl, 0, 0, width, height);
  videoInfo.animateId = requestAnimationFrame(draw);
}
function onPlay() {
  if (!videoInfo.videoEl.paused) return;
  videoInfo.videoEl.play();
  draw();
}
function onPause() {
  if (videoInfo.videoEl.paused) return;
  videoInfo.videoEl.pause();
  onEnded();
}
function onEnded() {
  cancelAnimationFrame(videoInfo.animateId);
}
function onScreenshot() {
  if (!videoInfo.startDraw) return;
  videoScreenshot({ download: false, width: 500, height: 300 });
}
function onVideotape() {
  if (!videoInfo.startDraw) return;
  console.log(videoInfo.startVideotape, videoInfo.videotape);
  videoInfo.startVideotape
    ? videoInfo.videotape.stop()
    : videoInfo.videotape.start();
  videoInfo.startVideotape = !videoInfo.startVideotape;
}
</script>

<style scoped></style>
