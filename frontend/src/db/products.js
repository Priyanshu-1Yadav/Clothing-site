import default1 from '../assets/images/default1.jpg';
import default2 from '../assets/images/default2.jpg';
import default3 from '../assets/images/default3.jpg';
import default4 from '../assets/images/default4.jpg';

export const products = [
  {
    id: '1', // Unique ID for the product
    images: [default1, default2, default3], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Basic Slim Fit T-Shirt',
    price: 199,
    variants: 5,
    description: 'A comfortable cotton t-shirt perfect for everyday wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#E5E5E5', '#808080', '#000000'],
    rating: 4.5,
    stock: 50,
    category: 'T-Shirts',
  },
  {
    id: '2', // Unique ID for the product
    images: [default2, default1, default3], // Multiple images for the product
    type: 'Crewneck T-Shirt',
    name: 'Basic Heavy Weight T-Shirt',
    price: 299,
    variants: 5,
    description: 'A heavy-weight crewneck t-shirt that provides durability and comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#FFFFFF', '#000000', '#FF5733'],
    rating: 4.0,
    stock: 30,
    category: 'T-Shirts',
  },
  {
    id: '3', // Unique ID for the product
    images: [default3, default2, default1], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Full Sleeve Zipper',
    price: 399,
    variants: null,
    description: 'Stylish full sleeve t-shirt with a zipper detail for a modern look.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#B0E0E6', '#000000'],
    rating: 4.2,
    stock: 20,
    category: 'T-Shirts',
  },
  {
    id: '4', // Unique ID for the product
    images: [default1, default2, default3], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Casual Full Sleeve Shirt',
    price: 499,
    variants: null,
    description: 'Casual full sleeve shirt that combines comfort and style.',
    sizes: ['L', 'XL', '2X'],
    colors: ['#E6E6FA', '#000000'],
    rating: 4.8,
    stock: 15,
    category: 'Shirts',
  },
  {
    id: '5', // Unique ID for the product
    images: [default2, default1, default3], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Casual Full Sleeve Shirt - Black',
    price: 499,
    variants: null,
    description: 'A sleek black casual full sleeve shirt.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#000000'],
    rating: 4.6,
    stock: 10,
    category: 'Shirts',
  },
  {
    id: '6', // Unique ID for the product
    images: [default3, default2, default1], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Stylish Full Sleeve T-Shirt',
    price: 399,
    variants: null,
    description: 'Trendy full sleeve t-shirt with unique design.',
    sizes: ['S', 'M', 'L'],
    colors: ['#FFFFFF', '#B0E0E6'],
    rating: 4.3,
    stock: 25,
    category: 'T-Shirts',
  },
  {
    id: '7', // Unique ID for the product
    images: [default2, default1, default3], // Multiple images for the product
    type: 'Crewneck T-Shirt',
    name: 'Comfort Crewneck T-Shirt',
    price: 299,
    variants: 5,
    description: 'Soft crewneck t-shirt with excellent fit.',
    sizes: ['XS', 'S', 'M'],
    colors: ['#FF5733', '#E5E5E5'],
    rating: 4.7,
    stock: 40,
    category: 'T-Shirts',
  },
  {
    id: '8', // Unique ID for the product
    images: [default1, default2, default3], // Multiple images for the product
    type: 'Cotton T-Shirt',
    name: 'Classic Basic T-Shirt',
    price: 199,
    variants: 5,
    description: 'Classic t-shirt that never goes out of style.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#E5E5E5', '#808080'],
    rating: 4.5,
    stock: 60,
    category: 'T-Shirts',
  },
];
