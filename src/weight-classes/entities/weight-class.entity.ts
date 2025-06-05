import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from '../../fighter/entities/fighter.entity';

@ObjectType()
@Entity({ name: 'weight_class' })
export class WeightClass {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  minWeight: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  maxWeight: number;

  @Field(() => [Fighter], { nullable: 'itemsAndList' })
  @OneToMany(() => Fighter, (fighter) => fighter.weightClass)
  fighters: Fighter[];
}
