  // Initialisation des animations AOS
        AOS.init({
            duration: 1000,
            once: true
        });
        
        // Configuration de Particles.js
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#e74c3c"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#e74c3c",
                    opacity: 0.6,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
        
        // Graphiques Chart.js
        // Graphique Radar des Compétences
        const skillsRadarCtx = document.getElementById('skillsRadar').getContext('2d');
        new Chart(skillsRadarCtx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Mobile', 'UI/UX', 'DevOps', 'Database'],
                datasets: [{
                    label: 'Compétences',
                    data: [90, 85, 75, 80, 70, 85],
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
        
        // Graphique en Barres des Languages
        const languagesBarCtx = document.getElementById('languagesBar').getContext('2d');
        new Chart(languagesBarCtx, {
            type: 'bar',
            data: {
                labels: ['JavaScript', 'Python', 'Java', 'Dart', 'PHP', 'C++'],
                datasets: [{
                    label: 'Niveau de maîtrise (%)',
                    data: [95, 85, 75, 80, 70, 65],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(79, 70, 229, 0.8)',
                        'rgba(67, 56, 202, 0.8)',
                        'rgba(55, 48, 163, 0.8)',
                        'rgba(49, 46, 129, 0.8)',
                        'rgba(30, 27, 75, 0.8)'
                    ],
                    borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(79, 70, 229, 1)',
                        'rgba(67, 56, 202, 1)',
                        'rgba(55, 48, 163, 1)',
                        'rgba(49, 46, 129, 1)',
                        'rgba(30, 27, 75, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        
        //toggleDarkMode
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Animation du bouton
            const themeSwitch = document.querySelector('.theme-switch');
            themeSwitch.style.transform = 'scale(0.9)';
            
            // Changement de thème avec animation
            setTimeout(() => {
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                themeSwitch.style.transform = 'scale(1)';
                
                // Mettre à jour les graphiques si nécessaire
                if (typeof updateChartsTheme === 'function') {
                    updateChartsTheme(newTheme === 'dark');
                }
            }, 150);
        }
        
        // Appliquer le thème sauvegardé au chargement
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // Mettre à jour les graphiques si nécessaire
            if (typeof updateChartsTheme === 'function') {
                updateChartsTheme(savedTheme === 'dark');
            }
        });
        
        // Détecter la préférence système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (typeof updateChartsTheme === 'function') {
                updateChartsTheme(newTheme === 'dark');
            }
        });

        // Animation des compteurs
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;
                
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            }
            animate();
        });
        
        // Projets - Système de filtrage
        const projects = [
            {
                id: 1,
                title: "Music App",
                category: "web",
                image: "project1.jpeg",
                description: "Application e-commerce complète"
            },
          {
                id: 2,
                title: "Advanced modelign editor",
                category: "web",
                image: "project2.jpeg",
                description: "Application mobile cross-platform"
            },
            {
                id: 3,
                title: "Application Mobile",
                category: "mobile",
                image: "project4.jpeg",
                description: "Application mobile cross-platform"
            },
            {
                id: 4,
                title: "UI Kit",
                category: "design",
                image: "project3.jpeg",
                description: "Kit d'interface utilisateur moderne"
            }
            
        ];
        
        function renderProjects(filterCategory = 'all') {
            const projectsGrid = document.getElementById('projects-grid');
            projectsGrid.innerHTML = '';
            
            const filteredProjects = filterCategory === 'all' 
                ? projects 
                : projects.filter(project => project.category === filterCategory);
        
            filteredProjects.forEach(project => {
                const projectElement = `
                    <div class="col-md-4 mb-4">
                        <div class="project-card">
                            <img src="${project.image}" class="card-img-top" alt="${project.title}">
                            <div class="project-overlay">
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                                <button class="btn btn-light">Voir Plus</button>
                            </div>
                        </div>
                    </div>
                `;
                projectsGrid.innerHTML += projectElement;
            });
        }
        
        // Initialisation des projets
        renderProjects();
        
        // Gestionnaire de filtres de projets
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', (e) => {
                const filterValue = e.target.getAttribute('data-filter');
                renderProjects(filterValue);
            });
        });
        
        // Formulaire de contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Ajoutez ici la logique d'envoi du formulaire
            alert('Message envoyé avec succès!');
        });
        
        // Animation de chargement
        window.addEventListener('load', function() {
            const loader = document.querySelector('.loader-wrapper');
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1500);
        });
        
        // Smooth scroll pour la navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Animation du menu flottant
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const floatingNav = document.querySelector('.floating-nav');
            
            if (currentScroll > lastScroll) {
                floatingNav.style.transform = 'translateY(-50%) translateX(100px)';
            } else {
                floatingNav.style.transform = 'translateY(-50%) translateX(0)';
            }
            lastScroll = currentScroll;
        });
        
        // Three.js Animation Background (optionnel)
        function initThreeJsBackground() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.querySelector('.profile-section').appendChild(renderer.domElement);
        
            const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x6366f1,
                wireframe: true
            });
            const torusKnot = new THREE.Mesh(geometry, material);
            
            scene.add(torusKnot);
            camera.position.z = 30;
        
            function animate() {
                requestAnimationFrame(animate);
                torusKnot.rotation.x += 0.01;
                torusKnot.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        
            // Responsive
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
        
        // Décommentez la ligne suivante pour activer l'animation Three.js
        // initThreeJsBackground();
        
        // Mode sombre
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            // Sauvegarder la préférence
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Mettre à jour les graphiques
            updateChartsTheme(isDarkMode);
        }
        
        // Vérifier la préférence sauvegardée
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            updateChartsTheme(true);
        }
