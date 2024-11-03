import { Controller, Get, Header, Res } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { Response } from 'express';
import { join } from 'node:path';
import { mergeYamlFiles } from 'openapi';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

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
  @Get('api-docs/openapi.yaml')
  async getOpenApi() {
    const mergedYaml = await mergeYamlFiles();
    return yaml.dump(mergedYaml);
  }

  @Public()
  @Get('api-docs')
  getApiDocs(@Res() res: Response) {
    res.sendFile(join(__dirname, '../openapi/redoc.html'));
  }
}
