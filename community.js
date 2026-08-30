
// ========================================
// community.js - مجتمع ليليث
// كل المنطق: منشورات، لايك، تعليق، مشاركة، متابعة، حظر،
// بروفايل، رسائل خاصة، شكاوى الموقع، وخوارزمية التوافق بين الأعضاء
//
// يعتمد على:
//   - supabaseClient, getCurrentUser(), getCurrentProfile(), onAuthChange() من supabase-client.js
//   - escapeHTML(), validatePostContent()... من security.js
//   - zodiacData, getZodiac() من data.js
// ========================================

const POSTS_PAGE_SIZE = 10;
const MIN_VIEWS_TO_SHOW = 10; // من قرارنا: منعرضش عدد المشاهدات لحد ما يوصل رقم حقيقي معقول

let _feedOffset = 0;
let _feedFilter = 'all';
let _blockedByMe = new Set();   // مستخدمين أنا حاظرهم
let _blockedMe   = new Set();   // مستخدمين حاظريني
let _viewedPostsThisSession = new Set();

// ========================================
// تهيئة المجتمع — بتتنادى من script.js لما الصفحة تفتح
// ========================================
function initCommunity() {
    const textarea = document.getElementById('postContent');
    if (textarea) {
        textarea.addEventListener('input', () => {
            const count = document.getElementById('postCharCount');
            if (count) count.textContent = `${textarea.value.length} / 500`;
        });
    }

    // نتفاعل مع أي تغيير في حالة تسجيل الدخول (الدالة دي معرّفة في supabase-client.js)
    onAuthChange(async (user) => {
        await _refreshBlockLists(user);
        _updateCommunityAccessUI(user);
        await renderFeed(true);
    });
}

// ========================================
// إظهار/إخفاء فورم النشر ورسالة القفل حسب حالة الدخول
// ========================================
function _updateCommunityAccessUI(user) {
    const composer  = document.getElementById('postComposer');
    const lockedMsg = document.getElementById('communityLoggedOut');
    const filters   = document.getElementById('communityFilters');

    if (!composer || !lockedMsg) return;

    if (user) {
        composer.classList.remove('hidden');
        filters?.classList.remove('hidden');
        lockedMsg.classList.add('hidden');
    } else {
        composer.classList.add('hidden');
        filters?.classList.add('hidden');
        lockedMsg.classList.remove('hidden');
    }
}

// ========================================
// جلب قوائم الحظر (مين أنا حاظره ومين حاظرني) عشان نفلترهم من كل حاجة
// ========================================
async function _refreshBlockLists(user) {
    _blockedByMe = new Set();
    _blockedMe = new Set();
    if (!supabaseClient || !user) return;

    const { data: mine } = await supabaseClient
        .from('blocks').select('blocked_id').eq('blocker_id', user.id);
    (mine || []).forEach(r => _blockedByMe.add(r.blocked_id));

    const { data: theirs } = await supabaseClient
        .from('blocks').select('blocker_id').eq('blocked_id', user.id);
    (theirs || []).forEach(r => _blockedMe.add(r.blocker_id));
}

function _isBlockedEitherWay(userId) {
    return _blockedByMe.has(userId) || _blockedMe.has(userId);
}

// ========================================
// حساب برج مستخدم من تاريخ ميلاده المحفوظ في البروفايل
// ========================================
function _zodiacOf(profile) {
    if (!profile?.birth_date) return null;
    const d = new Date(profile.birth_date);
    return getZodiac(d.getDate(), d.getMonth() + 1);
}

// ========================================
// فلترة الفيد (الكل / أبناء برجي)
// ========================================
function filterFeed(filter) {
    _feedFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderFeed(true);
}

// ========================================
// عرض الفيد (أول تحميل أو تحميل صفحة جديدة)
// ========================================
async function renderFeed(reset = false) {
    const container = document.getElementById('feedContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!container || !supabaseClient) return;

    const user = getCurrentUser();
    if (!user) {
        container.innerHTML = '';
        loadMoreBtn?.classList.add('hidden');
        return; // غير المسجلين مايشوفوش الفيد خالص (زي ما اتفقنا)
    }

    if (reset) {
        _feedOffset = 0;
        container.innerHTML = '<p class="section-desc">جاري تحميل المنشورات...</p>';
    }

    let query = supabaseClient
        .from('posts')
        .select('*, author:profiles!posts_user_id_fkey(*)')
        .order('created_at', { ascending: false })
        .range(_feedOffset, _feedOffset + POSTS_PAGE_SIZE - 1);

    // فلتر "أبناء برجي": بنجيب المنشورات ونفلترهم بعد الجلب لأن البرج محسوب مش عمود مباشر
    const { data: posts, error } = await query;

    if (error) {
        console.error('خطأ في تحميل الفيد:', error.message);
        if (reset) container.innerHTML = '<p class="section-desc">حصل خطأ في تحميل المنشورات</p>';
        return;
    }

    if (reset) container.innerHTML = '';

    const myProfile = getCurrentProfile();
    const mySign = _zodiacOf(myProfile);

    let visiblePosts = (posts || []).filter(p => !_isBlockedEitherWay(p.user_id));

    if (_feedFilter === 'mySign' && mySign) {
        visiblePosts = visiblePosts.filter(p => _zodiacOf(p.author) === mySign);
    }

    if (visiblePosts.length === 0 && reset) {
        container.innerHTML = '<p class="section-desc">لسه مفيش منشورات هنا</p>';
    }

    visiblePosts.forEach(post => {
        container.insertAdjacentHTML('beforeend', _renderPostCard(post, user));
        _registerPostView(post);
    });

    _feedOffset += POSTS_PAGE_SIZE;
    loadMoreBtn?.classList.toggle('hidden', (posts || []).length < POSTS_PAGE_SIZE);
}

function loadMorePosts() {
    renderFeed(false);
}

// ========================================
// بناء كارت منشور واحد كـ HTML
// ========================================
function _renderPostCard(post, currentUser) {
    const author = post.author || {};
    const isMine = author.id === currentUser.id;
    const isAdmin = isCurrentUserAdmin();
    const isOfficial = author.id === window.LILITH_OFFICIAL_UID;
    const sign = _zodiacOf(author);
    const signInfo = sign ? zodiacData[sign] : null;

    const showViews = (post.views_count || 0) >= MIN_VIEWS_TO_SHOW;

    return `
    <div class="post-card ${isOfficial ? 'official' : ''}" data-post-id="${post.id}">
        <div class="post-header">
            <img class="post-avatar" src="${escapeHTML(author.avatar_url || '')}"
                 alt="${escapeHTML(author.full_name || '')}"
                 onclick="openProfile('${author.id}')">
            <div class="post-author-info">
                <div class="post-author-name" onclick="openProfile('${author.id}')">
                    ${escapeHTML(author.full_name || 'مستخدم')}
                    ${isOfficial ? '<span class="official-badge">ليليث ✨</span>' : ''}
                </div>
                <div class="post-meta">
                    ${signInfo ? `<span>${signInfo.symbol} ${sign}</span>` : ''}
                    ${author.city ? `<span>📍 ${escapeHTML(author.city)}</span>` : ''}
                    <span>${formatRelativeTime(post.created_at)}</span>
                </div>
            </div>
        </div>

        <div class="post-content">${escapeHTML(post.content)}</div>

        <div class="post-actions">
            <button class="post-action-btn ${post.liked_by_me ? 'liked' : ''}"
                    onclick="toggleLike('${post.id}')">
                ${post.liked_by_me ? ❤️' : '🤍'} <span>${post.likes_count || 0}</span>
            </button>
            <button class="post-action-btn" onclick="toggleComments('${post.id}')">
                💬 <span>تعليق</span>
            </button>
            <button class="post-action-btn" onclick="sharePost('${post.id}')">
                🔗 <span>مشاركة</span>
            </button>
            ${isMine ? `<button class="post-action-btn" onclick="editPost('${post.id}')">✏️</button>` : ''}
            ${(isMine || isAdmin) ? `<button class="post-action-btn danger" onclick="deletePost('${post.id}')">🗑️</button>` : ''}
            ${showViews ? `<span class="post-views">👁️ ${post.views_count}</span>` : ''}
        </div>

        <div class="comments-list hidden" id="comments-${post.id}"></div>
    </div>`;
}

// ========================================
// تسجيل مشاهدة منشور (مرة واحدة بس لكل منشور في نفس الجلسة)
// ========================================
async function _registerPostView(post) {
    if (_viewedPostsThisSession.has(post.id)) return;
    _viewedPostsThisSession.add(post.id);

    if (!supabaseClient) return;
    await supabaseClient.rpc('increment_post_views', { post_id_input: post.id })
        .catch(() => { /* لو الدالة لسه مش متعرّفة في صابيز، نتجاهل بهدوء */ });
}

// ========================================
// نشر منشور جديد
// ========================================
async function submitPost() {
    const user = getCurrentUser();
    if (!user) return;

    if (isRateLimited('submitPost', 3000)) return;

    const textarea = document.getElementById('postContent');
    const check = validatePostContent(textarea?.value || '');
    if (!check.valid) {
        alert(check.error);
        return;
    }

    const { error } = await supabaseClient.from('posts').insert({
        user_id: user.id,
        content: check.content
    });

    if (error) {
        console.error('خطأ في النشر:', error.message);
        alert('حصل خطأ أثناء النشر، حاول تاني');
        return;
    }

    textarea.value = '';
    document.getElementById('postCharCount').textContent = '0 / 500';
    renderFeed(true);
}

// ========================================
// تعديل / حذف منشور
// ========================================
async function editPost(postId) {
    const newContent = prompt('عدّل منشورك:');
    if (newContent === null) return;

    const check = validatePostContent(newContent);
    if (!check.valid) {
        alert(check.error);
        return;
    }

    const { error } = await supabaseClient
        .from('posts')
        .update({ content: check.content, edited_at: new Date().toISOString() })
        .eq('id', postId);

    if (error) { alert('حصل خطأ أثناء التعديل'); return; }
    renderFeed(true);
}

async function deletePost(postId) {
    if (!confirm('متأكد إنك عايز تحذف المنشور ده؟')) return;

    const { error } = await supabaseClient.from('posts').delete().eq('id', postId);
    if (error) { alert('حصل خطأ أثناء الحذف'); return; }
    renderFeed(true);
}

// ========================================
// لايك / إلغاء لايك
// ========================================
async function toggleLike(postId) {
    const user = getCurrentUser();
    if (!user) return;
    if (isRateLimited(`like-${postId}`, 500)) return;

    const { data: existing } = await supabaseClient
        .from('likes').select('*').eq('post_id', postId).eq('user_id', user.id).single();

    if (existing) {
        await supabaseClient.from('likes').delete().eq('post_id', postId).eq('user_id', user.id);
    } else {
        await supabaseClient.from('likes').insert({ post_id: postId, user_id: user.id });
    }
    renderFeed(true);
}

// ========================================
// عرض/إخفاء التعليقات وتحميلها
// ========================================
async function toggleComments(postId) {
    const box = document.getElementById(`comments-${postId}`);
    if (!box) return;

    if (!box.classList.contains('hidden')) {
        box.classList.add('hidden');
        return;
    }

    box.classList.remove('hidden');
    box.innerHTML = '<p class="section-desc">جاري تحميل التعليقات...</p>';

    const { data: comments, error } = await supabaseClient
        .from('comments')
        .select('*, author:profiles!comments_user_id_fkey(*)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) { box.innerHTML = '<p class="section-desc">حصل خطأ في تحميل التعليقات</p>'; return; }

    const visible = (comments || []).filter(c => !_isBlockedEitherWay(c.user_id));

    box.innerHTML = visible.map(c => `
        <div class="comment-item">
            <img src="${escapeHTML(c.author?.avatar_url || '')}" alt="">
            <div class="comment-bubble">
                <div class="comment-author">${escapeHTML(c.author?.full_name || 'مستخدم')}</div>
                <div>${escapeHTML(c.content)}</div>
            </div>
        </div>
    `).join('') + `
        <div class="comment-form">
            <input type="text" id="commentInput-${postId}" maxlength="200" placeholder="اكتب تعليق...">
            <button type="button" onclick="submitComment('${postId}')">إرسال</button>
        </div>
    `;
}

async function submitComment(postId) {
    const user = getCurrentUser();
    if (!user) return;
    if (isRateLimited(`comment-${postId}`, 1500)) return;

    const input = document.getElementById(`commentInput-${postId}`);
    const check = validateCommentContent(input?.value || '');
    if (!check.valid) { alert(check.error); return; }

    const { error } = await supabaseClient.from('comments').insert({
        post_id: postId,
        user_id: user.id,
        content: check.content
    });

    if (error) { alert('حصل خطأ أثناء إرسال التعليق'); return; }

    input.value = '';
    toggleComments(postId); // نقفل
    toggleComments(postId); // ونفتح تاني عشان يحمّل التعليق الجديد
}

// ========================================
// مشاركة منشور (نسخ رابط مباشر ليه)
// ========================================
function sharePost(postId) {
    const url = `${window.location.origin}${window.location.pathname}#post-${postId}`;
    navigator.clipboard?.writeText(url).then(() => {
        alert('تم نسخ رابط المنشور 🔗');
    }).catch(() => {
        prompt('انسخ رابط المنشور:', url);
    });
}

// ========================================
// متابعة / إلغاء متابعة
// ========================================
async function toggleFollow(targetUserId) {
    const user = getCurrentUser();
    if (!user || user.id === targetUserId) return;

    const { data: existing } = await supabaseClient
        .from('follows').select('*')
        .eq('follower_id', user.id).eq('following_id', targetUserId).single();

    if (existing) {
        await supabaseClient.from('follows').delete()
            .eq('follower_id', user.id).eq('following_id', targetUserId);
    } else {
        await supabaseClient.from('follows').insert({
            follower_id: user.id, following_id: targetUserId
        });
    }
    openProfile(targetUserId); // نحدّث شكل البروفايل بعد التغيير
}

// ========================================
// حظر / إلغاء حظر (يقطع كل تفاعل بين الطرفين زي ما اتفقنا)
// ========================================
async function toggleBlock(targetUserId) {
    const user = getCurrentUser();
    if (!user || user.id === targetUserId) return;

    const alreadyBlocked = _blockedByMe.has(targetUserId);

    if (alreadyBlocked) {
        if (!confirm('عايز تلغي الحظر عن المستخدم ده؟')) return;
        await supabaseClient.from('blocks').delete()
            .eq('blocker_id', user.id).eq('blocked_id', targetUserId);
    } else {
        if (!confirm('حظر المستخدم ده هيمنع أي تفاعل بينكم (رسائل، منشورات، تعليقات، متابعة). متأكد؟')) return;
        await supabaseClient.from('blocks').insert({
            blocker_id: user.id, blocked_id: targetUserId
        });
        // الحظر بيلغي المتابعة في الاتجاهين
        await supabaseClient.from('follows').delete()
            .or(`and(follower_id.eq.${user.id},following_id.eq.${targetUserId}),and(follower_id.eq.${targetUserId},following_id.eq.${user.id})`);
    }

    await _refreshBlockLists(user);
    openProfile(targetUserId);
    renderFeed(true);
}

// ========================================
// حظر أدمن لمستخدم بالكامل (صلاحية CREATOR_ID فقط — الحماية الحقيقية في RLS)
// ========================================
async function adminBanUser(targetUserId) {
    if (!isCurrentUserAdmin()) return;
    if (!confirm('حظر هذا المستخدم نهائيًا من المنصة؟')) return;

    const { error } = await supabaseClient
        .from('profiles').update({ is_banned: true }).eq('id', targetUserId);

    if (error) { alert('حصل خطأ أثناء الحظر'); return; }
    alert('تم حظر المستخدم');
    openProfile(targetUserId);
}

// ========================================
// فتح بروفايل مستخدم (بروفايلي أو بروفايل حد تاني)
// ========================================
async function openProfile(targetUserId) {
    const modal = document.getElementById('profileModal');
    const body  = document.getElementById('profileBody');
    if (!modal || !body || !supabaseClient) return;

    const user = getCurrentUser();
    const uid = targetUserId || user?.id;
    if (!uid) return;

    body.innerHTML = '<p class="section-desc">جاري تحميل البروفايل...</p>';
    modal.classList.remove('hidden');

    const { data: profile } = await supabaseClient
        .from('profiles').select('*').eq('id', uid).single();

    if (!profile) { body.innerHTML = '<p class="section-desc">تعذر تحميل البروفايل</p>'; return; }

    const { count: followersCount } = await supabaseClient
        .from('follows').select('*', { count: 'exact', head: true }).eq('following_id', uid);
    const { count: followingCount } = await supabaseClient
        .from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', uid);

    const { data: myPosts } = await supabaseClient
        .from('posts').select('*, author:profiles!posts_user_id_fkey(*)')
        .eq('user_id', uid).order('created_at', { ascending: false }).limit(10);

    const isMe = user && user.id === uid;
    const sign = _zodiacOf(profile);
    const signInfo = sign ? zodiacData[sign] : null;

    let followBtn = '', blockBtn = '', adminBtn = '';
    let compatBlock = '';

    if (!isMe && user) {
        const { data: iFollow } = await supabaseClient
            .from('follows').select('*').eq('follower_id', user.id).eq('following_id', uid).single();

        followBtn = `<button onclick="toggleFollow('${uid}')" class="${iFollow ? 'btn-secondary' : ''}">
            ${iFollow ? 'إلغاء المتابعة' : '➕ متابعة'}
        </button>`;

        const blocked = _blockedByMe.has(uid);
        blockBtn = `<button class="btn-danger" onclick="toggleBlock('${uid}')">
            ${blocked ? 'إلغاء الحظر' : '🚫 حظر'}
        </button>`;

        if (isCurrentUserAdmin() && !profile.is_banned) {
            adminBtn = `<button class="btn-danger" onclick="adminBanUser('${uid}')">⛔ حظر إداري نهائي</button>`;
        }

        const mySign = _zodiacOf(getCurrentProfile());
        if (mySign && sign) {
            const myInfo = zodiacData[mySign];
            let label = 'توافق متوسط 💛';
            if (myInfo.match.includes(sign)) label = 'توافق ممتاز 💚';
            else if (myInfo.clash.includes(sign)) label = 'قد تختلفوا ⚡';
            else if (mySign === sign) label = 'نفس البرج 🔵';
            compatBlock = `<div class="compat-indicator">${label}</div>`;
        }
    }

    body.innerHTML = `
        <div class="profile-header">
            <img class="profile-avatar-large" src="${escapeHTML(profile.avatar_url || '')}" alt="">
            <div>
                <div class="profile-name">${escapeHTML(profile.full_name || 'مستخدم')}</div>
                <div class="profile-sub">
                    ${signInfo ? `<span>${signInfo.symbol} ${sign}</span>` : ''}
                    ${profile.city ? `<span>📍 ${escapeHTML(profile.city)}${profile.country ? ', ' + escapeHTML(profile.country) : ''}</span>` : ''}
                </div>
                ${compatBlock}
            </div>
        </div>

        <div class="profile-stats">
            <div class="profile-stat"><b>${followersCount || 0}</b><span>متابِع</span></div>
            <div class="profile-stat"><b>${followingCount || 0}</b><span>متابَع</span></div>
            <div class="profile-stat"><b>${(myPosts || []).length}</b><span>منشور</span></div>
        </div>

        <div class="profile-actions">
            ${isMe
                ? `<button onclick="openEditProfile()">✏️ تعديل بياناتي</button>`
                : `${followBtn} ${blockBtn} ${!_isBlockedEitherWay(uid) ? `<button onclick="closeProfile(); openConversation('${uid}')">💌 مراسلة</button>` : ''} ${adminBtn}`
            }
        </div>

        <div class="profile-posts">
            ${(myPosts || []).map(p => _renderPostCard(p, user || { id: null })).join('') || '<p class="section-desc">لا توجد منشورات بعد</p>'}
        </div>
    `;
}

function closeProfile() {
    document.getElementById('profileModal')?.classList.add('hidden');
}

// ========================================
// تعديل بياناتي (تاريخ الميلاد، المدينة، الدولة)
// بيانات بسيطة عبر prompt عشان نبسّط الواجهة دلوقتي — ممكن نستبدلها بفورم كامل لاحقًا
// ========================================
async function openEditProfile() {
    const profile = getCurrentProfile();
    const user = getCurrentUser();
    if (!user) return;

    const birthDate = prompt('تاريخ ميلادك (YYYY-MM-DD):', profile?.birth_date || '');
    if (birthDate === null) return;
    const city = prompt('مدينتك:', profile?.city || '') || '';
    const country = prompt('دولتك:', profile?.country || '') || '';

    const { error } = await supabaseClient.from('profiles').update({
        birth_date: birthDate || null,
        city: sanitizeInput(city),
        country: sanitizeInput(country)
    }).eq('id', user.id);

    if (error) { alert('حصل خطأ أثناء الحفظ'); return; }
    openProfile(user.id);
}

// ========================================
// الرسائل الخاصة
// ========================================
async function openMessages() {
    const modal = document.getElementById('messagesModal');
    const body  = document.getElementById('messagesBody');
    const user  = getCurrentUser();
    if (!modal || !body || !user) return;

    modal.classList.remove('hidden');
    body.innerHTML = '<p class="section-desc">جاري تحميل المحادثات...</p>';

    const { data: msgs } = await supabaseClient
        .from('messages')
        .select('*, sender:profiles!messages_sender_id_fkey(*), receiver:profiles!messages_receiver_id_fkey(*)')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

    const conversations = new Map();
    (msgs || []).forEach(m => {
        const otherId = m.sender_id === user.id ? m.receiver_id : m.sender_id;
        if (_isBlockedEitherWay(otherId)) return;
        if (!conversations.has(otherId)) {
            conversations.set(otherId, {
                other: m.sender_id === user.id ? m.receiver : m.sender,
                last: m
            });
        }
    });

    if (conversations.size === 0) {
        body.innerHTML = '<p class="section-desc">لا توجد محادثات بعد</p>';
        return;
    }

    body.innerHTML = '<div class="conversations-list">' +
        Array.from(conversations.entries()).map(([otherId, c]) => `
            <div class="conversation-item" onclick="openConversation('${otherId}')">
                <img src="${escapeHTML(c.other?.avatar_url || '')}" alt="">
                <div class="conversation-preview">
                    <div class="name">${escapeHTML(c.other?.full_name || 'مستخدم')}</div>
                    <div class="last-msg">${escapeHTML(truncateText(c.last.content, 40))}</div>
                </div>
            </div>
        `).join('') + '</div>';
}

function closeMessages() {
    document.getElementById('messagesModal')?.classList.add('hidden');
}

async function openConversation(otherUserId) {
    const modal = document.getElementById('messagesModal');
    const body  = document.getElementById('messagesBody');
    const user  = getCurrentUser();
    if (!modal || !body || !user) return;
    if (_isBlockedEitherWay(otherUserId)) { alert('لا يمكن التواصل مع هذا المستخدم'); return; }

    modal.classList.remove('hidden');
    body.innerHTML = '<p class="section-desc">جاري تحميل المحادثة...</p>';

    const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', otherUserId).single();

    const { data: msgs } = await supabaseClient
        .from('messages').select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

    body.innerHTML = `
        <div class="chat-window">
            <div class="chat-messages" id="chatMessages">
                ${(msgs || []).map(m => `
                    <div class="chat-bubble ${m.sender_id === user.id ? 'mine' : 'theirs'}">
                        ${escapeHTML(m.content)}
                    </div>
                `).join('')}
            </div>
            <div class="chat-input-row">
                <input type="text" id="chatInput" maxlength="1000" placeholder="اكتب رسالة...">
                <button type="button" onclick="sendMessage('${otherUserId}')">إرسال</button>
            </div>
        </div>
    `;

    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage(otherUserId) {
    const user = getCurrentUser();
    if (!user) return;
    if (_isBlockedEitherWay(otherUserId)) { alert('لا يمكن التواصل مع هذا المستخدم'); return; }
    if (isRateLimited(`msg-${otherUserId}`, 800)) return;

    const input = document.getElementById('chatInput');
    const check = validateMessageContent(input?.value || '');
    if (!check.valid) { alert(check.error); return; }

    const { error } = await supabaseClient.from('messages').insert({
        sender_id: user.id,
        receiver_id: otherUserId,
        content: check.content
    });

    if (error) { alert('حصل خطأ أثناء إرسال الرسالة'); return; }

    input.value = '';
    openConversation(otherUserId);
}

// ========================================
// شكاوى واقتراحات الموقع (منفصلة عن الرسائل بين المستخدمين)
// ========================================
function openSiteMessages() {
    document.getElementById('siteMessagesModal')?.classList.remove('hidden');
}

function closeSiteMessages() {
    document.getElementById('siteMessagesModal')?.classList.add('hidden');
}

async function submitSiteMessage() {
    if (isRateLimited('siteMessage', 5000)) return;

    const textarea = document.getElementById('siteMessageContent');
    const check = validateMessageContent(textarea?.value || '');
    if (!check.valid) { alert(check.error); return; }

    const user = getCurrentUser();

    const { error } = await supabaseClient.from('site_messages').insert({
        user_id: user?.id || null,
        email: user?.email || null,
        content: check.content
    });

    if (error) {
        console.error('خطأ في إرسال الرسالة:', error.message);
        alert('حصل خطأ أثناء الإرسال، حاول تاني');
        return;
    }

    alert('تم إرسال رسالتك، شكرًا لك 🌙');
    textarea.value = '';
    closeSiteMessages();
}
