import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "video-player",
    title: "视频播放器",
    component: () =>
      import(
        /* webpackChunkName: "video-player" */ "../views/NativePlayer/videoPlayer"
      ),
  },
  {
    path: "/video-preview",
    name: "video-preview",
    title: "视频预览",
    component: () =>
      import(
        /* webpackChunkName: "video-preview" */ "../views/NativePlayer/videoPreview"
      ),
  },
  {
    path: "/canvas-player",
    name: "canvas-player",
    title: "canvas 播放",
    component: () =>
      import(
        /* webpackChunkName: "canvas-player" */ "../views/NativePlayer/canvasPlayer"
      ),
  },
  {
    path: "/screen-player",
    name: "screen-player",
    title: "录屏",
    component: () =>
      import(
        /* webpackChunkName: "screen-player" */ "../views/NativePlayer/screenPlayer"
      ),
  },
  {
    path: "/camera-player",
    name: "camera-player",
    title: "录摄像头录制",
    component: () =>
      import(
        /* webpackChunkName: "camera-player" */ "../views/NativePlayer/cameraPlayer"
      ),
  },
  {
    path: "/camera-player-realtime",
    name: "camera-player-realtime",
    title: "实时摄像头录制",
    component: () =>
      import(
        /* webpackChunkName: "camera-player-realtime" */ "../views/NativePlayer/cameraPlayerRealtime"
      ),
  },
  {
    path: "/media-source",
    name: "media-source",
    title: "MediaSource",
    component: () =>
      import(
        /* webpackChunkName: "media-source" */ "../views/NativePlayer/mdiaSource"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
