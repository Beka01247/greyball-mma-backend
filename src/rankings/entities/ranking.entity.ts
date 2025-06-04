import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fighter } from '../../fighter/entities/fighter.entity';
import { WeightClass } from '../../weight-classes/entities/weight-class.entity';

@ObjectType()
@Entity('ranking')
export class Ranking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  fighter: Fighter;

  @Field(() => WeightClass)
  @ManyToOne(() => WeightClass)
  weightClass: WeightClass;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 4 })
  points: number;

  @Field(() => Int)
  @Column({ default: 0 })
  consecutiveWins: number;

  @Field(() => Int)
  @Column({ default: 0 })
  consecutiveLosses: number;

  @Field()
  @Column()
  lastFightDate: Date;

  @Field(() => Boolean)
  @Column({ default: false })
  isFormerChampion: boolean;
}