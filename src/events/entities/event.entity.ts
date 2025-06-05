import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Fight } from '../../fights/entities/fight.entity';

@ObjectType()
@Entity('event')
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  eventDate: Date;

  @Field(() => [Fight])
  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[];
}
