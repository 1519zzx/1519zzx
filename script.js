document.addEventListener('DOMContentLoaded', () => {
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
    
    window.addEventListener('scroll', () => {
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
    });

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
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        // 这里应该添加实际的表单提交逻辑
        alert('消息已发送！（演示用）');
        contactForm.reset();
    });

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

    // 添加鼠标跟踪效果
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
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
});
