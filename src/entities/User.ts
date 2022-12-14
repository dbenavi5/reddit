import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    [OptionalProps]?: 'title' | 'createdAt' | 'updatedAt';
    @Field()
    @PrimaryKey()
    id!: number; // string is also supported

    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updateAt = new Date();

    @Field()
    @Property({ type: "text", unique: true })
    username!: string;
    
    @Property({ type: "text" })
    password!: string;
}