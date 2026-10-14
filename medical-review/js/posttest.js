// ===== 後測頁設定 =====
// 1. 後測 Google 表單的嵌入網址（結尾要有 ?embedded=true）
const POSTTEST_FORM_URL = '"https://docs.google.com/forms/d/e/1FAIpQLSfMs1y_5CHXphFKcRvPS7JHUTJrGiTTA-y0HdA0Hk5XEK8XqQ/viewform?embedded=true"';
// 2. 後測表單有幾頁（Google 表單裡的「區段」數）。單頁表單填 1。
const POSTTEST_FORM_PAGES = 1;
// 3.（選用）9 組共用同一份後測時，可自動預填組別（如 G3），方便分析時分組。
//    在表單加一題簡答，用「取得預先填入的連結」找到 entry 編號（如 'entry.123456789'）填在這裡。
const PREFILL_ENTRY_GROUP = '';

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('posttest-form');
    const notice = document.getElementById('config-notice');

    const form = normalizeFormUrl(POSTTEST_FORM_URL);
    if (form.error) {
        notice.textContent = '後測表單網址有問題（js/posttest.js 的 POSTTEST_FORM_URL）：' + form.error;
        notice.classList.remove('hide');
        iframe.classList.add('hide');
        return;
    }

    // 組別沿用 review 頁分派的結果（同一次瀏覽中會記住）
    const group = resolveGroup();
    let url = form.url;
    if (PREFILL_ENTRY_GROUP) {
        url += '&usp=pp_url&' + PREFILL_ENTRY_GROUP + '=G' + group;
    }
    iframe.src = url;

    watchFormSubmit(iframe, POSTTEST_FORM_PAGES, () => {
        document.getElementById('survey-step').classList.add('hide');
        document.getElementById('thanks-step').classList.remove('hide');
        window.scrollTo(0, 0);
    });
});