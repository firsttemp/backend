import { Body, Controller, Delete, Get, Param, Post, Request } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { OrderCreateDto } from "./dto/order-create.dto";

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async findAll(@Request() req) {
    return this.orderService.find(req.user);
  }

  @Post()
  async create(@Body() dto: OrderCreateDto, @Request() req) {
    return this.orderService.create(dto,  req.user)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderService.remove(id)
  }

}
