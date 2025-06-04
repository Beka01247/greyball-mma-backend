import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fightsRepository: Repository<Fight>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
  ) {}

  findAll(): Promise<Fight[]> {
    return this.fightsRepository.find({
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });
  }

  async findOne(id: number): Promise<Fight> {
    const fight = await this.fightsRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });

    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }

    return fight;
  }

  async create(
    fighter1Id: number,
    fighter2Id: number,
    fightDate: string,
    method: string,
    fightResultDetails?: string,
  ): Promise<Fight> {
    // Find fighters first
    const fighter1 = await this.fighterRepository.findOne({
      where: { id: fighter1Id },
    });
    const fighter2 = await this.fighterRepository.findOne({
      where: { id: fighter2Id },
    });

    if (!fighter1) {
      throw new NotFoundException(`Fighter with ID ${fighter1Id} not found`);
    }
    if (!fighter2) {
      throw new NotFoundException(`Fighter with ID ${fighter2Id} not found`);
    }

    const fight = this.fightsRepository.create({
      fighter1,
      fighter2,
      fightDate: new Date(fightDate),
      method,
      fightResultDetails,
    });

    return await this.fightsRepository.save(fight);
  }
}
