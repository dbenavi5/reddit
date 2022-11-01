import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import config from './mikro-orm.config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './rersolvers/hello';
import { PostResolver } from './rersolvers/post';
import { UserResolver } from './rersolvers/user';

const main = async () => {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver,UserResolver],
            validate: false
        }),
        context: () => ({em: orm.em })
    })
    // added this line
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started http://localhost:4000')
    })

}

main().catch((err) => {
    console.log(err)
});