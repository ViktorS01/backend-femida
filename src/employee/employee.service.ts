import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private usersRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Employee> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = await this.usersRepository.create({
      ...employeeDto,
      createdAt: new Date(),
    });
    return await this.usersRepository.save(newEmployee);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, employeeDto: CreateEmployeeDto): Promise<void> {
    await this.usersRepository.update(id, employeeDto);
  }
}
