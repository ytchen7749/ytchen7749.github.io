$(function() {

    var window_width = $(window).width() - $('#moved').width();
    console.log('window width\t' + $(window).width());
    console.log('object width\t' + $('#moved').width());

    var area = [0, //arr[0]
        $('#area1').offset().top, //area[1] Ch1 Title
        $('#area2').offset().top, //area[2] Ch1 Content
        $('#area3').offset().top, //area[3] Ch2 Title
        $('#area4').offset().top, //area[4] Ch2 Content
        $('#area5').offset().top, //area[5] Ch3 Title
        $('#area6').offset().top, //area[6] Ch3 Content
        $('#area7').offset().top, //area[7] Ch4 Title
        $('#area8').offset().top, //area[8] Ch4 Content
        $('#area9').offset().top, //area[9] Footer
        $(document).height()
    ]; 

    console.log(area);

    $(window).scroll(function() {
        var document_height = $(document).height() - $(window).height();
        var scroll_position = $(window).scrollTop();
        console.log(scroll_position);
        
        // control progress bar show or hide
        if (scroll_position > area[2]) {
            $('#fix-progress').removeClass('hide')
        } else {
            $('#fix-progress').addClass('hide')
        }

        // add chapter title when scroll to specific position
        if (scroll_position > area[1]  && scroll_position < area[3] ) {
            $('.chapter-name').text('Ch1 台灣淡水水域發生什麼事')
        } 
        if (scroll_position > area[3]  && scroll_position < area[5] ) {
            $('.chapter-name').text('Ch2 台灣水，怎麼管')
        } 
        if (scroll_position > area[5]  && scroll_position < area[7] ) {
            $('.chapter-name').text('Ch3 宜蘭冬山河的記憶與困境')
        } 
        if (scroll_position > area[7]  && scroll_position < area[9] ) {
            $('.chapter-name').text('Ch4 地方居民的觀點')
        } 

        //TODO control ch1 video play - o

        if (scroll_position > area[2] && scroll_position < area[3]) {
            $('#ch1-video-control').addClass('pos-ab')
        } else {
            $('#ch1-video-control').removeClass('hide')
        }

        if (scroll_position > area[1]  && scroll_position < area[3] ) {
            $('.chapter-name').text('Ch1 台灣淡水水域發生什麼事')
        } 
        
        var video = $('#ch1-video').get(0),
            videoLength = video.duration,
            scroll_length = $('#area3').offset().top - $('#area2').offset().top + $(window).height()
            video.currentTime = videoLength * (scroll_position / scroll_length);
    });


});