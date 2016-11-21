var nodes = {
	container: document.getElementsByClassName('container')[0],
	nav: document.getElementsByClassName('global-header')[1],
	banner: document.getElementsByClassName('banner')[0],
	signupButton: document.getElementsByClassName('button-signup'),
	signupModal: document.getElementsByClassName('modal mod-signup')[0],
	modalOverlay: document.getElementsByClassName('modal-overlay')[0],
	closeButton: document.getElementsByClassName('modal-close')[0],
	menuButton: document.getElementsByClassName('hamburger-menu')[0],
}

var els = {
	navClientHeight: Number(window.getComputedStyle(nodes.nav).height.replace(/\D/g,'')),
	bannerClientHeight: Number(window.getComputedStyle(nodes.banner).height.replace(/\D/g,'')),
}

var state = {
	mobileBreakpoint: 1024,
	screenSize: document.documentElement.clientWidth,
	isMobile: false,
	menuButtonClicked: false
}

var utils = (function() {

	return {
		addClass: function(el, className) {
			if (!el.classList.contains(className)) {
				el.classList.add(className)
			}
		},

		removeClass: function(el, className) {
			if (el.classList.contains(className)) {
				el.classList.remove(className)
			}
		},

		addClasses: function(args) {
			args.map(function(key, index) {
				utils.addClass(key[0], key[1]);
			})
		},

		removeClasses: function(args) {
			args.map(function(key, index) {
				utils.removeClass(key[0], key[1]);
			})
		},

	};
})();


var handlers = {
	scroll: function() {
		window.scrollY > els.bannerClientHeight ? utils.addClass(nodes.nav, 'inverted') : utils.removeClass(nodes.nav, 'inverted');
	},

	click: function(e) {
		//make sure we're only detecting the button containers and not the button children
		var button = e.target == this ? e.target : e.target.parentElement;
		
		//signup button handler
		if (button.classList.contains('button-signup')) {
			console.log('signup');
			nodes.signupModal.classList.remove('is-hidden');
			utils.removeClass(nodes.signupModal, 'is-hidden');

			//add cutoff class to container
			utils.addClass(nodes.container, 'is-cutoff');
		}

		//signin button handler
		if (button.classList.contains('button-signin')) {
			console.log('signin')
		}

		//close button handler
		if (button.classList.contains('modal-close')) {
			utils.addClass(button.parentElement, 'is-hidden');

			//remove cutoff class from 
			utils.removeClass(nodes.container, 'is-cutoff');
		}

		//hamburger menu handler
		if (button.classList.contains('hamburger-menu')) {
			if (!state.menuButtonClicked) {
				utils.removeClass(button.nextElementSibling, 'is-hidden');
				state.menuButtonClicked = true;
			} else {
				utils.addClass(button.nextElementSibling, 'is-hidden');
				state.menuButtonClicked = false;
			}
		}

	},
}

window.addEventListener('scroll', handlers.scroll, false);

//add event listener to sign up buttons
for (var i = 0; i < nodes.signupButton.length; i++) {
	var button = nodes.signupButton[i];
	button.addEventListener('click', handlers.click, false);
}

nodes.closeButton.addEventListener('click', handlers.click, false);

nodes.menuButton.addEventListener('click', handlers.click, false);
