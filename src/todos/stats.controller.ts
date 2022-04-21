import { Controller, Get, Query } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getStats(
    @Query('categoryId') category: string,
    @Query('archive') archive: boolean,
  ) {
    return this.todosService.getStats(category, archive);
  }
}
