include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	mkdir -p ./docker-data
	docker-compose up -d postgres
	yarn start:dev

undo-migrations:
	mkdir -p ./docker-data
	docker-compose up -d postgres
	yarn typeorm migration:revert

migration:
	mkdir -p ./docker-data
	docker-compose up -d postgres
	yarn typeorm migration:run
