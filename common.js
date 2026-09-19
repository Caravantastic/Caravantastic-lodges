const WA='447426109071';
function data(){return JSON.parse(sessionStorage.getItem('caravantasticBooking')||'{}')}
function save(d){sessionStorage.setItem('caravantasticBooking',JSON.stringify(d))}
function money(n){return '£'+Number(n||0).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}
function wa(m){location.href='https://wa.me/'+WA+'?text='+encodeURIComponent(m)}
function canonicalRate(property){
  // Normalize apostrophes, spacing and punctuation so saved cabin names always match.
  const key=String(property||'').toLowerCase().replace(/[’‘`]/g,"'").replace(/[^a-z0-9]/g,'');
  if(key==='bredonviewglamping') return 190;
  if(key==='beechwoodnook') return 170;
  if(key==='therooksnook' || key==='rooksnook') return 160;
  return null;
}
function nightsBetween(checkin,checkout){
  if(!checkin||!checkout) return 0;
  const a=String(checkin).split('-').map(Number), b=String(checkout).split('-').map(Number);
  if(a.length!==3||b.length!==3||a.some(Number.isNaN)||b.some(Number.isNaN)) return 0;
  return Math.round((Date.UTC(b[0],b[1]-1,b[2])-Date.UTC(a[0],a[1]-1,a[2]))/86400000);
}
function cabin(){
  const d=data();
  if(!d.property){location.href='index.html';return d}
  const rate=canonicalRate(d.property);
  if(rate!==null){
    d.price=rate;
    const nights=nightsBetween(d.checkin,d.checkout);
    if(nights>0){d.nights=nights;d.total=rate*nights;}
    save(d);
  }
  return d;
}
