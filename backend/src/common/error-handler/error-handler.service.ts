import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import {
  UnauthorizedException,
  TooManyRequestsException,
  BadRequestException,
  ServiceUnavailableException,
  InternalServerErrorException,
} from '../exceptions/app.exceptions';

@Injectable()
export class ErrorHandlerService {
  private readonly logger = new Logger(ErrorHandlerService.name);

  handleHttpError(error: AxiosError, context?: string): never {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      const errorMessage = data?.Error || data?.message || 'Unknown error';

      this.logger.error(`HTTP Error ${status} in ${context}: ${errorMessage}`);

      switch (status) {
        case 400:
          throw new BadRequestException(
            this.formatErrorMessage(errorMessage, context),
          );
        case 401:
          throw new UnauthorizedException(
            this.formatErrorMessage(errorMessage, context),
          );
        case 403:
          throw new UnauthorizedException(
            this.formatErrorMessage(errorMessage, context),
          );
        case 429:
          throw new TooManyRequestsException(
            this.formatErrorMessage(errorMessage, context),
          );
        case 500:
        case 502:
        case 503:
          throw new ServiceUnavailableException(
            this.formatErrorMessage(errorMessage, context),
          );
        default:
          throw new InternalServerErrorException(
            this.formatErrorMessage(errorMessage, context),
          );
      }
    }

    if (error.request) {
      this.logger.error(
        `No response from service in ${context}: ${error.message}`,
      );
      throw new ServiceUnavailableException(
        this.formatErrorMessage('No response from service', context),
      );
    }

    this.logger.error(`Unknown error in ${context}: ${error.message}`);
    throw new InternalServerErrorException(
      this.formatErrorMessage('Unknown error occurred', context),
    );
  }

  handleApiError(response: any, context?: string): void {
    if (response.Response === 'False' && response.Error) {
      const errorMessage = response.Error.toLowerCase();

      if (
        errorMessage.includes('not found') ||
        errorMessage.includes('no results')
      ) {
        return;
      }

      this.logger.warn(`OMDB API error in ${context}: ${response.Error}`);

      if (errorMessage.includes('invalid api key')) {
        throw new UnauthorizedException(
          this.formatErrorMessage(response.Error, context),
        );
      } else if (errorMessage.includes('too many results')) {
        throw new BadRequestException(
          this.formatErrorMessage(response.Error, context),
        );
      } else {
        throw new BadRequestException(
          this.formatErrorMessage(response.Error, context),
        );
      }
    }
  }

  private formatErrorMessage(message: string, context?: string): string {
    return context ? `[${context}] ${message}` : message;
  }
}
