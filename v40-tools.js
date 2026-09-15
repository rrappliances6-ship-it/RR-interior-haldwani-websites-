(function(){
  const old=document.getElementById('rrv40'); if(old) old.remove();
  const box=document.createElement('div'); box.id='rrv40'; box.style='position:fixed;right:14px;bottom:14px;width:330px;max-height:78vh;overflow:auto;background:#111827;color:#fff;padding:14px;border-radius:14px;z-index:99999;font:13px Arial;box-shadow:0 10px 30px #0008';
  box.innerHTML='<b style="font-size:16px">V40 • Client Presentation Board</b><div style="color:#aab3c5;margin:5px 0 10px">Professional presentation + client preview</div>'+
  '<input id="v40proj" placeholder="Project name" style="width:100%;padding:8px;margin:3px 0;border-radius:7px;border:1px solid #374151;background:#1f2937;color:white">'+
  '<input id="v40client" placeholder="Client name" style="width:100%;padding:8px;margin:3px 0;border-radius:7px;border:1px solid #374151;background:#1f2937;color:white">'+
  '<input id="v40designer" placeholder="Designer name" style="width:100%;padding:8px;margin:3px 0 8px;border-radius:7px;border:1px solid #374151;background:#1f2937;color:white">'+
  '<button id="v40capture">Capture 3D Preview</button> <button id="v40board">Generate Board</button><br><br>'+
  '<button id="v40front">Front</button> <button id="v40top">Top</button> <button id="v40persp">Perspective</button> <button id="v40fit">Fit Room</button><br><br>'+
  '<button id="v40print">Print Client Board</button> <button id="v40json">Export Board JSON</button><br><br><div id="v40status" style="color:#9ca3af"></div><div id="v40preview"></div>';
  document.body.appendChild(box);
  box.querySelectorAll('button').forEach(b=>{b.style='padding:7px 9px;margin:2px;border:0;border-radius:7px;background:#374151;color:#fff;cursor:pointer'});
  const status=t=>box.querySelector('#v40status').textContent=t;
  let capture=null;
  function sceneObjects(){ return (window.objects||window.rrObjects||[]).filter(o=>o&&o.isObject3D); }
  function specs(){
    const arr=sceneObjects();
    return arr.map((o,i)=>{const b=new THREE.Box3().setFromObject(o),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3());return {No:i+1,Name:o.name||o.userData?.type||'Object',Width_mm:+(s.x*1000).toFixed(1),Height_mm:+(s.y*1000).toFixed(1),Depth_mm:+(s.z*1000).toFixed(1),X_mm:+(c.x*1000).toFixed(1),Y_mm:+(c.y*1000).toFixed(1),Z_mm:+(c.z*1000).toFixed(1),Finish:o.userData?.rrV32?.finish||o.userData?.v32?.finish||'',Handle:o.userData?.rrV32?.handle||o.userData?.v32?.handle||''};});
  }
  function cameraCall(name){ try{ if(typeof window[name]==='function') window[name](); else status(name+' view requested'); }catch(e){status(e.message)} }
  box.querySelector('#v40front').onclick=()=>cameraCall('frontView');
  box.querySelector('#v40top').onclick=()=>cameraCall('topView');
  box.querySelector('#v40persp').onclick=()=>cameraCall('resetView');
  box.querySelector('#v40fit').onclick=()=>cameraCall('fitRoom');
  box.querySelector('#v40capture').onclick=()=>{try{const r=window.renderer;if(!r){status('Renderer not available');return;} capture=r.domElement.toDataURL('image/png');box.querySelector('#v40preview').innerHTML='<img style="width:100%;margin-top:8px;border-radius:8px" src="'+capture+'">';status('3D preview captured');}catch(e){status(e.message)}};
  box.querySelector('#v40board').onclick=()=>{const data={version:'V40',project:box.querySelector('#v40proj').value||'RR Kitchen Project',client:box.querySelector('#v40client').value||'',designer:box.querySelector('#v40designer').value||'',created:new Date().toISOString(),object_count:specs().length,specifications:specs()};localStorage.setItem('RR_V40_BOARD',JSON.stringify(data));status('Presentation board data saved locally');};
  box.querySelector('#v40json').onclick=()=>{const data={version:'V40',project:box.querySelector('#v40proj').value||'RR Kitchen Project',client:box.querySelector('#v40client').value||'',designer:box.querySelector('#v40designer').value||'',created:new Date().toISOString(),specifications:specs()};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='RR-V40-client-presentation.json';a.click();status('JSON exported');};
  box.querySelector('#v40print').onclick=()=>{const d={project:box.querySelector('#v40proj').value||'RR Kitchen Project',client:box.querySelector('#v40client').value||'',designer:box.querySelector('#v40designer').value||'',specifications:specs()};const w=window.open('','_blank');if(!w){status('Popup blocked');return;}w.document.write('<html><head><title>RR Client Presentation</title><style>body{font:12px Arial;padding:28px}h1{margin-bottom:4px}table{border-collapse:collapse;width:100%;margin-top:18px}th,td{border:1px solid #999;padding:6px}th{background:#eee}</style></head><body><h1>RR 3D Kitchen Planner — Client Presentation</h1><div><b>Project:</b> '+d.project+' &nbsp; <b>Client:</b> '+d.client+' &nbsp; <b>Designer:</b> '+d.designer+'</div><h3>Design Specification</h3><table><tr><th>No.</th><th>Object</th><th>W</th><th>H</th><th>D</th><th>X</th><th>Y</th><th>Z</th><th>Finish</th><th>Handle</th></tr>'+d.specifications.map(x=>'<tr><td>'+x.No+'</td><td>'+x.Name+'</td><td>'+x.Width_mm+'</td><td>'+x.Height_mm+'</td><td>'+x.Depth_mm+'</td><td>'+x.X_mm+'</td><td>'+x.Y_mm+'</td><td>'+x.Z_mm+'</td><td>'+x.Finish+'</td><td>'+x.Handle+'</td></tr>').join('')+'</table><p>All dimensions in mm. Verify site measurements before manufacturing/installation.</p><script>window.print()</script></body></html>');w.document.close();};
  status('Ready • '+sceneObjects().length+' objects detected');
})();
