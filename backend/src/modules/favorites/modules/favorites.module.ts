import { Module } from '@nestjs/common';
import { FavoritesController } from '../controllers/favorites.controller';
import { FavoritesService } from '../services/favorites.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from '../entities/favorite.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
