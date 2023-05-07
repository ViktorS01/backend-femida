import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private usersRepository: Repository<Employee>,
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
  ) {}

  async findAll(): Promise<Employee[]> {
    const employees: Employee[] = await this.usersRepository.find();
    const res: Employee[] = [];
    for (const item of employees) {
      const subdivisionDto: Subdivision =
        await this.subdivisionRepository.findOneBy({
          id: item.subdivisionId,
        });
      const assessmentDto: Assessment[] =
        await this.assessmentRepository.findBy({
          idToEmployee: item.id,
        });
      res.push({
        ...item,
        subdivision: subdivisionDto,
        assessment: assessmentDto,
        assessmentsCount: assessmentDto.length,
        employeeCurrentAssessment: getCurrentAssessment(assessmentDto),
      });
    }
    return res;
  }

  async findOne(id: number): Promise<Employee> {
    const employeeDto: Employee = await this.usersRepository.findOneBy({ id });
    const assessmentDto: Assessment[] = await this.assessmentRepository.findBy({
      idToEmployee: id,
    });

    employeeDto.subdivisionId = undefined;
    employeeDto.password = undefined;

    const subdivisionDto: Subdivision =
      await this.subdivisionRepository.findOneBy({
        id: employeeDto.subdivisionId,
      });

    return {
      ...employeeDto,
      subdivision: subdivisionDto,
      assessment: assessmentDto,
      assessmentsCount: assessmentDto.length,
      employeeCurrentAssessment: getCurrentAssessment(assessmentDto),
    };
  }

  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = await this.usersRepository.create({
      ...employeeDto,
      createdAt: new Date(),
    });
    return await this.usersRepository.save(newEmployee);
  }

  async remove(id: number): Promise<DeleteResult> {
    const employee = await this.usersRepository.findOneBy({ id });
    if (!employee) {
      throw new HttpException(
        'Employee not found. Cannot delete employee.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.delete(id);
  }

  async update(
    id: number,
    employeeDto: CreateEmployeeDto,
  ): Promise<UpdateResult> {
    const employee = await this.usersRepository.findOneBy({ id });
    if (!employee) {
      throw new HttpException(
        'Employee not found. Cannot update employee.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.update(id, employeeDto);
  }
}
