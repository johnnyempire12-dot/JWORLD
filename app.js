const app=document.getElementById('app');
const toastEl=document.getElementById('toast');
const cartBadge=document.getElementById('cartBadge');
let cart=Number(localStorage.getItem('jworld_cart')||0);
let currentView='home';

const worlds=[
 ['marketplace','🛒','MARKETPLACE','Shop products from trusted sellers.'],
 ['movies','🎬','MOVIES & SERIES','Watch and discover authorized media.'],
 ['apps','🎮','APPS & GAMES','Discover apps and games.'],
 ['music','🎵','MUSIC','Listen to songs, albums and playlists.'],
 ['books','📚','BOOKS','Buy, read and discover books.'],
 ['files','📁','FILES','Digital documents and assets.'],
 ['communities','👥','COMMUNITIES','Join, chat and build with others.'],
 ['news','📰','NEWS','Latest stories and updates.']
];
const content={
 marketplace:[['🛍️','Gaming Phone','₦250,000'],['💻','Creator Laptop','₦850,000'],['🎧','Wireless Headset','₦45,000'],['⌨️','RGB Keyboard','₦35,000'],['🖱️','Gaming Mouse','₦20,000'],['🎒','JWORLD Backpack','₦18,000']],
 movies:[['🎬','The Batman','₦7,500'],['🎬','Dune: Part Two','₦8,500'],['🎬','Interstellar','₦6,000'],['📺','The Last of Us','₦5,500'],['🎬','Kingdom Rising','₦7,000'],['📺','JWORLD Stories','₦4,500']],
 apps:[['🎮','Call of Duty: Mobile','Free'],['📱','AI Photo Editor Pro','₦2,900'],['🎮','Racing World','Free'],['📱','JWORLD Creator','Free'],['🎮','Kingdom Arena','₦4,500'],['📱','File Master','Free']],
 music:[['🎵','Good Vibes Only','₦1,500'],['🎤','African Nights','₦2,000'],['💿','JWORLD Sessions','₦1,800'],['🎧','Focus Flow','Free'],['🎵','Golden Hour','₦1,500'],['🎤','New World','₦2,200']],
 books:[['📖','The 7 Habits...','₦10,000'],['📕','Atomic Habits','₦8,500'],['📗','Business Builder','₦6,000'],['📘','Digital Kingdom','₦7,500'],['📙','Creator Mindset','₦5,500'],['📔','Modern Success','₦4,000']],
 files:[['📄','Business Plan Pack','₦3,000'],['🗜️','Design Resources ZIP','₦4,500'],['📊','Finance Templates','₦2,500'],['📁','Creator Toolkit','₦6,000'],['📄','Study Bundle','Free'],['🗃️','Software Pack','₦5,000']]
};
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1800)}
function setCart(n){cart=n;localStorage.setItem('jworld_cart',cart);cartBadge.textContent=cart}
function card(item,type){return `<article class="card"><div class="thumb">${item[0]}</div><div class="card-body"><h3>${item[1]}</h3><p>${type==='music'?'Artist / Album':type==='movies'?'Movie / Series':'JWORLD Creator'}</p><div class="price">${item[2]}</div><button class="btn alt" onclick="addToCart('${item[1].replaceAll("'","")}')">${type==='movies'?'Watch':type==='music'?'Listen':item[2]==='Free'?'Download':'Add to Cart'}</button></div></article>`}
function addToCart(name){setCart(cart+1);toast(name+' added to cart')}
function renderHome(){
 app.innerHTML=`<div class="view">
 <section class="hero"><div><div class="eyebrow">WELCOME TO</div><h1>J<span class="gold">WORLD</span></h1><h2>One Platform. Endless Worlds.</h2><p>Shop, stream, download and connect — everything you need in one powerful platform.</p><button class="btn" onclick="showView('marketplace')">Explore Now →</button> <button class="btn alt" onclick="toast('Upload workflow will open here')">Upload Content ☁</button></div></section>
 <section class="section"><div class="section-head"><div><h2>EXPLORE OUR WORLDS</h2><span class="muted">One platform. Endless possibilities.</span></div><button class="chip" onclick="toast('All sections are available below')">View All →</button></div><div class="world-grid">${worlds.map(w=>`<button class="world" onclick="showView('${w[0]}')"><span class="emoji">${w[1]}</span><b>${w[2]}</b><small>${w[3]}</small><span class="chip">Explore →</span></button>`).join('')}</div></section>
 <section class="section"><div class="section-head"><div><h2>🔥 TRENDING & FEATURED</h2><span class="muted">Handpicked for you</span></div><div class="toolbar"><span class="chip active">Trending</span><span class="chip">New</span><span class="chip">Popular</span><span class="chip">Recommended</span></div></div><div class="cards">${content.marketplace.slice(0,3).map(x=>card(x,'marketplace')).join('')}${content.movies.slice(0,1).map(x=>card(x,'movies')).join('')}${content.apps.slice(0,1).map(x=>card(x,'apps')).join('')}${content.books.slice(0,1).map(x=>card(x,'books')).join('')}</div></section>
 <section class="two-col"><div class="section"><div class="section-head"><div><h2>🧠 RECOMMENDED FOR YOU</h2><span class="muted">Based on activity</span></div></div><div class="cards">${content.movies.slice(0,2).map(x=>card(x,'movies')).join('')}${content.music.slice(0,2).map(x=>card(x,'music')).join('')}</div></div><div class="section"><div class="hero" style="margin:0;min-height:250px;padding:25px"><div><div class="eyebrow">💬 JWORLD COMMUNITIES</div><h2>Chat, share, build and belong.</h2><p>Discord-style communities connected to every JWORLD section.</p><button class="btn" onclick="showView('communities')">Explore Communities →</button></div></div></div></section>
 <section class="section"><div class="quick-grid"><button class="quick" onclick="showView('library')">📖<br>My Library</button><button class="quick" onclick="showView('cart')">🛒<br>Cart</button><button class="quick" onclick="showView('downloads')">📥<br>Downloads</button><button class="quick" onclick="showView('account')">👤<br>Profile</button></div></section>
 </div>`;
}
function renderSection(type){
 const title=worlds.find(w=>w[0]===type)?.[2]||type.toUpperCase();
 if(type==='communities') return renderCommunities();
 if(type==='news') return renderNews();
 const items=content[type]||content.marketplace;
 app.innerHTML=`<div class="view"><div class="page-head"><div class="eyebrow">JWORLD</div><h1>${title}</h1><p class="muted">Your dedicated ${title.toLowerCase()} mini-platform.</p></div>
 <div class="toolbar"><span class="chip active">🔥 Trending</span><span class="chip">🆕 New Releases</span><span class="chip">⭐ Top Rated</span><span class="chip">❤️ Favorites</span><span class="chip">🔎 Search</span></div>
 <section class="section"><div class="section-head"><h2>${type==='marketplace'?'🛍️ Products':type==='movies'?'🎬 Movies & Series':type==='apps'?'🎮 Apps & Games':type==='music'?'🎵 Music':type==='books'?'📚 Books':'📁 Digital Files'}</h2><span class="muted">${items.length} featured items</span></div><div class="cards">${items.map(x=>card(x,type)).join('')}</div></section>
 <section class="section"><h2>🧠 Recommended for You</h2><p class="muted">Personalized recommendations will use your JWORLD activity controls.</p></section></div>`;
}
function renderCommunities(){
 app.innerHTML=`<div class="view"><div class="page-head"><div class="eyebrow">JWORLD SOCIAL</div><h1>💬 Communities & Chat</h1><p class="muted">Servers, channels, DMs, voice, video, roles, threads and #JWORLD links.</p></div>
 <div class="community-layout"><aside class="servers"><div class="server-title">MY COMMUNITIES</div><div class="channel active">🌍 JWORLD Official</div><div class="channel">🎮 Gaming World</div><div class="channel">📚 Book Club</div><div class="channel">🎵 Music Hub</div><hr><button class="btn" onclick="toast('Create Community flow')">+ Create</button></aside>
 <section class="chat-area"><div class="chat-head"># general · JWORLD Official</div><div class="messages"><div class="msg"><b>JWORLD Bot</b><p>Welcome! Try a smart link like <span class="gold">#Games</span> or mention <span class="gold">@Johnny</span>.</p></div><div class="msg"><b>Johnny</b><p>Check this out: <span class="gold">#Marketplace</span> 🔥</p></div><div class="msg"><b>Sarah</b><p>Anyone joining the gaming event tonight?</p></div></div><div class="chat-compose"><input id="chatInput" placeholder="Message #general — try #Games or @Johnny"><button class="btn" onclick="sendMessage()">Send</button></div></section>
 <aside class="members"><div class="server-title">ONLINE — 4</div><div class="channel">🟢 Johnny</div><div class="channel">🟢 Sarah</div><div class="channel">🟢 Daniel</div><div class="channel">🟢 Alex</div><hr><div class="muted">Roles</div><div class="channel">👑 Owner</div><div class="channel">🛡️ Admin</div><div class="channel">🔨 Moderator</div></aside></div></div>`;
}
function sendMessage(){const input=document.getElementById('chatInput');if(!input.value.trim())return;toast('Message sent to #general');input.value=''}
function renderNews(){app.innerHTML=`<div class="view"><div class="page-head"><div class="eyebrow">JWORLD NEWS</div><h1>📰 Latest News</h1><p class="muted">Latest, trending and featured stories.</p></div><section class="section"><div class="cards">${['👑 JWORLD Launch','🎮 New Games Added','🎬 Top Movies This Week','📚 New Book Collection','🎵 New Music Releases','🌍 Community Events'].map((x,i)=>`<article class="card"><div class="thumb">${x.split(' ')[0]}</div><div class="card-body"><h3>${x.substring(2)}</h3><p>Stay informed with the latest JWORLD updates and stories.</p><button class="btn alt" onclick="toast('Opening article')">Read More →</button></div></article>`).join('')}</div></section></div>`}
function renderGeneric(title,icon,body){app.innerHTML=`<div class="view"><div class="page-head"><div class="eyebrow">JWORLD</div><h1>${icon} ${title}</h1><p class="muted">${body}</p></div><section class="section"><div class="notice">This JWORLD module is connected to your JWORLD ID. Full backend services will plug into this interface.</div><div class="quick-grid"><button class="quick" onclick="toast('Coming online in the next build')">⚙️ Settings</button><button class="quick" onclick="toast('Opening activity')">🕘 Activity</button><button class="quick" onclick="toast('Opening support')">🆘 Support</button><button class="quick" onclick="toast('Saved')">❤️ Saved</button></div></section></div>`}
function showView(view){currentView=view;document.querySelectorAll('.mainnav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));if(view==='home')renderHome();else if(['marketplace','movies','apps','music','books','files'].includes(view))renderSection(view);else if(view==='communities')renderCommunities();else if(view==='news')renderNews();else if(view==='library')renderGeneric('My Library','📖','Your purchased, saved, watched, played and downloaded content in one place.');else if(view==='account')renderGeneric('Account','👤','Your JWORLD ID, profile, orders, payments, privacy and security.');else if(view==='notifications')renderGeneric('Notifications','🔔','Social, shopping, media, payment and security notifications.');else if(view==='cart')renderGeneric('Cart','🛒',`You have ${cart} item(s) in your cart.`);else if(view==='downloads')renderGeneric('Downloads','📥','Active, paused, completed and failed downloads.');else if(view==='support')renderGeneric('Support','🆘','Get help with your account, purchases, content or communities.');window.scrollTo({top:0,behavior:'smooth'})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)showView(b.dataset.view)});
document.getElementById('searchBtn').onclick=()=>doSearch();
document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter')doSearch()});
function doSearch(){const q=document.getElementById('globalSearch').value.trim();if(!q){toast('Type something to search');return}app.innerHTML=`<div class="view"><div class="page-head"><div class="eyebrow">UNIVERSAL SEARCH</div><h1>🔎 Search Results</h1><p class="muted">Results for “${q.replaceAll('<','&lt;')}” across JWORLD.</p></div><div class="search-results"><div class="notice">Smart routing will classify results across Marketplace, Movies, Apps, Music, Books, Files, News, Users, Sellers and Communities.</div><section class="section"><div class="cards">${content.marketplace.slice(0,3).map(x=>card(x,'marketplace')).join('')}</div></section></div></div>`}
document.getElementById('menuBtn').onclick=()=>document.getElementById('mainNav').classList.toggle('open');
setCart(cart);renderHome();