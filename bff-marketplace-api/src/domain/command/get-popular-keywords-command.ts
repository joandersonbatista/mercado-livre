import { MarketplaceService } from '../services/marketplace-service';
import { PopularKeywordsDTO } from 'src/dtos/popular-keywords';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetPopularKeywordsCommand {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  execute(): PopularKeywordsDTO {
    const popularKeywords = this.marketplaceService.popularKeywords();

    return { keywords: popularKeywords };
  }
}
