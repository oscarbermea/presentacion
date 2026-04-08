/* Exelco Auth — sesión por sessionStorage */
const USERS = { exelco:'Consejo2026', oscar:'Exelco2026!', admin:'Admin#2026', finanzas:'Fin2026$' };
const SK = 'ex_2026_auth';

function isLoggedIn(){ return !!sessionStorage.getItem(SK); }

function doLogin(){
  const u = document.getElementById('lu')?.value.trim().toLowerCase();
  const p = document.getElementById('lp')?.value;
  const e = document.getElementById('lerr');
  if(USERS[u] && USERS[u]===p){
    sessionStorage.setItem(SK, btoa(u+':'+Date.now()));
    document.getElementById('lov').classList.add('hide');
    if(e) e.textContent='';
  } else {
    if(e) e.textContent='Usuario o contraseña incorrectos.';
    const lp = document.getElementById('lp');
    if(lp) lp.value='';
  }
}

function doLogout(){ sessionStorage.removeItem(SK); location.reload(); }

function goM(id, btn){
  document.querySelectorAll('.mpnl').forEach(p=>p.classList.remove('on'));
  btn.closest('.mtabs').querySelectorAll('.mtab').forEach(b=>b.classList.remove('on'));
  document.getElementById('m-'+id).classList.add('on');
  btn.classList.add('on');
}

/* ── Dark Mode ─────────────────────────────────────────────────────── */
function toggleDark(){
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ex_dark', isDark ? '1' : '');
  const icon = isDark ? '☀️' : '🌙';
  document.querySelectorAll('.dm-topbar-btn, .l-dm-btn').forEach(b=>{ b.textContent = icon; });
}

function togglePwd(){
  const lp = document.getElementById('lp');
  if(lp) lp.type = lp.type === 'password' ? 'text' : 'password';
}

/* ── Login Template ────────────────────────────────────────────────── */
function buildLoginHTML(){
  const dark = document.documentElement.classList.contains('dark');
  const icon = dark ? '☀️' : '🌙';
  return `
  <div class="l-panel-left">
    <div class="l-brand-row">
      <img src="exelco.ico" alt="Exelco" class="l-brand-ico">
      <div>
        <div class="l-brand-name">Exelco</div>
        <div class="l-brand-sub">Dashboard 2026</div>
      </div>
    </div>
    <div class="l-hero">
      <h1 class="l-hero-title">Inteligencia<br>financiera en<br>tiempo real</h1>
      <p class="l-hero-desc">Accede a los KPIs, paneles ejecutivos y visualizaciones consolidadas del Grupo Exelco para el ejercicio 2026.</p>
      <div class="l-stats-grid">
        <div class="l-stat-box"><span class="l-stat-n">2</span><span class="l-stat-l">Meses</span></div>
        <div class="l-stat-box"><span class="l-stat-n">13</span><span class="l-stat-l">Paneles</span></div>
        <div class="l-stat-box"><span class="l-stat-n">300+</span><span class="l-stat-l">KPIs</span></div>
        <div class="l-stat-box"><span class="l-stat-n">5</span><span class="l-stat-l">Divisiones</span></div>
      </div>
    </div>
    <div class="l-conf">EXELCO · CONFIDENCIAL · ENE–FEB 2026</div>
  </div>
  <div class="l-panel-right">
    <button class="l-dm-btn" onclick="toggleDark()" title="Modo oscuro / claro">${icon}</button>
    <div class="l-form-inner">
      <div class="l-access-badge">🔒 Acceso Seguro</div>
      <h2 class="l-form-title">Iniciar sesión</h2>
      <p class="l-form-sub">Ingresa tus credenciales para acceder al dashboard financiero del Grupo Exelco.</p>
      <div class="l-fld">
        <label class="l-lbl" for="lu">Usuario</label>
        <div class="l-inp-wrap">
          <span class="l-inp-ico">👤</span>
          <input id="lu" class="l-inp" type="text" placeholder="Ingresa tu usuario" autocomplete="username">
        </div>
      </div>
      <div class="l-fld">
        <label class="l-lbl" for="lp">Contraseña</label>
        <div class="l-inp-wrap">
          <span class="l-inp-ico">🔐</span>
          <input id="lp" class="l-inp" type="password" placeholder="Ingresa tu contraseña" autocomplete="current-password">
          <button class="l-eye-btn" onclick="togglePwd()" type="button" title="Mostrar contraseña">👁</button>
        </div>
      </div>
      <button class="l-submit-btn" onclick="doLogin()">Entrar al dashboard →</button>
      <div id="lerr" class="lerr l-err"></div>
    </div>
  </div>`;
}

/* ── Init ──────────────────────────────────────────────────────────── */
(function initAuth(){
  // Dark mode: aplica antes del render para evitar flash
  if(localStorage.getItem('ex_dark')) document.documentElement.classList.add('dark');

  document.addEventListener('DOMContentLoaded', ()=>{
    // Inyecta el nuevo login HTML
    const lov = document.getElementById('lov');
    if(lov){
      lov.innerHTML = buildLoginHTML();
      lov.classList.toggle('hide', isLoggedIn());
    }

    // Keyboard shortcuts en los campos
    document.getElementById('lu')?.addEventListener('keydown', e=>{
      if(e.key==='Enter') document.getElementById('lp')?.focus();
    });
    document.getElementById('lp')?.addEventListener('keydown', e=>{
      if(e.key==='Enter') doLogin();
    });

    // Botón de modo oscuro en el topbar
    const tbRight = document.querySelector('.tb-right');
    if(tbRight && !tbRight.querySelector('.dm-topbar-btn')){
      const btn = document.createElement('button');
      btn.className = 'dm-topbar-btn logoutb';
      btn.title = 'Modo oscuro / claro';
      btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
      btn.onclick = toggleDark;
      tbRight.insertBefore(btn, tbRight.firstChild);
    }
  });
})();
