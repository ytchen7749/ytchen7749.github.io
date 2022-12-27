$(document).ready(function () {

    $(window).scroll(function (e) {
        var cur_pos = $(window).scrollTop()
        var clear_cur_pos = $(window).scrollTop() - $('#area2').offset().top

        // region html content
        var region1 = `
                <h3>台灣人與水的日常互動</h3>
                <img src="./materials/1-1 河濱公園.jpg">
                <div class="ch1-text">
                「禁止下水」是台灣淡水水邊最常見的告示牌。也是台灣人民與水常見的關係。
                </div>
            `
        var region2 = `
                <h3>少數開放釣魚的台北大湖公園</h3>
                <img src="./materials/1-2 大湖公園.jpg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region3 = `
                <h3>SUP與經營業者並行的碧潭</h3>
                <img src="./materials/1-3 碧潭.jpeg">
                <div class="ch1-text">
                    碧潭有部分區域可以合法划船與玩SUP。但因為規劃不良，今年初發生釣客魚鉤割傷踩天鵝船遊客小腿的事件，也讓一般民眾與遊船業者的關係略顯緊張。
                </div>
            `
        var region4 = `
                <h3>北部少數開放可以玩無動力游具的水域</h3>
                <img src="./materials/1-4 微風運河.jpg">
                <div class="ch1-text">
                    另一個新北開放的淡水水域是微風運河，微風運河全年開放，並區分競技類和休閒類於不同時段使用，是少數全年開放且兼顧運動選手訓練與一般民眾休閒使用的淡水水域。
                </div>
            `
        var region5 = `
                <h3>業者經營的龍潭大池</h3>
                <img src="./materials/1-5 龍潭sup.jpg">
                <div class="ch1-text">
                    桃園的龍潭大池早期為灌溉用埤塘，近年則轉為觀光遊憩用途。可以藉由活動或外包業者提供的體驗，下水玩SUP。但民眾可否自行申請尚未明確。
                </div>
            `
        var region6 = `
                <h3>業者經營的青草湖</h3>
                <img src="./materials/1-6 青草湖.jpeg">
                <div class="ch1-text">
                    目前青草湖為外包業者所經營，需經由業者方案或活動才能下水。
                </div>
            `
        var region7 = `
                <h3>特定活動開放的台南運河</h3>
                <img src="./materials/1-7 台南運河.jpeg">
                <div class="ch1-text">
                    除有特殊活動或特別申請外，目前民眾被禁止下水。
                </div>
            `
        var region8 = `
                <h3>掃QRcode即可下水的高雄愛河</h3>
                <img src="./materials/1-8 高雄愛河.jpeg">
                <div class="ch1-text">
                    民眾只要掃QR code，即可在06:00-19:00下水活動。
                </div>
            `
        var region9 = `
            <h3>特定活動開放的梅花湖</h3>
            <img src="./materials/1-9 梅花湖.jpg">
            <div class="ch1-text">
                除特殊活動外，目前民眾被禁止下水。
            </div>
            `
        var region10 = `
            <h3>特定活動開放的冬山河</h3>
            <img src="./materials/1-10 冬山河.jpg">
            <div class="ch1-text">
                除被允許的體育活動、業者經營船隻或特殊活動外，目前民眾被禁止下水。
            </div>
            `
        
        if (cur_pos > $('#area2').offset().top && cur_pos < $('#area3').offset().top){
            $('#ch1-supplement').removeClass('hide')
        
            var video = $('#ch1-video').get(0),
                videoLength = video.duration,
                max_scroll = $(document).height() - $(window).height() - $('#area4').offset().top;
                video.currentTime = (clear_cur_pos / max_scroll) * videoLength;
        
            console.log(video.currentTime)
            // set up html content by video current time
            if(video.currentTime > 0 && video.currentTime < 3.2 
                || video.currentTime > 6 && video.currentTime < 6.8
                || video.currentTime > 10 && video.currentTime < 10.44
                || video.currentTime > 18 && video.currentTime < 20
                || video.currentTime > 20 && video.currentTime < 22.8
                || video.currentTime > 24.9 && video.currentTime < 27.5
                || video.currentTime > 30.07 && video.currentTime < 31
                || video.currentTime > 32.12 && video.currentTime < 34.9
                || video.currentTime > 38.6 && video.currentTime < 40){
                $('#ch1-supplement').html('')
            }

            if (video.currentTime >=3.3 && video.currentTime < 6){
                $('#ch1-supplement').html(region1)//古亭
            }

            if (video.currentTime >= 6.8 && video.currentTime < 10){
                $('#ch1-supplement').html(region2)//大湖
            }

            if (video.currentTime >= 10.45 && video.currentTime < 14){
                $('#ch1-supplement').html(region3)//碧潭
            }

            if (video.currentTime >= 15 && video.currentTime < 18){
                $('#ch1-supplement').html(region4)//微風運河
            }

            if (video.currentTime >= 20 && video.currentTime < 22){
                $('#ch1-supplement').html(region5)//龍潭
            }

            if (video.currentTime >= 22.8 && video.currentTime < 24.9){
                $('#ch1-supplement').html(region6)//青草湖
            }

            if (video.currentTime >= 27.5 && video.currentTime < 30){
                $('#ch1-supplement').html(region7)//台南運河
            }

            if (video.currentTime >= 31 && video.currentTime < 33){
                $('#ch1-supplement').html(region8)//高雄愛河
            }

            if (video.currentTime >= 34.9 && video.currentTime < 38){
                $('#ch1-supplement').html(region9)//梅花湖
            }

            if (video.currentTime >= 40 && video.currentTime < 41){
                $('#ch1-supplement').html(region10)//冬山河
            }

            if (video.currentTime >= 41.5 && video.currentTime < 43){
                $('#ch1-supplement').addClass('hide')
            }
        
        
        } else {

            $('#ch1-supplement').addClass('hide')
        }
        
        
    });


})
