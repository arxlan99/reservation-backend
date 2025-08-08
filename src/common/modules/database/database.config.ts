import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // If DATABASE_URL is provided, use it directly
    if (databaseUrl) {
      return {
        type: 'postgres',
        url: databaseUrl,
        entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: !isProduction,
        migrationsRun: isProduction,
        logging: this.configService.get<string>('NODE_ENV') === 'development',
        autoLoadEntities: true,
        retryAttempts: 3,
        retryDelay: 3000,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    // Fallback to individual connection parameters
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST') || 'localhost',
      port: parseInt(this.configService.get<string>('DB_PORT') || '5432', 10),
      username: this.configService.get<string>('DB_USERNAME') || 'postgres',
      password: this.configService.get<string>('DB_PASSWORD') || 'password',
      database:
        this.configService.get<string>('DB_DATABASE') || 'project_name_db',
      entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: !isProduction,
      migrationsRun: isProduction,
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      autoLoadEntities: true,
      retryAttempts: 3,
      retryDelay: 3000,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
