/* =====================================================
   ABHIJEET TIWARI PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const header = document.getElementById("header");
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const themeToggle = document.getElementById("themeToggle");
    const typingText = document.getElementById("typingText");
    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    const currentYear = document.getElementById("currentYear");


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        /* Close menu after clicking navigation link */

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* =================================================
       THEME TOGGLE
    ================================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isLight =
            document.documentElement.getAttribute(
                "data-theme"
            ) === "light";


        icon.classList.toggle(
            "fa-sun",
            isLight
        );

        icon.classList.toggle(
            "fa-moon",
            !isLight
        );

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isLight =
                document.documentElement.getAttribute(
                    "data-theme"
                ) === "light";


            if (isLight) {

                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            }


            updateThemeIcon();

        });

    }


    /* =================================================
       TYPING EFFECT
    ================================================= */

    if (typingText) {

        const words = [

            "Electrical Panel Board Design",

            "Mechanical Design Engineer",

            "Panel Enclosure Design",

            "Engineering Drawings",

            "Manufacturing Support",

            "Software Engineering"

        ];


        let wordIndex = 0;

        let charIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            /* Typing */

            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );


                charIndex++;


                /* Finished typing */

                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1700
                    );

                    return;

                }

            }


            /* Deleting */

            else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );


                charIndex--;


                /* Finished deleting */

                if (charIndex === 0) {

                    deleting = false;


                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 45 : 85
            );

        }


        typeEffect();

    }


    /* =================================================
       SCROLL REVEAL ANIMATION
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNav() {

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =================================================
       CONTACT FORM
    ================================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();


                const subject =
                    document.getElementById(
                        "subject"
                    )?.value.trim();


                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                /* Validation */

                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    if (formNote) {

                        formNote.textContent =
                            "Please fill in all fields.";

                        formNote.style.color =
                            "#ff6b6b";

                    }

                    return;

                }


                /* Email subject */

                const emailSubject =
                    encodeURIComponent(
                        subject
                    );


                /* Email body */

                const emailBody =
                    encodeURIComponent(
                        `Hello Abhijeet,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
                    );


                /* Mailto URL */

                const mailto =
                    `mailto:abhijeettiwari955@gmail.com?subject=${emailSubject}&body=${emailBody}`;


                if (formNote) {

                    formNote.textContent =
                        "Opening your email application...";

                    formNote.style.color =
                        "#25e87a";

                }


                window.location.href =
                    mailto;

            }
        );

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


            }
        );

    });


    /* =================================================
       PROFILE IMAGE ERROR HANDLING
    ================================================= */

    const profileImage =
        document.querySelector(
            ".profile-image img"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";


                const parent =
                    profileImage.parentElement;


                if (parent) {

                    parent.style.display =
                        "grid";


                    parent.style.placeItems =
                        "center";


                    parent.innerHTML = `
                        <i
                            class="fas fa-user"
                            style="
                                font-size:80px;
                                color:#00d9ff;
                                opacity:.7;
                            ">
                        </i>
                    `;

                }

            }
        );

    }


    /* =================================================
       ESC KEY - CLOSE MOBILE MENU
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove(
                    "open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =================================================
       CLOSE MOBILE MENU ON RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =================================================
       BUTTON RIPPLE EFFECT
    ================================================= */

    document.querySelectorAll(
        ".btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;


                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                this.appendChild(
                    ripple
                );


                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    600
                );

            }
        );

    });


    /* =================================================
       PAGE READY
    ================================================= */

    setTimeout(() => {

        document.body.classList.add(
            "page-ready"
        );

    }, 100);


});
