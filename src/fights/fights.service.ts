import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { RankingsService } from '../rankings/rankings.service';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fightsRepository: Repository<Fight>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private rankingsService: RankingsService,
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
    eventId: number,
    fighter1Id: number,
    fighter2Id: number,
    fightDate: string,
    method: string,
    fightResultDetails?: string,
  ): Promise<Fight> {
    const fighter1 = await this.fighterRepository.findOne({
      where: { id: fighter1Id },
      relations: ['weightClass'],
    });
    const fighter2 = await this.fighterRepository.findOne({
      where: { id: fighter2Id },
      relations: ['weightClass'],
    });

    if (!fighter1) {
      throw new NotFoundException(`Fighter with ID ${fighter1Id} not found`);
    }
    if (!fighter2) {
      throw new NotFoundException(`Fighter with ID ${fighter2Id} not found`);
    }

    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const winner = fighter1;
    const loser = fighter2;

    winner.totalWins += 1;
    loser.totalLosses += 1;
    if (method.toLowerCase() === 'ko' || method.toLowerCase() === 'tko') {
      winner.totalKnockouts += 1;
    } else if (method.toLowerCase() === 'submission') {
      winner.totalSubmissions += 1;
    }
    await this.fighterRepository.save([winner, loser]);

    const fight = this.fightsRepository.create({
      fighter1,
      fighter2,
      event,
      fightDate: new Date(fightDate),
      method,
      fightResultDetails,
      winner,
    });

    const savedFight = await this.fightsRepository.save(fight);

    setImmediate(() => {
      this.rankingsService.updateRankings(savedFight).catch(console.error);
    });

    return savedFight;
  }

  async updateFight(
    id: number,
    winnerId: number,
    method: string,
    fightResultDetails?: string,
  ): Promise<Fight> {
    const fight = await this.fightsRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }

    const winner = await this.fighterRepository.findOne({
      where: { id: winnerId },
      relations: ['weightClass'],
    });
    if (!winner) {
      throw new NotFoundException(`Fighter with ID ${winnerId} not found`);
    }

    fight.winner = winner;
    fight.method = method;
    if (fightResultDetails !== undefined) {
      fight.fightResultDetails = fightResultDetails;
    }

    const updatedFight = await this.fightsRepository.save(fight);

    await this.rankingsService.updateRankings(updatedFight);

    return updatedFight;
  }
}
