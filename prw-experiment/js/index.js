function updateDistricts() {
    const citySelect = document.getElementById("city-select");
    const districtSelect = document.getElementById("district-select");
    const message = document.getElementById("message");
    message.style.display = "none";
    
    const districts = {
        "台北市": ["松山區", "信義區", "大安區", "中山區", "中正區", "大同區", "萬華區", "文山區", "南港區", "內湖區", "士林區", "北投區",],
        "新北市": ["萬里區", "金山區", "板橋區", "汐止區", "深坑區", "石碇區", "瑞芳區", "平溪區", "雙溪區", "貢寮區", "新店區", "坪林區", 
                "烏來區", "永和區", "中和區", "土城區", "三峽區", "樹林區", "鶯歌區", "三重區", "新莊區", "泰山區", "林口區", "蘆洲區", "五股區", "八里區", "淡水區", "三芝區", "石門區",],
        "基隆市": ["中正區", "七堵區", "暖暖區", "仁愛區", "中山區", "安樂區", "信義區", ],
        "台中市": ["西屯區", "北屯區", "南屯區"],
        "高雄市": ["苓雅區", "三民區", "鼓山區"],
        "台南市": ["東區", "南區", "北區"],
        "花蓮縣": ["花蓮市", "吉安鄉", "壽豐鄉"],
        "台東縣": ["台東市", "成功鎮", "太麻里鄉"]
    };
    
    const selectedCity = citySelect.value;
    districtSelect.innerHTML = "<option value=''>請選擇區域</option>";
    
    if (selectedCity in districts) {
        districts[selectedCity].forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function searchDoctors() {
    const category = document.getElementById("category-select").value;
    const city = document.getElementById("city-select").value;
    const district = document.getElementById("district-select").value;
    const message = document.getElementById("message");
    
    if (category === "家醫科" && city === "台北市" && district === "大安區") {
        window.location.href = "list.html";
    } else {
        message.style.display = "block";
        message.textContent = "目前未提供服務";
    }
}

function resetMessage() {
    document.getElementById("message").style.display = "none";
}