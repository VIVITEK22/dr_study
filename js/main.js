document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".white__card__work, .blue__card__work, .custom__position__card__work, .custom__position__card__work__blue__2, .custom__position__card__work__blue__3"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "0px",
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  // Swiper для блока how__it__work
  if (document.querySelector(".howitwork-swiper")) {
    new Swiper(".howitwork-swiper", {
      slidesPerView: 1.05,
      spaceBetween: 16,
      pagination: {
        el: ".howitwork-swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        930: {
          slidesPerView: "auto",
          spaceBetween: 32,
        },
      },
    });
  }
});

function initReviewsSwiper() {
  const reviewsContainer = document.querySelector(".rows__reviews");
  const reviews = document.querySelectorAll(".card__reviews");

  if (!reviewsContainer || !reviews.length || window.innerWidth > 930) return;

  let startX = 0;
  let currentX = 0;
  let currentIndex = 0;
  const totalReviews = reviews.length;
  const cardWidth = 85;
  const gap = 15;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    reviewsContainer.style.transition = "none";
  }

  function handleTouchMove(e) {
    if (!startX) return;

    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const containerWidth = reviewsContainer.offsetWidth;
    const offset =
      -currentIndex * (cardWidth + (gap / containerWidth) * 100) +
      (diff / containerWidth) * 100;

    if (currentIndex === 0 && diff > 0) {
      reviewsContainer.style.transform = `translateX(${diff / 5}px)`;
    } else if (currentIndex === totalReviews - 1 && diff < 0) {
      reviewsContainer.style.transform = `translateX(${
        -currentIndex * (cardWidth + (gap / containerWidth) * 100) + diff / 5
      }%)`;
    } else {
      reviewsContainer.style.transform = `translateX(${offset}%)`;
    }
  }

  function handleTouchEnd() {
    if (!startX) return;

    const diff = currentX - startX;
    const threshold = reviewsContainer.offsetWidth * 0.2;

    reviewsContainer.style.transition = "transform 0.3s ease";

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        currentIndex--;
      } else if (diff < 0 && currentIndex < totalReviews - 1) {
        currentIndex++;
      }
    }

    const containerWidth = reviewsContainer.offsetWidth;
    reviewsContainer.style.transform = `translateX(${
      -currentIndex * (cardWidth + (gap / containerWidth) * 100)
    }%)`;
    startX = 0;
    currentX = 0;
  }

  reviewsContainer.addEventListener("touchstart", handleTouchStart);
  reviewsContainer.addEventListener("touchmove", handleTouchMove);
  reviewsContainer.addEventListener("touchend", handleTouchEnd);
}

document.addEventListener("DOMContentLoaded", initReviewsSwiper);

window.addEventListener("resize", initReviewsSwiper);

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".rows__card__it__work");
  if (!container) return;

  let currentCardIndex = 0;
  const cards = Array.from(container.children);
  const totalCards = cards.length;
  let isScrolling = false;
  let startY = 0;
  let currentY = 0;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function switchCard(direction) {
    if (direction === "next" && currentCardIndex < totalCards - 1) {
      currentCardIndex++;
    } else if (direction === "prev" && currentCardIndex > 0) {
      currentCardIndex--;
    }

    const cardWidth = cards[0].offsetWidth;
    const scrollPosition = currentCardIndex * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  container.addEventListener(
    "touchstart",
    function (e) {
      if (!isElementInViewport(container)) return;
      startY = e.touches[0].clientY;
      isScrolling = true;
    },
    { passive: true }
  );

  container.addEventListener(
    "touchmove",
    function (e) {
      if (!isScrolling || !isElementInViewport(container)) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          switchCard("prev");
        } else {
          switchCard("next");
        }
        startY = currentY;
      }
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    function () {
      isScrolling = false;
    },
    { passive: true }
  );

  let lastScrollY = window.scrollY;
  let scrollTimeout;

  window.addEventListener(
    "scroll",
    function () {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(function () {
        if (!isElementInViewport(container)) return;

        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);

        if (scrollDelta > 30) {
          if (scrollDirection === "down") {
            switchCard("next");
          } else {
            switchCard("prev");
          }
        }

        lastScrollY = currentScrollY;
      }, 50);
    },
    { passive: true }
  );
});

let resultsSwiper;
document.addEventListener("DOMContentLoaded", function () {
  const resultsSwiperElement = document.querySelector(".results .swiper");
  console.log(
    document.querySelector(".results .custom-swiper-button.custom-next")
  );
  if (resultsSwiperElement) {
    resultsSwiper = new Swiper(resultsSwiperElement, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".results .swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        931: {
          slidesPerView: "auto",
          spaceBetween: 0,
          navigation: {
            nextEl: ".results .custom-swiper-button.custom-next",
            prevEl: ".results .custom-swiper-button.custom-prev",
          },
        },
        0: {
          navigation: false,
        },
      },
    });

    const tabs = document.querySelectorAll(".results .tab__results");
    if (tabs.length > 0) {
      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          const activeSlide = document.querySelector(".results .swiper-slide-active");
          const oldTab = document.querySelector(".results .swiper-slide-active .tab__results.active");
          if (oldTab) oldTab.classList.remove("active");
          tab.classList.add("active");
          if (activeSlide) {
            if (tab.dataset.tab === "before") {
              activeSlide.querySelector(".before__results").classList.add("active");
              activeSlide.querySelector(".before__results").classList.remove("no-active");
              activeSlide.querySelector(".after_results").classList.remove("active");
              activeSlide.querySelector(".after_results").classList.add("no-active");
            } else {
              activeSlide.querySelector(".before__results").classList.remove("active");
              activeSlide.querySelector(".before__results").classList.add("no-active");
              activeSlide.querySelector(".after_results").classList.add("active");
              activeSlide.querySelector(".after_results").classList.remove("no-active");
            }
          }
        });
      });
    }
  }

  // if (resultsSwiper) {
  //   resultsSwiper.on("slideChange", function () {
  //     const activeSlide = this.slides[this.activeIndex];
  //     const pagination = this.pagination;
  //     if (activeSlide) {
  //       const before = activeSlide.querySelector(".before__results");
  //       const after = activeSlide.querySelector(".after_results");
  //       const tabs = document.querySelectorAll(".results .tab__results");

  //       if (before) before.classList.remove("active");
  //       if (after) after.classList.remove("active");
  //       tabs.forEach((btn) => btn.classList.remove("active"));

  //       if (before) {
  //         before.classList.add("active");
  //         if (tabs.length > 0) tabs[0].classList.add("active");
  //       }
  //     }
  //   });

  //   resultsSwiper.on("init", function () {
  //     const initialSlide = this.slides[this.activeIndex];
  //     if (initialSlide) {
  //       const before = initialSlide.querySelectorAll(".before__results");
  //       const after = initialSlide.querySelectorAll(".after_results");
  //       const tabs = document.querySelectorAll(".results .tab__results");

  //       if (after) after.forEach((item) => item.classList.remove("active"));

  //       if (before) before.forEach((item) => item.classList.add("active"));

  //       if (tabs.length > 0) tabs[0].classList.add("active");
  //     }
  //   });

  //   if (resultsSwiper.initialized) {
  //     const initialRenderSlide =
  //       resultsSwiper.slides[resultsSwiper.activeIndex];
  //     if (initialRenderSlide) {
  //       const before = initialRenderSlide.querySelector(".before__results");
  //       const after = initialRenderSlide.querySelector(".after_results");
  //       const tabs = document.querySelectorAll(".results .tab__results");

  //       if (after) after.classList.remove("active");
  //       if (before) before.classList.add("active");
  //       if (tabs.length > 0) tabs[0].classList.add("active");
  //     }
  //   }
  // }
});
