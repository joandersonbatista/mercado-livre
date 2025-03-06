import { Controller, Get } from '@nestjs/common';
import { GetPopularKeywordsCommand } from 'src/domain/command/get-popular-keywords-command';
import { PopularKeywordsDTO } from 'src/dtos/popular-keywords';

@Controller('/keywords')
export class KeywordsController {
  constructor(
    private readonly getPopularKeywordsCommand: GetPopularKeywordsCommand,
  ) {}

  @Get()
  getPopularKeywords(): PopularKeywordsDTO {
    return this.getPopularKeywordsCommand.execute();
  }
}
