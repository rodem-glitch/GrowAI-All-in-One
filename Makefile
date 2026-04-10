# GrowAI All-in-One Platform
# Usage: make <command>

.PHONY: dev build preview clean lint format test install

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

clean:
	rm -rf dist node_modules

lint:
	npm run lint

format:
	npm run format

test:
	npm run test

docker-build:
	docker build -t growai-all-one .

docker-run:
	docker run -p 3000:80 growai-all-one

docker-compose-up:
	docker compose up -d

docker-compose-down:
	docker compose down
