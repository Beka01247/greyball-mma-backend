import { CreateFighterInput } from './create-fighter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => Int)
  id: number;
}
