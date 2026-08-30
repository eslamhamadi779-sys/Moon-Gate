// ========================================
// security.js - دوال الحماية والتعقيم
// مفيش أي اعتماد على ملفات تانية هنا،
// وكل الملفات التانية (community.js, supabase-client.js)
// بتستخدم الدوال دي قبل ما تحط أي نص جاي من المستخدم في الصفحة
// ========================================

// ========================================
// تنظيف النصوص من أكواد HTML (حماية من XSS)
// أي نص جاي من مستخدم (منشور، تعليق، اسم...) لازم يعدي من هنا
// قبل ما يتحط بأي شكل جوه innerHTML
// ========================================
function escapeHTML(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

// ========================================
// تنظيف النص من مسافات زيادة في الأول والآخر
// ومنع إدخال فاضي أو مسافات بس
// ========================================
function sanitizeInput(text) {
    if (typeof text !== 'string') return '';
    return text.trim().replace(/\s+/g, ' ');
}

// ========================================
// التحقق من صحة محتوى منشور قبل إرساله
// بيرجع { valid: true } أو { valid: false, error: 'سبب الرفض' }
// ========================================
function validatePostContent(content) {
    const clean = sanitizeInput(content);

    if (clean.length === 0) {
        return { valid: false, error: 'لا يمكن نشر منشور فارغ' };
    }
    if (clean.length > 500) {
        return { valid: false, error: 'المنشور طويل جدًا (الحد الأقصى 500 حرف)' };
    }
    return { valid: true, content: clean };
}

// ========================================
// التحقق من صحة محتوى تعليق
// ========================================
function validateCommentContent(content) {
    const clean = sanitizeInput(content);

    if (clean.length === 0) {
        return { valid: false, error: 'لا يمكن إرسال تعليق فارغ' };
    }
    if (clean.length > 200) {
        return { valid: false, error: 'التعليق طويل جدًا (الحد الأقصى 200 حرف)' };
    }
    return { valid: true, content: clean };
}

// ========================================
// التحقق من صحة رسالة خاصة
// ========================================
function validateMessageContent(content) {
    const clean = sanitizeInput(content);

    if (clean.length === 0) {
        return { valid: false, error: 'لا يمكن إرسال رسالة فارغة' };
    }
    if (clean.length > 1000) {
        return { valid: false, error: 'الرسالة طويلة جدًا (الحد الأقصى 1000 حرف)' };
    }
    return { valid: true, content: clean };
}

// ========================================
// حماية بسيطة من إرسال متكرر بسرعة (Rate Limiting في الفرونت)
// ده مجرد خط دفاع أول لتحسين التجربة، وليس بديلاً عن الحماية
// الحقيقية اللي لازم تكون في Row Level Security بتاعة Supabase
// ========================================
const _actionTimestamps = {};

function isRateLimited(actionKey, minDelayMs = 2000) {
    const now = Date.now();
    const last = _actionTimestamps[actionKey] || 0;

    if (now - last < minDelayMs) {
        return true; // لسه بدري، امنع العملية
    }
    _actionTimestamps[actionKey] = now;
    return false;
}

// ========================================
// التحقق من شكل الإيميل (استخدام بسيط، مش بديل عن تحقق Supabase الحقيقي)
// ========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

// ========================================
// اقتطاع نص طويل مع "..." (مفيد لعرض معاينة رسالة/منشور)
// ========================================
function truncateText(text, maxLength = 60) {
    const clean = String(text || '');
    if (clean.length <= maxLength) return clean;
    return clean.slice(0, maxLength).trim() + '…';
}

// ========================================
// تنسيق وقت المنشور بشكل نسبي ("من 5 دقايق"، "من ساعتين"...)
// ========================================
function formatRelativeTime(dateInput) {
    const date = new Date(dateInput);
    const now  = new Date();
    const diffSec = Math.floor((now - date) / 1000);

    if (diffSec < 60)   return 'الآن';
    if (diffSec < 3600) return `من ${Math.floor(diffSec / 60)} دقيقة`;
    if (diffSec < 86400) return `من ${Math.floor(diffSec / 3600)} ساعة`;
    if (diffSec < 604800) return `من ${Math.floor(diffSec / 86400)} يوم`;

    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
}
