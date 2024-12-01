import { Controller, Get, Header, Res } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import { Response } from 'express';
import { join } from 'node:path';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { NoTransformResponse } from './common/decorator/no-transform-response.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Header('Content-Type', 'application/x-yaml')
  @Get('api-docs/bundled.yaml')
  @NoTransformResponse()
  async getOpenApi() {
    const fullPath = join(__dirname, '../openapi/bundled.yaml');
    const yamlContent = yaml.load(readFileSync(fullPath, 'utf8'));
    return yaml.dump(yamlContent);
  }

  @Public()
  @Get('api-docs')
  getApiDocs(@Res() res: Response) {
    res.sendFile(join(__dirname, '../openapi/redoc.html'));
  }
}
