import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Fight } from 'src/fights/entities/fight.entity';

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

  // One Event → many Fights
  @Field(() => [Fight])
  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[];
}
