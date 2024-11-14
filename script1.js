document.addEventListener('DOMContentLoaded', function() {
            const downloadBtn = document.getElementById('downloadBtn');
            const modal = document.getElementById('modal');
            const closeBtn = document.getElementsByClassName('close')[0];
            const submitCode = document.getElementById('submitCode');
            const promoCodeInput = document.getElementById('promoCode');
            const message = document.getElementById('message');
            const loading = document.getElementById('loading');

            let attempts = 0;
            const maxAttempts = 3;
            let lastAttemptTime = 0;
            const cooldownPeriod = 30000; // 30 secondes

            function formatPromoCode(input) {
                const cleaned = input.replace(/[^A-Z0-9]/g, '');
                const matches = cleaned.match(/[\s\S]{1,4}/g) || [];
                return matches.join('-');
            }

            promoCodeInput.addEventListener('input', function(e) {
                const input = e.target;
                input.value = formatPromoCode(input.value.toUpperCase());
            });

            function showMessage(text, type) {
                message.textContent = text;
                message.className = 'message ' + type;
            }

            function validatePromoCode(code) {
                return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code);
            }

            async function verifyCode(code) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(code === "PROM-2024-ABCD");
                    }, 1500);
                });
            }

            downloadBtn.onclick = function() {
                modal.style.display = "block";
                message.className = 'message';
                promoCodeInput.value = "";
                attempts = 0;
            }

            closeBtn.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            submitCode.onclick = async function() {
                const currentTime = Date.now();
                if (currentTime - lastAttemptTime < cooldownPeriod) {
                    showMessage(`Veuillez attendre ${Math.ceil((cooldownPeriod - (currentTime - lastAttemptTime)) / 1000)} secondes avant de réessayer`, 'error');
                    return;
                }

                if (attempts >= maxAttempts) {
                    showMessage('Nombre maximum de tentatives dépassé. Veuillez réessayer plus tard', 'error');
                    return;
                }

                const code = promoCodeInput.value.trim();
                if (!validatePromoCode(code)) {
                    showMessage('Veuillez entrer un code promo valide', 'error');
                    return;
                }

                loading.style.display = 'block';
                submitCode.disabled = true;

                try {
                    const isValid = await verifyCode(code);
                    loading.style.display = 'none';
                    submitCode.disabled = false;

                    if (isValid) {
                        showMessage('Code promo valide ! Téléchargement en cours...', 'success');
                        setTimeout(() => {
                            window.location.href = 'CV.pdf';
                        }, 1500);
                    } else {
                        attempts++;
                        lastAttemptTime = Date.now();
                        showMessage(`Code promo invalide. Il vous reste ${maxAttempts - attempts} tentatives`, 'error');
                    }
                } catch (error) {
                    loading.style.display = 'none';
                    submitCode.disabled = false;
                    showMessage('Une erreur est survenue. Veuillez réessayer', 'error');
                }
            }

            promoCodeInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitCode.click();
                }
            });
        });

document.addEventListener('DOMContentLoaded', function() {
    // Typing animation text
    const texts = ["Développeur Web", "Créatif", "Passionné"];
    const typingText = document.querySelector('.typing-text');
    let textIndex = 0;

    function typeText() {
        let charIndex = 0;
        const currentText = texts[textIndex];
        
        const typing = setInterval(() => {
            if (charIndex < currentText.length) {
                typingText.textContent += currentText.charAt(charIndex);
                charIndex++;
            } else {
                setTimeout(() => {
                    deleteText();
                }, 2000);
                clearInterval(typing);
            }
        }, 100);
    }

    function deleteText() {
        const deleting = setInterval(() => {
            if (typingText.textContent.length > 0) {
                typingText.textContent = typingText.textContent.slice(0, -1);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                typeText();
                clearInterval(deleting);
            }
        }, 50);
    }

    typeText();

    // 3D card effect
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
