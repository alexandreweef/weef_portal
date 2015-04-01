var  atual = 1, total = 0, zindex = 6, interval=null, auth = true;
$(function(){
	$( "#menu-toggle" ).click(  function() {
		this.classList.toggle( "active" );
		$(this).parent().parent().parent().toggleClass( "active" );
		$(".bullets").toggleClass("menu-active");
	});
	
    initInterval();
    $(".bullets a").click(function(){      
        if(auth){  
            rotate(atual,$(this).attr("item"));
        }
    });
    rotate(0,1);

    window.addEventListener('focus', function() {
        clearInterval(interval);
        initIntervalInterna();
        initInterval();
    },false);

    window.addEventListener('blur', function() {
        clearInterval(interval);
    },false);
    $(".fechar").click(function(){
        $( "#menu-toggle" ).trigger("click");
    });
    //galeria interna
    $(".container-img figure img:first-child").show();
    if($(".container-img figure img").length > 0){
        initInterna();
        initIntervalInterna();
        $(".nav-interna a").click(function(){
            clearInterval(interval);
            initIntervalInterna();
            $(".nav-interna a").removeClass("ativo");
            $(this).addClass("ativo");
            var all = $(".container-img figure img");
            var selected = $(".container-img figure img:eq("+$(this).index()+")").show();
            TweenMax.to(all,1,{opacity:0});
            TweenMax.to(selected,1,{css:{opacity:1}});
        });
    }
    $(".voltar-home").mouseenter(function(){
        TweenMax.to($(this).find("span"),0.7, { rotation:90, ease:Power4.easeOut })
    });
     $(".voltar-home").mouseleave(function(){
        TweenMax.to($(this).find("span"),0.7, { rotation:0, ease:Power4.easeOut })
    });
   
    
});
function initIntervalInterna(){
    interval = setInterval(function(){
        if($(".nav-interna a.ativo").is(":last-child")){
            $(".nav-interna a:first-child").trigger("click");
        } else {
            $(".nav-interna a.ativo").next().trigger("click");
        }
       
    },6000);

}
function initInterna(){
    $(".container-img figure img").each(function(){
        $(".nav-interna").append("<a class='bullet'></a>");
    });
    $(".nav-interna a:first-child").addClass("ativo"); 
}
function initInterval(){
    if( $("#home .item").length > 0){
        total = $("#home .item").length;
        interval = setInterval(function(){
            var anterior = atual;
            if(anterior >= total){
                atual = 1;
            } else {
                atual ++;
            }
            rotate(anterior,atual);
        },9000);
    }   
}

function rotate(anterior,proximo){
    console.log(anterior+"-"+proximo);
    auth = false;
    atual = proximo;
    $(".item").css({zIndex:5});
    $(".item-"+anterior).css({zIndex:6});
    $(".item-"+proximo).css({marginTop: "100%", opacity: 0, zIndex: 7, display: "block"});
    $(".item-"+proximo).find("article").css({opacity: 0});
    TweenMax.to($(".item-"+proximo).find("article"),1.4,{css:{ opacity: 1},delay:0.8, ease:Power4.easeOut});
    TweenMax.to($(".item-"+proximo),1,{css:{marginTop: 0, opacity: 1}, ease:Power4.easeOut, onComplete:function(){
        auth = true;

    }});
    $(".bullets a").removeClass("ativo");
    $(".bullets a:nth-child("+proximo+")").addClass("ativo");
    clearInterval(interval);
    initInterval();
}