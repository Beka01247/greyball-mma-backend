import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fighter } from 'src/fighter/entities/fighter.entity';
import { Event } from 'src/events/entities/event.entity';

@ObjectType()
@Entity('fight')
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, { nullable: false })
  @JoinColumn({ name: 'fighter1Id' })
  fighter1: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, { nullable: false })
  @JoinColumn({ name: 'fighter2Id' })
  fighter2: Fighter;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winnerId' })
  winner: Fighter;

  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.fights, { nullable: false })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Field()
  @Column()
  fightDate: Date;

  @Field()
  @Column({ nullable: true })
  method: string; // KO, Submission, Decision, etc.

  @Field()
  @Column({ default: '' })
  fightResultDetails: string;
}
