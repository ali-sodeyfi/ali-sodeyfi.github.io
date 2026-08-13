const email = "Sodeyfi.ali@gmail.com";
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const dailyArticleContainer = document.querySelector("[data-daily-article]");
const articleListContainer = document.querySelector("[data-article-list]");
const html = document.documentElement;
const liveSiteUrl = "https://ali-sodeyfi.github.io/";
let selectedArticleIndex = null;

const translations = {
  fa: {
    documentTitle: "علی سدیفی | Venture Builder",
    metaDescription:
      "علی سدیفی، Venture Builder و اپراتور اجرایی با تمرکز بر ساخت شرکت، مقیاس‌دهی عملیاتی و توسعه اکوسیستم.",
    brandRole: "Venture Builder",
    navWork: "کارنامه",
    navThesis: "روش کار",
    navArticles: "مقالات",
    navContact: "تماس",
    eyebrow: "علی سدیفی / Ali Sodeyfi",
    heroTitle: "علی سدیفی",
    heroLead:
      "Venture builder و اپراتور اجرایی؛ نزدیک به مسئله‌های رشد، سرمایه‌گذاری و ساخت سیستم برای کسب‌وکارهای اکوسیستمی.",
    heroThesis:
      "کار اصلی من تبدیل فرصت‌های مبهم به سیستم‌های قابل اجراست: انتخاب مسئله، طراحی سرمایه، ساخت تیم و رساندن عملیات به مقیاس.",
    heroPrimary: "دیدن کارنامه",
    profileCaptionLabel: "تمرکز فعلی",
    profileCaption:
      "توسعه اکوسیستم و رشد پلتفرمی؛ جایی که سرمایه، عملیات و جامعه باید هم‌زمان طراحی شوند.",
    metricOne: "سال تجربه اجرایی",
    metricTwo: "استارتاپ در پورتفو",
    metricThree: "درآمد بین‌المللی در Tekanesh",
    positioningLabel: "جایگاه",
    positioningTitle:
      "از ایده تا سازمان؛ جایی که سرمایه، عملیات و اکوسیستم هم‌زمان طراحی می‌شوند.",
    positioningBody:
      "در سال‌های اخیر روی ساخت و اداره پلتفرم‌های سرمایه‌گذاری، شتاب‌دهی، فین‌تک، ادتک و توسعه اکوسیستم کار کرده‌ام؛ نقش‌هایی که خروجی‌شان باید در رشد، حکمرانی و توان تکرارپذیر سازمان دیده شود.",
    briefOneLabel: "ساخته‌ام",
    briefOne:
      "پلتفرم‌های سرمایه‌گذاری، شتاب‌دهی و زیرساخت مالی برای رشد کسب‌وکار.",
    briefTwoLabel: "مقیاس دیده‌ام",
    briefTwo:
      "پورتفوی 140+ استارتاپ، گردش وام ساختاریافته، و عملیات درآمد بین‌المللی.",
    briefThreeLabel: "اکنون",
    briefThree:
      "روی توسعه اکوسیستم و سیستم‌های رشد پلتفرمی در باسلام کار می‌کنم.",
    trackLabel: "کارنامه",
    trackTitle: "رد پای اجرایی",
    trackIntro:
      "چند موقعیت که در آن‌ها نقش اصلی، ساختن سیستم اجرایی و رساندن ایده به مقیاس بوده است.",
    workOneYear: "2025 - اکنون",
    workOneTitle: "باسلام - توسعه اکوسیستم",
    workOneBody:
      "طراحی و اجرای زیرساخت‌های رشد اکوسیستمی، تحول عملیاتی و هم‌راستاسازی اجرا با اهداف بلندمدت پلتفرم.",
    workTwoTitle: "100استارتاپ - هم‌بنیان‌گذار و مدیرعامل",
    workTwoBody:
      "ساخت و مدیریت یکی از بزرگ‌ترین پلتفرم‌های سرمایه‌گذاری seed-stage ایران با پورتفوی بیش از 140 استارتاپ.",
    workThreeYear: "2021 - اکنون",
    workThreeTitle: "آکادمی تکانش - هم‌بنیان‌گذار و عضو هیئت‌مدیره",
    workThreeBody:
      "طراحی زیرساخت مالی و عملیاتی برای جریان‌های بین‌المللی فریلنسینگ و رسیدن به بیش از یک میلیون دلار درآمد سالانه.",
    workFourTitle: "همیان - هم‌بنیان‌گذار و عضو هیئت‌مدیره",
    workFourBody:
      "طراحی معماری مالی و عملیاتی سیستم‌های قرض‌الحسنه و امکان گردش بیش از یک تریلیون تومان وام ساختاریافته.",
    workFiveTitle: "شتاب‌دهنده EduTech - بنیان‌گذار و مدیرعامل",
    workFiveBody:
      "تاسیس شتاب‌دهنده تخصصی edtech، سرمایه‌گذاری و منتورینگ بیش از 10 استارتاپ و طراحی مدل incubation.",
    thesisLabel: "تز اجرایی",
    thesisTitle: "روش کار",
    thesisIntro:
      "ترکیبی از سرمایه‌گذاری، طراحی عملیات و ساختن زبان مشترک بین بازیگران اکوسیستم.",
    focusOneTitle: "Venture Building",
    focusOneBody:
      "طراحی مسیر سرمایه‌گذاری، ارزیابی بنیان‌گذار، شتاب‌دهی و تبدیل ایده به سازمان قابل رشد.",
    focusTwoTitle: "مقیاس‌دهی عملیاتی",
    focusTwoBody:
      "ساخت سیستم‌هایی که رشد را از وابستگی به افراد جدا می‌کنند: مالی، عملیاتی، فرایندی و حکمرانی.",
    focusThreeTitle: "توسعه اکوسیستم",
    focusThreeBody:
      "ایجاد زبان مشترک میان بنیان‌گذار، سرمایه‌گذار، بازار و نهادهای اثرگذار در اکوسیستم.",
    articlesLabel: "مطالعه",
    articlesTitle: "مقاله امروز برای ساختن بهتر",
    articlesIntro:
      "یک انتخاب روزانه از نوشته‌های معتبر کارآفرینی، رشد و ساخت شرکت؛ با ترجمه آزاد فارسی داخل سایت و لینک منبع اصلی.",
    articleTodayLabel: "مقاله امروز",
    articleSelectedLabel: "ترجمه منتخب",
    articleArchiveLabel: "آرشیو منتخب",
    articleSourceLabel: "منبع",
    articleDateLabel: "به‌روزرسانی روزانه",
    articleReadLabel: "منبع اصلی",
    articleOnSiteLabel: "ترجمه آزاد کامل‌تر مقاله",
    articleArchiveReadOnSiteLabel: "ترجمه داخل سایت",
    articleShareLabel: "اشتراک‌گذاری",
    articleShareSuccess: "لینک مستقیم مقاله کپی شد.",
    articleShareManualLabel: "لینک مستقیم مقاله:",
    articleShareText: "ترجمه فارسی این مقاله را اینجا بخوان:",
    articleTranslationNote:
      "این بخش ترجمه آزاد، کامل‌تر و خواندنی از ایده‌های اصلی مقاله است؛ برای مطالعه فارسی داخل سایت، بدون نیاز به خروج از صفحه.",
    articleTakeawaysLabel: "نکات اجرایی",
    articleCopyrightNote:
      "این متن ترجمه آزاد و بازنویسی‌شده است، نه بازنشر کلمه‌به‌کلمه مقاله اصلی.",
    contactLabel: "تماس",
    contactTitle:
      "برای همکاری در رشد، سرمایه‌گذاری یا ساختاردهی سازمانی.",
    contactBody:
      "برای شروع، یک پیام کوتاه با زمینه همکاری، مرحله کسب‌وکار و مسئله اصلی کافی است. شماره موبایل رزومه در سایت عمومی منتشر نشده است.",
    copyEmail: "کپی ایمیل",
    copySuccess: "ایمیل کپی شد.",
    copyFallback: "ایمیل: Sodeyfi.ali@gmail.com",
    footerText: "Venture builder، اپراتور اجرایی، توسعه‌دهنده اکوسیستم",
  },
  en: {
    documentTitle: "Ali Sodeyfi | Venture Builder",
    metaDescription:
      "Ali Sodeyfi is a venture builder and executive operator focused on company building, operational scaling, and ecosystem development.",
    brandRole: "Venture Builder",
    navWork: "Work",
    navThesis: "Method",
    navArticles: "Articles",
    navContact: "Contact",
    eyebrow: "Ali Sodeyfi",
    heroTitle: "Ali Sodeyfi",
    heroLead:
      "Venture builder and executive operator close to growth, investment, and systems work for ecosystem businesses.",
    heroThesis:
      "My work is turning ambiguous opportunities into executable systems: problem selection, capital design, team building, and operating scale.",
    heroPrimary: "View track record",
    profileCaptionLabel: "Current focus",
    profileCaption:
      "Ecosystem development and platform growth, where capital, operations, and community have to be designed together.",
    metricOne: "years of operating experience",
    metricTwo: "startups in portfolio",
    metricThree: "annual international revenue at Tekanesh",
    positioningLabel: "Positioning",
    positioningTitle:
      "From idea to organization, where capital, operations, and ecosystem design have to move together.",
    positioningBody:
      "In recent years I have worked on building and operating investment platforms, acceleration programs, fintech and edtech systems, and ecosystem development work whose output has to show up in growth, governance, and repeatable organizational capability.",
    briefOneLabel: "Built",
    briefOne:
      "Investment platforms, acceleration programs, and financial operating systems for company growth.",
    briefTwoLabel: "Scaled",
    briefTwo:
      "A 140+ startup portfolio, structured lending flows, and international revenue operations.",
    briefThreeLabel: "Now",
    briefThree:
      "Working on ecosystem development and platform growth systems at Basalam.",
    trackLabel: "Track Record",
    trackTitle: "Operating record",
    trackIntro:
      "Selected roles where the work was to build operating systems and carry ideas into scale.",
    workOneYear: "2025 - Present",
    workOneTitle: "Basalam - Ecosystem Development",
    workOneBody:
      "Designing ecosystem growth infrastructure, operational transformation, and execution alignment with long-term platform objectives.",
    workTwoTitle: "100Startups - Co-Founder & CEO",
    workTwoBody:
      "Built and led one of Iran's major seed-stage investment platforms with a portfolio of 140+ startups.",
    workThreeYear: "2021 - Present",
    workThreeTitle: "Tekanesh Academy - Co-Founder & Board Member",
    workThreeBody:
      "Designed financial and operating infrastructure for international freelancing flows, reaching $1M+ in annual revenue.",
    workFourTitle: "Hamyan - Co-Founder & Board Member",
    workFourBody:
      "Designed the financial and operating architecture for Qarz-al-Hasanah lending systems, enabling 1T+ toman in structured lending circulation.",
    workFiveTitle: "EduTech Accelerator - Founder & CEO",
    workFiveBody:
      "Founded a specialized edtech accelerator, invested in and mentored 10+ startups, and designed its incubation model.",
    thesisLabel: "Operating Thesis",
    thesisTitle: "Method",
    thesisIntro:
      "A working mix of investment thinking, operating design, and shared language across ecosystem players.",
    focusOneTitle: "Venture Building",
    focusOneBody:
      "Investment path design, founder evaluation, acceleration, and turning ideas into organizations that can grow.",
    focusTwoTitle: "Operational Scaling",
    focusTwoBody:
      "Building systems that make growth less dependent on individuals: finance, operations, process, and governance.",
    focusThreeTitle: "Ecosystem Development",
    focusThreeBody:
      "Creating shared language between founders, investors, markets, and the institutions that shape the ecosystem.",
    articlesLabel: "Reading",
    articlesTitle: "Today's article for better company building",
    articlesIntro:
      "A daily pick from credible essays on entrepreneurship, growth, and company building, with a readable on-site adaptation and a link to the original source.",
    articleTodayLabel: "Today's article",
    articleSelectedLabel: "Selected translation",
    articleArchiveLabel: "Selected archive",
    articleSourceLabel: "Source",
    articleDateLabel: "Daily rotation",
    articleReadLabel: "Original source",
    articleOnSiteLabel: "Readable adaptation",
    articleArchiveReadOnSiteLabel: "Read on site",
    articleShareLabel: "Share",
    articleShareSuccess: "Direct article link copied.",
    articleShareManualLabel: "Direct article link:",
    articleShareText: "Read this on-site article adaptation here:",
    articleTranslationNote:
      "This section is a readable adaptation of the article's core ideas for quick on-site reading.",
    articleTakeawaysLabel: "Operating takeaways",
    articleCopyrightNote:
      "This is a free adaptation, not a word-for-word republication of the original article.",
    contactLabel: "Contact",
    contactTitle:
      "For growth, investment, or organizational structuring conversations.",
    contactBody:
      "A short note with the collaboration context, business stage, and main problem is enough to start. The mobile number from the resume is intentionally not published on the public site.",
    copyEmail: "Copy email",
    copySuccess: "Email copied.",
    copyFallback: "Email: Sodeyfi.ali@gmail.com",
    footerText: "Venture builder. Executive operator. Ecosystem development leader.",
  },
  ar: {
    documentTitle: "علي سدیفي | Venture Builder",
    metaDescription:
      "علي سدیفي، بنّاء شركات ومشغّل تنفيذي يركّز على بناء الشركات، توسيع العمليات، وتطوير المنظومات.",
    brandRole: "بناء الشركات",
    navWork: "الأعمال",
    navThesis: "المنهج",
    navArticles: "مقالات",
    navContact: "التواصل",
    eyebrow: "علي سدیفي / Ali Sodeyfi",
    heroTitle: "علي سدیفي",
    heroLead:
      "بنّاء شركات ومشغّل تنفيذي قريب من مسائل النمو والاستثمار وبناء الأنظمة للأعمال المنظومية.",
    heroThesis:
      "عملي هو تحويل الفرص الغامضة إلى أنظمة قابلة للتنفيذ: اختيار المشكلة، تصميم رأس المال، بناء الفريق، وتوسيع العمليات.",
    heroPrimary: "عرض السجل",
    profileCaptionLabel: "التركيز الحالي",
    profileCaption:
      "تطوير المنظومات ونمو المنصات، حيث يجب تصميم رأس المال والعمليات والمجتمع معا.",
    metricOne: "سنوات خبرة تنفيذية",
    metricTwo: "شركة ناشئة في المحفظة",
    metricThree: "إيراد دولي سنوي في Tekanesh",
    positioningLabel: "الموقع",
    positioningTitle:
      "من الفكرة إلى المنظمة، حيث يتحرك تصميم رأس المال والعمليات والمنظومة معا.",
    positioningBody:
      "عملت في السنوات الأخيرة على بناء وتشغيل منصات استثمار وبرامج تسريع وأنظمة فنتك وتعليم تقني وتطوير منظومات، حيث يجب أن يظهر الأثر في النمو والحوكمة والقدرة التنظيمية القابلة للتكرار.",
    briefOneLabel: "بنيت",
    briefOne:
      "منصات استثمار وبرامج تسريع وأنظمة تشغيل مالية لنمو الشركات.",
    briefTwoLabel: "وسّعت",
    briefTwo:
      "محفظة تضم أكثر من 140 شركة ناشئة، وتدفقات تمويل منظمة، وعمليات إيراد دولية.",
    briefThreeLabel: "الآن",
    briefThree:
      "أعمل على تطوير المنظومة وأنظمة نمو المنصات في Basalam.",
    trackLabel: "السجل",
    trackTitle: "السجل التشغيلي",
    trackIntro:
      "أدوار مختارة كان جوهرها بناء أنظمة تشغيلية ونقل الأفكار إلى مرحلة التوسع.",
    workOneYear: "2025 - الآن",
    workOneTitle: "Basalam - تطوير المنظومة",
    workOneBody:
      "تصميم بنية نمو المنظومة، التحول التشغيلي، ومواءمة التنفيذ مع أهداف المنصة طويلة المدى.",
    workTwoTitle: "100Startups - شريك مؤسس ومدير تنفيذي",
    workTwoBody:
      "بناء وقيادة إحدى منصات الاستثمار في المراحل المبكرة في إيران، بمحفظة تضم أكثر من 140 شركة ناشئة.",
    workThreeYear: "2021 - الآن",
    workThreeTitle: "Tekanesh Academy - شريك مؤسس وعضو مجلس إدارة",
    workThreeBody:
      "تصميم البنية المالية والتشغيلية لتدفقات العمل الحر الدولية، والوصول إلى أكثر من مليون دولار من الإيراد السنوي.",
    workFourTitle: "Hamyan - شريك مؤسس وعضو مجلس إدارة",
    workFourBody:
      "تصميم البنية المالية والتشغيلية لأنظمة القرض الحسن، بما أتاح تدوير أكثر من تريليون تومان من التمويل المنظم.",
    workFiveTitle: "EduTech Accelerator - مؤسس ومدير تنفيذي",
    workFiveBody:
      "تأسيس مسرّعة متخصصة في التعليم التقني، الاستثمار في أكثر من 10 شركات ناشئة وإرشادها، وتصميم نموذج الاحتضان.",
    thesisLabel: "الأطروحة التشغيلية",
    thesisTitle: "المنهج",
    thesisIntro:
      "مزيج عملي من التفكير الاستثماري، تصميم العمليات، وبناء لغة مشتركة بين لاعبي المنظومة.",
    focusOneTitle: "بناء الشركات",
    focusOneBody:
      "تصميم مسار الاستثمار، تقييم المؤسسين، التسريع، وتحويل الأفكار إلى منظمات قابلة للنمو.",
    focusTwoTitle: "توسيع العمليات",
    focusTwoBody:
      "بناء أنظمة تجعل النمو أقل اعتمادا على الأفراد: المالية، العمليات، الإجراءات، والحوكمة.",
    focusThreeTitle: "تطوير المنظومة",
    focusThreeBody:
      "إيجاد لغة مشتركة بين المؤسسين، المستثمرين، السوق، والمؤسسات المؤثرة في المنظومة.",
    articlesLabel: "قراءة",
    articlesTitle: "مقال اليوم لبناء أفضل",
    articlesIntro:
      "اختيار يومي من مقالات موثوقة عن ريادة الأعمال والنمو وبناء الشركات، مع ترجمة عربية حرة داخل الموقع ورابط المصدر الأصلي.",
    articleTodayLabel: "مقال اليوم",
    articleSelectedLabel: "ترجمة مختارة",
    articleArchiveLabel: "أرشيف مختار",
    articleSourceLabel: "المصدر",
    articleDateLabel: "تحديث يومي",
    articleReadLabel: "المصدر الأصلي",
    articleOnSiteLabel: "ترجمة حرة للمقال",
    articleArchiveReadOnSiteLabel: "قراءة داخل الموقع",
    articleShareLabel: "مشاركة",
    articleShareSuccess: "تم نسخ رابط المقال المباشر.",
    articleShareManualLabel: "رابط المقال المباشر:",
    articleShareText: "اقرأ ترجمة هذا المقال داخل الموقع هنا:",
    articleTranslationNote:
      "هذا القسم ترجمة حرة ومقروءة لأفكار المقال الأساسية، لقراءتها داخل الموقع بسرعة.",
    articleTakeawaysLabel: "نقاط تشغيلية",
    articleCopyrightNote:
      "هذا النص ترجمة حرة وإعادة صياغة، وليس إعادة نشر حرفية للمقال الأصلي.",
    contactLabel: "التواصل",
    contactTitle:
      "لحوارات النمو، الاستثمار، أو هيكلة المنظمات.",
    contactBody:
      "تكفي رسالة قصيرة تتضمن سياق التعاون، مرحلة العمل، والمشكلة الأساسية للبدء. رقم الهاتف الموجود في السيرة الذاتية لم ينشر في الموقع العام.",
    copyEmail: "نسخ البريد",
    copySuccess: "تم نسخ البريد.",
    copyFallback: "البريد: Sodeyfi.ali@gmail.com",
    footerText: "بناء شركات. تشغيل تنفيذي. تطوير منظومات.",
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
      fa: "یکی از روشن‌ترین یادآوری‌ها برای founderها: در شروع، کارهایی که مقیاس‌پذیر نیستند اغلب همان چیزهایی‌اند که یادگیری، اعتماد و رشد واقعی را می‌سازند.",
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
      fa: "برای founderهایی که بین ساختن و مدیریت گیر می‌کنند، تفاوت ریتم maker و manager را توضیح می‌دهد و نشان می‌دهد چرا جلسه‌ها می‌توانند هزینه پنهان داشته باشند.",
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
      fa: "برای founderها یک یادآوری عملی است: اگر سوال خوب نپرسی، کاربر هم حقیقت مفید را به تو نمی‌گوید.",
      en: "A practical reminder for founders: without better questions, users rarely give you the truth you need.",
      ar: "تذكير عملي للمؤسسين: من دون أسئلة أفضل، نادرا ما يعطيك المستخدمون الحقيقة التي تحتاجها.",
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
      fa: "یک مجموعه فشرده از توصیه‌های عملی برای ساخت شرکت؛ بیشتر برای founderهایی مفید است که از ایده عبور کرده‌اند و با اجرا درگیرند.",
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
];

const articleEssays = {
  "Do Things that Don't Scale": {
    fa: {
      paragraphs: [
        "در شروع یک شرکت، وسوسه طبیعی این است که همه‌چیز از روز اول scalable باشد: فرایندها، فروش، جذب کاربر، پشتیبانی و حتی فرهنگ. اما واقعیت شروع، بیشتر شبیه ساختن اعتماد با دست است تا ساختن ماشین رشد. بنیان‌گذار باید نزدیک کاربر بماند، خودش درد را بشنود و خودش بخشی از تجربه اولیه را بسازد.",
        "کار غیرقابل‌مقیاس، اگر درست انتخاب شود، اتلاف وقت نیست؛ ابزار یادگیری است. وقتی founder خودش با کاربر صحبت می‌کند، خودش onboarding انجام می‌دهد یا خودش کیفیت اولین تجربه را نگه می‌دارد، چیزهایی می‌فهمد که هیچ داشبوردی در هفته‌های اول نشان نمی‌دهد. این کارها برای همیشه نمی‌مانند، اما DNA محصول و سازمان را شکل می‌دهند.",
        "معیار مهم این است که کار دستی باید به یادگیری یا وفاداری تبدیل شود. اگر فقط founder را خسته کند و insight نسازد، دام است. اما اگر باعث شود کاربر حس کند با یک تیم جدی طرف است، یا تیم بفهمد ارزش واقعی کجا ساخته می‌شود، همان کار کوچک می‌تواند نقطه شروع رشد بزرگ باشد.",
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
        "یکی از نکته‌های اصلی این نگاه این است که باید در آینده زندگی کنی. یعنی خودت را در معرض تکنولوژی، رفتار یا بازاری قرار بدهی که هنوز برای همه عادی نشده است. کسی که زودتر در چنین محیطی زندگی می‌کند، کمبودهایی را می‌بیند که بقیه بعدا خواهند دید. برای همین خیلی از founderهای خوب، ایده را اختراع نمی‌کنند؛ آن را از دل تجربه روزمره کشف می‌کنند.",
        "مسئله‌ای که برای خودت هم واقعی باشد معمولا بهتر از مسئله‌ای است که فقط از بیرون جذاب به نظر می‌رسد. وقتی خودت درد را تجربه کرده باشی، درباره جزئیاتش حساس‌تر می‌شوی، زبان کاربر را بهتر می‌فهمی و کمتر فریب پاسخ‌های سطحی را می‌خوری. البته این کافی نیست؛ باید ببینی آیا افراد دیگری هم همان درد را دارند و آیا حاضرند برای حلش رفتارشان را تغییر دهند یا نه.",
        "ایده خوب لزوما از روز اول بزرگ به نظر نمی‌رسد. گاهی بهترین ایده‌ها ابتدا کوچک، تخصصی یا حتی عجیب‌اند، چون فقط گروه کوچکی از آدم‌ها هنوز شدت مسئله را حس کرده‌اند. اما اگر آن گروه کوچک واقعا مسئله را جدی بگیرد، همان نقطه می‌تواند شروع یک بازار بزرگ‌تر باشد. مهم این است که از یک نیاز واقعی شروع کنی، نه از یک شعار بزرگ.",
        "پس کار founder فقط ایده‌پردازی نیست؛ مشاهده دقیق است. باید ببینی چه چیزی بارها تکرار می‌شود، چه چیزی مردم را مجبور به workaround می‌کند، کجا ابزارهای موجود جواب نمی‌دهند و کدام تغییر تازه، امکان راه‌حل جدید را باز کرده است. بعد از آن، ایده باید با کاربر، رفتار واقعی و شواهد بازار تست شود. ایده‌ای که نتوان آن را با واقعیت تماس داد، فقط یک جمله خوب است.",
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
        "Graham از تجربه Y Combinator مثال می‌زند. سرمایه‌گذارها معمولاً با تقویم مدیریتی کار می‌کنند، اما او می‌گوید در YC تلاش کرده‌اند تا حدی روی تقویم سازنده بمانند. راه‌حلشان چیزی شبیه office hours است: چند بازه مشخص در هفته را برای ملاقات با founderها کنار می‌گذارند و قرارها را در انتهای روز جمع می‌کنند. این کار باعث می‌شود جلسه‌ها مزاحم قلب روز کاری نشوند؛ یعنی جلسه هست، اما وسط جریان ساختن فرو نمی‌رود.",
        "او از تجربه استارتاپ قبلی خودش هم یک الگوی جالب می‌آورد: روزش را عملاً به دو روز کاری تقسیم کرده بود. شب‌ها تا دیروقت برنامه‌نویسی می‌کرد، چون آن زمان احتمال وقفه کم بود؛ بعد دیرتر می‌خوابید و بخش دیگری از روز را به کارهای تجاری و ارتباطی اختصاص می‌داد. بدون اینکه آن موقع اسمش را بداند، در واقع یک بخش روز را با تقویم سازنده جلو می‌برد و بخش دیگر را با تقویم مدیر.",
        "بخش مهم دیگر مقاله درباره جلسه‌های حدسی است؛ همان جلسه‌هایی که فقط برای آشنا شدن، قهوه خوردن، شبکه‌سازی یا بررسی احتمال همکاری پیشنهاد می‌شوند. برای کسی که تقویم مدیریتی دارد، چنین جلسه‌ای ممکن است تقریباً رایگان به نظر برسد؛ یک جای خالی در تقویم هست و شاید چیزی از آن دربیاید. در فرهنگ کسب‌وکار، مخصوصاً در سیلیکون‌ولی، این نوع ملاقات‌ها طبیعی و رایج‌اند.",
        "اما برای کسی که روی تقویم سازنده کار می‌کند، جلسه حدسی هزینه بسیار بالاتری دارد. او باید نیم‌روز یا بخش بزرگی از تمرکزش را خرج احتمالی کند که شاید هیچ نتیجه‌ای نداشته باشد. اینجاست که یک تعارض اجتماعی هم شکل می‌گیرد: اگر جلسه را بپذیری، تمرکزت را از دست می‌دهی؛ اگر رد کنی، ممکن است بی‌ادب یا غیرهمکار به نظر برسی. مشکل فقط مدیریت زمان نیست، مدیریت انتظارات آدم‌هایی است که با ریتم دیگری کار می‌کنند.",
        "Graham راه‌حل را در روشن کردن همین تفاوت می‌بیند. کسانی که تقویم سازنده دارند قرار نیست هیچ‌وقت جلسه نداشته باشند. آن‌ها هم می‌دانند که هماهنگی، رابطه و تصمیم‌گیری لازم است. خواسته اصلی‌شان این است که طرف مقابل هزینه واقعی جلسه را بفهمد. وقتی این هزینه دیده شود، می‌شود جلسه‌ها را خوشه‌بندی کرد، زمان‌های مشخص ساخت، درخواست‌های حدسی را کمتر کرد و کار عمیق را بی‌دلیل تکه‌تکه نکرد.",
        "برای founderها، این مقاله فقط درباره برنامه‌نویس‌ها نیست؛ درباره طراحی انرژی شرکت است. بنیان‌گذار در سال‌های اول هم باید بفروشد، استخدام کند، مذاکره کند و سرمایه جذب کند، هم باید محصول، روایت، سیستم و فرهنگ بسازد. اگر تقویم او کاملاً مدیریتی شود، ممکن است شرکت پرجنب‌وجوش به نظر برسد اما چیزهای عمیق ساخته نشوند. اگر هم کاملاً از هماهنگی فرار کند، سازمان قفل می‌شود. هنر کار این است که برای هر نوع کار، ریتم درست بسازد.",
        "برداشت عملی مقاله این است که تقویم، فقط فهرست قرارها نیست؛ معماری توجه سازمان است. هر بار که جلسه‌ای می‌گذاری، فقط زمان همان جلسه را مصرف نمی‌کنی؛ ممکن است یک بلوک تمرکز، یک شروع جسورانه یا یک خروجی عمیق را هم حذف کنی. شرکت‌های بهتر آن‌هایی‌اند که هم تصمیم‌گیری سریع دارند و هم به آدم‌های سازنده اجازه می‌دهند نیم‌روزهای سالم و بی‌وقفه داشته باشند.",
      ],
      takeaways: [
        "جلسه را فقط با مدت خودش نسنج؛ اثرش روی قبل و بعدِ کار عمیق را هم حساب کن.",
        "برای تیم‌های محصول، تکنولوژی، محتوا و استراتژی، بلوک‌های نیم‌روزه محافظت‌شده بساز.",
        "جلسه‌ها را در پنجره‌های مشخص یا انتهای روز خوشه‌بندی کن تا وسط جریان ساختن نیفتند.",
        "جلسه‌های حدسی و صرفاً شبکه‌سازی را برای آدم‌های maker با دقت بیشتری بپذیر یا رد کن.",
        "به‌عنوان founder، روزت را آگاهانه بین ریتم مدیریت و ریتم ساختن تقسیم کن.",
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
        "این نگاه برای founderها یک هشدار جدی است: عاشق محصول شدن کافی نیست. باید بی‌رحمانه بررسی کرد که آیا بازار واقعا بیدار است یا نه. گاهی بهترین تصمیم، تغییر segment، تغییر مسئله یا حتی توقف ساخت چیزی است که بازار آن را نمی‌کشد.",
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
        "برای founderها، این متن یادآوری می‌کند که product management یک نقش اجرایی جدی است، نه یک لایه اداری. محصول خوب از ترکیب قضاوت، داده، حساسیت به کاربر و استاندارد بالا ساخته می‌شود.",
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
  "How to Talk to Users": {
    fa: {
      paragraphs: [
        "صحبت با کاربر ساده به نظر می‌رسد، اما بسیاری از founderها با سؤال‌های اشتباه داده خراب تولید می‌کنند. اگر از کاربر بپرسی «آیا این را دوست داری؟» معمولا جواب مودبانه می‌گیری. سؤال خوب باید به رفتار گذشته، درد واقعی و تصمیم‌های خرج‌کردن وصل شود.",
        "مصاحبه کاربر جای pitch نیست. founder باید کمتر توضیح بدهد و بیشتر گوش کند. هدف این نیست که کاربر را قانع کنی ایده تو خوب است؛ هدف این است که بفهمی زندگی واقعی او چگونه کار می‌کند و مسئله کجا آن‌قدر دردناک می‌شود که تغییر رفتار ارزش داشته باشد.",
        "کیفیت کشف مسئله، کیفیت محصول را تعیین می‌کند. اگر مسئله را سطحی بفهمی، محصول هم سطحی می‌شود. مصاحبه خوب به تیم کمک می‌کند زبان کاربر، trigger خرید، workaroundهای فعلی و شدت نیاز را دقیق‌تر ببیند.",
      ],
      takeaways: [
        "درباره رفتار گذشته بپرس، نه نظر فرضی درباره آینده.",
        "در مصاحبه pitch نکن؛ کشف کن.",
        "به workaroundهای فعلی کاربر به چشم signal نگاه کن.",
      ],
    },
    en: {
      paragraphs: [
        "Talking to users sounds simple, but many founders create bad data with bad questions. If you ask whether someone likes your idea, you often get politeness. A better question connects to past behavior, real pain, and decisions that involved time or money.",
        "A user interview is not a pitch. The founder should explain less and listen more. The goal is not to convince the user that the idea is good; it is to understand how their real life works and where the problem becomes painful enough to justify behavior change.",
        "The quality of problem discovery shapes the quality of the product. If the problem is understood shallowly, the product will be shallow too. Good interviews reveal the user's language, buying triggers, current workarounds, and intensity of need.",
      ],
      takeaways: [
        "Ask about past behavior, not hypothetical future opinions.",
        "Do not pitch during discovery; listen.",
        "Treat current workarounds as strong signals.",
      ],
    },
    ar: {
      paragraphs: [
        "يبدو الحديث مع المستخدمين بسيطا، لكن كثيرا من المؤسسين ينتجون بيانات سيئة بأسئلة سيئة. إذا سألت المستخدم هل يحب فكرتك، فغالبا تحصل على مجاملة. السؤال الأفضل يرتبط بسلوك سابق وألم حقيقي وقرارات تضمنت وقتا أو مالا.",
        "مقابلة المستخدم ليست عرضا للبيع. يجب أن يشرح المؤسس أقل ويستمع أكثر. الهدف ليس إقناع المستخدم بأن الفكرة جيدة، بل فهم كيف تعمل حياته فعلا وأين تصبح المشكلة مؤلمة بما يكفي لتغيير السلوك.",
        "جودة اكتشاف المشكلة تصنع جودة المنتج. إذا فهمت المشكلة بسطحية، سيكون المنتج سطحيا. المقابلات الجيدة تكشف لغة المستخدم ومحفزات الشراء والحلول البديلة الحالية وشدة الحاجة.",
      ],
      takeaways: [
        "اسأل عن السلوك السابق، لا الآراء الافتراضية عن المستقبل.",
        "لا تقدم عرضا أثناء الاكتشاف؛ استمع.",
        "اعتبر الحلول البديلة الحالية إشارات قوية.",
      ],
    },
  },
  "The 30 Best Pieces of Advice for Entrepreneurs in 2023": {
    fa: {
      paragraphs: [
        "مجموعه‌های توصیه وقتی مفیدند که مثل چک‌لیست مصرف نشوند. برای founder، ارزش چنین متن‌هایی در پیدا کردن یک یا دو توصیه‌ای است که دقیقا به مرحله فعلی شرکت می‌خورد؛ نه در تلاش برای اجرای همه چیز.",
        "شرکت‌سازی پر از تنش‌های هم‌زمان است: سرعت و کیفیت، تمرکز و فرصت، استخدام و فرهنگ، رشد و پایداری. توصیه‌های خوب معمولا کمک می‌کنند این trade-offها روشن‌تر شوند و تصمیم‌های سخت با زبان دقیق‌تری گرفته شوند.",
        "بهترین روش استفاده از چنین مقاله‌ای این است که بعد از خواندن، آن را به audit عملیاتی تبدیل کنی. کدام توصیه اگر همین هفته اجرا شود، بیشترین اثر را دارد؟ کدام عادت مدیریتی باید حذف شود؟ کدام metric باید جدی‌تر دیده شود؟",
      ],
      takeaways: [
        "از بین توصیه‌ها فقط یک یا دو مورد مناسب مرحله فعلی را انتخاب کن.",
        "هر توصیه را به یک اقدام هفتگی تبدیل کن.",
        "از مقاله برای audit سیستم مدیریتی استفاده کن، نه مصرف الهام لحظه‌ای.",
      ],
    },
    en: {
      paragraphs: [
        "Advice collections are useful only when they are not consumed as checklists. For a founder, the value is in finding one or two pieces of advice that match the current stage of the company, not trying to apply everything.",
        "Company building is full of simultaneous tensions: speed and quality, focus and opportunity, hiring and culture, growth and durability. Good advice helps make those tradeoffs clearer and gives better language for hard decisions.",
        "The best way to use an article like this is to turn it into an operating audit. Which piece of advice would matter most if applied this week? Which management habit should be removed? Which metric deserves more seriousness?",
      ],
      takeaways: [
        "Choose only one or two pieces of advice that fit the current stage.",
        "Turn each chosen idea into a weekly action.",
        "Use the article as an audit tool, not a burst of inspiration.",
      ],
    },
    ar: {
      paragraphs: [
        "تكون مجموعات النصائح مفيدة عندما لا تستهلك كقوائم كاملة. بالنسبة للمؤسس، القيمة في العثور على نصيحة أو نصيحتين تناسبان مرحلة الشركة الحالية، لا في محاولة تطبيق كل شيء.",
        "بناء الشركات مليء بتوترات متزامنة: السرعة والجودة، التركيز والفرصة، التوظيف والثقافة، النمو والمتانة. النصائح الجيدة تساعد على توضيح هذه المفاضلات وتمنح لغة أفضل للقرارات الصعبة.",
        "أفضل طريقة لاستخدام مقال كهذا هي تحويله إلى مراجعة تشغيلية. أي نصيحة سيكون لها أكبر أثر إذا طبقت هذا الأسبوع؟ أي عادة إدارية يجب حذفها؟ أي مقياس يستحق جدية أكبر؟",
      ],
      takeaways: [
        "اختر نصيحة أو نصيحتين فقط تناسبان المرحلة الحالية.",
        "حوّل كل فكرة مختارة إلى فعل أسبوعي.",
        "استخدم المقال كأداة مراجعة، لا كمصدر إلهام عابر.",
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
        "این متن Steve Blank یک یادآوری سخت اما حیاتی برای هر founder است: هیچ حقیقتی درباره مشتری، بازار و مدل کسب‌وکار داخل اتاق جلسه پیدا نمی‌شود. داخل شرکت فقط فرضیه داریم؛ بیرون از ساختمان است که معلوم می‌شود کدام فرضیه زنده می‌ماند و کدام فقط یک خیال خوش‌ساخت بوده است.",
        "بسیاری از تیم‌ها با یک vision شروع می‌کنند و خیلی زود آن را با واقعیت اشتباه می‌گیرند. برنامه مالی، pitch deck، roadmap و حتی طراحی محصول می‌توانند ظاهر اعتمادبه‌نفس بسازند، اما تا وقتی مشتری واقعی دیده نشده و رفتار واقعی سنجیده نشده، همه این‌ها بیشتر شبیه نقشه‌اند تا زمین. Customer Development یعنی پذیرفتن همین فاصله بین نقشه و زمین.",
        "اصل مهم این است که استارتاپ نسخه کوچک یک شرکت بزرگ نیست. شرکت بزرگ معمولا در حال اجرای یک مدل شناخته‌شده است؛ اما استارتاپ در حال جست‌وجوی مدل تکرارپذیر و مقیاس‌پذیر است. بنابراین metricها، جلسات، ساختار تصمیم‌گیری و حتی تحمل شکست در استارتاپ باید با منطق جست‌وجو طراحی شوند، نه با منطق اجرای مطمئن.",
        "وقتی تیم از ساختمان بیرون می‌رود، هدفش فروش اجباری ایده نیست. هدف این است که فرضیه‌ها را با واقعیت تماس بدهد: آیا مشتری درد را جدی حس می‌کند؟ آیا مسئله اولویت دارد؟ آیا راه‌حل فعلی کافی نیست؟ آیا کسی حاضر است برای راه‌حل بهتر هزینه، زمان یا تغییر رفتار بدهد؟ جواب این سؤال‌ها با نظر مدیران، مشاوران یا دوستان به دست نمی‌آید؛ باید از بازار و مشتری گرفته شود.",
        "Customer Development همچنین به founder یاد می‌دهد شکست کوچک را زود و ارزان بپذیرد. اگر فرضیه‌ای غلط است، بهتر است در یک مصاحبه، تست فروش یا آزمایش کوچک بفهمی تا بعد از چند ماه توسعه محصول. این رویکرد شکست را رمانتیک نمی‌کند؛ آن را به ابزار کاهش ریسک تبدیل می‌کند. شکست مفید، شکستی است که فرضیه را روشن‌تر کند.",
        "برای اپراتوری، پیام متن روشن است: یادگیری باید در سیستم کار شرکت طراحی شود. هر هفته باید فرضیه مشخص، تماس واقعی با مشتری، evidence قابل ثبت و تصمیم بعدی وجود داشته باشد. اگر تیم فقط می‌سازد اما یاد نمی‌گیرد، احتمال دارد با سرعت زیاد در مسیر اشتباه حرکت کند.",
        "در نهایت، این متن درباره فروتنی عملیاتی است. founder باید آن‌قدر به vision خود باور داشته باشد که شروع کند، اما آن‌قدر هم فروتن باشد که اجازه دهد مشتری، بازار و داده‌های واقعی شکل دقیق آن vision را اصلاح کنند. شرکت خوب از ترکیب ایمان اولیه و یادگیری بی‌رحمانه ساخته می‌شود.",
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
};

const defaultArticleEssay = {
  fa: {
    paragraphs: [
      "این مقاله از آن دسته متن‌هایی است که برای founderها ارزش عملی دارد، چون یک مفهوم را از حالت شعار خارج می‌کند و به تصمیم‌های روزمره وصل می‌کند. نکته اصلی این است که ساخت شرکت، مجموعه‌ای از انتخاب‌های کوچک و پیوسته است: انتخاب مسئله، انتخاب کاربر، انتخاب ریتم اجرا و انتخاب معیار.",
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

function getDailyArticleIndex() {
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

function getTehranDate(language) {
  const locale = language === "en" ? "en-US" : language === "ar" ? "ar" : "fa-IR";

  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function getArticleSlug(article) {
  return article.title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function getArticleShareUrl(article, language) {
  const baseUrl = window.location.protocol.startsWith("http")
    ? window.location.href
    : liveSiteUrl;
  const url = new URL(baseUrl);

  url.searchParams.delete("v");
  url.searchParams.set("article", getArticleSlug(article));
  url.searchParams.set("lang", translations[language] ? language : "fa");
  url.hash = "daily-article-reader";

  return url.toString();
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
  return articleEssays[article.title]?.[language] ?? defaultArticleEssay[language] ?? defaultArticleEssay.en;
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
      <p class="share-status" data-article-share-status aria-live="polite"></p>
      <p class="article-summary">${escapeHtml(dailySummary)}</p>
      <div class="article-tags">${renderArticleTags(dailyArticle, language)}</div>
      <div class="article-body" id="daily-article-body">
        <p class="article-section-label">${escapeHtml(dictionary.articleOnSiteLabel)}</p>
        <p class="article-translation-note">${escapeHtml(dictionary.articleTranslationNote)}</p>
        ${renderParagraphs(dailyEssay.paragraphs)}
        <div class="article-takeaways">
          <p class="article-section-label">${escapeHtml(dictionary.articleTakeawaysLabel)}</p>
          <ul>${renderTakeaways(dailyEssay.takeaways)}</ul>
        </div>
        <p class="article-note">${escapeHtml(dictionary.articleCopyrightNote)}</p>
      </div>
    </div>
    <div class="daily-article-meta">
      <div>
        <p class="article-source">${escapeHtml(dictionary.articleSourceLabel)}</p>
        <p>${escapeHtml(getArticleCredit(dailyArticle))}</p>
      </div>
      <div>
        <p class="article-date">${escapeHtml(dictionary.articleDateLabel)}</p>
        <p>${escapeHtml(getTehranDate(language))}</p>
      </div>
      <div class="article-actions">
        <a class="button primary" href="${escapeHtml(dailyArticle.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
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
}

function scrollToArticleStart(behavior = "smooth") {
  const target = document.querySelector("#daily-article-reader");
  const header = document.querySelector(".site-header");

  if (!target) {
    return;
  }

  const headerOffset = header ? header.getBoundingClientRect().height + 18 : 104;
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
  document.title = dictionary.documentTitle;

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", dictionary.metaDescription);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", dictionary.documentTitle);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", dictionary.metaDescription);

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
