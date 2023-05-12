import {  Controller, Delete, Get, Param, Post, Request } from "@nestjs/common";
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAllItems(@Request() req) {
    return this.cartService.findAll(req.user);
  }

  @Post('add_item/:id')
  async addItem(@Param('id') productId: number, @Request() req) {
    return this.cartService.addItem(productId, req.user);
  }

  @Delete('remove-item/:id')
  async removeItem(@Param('id') itemId: number, @Request()  req) {
    return this.cartService.removeOne(+itemId, req.user);
  }
}
