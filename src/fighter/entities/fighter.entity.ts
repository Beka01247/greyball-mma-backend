import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WeightClass } from '../../weight-classes/entities/weight-class.entity';

@ObjectType()
@Entity({ name: 'fighter' })
export class Fighter {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname?: string;

  @Field(() => String)
  @Column({ type: 'date' })
  birthDate: Date;

  @Field()
  @Column()
  nationality: string;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Field(() => WeightClass, { nullable: true })
  @ManyToOne(() => WeightClass, (wc) => wc.fighters, { nullable: true })
  @JoinColumn({ name: 'weightClassId' })
  weightClass?: WeightClass;

  @Field(() => Int)
  @Column({ default: 0 })
  totalWins: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalLosses: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalDraws: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalKnockouts: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalSubmissions: number;
}
