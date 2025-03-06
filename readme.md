<p align="center"> <img src="./marketplace/public/logo.svg" alt="Mercado Livre Logo" width="300"> </p>
<h1 align="center">📦 Mercado Livre - Teste Técnico</h1>
<p align="center">
  Este projeto é um teste técnico desenvolvido para o Mercado Livre. A aplicação consiste em um front-end com funcionalidades básicas de pesquisa e listagem de produtos, além da exibição detalhada de um item selecionado. O teste técnico tem como objetivo a criação de um sistema com as seguintes funcionalidades:
  - Um <code>header</code> que permite pesquisar produtos e contém um <code>select</code> para trocar o idioma entre <code>espanhol</code>, <code>português</code> e <code>inglês</code>.
  - Uma tela de <code>pesquisa de produtos</code>, onde o usuário pode procurar itens disponíveis.
  - Uma tela de <code>detalhes do item</code>, que mostra informações detalhadas sobre o produto selecionado.
  A aplicação foi desenvolvida utilizando <code>Next.js</code> para o front-end, enquanto a comunicação entre as partes é feita através da API. O back-end, denominado <code>bff-Marketplace-api</code>, é responsável por fornecer as informações necessárias para o front-end.
</p>

## 🚀 Como Rodar o Projeto  

Antes de rodar a aplicação, é necessário instalar e configurar o ambiente. Você pode executar o projeto tanto utilizando o **Docker** quanto de forma **manual**. Escolha a opção que preferir.

### 📌 Pré-requisitos  

Antes de iniciar, você precisa ter o **Docker** e o **Docker Compose** instalados na sua máquina, caso opte por utilizar o Docker.

- [Instalar Docker](https://docs.docker.com/get-docker/)  
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)  

Se optar por rodar manualmente, também será necessário ter o **Node.js** e o **npm** instalados.

- [Instalar Node.js e npm](https://nodejs.org/)

### ▶️ Subindo a Aplicação  

#### Usando Docker (Recomendado)  

1. Clone este repositório:  
   ```sh
   git clone https://github.com/joandersonbatista/mercado-livre.git
   cd mercado-livre
   ```  

2. Suba a aplicação com um dos comandos abaixo:

   - Usando **Makefile**:  
     ```sh
     make up
     ```  
   - Ou diretamente com **Docker Compose**:  
     ```sh
     docker-compose up -d
     ```  

Isso irá subir tanto o **Frontend (marketplace)** quanto o **Backend (bff-marketplace-api)** automaticamente.

4. Após rodar a aplicação, você pode acessar:

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:3005](http://localhost:3005)

#### Subindo Manualmente (Sem Docker)  

Caso não queira usar o Docker, você pode subir o projeto manualmente. Para isso, siga os passos abaixo.

##### 1. Instale as dependências:

- **Instalando via Makefile**  
  Você pode rodar o comando `make install` para instalar as dependências de ambos os projetos:

  ```sh
  make install
  ```

- **Instalação Manual**  
  Caso prefira, você pode entrar diretamente nas pastas de cada projeto e rodar o comando de instalação separadamente:

  - **Backend (Marketplace API)**  
    No diretório do backend, instale as dependências utilizando o yarn:
    ```sh
    cd bff-marketplace-api
    yarn install
    ```

  - **Frontend (Marketplace)**  
    No diretório do frontend, instale as dependências utilizando o yarn:
    ```sh
    cd marketplace
    yarn install
    ```

##### 2. Suba a aplicação:

- **Backend (bff-marketplace-api)**  
  No diretório do backend, execute o comando para iniciar o servidor de desenvolvimento:
  ```sh
  yarn start:dev
  ```

- **Frontend (marketplace)**  
  No diretório do frontend, execute o comando para iniciar o servidor de desenvolvimento:
  ```sh
  yarn dev
  ```

Agora, você terá a aplicação rodando em seu ambiente local sem a necessidade de Docker.

4. Após rodar a aplicação, você pode acessar:

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:3005](http://localhost:3005)

### ⏹️ Parando a Aplicação  

Para parar os containers ou processos manuais, utilize:  

- **Com Docker (ou Makefile)**:  
  ```sh
  make down
  ```  
  Ou:
  ```sh
  docker-compose down
  ```

- **Com execução manual**:
  - Para parar o backend, pressione `Ctrl + C` no terminal onde o comando `yarn start:dev` está rodando.
  - Para parar o frontend, pressione `Ctrl + C` no terminal onde o comando `yarn dev` está rodando.

### ⚙️ Pontos de Melhoria
Embora o projeto tenha sido concluído com as principais funcionalidades, há várias áreas em que ele pode ser aprimorado. A seguir, estão alguns pontos de melhoria que, devido ao tempo limitado, ainda não foram aplicados, mas que são essenciais para garantir a qualidade e a escalabilidade do projeto a longo prazo.

  - ##### Testes no Back-End  
    Atualmente, a aplicação possui cobertura de testes apenas no front-end, mas é importante estender essa cobertura para o back-end, validando as respostas das APIs, garantindo que as regras de negócio e validações estejam sendo aplicadas corretamente e que os dados enviados e recebidos sejam consistentes.

  - ##### Testes nas Páginas  
    Apesar dos testes já estarem implementados em componentes e services, não há cobertura de testes nas páginas. Adicionar testes de integração e end-to-end nas páginas é crucial para garantir que os fluxos do usuário funcionem como esperado.

  - ##### Integração com o Sentry  
    A integração com o Sentry para monitoramento de erros no front-end ajudaria a identificar e corrigir problemas em tempo real.

  - ##### Implementação do Google Analytics  
    Integrar o Google Analytics ajudaria a acompanhar eventos importantes, como os produtos mais acessados, as categorias mais populares e as interações com o sistema de busca. Esses dados podem ser usados para melhorar a aplicação, ajustando-a conforme o comportamento dos usuários e fornecendo insights valiosos para decisões de produto e marketing.