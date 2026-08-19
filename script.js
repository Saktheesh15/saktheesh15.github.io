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
        "Data Engineer",
        "ETL & Big Data Pipeline Specialist",
        "Cloud Data Architect (AWS / GCP / Azure)",
        "PySpark & Apache Airflow Specialist",
        "SQL & Data Lake Engineer"
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
   6. METRIC COUNTER ANIMATION
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
   7. INTERACTIVE DATA CLI SIMULATOR
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
        inputLine.innerHTML = `<span class="prompt-user">saktheesh@data-lake:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
        termBody.appendChild(inputLine);

        // Command Responses
        let responseHtml = "";

        switch (cmd) {
            case "help":
                responseHtml = `
<div class="cmd-output output-info">Available Commands:</div>
- <span class="highlight-cmd">skills</span>     : View primary Data Engineering technical stack
- <span class="highlight-cmd">projects</span>   : Display featured data pipeline projects & repositories
- <span class="highlight-cmd">airflow</span>    : Check Apache Airflow DAG scheduling status
- <span class="highlight-cmd">pyspark</span>    : Run PySpark ETL transformation simulation
- <span class="highlight-cmd">sql</span>        : Show sample analytical window query
- <span class="highlight-cmd">aws</span>        : List AWS cloud architecture services
- <span class="highlight-cmd">contact</span>    : Print Saktheesh's contact & social links
- <span class="highlight-cmd">clear</span>      : Clear CLI terminal screen
`;
                break;

            case "skills":
                responseHtml = `
<div class="cmd-output output-success">
[DATA ENGINEERING TECH STACK]
------------------------------------------------
• Pipelines & Workflow : PySpark, Apache Airflow, ETL/ELT, Cron
• Cloud Infrastructure : AWS (S3, Glue, Athena, Redshift, Lambda), GCP, Azure
• Databases & Querying : SQL (Window Functions, CTEs), MySQL, PostgreSQL, MongoDB
• Scripting & Tools    : Python, Linux Bash, SSH, Git, GitHub Actions
• Analytics & Viz      : Power BI, AWS QuickSight, Matplotlib, Seaborn, Pandas
</div>`;
                break;

            case "projects":
                responseHtml = `
<div class="cmd-output output-info">
[FEATURED DATA ENGINEERING REPOSITORIES]
------------------------------------------------
1. Data Engineering YouTube Analysis (AWS S3, Glue, PySpark, Athena)
   Repo: github.com/Saktheesh15/Data-Engineering-youtube-analysis-project

2. Spotify Data Analytics & Insights (Python, Spotify API, Pandas, EDA)
   Repo: github.com/Saktheesh15/spotify_data_analytics

3. AI Placement Training & Analytics Platform (Next.js, TypeScript, Analytics)
   Repo: github.com/Saktheesh15/AI_Placement_Training_Support
</div>`;
                break;

            case "airflow":
                responseHtml = `
<div class="cmd-output output-success">
[AIRFLOW DAG SCHEDULER STATUS]
------------------------------------------------
DAG ID                  STATUS     LAST RUN             NEXT RUN
youtube_etl_pipeline    SUCCESS    2026-08-19 23:00     2026-08-20 00:00
spotify_analytics_dag   SUCCESS    2026-08-19 18:30     2026-08-20 06:30
db_sync_cron_job        SUCCESS    2026-08-19 23:30     2026-08-19 23:45

Total DAGs Active: 3 | Task Retries: 0 | Pipeline Health: 100%
</div>`;
                break;

            case "pyspark":
                responseHtml = `
<div class="cmd-output output-warning">
[EXECUTING PYSPARK SPARK-SUBMIT]
------------------------------------------------
26/08/19 23:40:12 INFO SparkContext: Running Spark version 3.4.1
26/08/19 23:40:13 INFO TaskSetManager: Starting task 0.0 in stage 0.0
26/08/19 23:40:14 INFO Executor: Finished task 0.0 -> Cleaned & Normalized 500,000 JSON records.
26/08/19 23:40:15 INFO DataLakeWriter: PartitioningParquet by region='US', category_id
SUCCESS: Written transformed dataset to s3://saktheesh-youtube-analytics-clean/
</div>`;
                break;

            case "sql":
                responseHtml = `
<div class="cmd-output output-info">
[SAMPLE ANALYTICAL WINDOW SQL QUERY]
------------------------------------------------
SELECT 
    category_id,
    video_id,
    views,
    RANK() OVER (PARTITION BY category_id ORDER BY views DESC) as rank_in_category,
    AVG(views) OVER (PARTITION BY category_id) as avg_category_views
FROM youtube_analytics_athena_db
WHERE trending_date >= '2026-01-01';
</div>`;
                break;

            case "aws":
                responseHtml = `
<div class="cmd-output output-success">
[AWS CLOUD ARCHITECTURE SETUP]
------------------------------------------------
• AWS S3     : Data Lake raw and cleaned zone buckets
• AWS Glue   : Crawlers, Schema Data Catalog & PySpark ETL
• AWS Athena : Serverless SQL queries on S3 Parquet datasets
• AWS Lambda : Event-driven S3 file trigger automation
• AWS IAM    : Strict Role & Security Access Policies
</div>`;
                break;

            case "contact":
                responseHtml = `
<div class="cmd-output output-info">
[CONTACT INFORMATION]
------------------------------------------------
• Email    : saktheeshanbzhagan@gmail.com
• Phone    : +91 9566467921
• Location : Chennai, Tamil Nadu, India
• LinkedIn : linkedin.com/in/saktheesh-a-
• GitHub   : github.com/Saktheesh15
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
   9. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");

    if (!form || !statusDiv) return;

    form.addEventListener("submit", (e) => {
        statusDiv.innerHTML = '<span class="text-cyan"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';
        // Allow default formspree submission or handle via JS
    });
}
