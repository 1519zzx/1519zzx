document.addEventListener('DOMContentLoaded', () => {
    // 仅在移动端添加菜单按钮
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '☰';
        mobileMenuToggle.setAttribute('aria-label', '菜单');
        nav.insertBefore(mobileMenuToggle, nav.querySelector('.nav-links'));

        // 移动端菜单切换
        mobileMenuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // 点击导航链接后自动关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '☰';
                }
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '☰';
                }
            }
        });
    }

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        }
        
        lastScroll = currentScroll;
    }, 100));

    // 项目卡片动画
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // 移除原有的项目卡片点击处理
    // projectLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const projectTitle = link.closest('.project-card').querySelector('h3').textContent;
    //         alert(`即将查看项目：${projectTitle}\n(这里可以添加实际的项目链接)`);
    //     });
    // });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validateForm(contactForm)) return;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '发送中...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formspree.io/f/xanewbkr', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.textContent = '发送成功!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = '发送消息';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('发送失败');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.textContent = '发送失败，请重试';
                setTimeout(() => {
                    submitBtn.textContent = '发送消息';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // 添加滚动进度指示器
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #3498db;
        z-index: 1001;
        width: 0%;
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });

    // 替换鼠标跟踪效果
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);

    // 表情数组
    const emojis = ['😊', '💡', '✨', '🚀', '💻', '🎨', '🎯', '🌟'];
    let currentEmojiIndex = 0;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // 每次移动都更换表情
        cursor.textContent = emojis[currentEmojiIndex];
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
    });

    // 点击时的特殊效果
    document.addEventListener('click', () => {
        cursor.textContent = '🎉';
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    });

    // 添加技能标签悬浮效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(1.1)`;
        });
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // 添加打字机效果
    const heroText = document.querySelector('.hero-content h1');
    const text = heroText.textContent;
    heroText.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // 当hero区域可见时启动打字机效果
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
        }
    });
    
    heroObserver.observe(heroText);

    // 添加项目卡片3D悬浮效果
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMove);
        card.addEventListener('mouseleave', handleCardLeave);
    });

    function handleCardMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    function handleCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }

    // 更新表情粒子效果
    const hero = document.querySelector('.hero');
    const particleEmojis = ['🌟', '💫', '✨', '💡', '🚀', '💻', '🎨', '🎯', '🌈', '🎮', '🎵', '🎪', '🎁', '🔮', '🎭'];
    const particles = [];
    const numParticles = 40; // 增加粒子数量

    class Particle {
        constructor(x, y, emoji) {
            this.element = document.createElement('div');
            this.element.className = 'emoji-particle';
            this.element.textContent = emoji;
            this.x = x;
            this.y = y;
            this.dx = (Math.random() - 0.5) * 4; // 增加初始速度
            this.dy = (Math.random() - 0.5) * 4;
            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            this.dragging = false;
            this.rotation = Math.random() * 360;
            
            this.element.addEventListener('mousedown', this.startDragging.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('mouseup', this.stopDragging.bind(this));
            
            hero.appendChild(this.element);
        }

        startDragging(e) {
            this.dragging = true;
            this.dragStartX = e.clientX - this.x;
            this.dragStartY = e.clientY - this.y;
            this.element.style.zIndex = '100';
            this.dx = 0;
            this.dy = 0;
        }

        drag(e) {
            if (!this.dragging) return;
            
            this.x = e.clientX - this.dragStartX;
            this.y = e.clientY - this.dragStartY;
            
            // 限制拖动范围
            this.x = Math.min(Math.max(0, this.x), hero.clientWidth - 50);
            this.y = Math.min(Math.max(0, this.y), hero.clientHeight - 50);
            
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }

        stopDragging() {
            if (!this.dragging) return;
            this.dragging = false;
            this.element.style.zIndex = '1';
            
            // 释放时给一个随机速度
            this.dx = (Math.random() - 0.5) * 8;
            this.dy = (Math.random() - 0.5) * 8;
        }

        update() {
            if (this.dragging) return;

            // 更新位置
            this.x += this.dx;
            this.y += this.dy;

            // 检测与其他粒子的碰撞
            particles.forEach(otherParticle => {
                if (otherParticle !== this) {
                    const dx = otherParticle.x - this.x;
                    const dy = otherParticle.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = 160; // 碰撞距离

                    if (distance < minDistance) {
                        // 计算碰撞响应
                        const angle = Math.atan2(dy, dx);
                        const targetX = this.x + Math.cos(angle) * minDistance;
                        const targetY = this.y + Math.sin(angle) * minDistance;
                        
                        // 施加推力
                        const force = (minDistance - distance) / minDistance;
                        const pushX = (targetX - otherParticle.x) * force * 0.05;
                        const pushY = (targetY - otherParticle.y) * force * 0.05;

                        // 更新速度
                        this.dx -= pushX;
                        this.dy -= pushY;
                        otherParticle.dx += pushX;
                        otherParticle.dy += pushY;

                        // 添加旋转效果
                        this.rotation += force * 10;
                        otherParticle.rotation -= force * 10;
                    }
                }
            });

            // 边界碰撞检测
            const size = 120; // 更新碰撞边界大小
            if (this.x <= 0 || this.x >= hero.clientWidth - size) {
                this.dx *= -0.8;
                this.x = this.x <= 0 ? 0 : hero.clientWidth - size;
            }
            if (this.y <= 0 || this.y >= hero.clientHeight - size) {
                this.dy *= -0.8;
                this.y = this.y <= 0 ? 0 : hero.clientHeight - size;
            }

            // 添加阻力和重力
            this.dy += 0.2;
            this.dx *= 0.99;
            this.dy *= 0.99;

            // 更新位置和旋转
            this.element.style.transform = `rotate(${this.rotation}deg)`;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }

    // 创建粒子
    function createParticles() {
        particles.forEach(particle => particle.element.remove());
        particles.length = 0;
        
        for (let i = 0; i < numParticles; i++) {
            const x = Math.random() * (hero.clientWidth - 50);
            const y = Math.random() * (hero.clientHeight - 50);
            const emoji = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
            particles.push(new Particle(x, y, emoji));
        }
    }

    // 动画循环
    function animate() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    // 初始化
    if (hero) {
        createParticles();
        animate();

        // 窗口大小改变时重新创建粒子
        window.addEventListener('resize', createParticles);
    }

    // 添加图片加载处理
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-error-placeholder';
            placeholder.textContent = '图片加载失败';
            this.parentNode.appendChild(placeholder);
        });
        
        // 如果图片已经缓存，手动触发load事件
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    lazyLoadImages();
});

// 清理资源
window.addEventListener('unload', () => {
    // 清理所有监听器和定时器
    particles.forEach(particle => {
        particle.element.remove();
    });
});

// 添加性能优化
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 添加图片懒加载
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in-up');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 优化表单验证
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}