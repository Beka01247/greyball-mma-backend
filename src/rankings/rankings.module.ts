import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from '../fighter/entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  providers: [RankingsService],
  exports: [RankingsService],
})
export class RankingsModule {}