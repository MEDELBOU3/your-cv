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
