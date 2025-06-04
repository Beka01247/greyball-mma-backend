import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './entities/ranking.entity';
import { Fight } from '../fights/entities/fight.entity';
import { Fighter } from '../fighter/entities/fighter.entity';
import { WeightClass } from '../weight-classes/entities/weight-class.entity';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Ranking)
    private rankingsRepository: Repository<Ranking>,
    @InjectRepository(Fighter)
    private fightersRepository: Repository<Fighter>,
  ) {}

  private calculateVictoryCoefficient(method: string): number {
    switch (method.toLowerCase()) {
      case 'ko':
      case 'tko':
      case 'submission':
        return 1.2;
      case 'unanimous decision':
        return 1.5;
      case 'split decision':
      case 'majority decision':
        return 1.1;
      case 'disqualification':
        return 1.0;
      default:
        return 1.0;
    }
  }

  private async getOrCreateRanking(
    fighter: Fighter,
    weightClass: WeightClass,
  ): Promise<Ranking> {
    let ranking = await this.rankingsRepository.findOne({
      where: {
        fighter: { id: fighter.id },
        weightClass: { id: weightClass.id },
      },
      relations: ['fighter', 'weightClass'],
    });

    if (!ranking) {
      ranking = this.rankingsRepository.create({
        fighter,
        weightClass,
        points: 0.01, // Base points
        consecutiveWins: 0,
        consecutiveLosses: 0,
        lastFightDate: new Date(),
      });
    }

    return ranking;
  }

  private async calculateCategoryAveragePoints(
    weightClassId: number,
  ): Promise<number> {
    const rankings = await this.rankingsRepository.find({
      where: { weightClass: { id: weightClassId } },
    });

    if (!rankings.length) return 0.021; // Default average if no rankings exist

    const totalPoints = rankings.reduce((sum, rank) => sum + Number(rank.points), 0);
    return totalPoints / rankings.length;
  }

  async updateRankings(fight: Fight): Promise<void> {
    const winner = fight.winner;
    const loser = fight.fighter1.id === winner.id ? fight.fighter2 : fight.fighter1;
    const weightClass = winner.weightClass;

    if (!weightClass) {
      return; // Skip if no weight class
    }

    const categoryAvgPoints = await this.calculateCategoryAveragePoints(
      weightClass.id,
    );

    // Get or create rankings
    const winnerRanking = await this.getOrCreateRanking(winner, weightClass);
    const loserRanking = await this.getOrCreateRanking(loser, weightClass);

    // Calculate victory coefficient
    const victoryCoeff = this.calculateVictoryCoefficient(fight.method);
    
    // Calculate performance bonus (1.3 if it was performance of the night)
    const performanceBonus = fight.fightResultDetails.includes('Performance of the Night')
      ? 1.3
      : 1.0;

    // Calculate winning streak bonus
    winnerRanking.consecutiveWins++;
    winnerRanking.consecutiveLosses = 0;
    const streakBonus = 1 + 0.005 * winnerRanking.consecutiveWins;

    // Calculate points gained
    let pointsGained = categoryAvgPoints * 0.5; // Base points for activity
    pointsGained += loserRanking.points * 0.5; // 50% of opponent's points
    pointsGained *= victoryCoeff * performanceBonus * streakBonus;

    // Update winner's points
    winnerRanking.points += pointsGained;
    winnerRanking.lastFightDate = fight.fightDate;

    // Update loser's ranking
    loserRanking.consecutiveLosses++;
    loserRanking.consecutiveWins = 0;
    const lossStreak = 1 + 0.005 * loserRanking.consecutiveLosses;
    const pointsLost = categoryAvgPoints * 0.1 * lossStreak;
    loserRanking.points = Math.max(0.01, loserRanking.points - pointsLost);
    loserRanking.lastFightDate = fight.fightDate;

    // Save rankings
    await Promise.all([
      this.rankingsRepository.save(winnerRanking),
      this.rankingsRepository.save(loserRanking),
    ]);
  }
}