// ===== 評論列表頁 =====
// posts 陣列就是頁面上的評論卡片，依序顯示。
// 只有 target: true 的那一則（瘦瘦針）可以點進 review.html，其他點了只會出現提示。
// 文字都可以直接修改；icon 用 emoji，也可以改成圖片路徑（見下方 renderThumb）。

const posts = [
    {
        target: true,
        icon: '💉',
        tag: '減重療程',
        title: '瘦瘦針',
        excerpt: '想了解瘦瘦針的實際效果、副作用與看診經驗？看看大家的使用心得。',
        meta: '9 則評論'
    },
    {
        icon: '🦷',
        tag: '牙科',
        title: '隱形牙套矯正',
        excerpt: '矯正期間的疼痛感、回診頻率和費用，過來人分享。',
        meta: '24 則評論'
    },
    {
        icon: '👁️',
        tag: '眼科',
        title: '近視雷射手術',
        excerpt: '術前檢查、術後恢復期與夜間視力的心得整理。',
        meta: '31 則評論'
    },
    {
        icon: '✨',
        tag: '皮膚科',
        title: '皮秒雷射',
        excerpt: '淡斑、除痘疤的效果因人而異，看看不同膚質的經驗。',
        meta: '18 則評論'
    },
    {
        icon: '🩺',
        tag: '家醫科',
        title: '成人健康檢查',
        excerpt: '自費健檢項目怎麼選？各家診所的流程與服務比較。',
        meta: '12 則評論'
    }
];

const NOT_AVAILABLE_MSG = '請依照實驗指示，點選第一則評論';

function renderThumb(icon) {
    // 如果 icon 是圖片路徑（.png / .jpg / .svg），就顯示圖片
    if (/\.(png|jpe?g|svg|webp)$/i.test(icon)) {
        return `<img src="${icon}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px">`;
    }
    return icon;
}

document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('feed');
    const toast = document.getElementById('toast');
    let toastTimer = null;

    feed.innerHTML = posts.map((p, i) => `
        <button type="button" class="post-card" data-index="${i}">
            <div class="thumb">${renderThumb(p.icon)}</div>
            <div class="body">
                <span class="tag">${p.tag}</span>
                <h2>${p.title}</h2>
                <p class="excerpt">${p.excerpt}</p>
                <p class="meta">${p.meta}</p>
            </div>
        </button>
    `).join('');

    feed.addEventListener('click', (e) => {
        const card = e.target.closest('.post-card');
        if (!card) return;
        const post = posts[Number(card.dataset.index)];

        if (post.target) {
            window.location.href = withGroupParam('review.html');
        } else {
            toast.textContent = NOT_AVAILABLE_MSG;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
        }
    });
});
