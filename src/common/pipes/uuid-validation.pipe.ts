import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  private readonly uuidSchema = z.string().uuid('Invalid UUID format');

  transform(value: string, metadata: ArgumentMetadata): string {
    try {
      return this.uuidSchema.parse(value);
    } catch (error) {
      throw new BadRequestException('Invalid UUID format');
    }
  }
}
