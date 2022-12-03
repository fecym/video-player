<template>
  <input
    type="file"
    accept="video/*"
    @change="loadFile($event)"
    style="margin: 0 auto 20px; display: block"
  />
  <video
    id="preview"
    :src="videoInfo.src"
    controls
    width="800"
    height="500"
    autoplay
    v-show="videoInfo.show"
  />
</template>

<script setup>
import { onUnmounted, reactive } from "vue";
const videoInfo = reactive({ src: "", show: false });
function loadFile(ev) {
  const reader = new FileReader();
  reader.onload = () => {
    videoInfo.src = URL.createObjectURL(new Blob([reader.result]));
    videoInfo.show = true;
  };
  reader.readAsArrayBuffer(ev.target.files[0]);
}
onUnmounted(() => {
  URL.revokeObjectURL(videoInfo.src);
});
</script>

<style></style>
