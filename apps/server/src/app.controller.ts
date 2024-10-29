import { Controller, Get, Header, Res } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { Response } from 'express';
import { join } from 'node:path';
import { mergeYamlFiles } from 'openapi';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Header('Content-Type', 'application/x-yaml')
  @Get('api-docs/openapi.yaml')
  async getOpenApi() {
    const mergedYaml = await mergeYamlFiles();
    return yaml.dump(mergedYaml);
  }

  @Get('api-docs')
  getApiDocs(@Res() res: Response) {
    res.sendFile(join(__dirname, '../openapi/redoc.html'));
  }
}
