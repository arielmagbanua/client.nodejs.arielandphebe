!function(){"use strict";function e(a){var e=$(".navbar-nav");e.find("li").removeClass("active"),e.each(function(){$(this).find('a[data-nav-section="'+a+'"]').closest("li").addClass("active")})}var t={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return t.Android()||t.BlackBerry()||t.iOS()||t.Opera()||t.Windows()}};$(function(){$(".probootstrap-animate").waypoint(function(a){"down"!==a||$(this.element).hasClass("probootstrap-animated")||($(this.element).addClass("item-animate"),setTimeout(function(){$("body .probootstrap-animate.item-animate").each(function(a){var e=$(this);setTimeout(function(){var a=e.data("animate-effect");"fadeIn"===a?e.addClass("fadeIn probootstrap-animated"):"fadeInLeft"===a?e.addClass("fadeInLeft probootstrap-animated"):"fadeInRight"===a?e.addClass("fadeInRight probootstrap-animated"):e.addClass("fadeInUp probootstrap-animated"),e.removeClass("item-animate")},30*a,"easeInOutExpo")})},100))},{offset:"95%"}),function(){var t=0;$(window).scroll(function(){var a=$(this).scrollTop(),e=$(".probootstrap-navbar");400<a?e.addClass("scrolled"):e.removeClass("scrolled"),t<a?e.hasClass("scrolled")&&e.removeClass("awake"):e.hasClass("scrolled")&&e.addClass("awake"),t=a})}(),t.any()||$(window).stellar(),$('.navbar-nav a:not([class="external"])').click(function(a){var e=$(this).data("nav-section");return $(".navbar-nav"),t.any()&&$(".navbar-toggle").click(),$('[data-section="'+e+'"]').length&&$("html, body").animate({scrollTop:$('[data-section="'+e+'"]').offset().top},500,"easeInOutExpo"),a.preventDefault(),!1}),function(){var a=$("section[data-section]");a.waypoint(function(a){"down"===a&&e($(this.element).data("section"))},{offset:"150px"}),a.waypoint(function(a){"up"===a&&e($(this.element).data("section"))},{offset:function(){return-$(this.element).height()-155}})}(),$(".date-countdown").simplyCountdown({year:2020,month:4,day:23,hours:12,minutes:0,seconds:0}),$(".image-popup").magnificPopup({type:"image",removalDelay:300,mainClass:"mfp-with-zoom",gallery:{enabled:!0},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(a){return a.is("img")?a:a.find("img")}}}),$(".with-caption").magnificPopup({type:"image",closeOnContentClick:!0,closeBtnInside:!1,mainClass:"mfp-with-zoom mfp-img-mobile",image:{verticalFit:!0,titleSrc:function(a){return a.el.attr("title")+' &middot; <a class="image-source-link" href="'+a.el.attr("data-source")+'" target="_blank">image source</a>'}},zoom:{enabled:!0}}),$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1})}),$(window).load(function(){$(".flexslider").flexslider({animation:"fade",prevText:"",nextText:"",animationSpeed:1e3,slideshow:!0,controlNav:!1,animationLoop:!0,directionNav:!1})})}();