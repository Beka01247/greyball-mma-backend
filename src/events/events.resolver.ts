import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event], { name: 'allEvents' })
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'eventById' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event)
  createEvent(
    @Args('name') name: string,
    @Args('location') location: string,
    @Args('eventDate', { type: () => String }) eventDate: string,
  ): Promise<Event> {
    return this.eventsService.create(name, location, eventDate);
  }
}
