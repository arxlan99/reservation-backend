import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

// Base reservation schema without refinements
export const BaseReservationSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid('Invalid user ID format'),
  productId: z.string().uuid('Invalid product ID format'),
  startDate: z.string().datetime('Start date must be a valid date'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create reservation schema (for POST requests)
export const CreateReservationSchema = BaseReservationSchema.pick({
  productId: true,
  startDate: true,
}).refine(
  (data) => {
    const startDate = new Date(data.startDate);
    return startDate >= new Date();
  },
  {
    message: 'Start date cannot be in the past',
    path: ['startDate'],
  },
);

// Reservation response schema (for API responses)
export const ReservationResponseSchema = BaseReservationSchema.omit({
  // Add any fields you want to exclude from responses
});

// Create DTOs using nestjs-zod with Swagger examples
export class CreateReservationDto extends createZodDto(
  CreateReservationSchema,
) {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Product ID to reserve',
  })
  productId: string;

  @ApiProperty({
    example: '2024-08-15T00:00:00.000Z',
    description: 'Reservation start date',
  })
  startDate: string;
}

export class ReservationResponseDto extends createZodDto(
  ReservationResponseSchema,
) {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Reservation unique identifier',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID who made the reservation',
  })
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Product ID that was reserved',
  })
  productId: string;

  @ApiProperty({
    example: '2024-08-15T00:00:00.000Z',
    description: 'Reservation start date',
  })
  startDate: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Reservation creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Reservation last update timestamp',
  })
  updatedAt: Date;
}

// Export types for TypeScript usage
export type Reservation = z.infer<typeof BaseReservationSchema>;
export type CreateReservation = z.infer<typeof CreateReservationSchema>;
export type ReservationResponse = z.infer<typeof ReservationResponseSchema>;
