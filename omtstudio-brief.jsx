import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
//  ⚙️  CONFIGURAZIONE — modifica solo questi valori
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  whatsapp:    "393277582912",
  formspreeId: "xrejepdv",          // da formspree.io dopo deploy
  email:       "hello@omtstudio.it",
  agency:      "OMTStudio",
  tagline:     "Brand Architect & Digital Transformation",
  year:        "2026",
};

// ═══════════════════════════════════════════════════════════
//  🎨  BRAND COLORS
// ═══════════════════════════════════════════════════════════
const C = {
  navy:       "#1B3A52",
  navyMid:    "#2B4A62",
  tiffany:    "#3A9BAF",
  tiffLight:  "#7ECADB",
  tiffPale:   "#D4EEF2",
  tiffMist:   "#F0F8FA",
  gold:       "#CBB57B",
  goldLight:  "#E8D9B0",
  slate:      "#5A7A8E",
  ice:        "#E8F4F7",
  white:      "#FFFFFF",
};

// ═══════════════════════════════════════════════════════════
//  🌐  TRADUZIONI
// ═══════════════════════════════════════════════════════════
const LANGS = {
  it: {
    dir:"ltr", flag:"🇮🇹", code:"IT", font:"'Outfit', sans-serif",
    title:"Brief di Presentazione",
    subtitle:"Costruiamo la tua presenza digitale",
    intro:"Rispondi alle domande — ci vogliono circa 10 minuti. Le tue risposte ci permetteranno di creare il sito e il brand perfetti per la tua attività.",
    prev:"← Indietro", next:"Avanti →", submit:"📲 Invia le risposte",
    successTitle:"Grazie! ✅",
    successMsg:"Le tue risposte sono pronte. Inviale tramite uno o più canali.",
    sendWA:"💬 WhatsApp", sendEmail:"📧 Email", dlPDF:"📄 Scarica PDF",
    emailSent:"✓ Inviata!", emailError:"Errore — usa WhatsApp",
    restart:"Ricomincia", otherSpec:"Specifica:",
    gdpr:"Ho letto l'informativa privacy e acconsento al trattamento dei miei dati personali da parte di OMTStudio per la gestione di questa richiesta (Reg. UE 2016/679).",
    gdprError:"Devi accettare l'informativa privacy per continuare.",
    sectionOf:"di",
    sections:{
      identity:    {icon:"🏢", label:"Identità & Contatti"},
      services:    {icon:"🛠️", label:"Servizi & Posizionamento"},
      website:     {icon:"💻", label:"Sito Web"},
      social_gate: {icon:"📱", label:"Pagine Social"},
      social:      {icon:"📱", label:"Social Setup"},
    },
    q:{
      businessType:    {label:"Tipo di attività", ph:"Es. Impresa edile, Parrucchiere, Estetista, Ristorante..."},
      businessName:    {label:"Nome commerciale / Ragione sociale", ph:"Es. Edil Sigma, Studio Maria..."},
      ownerName:       {label:"Nome del titolare (facoltativo)", ph:"Es. Mohamed Hassan..."},
      vatCode:         {label:"Partita IVA o Codice Fiscale", ph:"Es. IT12345678901 — usato nel footer del sito"},
      yearFounded:     {label:"Anno di apertura", ph:"Es. 2018"},
      address:         {label:"Indirizzo + Zona operativa", ph:"Es. Via Roma 1, Milano — lavoriamo in tutta la Lombardia"},
      phone:           {label:"Telefono", ph:"+39 XXX XXXXXXX"},
      whatsapp:        {label:"Hai WhatsApp Business?", opts:["Sì, stesso numero", "Sì, numero diverso", "No"]},
      whatsappNum:     {label:"Numero WhatsApp (se diverso)", ph:"+39 XXX XXXXXXX"},
      emailContact:    {label:"Email di contatto", ph:"info@tuaattivita.it"},
      existingSocials: {label:"Profili social già attivi", opts:["Facebook","Instagram","TikTok","YouTube","Google Business","Nessuno"]},
      mainServices:    {label:"Elenca max 5 servizi principali", ph:"1. Ristrutturazioni complete\n2. Rifacimento bagni\n3. Cappotti termici\n4. Pavimentazioni\n5. Imbiancatura"},
      focusService:    {label:"Servizio su cui puntare di più (il più redditizio)", ph:"Es. Ristrutturazioni chiavi in mano..."},
      serviceModel:    {label:"Come erogate il servizio?", opts:["A casa/cantiere del cliente","Nel nostro spazio/negozio","Entrambi","Online / da remoto"]},
      clientType:      {label:"Cliente tipo", ph:"Es. Privati 35-60 anni, famiglie, condomini, aziende..."},
      budgetRange:     {label:"Fascia di prezzo dei vostri servizi", opts:["Bassa (sotto 500€)","Media (500€ – 5.000€)","Alta (5.000€ – 30.000€)","Premium (oltre 30.000€)","Varia molto"]},
      whyChooseYou:    {label:"Perché un cliente dovrebbe scegliere voi? (1 frase)", ph:"Es. Siamo rapidi, affidabili e parliamo arabo, italiano e francese..."},
      competitors:     {label:"1-2 concorrenti o siti che vi piacciono", ph:"Es. edilrossi.it, o qualcosa che avete visto e vi è piaciuto..."},
      siteGoal:        {label:"Obiettivo principale del sito", opts:["Ricevere chiamate","Ricevere messaggi WhatsApp","Prenotazioni online","Richieste di preventivo","Vendita diretta"]},
      sitePages:       {label:"Pagine desiderate nel sito", opts:["Home","Chi siamo","Servizi","Portfolio / Galleria","Prezzi","Contatti","Blog / News"]},
      siteTexts:       {label:"I testi per il sito", opts:["Li fornisco io","Li scrivi tu dalle mie risposte","Mix — alcune parti le ho già"]},
      hasLogo:         {label:"Hai già un logo?", opts:["Sì, lo allego dopo","No, voglio crearlo (servizio extra)","No, si usa solo il testo con il nome"]},
      brandStyle:      {label:"Stile preferito per il sito", opts:["Moderno / Tech","Elegante / Raffinato","Minimal / Pulito","Naturale / Caldo","Lusso / Premium","Amichevole / Semplice"]},
      brandColors:     {label:"Colori preferiti", ph:"Es. blu e bianco, oppure colori del logo esistente..."},
      colorsAvoid:     {label:"Colori da evitare", ph:"Es. giallo, troppo colorato..."},
      hasPhotos:       {label:"Hai foto reali dei tuoi lavori / prodotti / spazio?", opts:["Sì, molte — le invio","Sì, alcune","No — uso immagini stock","Voglio fare una sessione fotografica (extra)"]},
      hasVideo:        {label:"Hai video da inserire?", opts:["Sì","No","Da produrre (extra)"]},
      hasDomain:       {label:"Hai già un dominio (es. www.nomesito.it)?", opts:["Sì — lo specifico dopo","No, da acquistare","Non so cosa sia"]},
      googleMaps:      {label:"Sei su Google Maps / Google Business?", opts:["Sì, profilo verificato","Sì, non verificato","No"]},
      googleReviews:   {label:"Hai recensioni su Google?", opts:["Sì, più di 10","Sì, meno di 10","No"]},
      otherReviews:    {label:"Hai testimonianze / recensioni da altri canali?", opts:["Messaggi WhatsApp da clienti","Commenti Facebook","Tag / menzioni Instagram","Video recensioni","No"]},
      wantsSocial:     {label:"Vuoi che creiamo / rinnoviamo anche le tue pagine social?", opts:["Sì — ho bisogno di creare o rifare i profili","No — ho già i social, voglio solo il sito","Non so ancora"]},
      socialPlatforms: {label:"Quali piattaforme vuoi creare / rinnovare?", opts:["Instagram","Facebook","TikTok","Google Business","YouTube"]},
      socialExisting:  {label:"Hai già profili esistenti?", opts:["Sì, ma vanno rifatti","Sì, solo da ottimizzare","No, tutto da zero"]},
      socialTone:      {label:"Tono di voce del brand", opts:["Professionale e formale","Amichevole e diretto","Ispirazionale","Divertente / Ironico"]},
      socialBio:       {label:"La bio / descrizione dei profili", opts:["La fornisco io","La scrivi tu","Mix — ho delle idee"]},
      socialContent:   {label:"Idee sui contenuti da pubblicare", ph:"Es. foto prima/dopo lavori, video in cantiere, consigli, promozioni..."},
      socialFreq:      {label:"Con quale frequenza pensi di pubblicare?", opts:["Ogni giorno","3-4 volte a settimana","1-2 volte a settimana","Non so ancora"]},
      extraNotes:      {label:"Note aggiuntive o richieste particolari", ph:"Tutto quello che vuoi aggiungere..."},
    }
  },
  ar: {
    dir:"rtl", flag:"🇸🇦", code:"AR", font:"'Cairo', sans-serif",
    title:"استمارة التعريف",
    subtitle:"نبني حضورك الرقمي معاً",
    intro:"أجب على الأسئلة — تستغرق حوالي 10 دقائق. إجاباتك ستمكننا من إنشاء الموقع والعلامة التجارية المثالية لنشاطك.",
    prev:"→ السابق", next:"التالي ←", submit:"📲 إرسال الإجابات",
    successTitle:"شكراً! ✅",
    successMsg:"إجاباتك جاهزة. أرسلها عبر قناة أو أكثر.",
    sendWA:"💬 واتساب", sendEmail:"📧 بريد إلكتروني", dlPDF:"📄 تحميل PDF",
    emailSent:"✓ تم!", emailError:"خطأ — استخدم واتساب",
    restart:"ابدأ من جديد", otherSpec:"حدد:",
    gdpr:"لقد قرأت سياسة الخصوصية وأوافق على معالجة بياناتي الشخصية من قبل OMTStudio لإدارة هذا الطلب (اللائحة الأوروبية 2016/679).",
    gdprError:"يجب قبول سياسة الخصوصية للمتابعة.",
    sectionOf:"من",
    sections:{
      identity:    {icon:"🏢", label:"الهوية والتواصل"},
      services:    {icon:"🛠️", label:"الخدمات والتموضع"},
      website:     {icon:"💻", label:"الموقع الإلكتروني"},
      social_gate: {icon:"📱", label:"صفحات السوشيال"},
      social:      {icon:"📱", label:"إعداد السوشيال"},
    },
    q:{
      businessType:    {label:"نوع النشاط التجاري", ph:"مثال: شركة بناء، حلاق، صالون تجميل، مطعم..."},
      businessName:    {label:"الاسم التجاري / الاسم الرسمي", ph:"مثال: شركة سيغما للبناء..."},
      ownerName:       {label:"اسم صاحب العمل (اختياري)", ph:"مثال: محمد حسن..."},
      vatCode:         {label:"رقم ضريبة القيمة المضافة أو الرمز الضريبي", ph:"يُستخدم في تذييل الموقع"},
      yearFounded:     {label:"سنة التأسيس", ph:"مثال: 2018"},
      address:         {label:"العنوان + منطقة العمل", ph:"مثال: شارع روما 1، ميلانو — نعمل في كل لومبارديا"},
      phone:           {label:"رقم الهاتف", ph:"+39 XXX XXXXXXX"},
      whatsapp:        {label:"هل لديك واتساب بيزنس؟", opts:["نعم، نفس الرقم","نعم، رقم مختلف","لا"]},
      whatsappNum:     {label:"رقم واتساب (إن كان مختلفاً)", ph:"+39 XXX XXXXXXX"},
      emailContact:    {label:"البريد الإلكتروني للتواصل", ph:"info@yourcompany.it"},
      existingSocials: {label:"حسابات سوشيال ميديا نشطة", opts:["فيسبوك","انستغرام","تيك توك","يوتيوب","Google Business","لا يوجد"]},
      mainServices:    {label:"اذكر حتى 5 خدمات رئيسية", ph:"1. تجديد شامل\n2. إعادة تشطيب الحمامات\n3. عزل حراري\n4. أرضيات\n5. دهانات"},
      focusService:    {label:"الخدمة الأكثر ربحاً أو الأهم", ph:"مثال: تجديد تسليم مفتاح..."},
      serviceModel:    {label:"كيف تقدمون الخدمة؟", opts:["في موقع العميل","في مقرنا/محلنا","كلاهما","أونلاين / عن بُعد"]},
      clientType:      {label:"العميل النموذجي", ph:"مثال: أفراد وعائلات 35-60 سنة، شركات، مجمعات سكنية..."},
      budgetRange:     {label:"الفئة السعرية لخدماتكم", opts:["منخفضة (أقل من 500€)","متوسطة (500€ – 5,000€)","عالية (5,000€ – 30,000€)","بريميوم (أكثر من 30,000€)","يتفاوت كثيراً"]},
      whyChooseYou:    {label:"لماذا يجب أن يختاركم العميل؟ (جملة واحدة)", ph:"مثال: نحن سريعون وموثوقون ونتحدث العربية والإيطالية..."},
      competitors:     {label:"1-2 منافس أو موقع يعجبكم", ph:"مثال: اسم شركة أو موقع رأيتموه وأعجبكم..."},
      siteGoal:        {label:"الهدف الرئيسي من الموقع", opts:["استقبال مكالمات","استقبال رسائل واتساب","حجز مواعيد أونلاين","طلبات عروض أسعار","بيع مباشر"]},
      sitePages:       {label:"الصفحات المطلوبة في الموقع", opts:["الرئيسية","من نحن","الخدمات","معرض الأعمال","الأسعار","تواصل معنا","مدونة / أخبار"]},
      siteTexts:       {label:"النصوص والمحتوى للموقع", opts:["سأوفرها أنا","اكتبها أنت من إجاباتي","مزيج — بعضها جاهز"]},
      hasLogo:         {label:"هل لديك شعار؟", opts:["نعم — سأرسله لاحقاً","لا — أريد إنشاءه (خدمة إضافية)","لا — نستخدم النص فقط"]},
      brandStyle:      {label:"الأسلوب المفضل للموقع", opts:["حديث / تقني","أنيق / راقٍ","بسيط / نظيف","دافئ / طبيعي","فاخر / بريميوم","ودّي / بسيط"]},
      brandColors:     {label:"الألوان المفضلة", ph:"مثال: أزرق وأبيض، أو ألوان الشعار الموجود..."},
      colorsAvoid:     {label:"الألوان التي يجب تجنبها", ph:"مثال: الأصفر، ألوان كثيرة جداً..."},
      hasPhotos:       {label:"هل لديك صور حقيقية لأعمالك / منتجاتك / مكانك؟", opts:["نعم، كثيرة — سأرسلها","نعم، بعضها","لا — نستخدم صور ستوك","أريد جلسة تصوير (خدمة إضافية)"]},
      hasVideo:        {label:"هل لديك فيديوهات للإدراج؟", opts:["نعم","لا","للإنتاج (خدمة إضافية)"]},
      hasDomain:       {label:"هل لديك نطاق (مثال: www.yoursite.it)؟", opts:["نعم — سأحدده لاحقاً","لا، من الشراء","لا أعرف ما هو"]},
      googleMaps:      {label:"هل أنتم على Google Maps / Google Business؟", opts:["نعم، موثق","نعم، غير موثق","لا"]},
      googleReviews:   {label:"هل لديكم مراجعات على Google؟", opts:["نعم، أكثر من 10","نعم، أقل من 10","لا"]},
      otherReviews:    {label:"هل لديكم شهادات من قنوات أخرى؟", opts:["رسائل واتساب من عملاء","تعليقات فيسبوك","إشارات انستغرام","فيديوهات تقييم","لا"]},
      wantsSocial:     {label:"هل تريدون إنشاء / تجديد صفحاتكم على السوشيال أيضاً؟", opts:["نعم — أحتاج إنشاء أو إعادة تصميم الملفات","لا — لدي السوشيال، أريد الموقع فقط","لا أعرف بعد"]},
      socialPlatforms: {label:"أي منصات تريدون إنشاء / تجديدها؟", opts:["انستغرام","فيسبوك","تيك توك","Google Business","يوتيوب"]},
      socialExisting:  {label:"هل لديكم ملفات موجودة؟", opts:["نعم، لكن تحتاج إعادة تصميم","نعم، فقط للتحسين","لا، كل شيء من الصفر"]},
      socialTone:      {label:"نبرة العلامة التجارية", opts:["مهني ورسمي","ودّي ومباشر","إلهامي / تحفيزي","مرح / فكاهي"]},
      socialBio:       {label:"نص الـ bio / وصف الملفات الشخصية", opts:["سأوفره أنا","اكتبه أنت","لدي أفكار — نتعاون"]},
      socialContent:   {label:"أفكار عن المحتوى الذي ستنشره", ph:"مثال: صور قبل/بعد، فيديو في موقع العمل، نصائح، عروض..."},
      socialFreq:      {label:"بأي تكرار تفكر في النشر؟", opts:["كل يوم","3-4 مرات أسبوعياً","1-2 مرات أسبوعياً","لا أعرف بعد"]},
      extraNotes:      {label:"ملاحظات إضافية أو طلبات خاصة", ph:"أي شيء تريد إضافته..."},
    }
  },
  ru: {
    dir:"ltr", flag:"🇷🇺", code:"RU", font:"'Outfit', sans-serif",
    title:"Анкета клиента",
    subtitle:"Строим ваше цифровое присутствие вместе",
    intro:"Ответьте на вопросы — займёт около 10 минут. Ваши ответы помогут нам создать идеальный сайт и бренд для вашего бизнеса.",
    prev:"← Назад", next:"Далее →", submit:"📲 Отправить ответы",
    successTitle:"Спасибо! ✅",
    successMsg:"Ваши ответы готовы. Отправьте их через один или несколько каналов.",
    sendWA:"💬 WhatsApp", sendEmail:"📧 Email", dlPDF:"📄 Скачать PDF",
    emailSent:"✓ Отправлено!", emailError:"Ошибка — используйте WhatsApp",
    restart:"Начать заново", otherSpec:"Укажите:",
    gdpr:"Я прочитал(а) политику конфиденциальности и согласен(а) на обработку моих персональных данных компанией OMTStudio (Регламент ЕС 2016/679).",
    gdprError:"Необходимо принять политику конфиденциальности для продолжения.",
    sectionOf:"из",
    sections:{
      identity:    {icon:"🏢", label:"Контакты и идентификация"},
      services:    {icon:"🛠️", label:"Услуги и позиционирование"},
      website:     {icon:"💻", label:"Веб-сайт"},
      social_gate: {icon:"📱", label:"Социальные сети"},
      social:      {icon:"📱", label:"Настройка соцсетей"},
    },
    q:{
      businessType:    {label:"Тип бизнеса", ph:"Напр. строительная фирма, парикмахер, салон красоты, ресторан..."},
      businessName:    {label:"Торговое название / официальное наименование", ph:"Напр. Edil Sigma, Студия Марии..."},
      ownerName:       {label:"Имя владельца (необязательно)", ph:"Напр. Мохаммед Хасан..."},
      vatCode:         {label:"ИНН / Налоговый код", ph:"Используется в подвале сайта"},
      yearFounded:     {label:"Год основания", ph:"Напр. 2018"},
      address:         {label:"Адрес + зона работы", ph:"Напр. Via Roma 1, Милан — работаем по всей Ломбардии"},
      phone:           {label:"Телефон", ph:"+39 XXX XXXXXXX"},
      whatsapp:        {label:"Есть ли у вас WhatsApp Business?", opts:["Да, тот же номер","Да, другой номер","Нет"]},
      whatsappNum:     {label:"Номер WhatsApp (если другой)", ph:"+39 XXX XXXXXXX"},
      emailContact:    {label:"Email для контакта", ph:"info@yourcompany.it"},
      existingSocials: {label:"Действующие профили в соцсетях", opts:["Facebook","Instagram","TikTok","YouTube","Google Business","Нет"]},
      mainServices:    {label:"Перечислите до 5 основных услуг", ph:"1. Полный ремонт\n2. Ремонт ванных\n3. Утепление фасадов\n4. Укладка полов\n5. Покраска"},
      focusService:    {label:"Самая прибыльная или важная услуга", ph:"Напр. ремонт под ключ..."},
      serviceModel:    {label:"Как вы оказываете услуги?", opts:["У клиента / на объекте","В нашем помещении/магазине","Оба варианта","Онлайн / удалённо"]},
      clientType:      {label:"Типичный клиент", ph:"Напр. частные лица 35-60 лет, семьи, компании..."},
      budgetRange:     {label:"Ценовой диапазон ваших услуг", opts:["Низкий (до 500€)","Средний (500€ – 5,000€)","Высокий (5,000€ – 30,000€)","Премиум (свыше 30,000€)","Очень варьируется"]},
      whyChooseYou:    {label:"Почему клиент должен выбрать вас? (1 фраза)", ph:"Напр. Мы быстрые, надёжные, говорим на русском и итальянском..."},
      competitors:     {label:"1-2 конкурента или сайта, которые вам нравятся", ph:"Напр. название компании или сайт, который произвёл впечатление..."},
      siteGoal:        {label:"Главная цель сайта", opts:["Получать звонки","Получать сообщения WhatsApp","Онлайн-запись","Запросы на расчёт стоимости","Прямые продажи"]},
      sitePages:       {label:"Желаемые страницы на сайте", opts:["Главная","О нас","Услуги","Портфолио / Галерея","Цены","Контакты","Блог / Новости"]},
      siteTexts:       {label:"Тексты для сайта", opts:["Предоставлю сам(а)","Напиши по моим ответам","Микс — часть уже есть"]},
      hasLogo:         {label:"Есть ли у вас логотип?", opts:["Да — пришлю позже","Нет — хочу создать (доп. услуга)","Нет — используем только текст"]},
      brandStyle:      {label:"Предпочтительный стиль сайта", opts:["Современный / Технологичный","Элегантный / Утончённый","Минимализм / Чистота","Тёплый / Натуральный","Люкс / Премиум","Дружелюбный / Простой"]},
      brandColors:     {label:"Предпочтительные цвета", ph:"Напр. синий и белый, или цвета существующего логотипа..."},
      colorsAvoid:     {label:"Цвета, которых следует избегать", ph:"Напр. жёлтый, слишком много цветов..."},
      hasPhotos:       {label:"Есть ли у вас реальные фото работ / продуктов / пространства?", opts:["Да, много — пришлю","Да, немного","Нет — используем стоковые","Хочу фотосессию (доп. услуга)"]},
      hasVideo:        {label:"Есть ли видео для размещения?", opts:["Да","Нет","На производство (доп. услуга)"]},
      hasDomain:       {label:"Есть ли у вас домен (напр. www.yoursite.it)?", opts:["Да — укажу позже","Нет, нужно купить","Не знаю, что это"]},
      googleMaps:      {label:"Есть ли вы на Google Maps / Google Business?", opts:["Да, верифицирован","Да, не верифицирован","Нет"]},
      googleReviews:   {label:"Есть ли у вас отзывы на Google?", opts:["Да, больше 10","Да, меньше 10","Нет"]},
      otherReviews:    {label:"Есть ли отзывы из других каналов?", opts:["Сообщения WhatsApp от клиентов","Комментарии Facebook","Упоминания Instagram","Видео-отзывы","Нет"]},
      wantsSocial:     {label:"Хотите, чтобы мы также создали / обновили ваши соцсети?", opts:["Да — нужно создать или переделать профили","Нет — соцсети есть, нужен только сайт","Пока не знаю"]},
      socialPlatforms: {label:"Какие платформы создать / обновить?", opts:["Instagram","Facebook","TikTok","Google Business","YouTube"]},
      socialExisting:  {label:"Есть ли существующие профили?", opts:["Да, но нужно переделать","Да, только оптимизировать","Нет, всё с нуля"]},
      socialTone:      {label:"Тон голоса бренда", opts:["Профессиональный и формальный","Дружелюбный и прямой","Вдохновляющий","Веселый / Ироничный"]},
      socialBio:       {label:"Текст bio / описание профилей", opts:["Предоставлю сам(а)","Напиши ты","Есть идеи — сотрудничаем"]},
      socialContent:   {label:"Идеи о контенте для публикаций", ph:"Напр. фото до/после, видео на объекте, советы, акции..."},
      socialFreq:      {label:"Как часто планируете публиковать?", opts:["Каждый день","3-4 раза в неделю","1-2 раза в неделю","Пока не знаю"]},
      extraNotes:      {label:"Дополнительные заметки или особые пожелания", ph:"Всё, что хотите добавить..."},
    }
  }
};

// ═══════════════════════════════════════════════════════════
//  📋  STRUTTURA SEZIONI
// ═══════════════════════════════════════════════════════════
const SECTIONS = {
  identity: ["businessType","businessName","ownerName","vatCode","yearFounded","address","phone","whatsapp","whatsappNum","emailContact","existingSocials"],
  services: ["mainServices","focusService","serviceModel","clientType","budgetRange","whyChooseYou","competitors"],
  website:  ["siteGoal","sitePages","siteTexts","hasLogo","brandStyle","brandColors","colorsAvoid","hasPhotos","hasVideo","hasDomain","googleMaps","googleReviews","otherReviews"],
  social_gate: ["wantsSocial"],
  social:   ["socialPlatforms","socialExisting","socialTone","socialBio","socialContent","socialFreq","extraNotes"],
};

const SECTION_FLOW_BASE = ["identity","services","website","social_gate"];

// ═══════════════════════════════════════════════════════════
//  🛠️  HELPERS
// ═══════════════════════════════════════════════════════════
function buildWAText(answers, lang) {
  const t = LANGS[lang];
  let msg = `*${t.title}*\n_${CONFIG.agency} · ${CONFIG.tagline}_\n_${new Date().toLocaleDateString('it-IT')} · ${CONFIG.year}_\n\n`;
  const allSections = [...SECTION_FLOW_BASE];
  const gate = answers["wantsSocial"];
  if (gate && gate.includes("Sì") || gate && gate.includes("نعم") || gate && gate.includes("Да")) allSections.push("social");
  allSections.forEach(secId => {
    const sec = t.sections[secId];
    msg += `*${sec.icon} ${sec.label}*\n`;
    SECTIONS[secId].forEach(qId => {
      const qData = t.q[qId];
      if (!qData) return;
      const val = answers[qId];
      if (!val || (Array.isArray(val) && val.length === 0)) return;
      const display = Array.isArray(val) ? val.join(", ") : val;
      msg += `• ${qData.label}\n  → ${display}\n`;
    });
    msg += "\n";
  });
  msg += `---\n_Inviato tramite OMTStudio Brief · ${CONFIG.email}_`;
  return msg;
}

async function sendEmailForm(answers, lang) {
  if (CONFIG.formspreeId === "XXXXXXXX") return false;
  const t = LANGS["it"]; // sempre italiano per le email
  const allSections = [...SECTION_FLOW_BASE];
  const gate = answers["wantsSocial"];
  if (gate && (gate.includes("Sì") || gate.includes("نعم") || gate.includes("Да"))) allSections.push("social");

  let testo = `BRIEF CLIENTE — OMTStudio\n`;
  testo += `Data: ${new Date().toLocaleDateString('it-IT')} · Lingua: ${lang.toUpperCase()}\n`;
  testo += `${"─".repeat(40)}\n\n`;

  allSections.forEach(secId => {
    const sec = t.sections[secId];
    testo += `${sec.icon} ${sec.label.toUpperCase()}\n${"─".repeat(30)}\n`;
    SECTIONS[secId].forEach(qId => {
      const qData = t.q[qId];
      if (!qData) return;
      const val = answers[qId];
      if (!val || (Array.isArray(val) && val.length === 0)) return;
      const display = Array.isArray(val) ? val.join(", ") : val;
      testo += `• ${qData.label}\n  → ${display}\n`;
    });
    testo += "\n";
  });

  testo += `${"─".repeat(40)}\nOMTStudio · hello@omtstudio.it · omtstudio.it`;

  const body = {
    "_subject": `📋 Brief — ${answers["businessName"] || "Nuovo cliente"} | OMTStudio`,
    "message": testo,
    "lingua": lang.toUpperCase(),
    "cliente": answers["businessName"] || "Non specificato",
  };

  try {
    const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch { return false; }
}

function generatePDF(answers, lang) {
  const t = LANGS[lang];
  const isRTL = t.dir === "rtl";
  const allSections = [...SECTION_FLOW_BASE];
  const gate = answers["wantsSocial"];
  if (gate && (gate.includes("Sì") || gate.includes("نعم") || gate.includes("Да"))) allSections.push("social");

  let rows = "";
  allSections.forEach(secId => {
    const sec = t.sections[secId];
    rows += `<tr><td colspan="2" class="sh">${sec.icon} ${sec.label}</td></tr>`;
    SECTIONS[secId].forEach(qId => {
      const qData = t.q[qId];
      if (!qData) return;
      const val = answers[qId];
      const display = Array.isArray(val) ? val.join(", ") : (val || "—");
      rows += `<tr><td class="ql">${qData.label}</td><td class="qa">${display}</td></tr>`;
    });
  });

  const html = `<!DOCTYPE html><html dir="${t.dir}"><head><meta charset="UTF-8">
  <title>${t.title} — ${CONFIG.agency}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Cairo:wght@400;600;700&display=swap');
    body{font-family:'Outfit',sans-serif;background:#fff;color:#1B3A52;margin:0;padding:28px;direction:${t.dir};}
    .hdr{border-bottom:3px solid #3A9BAF;padding-bottom:14px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;}
    .brand{font-size:20px;font-weight:700;color:#1B3A52;}
    .sub{font-size:11px;color:#3A9BAF;margin-top:2px;}
    .meta{font-size:10px;color:#5A7A8E;text-align:${isRTL?"left":"right"};}
    table{width:100%;border-collapse:collapse;}
    .sh{background:#1B3A52;color:#CBB57B;padding:9px 12px;font-weight:700;font-size:12px;letter-spacing:.5px;}
    .ql{padding:7px 12px;font-size:11px;color:#5A7A8E;border-bottom:1px solid #D4EEF2;width:42%;vertical-align:top;}
    .qa{padding:7px 12px;font-size:12px;color:#1B3A52;border-bottom:1px solid #D4EEF2;font-weight:500;white-space:pre-wrap;}
    .ftr{margin-top:24px;text-align:center;font-size:9px;color:#7ECADB;letter-spacing:2px;text-transform:uppercase;border-top:1px solid #D4EEF2;padding-top:12px;}
    @media print{body{padding:12px;}}
  </style></head><body>
  <div class="hdr">
    <div><div class="brand">${CONFIG.agency}</div><div class="sub">${CONFIG.tagline}</div></div>
    <div class="meta">${t.title}<br>${new Date().toLocaleDateString('it-IT')} · ${CONFIG.year}</div>
  </div>
  <table>${rows}</table>
  <div class="ftr">${CONFIG.agency} · ${CONFIG.email} · omtstudio.it</div>
  <script>window.onload=()=>{window.print();}<\/script>
  </body></html>`;

  const w = window.open("","_blank");
  w.document.write(html);
  w.document.close();
}

// ═══════════════════════════════════════════════════════════
//  🧩  COMPONENTS
// ═══════════════════════════════════════════════════════════
function DecorativeBg() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",top:"-20%",right:"-10%",width:"50vw",height:"50vw",borderRadius:"50%",background:`radial-gradient(circle, ${C.tiffPale}88 0%, transparent 70%)`}} />
      <div style={{position:"absolute",bottom:"-15%",left:"-8%",width:"40vw",height:"40vw",borderRadius:"50%",background:`radial-gradient(circle, ${C.ice}99 0%, transparent 70%)`}} />
      <div style={{position:"absolute",top:"40%",left:"60%",width:"20vw",height:"20vw",borderRadius:"50%",background:`radial-gradient(circle, ${C.goldLight}44 0%, transparent 70%)`}} />
    </div>
  );
}

function ProgressDots({ steps, current }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center",marginBottom:28}}>
      {steps.map((s,i) => {
        const done = i < current, active = i === current;
        return (
          <div key={s} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{
              width: active ? 28 : 10, height:10, borderRadius:99,
              background: done ? C.tiffany : active ? C.navy : C.tiffPale,
              transition:"all 0.4s cubic-bezier(.4,0,.2,1)",
              display:"flex",alignItems:"center",justifyContent:"center"
            }}>
              {done && <span style={{fontSize:7,color:C.white}}>✓</span>}
            </div>
            {i < steps.length-1 && <div style={{width:16,height:1,background:i<current?C.tiffany:C.tiffPale}} />}
          </div>
        );
      })}
    </div>
  );
}

function QuestionField({qId, qDef, value, onChange, dir, t}) {
  const isRTL = dir === "rtl";
  const base = {
    width:"100%",boxSizing:"border-box",
    background:C.white,
    border:`1.5px solid ${C.tiffPale}`,
    borderRadius:10,color:C.navy,
    padding:"11px 14px",fontSize:14,
    fontFamily:t.font,outline:"none",
    transition:"border 0.2s, box-shadow 0.2s",
    direction:dir,
  };
  const [focused, setFocused] = useState(false);

  if (!qDef) return null;

  if (qDef.type === "text" || qDef.type === "number") return (
    <input type={qDef.type} placeholder={qDef.ph} value={value||""} onChange={e=>onChange(qId,e.target.value)}
      style={{...base, borderColor:focused?C.tiffany:C.tiffPale, boxShadow:focused?`0 0 0 3px ${C.tiffPale}`:""}}
      onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />
  );

  if (qDef.type === "textarea") return (
    <textarea placeholder={qDef.ph} value={value||""} onChange={e=>onChange(qId,e.target.value)} rows={4}
      style={{...base,resize:"vertical",lineHeight:1.6, borderColor:focused?C.tiffany:C.tiffPale, boxShadow:focused?`0 0 0 3px ${C.tiffPale}`:"" }}
      onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />
  );

  if (qDef.type === "radio") return (
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {qDef.opts.map(opt => {
        const sel = value === opt;
        return (
          <label key={opt} onClick={()=>onChange(qId,opt)} style={{
            display:"flex",alignItems:"center",gap:12,cursor:"pointer",
            padding:"10px 14px",borderRadius:10,
            border:`1.5px solid ${sel?C.tiffany:C.tiffPale}`,
            background:sel?C.ice:C.white,
            transition:"all 0.2s",
            flexDirection:isRTL?"row-reverse":"row",
          }}>
            <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,
              border:`2px solid ${sel?C.tiffany:C.tiffPale}`,
              background:sel?C.tiffany:"transparent",
              display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
              {sel && <div style={{width:6,height:6,borderRadius:"50%",background:C.white}}/>}
            </div>
            <span style={{fontSize:13.5,color:sel?C.navy:C.slate,fontFamily:t.font,fontWeight:sel?600:400}}>{opt}</span>
          </label>
        );
      })}
    </div>
  );

  if (qDef.type === "checkbox") {
    const vals = Array.isArray(value)?value:[];
    const toggle = opt => {
      const next = vals.includes(opt)?vals.filter(v=>v!==opt):[...vals,opt];
      onChange(qId,next);
    };
    return (
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {qDef.opts.map(opt => {
          const sel = vals.includes(opt);
          return (
            <label key={opt} onClick={()=>toggle(opt)} style={{
              display:"flex",alignItems:"center",gap:12,cursor:"pointer",
              padding:"10px 14px",borderRadius:10,
              border:`1.5px solid ${sel?C.tiffany:C.tiffPale}`,
              background:sel?C.ice:C.white,
              transition:"all 0.2s",
              flexDirection:isRTL?"row-reverse":"row",
            }}>
              <div style={{width:18,height:18,borderRadius:5,flexShrink:0,
                border:`2px solid ${sel?C.tiffany:C.tiffPale}`,
                background:sel?C.tiffany:"transparent",
                display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                {sel && <span style={{color:C.white,fontSize:10,fontWeight:900}}>✓</span>}
              </div>
              <span style={{fontSize:13.5,color:sel?C.navy:C.slate,fontFamily:t.font,fontWeight:sel?600:400}}>{opt}</span>
            </label>
          );
        })}
      </div>
    );
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
//  🚀  MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [lang, setLang]       = useState("it");
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone]       = useState(false);
  const [waText, setWaText]   = useState("");
  const [emailState, setEmailState] = useState("idle");
  const [gdprChecked, setGdprChecked] = useState(false);
  const [gdprError, setGdprError] = useState(false);
  const topRef = useRef(null);

  const t = LANGS[lang];
  const isRTL = t.dir === "rtl";

  // Dynamic section flow based on social gate answer
  const sectionFlow = (() => {
    const base = [...SECTION_FLOW_BASE];
    const gate = answers["wantsSocial"];
    if (gate && (gate.includes("Sì") || gate.includes("نعم") || gate.includes("Да"))) base.push("social");
    return base;
  })();

  const currentSectionId = sectionFlow[step];
  const currentSection = t.sections[currentSectionId];
  const currentQIds = SECTIONS[currentSectionId] || [];
  const isLastStep = step === sectionFlow.length - 1;

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const setAns = (id, val) => setAnswers(p => ({...p, [id]: val}));

  const scrollTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({behavior:"smooth"}), 50);
  };

  const handleNext = () => {
    if (isLastStep) {
      if (!gdprChecked) { setGdprError(true); return; }
      setWaText(buildWAText(answers, lang));
      setDone(true);
      scrollTop();
    } else {
      setStep(s => s+1);
      scrollTop();
    }
  };

  const handleEmail = async () => {
    if (CONFIG.formspreeId === "XXXXXXXX") {
      alert("⚙️ Configura il tuo Formspree ID nel codice (CONFIG.formspreeId)");
      return;
    }
    setEmailState("sending");
    const ok = await sendEmailForm(answers, lang);
    setEmailState(ok ? "sent" : "error");
    setTimeout(() => setEmailState("idle"), 4000);
  };

  const font = t.font;

  // ── HEADER COMPONENT ──
  const Header = ({showLang=true}) => (
    <div ref={topRef} style={{
      position:"sticky",top:0,zIndex:100,
      background:`${C.navy}F8`,backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${C.navyMid}`,
      padding:"12px 20px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      flexDirection:isRTL?"row-reverse":"row",
    }}>
      <div style={{flexDirection:isRTL?"row-reverse":"row",display:"flex",alignItems:"center",gap:10}}>
        <div style={{
          width:32,height:32,borderRadius:8,
          background:C.tiffany,display:"flex",alignItems:"center",justifyContent:"center",
          fontWeight:700,fontSize:13,color:C.white,fontFamily:font,flexShrink:0
        }}>O</div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.white,fontFamily:font,letterSpacing:.5}}>{CONFIG.agency}</div>
          <div style={{fontSize:9,color:C.gold,fontFamily:font,letterSpacing:1,textTransform:"uppercase"}}>{CONFIG.tagline}</div>
        </div>
      </div>
      {showLang && (
        <div style={{display:"flex",gap:6}}>
  {["it","ar","ru"].map(l => (
    <button key={l} onClick={()=>setLang(l)} style={{
      padding:"7px 12px",
      border:`2px solid ${lang===l ? C.gold : "rgba(255,255,255,0.25)"}`,
      borderRadius:10,cursor:"pointer",
      fontFamily:font,fontSize:13,fontWeight:700,
      background:lang===l ? C.gold : "rgba(255,255,255,0.1)",
      color:lang===l ? C.navy : C.white,
      transition:"all 0.2s",
      display:"flex",alignItems:"center",gap:5,
      boxShadow:lang===l ? `0 2px 12px rgba(203,181,123,0.4)` : "none",
    }}>
      <span style={{fontSize:18}}>{LANGS[l].flag}</span>
      <span style={{fontSize:11,letterSpacing:1}}>{LANGS[l].code}</span>
    </button>
  ))}
</div>
      )}
    </div>
  );

  // ── SUCCESS SCREEN ──
  if (done) return (
    <div style={{minHeight:"100vh",background:C.tiffMist,fontFamily:font,direction:t.dir}}>
      <Header showLang={false}/>
      <DecorativeBg/>
      <div style={{maxWidth:580,margin:"0 auto",padding:"36px 20px 60px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:36,marginBottom:8}}>✅</div>
          <h1 style={{fontSize:24,fontWeight:700,color:C.navy,margin:0,fontFamily:font}}>{t.successTitle}</h1>
          <p style={{color:C.slate,fontSize:13,marginTop:6,fontFamily:font}}>{t.successMsg}</p>
        </div>

        <div style={{background:C.white,borderRadius:16,border:`1.5px solid ${C.tiffPale}`,padding:20,marginBottom:16,boxShadow:`0 4px 24px ${C.tiffPale}`}}>
          <div style={{background:C.tiffMist,borderRadius:10,padding:14,marginBottom:16,maxHeight:180,overflowY:"auto"}}>
            <pre style={{color:C.slate,fontSize:11,margin:0,whiteSpace:"pre-wrap",fontFamily:font,direction:t.dir,textAlign:isRTL?"right":"left"}}>{waText}</pre>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" style={{
              display:"flex",alignItems:"center",justifyContent:"center",gap:10,
              padding:"14px",borderRadius:12,textDecoration:"none",
              background:"linear-gradient(135deg,#25D366,#128C7E)",
              color:C.white,fontSize:15,fontWeight:700,fontFamily:font,
              boxShadow:"0 6px 20px rgba(37,211,102,0.3)"
            }}>{t.sendWA}</a>

            <button onClick={handleEmail} style={{
              padding:"14px",borderRadius:12,border:`1.5px solid ${emailState==="sent"?"#25D366":emailState==="error"?"#e05050":C.tiffany}`,
              background:emailState==="sent"?"rgba(37,211,102,0.08)":emailState==="error"?"rgba(220,50,50,0.08)":"rgba(58,155,175,0.06)",
              color:emailState==="sent"?"#25D366":emailState==="error"?"#e05050":C.tiffany,
              fontSize:15,fontWeight:700,fontFamily:font,cursor:"pointer",transition:"all 0.3s"
            }}>
              {emailState==="sending"?"..." : emailState==="sent"?t.emailSent : emailState==="error"?t.emailError : t.sendEmail}
            </button>

            <button onClick={()=>generatePDF(answers,lang)} style={{
              padding:"14px",borderRadius:12,
              background:`rgba(203,181,123,0.08)`,
              border:`1.5px solid ${C.gold}`,
              color:C.gold,fontSize:15,fontWeight:700,fontFamily:font,cursor:"pointer"
            }}>{t.dlPDF}</button>
          </div>
        </div>

        <button onClick={()=>{setDone(false);setStep(0);setAnswers({});setGdprChecked(false);setGdprError(false);scrollTop();}} style={{
          width:"100%",padding:"11px",background:"transparent",
          border:`1px solid ${C.tiffPale}`,borderRadius:12,
          color:C.slate,fontSize:12,fontFamily:font,cursor:"pointer"
        }}>{t.restart}</button>
      </div>
    </div>
  );

  // ── MAIN FORM ──
  return (
    <div style={{minHeight:"100vh",background:C.tiffMist,fontFamily:font,direction:t.dir}}>
      <Header/>
      <DecorativeBg/>

      <div style={{maxWidth:600,margin:"0 auto",padding:"28px 20px 72px",position:"relative",zIndex:1}}>

        {/* Intro banner — solo primo step */}
        {step === 0 && (
          <div style={{
            background:C.white,borderRadius:14,
            border:`1.5px solid ${C.tiffPale}`,
            padding:"16px 18px",marginBottom:20,
            boxShadow:`0 2px 16px ${C.tiffPale}`,
            textAlign:isRTL?"right":"left"
          }}>
            <div style={{fontSize:11,fontWeight:600,color:C.tiffany,letterSpacing:2,textTransform:"uppercase",marginBottom:6,fontFamily:font}}>
              {CONFIG.agency} · {CONFIG.year}
            </div>
            <div style={{fontSize:22,fontWeight:700,color:C.navy,marginBottom:6,fontFamily:font}}>{t.title}</div>
            <div style={{fontSize:12,color:C.slate,lineHeight:1.7,fontFamily:font}}>{t.intro}</div>
          </div>
        )}

        {/* Progress dots */}
        <ProgressDots steps={sectionFlow} current={step}/>

        {/* Section header */}
        <div style={{
          display:"flex",alignItems:"center",gap:10,marginBottom:20,
          flexDirection:isRTL?"row-reverse":"row"
        }}>
          <div style={{
            width:40,height:40,borderRadius:10,
            background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:18,flexShrink:0
          }}>{currentSection?.icon}</div>
          <div>
            <div style={{fontSize:17,fontWeight:700,color:C.navy,fontFamily:font}}>{currentSection?.label}</div>
            <div style={{fontSize:11,color:C.slate,fontFamily:font}}>
              {t.sectionOf ? `${step+1} ${t.sectionOf} ${sectionFlow.length}` : `${step+1}/${sectionFlow.length}`}
            </div>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background:C.white,borderRadius:16,
          border:`1.5px solid ${C.tiffPale}`,
          padding:"24px 20px",
          boxShadow:`0 4px 32px rgba(58,155,175,0.08)`,
          textAlign:isRTL?"right":"left"
        }}>

          {/* Tiffany accent top bar */}
          <div style={{height:3,background:`linear-gradient(90deg,${C.tiffany},${C.gold})`,borderRadius:99,marginBottom:24,marginTop:-24,marginLeft:-20,marginRight:-20,borderTopLeftRadius:14,borderTopRightRadius:14}}/>

          <div style={{display:"flex",flexDirection:"column",gap:22}}>
            {currentQIds.map((qId, qi) => {
              const qData = t.q[qId];
              if (!qData) return null;
              const qType = qData.opts ? (qData.opts.length > 0 && qId !== "mainServices" && qId !== "focusService" && qId !== "clientType" && qId !== "brandColors" && qId !== "colorsAvoid" && qId !== "competitors" && qId !== "extraNotes" && qId !== "socialContent" ? "radio" : "textarea") : "text";
              const qDefFull = {
                type: qData.ph && !qData.opts ? (qData.ph.includes("\n") ? "textarea" : "text") : qData.opts ? (["sitePages","existingSocials","otherReviews","socialPlatforms"].includes(qId) ? "checkbox" : "radio") : "text",
                ph: qData.ph,
                opts: qData.opts,
              };

              return (
                <div key={qId} style={{animationDelay:`${qi*40}ms`}}>
                  <label style={{
                    display:"block",marginBottom:9,
                    color:C.navy,fontSize:13.5,lineHeight:1.55,
                    fontFamily:font,fontWeight:600,
                  }}>
                    <span style={{color:C.tiffany,marginRight:isRTL?0:8,marginLeft:isRTL?8:0}}>{qi+1}.</span>
                    {qData.label}
                  </label>
                  <QuestionField qId={qId} qDef={qDefFull} value={answers[qId]} onChange={setAns} dir={t.dir} t={t}/>
                </div>
              );
            })}
          </div>

          {/* GDPR — solo ultimo step */}
          {isLastStep && (
            <div style={{marginTop:24,padding:"14px 16px",background:C.ice,borderRadius:10,border:`1px solid ${gdprError?`#E05050`:C.tiffPale}`}}>
              <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",flexDirection:isRTL?"row-reverse":"row"}}>
                <div onClick={()=>{setGdprChecked(v=>!v);setGdprError(false);}} style={{
                  width:20,height:20,borderRadius:5,flexShrink:0,marginTop:1,
                  border:`2px solid ${gdprChecked?C.tiffany:gdprError?"#E05050":C.tiffPale}`,
                  background:gdprChecked?C.tiffany:"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",cursor:"pointer"
                }}>
                  {gdprChecked && <span style={{color:C.white,fontSize:11,fontWeight:900}}>✓</span>}
                </div>
                <span style={{fontSize:11,color:C.slate,lineHeight:1.6,fontFamily:font}}>{t.gdpr}</span>
              </label>
              {gdprError && <p style={{color:"#E05050",fontSize:11,margin:"6px 0 0",fontFamily:font}}>{t.gdprError}</p>}
            </div>
          )}

          {/* Navigation */}
          <div style={{marginTop:24,display:"flex",gap:10,flexDirection:isRTL?"row-reverse":"row"}}>
            {step > 0 && (
              <button onClick={()=>{setStep(s=>s-1);scrollTop();}} style={{
                flex:1,padding:"13px",
                background:"transparent",
                border:`1.5px solid ${C.tiffPale}`,borderRadius:12,
                color:C.slate,fontSize:14,cursor:"pointer",fontFamily:font,fontWeight:500
              }}>{t.prev}</button>
            )}
            <button onClick={handleNext} style={{
              flex:2,padding:"13px",border:"none",borderRadius:12,
              background:isLastStep
                ? `linear-gradient(135deg,#25D366,#128C7E)`
                : `linear-gradient(135deg,${C.tiffany},${C.tiffLight})`,
              color:C.white,fontSize:14,fontWeight:700,
              cursor:"pointer",fontFamily:font,
              boxShadow:isLastStep
                ? "0 6px 20px rgba(37,211,102,0.3)"
                : `0 6px 20px rgba(58,155,175,0.3)`,
              transition:"all 0.2s"
            }}>
              {isLastStep ? t.submit : t.next}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{textAlign:"center",marginTop:24,fontSize:10,color:C.slate,fontFamily:font,letterSpacing:2,textTransform:"uppercase"}}>
          {CONFIG.agency} · {CONFIG.email}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box} ::-webkit-scrollbar{display:none}
        button:hover{opacity:0.88} a:hover{opacity:0.88}
        input::placeholder,textarea::placeholder{color:#A0B4C0}
      `}</style>
    </div>
  );
}
