import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

@Injectable()
export class GlobalZodValidationPipe
  extends ZodValidationPipe
  implements PipeTransform
{
  constructor() {
    super();
  }
}
