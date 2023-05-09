import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { getAverageCriteria } from '../utils/getAverageCriteria';
import { UsersService } from '../users/users.service';
import { getLockTime } from '../utils/getLockTime';
import { Importances } from 'src/constants/importances';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private usersRepository: Repository<Employee>,
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private subdivisionService: SubdivisionService,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Employee[]> {
    const employees: Employee[] = await this.usersRepository.find();
    const res: Employee[] = [];
    for (const item of employees) {
      const a = await this.findOne(item.id);
      res.push(a);
    }
    return res;
  }

  async findOne(id: number, username?: string): Promise<Employee> {
    const employeeDto: Employee = await this.usersRepository.findOneBy({ id });

    // получение данных пользователя под которым мы авторизованы
    const user = await this.usersService.findOne(username);

    if (!employeeDto) {
      throw new HttpException(
        'Employee not found. Cannot get employee.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const assessmentDto: Assessment[] = await this.assessmentRepository.findBy({
      idToEmployee: id,
    });

    const subdivisionDto: Subdivision = await this.subdivisionService.findOne(
      employeeDto.subdivisionId,
    );

    const lastAssArray = assessmentDto.slice();
    lastAssArray.pop();

    employeeDto.password = undefined;
    employeeDto.subdivisionId = undefined;
    const lastAssessment = getCurrentAssessment(lastAssArray);
    const employeeCurrentAssessment = getCurrentAssessment(assessmentDto);

    // подсчет времени, с последний оценки от авторизированого пользователя
    const assessmentsFromMe = assessmentDto.filter(
      (item) => item.idFromEmployee === user.userId,
    );
    employeeDto.lockTime = getLockTime(assessmentsFromMe);

    return {
      ...employeeDto,
      subdivision: subdivisionDto,
      assessment: assessmentDto,
      assessmentsCount: assessmentDto.length,
      delta: lastAssessment <= employeeCurrentAssessment ? 'up' : 'down',
      employeeCurrentAssessment,
      averageRespect: getAverageCriteria(
        assessmentDto.map((item) => item.respect, Importances.respect),
      ),
      averageResultWork: getAverageCriteria(
        assessmentDto.map((item) => item.resultWork, Importances.resultWork),
      ),
      averageQualityWork: getAverageCriteria(
        assessmentDto.map((item) => item.qualityWork, Importances.qualityWork),
      ),
      averageTeamWork: getAverageCriteria(
        assessmentDto.map((item) => item.teamWork, Importances.teamWork),
      ),
      averageInformation: getAverageCriteria(
        assessmentDto.map((item) => item.information, Importances.information),
      ),
      averageSpeed: getAverageCriteria(
        assessmentDto.map((item) => item.speed),
        Importances.speed,
      ),
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
