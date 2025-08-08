import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

// Base user schema with common validation rules
export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(50, 'Full name must be less than 50 characters'),
  isActive: z.boolean().optional().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create user schema (for POST requests)
export const CreateUserSchema = UserSchema.pick({
  email: true,
  fullName: true,
});

// Update user schema (for PATCH requests - all fields optional)
export const UpdateUserSchema = UserSchema.pick({
  email: true,
  fullName: true,
  isActive: true,
}).partial();

// User response schema (for API responses)
export const UserResponseSchema = UserSchema.omit({
  // Add any fields you want to exclude from responses
});

// Create DTOs using nestjs-zod with Swagger examples
export class CreateUserDto extends createZodDto(CreateUserSchema) {
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
}

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {
  @ApiProperty({
    example: 'john.updated@example.com',
    description: 'User email address',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: false,
  })
  fullName?: string;

  @ApiProperty({
    example: true,
    description: 'User active status',
    required: false,
  })
  isActive?: boolean;
}

export class UserResponseDto extends createZodDto(UserResponseSchema) {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User unique identifier',
  })
  id: string;

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
    example: true,
    description: 'User active status',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'User creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'User last update timestamp',
  })
  updatedAt: Date;
}

// Export types for TypeScript usage
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
