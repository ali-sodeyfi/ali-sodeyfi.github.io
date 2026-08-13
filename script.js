const email = "Sodeyfi.ali@gmail.com";
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const dailyArticleContainer = document.querySelector("[data-daily-article]");
const articleListContainer = document.querySelector("[data-article-list]");
const html = document.documentElement;

const translations = {
  fa: {
    documentTitle: "علی صدیفی | Venture Builder",
    metaDescription:
      "علی صدیفی، Venture Builder و اپراتور اجرایی با تمرکز بر ساخت شرکت، مقیاس‌دهی عملیاتی و توسعه اکوسیستم.",
    brandRole: "Venture Builder",
    navWork: "کارنامه",
    navThesis: "تمرکز",
    navArticles: "مقالات",
    navContact: "تماس",
    eyebrow: "علی صدیفی / Ali Sodeyfi",
    heroTitle: "ساختن شرکت، کار ایده نیست. کار سیستم است.",
    heroLead:
      "Venture builder و اپراتور اجرایی با بیش از 10 سال تجربه در ساخت، سرمایه‌گذاری و مقیاس‌دهی کسب‌وکارها در فین‌تک، ادتک و اکوسیستم استارتاپی.",
    heroPrimary: "دیدن کارنامه",
    metricOne: "سال تجربه اجرایی",
    metricTwo: "استارتاپ در پورتفو",
    metricThree: "درآمد بین‌المللی در Tekanesh",
    positioningLabel: "جایگاه",
    positioningTitle:
      "علی در نقطه اتصال سرمایه، عملیات و توسعه اکوسیستم کار می‌کند.",
    positioningBody:
      "تمرکز او تبدیل فرصت‌های مبهم به ساختار اجرایی قابل تکرار است: از طراحی پلتفرم سرمایه‌گذاری و شتاب‌دهی تا ساخت زیرساخت مالی، عملیاتی و سازمانی برای رشد.",
    trackLabel: "کارنامه",
    trackTitle: "کارنامه منتخب",
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
    thesisTitle: "سه محور اصلی",
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
      "یک انتخاب روزانه از نوشته‌های معتبر کارآفرینی، رشد و ساخت شرکت؛ با خلاصه کوتاه و لینک منبع اصلی.",
    articleTodayLabel: "مقاله امروز",
    articleArchiveLabel: "آرشیو منتخب",
    articleSourceLabel: "منبع",
    articleDateLabel: "به‌روزرسانی روزانه",
    articleReadLabel: "خواندن مقاله",
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
    navThesis: "Focus",
    navArticles: "Articles",
    navContact: "Contact",
    eyebrow: "Ali Sodeyfi",
    heroTitle: "Company building is not an idea problem. It is a systems problem.",
    heroLead:
      "Venture builder and executive operator with 10+ years building, investing in, and scaling companies across fintech, edtech, and startup ecosystems.",
    heroPrimary: "View track record",
    metricOne: "years of operating experience",
    metricTwo: "startups in portfolio",
    metricThree: "annual international revenue at Tekanesh",
    positioningLabel: "Positioning",
    positioningTitle:
      "Ali works at the intersection of capital, operations, and ecosystem development.",
    positioningBody:
      "His focus is turning ambiguous opportunities into repeatable operating structures: from investment and acceleration platforms to the financial, operational, and organizational infrastructure required for growth.",
    trackLabel: "Track Record",
    trackTitle: "Selected work",
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
    thesisTitle: "Three core lanes",
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
      "A daily pick from credible essays on entrepreneurship, growth, and company building, with a short note and a link to the original source.",
    articleTodayLabel: "Today's article",
    articleArchiveLabel: "Selected archive",
    articleSourceLabel: "Source",
    articleDateLabel: "Daily rotation",
    articleReadLabel: "Read article",
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
    documentTitle: "علي صدیفي | Venture Builder",
    metaDescription:
      "علي صدیفي، بنّاء شركات ومشغّل تنفيذي يركّز على بناء الشركات، توسيع العمليات، وتطوير المنظومات.",
    brandRole: "بناء الشركات",
    navWork: "الأعمال",
    navThesis: "التركيز",
    navArticles: "مقالات",
    navContact: "التواصل",
    eyebrow: "علي صدیفي / Ali Sodeyfi",
    heroTitle: "بناء الشركات ليس مشكلة أفكار. إنه مشكلة أنظمة.",
    heroLead:
      "بنّاء شركات ومشغّل تنفيذي بخبرة تزيد عن 10 سنوات في بناء الشركات والاستثمار فيها وتوسيعها عبر الفنتك، التعليم التقني، ومنظومات الشركات الناشئة.",
    heroPrimary: "عرض السجل",
    metricOne: "سنوات خبرة تنفيذية",
    metricTwo: "شركة ناشئة في المحفظة",
    metricThree: "إيراد دولي سنوي في Tekanesh",
    positioningLabel: "الموقع",
    positioningTitle:
      "يعمل علي عند تقاطع رأس المال، العمليات، وتطوير المنظومات.",
    positioningBody:
      "يركّز على تحويل الفرص الغامضة إلى بنى تشغيلية قابلة للتكرار: من منصات الاستثمار والتسريع إلى البنية المالية والتشغيلية والتنظيمية اللازمة للنمو.",
    trackLabel: "السجل",
    trackTitle: "أعمال مختارة",
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
    thesisTitle: "ثلاثة محاور",
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
      "اختيار يومي من مقالات موثوقة عن ريادة الأعمال والنمو وبناء الشركات، مع ملخص قصير ورابط المصدر الأصلي.",
    articleTodayLabel: "مقال اليوم",
    articleArchiveLabel: "أرشيف مختار",
    articleSourceLabel: "المصدر",
    articleDateLabel: "تحديث يومي",
    articleReadLabel: "قراءة المقال",
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
];

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

function renderArticles(language) {
  if (!dailyArticleContainer || !articleListContainer) {
    return;
  }

  const dictionary = translations[language] ?? translations.fa;
  const dailyIndex = getDailyArticleIndex();
  const dailyArticle = articleCatalog[dailyIndex];
  const dailySummary = dailyArticle.summary[language] ?? dailyArticle.summary.en;
  const archiveArticles = Array.from({ length: 6 }, (_, index) => {
    return articleCatalog[(dailyIndex + index + 1) % articleCatalog.length];
  });

  dailyArticleContainer.innerHTML = `
    <div class="daily-article-main">
      <p class="article-kicker">${escapeHtml(dictionary.articleTodayLabel)}</p>
      <h3 class="article-title" dir="ltr">
        <a href="${escapeHtml(dailyArticle.url)}" target="_blank" rel="noreferrer">${escapeHtml(dailyArticle.title)}</a>
      </h3>
      <p class="article-summary">${escapeHtml(dailySummary)}</p>
      <div class="article-tags">${renderArticleTags(dailyArticle, language)}</div>
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
      <a class="button primary" href="${escapeHtml(dailyArticle.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
    </div>
  `;

  articleListContainer.innerHTML = archiveArticles
    .map((article) => {
      const summary = article.summary[language] ?? article.summary.en;

      return `
        <article class="article-card">
          <div>
            <h3 dir="ltr"><a href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(article.title)}</a></h3>
            <p>${escapeHtml(summary)}</p>
          </div>
          <div class="article-card-footer">
            <span class="article-source">${escapeHtml(article.source)}</span>
            <a class="article-link" href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(dictionary.articleReadLabel)}</a>
          </div>
        </article>
      `;
    })
    .join("");
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

  localStorage.setItem("site-language", selectedLanguage);
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

applyLanguage(localStorage.getItem("site-language") ?? "fa");
