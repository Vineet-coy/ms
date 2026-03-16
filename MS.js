(function () {
    const products = {
      1: {
        name: 'Premium Brass & Pooja Metal Cleaner',
        price: 299,
        image: 'images/product1.png'
      },
      2: {
        name: 'Premium Brass & Mandir Cleaning Powder',
        price: 349,
        image: 'images/product2.png'
      },
      3: {
        name: 'Premium Brass & Pooja Care',
        price: 329,
        image: 'images/product3.png'
      }
    };
  
    let cart = JSON.parse(localStorage.getItem('mandirshine-cart')) || [];
  
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const cartItemsEl = document.getElementById('cartItems');
    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
  
    function updateCartCount() {
      const total = cart.reduce((sum, item) => sum + item.qty, 0);
      cartCountEl.textContent = total;
    }
  
    function getCartTotal() {
      return cart.reduce((sum, item) => {
        const p = products[item.id];
        return sum + (p ? p.price * item.qty : 0);
      }, 0);
    }
  
    function renderCart() {
      if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty. Add products from the shop!</p>';
        cartTotalEl.textContent = '₹0';
        return;
      }
  
      cartItemsEl.innerHTML = cart.map(item => {
        const p = products[item.id];
        if (!p) return '';
        return `
          <div class="cart-item" data-id="${item.id}">
            <img src="${p.image}" alt="${p.name}" class="cart-item-image">
            <div class="cart-item-details">
              <p class="cart-item-name">${p.name}</p>
              <p class="cart-item-price">₹${p.price} × ${item.qty} = ₹${p.price * item.qty}</p>
              <button type="button" class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
      }).join('');
  
      cartTotalEl.textContent = '₹' + getCartTotal();
      updateCartCount();
  
      cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function () {
          const id = parseInt(this.dataset.id, 10);
          cart = cart.filter(item => item.id !== id);
          saveCart();
          renderCart();
        });
      });
    }
  
    function saveCart() {
      localStorage.setItem('mandirshine-cart', JSON.stringify(cart));
      updateCartCount();
    }
  
    function openCart() {
      cartDrawer.setAttribute('aria-hidden', 'false');
      cartDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  
    function closeCart() {
      cartDrawer.setAttribute('aria-hidden', 'true');
      cartDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  
    cartBtn.addEventListener('click', function () {
      renderCart();
      openCart();
    });
  
    cartClose.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
  
    checkoutBtn.addEventListener('click', function () {
      if (cart.length === 0) return;
      alert('Thank you for your interest! Checkout can be connected to a payment gateway. Your cart total: ₹' + getCartTotal());
      closeCart();
    });
  
    document.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.dataset.id, 10);
        const existing = cart.find(item => item.id === id);
        if (existing) existing.qty += 1;
        else cart.push({ id, qty: 1 });
        saveCart();
        renderCart();
        openCart();
      });
    });
  
    updateCartCount();
    if (cart.length > 0) renderCart();
  })();
  