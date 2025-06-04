import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { HelloResolver } from './hello.resolver';
import { WeightClassesModule } from './weight-classes/weight-classes.module';
import { FightersModule } from './fighter/fighter.module';
import { FightsModule } from './fights/fights.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'greyball-user',
      password: 'password',
      database: 'greyball_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    WeightClassesModule,
    FightersModule,
    FightsModule,
    EventsModule,
  ],
  providers: [HelloResolver],
})
export class AppModule {}
