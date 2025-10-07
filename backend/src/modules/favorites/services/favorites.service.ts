import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from '../entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {}

  async addFavorite(
    userId: string,
    movieData: {
      imdbID: string;
      title: string;
      year: string;
      poster?: string;
    },
  ): Promise<Favorite> {
    try {
      const existingFavorite = await this.favoriteModel.findOne({
        userId,
        imdbID: movieData.imdbID,
      });

      if (existingFavorite) {
        throw new ConflictException('Movie already in favorites');
      }

      const favorite = new this.favoriteModel({
        userId,
        imdbID: movieData.imdbID,
        title: movieData.title,
        year: movieData.year,
        poster: movieData.poster,
        movieData,
      });

      const savedFavorite = await favorite.save();
      this.logger.log(`Movie ${movieData.imdbID} added to favorites for user ${userId}`);

      return savedFavorite;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Movie already in favorites');
      }
      throw error;
    }
  }

  async removeFavorite(userId: string, imdbID: string): Promise<void> {
    const result = await this.favoriteModel.deleteOne({ userId, imdbID });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Favorite not found');
    }
    
    this.logger.log(`Movie ${imdbID} removed from favorites for user ${userId}`);
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    this.logger.log(`Found ${favorites.length} favorites for user ${userId}`);
    return favorites;
  }

  async getFavoriteById(userId: string, imdbID: string): Promise<Favorite> {
    const favorite = await this.favoriteModel.findOne({ 
      userId, 
      imdbID 
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${imdbID} not found`);
    }

    this.logger.log(`Found favorite: ${imdbID} for user ${userId}`);
    return favorite;
  }

  async isMovieFavorite(userId: string, imdbID: string): Promise<boolean> {
    const favorite = await this.favoriteModel.findOne({ userId, imdbID });
    return !!favorite;
  }
}