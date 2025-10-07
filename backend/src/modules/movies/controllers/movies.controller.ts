import { Controller, Get, Query, Logger } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { MoviesService } from '../services/movies.service';
import { ValidationService } from '../../../common/validation/validation.service';
import { MoviesSearchResponseDto } from '../dtos/search-movies-response.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  private readonly logger = new Logger(MoviesController.name);

  constructor(
    private readonly moviesService: MoviesService,
    private readonly validationService: ValidationService,
  ) {}

  @Get('search')
  @ApiOperation({
    summary: 'Search movies',
    description: 'Search for movies using the OMDb API. Results are cached for 24 hours.',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query (min 2 characters, max 100 characters)',
    example: 'batman',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Movies found successfully',
    type: MoviesSearchResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid search query',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid OMDb API key',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests to OMDb API',
  })
  @ApiResponse({
    status: 503,
    description: 'OMDb API service unavailable',
  })
  async searchMovies(@Query('q') query: string) {
    this.logger.log(`Search request for: "${query}"`);
    
    this.validationService.validateSearchQuery(query);

    const movies = await this.moviesService.searchMovies(query);

    const response = {
      success: true,
      data: movies,
      count: movies.length,
      query: query,
      message:
        movies.length === 0
          ? `No movies found for "${query}"`
          : `Found ${movies.length} movies for "${query}"`,
    };

    this.logger.log(`Search completed: ${response.message}`);
    return response;
  }
}