"use strict";(self["webpackChunkvideo_player_demo"]=self["webpackChunkvideo_player_demo"]||[]).push([[815],{8740:function(e,a,d){d.r(a),d.d(a,{default:function(){return p}});var i=d(4169),t=(d(6809),d(3396)),o=d(7139),r=d(4870),c=d(3066);const n={style:{"margin-top":"20px"}},s=(0,t._)("div",{style:{"margin-top":"10px","font-size":"14px"}}," 该功能运行，需要 Chrome 在 108 版本 ",-1);var l={__name:"cameraPlayerRealtime",setup(e){const a=(0,r.qj)({startMediaRecord:!1,pauseMediaRecord:!1,canplay:!1,mediaRecord:null,videoEL:null});async function d(){try{a.startMediaRecord?(a.mediaRecord.stop(),a.pauseMediaRecord=!1,a.startMediaRecord=!1):(await a.mediaRecord.start(),a.videoEL.srcObject=a.mediaRecord.mediaStream,a.startMediaRecord=!0)}catch(e){a.startMediaRecord=!1}}function l(){(0,c.yx)({download:!0,width:500,height:300,videoEl:"video"})}function u(){a.startMediaRecord&&(a.pauseMediaRecord?a.mediaRecord.resume():a.mediaRecord.pause(),a.pauseMediaRecord=!a.pauseMediaRecord)}return(0,t.bv)((()=>{a.videoEL=document.querySelector("video"),a.mediaRecord=new c.D3({mediaConstraints:{audio:!0,video:!0},download:!0})})),(e,r)=>{const c=i.mi;return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("video",{controls:"",muted:"",autoplay:"",width:"800",height:"600",onCanplay:r[0]||(r[0]=e=>a.canplay=!0)},null,32),(0,t._)("div",n,[(0,t.Wm)(c,{onClick:l,disabled:!a.canplay,type:"primary"},{default:(0,t.w5)((()=>[(0,t.Uk)("截图")])),_:1},8,["disabled"]),(0,t.Wm)(c,{onClick:d,type:"primary"},{default:(0,t.w5)((()=>[(0,t.Uk)((0,o.zw)(a.startMediaRecord?"停止":"录制"),1)])),_:1}),(0,t.Wm)(c,{onClick:u,type:"primary",disabled:!a.startMediaRecord},{default:(0,t.w5)((()=>[(0,t.Uk)((0,o.zw)(a.pauseMediaRecord?"恢复":"暂停"),1)])),_:1},8,["disabled"])]),s],64)}}};const u=l;var p=u}}]);
//# sourceMappingURL=camera-player-realtime.96c29af8.js.map