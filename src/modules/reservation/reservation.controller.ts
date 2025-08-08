import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { UuidValidationPipe } from '../../common/pipes/uuid-validation.pipe';
import { ReservationResponseDto } from './schemas/reservation.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reservations')
@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({
    status: 201,
    description: 'Reservation successfully created',
    type: ReservationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or invalid data',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Product is already reserved for the selected dates',
  })
  async create(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationService.create(
      req.user.id,
      createReservationDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all reservations',
    type: [ReservationResponseDto],
  })
  async findAll(): Promise<Reservation[]> {
    return await this.reservationService.findAll();
  }

  @Get('my-reservations')
  @ApiOperation({ summary: 'Get current user reservations' })
  @ApiResponse({
    status: 200,
    description: 'Current user reservations',
    type: [ReservationResponseDto],
  })
  async findMyReservations(@Request() req): Promise<Reservation[]> {
    return await this.reservationService.findByUser(req.user.id);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reservations for a specific product' })
  @ApiParam({
    name: 'productId',
    description: 'Product UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Product reservations',
    type: [ReservationResponseDto],
  })
  async findByProduct(
    @Param('productId', UuidValidationPipe) productId: string,
  ): Promise<Reservation[]> {
    return await this.reservationService.findByProduct(productId);
  }

  @Get('product/:productId/available-dates')
  @ApiOperation({ summary: 'Get available dates for a product' })
  @ApiParam({
    name: 'productId',
    description: 'Product UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Available dates for the product',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'date',
      },
    },
  })
  async getAvailableDates(
    @Param('productId', UuidValidationPipe) productId: string,
    @Body() dateRange: { startDate: string; endDate: string },
  ): Promise<Date[]> {
    return await this.reservationService.getAvailableDates(
      productId,
      new Date(dateRange.startDate),
      new Date(dateRange.endDate),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiParam({
    name: 'id',
    description: 'Reservation UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Reservation found',
    type: ReservationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Reservation not found',
  })
  async findOne(
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<Reservation> {
    return await this.reservationService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel reservation by ID' })
  @ApiParam({
    name: 'id',
    description: 'Reservation UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'Reservation successfully cancelled',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Reservation not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', UuidValidationPipe) id: string): Promise<void> {
    return await this.reservationService.remove(id);
  }
}
