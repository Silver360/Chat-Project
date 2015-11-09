
$(function(){

    var bool = 0;
    var miniatruka = 0;

    console.log('Zaczynam Skrypt');

    $('.room').load(function(){
        (this).css( "height", $(this > '.miniaturka').height() );
        console.log('przypisuje: '+ $(this).children().height() );
    });

    $(".room").css( "height", $(this).children(".miniaturka").height() );


    $('.room').mouseenter(function(){
        if(bool == 0){
            //var r =
            //console.log('pokazuje: '+ $(this).height());
            miniaturka = $(this).height();
            //$(this).children('.content').slideDown(function(){bool = 1; console.log("bool : " +bool)});
            $(this).children('.content').show('slide',{ direction: 'down' }, 'fast');
            $(this).css( "height", miniaturka+4 );
            $(this).children('.miniaturka').hide('slide',{ direction: 'up' }, 'fast');
            //bool = 1;
            console.log('miniaturka: '+miniaturka);
        }
    });

    $('.room').mouseleave(function(){
            //$('.room .content').slideUp(function(){bool = 0; console.log("bool : " +bool)});
            $('.content').hide('slide',{ direction: 'down' }, 'fast');
            $('.miniaturka').show('slide',{ direction: 'up' }, 'fast');
            //$(this).children('.miniaturka').slideDown();
            console.log('ukrywam');
    });

    $(function(){
            var win = $('.room').height() - 210;
            $('section .room .content section').slimScroll({
                height: win+'px',
                distance: '10px'
            });
            console.log(win);
    });

});
