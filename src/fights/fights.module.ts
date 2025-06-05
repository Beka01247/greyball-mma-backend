import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { RankingsModule } from '../rankings/rankings.module';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter, Event]), RankingsModule],
  providers: [FightsService, FightsResolver],
})
export class FightsModule {}