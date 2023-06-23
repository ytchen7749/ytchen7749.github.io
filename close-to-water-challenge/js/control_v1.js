$(document).ready(function () {

    $(window).scroll(function (e) {
        //get position
        var cur_pos = $(window).scrollTop()
        var triggerpoint = $('#S4').offset().top + $('#S4').height() //trigger line
        var cur_local_pos = $(window).scrollTop() - triggerpoint
        // get scroll length
        var videoScroll = $('#video2').height() + $(window).height()
        var video = $('#video2').get(0),
            videoLength = 109;
            video.currentTime = (cur_local_pos/videoScroll)*videoLength;

        if (cur_pos > triggerpoint && video.currentTime < 108.87){
            $('#video2').addClass('sticky')

            if (video.currentTime > 1.5 && video.currentTime < 10) {
                $('.text1').removeClass('hide')
            } else {
                $('.text1').addClass('hide')
            }

            if (video.currentTime > 12 && video.currentTime < 25) {
                $('.text2').removeClass('hide')
            } else {
                $('.text2').addClass('hide')
            }

            if (video.currentTime > 25 && video.currentTime < 28) {
                $('.text3').removeClass('hide')
            } else {
                $('.text3').addClass('hide')
            }

            if (video.currentTime > 40 && video.currentTime < 46) {
                $('.text4').removeClass('hide')

            } else {
                $('.text4').addClass('hide')
            }

            if (video.currentTime > 58 && video.currentTime < 64) {
                $('.text5').removeClass('hide')

            } else {
                $('.text5').addClass('hide')
            }

            if (video.currentTime > 80 && video.currentTime < 85) {
                $('.text6').removeClass('hide')
            } else {
                $('.text6').addClass('hide')
            }

            if (video.currentTime > 93 && video.currentTime < 98) {
                $('.text7').removeClass('hide')
            } else {
                $('.text7').addClass('hide')
            }

            if (video.currentTime > 102 && video.currentTime < 107) {
                $('.text8').removeClass('hide')
            } else {
                $('.text8').addClass('hide')
            }
        
        } else {
            $('#video2').removeClass('sticky')

        }

    });
})