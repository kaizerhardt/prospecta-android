const prospectSeed = [
  {name:'Harmony Music School',email:'info@harmonymusicschool.net',sector:'Music Education',fit:'Strong',score:88,status:'Qualified',gap:'The school has a broad lesson offering, but course discovery and local search visibility can be made more direct for parents actively comparing music lessons.',pitch:'Google visibility + enquiry conversion',why:'Their customer journey starts with high-intent searches such as piano, violin and children’s music lessons. Improving discovery and trial-enquiry flow ties directly to enrolments.'},
  {name:'Polaris Music Academy',email:'info@polarismusicacademy.com',sector:'Music Education',fit:'Strong',score:91,status:'Qualified',gap:'Premium boutique positioning is clear, creating an opportunity to capture more high-intent searches and turn premium interest into trial bookings.',pitch:'Paid search + premium landing pages',why:'Higher-value lesson packages give the school room to spend on qualified acquisition rather than competing purely on price.'},
  {name:'Vibratone Academy',email:'hello@vibratoneacademy.com',sector:'Music Education',fit:'Strong',score:84,status:'Qualified',gap:'Multi-instrument programmes create many separate search intents, but the acquisition path can be structured more clearly around instrument and exam goals.',pitch:'SEO architecture + CRO',why:'Dedicated high-intent pages can turn existing service breadth into more discoverable enrolment routes.'},
  {name:'Dandelion School of Music',email:'dandelionschoolofmusic.sg@gmail.com',sector:'Music Education',fit:'Strong',score:82,status:'Qualified',gap:'An established student base provides social proof; the commercial opportunity is to convert that credibility into stronger trial-class acquisition.',pitch:'Local SEO + Google Ads',why:'Parents searching nearby are already close to enrolment, making local discovery commercially meaningful.'},
  {name:'Rocktone Music Academy',email:'office@rocktonemusic.com',sector:'Music Education',fit:'Good',score:77,status:'Qualified',gap:'Contemporary music programmes lend themselves to youth and adult campaigns, but search and social acquisition can be better separated by audience.',pitch:'Google + Meta acquisition',why:'Different lesson segments respond to different acquisition channels, so campaign segmentation can improve lead quality.'},
  {name:'The Music Shed',email:'contact@themusicshedsg.com',sector:'Music Education',fit:'Good',score:75,status:'Qualified',gap:'Multiple locations create a straightforward local-search opportunity around neighbourhood-specific lesson demand.',pitch:'Multi-location local SEO',why:'Each location can capture its own nearby search demand and reduce dependence on broad brand discovery.'},
  {name:'Casa Musica',email:'hello@casamusicasg.com',sector:'Music Education',fit:'Good',score:73,status:'Qualified',gap:'The contemporary positioning is appealing, but the trial-to-enrolment path can be more conversion-led.',pitch:'Landing page CRO + Meta',why:'The business can use stronger audience-specific creative and clearer trial conversion steps to turn interest into booked lessons.'},
  {name:'Juzmusic Academy',email:'info@juzmusic.com',sector:'Music Education',fit:'Strong',score:86,status:'Qualified',gap:'Long operating history and broad programme depth create a strong trust base that can be translated into more targeted programme acquisition.',pitch:'Search demand capture + CRO',why:'Established operators can justify acquisition spend when each new student has recurring lifetime value.'},
  {name:'LVL Music Academy',email:'contact@lvlmusicacademy.com',sector:'Music Education',fit:'Strong',score:89,status:'Qualified',gap:'Premium violin and piano positioning is ideal for high-intent search acquisition and premium comparison journeys.',pitch:'Premium SEO + paid search',why:'The customer value is high enough for targeted acquisition, especially for exam-oriented and premium learners.'},
  {name:'Two Clef Music Academy',email:'info@twoclefmusic.com',sector:'Music Education',fit:'Good',score:76,status:'Qualified',gap:'Local demand and multiple instruments create an opportunity for more structured service pages and trial conversion.',pitch:'Local SEO + website CRO',why:'Clearer high-intent entry points can move nearby families from search to trial booking faster.'}
];

const templateLibrary = [
  {id:'music',name:'Music school enrolment',industry:'Education',objective:'Trial lessons & enrolments',recommended:true,body:'Hi {{company}} team,\n\nI came across {{company}} and noticed {{opportunity}}. Based on your programmes, there may be an opportunity to {{business_outcome}}.\n\n{{proof_or_reason}}\n\nWould next week work for a short call?\n\n{{signature}}'},
  {id:'clinic',name:'Clinic appointment growth',industry:'Healthcare',objective:'Appointment enquiries',body:'Hi {{company}} team,\n\nI was looking at {{company}} and noticed {{opportunity}}. There may be room to {{business_outcome}} while keeping the patient journey simple.\n\n{{proof_or_reason}}\n\nWould a short discussion next week be useful?\n\n{{signature}}'},
  {id:'b2b',name:'B2B high-value lead gen',industry:'Professional services',objective:'Qualified meetings',body:'Hi {{company}} team,\n\nI came across {{company}} while researching providers in your space. {{opportunity}} stood out as a possible commercial opportunity.\n\n{{proof_or_reason}}\n\nWe may be able to help you {{business_outcome}}. Open to a short call next week?\n\n{{signature}}'},
  {id:'retail',name:'Retail / e-commerce growth',industry:'Retail',objective:'Sales & conversions',body:'Hi {{company}} team,\n\nI came across {{company}} and noticed {{opportunity}}. With the catalogue and demand you already have, there may be a practical route to {{business_outcome}}.\n\n{{proof_or_reason}}\n\nWould next week work for a quick chat?\n\n{{signature}}'},
  {id:'custom',name:'Blank custom template',industry:'Any',objective:'Your own structure',body:'Hi {{company}} team,\n\nWrite your own message here.\n\n{{signature}}'}
];

const state = {
  credits: 2484,
  prospects: [],
  selected: new Set(),
  unlocked: new Set(),
  currentProspect: null,
  generated: false,
  onboardingStep: 0,
  onboardingComplete: true,
  profile: {
    company:'MediaPlus Digital Pte Ltd',
    website:'https://www.mediaplus.com.sg/',
    offer:'Website development, SEO, Google Ads, social media marketing, lead generation and CRO.',
    usp:'Outcome-led digital growth with verified research and commercially relevant recommendations.',
    ideal:'Established Singapore SMEs with enough customer value to justify meaningful digital acquisition spend.'
  },
  activeTemplate: templateLibrary[0]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.remove('hidden'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.add('hidden'),2600); }
function setCredits(v){ state.credits=Math.max(0,v); $('#sidebarCredits').textContent=state.credits.toLocaleString(); $('#billingCredits').textContent=state.credits.toLocaleString(); }
function maskEmail(email){ const [u,d]=email.split('@'); return `${u.slice(0,Math.min(2,u.length))}${'•'.repeat(Math.max(3,u.length-2))}@${d.replace(/^[^.]+/,m=>m.slice(0,1)+'••••')}`; }

const pages = {
  home:['PROSPECTA','Find the right businesses.'], prospects:['LEADS','Qualified prospects'], campaigns:['OUTREACH','Campaigns'], inbox:['REPLIES','Inbox'], analytics:['PERFORMANCE','Analytics'], templates:['MESSAGING','AI outreach templates'], company:['WORKSPACE','Company sales brain'], signature:['IDENTITY','Production signature'], integrations:['CONNECTIONS','Integrations'], billing:['USAGE','Billing & credits']
};

function navigate(name){
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
  $$('.page').forEach(p=>p.classList.remove('active'));
  const p=$(`#page-${name}`); if(p) p.classList.add('active');
  $('#pageEyebrow').textContent=pages[name]?.[0]||'PROSPECTA'; $('#pageTitle').textContent=pages[name]?.[1]||'Prospecta';
  if(name==='prospects') renderProspects();
  if(name==='templates') renderTemplates();
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-nav]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.nav)));

$('#themeToggle').addEventListener('click',()=>{
  const html=document.documentElement; const dark=html.dataset.theme==='dark'; html.dataset.theme=dark?'light':'dark'; $('#themeToggle').textContent=dark?'☀':'☾'; localStorage.setItem('prospecta-theme',html.dataset.theme);
});
const savedTheme=localStorage.getItem('prospecta-theme'); if(savedTheme) document.documentElement.dataset.theme=savedTheme;

const pipelineSteps = [
  ['Finding businesses','68 candidates'],['Removing duplicates','5 removed'],['Checking business activity','59 active'],['Researching websites','59 complete'],['Finding public business emails','52 found'],['Verifying contactability','47 usable'],['Analyzing commercial opportunities','47 complete']
];

$('#generateBtn').addEventListener('click', async()=>{
  const p=$('#pipeline'); p.classList.remove('hidden'); p.innerHTML=''; $('#generateBtn').disabled=true; $('#generateBtn').textContent='Researching…';
  pipelineSteps.forEach((s,i)=>{ const el=document.createElement('div'); el.className='pipeline-step'; el.innerHTML=`<i>${i+1}</i><span>${s[0]}</span><b>${s[1]}</b>`; p.appendChild(el); });
  const els=[...p.children];
  for(let i=0;i<els.length;i++){ if(i>0) els[i-1].classList.remove('active'); els[i].classList.add('active'); await new Promise(r=>setTimeout(r,320)); els[i].classList.add('done'); els[i].querySelector('i').textContent='✓'; }
  els.at(-1).classList.remove('active'); state.prospects=prospectSeed.map((p,i)=>({...p,id:i+1})); state.generated=true; $('#prospectBadge').textContent=state.prospects.length; $('#generateBtn').disabled=false; $('#generateBtn').innerHTML='Generate prospects <span>↗</span>'; toast('10 demo prospects generated. Contacts remain protected until unlock or send.'); setTimeout(()=>navigate('prospects'),450);
});

function fillTemplate(t,p){
  const outcome = p.pitch.toLowerCase().includes('seo') || p.pitch.toLowerCase().includes('google') ? 'capture more high-intent enquiries from people already searching' : 'turn more existing interest into qualified enquiries';
  return t.body
    .replaceAll('{{company}}',p.name)
    .replaceAll('{{opportunity}}',p.gap.charAt(0).toLowerCase()+p.gap.slice(1))
    .replaceAll('{{business_outcome}}',outcome)
    .replaceAll('{{proof_or_reason}}',p.why)
    .replaceAll('{{signature}}','[Locked production signature appended automatically]');
}
function outreachFor(p){ return fillTemplate(state.activeTemplate,p); }

function renderProspects(filter=''){
  const list=$('#prospectList'); list.innerHTML='';
  const data=state.prospects.filter(p=>(p.name+' '+p.email+' '+p.pitch).toLowerCase().includes(filter.toLowerCase()));
  if(!data.length){ list.innerHTML=`<div class="glass empty-list">${state.generated?'No prospects match your search.':'Generate a prospecting run first.'}</div>`; return; }
  data.forEach(p=>{
    const unlocked=state.unlocked.has(p.id);
    const row=document.createElement('div'); row.className='prospect-row'+(state.currentProspect?.id===p.id?' active':'');
    row.innerHTML=`<input type="checkbox" ${state.selected.has(p.id)?'checked':''}><div class="prospect-meta"><strong>${p.name}</strong><span>${unlocked?p.email:maskEmail(p.email)} ${unlocked?'':'· Contact protected'}</span></div><div class="fit"><strong>${p.fit} fit</strong><small>${p.score}/100</small></div><div><span class="status good">${p.status}</span></div>`;
    row.querySelector('input').addEventListener('click',e=>{e.stopPropagation(); toggleSelect(p.id,e.target.checked)});
    row.addEventListener('click',()=>{state.currentProspect=p; renderProspects($('#prospectSearch').value); renderDetail(p)});
    list.appendChild(row);
  });
}

function renderDetail(p){
  const unlocked=state.unlocked.has(p.id);
  $('#detailPanel').innerHTML=`<div class="detail-head"><div><span class="eyebrow">${p.sector.toUpperCase()}</span><h3>${p.name}</h3><span class="muted detail-contact">${unlocked?p.email:maskEmail(p.email)}</span></div><span class="status good">${p.fit} fit · ${p.score}</span></div>
  <div class="contact-lock ${unlocked?'unlocked':''}"><div><strong>${unlocked?'Contact unlocked':'Verified contact available'}</strong><p>${unlocked?'You can copy this contact or send through Prospecta.':'Research is visible so you can judge value before spending. Reveal the contact only when you need it.'}</p></div>${unlocked?'<span class="status good">Unlocked</span>':'<button class="ghost" id="unlockContactBtn">Unlock · 4 cr</button>'}</div>
  <div class="detail-section"><h4>WHAT WE FOUND</h4><p>${p.gap}</p></div><div class="detail-section"><h4>BEST COMMERCIAL ANGLE</h4><p><strong class="detail-strong">${p.pitch}</strong><br>${p.why}</p></div><div class="detail-section"><h4>OUTREACH PREVIEW · ${state.activeTemplate.name.toUpperCase()}</h4><div class="detail-email">${outreachFor(p)}</div></div><div class="detail-actions"><button class="ghost" id="changeTemplateBtn">Change template</button><button class="primary" id="addSendBtn">Add to send</button></div>`;
  $('#unlockContactBtn')?.addEventListener('click',()=>unlockContact(p));
  $('#changeTemplateBtn')?.addEventListener('click',()=>navigate('templates'));
  $('#addSendBtn')?.addEventListener('click',()=>{toggleSelect(p.id,true);renderProspects($('#prospectSearch').value)});
}
function unlockContact(p){
  if(state.unlocked.has(p.id)) return;
  if(state.credits<4){toast('Not enough credits.');return;}
  setCredits(state.credits-4); state.unlocked.add(p.id); renderDetail(p); renderProspects($('#prospectSearch').value); toast('Contact unlocked for this workspace.');
}

function toggleSelect(id,on){ if(on) state.selected.add(id); else state.selected.delete(id); updateSelectionBar(); }
function updateSelectionBar(){ const n=state.selected.size; $('#selectionBar').classList.toggle('hidden',!n); $('#selectedCount').textContent=`${n} prospect${n===1?'':'s'} selected`; $('#creditEstimate').textContent=`Estimated send credits: ${n*5} · contacts stay protected`; }
$('#prospectSearch').addEventListener('input',e=>renderProspects(e.target.value));
$('#selectAllBtn').addEventListener('click',()=>{state.prospects.forEach(p=>state.selected.add(p.id));renderProspects($('#prospectSearch').value);updateSelectionBar()});

function openReview(){
  const chosen=state.prospects.filter(p=>state.selected.has(p.id)); if(!chosen.length) return;
  $('#modalTitle').textContent=`Review ${chosen.length} outreach email${chosen.length===1?'':'s'}`;
  $('#modalBody').innerHTML=`<div class="value-lock-note"><strong>Send without exporting contacts</strong><span>Prospecta handles delivery from the connected mailbox. Contact details remain protected unless individually unlocked.</span></div>`+chosen.slice(0,6).map(p=>`<div class="review-item"><strong>${p.name}</strong><p>${outreachFor(p).replaceAll('\n','<br>')}</p></div>`).join('')+(chosen.length>6?`<p class="muted">+ ${chosen.length-6} more selected prospects</p>`:'');
  $('#modalBackdrop').classList.remove('hidden');
}
$('#reviewBtn').addEventListener('click',openReview); $('#sendSelectedBtn').addEventListener('click',openReview); $('#closeModal').addEventListener('click',()=>$('#modalBackdrop').classList.add('hidden'));
$('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop') e.currentTarget.classList.add('hidden')});
$('#rewriteAllBtn').addEventListener('click',()=>toast('All selected drafts shortened.'));
$('#confirmSendBtn').addEventListener('click',()=>{
  const n=state.selected.size, cost=n*5; if(state.credits<cost){toast('Not enough credits.');return;} setCredits(state.credits-cost); $('#modalBackdrop').classList.add('hidden'); toast(`Campaign queued: ${n} emails. Demo mode does not send live Gmail.`); state.selected.clear(); updateSelectionBar(); renderProspects($('#prospectSearch').value);
});

function renderTemplates(){
  const grid=$('#templateGrid'); if(!grid) return;
  grid.innerHTML=templateLibrary.map(t=>`<article class="template-card glass ${state.activeTemplate.id===t.id?'active':''}" data-template="${t.id}"><div class="template-card-top"><span class="template-icon">✦</span>${t.recommended?'<span class="tag">Recommended</span>':''}</div><h3>${t.name}</h3><p>${t.industry} · ${t.objective}</p><small>${t.id==='custom'?'Start from scratch':'AI adapts this structure using verified prospect research.'}</small></article>`).join('');
  $$('.template-card').forEach(c=>c.addEventListener('click',()=>selectTemplate(c.dataset.template)));
  updateTemplateBuilder();
}
function selectTemplate(id){ state.activeTemplate=templateLibrary.find(t=>t.id===id)||templateLibrary[0]; renderTemplates(); toast(`${state.activeTemplate.name} selected.`); }
function updateTemplateBuilder(){
  const t=state.activeTemplate; if(!$('#templateBody')) return;
  $('#templateBuilderTitle').textContent=t.name; $('#templateModeTag').textContent=t.id==='custom'?'Custom':'AI recommended'; $('#templateBody').value=t.body; renderTemplatePreview();
}
function renderTemplatePreview(){
  if(!$('#templatePreview')) return;
  const fake=state.currentProspect||prospectSeed[0];
  const temp={...state.activeTemplate,body:$('#templateBody').value};
  $('#templatePreview').innerHTML=fillTemplate(temp,fake).replaceAll('\n','<br>');
}
$('#templateBody')?.addEventListener('input',renderTemplatePreview);
$('#newTemplateBtn')?.addEventListener('click',()=>selectTemplate('custom'));
$('#saveTemplateBtn')?.addEventListener('click',()=>{state.activeTemplate={...state.activeTemplate,body:$('#templateBody').value}; toast('Template saved to this workspace.');});
$('#aiImproveTemplateBtn')?.addEventListener('click',()=>{ $('#templateBody').value=$('#templateBody').value.replace('Would next week work for a short call?','Would a short discussion next week be useful?'); renderTemplatePreview(); toast('AI tightened the template without adding unsupported claims.'); });

const heights=[36,55,44,68,52,76,61,82,67,58,88,72,92,78,64,84,75,95,71,87,78,89,81,97];
$('#bars').innerHTML=heights.map(h=>`<div class="bar" style="height:${h}%" title="${h}"></div>`).join('');

const onboardingSteps = [
  ()=>`<span class="eyebrow">WELCOME TO PROSPECTA</span><h2>Teach Prospecta what you sell.</h2><p>The better the sales brain, the better the prospect selection and outreach. You only need to do this once.</p><label>Business name<input id="obCompany" value="${state.profile.company}"></label><label>Website<input id="obWebsite" value="${state.profile.website}"></label>`,
  ()=>`<span class="eyebrow">YOUR OFFER</span><h2>What can customers buy from you?</h2><p>List the actual services or products Prospecta is allowed to pitch.</p><label>Products / services<textarea id="obOffer">${state.profile.offer}</textarea></label><label>Typical customer / ideal buyer<textarea id="obIdeal">${state.profile.ideal}</textarea></label>`,
  ()=>`<span class="eyebrow">POSITIONING</span><h2>Why should someone choose you?</h2><p>Give Prospecta your real USP, proof points and anything it must never claim.</p><label>Current USP<textarea id="obUSP">${state.profile.usp}</textarea></label><label>Claims / exclusions<textarea id="obClaims" placeholder="e.g. Never promise guaranteed ROI. Only mention PSG where eligible."></textarea></label>`,
  ()=>`<span class="eyebrow">OUTREACH SETUP</span><h2>Choose how you want to start.</h2><div class="onboarding-choice-grid"><button class="choice-card active"><strong>AI-generated templates</strong><span>Prospecta recommends templates by industry and adapts them per lead.</span></button><button class="choice-card"><strong>My own template</strong><span>Write your own structure and keep Prospecta's research variables.</span></button></div><div class="onboarding-summary"><strong>Then connect Gmail</strong><span>Import your real signature, preserve clickable links and send from your own mailbox.</span></div>`
];
function renderOnboarding(){
  if(state.onboardingComplete){$('#onboardingBackdrop').classList.add('hidden');return;}
  $('#onboardingContent').innerHTML=onboardingSteps[state.onboardingStep]();
  $$('.onboarding-progress span').forEach((s,i)=>s.classList.toggle('active',i<=state.onboardingStep));
  $('#onboardingBack').classList.toggle('hidden',state.onboardingStep===0);
  $('#onboardingNext').textContent=state.onboardingStep===onboardingSteps.length-1?'Finish setup':'Continue';
  $$('.choice-card').forEach(c=>c.addEventListener('click',()=>{$$('.choice-card').forEach(x=>x.classList.remove('active'));c.classList.add('active')}));
}
function captureOnboarding(){
  if(state.onboardingStep===0){state.profile.company=$('#obCompany')?.value||state.profile.company;state.profile.website=$('#obWebsite')?.value||state.profile.website;}
  if(state.onboardingStep===1){state.profile.offer=$('#obOffer')?.value||state.profile.offer;state.profile.ideal=$('#obIdeal')?.value||state.profile.ideal;}
  if(state.onboardingStep===2){state.profile.usp=$('#obUSP')?.value||state.profile.usp;}
}
$('#onboardingNext').addEventListener('click',()=>{captureOnboarding(); if(state.onboardingStep<onboardingSteps.length-1){state.onboardingStep++;renderOnboarding();}else{state.onboardingComplete=true;localStorage.setItem('prospecta-onboarded','1');$('#onboardingBackdrop').classList.add('hidden');toast('Sales brain created. You can edit it anytime.');navigate('templates');}});
$('#onboardingBack').addEventListener('click',()=>{captureOnboarding();state.onboardingStep=Math.max(0,state.onboardingStep-1);renderOnboarding();});

$('#onboardingSkip')?.addEventListener('click',()=>{state.onboardingComplete=true;localStorage.setItem('prospecta-onboarded','1');$('#onboardingBackdrop').classList.add('hidden');toast('You can run guided setup anytime from Company.');});
$('#runSetupBtn')?.addEventListener('click',()=>{state.onboardingComplete=false;state.onboardingStep=0;$('#onboardingBackdrop').classList.remove('hidden');renderOnboarding();});


renderProspects(); renderTemplates(); setCredits(state.credits); renderOnboarding();

// Support & billing prototype actions
if (pages) {
  pages.support=['HELP','Support centre'];
  pages.legal=['TRUST','Legal & safety'];
}

$('#copySupportBtn')?.addEventListener('click', async()=>{
  try { await navigator.clipboard.writeText('support@prospecta.app'); toast('Support email copied.'); }
  catch { toast('Support: support@prospecta.app'); }
});

$('#submitSupportBtn')?.addEventListener('click', async()=>{
  const email=$('#supportEmail')?.value.trim();
  const message=$('#supportMessage')?.value.trim();
  const topic=$('#supportTopic')?.value;
  if(!email || !message){ toast('Add your email and a short description first.'); return; }
  const btn=$('#submitSupportBtn'); btn.disabled=true; btn.textContent='Submitting…';
  try{
    const res=await fetch('/api/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,topic,message})});
    if(!res.ok) throw new Error('not configured');
    const data=await res.json();
    toast(`Ticket ${data.ticket||''} created.`.trim());
    $('#supportMessage').value='';
  }catch{
    toast('Support API is in demo mode. Email support@prospecta.app for now.');
  }finally{btn.disabled=false;btn.textContent='Submit ticket';}
});

async function startCheckout(plan){
  const nativePlatform = window.Capacitor?.getPlatform?.();
  if(nativePlatform==='ios' || nativePlatform==='android'){
    toast('Native store billing adapter is ready to be connected to Apple / Google product IDs.');
    return;
  }
  try{
    const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})});
    const data=await res.json();
    if(!res.ok || !data.url) throw new Error(data.error||'checkout unavailable');
    window.location.href=data.url;
  }catch(e){
    toast('Stripe Checkout is scaffolded. Add STRIPE_SECRET_KEY and price IDs to activate live payments.');
  }
}
$$('.checkout-btn').forEach(b=>b.addEventListener('click',()=>startCheckout(b.dataset.plan)));
$('#buyCreditsBtn')?.addEventListener('click',()=>startCheckout('credits_2000'));
