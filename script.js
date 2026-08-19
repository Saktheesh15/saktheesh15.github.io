/* ==========================================================================
   Saktheesh - Data Engineer Portfolio Interactive Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize All Interactive Modules
    initTypewriter();
    initNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    initSkillFilters();
    initProjectFilters();
    initCounterAnimation();
    initTerminalCLI();
    initResumeModal();
    initContactForm();
});

/* --------------------------------------------------------------------------
   1. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterEl = document.getElementById("typewriter");
    if (!typewriterEl) return;

    const phrases = [
        "Microsoft Certified Data Engineer",
        "Azure Databricks & Delta Lake Specialist",
        "ETL & Cloud Data Architect (AWS / Azure)",
        "PySpark & Apache Airflow Engineer",
        "On-Prem to Cloud Migration Specialist"
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
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 90;
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
        // Sticky class
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Scroll spy
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

    // Search filter
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

    // Category tabs filter
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const cat = tab.getAttribute("data-category");
            searchInput.value = ""; // clear search on tab change

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
   8. INTERACTIVE DATA CLI SIMULATOR
   -------------------------------------------------------------------------- */
function initTerminalCLI() {
    const termBody = document.getElementById("terminal-body");
    const termInput = document.getElementById("terminal-input");
    const quickCmdBtns = document.querySelectorAll(".cli-cmd-btn");

    if (!termInput || !termBody) return;

    // Quick Command Buttons
    quickCmdBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cmd = btn.getAttribute("data-cmd");
            termInput.value = cmd;
            executeCommand(cmd);
            termInput.value = "";
        });
    });

    // Enter Key
    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = termInput.value.trim();
            if (cmd) {
                executeCommand(cmd);
                termInput.value = "";
            }
        }
    });

    function executeCommand(rawCmd) {
        const cmd = rawCmd.toLowerCase().trim();

        // Print input line
        const inputLine = document.createElement("div");
        inputLine.className = "terminal-line";
        inputLine.innerHTML = `<span class="prompt-user">saktheesh@databricks:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
        termBody.appendChild(inputLine);

        // Command Responses
        let responseHtml = "";

        switch (cmd) {
            case "help":
                responseHtml = `
<div class="cmd-output output-info">Available Commands:</div>
- <span class="highlight-cmd">certs</span>       : Display Microsoft Azure Databricks & Oracle Certifications
- <span class="highlight-cmd">projects</span>    : List GitHub data pipeline repositories
- <span class="highlight-cmd">freelance</span>   : View client cloud migration & restaurant analytics projects
- <span class="highlight-cmd">databricks</span>  : Run Medallion Delta Lake pipeline simulation
- <span class="highlight-cmd">socials</span>     : Display LinkedIn, GitHub, LeetCode, and Topmate links
- <span class="highlight-cmd">contact</span>     : Show Saktheesh's phone, email, and location
- <span class="highlight-cmd">clear</span>       : Clear CLI terminal screen
`;
                break;

            case "certs":
                responseHtml = `
<div class="cmd-output output-success">
[VERIFIED INDUSTRY CERTIFICATIONS]
------------------------------------------------
1. Microsoft Certified: Azure Databricks Data Engineer Associate
   ID: A33FDCA4239653AF | Earned: July 2026

2. Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate
   ID: 323432310OCI25AICFA | Valid until: Oct 2027

3. IBM SkillsBuild: SQL and Relational Databases 101
   ID: DBO101EN | Issued: July 2025

4. Besant Technologies: AI & Machine Learning Program
   ID: BFT415B042 | Issued: Oct 2025

5. Infosys Foundation: Python Web Developer (Grade A+)
   ID: G-2025-G4352-0018 | Issued: March 2025
</div>`;
                break;

            case "projects":
                responseHtml = `
<div class="cmd-output output-info">
[DATA ENGINEERING REPOSITORIES & ONGOING WORK]
------------------------------------------------
1. Databricks FMCG Data Pipeline (Azure Databricks, Delta Lake, PySpark)
   github.com/Saktheesh15/databricks-fmcg-data-pipeline.git

2. YouTube Cloud Analytics (AWS S3, Glue, PySpark, Athena)
   github.com/Saktheesh15/Data-Engineering-youtube-analysis-project.git

3. Spotify Data Analytics (Python, Spotify API, Pandas, EDA)
   github.com/Saktheesh15/spotify_data_analytics.git

4. [LIVE] Uber Real-Time Telemetry (Spark Streaming, Kafka, Azure)
5. [LIVE] Zomato AI Analytics (PySpark, AI Models, Power BI)
</div>`;
                break;

            case "freelance":
                responseHtml = `
<div class="cmd-output output-success">
[FREELANCE CLIENT ENGAGEMENTS]
------------------------------------------------
• On-Premises to Cloud Database Migration:
  Architected seamless migration of legacy SQL tables to AWS S3 & Azure Blob data lakes.

• Restaurant & Food Chain Sales Data Pipeline:
  Automated POS sales ingestion, SQL revenue modeling, and Power BI dashboards.
</div>`;
                break;

            case "databricks":
                responseHtml = `
<div class="cmd-output output-warning">
[AZURE DATABRICKS DELTA LAKE PIPELINE EXECUTION]
------------------------------------------------
26/08/19 23:55:01 INFO DeltaLog: Initializing Delta Lake log for table 'bronze_fmcg_sales'
26/08/19 23:55:02 INFO PySparkJob: Cleaning schema & deduplicating records -> silver_fmcg_sales
26/08/19 23:55:04 INFO GoldLayerAggregator: Computing monthly store revenue & inventory turnover
SUCCESS: Delta table 'gold_fmcg_analytics' updated (COMPACTION DONE).
</div>`;
                break;

            case "socials":
            case "contact":
                responseHtml = `
<div class="cmd-output output-info">
[CONNECT & REACH OUT TO SAKTHEESH]
------------------------------------------------
• Email    : saktheeshanbzhagan@gmail.com
• Phone    : +91 9566467921
• GitHub   : github.com/Saktheesh15
• LinkedIn : linkedin.com/in/saktheesh-a-
• LeetCode : (Connect on LeetCode)
• Topmate  : (Book a 1-on-1 session on Topmate)
• Location : Chennai, Tamil Nadu, India
</div>`;
                break;

            case "clear":
                termBody.innerHTML = "";
                return;

            default:
                responseHtml = `
<div class="cmd-output output-warning">
Command not recognized: '${escapeHtml(cmd)}'. Type <span class="highlight-cmd">'help'</span> for list of commands.
</div>`;
                break;
        }

        const responseLine = document.createElement("div");
        responseLine.className = "terminal-line";
        responseLine.innerHTML = responseHtml;
        termBody.appendChild(responseLine);

        // Auto Scroll to bottom
        termBody.scrollTop = termBody.scrollHeight;
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
        })[m]);
    }
}

/* --------------------------------------------------------------------------
   9. CV RESUME MODAL HANDLER
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
   10. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");

    if (!form || !statusDiv) return;

    form.addEventListener("submit", (e) => {
        statusDiv.innerHTML = '<span class="text-cyan"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';
    });
}
