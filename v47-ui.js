/* V47 Production UI Cleanup & Core Consolidation */
(()=>{
  const legacyIds=['v9Panel','v11Panel','v12Panel','v13Panel','v14Panel','v15Panel','v16','v17Panel','v18WallTools','v19SnapTools','v20RoomEditor','v22RoomEngine','v22Workspace','v23MeasureTools','v24MeasureTools','v25Tools','v26Tools','v27Tools','v28Tools','v29Tools','v30Tools','v31Tools','rrv32','rrv33','rrv34','rrv35','rrv38','rrv42','rrv43','rrv44','rrv45','rrv46'];
  const managed=['rrv42','rrv43','rrv44','rrv45','rrv46'];
  function all(id){return [...document.querySelectorAll('#'+id)];}
  function first(id){return all(id)[0]||null;}
  function hideAll(){legacyIds.forEach(id=>all(id).forEach(el=>{el.classList.remove('rr-v47-active');el.style.setProperty('display','none','important')}));}
  function show(id){hideAll(); const el=first(id); if(!el)return; el.classList.add('rr-v47-active'); el.style.setProperty('display','block','important'); const host=document.getElementById('rrv47content'); if(host && el.parentElement!==host) host.appendChild(el);}
  function setStatus(t){const s=document.getElementById('rrv47status'); if(s)s.textContent=t}
  function activate(tab,id,label){document.querySelectorAll('.rr47tab').forEach(b=>b.classList.toggle('active',b.dataset.target===id));show(id);setStatus(label+' tools active.');}
  function refresh(){
    let n=0; try{n=window.rrCore?.objects?.().length||0}catch(e){};
    const c=document.getElementById('rr47count'); if(c)c.textContent=n+' Objects';
  }
  function boot(){
    if(document.getElementById('rrv47')) return;
    hideAll();
    const shell=document.createElement('section'); shell.id='rrv47'; shell.innerHTML=`
      <header class="rr47head"><div><div class="rr47brand">RR 3D Kitchen Planner</div><div class="rr47sub">V47 • Production Workspace</div></div><div class="rr47headright"><span id="rr47count" class="rr47pill">0 Objects</span><button id="rr47collapse" title="Minimize">−</button></div></header>
      <nav class="rr47tabs">
        <button class="rr47tab active" data-target="rrv42">Cabinet</button>
        <button class="rr47tab" data-target="rrv43">Material</button>
        <button class="rr47tab" data-target="rrv44">Manufacturing</button>
        <button class="rr47tab" data-target="rrv45">Elevation</button>
        <button class="rr47tab" data-target="rrv46">Client</button>
      </nav>
      <div class="rr47body"><div id="rrv47content"></div></div>
      <footer class="rr47foot"><span id="rrv47status">Production workspace ready.</span><button id="rr47hide">Hide tools</button></footer>`;
    document.body.appendChild(shell);
    const content=document.getElementById('rrv47content');
    managed.forEach(id=>{const el=first(id); if(el)content.appendChild(el)});
    document.querySelectorAll('.rr47tab').forEach(b=>b.onclick=()=>activate(b,b.dataset.target,b.textContent));
    document.getElementById('rr47collapse').onclick=()=>shell.classList.toggle('rr47-min');
    document.getElementById('rr47hide').onclick=()=>{shell.classList.add('rr47-min');setStatus('Tools minimized. Tap the RR button to reopen.');};
    const reopen=document.createElement('button'); reopen.id='rr47reopen'; reopen.textContent='RR Tools'; reopen.title='Open production tools'; document.body.appendChild(reopen); reopen.onclick=()=>shell.classList.remove('rr47-min');
    show('rrv42'); refresh(); setInterval(refresh,1000);
    window.rrV47={open:id=>show(id||'rrv42'),hide:()=>shell.classList.add('rr47-min'),refresh};
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
