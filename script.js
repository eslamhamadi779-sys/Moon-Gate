// ========================================
// script.js - المنطق الرئيسي للموقع
// يعتمد على zodiacData و getZodiac من data.js
// ========================================
 
// ========================================
// تهيئة الصفحة
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    populateSignSelectors();
    buildSignsGrid();
    animateEntrance();
});
 
// ========================================
// إنشاء النجوم في الخلفية
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
 
// ========================================
// ملء قوائم الأبراج
// ========================================
function populateSignSelectors() {
    ['sign1', 'sign2', 'forecastSign'].forEach(id => {
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
 
// ========================================
// بناء شبكة الأبراج
// ========================================
function buildSignsGrid() {
    const grid = document.getElementById('signsGrid');
    if (!grid) return;
    Object.keys(zodiacData).forEach(sign => {
        const info = zodiacData[sign];
        const card = document.createElement('div');
        card.classList.add('sign-card');
        card.style.setProperty('--sign-color', info.color);
        card.style.setProperty('--sign-light', info.colorLight);
        card.innerHTML = `
            <div class="sign-card-symbol">${info.symbol}</div>
            <div class="sign-card-name">${sign}</div>
            <div class="sign-card-date">${info.dateRange}</div>
            <div class="sign-card-element">${info.element}</div>
        `;
        card.addEventListener('click', () => openSignModal(sign));
        grid.appendChild(card);
    });
}
 
// ========================================
// معرفة البرج من تاريخ الميلاد
// ========================================
function checkZodiac() {
    const dateInput = document.getElementById('birthDate')?.value;
    const result = document.getElementById('result');
    if (!result) return;
 
    if (!dateInput) {
        result.innerHTML = '<p style="color:#ff6b6b">⚠️ من فضلك اختر تاريخ الميلاد أولًا</p>';
        result.classList.remove('hidden');
        return;
    }
 
    const birthDate = new Date(dateInput);
    const day   = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const zodiac = getZodiac(day, month);
    const info   = zodiacData[zodiac];
 
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
                    ${info.match.map(s => `
                        <span class="tag tag-good" onclick="quickCompat('${zodiac}','${s}')">
                            ${zodiacData[s]?.symbol || ''} ${s}
                        </span>`).join('')}
                </div>
            </div>
            <div class="compat-group">
                <div class="result-label">❤️ يختلف مع</div>
                <div class="compat-tags">
                    ${info.clash.map(s => `
                        <span class="tag tag-bad">
                            ${zodiacData[s]?.symbol || ''} ${s}
                        </span>`).join('')}
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
 
// ========================================
// حساب العمر بالتفصيل
// ========================================
function calculateAge() {
    const dateInput = document.getElementById('ageBirthDate')?.value;
    const resultDiv = document.getElementById('ageResult');
    if (!resultDiv) return;
 
    if (!dateInput) {
        resultDiv.innerHTML = '<p style="color:#ff6b6b">⚠️ من فضلك اختر تاريخ الميلاد أولًا</p>';
        resultDiv.classList.remove('hidden');
        return;
    }
 
    const birth = new Date(dateInput);
    const now   = new Date();
 
    if (birth > now) {
        resultDiv.innerHTML = '<p style="color:#ff6b6b">⚠️ تاريخ الميلاد لا يمكن أن يكون في المستقبل!</p>';
        resultDiv.classList.remove('hidden');
        return;
    }
 
    let years  = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth()    - birth.getMonth();
    let days   = now.getDate()     - birth.getDate();
 
    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) { years--; months += 12; }
 
    const diffMs    = now - birth;
    const totalDays = Math.floor(diffMs / 86400000);
    const totalHrs  = Math.floor(diffMs / 3600000);
    const totalMins = Math.floor(diffMs / 60000);
 
    const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1);
    const daysLeft = Math.ceil((nextBday - now) / 86400000);
 
    const zodiac = getZodiac(birth.getDate(), birth.getMonth() + 1);
    const info   = zodiacData[zodiac];
 
    let ageMsg = '';
    if      (years < 13) ageMsg = '🌱 في بداية رحلة الحياة الجميلة!';
    else if (years < 20) ageMsg = '🔥 سنوات الشباب والأحلام الكبيرة!';
    else if (years < 30) ageMsg = '⚡ عقد العشرينيات — أقوى سنوات العمر!';
    else if (years < 40) ageMsg = '🌟 الثلاثينيات — النضج والإنجاز!';
    else if (years < 50) ageMsg = '👑 الأربعينيات — حكمة وخبرة لا تُشترى!';
    else if (years < 60) ageMsg = '💎 الخمسينيات — قمة العطاء والحكمة!';
    else                 ageMsg = '🌳 شجرة أصيلة لها جذور عميقة وثمار طيبة!';
 
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="age-display">
            <div class="age-main" style="color:${info.color}">
                <span class="age-number">${years}</span><span class="age-unit">سنة</span>
                <span class="age-sep">و</span>
                <span class="age-number">${months}</span><span class="age-unit">شهر</span>
                <span class="age-sep">و</span>
                <span class="age-number">${days}</span><span class="age-unit">يوم</span>
            </div>
            <div class="age-msg">${ageMsg}</div>
            <div class="age-stats">
                <div class="age-stat">
                    <div class="age-stat-num" style="color:${info.color}">${totalDays.toLocaleString('ar-EG')}</div>
                    <div class="age-stat-label">يوم عشته</div>
                </div>
                <div class="age-stat">
                    <div class="age-stat-num" style="color:${info.color}">${totalHrs.toLocaleString('ar-EG')}</div>
                    <div class="age-stat-label">ساعة</div>
                </div>
                <div class="age-stat">
                    <div class="age-stat-num" style="color:${info.color}">${totalMins.toLocaleString('ar-EG')}</div>
                    <div class="age-stat-label">دقيقة</div>
                </div>
                <div class="age-stat">
                    <div class="age-stat-num" style="color:#fbbf24">${daysLeft}</div>
                    <div class="age-stat-label">يوم لعيد ميلادك 🎂</div>
                </div>
            </div>
            <div class="age-zodiac">
                برجك: <span style="color:${info.color}">${info.symbol} ${zodiac}</span>
                &nbsp;|&nbsp; ${info.element} &nbsp;|&nbsp; ${info.planet}
            </div>
        </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
// ========================================
// عرض التوقعات السنوية
// ========================================
function showForecast() {
    const sign      = document.getElementById('forecastSign')?.value;
    const resultDiv = document.getElementById('forecastResult');
    if (!resultDiv) return;
 
    if (!sign) {
        resultDiv.classList.add('hidden');
        return;
    }
 
    const info = zodiacData[sign];
    const f    = info.yearlyForecast;
 
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="forecast-card" style="--fc:${info.color}; --fl:${info.colorLight}">
            <div class="forecast-header">
                <span class="forecast-symbol" style="color:${info.color}">${info.symbol}</span>
                <div>
                    <h3 style="color:${info.color}">${sign} — توقعات 2025</h3>
                    <p style="color:var(--text-muted)">${info.dateRange} &nbsp;|&nbsp; ${info.element}</p>
                </div>
            </div>
 
            <div class="forecast-general">${f.general}</div>
 
            <div class="forecast-grid">
                <div class="forecast-item">
                    <div class="forecast-icon">❤️</div>
                    <h4>الحب والعلاقات</h4>
                    <p>${f.love}</p>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon">💼</div>
                    <h4>العمل والمهنة</h4>
                    <p>${f.work}</p>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon">🏥</div>
                    <h4>الصحة والجسد</h4>
                    <p>${f.health}</p>
                </div>
                <div class="forecast-item">
                    <div class="forecast-icon">💰</div>
                    <h4>المال والاستثمار</h4>
                    <p>${f.money}</p>
                </div>
            </div>
        </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
// ========================================
// حساب التوافق بين برجين
// ========================================
function updateCompatibility() {
    const sign1     = document.getElementById('sign1')?.value;
    const sign2     = document.getElementById('sign2')?.value;
    const resultDiv = document.getElementById('compatResult');
    if (!resultDiv || !sign1 || !sign2) return;
 
    const info1 = zodiacData[sign1];
    const info2 = zodiacData[sign2];
 
    let score, level, levelClass, message;
 
    if (info1.match.includes(sign2)) {
        score = 80 + Math.floor(Math.random() * 18);
        level = 'توافق ممتاز 💚'; levelClass = 'great';
        message = `${sign1} و${sign2} توافقهم رائع! يكمل كل منهم الآخر بشكل طبيعي. علاقتهم مبنية على تفاهم عميق ومشاعر صادقة.`;
    } else if (info1.clash.includes(sign2)) {
        score = 20 + Math.floor(Math.random() * 20);
        level = 'توافق صعب ❤️'; levelClass = 'hard';
        message = `${sign1} و${sign2} قد يواجهوا تحديات في الفهم المتبادل. لكن مع الصبر والحوار يمكن بناء علاقة قوية رغم الاختلافات.`;
    } else if (sign1 === sign2) {
        score = 70 + Math.floor(Math.random() * 20);
        level = 'توافق النفس مع النفس 🌀'; levelClass = 'same';
        message = `برجان متشابهان يفهمان بعض تلقائيًا، لكن قد تظهر نفس العيوب مضاعفة!`;
    } else {
        score = 50 + Math.floor(Math.random() * 25);
        level = 'توافق متوسط 💛'; levelClass = 'medium';
        message = `${sign1} و${sign2} علاقتهم تعتمد على الجهد المشترك. الفهم والاحترام هو مفتاحهم.`;
    }
 
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="compat-display">
            <div class="compat-signs-display">
                <div class="compat-sign-big" style="--c:${info1.color}">
                    <div class="big-symbol">${info1.symbol}</div>
                    <div class="big-name">${sign1}</div>
                </div>
                <div class="compat-heart">💞</div>
                <div class="compat-sign-big" style="--c:${info2.color}">
                    <div class="big-symbol">${info2.symbol}</div>
                    <div class="big-name">${sign2}</div>
                </div>
            </div>
            <div class="compat-score-area">
                <div class="score-label">${level}</div>
                <div class="score-bar-bg">
                    <div class="score-bar ${levelClass}" style="width:${score}%"></div>
                </div>
                <div class="score-number">${score}%</div>
            </div>
            <div class="compat-message">${message}</div>
        </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
function quickCompat(sign1, sign2) {
    const s1 = document.getElementById('sign1');
    const s2 = document.getElementById('sign2');
    if (s1) s1.value = sign1;
    if (s2) s2.value = sign2;
    document.getElementById('compatibility')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(updateCompatibility, 400);
}
 
// ========================================
// Modal — تفاصيل البرج الكاملة
// ========================================
function openSignModal(sign) {
    const info  = zodiacData[sign];
    const modal = document.getElementById('signModal');
    const body  = document.getElementById('modalBody');
    if (!modal || !body) return;
 
    const c = info.celebrities;
    const f = info.yearlyForecast;
 
    body.innerHTML = `
        <div class="modal-sign-header" style="--mc:${info.color}; --ml:${info.colorLight}">
            <div class="modal-symbol">${info.symbol}</div>
            <div class="modal-sign-info">
                <h2>${sign} ${info.emoji}</h2>
                <p>${info.dateRange}</p>
                <p>${info.element} &nbsp;|&nbsp; ${info.planet}</p>
            </div>
        </div>
 
        <div class="modal-desc">${info.description}</div>
 
        <div class="modal-sections">
            <div class="modal-section">
                <h3>✨ الصفات</h3>
                <p>${info.traits}</p>
            </div>
            <div class="modal-section">
                <h3>⚡ نقاط الضعف</h3>
                <p>${info.flaws}</p>
            </div>
            <div class="modal-section">
                <h3>💪 نقاط القوة</h3>
                <ul>${info.strengths.map(s => `<li>✅ ${s}</li>`).join('')}</ul>
            </div>
            <div class="modal-section">
                <h3>⚠️ الضعف بالتفصيل</h3>
                <ul>${info.weaknesses.map(w => `<li>🔸 ${w}</li>`).join('')}</ul>
            </div>
        </div>
 
        <div class="modal-celebrities" style="--mc:${info.color}">
            <h3>🌟 مشاهير برج ${sign}</h3>
            <div class="celeb-grid">
                <div class="celeb-item">
                    <div class="celeb-icon">⚽</div>
                    <div class="celeb-label">لاعب كورة مصري</div>
                    <div class="celeb-name">${c.footballEgyptian}</div>
                </div>
                <div class="celeb-item">
                    <div class="celeb-icon">🌍</div>
                    <div class="celeb-label">لاعب كورة عالمي</div>
                    <div class="celeb-name">${c.footballWorld}</div>
                </div>
                <div class="celeb-item">
                    <div class="celeb-icon">🎤</div>
                    <div class="celeb-label">مطرب مصري</div>
                    <div class="celeb-name">${c.singerMale}</div>
                </div>
                <div class="celeb-item">
                    <div class="celeb-icon">🎵</div>
                    <div class="celeb-label">مطربة</div>
                    <div class="celeb-name">${c.singerFemale}</div>
                </div>
                <div class="celeb-item">
                    <div class="celeb-icon">🎬</div>
                    <div class="celeb-label">ممثل مصري</div>
                    <div class="celeb-name">${c.actorMale}</div>
                </div>
                <div class="celeb-item">
                    <div class="celeb-icon">🎭</div>
                    <div class="celeb-label">ممثلة مصرية</div>
                    <div class="celeb-name">${c.actorFemale}</div>
                </div>
            </div>
        </div>
 
        <div class="modal-forecast" style="--mc:${info.color}">
            <h3>🔭 توقعات 2026</h3>
            <p class="forecast-general-mini">${f.general}</p>
            <div class="forecast-grid-mini">
                <div class="forecast-mini-item"><span>❤️ الحب</span><p>${f.love}</p></div>
                <div class="forecast-mini-item"><span>💼 العمل</span><p>${f.work}</p></div>
                <div class="forecast-mini-item"><span>🏥 الصحة</span><p>${f.health}</p></div>
                <div class="forecast-mini-item"><span>💰 المال</span><p>${f.money}</p></div>
            </div>
        </div>
 
        <div class="modal-compat">
            <h3>💫 التوافق مع الأبراج</h3>
            <div class="modal-compat-grid">
                ${Object.keys(zodiacData).map(s => {
                    const isMatch = info.match.includes(s);
                    const isClash = info.clash.includes(s);
                    const isSelf  = s === sign;
                    let cls = 'compat-neutral', icon = '💛';
                    if (isMatch) { cls = 'compat-match'; icon = '💚'; }
                    if (isClash) { cls = 'compat-clash'; icon = '🔴'; }
                    if (isSelf)  { cls = 'compat-self';  icon = '🔵'; }
                    return `
                        <div class="compat-item ${cls}"
                             onclick="closeModal(); quickCompat('${sign}','${s}')">
                            <span>${zodiacData[s].symbol}</span>
                            <span>${s}</span>
                            <span>${icon}</span>
                        </div>`;
                }).join('')}
            </div>
            <div class="compat-legend">
                <span>💚 توافق ممتاز</span>
                <span>💛 متوسط</span>
                <span>🔴 صعب</span>
                <span>🔵 نفس البرج</span>
            </div>
        </div>
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
 
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
 
// ========================================
// أنيميشن ظهور الأقسام
// ========================================
function animateEntrance() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('fade-section');
        observer.observe(s);
    });
}
