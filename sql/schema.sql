drop table users CASCADE;
drop table employees CASCADE;
drop table admins CASCADE;

create table users (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    otp  TEXT NOT NULL
);

create table employees (
    id SERIAL,
    foreign key(id) references users(id)
);

create table admins (
	id SERIAL,
	foreign key(id) references users(id)
);
