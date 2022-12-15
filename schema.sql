drop table users CASCADE;
drop table employees CASCADE;
drop table admins CASCADE;

create table users (
    name varchar(255),
    pass varchar(255),

    primary key(name)
);

create table employees (
    name numeric(13, 0),
    foreign key(name) references users(name)
);
