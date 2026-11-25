const $=id=>document.getElementById(id);
const scenes=[
['بوابة عشتار – بداية الرحلة','يقف آدم وليلى أمام بوابة عشتار المهيبة ويتأملان زخارفها وحيواناتها.'],
['أسود بوابة عشتار','يكتشف الطفلان أشكال الأسود البابلية المصطفة على جدران طريق الموكب.'],
['أسوار بابل العظيمة','يشاهد الطفلان أسوار المدينة وأبراجها وأبوابها الواسعة.'],
['شوارع المدينة القديمة','يمشي الطفلان في شارع بابلي قديم بين البيوت والسكان.'],
['قصر الملك نبوخذ نصر الثاني','يتعرف الطفلان على القصر الملكي وزخارفه.'],
['الملك نبوخذ نصر الثاني','مشهد تعليمي للملك البابلي في قصره.'],
['الحدائق المعلقة','يتخيل الطفلان الحدائق المدرجة والنباتات، مع الإشارة إلى أن موقعها التاريخي موضع نقاش.'],
['نهر الفرات','يراقب الطفلان القوارب والمياه والبساتين على ضفاف النهر.'],
['الزراعة والنخيل','يتعلم الطفلان عن زراعة الحبوب والتمر وسقي الحقول.'],
['السوق البابلي','يشاهد الطفلان التجار وهم يعرضون الأقمشة والتمور والفخار.'],
['صناعة الفخار','يتعرف الطفلان على صانع الفخار وهو يشكل إناءً من الطين.'],
['الألواح الطينية','يشاهد الطفلان كاتباً بابلياً يكتب على لوح طيني.'],
['الكتابة المسمارية','يتعرف الطفلان على علامات الكتابة المسمارية.'],
['الرياضيات والقياس','يتعلم الطفلان كيف استخدم أهل بلاد الرافدين الحساب والقياس.'],
['علم الفلك والسماء','يراقب الطفلان النجوم مع عالم بابلي يسجل ملاحظاته.'],
['البيت البابلي','يتعرف الطفلان على الأثاث والأواني والحياة الأسرية.'],
['الطعام والخبز','يشاهد الطفلان إعداد الخبز والأطعمة من محاصيل الأرض.'],
['الفنون والزخارف','يتأمل الطفلان النقوش والأختام والأواني المزخرفة.'],
['ماذا تعلمنا عن بابل؟','يراجع الطفلان أبرز ما اكتشفاه عن المدينة والناس والعلوم.'],
['وداعاً يا بابل','يقف الطفلان أمام بوابة عشتار ويودعان المدينة بعد رحلة ممتعة.']
];
const defaults={title:'بابل – حضارة من تاريخ العراق',language:'العربية',age:'7–9 سنوات',count:20,size:'A4 عمودي',quality:'4K',style:'رسوم تلوين بخطوط سوداء واضحة',story:'طفلان يبدآن رحلة عبر بوابة عشتار لاكتشاف حضارة بابل ومعالمها وحياة أهلها.',cover:true,certificate:true,boy:'آدم',girl:'ليلى',boyDesc:'طفل بعمر 8 سنوات، شعر أسود قصير، عينان بنيتان، يرتدي قميصاً بسيطاً وسروالاً.',girlDesc:'طفلة بعمر 8 سنوات، شعر بني طويل مربوط، عينان بنيتان، ترتدي ثوباً بسيطاً.',pages:[]};
let data={...defaults},selected=0,timerToast;
try{const s=JSON.parse(localStorage.getItem('hikaya-color-studio'));if(s)data={...data,...s};}catch{}
const keys={title:'title',language:'language',age:'age',count:'count',size:'size',quality:'quality',style:'style',story:'story',boy:'boy',girl:'girl',boyDesc:'boyDesc',girlDesc:'girlDesc'};
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(timerToast);timerToast=setTimeout(()=>t.classList.remove('show'),2400);}
function save(msg){localStorage.setItem('hikaya-color-studio',JSON.stringify(data));if(msg)toast(msg);stats();}
function read(){for(const [id,k] of Object.entries(keys))data[k]=$(id).value;data.count=Math.max(5,Math.min(50,Number(data.count)||20));data.cover=$('cover').checked;data.certificate=$('certificate').checked;}
function fill(){for(const [id,k] of Object.entries(keys))$(id).value=data[k]??defaults[k];$('cover').checked=data.cover;$('certificate').checked=data.certificate;}
function stats(){$('statTitle').textContent=data.title;$('statPages').textContent=(data.pages.length||data.count)+' صفحة';$('statStatus').textContent=data.pages.length?'المخطط جاهز':'جاهز للإعداد';}
function go(v){document.querySelectorAll('.view').forEach(x=>x.classList.toggle('hidden',x.id!==v));document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.view===v));const names={dashboard:'لوحة التحكم',project:'إعداد الكتاب',pages:'صفحات الكتاب',characters:'الشخصيات',export:'التصدير'};$('crumb').textContent=names[v];if(v==='pages')render();}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>go(b.dataset.view));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));$('start').onclick=()=>go('project');
$('saveProject').onclick=()=>{read();save('تم حفظ إعدادات الكتاب.');};
$('saveCharacters').onclick=()=>{read();save('تم حفظ الشخصيات.');};
function createScenes(){return Array.from({length:data.count},(_,i)=>{const s=scenes[i]||[`مشهد إضافي ${i+1}`,`مشهد جديد من قصة ${data.title}: ${data.story}، يظهر فيه ${data.boy} و${data.girl} في حدث جديد.`];return {title:s[0],description:s[1],status:'المخطط جاهز',prompt:''};});}
$('generate').onclick=()=>{read();if(!data.title.trim()||!data.story.trim()){toast('أدخل عنوان الكتاب وملخص القصة أولاً.');go('project');return;}const btn=$('generate');btn.disabled=true;btn.textContent='جاري إنشاء المخطط...';$('progress').classList.remove('hidden');let n=0;const t=setInterval(()=>{n+=10;$('progressBar').style.width=n+'%';$('progressPct').textContent=n+'%';$('progressText').textContent=n<100?'جاري تقسيم القصة وتجهيز الصفحات...':'اكتمل إنشاء المخطط';if(n>=100){clearInterval(t);data.pages=createScenes();selected=0;save('تم إنشاء مخطط الكتاب بنجاح.');render();btn.disabled=false;btn.textContent='✦ إعادة توليد مخطط الكتاب';setTimeout(()=>$('progress').classList.add('hidden'),900);}},70);};
function render(){const list=$('pagesList');list.innerHTML='';$('pageCount').textContent=data.pages.length+' صفحة';if(!data.pages.length){list.textContent='اضغط توليد مخطط الكتاب للبدء.';$('emptyEditor').classList.remove('hidden');$('editArea').classList.add('hidden');return;}data.pages.forEach((p,i)=>{const b=document.createElement('button');b.className='page-item'+(i===selected?' active':'');b.innerHTML=`<span class="page-num">${i+1}</span><span><b></b><small>${p.status||'مسودة'}</small></span>`;b.querySelector('b').textContent=p.title;b.onclick=()=>select(i);list.appendChild(b);});select(Math.min(selected,data.pages.length-1));}
function select(i){selected=i;const p=data.pages[i];$('emptyEditor').classList.add('hidden');$('editArea').classList.remove('hidden');$('pageNo').textContent=`الصفحة ${i+1} من ${data.pages.length}`;$('pageTitle').value=p.title;$('pageDescription').value=p.description;$('prompt').value=p.prompt||'';document.querySelectorAll('.page-item').forEach((b,j)=>b.classList.toggle('active',i===j));}
$('savePage').onclick=()=>{const p=data.pages[selected];if(!p)return;p.title=$('pageTitle').value;p.description=$('pageDescription').value;p.status='تم التعديل';save('تم حفظ تعديلات الصفحة.');render();};
$('makePrompt').onclick=()=>{const p=data.pages[selected];if(!p)return;p.title=$('pageTitle').value;p.description=$('pageDescription').value;p.prompt=`أنشئ رسمة مستقلة لصفحة من كتاب الأطفال «${data.title}». الصفحة ${selected+1} من ${data.pages.length}. عنوان المشهد: ${p.title}. وصف المشهد: ${p.description}. الشخصيات الثابتة: ${data.boy}: ${data.boyDesc}. ${data.girl}: ${data.girlDesc}. حافظ على المظهر والملابس نفسها في جميع الصفحات. الفئة العمرية: ${data.age}. اللغة: ${data.language}. الأسلوب: ${data.style}. المقاس: ${data.size}. الجودة المستهدفة: ${data.quality}. صفحة واحدة عمودية، مشهد واحد واضح، خطوط نظيفة وتفاصيل مناسبة للأطفال. ممنوع إنشاء كولاج أو شبكة صور.`;$('prompt').value=p.prompt;save('تم تجهيز الوصف الفني.');};
$('copyPrompt').onclick=async()=>{if(!$('prompt').value){toast('جهّز وصف الرسم أولاً.');return;}try{await navigator.clipboard.writeText($('prompt').value);toast('تم نسخ الوصف الفني.');}catch{$('prompt').select();toast('انسخ النص المحدد يدوياً.');}};
function download(name,text,type){const u=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('downloadJson').onclick=()=>{read();save();download('Hikaya-Color-Project.json',JSON.stringify(data,null,2),'application/json;charset=utf-8');toast('تم تنزيل ملف المشروع.');};
$('downloadTxt').onclick=()=>{if(!data.pages.length){toast('أنشئ مخطط الكتاب أولاً.');return;}download('Hikaya-Color-Story.txt',data.title+'\\n\\n'+data.pages.map((p,i)=>`${i+1}. ${p.title}\\n${p.description}\\n${p.prompt||''}`).join('\\n\\n'),'text/plain;charset=utf-8');toast('تم تنزيل مخطط القصة.');};
fill();stats();if(data.pages.length)render();
