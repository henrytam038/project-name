import { applyDecorators, UseGuards } from '@nestjs/common';
import { AppEngineCronValidatedGuard } from './app-engine-cron-validated.guard';

export function AppEngineCronValidated() {
  return process.env.NODE_ENV == 'production'
    ? applyDecorators(UseGuards(AppEngineCronValidatedGuard))
    : applyDecorators();
}
