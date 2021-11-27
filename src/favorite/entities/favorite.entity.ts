import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Property } from 'src/property/entities/property.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  propertyId: string;

  @ManyToOne(() => User, user => user.favorites)
  @Field(() => User)
  user: User;

  @ManyToMany(() => Property, property => property.favorites)
  @Field(() => Property)
  property: Property;
}
