// ===== 共用設定與工具 =====
// 所有受試者頁面（pretest / index / review / posttest）都會載入這個檔案。

const GROUP_COUNT = 9;
const GROUP_STORAGE_KEY = 'experimentGroup';

// ===== 依點擊順序分組的計數器（Google Apps Script） =====
// 把 Apps Script 部署後的「網頁應用程式網址」（結尾是 /exec）貼在這裡。
// 留空 = 不使用計數器，改為隨機分組。
const ASSIGN_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyTWWN6eJ5S8k0MztXPnfq9xQU1Yn68IlvDOtBYfNeOh3NKqlE1A0sTJicf3qfa3XWw/exec';
// 計數器多久沒回應就放棄、改用隨機分組（毫秒）
const ASSIGN_TIMEOUT_MS = 8000;

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

// ===== 受試者編號（pid） =====
// 研究者發的專屬連結會帶 ?pid=P001；沒有的話自動產生一個 R 開頭的隨機編號，
// 讓同一個人填的所有表單仍然能串在一起（R 開頭代表不是從 admin 連結進來的）。
const PID_STORAGE_KEY = 'experimentPid';

function cleanPid(v) {
    const s = String(v || '').trim();
    return /^[A-Za-z0-9_-]{1,40}$/.test(s) ? s : null;
}

function getPidFromUrl() {
    return cleanPid(new URLSearchParams(window.location.search).get('pid'));
}

function readStoredPid() {
    try { return cleanPid(sessionStorage.getItem(PID_STORAGE_KEY)); } catch (e) { return null; }
}

function storePid(pid) {
    try { sessionStorage.setItem(PID_STORAGE_KEY, pid); } catch (e) { /* 忽略 */ }
}

function resolvePid() {
    const pid = getPidFromUrl() || readStoredPid() ||
        ('R' + Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(2, 6)).toUpperCase();
    storePid(pid);
    return pid;
}

// ===== 進入實驗時決定組別與編號（前測頁呼叫） =====
// 優先順序：
//   1. 研究者專屬連結（網址有 ?g=）→ 用連結的組別與編號，並向計數器登記（不佔名額）
//   2. 這次瀏覽已經分派過（例如重新整理頁面）→ 沿用
//   3. 向計數器要下一個組別與編號（依點擊順序 G1→G9 輪流）
//   4. 計數器沒設定或連不上 → 隨機分組，編號以 R 開頭
// 回傳 { group, pid, source }
const SOURCE_STORAGE_KEY = 'experimentSource';
const TOKEN_STORAGE_KEY = 'experimentToken';

function sessionToken() {
    let t = null;
    try { t = sessionStorage.getItem(TOKEN_STORAGE_KEY); } catch (e) { /* 忽略 */ }
    if (!t || !/^[A-Za-z0-9]{8,40}$/.test(t)) {
        t = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        try { sessionStorage.setItem(TOKEN_STORAGE_KEY, t); } catch (e) { /* 忽略 */ }
    }
    return t;
}

function setSource(src) {
    try { sessionStorage.setItem(SOURCE_STORAGE_KEY, src); } catch (e) { /* 忽略 */ }
}

function getSource() {
    try { return sessionStorage.getItem(SOURCE_STORAGE_KEY) || ''; } catch (e) { return ''; }
}

function endpointUrl(params) {
    const q = Object.keys(params)
        .filter(k => params[k] !== undefined && params[k] !== null && params[k] !== '')
        .map(k => k + '=' + encodeURIComponent(params[k])).join('&');
    return ASSIGN_ENDPOINT.trim() + (ASSIGN_ENDPOINT.includes('?') ? '&' : '?') + q;
}

async function initParticipant() {
    const endpoint = ASSIGN_ENDPOINT.trim();

    // 1. 專屬連結
    const urlGroup = getGroupFromUrl();
    if (urlGroup) {
        storeGroup(urlGroup);
        const pid = resolvePid();
        setSource('link');
        if (endpoint) {
            fetch(endpointUrl({ action: 'assign', pid, g: urlGroup, t: sessionToken() }), { mode: 'no-cors' })
                .catch(() => {});
        }
        return { group: urlGroup, pid, source: 'link' };
    }

    // 2. 已分派過
    const storedGroup = readStoredGroup();
    const storedPid = readStoredPid();
    if (storedGroup && storedPid) {
        return { group: storedGroup, pid: storedPid, source: getSource() || 'stored' };
    }

    // 3. 計數器
    if (endpoint) {
        const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = setTimeout(() => ctrl && ctrl.abort(), ASSIGN_TIMEOUT_MS);
        try {
            const res = await fetch(endpointUrl({ action: 'assign', t: sessionToken() }),
                { signal: ctrl ? ctrl.signal : undefined });
            const data = await res.json();
            const g = parseInt(data.group, 10);
            const pid = cleanPid(data.pid);
            if (data.ok && g >= 1 && g <= GROUP_COUNT && pid) {
                storeGroup(g);
                storePid(pid);
                setSource('order');
                return { group: g, pid, source: 'order' };
            }
            console.warn('計數器回應格式不正確，改用隨機分組', data);
        } catch (e) {
            console.warn('連不到計數器，改用隨機分組', e);
        } finally {
            clearTimeout(timer);
        }
    }

    // 4. 隨機
    const group = resolveGroup();
    const pid = resolvePid();
    setSource('fallback');
    return { group, pid, source: 'fallback' };
}

// 階段完成時回報給計數器（pretest / review / posttest），不影響受試者操作
function logStage(stage) {
    if (!ASSIGN_ENDPOINT.trim()) return;
    const url = endpointUrl({ action: 'log', stage, pid: resolvePid(), g: resolveGroup() });
    try {
        fetch(url, { mode: 'no-cors', keepalive: true }).catch(() => {});
    } catch (e) { /* 忽略 */ }
}

// 跳頁時把網址上的 ?g 和 ?pid 一併帶過去（沒有就不帶）
function withGroupParam(url) {
    const params = [];
    const g = getGroupFromUrl();
    const pid = getPidFromUrl();
    if (g) params.push('g=' + g);
    if (pid) params.push('pid=' + encodeURIComponent(pid));
    if (!params.length) return url;
    return url + (url.includes('?') ? '&' : '?') + params.join('&');
}

// ===== 表單預填設定（把受試者編號、組別自動填進 Google 表單） =====
// 做法：在每份表單加簡答題（例如「受試者編號」「組別」），
// 用表單右上角 ⋮ →「取得預先填入的連結」，隨便填個值後按「取得連結」，
// 連結裡會出現 entry.123456789=… 這樣的字樣，把 'entry.123456789' 填到下面對應的位置。
// 留空 = 不預填。9 份評論表單的 entry 編號各不相同，要分別填。
//   pid      → 受試者編號，例如 P017
//   group    → 組別，例如 G3
//   position → （只有評論表單）組別-位置，例如 G3-5 代表第 3 組畫面上第 5 則
const PREFILL = {
    pretest:  { pid: '', group: '' },
    posttest: { pid: '', group: '' },
    CP1: { pid: '', group: '', position: '' },   // ID1
    CP2: { pid: '', group: '', position: '' },   // ID2
    CP3: { pid: '', group: '', position: '' },   // ID3
    CN1: { pid: '', group: '', position: '' },   // ID4
    CN2: { pid: '', group: '', position: '' },   // ID5
    CN3: { pid: '', group: '', position: '' },   // ID6
    UN1: { pid: '', group: '', position: '' },   // ID7
    UN2: { pid: '', group: '', position: '' },   // ID8
    UN3: { pid: '', group: '', position: '' }    // ID9
};

// 依 PREFILL 設定，把值加到表單網址後面
function addPrefill(url, formKey, values) {
    const cfg = PREFILL[formKey] || {};
    const params = [];
    Object.keys(values).forEach(field => {
        const entry = String(cfg[field] || '').trim();
        if (entry) params.push(entry + '=' + encodeURIComponent(values[field]));
    });
    if (!params.length) return url;
    return url + (url.includes('?') ? '&' : '?') + 'usp=pp_url&' + params.join('&');
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