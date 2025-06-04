import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { FightersService } from './fighter.service';
import { Fighter } from './entities/fighter.entity';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private readonly fightersService: FightersService) {}

  @Query(() => [Fighter], { name: 'allFighters' })
  findAll(): Promise<Fighter[]> {
    return this.fightersService.findAll();
  }

  @Query(() => Fighter, { name: 'fighterById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Fighter> {
    return this.fightersService.findOne(id);
  }

  @Mutation(() => Fighter)
  createFighter(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('nationality') nationality: string,
    @Args('birthDate') birthDate: string,
    @Args('height', { type: () => Float }) height: number,
    @Args('weight', { type: () => Float }) weight: number,
    @Args('weightClassId', { type: () => Int, nullable: true })
    weightClassId?: number,
  ): Promise<Fighter> {
    return this.fightersService.create({
      firstName,
      lastName,
      nationality,
      birthDate: new Date(birthDate),
      height,
      weight,
      weightClassId,
    });
  }
}
