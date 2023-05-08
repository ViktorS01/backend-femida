import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../typeorm/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private employeeService: EmployeeService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async findProfile(id: number): Promise<Employee> {
    console.log(this.employeeService.findOne(id));
    return this.employeeService.findOne(id);
  }
}
