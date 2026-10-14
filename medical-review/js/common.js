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
