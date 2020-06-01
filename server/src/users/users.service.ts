import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'alice',
        password: 'pass',
        role: 'client',
      },
      {
        userId: 2,
        username: 'bob',
        password: 'pass',
        roles: 'desk',
      },
      {
        userId: 3,
        username: 'tom',
        password: 'pass',
        role: 'manager',
      },
      {
        userId: 4,
        username: 'john',
        password: 'pass',
        role: 'admin',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async addUser(username: string, password: string) {
    return;
  }
}
