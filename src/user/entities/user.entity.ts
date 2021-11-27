import { ObjectType, Field } from '@nestjs/graphql';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Property } from 'src/property/entities/property.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    country?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    city?: string;

    @OneToMany(() => Property, property => property.user)
    @Field(() => [Property], { nullable: true })
    properties?: Property[];


    @OneToMany(()=> Favorite, favorite => favorite.user)
    @Field(() => [Favorite], { nullable: true })
    favorites?: Favorite[];

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}
