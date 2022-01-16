/*===============================================================
	menu
================================================================*/
document.addEventListener('DOMContentLoaded', function () {
	const bar = document.querySelector('.bar');
	setTimeout(function () {
		bar.style.display = 'flex';
		bar.classList.add('animate__slideInLeft');
	}, 1000);


	const openMenu = document.querySelector('.open-menu'),
		closeMenu = document.querySelector('.close-menu'),
		menu = document.querySelector('.navigation');
	openMenu.onclick = () => {
		menu.classList.add('navigation--open');
	}
	closeMenu.onclick = () => {
		menu.classList.remove('navigation--open');
	}
});

/*===============================================================
	slider - main page
================================================================*/
document.addEventListener('DOMContentLoaded', function () {

	function sliderHome(sectionSelector, slideSelector, prevSelector, nextSelector, dotSelector) {
		let slideIndex = 0,
			section = document.querySelector(sectionSelector),
			slides = section.querySelectorAll(slideSelector),
			prev = section.querySelector(prevSelector),
			next = section.querySelector(nextSelector),
			dots = section.querySelectorAll(dotSelector),
			autoPlay = setInterval(function () {
				nextSlide(1);
			}, 900000000);
		let countCur = document.querySelector('.count__cur'),
			countAll = document.querySelector('.count__all');
		goSlide(slideIndex);
		function goSlide(n) {
			if (n > slides.length - 1) {
				slideIndex = 0;
			}
			if (n < 0) {
				slideIndex = slides.length - 1;
			}
			slides.forEach(item => {
				item.style.display = 'none';
				item.classList.remove('animate__animated', 'animate__fadeIn');
				countAll.innerText = slides.length;
				countCur.innerText = slideIndex + 1;
			});
			dots.forEach(item => {
				item.classList.remove('dots__item--active');
			});
			slides[slideIndex].style.display = 'flex';
			slides[slideIndex].classList.add('animate__animated', 'animate__fadeIn');
			dots[slideIndex].classList.add('dots__item--active');
		}
		function nextSlide(n) {
			goSlide(slideIndex += n);
		}
		function currentSlide(n) {
			goSlide(slideIndex = n);
		}
		prev.addEventListener('click', function () {
			clearInterval(autoPlay);
			nextSlide(-1);
		});
		next.addEventListener('click', function () {
			clearInterval(autoPlay);
			nextSlide(1);
		});
		dots.forEach((item, i) => {
			item.addEventListener('click', function (e) {
				clearInterval(autoPlay);
				if (e.target == dots[i])
					currentSlide(i);
			});
		});
	}
	sliderHome('.home', '.slider-home__item', '.prev', '.next', '.dots__item');
});

/*===============================================================
	fansybox on page About
================================================================*/
document.addEventListener('DOMContentLoaded', function () {
	const imgs = document.querySelectorAll('.about__license img');
	const modal = document.querySelector('.modal-license');
	const modalBody = document.querySelector('.modal-slider');
	const next = document.querySelector('.modal-slider__nav--next');
	const prev = document.querySelector('.modal-slider__nav--prev');
	let slideIndex = 0;
	imgs.forEach((item, itemIndex) => {
		item.addEventListener('click', function () {
			slideIndex = itemIndex;
			modal.classList.add('modal-license--active');
			modal.querySelector('.modal-license__body').classList.add('animate__zoomIn');
			for (i = 0; i < imgs.length; i++) {
				let slideImg = document.createElement('img');
				slideImg.setAttribute('src', ' ' + imgs[i].src + ' ');
				slideImg.classList.add('modal-license__slide');
				modalBody.append(slideImg);
			}
			goSlide(slideIndex);
		});
	});
	function goSlide(n) {
		let slides = document.querySelectorAll('.modal-license__slide');
		if (n > slides.length - 1) {
			slideIndex = 0;
		}
		if (n < 0) {
			slideIndex = slides.length - 1;
		}
		slides.forEach(elem => {
			elem.style.display = 'none';
			elem.classList.remove('animate__animated', 'animate__fadeIn');
		});
		slides[slideIndex].style.display = 'block';
		slides[slideIndex].classList.add('animate__animated', 'animate__fadeIn');
		modal.querySelector('.modal-license__body').classList.remove('animate__zoomOut');
	}
	function nextSlide(n) {
		goSlide(slideIndex += n);
	}
	next.addEventListener('click', function () {
		nextSlide(1);
	});
	prev.addEventListener('click', function () {
		nextSlide(-1);
	});
	document.addEventListener('click', (e) => {
		const target = e.target;
		const itsModalBody = target.closest('.modal-license__body');
		const itsWrapper = target.closest('.about__licensed');
		const modalClose = document.querySelector('.modal-license--close');

		if (!itsModalBody && !itsWrapper && modal.classList.contains('modal-license--active') || target == modalClose) {
			modal.querySelector('.modal-license__body').classList.add('animate__zoomOut');
			setTimeout(function () {
				modal.classList.remove('modal-license--active');
			}, 500);
			modalBody.innerHTML = '';
		}
	});
	// на разрешении 992пх превращаем в слайдер
	if (document.documentElement.clientWidth < 992) {
		function sliderLicense(sectionSelector, slideSelector, dotSelector) {
			let slideIndex = 0,
				section = document.querySelector(sectionSelector),
				slides = section.querySelectorAll(slideSelector),
				dots = section.querySelectorAll(dotSelector);
			goSlide(slideIndex);
			function goSlide(n) {
				if (n > slides.length - 1) {
					slideIndex = 0;
				}
				if (n < 0) {
					slideIndex = slides.length - 1;
				}
				slides.forEach(item => {
					item.style.display = 'none';
					item.classList.remove('animate__animated', 'animate__fadeIn');
				});
				dots.forEach(item => {
					item.classList.remove('dots__item--active');
				});
				slides[slideIndex].style.display = 'block';
				slides[slideIndex].classList.add('animate__animated', 'animate__fadeIn');
				dots[slideIndex].classList.add('dots__item--active');
			}
			function nextSlide(n) {
				goSlide(slideIndex += n);
			}
			function currentSlide(n) {
				goSlide(slideIndex = n);
			}
			prev.addEventListener('click', function () {
				nextSlide(-1);
			});
			next.addEventListener('click', function () {
				nextSlide(1);
			});
			dots.forEach((item, i) => {
				item.addEventListener('click', function (e) {
					if (e.target == dots[i])
						currentSlide(i);
				});
			});
		}
		sliderLicense('.about', '.about__license', '.dots__item');
	}

});

/*===============================================================
	map on page Сontacts
================================================================*/
document.addEventListener('DOMContentLoaded', function () {
	ymaps.ready(init);

	function init() {
		var myMap = new ymaps.Map("map", {
			center: [55.753215, 37.622504],
			zoom: 13,
			controls: ['smallMapDefaultSet']
		}, {
			searchControlProvider: 'yandex#search'
		});
		// Создаем геообъект с типом геометрии "Точка".
		myGeoObject = new ymaps.GeoObject({
			// Описание геометрии.
			geometry: {
				type: "Point"
			},
		});

		myMap.geoObjects
			.add(myGeoObject)
			.add(new ymaps.Placemark([55.753215, 37.622504], {
				balloonContent: '<strong></strong>',
				iconCaption: ''
			}, {
				preset: 'islands#blueCircleDotIconWithCaption',
				iconCaptionMaxWidth: '200'
			}));

		// тип карты - гибрид
		myMap.setType('yandex#publicMap');

		//отключаем зум колёсиком мышки
		myMap.behaviors.disable('scrollZoom');

		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
	}
});

/*===============================================================
	slick slider on page News
================================================================*/
$('.slider-news').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: false,
	dots: true,
	speed: 1000,
	variableWidth: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				variableWidth: false,
				dots: false
			}
		},
		{
			breakpoint: 565,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: false,
				dots: false
			}
		}
	]
});

$(".nav-news__prev").on("click", function () {
	$('.slider-news').slick("slickPrev");
});
$(".nav-news__next").on("click", function () {
	$('.slider-news').slick("slickNext");
});

/*===============================================================
	modals
================================================================*/
document.addEventListener('DOMContentLoaded', function () {

	const orderCallForm = document.querySelector('#order-call-form');
	const nowInput = document.querySelector('#now');
	const timeSelect = document.querySelector('.form-modal__time');
	orderCallForm.addEventListener('change', function () {
		if (nowInput.checked) {
			timeSelect.style.display = 'none';
			console.log('check');
		} else {
			timeSelect.style.display = 'block';
			console.log('not-check');
		}
	});
	/* fileinput */
	$(document).ready(function () {
		$(".file__download").change(function () {
			let filename = $(this).val().replace(/.*\\/, "");
			$(".file__input").val(filename);
		});
	});

});
