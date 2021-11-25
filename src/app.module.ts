import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(),'src/schema.gql')}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'homelike_user',
      password: 'homelike_password',
      database: 'homelike',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
