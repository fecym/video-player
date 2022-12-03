<template>
  <video
    id="video"
    src="../../assets/1d13c7cba4e03cea81ba27c397280214.mp4"
    :controls="false"
    muted
    @canplay="videoInfo.canplay = true"
  />
  <div>
    <el-button @click="onPlay" type="primary" :disabled="!videoInfo.canplay"
      >播放</el-button
    >
    <el-button @click="onPause" type="primary" :disabled="!videoInfo.canplay"
      >暂停</el-button
    >
    <el-button
      @click="onScreenshot"
      :disabled="!videoInfo.startPlay"
      type="primary"
      >截图</el-button
    >
    <el-button @click="onVideotape" type="primary">{{
      !videoInfo.startMediaRecord ? "录屏" : "停止"
    }}</el-button>
    <el-button
      @click="onMediaOperate"
      :disabled="!videoInfo.startMediaRecord"
      type="primary"
      >{{ !videoInfo.pauseMediaRecord ? "暂停" : "恢复" }}</el-button
    >
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { ScreenMediaRecorder, videoScreenshot } from "@/utils";

const videoInfo = reactive({
  canplay: false,
  startPlay: false,
  startMediaRecord: false,
  pauseMediaRecord: false,
  videoEl: null,
  mediaRecord: null,
});

onMounted(() => {
  videoInfo.videoEl = document.getElementById("video");
  videoInfo.mediaRecord = new ScreenMediaRecorder({ download: true });
});

function onPlay() {
  if (!videoInfo.videoEl.paused) return;
  videoInfo.startPlay = true;
  videoInfo.videoEl.play();
}
function onPause() {
  if (videoInfo.videoEl.paused) return;
  videoInfo.videoEl.pause();
}
async function onVideotape() {
  try {
    if (videoInfo.startMediaRecord) {
      videoInfo.mediaRecord.stop();
      videoInfo.pauseMediaRecord = false;
      videoInfo.startMediaRecord = false;
    } else {
      await videoInfo.mediaRecord.start();
      videoInfo.startMediaRecord = true;
    }
  } catch (e) {
    videoInfo.startMediaRecord = false;
  }
}
function onScreenshot() {
  if (!videoInfo.startPlay) return;
  videoScreenshot({ download: true, width: 500, height: 300 });
}
function onMediaOperate() {
  if (!videoInfo.startMediaRecord) return;
  videoInfo.pauseMediaRecord
    ? videoInfo.mediaRecord.resume()
    : videoInfo.mediaRecord.pause();
  videoInfo.pauseMediaRecord = !videoInfo.pauseMediaRecord;
}
</script>

<style scoped></style>
