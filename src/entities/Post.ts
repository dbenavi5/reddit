import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
    [OptionalProps]?: 'title' | 'createdAt' | 'updatedAt';
    @Field(() => Int)
    @PrimaryKey()
    id!: number; // string is also supported

    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updateAt = new Date();

    @Field()
    @Property({ type: "text" })
    title!: string;
}