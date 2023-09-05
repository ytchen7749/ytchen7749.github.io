// 從 localStorage 中讀取已有的留言和時間
function loadMessagesData() {
    const messagesWithTime = JSON.parse(localStorage.getItem('messagesWithTime')) || [];
    return messagesWithTime;
}

//取得時間表示法1
function getLocalTimeAsString() {
    const localTime = new Date();
    return localTime.toLocaleString(); // 轉換成本地時間的字串表示
}

//取得時間表示法2
function getShortLocalTime() {
    const localTime = new Date();
    const year = localTime.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (localTime.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because it's 0-based
    const day = localTime.getDate().toString().padStart(2, '0');
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

// 顯示留言和時間
function displayReplyMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    var countnum = 0
    const messagesData = loadMessagesData();
    messagesData.forEach(data => {
        countnum++
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('reply-container')
        messageDiv.innerHTML =
            "<div class='reply-metadata'>" +
            "<span class='seq'>" + "B" + countnum + "</span>" +
            "<span class='date'>" + data.time + "</span>" +
            "</div>" +
            "<div class='reply-content'>" + data.message + "</div>" +
            "<hr>"
        messageList.appendChild(messageDiv);
    });
}

// 儲存留言和時間到 localStorage
function saveMessage(message) {
    const messagesWithTime = loadMessagesData();
    const localTime = getLocalTimeAsString(); // Outputs like "9/5/2023, 12:09:28 PM"
    // const localTime = getShortLocalTime(); // Outputs like "23/05/31 13:41"
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
            saveMessage(message);
            messageInput.value = '';
            current.textContent = 0
            displayReplyMessages();
        }
    });

    messageInput.addEventListener('keyup', function () {
        const characterCount = this.value.length;
        current.textContent = characterCount;
    });

    const clearButton = document.getElementById('clearBtn');
    clearButton.addEventListener('click', () => {
        const check = window.prompt("enter code or ask for help:")
        if (check == '4523') {
            localStorage.clear();
            messageList.innerHTML = '';
        }
        
    });

    

    displayReplyMessages();
});
