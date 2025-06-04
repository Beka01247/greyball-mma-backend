import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './entities/fighter.entity';

interface CreateFighterDto {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  height: number;
  weight: number;
  weightClassId?: number;
}

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private fightersRepository: Repository<Fighter>,
  ) {}

  findAll(): Promise<Fighter[]> {
    return this.fightersRepository.find({ relations: ['weightClass'] });
  }

  async findOne(id: number): Promise<Fighter> {
    const fighter = await this.fightersRepository.findOne({
      where: { id },
      relations: ['weightClass'],
    });

    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }

    return fighter;
  }

  async create(data: CreateFighterDto): Promise<Fighter> {
    const fighter = this.fightersRepository.create(data);
    return this.fightersRepository.save(fighter);
  }
}
