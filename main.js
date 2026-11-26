const d=document,h=d.documentElement,$=s=>[...d.querySelectorAll(s)],q=s=>d.querySelector(s);
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},put=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const lg=q('#lg'),th=q('#th'),mn=q('#mn'),nv=q('nav'),pg=q('#pg');

$('[data-ar]').forEach(e=>e.dataset.en=e.innerHTML);

function lang(l){
  h.lang=l;h.dir=l=='ar'?'rtl':'ltr';
  $('[data-ar]').forEach(e=>e.innerHTML=l=='ar'?e.dataset.ar:e.dataset.en);
  lg.textContent=l=='ar'?'EN':'عربي';
  lg.setAttribute('aria-label',l=='ar'?'Switch to English':'التبديل إلى العربية');
  mn.setAttribute('aria-label',l=='ar'?'القائمة':'Menu');
  d.title=l=='ar'?'عبدالله محمد — مصمم جرافيك':'Abdallah Mohamed — Graphic Designer';
  put('l',l);
}
function theme(t){
  h.dataset.theme=t;
  th.setAttribute('aria-pressed',t=='dark');
  th.setAttribute('aria-label',t=='dark'?'Switch to light mode':'Switch to dark mode');
  put('t',t);
}
function menu(open){
  nv.classList.toggle('open',open);
  mn.setAttribute('aria-expanded',open);
  mn.textContent=open?'✕':'☰';
}

lg.addEventListener('click',()=>lang(h.lang=='ar'?'en':'ar'));
th.addEventListener('click',()=>theme(h.dataset.theme=='dark'?'light':'dark'));
mn.addEventListener('click',()=>menu(!nv.classList.contains('open')));
$('#menu a').forEach(a=>a.addEventListener('click',()=>menu(false)));

theme(get('t')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
lang(get('l')||'en');

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(a=>a.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:.12});
  $('.r').forEach(e=>io.observe(e));
}else $('.r').forEach(e=>e.classList.add('in'));

addEventListener('scroll',()=>{pg.style.width=scrollY/Math.max(1,h.scrollHeight-innerHeight)*100+'%'},{passive:true});
