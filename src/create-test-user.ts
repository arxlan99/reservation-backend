import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function createTestUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository = app.get(getRepositoryToken(User));

  try {
    // Check if test user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'test@example.com' },
    });

    if (existingUser) {
      console.log('Test user already exists:', existingUser.email);
      return existingUser;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const testUser = userRepository.create({
      email: 'test@example.com',
      fullName: 'Test User',
      password: hashedPassword,
      isActive: true,
    });

    const savedUser = await userRepository.save(testUser);
    console.log('✅ Test user created successfully!');
    console.log(`User ID: ${savedUser.id}`);
    console.log(`Email: ${savedUser.email}`);
    console.log(`Name: ${savedUser.fullName}`);

    return savedUser;
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await app.close();
  }
}

createTestUser();
