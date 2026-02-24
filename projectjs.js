const products = [
  { id: 1, name: "Laptop", price: 50000, image: "https://media.istockphoto.com/id/1389603578/photo/laptop-blank-screen-on-wood-table-with-blurred-coffee-shop-cafe-interior-background-and.jpg?s=612x612&w=0&k=20&c=bPf3XxUZJZ6HRw7BE75ur1wBMCm_r4QAr-_lajERIyU=" },
  { id: 2, name: "Phone", price: 20000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWIiRJPdcyu7b8cmYYZ2NmtuTKrJx7pFb_A&s" },
  { id: 3, name: "Headphones", price: 3000, image: "https://media.tatacroma.com/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/239032_0_ogo1io.png" },
  { id: 4, name: "Smart Watch", price: 7000, image: "https://zebronics.com/cdn/shop/products/zeb-iconic-lite-pic3.jpg?v=1672482509&width=2048" },
  { id: 5, name: "Keyboard", price: 1500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhJoX1PJf3fj5fcI1gWt5TyI4FzZKUrV42nw&s" },
  { id: 6, name: "Mouse", price: 800, image: "https://media.geeksforgeeks.org/wp-content/uploads/20250508130714821078/_Mouse-2.webp" },
  { id: 7, name: "Tablet", price: 25000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pFFRTiK1bQb4WsPE7Chh2YH0pBNYWeCDeg&s" },
  { id: 8, name: "Speaker", price: 4000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s" },
  { id: 9, name: "Monitor", price: 12000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTscIekqkUGakQIyL9E3CoeqO5GKCDNwAe4Bg&s" },
  { id: 10, name: "Power Bank", price: 1200, image: "https://media.istockphoto.com/id/1126642401/photo/power-bank-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=FMMhXxZql2guHigJvPDsi6S5Bp_QT6OsfZnD6kqcc3U=" },
  { id: 11, name: "Charger", price: 600, image: "https://t4.ftcdn.net/jpg/03/85/34/27/360_F_385342760_L0T7b4w07Z0qbcQKgkczpoHvzO1AU1Bg.jpg" },
  { id: 12, name: "USB Cable", price: 300, image: "https://m.media-amazon.com/images/I/5190uz4tnkL.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// Display Products
function displayProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.image}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update Cart
function updateCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} - ₹${item.price} x ${item.quantity}
      <button onclick="changeQty(${item.id}, 1)">+</button>
      <button onclick="changeQty(${item.id}, -1)">-</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });

  totalSpan.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Change Quantity
function changeQty(id, change) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }
  updateCart();
}

// Remove Item
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

displayProducts();
updateCart();