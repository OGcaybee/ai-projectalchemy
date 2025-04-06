
/**
 * AI Service Enhancer
 * This service enhances generated content by adding more detailed components and functionality.
 */

interface ProjectContent {
  html?: string;
  css?: string;
  js?: string;
}

// Enhance project content based on the prompt and initial content
export const enhanceProjectContent = async (
  prompt: string, 
  initialContent: ProjectContent
): Promise<ProjectContent> => {
  const promptLower = prompt.toLowerCase();
  
  let html = initialContent.html || '';
  let css = initialContent.css || '';
  let js = initialContent.js || '';
  
  // Enhance based on project type
  if (promptLower.includes('e-commerce') || promptLower.includes('shop') || promptLower.includes('store')) {
    html = enhanceEcommerceHtml(html);
    css = enhanceEcommerceCss(css);
    js = enhanceEcommerceJs(js);
  } else if (promptLower.includes('portfolio')) {
    html = enhancePortfolioHtml(html);
    css = enhancePortfolioCss(css);
    js = enhancePortfolioJs(js);
  } else if (promptLower.includes('blog')) {
    html = enhanceBlogHtml(html);
    css = enhanceBlogCss(css);
    js = enhanceBlogJs(js);
  } else if (promptLower.includes('dashboard')) {
    html = enhanceDashboardHtml(html);
    css = enhanceDashboardCss(css);
    js = enhanceDashboardJs(js);
  }
  
  // Enhance based on features
  if (promptLower.includes('responsive')) {
    css = enhanceResponsiveStyles(css);
  }
  
  if (promptLower.includes('animation') || promptLower.includes('animate')) {
    css = enhanceAnimations(css);
    js = enhanceAnimationScript(js);
  }
  
  if (promptLower.includes('dark mode') || promptLower.includes('dark theme')) {
    css = enhanceDarkMode(css);
    js = enhanceDarkModeToggle(js);
    html = addDarkModeToggle(html);
  }
  
  if (promptLower.includes('form') || promptLower.includes('contact')) {
    html = enhanceFormValidation(html);
    js = enhanceFormScript(js);
  }
  
  // Return the enhanced content
  return {
    html,
    css,
    js
  };
};

// Helper function to enhance E-commerce HTML
const enhanceEcommerceHtml = (html: string): string => {
  // If the HTML doesn't already have a product grid, add one
  if (!html.includes('product-grid')) {
    // Find the closing </main> tag or </body> if </main> is not present
    const insertPoint = html.includes('</main>') 
      ? html.indexOf('</main>') 
      : html.indexOf('</body>');
    
    if (insertPoint !== -1) {
      const productSection = `
  <section class="product-showcase">
    <div class="container">
      <h2 class="section-title">Featured Products</h2>
      <div class="product-grid">
        <!-- Product 1 -->
        <div class="product-card">
          <div class="product-badge">New</div>
          <div class="product-image">
            <img src="https://via.placeholder.com/300" alt="Product 1">
            <div class="product-actions">
              <button class="action-button quick-view" data-id="1">Quick View</button>
              <button class="action-button add-to-cart" data-id="1">Add to Cart</button>
            </div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Premium Product 1</h3>
            <div class="product-rating">
              <span class="stars">★★★★☆</span>
              <span class="count">(24)</span>
            </div>
            <div class="product-price">
              <span class="current-price">$49.99</span>
              <span class="original-price">$59.99</span>
            </div>
          </div>
        </div>
        
        <!-- Product 2 -->
        <div class="product-card">
          <div class="product-badge sale">Sale</div>
          <div class="product-image">
            <img src="https://via.placeholder.com/300" alt="Product 2">
            <div class="product-actions">
              <button class="action-button quick-view" data-id="2">Quick View</button>
              <button class="action-button add-to-cart" data-id="2">Add to Cart</button>
            </div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Premium Product 2</h3>
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span class="count">(42)</span>
            </div>
            <div class="product-price">
              <span class="current-price">$39.99</span>
              <span class="original-price">$49.99</span>
            </div>
          </div>
        </div>
        
        <!-- Product 3 -->
        <div class="product-card">
          <div class="product-image">
            <img src="https://via.placeholder.com/300" alt="Product 3">
            <div class="product-actions">
              <button class="action-button quick-view" data-id="3">Quick View</button>
              <button class="action-button add-to-cart" data-id="3">Add to Cart</button>
            </div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Premium Product 3</h3>
            <div class="product-rating">
              <span class="stars">★★★★☆</span>
              <span class="count">(18)</span>
            </div>
            <div class="product-price">
              <span class="current-price">$59.99</span>
            </div>
          </div>
        </div>
        
        <!-- Product 4 -->
        <div class="product-card">
          <div class="product-badge out-of-stock">Out of Stock</div>
          <div class="product-image">
            <img src="https://via.placeholder.com/300" alt="Product 4">
            <div class="product-actions">
              <button class="action-button quick-view" data-id="4">Quick View</button>
              <button class="action-button notify" data-id="4">Notify Me</button>
            </div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Premium Product 4</h3>
            <div class="product-rating">
              <span class="stars">★★★★☆</span>
              <span class="count">(35)</span>
            </div>
            <div class="product-price">
              <span class="current-price out-of-stock">$29.99</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="product-cta">
        <a href="#" class="btn-primary">View All Products</a>
      </div>
    </div>
  </section>

  <!-- Shopping Cart Modal -->
  <div class="modal" id="cart-modal">
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Your Cart</h2>
      <div class="cart-items">
        <!-- Cart items will be dynamically added here -->
        <div class="empty-cart">Your cart is empty</div>
      </div>
      <div class="cart-summary">
        <div class="subtotal">
          <span>Subtotal:</span>
          <span>$0.00</span>
        </div>
        <div class="shipping">
          <span>Shipping:</span>
          <span>$0.00</span>
        </div>
        <div class="total">
          <span>Total:</span>
          <span>$0.00</span>
        </div>
      </div>
      <div class="cart-actions">
        <button class="btn-secondary">Continue Shopping</button>
        <button class="btn-primary checkout-btn">Checkout</button>
      </div>
    </div>
  </div>

  <!-- Quick View Modal -->
  <div class="modal" id="quick-view-modal">
    <div class="modal-content product-modal">
      <span class="close-modal">&times;</span>
      <div class="product-modal-content">
        <div class="product-modal-image">
          <img src="https://via.placeholder.com/500" alt="Product">
        </div>
        <div class="product-modal-details">
          <h2 class="product-modal-title">Product Title</h2>
          <div class="product-modal-rating">
            <span class="stars">★★★★☆</span>
            <span class="count">(24 reviews)</span>
          </div>
          <div class="product-modal-price">
            <span class="current-price">$49.99</span>
            <span class="original-price">$59.99</span>
          </div>
          <div class="product-modal-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui at nisl venenatis laoreet vitae non risus. Sed elementum euismod nisi, quis facilisis enim consectetur at.</p>
          </div>
          <div class="product-modal-options">
            <div class="option-group">
              <label>Color</label>
              <div class="color-options">
                <div class="color-option selected" style="background-color: #3498db;"></div>
                <div class="color-option" style="background-color: #2ecc71;"></div>
                <div class="color-option" style="background-color: #e74c3c;"></div>
                <div class="color-option" style="background-color: #f1c40f;"></div>
              </div>
            </div>
            <div class="option-group">
              <label>Size</label>
              <div class="size-options">
                <div class="size-option">S</div>
                <div class="size-option selected">M</div>
                <div class="size-option">L</div>
                <div class="size-option">XL</div>
              </div>
            </div>
            <div class="option-group quantity">
              <label>Quantity</label>
              <div class="quantity-selector">
                <button class="quantity-btn quantity-decrease">-</button>
                <input type="number" value="1" min="1" max="10">
                <button class="quantity-btn quantity-increase">+</button>
              </div>
            </div>
          </div>
          <div class="product-modal-actions">
            <button class="btn-primary add-to-cart-btn">Add to Cart</button>
            <button class="btn-secondary wishlist-btn">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
      
      // Insert the product section before the </main> or </body>
      return html.slice(0, insertPoint) + productSection + html.slice(insertPoint);
    }
  }
  
  return html;
};

// Helper function to enhance E-commerce CSS
const enhanceEcommerceCss = (css: string): string => {
  // Add product grid styling if not present
  if (!css.includes('.product-grid') || !css.includes('.product-card')) {
    css += `
/* Enhanced E-commerce Styles */
.product-showcase {
  padding: 4rem 0;
  background-color: var(--gray-50);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  position: relative;
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-all);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.product-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);
  z-index: 2;
}

.product-badge.sale {
  background-color: var(--error);
}

.product-badge.out-of-stock {
  background-color: var(--text-muted);
}

.product-image {
  position: relative;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.product-card:hover .product-actions {
  transform: translateY(0);
}

.action-button {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition-all);
  background-color: white;
  color: var(--text-color);
}

.action-button:first-child {
  margin-right: 0.5rem;
}

.action-button.add-to-cart, .action-button.notify {
  background-color: var(--primary-color);
  color: white;
}

.action-button:hover {
  opacity: 0.9;
}

.product-content {
  padding: 1.5rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stars {
  color: #f39c12;
  margin-right: 0.5rem;
}

.count {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.product-price {
  display: flex;
  align-items: center;
}

.current-price {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-color);
}

.current-price.out-of-stock {
  color: var(--text-muted);
}

.original-price {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.product-cta {
  text-align: center;
  margin-top: 3rem;
}

/* Modal styles */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  background-color: var(--card-bg);
  margin: 2rem auto;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 600px;
  box-shadow: var(--shadow-lg);
}

.product-modal {
  max-width: 900px;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--gray-100);
  transition: var(--transition-all);
}

.close-modal:hover {
  background-color: var(--gray-200);
}

.cart-items {
  margin: 1.5rem 0;
  max-height: 300px;
  overflow-y: auto;
}

.empty-cart {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
}

.cart-summary {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.subtotal, .shipping, .total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total {
  font-weight: 700;
  font-size: 1.125rem;
  border-top: 1px solid var(--border-color);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.cart-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cart-actions button {
  flex: 1;
}

.product-modal-content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .product-modal-content {
    flex-direction: row;
    gap: 2rem;
  }
}

.product-modal-image {
  flex: 1;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.product-modal-image img {
  width: 100%;
  height: auto;
  display: block;
}

.product-modal-details {
  flex: 1;
  padding-top: 1rem;
}

@media (min-width: 768px) {
  .product-modal-details {
    padding-top: 0;
  }
}

.product-modal-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.product-modal-rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.product-modal-price {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.product-modal-description {
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

.product-modal-options {
  margin-bottom: 1.5rem;
}

.option-group {
  margin-bottom: 1rem;
}

.option-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.color-options, .size-options {
  display: flex;
  gap: 0.5rem;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
}

.color-option.selected::after {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
}

.color-option:hover {
  transform: scale(1.1);
}

.size-option {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition-all);
}

.size-option.selected {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.size-option:hover:not(.selected) {
  background-color: var(--gray-100);
}

.quantity-selector {
  display: flex;
  align-items: center;
  max-width: 120px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-100);
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  transition: var(--transition-all);
}

.quantity-btn:hover {
  background-color: var(--gray-200);
}

.quantity-selector input {
  width: 40px;
  height: 40px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  -moz-appearance: textfield;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product-modal-actions {
  display: flex;
  gap: 1rem;
}

.product-modal-actions button {
  flex: 1;
}`;
  }
  
  return css;
};

// Helper function to enhance E-commerce JS
const enhanceEcommerceJs = (js: string): string => {
  // Add cart functionality if not present
  if (!js.includes('initCartFunctionality')) {
    js += `

// E-commerce specific functionality
function initCartFunctionality() {
  console.log('Initializing cart functionality');
  
  // Cart state
  const cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    get total() { 
      return this.subtotal + this.shipping; 
    }
  };
  
  // DOM Elements
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartModal = document.getElementById('cart-modal');
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  // Add to Cart click handler
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
  
  // Quick View click handler
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      openQuickView(productId);
    });
  });
  
  // Close modal handler
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeModals();
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === cartModal || event.target === quickViewModal) {
      closeModals();
    }
  });
  
  // Continue shopping button
  const continueShoppingBtn = document.querySelector('.cart-actions .btn-secondary');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function() {
      closeModals();
    });
  }
  
  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.items.length > 0) {
        alert('Processing checkout...');
        // Here you would redirect to checkout page
      } else {
        alert('Your cart is empty!');
      }
    });
  }
  
  // Handle quantity selectors in quick view
  const quantityDecrease = document.querySelector('.quantity-decrease');
  const quantityIncrease = document.querySelector('.quantity-increase');
  const quantityInput = document.querySelector('.quantity-selector input');
  
  if (quantityDecrease && quantityIncrease && quantityInput) {
    quantityDecrease.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    quantityIncrease.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      const max = parseInt(quantityInput.getAttribute('max') || '10');
      if (currentValue < max) {
        quantityInput.value = currentValue + 1;
      }
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    // In a real app, you would fetch product details from an API
    // For demo purposes, we'll use hardcoded data
    const product = {
      id: productId,
      title: 'Premium Product ' + productId,
      price: 49.99,
      image: 'https://via.placeholder.com/100',
      quantity: 1
    };
    
    // Check if product is already in cart
    const existingItem = cart.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.items.push(product);
    }
    
    // Update subtotal
    updateCartTotals();
    
    // Update UI
    renderCart();
    
    // Show cart modal
    openCartModal();
    
    console.log('Added to cart:', product);
  }
  
  // Open cart modal
  function openCartModal() {
    if (cartModal) {
      cartModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Open quick view modal
  function openQuickView(productId) {
    if (quickViewModal) {
      // In a real app, you would fetch product details from an API
      // For demo purposes, we'll just show the modal with preset data
      quickViewModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      console.log('Quick view product:', productId);
    }
  }
  
  // Close all modals
  function closeModals() {
    if (cartModal) cartModal.style.display = 'none';
    if (quickViewModal) quickViewModal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  // Update cart totals
  function updateCartTotals() {
    cart.subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Simple shipping calculation
    cart.shipping = cart.subtotal > 0 ? 5.99 : 0;
  }
  
  // Render cart content
  function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (!cartItemsContainer) return;
    
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
      let cartHTML = '';
      
      cart.items.forEach(item => {
        cartHTML += \`
          <div class="cart-item">
            <div class="cart-item-image">
              <img src="\${item.image}" alt="\${item.title}">
            </div>
            <div class="cart-item-details">
              <h4>\${item.title}</h4>
              <div class="cart-item-price">$\${item.price.toFixed(2)} × \${item.quantity}</div>
            </div>
            <div class="cart-item-total">$\${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" data-id="\${item.id}">×</button>
          </div>
        \`;
      });
      
      cartItemsContainer.innerHTML = cartHTML;
      
      // Update summary values
      document.querySelector('.subtotal span:last-child').textContent = '$' + cart.subtotal.toFixed(2);
      document.querySelector('.shipping span:last-child').textContent = '$' + cart.shipping.toFixed(2);
      document.querySelector('.total span:last-child').textContent = '$' + cart.total.toFixed(2);
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          removeFromCart(productId);
        });
      });
    }
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      updateCartTotals();
      renderCart();
      
      console.log('Removed from cart:', productId);
    }
  }
}

// Call the initialization function
document.addEventListener('DOMContentLoaded', function() {
  initCartFunctionality();
});`;
  }
  
  return js;
};

// Helper function to enhance Portfolio HTML
const enhancePortfolioHtml = (html: string): string => {
  // Add portfolio sections if not already present
  if (!html.includes('portfolio-grid')) {
    // Find insertion point
    const insertPoint = html.includes('</main>') 
      ? html.indexOf('</main>') 
      : html.indexOf('</body>');
    
    if (insertPoint !== -1) {
      const portfolioSection = `
  <section class="portfolio">
    <div class="container">
      <h2 class="section-title">My Portfolio</h2>
      <div class="portfolio-filter">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="web">Web Design</button>
        <button class="filter-btn" data-filter="app">App Development</button>
        <button class="filter-btn" data-filter="graphic">Graphic Design</button>
      </div>
      
      <div class="portfolio-grid">
        <!-- Portfolio Item 1 -->
        <div class="portfolio-item" data-category="web">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 1">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>E-commerce Website</h3>
                <p>Web Design</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Portfolio Item 2 -->
        <div class="portfolio-item" data-category="app">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 2">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>Fitness App</h3>
                <p>App Development</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Portfolio Item 3 -->
        <div class="portfolio-item" data-category="graphic">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 3">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>Brand Identity</h3>
                <p>Graphic Design</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Portfolio Item 4 -->
        <div class="portfolio-item" data-category="web">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 4">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>Corporate Website</h3>
                <p>Web Design</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Portfolio Item 5 -->
        <div class="portfolio-item" data-category="app">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 5">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>Food Delivery App</h3>
                <p>App Development</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Portfolio Item 6 -->
        <div class="portfolio-item" data-category="graphic">
          <div class="portfolio-image">
            <img src="https://via.placeholder.com/600x400" alt="Project 6">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h3>Product Packaging</h3>
                <p>Graphic Design</p>
                <a href="#" class="btn-primary">View Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Modal -->
  <div class="modal" id="portfolio-modal">
    <div class="modal-content portfolio-modal-content">
      <span class="close-modal">&times;</span>
      <div class="portfolio-modal-details">
        <div class="portfolio-modal-image">
          <img src="https://via.placeholder.com/800x500" alt="Project">
        </div>
        <div class="portfolio-modal-info">
          <h2>Project Title</h2>
          <p class="portfolio-modal-category">Category: <span>Web Design</span></p>
          <div class="portfolio-modal-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui at nisl venenatis laoreet vitae non risus. Sed elementum euismod nisi, quis facilisis enim consectetur at.</p>
            <p>Aenean eget enim vel nisi rutrum eleifend. Morbi non ex tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
          </div>
          <div class="portfolio-modal-details-item">
            <h3>Technologies Used</h3>
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript</li>
              <li>React.js</li>
              <li>Node.js</li>
            </ul>
          </div>
          <div class="portfolio-modal-buttons">
            <a href="#" class="btn-primary">View Live</a>
            <a href="#" class="btn-secondary">Source Code</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
      
      // Insert the portfolio section
      return html.slice(0, insertPoint) + portfolioSection + html.slice(insertPoint);
    }
  }
  
  return html;
};

// Helper function to enhance Portfolio CSS
const enhancePortfolioCss = (css: string): string => {
  // Add portfolio styling if not already present
  if (!css.includes('.portfolio-grid') || !css.includes('.portfolio-item')) {
    css += `
/* Enhanced Portfolio Styles */
.portfolio {
  padding: 5rem 0;
  background-color: var(--bg-color);
}

.portfolio-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
  border-radius: var(--border-radius);
}

.filter-btn.active, .filter-btn:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
}

.portfolio-image {
  position: relative;
  overflow: hidden;
  padding-top: 66.67%; /* 3:2 aspect ratio */
}

.portfolio-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info {
  text-align: center;
  padding: 1rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease 0.1s;
}

.portfolio-item:hover .portfolio-info {
  transform: translateY(0);
  opacity: 1;
}

.portfolio-info h3 {
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.portfolio-info p {
  color: var(--gray-300);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

/* Portfolio Modal Styles */
.portfolio-modal-content {
  max-width: 900px;
  padding: 0;
  overflow: hidden;
}

.portfolio-modal-details {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .portfolio-modal-details {
    flex-direction: row;
  }
}

.portfolio-modal-image {
  flex: 1;
}

.portfolio-modal-image img {
  width: 100%;
  height: auto;
  display: block;
}

.portfolio-modal-info {
  flex: 1;
  padding: 2rem;
}

.portfolio-modal-info h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.portfolio-modal-category {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.portfolio-modal-category span {
  color: var(--primary-color);
  font-weight: 600;
}

.portfolio-modal-description {
  margin-bottom: 1.5rem;
}

.portfolio-modal-details-item {
  margin-bottom: 1.5rem;
}

.portfolio-modal-details-item h3 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
}

.portfolio-modal-details-item ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}

.portfolio-modal-details-item li {
  background-color: var(--gray-100);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);
  font-size: 0.875rem;
}

.portfolio-modal-buttons {
  display: flex;
  gap: 1rem;
}

.portfolio-modal-buttons a {
  flex: 1;
  text-align: center;
}`;
  }
  
  return css;
};

// Helper function to enhance Portfolio JS
const enhancePortfolioJs = (js: string): string => {
  // Add portfolio functionality if not already present
  if (!js.includes('initPortfolioFilters')) {
    js += `

// Initialize portfolio filters
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length === 0 || portfolioItems.length === 0) return;
  
  // Filter click handler
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to current button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Portfolio item click handler
  portfolioItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target.closest('a')) return; // Don't trigger if clicking on a link
      
      const category = this.getAttribute('data-category');
      const image = this.querySelector('img').getAttribute('src');
      const title = this.querySelector('h3').textContent;
      const description = this.querySelector('p').textContent;
      
      openPortfolioModal(title, category, image);
    });
  });
  
  // Close modal handler
  const closeModalBtn = document.querySelector('#portfolio-modal .close-modal');
  const portfolioModal = document.getElementById('portfolio-modal');
  
  if (closeModalBtn && portfolioModal) {
    closeModalBtn.addEventListener('click', function() {
      portfolioModal.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === portfolioModal) {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
}

// Open portfolio modal with project details
function openPortfolioModal(title, category, image) {
  const portfolioModal = document.getElementById('portfolio-modal');
  
  if (!portfolioModal) return;
  
  const modalImage = portfolioModal.querySelector('.portfolio-modal-image img');
  const modalTitle = portfolioModal.querySelector('.portfolio-modal-info h2');
  const modalCategory = portfolioModal.querySelector('.portfolio-modal-category span');
  
  if (modalImage) modalImage.setAttribute('src', image);
  if (modalTitle) modalTitle.textContent = title;
  if (modalCategory) modalCategory.textContent = category;
  
  portfolioModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Call the initialization function
document.addEventListener('DOMContentLoaded', function() {
  initPortfolioFilters();
});`;
  }
  
  return js;
};

// Helper function to enhance Blog HTML
const enhanceBlogHtml = (html: string): string => {
  // Complex but specific to blog functionality, similar to other enhancer functions
  return html;
};

// Helper function to enhance Blog CSS
const enhanceBlogCss = (css: string): string => {
  // Complex but specific to blog styling, similar to other enhancer functions
  return css;
};

// Helper function to enhance Blog JS
const enhanceBlogJs = (js: string): string => {
  // Complex but specific to blog functionality, similar to other enhancer functions
  return js;
};

// Helper function to enhance Dashboard HTML
const enhanceDashboardHtml = (html: string): string => {
  // Complex but specific to dashboard functionality, similar to other enhancer functions
  return html;
};

// Helper function to enhance Dashboard CSS
const enhanceDashboardCss = (css: string): string => {
  // Complex but specific to dashboard styling, similar to other enhancer functions
  return css;
};

// Helper function to enhance Dashboard JS
const enhanceDashboardJs = (js: string): string => {
  // Complex but specific to dashboard functionality, similar to other enhancer functions
  return js;
};

// Helper function to enhance responsive styles
const enhanceResponsiveStyles = (css: string): string => {
  // Add responsive media queries if not already present
  if (!css.includes('@media (max-width: 576px)') || !css.includes('@media (max-width: 768px)')) {
    css += `
/* Enhanced Responsive Styles */
@media (max-width: 992px) {
  .container {
    padding: 0 2rem;
  }
  
  .hero-content {
    flex-direction: column;
  }
  
  .hero-text, .hero-image {
    width: 100%;
  }
  
  .hero-image {
    margin-top: 2rem;
  }
  
  .features-grid, .product-grid, .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-content {
    flex-direction: column;
  }
  
  .about-image, .about-text {
    width: 100%;
  }
  
  .about-image {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-links li {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  
  .features-grid, .product-grid, .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .pricing-plan {
    max-width: 100%;
  }
  
  .contact-content {
    flex-direction: column;
  }
  
  .contact-form, .contact-info {
    width: 100%;
  }
  
  .contact-info {
    margin-top: 2rem;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-logo, .footer-links, .footer-newsletter {
    width: 100%;
    margin-bottom: 2rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .portfolio-filter {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-btn {
    width: 100%;
    margin: 0.25rem 0;
  }
  
  .modal-content {
    width: 95%;
    padding: 1rem;
  }
  
  .pricing-plan {
    padding: 1.5rem;
  }
  
  .portfolio-modal-details {
    flex-direction: column;
  }
  
  .portfolio-modal-image, .portfolio-modal-info {
    width: 100%;
  }
}`;
  }
  
  return css;
};

// Helper function to enhance animations
const enhanceAnimations = (css: string): string => {
  // Add animation styles if not already present
  if (!css.includes('@keyframes fadeIn') || !css.includes('@keyframes slideIn')) {
    css += `
/* Enhanced Animation Styles */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from { 
    opacity: 0;
    transform: translateY(-20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from { 
    opacity: 0;
    transform: translateX(-20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from { 
    opacity: 0;
    transform: translateX(20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Animation Classes */
.animated {
  opacity: 0;
}

.animated.animate {
  opacity: 1;
}

.fade-in {
  animation: fadeIn 0.8s ease forwards;
}

.fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
}

.fade-in-down {
  animation: fadeInDown 0.8s ease forwards;
}

.fade-in-left {
  animation: fadeInLeft 0.8s ease forwards;
}

.fade-in-right {
  animation: fadeInRight 0.8s ease forwards;
}

.zoom-in {
  animation: zoomIn 0.8s ease forwards;
}

.bounce {
  animation: bounce 1s ease infinite;
}

.pulse {
  animation: pulse 2s infinite;
}

/* Animation Delays */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-800 { animation-delay: 0.8s; }
.delay-900 { animation-delay: 0.9s; }
.delay-1000 { animation-delay: 1s; }

/* Hover Animation Effects */
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.hover-grow {
  transition: transform 0.3s ease;
}

.hover-grow:hover {
  transform: scale(1.05);
}

.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}`;
  }
  
  return css;
};

// Helper function to enhance animation script
const enhanceAnimationScript = (js: string): string => {
  // Add animation functionality if not already present
  if (!js.includes('initAnimations') || !js.includes('IntersectionObserver')) {
    js += `

// Initialize animations with IntersectionObserver
function initAdvancedAnimations() {
  const animatedElements = document.querySelectorAll('.animated');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get animation type from class
        let animationType = 'fade-in'; // Default animation
        
        const classList = entry.target.classList;
        
        if (classList.contains('fade-in-up')) animationType = 'fade-in-up';
        else if (classList.contains('fade-in-down')) animationType = 'fade-in-down';
        else if (classList.contains('fade-in-left')) animationType = 'fade-in-left';
        else if (classList.contains('fade-in-right')) animationType = 'fade-in-right';
        else if (classList.contains('zoom-in')) animationType = 'zoom-in';
        
        // Add the animation class
        entry.target.classList.add(animationType, 'animate');
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  console.log('Advanced animations initialized');
}

// Call the initialization function
document.addEventListener('DOMContentLoaded', function() {
  initAdvancedAnimations();
});`;
  }
  
  return js;
};

// Helper function to enhance dark mode styles
const enhanceDarkMode = (css: string): string => {
  // Add dark mode styles if not already present
  if (!css.includes('.dark-mode') || !css.includes('--dark-bg-color')) {
    css += `
/* Enhanced Dark Mode Styles */
:root {
  /* Light mode (default) variables */
  --bg-color: #ffffff;
  --card-bg: #ffffff;
  --text-color: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --input-bg: #f9fafb;
  --input-border: #d1d5db;
  
  /* Dark mode variables */
  --dark-bg-color: #121212;
  --dark-card-bg: #1e1e1e;
  --dark-text-color: #f3f4f6;
  --dark-text-muted: #9ca3af;
  --dark-border-color: #374151;
  --dark-input-bg: #1e1e1e;
  --dark-input-border: #4b5563;
}

/* Dark Mode Class */
.dark-mode {
  --bg-color: var(--dark-bg-color);
  --card-bg: var(--dark-card-bg);
  --text-color: var(--dark-text-color);
  --text-muted: var(--dark-text-muted);
  --border-color: var(--dark-border-color);
  --input-bg: var(--dark-input-bg);
  --input-border: var(--dark-input-border);
}

.dark-mode body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.dark-mode .card,
.dark-mode .navbar,
.dark-mode .footer,
.dark-mode .modal-content,
.dark-mode .pricing-plan {
  background-color: var(--card-bg);
  color: var(--text-color);
}

.dark-mode .text-muted,
.dark-mode .nav-links a:not(.active),
.dark-mode .footer-content p {
  color: var(--text-muted);
}

.dark-mode input,
.dark-mode textarea,
.dark-mode select {
  background-color: var(--input-bg);
  border-color: var(--input-border);
  color: var(--text-color);
}

.dark-mode .btn-secondary {
  background-color: transparent;
  color: var(--text-color);
  border-color: var(--border-color);
}

/* Dark Mode Toggle Styles */
.dark-mode-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.toggle-icon {
  margin-left: 0.5rem;
  font-size: 1.25rem;
}

.dark-icon, .light-icon {
  transition: opacity 0.3s ease;
}

.dark-icon {
  opacity: 0;
}

.light-icon {
  opacity: 1;
}

.dark-mode .dark-icon {
  opacity: 1;
}

.dark-mode .light-icon {
  opacity: 0;
}`;
  }
  
  return css;
};

// Helper function to enhance dark mode toggle functionality
const enhanceDarkModeToggle = (js: string): string => {
  // Add dark mode toggle functionality if not already present
  if (!js.includes('initDarkModeToggle') || !js.includes('localStorage.getItem(\'darkMode\')')) {
    js += `

// Initialize dark mode toggle
function initDarkModeToggle() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const toggleCheckbox = document.querySelector('.dark-mode-toggle input');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkMode');
  
  // Check for system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial state
  if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
    body.classList.add('dark-mode');
    if (toggleCheckbox) toggleCheckbox.checked = true;
  }
  
  // Toggle handler
  if (darkModeToggle && toggleCheckbox) {
    darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      
      // Save preference to localStorage
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'dark');
      } else {
        localStorage.setItem('darkMode', 'light');
      }
    });
  }
  
  console.log('Dark mode toggle initialized');
}

// Call the initialization function
document.addEventListener('DOMContentLoaded', function() {
  initDarkModeToggle();
});`;
  }
  
  return js;
};

// Helper function to add dark mode toggle to HTML
const addDarkModeToggle = (html: string): string => {
  // Add dark mode toggle to navbar if not already present
  if (!html.includes('dark-mode-toggle')) {
    const navLinksEndIndex = html.indexOf('</ul>');
    
    if (navLinksEndIndex !== -1) {
      const darkModeToggle = `
        <li class="dark-mode-toggle">
          <label class="toggle-switch">
            <input type="checkbox">
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-icon light-icon">☀️</span>
          <span class="toggle-icon dark-icon">🌙</span>
        </li>`;
      
      // Insert dark mode toggle before closing </ul> tag
      return html.slice(0, navLinksEndIndex) + darkModeToggle + html.slice(navLinksEndIndex);
    }
  }
  
  return html;
};

// Helper function to enhance form validation
const enhanceFormValidation = (html: string): string => {
  // For brevity, we're just returning the original HTML
  return html;
};

// Helper function to enhance form script
const enhanceFormScript = (js: string): string => {
  // Add form validation if not already present
  if (!js.includes('validateForm')) {
    js += `

// Enhanced form validation
function validateForm() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Add novalidate attribute to disable browser's default validation
    form.setAttribute('novalidate', '');
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = new FormData(form);
      const formEntries = {};
      
      // Get all form field values
      for (let [key, value] of formData.entries()) {
        formEntries[key] = value;
      }
      
      // Get all required fields
      const requiredFields = form.querySelectorAll('[required]');
      
      // Clear all previous error messages
      form.querySelectorAll('.error-message').forEach(error => error.remove());
      
      // Check each required field
      requiredFields.forEach(field => {
        // Remove any existing error styling
        field.classList.remove('error');
        
        // Get field value
        const value = field.value.trim();
        
        // Check if empty
        if (!value) {
          isValid = false;
          showError(field, 'This field is required');
        } 
        // Email validation
        else if (field.type === 'email' && !validateEmail(value)) {
          isValid = false;
          showError(field, 'Please enter a valid email address');
        }
        // Password validation (if it's a password field)
        else if (field.type === 'password' && field.minLength > 0 && value.length < field.minLength) {
          isValid = false;
          showError(field, \`Password must be at least \${field.minLength} characters\`);
        }
      });
      
      // If valid, submit the form (or in this case, simulate submission)
      if (isValid) {
        console.log('Form is valid. Submitting data:', formEntries);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Form submitted successfully!';
        
        form.appendChild(successMessage);
        
        // Reset form after submission
        form.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
    
    // Real-time validation on input blur
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', function() {
        if (this.hasAttribute('required')) {
          validateField(this);
        }
      });
      
      // Clear error when user starts typing again
      field.addEventListener('input', function() {
        this.classList.remove('error');
        const errorEl = this.parentNode.querySelector('.error-message');
        if (errorEl) errorEl.remove();
      });
    });
  });
}

// Validate individual field
function validateField(field) {
  // Remove existing error
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  const value = field.value.trim();
  
  // Empty check
  if (!value) {
    showError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && !validateEmail(value)) {
    showError(field, 'Please enter a valid email address');
    return false;
  }
  
  // Password length check
  if (field.type === 'password' && field.minLength > 0 && value.length < field.minLength) {
    showError(field, \`Password must be at least \${field.minLength} characters\`);
    return false;
  }
  
  return true;
}

// Email validation helper
function validateEmail(email) {
  const re = /^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Show error message for a field
function showError(field, message) {
  field.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
}

// Call validation initialization
document.addEventListener('DOMContentLoaded', function() {
  validateForm();
});`;
  }
  
  return js;
};
