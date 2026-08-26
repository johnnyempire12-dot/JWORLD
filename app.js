const toastEl=document.getElementById('toast');
let toastTimer;
function toast(msg){clearTimeout(toastTimer);toastEl.textContent=msg;toastEl.classList.add('show');toastTimer=setTimeout(()=>toastEl.classList.remove('show'),1800)}
document.querySelectorAll('.mainnav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.mainnav a').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){toast('Searching JWORLD for “'+e.target.value+'”')}});