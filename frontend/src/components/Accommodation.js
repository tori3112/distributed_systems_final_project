import React, { useState } from 'react';
import QuickView from './QuickView';

const products = [
  {
    id: 1,
    name: '45 Rue de Rivoli',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/d2/c6/86/d2c686cb36add7494c231528c74031e5.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Paris, France',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  },
  {
    id: 2,
    name: 'Vinohradská 123',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/5c/45/0a/5c450ae64993802e5d6cd83c34064b82.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Prague, Czechia',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  },
  {
    id: 3,
    name: 'Hauptstraße 123',
    href: '#',
    imageSrc: 'https://i.pinimg.com/564x/b2/54/d3/b254d30d90a9d483ad77014c10c8e623.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Munich, Germany',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed',
        'Kitchen',
        'Dedicated workspace',
        'Smoke alarm'
    ]
  },
  {
    id: 4,
    name: 'Calle Gran Vía, 28',
    href: '#',
    imageSrc: 'https://i.pinimg.com/1200x/96/c8/20/96c8208b22372eae52728fb7ea23f980.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Cadiz, Spain',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  },{
    id: 5,
    name: 'Via Roma, 42',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/47/bf/09/47bf097208c3ec72818dd504bd73af11.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Turin, Italy',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  },
  {
    id: 6,
    name: 'Damstraat 12',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/4b/a1/8e/4ba18e3e8dcb1e35bb0dd6c76c5488fd.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Rotterdam, Neatherlands',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  },
  {
    id: 7,
    name: 'Rue de la Paix 10',
    href: '#',
    imageSrc: 'https://i.pinimg.com/736x/63/49/02/6349022337dc9390c61bbd7892a57338.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Paris, France',
    reviewCount: 34,
    rating: 3.3,
    offer: [
        'Lock on bedroom door',
        'Wifi',
        'Luggage dropoff allowed'
    ]
  }
];

export default function Destinations() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product) => {
    console.log('QuickView clicked for product:', product);
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeModal = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-white">
        <div className="mt-6 py-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                   <a href={product.href}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleQuickView(product); // Open QuickView
                      }}
                      className="cursor-pointer"
                    >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </a>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <button
                onClick={() => handleQuickView(product)}
                className="mt-2 w-full bg-fuchsia-600 text-white p-2 rounded-md hover:bg-fuchsia-800 transition"
              >
                Quick View
              </button>
            </div>
          ))}
      </div>

      {isQuickViewOpen && (
        <QuickView product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}