import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class AppEngineCronValidatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest<Request>();

    return _.has(request.headers, 'x-appengine-cron');
  }
}
