import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    forwardRef(()=> AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
