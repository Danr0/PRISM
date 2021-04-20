include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	mkdir -p ./docker-data
	docker-compose up -d sample-postgres
	yarn dev