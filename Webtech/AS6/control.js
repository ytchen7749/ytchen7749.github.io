$(document).ready(function () {
        
            

            

            var max_scroll = $(document).height() - $(window).height();
            $(window).scroll(function (e) {
                //document.querySelector('#video').play();
                var video = $('#video').get(0),
                    videoLength = video.duration,
                    current_pos = $(document).scrollTop();
                video.currentTime = videoLength * (current_pos / max_scroll);
            });
    })
/*
var promise = document.querySelector('#video').play();

            if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
            }
*/ 