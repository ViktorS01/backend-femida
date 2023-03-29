import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { Subdivision } from '../typeorm/entities/subdivision.entity';

@Injectable()
export class SubdivisionService {
  constructor(
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
  ) {}

  findAll(): Promise<Subdivision[]> {
    return this.subdivisionRepository.find();
  }

  findOne(id: number): Promise<Subdivision> {
    return this.subdivisionRepository.findOneBy({ id });
  }

  async create(subdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    const newSubdivision = await this.subdivisionRepository.create(
      subdivisionDto,
    );
    return await this.subdivisionRepository.save(newSubdivision);
  }

  async remove(id: number): Promise<DeleteResult> {
    const subdivision = await this.subdivisionRepository.findOneBy({ id });
    if (!subdivision) {
      throw new HttpException(
        'Subdivision not found. Cannot delete subdivision.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.subdivisionRepository.delete(id);
  }

  async update(
    id: number,
    subdivisionDto: CreateSubdivisionDto,
  ): Promise<UpdateResult> {
    const subdivision = await this.subdivisionRepository.findOneBy({ id });
    if (!subdivision) {
      throw new HttpException(
        'Subdivision not found. Cannot update subdivision.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.subdivisionRepository.update(id, subdivisionDto);
  }
}
