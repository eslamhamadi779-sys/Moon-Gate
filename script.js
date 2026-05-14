

// ========================================
// script.js - موقع الأبراج الكامل والمستقل
// ========================================
// بيانات الأبراج (data.js مدمج)
// ========================================
// بيانات الأبراج الكاملة
// ========================================
const zodiacData = {
    "الحمل": {
        symbol: "♈", emoji: "🔥", color: "#ff6b6b", colorLight: "#ff8e8e",
        dateRange: "21 مارس - 19 أبريل", element: "ناري", planet: "المريخ",
        description: "الأول والأقوى! الحمل يحب التحدي والمغامرة.",
        traits: "شجاع، نشيط، قيادي، يحب التحدي.",
        flaws: "متسرع، عصبي أحيانًا، عنيد.",
        strengths: ["القوة", "الشجاعة", "الطاقة العالية", "الإصرار"],
        weaknesses: ["التهور", "العصبية", "العناد"],
        match: ["الأسد", "القوس", "الجوزاء"],
        clash: ["السرطان", "الجدي"],
        celebrities: {
            footballEgyptian: "محمد صلاح", footballWorld: "كريستيانو رونالدو",
            singerMale: "عمرو دياب", singerFemale: "شيرين عبد الوهاب",
            actorMale: "محمد رمضان", actorFemale: "منى زكي"
        },
        yearlyForecast: {
            general: "عام مليء بالفرص والطاقة الإيجابية!",
            love: "علاقات عاطفية قوية ورومانسية.",
            work: "ترقيات ونجاحات مهنية كبيرة.",
            health: "حافظ على التوازن والرياضة.",
            money: "استثمارات ناجحة ودخل جيد."
        }
    },
    "الثور": {
        symbol: "♉", emoji: "🌿", color: "#4ecdc4", colorLight: "#7be1d9",
        dateRange: "20 أبريل - 20 مايو", element: "أرضي", planet: "الزهرة",
        description: "الثور مستقر وموثوق، يحب الجمال والراحة.",
        traits: "عملي، صبور، وفي، يحب الاستقرار.",
        flaws: "عنيد، بطيء التغيير، غيور.",
        strengths: ["الصبر", "الوفاء", "العمل الجاد"],
        weaknesses: ["العناد", "الغيرة", "التمسك بالمعتاد"],
        match: ["العذراء", "الجدي", "السرطان"],
        clash: ["الأسد", "الدلو"],
        celebrities: {
            footballEgyptian: "هاني الشوربجي", footballWorld: "ليونيل ميسي",
            singerMale: "تامر حسني", singerFemale: "أصالة نصري",
            actorMale: "كريم عبد العزيز", actorFemale: "هند صبري"
        },
        yearlyForecast: {
            general: "استقرار ونجاح في جميع المجالات.",
            love: "علاقات مستقرة ورومانسية عميقة.",
            work: "استقرار وظيفي ومكافآت.",
            health: "صحة جيدة، ركز على التغذية.",
            money: "ادخار ناجح واستثمارات آمنة."
        }
    },
    "الجوزاء": {
        symbol: "♊", emoji: "💨", color: "#45b7d1", colorLight: "#7fd4f0",
        dateRange: "21 مايو - 20 يونيو", element: "هوائي", planet: "عطارد",
        description: "الجوزاء ذكي واجتماعي، يحب التنوع والتواصل.",
        traits: "ذكي، اجتماعي، سريع التعلم.",
        flaws: "متقلب، مشتت، مزاجي.",
        strengths: ["الذكاء", "التواصل", "المرونة"],
        weaknesses: ["التقلب", "التشتت", "عدم الاستقرار"],
        match: ["الميزان", "الدلو", "الحمل"],
        clash: ["العذراء", "الحوت"],
        celebrities: {
            footballEgyptian: "عبد الرحمن فكري", footballWorld: "نيمار",
            singerMale: "محمد حماقي", singerFemale: "نانسي عجرم",
            actorMale: "أحمد حلمي", actorFemale: "ياسمين عبد العزيز"
        },
        yearlyForecast: {
            general: "عام مليء بالفرص والتغييرات الإيجابية.",
            love: "لقاءات مثيرة وعلاقات جديدة.",
            work: "فرص وظيفية متعددة ونجاح.",
            health: "حافظ على الطاقة والنوم.",
            money: "دخل متنوع وممتع."
        }
    },
    "السرطان": {
        symbol: "♋", emoji: "🌊", color: "#96ceb4", colorLight: "#b8e6c9",
        dateRange: "21 يونيو - 22 يوليو", element: "مائي", planet: "القمر",
        description: "السرطان عاطفي وحنون، يحب العائلة والأمان.",
        traits: "حنون، عاطفي، مخلص.",
        flaws: "حساس جدًا، متردد، انطوائي.",
        strengths: ["الحنان", "الوفاء", "الحدس"],
        weaknesses: ["الحساسية الزائدة", "التردد", "الانطواء"],
        match: ["الثور", "الحوت", "العقرب"],
        clash: ["الحمل", "الميزان"],
        celebrities: {
            footballEgyptian: "محمود عبد الرازق", footballWorld: "كيليان مبابي",
            singerMale: "رامي صبري", singerFemale: "ملكة",
            actorMale: "محمد هنيدي", actorFemale: "غادة عادل"
        },
        yearlyForecast: {
            general: "عام عائلي دافئ ومستقر.",
            love: "علاقات عاطفية عميقة ومستقرة.",
            work: "استقرار ودعم من العائلة.",
            health: "ركز على الصحة النفسية.",
            money: "استقرار مالي جيد."
        }
    },
    "الأسد": {
        symbol: "♌", emoji: "🦁", color: "#feca57", colorLight: "#fedc7e",
        dateRange: "23 يوليو - 22 أغسطس", element: "ناري", planet: "الشمس",
        description: "الأسد قائد بالفطرة، يحب الظهور والتألق.",
        traits: "واثق، كريم، قائد بالفطرة.",
        flaws: "مغرور أحيانًا، يحب السيطرة.",
        strengths: ["الثقة", "الكرم", "القيادة"],
        weaknesses: ["الغرور", "حب السيطرة", "الإسراف"],
        match: ["الحمل", "القوس", "الميزان"],
        clash: ["الثور", "العقرب"],
        celebrities: {
            footballEgyptian: "أحمد حسن", footballWorld: "زين الدين زيدان",
            singerMale: "عبد الحليم حافظ", singerFemale: "أم كلثوم",
            actorMale: "عادل إمام", actorFemale: "فاتن حمامة"
        },
        yearlyForecast: {
            general: "عام تألق ونجاح كبير!",
            love: "رومانسية وجاذبية لا تقاوم.",
            work: "قيادة ونجاحات كبيرة.",
            health: "طاقة عالية، حافظ على التوازن.",
            money: "دخل ممتاز واستثمارات."
        }
    },
    "العذراء": {
        symbol: "♍", emoji: "📚", color: "#ff9ff3", colorLight: "#ffb3f5",
        dateRange: "23 أغسطس - 22 سبتمبر", element: "أرضي", planet: "عطارد",
        description: "العذراء منظم وذكي، يهتم بالتفاصيل.",
        traits: "منظم، ذكي، يهتم بالتفاصيل.",
        flaws: "ناقد كثيرًا، قلق.",
        strengths: ["التنظيم", "الذكاء", "الدقة"],
        weaknesses: ["النقد الزائد", "القلق", "الكمالية"],
        match: ["الثور", "الجدي", "السرطان"],
        clash: ["الجوزاء", "القوس"],
        celebrities: {
            footballEgyptian: "حسام حسن", footballWorld: "أندريس إنييستا",
            singerMale: "محمد عبده", singerFemale: "نجوى كرم",
            actorMale: "خالد النبوي", actorFemale: "نيللي كريم"
        },
        yearlyForecast: {
            general: "عام نجاح وإنجازات منظمة.",
            love: "علاقات مستقرة وجدية.",
            work: "ترقيات ومشاريع ناجحة.",
            health: "صحة ممتازة، استمر في الروتين.",
            money: "تخطيط مالي ناجح."
        }
    },
    "الميزان": {
        symbol: "♎", emoji: "⚖️", color: "#54a0ff", colorLight: "#89b8ff",
        dateRange: "23 سبتمبر - 22 أكتوبر", element: "هوائي", planet: "الزهرة",
        description: "الميزان عادل واجتماعي، يحب الجمال والتوازن.",
        traits: "عادل، لبق، اجتماعي.",
        flaws: "متردد، يتجنب المواجهة.",
        strengths: ["العدل", "اللباقة", "الجاذبية"],
        weaknesses: ["التردد", "تجنب المواجهة", "الاعتمادية"],
        match: ["الجوزاء", "الأسد", "الدلو"],
        clash: ["السرطان", "الجدي"],
        celebrities: {
            footballEgyptian: "محمد أبو تريكة", footballWorld: "لويس فيغو",
            singerMale: "كاظم الساهر", singerFemale: "ديانا حداد",
            actorMale: "أشرف عبد الباقي", actorFemale: "مايا نصري"
        },
        yearlyForecast: {
            general: "عام توازن وعلاقات اجتماعية رائعة.",
            love: "رومانسية وعلاقات متناغمة.",
            work: "شراكات ناجحة ونجاح.",
            health: "توازن جيد، مارس الرياضة.",
            money: "دخل من الشراكات."
        }
    },
    "العقرب": {
        symbol: "♏", emoji: "🦂", color: "#5f27cd", colorLight: "#8b5fff",
        dateRange: "23 أكتوبر - 21 نوفمبر", element: "مائي", planet: "بلوتو",
        description: "العقرب غامض وقوي، يحب العمق والصدق.",
        traits: "غامض، قوي، وفي.",
        flaws: "غيور، انتقامي أحيانًا.",
        strengths: ["القوة", "الوفاء", "الحدس"],
        weaknesses: ["الغيرة", "الانتقام", "السرية الزائدة"],
        match: ["السرطان", "الحوت", "الجدي"],
        clash: ["الأسد", "الدلو"],
        celebrities: {
            footballEgyptian: "شادي محمد", footballWorld: "روبرت ليفاندوفسكي",
            singerMale: "مجدي الجبالي", singerFemale: "سلمى الشبلي",
            actorMale: "سامح حسين", actorFemale: "هبة الدري"
        },
        yearlyForecast: {
            general: "عام تحولات إيجابية وقوة داخلية.",
            love: "عواطف عميقة وعلاقات صادقة.",
            work: "نجاحات كبيرة وترقيات.",
            health: "قوة بدنية، حافظ على التوازن.",
            money: "استثمارات ناجحة."
        }
    },
    "القوس": {
        symbol: "♐", emoji: "🏹", color: "#00d2d3", colorLight: "#4af1f4",
        dateRange: "22 نوفمبر - 21 ديسمبر", element: "ناري", planet: "المشتري",
        description: "القوس مغامر وصريح، يحب الحرية والسفر.",
        traits: "مرح، مغامر، صريح.",
        flaws: "متهور، لا يحب القيود.",
        strengths: ["المرح", "المغامرة", "الصراحة"],
        weaknesses: ["التهور", "عدم الالتزام", "الإفراط"],
        match: ["الحمل", "الأسد", "الميزان"],
        clash: ["العذراء", "الحوت"],
        celebrities: {
            footballEgyptian: "مصطفى محمد", footballWorld: "كيفن دي بروين",
            singerMale: "حمزة نمرة", singerFemale: "مي كساب",
            actorMale: "مصطفى شعبان", actorFemale: "دنيا"
        },
        yearlyForecast: {
            general: "عام مغامرات وسفر وفرص جديدة!",
            love: "مغامرات رومانسية مثيرة.",
            work: "فرص دولية وتوسع.",
            health: "طاقة عالية، مارس الرياضة.",
            money: "دخل من مصادر متنوعة."
        }
    },
    "الجدي": {
        symbol: "♑", emoji: "🗻", color: "#574b90", colorLight: "#7d6bc9",
        dateRange: "22 ديسمبر - 19 يناير", element: "أرضي", planet: "زحل",
        description: "الجدي طموح وعملي، يحب النجاح والمسؤولية.",
        traits: "طموح، مسؤول، عملي.",
        flaws: "بارد أحيانًا، عنيد.",
        strengths: ["الطموح", "المسؤولية", "الانضباط"],
        weaknesses: ["البرود", "العناد", "الجدية الزائدة"],
        match: ["الثور", "العذراء", "العقرب"],
        clash: ["الحمل", "الميزان"],
        celebrities: {
            footballEgyptian: "عصام الحضري", footballWorld: "سيرجيو راموس",
            singerMale: "محمد منير", singerFemale: "سعاد حسني",
            actorMale: "يحيى الفخراني", actorFemale: "سعاد حسني"
        },
        yearlyForecast: {
            general: "عام إنجازات ونجاح مهني كبير.",
            love: "علاقات جدية ومستقرة.",
            work: "ترقيات كبيرة ونجاح.",
            health: "صحة جيدة، حافظ على الروتين.",
            money: "نجاح مالي كبير."
        }
    },
    "الدلو": {
        symbol: "♒", emoji: "⚡️", color: "#f39c12", colorLight: "#f8b855",
        dateRange: "20 يناير - 18 فبراير", element: "هوائي", planet: "أورانوس",
        description: "الدلو مبدع ومستقل، يحب التغيير والابتكار.",
        traits: "مبدع، مستقل، ذكي.",
        flaws: "غامض، عنيد، بارد.",
        strengths: ["الإبداع", "الاستقلال", "الذكاء"],
        weaknesses: ["الغموض", "العناد", "البرود"],
        match: ["الجوزاء", "الميزان", "القوس"],
        clash: ["الثور", "العقرب"],
        celebrities: {
            footballEgyptian: "محمد الشناوي", footballWorld: "هاري كين",
            singerMale: "عصام كركر", singerFemale: "مي عز الدين",
            actorMale: "طارق لطفي", actorFemale: "ريم مصطفى"
        },
        yearlyForecast: {
            general: "عام إبداع وابتكارات جديدة.",
            love: "علاقات مثيرة وغير تقليدية.",
            work: "مشاريع مبتكرة ونجاح.",
            health: "طاقة عالية، جرب أشياء جديدة.",
            money: "دخل من أفكار مبتكرة."
        }
    },
    "الحوت": {
        symbol: "♓", emoji: "🐟", color: "#e17055", colorLight: "#f28c7e",
        dateRange: "19 فبراير - 20 مارس", element: "مائي", planet: "النبتون",
        description: "الحوت رومانسي وحساس، يعيش في عالم الخيال.",
        traits: "رومانسي، حساس، خيالي.",
        flaws: "يهرب من الواقع، متردد.",
        strengths: ["الرومانسية", "الحساسية", "الخيال"],
        weaknesses: ["الهروب من الواقع", "التردد", "الحساسية الزائدة"],
        match: ["السرطان", "العقرب", "الثور"],
        clash: ["الجوزاء", "القوس"],
        celebrities: {
            footballEgyptian: "باسم مرسي", footballWorld: "غاريث بيل",
            singerMale: "عبد المجيد عبد الله", singerFemale: "حلا التركي",
            actorMale: "سيد رجب", actorFemale: "ناهد السباعي"
        },
        yearlyForecast: {
            general: "عام رومانسي وإبداعي رائع.",
            love: "رومانسية عميقة ومشاعر صادقة.",
            work: "نجاح في المجالات الفنية.",
            health: "ركز على الصحة النفسية.",
            money: "دخل من المشاريع الإبداعية."
        }
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
