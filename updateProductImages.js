// Script to update Product.jsx with default clothing images
const fs = require('fs');

const filePath = 'frontend/src/pages/Product.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all shopping bag emojis with clothing images
content = content.replace(/🛍️/g, '👕');

// Replace all placeholder image URLs with clothing images
content = content.replace(/https:\/\/via\.placeholder\.com\/300x300\?text=Product\+Image/g, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center');

// Replace error handling for images
content = content.replace(/e\.target\.style\.display = 'none'\s*e\.target\.parentElement\.innerHTML = '<span class="text-2xl">🛍️<\/span>'/g, "e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64&h=64&fit=crop&crop=center'");

// Replace standalone shopping bag emojis in image placeholders
content = content.replace(/<span className="text-2xl">🛍️<\/span>/g, '<img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64&h=64&fit=crop&crop=center" alt="Default clothing" className="w-full h-full object-cover rounded-lg" />');

fs.writeFileSync(filePath, content);
console.log('Product.jsx updated with default clothing images!');