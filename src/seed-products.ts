import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './modules/product/entities/product.entity';

async function seedProducts() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productRepository = app.get(getRepositoryToken(Product));

  const sampleProducts = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Lagoon 50 OHANA',
      description:
        'Experience the ultimate luxury on our premium yacht. Perfect for special occasions and unforgettable memories.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      pricePerDay: 1909,
      location: "IT - Capo d'Orlando",
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Lagoon 46 El Marita Brand New 2024',
      description:
        'A spacious yacht designed for ocean adventures. Equipped with modern amenities and safety features.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      pricePerDay: 1475,
      location: 'GR - Lefkada - Lefkas',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      title: 'Fountaine Pajot SAMANA 59 ALMA',
      description:
        'Perfect for romantic sunset cruises and intimate gatherings. Elegant design with comfortable seating.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
      pricePerDay: 5443,
      location: 'GR - Athens - Alimos',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      title: 'Bali Catamarans 4.3 AQUA',
      description:
        'Built for thrill-seekers and water sports enthusiasts. High-performance yacht with sports equipment.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
      pricePerDay: 432,
      location: "IT - Capo d'Orlando",
      type: 'Crewed or Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      title: 'Sunreef 80 ENDLESS SUMMER',
      description:
        'Ultra-luxury catamaran for the most discerning guests. Spacious and elegant.',
      capacity: 12,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      pricePerDay: 8500,
      location: 'FR - Cannes - French Riviera',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      title: 'Princess V78 VICTORY',
      description:
        'High-performance motor yacht with sleek design and powerful engines. Perfect for speed enthusiasts.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
      pricePerDay: 3200,
      location: 'ES - Mallorca - Palma',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440007',
      title: 'Azimut 55 FLYING DOLPHIN',
      description:
        'Luxury flybridge yacht with panoramic views and sophisticated interior design.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      pricePerDay: 2800,
      location: 'IT - Sardinia - Olbia',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440008',
      title: 'Beneteau Oceanis 51.1 FREEDOM',
      description:
        'Sailing yacht for those who love the traditional sailing experience with modern comforts.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      pricePerDay: 650,
      location: 'GR - Mykonos',
      type: 'Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440009',
      title: 'Jeanneau Cap Camarat 9.0 WAVE',
      description:
        'Sporty day cruiser perfect for island hopping and water sports activities.',
      capacity: 6,
      image:
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
      pricePerDay: 350,
      location: 'HR - Split - Dalmatia',
      type: 'Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      title: 'Ferretti 920 INFINITY',
      description:
        'Ultra-luxury motor yacht with state-of-the-art technology and exceptional comfort.',
      capacity: 12,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      pricePerDay: 7200,
      location: 'FR - Saint-Tropez',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      title: 'Leopard 45 SUNSET DREAM',
      description:
        'Catamaran designed for family cruising with spacious deck and comfortable cabins.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
      pricePerDay: 1200,
      location: 'BS - Nassau - Bahamas',
      type: 'Crewed or Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      title: 'Hanse 588 ADVENTURE',
      description:
        'Performance sailing yacht for experienced sailors who want speed and comfort.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      pricePerDay: 850,
      location: 'GR - Rhodes',
      type: 'Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440013',
      title: 'Pershing 8X THUNDER',
      description:
        'High-speed luxury yacht with aggressive styling and powerful performance.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      pricePerDay: 4500,
      location: 'IT - Capri',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440014',
      title: 'Dufour 382 GRANDE',
      description:
        'Compact sailing yacht perfect for couples or small groups exploring coastal waters.',
      capacity: 6,
      image:
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
      pricePerDay: 480,
      location: 'HR - Dubrovnik',
      type: 'Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440015',
      title: 'Riva 76 Perseo SUPERNOVA',
      description:
        'Iconic Italian luxury yacht with timeless design and exceptional craftsmanship.',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      pricePerDay: 6800,
      location: 'IT - Portofino',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440016',
      title: 'Catalina 34 MKII HARMONY',
      description:
        'Classic sailing yacht with proven design and reliable performance for coastal cruising.',
      capacity: 6,
      image:
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
      pricePerDay: 420,
      location: 'GR - Corfu',
      type: 'Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440017',
      title: 'Monte Carlo 76 FLYING EAGLE',
      description:
        'Luxury flybridge yacht with elegant French design and sophisticated amenities.',
      capacity: 12,
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      pricePerDay: 3800,
      location: 'FR - Antibes',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440018',
      title: 'Fountaine Pajot Lucia 40 BLUE HORIZON',
      description:
        'Compact catamaran perfect for family vacations with excellent stability and space.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      pricePerDay: 780,
      location: 'GR - Kos',
      type: 'Crewed or Bareboat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440019',
      title: 'Azimut Grande 27 METRI',
      description:
        'Superyacht experience with exceptional luxury and professional crew service.',
      capacity: 14,
      image:
        'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
      pricePerDay: 9500,
      location: 'IT - Amalfi Coast',
      type: 'Crewed Boat',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      title: 'Jeanneau Sun Odyssey 519 SAILING SPIRIT',
      description:
        'Modern sailing yacht with innovative design and excellent handling characteristics.',
      capacity: 8,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      pricePerDay: 720,
      location: 'GR - Santorini',
      type: 'Bareboat',
    },
  ];

  try {
    // Check if products already exist
    const existingProducts = await productRepository.find();
    if (existingProducts.length > 0) {
      console.log('Products already exist, skipping seed...');
      return;
    }

    // Insert sample products
    await productRepository.save(sampleProducts);
    console.log('Sample products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await app.close();
  }
}

seedProducts();
