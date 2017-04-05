$(function(){
    //aside bottom padding
    $('.aside_tabs_contents').css({
        marginBottom: ($('.c-footer_manager_info').height() + 110) + 'px'
    });
    //mark last breadcrumb
    $('.c-breadcrumbs li:last-child').addClass('active');
    //breadcrumb click
    $(document).on('click', '.c-breadcrumbs li a', function(e) {
        if ($(e.target).closest('li').hasClass('active')) {
            return false;
        } else {
            $('.c-breadcrumbs li.active').removeClass('active').addClass('hidden');
            $('.c-breadcrumbs li').eq(0).addClass('active');
            return false;
        }
    });
    //main content block height
    $('.content-block-wrapper').css({
        maxHeight: ($(window).height() - $('.page_top_bg').height() - 110) + 'px'
    });
    $(window).resize(function(){
        $('.content-block-wrapper').css({
            maxHeight: ($(window).height() - $('.page_top_bg').height() - 110) + 'px'
        });
    });
    //footer manager info
    $(document).on('click', '.footer_manager_infolink', function() {
        $('.footer-manager-contacts').slideToggle('fast', function() {
            if ($('.footer-manager-contacts').css('display') == 'block') {
                $('.footer_manager_infolink').text('x');
            } else {
                $('.footer_manager_infolink').text('i');
            };
        });
    });


    //select styling
    // TODO:need refactoring this part of code
    function styling() {
        $('.c-select,.c-radio,.c-checkbox').styler();
        $('.content-block-wrapper').css({
            maxHeight: ($(window).height() - $('.page_top_bg').height() - 110) + 'px'
        });
        $(window).resize(function(){
            $('.content-block-wrapper').css({
                maxHeight: ($(window).height() - $('.page_top_bg').height() - 110) + 'px'
            });
        });

    }
    window.onload = function() {
        setTimeout(styling, 500);
    };
});