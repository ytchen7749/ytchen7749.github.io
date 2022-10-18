
$(document).ready(function () {

    $(function () {
        $(window).scroll(function () {
            var current_pos = $(document).scrollTop();
            const hideelement = document.getElementById('hideO')
            console.log("current pos:" +  current_pos)
            if (current_pos > 600) {
                hideelement.style.display = "none"
                hideelement.style.backgroundImage = ''
                $('#hideO').css("z-index", '');
            }
        });
    });
})