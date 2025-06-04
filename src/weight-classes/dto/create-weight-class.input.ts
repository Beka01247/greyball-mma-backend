import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

@InputType()
export class CreateWeightClassInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(500)
  minWeight: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(500)
  maxWeight: number;
}
