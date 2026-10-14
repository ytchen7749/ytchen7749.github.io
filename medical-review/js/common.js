// ===== 共用設定與工具 =====
// 三個頁面（pretest / index / review）都會載入這個檔案。

const GROUP_COUNT = 9;
const GROUP_STORAGE_KEY = 'experimentGroup';

// 讀取網址上的 ?g=1~9（研究者指定組別時使用）
function getGroupFromUrl() {
    const g = parseInt(new URLSearchParams(window.location.search).get('g'), 10);
    return (g >= 1 && g <= GROUP_COUNT) ? g : null;
}

function readStoredGroup() {
    try {
        const g = parseInt(sessionStorage.getItem(GROUP_STORAGE_KEY), 10);
        return (g >= 1 && g <= GROUP_COUNT) ? g : null;
    } catch (e) {
        return null;
    }
}

function storeGroup(g) {
    try { sessionStorage.setItem(GROUP_STORAGE_KEY, String(g)); } catch (e) { /* 無法儲存時忽略 */ }
}

// 決定組別：網址指定 > 本次瀏覽已分派過的組別 > 隨機 1~9
// 分派後會記在 sessionStorage，重新整理頁面不會換組。
function resolveGroup() {
    const fromUrl = getGroupFromUrl();
    if (fromUrl) { storeGroup(fromUrl); return fromUrl; }

    const stored = readStoredGroup();
    if (stored) return stored;

    const random = Math.floor(Math.random() * GROUP_COUNT) + 1;
    storeGroup(random);
    return random;
}

// 跳頁時把網址上的 ?g 一併帶過去（沒有就不帶）
function withGroupParam(url) {
    const g = getGroupFromUrl();
    if (!g) return url;
    return url + (url.includes('?') ? '&' : '?') + 'g=' + g;
}

// 整理 Google 表單網址，容許幾種常見的貼法：
//   1. 整段 <iframe src="..."> 嵌入碼 → 取出 src
//   2. 開頭寫錯或缺少（https//、https:/、全形冒號、多了引號或空白、重複 https://）
//      → 直接從字串中取出 docs.google.com/forms/... 這段，重新組成 https:// 網址
//   3. 一般分享網址（.../viewform）→ 自動加上 embedded=true
// 回傳 { url, error }；error 有值時代表網址無法使用。
function normalizeFormUrl(raw) {
    let text = String(raw || '').trim();
    if (!text) return { url: '', error: '尚未填入表單網址' };

    const srcMatch = text.match(/src\s*=\s*["'‘’“”]([^"'‘’“”]+)/i);
    if (srcMatch) text = srcMatch[1];
    text = text.replace(/&amp;/g, '&');

    if (/forms\.gle\//i.test(text)) {
        return { url: '', error: '這是 forms.gle 短網址，無法嵌入。請改用表單「傳送 → 嵌入 < >」裡 src 的完整網址。' };
    }

    // 只取 docs.google.com/forms/ 開始、到空白或引號為止的那一段
    const core = text.match(/docs\.google\.com\/forms\/[^\s"'<>‘’“”]+/i);
    if (!core) {
        return { url: '', error: '找不到 Google 表單網址（應包含 docs.google.com/forms/）。目前的內容是：' + text };
    }
    let url = 'https://' + core[0];
    if (/\/edit(\?|#|$)/i.test(url)) {
        return { url: '', error: '這是表單的編輯網址（/edit），受試者無法填寫。請改用「傳送 → 嵌入 < >」裡的網址。' };
    }
    if (!/[?&]embedded=true/i.test(url)) {
        url += (url.includes('?') ? '&' : '?') + 'embedded=true';
    }
    return { url, error: '' };
}

// 偵測嵌入的 Google 表單是否已送出。
// Google 表單每換一頁、或送出後顯示確認畫面時，iframe 都會觸發一次 load。
// 因此第 (formPages + 1) 次 load 代表已送出。單頁表單 formPages = 1。
function watchFormSubmit(iframe, formPages, onSubmitted) {
    let loads = 0;
    let done = false;
    iframe.addEventListener('load', () => {
        loads++;
        if (!done && loads > formPages) {
            done = true;
            onSubmitted();
        }
    });
}