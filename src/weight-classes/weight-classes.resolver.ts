import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { WeightClassesService } from './weight-classes.service';
import { WeightClass } from './entities/weight-class.entity';

@Resolver(() => WeightClass)
export class WeightClassesResolver {
  constructor(private readonly wcService: WeightClassesService) {}

  @Query(() => [WeightClass], { name: 'allWeightClasses' })
  findAll(): Promise<WeightClass[]> {
    return this.wcService.findAll();
  }

  @Query(() => WeightClass, { name: 'weightClassById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<WeightClass> {
    return this.wcService.findOne(id);
  }

  @Mutation(() => WeightClass)
  createWeightClass(
    @Args('name') name: string,
    @Args('minWeight', { type: () => Float }) minWeight: number,
    @Args('maxWeight', { type: () => Float }) maxWeight: number,
  ): Promise<WeightClass> {
    return this.wcService.create(name, minWeight, maxWeight);
  }
}
