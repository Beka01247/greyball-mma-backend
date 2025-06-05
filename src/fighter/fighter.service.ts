import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './entities/fighter.entity';
import { WeightClass } from '../weight-classes/entities/weight-class.entity';
import { RankingsService } from '../rankings/rankings.service';
import { Ranking } from '../rankings/entities/ranking.entity';

interface CreateFighterDto {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  height: number;
  weight: number;
  weightClassId?: number;
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  totalKnockouts: number;
  totalSubmissions: number;
}

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private fightersRepository: Repository<Fighter>,
    @InjectRepository(WeightClass)
    private weightClassRepository: Repository<WeightClass>,
    private rankingsService: RankingsService,
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

    let weightClass: WeightClass | undefined;
    if (data.weightClassId) {
      const foundWeightClass = await this.weightClassRepository.findOne({
        where: { id: data.weightClassId },
      });
      if (!foundWeightClass) {
        throw new NotFoundException(
          `WeightClass with ID ${data.weightClassId} not found`,
        );
      }
      weightClass = foundWeightClass;
      fighter.weightClass = weightClass;
    }

    const savedFighter = await this.fightersRepository.save(fighter);

    if (weightClass) {
      const ranking = new Ranking();
      ranking.fighter = savedFighter;
      ranking.weightClass = weightClass;
      let points =
        0.01 +
        data.totalWins * 0.05 +
        data.totalKnockouts * 0.02 +
        data.totalSubmissions * 0.02 -
        data.totalLosses * 0.01;
      points = Math.max(0.01, points);
      ranking.points = Number(points.toFixed(4));
      ranking.consecutiveWins = data.totalWins;
      ranking.consecutiveLosses = data.totalLosses;
      ranking.lastFightDate = new Date();
      ranking.isFormerChampion = false;
      await this.rankingsService['rankingsRepository'].save(ranking);
    }

    return savedFighter;
  }
}
