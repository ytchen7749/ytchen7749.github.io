document.addEventListener("DOMContentLoaded", function () {



    const container = document.getElementById("returndoctor");
    let blocks = Array.from(document.querySelectorAll(".doctorcard"));
    
    // 按鈕點擊
    document.querySelectorAll('.gotoReview').forEach(button => {
        button.addEventListener('click', () => {
            const reviewId = button.getAttribute('data-id');
            window.location.href = `review.html?id=${reviewId}`;
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.matches('button.gotoReview:disabled')) {
            alert('請依照實驗指示進行');
        }
    });


    function shuffleBlocks() {
        // Fisher-Yates 洗牌算法來隨機排列區塊
        for (let i = blocks.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
        }
        
        // 清空並重新加入打亂後的區塊
        container.innerHTML = "";
        blocks.forEach(block => container.appendChild(block));
        
        // 更新按鈕狀態
        updateButtons();
    }
    
    function updateButtons() {
        document.querySelectorAll(".doctorcard button").forEach(button => {
            button.disabled = true;
        });
        
        // 只有第一個區塊的按鈕可用
        blocks[0].querySelector("button").disabled = false;
    }
    
    // 初始化隨機排序
    shuffleBlocks();

    
});
