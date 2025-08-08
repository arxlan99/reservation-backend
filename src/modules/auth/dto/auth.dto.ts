import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

// Login schema
export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Register schema (extends CreateUserSchema with password)
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(50, 'Full name must be less than 50 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Auth response schema
export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    fullName: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

// DTOs
export class LoginDto extends createZodDto(LoginSchema) {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  password: string;
}

export class RegisterDto extends createZodDto(RegisterSchema) {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  fullName: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (minimum 6 characters)',
  })
  password: string;
}

export class AuthResponseDto extends createZodDto(AuthResponseSchema) {
  @ApiProperty({
    description: 'User information',
  })
  user: {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

// Export types
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
