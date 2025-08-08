import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReservationsTable1700000000003
  implements MigrationInterface
{
  name = 'CreateReservationsTable1700000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "reservations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "productId" uuid NOT NULL,
        "startDate" date NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_reservations" PRIMARY KEY ("id"),
        CONSTRAINT "FK_reservations_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_reservations_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
      )
    `);

    // Create index for better performance on date queries
    await queryRunner.query(`
      CREATE INDEX "IDX_reservations_product_date" ON "reservations" ("productId", "startDate")
    `);

    // Create index for user reservations
    await queryRunner.query(`
      CREATE INDEX "IDX_reservations_user" ON "reservations" ("userId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_reservations_user"`);
    await queryRunner.query(`DROP INDEX "IDX_reservations_product_date"`);
    await queryRunner.query(`DROP TABLE "reservations"`);
  }
}
