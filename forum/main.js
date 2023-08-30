// 從 localStorage 中讀取已有的留言和時間
function loadMessagesWithTime() {
    const messagesWithTime = JSON.parse(localStorage.getItem('messagesWithTime')) || [];
    return messagesWithTime;
}

//取得時間
function getLocalTimeAsString() {
    const localTime = new Date();
    return localTime.toLocaleString(); // 轉換成本地時間的字串表示
}

// 顯示留言和時間
function displayMessagesWithTime() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    const messagesWithTime = loadMessagesWithTime();
    messagesWithTime.forEach(data => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${data.message} - ${data.time}`;
        messageList.appendChild(messageDiv);
    });
}

// 儲存留言和時間到 localStorage
function saveMessageWithTime(message) {
    const messagesWithTime = loadMessagesWithTime();
    const localTime = getLocalTimeAsString();
    messagesWithTime.push({ message: message, time: localTime });
    localStorage.setItem('messagesWithTime', JSON.stringify(messagesWithTime));
}

// 初始化，綁定按鈕點擊事件
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (message !== '') {
            saveMessageWithTime(message);
            // messageInput.value = '';
            //displayMessagesWithTime();
        }
    });

    const clearButton = document.getElementById('clearBtn');
    clearButton.addEventListener('click', () => {
        localStorage.clear();
        //displayMessagesWithTime();
    });

    //displayMessagesWithTime();
});
