import { MikroORM } from '@mikro-orm/core';
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import path from "path";


// console.log('__dirname: ', __dirname);
export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        // pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post],
    dbName: 'redditclone',
    type: 'postgresql',
    debug: !__prod__,
    allowGlobalContext: true
} as Parameters<typeof MikroORM.init>[0];