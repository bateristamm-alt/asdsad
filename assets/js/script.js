/*
* ----------------------------------------------------------------------------------------
Author       : Miguel Arcila
Template Name: Arcangelmg - Portfolio
Version      : 1.0                                          
* ----------------------------------------------------------------------------------------
*/

(function ($) {
  "use strict";

  /*
   * ----------------------------------------------------------------------------------------
   * SWIPER JS
   * ----------------------------------------------------------------------------------------
   */
  var postboxSlider = new Swiper(".postbox__slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".postbox-slider-button-next",
      prevEl: ".postbox-slider-button-prev",
    },
    breakpoints: {
      1200: { slidesPerView: 1 },
      992: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      576: { slidesPerView: 1 },
      0: { slidesPerView: 1 },
    },
  });

  /*
   * ----------------------------------------------------------------------------------------
   * EXTRA JS
   * ----------------------------------------------------------------------------------------
   */
  if ($(".counter-text-wrap").length) {
    $(".counter-text-wrap").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            { countNum: n },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      { accY: 0 }
    );
  }

  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  $(".sidebar__close-btn ,.mobile-menu .onepage li a  > *:not(button)").on(
    "click",
    function () {
      $(".sidebar__area").removeClass("sidebar-opened");
      $(".body-overlay").removeClass("opened");
    }
  );

  $(".sidebar-toggle-btn").on("click", function () {
    $(".sidebar__area").addClass("sidebar-opened");
    $(".body-overlay").addClass("opened");
  });
  $(".sidebar__close-btn").on("click", function () {
    $(".sidebar__area").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });

  $(".body-overlay").on("click", function () {
    $(".sidebar__area").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });

  /*
   * ----------------------------------------------------------------------------------------
   * MAGNIFIC POPUP JS
   * ----------------------------------------------------------------------------------------
   */
  var magnifPopup = function () {
    $(".work-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      gallery: { enabled: true },
      zoom: {
        enabled: false,
        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps, .popup-video").magnificPopup(
      {
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      }
    );
  };
  magnifPopup();

  /*
   * ----------------------------------------------------------------------------------------
   * SCROOL TO UP JS
   * ----------------------------------------------------------------------------------------
   */
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();

  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });

  /* ==========================================================================
   * SCROLLER ANIMATION
   * ========================================================================== */
  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  /*
   * ----------------------------------------------------------------------------------------
   * SMOTH SCROOL JS
   * ----------------------------------------------------------------------------------------
   */
  function scrollNav() {
    $(".onepage li a").click(function () {
      $(".onepage li a.active").removeClass("active");
      $(this).addClass("active");

      $("html, body")
        .stop()
        .animate(
          { scrollTop: $($(this).attr("href")).offset().top - 100 },
          1000
        );
      return false;
    });
  }
  scrollNav();

  /*
   * ----------------------------------------------------------------------------------------
   * Lenis JS
   * ----------------------------------------------------------------------------------------
   */
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ## Testimonials Active
  if ($(".testimonials-wrap").length) {
    $(".testimonials-wrap").slick({
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      speed: 1000,
      focusOnSelect: false,
      prevArrow: ".testimonial-prev",
      nextArrow: ".testimonial-next",
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: { slidesToShow: 1 },
        },
      ],
    });
  }

  // ## Project Filter
  $(".project-filter li").on("click", function () {
    $(".project-filter li").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");
    $(".project-masonry-active").imagesLoaded(function () {
      $(".project-masonry-active").isotope({
        itemSelector: ".item",
        filter: selector,
        masonry: { columnWidth: ".item" },
      });
    });
  });

  // ## Nice Select
  $("select").niceSelect();

  // ## WOW Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

  /*
   * ----------------------------------------------------------------------------------------
   * INTEGRACIÓN UNIFICADA DE EMAILJS (MIGUEL ARCILA)
   * ----------------------------------------------------------------------------------------
   */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    // Verificamos si la librería cargó correctamente desde el HTML
    if (typeof emailjs === "undefined") {
      alert("Error: La librería de EmailJS no se ha cargado en el HTML. Revisa la etiqueta <script> al final de tu HTML.");
      return false;
    }

    var $form = $(this);
    var $submitBtn = $form.find('button[type="submit"]');
    var originalBtnText = $submitBtn.innerHTML || $submitBtn.html();

    // Recogemos los parámetros para EmailJS usando los IDs exactos de tu HTML
    var params = {
      from_name: $("#name").val(),
      email_id: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val()
    };

    // IDs de EmailJS provistos por el usuario
    const serviceID = "service_mtbitlt"; 
    const templateID = "template_l0khixm"; 

    // Estado visual de carga nativo
    $submitBtn.html('Enviando... <i class="ri-loader-line animate-spin"></i>').prop('disabled', true);
    $form.find(".input-success, .input-error").fadeOut(200);

    // Envío del correo electrónico
    emailjs.send(serviceID, templateID, params)
      .then(function (res) {
        // Éxito: limpia formulario y muestra texto nativo
        $form.find(".input-success").delay(200).fadeIn(1000);
        $form[0].reset(); 
      })
      .catch(function (error) {
        // Error: registra detalles y muestra texto nativo de error
        console.error("EmailJS Error:", error);
        $form.find(".input-error").delay(200).fadeIn(1000);
      })
      .finally(function () {
        // Restablecemos el botón siempre
        $submitBtn.html(originalBtnText).prop('disabled', false);
      });

    return false;
  });

  /*
   * ----------------------------------------------------------------------------------------
   * HEADER & ANIMACIONES DE CARGA
   * ----------------------------------------------------------------------------------------
   */
  $(window).on("scroll", function () {
    function headerStyle() {
      if ($(".main-header").length) {
        var windowpos = $(window).scrollTop();
        var siteHeader = $(".main-header");
        var scrollLink = $(".scroll-top");
        if (windowpos >= 100) {
          siteHeader.addClass("fixed-header");
          scrollLink.fadeIn(300);
        } else {
          siteHeader.removeClass("fixed-header");
          scrollLink.fadeOut(300);
        }
      }
    }
    headerStyle();
  });

  $(window).on("load", function () {
    const svg = document.getElementById("preloaderSvg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
      delay: 1.5,
      y: -100,
      opacity: 0,
    });
    tl.to(svg, {
      duration: 0.5,
      attr: { d: curve },
      ease: "power2.easeIn",
    }).to(svg, {
      duration: 0.5,
      attr: { d: flat },
      ease: "power2.easeOut",
    });
    tl.to(".preloader", { y: -1500 });
    tl.to(".preloader", { zIndex: -1, display: "none" });
  });

  /*
   * ----------------------------------------------------------------------------------------
   * CUSTOM CURSOR JS
   * ----------------------------------------------------------------------------------------
   */
  const cursorBall = document.getElementById("ball");

  document.addEventListener("mousemove", function (e) {
    gsap.to(cursorBall, {
      duration: 0.3,
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      ease: "power2.out",
    });
  });

  const hoverElements = document.querySelectorAll("a");
  hoverElements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      cursorBall.classList.add("hovered");
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 2,
        opacity: 0,
        ease: 0.1,
      });
    });

    element.addEventListener("mouseleave", function () {
      cursorBall.classList.remove("hovered");
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      });
    });
  });
})(jQuery);
