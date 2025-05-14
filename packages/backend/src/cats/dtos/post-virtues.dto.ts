import { IsInt, Min, Max } from 'class-validator';
export class PostVirtuesDto {
  @IsInt() @Min(0) @Max(10) expression: number;
  @IsInt() @Min(0) @Max(10) empathy: number;
  @IsInt() @Min(0) @Max(10) intellect: number;
  @IsInt() @Min(0) @Max(10) charisma: number;
  @IsInt() @Min(0) @Max(10) willpower: number;
  @IsInt() @Min(0) @Max(10) passion: number;
  @IsInt() @Min(0) @Max(10) integrity: number;
  @IsInt() @Min(0) @Max(10) instinct: number;
}
