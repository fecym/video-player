<template>
  <video
    v-if="cameraUrl"
    :src="cameraUrl"
    controls
    muted
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
    <el-button @click="router.push('camera-player-realtime')" link
      >想看实时录制，点这里</el-button
    >
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { MediaRecord, videoScreenshot } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const videoInfo = reactive({
  startMediaRecord: false,
  pauseMediaRecord: false,
  canplay: false,
  mediaRecord: null,
});

const cameraUrl = computed(() => {
  return videoInfo.mediaRecord?.url ?? "";
});

onMounted(() => {
  videoInfo.mediaRecord = new MediaRecord({
    mediaConstraints: { audio: true, video: true },
    download: false,
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
