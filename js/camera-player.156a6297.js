"use strict";(self["webpackChunkvideo_player_demo"]=self["webpackChunkvideo_player_demo"]||[]).push([[841],{6709:function(e,a,d){d.r(a),d.d(a,{default:function(){return m}});var r=d(4169),i=(d(6809),d(7658),d(3396)),t=d(4870),o=d(7139),c=d(3066),n=d(2483);const s=["src"],l={style:{"margin-top":"20px"}};var u={__name:"cameraPlayer",setup(e){const a=(0,n.tv)(),d=(0,t.qj)({startMediaRecord:!1,pauseMediaRecord:!1,canplay:!1,mediaRecord:null}),u=(0,i.Fl)((()=>d.mediaRecord?.url??""));async function p(){try{d.startMediaRecord?(d.mediaRecord.stop(),d.pauseMediaRecord=!1,d.startMediaRecord=!1):(await d.mediaRecord.start(),d.startMediaRecord=!0)}catch(e){d.startMediaRecord=!1}}function m(){(0,c.yx)({download:!0,width:500,height:300,videoEl:"video"})}function R(){d.startMediaRecord&&(d.pauseMediaRecord?d.mediaRecord.resume():d.mediaRecord.pause(),d.pauseMediaRecord=!d.pauseMediaRecord)}return(0,i.bv)((()=>{d.mediaRecord=new c.D3({mediaConstraints:{audio:!0,video:!0},download:!1})})),(e,c)=>{const n=r.mi;return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,t.SU)(u)?((0,i.wg)(),(0,i.iD)("video",{key:0,src:(0,t.SU)(u),controls:"",muted:"",width:"800",height:"600",onCanplay:c[0]||(c[0]=e=>d.canplay=!0)},null,40,s)):(0,i.kq)("",!0),(0,i._)("div",l,[(0,i.Wm)(n,{onClick:m,disabled:!d.canplay,type:"primary"},{default:(0,i.w5)((()=>[(0,i.Uk)("截图")])),_:1},8,["disabled"]),(0,i.Wm)(n,{onClick:p,type:"primary"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(d.startMediaRecord?"停止":"录制"),1)])),_:1}),(0,i.Wm)(n,{onClick:R,type:"primary",disabled:!d.startMediaRecord},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(d.pauseMediaRecord?"恢复":"暂停"),1)])),_:1},8,["disabled"]),(0,i.Wm)(n,{onClick:c[1]||(c[1]=e=>(0,t.SU)(a).push("camera-player-realtime")),link:""},{default:(0,i.w5)((()=>[(0,i.Uk)("想看实时录制，点这里")])),_:1})])],64)}}};const p=u;var m=p}}]);
//# sourceMappingURL=camera-player.156a6297.js.map