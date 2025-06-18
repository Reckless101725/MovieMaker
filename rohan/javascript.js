class JARVISInterface {
    constructor() {
        this.isInitialized = false;
        this.systemMetrics = {
            cpu: { current: 65, target: 65 },
            ram: { current: 42, target: 42 },
            disk: { current: 78, target: 78 },
            temperature: { current: 30, target: 30 },
            power: { current: 98.7, target: 98.7 }
        };
        
        // Add network stats with smooth interpolation
        this.networkStats = {
            packets: 2048,
            bandwidth: 11.7,
            packetTarget: 2048,
            bandwidthTarget: 11.7
        };
        
        this.networkData = [];
        this.animationFrames = {};
        this.audioContext = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.setupAudioContext();
        this.initializeElements();
        this.startAnimations();
        this.setupInteractions();
        this.initializeParticleSystem();
        this.startSystemSimulation();
        this.isInitialized = true;
        console.log('JARVIS Interface initialized');
    }

    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playBeep(frequency = 800, duration = 200) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    initializeElements() {
        // Update time displays
        this.updateTimeDisplays();
        setInterval(() => this.updateTimeDisplays(), 1000);
        
        // Initialize network chart
        this.initializeNetworkChart();
        
        // Initialize command console
        this.initializeCommandConsole();
        
        // Initialize typing effect
        this.initializeTypingEffect();
        
        // Initialize holographic display
        this.initializeHolographicDisplay();
    }

    updateTimeDisplays() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        const dateStr = now.toISOString().split('T')[0];
        
        const currentTimeEl = document.getElementById('current-time');
        const digitalTimeEl = document.getElementById('digital-time');
        const digitalDateEl = document.getElementById('digital-date');
        
        if (currentTimeEl) currentTimeEl.textContent = `${dateStr} ${timeStr}`;
        if (digitalTimeEl) digitalTimeEl.textContent = timeStr;
        if (digitalDateEl) digitalDateEl.textContent = dateStr;
    }

    initializeNetworkChart() {
        const canvas = document.getElementById('network-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Generate initial network data
        for (let i = 0; i < 50; i++) {
            this.networkData.push(Math.random() * 10);
        }
        
        this.drawNetworkChart(ctx, canvas);
        
        // Update network data periodically
        setInterval(() => {
            this.networkData.shift();
            this.networkData.push(Math.random() * 100);
            this.drawNetworkChart(ctx, canvas);
            
            // Update network stats smoothly
            const packetsEl = document.getElementById('packets-stat');
            const bandwidthEl = document.getElementById('bandwidth-stat');

            // Smooth interpolation instead of random jumps
            this.networkStats.packets += (this.networkStats.packetTarget - this.networkStats.packets) * 0.1;
            this.networkStats.bandwidth += (this.networkStats.bandwidthTarget - this.networkStats.bandwidth) * 0.1;

            if (packetsEl) packetsEl.textContent = Math.floor(this.networkStats.packets).toLocaleString();
            if (bandwidthEl) bandwidthEl.textContent = `${this.networkStats.bandwidth.toFixed(1)} MB/s`;

            // Set new targets occasionally
            if (Math.random() < 0.01) { // 1% chance each update
                this.networkStats.packetTarget = Math.floor(Math.random() * 2000 + 1000);
                this.networkStats.bandwidthTarget = Math.random() * 50 + 10;
            }
        }, 100);
    }

    drawNetworkChart(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(0, 195, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const y = (canvas.height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw network data
        ctx.strokeStyle = '#00c3ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        this.networkData.forEach((value, index) => {
            const x = (canvas.width / (this.networkData.length - 1)) * index;
            const y = canvas.height - (value / 100) * canvas.height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = '#00c3ff';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    initializeCommandConsole() {
        const console = document.getElementById('cmd-console');
        if (!console) return;
        
        const commands = [
            'INITIALIZING JARVIS PROTOCOLS...',
            'CONNECTING TO STARK NETWORK...',
            'VERIFYING SECURITY CLEARANCE...',
            'LOADING SYSTEM DIAGNOSTICS...',
            'ESTABLISHING QUANTUM TUNNEL...',
            'CALIBRATING ARC REACTOR...',
            'SCANNING FOR THREATS...',
            'UPDATING FACIAL RECOGNITION...',
            'OPTIMIZING POWER DISTRIBUTION...',
            'SYNCHRONIZING WITH SATELLITES...'
        ];
        
        let currentCommand = 0;
        
        const updateConsole = () => {
            const lines = console.innerHTML.split('<br>');
            if (lines.length > 10) {
                lines.shift();
            }
            
            lines.push(`<span style="color: #00ff00;">[${new Date().toLocaleTimeString()}]</span> ${commands[currentCommand]}`);
            console.innerHTML = lines.join('<br>');
            
            currentCommand = (currentCommand + 1) % commands.length;
            console.scrollTop = console.scrollHeight;
        };
        
        updateConsole();
        setInterval(updateConsole, 3000);
    }

    initializeTypingEffect() {
        const typingEl = document.getElementById('typing-text');
        if (!typingEl) return;
        
        const messages = [
            'Analyzing system integrity...',
            'Monitoring global networks...',
            'Optimizing performance parameters...',
            'Scanning for anomalies...',
            'Updating security protocols...',
            'Calibrating sensors...'
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeWriter = () => {
            const currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                typingEl.textContent = currentMessage.substring(0, charIndex - 1) + '_';
                charIndex--;
            } else {
                typingEl.textContent = currentMessage.substring(0, charIndex + 1) + '_';
                charIndex++;
            }
            
            let timeout = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentMessage.length) {
                timeout = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                timeout = 500;
            }
            
            setTimeout(typeWriter, timeout);
        };
        
        typeWriter();
    }

    initializeHolographicDisplay() {
        const holoItems = document.querySelectorAll('.holo-item');
        
        holoItems.forEach((item, index) => {
            const delay = index * 1000;
            
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.animation = 'holoFadeIn 1s ease-out forwards';
            }, delay);
        });
    }

    startAnimations() {
        this.animateResourceBars();
        this.animateReactor();
        this.animateStatusRing();
        this.animateEnvironmentData();
        this.animateFloatingCommands();
    }

    animateResourceBars() {
        const bars = ['cpu', 'ram', 'disk'];
        
        bars.forEach(bar => {
            const element = document.getElementById(`${bar}-bar`);
            const valueElement = document.getElementById(`${bar}-value`);
            
            if (element && valueElement) {
                const animate = () => {
                    const metric = this.systemMetrics[bar];
                    const diff = metric.target - metric.current;
                    
                    if (Math.abs(diff) > 0.1) {
                        metric.current += diff * 0.1;
                    }
                    
                    element.style.width = `${metric.current}%`;
                    valueElement.textContent = `${Math.round(metric.current)}%`;
                    
                    // Change color based on usage
                    if (metric.current > 80) {
                        element.style.background = 'linear-gradient(90deg, #ff2d55, #ff9500)';
                    } else if (metric.current > 60) {
                        element.style.background = 'linear-gradient(90deg, #ff9500, #39e600)';
                    } else {
                        element.style.background = 'linear-gradient(90deg, #00c3ff, #39e600)';
                    }
                    
                    requestAnimationFrame(animate);
                };
                
                animate();
            }
        });
        
        // Randomly update targets
        setInterval(() => {
            bars.forEach(bar => {
                this.systemMetrics[bar].target = Math.random() * 100;
            });
        }, 5000);
    }

    animateReactor() {
        const coreGlow = document.querySelector('.core-glow');
        const reactorRings = document.querySelectorAll('.reactor-ring');
        const powerOutput = document.getElementById('power-output');
        const tempValue = document.getElementById('temp-value');
        
        if (coreGlow) {
            let glowIntensity = 0;
            const glowAnimation = () => {
                glowIntensity += 0.02;
                const intensity = Math.sin(glowIntensity) * 0.3 + 0.7;
                coreGlow.style.opacity = intensity;
                coreGlow.style.transform = `scale(${intensity})`;
                requestAnimationFrame(glowAnimation);
            };
            glowAnimation();
        }
        
        // Animate reactor rings
        reactorRings.forEach((ring, index) => {
            let rotation = 0;
            const rotateRing = () => {
                rotation += (index + 1) * 0.5;
                ring.style.transform = `rotate(${rotation}deg)`;
                requestAnimationFrame(rotateRing);
            };
            rotateRing();
        });
        
        // Update reactor data
        setInterval(() => {
            const power = 95 + Math.random() * 5;
            const temp = 28 + Math.random() * 5;
            
            const powerOutput = document.getElementById('power-output');
            const tempValue = document.getElementById('temp-value');
            
            if (powerOutput) powerOutput.textContent = `${power.toFixed(1)}%`;
            if (tempValue) tempValue.textContent = `${temp.toFixed(1)}°C`;
        }, 2000);
    }

    animateStatusRing() {
        const segments = document.querySelectorAll('.status-segment');
        
        segments.forEach((segment, index) => {
            const delay = index * 200;
            setTimeout(() => {
                segment.style.animation = `statusPulse 2s infinite ${delay}ms`;
            }, delay);
        });
    }

    animateEnvironmentData() {
        const envItems = ['temp', 'humidity', 'pressure'];
        
        envItems.forEach(item => {
            const element = document.getElementById(`env-${item}`);
            if (element) {
                setInterval(() => {
                    let value;
                    switch (item) {
                        case 'temp':
                            value = (20 + Math.random() * 10).toFixed(1) + '°C';
                            break;
                        case 'humidity':
                            value = Math.floor(40 + Math.random() * 20) + '%';
                            break;
                        case 'pressure':
                            value = Math.floor(1000 + Math.random() * 30) + ' hPa';
                            break;
                    }
                    element.textContent = value;
                }, 3000);
            }
        });
    }

    animateFloatingCommands() {
        const commands = document.querySelectorAll('.floating-commands .command');
        
        commands.forEach((command, index) => {
            const delay = index * 500;
            setTimeout(() => {
                command.style.animation = `floatCommand 4s infinite ease-in-out ${delay}ms`;
            }, delay);
        });
    }

    setupInteractions() {
        // Add click handlers for panels
        document.querySelectorAll('.panel-item').forEach(panel => {
            panel.addEventListener('click', () => {
                this.playBeep(1000, 150);
                panel.style.animation = 'panelPulse 0.3s ease-out';
                setTimeout(() => {
                    panel.style.animation = '';
                }, 300);
            });
        });
        
        // Add hover effects for navigation
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.playBeep(800, 100);
            });
        });
        
        // Add click handler for reactor
        const reactor = document.querySelector('.reactor-core');
        if (reactor) {
            reactor.addEventListener('click', () => {
                this.playBeep(1200, 300);
                reactor.style.animation = 'reactorPulse 1s ease-out';
                setTimeout(() => {
                    reactor.style.animation = '';
                }, 1000);
            });
        }
        
        // Add voice wave interaction
        const waveContainer = document.querySelector('.wave-container');
        if (waveContainer) {
            waveContainer.addEventListener('click', () => {
                this.playBeep(600, 500);
                this.activateVoiceMode();
            });
        }
    }

    activateVoiceMode() {
        const jarvisListening = document.querySelector('.jarvis-listening');
        if (jarvisListening) {
            jarvisListening.textContent = 'JARVIS LISTENING...';
            jarvisListening.style.color = '#39e600';
            
            setTimeout(() => {
                jarvisListening.textContent = 'JARVIS AWAITING INSTRUCTIONS';
                jarvisListening.style.color = '#00c3ff';
            }, 3000);
        }
    }

    initializeParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.3';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.fillStyle = `rgba(0, 195, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw connections
                this.particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 195, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    startSystemSimulation() {
        // Simulate system load changes
        setInterval(() => {
            Object.keys(this.systemMetrics).forEach(key => {
                if (key !== 'power') {
                    this.systemMetrics[key].target = Math.random() * 100;
                }
            });
        }, 8000);
        
        // Add random notifications
        const notifications = [
            'Security protocol updated',
            'System optimization complete',
            'Network scan finished',
            'Backup process initiated',
            'New connection established',
            'Threat assessment complete',
            'Power distribution optimized',
            'Cooling system calibrated'
        ];
        
        setInterval(() => {
            const notificationsList = document.getElementById('notifications-list');
            if (notificationsList) {
                const notification = document.createElement('li');
                const time = new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                notification.innerHTML = `<span class="notification-time">${time}</span> ${notifications[Math.floor(Math.random() * notifications.length)]}`;
                
                notificationsList.insertBefore(notification, notificationsList.firstChild);
                
                // Remove old notifications
                if (notificationsList.children.length > 6) {
                    notificationsList.removeChild(notificationsList.lastChild);
                }
                
                // Add entrance animation
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    notification.style.transition = 'all 0.3s ease-out';
                    notification.style.opacity = '1';
                    notification.style.transform = 'translateX(0)';
                }, 10);
            }
        }, 15000);
    }
}

// Additional CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes holoFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes panelPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes reactorPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes statusPulse {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }
    
    @keyframes floatCommand {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .scan-effect {
        animation: scanLine 3s infinite linear;
    }
    
    @keyframes scanLine {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(400%); opacity: 0; }
    }
`;

document.head.appendChild(style);

// Initialize JARVIS Interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const jarvis = new JARVISInterface();
    
    // Add global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            jarvis.playBeep(1000, 200);
            console.log('JARVIS Interface activated via keyboard');
        }
    });
    
    // Add global click sound
    document.addEventListener('click', (e) => {
        if (e.target.closest('.panel-item, .nav-item, .reactor-core')) {
            // Already handled by specific handlers
            return;
        }
        
        if (Math.random() > 0.7) { // 30% chance for ambient clicks
            jarvis.playBeep(400 + Math.random() * 400, 50);
        }
    });
});

// Export for global access
window.JARVISInterface = JARVISInterface;