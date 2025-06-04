import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightClass } from './entities/weight-class.entity';
import { WeightClassesService } from './weight-classes.service';
import { WeightClassesResolver } from './weight-classes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([WeightClass])],
  providers: [WeightClassesService, WeightClassesResolver],
  exports: [TypeOrmModule],
})
export class WeightClassesModule {}
