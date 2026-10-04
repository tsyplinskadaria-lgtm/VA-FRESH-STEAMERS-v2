(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const sliders = document.querySelectorAll(".about__slider");
            if (!sliders.length || typeof Swiper === "undefined") return;
            sliders.forEach((slider => {
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 700,
                    loop: true,
                    grabCursor: true,
                    autoplay: {
                        delay: 5e3,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    },
                    pagination: {
                        el: slider.querySelector(".about__pagination"),
                        clickable: true
                    },
                    touchRatio: 1,
                    touchAngle: 45,
                    resistance: true,
                    resistanceRatio: .85
                });
            }));
        } catch (error) {
            console.error("About Swiper error:", error);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const toggles = document.querySelectorAll(".content-toggle");
            if (!toggles.length) return;
            toggles.forEach((toggle => {
                const hidden = toggle.querySelector(".content-toggle__hidden");
                const button = toggle.querySelector(".content-toggle__button");
                const text = toggle.querySelector(".content-toggle__text");
                if (!hidden || !button || !text) return;
                button.addEventListener("click", (() => {
                    const isOpen = toggle.classList.contains("is-open");
                    if (isOpen) {
                        hidden.style.maxHeight = `${hidden.scrollHeight}px`;
                        requestAnimationFrame((() => {
                            hidden.style.maxHeight = "0px";
                        }));
                        toggle.classList.remove("is-open");
                        button.setAttribute("aria-expanded", "false");
                        text.textContent = "Read more";
                    } else {
                        hidden.style.maxHeight = `${hidden.scrollHeight}px`;
                        toggle.classList.add("is-open");
                        button.setAttribute("aria-expanded", "true");
                        text.textContent = "Read less";
                    }
                }));
            }));
        } catch (error) {
            console.error("Content toggle error:", error);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const path = window.location.pathname;
        document.querySelectorAll(".menu__item > a").forEach((link => {
            const href = link.getAttribute("href");
            if (!href || href === "#!") return;
            if (path.endsWith(href)) link.closest(".menu__item")?.classList.add("current");
        }));
        if (path.includes("services-single")) document.querySelector('.menu__item > a[href="services.html"]')?.closest(".menu__item")?.classList.add("current");
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const header = document.querySelector(".header");
        if (!header) return;
        let lastScroll = window.pageYOffset;
        const startPoint = 120;
        window.addEventListener("scroll", (() => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= startPoint) {
                header.classList.remove("header--hidden", "header--visible");
                lastScroll = currentScroll;
                return;
            }
            if (currentScroll > lastScroll) {
                header.classList.add("header--hidden");
                header.classList.remove("header--visible");
            } else {
                header.classList.remove("header--hidden");
                header.classList.add("header--visible");
            }
            lastScroll = currentScroll;
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const topItems = document.querySelectorAll(".menu > .menu__list > .menu__item--dropdown");
        const nestedItems = document.querySelectorAll(".menu__dropdown-item--has-dropdown");
        let topHideTimeout;
        let nestedHideTimeout;
        const isMobile = () => window.innerWidth <= 1200;
        topItems.forEach((item => {
            const link = item.querySelector(":scope > .menu__link");
            const hasDropdown = !!item.querySelector(":scope > .menu__dropdown");
            item.addEventListener("mouseenter", (() => {
                if (isMobile()) return;
                clearTimeout(topHideTimeout);
                topItems.forEach((el => {
                    if (el !== item) {
                        el.classList.remove("active");
                        el.querySelectorAll(".active").forEach((sub => {
                            sub.classList.remove("active");
                        }));
                    }
                }));
                if (hasDropdown) item.classList.add("active");
            }));
            item.addEventListener("mouseleave", (() => {
                if (isMobile()) return;
                if (!hasDropdown) return;
                topHideTimeout = setTimeout((() => {
                    item.classList.remove("active");
                    item.querySelectorAll(".active").forEach((el => {
                        el.classList.remove("active");
                    }));
                }), 1500);
            }));
            if (link && hasDropdown) link.addEventListener("click", (e => {
                if (!isMobile()) return;
                const href = link.getAttribute("href");
                if (e.target.closest("i")) {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle("active");
                    return;
                }
                if (!item.classList.contains("active")) {
                    e.preventDefault();
                    topItems.forEach((el => {
                        if (el !== item) el.classList.remove("active");
                    }));
                    nestedItems.forEach((el => el.classList.remove("active")));
                    item.classList.add("active");
                    return;
                }
                if (!href || href === "#" || href === "#!") {
                    e.preventDefault();
                    item.classList.remove("active");
                }
            }));
        }));
        nestedItems.forEach((item => {
            const link = item.querySelector(":scope > a");
            item.addEventListener("mouseenter", (() => {
                if (isMobile()) return;
                clearTimeout(nestedHideTimeout);
                const parent = item.parentElement;
                parent.querySelectorAll(":scope > .menu__dropdown-item--has-dropdown.active").forEach((el => {
                    if (el !== item) el.classList.remove("active");
                }));
                item.classList.add("active");
            }));
            item.addEventListener("mouseleave", (() => {
                if (isMobile()) return;
                nestedHideTimeout = setTimeout((() => {
                    item.classList.remove("active");
                }), 1500);
            }));
            if (link) link.addEventListener("click", (e => {
                if (!isMobile()) return;
                const href = link.getAttribute("href");
                if (e.target.closest("i")) {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle("active");
                    return;
                }
                if (!item.classList.contains("active")) {
                    e.preventDefault();
                    item.classList.add("active");
                    return;
                }
                if (!href || href === "#" || href === "#!") {
                    e.preventDefault();
                    item.classList.remove("active");
                }
            }));
        }));
        document.addEventListener("click", (e => {
            if (!e.target.closest(".menu")) {
                clearTimeout(topHideTimeout);
                clearTimeout(nestedHideTimeout);
                topItems.forEach((item => item.classList.remove("active")));
                nestedItems.forEach((item => item.classList.remove("active")));
            }
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const openBtn = document.querySelector(".open-menu");
        const closeBtn = document.querySelector(".close-menu");
        const menu = document.querySelector(".menu-wrapper");
        const overlay = document.querySelector(".menu-overlay");
        if (!openBtn || !menu || !overlay) return;
        function openMenu() {
            menu.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("menu-open");
        }
        function closeMenu() {
            menu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("menu-open");
        }
        openBtn.addEventListener("click", openMenu);
        closeBtn?.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);
        window.addEventListener("resize", (() => {
            if (window.innerWidth > 1200) closeMenu();
        }));
        document.querySelectorAll(".menu a").forEach((link => {
            link.addEventListener("click", (e => {
                const item = link.closest(".menu__item--dropdown");
                if (item && link.nextElementSibling?.classList.contains("menu__dropdown")) return;
                closeMenu();
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const heroSlider = document.querySelector(".hero-slider");
            if (!heroSlider) return;
            new Swiper(heroSlider, {
                loop: true,
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                speed: 1200,
                autoplay: {
                    delay: 3e3,
                    disableOnInteraction: false
                },
                allowTouchMove: false
            });
        } catch (error) {
            console.error("Hero slider error:", error);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const items = document.querySelectorAll(".faq__item");
            if (!items.length) return;
            const closeItem = item => {
                const answer = item.querySelector(".faq__answer");
                if (!answer) return;
                const currentHeight = answer.scrollHeight;
                answer.style.height = `${currentHeight}px`;
                requestAnimationFrame((() => {
                    answer.style.height = "0px";
                }));
                item.classList.remove("faq__item--active");
                answer.addEventListener("transitionend", (() => {
                    if (!item.classList.contains("faq__item--active")) answer.style.height = "0px";
                }), {
                    once: true
                });
            };
            const openItem = item => {
                const answer = item.querySelector(".faq__answer");
                if (!answer) return;
                item.classList.add("faq__item--active");
                const height = answer.scrollHeight;
                answer.style.height = `${height}px`;
                answer.addEventListener("transitionend", (() => {
                    if (item.classList.contains("faq__item--active")) answer.style.height = "auto";
                }), {
                    once: true
                });
            };
            items.forEach((item => {
                const button = item.querySelector(".faq__question");
                const answer = item.querySelector(".faq__answer");
                if (!button || !answer) return;
                if (item.classList.contains("faq__item--active")) answer.style.height = "auto"; else answer.style.height = "0px";
                button.addEventListener("click", (() => {
                    const isActive = item.classList.contains("faq__item--active");
                    items.forEach((faqItem => {
                        if (faqItem !== item && faqItem.classList.contains("faq__item--active")) closeItem(faqItem);
                    }));
                    if (isActive) closeItem(item); else openItem(item);
                }));
            }));
        } catch (error) {
            console.error("FAQ error:", error);
        }
    }));
    new Swiper(".reviews__slider", {
        slidesPerView: 1.2,
        spaceBetween: 10,
        navigation: {
            nextEl: ".reviews__button--next",
            prevEl: ".reviews__button--prev"
        },
        pagination: {
            el: ".reviews__pagination",
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1100: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        }
    });
    document.addEventListener("DOMContentLoaded", (() => {
        const stats = document.querySelector(".why-choose__stats");
        if (!stats) return;
        const values = stats.querySelectorAll(".why-choose__stat-value");
        const animateValue = element => {
            const target = Number(element.dataset.target);
            const suffix = element.dataset.suffix || "";
            const duration = 1800;
            let startTime = null;
            const animate = currentTime => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(target * easeOut);
                element.textContent = currentValue.toLocaleString("en-US") + suffix;
                if (progress < 1) requestAnimationFrame(animate); else element.textContent = target.toLocaleString("en-US") + suffix;
            };
            requestAnimationFrame(animate);
        };
        const observer = new IntersectionObserver(((entries, observer) => {
            entries.forEach((entry => {
                if (entry.isIntersecting) {
                    values.forEach(((value, index) => {
                        setTimeout((() => {
                            animateValue(value);
                        }), index * 150);
                    }));
                    observer.unobserve(entry.target);
                }
            }));
        }), {
            threshold: .3
        });
        observer.observe(stats);
    }));
    new Swiper(".before-after__slider", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: ".before-after__next",
            prevEl: ".before-after__prev"
        },
        pagination: {
            el: ".before-after__pagination",
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15
            },
            600: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    });
    document.querySelectorAll(".compare").forEach((compare => {
        const line = compare.querySelector(".compare__line");
        const after = compare.querySelector(".compare__after");
        let active = false;
        function move(e) {
            const rect = compare.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width * 100;
            percent = Math.max(0, Math.min(100, percent));
            after.style.clipPath = `inset(0 0 0 ${percent}%)`;
            line.style.left = percent + "%";
        }
        line.addEventListener("mousedown", (() => {
            active = true;
            compare.classList.add("is-dragging");
        }));
        window.addEventListener("mouseup", (() => {
            active = false;
            compare.classList.remove("is-dragging");
        }));
        window.addEventListener("mousemove", (e => {
            if (!active) return;
            move(e);
        }));
        line.addEventListener("touchstart", (() => {
            active = true;
            compare.classList.add("is-dragging");
        }));
        window.addEventListener("touchend", (() => {
            active = false;
            compare.classList.remove("is-dragging");
        }));
        window.addEventListener("touchmove", (e => {
            if (!active) return;
            move({
                clientX: e.touches[0].clientX
            });
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const slider = document.querySelector(".before-after__slider-single");
        const pagination = document.querySelector(".before-after__pagination");
        const prevBtn = document.querySelector(".before-after__prev");
        const nextBtn = document.querySelector(".before-after__next");
        if (!slider || !pagination || !prevBtn || !nextBtn || typeof Swiper === "undefined") return;
        new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 500,
            loop: false,
            watchOverflow: true,
            allowTouchMove: false,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
                disabledClass: "is-disabled"
            },
            pagination: {
                el: pagination,
                clickable: true,
                bulletClass: "before-after-dot",
                bulletActiveClass: "active"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            },
            on: {
                init(swiper) {
                    toggleControls(swiper);
                },
                resize(swiper) {
                    toggleControls(swiper);
                },
                lock(swiper) {
                    toggleControls(swiper);
                },
                unlock(swiper) {
                    toggleControls(swiper);
                }
            }
        });
        function toggleControls(swiper) {
            const hide = swiper.isLocked;
            pagination.style.display = hide ? "none" : "";
            prevBtn.style.display = hide ? "none" : "";
            nextBtn.style.display = hide ? "none" : "";
        }
    }));
    new Swiper(".before-after__slider2", {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 600,
        spaceBetween: 15,
        navigation: {
            nextEl: ".before-after__next",
            prevEl: ".before-after__prev"
        },
        pagination: {
            el: ".before-after__pagination",
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15
            },
            600: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 15
            }
        }
    });
    document.addEventListener("DOMContentLoaded", (() => {
        const mapElement = document.querySelector("#business-map");
        if (!mapElement) return;
        try {
            const latitude = 41.4993;
            const longitude = -81.6944;
            const map = L.map(mapElement, {
                scrollWheelZoom: false,
                zoomControl: true
            }).setView([ latitude, longitude ], 10);
            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                maxZoom: 19,
                attribution: ""
            }).addTo(map);
            L.marker([ latitude, longitude ]).addTo(map).bindPopup(`\n        <strong>Cleveland</strong><br>\n        50-mile service area\n      `);
            map.getContainer().addEventListener("wheel", (event => {
                if (!event.ctrlKey) return;
                event.preventDefault();
                if (event.deltaY < 0) map.zoomIn(); else map.zoomOut();
            }), {
                passive: false
            });
        } catch (error) {
            console.error("Map initialization failed:", error);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const timelines = document.querySelectorAll(".timeline");
        if (!timelines.length) return;
        timelines.forEach((timeline => {
            const wrapper = timeline.querySelector(".timeline__wrapper");
            const track = timeline.querySelector(".timeline__track");
            const progress = timeline.querySelector(".timeline__progress");
            const dot = timeline.querySelector(".timeline__dot");
            const rows = [ ...timeline.querySelectorAll(".timeline__row") ];
            let animationFrame = null;
            function updateTimeline() {
                const wrapperRect = wrapper.getBoundingClientRect();
                const scrollY = window.pageYOffset;
                const wrapperTop = wrapperRect.top + scrollY;
                const wrapperHeight = wrapper.offsetHeight;
                const lineHeight = track.offsetHeight;
                const start = wrapperTop - window.innerHeight * .45;
                const end = wrapperTop + wrapperHeight - window.innerHeight * .55;
                let progressValue = (scrollY - start) / (end - start);
                progressValue = Math.max(0, Math.min(progressValue, 1));
                const currentY = progressValue * lineHeight;
                dot.style.top = `${currentY}px`;
                progress.style.height = `${currentY}px`;
                rows.forEach((row => {
                    const point = row.querySelector(".timeline__point");
                    const card = row.querySelector(".timeline__card");
                    if (!point || !card) return;
                    const pointRect = point.getBoundingClientRect();
                    const pointY = pointRect.top + scrollY - wrapperTop + point.offsetHeight / 2;
                    if (currentY >= pointY && !card.classList.contains("show")) card.classList.add("show");
                    point.classList.toggle("passed", currentY >= pointY);
                }));
                animationFrame = null;
            }
            function requestTick() {
                if (animationFrame) return;
                animationFrame = requestAnimationFrame(updateTimeline);
            }
            window.addEventListener("scroll", requestTick, {
                passive: true
            });
            window.addEventListener("resize", requestTick);
            updateTimeline();
        }));
    }));
    window["FLS"] = true;
})();