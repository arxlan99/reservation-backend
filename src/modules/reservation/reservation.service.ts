import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    userId: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { productId, startDate } = createReservationDto;

    // Check if product exists
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Check for date conflicts
    const conflictingReservation = await this.checkDateConflict(
      productId,
      new Date(startDate),
    );

    if (conflictingReservation) {
      throw new ConflictException(
        `Product is already reserved for the selected date. Conflicting reservation: ${conflictingReservation.id}`,
      );
    }

    // Create reservation
    const reservation = this.reservationRepository.create({
      userId,
      productId,
      startDate: new Date(startDate),
    });

    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async findByUser(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async findByProduct(productId: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { productId },
      relations: ['user'],
    });
  }

  async remove(id: string): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }

  private async checkDateConflict(
    productId: string,
    startDate: Date,
    excludeReservationId?: string,
  ): Promise<Reservation | null> {
    const query = this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.productId = :productId', { productId })
      .andWhere('reservation.startDate = :startDate', { startDate });

    if (excludeReservationId) {
      query.andWhere('reservation.id != :excludeId', {
        excludeId: excludeReservationId,
      });
    }

    return await query.getOne();
  }

  async getAvailableDates(
    productId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Date[]> {
    // Get all reservations for the product in the date range
    const reservations = await this.reservationRepository.find({
      where: {
        productId,
        startDate: Between(startDate, endDate),
      },
    });

    // Generate all dates in the range
    const allDates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      allDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Remove dates that are already reserved
    const reservedDates = new Set<string>();
    reservations.forEach((reservation) => {
      reservedDates.add(reservation.startDate.toISOString().split('T')[0]);
    });

    return allDates.filter(
      (date) => !reservedDates.has(date.toISOString().split('T')[0]),
    );
  }
}
