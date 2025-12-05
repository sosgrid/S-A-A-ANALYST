gsap.registerPlugin(ScrollTrigger);

// --- 1. Global Chart Defaults (Dark Theme) ---
Chart.defaults.color = '#8892b0';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

// --- 2. Hero Animations ---
const tl = gsap.timeline();

tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
  .from('.animate-text', { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
  .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
  .from('.cta-group', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
  .from('.image-wrapper', { x: 50, opacity: 0, duration: 1, ease: 'power2.out' }, "-=0.8");

// Counter Animation
gsap.utils.toArray('.counter').forEach(counter => {
  const target = +counter.getAttribute('data-target');
  
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.out'
      });
    }
  });
});

// --- 3. Chart Initialization Logic ---

// Helper: Create Gradient
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// A. Skills Radar Chart
const initSkillsChart = () => {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Python', 'SQL', 'Data Viz', 'Machine Learning', 'Strategy', 'ETL'],
            datasets: [{
                label: 'Proficiency Level',
                data: [95, 90, 95, 80, 85, 90],
                backgroundColor: 'rgba(0, 242, 255, 0.2)',
                borderColor: '#00f2ff',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#00f2ff',
                pointHoverBackgroundColor: '#7000ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    pointLabels: { color: '#e6f1ff', font: { size: 12, family: 'Outfit' } },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: { legend: { display: false } },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
};

// B. Project 1: Churn Reduction (Line Chart)
const initChurnChart = () => {
    const ctx = document.getElementById('churnChart').getContext('2d');
    const gradientFill = createGradient(ctx, 'rgba(0, 255, 157, 0.4)', 'rgba(0, 255, 157, 0.0)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
            datasets: [{
                label: 'Churn Rate (%) with Model',
                data: [15, 14, 12, 8, 5, 3], // Downward trend
                borderColor: '#00ff9d',
                backgroundColor: gradientFill,
                fill: true,
                tension: 0.4
            }, {
                label: 'Projected without Model',
                data: [15, 15.5, 16, 15.8, 16.2, 16.5], // Flat/Up trend
                borderColor: '#8892b0',
                borderDash: [5, 5],
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#e6f1ff' } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
};

// C. Project 2: Sales/Inventory (Bar Chart)
const initSalesChart = () => {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Wasted Budget ($)',
                data: [20000, 15000, 8000, 5000],
                backgroundColor: '#bd00ff',
                borderRadius: 4
            }, {
                label: 'Efficiency Gains ($)',
                data: [5000, 12000, 25000, 40000],
                backgroundColor: '#00f2ff',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
};


// D. Project 3: Marketing ROI (Doughnut)
const initMarketingChart = () => {
    const ctx = document.getElementById('marketingChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['SEO (High ROI)', 'PPC (Med ROI)', 'Social (Low ROI)'],
            datasets: [{
                data: [55, 30, 15],
                backgroundColor: ['#00ff9d', '#00f2ff', '#7000ff'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { 
                legend: { position: 'bottom', labels: { color: '#e6f1ff' } } 
            }
        }
    });
};

// --- 4. Intersection Observer for Lazy Loading Charts ---
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const canvasId = entry.target.id;
            if (canvasId === 'skillsChart') initSkillsChart();
            if (canvasId === 'churnChart') initChurnChart();
            if (canvasId === 'salesChart') initSalesChart();
            if (canvasId === 'marketingChart') initMarketingChart();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('canvas').forEach(c => chartObserver.observe(c));

// --- 5. Staggered Mobile Menu Animation ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    const icon = menuToggle.querySelector('i');
    
    if (isMenuOpen) {
        // Open Menu
        navLinks.classList.add('active');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        
        // GSAP Stagger Animation
        gsap.to(navItems, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
        });
        
    } else {
        // Close Menu
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        
        // Animate Out
        gsap.to(navItems, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in',
            onComplete: () => navLinks.classList.remove('active')
        });
    }
});
