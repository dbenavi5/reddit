import { MikroORM } from '@mikro-orm/core';
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import path from "path";
import { User } from './entities/User';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post,User],
    dbName: 'redditclone',
    type: 'postgresql',
    debug: !__prod__,
    allowGlobalContext: true
} as Parameters<typeof MikroORM.init>[0];