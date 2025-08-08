import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalZodValidationPipe } from './common/pipes/global-zod-validation.pipe';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser
  app.use(cookieParser());

  // Enable global Zod validation (instead of class-validator)
  app.useGlobalPipes(new GlobalZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Project API')
    .setDescription('The Project API description')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
