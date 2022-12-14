$(function () {

    // progress bar function
    window.onscroll = function () { myFunction() };

    function myFunction() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }
    var window_width = $(window).width() - $('#moved').width();
    //console.log('window width\t' + $(window).width());
    //console.log('object width\t' + $('#moved').width());

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

    $(window).scroll(function () {
        var document_height = $(document).height() - $(window).height();
        var scroll_position = $(window).scrollTop();
        //console.log(scroll_position);

        // control progress bar show or hide
        if (scroll_position > area[2]) {
            $('#fix-progress').removeClass('hide')
        } else {
            $('#fix-progress').addClass('hide')
        }

        // add chapter title when scroll to specific position
        if (scroll_position > area[1] && scroll_position < area[3]) {
            $('.chapter-name').text('Ch1 台灣淡水水域發生什麼事')
        }
        if (scroll_position > area[3] && scroll_position < area[5]) {
            $('.chapter-name').text('Ch2 台灣水，怎麼管')
        }
        if (scroll_position > area[5] && scroll_position < area[7]) {
            $('.chapter-name').text('Ch3 宜蘭冬山河的記憶與困境')
        }
        if (scroll_position > area[7] && scroll_position < area[9]) {
            $('.chapter-name').text('Ch4 地方居民的觀點')
        }

        //
        if (scroll_position > $('#ch2-bg').offset.top && scroll_position < area[5]) {
            $('#ch2-bg').css({ position: 'fixed', right: '', top: '50px' })
        } else {
            $('#ch2-bg').css({ position: '', right: '', top: '' })
        }





    });

    //ch4 slides
    $('#interviewer1').carousel({
        interval: 1500,
        pause: 'hover'
    })

    $('#interviewer2').carousel({
        interval: 1500,
        pause: 'hover'
    })

});