import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from './entities/weight-class.entity';

@Injectable()
export class WeightClassesService {
  constructor(
    @InjectRepository(WeightClass)
    private repo: Repository<WeightClass>,
  ) {}

  findAll(): Promise<WeightClass[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<WeightClass> {
    const weightClass = await this.repo.findOneBy({ id });

    if (!weightClass) {
      throw new NotFoundException(`Weight class with ID ${id} not found`);
    }

    return weightClass;
  }

  create(
    name: string,
    minWeight: number,
    maxWeight: number,
  ): Promise<WeightClass> {
    const wc = this.repo.create({ name, minWeight, maxWeight });
    return this.repo.save(wc);
  }
}
