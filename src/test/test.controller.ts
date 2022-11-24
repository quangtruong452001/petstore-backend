import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  testGet() {
    return 'Test GET';
  }

  @Post()
  testPost() {
    return 'Test POST';
  }

  @Patch()
  testPatch() {
    return 'Test PATCH';
  }

  @Delete()
  testDelete() {
    return 'testDELETE';
  }
}
