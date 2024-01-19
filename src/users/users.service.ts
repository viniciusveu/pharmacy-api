import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
    {
      id: '3',
      username: 'vinic',
      password: '123456',
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
