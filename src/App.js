import React, { useState, memo } from 'react';
import Masonry from 'react-masonry-css';
import './App.css';

const CATEGORIES = [
  {
    icon: '🛸',
    name: 'The Skyborn',
    description: 'Floating ships, airships, or people with things above them.',
    images: [
      'image-1.jpg', 'image-3.jpg', 'image-5.jpg', 'image-7.jpg', 'image-9.jpg',
      'image-10.jpg', 'image-12.jpg', 'image-14.jpg', 'image-16.jpg', 'image-18.jpg', 'image-20.jpg'
    ],
  },
  {
    icon: '⚔️',
    name: 'The Warriors',
    description: 'Action scenes with swords and battle stances.',
    images: [
      'image-2.jpg', 'image-4.jpg', 'image-6.jpg', 'image-8.jpg', 'image-11.jpg',
      'image-13.jpg', 'image-15.jpg', 'image-17.jpg', 'image-19.jpg'
    ],
  },
  {
    icon: '🏛',
    name: 'The Monuments',
    description: 'Large ruins or buildings with people for scale.',
    images: ['image-5.jpg', 'image-46.jpg', 'image-7.jpg', 'image-63.jpg', 'image-67.jpg'],
  },
  {
    icon: '🌌',
    name: 'The Explorers',
    description: 'People walking through wide landscapes or alien places.',
    images: ['image-3.jpg', 'image-21.jpg', 'image-26.jpg', 'image-28.jpg', 'image-31.jpg', 'image-50.jpg'],
  },
  {
    icon: '👁',
    name: 'The Visionaries',
    description: 'Surreal or mystical scenes with glowing orbs or skies.',
    images: ['image-6.jpg', 'image-12.jpg', 'image-18.jpg', 'image-34.jpg', 'image-57.jpg'],
  },
  {
    icon: '🌳',
    name: 'The Oasis',
    description: 'Calm nature scenes with trees, fields, or peaceful settings.',
    images: ['image-23.jpg', 'image-37.jpg', 'image-54.jpg', 'image-56.jpg', 'image-63.jpg'],
  },
  {
    icon: '🚀',
    name: 'The Skyborn',
    description: 'Airships, floating ships, or people with things above them.',
    images: ['image-10.jpg', 'image-16.jpg', 'image-24.jpg', 'image-43.jpg', 'image-55.jpg', 'image-59.jpg'],
  },
];

const breakpointColumnsObj = {
  default: 2,
  900: 2,
  600: 1
};

const GalleryCategory = memo(function GalleryCategory({ icon, name, description, images }) {
  const [brokenImages, setBrokenImages] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  const handleImgError = (img) => {
    setBrokenImages(prev => ({ ...prev, [img]: true }));
  };
  const handleImgLoad = (img) => {
    setLoadedImages(prev => ({ ...prev, [img]: true }));
  };

  return (
    <section className="gallery-category">
      <h2><span className="icon">{icon}</span> <span className="cat-title">{name}</span></h2>
      <p className="cat-desc">{description}</p>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="gallery-masonry"
        columnClassName="gallery-masonry-column"
      >
        {images.map(img => (
          <div className="gallery-img-card" key={img} style={{ position: 'relative' }}>
            <a href={process.env.PUBLIC_URL + '/images/' + img} target="_blank" rel="noopener noreferrer">
              {brokenImages[img] ? (
                <div className="img-placeholder">🖼️</div>
              ) : (
                <>
                  <img
                    src={process.env.PUBLIC_URL + '/images/' + img}
                    alt={name}
                    loading="lazy"
                    onLoad={() => handleImgLoad(img)}
                    onError={() => handleImgError(img)}
                  />
                  {!loadedImages[img] && (
                    <div className="img-loading-skeleton" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                  )}
                </>
              )}
            </a>
          </div>
        ))}
      </Masonry>
    </section>
  );
});

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="gallery-app">
      <header className="gallery-header">
        <h1>Vittorio's Gallery</h1>
        <p className="tagline">are you practicing anon?</p>
        <nav className="gallery-nav">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              className={selectedCategory === idx ? 'active' : ''}
              onClick={() => setSelectedCategory(idx)}
            >
              <span className="icon">{cat.icon}</span> {cat.name}
            </button>
          ))}
          <button
            className={selectedCategory === null ? 'active' : ''}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
        </nav>
      </header>
      <main>
        {selectedCategory === null
          ? CATEGORIES.map(cat => (
              <GalleryCategory key={cat.name} {...cat} />
            ))
          : <GalleryCategory {...CATEGORIES[selectedCategory]} />
        }
      </main>
      <footer className="gallery-footer">
        <span>© {new Date().getFullYear()} Vittorio's Gallery</span>
      </footer>
    </div>
  );
}

export default App;
