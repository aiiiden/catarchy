import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string, { data, type }: ArgumentMetadata): bigint {
    // 1) 파라미터/쿼리일 때만 동작
    if (type !== 'param' && type !== 'query')
      throw new BadRequestException(
        'ParseBigIntPipe can only be used on params or query',
      );

    // 2) 값 검증
    if (!/^\d+$/.test(value))
      throw new BadRequestException(
        `${data ?? 'value'} must be a positive integer string`,
      );

    try {
      return BigInt(value);
    } catch {
      throw new BadRequestException(`${data ?? 'value'} exceeds BigInt range`);
    }
  }
}
