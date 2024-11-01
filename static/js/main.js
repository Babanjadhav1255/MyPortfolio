/**
 * Template Name: iPortfolio - v3.10.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        });
    };
    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        });
    };

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
            }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });

    /**
     * Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault();

            let body = select('body');
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active');
                let navbarToggle = select('.mobile-nav-toggle');
                navbarToggle.classList.toggle('bi-list');
                navbarToggle.classList.toggle('bi-x');
            }
            scrollto(this.hash);
        }
    }, true);

    /**
     * Scroll with offset on page load with hash links in the URL
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Hero type effect
     */
    const typed = select('.typed');
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Skills animation
     */
    let skillsContent = select('.skills-content');
    if (skillsContent) {
        new Waypoint({
            element: skillsContent,
            offset: '80%',
            handler: function (direction) {
                let progressBars = select('.progress .progress-bar', true);
                progressBars.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%';
                });
            }
        });
    }

    /**
     * Portfolio isotope and filter
     */
    window.addEventListener('load', () => {
        const select = (el, all = false) => (all ? [...document.querySelectorAll(el)] : document.querySelector(el));
    
        const on = (type, el, listener, all = false) => {
            let selectEl = select(el, all);
            if (selectEl) {
                if (all) selectEl.forEach(e => e.addEventListener(type, listener));
                else selectEl.addEventListener(type, listener);
            }
        };
    
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });
    
            let portfolioFilters = select('#portfolio-flters li', true);
    
            on('click', '#portfolio-flters li', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(el => el.classList.remove('filter-active'));
                this.classList.add('filter-active');
    
                portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
                portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
            }, true);
        }
    });
    

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Certificate slider
     */
      // Swiper Initialization
     // Swiper Initialization with Auto-Scroll
const swiper = new Swiper('.certifications-slider', {
    loop: true, // Enable infinite loop
    slidesPerView: 3, // Show 3 slides at a time
    spaceBetween: 30, // Space between slides
  
    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Auto-scroll configuration
    autoplay: {
      delay: 2000, // Delay between transitions (in ms)
      disableOnInteraction: false, // Keep autoplay running after user interaction
    },
  
    // Remove navigation arrows by not including them
  });
  

    /**
     * Skills Auto Scroll
     */
    const skillsScroll = document.getElementById('skillsScroll'); // Select the scroll container

    if (skillsScroll) {
        let currentPosition = 0;
        const cardWidth = 220; // Card width (200px + 20px gap)
        const cardsVisible = 4; // Number of visible cards
        const totalCards = skillsScroll.children.length; // Total number of cards
        const interval = 3000; // Auto-scroll every 3 seconds
    
        function autoScroll() {
            currentPosition += cardWidth * cardsVisible;
    
            // If we've scrolled past the last set, reset to the beginning
            if (currentPosition >= cardWidth * totalCards) {
                currentPosition = 0;
            }
    
            skillsScroll.scrollTo({
                left: currentPosition,
                behavior: 'smooth'
            });
        }
    
        setInterval(autoScroll, interval);
    }
    
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    });

    /**
     * Initiate Pure Counter 
     */
    new PureCounter();

})();
