drop table clients CASCADE;
drop table employees CASCADE;
drop table admins CASCADE;
drop table locked_bikes CASCADE;
drop table users CASCADE;
drop table bikes CASCADE;

create table users (
    id SERIAL PRIMARY KEY,
    secret  TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
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
    latitude FLOAT,
    longitude FLOAT,
    rightly_parked BOOLEAN
);

create table locked_bikes (
    id SERIAL,
    locked_by SERIAL,
	foreign key(id) references bikes(id),
	foreign key(locked_by) references users(id)
)
