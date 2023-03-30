(function($){
	$(document).ready(function() {
		// open/close menu
		$(document).on('click', '.btn-menu', function(e) {
			e.preventDefault();
			if( $(this).attr('aria-expanded') === 'false' ) {
				$(this).addClass('active');
				$(this).attr('aria-expanded', 'true');
				$('.site').addClass('blocked');
				$('.site').append('<div class="modal"></div>');
				$('.modal').append($(this).parent().find('nav').clone());
				$('.modal nav').prepend($(this).clone());
			} else {
				$('.btn-menu').removeClass('active');
				$('.btn-menu').attr('aria-expanded', 'false');
				$(this).parent().parent().remove();
				$('.site').removeClass('blocked');
			}
		});

		// check/show cart content
		$('.btn-cart').on('click', function(e) {
			e.preventDefault();
			$('.cart').toggleClass('show');
		});

		// adjust product quantity
		// decrease product amount
		$('.input-minus').on('click', function (e) {
			e.preventDefault();
			var quantity = $(this).parent().find('.form-field');
			var currentValue = parseInt(quantity.val());
			if( !isNaN(currentValue) && currentValue > 0 ) {
				quantity.val(currentValue - 1);
			}
		});

		// increase product amount
		$('.input-plus').on('click', function (e) {
			e.preventDefault();
			var quantity = $(this).parent().find('.form-field');
			var currentValue = parseInt(quantity.val());
			if( !isNaN(currentValue) ) {
				quantity.val(currentValue + 1);
			}
		});

		// add items to cart
		$('.product-form').on('submit', function(e) {
			e.preventDefault();
			var productName = $('input[name="product_name"]').val();
			var productPrice = $('input[name="product_price"]').val();
			var productThumb = $('input[name="product_thumb"]').val();
			var productQuantity = $('input[name="product_quantity"]').val();

			var productHTML = '<div class="cart-order">';
			productHTML += '<img class="cart-order-thumb" src="' + productThumb +'" alt="'+ productName +'"/>';;
			productHTML += '<div class="order-details">';
			productHTML += '<p class="order-product-name">'+productName+'</p>';
			productHTML += '<p class="order-product-price">&dollar;'+ productPrice +' x ' + productQuantity.toString() + ' <strong>&dollar;'+ (productPrice * productQuantity).toFixed(2) +'</strong></p></div>';
			productHTML += '<button class="btn btn-remove"><img src="./images/icon-delete.svg" alt="Remove product"/></button>';
			productHTML += '</div>';

			if( productQuantity > 0 ) {
				if ( $('.cart-badge').length ) {
					$('.cart-badge').text(productQuantity);
					$('.cart-order').remove();

				} else {
					$('.btn-cart').append('<span class="cart-badge">' + productQuantity + '</span>');
				}
				$('.cart-content').prepend(productHTML);
				$('.cart-empty').addClass('hidden');
				$('.btn-checkout').removeClass('hidden');
			}
			$('.form-field').val(0);
		});

		// remove items from cart
		$(document).on('click', '.btn-remove', function(e) {
			e.preventDefault();
			$(this).parent().remove();
			$('.cart-empty').removeClass('hidden');
			$('.btn-checkout').addClass('hidden');
		});

		var index = -2;

		// carousel gallery
		$(document).on('click', '.gallery-arrow', function(e) {
			e.preventDefault();
			// set the gallery and the thumbnails
			var gallery = $(this).parent().find('.gallery-item');
			var galleryThumbs = $(this).parent().parent().find('.gallery-nav-thumb');
			// set the index
			if( index == -2 ) {
				$.each(gallery, function(i, v) {
					if( $(gallery[i]).hasClass('active') ) {
						index = i;
					}
				});
			}
			// get the action wanted from the arrow clicked
			var action = $(this).data('arrow');
			// update index depending on the action : next/prev
			switch ( action ) {
				case 'next': index++;
					if ( index >= gallery.length ) {
						index = index % gallery.length;
					}
					break;
				case 'prev': index--;
					if ( index < 0 ) {
						index = gallery.length - 1;
					}
					break;
			}
			// update the gallery
			gallery.removeClass('active');
			galleryThumbs.removeClass('active');
			gallery.eq(index).addClass('active');
			galleryThumbs.eq(index).addClass('active');
		});

		$(document).on('click', '.gallery-nav-thumb', function(e) {
			e.preventDefault();
			// set the gallery and the thumbnails
			var gallery = $(this).parent().parent().find('.gallery-item');
			var galleryThumbs = $(this).parent().find('.gallery-nav-thumb');
			// set the new index
			index = $(this).data('item-index');
			// update the gallery
			gallery.removeClass('active');
			galleryThumbs.removeClass('active');
			gallery.eq(index).addClass('active');
			galleryThumbs.eq(index).addClass('active');
		});

		// lighbox
		$(document).on('click', '.gallery-item', function(e) {
			e.preventDefault();
			$('.site').addClass('blocked');
			$('.site').append('<div class="modal"></div>');
			$('.modal').append('<div class="modal-gallery"></div>');
			$('.modal-gallery').append('<button type="button" class="btn btn-modal"><img class="close-modal" src="./images/icon-close.svg" alt="Menu"/></button>');
			$('.modal-gallery').append($(this).parent().parent().clone());
		});

		// close lightbox modal
		$(document).on('click', '.btn-modal', function(e) {
			e.preventDefault();
			$(this).parent().parent().remove();
		});
	});
})(jQuery);