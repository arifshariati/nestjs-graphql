import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Property {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column()
  @Field()
  rooms: number;

  @Column()
  @Field()
  rent: number;

  @ManyToOne(() => User, user => user.properties)
  @Field(() => User)
  user: User;

  @OneToMany(() => Favorite, favorite => favorite.property)
  favorites: Favorite[];

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date;
}