## Description

42CTF NestJS backend application.

## Installation

```bash
yarn install
```

## Make migration

```bash
yarn typeorm migration:generate -n EntityNameMigration -d src/module-name/entities/migrations
```

## Running migration

```bash
yarn migration:run
```

## Running the app

```bash
# development
make dev-server
```
