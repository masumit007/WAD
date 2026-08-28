// =========================================
// SUMIT MAHATO — PREMIUM INTERACTIONS
// Monochromatic / Interactive / Minimal
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       SCROLL PROGRESS BAR
    ===================================== */

    const progress = document.createElement("div");

    progress.className = "scroll-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (scrollTop / height) * 100;

        progress.style.width = `${percentage}%`;

    });


    /* =====================================
       CURSOR GLOW
    ===================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (e) => {

        cursorGlow.style.left =
            `${e.clientX}px`;

        cursorGlow.style.top =
            `${e.clientY}px`;

    });


    /* =====================================
       CURSOR DOT
    ===================================== */

    const cursor =
        document.createElement("div");

    cursor.className = "cursor-dot";

    document.body.appendChild(cursor);

    document.addEventListener("mousemove", e => {

        cursor.style.left =
            `${e.clientX}px`;

        cursor.style.top =
            `${e.clientY}px`;

    });


    /* =====================================
       MAGNETIC BUTTONS
    ===================================== */

    const magneticElements =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .contact-button, .nav-button"
        );

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", e => {

            const rect =
                element.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px,
                           ${y * 0.12}px)`;

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "translate(0,0)";

        });

    });


    /* =====================================
       PROJECT CARD 3D TILT + SPOTLIGHT
    ===================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                centerY) * -3;

            const rotateY =
                ((x - centerX) /
                centerX) * 3;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px)
                 rotateX(0)
                 rotateY(0)
                 translateY(0)";

        });

    });


    /* =====================================
       SKILL CARD INTERACTION
    ===================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            card.style.setProperty(
                "--mouse-x",
                `${e.clientX - rect.left}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${e.clientY - rect.top}px`
            );

        });

    });


    /* =====================================
       FLOATING CARDS PARALLAX
    ===================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-card"
        );

    document.addEventListener("mousemove", e => {

        const x =
            (e.clientX /
            window.innerWidth - 0.5);

        const y =
            (e.clientY /
            window.innerHeight - 0.5);

        floatingCards.forEach((card, index) => {

            const strength =
                (index + 1) * 8;

            card.style.transform =
                `translate(
                    ${x * strength}px,
                    ${y * strength}px
                )`;

        });

    });


    /* =====================================
       ORB PARALLAX
    ===================================== */

    const orb =
        document.querySelector(".orb");

    document.addEventListener("mousemove", e => {

        if (!orb) return;

        const x =
            (e.clientX /
            window.innerWidth - 0.5);

        const y =
            (e.clientY /
            window.innerHeight - 0.5);

        orb.style.transform =
            `translate(
                ${x * -12}px,
                ${y * -12}px
            )`;

    });


    /* =====================================
       NAVBAR EFFECT
    ===================================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                "#" + entry.target.id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

    sections.forEach(section => {

        navObserver.observe(section);

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".skill-card, " +
            ".project-card, " +
            ".timeline-item, " +
            ".education-card, " +
            ".about-grid"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
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

        element.classList.add(
            "reveal-element"
        );

        revealObserver.observe(element);

    });


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                e => {

                    const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );

                    if (!target) return;

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================
       HOVER SOUND-LIKE VISUAL RESPONSE
       (NO ACTUAL SOUND)
    ===================================== */

    const interactive =
        document.querySelectorAll(
            "a, .project-card, .skill-card"
        );

    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorGlow.classList.add(
                    "cursor-active"
                );

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                cursorGlow.classList.remove(
                    "cursor-active"
                );

            }
        );

    });

});