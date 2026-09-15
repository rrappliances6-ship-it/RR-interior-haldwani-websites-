/* RR 3D Kitchen Planner V41 — Core Stability Layer */
(function(){
  'use strict';
  const VERSION='V41';
  const state=window.rrCore=window.rrCore||{};
  state.version=VERSION;
  state.objects=()=>Array.isArray(window.objects)?window.objects.filter(o=>o&&o.isObject3D):[];
  state.selected=()=>window.selected||window.rrSelected||null;
  state.scene=()=>window.scene||window.sceneGroup||null;
  state.setSelected=function(o){ window.selected=o||null; window.rrSelected=o||null; if(o) o.userData=o.userData||{},o.userData.rrSelected=true; state.refresh(); };
  state.refresh=function(){ try{window.refreshUI?.()}catch(e){}; try{window.r35Refresh?.()}catch(e){}; try{window.r38Refresh?.()}catch(e){} };
  state.snapshot=function(){
    return state.objects().map((o,i)=>{const b=o.userData||{}; return {i,name:o.name||b.name||('Object '+(i+1)),x:o.position.x,y:o.position.y,z:o.position.z,rx:o.rotation.x,ry:o.rotation.y,rz:o.rotation.z,sx:o.scale.x,sy:o.scale.y,sz:o.scale.z,userData:{rrV32:b.rrV32||null}}});
  };
  state.diagnostics=function(){
    const a=state.objects(), ids=new Set(), dup=[];
    a.forEach(o=>{const id=o.userData?.rrId;if(id){if(ids.has(id))dup.push(id);ids.add(id)}});
    return {version:VERSION,objects:a.length,selected:!!state.selected(),duplicateIds:dup.length,scene:!!state.scene(),three:!!window.THREE};
  };
  function addPanel(){
    if(document.getElementById('rrv41')) return;
    const d=document.createElement('div'); d.id='rrv41';
    d.style.cssText='position:fixed;right:14px;bottom:14px;width:300px;background:#111827;color:#e5e7eb;border:1px solid #374151;border-radius:12px;padding:12px;z-index:99999;font:12px Arial;box-shadow:0 12px 30px #0005';
    d.innerHTML='<div style="font-weight:700;font-size:14px;margin-bottom:8px">RR V41 • Core Stability</div><div id="rrv41stat" style="line-height:1.55">Checking…</div><div style="display:flex;gap:6px;margin-top:9px;flex-wrap:wrap"><button id="rrv41refresh">Refresh</button><button id="rrv41diag">Diagnostics</button><button id="rrv41save">Scene Snapshot</button></div><pre id="rrv41out" style="white-space:pre-wrap;max-height:120px;overflow:auto;margin:8px 0 0"></pre>';
    document.body.appendChild(d);
    d.querySelectorAll('button').forEach(b=>b.style.cssText='background:#1f2937;color:#fff;border:1px solid #4b5563;border-radius:7px;padding:5px 8px;cursor:pointer');
    const update=()=>{const x=state.diagnostics();document.getElementById('rrv41stat').textContent=`Objects: ${x.objects} • Selected: ${x.selected?'Yes':'No'} • Three.js: ${x.three?'OK':'Missing'} • Scene: ${x.scene?'OK':'Missing'}`};
    document.getElementById('rrv41refresh').onclick=()=>{state.refresh();update();document.getElementById('rrv41out').textContent='Core UI refreshed.'};
    document.getElementById('rrv41diag').onclick=()=>{update();document.getElementById('rrv41out').textContent=JSON.stringify(state.diagnostics(),null,2)};
    document.getElementById('rrv41save').onclick=()=>{const blob=new Blob([JSON.stringify({version:VERSION,created:new Date().toISOString(),objects:state.snapshot()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='RR-V41-scene-snapshot.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);document.getElementById('rrv41out').textContent='Scene snapshot exported.'};
    update();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addPanel); else addPanel();
})();
