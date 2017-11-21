/*------------------------------------*\
	Page loader
\*------------------------------------*/

var $loader = $(".loader");

function hideLoader() {
	$loader.hide();
}

function loadPage() {
	var loaderTl = new TimelineMax({
		onComplete: hideLoader
	});

	loaderTl
		.to($loader, .9, { yPercent: 100, ease: Power4.easeInOut })
		.from($(".header__contact"), .3, {
			y: -20,
			autoAlpha: 0,
			ease: Power2.easeInOut
		}, .3)
		.from($(".profile__heading"), .3, {
			y: -20,
			autoAlpha: 0,
			ease: Power2.easeInOut
		}, .6);
}

$("<img/>").attr("src", "assets/img/home-bg.jpg").on("load", function() {
	// prevent memory leaks
	$(this).remove();
	$("body").css("background-image", "url(assets/img/home-bg.jpg)");
	$(".loader__spinner").hide();
	loadPage();
});


/*---------------------------------------*\
	ScrollMagic scroll interactions library
\*---------------------------------------*/

var controller = new ScrollMagic.Controller();

// anchor link scrolling
controller.scrollTo(function (pos) {
	TweenMax.to(window, 1, {scrollTo: { y: pos }, ease: Power2.easeOut});
});

$(document).on("click", "a[href^='#']", function (e) {
	var id = $(this).attr("href");

	if ($(id).length > 0) {
		e.preventDefault();
		controller.scrollTo(id);
	}
});



/*-------------------------------------*\
	ScrollReveal scroll animations plugin
\*-------------------------------------*/

window.sr = ScrollReveal();
sr.reveal("[data-scroll-reveal]", {
	distance: "20vh",
	opacity: 1,
	scale: 1,
	easing: "ease-out",
	reset: true,
	viewOffset: { top: -1000, right: 0, bottom: 0, left: 0 },
});



/*------------------------------------*\
	Subscribe Form
\*------------------------------------*/

$(document).ready(function() {
	$(".js-clear-input").each(function(){
		var input = $(this);
		var defaultValue = input.val();

		// reset input box on focus
		input.focus(function() {
			if(input.val() == defaultValue) {
				input.val("");
			}
		// restore default input value
		}).blur(function(){
			if(input.val().length == 0) {
					input.val(defaultValue);
				}
		});
	});
});

function validateSubscribeEmail() {
	var email = $("input[name='email']").val();
	var re = /\S+@\S+\.\S+/;

	if (!re.test(email)) {
		alert("Invalid email address");
	}

	return false;
}

$(".js-validate-email").bind("click", validateSubscribeEmail);