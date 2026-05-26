import { Test, TestingModule } from '@nestjs/testing';
import { UsersPrivateService } from './users-private.service';

describe('UsersPrivateService', () => {
  let service: UsersPrivateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPrivateService],
    }).compile();

    service = module.get<UsersPrivateService>(UsersPrivateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
