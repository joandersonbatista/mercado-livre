# Variáveis
DOCKER_COMPOSE = docker-compose
FRONTEND_DIR = marketplace
BACKEND_DIR = bff-marketplace-api

# Subir a aplicação com Docker
up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

# Visualizar logs dos containers
logs:
	$(DOCKER_COMPOSE) logs -f

# Instalar dependências
install:
	cd $(FRONTEND_DIR) && npm install
	cd $(BACKEND_DIR) && npm install

# Rodar a aplicação manualmente
run-frontend:
	cd $(FRONTEND_DIR) && npm run dev

run-backend:
	cd $(BACKEND_DIR) && npm run start:dev

# Rodar os testes
test-frontend:
	cd $(FRONTEND_DIR) && npm run test

test-backend:
	cd $(BACKEND_DIR) && npm run test