include .env

IMAGE=podcodar-web
TAG=dev

.PHONY: all build

all: build

.DEFAULT_GOAL=help

build-image: ## Build the project image
	@docker build -f Dockerfile -t $(IMAGE):$(TAG) .
	@make install

build-fresh-image: ## Build the project image without cache
	@docker build --no-cache -f Dockerfile -t $(IMAGE):$(TAG) .
	@make install

install: ## Install project dependencies
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name web_install \
	$(IMAGE):$(TAG) yarn install

dev: ## Start development environment
	@docker compose up

build: ## Build the project, either using Docker or Yarn directly
	@if [ "$(USE_DOCKER)" = "true" ]; then \
		docker run --rm \
		-v $(PWD):/app \
		-it \
		--name web_install \
		$(IMAGE):$(TAG) yarn build; \
	else \
		yarn build; \
	fi

help: ## Show this help.
# `help' function obtained from GitHub gist: https://gist.github.com/prwhite/8168133?permalink_comment_id=4160123#gistcomment-4160123
	@echo Devopness Web App - Dev environment
	@echo
	@awk 'BEGIN {FS = ": .*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% 0-9a-zA-Z_-]+(\\:[$$()% 0-9a-zA-Z_-]+)*:.*?##/ { gsub(/\\:/,":", $$1); printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
