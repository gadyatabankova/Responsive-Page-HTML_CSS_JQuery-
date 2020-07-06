$(document).ready(function(){

	// анимация элементов при загрузке страницы
	function myupd() {
		$('.load-page').delay(1000);
		$('.load-page').animate({left: '-100px', top: '-100px'}, 2000, 'linear');

	};

	window.onload = myupd();

	$('[name=tel]').mask("+7 (999) 999 - 9999");

  $('.burger_anchor_link').on('click', function(e) {
		// console.dir(this);
		// console.dir(this.attributes.getNamedItem('href'));
    $('.popup-container').fadeOut(400);
    $('body').removeClass('fixed');
    $('.menu-btn').toggleClass('menu-btn_active');
    $('body').scrollTo(this.attributes.getNamedItem('href').value);

  });

	$('.menu-btn').on('click', function(e) {
		e.preventDefault;
		$(this).toggleClass('menu-btn_active');
		if ($(this).hasClass('menu-btn_active')) {
			$('.popup-container').fadeIn(400);
			$('body').addClass('fixed');
		} else {
			$('.popup-container').fadeOut(400);
			$('body').removeClass('fixed');
		}
	});

  $('#learn_price, .feedback__order-call, .call-btn').on('click', function() {
    $('#form_call').fadeIn();
    // $('body').addClass('fixed');
  });

  $('.close-btn').on('click', function() {
    $('.popup-container_form').fadeOut();
    // $('body').removeClass('fixed');
  });

  $('#learn_more, #oder_project').on('click', function() {
    $('#form_mail').fadeIn();
    // $('body').addClass('fixed');
  });

	// для разрещения ввода только цифр в поле номера телефона
	// $('[name=tel]').on("input", function() {
  //   if (this.value.match(/[^0-9]/g)) {
  //       this.value = this.value.replace(/[^0-9]/g, '');
  //   }
  // });

    // карусель работ
    var multiItemSlider = (function () {

      function _isElementVisible(element) {
        var rect = element.getBoundingClientRect(),
          vWidth = window.innerWidth || doc.documentElement.clientWidth,
          vHeight = window.innerHeight || doc.documentElement.clientHeight,
          elemFromPoint = function (x, y) { return document.elementFromPoint(x, y) };
        if (rect.right < 0 || rect.bottom < 0
          || rect.left > vWidth || rect.top > vHeight)
          return false;
        return (
          element.contains(elemFromPoint(rect.left, rect.top))
          || element.contains(elemFromPoint(rect.right, rect.top))
          || element.contains(elemFromPoint(rect.right, rect.bottom))
          || element.contains(elemFromPoint(rect.left, rect.bottom))
        );
      }

      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // основный элемент блока
          _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
          _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
          _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
          _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
          _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
          _html = _mainElement.innerHTML,
          _indexIndicator = 0,
          _maxIndexIndicator = _sliderItems.length - 1,
          _indicatorItems,
          _positionLeftItem = 0, // позиция левого активного элемента
          _transform = 0, // значение транфсофрмации .slider_wrapper
          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
          _items = [], // массив элементов
          _interval = 0,
          _states = [
            { active: false, minWidth: 0, count: 1 },
            { active: false, minWidth: 576, count: 2 },
            { active: false, minWidth: 992, count: 3 },
            { active: false, minWidth: 1200, count: 4 },
          ],
          _config = {
            isCycling: false,
            direction: 'right',
            interval: 5000,
            pause: true
          };

        for (var key in config) {
          if (key in _config) {
            _config[key] = config[key];
          }
        }

        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var _setActive = function () {
          var _index = 0;
          var width = parseFloat(document.body.clientWidth);
          _states.forEach(function (item, index, arr) {
            _states[index].active = false;
            if (width >= _states[index].minWidth)
              _index = index;
          });
          _states[_index].active = true;
        }

        var _getActive = function () {
          var _index;
          _states.forEach(function (item, index, arr) {
            if (_states[index].active) {
              _index = index;
            }
          });
          return _index;
        }

        var position = {
          getItemMin: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position < _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position > _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: function () {
            return _items[position.getItemMin()].position;
          },
          getMax: function () {
            return _items[position.getItemMax()].position;
          }
        }

        var _transformItem = function (direction) {
          var nextItem, currentIndicator = _indexIndicator;
          if (!_isElementVisible(_mainElement)) {
            return;
          }
          if (direction === 'right') {
            _positionLeftItem++;
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
              nextItem = position.getItemMin();
              _items[nextItem].position = position.getMax() + 1;
              _items[nextItem].transform += _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform -= _step;
            _indexIndicator = _indexIndicator + 1;
            if (_indexIndicator > _maxIndexIndicator) {
              _indexIndicator = 0;
            }
          }
          if (direction === 'left') {
            _positionLeftItem--;
            if (_positionLeftItem < position.getMin()) {
              nextItem = position.getItemMax();
              _items[nextItem].position = position.getMin() - 1;
              _items[nextItem].transform -= _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform += _step;
            _indexIndicator = _indexIndicator - 1;
            if (_indexIndicator < 0) {
              _indexIndicator = _maxIndexIndicator;
            }
          }
          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
          _indicatorItems[currentIndicator].classList.remove('active');
          _indicatorItems[_indexIndicator].classList.add('active');
        }

        var _slideTo = function (to) {
          var i = 0, direction = (to > _indexIndicator) ? 'right' : 'left';
          while (to !== _indexIndicator && i <= _maxIndexIndicator) {
            _transformItem(direction);
            i++;
          }
        }

        var _cycle = function (direction) {
          if (!_config.isCycling) {
            return;
          }
        /*  _interval = setInterval(function () {
            _transformItem(direction);
          }, _config.interval);*/
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function (e) {
          e.preventDefault();
          if (e.target.classList.contains('slider__control')) {
            var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
            clearInterval(_interval);
            _cycle(_config.direction);
          }
          if (e.target.getAttribute('data-slide-to')) {
            _slideTo(parseInt(e.target.getAttribute('data-slide-to')));
            clearInterval(_interval);
            _cycle(_config.direction);
          }
        };

        var _handleVisibilityChange = function () {
          if (document.visibilityState === "hidden") {
            clearInterval(_interval);
          } else {
            clearInterval(_interval);
            _cycle(_config.direction);
          }
        }

        var _refresh = function () {
          clearInterval(_interval);
          _mainElement.innerHTML = _html;
          _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
          _sliderItems = _mainElement.querySelectorAll('.slider__item');
          _sliderControls = _mainElement.querySelectorAll('.slider__control');
          _sliderControlLeft = _mainElement.querySelector('.slider__control_left');
          _sliderControlRight = _mainElement.querySelector('.slider__control_right');
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
          _positionLeftItem = 0;
          _transform = 0;
          _indexIndicator = 0;
          _maxIndexIndicator = _sliderItems.length - 1;
          _step = _itemWidth / _wrapperWidth * 100;
          _items = [];
          _sliderItems.forEach(function (item, index) {
            _items.push({ item: item, position: index, transform: 0 });
          });
          _addIndicators();
        }

       // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        var _setUpListeners = function () {
          _mainElement.addEventListener('click', _controlClick);
          /*if (_config.pause && _config.isCycling) {
            _mainElement.addEventListener('mouseenter', function () {
              clearInterval(_interval);
            });
            _mainElement.addEventListener('mouseleave', function () {
              clearInterval(_interval);
              _cycle(_config.direction);
            });
          }*/

          document.addEventListener('visibilitychange', _handleVisibilityChange, false);
          window.addEventListener('resize', function () {
            var
              _index = 0,
              width = parseFloat(document.body.clientWidth);
            _states.forEach(function (item, index, arr) {
              if (width >= _states[index].minWidth)
                _index = index;
            });
            if (_index !== _getActive()) {
              _setActive();
              _refresh();
            }
          });
        }

        var _addIndicators = function () {
          var sliderIndicators = document.createElement('ol');
          sliderIndicators.classList.add('slider__indicators');
          for (var i = 0; i < _sliderItems.length; i++) {
            var sliderIndicatorsItem = document.createElement('li');
            if (i === 0) {
              sliderIndicatorsItem.classList.add('active');
            }
            sliderIndicatorsItem.setAttribute("data-slide-to", i);
            sliderIndicators.appendChild(sliderIndicatorsItem);
          }
          _mainElement.appendChild(sliderIndicators);
          _indicatorItems = _mainElement.querySelectorAll('.slider__indicators > li')
        }

        // добавляем индикаторы
        _addIndicators();
        // инициализация
        _setUpListeners();

        if (document.visibilityState === "visible") {
          _cycle(_config.direction);
        }
        _setActive();

        return {
          right: function () {
            _transformItem('right');
          },
          left: function () {
            _transformItem('left');
          },
          stop: function () {
            _config.isCycling = false;
            clearInterval(_interval);
          },
          cycle: function () {
            _config.isCycling = true;
            clearInterval(_interval);
            _cycle();
          }
        }

      }
    }());

    var slider = multiItemSlider('.slider', {
      isCycling: true
    })

  })
