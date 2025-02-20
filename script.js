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
});