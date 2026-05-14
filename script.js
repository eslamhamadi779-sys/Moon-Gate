

// ========================================
// script.js - موقع الأبراج الكامل والمستقل
// ========================================
// بيانات الأبراج (data.js مدمج)
// ========================================
// بيانات الأبراج الكاملة
const zodiacData = {
  "الحمل": {
    symbol: "♈", emoji: "🔥", color: "#ff6b6b",
    dateRange: "21 مارس – 19 أبريل", element: "نار", planet: "المريخ",
    traits: "شجاع، نشيط، قيادي، يحب التحدي والمغامرة.",
    flaws: "متسرع، عصبي أحيانًا، عنيد.",
    strengths: ["قيادة طبيعية", "شجاعة وإقبال على الحياة", "طاقة عالية ونشاط دائم"],
    weaknesses: ["تسرع في القرارات", "ثورة سريعة", "صعوبة في الصبر"],
    match: ["الأسد", "القوس", "الجوزاء"],
    clash: ["السرطان", "الجدي"],
    celebrities: { footballEgyptian: "محمد صلاح", footballWorld: "كريستيانو رونالدو", singerMale: "تامر حسني", singerFemale: "شيرين عبد الوهاب", actorMale: "أحمد عز", actorFemale: "منى زكي" },
    yearlyForecast: { general: "عام 2025 يحمل فرصًا ذهبية للحمل، خاصة في النصف الثاني. المشترى يدعمك في الطموحات الكبيرة.", love: "علاقات جديدة ومثيرة في الأفق، والمرتبطون يعيشون مرحلة تجديد.", work: "ترقية أو مشروع جديد محتمل جدًا في الربع الثالث.", health: "انتبه للإجهاد والراحة الكافية، الرياضة ستكون حليفتك.", money: "فرص استثمارية لكن تجنب المخاطرة العالية." }
  },
  "الثور": {
    symbol: "♉", emoji: "🌿", color: "#51cf66",
    dateRange: "20 أبريل – 20 مايو", element: "تراب", planet: "الزهرة",
    traits: "عملي، صبور، وفي، يحب الاستقرار والجمال.",
    flaws: "عنيد جدًا، بطيء التغيير، غيور.",
    strengths: ["صبر وثبات عند الصعوبات", "وفاء عميق في العلاقات", "حكمة عملية في المال"],
    weaknesses: ["مقاومة التغيير", "العناد الزائد", "الغيرة والتملك"],
    match: ["العذراء", "الجدي", "السرطان"],
    clash: ["الأسد", "الدلو"],
    celebrities: { footballEgyptian: "أحمد فتحي", footballWorld: "ديفيد بيكهام", singerMale: "محمد منير", singerFemale: "أنغام", actorMale: "خالد الصاوي", actorFemale: "هند صبري" },
    yearlyForecast: { general: "عام هادئ ومستقر للثور، مع نمو تدريجي ومضمون في أغلب المجالات.", love: "استقرار عاطفي وعمق في العلاقات القائمة.", work: "جهودك ستُقدَّر أخيرًا ومكافآت مادية محتملة.", health: "صحة جيدة مع ضرورة الانتباه للتغذية.", money: "وضع مالي مريح ومدخرات في تحسن." }
  },
  "الجوزاء": {
    symbol: "♊", emoji: "💨", color: "#339af0",
    dateRange: "21 مايو – 20 يونيو", element: "هواء", planet: "عطارد",
    traits: "ذكي، اجتماعي، سريع التعلم، متعدد المواهب.",
    flaws: "متقلب، مشتت، يصعب الإمساك به.",
    strengths: ["ذكاء حاد وفضول دائم", "اجتماعي وسهل التعامل", "قدرة على التأقلم السريع"],
    weaknesses: ["عدم الاستقرار", "التشتت وكثرة المشاريع", "صعوبة اتخاذ القرار"],
    match: ["الميزان", "الدلو", "الحمل"],
    clash: ["العذراء", "الحوت"],
    celebrities: { footballEgyptian: "وليد سليمان", footballWorld: "ليونيل ميسي", singerMale: "عمرو دياب", singerFemale: "أميرة", actorMale: "عمرو يوسف", actorFemale: "نيللي كريم" },
    yearlyForecast: { general: "عام مليء بالتجارب والتنوع للجوزاء، فرص للسفر والتعلم.", love: "لقاءات جديدة ومثيرة، الحياة الاجتماعية تزدهر.", work: "مشاريع متعددة والتواصل يفتح أبوابًا مهمة.", health: "انتبه للتعب الذهني وخصص وقتًا للراحة.", money: "دخل متذبذب لكن الفرص المفاجئة كثيرة." }
  },
  "السرطان": {
    symbol: "♋", emoji: "🌊", color: "#74c0fc",
    dateRange: "21 يونيو – 22 يوليو", element: "ماء", planet: "القمر",
    traits: "حنون، عاطفي، مخلص، يحمي من يحب.",
    flaws: "حساس جدًا، متردد، ينسحب عند الجرح.",
    strengths: ["حدس قوي جدًا", "وفاء وعمق في الحب", "قدرة على الرعاية والاهتمام"],
    weaknesses: ["حساسية مفرطة", "التردد وتغيير المزاج", "التعلق بالماضي"],
    match: ["الثور", "الحوت", "العقرب"],
    clash: ["الحمل", "الميزان"],
    celebrities: { footballEgyptian: "محمد إبراهيم", footballWorld: "كيليان مبابي", singerMale: "هاني شاكر", singerFemale: "نانسي عجرم", actorMale: "يوسف الشريف", actorFemale: "دنيا سمير غانم" },
    yearlyForecast: { general: "عام للنمو الداخلي والتعافي، تجديد في العلاقات المهمة.", love: "عاطفة عميقة وصادقة، فرص للارتباط الجاد.", work: "بيئة عمل مستقرة وتقدير من المسؤولين.", health: "اهتم بصحتك النفسية، التأمل والهدوء مفيدان جدًا.", money: "ادخار وتخطيط مالي ذكي هو مفتاح العام." }
  },
  "الأسد": {
    symbol: "♌", emoji: "☀️", color: "#fcc419",
    dateRange: "23 يوليو – 22 أغسطس", element: "نار", planet: "الشمس",
    traits: "واثق، كريم، قائد بالفطرة، يحب الأضواء.",
    flaws: "مغرور أحيانًا، يحب السيطرة، يتأثر بالنقد.",
    strengths: ["ثقة عالية بالنفس", "كرم وشهامة حقيقية", "قدرة قيادية فطرية"],
    weaknesses: ["الغرور والأنا الكبيرة", "الحاجة للإطراء الدائم", "التسلطية"],
    match: ["الحمل", "القوس", "الميزان"],
    clash: ["الثور", "العقرب"],
    celebrities: { footballEgyptian: "أيمن حفني", footballWorld: "روبرت ليفاندوفسكي", singerMale: "محمد حماقي", singerFemale: "إليسا", actorMale: "كريم عبد العزيز", actorFemale: "مي عمر" },
    yearlyForecast: { general: "عام من الإنجازات والظهور للأسد، الشمس تضيء طريقه طوال 2025.", love: "جاذبية عالية وعلاقات مثيرة، الحب يطرق بابك.", work: "فرص للتميز والقيادة، مشاريع كبيرة في الأفق.", health: "طاقة عالية، انتبه للقلب والضغط.", money: "دخل متصاعد مع الحذر من الإنفاق الزائد." }
  },
  "العذراء": {
    symbol: "♍", emoji: "🌾", color: "#a9e34b",
    dateRange: "23 أغسطس – 22 سبتمبر", element: "تراب", planet: "عطارد",
    traits: "منظم، ذكي، يهتم بالتفاصيل، عملي.",
    flaws: "ينتقد كثيرًا، قلق، يصعب إرضاؤه.",
    strengths: ["دقة وانتباه فائق للتفاصيل", "تحليل منطقي ممتاز", "إخلاص في العمل"],
    weaknesses: ["النقد الزائد للنفس والآخرين", "القلق الدائم", "الكمالية المرهقة"],
    match: ["الثور", "الجدي", "السرطان"],
    clash: ["الجوزاء", "القوس"],
    celebrities: { footballEgyptian: "مصطفى محمد", footballWorld: "لوكا مودريتش", singerMale: "رامي صبري", singerFemale: "شيرين", actorMale: "أحمد رزق", actorFemale: "درة" },
    yearlyForecast: { general: "عام التفوق والاعتراف بالجهود للعذراء، عتارد يدعم ذكاءك.", love: "علاقة هادئة ومتوازنة، العمق أهم من الإثارة.", work: "تميز مهني واضح، مشاريع تفصيلية تنجح بامتياز.", health: "اهتم بالجهاز الهضمي وتوازن التغذية.", money: "تخطيط مالي دقيق يحقق نتائج ممتازة." }
  },
  "الميزان": {
    symbol: "♎", emoji: "⚖️", color: "#da77f2",
    dateRange: "23 سبتمبر – 22 أكتوبر", element: "هواء", planet: "الزهرة",
    traits: "عادل، لبق، اجتماعي، يحب الجمال والتوازن.",
    flaws: "متردد، يتجنب المواجهة، يريد إرضاء الجميع.",
    strengths: ["دبلوماسية وذكاء اجتماعي", "حب للعدل والتوازن", "جمال في التعبير والتواصل"],
    weaknesses: ["التردد في القرارات", "تجنب المواجهة", "الاعتماد على الآخرين"],
    match: ["الجوزاء", "الأسد", "الدلو"],
    clash: ["السرطان", "الجدي"],
    celebrities: { footballEgyptian: "محمود تريزيجيه", footballWorld: "نيمار", singerMale: "وائل جسار", singerFemale: "أصالة", actorMale: "ياسر جلال", actorFemale: "ياسمين عبد العزيز" },
    yearlyForecast: { general: "عام التوازن والانسجام للميزان، الزهرة تبارك علاقاتك وحياتك.", love: "رومانسية عالية، فرص للارتباط الجميل والعمق العاطفي.", work: "تعاونات ناجحة وشراكات مثمرة في 2025.", health: "انتبه لمنطقة الكلى والظهر، الراحة مهمة.", money: "توازن مالي جيد مع فرص ثروة من الشراكات." }
  },
  "العقرب": {
    symbol: "♏", emoji: "🦂", color: "#ff6b9d",
    dateRange: "23 أكتوبر – 21 نوفمبر", element: "ماء", planet: "بلوتو",
    traits: "غامض، قوي الإرادة، وفي لمن يحب، عميق التفكير.",
    flaws: "غيور، انتقامي أحيانًا، يصعب فهمه.",
    strengths: ["إرادة فولاذية وتركيز عالٍ", "ولاء عميق جدًا", "حدس وذكاء عاطفي نادر"],
    weaknesses: ["الغيرة والتملك", "الانتقام عند الجرح", "الإفراط في السرية"],
    match: ["السرطان", "الحوت", "الجدي"],
    clash: ["الأسد", "الدلو"],
    celebrities: { footballEgyptian: "حسام غالي", footballWorld: "دييغو مارادونا", singerMale: "عادل إمام (مطرب وممثل)", singerFemale: "لطيفة", actorMale: "أحمد السقا", actorFemale: "هيفاء وهبي" },
    yearlyForecast: { general: "عام التحول العميق للعقرب، بلوتو يدفعك لتجديد حياتك من الأساس.", love: "علاقات شديدة العمق، إما نهاية أو بداية قوية جديدة.", work: "صعود قوي في المسيرة المهنية مع تحولات جذرية.", health: "اهتم بالجهاز الهرموني والضغط النفسي.", money: "استثمارات ذكية وميراث أو مكاسب غير متوقعة." }
  },
  "القوس": {
    symbol: "♐", emoji: "🏹", color: "#ff9f43",
    dateRange: "22 نوفمبر – 21 ديسمبر", element: "نار", planet: "المشتري",
    traits: "مرح، مغامر، صريح، يعشق الحرية والفلسفة.",
    flaws: "متهور، يصعب التزامه، لا يصبر.",
    strengths: ["تفاؤل معدي وإيجابية دائمة", "مغامرة وعشق للحياة", "فلسفة عميقة وسعة أفق"],
    weaknesses: ["التهور وعدم الصبر", "الوعود التي لا يكملها", "الهروب من الالتزام"],
    match: ["الحمل", "الأسد", "الميزان"],
    clash: ["العذراء", "الحوت"],
    celebrities: { footballEgyptian: "أحمد حسن", footballWorld: "زين الدين زيدان", singerMale: "أحمد جمال", singerFemale: "بوسي", actorMale: "محمد هنيدي", actorFemale: "غادة عبد الرازق" },
    yearlyForecast: { general: "عام مليء بالمغامرات والفرص للقوس، المشتري في صفك طوال 2025.", love: "علاقات مثيرة وعمق جديد، التزامات جادة في النصف الثاني.", work: "فرص خارجية أو عالمية، أفق يتسع أمامك.", health: "طاقة عالية مع الحذر من الإفراط وإهمال الجسد.", money: "حظ مالي جيد ومكاسب من السفر أو التعليم." }
  },
  "الجدي": {
    symbol: "♑", emoji: "🏔️", color: "#868e96",
    dateRange: "22 ديسمبر – 19 يناير", element: "تراب", planet: "زحل",
    traits: "طموح، مسؤول، عملي، يبني المستقبل بصبر.",
    flaws: "بارد في المشاعر أحيانًا، عنيد، يعمل كثيرًا.",
    strengths: ["طموح وانضباط فولاذي", "مسؤولية وجدية لا تضاهى", "بناء مستقبل متين خطوة بخطوة"],
    weaknesses: ["برودة عاطفية أحيانًا", "الصرامة الزائدة", "إهمال الحياة الشخصية للعمل"],
    match: ["الثور", "العذراء", "العقرب"],
    clash: ["الحمل", "الميزان"],
    celebrities: { footballEgyptian: "عصام الحضري", footballWorld: "محمد يوسف (كابتن مصر سابقًا)", singerMale: "محمد فؤاد", singerFemale: "ميريام فارس", actorMale: "خالد النبوي", actorFemale: "إلهام شاهين" },
    yearlyForecast: { general: "عام الحصاد والنتائج للجدي، سنوات العمل الشاق تبدأ في الإثمار.", love: "استقرار وعمق، الجدي يفتح قلبه أكثر هذا العام.", work: "إنجازات كبيرة ووصول لأهداف طال انتظارها.", health: "اهتم بمفاصلك وعظامك، الراحة ضرورة.", money: "ثروة متراكمة واستثمارات طويلة المدى تؤتي ثمارها." }
  },
  "الدلو": {
    symbol: "♒", emoji: "⚡", color: "#4dabf7",
    dateRange: "20 يناير – 18 فبراير", element: "هواء", planet: "أورانوس",
    traits: "مبدع، مستقل، ثوري التفكير، يحب الإنسانية.",
    flaws: "غامض، منفصل عاطفيًا أحيانًا، عنيد برأيه.",
    strengths: ["إبداع وأفكار ثورية", "استقلالية وأصالة نادرة", "إنسانية وحب للعدالة"],
    weaknesses: ["البرود العاطفي", "الغرابة المبالغ فيها", "صعوبة الالتزام"],
    match: ["الجوزاء", "الميزان", "القوس"],
    clash: ["الثور", "العقرب"],
    celebrities: { footballEgyptian: "محمد النني", footballWorld: "كريستيان بولسيك", singerMale: "حميد الشاعري", singerFemale: "ذكرى", actorMale: "أحمد زكي (رحمه الله)", actorFemale: "سمية الخشاب" },
    yearlyForecast: { general: "عام الابتكار والتغيير للدلو، أورانوس يفتح آفاقًا لم تتخيلها.", love: "علاقات غير تقليدية ومثيرة، الحرية شرط أساسي.", work: "مشاريع تقنية وإبداعية تحقق نجاحات كبيرة.", health: "اهتم بالجهاز العصبي والنوم الكافي.", money: "مكاسب من التكنولوجيا والأفكار الجديدة." }
  },
  "الحوت": {
    symbol: "♓", emoji: "🐟", color: "#9775fa",
    dateRange: "19 فبراير – 20 مارس", element: "ماء", planet: "نبتون",
    traits: "رومانسي، حساس، خيالي، فنان بالفطرة.",
    flaws: "يهرب من الواقع، متردد، يُستغل لطيبته.",
    strengths: ["حدس وإحساس فائقان", "إبداع فني وروحاني عميق", "تعاطف وحب غير مشروط"],
    weaknesses: ["الهروب من الواقع", "سهولة التأثر والاستغلال", "التردد والمثالية"],
    match: ["السرطان", "العقرب", "الثور"],
    clash: ["الجوزاء", "القوس"],
    celebrities: { footballEgyptian: "محمد أبو تريكة", footballWorld: "رونالدو البرازيلي", singerMale: "كاظم الساهر", singerFemale: "فيروز", actorMale: "عادل إمام", actorFemale: "فاتن حمامة (رحمها الله)" },
    yearlyForecast: { general: "عام الإلهام والروحانية للحوت، نبتون يمنحك إبداعًا وعمقًا استثنائيًا.", love: "حب عميق وصادق، علاقات روحية نادرة في 2025.", work: "نجاحات في الفنون والإبداع والمجالات الروحية.", health: "اهتم بالنوم والراحة الكاملة، الهدوء ضرورة.", money: "مكاسب من الفن والإبداع والأنشطة الروحية." }
  }
};




// ========================================
// تحديد البرج من التاريخ
// ========================================
function getZodiac(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "الحمل";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "الثور";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "الجوزاء";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "السرطان";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "الأسد";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "العذراء";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "الميزان";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "العقرب";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "القوس";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "الجدي";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "الدلو";
    else return "الحوت";
}

// ========================================
// تهيئة الصفحة
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    populateSignSelectors();
    buildSignsGrid();
    animateEntrance();
    
    // إضافة event listeners
    document.getElementById('birthDate')?.addEventListener('change', checkZodiac);
    document.getElementById('ageBirthDate')?.addEventListener('change', calculateAge);
    document.getElementById('forecastSign')?.addEventListener('change', showForecast);
    document.getElementById('sign1')?.addEventListener('change', updateCompatibility);
    document.getElementById('sign2')?.addEventListener('change', updateCompatibility);
});

// ========================================
// الوظائف الأساسية
// ========================================

// معرفة البرج من تاريخ الميلاد
function checkZodiac() {
    const dateInput = document.getElementById('birthDate')?.value;
    const result = document.getElementById('result');
    
    if (!result || !dateInput) return;

    if (!dateInput) {
        result.innerHTML = '⚠️ من فضلك اختر تاريخ الميلاد أولًا';
        result.classList.remove('hidden');
        return;
    }

    const birthDate = new Date(dateInput);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const zodiac = getZodiac(day, month);
    const info = zodiacData[zodiac];

    result.style.setProperty('--result-color', info.color);
    result.style.borderColor = info.color;
    result.classList.remove('hidden');

    result.innerHTML = `
        <div class="result-header" style="color:${info.color}">
            <span class="result-symbol">${info.symbol}</span>
            <span class="result-name">برجك هو: ${zodiac}</span>
        </div>
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">📅 الفترة</span>
                <span>${info.dateRange}</span>
            </div>
            <div class="result-item">
                <span class="result-label">🔥 العنصر</span>
                <span>${info.element}</span>
            </div>
            <div class="result-item">
                <span class="result-label">🪐 الكوكب</span>
                <span>${info.planet}</span>
            </div>
        </div>
        <div class="result-section">
            <div class="result-label">✨ الصفات</div>
            <p>${info.traits}</p>
        </div>
        <div class="result-section">
            <div class="result-label">⚡ نقاط الضعف</div>
            <p>${info.flaws}</p>
        </div>
        <div class="result-compat">
            <div class="compat-group">
                <div class="result-label">💚 يتوافق مع</div>
                <div class="compat-tags">
                    ${info.match.map(s=>`<span class="tag tag-good" onclick="quickCompat('${zodiac}','${s}')">${zodiacData[s]?.symbol||''} ${s}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="result-footer">
            <button onclick="openSignModal('${zodiac}')" style="background:${info.color}">
                🔍 عرض تفاصيل أكثر
            </button>
        </div>
    `;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// حساب العمر بالتفصيل
function calculateAge() {
    const dateInput = document.getElementById('ageBirthDate')?.value;
    const resultDiv = document.getElementById('ageResult');

    if (!resultDiv || !dateInput) return;

    if (!dateInput) {
        resultDiv.innerHTML = '⚠️ من فضلك اختر تاريخ الميلاد أولًا';
        resultDiv.classList.remove('hidden');
        return;
    }

    const birth = new Date(dateInput);
    const now = new Date();

    if (birth > now) {
        resultDiv.innerHTML = '⚠️ تاريخ الميلاد لا يمكن أن يكون في المستقبل!';
        resultDiv.classList.remove('hidden');
        return;
    }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const zodiac = getZodiac(birth.getDate(), birth.getMonth() + 1);
    const info = zodiacData[zodiac];

    let ageMsg = '';
    if (years < 13) ageMsg = '🌱 في بداية رحلة الحياة الجميلة!';
    else if (years < 20) ageMsg = '🔥 سنوات الشباب والأحلام الكبيرة!';
    else if (years < 30) ageMsg = '⚡ عقد العشرينيات — أقوى سنوات العمر!';
    else if (years < 40) ageMsg = '🌟 الثلاثينيات — النضج والإنجاز!';
    else if (years < 50) ageMsg = '👑 الأربعينيات — حكمة وخبرة لا تُشترى!';
    else if (years < 60) ageMsg = '💎 الخمسينيات — قمة العطاء والحكمة!';
    else ageMsg = '🌳 شجرة أصيلة لها جذور عميقة وثمار طيبة!';

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="age-display">
            <div class="age-main" style="color:${info.color}">
                <span class="age-number">${years}</span>
                <span class="age-unit">سنة</span>
                <span class="age-sep">و</span>
                <span class="age-number">${months}</span>
                <span class="age-unit">شهر</span>
                <span class="age-sep">و</span>
                <span class="age-number">${days}</span>
                <span class="age-unit">يوم</span>
            </div>
            <div class="age-msg">${ageMsg}</div>
            <div class="age-zodiac">
                برجك: <span style="color:${info.color}">${info.symbol} ${zodiac}</span>
            </div>
        </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// الوظائف الإضافية
// ========================================
function createStars() {
    const layer = document.getElementById('starsLayer');
    if (!layer) return;
    for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.cssText = `
            width:${size}px; height:${size}px;
            top:${Math.random()*100}%; left:${Math.random()*100}%;
            animation-delay:${Math.random()*4}s;
            animation-duration:${2+Math.random()*3}s;
            opacity:${0.3+Math.random()*0.7};
        `;
        layer.appendChild(star);
    }
}

function populateSignSelectors() {
    const selectors = ['sign1', 'sign2', 'forecastSign'];
    selectors.forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;
        Object.keys(zodiacData).forEach(sign => {
            const opt = document.createElement('option');
            opt.value = sign;
            opt.textContent = `${zodiacData[sign].symbol} ${sign}`;
            sel.appendChild(opt);
        });
    });
}

function buildSignsGrid() {
    const grid = document.getElementById('signsGrid');
    if (!grid) return;
    Object.keys(zodiacData).forEach(sign => {
        const info = zodiacData[sign];
        const card = document.createElement('div');
        card.classList.add('sign-card');
        card.style.setProperty('--sign-color', info.color);
        card.innerHTML = `
            <div class="sign-card-symbol">${info.symbol}</div>
            <div class="sign-card-name">${sign}</div>
        `;
        card.addEventListener('click', () => openSignModal(sign));
        grid.appendChild(card);
    });
}

function animateEntrance() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('fade-section');
        observer.observe(s);
    });
}

// Modal functions
function openSignModal(sign) {
    const info = zodiacData[sign];
    const modal = document.getElementById('signModal');
    const body = document.getElementById('modalBody');
    
    if (!modal || !body) return;
    
    body.innerHTML = `
        <div class="modal-sign-header" style="--mc:${info.color}">
            <div class="modal-symbol">${info.symbol}</div>
            <div class="modal-sign-info">
                <h2>${sign} ${info.emoji}</h2>
                <p>${info.dateRange}</p>
            </div>
        </div>
        <div class="modal-desc">${info.description}</div>
        <div class="modal-section">
            <h3>✨ الصفات</h3>
            <p>${info.traits}</p>
        </div>
        <button onclick="closeModal()" class="modal-close">✕</button>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('signModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function quickCompat(sign1, sign2) {
    const s1 = document.getElementById('sign1');
    const s2 = document.getElementById('sign2');
    const compatSection = document.getElementById('compatibility');
    
    if (s1) s1.value = sign1;
    if (s2) s2.value = sign2;
    if (compatSection) compatSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(updateCompatibility, 400);
}

function updateCompatibility() {
    const sign1 = document.getElementById('sign1')?.value;
    const sign2 = document.getElementById('sign2')?.value;
    const resultDiv = document.getElementById('compatResult');
    
    if (!resultDiv || !sign1 || !sign2) return;

    const info1 = zodiacData[sign1];
    const info2 = zodiacData[sign2];
    
    let score = 50, level = 'متوسط', levelClass = 'medium';
    if (info1.match.includes(sign2)) {
        score = 85; level = 'ممتاز'; levelClass = 'great';
    } else if (info1.clash.includes(sign2)) {
        score = 30; level = 'صعب'; levelClass = 'hard';
    } else if (sign1 === sign2) {
        score = 75; level = 'نفس البرج'; levelClass = 'same';
    }

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="compat-display">
            <div style="color:${info1.color}">${info1.symbol} ${sign1}</div>
            <div>💞</div>
            <div style="color:${info2.color}">${info2.symbol} ${sign2}</div>
            <div>التوافق: ${score}% - ${level}</div>
        </div>
    `;
}

// إغلاق Modal عند الضغط على Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
