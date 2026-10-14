// ===== 前測頁設定 =====
// 1. 把前測 Google 表單的嵌入網址貼在這裡（網址結尾要有 ?embedded=true）
const PRETEST_FORM_URL = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSekhFqYyVn3o8lJPqvd6MdbnwLZIuksKhaCZQdJ5HdVAkmoYA/viewform?embedded=true" width="640" height="3852" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>';
// 2. 前測表單有幾頁（Google 表單裡的「區段」數）。單頁表單填 1。
const PRETEST_FORM_PAGES = 1;

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('pretest-form');
    const nextBtn = document.getElementById('next-btn');
    const hint = document.getElementById('next-hint');
    const notice = document.getElementById('config-notice');

    if (!PRETEST_FORM_URL) {
        notice.textContent = '尚未設定前測表單網址：請在 js/pretest.js 的 PRETEST_FORM_URL 填入 Google 表單嵌入網址。';
        notice.classList.remove('hide');
        iframe.classList.add('hide');
        return;
    }

    iframe.src = PRETEST_FORM_URL;

    watchFormSubmit(iframe, PRETEST_FORM_PAGES, () => {
        nextBtn.disabled = false;
        hint.textContent = '問卷已送出，請點擊下方按鈕繼續。';
    });

    nextBtn.addEventListener('click', () => {
        window.location.href = withGroupParam('index.html');
    });
});
