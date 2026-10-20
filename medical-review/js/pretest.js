// ===== 前測頁設定 =====
// 1. 把前測 Google 表單的嵌入網址貼在這裡（網址結尾要有 ?embedded=true）
const PRETEST_FORM_URL = '"https://docs.google.com/forms/d/e/1FAIpQLSekhFqYyVn3o8lJPqvd6MdbnwLZIuksKhaCZQdJ5HdVAkmoYA/viewform?embedded=true"';
// 2. 前測表單有幾頁（Google 表單裡的「區段」數）。單頁表單填 1。
const PRETEST_FORM_PAGES = 1;

document.addEventListener('DOMContentLoaded', async () => {
    const iframe = document.getElementById('pretest-form');
    const nextBtn = document.getElementById('next-btn');
    const hint = document.getElementById('next-hint');
    const notice = document.getElementById('config-notice');

    const form = normalizeFormUrl(PRETEST_FORM_URL);
    if (form.error) {
        notice.textContent = '前測表單網址有問題（js/pretest.js 的 PRETEST_FORM_URL）：' + form.error;
        notice.classList.remove('hide');
        iframe.classList.add('hide');
        return;
    }

    // 進入實驗時就確定組別與受試者編號（依點擊順序或專屬連結），之後各頁沿用
    hint.textContent = '問卷載入中，請稍候…';
    const { group, pid, source } = await initParticipant();
    console.log('受試者：', pid, '組別：', 'G' + group, '來源：', source);
    hint.textContent = '完成並送出問卷後，下方按鈕才會開放。';
    iframe.src = addPrefill(form.url, 'pretest', { pid, group: 'G' + group });

    watchFormSubmit(iframe, PRETEST_FORM_PAGES, () => {
        logStage('pretest');
        nextBtn.disabled = false;
        hint.textContent = '問卷已送出，請點擊下方按鈕繼續。';
    });

    nextBtn.addEventListener('click', () => {
        window.location.href = withGroupParam('index.html');
    });
});