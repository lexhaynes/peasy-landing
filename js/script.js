var nodes = {
	container: document.getElementsByClassName('container')[0],
	nav: document.getElementsByClassName('global-header')[1],
	banner: document.getElementsByClassName('banner')[0],
	signupButton: document.getElementsByClassName('button-signup'),
	signupModal: document.getElementsByClassName('modal mod-signup')[0],
	modalOverlay: document.getElementsByClassName('modal-overlay')[0],
	closeButton: document.getElementsByClassName('modal-close')[0],
	menuButton: document.getElementsByClassName('hamburger-menu')[0], 
	howBox2: document.getElementsByClassName('how-box2')[0], 
	howBoxImg2: document.getElementsByClassName('how-box-img2')[0], 
	howBoxContent2: document.getElementsByClassName('how-box-content2')[0], 
	 
}

var els = {
	navClientHeight: Number(window.getComputedStyle(nodes.nav).height.replace(/\D/g,'')),
	bannerClientHeight: Number(window.getComputedStyle(nodes.banner).height.replace(/\D/g,'')),
}

var state = {
	screenSize: 1440,
	isMobile: false,
	menuButtonClicked: false
}

var constants = {
	mobileBreakpoint: 800,
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

		isMobile: function() {
			return state.screenSize > constants.mobileBreakpoint ? false : true;
		},

		getScreenSize: function() {
			return document.documentElement.clientWidth;
		}

	};
})();

var howBox = {
	//optimize these two
	swapItems: function(parent, node1, node2) {
		parent.insertBefore(node1, node2);
	},

}

var observers = {
	updateMobileState: function() {
		state.isMobile = utils.isMobile();
	},
}



var handlers = (function(){

	return {
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

		load: function() {
			handlers.init();
		},

		resize: function() {
			handlers.init();
		},

		init: function() {
			state.screenSize = utils.getScreenSize();
			//console.log('resized state.screen_size: ' + state.screenSize);
			observers.updateMobileState();

			if (state.isMobile) {
				//switch how box image positions
				howBox.swapItems(nodes.howBox2, nodes.howBoxContent2, nodes.howBoxImg2);
			}  //else swap them back
		},
	}
})();


window.addEventListener('load', handlers.load, false);

window.addEventListener('scroll', handlers.scroll, false);

window.addEventListener('resize', handlers.resize, false);

//add event listener to sign up buttons
for (var i = 0; i < nodes.signupButton.length; i++) {
	var button = nodes.signupButton[i];
	button.addEventListener('click', handlers.click, false);
}

nodes.closeButton.addEventListener('click', handlers.click, false);

nodes.menuButton.addEventListener('click', handlers.click, false);
