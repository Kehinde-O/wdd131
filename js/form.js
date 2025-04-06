// Product data array
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

// Function to populate product select options
function populateProductOptions() {
  const productSelect = document.getElementById('product');
  
  // Clear any existing options except the first placeholder
  while (productSelect.options.length > 1) {
    productSelect.remove(1);
  }
  
  // Add product options
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    productSelect.appendChild(option);
  });
}

// Initialize the form
function initForm() {
  populateProductOptions();
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('installation-date').setAttribute('max', today);
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initForm); 