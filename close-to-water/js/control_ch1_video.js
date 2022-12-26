$(document).ready(function () {

    $(window).scroll(function (e) {
        var cur_pos = $(window).scrollTop()
        var clear_cur_pos = $(window).scrollTop() - $('#area2').offset().top
        
        if (cur_pos > $('#area2').offset().top && cur_pos < $('#area3').offset().top){
        
            var video = $('#ch1-video').get(0),
                videoLength = video.duration,
                max_scroll = $(document).height() - $(window).height() - $('#area4').offset().top;
                video.currentTime = (clear_cur_pos / max_scroll) * videoLength;
    
        // region html content
        var region1 = `
                <h3>這裡是古亭河濱公園旁的新店溪</h3>
                <img src="./materials/1-1 河濱公園.jpg">
                <div class="ch1-text">
                    根據公告，此處從上午六時至下午六時皆全面禁止水上遊憩活動
                </div>
            `
        var region2 = `
                <h3>這裡是台北市的大湖公園</h3>
                <img src="./materials/1-2 大湖公園.jpg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region3 = `
                <h3>這裡是新北市的碧潭</h3>
                <img src="./materials/1-3 碧潭.jpeg">
                <div class="ch1-text">
                    碧潭也是新北少數可以合法划船和玩SUP的地方，但因未規劃分流，今年年初發生釣客魚鉤割傷踩天鵝船遊客小腿的事件，也讓一般民眾與遊船業者的關係略顯緊張。
                </div>
            `
        var region4 = `
                <h3>這裡是新北市的微風運河（二重疏洪道）</h3>
                <img src="./materials/1-4 微風運河.jpg">
                <div class="ch1-text">
                    另一個新北開放的淡水水域是微風運河，微風運河全年開放，並區分競技類和休閒類於不同時段使用，是少數全年開放且兼顧運動選手訓練與一般民眾休閒使用的淡水水域。
                </div>
            `
        var region5 = `
                <h3>這裡是桃園的龍潭大池</h3>
                <img src="./materials/1-5 龍潭sup.jpg">
                <div class="ch1-text">
                    桃園的龍潭大池早期為灌溉用埤塘，近年則轉為觀光遊憩用途。若事先申請，可在此體驗龍舟與SUP立槳活動。
                </div>
            `
        var region6 = `
                <h3>這裡是新竹的青草湖</h3>
                <img src="./materials/1-6 青草湖.jpeg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region7 = `
                <h3>這裡是台南的運河</h3>
                <img src="./materials/1-7 台南運河.jpeg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region8 = `
                <h3>這裡是高雄的愛河</h3>
                <img src="./materials/1-8 高雄愛河.jpeg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region9 = `
                <h3>這裡是宜蘭的冬山河</h3>
                <img src="./materials/1-9 冬山河.jpeg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        var region10 = `
                <h3>這裡是宜蘭的梅花湖</h3>
                <img src="./materials/1-2 大湖公園.jpeg">
                <div class="ch1-text">
                    根據「台北市公園管理條例第13條」，在台北的公園水池和湖泊禁止「在水池或湖泊內游泳、沐浴、洗滌、網魚、釣魚、銼魚、放生、划船或其他污染毒害水質及傷害動植物之行為」，全台北市只有大湖公園和碧湖公園可以合法釣魚
                </div>
            `
        // set up html content by video current time
        if (video.currentTime >= 0 && video.currentTime < 4){
            console.log('test1')
            $('#ch1-supplement').html(region1)
        }

        if (video.currentTime >= 4 && video.currentTime < 8){
            console.log('test2')
            $('#ch1-supplement').html(region2)
        }

        if (video.currentTime > 8 && video.currentTime < 12){
            console.log('test3')
            $('#ch1-supplement').html(region3)
        }

        if (video.currentTime > 12 && video.currentTime < 16){
            console.log('test4')
            $('#ch1-supplement').html(region4)
        }

        if (video.currentTime > 16 && video.currentTime < 20){
            console.log('test5')
            $('#ch1-supplement').html(region5)
        }

        if (video.currentTime > 20 && video.currentTime < 24){
            console.log('test6')
            $('#ch1-supplement').html(region6)
        }

        if (video.currentTime > 24 && video.currentTime < 28){
            console.log('test7')
            $('#ch1-supplement').html(region7)
        }

        if (video.currentTime > 28 && video.currentTime < 32){
            console.log('test8')
            $('#ch1-supplement').html(region8)
        }

        if (video.currentTime > 32 && video.currentTime < 36){
            $('#ch1-supplement').html(region9)
        }


        }







        

    });

    /* 
    $(window).scroll(function (e) {
        //document.querySelector('#video').play();
        var video = $('#video').get(0),
            videoLength = video.duration,
            current_pos = $(document).scrollTop();
        video.currentTime = videoLength * (current_pos / max_scroll);
    });

    var left = $('#ch1-video-control').height()
    var right = $('#ch1-supplement').height()
    var vv = $('#ch1-video').height()
    console.log(left, right, vv)
    */
})
