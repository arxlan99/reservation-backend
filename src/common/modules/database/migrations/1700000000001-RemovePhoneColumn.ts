import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePhoneColumn1700000000001 implements MigrationInterface {
  name = 'RemovePhoneColumn1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove phone column
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back the phone column
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
  }
}
