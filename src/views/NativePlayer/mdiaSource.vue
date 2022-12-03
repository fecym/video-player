<template>
  <video id="video" controls muted autoplay width="600" height="300" />
</template>

<script setup>
import { onMounted } from "vue";
import mp4file from "../../assets/frag_bunny.mp4";

function fetchBuffer(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    callback(xhr.response);
  };
  xhr.send();
}

onMounted(() => {
  const video = document.getElementById("video");
  const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

  if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", sourceOpen);
  }
  function sourceOpen(ev) {
    URL.revokeObjectURL(video.src);
    const mediaSource = ev.target;
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    fetchBuffer(mp4file, (buf) => {
      sourceBuffer.addEventListener("updateend", function () {
        if (!sourceBuffer.updating && mediaSource.readyState === "open") {
          mediaSource.endOfStream();
        }
      });
      sourceBuffer.appendBuffer(buf);
    });
  }
});
</script>

<style scoped></style>
