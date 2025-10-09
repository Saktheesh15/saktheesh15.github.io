// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced scroll animations with stagger effect
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add stagger delay for multiple elements
      setTimeout(() => {
        entry.target.classList.add("animated")
      }, index * 100)
    }
  })
}, observerOptions)

// Add active class to current navigation item based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// CV Modal functionality with improved error handling
const viewCvBtn = document.getElementById("view-cv-btn")
const cvModal = document.getElementById("cv-modal")
const closeBtn = document.querySelector(".close")
const downloadCvBtn = document.getElementById("download-cv-btn")
const downloadDataCvBtn = document.getElementById("download-data-cv-btn")
const retryCvBtn = document.getElementById("retry-cv-btn")
const cvIframe = document.getElementById("cv-iframe")
const cvEmbed = document.getElementById("cv-embed")
const cvLoading = document.getElementById("cv-loading")
const cvFallback = document.getElementById("cv-fallback")
const cvEmbedFallback = document.getElementById("cv-embed-fallback")

const SOFTWARE_CV_PATH = "assets/Saktheesh_Software_developer_Resume.pdf"
const DATA_CV_PATH = "assets/Saktheesh_Data_Engineer_Resume.pdf"

// Function to show loading state
function showLoading() {
  cvLoading.style.display = "flex"
  cvIframe.style.display = "none"
  cvFallback.style.display = "none"
  cvEmbedFallback.style.display = "none"
}

// Function to show iframe
function showIframe() {
  cvLoading.style.display = "none"
  cvIframe.style.display = "block"
  cvFallback.style.display = "none"
  cvEmbedFallback.style.display = "none"
}

// Function to show embed fallback
function showEmbed() {
  cvLoading.style.display = "none"
  cvIframe.style.display = "none"
  cvFallback.style.display = "none"
  cvEmbedFallback.style.display = "block"
}

// Function to show final fallback
function showFallback() {
  cvLoading.style.display = "none"
  cvIframe.style.display = "none"
  cvFallback.style.display = "flex"
  cvEmbedFallback.style.display = "none"
}

// Function to load CV with multiple fallback methods
function loadCV(cvPath) {
  showLoading()

  // Method 1: Try iframe first
  cvIframe.onload = () => {
    setTimeout(() => {
      showIframe()
    }, 500)
  }

  cvIframe.onerror = () => {
    console.log("Iframe failed, trying embed...")
    tryEmbedMethod(cvPath)
  }

  // Set iframe source
  cvIframe.src = cvPath + "?v=" + Date.now() // Add cache buster

  // Timeout fallback
  setTimeout(() => {
    if (cvLoading.style.display !== "none") {
      console.log("Iframe timeout, trying embed...")
      tryEmbedMethod(cvPath)
    }
  }, 3000)
}

// Method 2: Try embed element
function tryEmbedMethod(cvPath) {
  showEmbed()
  cvEmbed.src = cvPath + "?v=" + Date.now()

  // Check if embed loaded
  setTimeout(() => {
    try {
      if (!cvEmbed.contentDocument && !cvEmbed.contentWindow) {
        console.log("Embed failed, showing fallback...")
        showFallback()
      }
    } catch (e) {
      console.log("Embed failed, showing fallback...")
      showFallback()
    }
  }, 2000)
}

// View CV button click
viewCvBtn.addEventListener("click", () => {
  cvModal.style.display = "block"
  document.body.style.overflow = "hidden"
  loadCV(SOFTWARE_CV_PATH)
})

// Retry button
retryCvBtn.addEventListener("click", () => {
  loadCV(SOFTWARE_CV_PATH)
})

// Close modal
closeBtn.addEventListener("click", () => {
  cvModal.style.display = "none"
  document.body.style.overflow = "auto"
  // Reset iframe to prevent auto-loading
  cvIframe.src = ""
  cvEmbed.src = ""
})

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cvModal) {
    cvModal.style.display = "none"
    document.body.style.overflow = "auto"
    // Reset iframe to prevent auto-loading
    cvIframe.src = ""
    cvEmbed.src = ""
  }
})

// Download Software Developer CV functionality
downloadCvBtn.addEventListener("click", () => {
  const link = document.createElement("a")
  link.href = SOFTWARE_CV_PATH
  link.download = "Saktheesh_Software_Developer_Resume.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})

// Download Data Engineer CV functionality
downloadDataCvBtn.addEventListener("click", () => {
  const link = document.createElement("a")
  link.href = DATA_CV_PATH
  link.download = "Saktheesh_Data_Engineer_Resume.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
})

// Contact form handling
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Enhanced typing animation for hero title
function typeWriter(element, text, speed = 50) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      if (text.charAt(i) === "<") {
        // Handle HTML tags
        const tagEnd = text.indexOf(">", i)
        element.innerHTML += text.substring(i, tagEnd + 1)
        i = tagEnd + 1
      } else {
        element.innerHTML += text.charAt(i)
        i++
      }
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Add animate-on-scroll class to various elements
  const elementsToAnimate = [
    ".about-text",
    ".about-stats .stat",
    ".timeline-item",
    ".skill-category",
    ".project-card",
    ".contact-info",
    ".contact-form",
  ]

  elementsToAnimate.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add("animate-on-scroll")
      el.style.animationDelay = `${index * 0.1}s`
    })
  })

  // Re-observe new elements
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })

  // Initialize typing animation
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 30)
    }, 500)
  }
})

// Parallax effect for hero section (subtle)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Enhanced hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Skills animation on scroll with stagger
const skillItems = document.querySelectorAll(".skill-item")

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillCategory = entry.target
        const skills = skillCategory.querySelectorAll(".skill-item")

        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.opacity = "1"
            skill.style.transform = "translateY(0) scale(1)"
          }, index * 100)
        })
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".skill-category").forEach((category) => {
  const skills = category.querySelectorAll(".skill-item")
  skills.forEach((skill) => {
    skill.style.opacity = "0"
    skill.style.transform = "translateY(20px) scale(0.8)"
    skill.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
  })
  skillObserver.observe(category)
})

// Timeline animation
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
      }
    })
  },
  { threshold: 0.3 },
)

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  item.style.transitionDelay = `${index * 0.2}s`

  if (index % 2 === 0) {
    item.style.transform = "translateX(-50px)"
  } else {
    item.style.transform = "translateX(50px)"
  }

  timelineObserver.observe(item)
})

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible")
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("section-hidden")
  sectionObserver.observe(section)
})

// Add CSS for section animations
const sectionStyle = document.createElement("style")
sectionStyle.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(sectionStyle)

// Keyboard navigation for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cvModal.style.display === "block") {
    cvModal.style.display = "none"
    document.body.style.overflow = "auto"
    cvIframe.src = ""
    cvEmbed.src = ""
  }
})

// Add focus management for modal
cvModal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    const focusableElements = cvModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }, 10),
)

// Handle image loading errors with fallback
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="assets/"]')

  images.forEach((img) => {
    img.addEventListener("error", function () {
      // If image fails to load, show placeholder
      if (this.closest(".profile-img")) {
        this.src = "/placeholder.svg?height=300&width=300"
      } else if (this.closest(".project-image")) {
        this.src = "/placeholder.svg?height=250&width=400"
      }
    })

    img.addEventListener("load", function () {
      // Image loaded successfully
      this.style.opacity = "1"
    })
  })
})

console.log("Portfolio website loaded successfully! 🚀")
