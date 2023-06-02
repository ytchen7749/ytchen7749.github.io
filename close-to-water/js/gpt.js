window.addEventListener('scroll', function() {
    var textElements = document.getElementsByClassName('text');
    var videoContainers = document.getElementsByClassName('video-container');
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    

    for (var i = 0; i < textElements.length; i++) {
      var textElement = textElements[i];
      var textVideo = textElement.getAttribute('data-video');
      var textTime = parseInt(textElement.getAttribute('data-time'), 10);
      
      for (var j = 0; j < videoContainers.length; j++) {
        var videoContainer = videoContainers[j];
        var video = videoContainer.getElementsByTagName('video')[0];
        var videoOffsetTop = videoContainer.offsetTop;
        var videoHeight = videoContainer.offsetHeight;
        
        if (video && video.id === textVideo) {
          var textOffsetTop = videoOffsetTop + (textTime / video.duration) * videoHeight; // 根据时间计算文本在滚动时的位置
          
          if (scrollPosition >= textOffsetTop) {
            textElement.style.opacity = 1;
          } else {
            textElement.style.opacity = 0;
          }
        }
      }
    }
  });