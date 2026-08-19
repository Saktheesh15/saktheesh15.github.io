/* ==========================================================================
   Saktheesh - Data Engineer Portfolio Interactive Logic (US / EU Style)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    initSkillFilters();
    initProjectFilters();
    initCounterAnimation();
    initResumeModal();
    initContactForm();
    initCopyEmail();
});

/* --------------------------------------------------------------------------
   1. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterEl = document.getElementById("typewriter");
    if (!typewriterEl) return;

    const phrases = [
        "Microsoft Certified Azure Data Engineer",
        "Databricks Unity Catalog & Delta Lake Architect",
        "ETL & Cloud Data Pipeline Specialist (AWS / Azure)",
        "PySpark & Apache Airflow Specialist",
        "On-Premises to Cloud Migration Engineer"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 35;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 85;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. NAVBAR SCROLL SPY & STICKY STATE
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });
}

/* --------------------------------------------------------------------------
   4. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === "dark" 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

/* --------------------------------------------------------------------------
   5. SKILL SEARCH & CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initSkillFilters() {
    const searchInput = document.getElementById("skill-search");
    const tabs = document.querySelectorAll(".skill-tab");
    const skillCards = document.querySelectorAll(".skill-card");

    if (!searchInput || !skillCards.length) return;

    searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase().trim();
        
        skillCards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(term)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const cat = tab.getAttribute("data-category");
            searchInput.value = "";

            skillCards.forEach((card) => {
                const cardCat = card.getAttribute("data-category");
                if (cat === "all" || cardCat === cat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. PROJECT CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const ptabs = document.querySelectorAll(".project-tab");
    const pcards = document.querySelectorAll("#projects-container .project-card");

    if (!ptabs.length || !pcards.length) return;

    ptabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            ptabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const cat = tab.getAttribute("data-pcat");

            pcards.forEach((card) => {
                const cardCat = card.getAttribute("data-pcat");
                if (cat === "all" || cardCat === cat) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   7. METRIC COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    let animated = false;

    window.addEventListener("scroll", () => {
        const banner = document.querySelector(".metrics-banner");
        if (!banner || animated) return;

        const bannerTop = banner.getBoundingClientRect().top;
        if (bannerTop < window.innerHeight - 100) {
            animated = true;
            counters.forEach((counter) => {
                const target = +counter.getAttribute("data-target");
                const speed = 40;
                let count = 0;

                const updateCount = () => {
                    const inc = Math.ceil(target / speed);
                    if (count < target) {
                        count += inc;
                        if (count > target) count = target;
                        counter.innerText = count;
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        }
    });
}

/* --------------------------------------------------------------------------
   8. CV RESUME MODAL HANDLER
   -------------------------------------------------------------------------- */
function initResumeModal() {
    const modal = document.getElementById("cv-modal");
    const triggerBtn = document.getElementById("cv-modal-trigger");
    const heroBtn = document.getElementById("hero-resume-btn");
    const closeBtn = document.getElementById("close-modal-btn");

    if (!modal) return;

    const openModal = () => modal.classList.add("active");
    const closeModal = () => modal.classList.remove("active");

    if (triggerBtn) triggerBtn.addEventListener("click", openModal);
    if (heroBtn) heroBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

/* --------------------------------------------------------------------------
   9. DIRECT EMAIL FORM SUBMISSION HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const mailtoSubject = encodeURIComponent(subject || `Inquiry from ${name}`);
        const mailtoBody = encodeURIComponent(`Hi Saktheesh,\n\n${message}\n\nFrom: ${name} (${email})`);

        // Open native email app cleanly
        window.location.href = `mailto:saktheeshanbzhagan@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        if (statusDiv) {
            statusDiv.innerHTML = '<span class="text-cyan"><i class="fas fa-check-circle"></i> Opening your email application to send directly to saktheeshanbzhagan@gmail.com!</span>';
        }
        showToast("Email application opened! Click send to deliver message.");
    });
}

/* --------------------------------------------------------------------------
   10. COPY EMAIL TO CLIPBOARD
   -------------------------------------------------------------------------- */
function initCopyEmail() {
    const copyBtn = document.getElementById("copy-email-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("saktheeshanbzhagan@gmail.com").then(() => {
            showToast("Copied email address: saktheeshanbzhagan@gmail.com");
        }).catch(() => {
            showToast("Email: saktheeshanbzhagan@gmail.com");
        });
    });
}

/* --------------------------------------------------------------------------
   11. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `<i class="fas fa-info-circle text-cyan"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
