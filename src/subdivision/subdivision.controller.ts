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
  UseGuards,
} from '@nestjs/common';
import { SubdivisionService } from './subdivision.service';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('subdivision')
export class SubdivisionController {
  constructor(private subdivisionService: SubdivisionService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.subdivisionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.subdivisionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() subdivision: CreateSubdivisionDto) {
    this.subdivisionService.create(subdivision);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.subdivisionService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Body() subdivision: CreateSubdivisionDto, @Param('id') id: number) {
    this.subdivisionService.update(id, subdivision);
  }
}
