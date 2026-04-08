/* Exelco Auth — sesión por sessionStorage */
const USERS = { exelco:'Consejo2026', oscar:'Exelco2026!', admin:'Admin#2026' };
const SK = 'ex_2026_auth';

function isLoggedIn(){ return !!sessionStorage.getItem(SK); }

function doLogin(){
  const u = document.getElementById('lu').value.trim().toLowerCase();
  const p = document.getElementById('lp').value;
  const e = document.getElementById('lerr');
  if(USERS[u] && USERS[u]===p){
    sessionStorage.setItem(SK, btoa(u+':'+Date.now()));
    document.getElementById('lov').classList.add('hide');
    e.textContent='';
  } else {
    e.textContent='Usuario o contraseña incorrectos.';
    document.getElementById('lp').value='';
  }
}

function doLogout(){ sessionStorage.removeItem(SK); location.reload(); }

function goM(id, btn){
  document.querySelectorAll('.mpnl').forEach(p=>p.classList.remove('on'));
  btn.closest('.mtabs').querySelectorAll('.mtab').forEach(b=>b.classList.remove('on'));
  document.getElementById('m-'+id).classList.add('on');
  btn.classList.add('on');
}

(function initAuth(){
  if(!isLoggedIn()) document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('lov').classList.remove('hide');
  });
  document.addEventListener('DOMContentLoaded', ()=>{
    const lu=document.getElementById('lu');
    if(lu) lu.addEventListener('keydown', e=>{ if(e.key==='Enter') document.getElementById('lp').focus(); });
    const lp=document.getElementById('lp');
    if(lp) lp.addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });
    if(isLoggedIn()) document.getElementById('lov')?.classList.add('hide');
  });
})();
