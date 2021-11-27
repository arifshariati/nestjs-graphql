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

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  propertyId: string;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToMany(() => Property, property => property.favorites)
  property: Property;
}
