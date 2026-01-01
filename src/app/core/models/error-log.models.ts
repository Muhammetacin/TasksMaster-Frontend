export interface ErrorResponseDto {
  timestamp: Date;
  statusCode: number;
  message: string;
  details?: string;
  traceId?: string;
}