// Product data array (same as in form.js)
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Function to get URL parameters
function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  
  return params;
}

// Function to get product name by ID
function getProductNameById(productId) {
  const product = products.find(p => p.id === productId);
  return product ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : 'Unknown Product';
}

// Function to update review counter in localStorage
function updateReviewCounter() {
  let reviewCount = localStorage.getItem('reviewCount');
  
  if (!reviewCount) {
    reviewCount = 0;
  }
  
  reviewCount = parseInt(reviewCount) + 1;
  localStorage.setItem('reviewCount', reviewCount);
  
  return reviewCount;
}

// Function to display review details from URL parameters
function displayReviewDetails() {
  const params = getUrlParams();
  const reviewDetailsElement = document.getElementById('review-details');
  
  if (Object.keys(params).length === 0) {
    reviewDetailsElement.innerHTML = '<p>No review details available.</p>';
    return;
  }
  
  const productName = getProductNameById(params.product);
  
  let detailsHTML = '<div class="review-summary">';
  detailsHTML += `<p><strong>Product:</strong> ${productName}</p>`;
  
  if (params.rating) {
    detailsHTML += `<p><strong>Rating:</strong> ${params.rating} stars</p>`;
  }
  
  if (params['installation-date']) {
    detailsHTML += `<p><strong>Installation Date:</strong> ${params['installation-date']}</p>`;
  }
  
  if (params.feature) {
    // Check if feature is an array or single value
    const features = Array.isArray(params.feature) ? params.feature : [params.feature];
    detailsHTML += '<p><strong>Useful Features:</strong> ';
    detailsHTML += features.join(', ');
    detailsHTML += '</p>';
  }
  
  if (params.review) {
    detailsHTML += `<p><strong>Review:</strong> ${params.review}</p>`;
  }
  
  if (params.username) {
    detailsHTML += `<p><strong>Submitted by:</strong> ${params.username}</p>`;
  }
  
  detailsHTML += '</div>';
  reviewDetailsElement.innerHTML = detailsHTML;
}

// Initialize the review confirmation page
function initReviewPage() {
  displayReviewDetails();
  
  // Update and display review counter
  const reviewCount = updateReviewCounter();
  document.getElementById('review-count').textContent = reviewCount;
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initReviewPage); 