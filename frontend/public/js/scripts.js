/* ====== GENERAL JS ====== */

/* ======
GENERAL JS
	- Global Variables
	- Footer
	- Header
	- Search
	- Navigation
	- Homepage
	- Register
	- Catalogue Filters
	- Overlays
	- Lot Alert
	- Information Link
	- Columnizer
	- CMS Pages
	- Catalogues
	- RESIZE HOMEPAGE BANNER SIZE
	- Resize
====== */

var proceedAjax = true;
var ajaxing = false;

(function ($) {

	$(document).ready(function () {
		$("#cb_requestedcreditlimit").attr("placeholder", "£3,000");


		$('[data-countdown]').each(function() {
			var $this = $(this), finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function(event) {
			  $this.html(event.strftime('%Dd %Hh %Mm %Ss'));
			});
		  });

		//   console.log('checking the checker');

		// Disables right click image download
		// $('img').bind('contextmenu', function(e) {
		// 	return false;
		// });
		//
		// $(document).bind("contextmenu",function(e){
		// 	if(e.target.nodeName == 'IMG'){
		// 		return false;
		// 	}
		// });
		//
		// // Disables dragging of image
		// $(document).on("dragstart",function(e){
		// 	if(e.target.nodeName == 'IMG'){
		// 		return false;
		// 	}
		// });
		//
		// $('img').on('dragstart', function() {
		// 	return false;
		// });
		//
		// // disables copy,cut,past
		// $('div').bind("cut copy paste",function(e) {
		// 	e.preventDefault();
		// });

		// disables right click
		// $('body').bind('contextmenu', function(e) {
		// 	return false;
		// });

		//Adds active class to selected menu item URL
		var url = window.location.pathname,
			urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
		// now grab every link from the navigation
		$('.account-menu-holder > ul > li > a').each(function () {
			// and test its normalized href against the url pathname regexp
			if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
				$(this).addClass('active');
			}
		});

		//Smooth Scroll
		// $(function() {
		//   $('a[href*="#"]:not([href="#"])').click(function() {
		// 	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		// 	  var target = $(this.hash);
		// 	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		// 	  if (target.length) {
		// 		$('html, body').animate({
		// 		  scrollTop: target.offset().top
		// 		}, 1000);
		// 		return false;
		// 	  }
		// 	}
		//   });
		// });


		$("#request-btn").click(function () {

			console.log($("#valuation-scroll").offset().top);
			var position = $("#valuation-scroll").offset().top - 230;

			$('html, body').animate({
				scrollTop: position
			}, 2000);
		});

		/*================================================================================
		$ GLOBAL VARIABLES
		================================================================================*/

		var windowHeight = $(window).outerHeight();
		//this is not working properly, the header-wrapper is 3k px
		var trueHeaderHeight = $('.header-section.cf').outerHeight(true);
		var windowWidth = $(window).width();
		var headerStatus = false;

		/*================================================================================
		$ HEADER
		================================================================================*/

		// Setting padding for the fixed header -- 1st step verification
		if ($('.homepage-banner-wrapper').length > 0) {
			$('.homepage-banner-wrapper').css('padding-top', HeaderHeight);
		}

		$('.banner-loading').css('height', windowHeight);

		// Setting top value of navigation bar -- 1st step verification
		$('.navigation.header-nav, .search-box-top form.form-inline').css('top', HeaderHeight);
		//
		// setTimeout(function () {
		// 	var HeaderHeight = $('.header-wrapper').outerHeight(false);
		// 	$('body').css('margin-top', HeaderHeight);
		// 	console.log(HeaderHeight);
		// 	$(window).resize(function () {
		// 		var HeaderHeight = $('.header-wrapper').outerHeight(false);
		// 		$('body').css('margin-top', HeaderHeight);
		// 	});
		// }, 250);


		$('.item-411 a').click(function (e) {
			e.preventDefault();

			$('.quick_email_signup_container').toggleClass('active');
			$(this).parent().toggleClass('active');
		});

		/*================================================================================
		$ FOOTER
		================================================================================*/
		//this script may sometimes activates if the page is shorter
		var footerHeight = $('.footer-hold').height();

		if (($('body').height() + footerHeight) < ($(window).height() - footerHeight)) {
			$('.footer-hold').addClass('fixed');
			$('body').css('padding-bottom', footerHeight);
		}

		$(document).scroll(function () {
			if (($('body').height() + footerHeight) < ($(window).height() - footerHeight)) {
				$('.footer-hold').addClass('fixed');
				$('body').css('padding-bottom', footerHeight);
			} else {
				$('.footer-hold').removeClass('fixed');
				$('body').css('padding-bottom', 0);
			}
		});

		/*================================================================================
		$ SEARCH
		================================================================================*/

		$('.search-trigger > a').click(function (e) {
			e.preventDefault();

			$('.search-box-top').toggleClass('triggered');

			if ($('.search-trigger .not-tablet').text() == "search") {
				$('.search-trigger .not-tablet').text('close');
			} else {
				$('.search-trigger .not-tablet').text('search');
			}
		});

		/*================================================================================
		$ NAVIGATION
		================================================================================*/

		$('.header-right-links .menu-trigger').click(function (e) {
			e.preventDefault();

			$('.navigation.header-nav').toggleClass('triggered');
			$(this).toggleClass('triggered');

			if ($('.navigation.header-nav').hasClass('triggered')) {
				$('.navigation.header-nav').css('overflow', 'visible');
				$('.navigation.header-nav').css('top', trueHeaderHeight);
			} else {
				$('.navigation.header-nav').css('overflow', 'hidden');
			}
		});

		// Header for mobile, adding arrows onto menu so can use it on mobile easier
		var liveURL = window.location.protocol + "//" + window.location.host + "/";
		$('.header-nav li.parent').prepend("<span class='dashboard-menu-arrow'><img src='" + liveURL + "images/palm-down-icon.png' alt='arrow' /></span>");

		$('.header-nav li.parent .dashboard-menu-arrow').click(function (e) {
			e.preventDefault();

			$('.header-nav li.parent').removeClass('clicked');

			$this = $(this);
			$this.parent().toggleClass('clicked');
		});

		/*================================================================================
		$ Register
		================================================================================*/

		if ($('body').hasClass('registers')) {
			$('#cbfr_72', '#cbfr_73', '#cbfr_68').wrapAll('<div></div>');
		}

		/*================================================================================
		$ HOMEPAGE
		================================================================================*/

		var pageHeight = windowHeight - HeaderHeight;
		$('.palets-holder').css('height', pageHeight);

		if ($('body').hasClass('home')) {
			$('a[href*="#"]:not([href="#"])').click(function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000);
						return false;
					}
				}
			});
		}


		/*=============================================
		=            email signup from the footer            =
		=============================================*/

		var selectAllCheckboxes = '#container_COLUMN12-selectall input[type=checkbox]';
		var allCheckboxes = '.signup-checkbox-container input[type=checkbox]';

		$(selectAllCheckboxes).click(function () {
			if ($(this).prop("checked"))
				$(allCheckboxes).prop("checked", true);
			else
				$(allCheckboxes).prop("checked", false);
		});


		/*================================================================================
		$ VALUATION PAGE JS
		================================================================================*/

		// $("#tabs").length > 0 && setTimeout(function () {
		// 	$("#tabs").tabs();
		// }, 800);

		/*================================================================================
		$ CATALOGUE FILTERS
		================================================================================*/

		$('.top-filters-toggle > a#show-advance-filter').click(function (e) {
			e.preventDefault();
			$('.full-width__bottom-filters').toggleClass('triggered');

			if ($('.full-width__bottom-filters').hasClass('triggered')) {
				$('.top-filters-toggle > a#show-advance-filter').text('Less Options');
			} else {
				$('.top-filters-toggle > a#show-advance-filter').text('More Options');
			}
		});

		if ($('.filter-section').length) {
			var AuctionControlsTop = $('.filter-section').offset().top - HeaderHeight;

			function AuctionControls() {
				var HeaderHeight = $('.header-wrapper').outerHeight(false);
				var AuctionControlsHeight = $('.filter-section').outerHeight(false);

				if ($(window).scrollTop() > AuctionControlsTop) {
					$('body').addClass('fixed-auction-controls-js');
					$('.filter-section').css('top', HeaderHeight);
				} else {
					$('body').removeClass('fixed-auction-controls-js');
				}
			}

			$(window).scroll(AuctionControls);
			$(window).resize(AuctionControls);
			AuctionControls();
		}

		/*================================================================================
		$ OVERLAYS
		================================================================================*/

		$('#back-btn a').click(function (e) {
			e.preventDefault();

			$(this).closest('.overlay-trigger-holder').removeClass('show-overlay');
		});

		$('.icons-close').click(function (e) {
			e.preventDefault();

			$(this).closest('.overlay-trigger-holder').removeClass('show-overlay');
		});

		// $('.myaccount-edit').click(function (e) {
		// 	e.preventDefault();

		// 	task = $(this).attr('data-task');

		// 	$('.overlay-container__wrapper .overlay-content').html('');
		// 	$('.global-overlay').addClass('show-overlay');

		// 	jQuery.ajax({
		// 		url: $('#base_url').val(),
		// 		type: 'POST',
		// 		data: {option: 'com_myaccount', task: task, tmpl: 'auction'},
		// 	})
		// 		.done(function (response) {
		// 			$('.overlay-container__wrapper .overlay-content').html(response);
		// 		})
		// 		.fail(function (response) {
		// 			$('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
		// 		});
		// });

		$(document).on('click', '.show-overlay', function() {
			if(!$(event.target).closest('.overlay-content').length) {
				closeOverlay();
			}
		});

		/*================================================================================
		$ LOT ALERT
		================================================================================*/

		$('.dropdown-toggles .dropdown-toggle-trigger').click(function (e) {
			e.preventDefault();

			$(this).parent().toggleClass('triggered');
		});

		/*================================================================================
		$ INFORMATION LINK
		================================================================================*/
		$('.information-link').click(function () {
			var html = '';
			html += '<h1 style="text-align:center;">Information</h1>';
			html += '<p>' + $(this).attr('data-information') + '</p>';

			$('.global-overlay').addClass('show-overlay');
			$('.overlay-container__wrapper .overlay-content').html(html);
			$('.overlay-container__wrapper').addClass('slim');
		});

		$("#cbfv_141 .cbSingleCntrl").after('<span>Add different billing address</span>');

		$("#cbfv_143 #cb_references").before('<span>Please provide the name of other numismatic companies you have bought from in the past who can provide a reference should this be necessary.</br></span>');

		$("#cbfv_144").wrapInner('<span>You will immediately be able to bid up to a default credit limit of £3,000. Higher credit limit requests must be manually approved by our staff, and will take effect once approved. This is not a credit agreement and all purchases must be settled immediately post-auction.</span>');

		$('#cbfr_72, #cbfr_73, #cbfr_68, #cbfr_147, #cbfr_70').wrapAll('<div class="billing-address-fields"></div>');

		//	creditlimit start thomas
		(function ($, undefined) {

			"use strict";

			// When ready.
			$(function () {

				var $form = $("form");
				var $input = $form.find("#cb_requestedcreditlimit");
				var underLimit = true;

				$input.on("keyup", function (event) {

					// When user select text in the document, also abort.
					var selection = window.getSelection().toString();
					if (selection !== '') {
						return;
					}

					// When the arrow keys are pressed, abort.
					if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
						return;
					}

					var $this = $(this);

					// Get the value.
					var input = $this.val();

					var input = input.replace(/[\D\s\._\-]+/g, "");
					input = input ? parseInt(input, 10) : 0;

					if (input > 3000 && underLimit) {
						var htmlMessage = "<div class='cb_field col-sm-9' style='font-size: 14px;font-family: initial;padding-top: 10px;'><strong>PLEASE NOTE:</strong> Higher credit limits must be manually approved - please allow up to 2 working days. In the meantime you will be immediately able to bid up to a limit of £3,000.</div>";

						$('#cbfr_144').append(htmlMessage);
						underLimit = false;
					}

					$this.val(function () {
						return (input === 0) ? "" : "£" + input.toLocaleString("en-US");
					});
				});

			});

		})(jQuery);

		// Billing fields on reg
		var billingCheckbox = $('#cb_billingaddress');
		var address2 = $('#cb_daddress2');
		var zip2 = $('#cb_dzip');

		billingCheckbox.change(function (e) {

			var billingFields = $('.billing-address-fields');

			billingFields.toggleClass('active');

			if (address2.attr('required') === 'required') {
				address2.removeAttr('required');
				zip2.removeAttr('required');
			} else {
				address2.attr('required', 'true');
				zip2.attr('required', 'true');
			}
		});

		$('#cb_confirmemail').change(function () {
			if ($('#email').val() == $('#cb_confirmemail').val()) {
				$('.cbRegistrationSubmit').attr('disabled', 'disabled').removeAttr('disabled');
				$('.validation').hide();
			} else {
				// $('.cbRegistrationSubmit').attr('disabled', 'disabled');

				if (!$('.validation').length) {
					$("#cb_confirmemail").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter same email</div>");
				}
			}
			return false;
		});

		$('#email').change(function () {
			if ($('#email').val() == $('#cb_confirmemail').val()) {
				$('.cbRegistrationSubmit').attr('disabled', 'disabled').removeAttr('disabled');
				$('.validation').hide();
			}
			// return false;
		});

		/*================================================================================
		$ COLUMNIZER
		================================================================================*/

		$('.item-page.col-2-layout > div').columnize({
			columns: 2
		});

		/*================================================================================
		$ CMS PAGES
		================================================================================*/

		var enlarged_lot_image_box = '#lightbox-container-image-box';
		var enlarged_lot_image_box_width = $(enlarged_lot_image_box).outerWidth();

		$(enlarged_lot_image_box).css('height', enlarged_lot_image_box_width);

		// scroll to top on a.return-top click
		$('a.back-to-top').click(function (e) {
			e.preventDefault();

			// animate page scroll to the top of page
			$('body, html').stop().animate({scrollTop: "0px"}, 1500);

			return false;
		});

		$('.contact-banner').insertBefore('.item-page');
		$('.item-page .moduletable .contact-banner').hide();

		// Show the bidding increments button
		$('#bidding-increments').click(function(e) {
			e.preventDefault();

			// Create the overlay html
			var html = '';
			html += '<div class="bid-increments-overlay">';
			html += '	<div class="heading">';
			html += '		<h3>Bidding Increments</h3>';
			html += '	</div>';
			html += '	<div class="bidding-increments-table">';
			html += '		<div class="table-inner">'
			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£5</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£0-100</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£10</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£100-200</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£20</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£200-500</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£50</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£500-1,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£100</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£2,000-5,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£200</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£5,000-10,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£1,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£10,000-20,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£2,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£20,000-50,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£5,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£50,000-100,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£10,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£100,000-200,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£20,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£200,000-500,000</p>';
			html += '				</div>';
			html += '			</div>';

			html += '			<div class="bidding-increment">';
			html += '				<div class="left-increment">';
			html += '					<p>£50,000</p>';
			html += '				</div>';
			html += '				<div class="right-increment">';
			html += '					<p>£500,000-1,000,000</p>';
			html += '				</div>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';

			// Display the overlay
			showOverlay();
			writeOverlayContent(html);
		});

		// Show the bidding increments button
		$('#shippng-methods-overlay').click(function(e) {
			e.preventDefault();

			var html = '';
			html += '<div class="shipping-overlay-container">';
			html += '	<div class="heading-container">';
			html += '		<h3>Shipping Methods</h3>';
			html += '	</div>';

			html += '	<div class="shipping-table">';
			html += '		<div class="shipping-method heading">';
			html += '			<div class="shipping-left">';
			html += '				<p>Shipping Methods/Prices (UK)</p>';
			html += '			</div>';
			html += '			<div class="shipping-right">';
			html += '				<p>Shipping Methods/Prices (Rest of the World)</p>';
			html += '			</div>';
			html += '		</div>';


			html += '		<div class="shipping-method">';
			html += '			<div class="shipping-left">';
			html += '				<p>';
			html += '					£8.50 for Royal Mail Signed For<br/>';
			html += '					(for orders valued from £1-500)';
			html += '				</p>';
			html += '			</div>';
			html += '			<div class="shipping-right">';
			html += '				<p>';
			html += '					£14.50 for Royal Mail<br/>';
			html += '					(for orders valued from £1-500)';
			html += '				</p>';
			html += '			</div>';
			html += '		</div>';

			html += '		<div class="shipping-method">';
			html += '			<div class="shipping-left">';
			html += '				<p>';
			html += '					£10.50 for Royal Mail Special Delivery<br/>';
			html += '					(for orders valued from £501-3,000)';
			html += '				</p>';
			html += '			</div>';
			html += '			<div class="shipping-right">';
			html += '				<p>';
			html += '					£27 for Royal Mail<br/>';
			html += '					(for orders valued from £501-3,000)';
			html += '				</p>';
			html += '			</div>';
			html += '		</div>';

			html += '		<div class="shipping-method">';
			html += '			<div class="shipping-left">';
			html += '				<p>';
			html += '					£32.00 for DHL delivery <br/>';
			html += '					(for orders valued over 3,001)';
			html += '				</p>';
			html += '			</div>';
			html += '			<div class="shipping-right">';
			html += '				<p>';
			html += '					From £60.00 for FedEx delivery<br/>';
			html += '					(for orders valued over £3,001)';
			html += '				</p>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';

			// Display the overlay
			showOverlay();
			writeOverlayContent(html);

			// Appy class to the overlay
			$('.overlay-container__wrapper').addClass('shipping-overlay');

		});

		/*================================================================================
		$ CATALOGUES
		================================================================================*/

		$('.estimate-filter .search-head').click(function () {
			$(this).toggleClass('show');
			$('.estimate-filter .estimate-holder').toggleClass('show');
			$('.search-options').toggleClass('show');
			$('.estimate-filter').toggleClass('show');
		});

		$('.get-more-info .place-bid a ').click(function (e) {
			e.preventDefault();

			lotId = $(this).attr("id");

			if (lotId.indexOf("view-") != '-1') {
				lotId = lotId.split('-')[1];
			}

			$("#lot-row-" + lotId).addClass('show-lot');
		});

		$('body').on('click', '.close-exspand-lot, .remove_bid input, .no-cancelbid', function () {
			lotId = $(this).attr("id").split('-');

			$("#lot-row-" + lotId[1]).removeClass('show-lot');
			$("#lot-row-" + lotId[1] + ' .get-more-info').show();

			closeOverlay();
		});

		var getTime = function () {
			var currentTime = new Date();
			var year = currentTime.getFullYear();

			$('.footer-links.four').append("<span> " + year + "</span>");
		};

		getTime();

		var sliderElement = $('.flexslider, .bannergroup, .slideshow');

		if (sliderElement.length) {

			var customScriptConfig = sliderElement.find('.script'),
				config = {
					animation: "slide",
					animationLoop: true,
					slideshow: true,
					slideshowSpeed: 7000,
					animationSpeed: 1000,
					maxItems: 1,
					move: 1,
					directionNav: false,
					controlNav: true
				};

			if (customScriptConfig) {
				config = $.parseJSON(customScriptConfig.text());
				console.log(config);
				customScriptConfig.remove();
			}

			$('.flexslider, .bannergroup, .slideshow').flexslider(config);
		}

		$('body').on('click', '.close-cross', function () {
			closeOverlay();
		});

		$('#passport-utility').click(function () {
			if ($(this).is(':checked')) {
				$('#driving-id').attr('checked', false);
				$('#cblabcb_license').parent().parent().show();
				$('#cbimg_upload_cb_utility').parents('.cbft_image').show();
				$('#cbimg_upload_cb_passport').parents('.cbft_image').hide();
			} else {
				$('#cblabcb_license').parent().parent().hide();
				$('#cbimg_upload_cb_utility').parents('.cbft_image').hide();
			}
		});

		$('#driving-id').click(function () {
			if ($(this).is(':checked')) {
				$('#passport-utility').attr('checked', false);
				$('#cbimg_upload_cb_passport').parents('.cbft_image').show();
				$('#cbimg_upload_cb_utility').parents('.cbft_image').hide();
				$('#cblabcb_license').parent().parent().hide();
			} else {
				$('#cbimg_upload_cb_passport').parents('.cbft_image').hide();
			}
		});

		$('#cbfr_74').hide();
		$('#cbimg_upload_cb_utility').parents('.cbft_image').hide();
		$('#cbimg_upload_cb_passport').parents('.cbft_image').hide();

		if ($('#passport-utility').is(':checked')) {
			$('#cblabcb_license').parent().parent().show();
			$('#cbimg_upload_cb_utility').parents('.cbft_image').show();
			$('#cbimg_upload_cb_passport').parents('.cbft_image').hide();
		} else if ($('#driving-id').is(':checked')) {
			$('#cbimg_upload_cb_passport').parents('.cbft_image').show();
			$('#cbimg_upload_cb_utility').parents('.cbft_image').hide();
			$('#cblabcb_license').parent().parent().hide();
		}

		$('#registrationTable tr').each(function () {
			if ($(this).children().children('label').attr('for') != '') {
				$(this).addClass($(this).children().children('label').attr('for') + '-tr-custom');
			}
		});

		$('.editing-password').click(function () {
			task = $(this).attr('data-task');

			$('.global-overlay').addClass('show-overlay');

			jQuery.ajax({
				url: $('#base_url').val(),
				type: 'POST',
				data: {option: 'com_myaccount', task: task, tmpl: 'auction'},
			})
				.done(function (response) {
					$('.overlay-container__wrapper .overlay-content').html(response);
				})
				.fail(function (response) {
					$('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
				});
		});

		// Check if this is a lot details page
		if ($('body').hasClass('lot_detail')) {

			// Add the value to the session storage
			if(getUrlParameter('high_estimate')){
				window.sessionStorage.setItem('lot_detail_referrer', true);
				window.sessionStorage.setItem('lot_id', $('#lot-id-hidden').attr('class'));
				window.sessionStorage.setItem('page_no', getUrlParameter('page_no'));
				window.sessionStorage.setItem('low_estimate', getUrlParameter('low_estimate'));
				window.sessionStorage.setItem('high_estimate', getUrlParameter('high_estimate'));
				window.sessionStorage.setItem('keyword', getUrlParameter('keyword'));
				window.sessionStorage.setItem('exclude_keyword', getUrlParameter('exclude_keyword'));
				window.sessionStorage.setItem('sort_by', getUrlParameter('sort_by'));
				window.sessionStorage.setItem('list_type', getUrlParameter('list_type'));
				window.sessionStorage.setItem('gridtype', getUrlParameter('gridtype'));
				window.sessionStorage.setItem('lots_per_page', getUrlParameter('lots_per_page'));
				window.sessionStorage.setItem('search_type', getUrlParameter('search_type'));
				window.sessionStorage.setItem('cat_id', getUrlParameter('cat_id'));
			}

		} else if (!$('body').hasClass('com_timed_auction') && !$('body').hasClass('com_bidders')) {

			// Remove the referrer value
			window.sessionStorage.removeItem('lot_detail_referrer');
		}

		/*==============================================
						Show Login Overlay
		===============================================*/

		$('.login-btn-top-menu').click(function (event) {
			event.preventDefault();

			// returnUrl = 'index.php?option=com_myaccount&view=mydashboard';
			returnUrl = '';

			$('.global-overlay').addClass('show-overlay');
			$('.overlay-container__wrapper .overlay-content').html('<p>Loading...</p>');

			showLogin(returnUrl);
		});

		$('.login-overlay').on('click', '.close-cross', function (event) {
			event.preventDefault();

			$('.global-overlay').removeClass('login-overlay');
		});


		if ($('h1:contains("Thank you for Registering")').length > 0) {
			ga('send', 'event', 'register', 'click', 'register');
		}

		if ($('h2:contains("Thank You")').length > 0) {
			ga('send', 'event', 'valuation', 'click', 'valuation');
		}

		/*================================================================================
		$ STAFF MODULE JS
		================================================================================*/

		$('.staff-read-more-btn').click(function (e) {
			e.preventDefault();
			var $this = $(this);
			var image = $this.attr('data-image');

			var name = $this.attr('data-name');

			var job = $this.attr('data-job');

			var department = $this.attr('data-department');

			var info = $this.attr('data-info');

			var email = $this.attr('data-email');

			var phone = $this.attr('data-phone');

			var this_parentID = $this.parent().attr('id');

			var this_staff_img = '#' + this_parentID + ' .staff-photo img';

			var this_staff_img_src = $(this_staff_img).attr('src');

			staff_Html = '<div id="staff-pop-up">'
			staff_Html += '<div class="two-column-left_left">'
			staff_Html += '<img class="staff-image" src="' + image + '">';
			staff_Html += '</div>'
			staff_Html += '<div class="two-column-left_right">'
			staff_Html += '<div class="staff-name-title">'
			staff_Html += '<p class="staff-name">' + name + '</p>';
			staff_Html += '<p class="staff-name">' + job + '</p>';
			staff_Html += '</div>'
			staff_Html += '<div class="staff-department-info">'
			staff_Html += '<p class="staff-department uppercase">' + department + '</p>';
			staff_Html += '<p class="staff-info">' + info + '</p>';
			staff_Html += '</div>'
			staff_Html += '<div class="staff-email-phone">'
			staff_Html += '<p class="staff-email uppercase"><a href="mailto:' + email + '">' + email + '</a></p>';
			staff_Html += '<p class="staff-phone uppercase">' + phone + '</p>';
			staff_Html += '</div>'
			staff_Html += '</div>'
			staff_Html += '</div>'

			$('.global-overlay').addClass('show-overlay');
			$('.overlay-container__wrapper .overlay-content').html(staff_Html);
		});

		/*==============================================
						Career Manager
		===============================================*/

		$('.career_apply').click(function (e) {
			e.preventDefault();
			var career_id = $(this).data('id');

			$.ajax({
				url: "index.php?option=com_bidders&view=career_manager_form&format=raw&id=" + career_id,
				success: function (result) {
					$('.global-overlay').addClass('show-overlay');
					$('.overlay-container__wrapper .overlay-content').html(result);
				}
			});
		});


		$(window).load(function() {
			jQuery('.consignment-overall-data').on('click', '', function() {

	            auction_id = jQuery(this).next('.consignment-lots').attr('id');

				$(this).parents('.consignment-header-data').toggleClass('open-row');

	            if (jQuery('.consignment-wrapper #' + auction_id + ' div').length == 0) {
	                jQuery('.consignment-wrapper #' + auction_id).html('<p>Loading ...</p>');

	                jQuery.ajax({
	                    url: jQuery('#base_url').val(),
	                    type: 'POST',
	                    data: { option: 'com_myaccount', task: 'showConsignmentLots', auction_no: auction_id, tmpl: 'ajax' },
	                })
	                .done(function(response) {
	                    jQuery('.consignment-wrapper #' + auction_id).html(response);
	                })
	                .fail(function(response) {
	                    jQuery('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
	                });
	            }
	        });

	        jQuery('.presalepdf-wrapper').on('click', '.auction-presalepdf', function() {
	            auction_id = jQuery(this).attr('data-auction');

	            if (jQuery('.presalepdf-wrapper #' + auction_id + ' td').length == 0) {
	                jQuery('.presalepdf-wrapper #' + auction_id).html('<td>Loading ...</td>');

	                jQuery.ajax({
	                    url: jQuery('#base_url').val(),
	                    type: 'POST',
	                    data: { option: 'com_myaccount', task: 'showPreSalePdf', auction_no: auction_id, tmpl: 'ajax' },
	                })
	                .done(function(response) {
	                    jQuery('.presalepdf-wrapper #' + auction_id).html(response);
	                })
	                .fail(function(response) {
	                    jQuery('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
	                });
	            }
	        });
	    });

		/*==============================================
						Edit Myaccount
		===============================================*/
		// $('.edit-my-address').click(function (event) {
		// 	event.preventDefault();

		// 	$('.global-overlay').addClass('show-overlay');
		// 	$('.overlay-container__wrapper .overlay-content').html('<p>Loading...</p>');

		// 	jQuery.ajax({
		// 		url: $('#base_url').val(),
		// 		type: 'post',
		// 		data: {option: 'com_myaccount', task: 'show_address', tmpl: 'auction',},
		// 	})
		// 		.done(function (response) {
		// 			toggleSlimOverlay();

		// 			try {
		// 				json = JSON.parse(response);
		// 				response = json.response;
		// 			} catch (e) {
		// 			}

		// 			if (typeof json != 'undefined' && typeof json.status != 'undefined' && json.status == 'redirect') {
		// 				window.location = json.return;
		// 			}

		// 			writeOverlayContent(response);
		// 		})
		// 		.fail(function (response) {
		// 			$('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
		// 		});
		// });

		// Register page image upload and styles
		// #cblabcb_passport is driving license
		// #cblabcb_utility is Utility bill
		// #cblabcb_license is Passport

		// Hide image upload fields when page loads
		$('#cblabcb_utility, #cblabcb_passport, #cblabcb_license').parents('.cb_form_line').hide();
		$('#cb_passport__choice, #cb_utility__choice, #cb_license__choice').prop('selectedIndex', 1).click();
		$('#cb_passport__choice, #cb_utility__choice, #cb_license__choice').parents('div.cb_form_line').hide();

		// Remove styles from title and field cells
		$('.titleCell, .fieldCell').removeAttr('style');

		// if passport is checked, then show password and utility bill image field
		$('#cb_passport_utility_bill').change(function (event) {
			event.preventDefault();
			$('#cblabcb_utility, #cblabcb_license, #cblabcb_passport').parents('.cb_form_line').hide();

			if (this.checked) {
				$('#cblabcb_utility, #cblabcb_license').parents('.cb_form_line').show();
				$('#cb_drivers_id').prop('checked', '');
			}
		});

		// if drivers id is checked then show drivers id image field
		$('#cb_drivers_id').change(function (event) {
			event.preventDefault();
			$('#cblabcb_utility, #cblabcb_license, #cblabcb_passport').parents('.cb_form_line').hide();

			if (this.checked) {
				$('#cblabcb_passport').parents('.cb_form_line').show();
				$('#cb_passport_utility_bill').prop('checked', '');
			}
		});

		/********* Catalogue Search Form *********/

		$('.catalogue-views li a').click(function (e) {
			e.preventDefault();
			$('.catalogue-views li a').removeClass('active-gridtype');
			$(this).addClass('active-gridtype');
			if ($(this).data('gridtype') == 'gridview') {
				$('#gridviewlink img').attr('src', window.baseurl + 'images/grid-dark-icon.png');
				$('#listviewlink img').attr('src', window.baseurl + 'images/list-icon.png');
			} else {
				$('#listviewlink img').attr('src', window.baseurl + 'images/list-dark-icon.png');
				$('#gridviewlink img').attr('src', window.baseurl + 'images/grid-icon.png');
			}
			// submitSearchForm();
		});

		if ($('body').hasClass('saveregisters')) {
			$('body').addClass('registers');
		}

		/* ====== HEADER ICONS JS ====== */

		/* ======
		HEADER ICONS JS
			- General
		====== */

		/*================================================================================
		$ GENERAL
		================================================================================*/

		$('.login-icon-hold').click(function () {
			$('.login-details-hold').toggleClass('open');
			$('.search-form-hold').removeClass('open');
			$('.top-nav').removeClass('open');
		});

		$('.search-icon-hold').click(function () {
			$('.search-form-hold').toggleClass('open');
			$('.login-details-hold').removeClass('open');
			$('.top-nav').removeClass('open');
		});

		$('.menu-icon-hold').click(function () {
			$('.top-nav').toggleClass('open');
			$('.login-details-hold').removeClass('open');
			$('.search-form-hold').removeClass('open');
		});


		/* ====== SUPERSLIDERS JS ====== */

		/* ======
		SUPERSLIDERS JS
			- Loading Animations
			- General Functions
		====== */


		/*================================================================================
		$ LOADING ANIMATIONS
		================================================================================*/

		if ($('body').hasClass('home')) {
			$(document).on('init.slides', function () {
				$('.banner-loading').fadeOut(function () {
					$(this).remove();
				});
				$('.scroll-holder.scroll-bottom').css('display', 'block');
			});
		}

		/*================================================================================
		$ GENERAL FUNCTIONS
		================================================================================*/

		$(window).load(function () {
			if ($('#slides').length > 0) {
				$('#slides').superslides({
					play: 7000,
					animation: 'slide',
					animation_speed: 1000,
					animation_easing: 'linear',
					pagination: false,
					elements: {
						nav: '.slides-navigation',
						container: '.slides-container'
					}
				});
			}
			;
		});

		// $('body').on('click', '.submit-bids-btn', function() {
		// 	$('.close-cross').hide();
		// 	$('.submit-bids-btn').prop("disabled", true);
		// 	showOverlay();
		// 	writeToOverlay('Submitting Bids, Please wait.')
		// });

		// Contact form validation
		$('.validateForm-js').submit(function (event) {
			// Set return by default as true
			var valid = true;

			// Set errors string to blank
			var errors = '';

			// Lets check all the required input and text area fields
			$('.validateForm-js input[required], textarea[required]').each(function (index, el) {
				// Check if value is blank
				var value = $(this).val();

				if (value == '') {
					// return value becomes false
					valid = false;

					// Check if its text area
					if ($(this).is('textarea')) {
						// Lets use as "message" is required instead of place holder
						errors = errors + ' Message is required<br>';
					} else if ($(this).attr('type') == 'email' && !isValidEmailAddress(value)) {
						console.log('test');
						// Get the placeholder value and display as required
						errors = errors + ' Email is invalid<br>';
					} else {
						// Get the placeholder value and display as required
						errors = errors + ' ' + $(this).attr('placeholder') + ' is required<br>';
					}
				}
			});

			// Check if error form div is created
			if ($('.validateForm-js .form-errors-js').length == 0) {
				// Lets create a error div
				$('.validateForm-js').prepend('<div class="form-errors-js"></div>');
			}

			// Display the error texts in error div
			$('.validateForm-js .form-errors-js').html(errors);

			// return the return value
			return valid;
		});

		// Hiding first department menu, so we could show our custom menus
		$('.item-342 ul li:first-child').hide();

		/*================================================================================
		$ RESIZE HOMEPAGE BANNER SIZE
		================================================================================*/

		if ($('.homepage-banner-wrapper').length > 0) {
			var bannerHeight = $(window).outerHeight();

			var HeaderHeight = $('.header-wrapper').outerHeight(false);

			$('.homepage-banner-wrapper').css('padding-top', HeaderHeight);
			$('.homepage-banner-wrapper').css('max-height', bannerHeight + 11);

		}

		$('#cbfv_50').on("blur","#email",function(){
		    email = $(this).val();

		    jQuery.ajax({
				url: jQuery('#base_url').val(),
				type: 'post',
				data: {option: 'com_bidders', task: 'validateFirstLogin', reg_check: '1', check_email: email, tmpl: 'auction'},
			})
				.done(function (response) {
					json = jQuery.parseJSON(response);
					if(json.status == 'success'){
						showOverlay();
						jQuery('.overlay-container__wrapper .overlay-content').html('<div id="first-login-box">\
	    <p>Welcome to the new Roma Numismatics website. Your existing user account has already been set up for you. Before you can log in, you will need to reset your password.</p><p> <a class="btn" href="/index.php?option=com_users&view=reset" title="Forgot password">Reset your Password</a></p></div>');
					}
				})
				.fail(function (response) {
				});
		});
	});

	$(window).load(function (windowWidth) {
		var $header = $('.header-wrapper');

		var HeaderHeight = $header.outerHeight();
		var windowHeight = $(window).outerHeight();

		// Setting padding for the fixed header -- 2nd step verification
		if ($('.homepage-banner-wrapper').length > 0 && windowWidth < 601) {
			$('.homepage-banner-wrapper').css('padding-top', trueHeaderHeight);
		} else {
			$('body').css('margin-top', HeaderHeight);
			$header.addClass('fixed');
		}

		// Setting top value of navigation bar -- 2nd step verification
		$('.navigation.header-nav, .search-box-top form.form-inline').css('top', HeaderHeight);

		$('.scroll-holder.scroll-bottom a').click(function (e) {
			e.preventDefault();
			e.stopPropagation();

			var target = ($('.home-banner').outerHeight() - $('div.header-wrapper').outerHeight());
			$('body, html').stop().animate({scrollTop: target + "px"}, 1000);
		});
	});

	/*================================================================================
	$ RESIZE
	================================================================================*/

	$(window).resize(function (windowWidth) {
		var HeaderHeight = $('.header-wrapper').outerHeight();
		var windowHeight = $(window).outerHeight();

		// Setting padding for the fixed header -- 2nd step verification
		if ($('.homepage-banner-wrapper').length > 0 && windowWidth < 601) {
			$('.homepage-banner-wrapper').css('padding-top', trueHeaderHeight);
		} else {
			$('body').css('margin-top', HeaderHeight);
			$header.addClass('fixed');
		}

		$('.banner-loading').css('height', windowHeight);

		$('.scroll-holder a').click(function (e) {
			e.preventDefault();
			e.stopPropagation();

			var target = ($('.home-banner').outerHeight() - $('div.header-wrapper').outerHeight());
			$('body, html').stop().animate({scrollTop: target + "px"}, 1000);
		});

		$('.navigation.header-nav, .search-box-top form.form-inline').css('top', HeaderHeight);

		var pageHeight = $(window).outerHeight() - HeaderHeight;
		$('.palets-holder').css('height', pageHeight);
	});
})(jQuery);

function showLogin(returnUrl) {
	jQuery.ajax({
		url: jQuery('#base_url').val(),
		type: 'post',
		data: {option: 'com_bidders', task: 'showLogin', top_login: true, tmpl: 'auction', returnUrl: returnUrl},
	})
		.done(function (response) {
			toggleSlimOverlay();

			try {
				json = JSON.parse(response);
				response = json.response;
			} catch (e) {
			}

			if (typeof json != 'undefined' && typeof json.status != 'undefined' && json.status == 'redirect') {
				window.location = json.return;
			}

			writeOverlayContent(response);
		})
		.fail(function (response) {
			jQuery('.overlay-container__wrapper .overlay-content').html('<p>Something went wrong, Please try again.</p>');
		});
}

function checklogin() {
	clearOverlayMessage();

	var check_url = window.location.href;
	var dev = check_url.indexOf("development")
	if (dev == -1) {
		var base_url = window.location.origin + '/';
	} else {
		var base_url = window.location.origin + '/development/';
	}
	var logincheck = 1;
	var field1 = jQuery("#password").val();
	var field2 = jQuery("#username").val();
	jQuery.ajax({
		url: 'index.php?option=com_bidders&task=login',
		type: 'POST',
		data: {username: field2, password: field1},
	}).done(function (data) {
		var json = '';
		try {
			var json = jQuery.parseJSON(data);
		} catch (e) {
		}

		if (json.status == "redirect") {
			location.reload();
		}
		else if (json.status == "failure") {
			jQuery("#login-overlay-message").html("Please enter valid username and password.");
		}
		else if (json.status == "first_login") {
			clearOverlayMessage();
			closeOverlay();
			showOverlay();
			jQuery('.overlay-container__wrapper .overlay-content').html('<div id="first-login-box">\
    <p>Welcome to the new Roma Numismatics website. Your existing user account has already been set up for you. Before you can log in, you will need to reset your password.</p><p> <a class="btn" href="/index.php?option=com_users&view=reset" title="Forgot password">Reset your Password</a></p></div>');
			// writeOverlayMessage("This is your first login. Please reset your password by click here");
		}
		else {
			logincheck = 0;
			jQuery("#login-overlay-message").html("Please enter valid username and password.");
		}
	});
}

function predictiveSearch(fields, auction_id) {
	if (typeof auction_id == 'undefiend') {
		auction_id = '';
	}

	if (jQuery(fields).length == 0) {
		return;
	}

	jQuery(fields)
	// don't navigate away from the field on tab when selecting an item
		.bind("keydown", function (event) {
			if (event.keyCode === jQuery.ui.keyCode.TAB &&
				jQuery(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		})
		.autocomplete({
			source: function (request, response) {
				jQuery.getJSON("index.php?option=com_bidders&tmpl=auction&task=getPredictiveKeywords&auction_id=" + auction_id, {
					term: extractLast(request.term)
				}, response);
			},
			search: function () {
				// custom minLength
				var term = extractLast(this.value);
				if (term.length < 2) {
					return false;
				}
			},
			focus: function () {
				// prevent value inserted on focus
				return false;
			},
			select: function (event, ui) {
				var terms = split(this.value);
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push(ui.item.value);
				// add placeholder to get the comma-and-space at the end
				terms.push("");
				this.value = terms.join(" ");
				return false;
			}
		});
}

function split(val) {
	return val.split(' ');
}

function extractLast(term) {
	return split(term).pop();
}

function showOverlay() {
	jQuery('.global-overlay').addClass('show-overlay');
	jQuery('.global-overlay .overlay-container__wrapper .overlay-content').html('<p>Loading...</p>');
}

function closeOverlay() {
	jQuery('.global-overlay').removeClass('show-overlay');

	// Remove the shipping class
	jQuery('.overlay-container__wrapper').removeClass('shipping-overlay');
}

function toggleSlimOverlay() {
	jQuery('.overlay-container__wrapper').addClass('slim');
}

function toggleNormalOverlay() {
	jQuery('.overlay-container__wrapper').removeClass('slim');
}

function writeOverlayContent(content) {
	jQuery('.overlay-container__wrapper .overlay-content').html(content);
}

function clearOverlayMessage() {
	jQuery('.overlay-container__wrapper #overlay-message').html('');
}

function writeOverlayMessage(content) {
	jQuery('.overlay-container__wrapper #overlay-message').html(content);
}

function submit_multiple_bids() {
	jQuery("#for_multiple_bids").submit();
}

jQuery(window).bind("pageshow", function (event) {
	if (event.originalEvent.persisted) {
		window.location.reload();
	}
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
