// ===== 研究者管理頁：產生並管理受試者專屬連結 =====
// 名單存在這個瀏覽器的 localStorage，請定期匯出 CSV 備份。

const GROUPS = 9;
const STORE_KEY = 'adminParticipants_v1';
const SETTINGS_KEY = 'adminSettings_v1';

let participants = [];   // { pid, group, sent, note, created }

// ---------- 儲存 ----------
function load() {
    try {
        const data = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
        participants = Array.isArray(data) ? data : [];
    } catch (e) {
        participants = [];
    }
}

function save() {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(participants));
    } catch (e) {
        toast('無法儲存到瀏覽器，請立即匯出 CSV 備份');
    }
}

function loadSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'); } catch (e) { return {}; }
}

function saveSettings() {
    const s = {
        baseUrl: $('base-url').value.trim(),
        prefix: $('prefix').value.trim(),
        digits: $('digits').value,
        method: $('method').value
    };
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) { /* 忽略 */ }
}

// ---------- 小工具 ----------
function $(id) { return document.getElementById(id); }

function defaultBaseUrl() {
    const here = window.location.href.split('?')[0].split('#')[0];
    return here.replace(/[^/]*$/, '') + 'pretest.html';
}

function linkFor(p) {
    const base = $('base-url').value.trim() || defaultBaseUrl();
    return base + (base.includes('?') ? '&' : '?') + 'g=' + p.group + '&pid=' + encodeURIComponent(p.pid);
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let toastTimer = null;
function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        ta.remove();
        return ok;
    }
}

// ---------- 分組 ----------
// 產生接下來 n 人的組別。區塊隨機會先補滿目前未滿的區塊，再產生新的完整區塊。
function nextGroups(n, method) {
    const existing = participants.map(p => p.group);
    const result = [];

    if (method === 'cycle') {
        for (let i = 0; i < n; i++) result.push(((existing.length + i) % GROUPS) + 1);
        return result;
    }

    const all = Array.from({ length: GROUPS }, (_, i) => i + 1);
    const partialSize = existing.length % GROUPS;
    let queue = [];
    if (partialSize > 0) {
        const used = new Set(existing.slice(existing.length - partialSize));
        queue = shuffle(all.filter(g => !used.has(g)));
    }
    while (result.length < n) {
        if (!queue.length) queue = shuffle(all);
        result.push(queue.shift());
    }
    return result;
}

function nextNumber(prefix) {
    let max = 0;
    participants.forEach(p => {
        if (p.pid.startsWith(prefix)) {
            const num = parseInt(p.pid.slice(prefix.length), 10);
            if (!isNaN(num) && num > max) max = num;
        }
    });
    return max + 1;
}

function generate() {
    const n = parseInt($('count').value, 10);
    const prefix = $('prefix').value.trim();
    const digits = Math.min(6, Math.max(1, parseInt($('digits').value, 10) || 3));
    const method = $('method').value;

    if (!(n >= 1 && n <= 900)) { toast('人數請填 1 到 900'); return; }
    if (!/^[A-Za-z0-9_-]{0,10}$/.test(prefix)) { toast('編號前綴只能用英文字母、數字、- 或 _'); return; }

    const groups = nextGroups(n, method);
    let num = nextNumber(prefix);
    const now = new Date().toISOString();
    groups.forEach(g => {
        participants.push({
            pid: prefix + String(num++).padStart(digits, '0'),
            group: g,
            sent: false,
            note: '',
            created: now
        });
    });
    save();
    saveSettings();
    render();
    $('generate-msg').textContent = `已新增 ${n} 人，名單共 ${participants.length} 人`;
}

// ---------- 畫面 ----------
function renderSummary() {
    const total = participants.length;
    const sent = participants.filter(p => p.sent).length;
    const cells = Array.from({ length: GROUPS }, (_, i) => {
        const g = i + 1;
        const inGroup = participants.filter(p => p.group === g);
        const s = inGroup.filter(p => p.sent).length;
        return `<div class="g-cell"><b>G${g}</b><span>${inGroup.length} 人</span><small>已發 ${s}</small></div>`;
    }).join('');
    $('summary').innerHTML = total
        ? `<div class="totals">共 <b>${total}</b> 人，已發送 <b>${sent}</b>，未發送 <b>${total - sent}</b></div>
           <div class="g-grid">${cells}</div>`
        : '';
}

function render() {
    const q = $('search').value.trim().toLowerCase();
    const filter = $('filter').value;
    const tbody = $('rows');
    tbody.innerHTML = '';

    participants.forEach((p, idx) => {
        if (filter === 'sent' && !p.sent) return;
        if (filter === 'unsent' && p.sent) return;
        if (q && !p.pid.toLowerCase().includes(q) && !(p.note || '').toLowerCase().includes(q)) return;

        const tr = document.createElement('tr');
        if (p.sent) tr.classList.add('is-sent');
        tr.innerHTML = `
            <td><input type="checkbox" class="sent-box" aria-label="已發送"></td>
            <td class="mono pid"></td>
            <td><span class="g-tag"></span></td>
            <td>
                <div class="link-cell">
                    <span class="mono link-text"></span>
                    <button type="button" class="copy-btn">複製</button>
                </div>
            </td>
            <td><input type="text" class="note-input" placeholder="例如：王小明 / email"></td>`;

        tr.querySelector('.pid').textContent = p.pid;
        tr.querySelector('.g-tag').textContent = 'G' + p.group;
        tr.querySelector('.link-text').textContent = linkFor(p);

        const box = tr.querySelector('.sent-box');
        box.checked = !!p.sent;
        box.addEventListener('change', () => {
            participants[idx].sent = box.checked;
            save();
            tr.classList.toggle('is-sent', box.checked);
            renderSummary();
        });

        const note = tr.querySelector('.note-input');
        note.value = p.note || '';
        note.addEventListener('change', () => {
            participants[idx].note = note.value;
            save();
        });

        tr.querySelector('.copy-btn').addEventListener('click', async () => {
            const ok = await copyText(linkFor(p));
            if (ok && !participants[idx].sent) {
                toast(`已複製 ${p.pid} 的連結。發送後記得勾選「已發送」`);
            } else {
                toast(ok ? `已複製 ${p.pid} 的連結` : '複製失敗，請手動選取連結');
            }
        });

        tbody.appendChild(tr);
    });

    $('empty').style.display = participants.length ? 'none' : 'block';
    renderSummary();
}

// ---------- CSV ----------
function csvCell(v) {
    const s = String(v == null ? '' : v);
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function exportCsv() {
    if (!participants.length) { toast('名單是空的'); return; }
    const header = ['編號', '組別', '連結', '已發送', '備註', '建立時間'];
    const lines = [header.join(',')].concat(participants.map(p => [
        p.pid, 'G' + p.group, linkFor(p), p.sent ? '是' : '否', p.note || '', p.created || ''
    ].map(csvCell).join(',')));
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = URL.createObjectURL(blob);
    a.download = `participants-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function parseCsv(text) {
    const rows = [];
    let row = [], cell = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuotes) {
            if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
            else if (c === '"') inQuotes = false;
            else cell += c;
        } else if (c === '"') inQuotes = true;
        else if (c === ',') { row.push(cell); cell = ''; }
        else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++;
            row.push(cell); rows.push(row); row = []; cell = '';
        } else cell += c;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(r => r.some(x => x.trim() !== ''));
}

function importCsv(file) {
    const reader = new FileReader();
    reader.onload = () => {
        const rows = parseCsv(String(reader.result).replace(/^﻿/, ''));
        if (rows.length < 2) { toast('CSV 沒有資料'); return; }
        const head = rows[0].map(h => h.trim());
        const col = name => head.indexOf(name);
        const iPid = col('編號'), iGroup = col('組別'), iSent = col('已發送'), iNote = col('備註'), iCreated = col('建立時間');
        if (iPid < 0 || iGroup < 0) { toast('CSV 需要「編號」和「組別」欄位'); return; }

        const list = [];
        const seen = new Set();
        for (const r of rows.slice(1)) {
            const pid = (r[iPid] || '').trim();
            const g = parseInt(String(r[iGroup] || '').replace(/[^0-9]/g, ''), 10);
            if (!/^[A-Za-z0-9_-]{1,40}$/.test(pid) || !(g >= 1 && g <= GROUPS) || seen.has(pid)) continue;
            seen.add(pid);
            const sentRaw = String(iSent >= 0 ? r[iSent] : '').trim().toLowerCase();
            list.push({
                pid,
                group: g,
                sent: ['是', 'true', '1', 'y', 'yes', 'v'].includes(sentRaw),
                note: iNote >= 0 ? (r[iNote] || '') : '',
                created: iCreated >= 0 ? (r[iCreated] || '') : ''
            });
        }
        if (!list.length) { toast('CSV 裡沒有可用的資料'); return; }
        const msg = participants.length
            ? `匯入後會取代目前的 ${participants.length} 筆名單，改成 CSV 裡的 ${list.length} 筆。確定嗎？`
            : `匯入 ${list.length} 筆名單？`;
        if (!confirm(msg)) return;
        participants = list;
        save();
        render();
        toast(`已匯入 ${list.length} 筆`);
    };
    reader.readAsText(file, 'utf-8');
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    load();
    const s = loadSettings();
    $('base-url').value = s.baseUrl || defaultBaseUrl();
    if (s.prefix != null) $('prefix').value = s.prefix;
    if (s.digits) $('digits').value = s.digits;
    if (s.method) $('method').value = s.method;

    $('generate-btn').addEventListener('click', generate);
    $('base-url').addEventListener('change', () => { saveSettings(); render(); });
    $('search').addEventListener('input', render);
    $('filter').addEventListener('change', render);
    $('export-btn').addEventListener('click', exportCsv);
    $('import-file').addEventListener('change', e => {
        if (e.target.files[0]) importCsv(e.target.files[0]);
        e.target.value = '';
    });
    $('clear-btn').addEventListener('click', () => {
        if (!participants.length) return;
        if (!confirm(`確定要清空全部 ${participants.length} 筆名單嗎？建議先匯出 CSV 備份。`)) return;
        participants = [];
        save();
        render();
    });

    render();
});