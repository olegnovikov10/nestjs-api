import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moongose, { Document, Types, ObjectId } from 'mongoose';
import { Category } from './categories.schema';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  archive: boolean;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: moongose.Schema.Types.ObjectId, ref: 'Category' })
  category: ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
