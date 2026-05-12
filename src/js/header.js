const DESKTOP_BP = 1200;

function initHeader() {
	const burger = document.querySelector('.js-menu-toggle');
	const mobileMenu = document.querySelector('.js-mobile-menu');
	const menuClose = document.querySelector('.js-menu-close');
	const otherOpen = document.querySelector('.js-other-open');
	const otherBack = document.querySelector('.js-other-back');
	const otherToggle = document.querySelector('.js-other-toggle');
	const otherDropdown = document.querySelector('.js-other-dropdown');
	const otherClose = document.querySelector('.js-other-close');

	if (!burger || !mobileMenu) return;

	const mainView = mobileMenu.querySelector('[data-view="main"]');
	const subView = mobileMenu.querySelector('[data-view="sub"]');

	const openMobile = () => {
		mobileMenu.classList.add('is-open');
		mobileMenu.setAttribute('aria-hidden', 'false');
		burger.classList.add('active');
		burger.setAttribute('aria-expanded', 'true');
		document.body.classList.add('lock');
		showMainView();
	};

	const closeMobile = () => {
		mobileMenu.classList.remove('is-open');
		mobileMenu.setAttribute('aria-hidden', 'true');
		burger.classList.remove('active');
		burger.setAttribute('aria-expanded', 'false');
		document.body.classList.remove('lock');
	};

	const showMainView = () => {
		if (!mainView || !subView) return;
		mainView.classList.add('is-active');
		subView.classList.remove('is-active');
	};

	const showSubView = () => {
		if (!mainView || !subView) return;
		mainView.classList.remove('is-active');
		subView.classList.add('is-active');
	};

	burger.addEventListener('click', () => {
		if (mobileMenu.classList.contains('is-open')) {
			closeMobile();
		} else {
			openMobile();
		}
	});

	if (menuClose) menuClose.addEventListener('click', closeMobile);
	if (otherOpen) otherOpen.addEventListener('click', showSubView);
	if (otherBack) otherBack.addEventListener('click', showMainView);

	// Desktop dropdown «Other»
	const openDropdown = () => {
		if (!otherDropdown) return;
		otherDropdown.classList.add('is-open');
		otherDropdown.setAttribute('aria-hidden', 'false');
		if (otherToggle) otherToggle.setAttribute('aria-expanded', 'true');
	};

	const closeDropdown = () => {
		if (!otherDropdown) return;
		otherDropdown.classList.remove('is-open');
		otherDropdown.setAttribute('aria-hidden', 'true');
		if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
	};

	if (otherToggle && otherDropdown) {
		let closeTimer = null;
		const HOVER_CLOSE_DELAY = 200;

		const scheduleClose = () => {
			clearTimeout(closeTimer);
			closeTimer = setTimeout(closeDropdown, HOVER_CLOSE_DELAY);
		};

		const cancelClose = () => {
			clearTimeout(closeTimer);
		};

		otherToggle.addEventListener('mouseenter', () => {
			cancelClose();
			openDropdown();
		});
		otherToggle.addEventListener('mouseleave', scheduleClose);
		otherToggle.addEventListener('focus', () => {
			cancelClose();
			openDropdown();
		});

		otherDropdown.addEventListener('mouseenter', cancelClose);
		otherDropdown.addEventListener('mouseleave', scheduleClose);

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeDropdown();
				closeMobile();
			}
		});
	}

	if (otherClose) otherClose.addEventListener('click', closeDropdown);

	// При переходе на desktop — закрываем мобильное меню; при переходе на мобильный — закрываем дропдаун
	window.addEventListener('resize', () => {
		if (window.innerWidth >= DESKTOP_BP) {
			closeMobile();
		} else {
			closeDropdown();
		}
	});
}

document.addEventListener('DOMContentLoaded', initHeader);

export {};
