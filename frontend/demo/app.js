// Sample data (in production, this would come from your backend)
const sampleAlerts = [
    {
        id: 1,
        type: 'safety',
        title: 'Metro 3 Bus Services Reduced',
        message: 'Metro 3 last-mile bus plan hits a speed bump as services halved after failing to attract enough riders',
        priority: 'high',
        priority_score: 10,
        source: 'news',
        location: 'Mumbai',
        timestamp: '2026-03-15T19:54:33'
    },
    {
        id: 2,
        type: 'safety',
        title: 'Traffic Alert: Ghodbunder Road',
        message: 'Traffic-choked Ghodbunder Road stretch handed over to Thane civic body for maintenance',
        priority: 'high',
        priority_score: 10,
        source: 'news',
        location: 'Mumbai',
        timestamp: '2026-03-15T19:54:33'
    },
    {
        id: 3,
        type: 'community',
        title: 'LPG Shortage Discussion',
        message: 'Shortage of LPG cooking gas engulfs Mumbai - 251 upvotes, 38 comments',
        priority: 'medium',
        priority_score: 8,
        source: 'social',
        location: 'Mumbai',
        timestamp: '2026-03-09T23:12:03'
    },
    {
        id: 4,
        type: 'development',
        title: 'New Development: GREEN CITY 3',
        message: 'A real estate project named GREEN CITY 3 by an unknown promoter has been registered in Nagpur, Mumbai',
        priority: 'medium',
        priority_score: 6,
        source: 'permit',
        location: 'Nagpur, Mumbai',
        timestamp: '2026-03-11T21:36:54'
    },
    {
        id: 5,
        type: 'business',
        title: 'New Commercial Activity',
        message: 'LAKEPLACE MAFIA AND THE OLD LADY GANG GANG TIP#19 TOPOLO RESTAURANT',
        priority: 'low',
        priority_score: 5,
        source: 'permit',
        location: 'Mumbai',
        timestamp: '2026-03-11T21:36:59'
    }
];

const sampleTopics = [
    { topic: 'Metro Development', score: 95, posts: 45 },
    { topic: 'LPG Shortage', score: 88, posts: 38 },
    { topic: 'Road Infrastructure', score: 82, posts: 32 },
    { topic: 'Real Estate Projects', score: 75, posts: 28 },
    { topic: 'Community Events', score: 68, posts: 22 }
];

const sampleInvestments = [
    { neighborhood: 'Andheri West', score: 92, trend: 'up' },
    { neighborhood: 'Bandra', score: 88, trend: 'up' },
    { neighborhood: 'Thane', score: 85, trend: 'stable' },
    { neighborhood: 'Nagpur', score: 78, trend: 'up' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initVoiceAnimation();
    loadAlerts();
    loadInsights();
    setupEventListeners();
    setupNavigation();
});

// Hero 3D Animation with Three.js
function initHeroAnimation() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create connecting lines
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3
    });
    
    camera.position.z = 3;
    
    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        
        // Follow mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Voice AI Animation
function initVoiceAnimation() {
    const canvas = document.getElementById('voiceCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.fill();
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
}

// Load and display alerts
function loadAlerts(filter = 'all') {
    const alertsContent = document.getElementById('alertsContent');
    if (!alertsContent) return;
    
    const filteredAlerts = filter === 'all' 
        ? sampleAlerts 
        : sampleAlerts.filter(alert => alert.type === filter);
    
    alertsContent.innerHTML = filteredAlerts.map(alert => `
        <div class="alert-item priority-${alert.priority}" data-aos="fade-up">
            <div class="alert-header">
                <div>
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                </div>
                <div class="alert-priority">${alert.priority_score}/10</div>
            </div>
            <div class="alert-footer">
                <div class="alert-source">
                    <i class="fas fa-${getSourceIcon(alert.source)}"></i>
                    <span>${alert.source}</span>
                </div>
                <div class="alert-time">${formatTime(alert.timestamp)}</div>
            </div>
        </div>
    `).join('');
}

// Load insights
function loadInsights() {
    // Load trending topics
    const trendingTopics = document.getElementById('trendingTopics');
    if (trendingTopics) {
        trendingTopics.innerHTML = sampleTopics.map(topic => `
            <div class="topic-item">
                <div>
                    <div class="topic-name">${topic.topic}</div>
                    <div style="color: var(--gray); font-size: 0.875rem;">${topic.posts} posts</div>
                </div>
                <div class="topic-score">${topic.score}</div>
            </div>
        `).join('');
    }
    
    // Load investment hotspots
    const investmentHotspots = document.getElementById('investmentHotspots');
    if (investmentHotspots) {
        investmentHotspots.innerHTML = sampleInvestments.map(inv => `
            <div class="topic-item">
                <div>
                    <div class="topic-name">${inv.neighborhood}</div>
                    <div style="color: var(--gray); font-size: 0.875rem;">
                        <i class="fas fa-arrow-${inv.trend === 'up' ? 'up' : 'right'}" style="color: ${inv.trend === 'up' ? 'var(--success)' : 'var(--warning)'}"></i>
                        ${inv.trend}
                    </div>
                </div>
                <div class="topic-score">${inv.score}</div>
            </div>
        `).join('');
    }
    
    // Create cluster visualization
    createClusterViz();
}

// Create cluster visualization
function createClusterViz() {
    const clusterViz = document.getElementById('clusterViz');
    if (!clusterViz) return;
    
    const clusters = [
        { name: 'Infrastructure', size: 45, color: '#6366f1' },
        { name: 'Safety', size: 38, color: '#ef4444' },
        { name: 'Development', size: 32, color: '#10b981' },
        { name: 'Community', size: 28, color: '#f59e0b' },
        { name: 'Business', size: 22, color: '#8b5cf6' }
    ];
    
    clusterViz.innerHTML = `
        <svg width="100%" height="400" viewBox="0 0 600 400">
            ${clusters.map((cluster, i) => {
                const angle = (i / clusters.length) * Math.PI * 2;
                const radius = 120;
                const x = 300 + Math.cos(angle) * radius;
                const y = 200 + Math.sin(angle) * radius;
                const size = cluster.size;
                
                return `
                    <g class="cluster-node" style="cursor: pointer;">
                        <circle cx="${x}" cy="${y}" r="${size}" fill="${cluster.color}" opacity="0.3">
                            <animate attributeName="r" values="${size};${size + 5};${size}" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="${x}" cy="${y}" r="${size * 0.7}" fill="${cluster.color}" opacity="0.6"/>
                        <text x="${x}" y="${y}" text-anchor="middle" dy="0.3em" fill="white" font-size="12" font-weight="600">
                            ${cluster.name}
                        </text>
                        <text x="${x}" y="${y + 20}" text-anchor="middle" fill="white" font-size="10" opacity="0.7">
                            ${cluster.size} posts
                        </text>
                    </g>
                `;
            }).join('')}
            
            ${clusters.map((c1, i) => 
                clusters.slice(i + 1).map((c2, j) => {
                    const angle1 = (i / clusters.length) * Math.PI * 2;
                    const angle2 = ((i + j + 1) / clusters.length) * Math.PI * 2;
                    const radius = 120;
                    const x1 = 300 + Math.cos(angle1) * radius;
                    const y1 = 200 + Math.sin(angle1) * radius;
                    const x2 = 300 + Math.cos(angle2) * radius;
                    const y2 = 200 + Math.sin(angle2) * radius;
                    
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
                }).join('')
            ).join('')}
        </svg>
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Alert filters
    const alertFilters = document.querySelectorAll('.alert-filter');
    alertFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            alertFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            const filterType = filter.dataset.filter;
            loadAlerts(filterType);
        });
    });
    
    // Notification panel
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotifications = document.getElementById('closeNotifications');
    
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', () => {
            notificationPanel.classList.add('active');
            loadNotifications();
        });
    }
    
    if (closeNotifications && notificationPanel) {
        closeNotifications.addEventListener('click', () => {
            notificationPanel.classList.remove('active');
        });
    }
    
    // Voice AI
    const voiceInput = document.getElementById('voiceInput');
    const voiceSubmitBtn = document.getElementById('voiceSubmitBtn');
    const voiceResponse = document.getElementById('voiceResponse');
    
    if (voiceSubmitBtn && voiceInput && voiceResponse) {
        voiceSubmitBtn.addEventListener('click', () => {
            handleVoiceQuery(voiceInput.value);
        });
        
        voiceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleVoiceQuery(voiceInput.value);
            }
        });
    }
    
    // Suggestion chips
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.dataset.question;
            if (voiceInput) voiceInput.value = question;
            handleVoiceQuery(question);
        });
    });
    
    // Voice button in nav
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            scrollToSection('voice');
        });
    }
}

// Handle voice query
function handleVoiceQuery(question) {
    const voiceResponse = document.getElementById('voiceResponse');
    if (!voiceResponse || !question) return;
    
    voiceResponse.classList.add('active');
    voiceResponse.innerHTML = '<div style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> Processing...</div>';
    
    // Simulate API call
    setTimeout(() => {
        const responses = {
            'trending': 'Based on current data, the top trending topics in Mumbai are Metro Development (95 score), LPG Shortage (88 score), and Road Infrastructure (82 score). The Metro 3 project is generating significant discussion with 45 posts.',
            'safety': 'There are currently 2 high-priority safety alerts: Metro 3 bus services have been reduced, and traffic congestion on Ghodbunder Road is being addressed by the Thane civic body.',
            'investment': 'The best neighborhoods for investment right now are Andheri West (score: 92, trending up), Bandra (score: 88, trending up), and Thane (score: 85, stable). These areas show strong development activity.'
        };
        
        let answer = 'I found relevant information about your query. ';
        if (question.toLowerCase().includes('trending') || question.toLowerCase().includes('topic')) {
            answer = responses.trending;
        } else if (question.toLowerCase().includes('safety') || question.toLowerCase().includes('alert')) {
            answer = responses.safety;
        } else if (question.toLowerCase().includes('investment') || question.toLowerCase().includes('neighborhood')) {
            answer = responses.investment;
        } else {
            answer += 'Try asking about trending topics, safety alerts, or investment neighborhoods.';
        }
        
        voiceResponse.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--primary);">
                    <i class="fas fa-robot"></i> CityPulse AI
                </strong>
            </div>
            <div style="line-height: 1.8;">${answer}</div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 1rem;">
                <button onclick="playVoiceResponse()" style="background: var(--primary); border: none; padding: 0.5rem 1rem; border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-volume-up"></i> Play Audio
                </button>
                <span style="color: var(--gray); font-size: 0.875rem; display: flex; align-items: center;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.5rem;"></i>
                    Powered by Nova 2 Lite + Polly
                </span>
            </div>
        `;
    }, 1500);
}

// Play voice response (simulated)
function playVoiceResponse() {
    alert('In production, this would play the MP3 audio generated by Amazon Polly Neural TTS');
}

// Load notifications
function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;
    
    notificationList.innerHTML = sampleAlerts.slice(0, 5).map(alert => `
        <div class="notification-item">
            <div style="display: flex; align-items: start; gap: 1rem;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-${getSourceIcon(alert.source)}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${alert.title}</div>
                    <div style="color: var(--gray); font-size: 0.875rem; margin-bottom: 0.5rem;">${alert.message.substring(0, 80)}...</div>
                    <div style="color: var(--gray); font-size: 0.75rem;">${formatTime(alert.timestamp)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup smooth navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function getSourceIcon(source) {
    const icons = {
        'news': 'newspaper',
        'social': 'comments',
        'permit': 'file-alt',
        'image_analysis': 'camera'
    };
    return icons[source] || 'info-circle';
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .alert-item, .insight-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
