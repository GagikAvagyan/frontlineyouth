const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

const slider = document.querySelector("[data-slider]");

if (slider) {
  const track = slider.querySelector(".focus-slider__track");
  const slides = Array.from(slider.querySelectorAll(".focus-slide"));
  const prev = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  const dots = Array.from(slider.querySelectorAll(".slider-dots button"));
  let activeIndex = 0;
  let sliderTimer;

  const setSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const restartSlider = () => {
    window.clearInterval(sliderTimer);
    sliderTimer = window.setInterval(() => setSlide(activeIndex + 1), 6000);
  };

  prev.addEventListener("click", () => {
    setSlide(activeIndex - 1);
    restartSlider();
  });

  next.addEventListener("click", () => {
    setSlide(activeIndex + 1);
    restartSlider();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      setSlide(dotIndex);
      restartSlider();
    });
  });

  restartSlider();
}

const heroSlider = document.querySelector("[data-hero-slider]");

if (heroSlider) {
  const hero = heroSlider.closest(".hero");
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const dots = Array.from(hero ? hero.querySelectorAll("[data-hero-dot]") : []);
  const prev = hero ? hero.querySelector("[data-hero-prev]") : null;
  const next = hero ? hero.querySelector("[data-hero-next]") : null;
  let activeHeroIndex = 0;
  let heroTimer;
  let heroBgTimer;

  const setHeroSlide = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === activeHeroIndex) return;
    activeHeroIndex = nextIndex;
    if (hero) {
      hero.classList.remove("hero--slide-1", "hero--slide-2", "hero--slide-3");
      hero.classList.add(`hero--slide-${activeHeroIndex + 1}`);
      hero.classList.remove("is-bg-changing");
      void hero.offsetWidth;
      hero.classList.add("is-bg-changing");
      window.clearTimeout(heroBgTimer);
      heroBgTimer = window.setTimeout(() => hero.classList.remove("is-bg-changing"), 1150);
    }
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeHeroIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeHeroIndex);
    });
  };

  const restartHeroSlider = () => {
    window.clearInterval(heroTimer);
    heroTimer = window.setInterval(() => setHeroSlide(activeHeroIndex + 1), 9500);
  };

  if (prev && next) {
    prev.addEventListener("click", () => {
      setHeroSlide(activeHeroIndex - 1);
      restartHeroSlider();
    });

    next.addEventListener("click", () => {
      setHeroSlide(activeHeroIndex + 1);
      restartHeroSlider();
    });
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      setHeroSlide(dotIndex);
      restartHeroSlider();
    });
  });

  restartHeroSlider();
}

const newsSlider = document.querySelector("[data-news-slider]");

if (newsSlider) {
  const track = newsSlider.querySelector(".news-slider__track");
  const cards = Array.from(newsSlider.querySelectorAll(".news-card"));
  const prev = newsSlider.querySelector("[data-news-prev]");
  const next = newsSlider.querySelector("[data-news-next]");
  const dots = Array.from(newsSlider.querySelectorAll("[data-news-dot]"));
  let activeIndex = 0;

  const getStep = () => {
    if (cards.length < 2) return 0;
    const first = cards[0].getBoundingClientRect();
    const second = cards[1].getBoundingClientRect();
    return second.left - first.left;
  };

  const setNewsSlide = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${getStep() * activeIndex}px)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  prev.addEventListener("click", () => setNewsSlide(activeIndex - 1));
  next.addEventListener("click", () => setNewsSlide(activeIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => setNewsSlide(dotIndex));
  });

  window.addEventListener("resize", () => setNewsSlide(activeIndex));
  setNewsSlide(0);
}

const impactLine = document.querySelector(".hero__impact");

if (impactLine) {
  const showImpactLine = () => impactLine.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const impactObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showImpactLine();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    impactObserver.observe(impactLine);
  } else {
    showImpactLine();
  }
}

const initiatives = document.querySelector("[data-initiatives]");

if (initiatives) {
  const initiativeItems = Array.from(initiatives.querySelectorAll(".initiative"));
  const initiativeTriggers = Array.from(initiatives.querySelectorAll("[data-initiative-trigger]"));

  const showInitiative = (activeIndex) => {
    initiativeItems.forEach((item, index) => {
      const isActive = index === activeIndex;
      const trigger = item.querySelector("[data-initiative-trigger]");
      const panel = item.querySelector(".initiative__panel");

      item.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-expanded", String(isActive));
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  };

  initiativeTriggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const isOpen = initiativeItems[index].classList.contains("is-active");
      showInitiative(isOpen ? -1 : index);
    });
  });
}

const appSection = document.querySelector("[data-app-animate]");

if (appSection) {
  const appButtons = appSection.querySelector(".app-store-links");
  const appPhoto = appSection.querySelector(".app-showcase__frame");
  const showAppButtons = () => appSection.classList.add("is-buttons-visible");
  const showAppPhoto = () => appSection.classList.add("is-photo-visible");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAppButtons();
    showAppPhoto();
  } else if ("IntersectionObserver" in window) {
    appSection.classList.add("is-animation-ready");

    const appButtonsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showAppButtons();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.65 }
    );

    const appPhotoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showAppPhoto();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.35 }
    );

    appButtonsObserver.observe(appButtons);
    appPhotoObserver.observe(appPhoto);
  } else {
    showAppButtons();
    showAppPhoto();
  }
}

const footerBrand = document.querySelector("[data-footer-brand]");

if (footerBrand) {
  const showFooterBrand = () => footerBrand.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const footerBrandObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showFooterBrand();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    footerBrandObserver.observe(footerBrand);
  } else {
    showFooterBrand();
  }
}
