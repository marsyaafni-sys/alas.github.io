/* ===================== DATA ===================== */
const NEWS = [
  {cat:'deforestation',
  en_t:'When Papuan Indigenous Peoples Protest the Release of Nearly 500 Thousand Hectares of Forest Area',
  id_t:'Masyarakat Adat Papua Protes Pelepasan Hampir 500 Ribu Hektar Kawasan Hutan',
  en_d:'The area of forest area that has been converted into other use...',
  id_d:'Luas kawasan hutan yang berubah jadi alokasi penggunaan lain...',
  img:'src/Papua-food-estate.jpeg',
  date_en:'June 21, 2026',
  date_id:'21 Juni 2026',
  link:'https://mongabay.co.id/2026/03/27/kala-masyarakat-adat-papua-protes-pelepasan-hampir-500-ribu-hektar-kawasan-hutan/'},
  
];

const GALLERY = [
  {h:380, loc_en:'Leuser Ecosystem, Aceh', loc_id:'Ekosistem Leuser, Aceh', type_en:'Tropical Rainforest', type_id:'Hutan Hujan Tropis', cap_en:'Dawn light through old growth', cap_id:'Cahaya fajar menembus hutan tua', img:'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'},
  {h:260, loc_en:'Berau Delta, East Kalimantan', loc_id:'Delta Berau, Kalimantan Timur', type_en:'Mangrove Forest', type_id:'Hutan Mangrove', cap_en:'Root systems at low tide', cap_id:'Sistem akar saat air surut', img:'https://images.unsplash.com/photo-1602430315712-c4a1d0e8f5f5?auto=format&fit=crop&w=600&q=80'},
  {h:320, loc_en:'Kerinci Seblat, Sumatra', loc_id:'Kerinci Seblat, Sumatra', type_en:'Mountain Forest', type_id:'Hutan Pegunungan', cap_en:'Mist rolling over the ridgeline', cap_id:'Kabut menyelimuti punggung bukit', img:'https://images.unsplash.com/photo-1486693128351-dd4ec9ec5d8c?auto=format&fit=crop&w=600&q=80'},
  {h:230, loc_en:'Sebangau, Central Kalimantan', loc_id:'Sebangau, Kalimantan Tengah', type_en:'Peat Forest', type_id:'Hutan Gambut', cap_en:'Blackwater river at dusk', cap_id:'Sungai air hitam saat senja', img:'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=600&q=80'},
  {h:300, loc_en:'Way Kambas, Lampung', loc_id:'Way Kambas, Lampung', type_en:'Lowland Forest', type_id:'Hutan Dataran Rendah', cap_en:'Elephant trail through tall grass', cap_id:'Jejak gajah melintasi rumput tinggi', img:'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=600&q=80'},
  {h:340, loc_en:'Raja Ampat, West Papua', loc_id:'Raja Ampat, Papua Barat', type_en:'Coastal Forest', type_id:'Hutan Pesisir', cap_en:'Karst islands meet the canopy', cap_id:'Pulau karst bertemu kanopi', img:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80'},
  {h:250, loc_en:'Gunung Leuser, North Sumatra', loc_id:'Gunung Leuser, Sumatra Utara', type_en:'Tropical Rainforest', type_id:'Hutan Hujan Tropis', cap_en:'Orangutan habitat at canopy level', cap_id:'Habitat orangutan setinggi kanopi', img:'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80'},
  {h:290, loc_en:'Tanjung Puting, Central Kalimantan', loc_id:'Tanjung Puting, Kalimantan Tengah', type_en:'Peat Forest', type_id:'Hutan Gambut', cap_en:'River boat passing flooded forest', cap_id:'Perahu sungai melintasi hutan terendam', img:'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80'},
];

/* ===================== LANGUAGE ===================== */
function setLang(lang){
  document.body.classList.remove('lang-en','lang-id');
  document.body.classList.add('lang-'+lang);
  document.getElementById('btnEn').classList.toggle('on', lang==='en');
  document.getElementById('btnId').classList.toggle('on', lang==='id');
  document.documentElement.lang = lang;
  const ph = document.getElementById('newsSearch');
  ph.placeholder = ph.getAttribute('data-ph-'+lang);
  updateBreadcrumb();
  updateSearchStatus();
  toastMsg(lang,'Language set to English','Bahasa diubah ke Indonesia', true);
}
let currentLang = 'en';
const _setLangOrig = setLang;
setLang = function(lang){ currentLang = lang; _setLangOrig(lang); };

/* ===================== TOAST ===================== */
function toastMsg(lang, enText, idText, silent){
  if(silent && false) return;
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className='toast';
  t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg><span>${currentLang==='en'?enText:idText}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>t.remove(), 2900);
}

/* ===================== RIPPLE BUTTON + NAV ===================== */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const r = document.createElement('span');
    r.className='ripple';
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size+'px';
    r.style.left = (e.clientX-rect.left-size/2)+'px';
    r.style.top = (e.clientY-rect.top-size/2)+'px';
    this.appendChild(r);
    setTimeout(()=>r.remove(),650);
  });
});
function rippleNav(e, target){
  document.querySelector(target).scrollIntoView({behavior:'smooth'});
}

/* ===================== NAV SCROLL STATE ===================== */
const headerNav = document.getElementById('siteNav');
const sections = ['home','explore','news','data','before-after','gallery','about'];
const navLinks = document.querySelectorAll('.nav-link');
const backBtn = document.getElementById('backToTop');
const breadcrumb = document.getElementById('breadcrumb');
const bcText = document.getElementById('bcText');
const bcNames = {
  home:{en:'Home', id:'Beranda'}, explore:{en:'Explore', id:'Jelajah'}, news:{en:'News', id:'Berita'},
  data:{en:'Data', id:'Data'}, 'before-after':{en:'Explore / Before & After', id:'Jelajah / Sebelum & Sesudah'},
  gallery:{en:'Gallery', id:'Galeri'}, about:{en:'About', id:'Tentang'}
};
let activeSec = 'home';
function updateBreadcrumb(){
  const n = bcNames[activeSec] || bcNames.home;
  bcText.textContent = ' / ' + (currentLang==='en'? n.en : n.id);
}

function onScroll(){
  const y = window.scrollY;
  headerNav.classList.toggle('solid', y>60);
  backBtn.classList.toggle('show', y>700);
  breadcrumb.classList.toggle('show', y>120);
  let current = 'home';
  for(const id of sections){
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top <= 140) current = id;
  }
  if(current!==activeSec){
    activeSec = current;
    navLinks.forEach(l=>l.classList.toggle('active', l.dataset.sec===current));
    updateBreadcrumb();
  }
  // reveal animations
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight*0.86) el.classList.add('in');
  });
}
window.addEventListener('scroll', onScroll, {passive:true});
backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

/* mobile menu toggle */
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
menuToggle.addEventListener('click', ()=>{
  const isOpen = mainMenu.style.display === 'flex';
  mainMenu.style.cssText = isOpen ? '' : 'display:flex;position:fixed;top:64px;left:0;right:0;flex-direction:column;background:rgba(247,245,239,0.98);padding:14px 24px;gap:4px;box-shadow:0 14px 30px rgba(0,0,0,0.1);';
  if(!isOpen){ mainMenu.querySelectorAll('a').forEach(a=>{a.style.color='var(--text)'; a.style.padding='12px 10px';}); }
});

/* ===================== NEWS: render, search, filter ===================== */
let activeCat = 'all';
let searchTerm = '';

function renderNews(){
  const grid = document.getElementById('newsGrid');
  const empty = document.getElementById('newsEmpty');
  let filtered = NEWS.filter(n=>{
    const matchCat = activeCat==='all' || n.cat===activeCat;
    const text = (currentLang==='en'? (n.en_t+' '+n.en_d) : (n.id_t+' '+n.id_d)).toLowerCase();
    const matchSearch = searchTerm==='' || text.includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  grid.innerHTML='';
  empty.classList.toggle('show', filtered.length===0);
  filtered.forEach((n,i)=>{
    const card = document.createElement('a');
    card.href = n.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'news-link';
    card.innerHTML = `
      <div class="news-card reveal in">
        <div class="nc-img">
          <img src="${n.img}" alt="">
        </div>
        <div class="nc-body">
          <div class="nc-cat">${capCat(n.cat)}</div>
          <h4>${currentLang==='en' ? n.en_t : n.id_t}</h4>
          <p>${currentLang==='en' ? n.en_d : n.id_d}</p>
          <div class="nc-meta">
            ${currentLang==='en' ? n.date_en : n.date_id}
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  updateSearchStatus(filtered.length);
}
function capCat(cat){
  const map = {
    deforestation:{en:'Deforestation',id:'Deforestasi'}, conservation:{en:'Conservation',id:'Konservasi'},
    restoration:{en:'Restoration',id:'Restorasi'}, policy:{en:'Policy',id:'Kebijakan'}
  };
  return currentLang==='en'? map[cat].en : map[cat].id;
}
function toggleBookmark(btn){
  btn.classList.toggle('saved');
  const saved = btn.classList.contains('saved');
  toastMsg(currentLang, saved?'Saved to bookmarks':'Removed from bookmarks', saved?'Disimpan ke markah':'Dihapus dari markah');
}
function updateSearchStatus(count){
  const el = document.getElementById('searchStatus');
  if(searchTerm==='' && activeCat==='all'){ el.innerHTML=''; return; }
  const n = count!==undefined? count : NEWS.filter(n=> (activeCat==='all'||n.cat===activeCat) && (searchTerm===''|| (currentLang==='en'?n.en_t:n.id_t).toLowerCase().includes(searchTerm.toLowerCase()))).length;
  const label = currentLang==='en'
    ? `Showing <b>${n}</b> result${n!==1?'s':''}${searchTerm?` for "<b>${searchTerm}</b>"`:''}<span class="clear-link" onclick="clearFilters()">Clear</span>`
    : `Menampilkan <b>${n}</b> hasil${searchTerm?` untuk "<b>${searchTerm}</b>"`:''}<span class="clear-link" onclick="clearFilters()">Hapus</span>`;
  el.innerHTML = label;
}
function clearFilters(){
  searchTerm=''; activeCat='all';
  document.getElementById('newsSearch').value='';
  document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active', c.dataset.cat==='all'));
  renderNews();
}
document.getElementById('newsSearch').addEventListener('input', e=>{
  searchTerm = e.target.value.trim();
  renderNews();
});
document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    renderNews();
  });
});

/* loading skeleton -> content */
setTimeout(()=>{
  document.getElementById('newsLoading').style.display='none';
  document.getElementById('newsContent').style.display='block';
  renderNews();
  onScroll();
}, 900);

/* re-render news text on language change without losing filters */
const _setLangFinal = setLang;
setLang = function(lang){ _setLangFinal(lang); if(document.getElementById('newsContent').style.display!=='none'){ renderNews(); } };

/* ===================== GALLERY ===================== */
const masonryGrid = document.getElementById('masonryGrid');
GALLERY.forEach(g=>{
  const item = document.createElement('div');
  item.className='masonry-item';
  item.innerHTML = `
    <img src="${g.img}" style="height:${g.h}px;object-fit:cover;" alt="">
    <div class="m-overlay">
      <div class="m-info">
        <div class="m-loc lang-en">${g.loc_en}</div><div class="m-loc lang-id">${g.loc_id}</div>
        <h5 class="lang-en">${g.type_en}</h5><h5 class="lang-id">${g.type_id}</h5>
        <p class="lang-en">${g.cap_en}</p><p class="lang-id">${g.cap_id}</p>
      </div>
    </div>`;
  masonryGrid.appendChild(item);
});

/* ===================== ANIMATED COUNTERS + PROGRESS ===================== */
let countersRun = false;
function runCounters(){
  if(countersRun) return; countersRun = true;
  document.querySelectorAll('.counter').forEach(c=>{
    const target = parseFloat(c.dataset.target);
    const decimals = c.dataset.target.includes('.') ? 1 : 0;
    let start = 0; const dur = 1400; const t0 = performance.now();
    function step(t){
      const p = Math.min((t-t0)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      const val = start + (target-start)*eased;
      c.textContent = decimals ? val.toFixed(1) : Math.round(val).toLocaleString();
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
  document.querySelectorAll('.progress-fill').forEach(f=>{
    f.style.width = f.dataset.fill+'%';
  });
}
const dataSection = document.getElementById('data');
const dataObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) runCounters(); });
},{threshold:0.3});
dataObserver.observe(dataSection);

/* ===================== BEFORE / AFTER SLIDER ===================== */
const baWrap = document.getElementById('baWrap');
const baAfter = document.getElementById('baAfter');
const baHandle = document.getElementById('baHandle');
let dragging = false;
function setSlider(clientX){
  const rect = baWrap.getBoundingClientRect();
  let pct = ((clientX-rect.left)/rect.width)*100;
  pct = Math.max(0, Math.min(100, pct));
  baAfter.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
  baHandle.style.left = pct+'%';
}
baHandle.addEventListener('mousedown', ()=>dragging=true);
window.addEventListener('mouseup', ()=>dragging=false);
window.addEventListener('mousemove', e=>{ if(dragging) setSlider(e.clientX); });
baHandle.addEventListener('touchstart', ()=>dragging=true, {passive:true});
window.addEventListener('touchend', ()=>dragging=false);
window.addEventListener('touchmove', e=>{ if(dragging && e.touches[0]) setSlider(e.touches[0].clientX); }, {passive:true});
baWrap.addEventListener('click', e=>{ if(e.target===baWrap) setSlider(e.clientX); });

/* ===================== INIT ===================== */
window.addEventListener('load', ()=>{ onScroll(); updateBreadcrumb(); });
