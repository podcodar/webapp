ifneq ("$(wildcard .env)","")
    include .env
endif

# If ENV_RUNNER is not set or is empty, we will use 'yarn' as default
RUNNER ?= $(ENV_RUNNER)
RUNNER := $(if $(RUNNER),$(RUNNER),yarn)

IMAGE=podcodar-web
TAG=${RUNNER}-dev

.PHONY: all build-image build-fresh-image check-image run dev build lint lint-staged fmt help

all: build-fresh-image

.DEFAULT_GOAL=help

build-image: ## Build the project image
	@docker build \
	-f Dockerfile-$(RUNNER) \
	-t $(IMAGE):$(TAG) .
	@make install

build-fresh-image: ## Build the project image without using cache
	@docker build \
	--no-cache \
	-f Dockerfile-$(RUNNER) \
	-t $(IMAGE):$(TAG) .
	@make install

check-image: ## Check if the project image exists; if not, build it
	@if [ -z "$$(docker images -q $(IMAGE):$(TAG))" ]; then \
		echo "Image $(IMAGE):$(TAG) does not exist. Building..."; \
		make build-image; \
	else \
		echo "Image $(IMAGE):$(TAG) already exists"; \
	fi

install: check-image ## Install project dependencies
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name $(IMAGE)-install \
	$(IMAGE):$(TAG) \
	$(RUNNER) install

run: check-image ## Run a specified script. e.g.: `make run SCRIPT=decrypt`
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name $(IMAGE)-run \
	$(IMAGE):$(TAG) \
	$(RUNNER) run ${SCRIPT}

dev: check-image ## Start development environment
	@docker compose \
	-f docker-compose-${RUNNER}.yaml up

build: check-image ## Build the project
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name ${IMAGE}-build \
	$(IMAGE):$(TAG) \
	$(RUNNER) run build

lint: check-image ## Lint the project files
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name ${IMAGE}-lint \
	$(IMAGE):$(TAG) \
	$(RUNNER) run lint

lint-staged: check-image ## Lint only the staged files in the project
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name ${IMAGE}-lint-staged \
	$(IMAGE):$(TAG) \
	$(RUNNER) run lint-staged

fmt: check-image ## Format the project files
	@docker run --rm \
	-v $(PWD):/app \
	-it \
	--name ${IMAGE}-fmt \
	$(IMAGE):$(TAG) \
	$(RUNNER) run fmt

help: ## Show this help.
# `help' function obtained from GitHub gist: https://gist.github.com/prwhite/8168133?permalink_comment_id=4160123#gistcomment-4160123
	@echo PodCodar WebApp
	@awk 'BEGIN {FS = ": .*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% 0-9a-zA-Z_-]+(\\:[$$()% 0-9a-zA-Z_-]+)*:.*?##/ { gsub(/\\:/,":", $$1); printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
