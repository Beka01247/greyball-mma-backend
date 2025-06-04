import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter])],
  providers: [FightsService, FightsResolver],
})
export class FightsModule {}
