document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    const groupCode = reviewId.replace('G', '');

    const doctorInfo = {
        doctor: ['郝嘉榮醫師', '陳耀文醫師', '劉淑卿醫師', '洪雅亭醫師', '林芳民醫師', '張夏年醫師', '李明和醫師', '王志勇醫師', '潘映逵醫師'],
        name: ['家在診所', '功緣診所', '樂健康聯合診所', '禾齡診所', '康沐聯合診所', '心必順診所', '蘭傑診所', '安久診所', '鵬程診所'],
        address:
            ['臺北市大安區敦化南路二段350號1樓', '臺北市大安區樂業街561號', '臺北市大安區和平東路三段475巷66號',
                '臺北市大安區復興南路二段291號', '臺北市大安區瑞安街208巷82弄106號', '臺北市大安區新生南路二段96號',
                '臺北市大安區龍泉街199號', '臺北市大安區仁愛路三段24巷35-1號', '臺北市大安區四維路66巷12號'
            ],
        tel: ['02-2734-7509', '02-8735-1467', '02-2312-7690', '02-2701-0356', '02-2706-5945', '02-2358-7004', '02-2369-5561', '02-2325-9082', '02-2707-8655']
    };

    const commentInfo = {
        CP1: [{ rating: '5', content: '診所環境很舒適，醫生在看診過程非常親切，很有耐心回答問題，而且非常專業，用藥真的有解決我的問題，大推。' }],
        CP2: [{ rating: '5', content: '過敏很久了，卻一直沒辦法找到適合的治療方式，還好醫生仔細地做了各種檢查，終於慢慢好起來了！超級感謝醫生！' }],
        CP3: [{ rating: '5', content: '醫生對待我阿公就像自己的阿公一樣親切溫暖，每次回診都很關心他的身體狀況，阿公也覺得揪甘心～' }],
        CN1: [{ rating: '2', content: '耳朵一直很癢去看醫生，結果醫生拿器具照耳朵時手掌放在我肩膀上，還捏了捏，感覺不太舒服……女生們小心點' }],
        CN2: [{ rating: '2', content: '醫生因為病患很多有點敷衍，還整個懶的解釋，沒有想好好回答我的問題，能理解病人多，但希望醫生能在應對上稍微用心些...' }],
        CN3: [{ rating: '2', content: '覺得醫生根本只想讓病人吃藥，聊沒幾句就說吃個藥就會好了。根本不像評價寫的那麼有耐心。' }],
        UN1: [{ rating: '1', content: '等太久了！為什麼醫生一直在跟護士聊天把妹阿？請假來看診，卻等到下班時間都還沒看到，那我請假請辛酸的喔？媽的，浪費時間！' }],
        UN2: [{ rating: '1', content: '用貶低人的方式跟病人溝通，我他媽都有病了，還要被你亂罵一通，我就問誰能接受？不是給了藥就好，藥每間診所都會開' }],
        UN3: [{ rating: '1', content: '爛透了，醫生完全不聽，只顧說自己的，完全不管病人感受。看診隨便、還一直轉筆發出噪音讓人煩躁，把病人當智障喔！' }]
    }

    const avatar = {
        A: "./assets/A.png", B1: "./assets/B1.png", B2: "./assets/B2.png", B3: "./assets/B3.png", C1: "./assets/C1.png", C2: "./assets/C2.png", C3: "./assets/C3.png"
    }

    const reviewData = {
        G1: [
            { id: 'G1-1', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G1-2', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G1-3', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G1-4', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G1-5', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G1-6', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G1-7', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G1-8', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G1-9', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
        ],
        G2: [
            { id: 'G2-1', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G2-2', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G2-3', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G2-4', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G2-5', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G2-6', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G2-7', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G2-8', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G2-9', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
        ],
        G3: [
            { id: 'G3-1', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G3-2', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G3-3', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G3-4', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G3-5', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G3-6', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G3-7', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G3-8', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G3-9', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
        ],
        G4: [
            { id: 'G4-1', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G4-2', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G4-3', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G4-4', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G4-5', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G4-6', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G4-7', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G4-8', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G4-9', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
        ],
        G5: [
            { id: 'G5-1', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G5-2', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G5-3', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G5-4', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G5-5', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G5-6', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G5-7', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G5-8', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G5-9', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
        ],
        G6: [
            { id: 'G6-1', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G6-2', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G6-3', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G6-4', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G6-5', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G6-6', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G6-7', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G6-8', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G6-9', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
        ],
        G7: [
            { id: 'G7-1', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G7-2', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G7-3', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G7-4', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G7-5', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G7-6', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G7-7', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G7-8', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G7-9', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
        ],
        G8: [
            { id: 'G8-1', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G8-2', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G8-3', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
            { id: 'G8-4', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G8-5', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G8-6', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G8-7', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G8-8', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G8-9', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
        ],
        G9: [
            { id: 'G9-1', avatar: avatar.C3, rating: commentInfo.UN3[0].rating, comment: commentInfo.UN3[0].content },
            { id: 'G9-2', avatar: avatar.A, rating: commentInfo.UN1[0].rating, comment: commentInfo.UN1[0].content },
            { id: 'G9-3', avatar: avatar.B3, rating: commentInfo.UN2[0].rating, comment: commentInfo.UN2[0].content },
            { id: 'G9-4', avatar: avatar.C1, rating: commentInfo.CP3[0].rating, comment: commentInfo.CP3[0].content },
            { id: 'G9-5', avatar: avatar.A, rating: commentInfo.CP1[0].rating, comment: commentInfo.CP1[0].content },
            { id: 'G9-6', avatar: avatar.B1, rating: commentInfo.CP2[0].rating, comment: commentInfo.CP2[0].content },
            { id: 'G9-7', avatar: avatar.C2, rating: commentInfo.CN3[0].rating, comment: commentInfo.CN3[0].content },
            { id: 'G9-8', avatar: avatar.A, rating: commentInfo.CN1[0].rating, comment: commentInfo.CN1[0].content },
            { id: 'G9-9', avatar: avatar.B2, rating: commentInfo.CN2[0].rating, comment: commentInfo.CN2[0].content },
        ]
    };

    if (doctorInfo) {
        document.getElementById('doctor-profile').innerHTML = `
            <article class="doctorcard">
                <img class="avatar" src="./assets/image_doctor.png" alt="醫生圖片">
                <div class="doctor_info">
                    <h2>${doctorInfo.doctor[groupCode - 1]}</h2>
                    <h3>${doctorInfo.name[groupCode - 1]}</h3>
                    <address>${doctorInfo.address[groupCode - 1]}</address>
                    <p>聯絡電話：${doctorInfo.tel[groupCode - 1]}</p>
                </div>
            </article>
        `
    } 

    const review = reviewData[reviewId];
    if (review && review.length > 0) {
        const content = review.map((item, index) => `
        <section id=reviewSection${index + 1}>
            <div class="single-comment-container">
                <div class="reviewer fix-container"><img class="avatar" src="${item.avatar}" alt="使用者頭像"></div>
                <div class="wrapper">
                    <div class="serial">#${index + 1}</div>
                    <div class="rating">
                        ${Array.from({ length: 5 }, (_, i) => `<span class="fa fa-star ${i < item.rating ? 'checked' : ''}"></span>`).join('')}
                    </div>
                    <div class="comment-content"><span>${item.comment}</span></div>
                </div>
                <button id="fillSurveyBtn${index + 1}" class="fill-survey-btn">填寫問卷</button>
            </div>
            <div id="google-form-container${index + 1}" class="google-form-container ans-container hide">
                <iframe id="Form${index + 1}" src="https://docs.google.com/forms/d/e/1FAIpQLSfZRMJvlKN62eoZPEdDMU-bbtJ9FBdyHD7KXHJ0Qq6dBjb7ng/viewform?embedded=true" width="640" height="800" frameborder="0"></iframe>
            </div>
        </section>
        <hr>
    `).join('');
        document.getElementById('review-content').innerHTML = content;
    } else {
        document.getElementById('review-content').innerHTML = '<p>目前沒有對應的評論資料。</p>';
    }


    document.querySelectorAll('.fill-survey-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log('click')
            document.getElementById(`google-form-container${index + 1}`).classList.remove('hide');

        });
    });


    // 獲取所有相關元素
    $(document).ready(function () {
        const formContainers = document.querySelectorAll('.google-form-container');
        const surveySections = document.querySelectorAll('.ans-container');
        const fillSurveyBtns = document.querySelectorAll('.fill-survey-btn');
    
        formContainers.forEach((formContainer, index) => {
            let checkstatus = 0;
            const form = document.querySelector(`#Form${index + 1}`);
            const btn = document.querySelector(`#submitBtn${index + 1}`);
    
            form.addEventListener("load", function (e) {
                checkstatus++;
                //console.log(`Form${index + 1} load: ${checkstatus}`);
                
                if (checkstatus === 2) {
                    formContainers[index].classList.add('hide')
                    document.getElementById(`fillSurveyBtn${index + 1}`).innerText = '已完成填答';
                    fillSurveyBtns[index].setAttribute('disabled', true);
                }
            });

            form.addEventListener("submit", function (e) {
                console.log('form submit')
                document.getElementById(`fillSurveyBtn${index + 1}`).innerText = '已完成填答';
            })
        });
    });
    


});