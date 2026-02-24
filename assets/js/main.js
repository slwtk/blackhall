document.addEventListener('DOMContentLoaded', () => {

    const cart = [];
    const cartBtn = document.getElementById('cartBtn');
    const cartPanel = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    const scrollBtn = document.getElementById('scrollToProducts');
    const heroBg = document.querySelector('.hero-bg');

    /* SCROLL */

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            document.querySelector('.products')
                .scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* PARALLAX */

    window.addEventListener('scroll', () => {
        if (!heroBg || window.innerWidth < 768) return;
        heroBg.style.transform =
            `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
    });

    /* ADD TO CART */

    document.querySelectorAll('[data-add]').forEach(button => {
        button.addEventListener('click', () => {
            cart.push({
                name: button.dataset.name,
                price: Number(button.dataset.price)
            });
            updateCart();
        });
    });

    /* TOGGLE CART */

    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        cartPanel.classList.toggle('active');
    });

    /* CLOSE OUTSIDE */

    document.addEventListener('click', (e) => {
        if (!cartPanel.contains(e.target) &&
            !cartBtn.contains(e.target)) {
            cartPanel.classList.remove('active');
        }
    });

    function updateCart(){

        cartCount.textContent = cart.length;

        if(cart.length === 0){
            cartBtn.classList.add('disabled');
            cartPanel.classList.remove('active');
            cartPanel.innerHTML = '<h3>Корзина пуста</h3>';
            return;
        }

        cartBtn.classList.remove('disabled');

        let total = 0;
        cartPanel.innerHTML = '<h3>Корзина</h3>';

        cart.forEach((item, index) => {
            total += item.price;
            cartPanel.innerHTML += `
                <div class="cart-item">
                    <div>${item.name}</div>
                    <div class="cart-price">₽ ${item.price}</div>
                    <button class="cart-remove" data-remove="${index}">×</button>
                </div>
            `;
        });

        cartPanel.innerHTML += `
            <hr>
            <div class="cart-total">Итого: ₽ ${total}</div>

            <input id="clientName" placeholder="Ваше имя">
            <input id="clientPhone" placeholder="Телефон">

            <button id="checkoutBtn" class="cart-checkout">
                Оформить заказ
            </button>
        `;

        document.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', () => {
                cart.splice(Number(btn.dataset.remove), 1);
                updateCart();
            });
        });

        document.getElementById('checkoutBtn')
            .addEventListener('click', checkout);
    }

    function checkout(){

        const name = document.getElementById('clientName').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();

        if (!name || !phone) {
            alert('Введите имя и телефон');
            return;
        }

        let message = 'Новый заказ:%0A';

        cart.forEach(item => {
            message += `${item.name} — ₽ ${item.price}%0A`;
        });

        message += `%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}`;

        window.open(
            `https://wa.me/79991624123?text=${message}`,
            '_blank'
        );
    }

    updateCart();
});