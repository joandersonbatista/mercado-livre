import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { GetItemCommand } from 'src/domain/command/get-item-command';
import { ListItemsCommand } from 'src/domain/command/list-items-command';
import { ItemDTO } from 'src/dtos/item-dto';
import { ListItemsDTO } from 'src/dtos/list-items-dto';

@Controller('/items')
export class ItemsController {
  constructor(
    private readonly getItemCommand: GetItemCommand,
    private readonly listItemsCommand: ListItemsCommand,
  ) {}

  @Get()
  async getItems(
    @Query('search') search: string,
    @Headers('x-user-location') userLocation: string,
  ): Promise<ListItemsDTO> {
    return await this.listItemsCommand.execute(search, userLocation);
  }

  @Get(':id')
  async getItem(
    @Param('id') id: string,
    @Headers('x-user-location') userLocation: string,
  ): Promise<ItemDTO> {
    return await this.getItemCommand.execute(id, userLocation);
  }
}
