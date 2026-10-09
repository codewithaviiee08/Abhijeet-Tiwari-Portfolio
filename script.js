/* =========================================
   ABHIJEET TIWARI — PORTFOLIO JAVASCRIPT
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // SELECT ELEMENTS
    // =====================================

    const header = document.getElementById("header");
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const themeToggle = document.getElementById("themeToggle");
    const typingText = document.getElementById("typingText");
    const scrollProgress = document.getElementById("scrollProgress");
    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    const currentYear = document.getElementById("currentYear");

    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".reveal");

    // =====================================
    // CURRENT YEAR
    // =====================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    function closeMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = "fas fa-bars";
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fas fa-xmark"
                    : "fas fa-bars";
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });
    }

    // =====================================
    // LIGHT / DARK THEME
    // =====================================

    const THEME_KEY = "abhijeet-portfolio-theme";

    function updateThemeButton(isLight) {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.className = isLight
                ? "fas fa-moon"
                : "fas fa-sun";
        }

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem(THEME_KEY);
    } catch (error) {
        // Theme switching still works if storage is unavailable.
    }

    const prefersLight = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

    const startWithLight = savedTheme
        ? savedTheme === "light"
        : prefersLight;

    document.body.classList.toggle("light-theme", startWithLight);
    updateThemeButton(startWithLight);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");

            updateThemeButton(isLight);

            try {
                localStorage.setItem(
                    THEME_KEY,
                    isLight ? "light" : "dark"
                );
            } catch (error) {
                // The selected theme remains active for this page view.
            }
        });
    }

    // =====================================
    // TYPING ANIMATION
    // =====================================

    if (typingText) {
        const words = [
            "Software Development",
            "Web Development",
            "Python Programming",
            "Problem Solving",
            "Building Projects"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 85;
        const deletingSpeed = 45;
        const pauseAfterWord = 1300;

        function typeNext() {
            const currentWord = words[wordIndex];

            if (!deleting) {
                characterIndex++;

                typingText.textContent = currentWord.slice(
                    0,
                    characterIndex
                );

                if (characterIndex >= currentWord.length) {
                    deleting = true;

                    window.setTimeout(typeNext, pauseAfterWord);
                    return;
                }

                window.setTimeout(typeNext, typingSpeed);
                return;
            }

            characterIndex--;

            typingText.textContent = currentWord.slice(
                0,
                characterIndex
            );

            if (characterIndex <= 0) {
                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

                window.setTimeout(typeNext, 350);
                return;
            }

            window.setTimeout(typeNext, deletingSpeed);
        }

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            typeNext();
        } else {
            typingText.textContent = words[0];
        }
    }

    // =====================================
    // SCROLL REVEAL ANIMATION
    // =====================================

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // =====================================
    // SCROLL EFFECTS
    // =====================================

    let scrollTicking = false;

    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        // Header background and border.

        if (header) {
            header.classList.toggle("scrolled", scrollY > 20);
        }

        // Reading progress indicator.

        if (scrollProgress) {
            const progress = documentHeight > 0
                ? (scrollY / documentHeight) * 100
                : 0;

            scrollProgress.style.width =
                `${Math.min(progress, 100)}%`;
        }

        scrollTicking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(updateScrollEffects);
                scrollTicking = true;
            }
        },
        { passive: true }
    );

    updateScrollEffects();

    // =====================================
    // ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (!visibleSections.length) return;

                const activeId = visibleSections[0].target.id;

                navLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${activeId}`;

                    link.classList.toggle("active", isActive);
                });
            },
            {
                rootMargin: "-25% 0px -55% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // =====================================
    // CONTACT FORM
    // =====================================

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const name = document
                .getElementById("name")
                .value.trim();

            const email = document
                .getElementById("email")
                .value.trim();

            const subject = document
                .getElementById("subject")
                .value.trim();

            const message = document
                .getElementById("message")
                .value.trim();

            if (!name || !email || !subject || !message) {
                if (formNote) {
                    formNote.textContent =
                        "Please complete all fields before continuing.";
                }

                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                if (formNote) {
                    formNote.textContent =
                        "Please enter a valid email address.";
                }

                return;
            }

            const recipient = "abhijeettiwari955@gmail.com";

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                `Hello Abhijeet,\n\n` +
                `${message}\n\n` +
                `Regards,\n${name}\n` +
                `Reply email: ${email}`
            );

            const mailtoURL =
                `mailto:${recipient}` +
                `?subject=${emailSubject}` +
                `&body=${emailBody}`;

            if (formNote) {
                formNote.textContent =
                    "Opening your email application. If it doesn't open, email me directly at abhijeettiwari955@gmail.com.";
            }

            // Open the visitor's email application.
            window.location.href = mailtoURL;
        });
    }

    // =====================================
    // DOWNLOAD CV LINK CHECK
    // =====================================

    const cvLink = document.querySelector(
        'a[download][href*="Abhijeet-Tiwari-CV.pdf"]'
    );

    if (cvLink) {
        cvLink.addEventListener("click", (event) => {
            // Prevent a broken download if the file was not added.
            // Keep the download action available when the file exists.
            fetch(cvLink.href, { method: "HEAD" })
                .then((response) => {
                    if (!response.ok) {
                        event.preventDefault();

                        if (formNote) {
                            formNote.textContent =
                                "Please add your CV PDF to the assets folder before downloading.";
                        }
                    }
                })
                .catch(() => {
                    // Do not block the normal download on network errors.
                });
        });
    }

});
