import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { devConfig } from 'src/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    forwardRef(()=> UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          secret: devConfig.jwt.secret,
          signOptions: { expiresIn: devConfig.jwt.expiresIn }
      })
  }),
  ConfigModule
  ],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
