drop table clients CASCADE;
drop table employees CASCADE;
drop table admins CASCADE;
drop table users CASCADE;
drop table bikes CASCADE;

create table users (
    id SERIAL PRIMARY KEY,
    secret  TEXT NOT NULL,
	foreign key(id) references users(id)
);

create table clients (
    id SERIAL UNIQUE,
    name TEXT PRIMARY KEY,
	foreign key(id) references users(id)
);

create table employees (
    id SERIAL UNIQUE,
    name TEXT PRIMARY KEY,
	foreign key(id) references users(id)
);

create table admins (
	id SERIAL UNIQUE,
    name TEXT PRIMARY KEY,
	foreign key(id) references users(id)
);

create table bikes (
    id SERIAL PRIMARY KEY,
    latitude INTEGER,
    longitude INTEGER,
    rightly_parked BOOLEAN
);
