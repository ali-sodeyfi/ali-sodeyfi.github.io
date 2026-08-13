const email = "Sodeyfi.ali@gmail.com";
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const html = document.documentElement;

const translations = {
  fa: {
    documentTitle: "علی صدیفی | Venture Builder",
    metaDescription:
      "علی صدیفی، Venture Builder و اپراتور اجرایی با تمرکز بر ساخت شرکت، مقیاس‌دهی عملیاتی و توسعه اکوسیستم.",
    brandRole: "Venture Builder",
    navWork: "کارنامه",
    navThesis: "تمرکز",
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
