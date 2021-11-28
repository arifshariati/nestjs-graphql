import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(),'src/schema.gql')}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SOURCE === 'LOCAL' ? 'localhost' :'host.docker.internal',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    AuthModule,
    PropertyModule,
    FavoriteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
