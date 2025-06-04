import { CreateFightInput } from './create-fight.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFightInput extends PartialType(CreateFightInput) {
  @Field(() => Int)
  id: number;
}
