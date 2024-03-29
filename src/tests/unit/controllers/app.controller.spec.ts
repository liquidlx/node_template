import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../controllers/app.controller';
import { AppService } from '../../../services/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello from users service!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello from users service!');
    });
  });
});
