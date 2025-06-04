import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter]), RankingsModule],
  providers: [FightsService, FightsResolver],
})
export class FightsModule {}