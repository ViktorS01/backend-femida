import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'a@test.com',
      password: 'rootroot',
    },
    {
      userId: 2,
      username: 'b@test.com',
      password: 'rootroot',
    },
    {
      userId: 3,
      username: 'c@test.com',
      password: 'rootroot',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
