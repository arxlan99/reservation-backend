import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1700000000002 implements MigrationInterface {
  name = 'CreateProductsTable1700000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "capacity" integer NOT NULL,
        "image" character varying NOT NULL,
        "pricePerDay" decimal(10,2) NOT NULL,
        "location" character varying NOT NULL,
        "type" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products" PRIMARY KEY ("id")
      )
    `);

    // Insert sample data
    await queryRunner.query(`
      INSERT INTO "products" ("id", "title", "description", "capacity", "image", "pricePerDay", "location", "type") VALUES
      ('550e8400-e29b-41d4-a716-446655440001', 'Lagoon 50 OHANA', 'Experience the ultimate luxury on our premium yacht. Perfect for special occasions and unforgettable memories.', 10, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 1909.00, 'IT - Capo d''Orlando', 'Crewed Boat'),
      ('550e8400-e29b-41d4-a716-446655440002', 'Lagoon 46 El Marita Brand New 2024', 'A spacious yacht designed for ocean adventures. Equipped with modern amenities and safety features.', 10, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', 1475.00, 'GR - Lefkada - Lefkas', 'Crewed Boat'),
      ('550e8400-e29b-41d4-a716-446655440003', 'Fountaine Pajot SAMANA 59 ALMA', 'Perfect for romantic sunset cruises and intimate gatherings. Elegant design with comfortable seating.', 10, 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop', 5443.00, 'GR - Athens - Alimos', 'Crewed Boat'),
      ('550e8400-e29b-41d4-a716-446655440004', 'Bali Catamarans 4.3 AQUA', 'Built for thrill-seekers and water sports enthusiasts. High-performance yacht with sports equipment.', 8, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop', 432.00, 'IT - Capo d''Orlando', 'Crewed or Bareboat'),
      ('550e8400-e29b-41d4-a716-446655440005', 'Sunreef 80 ENDLESS SUMMER', 'Ultra-luxury catamaran for the most discerning guests. Spacious and elegant.', 12, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 8500.00, 'FR - Cannes - French Riviera', 'Crewed Boat')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
