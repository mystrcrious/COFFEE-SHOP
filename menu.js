// ======================================================
// DATA PRODUK - Sesuai dengan HTML
// ======================================================
const menuItems = [
  { 
    name: 'AMERICANO', 
    price: 35000, 
    image: 'AMERICANO.png',
    description: 'Light espresso with water.'
  },
  { 
    name: 'CAPPUCCINO', 
    price: 38000, 
    image: 'CAPPUCCINO.png',
    description: 'Espresso with milk foam on top.'
  },
  { 
    name: 'AFFOGATO', 
    price: 40000, 
    image: 'AFFOGATO.png',
    description: 'Coffee with ice cream.'
  },
  { 
    name: 'MATCHA ESPRESSO', 
    price: 36000, 
    image: 'MATCHA.png',
    description: 'Soft matcha with espresso.'
  },
  { 
    name: 'MOCHA', 
    price: 39000, 
    image: 'MOCHA.png',
    description: 'Espresso with chocolate and milk.'
  },
  { 
    name: 'LATTE', 
    price: 38000, 
    image: 'LATTE.png',
    description: 'Smooth espresso with more milk.'
  },
  { 
    name: 'CARAMEL MACCHIATO', 
    price: 40000, 
    image: 'CARAMEL.png',
    description: 'Espresso with caramel and milk.'
  },
  { 
    name: 'HAZELNUT LATTE', 
    price: 39000, 
    image: 'HAZELNUT.png',
    description: 'Espresso with milk and a nutty hazelnut.'
  }
];

// ======================================================
// VARIABEL GLOBAL
// ======================================================
let cart = [];
let selectedItem = null;
let selectedQuantity = 1;
let selectedTemperature = null;

// ======================================================
// SCROLL ANIMATION - Card fade in
// ======================================================
const cards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('visible');
    }
  });
});

// ======================================================
// MODAL NOTES - Membuka popup untuk tambah catatan
// ======================================================
function openNotesModal(index) {
  selectedItem = menuItems[index];
  selectedQuantity = 1;
  selectedTemperature = null;
  document.getElementById('quantity').value = 1;
  document.getElementById('notes').value = '';
  document.getElementById('productImage').src = selectedItem.image;
  document.getElementById('productName').textContent = selectedItem.name;
  document.getElementById('productPrice').textContent = `Rp ${selectedItem.price.toLocaleString('id-ID')}`;
  
  // Reset temperature buttons
  document.getElementById('iceBtn').classList.remove('active');
  document.getElementById('hotBtn').classList.remove('active');
  
  document.getElementById('notesModal').classList.add('show');
}

function closeNotesModal() {
  document.getElementById('notesModal').classList.remove('show');
}

// ======================================================
// KONTROL KUANTITAS - Tombol +/- untuk jumlah item
// ======================================================
function increaseQty() {
  selectedQuantity++;
  document.getElementById('quantity').value = selectedQuantity;
}

function decreaseQty() {
  if (selectedQuantity > 1) {
    selectedQuantity--;
    document.getElementById('quantity').value = selectedQuantity;
  }
}

// ======================================================
// SELECT TEMPERATURE - Pilih Ice atau Hot
// ======================================================
function selectTemperature(temp) {
  selectedTemperature = temp;
  
  // Update button states
  if (temp === 'ice') {
    document.getElementById('iceBtn').classList.add('active');
    document.getElementById('hotBtn').classList.remove('active');
  } else {
    document.getElementById('hotBtn').classList.add('active');
    document.getElementById('iceBtn').classList.remove('active');
  }
}

// ======================================================
// TAMBAH KE KERANJANG
// ======================================================
function addToCart() {
  if (!selectedTemperature) {
    alert('Please select Ice or Hot!');
    return;
  }
  
  const notes = document.getElementById('notes').value;
  cart.push({
    ...selectedItem,
    quantity: selectedQuantity,
    temperature: selectedTemperature,
    notes: notes,
    id: Date.now()
  });
  updateCartCount();
  closeNotesModal();
  alert(`${selectedItem.name} (${selectedTemperature.toUpperCase()}) added to cart!`);
}

// ======================================================
// UPDATE CART COUNT - Update badge
// ======================================================
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// ======================================================
// TOGGLE CART - Buka/tutup halaman checkout
// ======================================================
function toggleCart() {
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }
  showCheckout();
}

// ======================================================
// SHOW CHECKOUT - Tampilkan halaman checkout
// ======================================================
function showCheckout() {
  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-temp">${item.temperature ? item.temperature.toUpperCase() : ''}</div>
        ${item.notes ? `<div class="item-notes">"${item.notes}"</div>` : ''}
        <div class="item-qty">Quantity: ${item.quantity}</div>
        <div class="item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('grandTotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;

  // Hide menu content
  document.querySelector('.navbar').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.menu').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  
  // Show checkout
  document.getElementById('checkoutPage').classList.add('show');
  document.getElementById('checkoutPage').style.display = 'block';
  window.scrollTo(0, 0);
}

// ======================================================
// KEMBALI KE MENU - Batalkan checkout
// ======================================================
function backToMenu() {
  document.getElementById('checkoutPage').classList.remove('show');
  document.getElementById('checkoutPage').style.display = 'none';
  document.querySelector('.navbar').style.display = 'flex';
  document.querySelector('.hero').style.display = 'flex';
  document.querySelector('.menu').style.display = 'grid';
  document.querySelector('footer').style.display = 'block';
  document.body.style.overflow = 'auto';
  window.scrollTo(0, 0);
}

// ======================================================
// COMPLETE ORDER - Proses pemesanan selesai
// ======================================================
function completeOrder() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = `ORDER CONFIRMED!\n\n`;
  message += `Payment Method: ${paymentMethod}\n`;
  message += `Total Amount: Rp ${total.toLocaleString('id-ID')}\n\n`;
  message += `Items:\n`;
  cart.forEach(item => {
    message += `- ${item.name} (${item.temperature.toUpperCase()}) x${item.quantity}: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`;
    if (item.notes) message += ` (${item.notes})`;
    message += `\n`;
  });

  alert(message);
  cart = [];
  updateCartCount();
  backToMenu();
}