import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['fights'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['fights'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(
    name: string,
    location: string,
    eventDate: string,
  ): Promise<Event> {
    const event = this.eventsRepository.create({
      name,
      location,
      eventDate: new Date(eventDate),
    });
    return this.eventsRepository.save(event);
  }
}
