/*********************************************************************************

	Template Name: Avone Multipurpose eCommerce Bootstrap4 Template
	Description: A perfect template to build beautiful and unique Glasses websites. It comes with nice and clean design.
	Version: 3.0

**********************************************************************************/

/*************************************************
	1. Preloader Loading
	2. Promotional Bar Header
	3. Top Bar Slider Header
	4. Header Search Drawer
	5. Setting Box dropdown
	6. Masonry Collection Banners
	7. Sticky Header
	8. Mobile Main Menu
	10. Promotion / Notification Cookie Bar 
	11. Skick Slider
		11.1 Homepage Slideshow
		11.2 Sidebar Product
		11.3 Category Slideshow Slider
		11.4 Products Slider
		11.5 Products Slider Style2 3 Items
		11.6 Products Slider Style3
		11.7 Products Slider Fullwidth
		11.8 Product Page
		11.9 Collection Slider
		11.10 Latest Blog Slider
		11.11 Logo Slider
		11.12 Testimonial Slider
		11.13 Instagram Slick Slider
	12. Sidebar Categories Level links
	13. Price Range Slider
	14. Color Swacthes
	15. Footer links for mobiles
	16. Site Animation
	17. Show hide Product Tags
	18. SHOW HIDE PRODUCT Filters
	19. Timer Count Down
	20. Scroll Top
	21. Height Product Grid Image
	22. Product Zoom
	23. Product Detail Slider
	24. Product Sticky Bottom Cart
	25. Product Page Popup
	26. Quantity Plus Minus
	27. Visitor Fake Message
	28. Tabs With Accordian Responsive
	29. Product Tabs
	30. Image to background js
	31. Sticky Product Slider
	32. Related Product Slider
	33. Infinite Scroll js
	34. QuickView Popup
	
*************************************************/

(function ($) {
	// Start of use strict
	'use strict';
	
    /*-----------------------------------------
	  1. Preloader Loading 
	  -----------------------------------------*/
	function pre_loader(){
		$("#load").fadeOut();
		$('#pre-loader').delay(0).fadeOut('slow');
	}
	pre_loader();
	
	
	function dismiss(){
		$(".product-notification .close").on('click',function() {
			$(".product-notification").hide().fadeOut('slow');   
	  	});   
	};
	dismiss();
		
	/*-----------------------------------------
	 2. Promotional Bar Header 
	  -----------------------------------------*/
	function promotional_bar(){
		$(".closeHeader").on('click',function() {
			$(".promotion-header").slideUp();  
			Cookies.set('promotion', 'true', { expires: 1});  
			return false;
		});
	}
	promotional_bar();
	
	/*-----------------------------------------
	 3. Top Bar Slider Header
	  ----------------------------------------- */
	function promotional_bar_slider(){
		$('.topbar-slider-items').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000
		 });
	}
	promotional_bar_slider();
	
	function store_bar_slider(){
		$('.store-slider-items').slick({
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 6000,
			responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 999,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		 });
	}
	store_bar_slider();
	
	/*-----------------------------------------
	 4. Header Search Drawer
	  -----------------------------------------*/
	$('.site-search').on('click', function(e) {
        $('.search-drawer').toggleClass("search-drawer-open");
        setTimeout(function() {
            $('input[name="q"]').focus()
        }, 1000);
        e.preventDefault();
        var add_html = '<div class="mask-overlay">';
        $(add_html).hide().appendTo('body').fadeIn('200');
        $('.mask-overlay, .search-drawer .close').on('click', function() {
            $('.mask-overlay').remove();
            $('.search-drawer').removeClass("search-drawer-open");
        });
		$(add_html).hide().appendTo('body').fadeIn('200');
		$('.mask-overlay, .search-drawer .closeSearch').on('click', function() {
			$('.mask-overlay').remove();
			$('.search-drawer').removeClass("search-drawer-open");
		});
    });
	$('.search-drawer .closeSearch').on('click', function(e) {
		$('.search-drawer').toggleClass("search-drawer-open");
	});
	
	/*-----------------------------------------
	 5. Setting Box dropdown
	  -----------------------------------------*/
	function setting_box(){
		$(".setting-link").on("click", function() {
		  	$("#settingsBox").toggleClass("active");
		});
		$("body").on("click", function(e) {
			var t = $(e.target);
			t.parents().is("#settingsBox") || t.parents().is(".setting-link") || t.is(".setting-link") || $("#settingsBox").removeClass("active")
		});
	}
	setting_box();
	
	/*-----------------------------------------
	 6. Masonry Collection Banners
	  -----------------------------------------*/
	var $grid = $('.banner-grid, .collection-page-grid, .lookbook, .custom-text-masonry-items').masonry({
	  itemSelector: '.banner-item, .collection-page-item, .grid-lookbook, .custom-text-masonry-item',
	  percentPosition: true,
	  columnWidth: '.grid-sizer',
	});
	
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry();
	});
	
	$(".btn-shop").click(function() {
		$(".products .grid-lb, .grid-lookbook").removeClass("active"),
		$(this).next().addClass("active"), $(this).parents(".grid-lookbook").addClass("active")
	});
	$(".btn-shop-close").click(function() {
		$(this).parent().removeClass("active")
	});
	
	/*-----------------------------------------
	  7. Sticky Header
	  -----------------------------------------*/
	window.onscroll = function(){ myFunction() };
    function myFunction() {
		if($(window).scrollTop()>145){
		  $('.header').addClass("stickyNav animated fadeIn");                   
		} else {
		  $('.header').removeClass("stickyNav fadeIn");              
		}
    }
	
	/*-----------------------------------------
	  8. Mobile Main Menu
	  -----------------------------------------*/
	var selectors = {
      	body: 'body',
      	sitenav: '#siteNav',
      	navLinks: '#siteNav .lvl1 > a',
      	menuToggle: '.js-mobile-nav-toggle',
      	mobilenav: '.mobile-nav-wrapper',
      	menuLinks: '#MobileNav .anm',
      	closemenu: '.closemobileMenu'
	};
     
  	$(selectors.navLinks).each(function(){
        if($(this).attr('href') == window.location.pathname) $(this).addClass('active');
    })
	
  	$(selectors.menuToggle).on("click",function(){
      body: 'body',
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass('mobile-nav--open mobile-nav--close');
    });
  
    $(selectors.closemenu).on("click",function(){
      body: 'body',
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass('mobile-nav--open mobile-nav--close');
    });
    $("body").on('click', function (event) {
      var $target = $(event.target);
      if(!$target.parents().is(selectors.mobilenav) && !$target.parents().is(selectors.menuToggle) && !$target.is(selectors.menuToggle)){
          $(selectors.mobilenav).removeClass("active");
          $(selectors.body).removeClass("menuOn");
          $(selectors.menuToggle).removeClass('mobile-nav--close').addClass('mobile-nav--open');
      }
    });
	$(selectors.menuLinks).on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('anm-plus-l anm-minus-l');
		$(this).parent().next().slideToggle();
    });
	
	/*--------------------------------------
	  10. Promotion / Notification Cookie Bar 
	  -------------------------------------- */
	  function cookie_promo(){
		  if($.cookie('promotion') !='true') {
			 $(".notification-bar").show();      
		  }
		  $(".close-announcement").on('click',function() {
			$(".notification-bar").slideUp();  
			$.cookie('promotion', 'true', { expires: 1});  
		  });    
	  }
	  cookie_promo();
	
	/*-----------------------------------------
	  11. Slick Slider
	  -----------------------------------------*/
	  /* 11.1 Homepage Slideshow */
	  function home_slider(){
		 $('.home-slideshow').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 6000,
			lazyLoad: 'ondemand'
		  });
	  }
	  home_slider();
	  
	  function home_slider_carousel(){
		 $('.home-slideshow-carousel').slick({
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			fade: false,
			arrows: true,
			lazyLoad: 'ondemand',
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 999,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		 });
	  }
	  home_slider_carousel();
	
	// Full Size Banner on the Any Screen
	$(window).resize(function() {
		var bodyheight = $(this).height() - 20;
		$(".sliderFull .bg-size").height(bodyheight);
	}).resize();
	
	/* 11.2 Sidebar Product */
	function side_product_slider(){
	 $('.sideProSlider').slick({
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2500
	  });
	}
	side_product_slider();
	
	/* 11.3 Category Page Slideshow */
	function category_slider(){
	 $('.category-banner-slider').slick({
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true
	  });
	}
	category_slider();
	
	/* 11.4 Products Slider */
	function product_slider(){
	 $('.productSlider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		]
	
	  });
	}
	product_slider();
	
	/* 11.5 Products Slider Style2 3 Items */
	function product_slider1(){
		$('.productSlider-style1').slick({
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider1();
	
	/* 11.6 Products Slider Style3 */
	function product_slider2(){
		$('.productSlider-style2').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider2();
	
	/* 11.7 Products Slider Fullwidth */
	function product_slider_full(){
		$('.productSlider-fullwidth').slick({
			dots: false,
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider_full();
	
	/* 11.8 Product Page */
	function product_slider_ppage(){
		$('.productPageSlider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 575,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider_ppage();
	
	/* 11.9 Collection Slider */
	function collection_slider(){
		$('.collection-grid-slider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: [
			{
			  breakpoint: 999,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	collection_slider();
	
	function collection_slider_4items(){
		$('.collection-slider-4items').slick({
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
			{
			  breakpoint: 999,
			  settings: {
				slidesToShow: 3
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2
			  }
			},
			{
			  breakpoint: 575,
			  settings: {
				slidesToShow: 1
			  }
			},
			{
			  breakpoint: 0,
			  settings: {
				slidesToShow: 1
			  }
			}
			]
		});
	}
	collection_slider_4items();
	
	function collection_slider1(){
		$('.collection-grid-4item').slick({
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	collection_slider1();

	
	/* 11.10 Latest Blog Slider */
	function blogpost_slider(){
		$('.blog-post-slider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 991,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	blogpost_slider();
	
	function blogpost_slider_style1(){
		$('.blog-post-slider-style1').slick({
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 991,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	blogpost_slider_style1();
	
	
	/* 11.11 Logo Slider */
	function logo_slider(){
		$('.logo-bar').slick({
			dots: false,
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	logo_slider();
	
	/* 11.12 Testimonial Slider */
	function testimonial_slider(){
		$('.quotes-slider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
		});
	}
	testimonial_slider();
	
	/* 11.13 Instagram Slick SLider */
	function instagram_slider(){
		$('.instagram-slider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 7,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	instagram_slider();
	
	function instagram_slider_style2(){
		$('.instagram-slider-style2').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	instagram_slider_style2();
	
	
	/*-----------------------------------
	  12. Sidebar Categories Level links
	-------------------------------------*/
	function categories_level(){
		$(".sidebar_categories .sub-level a").on("click", function() {
			$(this).toggleClass('active');
			$(this).next(".sublinks").slideToggle("slow");
		}); 
	}
	categories_level();
	
	$(".filter-widget .widget-title").on("click", function () {
		$(this).next().slideToggle('300');
		$(this).toggleClass("active");
	});
	
	/*-----------------------------------
	 13. Price Range Slider
	-------------------------------------*/
	function price_slider(){
		$("#slider-range").slider({
			range: true,
			min: 12,
			max: 200,
			values: [0, 100],
			slide: function(event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
		" - $" + $("#slider-range").slider("values", 1));
	}
	price_slider();
	
	/*-----------------------------------
	 14. Color Swacthes
	-------------------------------------*/
	function color_swacthes(){
		$.each($(".swacth-list"), function() {
			var n = $(".swacth-btn");
			n.on("click", function() {
				$(this).parent().find(n).removeClass("checked");
				$(this).addClass("checked")
			})
		});
	}
	color_swacthes();
	
	/*-----------------------------------
	  15. Footer links for mobiles
	-------------------------------------*/
	function footer_dropdown(){
		$(".footer-links .h4").on('click', function () {
			if($(window).width() < 766){
			  $(this).next().slideToggle();
			  $(this).toggleClass("active");
			}
		});  
	}
	footer_dropdown();
	
	// Blog Pages Sidebar Widget +/-
	function sidebar_dropdown(){
		$(".sidebar_tags .sidebar_widget .widget-title").on('click', function () {
			if($(window).width() < 766){
			  $(this).next().slideToggle();
			  $(this).toggleClass("active");
			}
		});  
	}
	sidebar_dropdown();
	
	//Resize Function 
	var resizeTimer;
	$(window).resize(function (e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			$(window).trigger('delayed-resize', e);
		}, 250);
	});
	$(window).on("load resize",function(e){
		if ($(window).width() > 766 ) {
			$(".footer-links ul").show();
			$(".blog-sidebar-page .sidebar_tags .sidebar_widget .widget-content").show();
		}
		else {
			$(".footer-links ul").hide();
			$(".blog-sidebar-page .sidebar_tags .sidebar_widget .widget-content").hide();
		}
	});
	
	
	/*-------------------------------
	  16. Site Animation
	----------------------------------*/
	  if($(window).width() < 771) {
		  $('.wow').removeClass('wow');
	  }
	  var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	  }
	);
	wow.init();
	
  	/*-------------------------------
	  17. SHOW HIDE PRODUCT TAG
	----------------------------------*/
	$(".product-tags li").eq(10).nextAll().hide(); 
	$('.btnview').on('click', function () {
	$(".product-tags li").not('.filter--active').show();
	 $(this).hide();
	});
	
  	/*-------------------------------
	  18. SHOW HIDE PRODUCT Filters
	----------------------------------*/
    $('.btn-filter').on("click", function() {
       $(".filterbar").toggleClass("active");
    });
    $('.closeFilter').on("click", function() {
      $(".filterbar").removeClass("active");
    });
  	// Hide Cart on document click
    $("body").on('click', function (event) {
      var $target = $(event.target);
      if(!$target.parents().is(".filterbar") && !$target.is(".btn-filter")){
        $(".filterbar").removeClass("active");
      }
    });
	
	/*-------------------------------
	 19. Timer Count Down
	----------------------------------*/
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<span class="ht-count days"><span class="count-inner"><span class="time-count">%-D</span> <span>Days</span></span></span> <span class="ht-count hour"><span class="count-inner"><span class="time-count">%-H</span> <span>HR</span></span></span> <span class="ht-count minutes"><span class="count-inner"><span class="time-count">%M</span> <span>Min</span></span></span> <span class="ht-count second"><span class="count-inner"><span class="time-count">%S</span> <span>Sc</span></span></span>'));
		});
	});
	
	/*-------------------------------
	 20.Scroll Top
	---------------------------------*/
	function scroll_top(){
		$("#site-scroll").on("click", function() {
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		}); 
	}
	scroll_top();
	
	$(window).scroll(function(){    
		if($(this).scrollTop()>300){
		  $("#site-scroll").fadeIn();
		} else {
		   $("#site-scroll").fadeOut();
		}
	});
	
	/*-------------------------------
	  21. Height Product Grid Image
	----------------------------------*/
	function productGridView() {
	  var gridRows = []; 
	  var tempRow = [];
	  productGridElements = $('.grid-products .item');
	  productGridElements.each(function (index) {
		if ($(this).css('clear') != 'none' && index != 0) {
		  gridRows.push(tempRow);
		  tempRow = []; 
		}
		tempRow.push(this);
	
		if (productGridElements.length == index + 1) {
		  gridRows.push(tempRow);
		}
	  });
	
	  $.each(gridRows, function () {
		var tallestHeight = 0;
		var tallestHeight1 = 0;
		$.each(this, function () {
		  $(this).find('.product-image > a').css('height', '');
		  elHeight = parseInt($(this).find('.product-image').css('height'));
		  if (elHeight > tallestHeight) { tallestHeight = elHeight; }
		});
	
		$.each(this, function () {
		  if($(window).width() > 768) {
			$(this).find('.product-image > a').css('height', tallestHeight);
		  }
		});
	  });
	}
	
	/*--------------------------
      22. Product Zoom
	---------------------------- */
	function product_zoom(){
		$(".zoompro").elevateZoom({
			gallery: "gallery",
			galleryActiveClass: "active",
			zoomWindowWidth: 300,
			zoomWindowHeight: 100,
			scrollZoom: false,
			zoomType: "inner",
			cursor: "crosshair"
		});
	}
	product_zoom();
	
	/*----------------------------
	 23. Product Detail Slider
    ------------------------------ */
	/* Product Detail Vertical Thumb Slider */
	function product_thumb(){
		$('.product-dec-slider-2').slick({
			infinite: true,
			slidesToShow: 6,
			vertical: true,
			verticalSwiping: true,
			centerPadding: '0',
			draggable: true, 
			slidesToScroll: 1
		});
	}
	product_thumb();
	
	/* Product Detail Page Horizontal Thumb Slider */
	function product_thumb1(){
		$('.product-thumb-style1').slick({
			infinite: true,
			slidesToShow: 6,
			stageMargin: 5,
			slidesToScroll: 1
		});
	}
	product_thumb1();
	
	/* Product Detail Page Center Slider */
	function product_center_mode(){
		$('.product-center-style3').slick({
			centerMode: true,
			infinite: true,
			centerPadding: '0',
			slidesToShow: 3,
			speed: 500,
			variableWidth: false,
			responsive: [
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_center_mode();
	
	
	/*----------------------------
	 24. Product Sticky Bottom Cart
    ------------------------------ */
	function sticky_cart(){
		window.onscroll = function() {
			/* Sticky Header */
			if($(window).scrollTop()>145){
			  $('.header').addClass("stickyNav animated fadeIn");                   
			} else {
			  $('.header').removeClass("stickyNav fadeIn");              
			}
			/* End Sticky Header */
			
			$(window).scrollTop() > 600 && $(".stickyCart").length ? (
			$("body.template-product").css("padding-bottom", "70px"), 
			$(".stickyCart").slideDown()) : ($("body.template-product").css("padding-bottom", "0"), 
			$(".stickyCart").slideUp());
		}
		$(".stickyOptions .selectedOpt").on("click", function() {
			$(".stickyOptions ul").slideToggle("fast")
		}),
		$(".stickyOptions .vrOpt").on("click", function(e) {
			var t = $(this).attr("data-val"),
				s = $(this).attr("data-no"),
				a = $(this).text();
			$(".selectedOpt").text(a), $(".stickyCart .selectbox").val(t).trigger("change"), $(".stickyOptions ul").slideUp("fast"), this.productvariants = JSON.parse(document.getElementById("ProductJson-" + i).innerHTML), $(".stickyCart .product-featured-img").attr("src", this.productvariants.variants[s].featured_image.src.replace(/(\.[^\.]*$|$)/, "_60x60$&"))
		})
	}
	sticky_cart();
	
	/*--------------------------
      25. Product Page Popup
	---------------------------- */
    function video_popup(){
		if($('.popup-video').length){
			$('.popup-video').magnificPopup({
				type: 'iframe', mainClass: 'mfp-zoom-in', removalDelay: 400, preloader: false, fixedContentPos: false
			});
		}
	}
	video_popup();
	
	function size_popup(){
		$('.sizelink').magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'mfp-zoom-in',
			removalDelay:400,
		});
	}
	size_popup();
	
	function shippingInfo_popup(){
		$('.shippingInfo').magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'mfp-zoom-in',
			removalDelay:400,
		});
	}
	shippingInfo_popup();
	
	function inquiry_popup(){
		$('.emaillink').magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'mfp-zoom-in',
			removalDelay:400,
		});
	}
	inquiry_popup();
	
	/*----------------------------------
	  26. Quantity Plus Minus
	------------------------------------*/
	function qnt_incre(){
		$(".qtyBtn").on("click", function() {
		  var qtyField = $(this).parent(".qtyField"),
			 oldValue = $(qtyField).find(".qty").val(),
			  newVal = 1;
	
		  if ($(this).is(".plus")) {
			newVal = parseInt(oldValue) + 1;
		  } else if (oldValue > 1) {
			newVal = parseInt(oldValue) - 1;
		  }
		  $(qtyField).find(".qty").val(newVal);
		});
	}
	qnt_incre();
	
	/*----------------------------------
	  27. Visitor Fake Message
	------------------------------------*/
    var userLimit = $(".userViewMsg").attr('data-user'),
        userTime = $(".userViewMsg").attr('data-time');
    $(".uersView").text(Math.floor((Math.random() * userLimit)));
    setInterval(function(){
    	$(".uersView").text(Math.floor((Math.random() * userLimit)));
	}, userTime);
	
	/*-----------------------------------
	  28. Tabs With Accordian Responsive
	-------------------------------------*/
	$(".tab_content").hide();
	$(".tab_content:first").show();	
	/* if in tab mode */
	$("ul.tabs li").on('click', function () {
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();		
		
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		
		$(".tab_drawer_heading").removeClass("d_active");
		$(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
		
		$('.productSlider').slick('refresh');
		$('.productSlider-style2').slick('refresh');
	});
	/* if in drawer mode */
	$(".tab_drawer_heading").on('click', function () {
		$(".tab_content").hide();
		var d_activeTab = $(this).attr("rel"); 
		$("#"+d_activeTab).fadeIn();
		
		$(".tab_drawer_heading").removeClass("d_active");
		$(this).addClass("d_active");
		
		$("ul.tabs li").removeClass("d_active");
		$("ul.tabs li[rel^='"+d_activeTab+"']").addClass("d_active");
		
		$('.productSlider').slick('refresh');
		$('.productSlider-style2').slick('refresh');
	});
	$('ul.tabs li').last().addClass("tab_last");
	
	/*-----------------------------------
	  End Tabs With Accordian Responsive
	-------------------------------------*/

	/*----------------------------------
	  29. Product Tabs
	------------------------------------*/
	$(".tab-content").hide();
	$(".tab-content:first").show();
	/* if in tab mode */
	$(".product-tabs li").on('click', function () {
		$(".tab-content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();		
		
		$(".product-tabs li").removeClass("active");
		$(this).addClass("active");
		
		$(this).fadeIn();
      	if($(window).width()<767) {
			var tabposition = $(this).offset();
          	$("html, body").animate({ scrollTop: tabposition.top-70 }, 700);
        } else{
          	$("html, body").animate({ scrollTop: tabposition.top-90 }, 700);
        }
	});
    
    $('.product-tabs li:first-child').addClass("active");
	$('.tab-container h3:first-child + .tab-content').show();
	
	/* if in drawer mode */
	$(".acor-ttl").on("click", function() {
		$(".tab-content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();
		
		$(".acor-ttl").removeClass("active");
		$(this).addClass("active");
		if($(window).width()<767) {
		  var tabposition = $(this).offset();
		  $("html, body").animate({ scrollTop: tabposition.top }, 700);
		}
	});
	
	/* Below 767 Accordian style */
	$(".tabs-ac-style").on("click", function() {
		$(".tab-content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();
		
		$(".tabs-ac-style").removeClass("active");
		$(this).addClass("active");

      	$(this).fadeIn();
		if($(window).width()<767) {
		  var tabposition = $(this).offset();
		  $("html, body").animate({ scrollTop: tabposition.top }, 700);
		}
	});
	 
	 /* --------------------------------------
	 	30. Image to background js
	 -------------------------------------- */
    $(".bg-top" ).parent().addClass('b-top');
    $(".bg-bottom" ).parent().addClass('b-bottom');
    $(".bg-center" ).parent().addClass('b-center');
    $(".bg-left" ).parent().addClass('b-left');
    $(".bg-right" ).parent().addClass('b-right');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $(".bg-img.blur-up" ).parent().addClass('');
    jQuery('.bg-img').each(function() {

        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();

        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat'
        });

        el.hide();
    });
	/* --------------------------------------
	 	End Image to background js
	 -------------------------------------- */
	 
	/*----------------------------------
	31. Sticky Product Slider
	------------------------------------*/
	function sticky_pro_slider(){
		$('.product-single-style2 .product-details-img').slick({
		  dots: false,
		  infinite: false,
		  item: 1,
		  slidesToScroll: 1,
		  responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		  }]
		});
		$(window).width() > 767 ? $(".product-single-style2 .product-details-img").slick("unslick") : $(".product-single-style2 .product-details-img").slick("refresh")
	}
	sticky_pro_slider();
	
	function sticky_pro_slider_style4(){
	$('.product-single-style4 .product-details-img .row').slick({
	  dots: false,
	  infinite: false,
	  item: 1,
	  slidesToScroll: 1,
	  responsive: [{
		breakpoint: 767,
		settings: {
			slidesToShow: 1
		}
	  }]
	});
		$(window).width() > 767 ? $(".product-single-style4 .product-details-img .row").slick("unslick") : $(".product-single-style4 .product-details-img .row").slick("refresh")
	}
	sticky_pro_slider_style4();
	
	/*----------------------------------
	32. Related Product Slider
	------------------------------------*/
	function related_slider(){
		$('.related-product .productSlider').slick({
		  dots: false,
		  infinite: true,
		  item: 5,
		  slidesToScroll: 1,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToScroll: 1,
			  }
			},        
			{
			  breakpoint: 767,
			  settings: {
				slidesToScroll: 1,
			  }
			}
		  ]
		});
	}
	related_slider();
	/*----------------------------------
	  End Related Product Slider
	  ------------------------------------*/
	
	/*-----------------------------------
	  33. Infinite Scroll js
	  -------------------------------------*/
	function load_more(){
        $(".product-load-more .item").slice(0, 12).show();
        $(".loadMore").on('click', function (e) {
            e.preventDefault();
            $(".product-load-more .item:hidden").slice(0, 4).slideDown();
            if ($(".product-load-more .item:hidden").length == 0) {
                $(".infinitpagin").html('<div class="btn loadMore">no more products</div>');
            }
        });
    }
	load_more();
	
	function load_more_listview(){
        $(".product-load-more .list-product").slice(0, 7).show();
        $(".loadMore").on('click', function (e) {
            e.preventDefault();
            $(".product-load-more .list-product:hidden").slice(0, 5).slideDown();
            if ($(".product-load-more .list-product:hidden").length == 0) {
                $(".infinitpagin").html('<div class="btn loadMore">no more products</div>');
            }
        });
    }
	load_more_listview();
	
	function load_more_post(){
        $(".blog--grid-load-more .article").slice(0, 5).show();
        $(".loadMorepost").on('click', function (e) {
            e.preventDefault();
            $(".blog--grid-load-more .article:hidden").slice(0, 1).slideDown();
            if ($(".blog--grid-load-more .article:hidden").length == 0) {
                $(".loadmore-post").html('<div class="btn loadMorepost">No more Blog Post</div>');
            }
        });
    }
	load_more_post();
	/*-----------------------------------
	  End Infinite Scroll js
	  -------------------------------------*/
	  
	  /* --------------------------------------
	 	34. QuickView Popup
	 -------------------------------------- */
	 function quick_view_popup(){
		 $("body").on("click", ".quick-view-popup", function(e) {
			 $.ajax({
				 beforeSend: function() {
					$("body").addClass("loading")
				},
				complete: function() {
					$("body").removeClass("loading")
				}
			});
		});
		 
		 $('.quick-view-popup').magnificPopup({
			 items: {
				src: '#quickView-modal'
			},
			type:'inline',
			midClick: true,
			removalDelay: 500,
			mainClass: 'mfp-zoom-in',
		});
	}
	quick_view_popup();
    
    /* ---------------------------------------------------------------------------- */
    //$( window ).on( "load", function() {
//		document.onkeydown = function(e) {
//			if(e.keyCode == 123) {
//			 return false;
//			}
//			if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
//			 return false;
//			}
//			if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
//			 return false;
//			}
//			if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
//			 return false;
//			}
//		
//			if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
//			 return false;
//			}      
//		 };
//		 
//		$("html").on("contextmenu",function(){
//			return false;
//		});
//	});
	

})(jQuery);
