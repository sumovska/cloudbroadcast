/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery */

/*
 * On document ready
 */
$(document).ready(function () {

	/* iCheck plugin (Input checkbox/radiobox customisation) */
	$('input:checkbox:not(.icheck-input), input:radio:not(.icheck-input)').iCheck({
		labelHover: false,
		cursor: true
	});

	/* Form Custom Selectbox */
	$('.form-select').each(function () {
		$(this).selectpicker();
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			$(this).selectpicker('mobile');
		}
	});

	/* Nav-sidebar */
	$('.nav-sidebar').each(function () {
		var _active = $('li.active', this), _nav = $(this);
		if ($(window).width() <= 767) {
			$('a', _active).on('click', function () {
				_nav.toggleClass('open');
				return false;
			});
		}
	});

	/* Nav-pills-menu */
	$('.nav-pills-menu').each(function () {
		var _active = $('li.active', this), _nav = $(this);
		if ($(window).width() <= 1200) {
			$('a', _active).on('click', function () {
				_nav.toggleClass('open');
				return false;
			});
		}
	});

	/* Popup initialization */
	$('.js-ajax').magnificPopup({
		type: 'ajax'
	});

	/* Count */
	$('.count').each(function () {
		var input = $('input', this), up = $('.up', this), down = $('.down', this);
		input.keydown(function (e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				(e.keyCode == 65 && e.ctrlKey === true) ||
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				return;
			}
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
		up.click(function () {
			if (+input.val() < 100) {
				input.val(+input.val() + 1);
			}
		});
		down.click(function () {
			if (+input.val() > 1) {
				input.val(+input.val() - 1);
			}
		});
	});

	/* Datepicker */
	$('.timepicker').datetimepicker({
		datepicker: false,
		defaultTime: '12:00',
		format: 'h:i a',
		timepickerScrollbar: false
	});


	$('.datepicker').datetimepicker({
		lang: 'en',
		timepicker: false,
		format: 'm/d/Y',
		formatDate: 'M/d/y',
		value: 'current'
	});

});

$.extend(true, $.magnificPopup.defaults, {
	tClose: 'Close (Esc)', // Alt text on close button
	tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
	gallery: {
		tPrev: 'Prev', // Alt text on left arrow
		tNext: 'Next', // Alt text on right arrow
		tCounter: '%curr% из %total%', // Markup for "1 of 7" counter
		arrowMarkup: '<div title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></div>', // markup of an arrow button
		cursor: null
	},
	image: {
		tError: '<a href="%url%">Image</a> not found.', // Error message when image could not be loaded
		cursor: null
	},
	ajax: {
		tError: '<a href="%url%">Content</a> not found.' // Error message when ajax request failed
	},
	callbacks: {
		ajaxContentAdded: function() {
			$("#dropzone").dropzone({
				url: "/file/post"
			});
		}
	}
});