import { Injectable } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ImageService {
  constructor(
    private employeeService: EmployeeService,
    private usersService: UsersService,
  ) {}

  async uploadAvatar(fileName: string, userName: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    await this.employeeService.update(user.userId, { avatarImage: fileName });
  }

  async uploadCard(fileName: string, userName: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    await this.employeeService.update(user.userId, { cardImage: fileName });
  }

  async uploadProfile(fileName: string, userName: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    await this.employeeService.update(user.userId, { profileImage: fileName });
  }
}
