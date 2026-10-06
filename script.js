// 1. إنشاء جسيمات خلفية متحركة ديناميكياً
        const particlesContainer = document.getElementById('particlesBg');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particlesContainer.appendChild(particle);
        }

        // 2. تتبع إضاءة الماوس في الخلفية فقط دون تحريك الكارت
        const mouseGlow = document.getElementById('mouseGlow');

        window.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });

        // 3. قاموس الترجمة وتغيير اللغة
        const translations = {
            ar: {
                themeLight : "الوضع الداكن",
                themeDark: "الوضع الفاتح",
                status: "قريباً - إطلاق المنصة الجديدة",
                teaser: "نحن نعيد تعريف الحلول البرمجية عبر خوارزميات هندسية متقدمة ودقيقة. استعد لتجربة تكنولوجية استثنائية تغير مقاييس الكفاءة والأداء.",
                daysLbl: "يوماً",
                hoursLbl: "ساعة",
                minsLbl: "دقيقة",
                secsLbl: "ثانية",
                emailPlaceholder: "أدخل بريدك الإلكتروني ليصلك الإطلاق...",
                btnText: "أخبرني عند الإطلاق",
                successText: "تم تسجيل بريدك بنجاح! سنقوم بإعلامك فور انطلاق المنصة."
            },
            en: {
                themeLight: "Dark Mode",
                themeDark : "Light Mode",
                status: "Coming Soon - New Platform Launch",
                teaser: "We are redefining software solutions through advanced and precise geometric algorithms. Get ready for an exceptional tech experience.",
                daysLbl: "Days",
                hoursLbl: "Hours",
                minsLbl: "Mins",
                secsLbl: "Secs",
                emailPlaceholder: "Enter your email for updates...",
                btnText: "Notify Me",
                successText: "Email registered successfully! We will notify you upon launch."
            }
        };

        let currentLang = 'ar';

        function toggleLanguage() {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            const htmlTag = document.documentElement;
            
            if (currentLang === 'en') {
                htmlTag.setAttribute('lang', 'en');
                htmlTag.setAttribute('dir', 'ltr');
                document.getElementById('langText').innerText = 'العربية';
            } else {
                htmlTag.setAttribute('lang', 'ar');
                htmlTag.setAttribute('dir', 'rtl');
                document.getElementById('langText').innerText = 'English';
            }

            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if (translations[currentLang][key]) {
                    el.innerText = translations[currentLang][key];
                }
            updateThemeLang()
            });

            const emailInput = document.getElementById('userEmail');
            emailInput.placeholder = translations[currentLang][emailInput.getAttribute('data-placeholder')];
        }

        function toggleTheme() {
            const htmlTag = document.documentElement;
            const currentTheme = htmlTag.getAttribute('data-theme');
            const themeIcon = document.getElementById('themeIcon');
            const themeText = document.getElementById('themeText');

            if (currentTheme === 'dark') {
                htmlTag.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                themeText.innerText = currentLang === 'ar' ? translations.ar.themeLight : translations.en.themeLight;
            } else {
                htmlTag.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                themeText.innerText = currentLang === 'ar' ? translations.ar.themeDark : translations.en.themeDark;
            }
        }

        function updateThemeLang() {
            const htmlTag = document.documentElement;
            const currentTheme = htmlTag.getAttribute('data-theme');
            const themeText = document.getElementById('themeText');

            if (currentTheme === 'dark') {
                themeText.innerText = currentLang === 'ar' ? translations.ar.themeDark : translations.en.themeDark;
            } else {
                themeText.innerText = currentLang === 'ar' ? translations.ar.themeLight : translations.en.themeLight;
            }
        }

        // 4. العداد التنازلي
        const targetTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);

        setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
        }, 1000);

        function handleSubscription(e) {
            e.preventDefault();
            const emailInput = document.getElementById('userEmail');
            if(emailInput.value) {
                document.getElementById('subscribeForm').style.display = 'none';
                document.getElementById('successMsg').style.display = 'block';
            }
        }