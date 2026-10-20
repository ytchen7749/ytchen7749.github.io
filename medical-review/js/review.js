// ===== 評論頁 =====
// 組別與受試者編號在前測頁決定（依點擊順序、研究者專屬連結，或連不到計數器時隨機），
// 本頁沿用同一次瀏覽中記住的結果；若受試者直接打開本頁，會隨機分組。

// ---------- 1. 主題卡片（頁面最上方） ----------
const topicInfo = {
    icon: '💉',
    title: '瘦瘦針',
    tag: '減重療程',
    description: '想了解瘦瘦針的實際效果、副作用與看診經驗？看看大家的使用心得。'
};

// ---------- 2. 評論內容 ----------
// 條件代碼：CP = 有禮正評、CN = 有禮負評、UN = 不文明負評（沿用前一版命名）
// avatar 是頭像圖片
const commentInfo = {
    CP1: { avatar: './assets/A.png',  content: '有用，食慾會降低很多，飢餓感真的會明顯減少，東西吃少了體重自然也比較容易下降。瘦瘦針就是讓整個減重過程更順利一點。' },
    CP2: { avatar: './assets/B1.png', content: '主要就是讓食慾降低，減少一直想吃東西的感覺，對體重下降確實有幫助。打了之後，減重比較不容易一直卡在原地。' },
    CP3: { avatar: './assets/C1.png', content: '最近瘦瘦針真的超紅的！重點是因為瘦瘦針減重真的蠻無痛的，不需嚴格的飲食管控及大量運動就可以有效果。' },
    CN1: { avatar: './assets/A.png',  content: '真的不要去試，現在有很多減肥方式，真的都比這個好，大家真的要好好愛惜自己的身體。特別是要看醫生，不要自己亂買！！！！' },
    CN2: { avatar: './assets/B2.png', content: '這個針主要的瘦身方式是降低食慾，但這樣的瘦身方式代價很大，因為減去的體重大多是肌肉而不是脂肪。肌肉減少後代謝率就更低了，日後會更容易發胖。 ' },
    CN3: { avatar: './assets/C2.png', content: '提醒一下，瘦瘦針不是對每個人都有效喔。而且價格不便宜，又不是對每個人都有效，如果最後體重又回來，花這麼多錢感覺不太值得。' },
    UN1: { avatar: './assets/A.png',  content: '打什麼屁針，噁心、嘔吐、腸胃不舒服一堆副作用，瘦是瘦了結果整天在那邊難受。用了之後副作用，整天吐怎上班。' },
    UN2: { avatar: './assets/B3.png', content: '只是你要靠這種瘦，就是要固定用阿靠北，瘦瘦針停了之後食慾又可能跑回來，那前面是在忙三小，效果如果根本撐不久，還一直吹得跟神藥一樣。' },
    UN3: { avatar: './assets/C3.png', content: '有沒有想過現在沒什麼問題，只是因為後遺症還沒出來？搞不好你再等幾年甚至十幾年後身體爛掉才在那邊後悔，真的是很可悲 。' }
};

// ---------- 3. 各組評論順序（3×3 對抗平衡） ----------
// 區塊順序：CP→CN→UN（G1/G4/G7）、CN→UN→CP（G2/G5/G8）、UN→CP→CN（G3/G6/G9）
// 區塊內輪替：1-2-3（G1–G3）、2-3-1（G4–G6）、3-1-2（G7–G9）
// key 對應上面 commentInfo 的代碼
const reviewData = {
    G1: [
        { id: 'G1-1', key: 'CP1' },
        { id: 'G1-2', key: 'CP2' },
        { id: 'G1-3', key: 'CP3' },
        { id: 'G1-4', key: 'CN1' },
        { id: 'G1-5', key: 'CN2' },
        { id: 'G1-6', key: 'CN3' },
        { id: 'G1-7', key: 'UN1' },
        { id: 'G1-8', key: 'UN2' },
        { id: 'G1-9', key: 'UN3' }
    ],
    G2: [
        { id: 'G2-1', key: 'CN1' },
        { id: 'G2-2', key: 'CN2' },
        { id: 'G2-3', key: 'CN3' },
        { id: 'G2-4', key: 'UN1' },
        { id: 'G2-5', key: 'UN2' },
        { id: 'G2-6', key: 'UN3' },
        { id: 'G2-7', key: 'CP1' },
        { id: 'G2-8', key: 'CP2' },
        { id: 'G2-9', key: 'CP3' }
    ],
    G3: [
        { id: 'G3-1', key: 'UN1' },
        { id: 'G3-2', key: 'UN2' },
        { id: 'G3-3', key: 'UN3' },
        { id: 'G3-4', key: 'CP1' },
        { id: 'G3-5', key: 'CP2' },
        { id: 'G3-6', key: 'CP3' },
        { id: 'G3-7', key: 'CN1' },
        { id: 'G3-8', key: 'CN2' },
        { id: 'G3-9', key: 'CN3' }
    ],
    G4: [
        { id: 'G4-1', key: 'CP2' },
        { id: 'G4-2', key: 'CP3' },
        { id: 'G4-3', key: 'CP1' },
        { id: 'G4-4', key: 'CN2' },
        { id: 'G4-5', key: 'CN3' },
        { id: 'G4-6', key: 'CN1' },
        { id: 'G4-7', key: 'UN2' },
        { id: 'G4-8', key: 'UN3' },
        { id: 'G4-9', key: 'UN1' }
    ],
    G5: [
        { id: 'G5-1', key: 'CN2' },
        { id: 'G5-2', key: 'CN3' },
        { id: 'G5-3', key: 'CN1' },
        { id: 'G5-4', key: 'UN2' },
        { id: 'G5-5', key: 'UN3' },
        { id: 'G5-6', key: 'UN1' },
        { id: 'G5-7', key: 'CP2' },
        { id: 'G5-8', key: 'CP3' },
        { id: 'G5-9', key: 'CP1' }
    ],
    G6: [
        { id: 'G6-1', key: 'UN2' },
        { id: 'G6-2', key: 'UN3' },
        { id: 'G6-3', key: 'UN1' },
        { id: 'G6-4', key: 'CP2' },
        { id: 'G6-5', key: 'CP3' },
        { id: 'G6-6', key: 'CP1' },
        { id: 'G6-7', key: 'CN2' },
        { id: 'G6-8', key: 'CN3' },
        { id: 'G6-9', key: 'CN1' }
    ],
    G7: [
        { id: 'G7-1', key: 'CP3' },
        { id: 'G7-2', key: 'CP1' },
        { id: 'G7-3', key: 'CP2' },
        { id: 'G7-4', key: 'CN3' },
        { id: 'G7-5', key: 'CN1' },
        { id: 'G7-6', key: 'CN2' },
        { id: 'G7-7', key: 'UN3' },
        { id: 'G7-8', key: 'UN1' },
        { id: 'G7-9', key: 'UN2' }
    ],
    G8: [
        { id: 'G8-1', key: 'CN3' },
        { id: 'G8-2', key: 'CN1' },
        { id: 'G8-3', key: 'CN2' },
        { id: 'G8-4', key: 'UN3' },
        { id: 'G8-5', key: 'UN1' },
        { id: 'G8-6', key: 'UN2' },
        { id: 'G8-7', key: 'CP3' },
        { id: 'G8-8', key: 'CP1' },
        { id: 'G8-9', key: 'CP2' }
    ],
    G9: [
        { id: 'G9-1', key: 'UN3' },
        { id: 'G9-2', key: 'UN1' },
        { id: 'G9-3', key: 'UN2' },
        { id: 'G9-4', key: 'CP3' },
        { id: 'G9-5', key: 'CP1' },
        { id: 'G9-6', key: 'CP2' },
        { id: 'G9-7', key: 'CN3' },
        { id: 'G9-8', key: 'CN1' },
        { id: 'G9-9', key: 'CN2' }
    ]
};

// ---------- 4. 每則評論對應的 Google 表單（ID1~ID9） ----------
// 表單跟著「評論內容」走：不論該則評論在哪一組、排第幾個，都顯示同一份表單。
// 代碼對應上面 commentInfo 的 CP1~UN3：ID1=CP1、ID2=CP2 … ID9=UN3（即第 1 組的順序）。
const formUrls = {
    CP1: 'https://docs.google.com/forms/d/e/1FAIpQLSc5o0SKEBqX_e_CVh5NZOedl0x5f5tEp2hTV8iZ4gJWgDqO1Q/viewform?embedded=true',
    CP2: 'https://docs.google.com/forms/d/e/1FAIpQLSf1Bf9gnjCZ-e1VJSVfzJ82ftYdQSCNPPrfJ2vY-u8lqtfm1A/viewform?embedded=true',
    CP3: 'https://docs.google.com/forms/d/e/1FAIpQLSfbT62JFhJRGuJ7viPaU5lY2UbWUDGoklYsCT0iTNA4qjFUkw/viewform?embedded=true',
    CN1: 'https://docs.google.com/forms/d/e/1FAIpQLSei-KKdNvHm_i-_L4H-XnWn5BVHeEHXno4XVlNmfu-UmXFEnw/viewform?embedded=true',
    CN2: 'https://docs.google.com/forms/d/e/1FAIpQLScQ0Du2ZK_2I8ZXMLfZVTrwrZ0P42a11oZbXzM0pT0gc__oYw/viewform?embedded=true',
    CN3: 'https://docs.google.com/forms/d/e/1FAIpQLSeNuWd_H-ZjbLqAXCNGM3dIafgEO1XhQ5oWVrCUyjSuK_fZbg/viewform?embedded=true',
    UN1: 'https://docs.google.com/forms/d/e/1FAIpQLSdmEfuKzPUHI1TWHB2sdPjucb6XhwKJoAIPR1hIfzwwmH-miw/viewform?embedded=true',
    UN2: 'https://docs.google.com/forms/d/e/1FAIpQLSc35QaB-QByCaG5ol3zF08TYcUAdw-IzDVq-NX5X0Qq_3OaWA/viewform?embedded=true',
    UN3: 'https://docs.google.com/forms/d/e/1FAIpQLSc1XGo5B_iXl_-Wlc--Lycaae5cfg229m3r6Q_A0wzrP1fiJA/viewform?embedded=true'
};

// 每則評論後的表單有幾頁（單頁填 1），用來判斷是否已送出
const REVIEW_FORM_PAGES = 1;

// 預填受試者編號、組別、位置的設定在 js/common.js 的 PREFILL（依評論代碼 CP1~UN3 分別設定）
function buildFormUrl(base, item, group, pid) {
    const checked = normalizeFormUrl(base);
    if (checked.error) return checked;
    const url = addPrefill(checked.url, item.key, { pid, group: 'G' + group, position: item.id });
    return { url, error: '' };
}

document.addEventListener('DOMContentLoaded', () => {
    const group = resolveGroup();
    const groupKey = 'G' + group;
    const pid = resolvePid();
    document.body.dataset.group = groupKey;   // 方便除錯時在開發者工具查看
    document.body.dataset.pid = pid;
    console.log('受試者：', pid, '分派組別：', groupKey);

    // 主題卡片
    document.getElementById('topic').innerHTML = `
        <div class="thumb">${topicInfo.icon}</div>
        <div>
            <span class="tag" style="font-size:12px;color:var(--brand)">${topicInfo.tag}</span>
            <h1>${topicInfo.title}</h1>
            <p>${topicInfo.description}</p>
        </div>`;

    // 評論列表
    const list = document.getElementById('review-list');
    const items = reviewData[groupKey] || [];
    if (!items.length) {
        list.innerHTML = '<p>目前沒有對應的評論資料。</p>';
        return;
    }

    list.innerHTML = items.map((item, i) => {
        const c = commentInfo[item.key];
        return `
        <article class="review-item" data-review-id="${item.id}" data-condition="${item.key}">
            <div class="review-row">
                <div class="reviewer"><img src="${c.avatar}" alt="使用者頭像"></div>
                <div class="content">
                    <div class="serial">#${i + 1}</div>
                    <p class="text">${c.content}</p>
                </div>
            </div>
            <div class="survey-action">
                <button type="button" class="fill-survey-btn" data-i="${i}">填寫問卷</button>
            </div>
            <div class="survey-frame hide" id="survey-${i}">
                <iframe height="1900" title="問卷 ${i + 1}"></iframe>
            </div>
        </article>`;
    }).join('');

    // 完成進度：9 則問卷都送出後，才開放前往後測
    const finishBtn = document.getElementById('finish-btn');
    const progressText = document.getElementById('progress-text');
    let completed = 0;
    function updateProgress() {
        if (completed >= items.length) {
            progressText.textContent = '所有問卷都已完成，請點擊下方按鈕繼續。';
            if (finishBtn.disabled && completed > 0) logStage('review');
            finishBtn.disabled = false;
        } else {
            progressText.textContent = `已完成 ${completed} / ${items.length} 則評論的問卷，全部完成後才能繼續。`;
        }
    }
    updateProgress();
    finishBtn.addEventListener('click', () => {
        window.location.href = withGroupParam('posttest.html');
    });

    // 點「填寫問卷」才載入並展開該則的表單
    list.querySelectorAll('.fill-survey-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = Number(btn.dataset.i);
            const box = document.getElementById('survey-' + i);
            const iframe = box.querySelector('iframe');
            box.classList.remove('hide');
            if (!iframe.src) {
                const form = buildFormUrl(formUrls[items[i].key], items[i], group, pid);
                if (form.error) {
                    box.innerHTML = `<p class="notice">${items[i].key} 的表單網址有問題：${form.error}</p>`;
                    return;
                }
                watchFormSubmit(iframe, REVIEW_FORM_PAGES, () => {
                    box.classList.add('hide');
                    btn.textContent = '已完成填答';
                    btn.disabled = true;
                    completed++;
                    updateProgress();
                    // 表單收起後，把畫面捲回剛填完的那則評論頂端
                    requestAnimationFrame(() => {
                        btn.closest('.review-item').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                });
                iframe.src = form.url;
            }
        });
    });
});