"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221101064225 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221101064225 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20221101064225 = Migration20221101064225;
//# sourceMappingURL=Migration20221101064225.js.map