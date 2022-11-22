$(document).ready(function () {
	var video1_pos = $("#video").offset().top;
	var video1_end = $("#video").offset().top + 100;

	console.log(video1_end);

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();

		var winh = $(window).height();
		if(scroll > video1_pos && scroll < video1_end){
			$("#video")[0].play();
		}else {
			$("#video")[0].pause();
		}


	});
});