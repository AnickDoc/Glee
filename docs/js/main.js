$(function () {

  $(".top-slider__wrapper").slick({
    arrows: false,
    dots: true
  });

  $(".header-icon__link-grid").on("click", function () {
    $(".products-list__cards").toggleClass("products-list__cards--list")
    $(".products__cards").toggleClass("products__cards--list")
    $(".products-card").toggleClass("products-card--list")
    $(".pagination").toggleClass("pagination--list")
    $(this).toggleClass("header-icon__link-grid--active")
  });

  $(window).on("resize", function () {
    if ($(window).width() <=768) {
      $(".products-list__cards").removeClass("products-list__cards--list")
      $(".products__cards").removeClass("products__cards--list")
      $(".products-card").removeClass("products-card--list")
      $(".pagination").removeClass("pagination--list")
    }
  });

  $(".products-list__filter-btn").on("click", function () {
    $(".products-filter").slideToggle(300)
  });

  $(".recent__star").rateYo({
    starWidth: "11px",
    spacing: "8px",
    readOnly: true,
    starSvg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11pt" height="11pt" viewBox="0 0 11 11" version="1.1"><g id="surface1" ><path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 10.96875 4.21875 C 10.894531 3.996094 10.699219 3.835938 10.464844 3.816406 L 7.289062 3.527344 L 6.035156 0.589844 C 5.941406 0.375 5.730469 0.234375 5.496094 0.234375 C 5.265625 0.234375 5.054688 0.375 4.960938 0.589844 L 3.707031 3.527344 L 0.53125 3.816406 C 0.296875 3.835938 0.101562 3.996094 0.0273438 4.21875 C -0.0429688 4.441406 0.0234375 4.683594 0.199219 4.839844 L 2.597656 6.941406 L 1.890625 10.058594 C 1.839844 10.289062 1.929688 10.523438 2.117188 10.660156 C 2.21875 10.734375 2.339844 10.773438 2.460938 10.773438 C 2.566406 10.773438 2.667969 10.746094 2.761719 10.691406 L 5.496094 9.054688 L 8.234375 10.691406 C 8.433594 10.808594 8.6875 10.800781 8.875 10.660156 C 9.066406 10.523438 9.15625 10.289062 9.105469 10.058594 L 8.398438 6.941406 L 10.796875 4.839844 C 10.972656 4.683594 11.039062 4.441406 10.96875 4.21875 Z M 10.96875 4.21875 " /></g></svg >',
  });

  $(".products-card__star").rateYo({
    starWidth: "18px",
    spacing: "12px",
    readOnly: true,
    starSvg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18pt" height="18pt" viewBox="0 0 18 18" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 17.945312 6.902344 C 17.828125 6.539062 17.503906 6.277344 17.121094 6.246094 L 11.929688 5.773438 L 9.875 0.964844 C 9.722656 0.613281 9.378906 0.386719 8.996094 0.386719 C 8.613281 0.386719 8.269531 0.613281 8.117188 0.96875 L 6.0625 5.773438 L 0.871094 6.246094 C 0.488281 6.28125 0.164062 6.539062 0.046875 6.902344 C -0.0703125 7.265625 0.0390625 7.664062 0.328125 7.917969 L 4.253906 11.359375 L 3.09375 16.460938 C 3.011719 16.835938 3.15625 17.222656 3.464844 17.445312 C 3.632812 17.566406 3.828125 17.628906 4.027344 17.628906 C 4.195312 17.628906 4.367188 17.582031 4.515625 17.492188 L 8.996094 14.816406 L 13.476562 17.492188 C 13.800781 17.691406 14.214844 17.671875 14.527344 17.445312 C 14.835938 17.222656 14.980469 16.832031 14.898438 16.460938 L 13.738281 11.359375 L 17.664062 7.917969 C 17.953125 7.664062 18.066406 7.265625 17.945312 6.902344 Z M 17.945312 6.902344 " /></g></svg >',
  });

  $('.price__input').ionRangeSlider({
    type: "double",
    prefix: "$",
    onStart: function (data) {
      $('.price__from').text(data.from);
      $('.price__to').text(data.to);
    },
    onChange: function (data) {
      $('.price__from').text(data.from);
      $('.price__to').text(data.to);
    },
  });

  $(".menu__link-add").on("click", function () {
    $(this).toggleClass("menu__link-add--active")
  });

  $(".burger, .menu a").on("click", function () {
    $(".burger__line").toggleClass("burger__line--active")
    $(".menu").toggleClass("menu--active")
  });

  $(".partner__inner").slick({
    arrows: false,
    dots: false,
    slidesToShow: 5,
    autoplay: true,
    speed: 300,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    }
    ]
  });

  var containerEl1 = document.querySelector('[data-ref="products"]');
  var containerEl2 = document.querySelector('[data-ref="design"]');

  var config = {
    controls: {
      scope: 'local'
    }
  };

  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);

});