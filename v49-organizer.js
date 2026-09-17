(function(){
  const ids=['v9Panel','v10Panel','v11Panel','v12Panel','v13Panel','v14Panel','v15Panel','v17Panel','v18WallTools','v19SnapTools','v22RoomEngine','v22Workspace','v23MeasureTools','v24MeasureTools','v25Tools','v26Tools','v27Tools','v28Tools','v29Tools','v30Tools','v31Tools','rrv32','rrv33','rrv34','rrv35','rrv38','rrv42','rrv43','rrv44','rrv45','rrv46','rrv47'];
  const map={
    cabinet:['rrv42'],
    material:['rrv43','v31Tools','rrv32'],
    measure:['v23MeasureTools','v24MeasureTools','v25Tools','v26Tools','v27Tools','v28Tools','v29Tools','v30Tools'],
    manufacturing:['rrv44'],
    elevation:['rrv45','v29Tools'],
    presentation:['rrv46','rrv34','rrv35','rrv38'],
    catalogue:['v17Panel'],
    room:['v22RoomEngine','v22Workspace','v18WallTools','v19SnapTools']
  };
  function all(){return ids.flatMap(id=>Array.from(document.querySelectorAll('#'+id))).filter(Boolean)}
  function hideAll(){all().forEach(el=>el.classList.remove('rr49-open'))}
  function show(group){hideAll(); (map[group]||[]).forEach(id=>document.querySelectorAll('#'+id).forEach(el=>el.classList.add('rr49-open')));}
  function make(){
    if(document.getElementById('rr49')) return;
    const s=document.createElement('style'); s.id='rr49-style'; s.textContent=`
      ${ids.map(id=>'#'+id).join(',')}{display:none!important}
      ${ids.map(id=>'#'+id+'.rr49-open').join(',')}{display:block!important;visibility:visible!important;opacity:1!important}
      #rr49{position:fixed;right:12px;top:12px;z-index:2147483647;width:min(350px,calc(100vw - 24px));background:rgba(12,17,23,.97);color:#eef3f7;border:1px solid #526171;border-radius:14px;box-shadow:0 16px 50px #0009;font:12px/1.3 system-ui,Arial;padding:10px;backdrop-filter:blur(12px)}
      #rr49 .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.rr49title{font-size:15px;font-weight:800}.rr49sub{font-size:9px;color:#9eabb7}.rr49grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.rr49grid button{border:1px solid #465363;background:#202a34;color:#eef3f7;border-radius:8px;padding:8px 4px;font-weight:700;font-size:10px}.rr49grid button.active{background:#0ea5b7}.rr49hint{margin-top:7px;color:#aeb9c4;font-size:9px}.rr49close{border:1px solid #465363;background:#202a34;color:#fff;border-radius:7px;padding:5px 8px}
      @media(max-width:700px){#rr49{right:6px;left:6px;top:6px;width:auto}.rr49grid{grid-template-columns:repeat(3,1fr)} ${ids.map(id=>'#'+id+'.rr49-open').join(',')}{position:fixed!important;left:6px!important;right:6px!important;top:105px!important;width:auto!important;max-width:none!important;max-height:calc(100vh - 115px)!important;overflow:auto!important;z-index:2147483640!important}}
    `; document.head.appendChild(s);
    const p=document.createElement('div');p.id='rr49';p.innerHTML='<div class="head"><div><div class="rr49title">RR 3D Kitchen Planner</div><div class="rr49sub">V49 • Organized Workspace</div></div><button class="rr49close" id="rr49close">×</button></div><div class="rr49grid">'+[['room','Room'],['catalogue','Catalogue'],['cabinet','Cabinet'],['material','Material'],['measure','Measure'],['manufacturing','Manufacturing'],['elevation','Elevation'],['presentation','Presentation']].map(x=>'<button data-g="'+x[0]+'">'+x[1]+'</button>').join('')+'</div><div class="rr49hint">Only one advanced tool panel opens at a time. Room size and layout remain in the main workspace.</div>';
    document.body.appendChild(p);
    p.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{show(b.dataset.g);p.querySelectorAll('button[data-g]').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
    p.querySelector('#rr49close').onclick=()=>{hideAll();p.remove()};
    hideAll();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(make,300)); else setTimeout(make,300);
})();
