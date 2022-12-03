<template>
  <video
    controls
    muted
    autoplay
    width="800"
    height="600"
    @canplay="videoInfo.canplay = true"
  />
  <div style="margin-top: 20px">
    <el-button
      @click="onScreenshot"
      :disabled="!videoInfo.canplay"
      type="primary"
      >截图</el-button
    >
    <el-button @click="onOpenCamera" type="primary">
      {{ !videoInfo.startMediaRecord ? "录制" : "停止" }}</el-button
    >
    <el-button
      @click="onMediaOperate"
      type="primary"
      :disabled="!videoInfo.startMediaRecord"
      >{{ !videoInfo.pauseMediaRecord ? "暂停" : "恢复" }}</el-button
    >
  </div>
  <div style="margin-top: 10px; font-size: 14px">
    该功能运行，需要 Chrome 在 108 版本
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { MediaRecord, videoScreenshot } from "@/utils";

const videoInfo = reactive({
  startMediaRecord: false,
  pauseMediaRecord: false,
  canplay: false,
  mediaRecord: null,
  videoEL: null,
});

onMounted(() => {
  videoInfo.videoEL = document.querySelector("video");
  videoInfo.mediaRecord = new MediaRecord({
    mediaConstraints: { audio: true, video: true },
    download: true,
  });
});

async function onOpenCamera() {
  try {
    if (videoInfo.startMediaRecord) {
      videoInfo.mediaRecord.stop();
      videoInfo.pauseMediaRecord = false;
      videoInfo.startMediaRecord = false;
    } else {
      await videoInfo.mediaRecord.start();
      videoInfo.videoEL.srcObject = videoInfo.mediaRecord.mediaStream;
      videoInfo.startMediaRecord = true;
    }
  } catch (e) {
    videoInfo.startMediaRecord = false;
  }
}
function onScreenshot() {
  videoScreenshot({
    download: true,
    width: 500,
    height: 300,
    videoEl: "video",
  });
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
