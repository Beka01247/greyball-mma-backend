import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @Field(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(500)
  weight: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(300)
  height: number;

  @Field(() => Int)
  @IsNumber()
  weightClassId: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;
}
