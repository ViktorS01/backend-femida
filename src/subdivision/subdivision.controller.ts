import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubdivisionService } from './subdivision.service';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';

@Controller('subdivision')
export class SubdivisionController {
  constructor(private subdivisionService: SubdivisionService) {}

  @Get()
  getAll() {
    return this.subdivisionService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.subdivisionService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() subdivision: CreateSubdivisionDto) {
    this.subdivisionService.create(subdivision);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.subdivisionService.remove(id);
  }
  @Put(':id')
  update(@Body() subdivision: CreateSubdivisionDto, @Param('id') id: number) {
    this.subdivisionService.update(id, subdivision);
  }
}
