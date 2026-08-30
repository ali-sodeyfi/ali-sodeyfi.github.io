const email = "Sodeyfi.ali@gmail.com";
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const dailyArticleContainer = document.querySelector("[data-daily-article]");
const articleListContainer = document.querySelector("[data-article-list]");
const contentCalendarContainer = document.querySelector("[data-content-calendar]");
const html = document.documentElement;
const liveSiteUrl = "https://alisodeyfi.ir/";
const defaultShareImageUrl = `${liveSiteUrl}assets/ali-sodeyfi.jpg`;
const contentOverrideUrl = "./content-overrides.json";
let publishingPlan = null;
let selectedArticleIndex = null;

const translations = {
  fa: {
    documentTitle: "علی سدیفی | یادداشت‌هایی درباره ساختن",
    metaDescription:
      "علی سدیفی؛ یادداشت‌هایی درباره ساختن کسب‌وکار، محصول و تیم، و تبدیل ابهام به تصمیم‌های روشن.",
    brandRole: "ساختن، محصول، تیم",
    navWork: "تجربه‌ها",
    navThesis: "روش کار",
    navArticles: "مقالات",
    navContact: "تماس",
    eyebrow: "علی سدیفی / Ali Sodeyfi",
    heroTitle: "علی سدیفی",
    heroLead:
      "درباره ساختن کسب‌وکار، محصول و تیم؛ جایی که ابهام باید به تصمیم روشن و کار قابل اجرا تبدیل شود.",
    heroThesis:
      "برای من کار جدی از جایی شروع می‌شود که جواب آماده نداریم: باید مسئله را دقیق‌تر ببینیم، شواهد را از حدس جدا کنیم و قدم بعدی را کوچک اما واقعی انتخاب کنیم.",
    heroPrimary: "خواندن یادداشت‌ها",
    profileCaptionLabel: "اکنون",
    profileCaption:
      "این روزها بیشتر به رشد پلتفرم‌ها، اعتماد در مقیاس، یادگیری بازار و ساده‌سازی عملیات فکر می‌کنم.",
    positioningLabel: "زاویه نگاه",
    positioningTitle:
      "ساختن برایم یعنی کم‌کردن ابهام، نه زیادکردن ادعا.",
    positioningBody:
      "در پروژه‌های مختلف، مسئله اصلی معمولاً خود ایده نیست؛ فاصله بین چیزی است که تیم تصور می‌کند، چیزی که بازار نشان می‌دهد و تصمیمی که باید امروز گرفته شود.",
    briefOneLabel: "مسئله",
    briefOne:
      "کدام درد واقعی است و چه شاهدی داریم که فقط برداشت داخلی نیست؟",
    briefTwoLabel: "ریتم",
    briefTwo:
      "یادگیری از بازار دقیقاً کجای ریتم هفتگی تیم می‌نشیند؟",
    briefThreeLabel: "سیستم",
    briefThree:
      "کدام تصمیم‌ها باید تبدیل به سیستم شوند و کدام هنوز به قضاوت انسانی نیاز دارند؟",
    trackLabel: "مسیر کار",
    trackTitle: "تجربه‌هایی که زاویه نگاه را ساخته‌اند",
    trackIntro:
      "کوتاه و بی‌اغراق: چند زمینه کاری که از آن‌ها درباره محصول، بازار، سرمایه و اعتماد یاد گرفته‌ام.",
    workOneYear: "اکوسیستم",
    workOneTitle: "باسلام - توسعه اکوسیستم",
    workOneDescription:
      "باسلام یک پلتفرم خرید و فروش اجتماعی است که فروشنده‌های کوچک و خریداران را در یک بازارگاه انسانی‌تر به هم وصل می‌کند.",
    workOneBody:
      "در باسلام، رشد پلتفرم را از زاویه اعتماد، هماهنگی و سازوکارهای کوچک عملیاتی دیدم؛ چیزهایی که بیرون از فهرست قابلیت‌ها هم محصول را می‌سازند.",
    workTwoYear: "سرمایه‌گذاری اولیه",
    workTwoTitle: "100استارتاپ - هم‌بنیان‌گذار و مدیرعامل",
    workTwoDescription:
      "100استارتاپ پلتفرمی برای سرمایه‌گذاری و همراهی با تیم‌های نوپا در مرحله‌های اولیه شکل‌گیری کسب‌وکار بود.",
    workTwoBody:
      "کار نزدیک با تیم‌های نوپا نشان داد کیفیت بنیان‌گذار، ریتم همراهی و اعتماد عملی، قبل از هر مدل مالی یا برنامه رشد معنا پیدا می‌کند.",
    workThreeYear: "کار حرفه‌ای",
    workThreeTitle: "آکادمی تکانش - هم‌بنیان‌گذار و عضو هیئت‌مدیره",
    workThreeDescription:
      "آکادمی تکانش روی آموزش و حرفه‌ای‌تر شدن مسیر کار مستقل و فریلنسری تمرکز داشت.",
    workThreeBody:
      "در تکانش، مسئله فقط آموزش نبود؛ تبدیل کار مستقل به مسیر حرفه‌ای‌تر، قابل اتکاتر و قابل گفت‌وگوتر بود.",
    workFourYear: "اعتماد و فرایند",
    workFourTitle: "همیان - هم‌بنیان‌گذار و عضو هیئت‌مدیره",
    workFourDescription:
      "همیان تجربه‌ای در طراحی سازوکارهای مالی و قرض‌الحسنه بود؛ جایی که اعتماد و شفافیت بخش اصلی محصول محسوب می‌شد.",
    workFourBody:
      "در کار مالی اجتماعی، مسئله این بود که فرایند چطور می‌تواند اعتماد را سنگین نکند و شفافیت را به رفتار روزمره تبدیل کند.",
    workFiveYear: "آموزش و محصول",
    workFiveTitle: "شتاب‌دهنده EduTech - بنیان‌گذار و مدیرعامل",
    workFiveDescription:
      "شتاب‌دهنده EduTech برای کمک به تیم‌هایی شکل گرفت که می‌خواستند ایده‌های آموزشی را به محصول و کسب‌وکار تبدیل کنند.",
    workFiveBody:
      "کار با تیم‌های آموزشی یادآوری کرد که ایده خوب وقتی محصول می‌شود که زبان آموزش، بازار و عملیات به هم نزدیک شود.",
    thesisLabel: "روش کار",
    thesisTitle: "اصولی که در کار مدام برمی‌گردند",
    thesisIntro:
      "در پروژه‌های مختلف، جواب‌ها عوض شده‌اند؛ اما این چند اصل زیاد برگشته‌اند.",
    focusOneTitle: "از مسئله شروع کن",
    focusOneBody:
      "قبل از ساختن راه‌حل، باید معلوم شود درد واقعی کجاست، چه کسی آن را جدی حس می‌کند و چه شواهدی داریم.",
    focusTwoTitle: "سیستم را زودتر از سازمان سنگین نکن",
    focusTwoBody:
      "فرایند خوب باید ابهام را کم کند، نه اینکه سرعت یادگیری و قضاوت آدم‌ها را بگیرد.",
    focusThreeTitle: "زبان مشترک بساز",
    focusThreeBody:
      "خیلی از مسئله‌ها از نداشتن زبان مشترک بین تیم، بازار، سرمایه‌گذار و عملیات سخت می‌شوند.",
    articlesLabel: "مطالعه",
    articlesTitle: "مطالعه برای ساختن بهتر",
    articlesIntro:
      "متن‌های معتبر درباره کارآفرینی، رشد و ساخت شرکت؛ با ترجمه آزاد داخل سایت و ارجاع روشن به منبع اصلی.",
    articleTodayLabel: "انتخاب امروز",
    articleSelectedLabel: "ترجمه منتخب",
    articleArchiveLabel: "آرشیو منتخب",
    articleSourceLabel: "منبع",
    articleDateLabel: "به‌روزرسانی منظم",
    articleReadLabel: "منبع اصلی",
    articleOnSiteLabel: "ترجمه و برداشت آزاد",
    articleArchiveReadOnSiteLabel: "ترجمه داخل سایت",
    articleShareLabel: "اشتراک‌گذاری",
    articleShareSuccess: "لینک مستقیم مقاله کپی شد.",
    articleShareManualLabel: "لینک مستقیم مقاله:",
    articleShareText: "ترجمه فارسی این مقاله را اینجا بخوان:",
    articleTranslationNote:
      "ترجمه و برداشت آزاد از ایده‌های اصلی مقاله، با ارجاع به منبع اصلی.",
    articleAdviceLabel: "توصیه‌های منتخب از مقاله",
    articleTakeawaysLabel: "نکات اجرایی",
    articleCopyrightNote:
      "این متن ترجمه آزاد و بازنویسی‌شده است، نه بازنشر کلمه‌به‌کلمه مقاله اصلی.",
    contentCalendarLabel: "تقویم محتوا",
    contentCalendarTitle: "چیزی که این هفته منتشر می‌شود",
    contentCalendarIntro:
      "خروجی‌های کوتاه و واقعی برای سایت، لینکدین و استوری؛ نه وعده‌های مبهم.",
    contactLabel: "تماس",
    contactTitle:
      "اگر مسئله‌ای داری که هنوز خوب نام‌گذاری نشده، خوشحال می‌شوم بشنوم.",
    contactBody:
      "یک پیام کوتاه با زمینه مسئله، مرحله کار و چیزی که می‌خواهی روشن‌تر شود کافی است. اگر گفت‌وگو مفید بود، ادامه‌اش را پیدا می‌کنیم.",
    copyEmail: "کپی ایمیل",
    copySuccess: "ایمیل کپی شد.",
    copyFallback: "ایمیل: Sodeyfi.ali@gmail.com",
    footerText: "یادداشت‌ها، تجربه‌ها و نوشته‌هایی درباره ساختن.",
  },
  en: {
    documentTitle: "Ali Sodeyfi | Notes on building",
    metaDescription:
      "Ali Sodeyfi: notes on building businesses, products, and teams, and turning ambiguity into clearer decisions.",
    brandRole: "Building, product, teams",
    navWork: "Work",
    navThesis: "Method",
    navArticles: "Articles",
    navContact: "Contact",
    eyebrow: "Ali Sodeyfi",
    heroTitle: "Ali Sodeyfi",
    heroLead:
      "Notes on building businesses, products, and teams where ambiguity has to become clearer decisions and executable work.",
    heroThesis:
      "Serious work starts for me where there is no ready-made answer: see the problem more precisely, separate evidence from assumption, and choose the next small real step.",
    heroPrimary: "Read notes",
    profileCaptionLabel: "Now",
    profileCaption:
      "Thinking about platform growth, trust at scale, market learning, and simpler operations.",
    positioningLabel: "Point of view",
    positioningTitle:
      "Building, to me, means reducing ambiguity rather than adding claims.",
    positioningBody:
      "Across different projects, the hard part is rarely the idea alone. It is the gap between what the team believes, what the market is showing, and the decision that has to be made today.",
    briefOneLabel: "Problem",
    briefOne:
      "Which pain is real, and what evidence proves it is not only an internal belief?",
    briefTwoLabel: "Rhythm",
    briefTwo:
      "Where exactly does market learning enter the team's weekly operating rhythm?",
    briefThreeLabel: "System",
    briefThree:
      "Which decisions should become systems, and which still need human judgment?",
    trackLabel: "Work path",
    trackTitle: "Experiences that shaped the point of view",
    trackIntro:
      "Briefly and without theater: a few contexts that taught me about product, market, capital, and trust.",
    workOneYear: "Ecosystem",
    workOneTitle: "Basalam - Ecosystem Development",
    workOneDescription:
      "Basalam is a social commerce marketplace that connects small sellers and buyers in a more human shopping environment.",
    workOneBody:
      "At Basalam, platform growth became visible through trust, coordination, and small operating mechanisms, not only through features and numbers.",
    workTwoYear: "Early investment",
    workTwoTitle: "100Startups - Co-Founder & CEO",
    workTwoDescription:
      "100Startups was a platform for investing in and working with early-stage teams as their businesses were taking shape.",
    workTwoBody:
      "Working closely with early teams showed that founder quality, support rhythm, and practical trust come before any financial model or growth plan has meaning.",
    workThreeYear: "Professional work",
    workThreeTitle: "Tekanesh Academy - Co-Founder & Board Member",
    workThreeDescription:
      "Tekanesh Academy focused on learning systems and the professionalization of independent and freelance work.",
    workThreeBody:
      "At Tekanesh, the question was not education alone; it was how independent work could become more professional, reliable, and easier to discuss.",
    workFourYear: "Trust and process",
    workFourTitle: "Hamyan - Co-Founder & Board Member",
    workFourDescription:
      "Hamyan was an experience in designing financial and Qarz-al-Hasanah mechanisms where trust and transparency were core parts of the product.",
    workFourBody:
      "In social finance, the question was how process could avoid making trust heavier and turn transparency into everyday behavior.",
    workFiveYear: "Learning and product",
    workFiveTitle: "EduTech Accelerator - Founder & CEO",
    workFiveDescription:
      "EduTech Accelerator helped teams turn education ideas into products and businesses.",
    workFiveBody:
      "Working with education teams was a reminder that strong ideas become products only when learning, market, and operations start speaking closer languages.",
    thesisLabel: "Method",
    thesisTitle: "Principles that keep returning in the work",
    thesisIntro:
      "Across different projects, the answers changed. These principles kept returning.",
    focusOneTitle: "Start with the problem",
    focusOneBody:
      "Before building a solution, clarify where the pain is, who feels it seriously, and what evidence exists.",
    focusTwoTitle: "Do not make the system heavy too early",
    focusTwoBody:
      "A good process should reduce ambiguity, not slow down learning and human judgment.",
    focusThreeTitle: "Build shared language",
    focusThreeBody:
      "Many problems become harder because teams, markets, investors, and operations do not yet have the same language.",
    articlesLabel: "Reading",
    articlesTitle: "Reading for building better",
    articlesIntro:
      "Credible writing on entrepreneurship, growth, and company building, with an on-site adaptation and a clear link to the original source.",
    articleTodayLabel: "Today's pick",
    articleSelectedLabel: "Selected translation",
    articleArchiveLabel: "Selected archive",
    articleSourceLabel: "Source",
    articleDateLabel: "Regular update",
    articleReadLabel: "Original source",
    articleOnSiteLabel: "Translation and notes",
    articleArchiveReadOnSiteLabel: "Read on site",
    articleShareLabel: "Share",
    articleShareSuccess: "Direct article link copied.",
    articleShareManualLabel: "Direct article link:",
    articleShareText: "Read this on-site article adaptation here:",
    articleTranslationNote:
      "A readable adaptation of the article's core ideas, with the original source clearly credited.",
    articleAdviceLabel: "Selected advice from the article",
    articleTakeawaysLabel: "Operating takeaways",
    articleCopyrightNote:
      "This is a free adaptation, not a word-for-word republication of the original article.",
    contentCalendarLabel: "Content calendar",
    contentCalendarTitle: "What gets published this week",
    contentCalendarIntro:
      "Short, real outputs for the site, LinkedIn, and stories - not vague promises.",
    contactLabel: "Contact",
    contactTitle:
      "If you are carrying a problem that is not clearly named yet, I would be glad to hear it.",
    contactBody:
      "A short note with the problem context, the stage of work, and what you are trying to make clearer is enough. If the conversation is useful, it will find its next step.",
    copyEmail: "Copy email",
    copySuccess: "Email copied.",
    copyFallback: "Email: Sodeyfi.ali@gmail.com",
    footerText: "Notes, work, and essays on building.",
  },
  ar: {
    documentTitle: "علي سدیفي | ملاحظات عن البناء",
    metaDescription:
      "علي سدیفي: ملاحظات عن بناء الأعمال والمنتجات والفرق، وتحويل الغموض إلى قرارات أوضح.",
    brandRole: "البناء، المنتج، الفرق",
    navWork: "التجارب",
    navThesis: "المنهج",
    navArticles: "مقالات",
    navContact: "التواصل",
    eyebrow: "علي سدیفي / Ali Sodeyfi",
    heroTitle: "علي سدیفي",
    heroLead:
      "ملاحظات عن بناء الأعمال والمنتجات والفرق، حيث يجب أن يتحول الغموض إلى قرارات أوضح وعمل قابل للتنفيذ.",
    heroThesis:
      "يبدأ العمل الجاد بالنسبة لي عندما لا تكون هناك إجابة جاهزة: رؤية المشكلة بدقة أكبر، فصل الدليل عن الافتراض، واختيار خطوة صغيرة لكنها حقيقية.",
    heroPrimary: "قراءة الملاحظات",
    profileCaptionLabel: "الآن",
    profileCaption:
      "أفكر في نمو المنصات، والثقة على نطاق واسع، والتعلم من السوق، وتبسيط العمليات.",
    positioningLabel: "زاوية نظر",
    positioningTitle:
      "البناء بالنسبة لي يعني تقليل الغموض، لا زيادة الادعاءات.",
    positioningBody:
      "في المشاريع المختلفة، لا تكون الصعوبة غالبا في الفكرة وحدها، بل في الفجوة بين ما يعتقده الفريق، وما يظهره السوق، والقرار الذي يجب اتخاذه اليوم.",
    briefOneLabel: "المشكلة",
    briefOne:
      "أي ألم حقيقي، وما الدليل على أنه ليس مجرد اعتقاد داخلي؟",
    briefTwoLabel: "الإيقاع",
    briefTwo:
      "أين يدخل التعلم من السوق تحديدا في إيقاع الفريق الأسبوعي؟",
    briefThreeLabel: "النظام",
    briefThree:
      "أي قرارات يجب أن تتحول إلى أنظمة، وأيها ما زال يحتاج إلى حكم بشري؟",
    trackLabel: "مسار العمل",
    trackTitle: "تجارب شكلت زاوية النظر",
    trackIntro:
      "بإيجاز ومن دون مبالغة: بعض السياقات التي علمتني عن المنتج والسوق ورأس المال والثقة.",
    workOneYear: "المنظومة",
    workOneTitle: "Basalam - تطوير المنظومة",
    workOneDescription:
      "Basalam سوق تجارة اجتماعية يربط البائعين الصغار بالمشترين في تجربة شراء أكثر إنسانية.",
    workOneBody:
      "في Basalam، ظهر نمو المنصة من خلال الثقة والتنسيق والآليات التشغيلية الصغيرة، لا من خلال الميزات والأرقام فقط.",
    workTwoYear: "استثمار مبكر",
    workTwoTitle: "100Startups - شريك مؤسس ومدير تنفيذي",
    workTwoDescription:
      "100Startups كانت منصة للاستثمار في الفرق الناشئة ومرافقتها في المراحل الأولى من تشكل العمل.",
    workTwoBody:
      "العمل القريب مع الفرق الأولى أظهر أن جودة المؤسس وإيقاع المرافقة والثقة العملية تسبق معنى أي نموذج مالي أو خطة نمو.",
    workThreeYear: "عمل مهني",
    workThreeTitle: "Tekanesh Academy - شريك مؤسس وعضو مجلس إدارة",
    workThreeDescription:
      "ركزت Tekanesh Academy على أنظمة التعلم وجعل العمل المستقل والحر أكثر مهنية.",
    workThreeBody:
      "في Tekanesh، لم تكن المسألة تعليما فقط؛ بل كيف يصبح العمل المستقل أكثر مهنية واعتمادية وقابلية للنقاش.",
    workFourYear: "ثقة وعملية",
    workFourTitle: "Hamyan - شريك مؤسس وعضو مجلس إدارة",
    workFourDescription:
      "كانت Hamyan تجربة في تصميم آليات مالية وقرض حسن حيث تكون الثقة والشفافية جزءا أساسيا من المنتج.",
    workFourBody:
      "في التمويل الاجتماعي، كان السؤال كيف يمكن للعملية ألا تجعل الثقة أثقل، وأن تحول الشفافية إلى سلوك يومي.",
    workFiveYear: "تعلم ومنتج",
    workFiveTitle: "EduTech Accelerator - مؤسس ومدير تنفيذي",
    workFiveDescription:
      "ساعدت EduTech Accelerator فرقا على تحويل أفكار التعليم إلى منتجات وأعمال.",
    workFiveBody:
      "العمل مع فرق التعليم كان تذكيرا بأن الأفكار الجيدة تصبح منتجات عندما تقترب لغة التعلم والسوق والعمليات من بعضها.",
    thesisLabel: "المنهج",
    thesisTitle: "مبادئ تعود باستمرار في العمل",
    thesisIntro:
      "في المشاريع المختلفة تغيرت الإجابات، لكن هذه المبادئ ظلت تعود.",
    focusOneTitle: "ابدأ من المشكلة",
    focusOneBody:
      "قبل بناء الحل، يجب توضيح موضع الألم، ومن يشعر به بجدية، وما الأدلة الموجودة.",
    focusTwoTitle: "لا تجعل النظام ثقيلا مبكرا",
    focusTwoBody:
      "العملية الجيدة يجب أن تقلل الغموض، لا أن تبطئ التعلم وحكم الأشخاص.",
    focusThreeTitle: "ابن لغة مشتركة",
    focusThreeBody:
      "تصبح مشكلات كثيرة أصعب لأن الفريق والسوق والمستثمرين والعمليات لا يملكون اللغة نفسها بعد.",
    articlesLabel: "قراءة",
    articlesTitle: "قراءة للبناء بشكل أفضل",
    articlesIntro:
      "كتابات موثوقة عن ريادة الأعمال والنمو وبناء الشركات، مع ترجمة حرة داخل الموقع وإشارة واضحة إلى المصدر الأصلي.",
    articleTodayLabel: "اختيار اليوم",
    articleSelectedLabel: "ترجمة مختارة",
    articleArchiveLabel: "أرشيف مختار",
    articleSourceLabel: "المصدر",
    articleDateLabel: "تحديث منتظم",
    articleReadLabel: "المصدر الأصلي",
    articleOnSiteLabel: "ترجمة وملاحظات حرة",
    articleArchiveReadOnSiteLabel: "قراءة داخل الموقع",
    articleShareLabel: "مشاركة",
    articleShareSuccess: "تم نسخ رابط المقال المباشر.",
    articleShareManualLabel: "رابط المقال المباشر:",
    articleShareText: "اقرأ ترجمة هذا المقال داخل الموقع هنا:",
    articleTranslationNote:
      "إعادة صياغة مقروءة لأفكار المقال الأساسية، مع الإشارة الواضحة إلى المصدر الأصلي.",
    articleAdviceLabel: "نصائح مختارة من المقال",
    articleTakeawaysLabel: "نقاط تشغيلية",
    articleCopyrightNote:
      "هذا النص ترجمة حرة وإعادة صياغة، وليس إعادة نشر حرفية للمقال الأصلي.",
    contentCalendarLabel: "تقويم المحتوى",
    contentCalendarTitle: "ما الذي سيُنشر هذا الأسبوع",
    contentCalendarIntro:
      "مخرجات قصيرة وحقيقية للموقع ولينكدإن والستوري، لا وعودا مبهمة.",
    contactLabel: "التواصل",
    contactTitle:
      "إذا كانت لديك مشكلة لم تحصل بعد على اسم واضح، يسعدني أن أسمعها.",
    contactBody:
      "تكفي رسالة قصيرة عن سياق المشكلة ومرحلة العمل وما تريد جعله أوضح. إذا كان الحديث مفيدا، سيجد خطوته التالية.",
    copyEmail: "نسخ البريد",
    copySuccess: "تم نسخ البريد.",
    copyFallback: "البريد: Sodeyfi.ali@gmail.com",
    footerText: "ملاحظات وتجارب ومقالات عن البناء.",
  },
};

const articleCatalog = [
  {
    title: "Do Things that Don't Scale",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2013",
    url: "https://paulgraham.com/ds.html",
    tags: {
      fa: ["رشد اولیه", "کاربر", "اجرا"],
      en: ["early growth", "users", "execution"],
      ar: ["النمو المبكر", "المستخدمون", "التنفيذ"],
    },
    summary: {
      fa: "یکی از روشن‌ترین یادآوری‌ها برای بنیان‌گذارها: در شروع، کارهایی که مقیاس‌پذیر نیستند اغلب همان چیزهایی‌اند که یادگیری، اعتماد و رشد واقعی را می‌سازند.",
      en: "A classic reminder for founders: in the earliest stage, the unscalable work is often what creates learning, trust, and real growth.",
      ar: "تذكير كلاسيكي للمؤسسين: في المرحلة الأولى، الأعمال غير القابلة للتوسع غالبا هي ما يصنع التعلم والثقة والنمو الحقيقي.",
    },
  },
  {
    title: "Startup = Growth",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2012",
    url: "https://paulgraham.com/growth.html",
    tags: {
      fa: ["رشد", "تعریف استارتاپ"],
      en: ["growth", "startup definition"],
      ar: ["النمو", "تعريف الشركة الناشئة"],
    },
    summary: {
      fa: "استارتاپ را نه با کوچک بودن یا تکنولوژی، بلکه با ظرفیت رشد سریع تعریف می‌کند؛ چارچوبی ساده برای فهمیدن اینکه چه چیزی واقعا venture-scale است.",
      en: "Defines a startup by its capacity for rapid growth, not by size or technology; a clean frame for thinking about venture-scale ambition.",
      ar: "يعرّف الشركة الناشئة بقدرتها على النمو السريع، لا بحجمها أو تقنيتها؛ إطار واضح لفهم الطموح القابل للاستثمار الجريء.",
    },
  },
  {
    title: "Founder Mode",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2024",
    url: "https://paulgraham.com/foundermode.html",
    tags: {
      fa: ["رهبری", "مقیاس", "سازمان"],
      en: ["leadership", "scaling", "organization"],
      ar: ["القيادة", "التوسع", "المنظمة"],
    },
    summary: {
      fa: "درباره خطای رایجِ تبدیل بنیان‌گذار به مدیر حرفه‌ای هنگام رشد شرکت؛ یادآوری می‌کند که نزدیک ماندن به جزئیات همیشه micromanagement نیست.",
      en: "A sharp argument against forcing founders into professional-manager habits as a company scales; staying close to detail is not always micromanagement.",
      ar: "طرح حاد ضد دفع المؤسسين إلى عادات المدير المحترف عند توسع الشركة؛ البقاء قريبا من التفاصيل ليس دائما إدارة تفصيلية سيئة.",
    },
  },
  {
    title: "Relentlessly Resourceful",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2009",
    url: "https://paulgraham.com/relres.html",
    tags: {
      fa: ["بنیان‌گذار", "منابع محدود", "حل مسئله"],
      en: ["founders", "resourcefulness", "problem solving"],
      ar: ["المؤسسون", "الحيلة العملية", "حل المشكلات"],
    },
    summary: {
      fa: "یک تعریف کوتاه و ماندگار از کیفیت اصلی بنیان‌گذار خوب: کسی که منفعل نمی‌ماند، با مانع تازه روبه‌رو می‌شود و مدام راه تازه پیدا می‌کند.",
      en: "A compact definition of a strong founder: someone who refuses passivity, meets new obstacles directly, and keeps finding a way forward.",
      ar: "تعريف موجز لصفة المؤسس القوي: شخص لا يبقى سلبيا، يواجه العوائق الجديدة مباشرة، ويواصل إيجاد الطريق.",
    },
  },
  {
    title: "How to Get Startup Ideas",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2012",
    url: "https://paulgraham.com/startupideas.html",
    tags: {
      fa: ["ایده", "مسئله", "بازار"],
      en: ["ideas", "problems", "market"],
      ar: ["الأفكار", "المشكلات", "السوق"],
    },
    summary: {
      fa: "به‌جای فشار آوردن برای ایده‌پردازی، پیشنهاد می‌کند در آینده زندگی کنی و کمبودها را ببینی؛ مخصوصا مسائلی که خودت عمیقا لمس می‌کنی.",
      en: "Instead of forcing ideas, it argues for living in the future and noticing what is missing, especially problems you personally feel deeply.",
      ar: "بدلا من افتعال الأفكار، يدعو إلى العيش في المستقبل وملاحظة ما ينقص، خصوصا المشكلات التي تختبرها بنفسك بعمق.",
    },
  },
  {
    title: "Schlep Blindness",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2012",
    url: "https://paulgraham.com/schlep.html",
    tags: {
      fa: ["انتخاب مسئله", "کار سخت", "مزیت پنهان"],
      en: ["problem selection", "hard work", "hidden advantage"],
      ar: ["اختيار المشكلة", "العمل الصعب", "ميزة خفية"],
    },
    summary: {
      fa: "درباره ایده‌هایی که جلوی چشم‌اند اما چون پر از کار خسته‌کننده، مذاکره، قانون یا عملیات‌اند نادیده گرفته می‌شوند؛ همان جایی که گاهی فرصت واقعی پنهان است.",
      en: "A reminder that many valuable startup ideas are ignored because they require tedious, messy work; that avoidance can hide the real opportunity.",
      ar: "تذكير بأن أفكارا ناشئة كثيرة وقيمة تُهمل لأنها تتطلب عملا مملا ومعقدا؛ وقد تكون الفرصة الحقيقية مخفية في هذا التجنب.",
    },
  },
  {
    title: "How to Build an MVP",
    author: "Michael Seibel",
    source: "Y Combinator",
    year: "2023",
    url: "https://www.ycombinator.com/library/Io-how-to-build-an-mvp",
    tags: {
      fa: ["MVP", "ساخت محصول", "یادگیری"],
      en: ["MVP", "product building", "learning"],
      ar: ["النموذج الأولي", "بناء المنتج", "التعلم"],
    },
    summary: {
      fa: "یک راهنمای عملی برای اینکه MVP را به کوچک‌ترین نسخه قابل یادگیری تبدیل کنی؛ نه محصول ناقص، نه پروژه بزرگ، بلکه آزمایشی که کاربر واقعی را به واکنش وادار کند.",
      en: "A practical guide to treating an MVP as the smallest useful learning vehicle, not a half-finished product or an overbuilt first release.",
      ar: "دليل عملي للتعامل مع النموذج الأولي كأصغر وسيلة مفيدة للتعلم، لا كمنتج ناقص ولا كإطلاق أول مبالغ فيه.",
    },
  },
  {
    title: "Maker's Schedule, Manager's Schedule",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2009",
    url: "https://paulgraham.com/makersschedule.html",
    tags: {
      fa: ["تمرکز", "مدیریت زمان"],
      en: ["focus", "time management"],
      ar: ["التركيز", "إدارة الوقت"],
    },
    summary: {
      fa: "برای بنیان‌گذارهایی که بین ساختن و مدیریت گیر می‌کنند، تفاوت ریتم maker و manager را توضیح می‌دهد و نشان می‌دهد چرا جلسه‌ها می‌توانند هزینه پنهان داشته باشند.",
      en: "For founders pulled between building and managing, it explains the maker/manager rhythm and why meetings can carry hidden costs.",
      ar: "للمؤسسين العالقين بين البناء والإدارة، يشرح إيقاع الصانع والمدير ولماذا قد تحمل الاجتماعات كلفة خفية.",
    },
  },
  {
    title: "1,000 True Fans",
    author: "Kevin Kelly",
    source: "The Technium",
    year: "2008",
    url: "https://kk.org/thetechnium/1000-true-fans/",
    tags: {
      fa: ["جامعه", "درآمد", "خلق ارزش"],
      en: ["community", "revenue", "value creation"],
      ar: ["المجتمع", "الإيراد", "خلق القيمة"],
    },
    summary: {
      fa: "برای کسب‌وکارهای جامعه‌محور و creator-led، یادآوری می‌کند که گاهی عمق رابطه با مشتری از اندازه خام بازار مهم‌تر است.",
      en: "For community-led and creator-led businesses, it shows why depth of customer relationship can matter more than raw audience size.",
      ar: "للأعمال المبنية حول المجتمع أو صناع المحتوى، يوضح لماذا قد يكون عمق علاقة العميل أهم من حجم الجمهور الخام.",
    },
  },
  {
    title: "The Only Thing that Matters",
    author: "Marc Andreessen",
    source: "PMarchive",
    year: "2007",
    url: "https://pmarchive.com/guide_to_startups_part4.html",
    tags: {
      fa: ["PMF", "بازار", "محصول"],
      en: ["PMF", "market", "product"],
      ar: ["ملاءمة المنتج للسوق", "السوق", "المنتج"],
    },
    summary: {
      fa: "متن کلاسیک product-market fit: اگر بازار واقعی و کشش جدی وجود نداشته باشد، تیم و محصول خوب هم کافی نیستند.",
      en: "The classic product-market fit essay: without a real market and strong pull, even a good team and product may not be enough.",
      ar: "النص الكلاسيكي عن ملاءمة المنتج للسوق: من دون سوق حقيقي وجذب قوي، قد لا يكفي الفريق الجيد ولا المنتج الجيد.",
    },
  },
  {
    title: "Good Product Manager/Bad Product Manager",
    author: "Ben Horowitz",
    source: "a16z",
    year: "2012",
    url: "https://a16z.com/good-product-manager-bad-product-manager/",
    tags: {
      fa: ["محصول", "مالکیت", "استاندارد"],
      en: ["product", "ownership", "standards"],
      ar: ["المنتج", "الملكية", "المعايير"],
    },
    summary: {
      fa: "یک متن آموزشی تیز درباره مالکیت محصول: مدیر محصول خوب مسئله، بازار، تیم و نتیجه را یکجا می‌بیند و مسئولیت را پخش نمی‌کند.",
      en: "A sharp training document on product ownership: good PMs understand the problem, market, team, and outcome without diffusing responsibility.",
      ar: "وثيقة تدريبية حادة عن ملكية المنتج: مدير المنتج الجيد يفهم المشكلة والسوق والفريق والنتيجة ولا يوزع المسؤولية.",
    },
  },
  {
    title: "How Superhuman Built an Engine to Find Product Market Fit",
    author: "Rahul Vohra",
    source: "First Round Review",
    year: "2019",
    url: "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/",
    tags: {
      fa: ["PMF", "تحقیق کاربر", "اندازه‌گیری"],
      en: ["PMF", "user research", "measurement"],
      ar: ["ملاءمة المنتج للسوق", "بحث المستخدم", "القياس"],
    },
    summary: {
      fa: "روایت عملی از تبدیل product-market fit به یک سیستم قابل اندازه‌گیری؛ برای تیم‌هایی که می‌خواهند سیگنال بازار را دقیق‌تر بخوانند.",
      en: "A practical story of turning product-market fit into a measurable system for teams that want to read market pull more precisely.",
      ar: "قصة عملية عن تحويل ملاءمة المنتج للسوق إلى نظام قابل للقياس للفرق التي تريد قراءة جذب السوق بدقة أكبر.",
    },
  },
  {
    title: "The Minimum Viable Testing Process for Evaluating Startup Ideas",
    author: "First Round Review",
    source: "First Round Review",
    year: "2016",
    url: "https://review.firstround.com/the-minimum-viable-testing-process-for-evaluating-startup-ideas/",
    tags: {
      fa: ["اعتبارسنجی", "MVP", "آزمایش"],
      en: ["validation", "MVP", "testing"],
      ar: ["التحقق", "الاختبار", "النموذج الأولي"],
    },
    summary: {
      fa: "برای ایده‌های اولیه، چارچوبی عملی می‌دهد تا قبل از ساخت سنگین، فرضیه‌ها با آزمون‌های کوچک و واقعی سنجیده شوند.",
      en: "A practical frame for testing early ideas with small real-world experiments before committing to heavy product buildout.",
      ar: "إطار عملي لاختبار الأفكار الأولى بتجارب صغيرة واقعية قبل الالتزام ببناء منتج كبير.",
    },
  },
  {
    title: "Ramen Profitable",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2009",
    url: "https://paulgraham.com/ramenprofitable.html",
    tags: {
      fa: ["بقا", "درآمد اولیه", "فاندریزینگ"],
      en: ["survival", "early revenue", "fundraising"],
      ar: ["البقاء", "الإيراد المبكر", "جمع التمويل"],
    },
    summary: {
      fa: "یک متن کاربردی درباره اینکه درآمد کوچک اما واقعی چگونه به تیم زمان، تمرکز و قدرت تصمیم‌گیری بیشتری می‌دهد.",
      en: "A practical essay on how small but real revenue can buy a startup time, focus, and better decision-making power.",
      ar: "مقال عملي عن كيف يمكن للإيراد الصغير لكنه الحقيقي أن يمنح الشركة الناشئة وقتا وتركيزا وقوة قرار أفضل.",
    },
  },
  {
    title: "How to Talk to Users",
    author: "Gustaf Alstromer",
    source: "Y Combinator",
    year: "2022",
    url: "https://www.ycombinator.com/library/Iq-how-to-talk-to-users",
    tags: {
      fa: ["مصاحبه کاربر", "کشف مسئله"],
      en: ["user interviews", "discovery"],
      ar: ["مقابلات المستخدمين", "الاكتشاف"],
    },
    summary: {
      fa: "برای بنیان‌گذارها یک یادآوری عملی است: اگر سوال خوب نپرسی، کاربر هم حقیقت مفید را به تو نمی‌گوید.",
      en: "A practical reminder for founders: without better questions, users rarely give you the truth you need.",
      ar: "تذكير عملي للمؤسسين: من دون أسئلة أفضل، نادرا ما يعطيك المستخدمون الحقيقة التي تحتاجها.",
    },
  },
  {
    title: "Default Alive or Default Dead?",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2015",
    url: "https://paulgraham.com/aord.html",
    tags: {
      fa: ["بقا", "Runway", "فاندریزینگ"],
      en: ["survival", "runway", "fundraising"],
      ar: ["البقاء", "المدى المالي", "جمع التمويل"],
    },
    summary: {
      fa: "یک چارچوب عملی برای اینکه تیم بداند با همین مسیر و منابع فعلی زنده می‌ماند یا برای ادامه حتما به سرمایه تازه وابسته است.",
      en: "A practical frame for knowing whether a startup can survive on its current path or is dependent on raising more money.",
      ar: "إطار عملي لمعرفة هل تستطيع الشركة الناشئة البقاء بمسارها ومواردها الحالية أم أنها تعتمد على تمويل جديد.",
    },
  },
  {
    title: "The 30 Best Pieces of Advice for Entrepreneurs in 2023",
    author: "First Round Review",
    source: "First Round Review",
    year: "2024",
    url: "https://review.firstround.com/the-30-best-pieces-of-advice-for-entrepreneurs-in-2023/",
    tags: {
      fa: ["اپراتوری", "رهبری", "تاکتیک"],
      en: ["operating", "leadership", "tactics"],
      ar: ["التشغيل", "القيادة", "التكتيكات"],
    },
    summary: {
      fa: "یک مجموعه فشرده از توصیه‌های عملی برای ساخت شرکت؛ بیشتر برای بنیان‌گذارهایی مفید است که از ایده عبور کرده‌اند و با اجرا درگیرند.",
      en: "A dense collection of company-building advice, especially useful once a founder has moved past the idea and into operating.",
      ar: "مجموعة مكثفة من نصائح بناء الشركات، مفيدة خصوصا عندما يتجاوز المؤسس مرحلة الفكرة ويدخل مرحلة التشغيل.",
    },
  },
  {
    title: "Product-User Fit Comes Before Product-Market Fit",
    author: "Andrew Chen",
    source: "a16z",
    year: "2019",
    url: "https://a16z.com/product-user-fit-comes-before-product-market-fit/",
    tags: {
      fa: ["کاربر", "PMF", "رشد"],
      en: ["users", "PMF", "growth"],
      ar: ["المستخدمون", "ملاءمة المنتج للسوق", "النمو"],
    },
    summary: {
      fa: "قبل از حرف زدن درباره بازار بزرگ، روی گروهی از کاربران که واقعا محصول را می‌خواهند زوم می‌کند؛ دید خوبی برای تمرکز اولیه می‌دهد.",
      en: "Before talking about the big market, it zooms in on the users who truly want the product, which is useful for early focus.",
      ar: "قبل الحديث عن السوق الكبير، يركز على المستخدمين الذين يريدون المنتج فعلا، وهذا مفيد للتركيز في البداية.",
    },
  },
  {
    title: "Nail the Customer Development Manifesto to the Wall",
    author: "Steve Blank",
    source: "Steve Blank",
    year: "2012",
    url: "https://steveblank.com/2012/03/29/nail-the-customer-development-manifesto/",
    tags: {
      fa: ["کشف مشتری", "اعتبارسنجی", "مدل کسب‌وکار"],
      en: ["customer development", "validation", "business model"],
      ar: ["تطوير العملاء", "التحقق", "نموذج العمل"],
    },
    summary: {
      fa: "یک متن کلاسیک درباره اینکه استارتاپ نباید از داخل اتاق مدیریت ساخته شود؛ حقیقت مدل کسب‌وکار بیرون از ساختمان و نزد مشتری پیدا می‌شود.",
      en: "A classic reminder that startups are not built from inside the conference room; the truth about the business model lives outside the building.",
      ar: "تذكير كلاسيكي بأن الشركة الناشئة لا تبنى من داخل غرفة الاجتماعات؛ حقيقة نموذج العمل توجد خارج المبنى، عند العملاء.",
    },
  },
  {
    title: "The 18 Mistakes That Kill Startups",
    author: "Paul Graham",
    source: "Paul Graham",
    year: "2006",
    url: "https://paulgraham.com/startupmistakes.html",
    tags: {
      fa: ["شکست استارتاپ", "کاربر", "اجرا"],
      en: ["startup failure", "users", "execution"],
      ar: ["فشل الشركات الناشئة", "المستخدمون", "التنفيذ"],
    },
    summary: {
      fa: "یک چک‌لیست سخت‌گیرانه برای خطاهایی که تیم را از ساختن چیزی که کاربران واقعاً می‌خواهند دور می‌کند: از ایده مشتق و کاربر مبهم تا لانچ دیرهنگام، استخدام بد و مدیریت نادرست پول.",
      en: "A rigorous checklist of mistakes that pull a team away from making something users truly want: vague users, derivative ideas, slow launch, bad hiring, and poor money discipline.",
      ar: "قائمة فحص صارمة للأخطاء التي تبعد الفريق عن صنع شيء يريده المستخدمون فعلا: مستخدم غامض، فكرة مشتقة، إطلاق بطيء، توظيف سيئ، وانضباط مالي ضعيف.",
    },
  },
];

const articleEssays = {
  "Do Things that Don't Scale": {
    fa: {
      paragraphs: [
        "در شروع یک شرکت، وسوسه طبیعی این است که همه‌چیز از روز اول scalable باشد: فرایندها، فروش، جذب کاربر، پشتیبانی و حتی فرهنگ. اما واقعیت شروع، بیشتر شبیه ساختن اعتماد با دست است تا ساختن ماشین رشد. بنیان‌گذار باید نزدیک کاربر بماند، خودش درد را بشنود و خودش بخشی از تجربه اولیه را بسازد.",
        "کار غیرقابل‌مقیاس، اگر درست انتخاب شود، اتلاف وقت نیست؛ ابزار یادگیری است. وقتی بنیان‌گذار خودش با کاربر صحبت می‌کند، خودش onboarding انجام می‌دهد یا خودش کیفیت اولین تجربه را نگه می‌دارد، چیزهایی می‌فهمد که هیچ داشبوردی در هفته‌های اول نشان نمی‌دهد. این کارها برای همیشه نمی‌مانند، اما DNA محصول و سازمان را شکل می‌دهند.",
        "معیار مهم این است که کار دستی باید به یادگیری یا وفاداری تبدیل شود. اگر فقط بنیان‌گذار را خسته کند و insight نسازد، دام است. اما اگر باعث شود کاربر حس کند با یک تیم جدی طرف است، یا تیم بفهمد ارزش واقعی کجا ساخته می‌شود، همان کار کوچک می‌تواند نقطه شروع رشد بزرگ باشد.",
      ],
      takeaways: [
        "در فاز صفر و یک، با کاربرها مستقیم حرف بزن و تجربه را دستی کامل کن.",
        "قبل از automation، بفهم کدام بخش تجربه واقعا ارزش می‌سازد.",
        "کار غیرقابل‌مقیاس باید موقت، هدفمند و یادگیری‌ساز باشد.",
      ],
    },
    en: {
      paragraphs: [
        "At the beginning of a company, it is tempting to make everything scalable from day one: acquisition, sales, onboarding, support, even culture. But the beginning is usually less like building a growth machine and more like earning trust by hand. The founder has to stay close to users, hear the pain directly, and help create the first version of the experience personally.",
        "Unscalable work is not waste when it is chosen well. It is a learning instrument. When founders onboard users themselves, answer support, or protect quality manually, they learn things that early dashboards cannot reveal. These habits should not last forever, but they often shape the product and the organization.",
        "The operating test is whether the manual work creates learning or loyalty. If it only exhausts the founder, it is a trap. If it helps users feel that a serious team is listening, or helps the team see where value is really created, a small manual act can become the root of large growth.",
      ],
      takeaways: [
        "In the earliest stage, talk to users directly and complete the experience manually.",
        "Before automating, learn which part of the experience creates real value.",
        "Unscalable work should be temporary, intentional, and insight-generating.",
      ],
    },
    ar: {
      paragraphs: [
        "في بداية الشركة، من السهل أن يرغب المؤسس في جعل كل شيء قابلا للتوسع منذ اليوم الأول: الاكتساب، البيع، الانضمام، الدعم وحتى الثقافة. لكن البداية غالبا لا تشبه آلة نمو جاهزة؛ إنها أقرب إلى بناء الثقة باليد. على المؤسس أن يبقى قريبا من المستخدم، يسمع الألم مباشرة، ويساهم بنفسه في تشكيل التجربة الأولى.",
        "العمل غير القابل للتوسع ليس هدرا إذا تم اختياره بعناية؛ إنه أداة تعلم. عندما يقوم المؤسس بإدخال المستخدمين بنفسه، أو يجيب عن الدعم، أو يحافظ على الجودة يدويا، يرى أشياء لا تكشفها لوحات البيانات في البداية. هذه الأعمال لا يجب أن تبقى إلى الأبد، لكنها تصنع ملامح المنتج والمنظمة.",
        "السؤال التشغيلي هو: هل هذا العمل اليدوي يصنع تعلما أو ولاء؟ إذا كان يستهلك المؤسس فقط فهو فخ. أما إذا جعل المستخدم يشعر أن فريقا جادا يستمع إليه، أو جعل الفريق يفهم أين تولد القيمة، فقد يصبح الفعل الصغير أساس نمو كبير.",
      ],
      takeaways: [
        "في المرحلة الأولى، تحدث مع المستخدمين مباشرة وأكمل التجربة يدويا.",
        "قبل الأتمتة، افهم أي جزء من التجربة يخلق القيمة الحقيقية.",
        "العمل غير القابل للتوسع يجب أن يكون مؤقتا ومقصودا ومولدا للتعلم.",
      ],
    },
  },
  "Startup = Growth": {
    fa: {
      paragraphs: [
        "همه کسب‌وکارهای کوچک استارتاپ نیستند. تفاوت اصلی، ظرفیت رشد سریع است. یک مغازه خوب، یک شرکت خدماتی سودده یا یک محصول niche می‌تواند ارزشمند باشد، اما اگر منطق اصلی آن رشد سریع و بزرگ شدن تکرارپذیر نباشد، با تعریف venture-scale هم‌خوان نیست.",
        "این نگاه برای تصمیم‌گیری سرمایه‌گذاری و استراتژی مهم است. اگر شرکت واقعا استارتاپ است، باید بازار، محصول و مدل توزیع آن توان رشد نمایی داشته باشند. در غیر این صورت، فشار دادن آن به قالب استارتاپ فقط تیم را خسته و انتظارات را نادرست می‌کند.",
        "رشد، فقط عدد درآمد یا نصب نیست. کیفیت رشد مهم است: آیا هر موج رشد، یادگیری و قدرت توزیع بیشتری می‌سازد؟ آیا محصول با بزرگ شدن بهتر می‌شود یا شکننده‌تر؟ استارتاپی که رشد را می‌فهمد، growth را نتیجه سیستم می‌بیند نه یک کمپین موقت.",
      ],
      takeaways: [
        "قبل از جذب سرمایه، روشن کن آیا کسب‌وکار واقعا ظرفیت رشد سریع دارد یا نه.",
        "رشد سالم باید از محصول، بازار و توزیع با هم بیاید.",
        "هر metric رشد را با کیفیت، تکرارپذیری و هزینه آن بسنج.",
      ],
    },
    en: {
      paragraphs: [
        "Not every small business is a startup. The core distinction is the capacity for fast growth. A good shop, a profitable services firm, or a niche product can be valuable, but if it is not designed for repeatable rapid expansion, it is not the same kind of company as a venture-scale startup.",
        "This matters for strategy and investment. If a company is truly a startup, its market, product, and distribution model must be capable of compounding growth. Otherwise, forcing it into the startup frame creates exhaustion and distorted expectations.",
        "Growth is not just revenue or installs. The quality of growth matters. Does each wave of growth create more learning and distribution power? Does the product improve as it scales, or become fragile? A growth-aware startup treats growth as a system outcome, not a temporary campaign.",
      ],
      takeaways: [
        "Before fundraising, clarify whether the business truly has rapid-growth potential.",
        "Healthy growth comes from product, market, and distribution working together.",
        "Measure every growth metric by quality, repeatability, and cost.",
      ],
    },
    ar: {
      paragraphs: [
        "ليست كل شركة صغيرة شركة ناشئة. الفارق الأساسي هو القدرة على النمو السريع. قد يكون المتجر الجيد أو شركة الخدمات المربحة أو المنتج المتخصص أعمالا قيمة، لكنها ليست بالضرورة شركة قابلة للنمو الجريء إذا لم يكن منطقها قائما على توسع سريع ومتكرر.",
        "هذا مهم للاستراتيجية والاستثمار. إذا كانت الشركة ناشئة فعلا، فيجب أن يكون السوق والمنتج ونموذج التوزيع قادرين على خلق نمو تراكمي. أما إذا لم يكن ذلك موجودا، فإن دفعها إلى قالب الشركات الناشئة يخلق إرهاقا وتوقعات خاطئة.",
        "النمو ليس مجرد إيراد أو تحميلات. جودة النمو مهمة. هل تخلق كل موجة نمو تعلما وقوة توزيع أكبر؟ هل يصبح المنتج أفضل عندما يكبر أم أكثر هشاشة؟ الشركة التي تفهم النمو تراه نتيجة نظام، لا حملة مؤقتة.",
      ],
      takeaways: [
        "قبل جمع الاستثمار، وضح هل لدى العمل قدرة حقيقية على النمو السريع.",
        "النمو الصحي يأتي من تفاعل المنتج والسوق والتوزيع معا.",
        "قيّم كل رقم نمو من حيث الجودة والتكرار والتكلفة.",
      ],
    },
  },
  "How to Get Startup Ideas": {
    fa: {
      paragraphs: [
        "ایده استارتاپی معمولا با نشستن پشت میز و فشار آوردن به ذهن ساخته نمی‌شود. اگر قرار باشد فقط با «فکر کردن به ایده» به نتیجه برسی، احتمال زیادی هست که به چیزهایی برسی که در ظاهر جذاب‌اند اما ریشه واقعی در زندگی مردم ندارند. ایده خوب اغلب از جایی می‌آید که کسی با یک مسئله زندگی کرده، آن را از نزدیک لمس کرده و زودتر از دیگران دیده که چیزی در دنیا کم است.",
        "راه بهتر این است که به جای شکار ایده بزرگ، دنبال مسئله واقعی بگردی. مسئله واقعی معمولا نشانه دارد: آدم‌ها برای حلش پول، زمان یا انرژی خرج می‌کنند؛ با راه‌حل‌های بد کنار آمده‌اند؛ یا آن‌قدر تکرار می‌شود که دیگر نمی‌توان نادیده‌اش گرفت. خیلی از ایده‌های قوی در شروع شبیه pitchهای درخشان نیستند. بیشتر شبیه یک ناراحتی کوچک، یک فرایند کُند، یک ابزار ناکافی یا یک نیاز تکراری‌اند.",
        "یکی از نکته‌های اصلی این نگاه این است که باید در آینده زندگی کنی. یعنی خودت را در معرض تکنولوژی، رفتار یا بازاری قرار بدهی که هنوز برای همه عادی نشده است. کسی که زودتر در چنین محیطی زندگی می‌کند، کمبودهایی را می‌بیند که بقیه بعدا خواهند دید. برای همین خیلی از بنیان‌گذارهای خوب، ایده را اختراع نمی‌کنند؛ آن را از دل تجربه روزمره کشف می‌کنند.",
        "مسئله‌ای که برای خودت هم واقعی باشد معمولا بهتر از مسئله‌ای است که فقط از بیرون جذاب به نظر می‌رسد. وقتی خودت درد را تجربه کرده باشی، درباره جزئیاتش حساس‌تر می‌شوی، زبان کاربر را بهتر می‌فهمی و کمتر فریب پاسخ‌های سطحی را می‌خوری. البته این کافی نیست؛ باید ببینی آیا افراد دیگری هم همان درد را دارند و آیا حاضرند برای حلش رفتارشان را تغییر دهند یا نه.",
        "ایده خوب لزوما از روز اول بزرگ به نظر نمی‌رسد. گاهی بهترین ایده‌ها ابتدا کوچک، تخصصی یا حتی عجیب‌اند، چون فقط گروه کوچکی از آدم‌ها هنوز شدت مسئله را حس کرده‌اند. اما اگر آن گروه کوچک واقعا مسئله را جدی بگیرد، همان نقطه می‌تواند شروع یک بازار بزرگ‌تر باشد. مهم این است که از یک نیاز واقعی شروع کنی، نه از یک شعار بزرگ.",
        "پس کار بنیان‌گذار فقط ایده‌پردازی نیست؛ مشاهده دقیق است. باید ببینی چه چیزی بارها تکرار می‌شود، چه چیزی مردم را مجبور به workaround می‌کند، کجا ابزارهای موجود جواب نمی‌دهند و کدام تغییر تازه، امکان راه‌حل جدید را باز کرده است. بعد از آن، ایده باید با کاربر، رفتار واقعی و شواهد بازار تست شود. ایده‌ای که نتوان آن را با واقعیت تماس داد، فقط یک جمله خوب است.",
      ],
      takeaways: [
        "در محیط‌هایی زندگی و کار کن که آینده زودتر خودش را نشان می‌دهد.",
        "به مسئله‌هایی توجه کن که خودت یا کاربران بارها تجربه کرده‌اید.",
        "ایده را با شدت درد، تکرارپذیری و امکان توزیع بسنج.",
        "از نیاز واقعی شروع کن، نه از pitch جذاب.",
        "قبل از ساخت، دنبال شواهد رفتار واقعی کاربر بگرد.",
      ],
    },
    en: {
      paragraphs: [
        "Startup ideas rarely come from forcing the mind to invent something impressive. Good ideas usually come from living inside a problem. When someone is close to the edge of a new industry, technology, or behavior, they notice missing pieces that remain invisible to others.",
        "The more practical path is to look for real problems rather than big ideas. Real problems leave evidence: people already pay to solve them, tolerate bad workarounds, or repeatedly experience the pain themselves. Many strong ideas look small or messy at first, not like polished pitches.",
        "For a founder, the quality of observation matters more than the number of ideas. If you stay close to users, markets, and technical change, ideas are discovered more than invented. Then the real work begins: deciding which problem is painful, repeated, and large enough to deserve a company.",
      ],
      takeaways: [
        "Live and work where the future becomes visible earlier.",
        "Pay attention to problems you or users experience repeatedly.",
        "Judge ideas by pain intensity, repeatability, and distribution potential.",
      ],
    },
    ar: {
      paragraphs: [
        "نادرا ما تأتي أفكار الشركات الناشئة من الضغط على الذهن لاختراع شيء مبهر. الأفكار الجيدة تأتي غالبا من العيش داخل مشكلة. عندما يكون الشخص قريبا من حافة صناعة أو تقنية أو سلوك جديد، يرى النواقص التي لا تزال غير مرئية للآخرين.",
        "الطريق العملي هو البحث عن مشكلة حقيقية لا عن فكرة كبيرة. المشكلة الحقيقية لها أدلة: الناس يدفعون لحلها، أو يتحملون حلولا سيئة، أو يختبرون الألم مرارا. كثير من الأفكار القوية تبدو صغيرة أو غير مرتبة في البداية، وليست عروضا براقة.",
        "بالنسبة للمؤسس، جودة الملاحظة أهم من عدد الأفكار. إذا بقيت قريبا من المستخدمين والسوق والتغير التقني، فالأفكار تكتشف أكثر مما تخترع. ثم يبدأ العمل الحقيقي: تحديد أي مشكلة مؤلمة ومتكررة وكبيرة بما يكفي لبناء شركة حولها.",
      ],
      takeaways: [
        "عش واعمل في أماكن يظهر فيها المستقبل مبكرا.",
        "انتبه للمشكلات التي تختبرها أنت أو المستخدمون بشكل متكرر.",
        "قيّم الفكرة من حيث شدة الألم والتكرار وإمكان التوزيع.",
      ],
    },
  },
  "Maker's Schedule, Manager's Schedule": {
    fa: {
      paragraphs: [
        "Paul Graham در این مقاله از یک سوءتفاهم بسیار ساده شروع می‌کند: چرا برنامه‌نویس‌ها، نویسنده‌ها و آدم‌هایی که چیزی می‌سازند این‌قدر از جلسه بدشان می‌آید؟ پاسخ او این نیست که این آدم‌ها اجتماعی نیستند یا از هماهنگی فرار می‌کنند. مسئله این است که آن‌ها زمان را با واحد متفاوتی مصرف می‌کنند. جلسه برای کسی که کارش مدیریت است یک بخش طبیعی از روز است؛ اما برای کسی که کار عمیق می‌کند، همان جلسه می‌تواند ساختار کل روز را خراب کند.",
        "او دو نوع تقویم را از هم جدا می‌کند: تقویم مدیر و تقویم سازنده. تقویم مدیر شبیه دفتر قرارهای سنتی است؛ روز به خانه‌های یک‌ساعته تقسیم می‌شود، هر خانه می‌تواند به یک جلسه، تماس یا تصمیم اختصاص پیدا کند، و تغییر موضوع در طول روز اتفاق عجیبی نیست. اگر کسی روی این مدل کار کند، پیدا کردن یک زمان خالی و گذاشتن جلسه در آن بیشتر یک مسئله لجستیکی است تا یک بحران ذهنی.",
        "اما تقویم سازنده با چنین واحدهایی کار نمی‌کند. برنامه‌نویس، نویسنده، طراح، استراتژیست یا هر کسی که باید چیزی پیچیده را بسازد، معمولاً به نیم‌روزهای کامل یا بلوک‌های طولانی احتیاج دارد. یک ساعت برای شروع کار عمیق کافی نیست؛ بیشتر شبیه گرم کردن موتور است. ذهن باید مسئله را دوباره بالا بیاورد، لایه‌هایش را نگه دارد، چند مسیر را امتحان کند و تازه بعد از مدتی به نقطه‌ای برسد که خروجی واقعی ساخته شود.",
        "به همین دلیل جلسه برای سازنده فقط یک جابه‌جایی ساده از کاری به کار دیگر نیست. یک جلسه در وسط بعدازظهر می‌تواند کل بعدازظهر را به دو تکه بی‌مصرف تقسیم کند؛ هر تکه برای کار سخت کوتاه است و خودِ آگاهی از اینکه جلسه‌ای در راه است، بخشی از توجه را می‌گیرد. آدمی که در تقویم مدیریتی زندگی می‌کند همیشه منتظر اتفاق بعدی است، اما آدمی که در ریتم سازندگی است باید حضور ذهن عمیقش را حفظ کند.",
        "Graham حتی می‌گوید اثر جلسه ممکن است فقط همان نیم‌روز نباشد. وقتی آدم بداند عصرش شکسته می‌شود، ممکن است صبح هم سراغ کار بلندپروازانه نرود، چون می‌داند فرصت کافی برای فرو رفتن در آن ندارد. پروژه‌های جدی معمولاً نزدیک مرز توان ذهنی آدم قرار دارند؛ کمی افت انرژی یا انگیزه کافی است که آدم شروعشان نکند. برای همین یک قرار کوچک می‌تواند اثر آبشاری روی کل روز بگذارد.",
        "هر دو مدل تقویم به‌تنهایی سالم‌اند. مدیر واقعاً باید با آدم‌های مختلف هماهنگ شود، تصمیم بگیرد، پیگیری کند و دسترسی‌پذیر باشد. سازنده هم واقعاً باید زمان بی‌وقفه داشته باشد. مشکل وقتی شروع می‌شود که این دو مدل روی هم می‌افتند. چون آدم‌های قدرتمندتر سازمان‌ها اغلب در تقویم مدیریتی زندگی می‌کنند، ناخواسته بقیه را هم مجبور می‌کنند با ریتم آن‌ها کار کنند. مدیران باهوش این هزینه را می‌فهمند و برای آدم‌هایی که کار عمیق می‌کنند فضای طولانی و محافظت‌شده می‌گذارند.",
        "Graham از تجربه Y Combinator مثال می‌زند. سرمایه‌گذارها معمولاً با تقویم مدیریتی کار می‌کنند، اما او می‌گوید در YC تلاش کرده‌اند تا حدی روی تقویم سازنده بمانند. راه‌حلشان چیزی شبیه office hours است: چند بازه مشخص در هفته را برای ملاقات با بنیان‌گذارها کنار می‌گذارند و قرارها را در انتهای روز جمع می‌کنند. این کار باعث می‌شود جلسه‌ها مزاحم قلب روز کاری نشوند؛ یعنی جلسه هست، اما وسط جریان ساختن فرو نمی‌رود.",
        "او از تجربه استارتاپ قبلی خودش هم یک الگوی جالب می‌آورد: روزش را عملاً به دو روز کاری تقسیم کرده بود. شب‌ها تا دیروقت برنامه‌نویسی می‌کرد، چون آن زمان احتمال وقفه کم بود؛ بعد دیرتر می‌خوابید و بخش دیگری از روز را به کارهای تجاری و ارتباطی اختصاص می‌داد. بدون اینکه آن موقع اسمش را بداند، در واقع یک بخش روز را با تقویم سازنده جلو می‌برد و بخش دیگر را با تقویم مدیر.",
        "بخش مهم دیگر مقاله درباره جلسه‌های حدسی است؛ همان جلسه‌هایی که فقط برای آشنا شدن، قهوه خوردن، شبکه‌سازی یا بررسی احتمال همکاری پیشنهاد می‌شوند. برای کسی که تقویم مدیریتی دارد، چنین جلسه‌ای ممکن است تقریباً رایگان به نظر برسد؛ یک جای خالی در تقویم هست و شاید چیزی از آن دربیاید. در فرهنگ کسب‌وکار، مخصوصاً در سیلیکون‌ولی، این نوع ملاقات‌ها طبیعی و رایج‌اند.",
        "اما برای کسی که روی تقویم سازنده کار می‌کند، جلسه حدسی هزینه بسیار بالاتری دارد. او باید نیم‌روز یا بخش بزرگی از تمرکزش را خرج احتمالی کند که شاید هیچ نتیجه‌ای نداشته باشد. اینجاست که یک تعارض اجتماعی هم شکل می‌گیرد: اگر جلسه را بپذیری، تمرکزت را از دست می‌دهی؛ اگر رد کنی، ممکن است بی‌ادب یا غیرهمکار به نظر برسی. مشکل فقط مدیریت زمان نیست، مدیریت انتظارات آدم‌هایی است که با ریتم دیگری کار می‌کنند.",
        "Graham راه‌حل را در روشن کردن همین تفاوت می‌بیند. کسانی که تقویم سازنده دارند قرار نیست هیچ‌وقت جلسه نداشته باشند. آن‌ها هم می‌دانند که هماهنگی، رابطه و تصمیم‌گیری لازم است. خواسته اصلی‌شان این است که طرف مقابل هزینه واقعی جلسه را بفهمد. وقتی این هزینه دیده شود، می‌شود جلسه‌ها را خوشه‌بندی کرد، زمان‌های مشخص ساخت، درخواست‌های حدسی را کمتر کرد و کار عمیق را بی‌دلیل تکه‌تکه نکرد.",
        "برای بنیان‌گذارها، این مقاله فقط درباره برنامه‌نویس‌ها نیست؛ درباره طراحی انرژی شرکت است. بنیان‌گذار در سال‌های اول هم باید بفروشد، استخدام کند، مذاکره کند و سرمایه جذب کند، هم باید محصول، روایت، سیستم و فرهنگ بسازد. اگر تقویم او کاملاً مدیریتی شود، ممکن است شرکت پرجنب‌وجوش به نظر برسد اما چیزهای عمیق ساخته نشوند. اگر هم کاملاً از هماهنگی فرار کند، سازمان قفل می‌شود. هنر کار این است که برای هر نوع کار، ریتم درست بسازد.",
        "برداشت عملی مقاله این است که تقویم، فقط فهرست قرارها نیست؛ معماری توجه سازمان است. هر بار که جلسه‌ای می‌گذاری، فقط زمان همان جلسه را مصرف نمی‌کنی؛ ممکن است یک بلوک تمرکز، یک شروع جسورانه یا یک خروجی عمیق را هم حذف کنی. شرکت‌های بهتر آن‌هایی‌اند که هم تصمیم‌گیری سریع دارند و هم به آدم‌های سازنده اجازه می‌دهند نیم‌روزهای سالم و بی‌وقفه داشته باشند.",
      ],
      takeaways: [
        "جلسه را فقط با مدت خودش نسنج؛ اثرش روی قبل و بعدِ کار عمیق را هم حساب کن.",
        "برای تیم‌های محصول، تکنولوژی، محتوا و استراتژی، بلوک‌های نیم‌روزه محافظت‌شده بساز.",
        "جلسه‌ها را در پنجره‌های مشخص یا انتهای روز خوشه‌بندی کن تا وسط جریان ساختن نیفتند.",
        "جلسه‌های حدسی و صرفاً شبکه‌سازی را برای آدم‌های maker با دقت بیشتری بپذیر یا رد کن.",
        "به‌عنوان بنیان‌گذار، روزت را آگاهانه بین ریتم مدیریت و ریتم ساختن تقسیم کن.",
        "در سازمان توضیح بده که رد کردن جلسه همیشه بی‌احترامی نیست؛ گاهی دفاع از خروجی عمیق است.",
        "برای هر نوع کار، واحد زمانی مناسب خودش را طراحی کن: تصمیم سریع با واحد کوتاه، ساختن سخت با واحد بلند.",
        "تقویم را معماری توجه شرکت بدان، نه فقط ابزار هماهنگی.",
      ],
    },
    en: {
      paragraphs: [
        "A founder's calendar is often split between two rhythms: making and managing. Maker work needs deep blocks of time. Manager work moves through meetings, quick decisions, and context switching. The problem begins when the two rhythms are mixed without boundaries.",
        "A short meeting in the middle of the day may look cheap to a manager, but it can destroy an entire focus block for a maker. For product and engineering teams, that hidden cost is very real. If the organization misses this distinction, communication may look faster while output becomes shallower.",
        "The answer is not to hate meetings. It is to design rhythm deliberately. Decision time, sync time, and management time should be clear, while protected blocks exist for building. A strong founder knows when to operate as a manager and when to defend the team's maker space.",
      ],
      takeaways: [
        "Design calendars around the type of work, not just people's availability.",
        "Short meetings can still carry high focus costs.",
        "Create protected blocks for deep work without interruption.",
      ],
    },
    ar: {
      paragraphs: [
        "ينقسم تقويم المؤسس غالبا بين إيقاعين: البناء والإدارة. عمل الصانع يحتاج إلى كتل عميقة من الوقت، بينما يتحرك عمل المدير عبر الاجتماعات والقرارات السريعة وتغيير السياق. تبدأ المشكلة عندما يختلط الإيقاعان بلا حدود.",
        "قد يبدو اجتماع قصير في منتصف اليوم منخفض التكلفة للمدير، لكنه قد يدمر كتلة تركيز كاملة للصانع. بالنسبة لفرق المنتج والهندسة، هذه الكلفة الخفية حقيقية. إذا لم تفهم المنظمة هذا الفرق، قد تبدو الاتصالات أسرع بينما يصبح الناتج أقل عمقا.",
        "الحل ليس كراهية الاجتماعات، بل تصميم الإيقاع بوعي. يجب أن يكون وقت القرار والتنسيق والإدارة واضحا، وأن توجد بجانبه كتل محمية للبناء. المؤسس الجيد يعرف متى يعمل كمدير ومتى يدافع عن مساحة الصانع داخل الفريق.",
      ],
      takeaways: [
        "صمم التقويم حسب نوع العمل، لا حسب توفر الأشخاص فقط.",
        "الاجتماعات القصيرة قد تحمل كلفة تركيز عالية.",
        "أنشئ كتل وقت محمية للعمل العميق بلا مقاطعة.",
      ],
    },
  },
  "1,000 True Fans": {
    fa: {
      paragraphs: [
        "همه مسیرهای رشد از جذب میلیون‌ها کاربر شروع نمی‌شوند. بعضی کسب‌وکارها با تعداد محدودی مشتری یا طرفدار عمیق ساخته می‌شوند؛ کسانی که ارزش را می‌فهمند، تکرار خرید دارند و حاضرند رابطه بلندمدت بسازند.",
        "برای creatorها، جامعه‌ها و بعضی محصولات تخصصی، عمق رابطه می‌تواند از اندازه خام مخاطب مهم‌تر باشد. هزار نفر که واقعا به محصول باور دارند، بازخورد می‌دهند و هزینه می‌کنند، از صد هزار نفر مخاطب بی‌تفاوت ارزشمندترند. این نگاه مخصوصا برای برند شخصی و کسب‌وکارهای اعتمادمحور مهم است.",
        "اما این ایده به معنی کوچک فکر کردن نیست. نقطه اصلی این است که پیش از وسواس روی scale، باید هسته‌ای از وفاداری واقعی ساخت. وقتی ارزش برای گروه کوچک روشن شد، توسعه بازار سالم‌تر و ارزان‌تر می‌شود.",
      ],
      takeaways: [
        "قبل از بزرگ کردن audience، کیفیت رابطه با کاربران اصلی را بسنج.",
        "طرفدار واقعی کسی است که خرید، معرفی یا مشارکت تکرارشونده دارد.",
        "وفاداری عمیق می‌تواند پایه توزیع و برند باشد.",
      ],
    },
    en: {
      paragraphs: [
        "Not every growth path begins with millions of users. Some businesses are built on a smaller number of deeply committed customers or fans: people who understand the value, buy repeatedly, and are willing to form a long-term relationship.",
        "For creators, communities, and specialized products, relationship depth can matter more than raw audience size. A thousand people who believe in the product, give feedback, and pay are often more valuable than a hundred thousand indifferent viewers. This is especially relevant for personal brands and trust-based businesses.",
        "The idea does not mean thinking small. The point is to build a core of real loyalty before obsessing over scale. Once value is clear for a small group, market expansion becomes healthier and cheaper.",
      ],
      takeaways: [
        "Before growing the audience, measure the quality of relationships with core users.",
        "A true fan buys, refers, or participates repeatedly.",
        "Deep loyalty can become the foundation of distribution and brand.",
      ],
    },
    ar: {
      paragraphs: [
        "ليست كل مسارات النمو تبدأ بملايين المستخدمين. بعض الأعمال تبنى على عدد أقل من العملاء أو المعجبين شديدي الالتزام: أشخاص يفهمون القيمة، يشترون بشكل متكرر، ويرغبون في علاقة طويلة الأمد.",
        "بالنسبة لصناع المحتوى والمجتمعات والمنتجات المتخصصة، قد يكون عمق العلاقة أهم من حجم الجمهور الخام. ألف شخص يؤمنون بالمنتج ويقدمون ملاحظات ويدفعون المال أكثر قيمة من مئة ألف مشاهد غير مبال. هذا مهم خصوصا للعلامات الشخصية والأعمال المبنية على الثقة.",
        "الفكرة لا تعني التفكير الصغير. النقطة هي بناء نواة من الولاء الحقيقي قبل الهوس بالتوسع. عندما تصبح القيمة واضحة لمجموعة صغيرة، يصبح توسيع السوق أكثر صحة وأقل تكلفة.",
      ],
      takeaways: [
        "قبل تكبير الجمهور، قس جودة العلاقة مع المستخدمين الأساسيين.",
        "المعجب الحقيقي يشتري أو يوصي أو يشارك بشكل متكرر.",
        "الولاء العميق يمكن أن يكون أساس التوزيع والعلامة.",
      ],
    },
  },
  "The Only Thing that Matters": {
    fa: {
      paragraphs: [
        "در بسیاری از روایت‌های استارتاپی، تیم و محصول بیشترین توجه را می‌گیرند. اما بازار می‌تواند از هر دو قوی‌تر باشد. اگر بازار تشنه راه‌حل باشد، محصول متوسط هم فرصت یادگیری و اصلاح پیدا می‌کند؛ اگر بازار کشش نداشته باشد، حتی محصول خوب هم ممکن است بی‌صدا بماند.",
        "product-market fit یعنی بازار محصول را به جلو بکشد، نه اینکه تیم با فشار دائم آن را هل بدهد. نشانه‌هایش معمولا در رفتار واقعی دیده می‌شود: کاربران برمی‌گردند، معرفی می‌کنند، حاضرند پول بدهند، و نبود محصول برایشان دردناک می‌شود.",
        "این نگاه برای بنیان‌گذارها یک هشدار جدی است: عاشق محصول شدن کافی نیست. باید بی‌رحمانه بررسی کرد که آیا بازار واقعا بیدار است یا نه. گاهی بهترین تصمیم، تغییر segment، تغییر مسئله یا حتی توقف ساخت چیزی است که بازار آن را نمی‌کشد.",
      ],
      takeaways: [
        "کشش بازار را با رفتار واقعی کاربران بسنج، نه تعریف و تمجید.",
        "اگر بازار نمی‌کشد، فقط polish محصول مسئله را حل نمی‌کند.",
        "PMF بیشتر کشف می‌شود تا اعلام.",
      ],
    },
    en: {
      paragraphs: [
        "In many startup stories, team and product get most of the attention. But the market can be stronger than both. If the market is hungry, an imperfect product gets room to learn and improve. If the market lacks pull, even a good product can remain quiet.",
        "Product-market fit means the market pulls the product forward instead of the team constantly pushing it. The signs usually appear in behavior: users return, refer others, pay, and feel real pain when the product is absent.",
        "For founders, this is a serious warning: loving the product is not enough. You have to test whether the market is truly awake. Sometimes the best decision is to change the segment, change the problem, or stop building something the market does not pull.",
      ],
      takeaways: [
        "Measure market pull through behavior, not compliments.",
        "If the market does not pull, polishing the product will not solve the core problem.",
        "PMF is discovered more than declared.",
      ],
    },
    ar: {
      paragraphs: [
        "في كثير من قصص الشركات الناشئة، يحصل الفريق والمنتج على معظم الاهتمام. لكن السوق قد يكون أقوى من الاثنين. إذا كان السوق متعطشا، يحصل المنتج غير الكامل على فرصة للتعلم والتحسن. وإذا لم يكن هناك جذب من السوق، فقد يبقى المنتج الجيد صامتا.",
        "ملاءمة المنتج للسوق تعني أن السوق يسحب المنتج إلى الأمام، لا أن الفريق يدفعه باستمرار. تظهر العلامات في السلوك: يعود المستخدمون، يوصون به، يدفعون المال، ويشعرون بألم حقيقي عند غياب المنتج.",
        "هذه رسالة مهمة للمؤسسين: حب المنتج لا يكفي. يجب اختبار ما إذا كان السوق مستيقظا فعلا. أحيانا يكون القرار الأفضل تغيير الشريحة أو المشكلة أو إيقاف بناء شيء لا يسحبه السوق.",
      ],
      takeaways: [
        "قس جذب السوق من خلال السلوك، لا المجاملات.",
        "إذا لم يسحب السوق المنتج، فلن يحل التلميع المشكلة الأساسية.",
        "ملاءمة المنتج للسوق تكتشف أكثر مما تعلن.",
      ],
    },
  },
  "Good Product Manager/Bad Product Manager": {
    fa: {
      paragraphs: [
        "مدیر محصول خوب فقط هماهنگ‌کننده جلسه‌ها یا نویسنده backlog نیست. او مالک مسئله است. بازار را می‌فهمد، کاربر را می‌شناسد، محدودیت‌های تیم را می‌بیند و در نهایت مسئول نتیجه محصول می‌ماند.",
        "تفاوت اصلی در سطح ownership است. مدیر محصول ضعیف مسئولیت را بین تیم فنی، فروش، طراحی یا مدیرعامل پخش می‌کند. مدیر محصول قوی ابهام را جمع می‌کند، تصمیم را شفاف می‌کند و کمک می‌کند تیم روی مهم‌ترین مسئله متمرکز بماند.",
        "برای بنیان‌گذارها، این متن یادآوری می‌کند که product management یک نقش اجرایی جدی است، نه یک لایه اداری. محصول خوب از ترکیب قضاوت، داده، حساسیت به کاربر و استاندارد بالا ساخته می‌شود.",
      ],
      takeaways: [
        "مدیر محصول باید مالک outcome باشد، نه فقط owner تسک‌ها.",
        "ابهام بازار و کاربر را به تصمیم‌های روشن برای تیم تبدیل کن.",
        "استاندارد محصول را با رفتار کاربر و نتیجه کسب‌وکار بسنج.",
      ],
    },
    en: {
      paragraphs: [
        "A good product manager is not just a meeting coordinator or backlog writer. They own the problem. They understand the market, know the user, see team constraints, and remain responsible for the product outcome.",
        "The main difference is ownership. A weak PM spreads responsibility across engineering, sales, design, or the CEO. A strong PM absorbs ambiguity, clarifies decisions, and helps the team stay focused on the most important problem.",
        "For founders, the lesson is that product management is a serious operating role, not an administrative layer. Good products come from judgment, data, user sensitivity, and high standards working together.",
      ],
      takeaways: [
        "The PM should own outcomes, not just tasks.",
        "Turn market and user ambiguity into clear decisions for the team.",
        "Judge product standards by user behavior and business results.",
      ],
    },
    ar: {
      paragraphs: [
        "مدير المنتج الجيد ليس منسق اجتماعات أو كاتب قائمة مهام فقط. إنه يملك المشكلة. يفهم السوق، يعرف المستخدم، يرى قيود الفريق، ويبقى مسؤولا عن نتيجة المنتج.",
        "الفارق الأساسي هو الملكية. مدير المنتج الضعيف يوزع المسؤولية على الهندسة أو المبيعات أو التصميم أو المدير التنفيذي. مدير المنتج القوي يمتص الغموض، يوضح القرارات، ويساعد الفريق على التركيز على المشكلة الأهم.",
        "بالنسبة للمؤسسين، الدرس هو أن إدارة المنتج دور تشغيلي جاد، لا طبقة إدارية. المنتجات الجيدة تأتي من تفاعل الحكم الجيد والبيانات والحساسية للمستخدم والمعايير العالية.",
      ],
      takeaways: [
        "يجب أن يملك مدير المنتج النتائج، لا المهام فقط.",
        "حوّل غموض السوق والمستخدم إلى قرارات واضحة للفريق.",
        "قيّم معايير المنتج من خلال سلوك المستخدم ونتائج العمل.",
      ],
    },
  },
  "How Superhuman Built an Engine to Find Product Market Fit": {
    fa: {
      paragraphs: [
        "product-market fit وقتی مفید می‌شود که از حس مبهم به یک سیستم قابل مشاهده تبدیل شود. روایت Superhuman مهم است چون نشان می‌دهد PMF فقط یک لحظه جادویی نیست؛ می‌توان آن را با سؤال درست، segment دقیق و حلقه یادگیری منظم بهتر فهمید.",
        "ایده کلیدی این است که از کاربران بپرسی اگر محصول دیگر در دسترس نباشد چه احساسی دارند. پاسخ کسانی که «خیلی ناراحت می‌شوم» می‌گویند، یک signal جدی است. اما خود عدد کافی نیست؛ باید فهمید این کاربران چه کسانی‌اند، چرا محصول برایشان مهم است و چه چیزی بقیه را عقب نگه می‌دارد.",
        "برای تیم‌های در حال رشد، این مقاله یادآوری می‌کند که PMF یک داشبورد ثابت نیست. باید segmentهای پرکشش را پیدا کرد، محصول را برای آن‌ها تیزتر کرد و بعد به تدریج دایره را بزرگ‌تر کرد. رشد خوب از تمرکز شروع می‌شود.",
      ],
      takeaways: [
        "PMF را با رفتار و شدت نیاز segmentهای مشخص بسنج.",
        "کاربرانی را که نبود محصول برایشان دردناک است جدا تحلیل کن.",
        "قبل از گسترش بازار، محصول را برای گروه پرکشش‌تر دقیق‌تر کن.",
      ],
    },
    en: {
      paragraphs: [
        "Product-market fit becomes useful when it moves from vague feeling to observable system. The Superhuman story matters because it shows that PMF is not only a magical moment; it can be understood through better questions, precise segments, and disciplined learning loops.",
        "The central move is asking users how they would feel if the product were no longer available. People who answer that they would be very disappointed are a serious signal. But the number alone is not enough. The team must understand who those users are, why the product matters to them, and what holds others back.",
        "For scaling teams, the lesson is that PMF is not a static dashboard. Find the segments with strongest pull, sharpen the product for them, and then expand the circle gradually. Good growth begins with focus.",
      ],
      takeaways: [
        "Measure PMF through behavior and need intensity inside specific segments.",
        "Study users who would feel real pain if the product disappeared.",
        "Before expanding the market, sharpen the product for the strongest segment.",
      ],
    },
    ar: {
      paragraphs: [
        "تصبح ملاءمة المنتج للسوق مفيدة عندما تنتقل من إحساس غامض إلى نظام قابل للملاحظة. قصة Superhuman مهمة لأنها توضح أن الملاءمة ليست لحظة سحرية فقط؛ يمكن فهمها عبر أسئلة أفضل وشرائح أدق وحلقات تعلم منتظمة.",
        "الحركة الأساسية هي سؤال المستخدمين عن شعورهم إذا لم يعد المنتج متاحا. من يقولون إنهم سيشعرون بخيبة كبيرة يمثلون إشارة قوية. لكن الرقم وحده لا يكفي. يجب فهم من هم هؤلاء المستخدمون، ولماذا يهمهم المنتج، وما الذي يمنع الآخرين.",
        "للفرق التي تنمو، الدرس أن ملاءمة المنتج للسوق ليست لوحة ثابتة. ابحث عن الشرائح ذات الجذب الأقوى، اجعل المنتج أدق لها، ثم وسّع الدائرة تدريجيا. النمو الجيد يبدأ بالتركيز.",
      ],
      takeaways: [
        "قس الملاءمة من خلال السلوك وشدة الحاجة داخل شرائح محددة.",
        "حلل المستخدمين الذين سيتألمون فعلا إذا اختفى المنتج.",
        "قبل توسيع السوق، اجعل المنتج أدق للشريحة الأقوى.",
      ],
    },
  },
  "The Minimum Viable Testing Process for Evaluating Startup Ideas": {
    fa: {
      paragraphs: [
        "بسیاری از تیم‌ها وقتی از MVP حرف می‌زنند، ناخودآگاه به «نسخه کوچک محصول» فکر می‌کنند؛ چیزی با چند feature کمتر، طراحی ساده‌تر و زمان توسعه کوتاه‌تر. اما تست حداقلی همیشه محصول نیست. گاهی بهترین تست، یک صفحه ساده، یک گفت‌وگوی فروش، یک prototype نمایشی، یک pre-order یا حتی یک فرایند کاملا دستی است که فقط یک فرضیه مهم را می‌سنجد.",
        "نکته اصلی این رویکرد این است که قبل از ساختن سنگین، باید بفهمی کدام بخش ایده واقعاً پرریسک است. شاید ریسک اصلی این نباشد که تیم می‌تواند محصول را بسازد یا نه؛ شاید ریسک این باشد که مشتری اصلا مسئله را اولویت نمی‌داند، حاضر نیست پول بدهد، کانال دسترسی به او گران است، یا پیام محصول برایش واضح نیست. MVP خوب به جای نمایش محصول، ریسک را روشن می‌کند.",
        "برای ارزیابی یک ایده، باید آن را به فرضیه‌های کوچک‌تر بشکنی. مثلا فرضیه اول: گروه مشخصی از مشتریان این درد را دارند. فرضیه دوم: این درد برایشان آن‌قدر مهم است که برای حلش زمان یا پول بدهند. فرضیه سوم: می‌توان با یک کانال مشخص به آن‌ها رسید. فرضیه چهارم: راه‌حل پیشنهادی برایشان قابل فهم و قابل اعتماد است. تا وقتی این فرضیه‌ها جدا نشوند، تیم فقط درباره یک ایده کلی بحث می‌کند.",
        "تست حداقلی خوب باید به رفتار واقعی نزدیک شود. تعریف و تمجید کاربر کافی نیست؛ رفتار مهم‌تر است. آیا کاربر ایمیل می‌دهد؟ جلسه بعدی می‌گذارد؟ پول پیش می‌دهد؟ حاضر می‌شود داده واقعی بدهد؟ محصول ناقص را امتحان می‌کند؟ این رفتارها از جواب‌های مودبانه معتبرترند، چون هزینه‌ای هرچند کوچک از کاربر می‌گیرند.",
        "مزیت این روش این است که غرور ساختن را کم می‌کند. تیم قبل از اینکه ماه‌ها برای محصول وقت بگذارد، با واقعیت بازار تماس می‌گیرد. اگر فرضیه غلط باشد، شکست کوچک و زودهنگام اتفاق می‌افتد؛ شکستی که ارزان است و مسیر را روشن می‌کند. اگر فرضیه درست باشد، تیم با اعتماد بیشتری وارد ساخت می‌شود، چون چیزی بیشتر از حدس در دست دارد.",
        "در نهایت، تست کردن ایده به معنی کند شدن نیست؛ اتفاقا راهی برای سریع‌تر حرکت کردن است. تیمی که بی‌مدرک می‌سازد، ممکن است سریع به نظر برسد اما ماه‌ها در مسیر اشتباه جلو برود. تیمی که فرضیه‌ها را کوچک و سریع تست می‌کند، زودتر می‌فهمد چه چیزی ارزش ساختن دارد، چه چیزی باید تغییر کند و چه چیزی باید متوقف شود.",
      ],
      takeaways: [
        "برای هر ایده، سه فرضیه پرریسک را جدا کن.",
        "قبل از ساخت محصول، ارزان‌ترین تست معتبر را طراحی کن.",
        "نتیجه تست باید تصمیم بسازد: ادامه، تغییر یا توقف.",
        "رفتار واقعی کاربر را جدی‌تر از تعریف و نظر مثبت بگیر.",
        "MVP را ابزار کاهش ریسک بدان، نه نسخه کوچک محصول نهایی.",
      ],
    },
    en: {
      paragraphs: [
        "Many teams confuse an MVP with a smaller version of the product. Minimum viable testing is different: it is the cheapest credible way to test an important hypothesis. Sometimes the test is not a product at all; it may be a landing page, interview, pre-order, prototype, or manual sale.",
        "The value of this approach is that it reduces the pride of building. Before spending months in development, the team learns which assumption is truly risky: is the problem painful, will the customer pay, does a channel exist, does the message make sense?",
        "A good testing process moves the team from internal debate to evidence. The evidence will not always be perfect, but it is better than building in the dark. Founders need to break each idea into smaller hypotheses that can be tested.",
      ],
      takeaways: [
        "Separate the three riskiest assumptions behind each idea.",
        "Design the cheapest credible test before building the product.",
        "A test should create a decision: continue, change, or stop.",
      ],
    },
    ar: {
      paragraphs: [
        "تخلط فرق كثيرة بين MVP ونسخة صغيرة من المنتج. الاختبار الأدنى القابل للتنفيذ مختلف: إنه أرخص طريقة موثوقة لاختبار فرضية مهمة. أحيانا لا يكون الاختبار منتجا أصلا؛ قد يكون صفحة هبوط أو مقابلة أو طلبا مسبقا أو نموذجا أو بيعا يدويا.",
        "قيمة هذا الأسلوب أنه يقلل غرور البناء. قبل قضاء أشهر في التطوير، يتعلم الفريق أي افتراض يحمل الخطر الحقيقي: هل المشكلة مؤلمة؟ هل سيدفع العميل؟ هل توجد قناة وصول؟ هل تفهم الرسالة؟",
        "فرایند الاختبار الجيد ينقل الفريق من الجدل الداخلي إلى الدليل. الدليل لن يكون كاملا دائما، لكنه أفضل من البناء في الظلام. على المؤسس أن يكسر كل فكرة إلى فرضيات أصغر قابلة للاختبار.",
      ],
      takeaways: [
        "افصل أخطر ثلاث فرضيات خلف كل فكرة.",
        "صمم أرخص اختبار موثوق قبل بناء المنتج.",
        "يجب أن ينتج الاختبار قرارا: الاستمرار أو التغيير أو التوقف.",
      ],
    },
  },
  "Ramen Profitable": {
    fa: {
      paragraphs: [
        "Paul Graham در این مقاله از یک وضعیت کوچک اما تعیین‌کننده حرف می‌زند: لحظه‌ای که درآمد شرکت آن‌قدر هست که هزینه زندگی بنیان‌گذارها را پوشش بدهد. این سودآوری به معنای موفقیت نهایی نیست و با سودآوری یک شرکت بالغ فرق دارد؛ اما یک چیز مهم می‌خرد: زمان. وقتی شرکت برای زنده‌ماندن کاملاً وابسته به سرمایه بعدی نیست، کیفیت تصمیم‌ها تغییر می‌کند.",
        "درآمد کوچک واقعی، تیم را از حالت نظری بیرون می‌آورد. تا قبل از آن، شرکت ممکن است بیشتر شبیه ایده، pitch یا پروژه باشد. وقتی چند مشتری پول واقعی می‌دهند، حتی اگر عدد بزرگ نباشد، یک پیام جدی به تیم می‌رسد: کسی بیرون از ساختمان حاضر است برای این ارزش هزینه کند. این سیگنال از تعریف، تشویق و جلسه‌های خوب معتبرتر است.",
        "نکته مهم مقاله این است که ramen profitable بودن مقصد نیست. قرار نیست شرکت در همان سطح کوچک بماند یا به یک کسب‌وکار خدماتی کم‌مقیاس تبدیل شود. این وضعیت بیشتر شبیه پلی است برای زنده‌ماندن در مسیر ساخت محصول بزرگ‌تر. اگر تیم این درآمد اولیه را با هدف نهایی اشتباه بگیرد، ممکن است در کارهای مشاوره‌ای یا فروش‌های غیرقابل‌تکرار گیر کند.",
        "اما اگر درست استفاده شود، این درآمد کوچک چند مزیت عملی دارد. اول اینکه فشار فاندریزینگ را کم می‌کند؛ تیم مجبور نیست با هر شرایطی پول بگیرد. دوم اینکه برای سرمایه‌گذار هم نشانه جدی‌تری است: محصول فقط ایده نیست، کسی بابتش پول داده است. سوم اینکه روحیه تیم بهتر می‌شود، چون بقا از یک امید مبهم به یک واقعیت قابل مدیریت نزدیک‌تر می‌شود.",
        "این نگاه برای بنیان‌گذارهایی مهم است که بین رشد، محصول و سرمایه سرگردان‌اند. اگر تمام ذهن تیم درگیر جذب سرمایه باشد، تمرکز از محصول و کاربر دور می‌شود. اما اگر شرکت بتواند بخشی از هزینه‌های پایه را با درآمد واقعی پوشش دهد، فاندریزینگ از اضطرار به انتخاب نزدیک‌تر می‌شود. آن وقت سرمایه می‌تواند برای شتاب گرفتن باشد، نه فقط برای نمردن.",
        "البته هر نوع درآمدی مفید نیست. درآمدی که تیم را از مسیر محصول اصلی منحرف کند، می‌تواند خطرناک باشد. مسئله این است که درآمد اولیه باید یا از خود محصول بیاید، یا دست‌کم یادگیری معتبری برای محصول بسازد. اگر درآمد فقط با کار سفارشی و غیرقابل‌تکرار به دست بیاید، شاید runway را زیاد کند اما تمرکز استارتاپ را از بین ببرد.",
        "برداشت عملی مقاله این است که پول کوچک را جدی بگیری، اما آن را با پیروزی اشتباه نگیری. هدف، ساختن یک ماشین درآمد بزرگ از روز اول نیست؛ هدف این است که یک سیگنال واقعی از بازار بگیری، هزینه بقا را پایین نگه داری و برای تصمیم‌های سخت زمان بخری. در استارتاپ، گاهی همین زمان اضافه، تفاوت بین ساختن و تمام‌شدن است.",
      ],
      takeaways: [
        "یک عدد روشن برای هزینه بقا تعریف کن: حداقل درآمدی که هزینه زندگی بنیان‌گذارها و کار ضروری شرکت را پوشش می‌دهد.",
        "درآمد اولیه را به‌عنوان سیگنال بازار بخوان، نه فقط پول نقد.",
        "فاندریزینگ را تا حد ممکن از حالت اضطرار خارج کن؛ پول بهتر است شتاب بدهد، نه فقط شرکت را زنده نگه دارد.",
        "مراقب درآمدهای خدماتی باش که تیم را از مسیر محصول اصلی منحرف می‌کنند.",
        "هزینه‌ها را پایین نگه دار تا زمان بیشتری برای یادگیری، فروش و اصلاح محصول داشته باشی.",
      ],
    },
    en: {
      paragraphs: [
        "Paul Graham describes a small but important state: the company earns enough to cover the founders' basic living costs. This is not final success, and it is not the profitability of a mature company. Its value is that it buys time. When survival is not fully dependent on the next financing round, the founder's choices become cleaner.",
        "Small real revenue changes the company from a theory into something more concrete. Before that point, the startup may feel like an idea, a deck, or a project. When customers pay, even modestly, the team receives a stronger signal than praise: someone outside the building values the product enough to spend money.",
        "Ramen profitability is not the destination. The danger is mistaking survival revenue for the final business model, especially if the money comes from custom work that does not scale. Used well, it is a bridge: it lowers fundraising pressure, improves morale, and gives the team more room to keep building the real product.",
        "The practical discipline is to know the survival number, keep costs low, and make early revenue serve learning as well as cash. Fundraising can still be useful, but it becomes healthier when it accelerates a company rather than rescuing it from immediate death. That shift changes the negotiation and the founder's focus.",
      ],
      takeaways: [
        "Define the survival number: the revenue needed to cover founder living costs and essential company work.",
        "Treat early revenue as a market signal, not only cash.",
        "Use revenue to reduce fundraising urgency and protect focus.",
        "Avoid service revenue that pulls the team away from the product path.",
        "Keep burn low enough to buy more time for learning, selling, and improving the product.",
      ],
    },
    ar: {
      paragraphs: [
        "يتحدث Paul Graham عن حالة صغيرة لكنها مهمة: أن تحقق الشركة إيرادا يكفي لتغطية تكاليف معيشة المؤسسين الأساسية. هذا لا يعني النجاح النهائي، ولا يشبه ربحية شركة ناضجة. قيمته أنه يشتري الوقت. عندما لا يكون البقاء معتمدا كليا على جولة تمويل جديدة، تصبح قرارات المؤسس أوضح.",
        "الإيراد الحقيقي ولو كان صغيرا يخرج الشركة من مرحلة النظرية. قبل ذلك قد تبدو الشركة كفكرة أو عرض أو مشروع. عندما يدفع العملاء، حتى بمبلغ متواضع، يحصل الفريق على إشارة أقوى من المجاملة: شخص خارج المبنى يرى قيمة كافية ليدفع مالا.",
        "هذه الحالة ليست الوجهة النهائية. الخطر أن يخلط الفريق بين إيراد البقاء ونموذج العمل النهائي، خصوصا إذا جاء المال من أعمال مخصصة لا تتكرر. إذا استُخدمت جيدا، فهي جسر: تخفف ضغط جمع التمويل، ترفع المعنويات، وتمنح الفريق مساحة أكبر لبناء المنتج الحقيقي.",
        "الانضباط العملي هو معرفة رقم البقاء، إبقاء التكاليف منخفضة، وجعل الإيراد المبكر يخدم التعلم كما يخدم النقد. لا يزال التمويل مفيدا، لكنه يصبح أصح عندما يسرع شركة موجودة لا عندما ينقذها من الموت الفوري. هذا التحول يغير التفاوض وتركيز المؤسس.",
      ],
      takeaways: [
        "حدد رقم البقاء: الإيراد اللازم لتغطية معيشة المؤسسين والعمل الأساسي للشركة.",
        "عامل الإيراد المبكر كإشارة من السوق، لا كنقد فقط.",
        "استخدم الإيراد لتقليل استعجال التمويل وحماية التركيز.",
        "تجنب إيرادات الخدمات التي تسحب الفريق بعيدا عن مسار المنتج.",
        "أبق الحرق المالي منخفضا لتشتري وقتا أطول للتعلم والبيع وتحسين المنتج.",
      ],
    },
  },
  "How to Talk to Users": {
    fa: {
      paragraphs: [
        "صحبت با کاربر ساده به نظر می‌رسد، اما بسیاری از بنیان‌گذارها با سؤال‌های اشتباه داده خراب تولید می‌کنند. اگر از کاربر بپرسی «آیا این را دوست داری؟» معمولا جواب مودبانه می‌گیری. سؤال خوب باید به رفتار گذشته، درد واقعی و تصمیم‌های خرج‌کردن وصل شود.",
        "مصاحبه کاربر جای pitch نیست. بنیان‌گذار باید کمتر توضیح بدهد و بیشتر گوش کند. هدف این نیست که کاربر را قانع کنی ایده تو خوب است؛ هدف این است که بفهمی زندگی واقعی او چگونه کار می‌کند و مسئله کجا آن‌قدر دردناک می‌شود که تغییر رفتار ارزش داشته باشد.",
        "کیفیت کشف مسئله، کیفیت محصول را تعیین می‌کند. اگر مسئله را سطحی بفهمی، محصول هم سطحی می‌شود. مصاحبه خوب به تیم کمک می‌کند زبان کاربر، trigger خرید، workaroundهای فعلی و شدت نیاز را دقیق‌تر ببیند.",
        "نکته مهم این است که کاربر معمولا تحلیل‌گر محصول تو نیست؛ او راوی زندگی خودش است. وقتی از او می‌خواهی آینده را پیش‌بینی کند، یا درباره چیزی که هنوز وجود ندارد نظر قطعی بدهد، اغلب پاسخ قابل اتکا نمی‌گیری. اما وقتی درباره آخرین باری که با مسئله روبه‌رو شده، راه‌حل فعلی‌اش، هزینه‌ای که پرداخته و چیزی که آزارش داده می‌پرسی، گفت‌وگو از سطح تعارف وارد واقعیت می‌شود.",
        "مصاحبه خوب شبیه بازجویی نیست. باید فضا آن‌قدر آرام باشد که کاربر بتواند بدون دفاع‌کردن، تجربه‌اش را توضیح دهد. بنیان‌گذار هم باید مراقب باشد با لحن، سؤال جهت‌دار یا واکنش‌های هیجانی جواب را دستکاری نکند. گاهی بهترین جمله در مصاحبه فقط یک سکوت کوتاه است؛ سکوتی که اجازه می‌دهد کاربر ادامه بدهد و جزئیاتی را بگوید که در پاسخ اول پنهان مانده بود.",
        "یکی از خروجی‌های مهم گفت‌وگو با کاربر، واژه‌هاست. تیم‌ها معمولا با زبان داخلی خودشان مسئله را توصیف می‌کنند، اما بازار با زبان دیگری حرف می‌زند. اگر چند مصاحبه خوب انجام شود، کم‌کم می‌توانی جمله‌هایی را ببینی که کاربر واقعا برای توصیف درد، تردید، امید یا راه‌حل فعلی‌اش استفاده می‌کند. همین جمله‌ها بعدها در محصول، فروش، پشتیبانی و حتی تصمیم‌گیری استراتژیک به درد می‌خورند.",
        "در نهایت، صحبت با کاربر یک فعالیت مقطعی قبل از ساخت محصول نیست؛ باید تبدیل به ریتم کاری شود. تیمی که فقط قبل از لانچ مصاحبه می‌کند، خیلی زود دوباره از بازار دور می‌شود. اما تیمی که هر هفته با کاربر واقعی تماس دارد، آهسته‌تر دچار توهم می‌شود، زودتر خطا را می‌بیند و تصمیم‌هایش کمتر از جلسه داخلی و بیشتر از واقعیت بیرون تغذیه می‌شود.",
      ],
      takeaways: [
        "درباره رفتار گذشته بپرس، نه نظر فرضی درباره آینده.",
        "در مصاحبه pitch نکن؛ کشف کن.",
        "به workaroundهای فعلی کاربر به چشم signal نگاه کن.",
        "واژه‌های خود کاربر را ثبت کن؛ آن‌ها معمولا از اصطلاحات داخلی تیم دقیق‌ترند.",
        "مصاحبه با کاربر را به ریتم هفتگی تبدیل کن، نه پروژه‌ای مقطعی.",
      ],
    },
    en: {
      paragraphs: [
        "Talking to users sounds simple, but many founders create bad data with bad questions. If you ask whether someone likes your idea, you often get politeness. A better question connects to past behavior, real pain, and decisions that involved time or money.",
        "A user interview is not a pitch. The founder should explain less and listen more. The goal is not to convince the user that the idea is good; it is to understand how their real life works and where the problem becomes painful enough to justify behavior change.",
        "The quality of problem discovery shapes the quality of the product. If the problem is understood shallowly, the product will be shallow too. Good interviews reveal the user's language, buying triggers, current workarounds, and intensity of need.",
        "Users are usually not product analysts; they are witnesses to their own lives. Asking them to predict the future or judge an unfinished idea often creates unreliable answers. Asking about the last time the problem happened, what they did, what it cost, and what frustrated them moves the conversation from opinion into evidence.",
        "Good discovery should become a rhythm, not a one-time research phase. A team that keeps speaking to real users every week is less likely to drift into internal fiction. It notices weak signals sooner, learns the user's language more accurately, and makes product decisions with a stronger connection to reality.",
      ],
      takeaways: [
        "Ask about past behavior, not hypothetical future opinions.",
        "Do not pitch during discovery; listen.",
        "Treat current workarounds as strong signals.",
        "Capture the user's own words; they are often sharper than internal terminology.",
        "Make user conversations a weekly habit, not a pre-launch project.",
      ],
    },
    ar: {
      paragraphs: [
        "يبدو الحديث مع المستخدمين بسيطا، لكن كثيرا من المؤسسين ينتجون بيانات سيئة بأسئلة سيئة. إذا سألت المستخدم هل يحب فكرتك، فغالبا تحصل على مجاملة. السؤال الأفضل يرتبط بسلوك سابق وألم حقيقي وقرارات تضمنت وقتا أو مالا.",
        "مقابلة المستخدم ليست عرضا للبيع. يجب أن يشرح المؤسس أقل ويستمع أكثر. الهدف ليس إقناع المستخدم بأن الفكرة جيدة، بل فهم كيف تعمل حياته فعلا وأين تصبح المشكلة مؤلمة بما يكفي لتغيير السلوك.",
        "جودة اكتشاف المشكلة تصنع جودة المنتج. إذا فهمت المشكلة بسطحية، سيكون المنتج سطحيا. المقابلات الجيدة تكشف لغة المستخدم ومحفزات الشراء والحلول البديلة الحالية وشدة الحاجة.",
        "المستخدم غالبا ليس محلل منتج؛ إنه شاهد على حياته اليومية. عندما تطلب منه أن يتنبأ بالمستقبل أو يحكم على فكرة غير مكتملة، تحصل غالبا على إجابات ضعيفة. أما عندما تسأله عن آخر مرة حدثت فيها المشكلة، وما الذي فعله، وما التكلفة التي دفعها، وما الذي أزعجه، يصبح الحديث أقرب إلى الدليل.",
        "يجب أن يصبح الحديث مع المستخدمين إيقاعا مستمرا، لا مرحلة بحث قبل الإطلاق فقط. الفريق الذي يتواصل كل أسبوع مع مستخدمين حقيقيين يقل وقوعه في الخيال الداخلي، ويرى الإشارات الضعيفة مبكرا، ويتعلم لغة السوق بدقة أكبر.",
      ],
      takeaways: [
        "اسأل عن السلوك السابق، لا الآراء الافتراضية عن المستقبل.",
        "لا تقدم عرضا أثناء الاكتشاف؛ استمع.",
        "اعتبر الحلول البديلة الحالية إشارات قوية.",
        "سجل كلمات المستخدم نفسها؛ فهي غالبا أدق من مصطلحات الفريق الداخلية.",
        "اجعل مقابلات المستخدمين عادة أسبوعية، لا مشروعا مؤقتا قبل الإطلاق.",
      ],
    },
  },
  "Default Alive or Default Dead?": {
    fa: {
      paragraphs: [
        "در این مقاله، Paul Graham یک سؤال ساده اما تعیین‌کننده جلوی بنیان‌گذار می‌گذارد: اگر مسیر فعلی را ادامه بدهی، با همین پول، رشد، درآمد و هزینه‌ها زنده می‌مانی یا نه؟ پاسخ این سؤال باید قبل از امیدواری به جذب سرمایه بعدی روشن باشد. بسیاری از تیم‌ها وقتی runway دارند احساس امنیت می‌کنند، اما runway به‌تنهایی امنیت نیست؛ مهم این است که شرکت در انتهای آن مسیر به نقطه‌ای رسیده باشد که خودش بتواند ادامه بدهد.",
        "مفهوم «default alive» یعنی اگر هیچ اتفاق معجزه‌آسایی نیفتد، شرکت با روند فعلی به وضعیتی می‌رسد که دخل و خرجش قابل دوام است. شاید هنوز کوچک باشد، شاید هنوز بسیار سریع رشد نکند، اما برای زنده‌ماندن وابسته به چک بعدی سرمایه‌گذار نیست. در مقابل، «default dead» یعنی اگر سرمایه تازه نرسد، شرکت تمام می‌شود؛ حتی اگر محصول خوب، تیم باهوش یا رشد ظاهری داشته باشد.",
        "اهمیت این چارچوب در این است که توهم را کم می‌کند. بنیان‌گذار ممکن است بگوید «بعداً پول جذب می‌کنیم» یا «رشد حلش می‌کند»، اما این‌ها تا وقتی با عدد و روند فعلی پشتیبانی نشوند، فرضیه‌اند نه برنامه. سؤال اصلی این نیست که آیا می‌توانی سرمایه جذب کنی؛ سؤال اول این است که آیا کسب‌وکار در مسیر فعلی می‌تواند خودش را به نقطه بقا برساند یا نه.",
        "اگر شرکت default dead است، مسئله لزوماً این نیست که شکست خورده؛ مسئله این است که زمان تصمیم‌گیری فرا رسیده است. تیم باید یا رشد درآمد را جدی‌تر کند، یا هزینه‌ها را پایین بیاورد، یا محصول و بازار را چنان دقیق‌تر کند که مسیر جذب سرمایه قابل دفاع شود. خطرناک‌ترین حالت، ادامه‌دادن با خوش‌بینی مبهم است؛ چون هر ماه هم پول کم می‌شود و هم گزینه‌های تصمیم‌گیری محدودتر می‌شوند.",
        "این مقاله همچنین رابطه سالم‌تری با فاندریزینگ پیشنهاد می‌دهد. سرمایه‌گذاری می‌تواند شتاب بدهد، اما اگر تنها راه زنده‌ماندن باشد، قدرت تصمیم‌گیری از تیم دور می‌شود. شرکتی که به بقا نزدیک‌تر است، در مذاکره سرمایه هم بهتر می‌ایستد؛ چون سرمایه برای رشد می‌خواهد، نه برای نفس‌کشیدن. همین تفاوت، کیفیت تصمیم‌های بنیان‌گذار را تغییر می‌دهد.",
        "برای کار عملی، بنیان‌گذار باید هر ماه یک مدل ساده و بی‌رحمانه بسازد: cash، burn، درآمد، رشد واقعی، نرخ تبدیل، هزینه جذب و زمانی که تا بقا باقی مانده است. این مدل لازم نیست پیچیده باشد؛ باید صادق باشد. اگر مدل نشان دهد مسیر فعلی زنده نمی‌ماند، بهتر است زودتر درد را ببینی و اقدام کنی تا اینکه چند ماه بعد با گزینه‌های کمتر به همان واقعیت برسی.",
        "ارزش اصلی مقاله در نام‌گذاری یک وضعیت مدیریتی است. وقتی تیم بتواند صادقانه بگوید default alive است یا default dead، گفت‌وگو از امید و ترس به تصمیم تبدیل می‌شود. این سؤال ساده، فاندریزینگ، استخدام، هزینه، roadmap و حتی سرعت رشد را روی زمین واقعی می‌آورد.",
      ],
      takeaways: [
        "هر ماه با عدد روشن کن شرکت در مسیر فعلی default alive است یا default dead.",
        "runway را جدا از مسیر بقا تحلیل کن؛ داشتن پول موقت با دوام کسب‌وکار یکی نیست.",
        "اگر default dead هستی، هم‌زمان روی رشد درآمد، کاهش burn و دفاع‌پذیری مسیر سرمایه کار کن.",
        "سرمایه را برای شتاب بهتر ببین، نه تنها راه نفس‌کشیدن شرکت.",
        "قبل از کم‌شدن گزینه‌ها، تصمیم سخت را زودتر بگیر: تمرکز، کاهش هزینه، تغییر مسیر یا فاندریزینگ جدی.",
      ],
    },
    en: {
      paragraphs: [
        "Paul Graham's frame asks a direct operating question: if nothing unusually lucky happens, will the company survive on its current trajectory? Runway alone is not safety. A startup is safer when the current combination of revenue, growth, spending, and time points toward durability rather than dependence on the next financing round.",
        "Being default alive means the company can reach a sustainable state if it keeps executing from here. It may still be small, and it may still want more capital, but survival is not entirely outsourced to investors. Being default dead means the company runs out of money unless something external changes, even if the team is talented and the product looks promising.",
        "The value of the concept is that it replaces vague optimism with a decision. A founder can always say that fundraising will happen later, or that growth will solve the burn rate, but those statements need numbers behind them. If the current path does not lead to survival, the team has to change the path while it still has options.",
        "The practical response is not panic. It is operating discipline. Increase revenue quality, reduce burn where it does not create learning or growth, sharpen the product and market story, and decide whether fundraising is a growth accelerant or a survival dependency. The earlier this is known, the more room the founder has to act.",
      ],
      takeaways: [
        "Review monthly whether the company is default alive or default dead.",
        "Separate runway from survivability; temporary cash is not the same as a durable business.",
        "If the company is default dead, work on revenue, burn, and fundraising readiness together.",
        "Prefer raising money for acceleration, not as the only way to keep breathing.",
        "Make the hard decision while there are still options: focus, cut, pivot, or fundraise deliberately.",
      ],
    },
    ar: {
      paragraphs: [
        "يطرح Paul Graham في هذا المقال سؤالا تشغيليا مباشرا: إذا لم يحدث شيء استثنائي، هل ستبقى الشركة حية بمسارها الحالي؟ وجود runway لا يعني الأمان وحده. تكون الشركة أكثر أمانا عندما تشير الإيرادات والنمو والمصاريف والوقت إلى قدرة حقيقية على الاستمرار، لا إلى اعتماد كامل على جولة تمويل جديدة.",
        "أن تكون الشركة default alive يعني أنها تستطيع الوصول إلى وضع قابل للاستمرار إذا واصلت التنفيذ من هنا. قد تكون صغيرة، وقد ترغب في رأس مال إضافي، لكن البقاء ليس مرهونا تماما بالمستثمرين. أما default dead فيعني أن الشركة ستنفد أموالها ما لم يتغير شيء خارجي، حتى لو كان الفريق قويا والمنتج واعدا.",
        "قيمة الفكرة أنها تستبدل التفاؤل الغامض بقرار واضح. يستطيع المؤسس دائما أن يقول إن التمويل سيأتي لاحقا أو إن النمو سيحل مشكلة الحرق المالي، لكن هذه الجمل تحتاج إلى أرقام. إذا لم يؤد المسار الحالي إلى البقاء، فعلى الفريق تغيير المسار بينما لا تزال لديه خيارات.",
        "الاستجابة العملية ليست الذعر، بل الانضباط التشغيلي: تحسين جودة الإيراد، خفض المصاريف التي لا تصنع تعلما أو نموا، توضيح قصة المنتج والسوق، وتحديد هل التمويل وسيلة تسريع أم شرط للبقاء. كلما عرف المؤسس ذلك مبكرا، امتلك مساحة أكبر للحركة.",
      ],
      takeaways: [
        "راجع شهريا هل الشركة default alive أم default dead.",
        "افصل بين runway وبين القدرة على البقاء؛ المال المؤقت لا يعني عملا قابلا للاستمرار.",
        "إذا كانت الشركة default dead، اعمل في الوقت نفسه على الإيراد والحرق والاستعداد للتمويل.",
        "اجعل التمويل أداة تسريع قدر الإمكان، لا الطريقة الوحيدة للتنفس.",
        "اتخذ القرار الصعب مبكرا: التركيز، خفض المصاريف، تغيير المسار، أو جمع التمويل بوضوح.",
      ],
    },
  },
  "The 30 Best Pieces of Advice for Entrepreneurs in 2023": {
    fa: {
      paragraphs: [
        "این مقاله First Round Review یک فهرست خطی از جمله‌های انگیزشی نیست؛ جمع‌بندی ۳۰ قطعه توصیه عملی از گفت‌وگوهای سالانه آن‌ها با بنیان‌گذارها، مدیران محصول، مدیران تیم و اپراتورهای شرکت‌ساز است. ارزشش در این است که هر توصیه به یک موقعیت واقعی وصل است: استخدام مدیر، هدف‌گذاری، تصمیم‌گیری محصول، فروش اولیه، نگهداشت مشتری، رابطه هم‌بنیان‌گذارها و ساخت MVP.",
        "بهترین استفاده از چنین مقاله‌ای این نیست که همه توصیه‌ها را یک‌باره وارد شرکت کنیم. شرکت در هر مرحله فقط ظرفیت چند تغییر جدی دارد. اگر تیم درگیر پیدا کردن محصول/بازار است، توصیه‌های مربوط به گفت‌وگوی مشتری، فروش بنیان‌گذارمحور و MVP کوچک مهم‌ترند. اگر تیم در حال رشد است، توصیه‌های مربوط به مدیریت، بازخورد، استخدام و تصمیم‌های برگشت‌پذیر به درد می‌خورند.",
        "یک نخ مشترک در مقاله دیده می‌شود: سرعت خوب از شتاب‌زدگی نمی‌آید؛ از وضوح می‌آید. وقتی هدف به شکل روایت روشن شود، وقتی مسئله مشتری دقیق فهمیده شود، وقتی تصمیم دوطرفه از تصمیم یک‌طرفه جدا شود، و وقتی MVP فقط برای اثبات فرضیه ساخته شود، تیم می‌تواند سریع‌تر حرکت کند بدون اینکه خودش را با کار اضافه خسته کند.",
        "نکته مهم دیگر، فروتنی بنیان‌گذار است. مقاله چند بار به شکل‌های مختلف یادآوری می‌کند که نظر بنیان‌گذار هزینه دارد؛ فروش اولیه باید برای یادگیری باشد، نه فقط بستن قرارداد؛ و محصول نباید قبل از فهم مسئله ساخته شود. این‌ها توصیه‌های ضدنمایشی‌اند: کمتر ادعا کن، بیشتر گوش بده، و زودتر با واقعیت تماس بگیر.",
        "برای خواندن عملی، می‌شود این مقاله را به یک جلسه بازنگری تبدیل کرد. هر نفر از تیم یک توصیه انتخاب کند، بگوید چرا الان مهم است، و آن را به یک رفتار کوچک این هفته تبدیل کند. خروجی خوب از این مقاله یک فهرست بلند نیست؛ یک تصمیم بهتر، یک سؤال دقیق‌تر، یا حذف یک کار کم‌اثر است.",
      ],
      advice: [
        "برای استخدام مدیر، از سؤال‌های کلی درباره سبک مدیریت فاصله بگیر؛ از نمونه‌های واقعی بپرس: آخرین بار چه بازخوردی گرفتی و چه چیزی را در رفتار مدیریتی‌ات تغییر دادی؟",
        "هدف‌گذاری را با روایت شروع کن. اول داستان سه ماه آینده را بگو، بعد آن را به فصل‌ها، خروجی‌ها و چند معیار محدود تبدیل کن.",
        "قبل از اضافه کردن هر کار به برنامه، بپرس اگر این کار انجام نشود آیا محصول یا خروجی اصلی واقعاً زمین می‌ماند؟ اگر نه، احتمالاً باید حذف شود.",
        "نظر بنیان‌گذار همیشه رایگان نیست. قبل از گفتن نظر، فرق بین «می‌دانم» و «فقط سلیقه دارم» را روشن کن و هزینه درست‌بودن خودت را بسنج.",
        "بازخورد مدیریتی باید آن‌قدر واضح باشد که طرف مقابل بتواند بعد از جلسه دقیقاً به همان جمله اشاره کند.",
        "تصمیم‌های دوطرفه را زیادی سنگین نکن. اگر تصمیم قابل برگشت است، بهتر است با ریسک کنترل‌شده حرکت کنی و یاد بگیری.",
        "با مشتری آن‌قدر حرف بزن که بتوانی بخش بزرگی از حرف‌هایش را پیش‌بینی کنی؛ آن‌وقت احتمالاً مسئله را واقعاً فهمیده‌ای.",
        "برای ایده‌های اولیه، همیشه لازم نیست demo بسازی. گاهی یک روایت فروش/اسلاید سبک که ارزش پیشنهادی را روشن کند، سریع‌تر علاقه بازار را نشان می‌دهد.",
        "حتی در محصول‌های PLG، فروش اولیه توسط بنیان‌گذار می‌تواند حلقه یادگیری را کوتاه کند؛ چون هم زبان فروش را می‌سازد، هم محصول را دقیق‌تر می‌کند.",
        "قبل از عاشق‌شدن به راه‌حل، ترمزهای تغییر را پیدا کن: چرا مشتری تا امروز رفتار فعلی‌اش را عوض نکرده است؟",
        "جامعه و کاربران اولیه فقط کانال توزیع نیستند؛ اگر اعتماد وجود داشته باشد، می‌توانند آزمایشگاه محصول و تحقیق مشتری باشند.",
        "MVP را لاغر کن. هدف نسخه اولیه اثبات فرضیه است، نه نمایش کامل آینده محصول.",
      ],
      takeaways: [
        "یک توصیه را به یک آزمایش یک‌هفته‌ای تبدیل کن، نه یک پروژه بزرگ.",
        "برای تصمیم‌های برگشت‌پذیر سرعت را بالا ببر و برای تصمیم‌های سخت‌برگشت مکث بیشتری بگذار.",
        "هر هفته حداقل یک سؤال مشتری/محصول را با واقعیت بیرون از شرکت چک کن.",
        "در برنامه تیم، کارهایی را پیدا کن که اگر حذف شوند خروجی اصلی همچنان جلو می‌رود.",
        "بازخورد، هدف و مسئله را با جمله‌های قابل اشاره و قابل پیگیری بنویس.",
      ],
    },
    en: {
      paragraphs: [
        "This First Round Review piece is not a motivational list. It is a collection of thirty operating lessons from founders, product leaders, managers, and startup operators, covering hiring, goal-setting, product decisions, early sales, customer learning, co-founder rituals, and MVP design.",
        "The useful way to read it is stage-by-stage. A team looking for product-market fit should pay attention to customer conversations, founder-led sales, lightweight validation, and skinny MVPs. A scaling team may get more value from the advice on management interviews, feedback, decision quality, and retention.",
        "A common thread is that speed comes from clarity, not from rushing. A clear narrative for goals, a better model of the customer problem, a distinction between reversible and irreversible decisions, and a small MVP all help teams move faster without adding unnecessary work.",
        "The article is also a reminder of founder humility. Founder opinions have a cost; early sales should create learning, not only revenue; and solutions should wait until the problem is understood. The best output is not a long checklist, but one sharper question or one better operating habit.",
      ],
      advice: [
        "Refresh management interviews with real examples: ask what feedback changed the candidate's leadership behavior.",
        "Set goals as a story first, then turn the next three months into a few concrete outcomes.",
        "Before adding work, ask whether the core product or outcome would fail without it.",
        "Treat founder opinions as costly; distinguish evidence from preference before speaking.",
        "Make feedback explicit enough that the receiver can point to the exact sentence.",
        "Move faster on reversible decisions, while giving irreversible decisions more care.",
        "Keep talking to customers until you can predict a large share of what they will say.",
        "Use lightweight marketing vignettes to test positioning before building a demo.",
        "Use founder-led sales early to shorten the learning loop, even in PLG products.",
        "Find the customer's parking brakes before prescribing a solution.",
        "Use community as a trusted source for product discovery, not only distribution.",
        "Make the MVP small enough to test the hypothesis, not to represent the whole vision.",
      ],
      takeaways: [
        "Turn one piece of advice into a one-week experiment.",
        "Separate reversible decisions from hard-to-reverse decisions.",
        "Check one product or customer question against reality every week.",
        "Remove work that does not support the core outcome.",
        "Write goals, feedback, and problems in language people can point back to.",
      ],
    },
    ar: {
      paragraphs: [
        "مقال First Round Review هذا ليس قائمة تحفيزية، بل تجميع لثلاثين درساً عملياً من مؤسسين وقادة منتج ومديرين ومشغلين في الشركات الناشئة. يدور حول التوظيف، وضع الأهداف، قرارات المنتج، البيع المبكر، التعلم من العملاء، علاقة الشركاء المؤسسين، وتصميم MVP.",
        "القراءة المفيدة تكون بحسب مرحلة الشركة. إذا كان الفريق يبحث عن ملاءمة المنتج للسوق، فالنصائح المتعلقة بحديث العملاء، البيع بقيادة المؤسس، الاختبار الخفيف، وتصغير MVP ستكون أهم. أما الفريق الذي يتوسع فقد يستفيد أكثر من الإدارة، التغذية الراجعة، جودة القرار، والاحتفاظ بالعملاء.",
        "الخيط المشترك هو أن السرعة تأتي من الوضوح لا من الاستعجال. عندما تتحول الأهداف إلى قصة مفهومة، وتصبح مشكلة العميل أوضح، ويفصل الفريق بين القرارات القابلة للرجوع وغير القابلة للرجوع، يمكنه أن يتحرك أسرع من دون إضافة عمل غير ضروري.",
        "كما يذكّر المقال بتواضع المؤسس. رأي المؤسس له كلفة، والبيع المبكر يجب أن يصنع تعلماً لا إيراداً فقط، والحل لا ينبغي أن يسبق فهم المشكلة. الناتج الجيد من المقال ليس قائمة طويلة، بل سؤال أدق أو عادة تشغيلية أفضل.",
      ],
      advice: [
        "حدّث أسئلة مقابلات المديرين واسأل عن أمثلة حقيقية لا عن أسلوب إدارة عام.",
        "ابدأ الأهداف بقصة ثم حوّل الأشهر الثلاثة القادمة إلى مخرجات قليلة وواضحة.",
        "قبل إضافة عمل جديد، اسأل هل سيفشل المنتج أو الناتج الأساسي من دونه؟",
        "عامل رأي المؤسس كشيء له كلفة، وافصل بين الدليل والتفضيل الشخصي.",
        "اجعل التغذية الراجعة صريحة بما يكفي ليشير المتلقي إلى الجملة المحددة.",
        "تحرك أسرع في القرارات القابلة للرجوع، وتمهل أكثر في القرارات صعبة الرجوع.",
        "واصل الحديث مع العملاء حتى تستطيع توقع جزء كبير مما سيقولونه.",
        "اختبر التموضع برسالة بيع خفيفة قبل بناء عرض أو نموذج كامل.",
        "استخدم البيع بقيادة المؤسس مبكراً لتقصير حلقة التعلم، حتى في منتجات PLG.",
        "ابحث عن مكابح التغيير لدى العميل قبل وصف الحل.",
        "استخدم المجتمع كمصدر موثوق لاكتشاف المنتج، لا كقناة توزيع فقط.",
        "اجعل MVP صغيراً بما يكفي لاختبار الفرضية، لا لتمثيل الرؤية كلها.",
      ],
      takeaways: [
        "حوّل نصيحة واحدة إلى تجربة لمدة أسبوع.",
        "افصل بين القرارات القابلة للرجوع والقرارات صعبة الرجوع.",
        "اختبر كل أسبوع سؤالاً واحداً عن المنتج أو العميل مع الواقع.",
        "احذف العمل الذي لا يخدم الناتج الأساسي.",
        "اكتب الأهداف والتغذية الراجعة والمشكلات بلغة يمكن الرجوع إليها.",
      ],
    },
  },
  "Product-User Fit Comes Before Product-Market Fit": {
    fa: {
      paragraphs: [
        "قبل از اینکه یک تیم درباره بازار بزرگ حرف بزند، باید بفهمد کدام کاربر مشخص واقعا محصول را می‌خواهد. product-user fit یعنی یک گروه قابل تعریف از کاربران وجود دارد که مسئله را جدی حس می‌کنند و راه‌حل برایشان معنی‌دار است.",
        "این مرحله جلوی خطای رایج را می‌گیرد: ساخت محصول برای یک بازار خیالی. وقتی user fit روشن نیست، تیم پیام محصول، featureها و کانال توزیع را برای همه طراحی می‌کند و در نتیجه برای هیچ‌کس تیز نیست. تمرکز روی user fit باعث می‌شود محصول زبان دقیق‌تری پیدا کند.",
        "بعد از user fit، صحبت از market fit واقعی‌تر می‌شود. ابتدا باید فهمید چه کسی عاشق محصول می‌شود، چرا، و در چه موقعیتی. سپس می‌توان پرسید آیا تعداد بیشتری از همان نوع کاربر وجود دارد و آیا دسترسی به آن‌ها اقتصادی است یا نه.",
      ],
      takeaways: [
        "قبل از بازار بزرگ، کاربر عاشق کوچک اما مشخص را پیدا کن.",
        "پیام، feature و کانال را برای همان user segment تیز کن.",
        "بعد از user fit، اندازه و اقتصاد بازار را بسنج.",
      ],
    },
    en: {
      paragraphs: [
        "Before a team talks about a large market, it has to understand which specific user truly wants the product. Product-user fit means there is a definable group of users who feel the problem seriously and find the solution meaningful.",
        "This prevents a common mistake: building for an imaginary market. When user fit is unclear, the team designs messaging, features, and distribution for everyone, which means the product is sharp for no one. User fit gives the product a more precise language.",
        "After user fit, market fit becomes a more realistic conversation. First learn who loves the product, why, and in what situation. Then ask whether more people like that exist and whether reaching them is economically sensible.",
      ],
      takeaways: [
        "Before the big market, find the small specific user who loves the product.",
        "Sharpen messaging, features, and channels for that user segment.",
        "After user fit, evaluate market size and economics.",
      ],
    },
    ar: {
      paragraphs: [
        "قبل أن يتحدث الفريق عن سوق كبير، عليه أن يفهم أي مستخدم محدد يريد المنتج فعلا. ملاءمة المنتج للمستخدم تعني وجود مجموعة واضحة من المستخدمين تشعر بالمشكلة بجدية وترى أن الحل ذو معنى.",
        "هذا يمنع خطأ شائعا: البناء لسوق خيالي. عندما لا تكون ملاءمة المستخدم واضحة، يصمم الفريق الرسالة والميزات والتوزيع للجميع، فيصبح المنتج غير حاد لأي أحد. التركيز على المستخدم يعطي المنتج لغة أدق.",
        "بعد ملاءمة المستخدم، يصبح الحديث عن ملاءمة السوق أكثر واقعية. أولا افهم من يحب المنتج ولماذا وفي أي موقف. ثم اسأل هل يوجد المزيد من هذا النوع من المستخدمين وهل الوصول إليهم اقتصادي.",
      ],
      takeaways: [
        "قبل السوق الكبير، ابحث عن مستخدم صغير ومحدد يحب المنتج.",
        "اجعل الرسالة والميزات والقنوات دقيقة لهذه الشريحة.",
        "بعد ملاءمة المستخدم، قيّم حجم السوق واقتصادياته.",
      ],
    },
  },
  "Nail the Customer Development Manifesto to the Wall": {
    fa: {
      paragraphs: [
        "این متن Steve Blank یک یادآوری سخت اما حیاتی برای هر بنیان‌گذار است: هیچ حقیقتی درباره مشتری، بازار و مدل کسب‌وکار داخل اتاق جلسه پیدا نمی‌شود. داخل شرکت فقط فرضیه داریم؛ بیرون از ساختمان است که معلوم می‌شود کدام فرضیه زنده می‌ماند و کدام فقط یک خیال خوش‌ساخت بوده است.",
        "بسیاری از تیم‌ها با یک vision شروع می‌کنند و خیلی زود آن را با واقعیت اشتباه می‌گیرند. برنامه مالی، pitch deck، roadmap و حتی طراحی محصول می‌توانند ظاهر اعتمادبه‌نفس بسازند، اما تا وقتی مشتری واقعی دیده نشده و رفتار واقعی سنجیده نشده، همه این‌ها بیشتر شبیه نقشه‌اند تا زمین. Customer Development یعنی پذیرفتن همین فاصله بین نقشه و زمین.",
        "اصل مهم این است که استارتاپ نسخه کوچک یک شرکت بزرگ نیست. شرکت بزرگ معمولا در حال اجرای یک مدل شناخته‌شده است؛ اما استارتاپ در حال جست‌وجوی مدل تکرارپذیر و مقیاس‌پذیر است. بنابراین metricها، جلسات، ساختار تصمیم‌گیری و حتی تحمل شکست در استارتاپ باید با منطق جست‌وجو طراحی شوند، نه با منطق اجرای مطمئن.",
        "وقتی تیم از ساختمان بیرون می‌رود، هدفش فروش اجباری ایده نیست. هدف این است که فرضیه‌ها را با واقعیت تماس بدهد: آیا مشتری درد را جدی حس می‌کند؟ آیا مسئله اولویت دارد؟ آیا راه‌حل فعلی کافی نیست؟ آیا کسی حاضر است برای راه‌حل بهتر هزینه، زمان یا تغییر رفتار بدهد؟ جواب این سؤال‌ها با نظر مدیران، مشاوران یا دوستان به دست نمی‌آید؛ باید از بازار و مشتری گرفته شود.",
        "Customer Development همچنین به بنیان‌گذار یاد می‌دهد شکست کوچک را زود و ارزان بپذیرد. اگر فرضیه‌ای غلط است، بهتر است در یک مصاحبه، تست فروش یا آزمایش کوچک بفهمی تا بعد از چند ماه توسعه محصول. این رویکرد شکست را رمانتیک نمی‌کند؛ آن را به ابزار کاهش ریسک تبدیل می‌کند. شکست مفید، شکستی است که فرضیه را روشن‌تر کند.",
        "برای اپراتوری، پیام متن روشن است: یادگیری باید در سیستم کار شرکت طراحی شود. هر هفته باید فرضیه مشخص، تماس واقعی با مشتری، evidence قابل ثبت و تصمیم بعدی وجود داشته باشد. اگر تیم فقط می‌سازد اما یاد نمی‌گیرد، احتمال دارد با سرعت زیاد در مسیر اشتباه حرکت کند.",
        "در نهایت، این متن درباره فروتنی عملیاتی است. بنیان‌گذار باید آن‌قدر به vision خود باور داشته باشد که شروع کند، اما آن‌قدر هم فروتن باشد که اجازه دهد مشتری، بازار و داده‌های واقعی شکل دقیق آن vision را اصلاح کنند. شرکت خوب از ترکیب ایمان اولیه و یادگیری بی‌رحمانه ساخته می‌شود.",
      ],
      takeaways: [
        "هر ایده را به فرضیه‌های قابل تست درباره مشتری، مسئله، کانال و درآمد تبدیل کن.",
        "هفته‌ای چند گفت‌وگوی واقعی با مشتری داشته باش؛ نه فقط جلسه داخلی.",
        "استارتاپ را مثل سازمان جست‌وجو مدیریت کن، نه نسخه کوچک شرکت بزرگ.",
        "شکست کوچک و زودهنگام را به‌عنوان ابزار کاهش ریسک بپذیر.",
        "بعد از هر تست، تصمیم روشن بگیر: ادامه، تغییر فرضیه یا توقف.",
      ],
    },
    en: {
      paragraphs: [
        "Steve Blank's customer development message is blunt: there are no facts about customers, markets, or business models inside the building. Inside the company, founders mostly have hypotheses. Outside the building, those hypotheses meet reality.",
        "A startup is not a smaller version of a large company. A large company usually executes a known model; a startup searches for a repeatable and scalable one. That means the operating system of a startup should be designed around learning, testing, and iteration rather than confident execution.",
        "Getting outside the building is not about pitching harder. It is about testing assumptions: does the customer feel the pain, is it a priority, are current alternatives weak, and will someone pay or change behavior for a better solution? These answers come from customers and markets, not from internal meetings.",
        "The discipline also changes the meaning of failure. A small failed test is not a tragedy if it saves months of building the wrong thing. Useful failure clarifies the model, lowers risk, and helps the team decide whether to continue, change direction, or stop.",
      ],
      takeaways: [
        "Convert ideas into testable hypotheses about customers, problems, channels, and revenue.",
        "Schedule real customer contact every week, not only internal discussion.",
        "Manage the startup as a search system, not a miniature large company.",
        "Use small early failures to reduce risk before heavy product investment.",
        "After each test, make a decision: continue, pivot the hypothesis, or stop.",
      ],
    },
    ar: {
      paragraphs: [
        "رسالة Steve Blank في تطوير العملاء واضحة وحادة: لا توجد حقائق عن العملاء أو السوق أو نموذج العمل داخل المبنى. داخل الشركة توجد فرضيات، أما خارجها فتلتقي هذه الفرضيات بالواقع.",
        "الشركة الناشئة ليست نسخة صغيرة من شركة كبيرة. الشركة الكبيرة تنفذ غالبا نموذجا معروفا، أما الشركة الناشئة فتبحث عن نموذج قابل للتكرار والتوسع. لذلك يجب أن يعمل نظامها حول التعلم والاختبار والتكرار، لا حول التنفيذ الواثق فقط.",
        "الخروج من المبنى لا يعني بيع الفكرة بقوة أكبر. معناه اختبار الافتراضات: هل يشعر العميل بالألم؟ هل المشكلة أولوية؟ هل البدائل الحالية ضعيفة؟ هل سيدفع العميل أو يغير سلوكه من أجل حل أفضل؟ هذه الإجابات تأتي من العملاء والسوق لا من الاجتماعات الداخلية.",
        "هذا الانضباط يغير معنى الفشل. الاختبار الصغير الفاشل ليس كارثة إذا وفر على الفريق أشهرا من بناء الشيء الخطأ. الفشل المفيد يوضح النموذج، يقلل المخاطر، ويساعد الفريق على قرار الاستمرار أو تغيير الفرضية أو التوقف.",
      ],
      takeaways: [
        "حوّل الأفكار إلى فرضيات قابلة للاختبار عن العميل والمشكلة والقناة والإيراد.",
        "اجعل التواصل الحقيقي مع العملاء عادة أسبوعية، لا تعتمد على النقاش الداخلي فقط.",
        "أدر الشركة الناشئة كنظام بحث، لا كشركة كبيرة مصغرة.",
        "استخدم الفشل الصغير المبكر لتقليل المخاطر قبل الاستثمار الكبير في المنتج.",
        "بعد كل اختبار، اتخذ قرارا واضحا: الاستمرار أو تعديل الفرضية أو التوقف.",
      ],
    },
  },
  "Schlep Blindness": {
    fa: {
      paragraphs: [
        "Paul Graham در این مقاله روی نوعی نابینایی کارآفرینانه دست می‌گذارد: ما بعضی ایده‌های خوب را نمی‌بینیم، نه چون پنهان‌اند، بلکه چون دیدن‌شان ما را مجبور می‌کند کارهای ناخوشایند و پرزحمت را هم ببینیم. مسئله‌هایی مثل پرداخت، لجستیک، قانون، فروش سازمانی، پشتیبانی یا هماهنگی با چند بازیگر بیرونی ممکن است درست جلوی چشم باشند، اما ذهن بنیان‌گذار آرام‌آرام آن‌ها را از فهرست گزینه‌ها حذف می‌کند.",
        "این حذف معمولاً آگاهانه نیست. کمتر تیمی می‌نشیند و صادقانه می‌گوید چون این بازار سخت است، سراغ مسئله کم‌ارزش‌تر می‌رویم. اتفاق رایج‌تر این است که ذهن راهی پیدا می‌کند تا اصلاً آن فرصت سخت را مسئله محسوب نکند. نتیجه این می‌شود که تیم‌ها سراغ ایده‌هایی می‌روند که ساختن‌شان تمیزتر، قابل‌تصورتر و از نظر احساسی سبک‌تر است، حتی اگر مشتری برای آن‌ها کشش جدی نداشته باشد.",
        "ارزش مقاله در این است که سختی را از «علامت بد» به «سیگنال قابل بررسی» تبدیل می‌کند. سخت بودن یک حوزه الزاماً یعنی نباید واردش شد؛ اما گاهی دقیقاً یعنی دیگران هم از آن فرار کرده‌اند. اگر مسئله مهم باشد، مشتری درد واقعی داشته باشد و تیم بتواند بخش سخت را قدم‌به‌قدم یاد بگیرد، همان زحمت می‌تواند به مزیت رقابتی تبدیل شود. مانع عملیاتی اگر حل شود، فقط یک feature نیست؛ یک دیوار دفاعی هم هست.",
        "برای بنیان‌گذارها، این نگاه انتخاب مسئله را جدی‌تر می‌کند. ایده خوب فقط چیزی نیست که ساختنش جذاب به نظر برسد؛ چیزی است که ارزش حل کردن دارد، حتی وقتی اجرای آن پر از تماس انسانی، مذاکره، خطای سیستم‌های قدیمی یا کارهای کسل‌کننده است. شرکت واقعی اغلب از همین بخش‌های بی‌زرق‌وبرق ساخته می‌شود، نه فقط از کد تمیز و صفحه فرود قشنگ.",
        "در عین حال، مقاله دعوت به رنج بی‌هدف نیست. هر کار سختی ارزشمند نیست. بعضی سختی‌ها فقط نشانه بازار بد، مشتری بی‌اولویت یا مدل اقتصادی ضعیف‌اند. تفاوت مهم این است که آیا سختی در مسیر حل یک درد مهم قرار دارد یا صرفاً نشانه گیر کردن در ایده‌ای کم‌ارزش است. بنیان‌گذار باید بین سختی سازنده و سختی فرساینده فرق بگذارد.",
        "یک تمرین مفید بعد از خواندن این مقاله این است که فهرست ایده‌هایی را بنویسیم که همیشه گفته‌ایم «خیلی دردسر دارد». بعد برای هرکدام بپرسیم: اگر این دردسر حل شود، چه ارزش واقعی آزاد می‌شود؟ چه کسی حاضر است برای آن پول، توجه یا تغییر رفتار بدهد؟ و آیا بخشی از این سختی را می‌توان با یک آزمایش کوچک، یک تماس مشتری یا یک فرایند دستی فهمید؟ این سؤال‌ها کمک می‌کنند فرصت از پشت زحمت دیده شود.",
      ],
      takeaways: [
        "فهرست مسئله‌هایی را بنویس که به خاطر سختی اجرایی از آن‌ها فرار کرده‌ای.",
        "برای هر مسئله سخت، جدا کن کدام بخش واقعاً ارزش مشتری می‌سازد و کدام فقط اصطکاک داخلی است.",
        "قبل از رد کردن یک حوزه دشوار، با سه مشتری واقعی درباره شدت درد و جایگزین‌های فعلی حرف بزن.",
        "یک آزمایش دستی طراحی کن تا بفهمی سختی عملیاتی قابل یادگیری است یا نه.",
        "اگر سختی مسئله باعث فرار رقبا شده و درد مشتری جدی است، آن سختی را به عنوان مزیت احتمالی بررسی کن.",
      ],
    },
    en: {
      paragraphs: [
        "Paul Graham's idea of schlep blindness is a useful warning about problem selection. Some startup ideas are visible, important, and still ignored because they come with messy work: regulation, payments, sales, support, integrations, operations, or negotiations with institutions. Founders may not reject these ideas explicitly; they may simply fail to notice them as real options.",
        "That matters because the unpleasant work can be part of the opportunity. If a customer pain is serious and the work required to solve it scares away other teams, the difficulty may create protection rather than only cost. The hard part is not automatically a reason to leave the market; it is a signal to study more carefully.",
        "The essay is also a correction to the fantasy that startups are mostly clever software released into the world. Real companies often contain a lot of human contact, boring coordination, and operational learning. A founder who refuses all of that may keep the work elegant but miss the problem customers actually need solved.",
        "The practical distinction is between useful difficulty and wasteful difficulty. Some hard markets are just bad markets. Others are hard because the value is real and the system around the value is broken. The founder's job is to test which kind of hard they are facing before choosing the easier, weaker idea.",
      ],
      takeaways: [
        "List the ideas you have dismissed because they looked tedious or operationally messy.",
        "Separate customer value from internal friction before rejecting a difficult market.",
        "Talk to real customers about how painful the broken workflow is today.",
        "Run a small manual test to learn whether the operational work is manageable.",
        "Treat scary but valuable work as a possible moat, not only as a cost.",
      ],
    },
    ar: {
      paragraphs: [
        "فكرة Paul Graham عن Schlep Blindness تحذر المؤسس من طريقة خفية في اختيار المشكلات. قد تكون بعض الأفكار واضحة ومهمة، لكنها تُهمل لأنها تأتي مع عمل مزعج: تنظيمات، مدفوعات، بيع، دعم، تكاملات، عمليات، أو تفاوض مع جهات خارجية. لا يرفضها المؤسس دائما بوعي؛ أحيانا لا يراها أصلا كخيار جاد.",
        "هذا مهم لأن العمل غير المريح قد يكون جزءا من الفرصة. إذا كان ألم العميل حقيقيا وكانت صعوبة الحل تجعل الفرق الأخرى تبتعد، فقد تتحول الصعوبة إلى حماية، لا إلى كلفة فقط. لذلك لا ينبغي اعتبار السوق الصعب سببا تلقائيا للانسحاب؛ بل إشارة تحتاج إلى فحص أدق.",
        "المقال يصحح أيضا خيال أن الشركة الناشئة هي برنامج ذكي يطلقه الفريق وينتظر النمو. الشركات الحقيقية تحتوي غالبا على تواصل بشري، وتنسيق ممل، وتعلم تشغيلي. المؤسس الذي يرفض كل ذلك قد يحافظ على عمل أنيق، لكنه يفوّت المشكلة التي يحتاج العميل فعلا إلى حلها.",
        "التمييز العملي هو بين الصعوبة المفيدة والصعوبة المهدرة. بعض الأسواق الصعبة سيئة فعلا. وأسواق أخرى صعبة لأن القيمة حقيقية والنظام حولها مكسور. مهمة المؤسس أن يختبر أي نوع من الصعوبة يواجه قبل أن يختار فكرة أسهل لكنها أضعف.",
      ],
      takeaways: [
        "اكتب الأفكار التي رفضتها لأنها بدت مملة أو معقدة تشغيليا.",
        "افصل قيمة العميل عن الاحتكاك الداخلي قبل رفض سوق صعب.",
        "تحدث مع عملاء حقيقيين عن مدى ألم سير العمل الحالي.",
        "نفذ اختبارا يدويا صغيرا لمعرفة هل العمل التشغيلي قابل للتعلم.",
        "عامل العمل المخيف لكنه قيّم كخندق دفاعي محتمل، لا ككلفة فقط.",
      ],
    },
  },
  "How to Build an MVP": {
    fa: {
      paragraphs: [
        "Michael Seibel در این راهنمای Y Combinator، MVP را از یک شعار مبهم به یک تصمیم عملی تبدیل می‌کند. مسئله این نیست که اولین نسخه محصول چقدر کامل، زیبا یا قابل مقیاس است؛ مسئله این است که آیا می‌تواند با کمترین ساخت ممکن، یک فرضیه مهم را جلوی کاربر واقعی ببرد و یادگیری معتبر بسازد.",
        "بسیاری از تیم‌ها MVP را با نسخه کوچک‌شده محصول نهایی اشتباه می‌گیرند. نتیجه این می‌شود که هفته‌ها و ماه‌ها صرف featureهایی می‌شود که هنوز معلوم نیست کاربر واقعاً آن‌ها را می‌خواهد یا نه. MVP خوب قرار نیست تصویر کامل آینده باشد؛ باید فقط آن بخش از تجربه را نشان دهد که برای سنجیدن تقاضا و فهمیدن رفتار کاربر کافی است.",
        "نکته مهم دیگر این است که MVP همیشه لازم نیست از روز اول نرم‌افزار کامل باشد. گاهی prototype، demo، landing page، فرایند دستی یا حتی یک سرویس concierge می‌تواند سریع‌تر از کد زیاد به پاسخ برسد. اگر هدف یادگیری است، شکل ابزار باید تابع سؤال باشد: دقیقاً چه چیزی را می‌خواهیم بفهمیم و ارزان‌ترین راه معتبر برای فهمیدنش چیست؟",
        "این نگاه، کیفیت را حذف نمی‌کند؛ فقط محدوده کیفیت را کوچک می‌کند. کاربر اولیه باید بتواند ارزش اصلی را لمس کند، حتی اگر پشت صحنه هنوز دستی، ناقص یا موقت باشد. MVP بد نسخه‌ای است که هم زیاد ساخته شده و هم چیزی را روشن نمی‌کند. MVP خوب محدود است، اما سؤال درستی می‌پرسد و واکنش واقعی می‌گیرد.",
        "برای بنیان‌گذار، سخت‌ترین بخش معمولاً کم کردن دامنه کار است. تیم‌ها از ترس قضاوت کاربر، محصول را دیرتر نشان می‌دهند و با هر تأخیر، هزینه یادگیری بالاتر می‌رود. اما اگر مسئله واقعاً مهم باشد، کاربر اولیه با نسخه ساده هم واکنش نشان می‌دهد: وقت می‌گذارد، بازخورد دقیق می‌دهد، منتظر نسخه بعدی می‌ماند یا حتی حاضر می‌شود برای راه‌حل ناقص پول بدهد.",
        "پس ساخت MVP بیشتر از اینکه تمرین مهندسی باشد، تمرین وضوح است. باید فرضیه اصلی، کاربر هدف، لحظه ارزش و معیار یادگیری مشخص باشد. وقتی این چهار مورد روشن شد، تیم می‌تواند عمداً کوچک بسازد، سریع نشان بدهد و به جای دفاع از ایده، از رفتار کاربر یاد بگیرد.",
      ],
      takeaways: [
        "فرضیه اصلی MVP را در یک جمله بنویس: اگر این درست باشد، چه رفتار کاربری باید ببینیم؟",
        "قبل از نوشتن کد زیاد، ارزان‌ترین prototype یا demo قابل تست را طراحی کن.",
        "دامنه MVP را به لحظه‌ای محدود کن که کاربر ارزش اصلی را لمس می‌کند.",
        "برای هر تست، معیار یادگیری تعیین کن؛ فقط تعداد بازدید یا تعریف شفاهی کافی نیست.",
        "بعد از اولین واکنش کاربران، تصمیم بگیر: کوچک‌تر کن، ادامه بده، یا فرضیه را تغییر بده.",
      ],
    },
    en: {
      paragraphs: [
        "Michael Seibel's YC guide frames an MVP as a tool for learning, not as a small monument to the final product. The first version should answer a sharp question: can a real user understand the value, try it, and show behavior that makes the next build decision clearer?",
        "A common mistake is to shrink the full roadmap into a crowded first release. That feels safer, but it delays contact with reality. A useful MVP does less. It exposes the riskiest assumption in a form that users can react to, even if the system behind it is manual, temporary, or narrow.",
        "This does not mean quality is irrelevant. It means quality should be focused on the value moment. The early user does not need every future workflow, but they do need enough of the core experience to reveal whether the problem is urgent and whether the proposed solution changes behavior.",
        "The discipline is scope control. Write the hypothesis, pick the first user segment, choose the cheapest credible test, and define the signal before building. Then let user behavior decide what deserves more engineering time.",
      ],
      takeaways: [
        "State the MVP hypothesis as a behavior you expect from a real user.",
        "Use a prototype, demo, landing page, or manual workflow if it answers the question faster.",
        "Protect the core value moment and cut features that do not test the main risk.",
        "Define the learning signal before launch so feedback turns into a decision.",
      ],
    },
    ar: {
      paragraphs: [
        "يقدم Michael Seibel في دليل Y Combinator فكرة النموذج الأولي كأداة للتعلم، لا كنسخة صغيرة من المنتج النهائي. يجب أن تجيب النسخة الأولى عن سؤال واضح: هل يفهم المستخدم الحقيقي القيمة، وهل يتصرف بطريقة تجعل قرار البناء التالي أوضح؟",
        "الخطأ الشائع هو ضغط خريطة الطريق كلها داخل إطلاق أول مزدحم. يبدو ذلك أكثر أمانا، لكنه يؤخر مواجهة الواقع. النموذج المفيد يفعل أقل: يعرض الافتراض الأكثر خطورة بشكل يستطيع المستخدم اختباره، حتى لو كان ما خلفه يدويا أو مؤقتا أو ضيقا.",
        "هذا لا يعني أن الجودة غير مهمة. المعنى أن الجودة يجب أن تتركز في لحظة القيمة. لا يحتاج المستخدم الأول إلى كل سير العمل المستقبلي، لكنه يحتاج إلى ما يكفي ليتضح هل المشكلة ملحة وهل الحل المقترح يغير السلوك.",
        "الانضباط العملي هنا هو ضبط النطاق. اكتب الفرضية، اختر أول شريحة مستخدمين، حدد أرخص اختبار موثوق، وعرّف الإشارة قبل البناء. بعدها اجعل سلوك المستخدم يقرر ما يستحق وقتا هندسيا إضافيا.",
      ],
      takeaways: [
        "صغ فرضية النموذج الأولي كسلوك تتوقعه من مستخدم حقيقي.",
        "استخدم نموذجا، عرضا تجريبيا، صفحة هبوط، أو عملا يدويا إذا كان يجيب أسرع.",
        "احم لحظة القيمة الأساسية واحذف الميزات التي لا تختبر الخطر الرئيسي.",
        "حدد إشارة التعلم قبل الإطلاق حتى يتحول feedback إلى قرار.",
      ],
    },
  },
  "Founder Mode": {
    fa: {
      paragraphs: [
        "Paul Graham در این مقاله از تجربه‌ای شروع می‌کند که بعد از سخنرانی Brian Chesky در یک رویداد Y Combinator پررنگ شده بود: بسیاری از بنیان‌گذارها وقتی شرکت‌شان بزرگ‌تر می‌شود، نصیحتی شبیه هم می‌شنوند. به آن‌ها گفته می‌شود آدم‌های خوب استخدام کن، کار را به آن‌ها بسپار، و در جزئیات دخالت نکن. این توصیه در ظاهر بالغ و حرفه‌ای است، اما Graham می‌گوید برای بعضی شرکت‌های بنیان‌گذارمحور، همین نسخه می‌تواند شرکت را از منبع اصلی قوتش جدا کند.",
        "ایده اصلی مقاله این است که اداره شرکت فقط یک مدل ندارد. چیزی که Graham آن را manager mode می‌نامد برای مدیر حرفه‌ای طراحی شده است: کارها به شاخه‌های سازمان سپرده می‌شود، مدیر بیشتر از مسیر گزارش‌های مستقیم عمل می‌کند و جزئیات زیرمجموعه‌ها تا حد زیادی جعبه سیاه فرض می‌شوند. این مدل می‌تواند در سازمان‌های جاافتاده کار کند، اما الزاماً همان چیزی نیست که یک شرکت در حال رشد، با بنیان‌گذاری هنوز فعال و دارای شهود محصولی، نیاز دارد.",
        "در برابر آن، founder mode یعنی بنیان‌گذار پس از بزرگ شدن شرکت هم حق و وظیفه دارد مستقیم‌تر با واقعیت سازمان تماس داشته باشد. این به معنی انجام دادن همه کارها یا بی‌اعتماد کردن تیم نیست. معنی‌اش این است که بنیان‌گذار نباید فقط به نقشه رسمی سازمان محدود شود؛ باید بتواند از سطح‌های مختلف سازمان سیگنال بگیرد، کیفیت محصول و فرهنگ را مستقیم لمس کند و وقتی چیزی با شهود و شواهد نمی‌خواند، آن را صرفاً به نام تفویض اختیار رها نکند.",
        "Graham هشدار می‌دهد که واژه micromanagement گاهی خیلی زود و خام استفاده می‌شود. دخالت بیمارگونه در همه تصمیم‌های کوچک قطعاً می‌تواند سازمان را فلج کند، اما هر نزدیک‌شدن به جزئیات هم micromanagement نیست. اگر بنیان‌گذار چیزی را بهتر از مدیر استخدام‌شده می‌فهمد، یا هنوز تصویر محصول و مشتری را عمیق‌تر در ذهن دارد، فاصله گرفتن کامل از جزئیات می‌تواند به جای حرفه‌ای‌تر شدن، نوعی کور شدن مدیریتی باشد.",
        "نقطه حساس مقاله همین توازن است. Founder mode نباید بهانه‌ای برای ناتوانی در تفویض اختیار شود. شرکتی با دو هزار نفر را نمی‌توان مثل تیم بیست نفره اداره کرد. باید اختیار، ساختار و مدیران قابل اعتماد وجود داشته باشند. اما مرز اختیار باید از تجربه و کیفیت آدم‌ها ساخته شود، نه از یک نسخه آماده که می‌گوید مدیرعامل فقط از مسیر چند گزارش مستقیم حق دیدن شرکت را دارد.",
        "یکی از پیام‌های مهم مقاله برای تیم‌های در حال رشد این است که مقیاس فقط با ساختار بیشتر ساخته نمی‌شود؛ با نوع درست حضور بنیان‌گذار هم ساخته می‌شود. حضور درست یعنی بنیان‌گذار از جزئیات مهم خبر دارد، اما همه تصمیم‌ها را مصادره نمی‌کند؛ مدیر می‌سازد، اما خودش را از محصول، کاربر و آدم‌های کلیدی جدا نمی‌کند؛ به تیم اختیار می‌دهد، اما سیگنال‌های ضعیف را زود می‌بیند و اجازه نمی‌دهد سیاست سازمانی جای حقیقت محصول را بگیرد.",
        "پس برداشت عملی مقاله این نیست که همه بنیان‌گذارها باید شبیه هم رفتار کنند. خود Graham هم می‌گوید هنوز این مدل خوب فهمیده نشده و احتمال سوءاستفاده از آن وجود دارد. پیام عملی‌تر این است: هنگام رشد، کورکورانه از founder به manager تبدیل نشو. ببین شرکت تو برای زنده ماندنِ کیفیت، سرعت و حقیقت‌جویی به چه نوع حضوری از بنیان‌گذار نیاز دارد؛ بعد ساختار را طوری طراحی کن که هم اختیار بسازد و هم تماس مستقیم با واقعیت را حفظ کند.",
      ],
      takeaways: [
        "در هر مرحله رشد، مشخص کن بنیان‌گذار باید کجا مستقیم‌تر ببیند و کجا باید واقعاً تفویض کند.",
        "هر برچسب micromanagement را بدون تحلیل نپذیر؛ اول ببین دخالت در جزئیات، کیفیت و یادگیری می‌سازد یا تیم را فلج می‌کند.",
        "جلسه‌های skip-level و تماس مستقیم با آدم‌های کلیدی را به شکل سالم و شفاف طراحی کن.",
        "مدیران را با نتیجه، صداقت سیگنال و کیفیت تصمیم بسنج، نه فقط توانایی گزارش دادن به بالا.",
        "ساختار سازمان را نسخه آماده ندان؛ آن را با مرحله شرکت، کیفیت تیم و نوع محصول تنظیم کن.",
      ],
    },
    en: {
      paragraphs: [
        "Paul Graham's essay starts from a scaling pattern many founders recognize: as the company grows, they are told to hire strong executives, step back, and stop getting involved in details. The advice sounds mature, but Graham argues that for founder-led companies it can remove the company from one of its strongest assets: the founder's direct contact with product, people, and reality.",
        "The essay separates manager mode from founder mode. Manager mode treats the organization like a set of delegated subtrees: give direct reports goals and let them figure out the details. That can work in some mature organizations, but it is not automatically the right operating model for a scaling startup whose founder still has unusually strong context and judgment.",
        "Founder mode does not mean doing everyone's job or refusing delegation. It means the founder should not be trapped behind the org chart. They may need skip-level contact, direct inspection of product quality, and a closer relationship with the signals that matter. In that model, staying close to important details is not inherently micromanagement; it can be a way to protect the company's taste, speed, and truth-seeking.",
        "The hard part is boundary design. A founder cannot run a large company exactly like a tiny team, and founder mode can become an excuse for control if used badly. The useful lesson is to avoid copying professional-manager habits blindly. A scaling company needs both trusted delegation and direct founder contact with the places where quality, customers, and culture are actually formed.",
      ],
      takeaways: [
        "Define where the founder must stay close and where delegation should be real.",
        "Do not label all detail work as micromanagement; judge whether it improves quality and learning.",
        "Use skip-level contact deliberately and transparently.",
        "Evaluate executives by signal honesty and decision quality, not only by upward reporting.",
        "Design the operating model around the company's stage, team quality, and product reality.",
      ],
    },
    ar: {
      paragraphs: [
        "ينطلق مقال Paul Graham من نمط يعرفه كثير من المؤسسين عند التوسع: عندما تكبر الشركة، يسمعون نصيحة تقول لهم إن عليهم توظيف مديرين أقوياء، ثم التراجع وترك التفاصيل لهم. تبدو النصيحة ناضجة، لكن Graham يرى أنها قد تفصل الشركة المؤسسة عن أحد أهم مصادر قوتها: اتصال المؤسس المباشر بالمنتج والناس والواقع.",
        "يفصل المقال بين manager mode و founder mode. في manager mode تعامل المنظمة كأقسام مفوضة: تعطي التقارير المباشرة أهدافا وتترك لهم التفاصيل. قد ينجح ذلك في بعض الشركات الناضجة، لكنه ليس بالضرورة النموذج المناسب لشركة ناشئة تتوسع وما زال مؤسسها يملك سياقا وحكما عميقين حول المنتج والسوق.",
        "founder mode لا يعني أن يقوم المؤسس بعمل الجميع أو يرفض التفويض. معناه ألا يصبح المؤسس سجينا للخريطة التنظيمية. قد يحتاج إلى تواصل مباشر مع مستويات مختلفة، وفحص مباشر لجودة المنتج، وقرب أكبر من الإشارات المهمة. في هذا السياق، القرب من التفاصيل المهمة ليس دائما إدارة تفصيلية سيئة؛ قد يكون حماية للذوق والسرعة والصدق.",
        "الصعوبة في تصميم الحدود. لا يستطيع المؤسس إدارة شركة كبيرة بالطريقة نفسها التي أدار بها فريقا صغيرا، كما يمكن أن يتحول founder mode إلى ذريعة للسيطرة إذا أسيء استخدامه. الدرس العملي هو عدم نسخ عادات المدير المحترف بشكل أعمى. الشركة التي تتوسع تحتاج إلى تفويض حقيقي، وإلى اتصال مباشر للمؤسس بالأماكن التي تتشكل فيها الجودة والعميل والثقافة.",
      ],
      takeaways: [
        "حدد أين يجب أن يبقى المؤسس قريبا وأين يجب أن يكون التفويض حقيقيا.",
        "لا تعتبر كل اهتمام بالتفاصيل إدارة تفصيلية؛ اسأل هل يحسن الجودة والتعلم أم لا.",
        "استخدم التواصل مع مستويات مختلفة بوضوح ومن دون فوضى.",
        "قيّم المديرين بصدق الإشارات وجودة القرار، لا بمهارة رفع التقارير فقط.",
        "صمم نموذج العمل حسب مرحلة الشركة وجودة الفريق وحقيقة المنتج.",
      ],
    },
  },
  "Relentlessly Resourceful": {
    fa: {
      paragraphs: [
        "Paul Graham در این مقاله تلاش می‌کند کیفیتی را نام‌گذاری کند که در بنیان‌گذارهای خوب بارها دیده است. او به جای فهرست بلندبالایی از ویژگی‌ها، به دو کلمه می‌رسد: relentlessly resourceful. ترجمه تحت‌اللفظی‌اش شاید چیزی شبیه «بی‌وقفه چاره‌جو» باشد، اما منظور فقط پشتکار یا فقط باهوش بودن نیست؛ ترکیبی است از حرکت نکردن به حالت قربانی، دیدن مانع، و پیدا کردن راه بعدی.",
        "نقطه مقابل این کیفیت، در نگاه Graham، آدم یا تیمی است که منفعل می‌ماند. چنین تیمی شاید باهوش باشد، شاید ایده خوبی داشته باشد، اما وقتی دنیا طبق نقشه‌اش پیش نمی‌رود، بیشتر تماشا می‌کند تا عمل. در استارتاپ، این حالت خطرناک است، چون تقریباً هیچ چیز از ابتدا طبق برنامه پیش نمی‌رود: مشتری دیر جواب می‌دهد، کانال فروش کار نمی‌کند، محصول بد فهمیده می‌شود، شریک احتمالی عقب می‌کشد و منابع همیشه کمتر از چیزی است که دوست داری.",
        "او تأکید می‌کند که «relentless» به‌تنهایی کافی نیست. صرفاً فشار آوردن، جلو رفتن و خسته نشدن در مسئله‌های پیچیده جواب نمی‌دهد، چون مانع‌ها همیشه از یک جنس نیستند. گاهی باید بیشتر تلاش کنی، گاهی مسیر را عوض کنی، گاهی راه کوچک‌تری پیدا کنی، گاهی با آدم تازه‌ای حرف بزنی و گاهی قبول کنی که مسئله را اشتباه فهمیده‌ای. بنیان‌گذار خوب فقط محکم نیست؛ منعطف هم هست.",
        "از طرف دیگر، «resourceful» بدون استمرار هم کافی نیست. آدم‌های خلاق زیادند، اما اگر بعد از دو مانع اول انرژی‌شان بریزد، خلاقیت به شرکت تبدیل نمی‌شود. در ساخت شرکت، چاره‌جویی باید عادت روزانه باشد: هر بار که یک در بسته می‌شود، سؤال بعدی این نیست که چرا نشد؛ این است که حالا از کدام مسیر می‌شود به همان یادگیری، مشتری یا نتیجه نزدیک شد.",
        "ارزش مقاله در همین ترکیب است. Graham نمی‌گوید بنیان‌گذار باید همیشه جواب را بداند. اتفاقاً می‌گوید در حوزه‌های جالب، مانع‌ها تازه‌اند و از اول معلوم نیست با سنگ طرفی یا با چیزی نرم‌تر. بنابراین نسخه درست این نیست که فقط با سر بروی داخل دیوار؛ باید آزمایش کنی، دور بزنی، از منابع اطرافت استفاده کنی، از آدم‌ها کمک بگیری و در عین حال ریتم حرکت را از دست ندهی.",
        "این نگاه برای انتخاب هم‌بنیان‌گذار و تیم اولیه هم مهم است. رزومه، هوش خام، اعتمادبه‌نفس یا حتی تجربه قبلی کافی نیستند. باید دید فرد وقتی جواب آماده وجود ندارد چه می‌کند. آیا منتظر دستور می‌ماند؟ آیا با اولین مانع روایت شکست می‌سازد؟ یا مسئله را خرد می‌کند، چند راه را امتحان می‌کند، بازخورد می‌گیرد و دوباره جلو می‌رود؟ این رفتار در روزهای عادی شاید کم‌صدا باشد، اما در بحران تفاوت تیم‌ها را آشکار می‌کند.",
        "برای کار روزمره، مقاله یک معیار ساده می‌دهد: آیا امروز نسبت به دیروز راه‌های بیشتری امتحان کرده‌ایم، یا فقط درباره سختی شرایط حرف زده‌ایم؟ بنیان‌گذار بی‌وقفه چاره‌جو قرار نیست همه چیز را کنترل کند؛ قرار است در برابر بی‌نظمی دنیا منفعل نشود. او مسئله را کوچک می‌کند، مسیرهای تازه می‌سازد و از محدودیت‌ها بهانه نمی‌سازد؛ از آن‌ها ورودی طراحی می‌سازد.",
      ],
      takeaways: [
        "برای هر مانع، حداقل سه مسیر جایگزین بنویس: تلاش بیشتر، مسیر متفاوت، یا تعریف کوچک‌تر مسئله.",
        "در انتخاب هم‌بنیان‌گذار، رفتار فرد در ابهام و مانع را جدی‌تر از حرف‌هایش ارزیابی کن.",
        "جلسه‌های مرور کار را از گزارش مشکل به طراحی قدم بعدی تبدیل کن.",
        "وقتی منبعی نداری، اول فهرست منابع پنهان را بساز: رابطه‌ها، دانش، توزیع، زمان، اعتماد و تجربه کاربر.",
        "پشتکار را با انعطاف همراه کن؛ فشار بی‌جهت روی مسیر غلط، چاره‌جویی نیست.",
      ],
    },
    en: {
      paragraphs: [
        "Paul Graham tries to name the quality he keeps seeing in strong founders and lands on two words: relentlessly resourceful. The phrase is useful because it combines two traits that are often separated. A founder needs persistence, but persistence alone is not enough. A founder also needs the ability to invent paths when the obvious path breaks.",
        "The opposite is passivity. A passive team can be smart, talented, and even well-funded, but when reality refuses to follow the plan, it waits for conditions to improve. Startups punish that posture. Customers ignore you, distribution fails, partners disappear, and the product is misunderstood. The question is not whether obstacles will arrive, but whether the team keeps making moves.",
        "Relentlessness without resourcefulness can become brute force. Resourcefulness without relentlessness can remain clever talk. The useful founder has both: enough drive to keep going and enough flexibility to change tactics. In hard domains, the founder often does not know whether the obstacle is foam or granite until they test it. So the work is to try, learn, route around, ask for help, and keep moving.",
        "This idea is also a practical filter for cofounders and early hires. Credentials matter less than behavior under uncertainty. Does the person wait for instructions, narrate why things are impossible, or break the problem into smaller tests and look for leverage? The answer may not show up in a resume, but it becomes visible quickly in real work.",
      ],
      takeaways: [
        "For every obstacle, write three possible moves: push, reroute, or reduce the problem.",
        "Evaluate cofounders by how they behave when no answer is ready.",
        "Turn status meetings from problem reporting into next-step design.",
        "List hidden resources before declaring that resources are missing.",
        "Pair persistence with flexibility; pushing the wrong path harder is not resourcefulness.",
      ],
    },
    ar: {
      paragraphs: [
        "يحاول Paul Graham في هذا المقال تسمية الصفة التي يراها مرارا في المؤسسين الأقوياء، ويصل إلى عبارتين: الإصرار مع الحيلة العملية. قيمة العبارة أنها تجمع صفتين غالبا ما نفصل بينهما. يحتاج المؤسس إلى المثابرة، لكن المثابرة وحدها لا تكفي؛ يحتاج أيضا إلى القدرة على اختراع طريق عندما ينكسر الطريق الواضح.",
        "العكس هو السلبية. قد يكون الفريق السلبي ذكيا وموهوبا وحتى ممولا جيدا، لكنه عندما لا يتبع الواقع الخطة ينتظر تحسن الظروف. الشركات الناشئة تعاقب هذا الموقف. العملاء لا يردون، قناة التوزيع لا تعمل، الشركاء يختفون، والمنتج يساء فهمه. السؤال ليس هل ستظهر العوائق، بل هل سيواصل الفريق صنع الحركة.",
        "الإصرار بلا حيلة قد يتحول إلى قوة عمياء، والحيلة بلا إصرار قد تبقى كلاما ذكيا. المؤسس المفيد يملك الاثنين: دافعا كافيا للاستمرار ومرونة كافية لتغيير التكتيك. في المجالات الصعبة لا يعرف المؤسس منذ البداية هل العائق صلب أم قابل للاختراق، لذلك عليه أن يجرب ويتعلم ويدور حول المشكلة ويطلب المساعدة ويواصل الحركة.",
        "هذه الفكرة تصلح أيضا كمرشح عملي لاختيار الشريك المؤسس والفريق الأول. الشهادات والخبرة مهمة، لكنها أقل أهمية من السلوك تحت الغموض. هل ينتظر الشخص التعليمات؟ هل يشرح لماذا كل شيء مستحيل؟ أم يقسم المشكلة إلى اختبارات أصغر ويبحث عن نقطة قوة؟ الجواب لا يظهر دائما في السيرة الذاتية، لكنه يظهر بسرعة في العمل الحقيقي.",
      ],
      takeaways: [
        "لكل عائق، اكتب ثلاث حركات ممكنة: الدفع، تغيير الطريق، أو تصغير المشكلة.",
        "قيّم الشريك المؤسس من سلوكه عندما لا تكون الإجابة جاهزة.",
        "حوّل اجتماعات المتابعة من عرض المشكلات إلى تصميم الخطوة التالية.",
        "اكتب قائمة الموارد الخفية قبل أن تقول إن الموارد غير موجودة.",
        "اجمع المثابرة مع المرونة؛ الضغط أكثر على الطريق الخطأ ليس حيلة عملية.",
      ],
    },
  },
  "The 18 Mistakes That Kill Startups": {
    fa: {
      paragraphs: [
        "این مقاله از زاویه معکوس به ساخت شرکت نگاه می‌کند: به جای اینکه بگوید چه کارهایی حتماً موفقیت می‌آورد، نشان می‌دهد چه خطاهایی معمولاً تیم را از مسیر خارج می‌کند. ایده مرکزی ساده است: بیشتر شکست‌ها در نهایت به یک چیز برمی‌گردند؛ تیم چیزی نمی‌سازد که کاربران واقعاً بخواهند. بقیه خطاها، شکل‌های مختلف همین فاصله گرفتن از کاربر و واقعیت بازارند.",
        "بخش مهمی از این خطاها از انتخاب مسئله شروع می‌شود. وقتی تیم فقط از روی یک شرکت موفق کپی می‌کند، یا از ترس رقابت سراغ گوشه‌ای خیلی کوچک و بی‌اهمیت می‌رود، معمولاً مسئله‌ای جدی در دست ندارد. مسئله خوب باید آن‌قدر واقعی باشد که آدم‌ها برای حلش رفتارشان را تغییر دهند. اگر کاربر مشخص نیست، درد مشخص نیست، و شواهد بیرونی نداریم، ایده هنوز بیشتر شبیه حدس است تا پایه یک شرکت.",
        "Graham روی کاربر مشخص تأکید جدی دارد. ساختن برای «مردم»، «شرکت‌ها» یا «بازار» کافی نیست. باید بدانی دقیقاً چه کسی با این مشکل درگیر است، امروز چطور آن را حل می‌کند، چرا راه‌حل فعلی ناکافی است، و آیا می‌توانی چند نفر از همین آدم‌ها را قانع کنی محصول ناقص اولیه را امتحان کنند یا نه. اگر نتوانی با کاربر واقعی تماس بگیری، عملاً با ابزار کور حرکت می‌کنی.",
        "اشتباه بعدی به زمان لانچ برمی‌گردد. دیر لانچ کردن معمولاً خطرناک‌تر از زود لانچ کردن است، چون یادگیری را عقب می‌اندازد. اما زود لانچ کردن هم اگر بدون یک هسته مفید باشد، اعتماد کاربر اولیه را می‌سوزاند. راه عملی این است که کوچک‌ترین نسخه‌ای را بسازی که خودش به تنهایی فایده دارد و بعد بتواند رشد کند. این نسخه قرار نیست کامل باشد؛ قرار است تماس واقعی با کاربر بسازد.",
        "در مقاله، تیم اولیه هم یک عامل تعیین‌کننده است. تک‌بنیان‌گذار بودن، هم‌بنیان‌گذار نامناسب، اختلاف حل‌نشده، یا استخدام آدم‌هایی که نمی‌توانی کیفیت‌شان را بسنجی، فقط مسئله منابع انسانی نیست؛ روی سرعت یادگیری و کیفیت تصمیم اثر مستقیم دارد. در شروع، تیم کوچک باید بتواند سریع فکر کند، سریع بسازد، مستقیم با کاربر حرف بزند و وقتی فرضیه غلط شد، بدون فرسایش مسیر را اصلاح کند.",
        "پول هم در این نگاه ابزار زمان است، نه نشانه موفقیت. کم پول گرفتن ممکن است تیم را قبل از رسیدن به مرحله بعد زمین‌گیر کند؛ زیاد پول گرفتن هم می‌تواند سرعت را کم کند، فشار بیرونی بسازد و انعطاف تغییر مسیر را بگیرد. خرج زیاد، مخصوصاً استخدام زودهنگام و سنگین، هم هزینه را بالا می‌برد و هم تصمیم‌گیری را کند می‌کند. معیار درست این است که پول چقدر runway و یادگیری واقعی می‌خرد.",
        "ارزش عملی مقاله در این است که می‌شود آن را مثل چک‌لیست مرور هفتگی استفاده کرد. آیا کاربر مشخص داریم؟ آیا چیزی لانچ شده که از آن یاد بگیریم؟ آیا داریم برای حل مسئله واقعی می‌سازیم یا برای دفاع از ایده اولیه؟ آیا پول، تیم و سرمایه‌گذارها به یادگیری کمک می‌کنند یا آن را سنگین‌تر کرده‌اند؟ اگر این سؤال‌ها مرتب پرسیده شوند، مقاله از یک فهرست خطا به یک ابزار عملیاتی تبدیل می‌شود.",
      ],
      advice: [
        "قبل از ساخت بیشتر، کاربر هدف را با اسم و موقعیت دقیق تعریف کن؛ «شرکت‌ها» یا «مصرف‌کننده‌ها» تعریف کافی نیست.",
        "اگر ایده شبیه نسخه ضعیف‌تر یک شرکت موفق است، دوباره از مسئله شروع کن و نه از راه‌حل موجود.",
        "یک هسته کوچک اما مفید لانچ کن؛ چیزی که ناقص است ولی ارزش مستقل دارد.",
        "هر تصمیم استخدامی در شروع باید یا ساخت محصول را بهتر کند یا رسیدن به کاربر را سریع‌تر.",
        "runway را با مرحله بعد بسنج: نمونه اولیه، لانچ، رشد اولیه یا درآمد واقعی.",
        "سرمایه زیاد را با دقت بگیر؛ پولی که انعطاف را کم کند، همیشه مزیت نیست.",
        "اختلاف هم‌بنیان‌گذارها را زود و صریح حل کن؛ ابهام در رابطه مؤسس‌ها در بحران بزرگ‌تر می‌شود.",
        "از کارهای بیرون از کدنویسی فرار نکن؛ در شروع، فروش، مذاکره و گفت‌وگو با کاربر بخشی از محصول است.",
      ],
      takeaways: [
        "هر هفته بررسی کن آیا کار امروز تیم مستقیماً به ساختن چیزی که کاربر می‌خواهد نزدیک‌تر شده یا نه.",
        "برای هر ایده، کاربر مشخص، درد مشخص و شاهد رفتاری مشخص بنویس.",
        "لانچ را تا داشتن محصول کامل عقب نینداز؛ یک هسته مفید و قابل گسترش کافی است.",
        "استخدام و جذب سرمایه را با اثرشان روی سرعت یادگیری بسنج، نه با ظاهر رشد.",
        "وقتی داده کاربر با ایده اولیه نمی‌خواند، دفاع از ایده را با اصلاح مسیر اشتباه نگیر.",
      ],
    },
    en: {
      paragraphs: [
        "This essay looks at startup building from the reverse angle. Instead of promising a recipe for success, it lists the mistakes that usually move a team away from success. The central idea is that most startup failure eventually passes through one gate: the company fails to make something users truly want. The other mistakes are different ways of losing contact with users, learning too slowly, or making the organization heavier before the product deserves it.",
        "The first cluster is about the problem and the user. A derivative idea, a marginal niche, or a vague target customer usually means the team has not found a sharp enough problem. Building for generic users is especially dangerous. The team needs to know who has the pain, what they do today, why that current behavior persists, and whether real people will try an imperfect early product.",
        "The second cluster is about operating discipline. Launch too late and learning is delayed; launch too early without a useful core and early trust can be damaged. Hire poorly and the product slows down. Raise too little money and the company may not reach the next milestone; raise too much and the company may lose flexibility. The useful lesson is to treat every choice as a question of learning speed and closeness to users.",
        "Used well, the essay becomes a weekly diagnostic tool. Does the team know its user? Has something useful reached the market? Are hires and spending increasing learning, or only increasing weight? Are investors helping the company make better decisions, or pulling attention away from the product? These questions make the piece practical rather than merely cautionary.",
      ],
      advice: [
        "Define the target user precisely before building more product.",
        "If the idea is mainly a copy of another company, return to the underlying problem.",
        "Launch a small useful core instead of waiting for a complete product.",
        "Hire early only when the role improves product quality or user access.",
        "Measure runway against the next concrete milestone.",
        "Treat fundraising as a tool for learning time, not as validation by itself.",
      ],
      takeaways: [
        "Check every week whether the team is getting closer to something users want.",
        "Write down the specific user, pain, and behavioral evidence for each idea.",
        "Keep product, hiring, and fundraising decisions tied to learning speed.",
        "Do not confuse loyalty to the original idea with discipline.",
      ],
    },
    ar: {
      paragraphs: [
        "ينظر هذا المقال إلى بناء الشركة من الاتجاه المعاكس. لا يقدم وصفة للنجاح، بل يعدد الأخطاء التي تبعد الفريق عن النجاح. الفكرة المركزية هي أن معظم فشل الشركات الناشئة يمر من بوابة واحدة: عدم صنع شيء يريده المستخدمون فعلا. الأخطاء الأخرى هي صور مختلفة من الابتعاد عن المستخدم، أو التعلم ببطء، أو جعل الشركة أثقل قبل أن يستحق المنتج ذلك.",
        "المجموعة الأولى من الأخطاء تتعلق بالمشكلة والمستخدم. الفكرة المشتقة، أو السوق الهامشي، أو العميل غير المحدد تعني غالبا أن الفريق لم يمسك بمشكلة حادة بما يكفي. البناء لمستخدم عام خطر عملي. يجب أن يعرف الفريق من يشعر بالألم، كيف يحله الآن، لماذا بقي السلوك الحالي، وهل سيجرب أشخاص حقيقيون منتجا أوليا ناقصا.",
        "المجموعة الثانية تتعلق بالانضباط التشغيلي. الإطلاق المتأخر يؤخر التعلم، والإطلاق المبكر من دون نواة مفيدة قد يضر الثقة الأولى. التوظيف السيئ يبطئ المنتج. التمويل القليل قد لا يكفي للوصول إلى المرحلة التالية، والتمويل الكثير قد يقلل المرونة. الدرس العملي هو أن كل قرار يجب أن يقاس بسرعة التعلم وقربه من المستخدم.",
        "إذا استُخدم المقال جيدا، يصبح أداة تشخيص أسبوعية. هل يعرف الفريق مستخدمه؟ هل وصل شيء مفيد إلى السوق؟ هل يزيد التوظيف والإنفاق التعلم أم يزيدان الوزن فقط؟ هل يساعد المستثمرون على قرار أفضل أم يسحبون الانتباه من المنتج؟ بهذه الأسئلة يتحول النص من تحذير عام إلى أداة تشغيلية.",
      ],
      advice: [
        "عرّف المستخدم المستهدف بدقة قبل بناء مزيد من المنتج.",
        "إذا كانت الفكرة نسخة من شركة أخرى، ارجع إلى المشكلة الأصلية.",
        "أطلق نواة صغيرة مفيدة بدلا من انتظار منتج كامل.",
        "وظف مبكرا فقط عندما يزيد الدور جودة المنتج أو الوصول إلى المستخدم.",
        "قس runway بالمرحلة التالية الواضحة، لا بعدد الأشهر فقط.",
        "عامل التمويل كأداة لشراء وقت التعلم، لا كدليل نجاح بحد ذاته.",
      ],
      takeaways: [
        "افحص كل أسبوع هل يقترب الفريق من صنع شيء يريده المستخدمون.",
        "اكتب المستخدم المحدد والألم والدليل السلوكي لكل فكرة.",
        "اربط قرارات المنتج والتوظيف والتمويل بسرعة التعلم.",
        "لا تخلط بين الوفاء للفكرة الأولى والانضباط الحقيقي.",
      ],
    },
  },
};

const defaultArticleEssay = {
  fa: {
    paragraphs: [
      "این مقاله از آن دسته متن‌هایی است که برای بنیان‌گذارها ارزش عملی دارد، چون یک مفهوم را از حالت شعار خارج می‌کند و به تصمیم‌های روزمره وصل می‌کند. نکته اصلی این است که ساخت شرکت، مجموعه‌ای از انتخاب‌های کوچک و پیوسته است: انتخاب مسئله، انتخاب کاربر، انتخاب ریتم اجرا و انتخاب معیار.",
      "برای خواندن مؤثر، نباید فقط با متن موافق یا مخالف شد. بهتر است آن را به چند سؤال اجرایی تبدیل کرد: امروز کدام فرضیه باید تست شود؟ کدام رفتار کاربر شاهد واقعی است؟ کدام کار تیمی فقط حس پیشرفت می‌دهد اما نتیجه نمی‌سازد؟",
      "ارزش چنین مقاله‌هایی وقتی بیشتر می‌شود که بعد از خواندن، یک تغییر کوچک در سیستم کاری ایجاد شود. یک مصاحبه بهتر، یک metric دقیق‌تر، یک تصمیم سخت‌تر یا حذف یک کار کم‌اثر می‌تواند خروجی واقعی مطالعه باشد.",
    ],
    takeaways: [
      "بعد از خواندن، یک تصمیم اجرایی مشخص از متن استخراج کن.",
      "مقاله را با وضعیت فعلی شرکت مقایسه کن، نه با فضای ایده‌آل.",
      "یک رفتار قابل مشاهده برای سنجش ایده اصلی پیدا کن.",
    ],
  },
  en: {
    paragraphs: [
      "This article is useful for founders because it turns an abstract idea into operating choices. Company building is a chain of small repeated decisions: choosing the problem, choosing the user, choosing the rhythm of execution, and choosing the metric.",
      "The most useful way to read it is not simply to agree or disagree. Turn it into operating questions: which hypothesis should be tested today? Which user behavior is real evidence? Which team activity feels like progress but does not create an outcome?",
      "The value of reading appears when it changes the system of work. A better interview, a clearer metric, a harder decision, or the removal of low-impact work can become the real output of the article.",
    ],
    takeaways: [
      "Extract one concrete operating decision after reading.",
      "Compare the article with the current company reality, not an ideal version.",
      "Find one observable behavior that would validate the core idea.",
    ],
  },
  ar: {
    paragraphs: [
      "هذا المقال مفيد للمؤسسين لأنه يحول الفكرة المجردة إلى اختيارات تشغيلية. بناء الشركة سلسلة من قرارات صغيرة متكررة: اختيار المشكلة، اختيار المستخدم، اختيار إيقاع التنفيذ، واختيار المقياس.",
      "أفضل طريقة لقراءته ليست الموافقة أو الرفض فقط. حوّله إلى أسئلة تشغيلية: أي فرضية يجب اختبارها اليوم؟ أي سلوك مستخدم يمثل دليلا حقيقيا؟ أي نشاط داخل الفريق يعطي شعورا بالتقدم لكنه لا يصنع نتيجة؟",
      "تظهر قيمة القراءة عندما تغير نظام العمل. مقابلة أفضل، مقياس أوضح، قرار أصعب، أو حذف عمل منخفض الأثر قد يكون الناتج الحقيقي من المقال.",
    ],
    takeaways: [
      "استخرج قرارا تشغيليا واحدا بعد القراءة.",
      "قارن المقال بواقع الشركة الحالي، لا بصورة مثالية.",
      "ابحث عن سلوك قابل للملاحظة يختبر الفكرة الأساسية.",
    ],
  },
};

const articleEssayExpansion = {
  fa: {
    paragraphs: [
      (article) =>
        `برای خواندن ${article.title} بهتر است آن را فقط به‌عنوان یک توصیه عمومی نبینی. ارزش متن وقتی بیشتر می‌شود که با یک مسئله واقعی مقایسه شود: یک تصمیم محصولی، یک گفت‌وگوی سخت با مشتری، یک جلسه مدیریتی یا یک نقطه ابهام در مسیر رشد. در این حالت مقاله از الهام کوتاه به ابزار فکر تبدیل می‌شود.`,
      (article) =>
        `نکته دیگر این است که متن‌های خوب کارآفرینی معمولا نسخه آماده نمی‌دهند؛ زاویه دید می‌دهند. اگر خواننده بعد از خواندن بتواند یک سؤال دقیق‌تر بپرسد، یک فرضیه را تمیزتر بنویسد یا یک رفتار تیمی را اصلاح کند، مقاله کار خودش را کرده است. منبع اصلی ${article.source} برای خواندن دقیق‌تر و دیدن متن کامل نویسنده همچنان بهترین مرجع است.`,
    ],
    takeaways: [
      () => "بعد از خواندن، یک سؤال اجرایی مشخص برای تیم یا پروژه خودت بنویس.",
      () => "یک نشانه واقعی از رفتار کاربر یا بازار پیدا کن که ایده اصلی مقاله را تایید یا رد کند.",
    ],
  },
  en: {
    paragraphs: [
      (article) =>
        `The useful way to read ${article.title} is to connect it to a live decision rather than consume it as general advice. A product choice, a customer conversation, a hiring question, or an operating tension can turn the essay from inspiration into a thinking tool.`,
      (article) =>
        `Good startup essays rarely provide a complete recipe. They offer a sharper lens. If the reader leaves with a better question, a cleaner hypothesis, or a small change in operating rhythm, the essay has done useful work. The original source at ${article.source} remains the best place to read the author's full version.`,
    ],
    takeaways: [
      () => "Write one concrete operating question after reading.",
      () => "Look for a real user or market signal that supports or challenges the essay's idea.",
    ],
  },
  ar: {
    paragraphs: [
      (article) =>
        `الطريقة المفيدة لقراءة ${article.title} هي ربطه بقرار حقيقي، لا استهلاكه كنصيحة عامة. اختيار في المنتج، أو حديث مع عميل، أو سؤال توظيف، أو توتر تشغيلي يمكن أن يحول المقال من إلهام سريع إلى أداة تفكير.`,
      (article) =>
        `المقالات الجيدة عن الشركات الناشئة نادرا ما تقدم وصفة كاملة؛ إنها تمنح زاوية أوضح. إذا خرج القارئ بسؤال أفضل، أو فرضية أنظف، أو تعديل صغير في إيقاع العمل، فقد أدى المقال دوره. يبقى المصدر الأصلي في ${article.source} هو المكان الأفضل لقراءة نسخة الكاتب الكاملة.`,
    ],
    takeaways: [
      () => "اكتب سؤالا تشغيليا واحدا بعد القراءة.",
      () => "ابحث عن إشارة حقيقية من المستخدم أو السوق تؤيد فكرة المقال أو تختبرها.",
    ],
  },
};

const contentCalendarBlueprints = {
  fa: [
    {
      offsetDays: 0,
      channel: "سایت",
      status: "آماده انتشار",
      title: (article) => `ترجمه امروز: ${article.title}`,
      body: (article) =>
        `نسخه فارسی این مقاله با ترجمه خواندنی، ارجاع روشن به ${article.source} و چند نکته اجرایی منتشر می‌شود.`,
    },
    {
      offsetDays: 1,
      channel: "لینکدین",
      status: "پیش‌نویس",
      title: (article) => `پست لینکدین: ${article.title}`,
      body: (article, essay, summary) =>
        `محور این پست: ${pickEssayLine(essay, 0, summary)}. کوتاه، مستقیم و مناسب مخاطب حرفه‌ای.`,
    },
    {
      offsetDays: 2,
      channel: "استوری",
      status: "آماده تصویر",
      title: () => "استوری سه‌اسلایدی",
      body: (article, essay, summary) =>
        `اسلاید اول: عنوان و نام نویسنده. اسلاید دوم: ${pickEssayLine(essay, 1, summary)}. اسلاید سوم: لینک سایت و منبع اصلی.`,
    },
    {
      offsetDays: 3,
      channel: "یادداشت کوتاه",
      status: "در حال نوشتن",
      title: (article) => `سؤال از ${article.title}`,
      body: (article, essay, summary) =>
        `اگر قرار باشد فقط یک تصمیم کاری از این مقاله عوض شود، کدام تصمیم است؟ ${pickEssayLine(essay, 2, summary)}`,
    },
    {
      offsetDays: 4,
      channel: "جمع‌بندی",
      status: "در صف",
      title: () => "جمع‌بندی هفتگی",
      body: () =>
        "سه نکته از مقاله، یک تصمیم بعدی و یک لینک به منبع اصلی؛ خروجی‌ای که خواندن را به عمل وصل می‌کند.",
    },
  ],
  en: [
    {
      offsetDays: 0,
      channel: "Site",
      status: "Ready to publish",
      title: (article) => `Today on the site: ${article.title}`,
      body: (article) =>
        `A readable adaptation goes live with source credit to ${article.source} and operating takeaways, not just a thin summary.`,
    },
    {
      offsetDays: 1,
      channel: "LinkedIn",
      status: "Draft",
      title: (article) => `LinkedIn note: ${article.title}`,
      body: (article, essay, summary) =>
        `Post angle: ${pickEssayLine(essay, 0, summary)}. Short, direct, and grounded in ${article.author} / ${article.source}.`,
    },
    {
      offsetDays: 2,
      channel: "Story",
      status: "Ready for creative",
      title: () => "Three-slide story",
      body: (article, essay, summary) =>
        `Slide 1: title and author. Slide 2: ${pickEssayLine(essay, 1, summary)}. Slide 3: the site link and the original source.`,
    },
    {
      offsetDays: 3,
      channel: "Note",
      status: "Writing",
      title: (article) => `Question post: ${article.title}`,
      body: (article, essay, summary) =>
        `If you changed only one thing from this article, which decision would move this week? ${pickEssayLine(essay, 2, summary)}`,
    },
    {
      offsetDays: 4,
      channel: "Recap",
      status: "Queued",
      title: () => "Weekly recap",
      body: () =>
        "Three ideas, one next decision, and one original source link. The goal is to turn reading into operating output.",
    },
  ],
  ar: [
    {
      offsetDays: 0,
      channel: "الموقع",
      status: "جاهز للنشر",
      title: (article) => `ترجمة اليوم: ${article.title}`,
      body: (article) =>
        `تنشر النسخة العربية المبسطة من هذه المقالة مع إشارة واضحة إلى ${article.source} ونقاط تشغيلية قابلة للاستخدام.`,
    },
    {
      offsetDays: 1,
      channel: "لينكدإن",
      status: "مسودة",
      title: (article) => `منشور لينكدإن: ${article.title}`,
      body: (article, essay, summary) =>
        `زاوية المنشور: ${pickEssayLine(essay, 0, summary)}. قصير ومباشر ومرتبط بـ ${article.author} / ${article.source}.`,
    },
    {
      offsetDays: 2,
      channel: "الستوري",
      status: "جاهز للتصميم",
      title: () => "ستوري من ثلاث شرائح",
      body: (article, essay, summary) =>
        `الشريحة الأولى: العنوان واسم الكاتب. الشريحة الثانية: ${pickEssayLine(essay, 1, summary)}. الشريحة الثالثة: رابط الموقع والمصدر الأصلي.`,
    },
    {
      offsetDays: 3,
      channel: "ملاحظة قصيرة",
      status: "قيد الكتابة",
      title: (article) => `سؤال من ${article.title}`,
      body: (article, essay, summary) =>
        `إذا غيّرت قرارا واحدا فقط من هذا المقال، فأي قرار سيتحرك هذا الأسبوع؟ ${pickEssayLine(essay, 2, summary)}`,
    },
    {
      offsetDays: 4,
      channel: "ملخص أسبوعي",
      status: "في الصف",
      title: () => "ملخص أسبوعي",
      body: () =>
        "ثلاث أفكار، قرار واحد قادم، ورابط إلى المصدر الأصلي. الهدف أن يتحول القراءة إلى أثر تشغيلي.",
    },
  ],
};

const publishingChannelLabels = {
  fa: {
    site: "سایت",
    linkedin: "لینکدین",
    "instagram-story": "استوری",
    "instagram-post": "پست اینستاگرام",
    note: "یادداشت کوتاه",
    recap: "جمع‌بندی",
  },
  en: {
    site: "Site",
    linkedin: "LinkedIn",
    "instagram-story": "Story",
    "instagram-post": "Instagram post",
    note: "Note",
    recap: "Recap",
  },
  ar: {
    site: "الموقع",
    linkedin: "لينكدإن",
    "instagram-story": "الستوري",
    "instagram-post": "منشور إنستغرام",
    note: "ملاحظة قصيرة",
    recap: "ملخص",
  },
};

const publishingStatusLabels = {
  fa: {
    scheduled: "زمان‌بندی‌شده",
    due: "موعد اجرا",
    ready: "آماده نشر",
    published: "منتشر شده",
    draft: "پیش‌نویس",
    queued: "در صف",
    "ready-for-approval": "آماده تایید",
    "blocked/needs-login": "مسدود: نیازمند ورود",
  },
  en: {
    scheduled: "Scheduled",
    due: "Due",
    ready: "Ready to post",
    published: "Published",
    draft: "Draft",
    queued: "Queued",
    "ready-for-approval": "Ready for approval",
    "blocked/needs-login": "Blocked: needs login",
  },
  ar: {
    scheduled: "مجدول",
    due: "حان وقت التنفيذ",
    ready: "جاهز للنشر",
    published: "منشور",
    draft: "مسودة",
    queued: "في الصف",
    "ready-for-approval": "جاهز للموافقة",
    "blocked/needs-login": "محظور: يحتاج إلى تسجيل دخول",
  },
};

function getDailyArticleIndex() {
  const scheduledIndex = getLatestScheduledSiteArticleIndex();

  if (scheduledIndex !== null) {
    return scheduledIndex;
  }

  const tehranOffsetMs = 3.5 * 60 * 60 * 1000;
  const tehranNow = new Date(Date.now() + tehranOffsetMs);
  const dayNumber = Math.floor(
    Date.UTC(
      tehranNow.getUTCFullYear(),
      tehranNow.getUTCMonth(),
      tehranNow.getUTCDate(),
    ) / 86400000,
  );

  return dayNumber % articleCatalog.length;
}

function getLatestScheduledSiteArticleIndex() {
  if (!publishingPlan?.queue?.length) {
    return null;
  }

  const now = Date.now();
  const latestItem = publishingPlan.queue
    .filter((item) => {
      const publishTime = Date.parse(item.publishAt);

      return (
        (item.channel === "site" || item.target === "site") &&
        item.articleSlug &&
        !Number.isNaN(publishTime) &&
        publishTime <= now &&
        !["draft", "queued"].includes(item.status)
      );
    })
    .sort((first, second) => Date.parse(second.publishAt) - Date.parse(first.publishAt))[0];

  if (!latestItem) {
    return null;
  }

  const index = articleCatalog.findIndex(
    (article) => getArticleSlug(article) === latestItem.articleSlug,
  );

  return index >= 0 ? index : null;
}

function getTehranDayStartTimestamp(offsetDays = 0) {
  const tehranOffsetMs = 3.5 * 60 * 60 * 1000;
  const tehranNow = new Date(Date.now() + tehranOffsetMs);

  return (
    Date.UTC(
      tehranNow.getUTCFullYear(),
      tehranNow.getUTCMonth(),
      tehranNow.getUTCDate() + offsetDays,
    ) - tehranOffsetMs
  );
}

function getTehranDate(language) {
  const locale = language === "en" ? "en-US" : language === "ar" ? "ar" : "fa-IR";

  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function getContentCalendarDate(language, offsetDays = 0) {
  const locale = language === "en" ? "en-US" : language === "ar" ? "ar" : "fa-IR";
  const date = new Date();

  date.setDate(date.getDate() + offsetDays);

  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Tehran",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatPublicationDateTime(value, language) {
  const locale = language === "en" ? "en-US" : language === "ar" ? "ar" : "fa-IR";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Tehran",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getArticleSlug(article) {
  return article.title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getArticleBySlug(slug) {
  return articleCatalog.find((article) => getArticleSlug(article) === slug) ?? null;
}

function getArticleIndexFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("article");

  if (!requestedSlug) {
    return null;
  }

  const index = articleCatalog.findIndex((article) => getArticleSlug(article) === requestedSlug);

  return index >= 0 ? index : null;
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang");

  if (requestedLanguage && translations[requestedLanguage]) {
    return requestedLanguage;
  }

  return localStorage.getItem("site-language") ?? "fa";
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep(target, source) {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return target;
  }

  Object.entries(source).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(target[key])) {
      mergeDeep(target[key], value);
      return;
    }

    target[key] = value;
  });

  return target;
}

function normalizePublishingPlan(value) {
  if (!isPlainObject(value)) {
    return null;
  }

  const queue = Array.isArray(value.queue)
    ? value.queue
        .filter(
          (item) =>
            isPlainObject(item) &&
            item.publishAt &&
            !Number.isNaN(Date.parse(item.publishAt)),
        )
        .map((item) => ({
          ...item,
          id: String(item.id ?? `${item.channel ?? "item"}-${item.publishAt}`),
          channel: String(item.channel ?? "site"),
          target: String(item.target ?? "site"),
          status: String(item.status ?? "scheduled"),
          articleSlug: item.articleSlug ? String(item.articleSlug) : "",
          publishAt: String(item.publishAt),
          title: isPlainObject(item.title)
            ? {
                fa: String(item.title.fa ?? ""),
                en: String(item.title.en ?? ""),
                ar: String(item.title.ar ?? ""),
              }
            : item.title,
          body: isPlainObject(item.body)
            ? {
                fa: String(item.body.fa ?? ""),
                en: String(item.body.en ?? ""),
                ar: String(item.body.ar ?? ""),
              }
            : item.body,
        }))
    : [];

  return {
    timezone: typeof value.timezone === "string" ? value.timezone : "Asia/Tehran",
    queue,
  };
}

async function loadContentOverrides() {
  try {
    const response = await fetch(`${contentOverrideUrl}?v=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return;
    }

    const overrides = await response.json();

    if (isPlainObject(overrides?.translations)) {
      mergeDeep(translations, overrides.translations);
    }

    publishingPlan = normalizePublishingPlan(overrides?.publishing);
  } catch {
    // The public site keeps its bundled copy if the editable content file is unavailable.
  }
}

function getArticleShareUrl(article, language) {
  const url = new URL(getArticlePageUrl(article, language));

  url.hash = "daily-article-reader";

  return url.toString();
}

function getArticlePageUrl(article, language) {
  const url = new URL(liveSiteUrl);

  url.searchParams.delete("v");
  url.searchParams.set("article", getArticleSlug(article));
  url.searchParams.set("lang", translations[language] ? language : "fa");
  url.hash = "";

  return url.toString();
}

function getLanguagePageUrl(language, article = null) {
  if (article) {
    return getArticlePageUrl(article, language);
  }

  const url = new URL(liveSiteUrl);

  if (language && language !== "fa") {
    url.searchParams.set("lang", language);
  }

  return url.toString();
}

function setMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute("content", content);
}

function setLinkHref(selector, href) {
  document.querySelector(selector)?.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

function updateSeoMetadata(language) {
  const selectedLanguage = translations[language] ? language : "fa";
  const dictionary = translations[selectedLanguage];
  const article = selectedArticleIndex !== null ? articleCatalog[selectedArticleIndex] : null;
  const canonicalUrl = getLanguagePageUrl(selectedLanguage, article);
  const title = article
    ? `${article.title} | Ali Sodeyfi`
    : dictionary.documentTitle;
  const description = article
    ? article.summary[selectedLanguage] ?? article.summary.en
    : dictionary.metaDescription;

  document.title = title;

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:type"]', article ? "article" : "website");
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:image"]', defaultShareImageUrl);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', defaultShareImageUrl);
  setLinkHref('link[rel="canonical"]', canonicalUrl);
  setLinkHref('link[rel="alternate"][hreflang="fa"]', getLanguagePageUrl("fa", article));
  setLinkHref('link[rel="alternate"][hreflang="en"]', getLanguagePageUrl("en", article));
  setLinkHref('link[rel="alternate"][hreflang="ar"]', getLanguagePageUrl("ar", article));
  setLinkHref('link[rel="alternate"][hreflang="x-default"]', getLanguagePageUrl("fa", article));

  if (article) {
    upsertJsonLd("structured-data-current-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Person",
        name: "Ali Sodeyfi",
        url: liveSiteUrl,
      },
      isBasedOn: article.url,
      mainEntityOfPage: canonicalUrl,
      inLanguage: selectedLanguage,
    });
  } else {
    document.getElementById("structured-data-current-article")?.remove();
  }
}

function updateArticleUrl(article, language, mode = "push") {
  if (!window.history?.[`${mode}State`]) {
    return;
  }

  const url = new URL(window.location.href);

  url.searchParams.delete("v");
  url.searchParams.set("article", getArticleSlug(article));
  url.searchParams.set("lang", translations[language] ? language : "fa");
  url.hash = "daily-article-reader";
  window.history[`${mode}State`](null, "", url);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function renderArticleTags(article, language) {
  const tags = article.tags[language] ?? article.tags.en;

  return tags
    .map((tag) => `<span class="article-tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function getArticleCredit(article) {
  const parts =
    article.source === article.author
      ? [article.source, article.year]
      : [article.source, article.author, article.year];

  return parts.join(" · ");
}

function getArticleEssay(article, language) {
  const essay = articleEssays[article.title]?.[language] ?? defaultArticleEssay[language] ?? defaultArticleEssay.en;

  return expandArticleEssay(article, language, essay);
}

function expandArticleEssay(article, language, essay) {
  const paragraphs = [...(essay.paragraphs ?? [])];
  const takeaways = [...(essay.takeaways ?? [])];
  const advice = [...(essay.advice ?? [])];
  const minimumParagraphs = language === "fa" ? 5 : 4;
  const minimumTakeaways = language === "fa" ? 5 : 4;
  const expansion = articleEssayExpansion[language] ?? articleEssayExpansion.en;

  while (paragraphs.length < minimumParagraphs && expansion.paragraphs.length > 0) {
    const template = expansion.paragraphs[(paragraphs.length - (essay.paragraphs?.length ?? 0)) % expansion.paragraphs.length];
    paragraphs.push(template(article));
  }

  while (takeaways.length < minimumTakeaways && expansion.takeaways.length > 0) {
    const template = expansion.takeaways[(takeaways.length - (essay.takeaways?.length ?? 0)) % expansion.takeaways.length];
    takeaways.push(template(article));
  }

  return { paragraphs, takeaways, advice };
}

function renderParagraphs(paragraphs) {
  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function renderTakeaways(takeaways) {
  return takeaways
    .map((takeaway) => `<li>${escapeHtml(takeaway)}</li>`)
    .join("");
}

function renderArticleAdvice(advice, label) {
  if (!advice?.length) {
    return "";
  }

  return `
    <div class="article-advice">
      <p class="article-section-label">${escapeHtml(label)}</p>
      <ol>${advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </div>
  `;
}

function pickEssayLine(essay, index, fallback) {
  const value = essay.advice?.[index] ?? essay.takeaways?.[index] ?? essay.paragraphs?.[index] ?? fallback;

  return String(value).replace(/[.。.!！؟?،؛:]+$/u, "").trim();
}

function getLocalizedPublishingValue(value, language) {
  if (typeof value === "string") {
    return value;
  }

  if (!isPlainObject(value)) {
    return "";
  }

  return value[language] ?? value.fa ?? value.en ?? value.ar ?? "";
}

function getPublishingLabel(labels, key, language) {
  return labels[language]?.[key] ?? labels.fa?.[key] ?? key;
}

function getPublicationDisplayStatus(item) {
  if (item.status === "scheduled" && Date.parse(item.publishAt) <= Date.now()) {
    return "due";
  }

  return item.status || "scheduled";
}

function buildPublicationTitle(item, article, language) {
  const customTitle = getLocalizedPublishingValue(item.title, language);

  if (customTitle) {
    return customTitle;
  }

  if (language === "en") {
    if (item.channel === "site") return `Daily article: ${article.title}`;
    if (item.channel === "linkedin") return `LinkedIn post: ${article.title}`;
    if (item.channel === "instagram-story") return `Story: ${article.title}`;
    if (item.channel === "recap") return "Weekly recap";
    return `${getPublishingLabel(publishingChannelLabels, item.channel, language)}: ${article.title}`;
  }

  if (language === "ar") {
    if (item.channel === "site") return `مقال اليوم: ${article.title}`;
    if (item.channel === "linkedin") return `منشور لينكدإن: ${article.title}`;
    if (item.channel === "instagram-story") return `ستوري: ${article.title}`;
    if (item.channel === "recap") return "ملخص أسبوعي";
    return `${getPublishingLabel(publishingChannelLabels, item.channel, language)}: ${article.title}`;
  }

  if (item.channel === "site") return `مقاله روز: ${article.title}`;
  if (item.channel === "linkedin") return `پست لینکدین: ${article.title}`;
  if (item.channel === "instagram-story") return `استوری: ${article.title}`;
  if (item.channel === "recap") return "جمع‌بندی هفتگی";
  return `${getPublishingLabel(publishingChannelLabels, item.channel, language)}: ${article.title}`;
}

function buildPublicationBody(item, article, essay, language) {
  const customBody = getLocalizedPublishingValue(item.body, language);
  const summary = article.summary[language] ?? article.summary.en;

  if (customBody) {
    return customBody;
  }

  if (language === "en") {
    if (item.channel === "site") {
      return `The on-site adaptation is published with source credit to ${article.source} and practical takeaways.`;
    }
    if (item.channel === "linkedin") {
      return `Post angle: ${pickEssayLine(essay, 0, summary)}. Short, direct, and grounded in ${article.author} / ${article.source}.`;
    }
    if (item.channel === "instagram-story") {
      return `Three slides: title and author, one useful idea, then the site link and original source.`;
    }
    return `A compact output based on ${article.title}, designed to turn reading into one operating decision.`;
  }

  if (language === "ar") {
    if (item.channel === "site") {
      return `تنشر إعادة الصياغة داخل الموقع مع إشارة واضحة إلى ${article.source} ونقاط عملية.`;
    }
    if (item.channel === "linkedin") {
      return `زاوية المنشور: ${pickEssayLine(essay, 0, summary)}. قصير ومباشر ومرتبط بـ ${article.author} / ${article.source}.`;
    }
    if (item.channel === "instagram-story") {
      return `ثلاث شرائح: العنوان والكاتب، فكرة عملية واحدة، ثم رابط الموقع والمصدر الأصلي.`;
    }
    return `مخرج مختصر مبني على ${article.title} لتحويل القراءة إلى قرار تشغيلي واحد.`;
  }

  if (item.channel === "site") {
    return `ترجمه و برداشت آزاد داخل سایت منتشر می‌شود؛ با ارجاع روشن به ${article.source} و نکات اجرایی.`;
  }
  if (item.channel === "linkedin") {
    return `محور این پست: ${pickEssayLine(essay, 0, summary)}. کوتاه، مستقیم و قابل انتشار برای مخاطب حرفه‌ای.`;
  }
  if (item.channel === "instagram-story") {
    return "سه اسلاید: عنوان و نام نویسنده، یک ایده کاربردی، سپس لینک سایت و منبع اصلی.";
  }
  return `یک خروجی کوتاه بر اساس ${article.title} برای تبدیل مطالعه به یک تصمیم عملی.`;
}

function getCalendarItemsFromPublishing(language, fallbackArticle) {
  if (!publishingPlan?.queue?.length) {
    return [];
  }

  const tehranTodayStart = getTehranDayStartTimestamp();

  return [...publishingPlan.queue]
    .filter((item) => Date.parse(item.publishAt) >= tehranTodayStart)
    .sort((first, second) => Date.parse(first.publishAt) - Date.parse(second.publishAt))
    .slice(0, 8)
    .map((item) => {
      const article = getArticleBySlug(item.articleSlug) ?? fallbackArticle;
      const essay = getArticleEssay(article, language);

      return {
        article,
        dateLabel: formatPublicationDateTime(item.publishAt, language),
        channel: getPublishingLabel(publishingChannelLabels, item.channel, language),
        status: getPublishingLabel(
          publishingStatusLabels,
          getPublicationDisplayStatus(item),
          language,
        ),
        title: buildPublicationTitle(item, article, language),
        body: buildPublicationBody(item, article, essay, language),
      };
    });
}

function getCalendarItemsFromBlueprint(language, article, essay) {
  const dictionary = translations[language] ?? translations.fa;
  const blueprint = contentCalendarBlueprints[language] ?? contentCalendarBlueprints.fa;
  const summary = article.summary[language] ?? article.summary.en;

  return blueprint.map((item) => ({
    article,
    dateLabel: getContentCalendarDate(language, item.offsetDays),
    channel: item.channel,
    status: item.status,
    title: item.title(article, essay, summary, dictionary),
    body: item.body(article, essay, summary, dictionary),
  }));
}

function renderContentCalendar(language, article, essay) {
  if (!contentCalendarContainer || !article) {
    return;
  }

  const dictionary = translations[language] ?? translations.fa;
  const calendarItems = getCalendarItemsFromPublishing(language, article);
  const items = calendarItems.length > 0
    ? calendarItems
    : getCalendarItemsFromBlueprint(language, article, essay);

  contentCalendarContainer.innerHTML = items
    .map((item) => {
      return `
        <article class="content-calendar-item">
          <div class="content-calendar-meta">
            <span class="content-calendar-date">${escapeHtml(item.dateLabel)}</span>
            <div class="content-calendar-badges">
              <span class="content-calendar-channel">${escapeHtml(item.channel)}</span>
              <span class="content-calendar-status">${escapeHtml(item.status)}</span>
            </div>
          </div>
          <div class="content-calendar-copy">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
            <div class="content-calendar-footer">
              <span class="content-calendar-source">${escapeHtml(dictionary.articleSourceLabel)} · ${escapeHtml(getArticleCredit(item.article))}</span>
              <a class="article-card-action article-card-action-secondary content-calendar-link" href="${escapeHtml(item.article.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderArticles(language) {
  if (!dailyArticleContainer || !articleListContainer) {
    return;
  }

  const dictionary = translations[language] ?? translations.fa;
  const dailyIndex = getDailyArticleIndex();
  const featuredIndex = selectedArticleIndex ?? dailyIndex;
  const dailyArticle = articleCatalog[featuredIndex];
  const dailySummary = dailyArticle.summary[language] ?? dailyArticle.summary.en;
  const dailyEssay = getArticleEssay(dailyArticle, language);
  const shareUrl = getArticleShareUrl(dailyArticle, language);
  const archiveArticles = articleCatalog
    .map((article, index) => ({ article, index }))
    .filter(({ index }) => index !== featuredIndex);
  const articleKicker =
    featuredIndex === dailyIndex ? dictionary.articleTodayLabel : dictionary.articleSelectedLabel;

  dailyArticleContainer.innerHTML = `
    <div class="daily-article-main">
      <p class="article-kicker">${escapeHtml(articleKicker)}</p>
      <div class="article-title-row" id="daily-article-reader">
        <h3 class="article-title" dir="ltr">${escapeHtml(dailyArticle.title)}</h3>
        <button class="article-share-button" type="button" aria-label="${escapeHtml(dictionary.articleShareLabel)}" title="${escapeHtml(dictionary.articleShareLabel)}" data-article-share="${featuredIndex}" data-share-url="${escapeHtml(shareUrl)}">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <path d="m8.59 13.51 6.83 3.98"></path>
            <path d="m15.41 6.51-6.82 3.98"></path>
          </svg>
        </button>
      </div>
      <div class="article-meta-line">
        <p>
          <span>${escapeHtml(getArticleCredit(dailyArticle))}</span>
          <span>${escapeHtml(getTehranDate(language))}</span>
        </p>
        <div class="article-actions">
          <a class="button primary" href="${escapeHtml(dailyArticle.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
        </div>
      </div>
      <p class="share-status" data-article-share-status aria-live="polite"></p>
      <p class="article-summary">${escapeHtml(dailySummary)}</p>
      <div class="article-tags">${renderArticleTags(dailyArticle, language)}</div>
      <div class="article-body" id="daily-article-body">
        <p class="article-section-label">${escapeHtml(dictionary.articleOnSiteLabel)}</p>
        <p class="article-translation-note">${escapeHtml(dictionary.articleTranslationNote)}</p>
        ${renderParagraphs(dailyEssay.paragraphs)}
        ${renderArticleAdvice(dailyEssay.advice, dictionary.articleAdviceLabel)}
        <div class="article-takeaways">
          <p class="article-section-label">${escapeHtml(dictionary.articleTakeawaysLabel)}</p>
          <ul>${renderTakeaways(dailyEssay.takeaways)}</ul>
        </div>
        <p class="article-note">${escapeHtml(dictionary.articleCopyrightNote)}</p>
      </div>
    </div>
  `;

  articleListContainer.innerHTML = archiveArticles
    .map(({ article, index }) => {
      const summary = article.summary[language] ?? article.summary.en;

      return `
        <article class="article-card">
          <div>
            <h3 dir="ltr"><a href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a></h3>
            <p>${escapeHtml(summary)}</p>
          </div>
          <div class="article-card-footer">
            <span class="article-source">${escapeHtml(article.source)}</span>
            <div class="article-card-links">
              <button class="article-card-action article-card-action-primary" type="button" data-article-select="${index}">${escapeHtml(dictionary.articleArchiveReadOnSiteLabel)}</button>
              <a class="article-card-action article-card-action-secondary" href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  renderContentCalendar(language, dailyArticle, dailyEssay);
}

function scrollToArticleStart(behavior = "smooth") {
  const target = document.querySelector("#daily-article-reader");
  const header = document.querySelector(".site-header");

  if (!target) {
    return;
  }

  const headerOffset =
    header && getComputedStyle(header).position === "sticky"
      ? header.getBoundingClientRect().height + 18
      : 18;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}

function settleArticleStartScroll() {
  scrollToArticleStart("auto");
  requestAnimationFrame(() => scrollToArticleStart("auto"));
  [160, 500, 1000].forEach((delay) => {
    setTimeout(() => scrollToArticleStart("auto"), delay);
  });
  window.addEventListener("load", () => scrollToArticleStart("auto"), { once: true });
}

function showArticle(index, options = {}) {
  if (!Number.isInteger(index) || !articleCatalog[index]) {
    return;
  }

  const language = html.lang || getInitialLanguage();

  selectedArticleIndex = index;
  renderArticles(language);
  updateSeoMetadata(language);

  if (options.updateUrl) {
    updateArticleUrl(articleCatalog[index], language);
  }

  if (options.scroll) {
    scrollToArticleStart();
  }
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : "fa";
  const dictionary = translations[selectedLanguage];

  html.lang = selectedLanguage;
  html.dir = selectedLanguage === "en" ? "ltr" : "rtl";

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (key && dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.lang === selectedLanguage),
    );
  });

  if (copyStatus) {
    copyStatus.textContent = "";
  }

  renderArticles(selectedLanguage);

  if (selectedArticleIndex !== null) {
    updateArticleUrl(articleCatalog[selectedArticleIndex], selectedLanguage, "replace");
  }

  updateSeoMetadata(selectedLanguage);

  localStorage.setItem("site-language", selectedLanguage);
}

async function shareArticle(index) {
  const article = articleCatalog[index];

  if (!article) {
    return;
  }

  const language = html.lang || "fa";
  const dictionary = translations[language] ?? translations.fa;
  const shareUrl = getArticleShareUrl(article, language);
  const shareStatus = dailyArticleContainer?.querySelector("[data-article-share-status]");
  const shareData = {
    title: article.title,
    text: `${dictionary.articleShareText} ${article.title}`,
    url: shareUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }

    if (shareStatus) {
      shareStatus.textContent = dictionary.articleShareSuccess;
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      if (shareStatus) {
        shareStatus.textContent = dictionary.articleShareSuccess;
      }
    } catch {
      if (shareStatus) {
        shareStatus.textContent = `${dictionary.articleShareManualLabel} ${shareUrl}`;
      }
    }
  }
}

copyEmailButton?.addEventListener("click", async () => {
  const dictionary = translations[html.lang] ?? translations.fa;

  try {
    await navigator.clipboard.writeText(email);
    if (copyStatus) {
      copyStatus.textContent = dictionary.copySuccess;
    }
  } catch {
    if (copyStatus) {
      copyStatus.textContent = dictionary.copyFallback;
    }
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

dailyArticleContainer?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const shareButton = target?.closest("[data-article-share]");

  if (!shareButton) {
    return;
  }

  shareArticle(Number(shareButton.dataset.articleShare));
});

articleListContainer?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const selectButton = target?.closest("[data-article-select]");

  if (!selectButton) {
    return;
  }

  const index = Number(selectButton.dataset.articleSelect);

  if (!Number.isInteger(index) || !articleCatalog[index]) {
    return;
  }

  showArticle(index, { scroll: true, updateUrl: true });
});

async function initializeSite() {
  await loadContentOverrides();

  const articleIndexFromUrl = getArticleIndexFromUrl();

  if (articleIndexFromUrl !== null) {
    selectedArticleIndex = articleIndexFromUrl;
  }

  applyLanguage(getInitialLanguage());

  if (
    articleIndexFromUrl !== null &&
    ["#daily-article-reader", "#daily-article-body"].includes(window.location.hash)
  ) {
    settleArticleStartScroll();
  }
}

initializeSite();
