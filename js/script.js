var nodes = {
	nav: document.getElementsByClassName('global-header')[0],
	banner: document.getElementsByClassName('banner')[0],
}

var els = {
	navClientHeight: Number(window.getComputedStyle(nodes.nav).height.replace(/\D/g,'')),
	bannerClientHeight: Number(window.getComputedStyle(nodes.banner).height.replace(/\D/g,'')),
}

var handlers = {
	scroll: function() {
		if (window.scrollY > els.bannerClientHeight) {
			if (!nodes.nav.classList.contains('inverted')) nodes.nav.classList.add('inverted');
		} else if (nodes.nav.classList.contains('inverted')) nodes.nav.classList.remove('inverted');
	}
}

window.addEventListener('scroll', handlers.scroll, false);