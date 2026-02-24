document.addEventListener('DOMContentLoaded', () => {

    const cart = [];

    const cartBtn = document.getElementById('cartBtn');
    const cartPanel = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    const scrollBtn = document.getElementById('scrollToProducts');

    /* =========================
       SCROLL
    ========================== */
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            document.querySelector('.products')
                .scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* =========================
       ADD TO CART
    ========================== */
    document.querySelectorAll('[data-add]').forEach(button => {
        button.addEventListener('click', () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            cart.push({ name, price });
            updateCart();
        });
    });

    /* =========================
       OPEN CART
    ========================== */
    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        cartPanel.classList.toggle('active');
        cartBtn.classList.toggle('shifted');
    });

    /* =========================
       UPDATE CART
    ========================== */
    function updateCart() {

        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartBtn.classList.add('disabled');
            cartPanel.innerHTML = '<h3>Корзина пуста</h3>';
            return;
        }

        cartBtn.classList.remove('disabled');

        let total = 0;

        cartPanel.innerHTML = `
            <h3>Корзина</h3>
        `;

        cart.forEach((item, index) => {
            total += item.price;

            cartPanel.innerHTML += `
                <div style="margin-bottom:12px;font-size:14px;">
                    ${item.name} — ₽ ${item.price}
                    <button data-remove="${index}"
                        style="float:right;background:#eee;border:none;border-radius:8px;padding:2px 6px;">
                        ×
                    </button>
                </div>
            `;
        });

        cartPanel.innerHTML += `
            <hr style="margin:15px 0;">
            <strong>Итого: ₽ ${total}</strong>
            <br><br>
            <input id="clientName" placeholder="Ваше имя"
                style="width:100%;padding:8px;margin-bottom:8px;">
            <input id="clientPhone" placeholder="Телефон"
                style="width:100%;padding:8px;margin-bottom:10px;">
            <button id="checkoutBtn" style="width:100%;">
                Оформить заказ
            </button>
        `;

        /* REMOVE ITEM */
        document.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.remove);
                cart.splice(index, 1);
                updateCart();
            });
        });

        /* WHATSAPP CHECKOUT */
        document.getElementById('checkoutBtn')
            .addEventListener('click', checkout);
    }

    /* =========================
       WHATSAPP FUNCTION
    ========================== */
    function checkout() {

        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();

        if (!name || !phone) {
            alert('Введите имя и телефон');
            return;
        }

        let message = `Новый заказ:%0A`;

        cart.forEach(item => {
            message += `${item.name} — ₽ ${item.price}%0A`;
        });

        message += `%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}`;

        /* ⚠ ВСТАВЬ СВОЙ НОМЕР В МЕЖДУНАРОДНОМ ФОРМАТЕ БЕЗ "+" */
        const whatsappNumber = '79999999999';

        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            '_blank'
        );
    }

    /* =========================
       SMOOTH PARALLAX
    ========================= */

    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {

        if(window.innerWidth < 768) return;

        const scrollY = window.scrollY;
        const speed = 0.3;

        heroBg.style.transform = `translateY(${scrollY * speed}px)`;
    });

    updateCart();
});