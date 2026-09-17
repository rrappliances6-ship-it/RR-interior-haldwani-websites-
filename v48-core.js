/* V48 — Core Room + Layout Integration Fix */
(()=>{
  const $=id=>document.getElementById(id);
  const legacy=['v9Panel','v11Panel','v12Panel','v13Panel','v14Panel','v15Panel','v16','v17Panel','v18WallTools','v19SnapTools','v20RoomEditor','v22RoomEngine','v22Workspace','v23MeasureTools','v24MeasureTools','v25Tools','v26Tools','v27Tools','v28Tools','v29Tools','v30Tools','v31Tools','rrv32','rrv33','rrv34','rrv35','rrv38'];
  const production=['rrv42','rrv43','rrv44','rrv45','rrv46'];
  function hideLegacy(){
    legacy.forEach(id=>document.querySelectorAll('#'+id).forEach(e=>e.style.setProperty('display','none','important')));
    production.forEach(id=>document.querySelectorAll('#'+id).forEach(e=>{
      const host=document.getElementById('rrv47content');
      if(host && e.parentElement!==host) host.appendChild(e);
      e.style.setProperty('position','static','important');
      e.style.setProperty('left','auto','important'); e.style.setProperty('right','auto','important');
      e.style.setProperty('top','auto','important'); e.style.setProperty('bottom','auto','important');
      e.style.setProperty('width','auto','important'); e.style.setProperty('max-width','none','important');
      e.style.setProperty('max-height','none','important'); e.style.setProperty('box-shadow','none','important');
    }));
  }
  function roomMm(){
    const r=window.rrV48Engine?.getRoom?.() || window.room || {L:4.2,W:3,H:3};
    return {L:Math.round((r.L||0)*1000),W:Math.round((r.W||0)*1000),H:Math.round((r.H||0)*1000)};
  }
  function updateRoomStatus(){
    const r=roomMm();
    let el=document.getElementById('rr48RoomStatus');
    if(!el){
      const sec=document.createElement('section'); sec.className='sec'; sec.id='rr48RoomCard';
      sec.innerHTML='<h3>V48 Room / Layout Status</h3><div id="rr48RoomStatus" class="status v6"></div><div class="rr48note">Room Size → Apply Room Size → choose Straight / Parallel / L-Shape / U-Shape / Island. The selected dimensions are used by the layout generator.</div>';
      const side=document.getElementById('side');
      const roomSec=side?.querySelector('.sec');
      if(side && roomSec) side.insertBefore(sec, roomSec.nextElementSibling);
      el=document.getElementById('rr48RoomStatus');
    }
    if(el) el.textContent=`Room: ${r.L} × ${r.W} × ${r.H} mm`;
  }
  function applyRoom(){
    const L=Number($('roomL')?.value), W=Number($('roomW')?.value), H=Number($('roomH')?.value);
    if(!(L>0&&W>0&&H>0)){ alert('Please enter valid Room Length, Width and Height.'); return; }
    const r={L:L/1000,W:W/1000,H:H/1000};
    if(window.rrV48Engine?.setRoom) window.rrV48Engine.setRoom(r);
    else window.room=r;
    $('roomL').value=L; $('roomW').value=W; $('roomH').value=H;
    try{ window.rrV48Engine?.buildRoom?.(); }catch(e){}
    try{ window.fitRoom?.(); }catch(e){}
    updateRoomStatus();
    const toast=document.getElementById('v9Toast'); if(toast){toast.textContent=`Room updated: ${L} × ${W} × ${H} mm`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
  }
  function patchLayoutButtons(){
    document.querySelectorAll('[data-layout]').forEach(b=>{
      if(b.dataset.v48patched)return;
      b.dataset.v48patched='1';
      b.onclick=()=>{
        const type=b.dataset.layout;
        if(type==='clear'){window.rrV48Engine?.clearUnits?.(); updateRoomStatus(); return;}
        // Replace the legacy handler so the layout is generated exactly once.
        try{ window.rrV48Engine?.preset?.(type); updateRoomStatus(); }catch(e){console.error(e)}
      };
    });
  }
  function boot(){
    hideLegacy();
    const old=$('applyRoom'); if(old && !old.dataset.v48patched){old.dataset.v48patched='1';old.onclick=applyRoom;}
    patchLayoutButtons(); updateRoomStatus();
    const badge=document.querySelector('.v9-badge'); if(badge)badge.textContent='RR PLANNER V48';
    const brand=document.querySelector('.brand span'); if(brand)brand.textContent='V48';
    // Ensure V47's managed panels stay inside its single workspace even though their legacy CSS says fixed.
    setTimeout(hideLegacy,250); setTimeout(hideLegacy,1000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.rrV48={applyRoom,roomMm,refresh:()=>{hideLegacy();patchLayoutButtons();updateRoomStatus();}};
})();
