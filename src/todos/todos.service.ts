import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model, Types, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/categories.schema';

import { CreateCatDto } from './dto/create-category.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(Category.name) private catModel: Model<CategoryDocument>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  createCat(createCatDto: CreateCatDto) {
    const newCat = new this.catModel(createCatDto);
    return newCat.save();
  }

  async getAllCat(): Promise<Category[]> {
    return this.catModel.find().exec();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string) {
    return this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  async remove(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndRemove(id);
  }

  async getStats(category: string, archive: boolean) {
    const countCat = this.todoModel
      .find()
      .where({ category: category, archive: archive })
      .count();
    return countCat;
  }
}
