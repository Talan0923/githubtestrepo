
import products from './data/products.json';

const productsPerPage = 5;
const productGrid = document.querySelector('#product-grid');

if (productGrid) {
  const previousButton = document.querySelector('#previous-page');
  const nextButton = document.querySelector('#next-page');
  const pageIndicator = document.querySelector('#page-indicator');
  const totalPages = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

    productGrid.innerHTML = visibleProducts.map((product) => `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
          <span class="product-number">${String(product.id).padStart(2, '0')}</span>
        </div>
        <div class="product-info">
          <div class="product-title-row"><h2>${product.name}</h2><span class="product-price">$${product.price.toFixed(2)}</span></div>
          <span class="product-category">${product.category}</span>
          <p>${product.description}</p>
        </div>
      </article>
    `).join('');

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    productGrid.setAttribute('aria-busy', 'false');
  }

  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderProducts();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderProducts();
    }
  });

  renderProducts();
}
