import { ObjectType, Field, Int } from '@nestjs/graphql';
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

    // @OneToMany(() => Property, property => property.user)
    // @Field(() => [Property], { nullable: true })
    // properties?: Property[];


    // @OneToMany(()=> Favorite, favorite => favorite.user)
    // favorites?: Favorite[];

    @Column()
    @Field()
    createdAt: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}
