/**
*
* --------------------------------------------------------------------
*
* Template : Reobiz - Creative Portfolio WordPress Theme
* Author : rs-theme
* Author URI : http://www.rstheme.com/
*
* --------------------------------------------------------------------
*
**/

(function($) {
    "use strict";
    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);
    var headerinnerHeight = $(".header-inner").innerHeight();

    win.on('scroll', function() {
       var scroll = win.scrollTop();
       if (scroll < headerinnerHeight) {
           header.removeClass("sticky");
           
       } else {
           header.addClass("sticky");
       }
    });
    $('.header-inner').waypoint('sticky', {
      offset: 0
    });

    $(".widget_nav_menu li a").filter(function(){
        return $.trim($(this).html()) == '';
    }).hide();

    // Slider init   
    $('.rs-slider-carousel').slick({
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    });

    // collapse hidden
    $(function(){ 
        var navMain = $(".navbar-collapse"); // avoid dependency on #id
         // when you have dropdown inside navbar
         navMain.on("click", "a:not([data-toggle])", null, function () {
             navMain.collapse('hide');
        });
     });


    // video 
    if ($('.player').length) {
        $(".player").YTPlayer();
    }    
    // Mouse Pointer 
    
    if ($('.pointer-wrap').length) {
        const cursor = cursorDot({
            diameter: parseInt(pointer_data.diameter),
            borderWidth: parseInt(pointer_data.border_width),
            borderColor: String(pointer_data.pointer_border),
            easing: parseInt(pointer_data.speed),
            background: String(pointer_data.pointer_bg)           
        })
        cursor.over("a", {
            scale: parseFloat(pointer_data.scale)
        });
       
    }

    // Magnific Popup Box

    var rsaddon_PRObox = $('.rsaddon_pro_box');
    if(rsaddon_PRObox.length) {
        $('.rsaddon_pro_box').magnificPopup({
            delegate: '.pointer-events',
            removalDelay: 500, 
            callbacks: {
                beforeOpen: function() {
                   this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true 
        });
    }


    // RS Cookie Policy

    // window.onload = function() {
    //     setTimeout(function() {
    //         document.body.classList.add('newsletter-enable');
    //     }, 800);
    // };
    
    if ($('.rs-newsletter-section-wrap').length) {
        $(document).on("ready", function () {
            if (document.cookie.indexOf("accepted_cookies=") < 0) {
                $(".rs-cookie-overlay").removeClass("d-none").addClass("d-block");
                $("body").removeClass("newsletter-disable").addClass("newsletter-enable");
            }
            $(".rs-accept-cookies").on("click", function () {
                document.cookie = "accepted_cookies=yes;";
                $(".rs-cookie-overlay").removeClass("d-block").addClass("d-none");
                $("body").removeClass("newsletter-enable").addClass("newsletter-disable");
            });       
            $(".close-cookies").on("click", function () {
                $(".rs-cookie-overlay").removeClass("d-block").addClass("d-none");
                $("body").removeClass("newsletter-enable").addClass("newsletter-disable");
            });
        });
    }

    $(".menu-area .navbar ul > li.menu-item-has-children").hover(
        function () {
            $(this).addClass('hover-minimize');
        },
        function () {
            $(this).removeClass("hover-minimize");
        }
    );

    $( ".showcase-item" ).hover(function() {
        $( this ).toggleClass("hover");
    });


    //Phone Number 

    $('.phone_call').on('click', function(event) {        
        $('.phone_num_call').slideToggle('show');
    });

    //search 

    $('.sticky_search').on('click', function(event) {        
        $('.sticky_form').slideToggle('show');
        $( '.sticky_form input' ).focus();
    });


    $('.sticky_search').on('click', function() {
        $('body').removeClass('search-active').removeClass('search-close');
          if ($(this).hasClass('close-full')) {
            $('body').addClass('search-close');
        }
        else {
            $('body').addClass('search-active');
        }
        return false;
    });


    $('.nav-link-container').on('click', function(e){
        $('body.on-offcanvas').removeClass('on-offcanvas');
        setTimeout(function(){ $('body').addClass('on-offcanvas'); },500);        
    });



    $('.sticky_form_search').on('click', function() {      
        $('body, html').removeClass('rs-search-active').removeClass('rs-search-close');
          if ($(this).hasClass('close-search')) {
          $('body, html').addClass('rs-search-close');

        }
        else {
          $('body, html').addClass('rs-search-active');
        }
        return false;
    });

   
    if($('#rs-header').hasClass('fixed-menu')){
        $('body').addClass('body-left-space');
    }  

    $("#rs-header ul > li.classic").hover(
        function () {
            $('body').addClass('mega-classic');
        },
        function () {
            $('body.mega-classic').removeClass("mega-classic");
        }
    );

    $(document).ready(function(){
        function resizeNav() {
            $(".menu-ofcn").css({"height": window.innerHeight});
            var radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
            var diameter = radius * 2;
            $(".off-nav-layer").width(diameter);
            $(".off-nav-layer").height(diameter);
            $(".off-nav-layer").css({"margin-top": -radius, "margin-left": -radius});
        }
        $(".menu-button, .close-button, .offwrap").on('click', function() {
            $(".nav-toggle, .off-nav-layer, .menu-ofcn, .close-button, body").toggleClass("off-open");
        });
        $(window).resize(resizeNav);
        resizeNav();
    });

   

    //One page menu js
    if ($('.page-template-page-single-php .nav').length) {
        $('#single-menu li:first-child, .sidenav li:first-child').addClass('active');
        $('#single-menu a, .sidenav a').on('click', function(){
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              $('#single-menu li, .sidenav li').removeClass('active');
              $(this).parent('li').addClass('active');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: (target.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
              }
            }
        });

        var navChildren = $("#single-menu li.menu-item").children("a");
        var aArray = [];
        for (var i = 0; i < navChildren.length; i++) {
            var aChild = navChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        }
    }

    if ($('.page-template-page-single').length) {
        // Select all navigation links
        const navLinks = document.querySelectorAll('nav a');
        function updateActiveLink() {
            const sections = document.querySelectorAll('section, header');      
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {                
                    const targetLink = document.querySelector(`nav a[href="#${section.id}"]`);
                    navLinks.forEach(link => link.classList.remove('rs-active-section'));
                    targetLink.classList.add('rs-active-section');
                }
            });
        }
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    $('.menu li a').on('click', function () {
        $('.nav-container').removeClass('nav-active-menu-container')
    });

    // Get a quote popup

    $('.popup-quote').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#qname',
        removalDelay: 500, //delay removal by X to allow out-animation
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#qname';
                }
            }
        }
    });


    // Canvas Menu Js
    $( ".nav-link-container > a" ).off("click").on("click", function(event){
        event.preventDefault();
        $(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
        $(".mobile-menus").toggleClass("nav-active-menu-container");
    });
    
    $(".nav-close-menu-li > a").on('click', function(event){
        $(".mobile-menus").toggleClass("nav-active-menu-container");
        $(".content").toggleClass("inactive-body");
    });


    // Single Menu Js
    $( "body.page-template-page-single .mobile-menu-link > a, body.page-template-page-single .sidenav li.nav-link-container a" ).off("click").on("click", function(event){
        event.preventDefault();
        $(".mobile-menu-container").toggleClass("nav-inactive-menu-link-container");
        $(".mobile-menu-container").toggleClass("nav-active-menu-container");
    });


    $(".rs-heading h3").each(function() {
  
      // Some Vars
      var elText,
          openSpan = '<span class="first-word">',
          closeSpan = '</span>';
      
      // Make the text into array
      elText = $(this).text().split(" ");
      
      // Adding the open span to the beginning of the array
      elText.unshift(openSpan);
      
      // Adding span closing after the first word in each sentence
      elText.splice(2, 0, closeSpan);
      
      // Make the array into string 
      elText = elText.join(" ");
      
      // Change the html of each element to style it
      $(this).html(elText);
    });    
   
    $(".testi-item  a.tab").on('click', function(e){
          e.preventDefault();
          slideIndex = $(this).index();
          $( '.testi-carousel' ).slickGoTo( parseInt(slideIndex) );
    });

    // Portfolio Single Carousel
    if ($('.cdev').length) {
         $(".cdev").circlos();
    }

    // Portfolio Single Carousel
    if ($('.portfolio-carousel').length) {
        $('.portfolio-carousel').owlCarousel({
            loop: true,
            nav:true,
            autoHeight:true,
            items:1
        })
    }

    //for potfolio slider
   
    if ($('.portfolio-slider-data').length) {
      var sliderDots = "";
      if(portfolio_data.slider_dots==1){
        sliderDots = true;
      }
      var sliderNav = "";
      if(portfolio_data.nav==1){
        sliderNav = true;
      }

      $(".portfolio-slider-data").each(function() {
        $(".portfolio-slider-data").slick({
            slidesToShow: portfolio_data.col_lg,
            centerMode: false,
            dots: sliderDots,
            arrows: sliderNav,
            autoplay: portfolio_data.autoplay,
            slidesToScroll: 2,
            centerPadding: '15px',
            autoplaySpeed: portfolio_data.autoplaySpeed,
            pauseOnHover: portfolio_data.pauseOnHover,
            prevArrow:"<button type='button' class='slick-prev pull-left'><i class='glyph-icon reobizicon-left-arrow' aria-hidden='true'></i></button>",
          nextArrow:"<button type='button' class='slick-next pull-right'><i class='glyph-icon reobizicon-right-arrow' aria-hidden='true'></i></button>",
            responsive: [{
                breakpoint: 1400,
                settings: {
                    centerPadding: '15px',
                    slidesToShow: portfolio_data.col_lg,
                    slidesToScroll: 1,
                }
            }, 
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '15px',
                    slidesToShow: portfolio_data.col_md,
                    slidesToScroll: 1,
                }
            }, 
            {
                breakpoint: 767,
                settings: {
                    centerPadding: '10px',
                    slidesToShow: portfolio_data.col_sm,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: '5px',
                    slidesToShow: portfolio_data.col_xs,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 350,
                settings: {
                    centerPadding: '0px',
                    slidesToShow: portfolio_data.col_mobile,
                    slidesToScroll: 1,
                }
            }, ]
        });
      });
    }


    $(function(){ 
        $( "ul.children" ).addClass( "sub-menu" );
    });

    $(".rs-products-grid .product-btn .button").addClass("glyph-icon reobizicon-shopping-bag");
    
     //Videos popup jQuery activation code
    $('.popup-videos').magnificPopup({
        disableOn: 10,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    //type writer
    $(".rs-banner .cd-words-wrapper p:first-child").addClass("is-visible");

    // collapse hidden
    $(function(){ 
         var navMain = $(".navbar-collapse"); // avoid dependency on #id
         // "a:not([data-toggle])" - to avoid issues caused
         // when you have dropdown inside navbar
         navMain.on("click", "a:not([data-toggle])", null, function () {
             navMain.collapse('hide');
         });

     });


    //CountDown Timer
    var CountTimer = $('.CountDownTimer');
    if(CountTimer.length){ 
        $(".CountDownTimer").TimeCircles({
            fg_width: 0.030,
            bg_width: 0.8,
            circle_bg_color: "#ffffff",
            circle_fg_color: "#ffffff",
            time: {
                Days:{
                    text: countdown_data.day_text, 
                    color: "#fff"
                },
                Hours:{
                    text: countdown_data.hour_text, 
                    color: "#fff"
                },
                Minutes:{
                    text: countdown_data.sec_text, 
                    color: "#fff"
                },
                Seconds:{
                    text: countdown_data.min_text, 
                    color: "#fff"
                }
            }
        }); 
    }
    //CountDown Timer
    var CountTimer = $('.CountDownTimer3');
    if(CountTimer.length){ 
        $(".CountDownTimer3").TimeCircles({
            fg_width: 0.030,
            bg_width: 0.8,
            circle_bg_color: events_data.ev_circle_bg_color,
            time: {
                Days:{
                    color: events_data.ev_days_color
                },
                Hours:{
                    color: events_data.ev_hours_color
                },
                Minutes:{
                    color: events_data.ev_min_color
                },
                Seconds:{
                    color: events_data.ev_sec_color
                }
            }
        }); 
    } 

    //Select box wrap css
    $( ".mptt-shortcode-wrapper .mptt-navigation-select" ).wrap( "<div class='mptt-select'></div>" ); 
    $(".menu-area .navbar ul > li.mega > ul.sub-menu").wrapInner("<div class='container flex-mega'></div>");
    $('.menu-area .navbar ul > li.mega > ul.sub-menu li').first().addClass('first-li-item');


    if ($('div').hasClass('openingfoot')) {
        $('body').addClass('openingfootwrap');
    }
       
    // Sticky Sidebar
    $('.contents-sticky, .sticky-sidebar').theiaStickySidebar({
        additionalMarginTop: 160,
        additionalMarginBottom: 20,
    });

    //CountDown Timer
    var CountTimer = $('.CountDownTimer4');
    if(CountTimer.length){ 
        $(".CountDownTimer4").TimeCircles({
            
        }); 
    }


  //preloader
    $(window).on( 'load', function() {
        $("#reobiz-load").delay(1000).fadeOut(500);
        $(".reobiz-loader").delay(1000).fadeOut(500);     
        

    if($(window).width() < 992) {
      $('.rs-menu').css('height', '0');
      $('.rs-menu').css('opacity', '0');
      $('.rs-menu').css('z-index', '-1');
      $('.rs-menu-toggle').on( 'click', function(){
         $('.rs-menu').css('opacity', '1');
         $('.rs-menu').css('z-index', '1');
     });
    }
    })

    // image loaded portfolio init
    $('.grid').imagesLoaded(function() {
        $('.portfolio-filter').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        var $grid = $('.grid').isotope({

            animationOptions: {
             duration: 750,
             easing: 'linear',
             queue: false
           },

            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item',
            }
        });
    });
            
    // portfolio Filter
    $('.portfolio-filter button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });
    

     // magnificPopup init
    $('.image-popup').magnificPopup({
        type: 'image',
        callbacks: {
            beforeOpen: function() {
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated zoomInDown');
            }
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return '<div class="gallery-title-wrap"><h3>' + item.el.attr('title') + '</h3>' + '<p>' + item.el.attr('caption') + '</p></div>';
            }
        },
        gallery: {
            enabled: true
        }
    });

     //service carousel
    if ($('.project-single-carousel').length) {
        $('.project-single-carousel').owlCarousel({
            loop:true,
            margin: 20,
            arrows: true,
            autoplay: true,
            nav:true,
            dots: false,
            navText : ["<i class='glyph-icon reobizicon-left-arrow'></i>","<i class='glyph-icon reobizicon-right-arrow'></i>"],
            responsive:{
                0:{
                    items:1
                },
                767:{
                    items:2
                },
                991:{
                    items:2
                },
                1199:{
                    items:4
                }
            }
        });
    }
        
    // Counter Up  
    $('.rs-counter').counterUp({
        delay: 20,
        time: 1500
    });

    
    
    // scrollTop init
    var win=$(window);
    var totop = $('#scrollUp');    
    win.on('scroll', function() {
        if (win.scrollTop() > 150) {
            totop.fadeIn();
        } else {
            totop.fadeOut();
        }
    });
    totop.on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500)
    });   

    $(function(){ 
        $( "ul.children" ).addClass( "sub-menu" );
    });    
    
    $( ".comment-body, .comment-respond" ).wrap( "<div class='comment-full'></div>" ); 
    $('.rs-heading .description p:empty').remove();
    
    //woocommerce quantity style
    if ( ! String.prototype.getDecimals ) {
          String.prototype.getDecimals = function() {
              var num = this,
                  match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
              if ( ! match ) {
                  return 0;
              }
              return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
          }
      }
    // Quantity "plus" and "minus" buttons
    $( document.body ).on( 'click', '.plus, .minus', function() {
        var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
            currentVal  = parseFloat( $qty.val() ),
            max         = parseFloat( $qty.attr( 'max' ) ),
            min         = parseFloat( $qty.attr( 'min' ) ),
            step        = $qty.attr( 'step' );

        // Format values
        if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
        if ( max === '' || max === 'NaN' ) max = '';
        if ( min === '' || min === 'NaN' ) min = 0;
        if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

        // Change the value
        if ( $( this ).is( '.plus' ) ) {
            if ( max && ( currentVal >= max ) ) {
                $qty.val( max );
            } else {
                $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
            }
        } else {
            if ( min && ( currentVal <= min ) ) {
                $qty.val( min );
            } else if ( currentVal > 0 ) {
                $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
            }
        }

        // Trigger change event
        $qty.trigger( 'change' );
    });

})(jQuery);  