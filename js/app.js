(() => {
    "use strict";
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
    window["FLS"] = true;
})();