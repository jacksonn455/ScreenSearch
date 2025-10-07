import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class AppHttpException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    private readonly code?: string,
  ) {
    super({ message, code }, status);
  }
}

export class NotFoundException extends AppHttpException {
  constructor(message: string = 'Resource not found', code?: string) {
    super(message, HttpStatus.NOT_FOUND, code);
  }
}

export class UnauthorizedException extends AppHttpException {
  constructor(message: string = 'Unauthorized', code?: string) {
    super(message, HttpStatus.UNAUTHORIZED, code);
  }
}

export class ForbiddenException extends AppHttpException {
  constructor(message: string = 'Forbidden', code?: string) {
    super(message, HttpStatus.FORBIDDEN, code);
  }
}

export class BadRequestException extends AppHttpException {
  constructor(message: string = 'Bad request', code?: string) {
    super(message, HttpStatus.BAD_REQUEST, code);
  }
}

export class ConflictException extends AppHttpException {
  constructor(message: string = 'Conflict', code?: string) {
    super(message, HttpStatus.CONFLICT, code);
  }
}

export class TooManyRequestsException extends AppHttpException {
  constructor(message: string = 'Too many requests', code?: string) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, code);
  }
}

export class ServiceUnavailableException extends AppHttpException {
  constructor(message: string = 'Service unavailable', code?: string) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, code);
  }
}

export class InternalServerErrorException extends AppHttpException {
  constructor(message: string = 'Internal server error', code?: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code);
  }
}
