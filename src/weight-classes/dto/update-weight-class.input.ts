import { CreateWeightClassInput } from './create-weight-class.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWeightClassInput extends PartialType(CreateWeightClassInput) {
  @Field(() => Int)
  id: number;
}
