import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { RequiredEntityData } from "@mikro-orm/core";
import argon2 from "argon2";
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User
}
@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [{
          field: 'username',
          message: 'username must be at least 2 characters'
        }]
      }
    }
    if (options.password.length <= 3) {
      return {
        errors: [{
          field: 'password',
          message: 'password must be at least 3 characters'
        }]
      }
    }
    const hashPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashPassword,
    } as RequiredEntityData<User>);
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [{
            field: 'username',
            message: 'username already exists',
          }]
        }
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{
          field: 'username',
          message: 'that user does not exist'
        }]
      }
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{
          field: 'password',
          message: 'invalid login',
        }]
      }
    }
    return { user };
  }
}
