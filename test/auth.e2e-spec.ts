import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/register (POST) - should register a new user with fullName', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        fullName: 'John Doe',
        password: 'password123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe('test@example.com');
        expect(res.body.user.fullName).toBe('John Doe');
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.isActive).toBe(true);
        expect(res.body.user.password).toBeUndefined(); // Password should not be returned
      });
  });

  it('/auth/register (POST) - should reject registration with missing fullName', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(400);
  });

  it('/auth/register (POST) - should reject registration with invalid email', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'invalid-email',
        fullName: 'John Doe',
        password: 'password123',
      })
      .expect(400);
  });

  it('/auth/register (POST) - should reject registration with short password', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        fullName: 'John Doe',
        password: '123',
      })
      .expect(400);
  });
});
