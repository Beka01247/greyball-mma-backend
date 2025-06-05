import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { FightersService } from './fighter.service';
import { FightersResolver } from './fighter.resolver';
import { WeightClass } from '../weight-classes/entities/weight-class.entity';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, WeightClass]), RankingsModule],
  providers: [FightersService, FightersResolver],
  exports: [TypeOrmModule],
})
export class FightersModule {}
