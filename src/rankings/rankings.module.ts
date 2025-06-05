import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { RankingsResolver } from './rankings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  providers: [RankingsService, RankingsResolver],
  exports: [RankingsService],
})
export class RankingsModule {}