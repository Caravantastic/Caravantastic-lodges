const WA='447463201368';
function data(){try{return JSON.parse(sessionStorage.getItem('caravantasticBooking')||'{}')}catch(e){return {}}}
function save(d){sessionStorage.setItem('caravantasticBooking',JSON.stringify(d))}
function money(n){return '£'+Number(n||0).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}
function wa(m){location.href='https://wa.me/'+WA+'?text='+encodeURIComponent(m)}
function canonicalRate(property){
  // Match cabin names despite curly/straight apostrophes, spacing, or punctuation.
  const key=String(property||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');
  const rates={bredonviewglamping:190,beechwoodnook:170,therooksnook:160,rooksnook:160,elysiansuite:299};
  return Object.prototype.hasOwnProperty.call(rates,key)?rates[key]:null;
}
function nightsBetween(checkin,checkout){
  if(!checkin||!checkout)return 0;
  const a=String(checkin).split('-').map(Number),b=String(checkout).split('-').map(Number);
  if(a.length!==3||b.length!==3||a.some(Number.isNaN)||b.some(Number.isNaN))return 0;
  return Math.round((Date.UTC(b[0],b[1]-1,b[2])-Date.UTC(a[0],a[1]-1,a[2]))/86400000);
}
function cabin(){
  const d=data();
  if(!d.property){location.href='index.html';return d}
  const rate=canonicalRate(d.property);
  if(rate!==null){d.price=rate;const n=nightsBetween(d.checkin,d.checkout);if(n>0){d.nights=n;d.total=rate*n;}save(d)}
  return d;
}
