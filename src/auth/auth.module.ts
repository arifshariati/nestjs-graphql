import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { devConfig } from 'src/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
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
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
