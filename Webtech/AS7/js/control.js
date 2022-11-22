$(document).ready(function () {
    var max_scroll = $(document).height() - $(window).height() - 2400;
    $(window).scroll(function (e) {
        //document.querySelector('#video').play();
        var video = $('#video').get(0),
            videoLength = video.duration,
            current_pos = $(document).scrollTop();
        video.currentTime = videoLength * (current_pos / max_scroll);
        if (current_pos > 19780) {
            $('#showvideotext').removeClass('hide')
        }
    });
})