import { Resolver, Query } from '@nestjs/graphql';
import { Ranking } from './entities/ranking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(
    @InjectRepository(Ranking)
    private rankingsRepository: Repository<Ranking>,
  ) {}

  @Query(() => [Ranking], { name: 'allRankings' })
  findAll(): Promise<Ranking[]> {
    return this.rankingsRepository.find({ relations: ['fighter', 'weightClass'] });
  }
} 