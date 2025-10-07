import { MoviesService } from '../../../../../src/modules/movies/services/movies.service';
import { HttpService } from '@nestjs/axios';
import { ErrorHandlerService } from '../../../../../src/common/error-handler/error-handler.service';
import { ValidationService } from '../../../../../src/common/validation/validation.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { of, throwError } from 'rxjs';
import moviesConfig from '../../../../../src/config/movies/movies.config';
import { Test, TestingModule } from '@nestjs/testing';


describe('MoviesService (unit)', () => {
  let service: MoviesService;
  let httpService: HttpService;
  let cacheManager: any;
  let errorHandler: ErrorHandlerService;
  let validationService: ValidationService;

  const mockConfig = {
    apiUrl: 'https://www.omdbapi.com/',
    apiKey: 'mock-api-key',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: ErrorHandlerService,
          useValue: { handleApiError: jest.fn(), handleHttpError: jest.fn() },
        },
        {
          provide: ValidationService,
          useValue: { validateSearchQuery: jest.fn() },
        },
        {
          provide: CACHE_MANAGER,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
        {
          provide: moviesConfig.KEY,
          useValue: mockConfig,
        },
      ],
    }).compile();

    service = module.get(MoviesService);
    httpService = module.get(HttpService);
    cacheManager = module.get(CACHE_MANAGER);
    errorHandler = module.get(ErrorHandlerService);
    validationService = module.get(ValidationService);
  });

  it('should return cached movies if available', async () => {
    const cachedMovies = [{ Title: 'Inception', imdbID: 'tt1375666', Year: '2010', Poster: 'poster.jpg' }];
    cacheManager.get.mockResolvedValue(cachedMovies);

    const result = await service.searchMovies('Inception');

    expect(validationService.validateSearchQuery).toHaveBeenCalledWith('Inception');
    expect(result).toEqual(cachedMovies);
    expect(httpService.get).not.toHaveBeenCalled();
  });

  it('should fetch from OMDb API and cache result if not cached', async () => {
    cacheManager.get.mockResolvedValue(null);

    const apiResponse = {
      data: {
        Response: 'True',
        Search: [
          { Title: 'Inception', imdbID: 'tt1375666', Year: '2010', Poster: 'poster.jpg' },
        ],
      },
    };

    (httpService.get as jest.Mock).mockReturnValue(of(apiResponse));

    const result = await service.searchMovies('Inception');

    expect(httpService.get).toHaveBeenCalledWith(mockConfig.apiUrl, {
      params: { apikey: mockConfig.apiKey, s: 'Inception' },
    });
    expect(cacheManager.set).toHaveBeenCalled();
    expect(result).toEqual(apiResponse.data.Search);
  });

  it('should return empty array if API says movie not found', async () => {
    cacheManager.get.mockResolvedValue(null);

    const apiResponse = { data: { Response: 'False', Error: 'Movie not found!' } };
    (httpService.get as jest.Mock).mockReturnValue(of(apiResponse));

    const result = await service.searchMovies('UnknownMovie');

    expect(result).toEqual([]);
    expect(cacheManager.set).toHaveBeenCalled();
  });

  it('should handle HTTP error and try cache', async () => {
    // Primeiro mock: cache vazio
    cacheManager.get.mockResolvedValueOnce(null);
    // Segundo mock: cache retorna valor após erro
    cacheManager.get.mockResolvedValueOnce([{ Title: 'Cached', imdbID: 'tt0001', Year: '1999', Poster: 'poster.jpg' }]);

    // Mock do erro HTTP
    (httpService.get as jest.Mock).mockReturnValue(
      throwError(() => ({ message: 'Request failed', response: {} })),
    );

    const result = await service.searchMovies('Inception');

    expect(validationService.validateSearchQuery).toHaveBeenCalledWith('Inception');
    expect(result).toEqual([{ Title: 'Cached', imdbID: 'tt0001', Year: '1999', Poster: 'poster.jpg' }]);
  });
});