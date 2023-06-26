$(document).ready(function () {

    AOS.init();

    $(window).scroll(function (e) {
        //get video
        var video = $('#video2').get(0),
            videoLength = 109;

        //note
        var scrollPos = $(window).scrollTop(), //滑到哪裡
            B = $(window).height(), //視窗高度
            triggerpoint = $('#video-section').offset().top, //上緣
            D = $('#video2').height(), //video高度
            E = $(window).scrollTop() + $(window).height() > $('#video-section').offset().top, //目標出現在可視範圍
            F = $('#T4').offset().top - $('#video2').offset().top + $(window).height(),
            ratio = (scrollPos - triggerpoint - D) / $('#video-section').height(); //滑動了多少

        video.currentTime = ratio * videoLength;
        console.log(video.currentTime )

        //video-box
        if (scrollPos + $(window).height() * 0.3 > triggerpoint && video.currentTime < 108.87) {
            $('.video-wrapper').addClass('sticky')
        } else {
            $('.video-wrapper').removeClass('sticky')
        }

        //text-show
        if (video.currentTime > 2 && video.currentTime < 9) {
            $('.v2-text1').removeClass('hide')
            $('.v2-text1').addClass('show-slowly')
        } else {
            $('.v2-text1').addClass('hide')
        }

        if (video.currentTime > 14 && video.currentTime < 20) {
            $('.v2-text2').removeClass('hide')
            $('.v2-text2').addClass('show-slowly')
        } else {
            $('.v2-text2').addClass('hide')
        }

        if (video.currentTime > 25 && video.currentTime < 30) {
            $('.v2-text3').removeClass('hide')
            $('.v2-text3').addClass('show-slowly')
        } else {
            $('.v2-text3').addClass('hide')
        }

        if (video.currentTime > 42 && video.currentTime < 46) {
            $('.v2-text4').removeClass('hide')
            $('.v2-text4').addClass('show-slowly')
        } else {
            $('.v2-text4').addClass('hide')
        }

        if (video.currentTime > 58 && video.currentTime < 62) {
            $('.v2-text5').removeClass('hide')
            $('.v2-text5').addClass('show-slowly')
        } else {
            $('.v2-text5').addClass('hide')
        }

        if (video.currentTime > 82 && video.currentTime < 88) {
            $('.v2-text6').removeClass('hide')
            $('.v2-text6').addClass('show-slowly')
        } else {
            $('.v2-text6').addClass('hide')
        }

        if (video.currentTime > 95 && video.currentTime < 99) {
            $('.v2-text7').removeClass('hide')
            $('.v2-text7').addClass('show-slowly')
        } else {
            $('.v2-text7').addClass('hide')
        }

        if (video.currentTime > 106 && video.currentTime < 108.8) {
            $('.v2-text8').removeClass('hide')
            $('.v2-text8').addClass('show-slowly')
        } else {
            $('.v2-text8').addClass('hide')
        }

    });


    
})