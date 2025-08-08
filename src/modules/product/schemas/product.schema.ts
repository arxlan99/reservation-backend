import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

// Base product schema with common validation rules
export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  capacity: z
    .number()
    .int('Capacity must be an integer')
    .min(1, 'Capacity must be at least 1')
    .max(50, 'Capacity must be at most 50'),
  image: z
    .string()
    .url('Image must be a valid URL')
    .min(1, 'Image URL is required'),
  pricePerDay: z
    .number()
    .positive('Price per day must be positive')
    .max(100000, 'Price per day must be less than 100,000'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(200, 'Location must be less than 200 characters'),
  type: z
    .string()
    .min(1, 'Type is required')
    .max(100, 'Type must be less than 100 characters'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create product schema (for POST requests)
export const CreateProductSchema = ProductSchema.pick({
  title: true,
  description: true,
  capacity: true,
  image: true,
  pricePerDay: true,
  location: true,
  type: true,
});

// Update product schema (for PATCH requests - all fields optional)
export const UpdateProductSchema = ProductSchema.pick({
  title: true,
  description: true,
  capacity: true,
  image: true,
  pricePerDay: true,
  location: true,
  type: true,
}).partial();

// Product response schema (for API responses)
export const ProductResponseSchema = ProductSchema.omit({
  // Add any fields you want to exclude from responses
});

// Create DTOs using nestjs-zod with Swagger examples
export class CreateProductDto extends createZodDto(CreateProductSchema) {
  @ApiProperty({
    example: 'Lagoon 50 OHANA',
    description: 'Product title',
  })
  title: string;

  @ApiProperty({
    example:
      'Experience the ultimate luxury on our premium yacht. Perfect for special occasions and unforgettable memories.',
    description: 'Product description',
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Product capacity',
  })
  capacity: number;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    description: 'Product image URL',
  })
  image: string;

  @ApiProperty({
    example: 1909,
    description: 'Price per day',
  })
  pricePerDay: number;

  @ApiProperty({
    example: "IT - Capo d'Orlando",
    description: 'Product location',
  })
  location: string;

  @ApiProperty({
    example: 'Crewed Boat',
    description: 'Product type',
  })
  type: string;
}

export class UpdateProductDto extends createZodDto(UpdateProductSchema) {
  @ApiProperty({
    example: 'Lagoon 50 OHANA',
    description: 'Product title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example:
      'Experience the ultimate luxury on our premium yacht. Perfect for special occasions and unforgettable memories.',
    description: 'Product description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 10,
    description: 'Product capacity',
    required: false,
  })
  capacity?: number;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    description: 'Product image URL',
    required: false,
  })
  image?: string;

  @ApiProperty({
    example: 1909,
    description: 'Price per day',
    required: false,
  })
  pricePerDay?: number;

  @ApiProperty({
    example: "IT - Capo d'Orlando",
    description: 'Product location',
    required: false,
  })
  location?: string;

  @ApiProperty({
    example: 'Crewed Boat',
    description: 'Product type',
    required: false,
  })
  type?: string;
}

export class ProductResponseDto extends createZodDto(ProductResponseSchema) {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Product unique identifier',
  })
  id: string;

  @ApiProperty({
    example: 'Lagoon 50 OHANA',
    description: 'Product title',
  })
  title: string;

  @ApiProperty({
    example:
      'Experience the ultimate luxury on our premium yacht. Perfect for special occasions and unforgettable memories.',
    description: 'Product description',
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Product capacity',
  })
  capacity: number;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    description: 'Product image URL',
  })
  image: string;

  @ApiProperty({
    example: 1909,
    description: 'Price per day',
  })
  pricePerDay: number;

  @ApiProperty({
    example: "IT - Capo d'Orlando",
    description: 'Product location',
  })
  location: string;

  @ApiProperty({
    example: 'Crewed Boat',
    description: 'Product type',
  })
  type: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Product creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Product last update timestamp',
  })
  updatedAt: Date;
}

// Export types for TypeScript usage
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
