import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/controller/app.controller';
import { MarketplaceService } from './domain/services/marketplace-service';
import { MercadoLivreMarketplaceService } from './infrastructure/services/mercado-livre-marketplace.service';
import { CurrencyService } from './domain/services/currency-service';
import { ConfigModule } from '@nestjs/config';
import { ListItemsCommand } from './domain/command/list-items-command';
import { GetPopularKeywordsCommand } from './domain/command/get-popular-keywords-command';
import { GetItemCommand } from './domain/command/get-item-command';
import { ItemsController } from './infrastructure/controller/items.controller';
import { KeywordsController } from './infrastructure/controller/keywords.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, KeywordsController, ItemsController],
  providers: [
    CurrencyService,
    ListItemsCommand,
    GetPopularKeywordsCommand,
    GetItemCommand,
    { provide: MarketplaceService, useClass: MercadoLivreMarketplaceService },
  ],
})
export class AppModule {}
