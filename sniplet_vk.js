function vkFix() {
	'use strict';
	var wrap = document.getElementsByClassName('wide_column_wrap'),
		page = document.getElementById('page_body'),
		leftMenu = document.getElementsByClassName('narrow_column_wrap'),
		imageWrap = document.getElementsByClassName('page_post_sized_thumbs'),
		image = null,
		h = null,
		i = 0;


	if (leftMenu) {
		for (i = 0; i < leftMenu.length; i++) {
			leftMenu[i].parentNode.removeChild(leftMenu[i]);
		}
	}

	if (wrap) {
		for (i = 0; i < wrap.length; i++) {
			wrap[i].style.marginRight  = 0;
		}
	}

	if (page) {
		page.style.width = 'calc(100% - 150px)';
	}

	if (imageWrap) {
		for (i = 0; i < imageWrap.length; i++) {
			imageWrap[i].style.width = imageWrap[i].parentNode.offsetWidth + 'px';
			imageWrap[i].style.height = 'auto';
			image = imageWrap[i].firstChild;
			h = image.offsetWidth / image.offsetHeight;
			image.style.width = imageWrap[i].style.width;
			h = image.offsetWidth / h;
			image.style.height = h + 'px';
		}
	}
	return false;
}

var last_scroll_position = 0,
	scroll_step = 500;

window.addEventListener('scroll', function (e) {
	'use strict';
	if (window.scrollY > last_scroll_position + scroll_step) {
    last_scroll_position = window.scrollY;
    vkFix();
	}
});

vkFix();