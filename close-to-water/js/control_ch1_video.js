$(document).ready(function () {

    $(window).scroll(function (e) {
        var cur_pos = $(window).scrollTop()
        var clear_cur_pos = $(window).scrollTop() - $('#area2').offset().top

        // region html content
        var region1 = `
                <h3>限時禁止水上活動的新店溪</h3>
                <img src="./materials/1-1 河濱公園.jpg">
                <div class="ch1-text">
                    根據公告，此處從下午六時至上午六時皆全面禁止水上遊憩活動
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
                <h3>少數合法開放水上遊憩活動的碧潭</h3>
                <img src="./materials/1-3 碧潭.jpeg">
                <div class="ch1-text">
                    碧潭也是新北少數可以合法划船和玩SUP的地方，但因未規劃分流，今年年初發生釣客魚鉤割傷踩天鵝船遊客小腿的事件，也讓一般民眾與遊船業者的關係略顯緊張。
                </div>
            `
        var region4 = `
                <h3>全年開放的新北微風運河（二重疏洪道）</h3>
                <img src="./materials/1-4 微風運河.jpg">
                <div class="ch1-text">
                    另一個新北開放的淡水水域是微風運河，微風運河全年開放，並區分競技類和休閒類於不同時段使用，是少數全年開放且兼顧運動選手訓練與一般民眾休閒使用的淡水水域。
                </div>
            `
        var region5 = `
                <h3>採申請制的桃園龍潭大池</h3>
                <img src="./materials/1-5 龍潭sup.jpg">
                <div class="ch1-text">
                    桃園的龍潭大池早期為灌溉用埤塘，近年則轉為觀光遊憩用途。若事先申請，可在此體驗龍舟與SUP立槳活動。
                </div>
            `
        var region6 = `
                <h3>委外經營的新竹青草湖</h3>
                <img src="./materials/1-6 青草湖.jpeg">
                <div class="ch1-text">
                    
                </div>
            `
        var region7 = `
                <h3>採事先申請制的台南運河</h3>
                <img src="./materials/1-7 台南運河.jpeg">
                <div class="ch1-text">
                    
                </div>
            `
        var region8 = `
                <h3>掃QRcode即可下水的高雄愛河</h3>
                <img src="./materials/1-8 高雄愛河.jpeg">
                <div class="ch1-text">
                    
                </div>
            `
        var region9 = `
            <h3>採特許制的宜蘭梅花湖</h3>
            <img src="./materials/1-9 梅花湖.jpg">
            <div class="ch1-text">
                
            </div>
            `
        var region10 = `
            <h3>全面管制中 - 宜蘭冬山河</h3>
            <img src="./materials/1-10 冬山河.jpg">
            <div class="ch1-text">
                
            </div>
            `
        
        if (clear_cur_pos > $('#area2').offset().top && clear_cur_pos < $('#area3').offset().top){
            console.log('remove hide')
            $('#ch1-supplement').removeClass('hide')
        
            var video = $('#ch1-video').get(0),
                videoLength = video.duration,
                max_scroll = $(document).height() - $(window).height() - $('#area4').offset().top;
                video.currentTime = (clear_cur_pos / max_scroll) * videoLength;
        
            // set up html content by video current time
            if (video.currentTime >= 0 && video.currentTime < 6){
                $('#ch1-supplement').html(region1)
            }

            if (video.currentTime >= 6 && video.currentTime < 10){
                $('#ch1-supplement').html(region2)
            }

            if (video.currentTime >= 10 && video.currentTime < 14){
                $('#ch1-supplement').html(region3)
            }

            if (video.currentTime >= 15 && video.currentTime < 18){
                $('#ch1-supplement').html(region4)
            }

            if (video.currentTime >= 18 && video.currentTime < 22){
                $('#ch1-supplement').html(region5)
            }

            if (video.currentTime >= 22 && video.currentTime < 26){
                $('#ch1-supplement').html(region6)
            }

            if (video.currentTime >= 26 && video.currentTime < 29){
                $('#ch1-supplement').html(region7)
            }

            if (video.currentTime >= 29 && video.currentTime < 33){
                $('#ch1-supplement').html(region8)
            }

            if (video.currentTime >= 33 && video.currentTime < 38){
                $('#ch1-supplement').html(region9)
            }

            if (video.currentTime >= 38 && video.currentTime < 41){
                $('#ch1-supplement').html(region10)
            }

            if (video.currentTime >= 41.5 && video.currentTime < 43){
                $('#ch1-supplement').addClass('hide')
            }
        
        
        } else {

            $('#ch1-supplement').addClass('hide')
        }
        
        
    });


})
