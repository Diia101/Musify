create type user_role as enum ('ADMIN', 'REGULAR');

alter table users
drop
column role_id;

alter table users
    add column if not exists user_type user_role
    default 'REGULAR';

UPDATE users
SET user_type = 'REGULAR'
WHERE user_type IS NULL;

ALTER TABLE users
    ALTER COLUMN user_type SET NOT NULL;

ALTER TABLE users ALTER COLUMN user_type SET DEFAULT 'REGULAR';

SELECT user_id, firstname, user_type FROM users WHERE user_type IS NULL;

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'users';


ALTER TABLE users
    ALTER COLUMN user_type SET DEFAULT 'REGULAR';

UPDATE users
SET user_type = 'REGULAR'
WHERE user_type IS NULL;

ALTER TABLE users
    ALTER COLUMN user_type SET NOT NULL;

drop table roles;