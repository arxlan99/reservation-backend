import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntityToUseFullName1700000000000
  implements MigrationInterface
{
  name = 'UpdateUserEntityToUseFullName1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add fullName column
    await queryRunner.query(
      `ALTER TABLE "users" ADD "fullName" character varying NOT NULL DEFAULT ''`,
    );

    // Update fullName with concatenated firstName and lastName for existing users
    await queryRunner.query(
      `UPDATE "users" SET "fullName" = CONCAT("firstName", ' ', "lastName") WHERE "firstName" IS NOT NULL AND "lastName" IS NOT NULL`,
    );

    // Remove old columns
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back the old columns
    await queryRunner.query(
      `ALTER TABLE "users" ADD "firstName" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastName" character varying NOT NULL DEFAULT ''`,
    );

    // Split fullName back to firstName and lastName (simple split on first space)
    await queryRunner.query(
      `UPDATE "users" SET "firstName" = SPLIT_PART("fullName", ' ', 1), "lastName" = SUBSTRING("fullName" FROM POSITION(' ' IN "fullName") + 1) WHERE POSITION(' ' IN "fullName") > 0`,
    );

    // For users with no space in fullName, put everything in firstName
    await queryRunner.query(
      `UPDATE "users" SET "firstName" = "fullName" WHERE POSITION(' ' IN "fullName") = 0`,
    );

    // Remove fullName column
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
  }
}
