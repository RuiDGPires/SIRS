# Database

## First time setup

Run

```sh
./scripts/setup.sh
```

## Next times, run when booting up:

```sh
./scripts/setup.sh --skip-install
```

## Reset the Database

Usar a pass: **sirsebuefixe**
```sh
./scripts/db.sh
>>> \i sql/schema.sql
>>> \i sql/populate.sql
>>> \q
```
