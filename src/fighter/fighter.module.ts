import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { FightersService } from './fighter.service';
import { FightersResolver } from './fighter.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersService, FightersResolver],
  exports: [TypeOrmModule],
})
export class FightersModule {}
