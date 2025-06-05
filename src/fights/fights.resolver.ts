import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightsService } from './fights.service';
import { Fight } from './entities/fight.entity';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Query(() => [Fight], { name: 'allFights' })
  findAll(): Promise<Fight[]> {
    return this.fightsService.findAll();
  }

  @Query(() => Fight, { name: 'fightById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Fight> {
    return this.fightsService.findOne(id);
  }

  @Mutation(() => Fight)
  createFight(
    @Args('eventId', { type: () => Int }) eventId: number,
    @Args('fighter1Id', { type: () => Int }) fighter1Id: number,
    @Args('fighter2Id', { type: () => Int }) fighter2Id: number,
    @Args('fightDate', { type: () => String }) fightDate: string,
    @Args('method', { type: () => String }) method: string,
    @Args('fightResultDetails', { type: () => String, nullable: true })
    fightResultDetails?: string,
  ): Promise<Fight> {
    return this.fightsService.create(
      eventId,
      fighter1Id,
      fighter2Id,
      fightDate,
      method,
      fightResultDetails,
    );
  }
}
