// src/modules/favorites/controllers/favorites.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FavoritesService } from '../services/favorites.service';
import { AddFavoriteDto } from '../dtos/add-favorite.dto';
import { FavoriteResponseDto } from '../dtos/favorite-response.dto';
import { FavoritesListResponseDto } from '../dtos/favorites-list-response.dto';
const MOCK_USER_ID = 'user-123';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);

  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({
    summary: 'Add movie to favorites',
    description: 'Add a movie to the user favorites list using IMDb ID',
  })
  @ApiBody({ type: AddFavoriteDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movie successfully added to favorites',
    type: FavoriteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Movie already exists in favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid movie data provided',
  })
  async addFavorite(@Body() movieData: AddFavoriteDto) {
    this.logger.log(`Adding movie to favorites: ${movieData.imdbID}`);
    
    const favorite = await this.favoritesService.addFavorite(
      MOCK_USER_ID,
      movieData,
    );

    return {
      success: true,
      data: favorite,
      message: 'Movie added to favorites',
    };
  }

  @Delete(':imdbID')
  @ApiOperation({
    summary: 'Remove movie from favorites',
    description: 'Remove a movie from favorites by IMDb ID',
  })
  @ApiParam({
    name: 'imdbID',
    description: 'IMDb ID of the movie to remove',
    example: 'tt0372784',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie successfully removed from favorites',
    type: FavoriteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Favorite movie not found',
  })
  async removeFavorite(@Param('imdbID') imdbID: string) {
    this.logger.log(`Removing favorite: ${imdbID}`);
    
    await this.favoritesService.removeFavorite(MOCK_USER_ID, imdbID);

    return {
      success: true,
      message: 'Favorite removed successfully',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all favorite movies',
    description: 'Retrieve all movies in the user favorites list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Favorites retrieved successfully',
    type: FavoritesListResponseDto,
  })
  async getFavorites() {
    this.logger.log('Fetching user favorites');
    
    const favorites = await this.favoritesService.getUserFavorites(MOCK_USER_ID);

    return {
      success: true,
      data: favorites,
      count: favorites.length,
      message: `Found ${favorites.length} favorites`,
    };
  }

  @Get(':imdbID')
  @ApiOperation({
    summary: 'Get specific favorite movie',
    description: 'Retrieve a specific movie from favorites by IMDb ID',
  })
  @ApiParam({
    name: 'imdbID',
    description: 'IMDb ID of the favorite movie',
    example: 'tt0372784',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Favorite movie found successfully',
    type: FavoriteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Favorite movie not found',
  })
  async getFavorite(@Param('imdbID') imdbID: string) {
    this.logger.log(`Fetching favorite: ${imdbID}`);
    
    const favorite = await this.favoritesService.getFavoriteById(MOCK_USER_ID, imdbID);
    
    return {
      success: true,
      data: favorite,
      message: 'Favorite found successfully',
    };
  }
}