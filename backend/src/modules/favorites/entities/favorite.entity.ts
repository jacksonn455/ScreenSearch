//
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  imdbID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: string;

  @Prop()
  poster: string;

  @Prop({ type: Object })
  movieData: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.index({ userId: 1, imdbID: 1 }, { unique: true });
