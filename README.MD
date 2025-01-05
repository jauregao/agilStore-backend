# AgilStore - Gerenciamento de Inventário de Produtos
## 🚀 Tecnologias e Ferramentas
- Tecnologia: Typescript e NodeJS
- Framework: Express
- Bibliotecas:
  - nodemon e ts-node: executar os arquivos .ts em ambiente de desenvolvimento;
  - uuid: criar de uuid's únicos;
  - zod: validar os inputs enviados no body da requisição;
  - dotenv: carregar variáveis de ambiente;
  - path: nativa do nodejs, realiza a conversão dos caminhos;
  - file system (fs): também nativa do nodejs, realiza a leitura e escrita em arquivos;


## 📦 Instalação e Dependências
Clone o repositório utilizando o comando abaixo:
```
git clone git@github.com:jauregao/agilStore-backend.git
```
Instalando as dependências
Após clonar o repositório, instale as dependências com o comando:

```
npm install
```

## 🛠️ Como rodar a aplicação
Execute o comando abaixo para rodar o servidor:

```bash
npm run dev
```

Por padrão, aplicação estará disponível no endereço http://localhost:3000 ou http://localhost:<sua_porta_favorita>.

## ☕ Auxiliares

Anexado os arquivos:
 - `teste.http` para ser utilizado com a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
 - `agilstore.postman_collection.json` para ser importado no postman ou insomnia.

 Ambos arquivos estão previamente configurados para realizar os testes.

## 💻 Rotas da API
A seguir estão as rotas disponíveis para interagir com o sistema:

### **1. Adicionar Produto**

  - **POST /product**  
  Adiciona um novo produto ao inventário.

  **Body (JSON):**
  ```json
  {
    "nome": "Smartphone X",
    "categoria": "Smartphones",
    "qtd_estoque": 100,
    "preco": 1999.99
  }
  ```

  **Response (JSON):**
  ```json
  { 
    "id": 1,
    "nome": "Smartphone X",
    "categoria": "Smartphones",
    "qtd_estoque": 100,
    "preco": 1999.99
  }
  ```

### **2. Listar Produtos**
  - **GET /products**  

 **Parâmetros de Consulta (Query Parameters)**:
  - `categoria` (opcional): Filtra os produtos pela categoria. A busca é feita sem acentuação e caracteres especiais.
  - `ordem` (opcional): Define o campo de ordenação. Pode ser um dos seguintes:
    - `nome`: Ordena os produtos pelo nome.
    - `quantidade`: Ordena os produtos pela quantidade em estoque.
    - `preco`: Ordena os produtos pelo preço.
  - `modo` (opcional): Define a direção da ordenação. Pode ser um dos seguintes:
    - `asc`: Ordem crescente (padrão).
    - `desc`: Ordem decrescente.

  **Exemplo de requisição**:

```
GET /products?categoria=Smartphones&ordem=nome&modo=asc
```

  **Response (JSON):**
  ```json
  [
    {
      "id": "2",
      "nome": "Laptop Y",
      "categoria": "Laptops",
      "qtd_estoque": 50,
      "preco": 4999.99
    },
    {
      "id": "1",
      "nome": "Smartphone X",
      "categoria": "Smartphones",
      "qtd_estoque": 100,
      "preco": 1999.99
    }
  ]
  ```

### **3. Buscar Produto**

  - **GET /product/:param**  
  Busca os detalhes de um produto específico pelo id ou parte do nome.
  Parâmetro: param pode ser o id ou um trecho do nome do produto.


  **Response (JSON):**
  ```json
  {
    "id": "1",
    "nome": "Smartphone X",
    "categoria": "Smartphones",
    "qtd_estoque": 100,
    "preco": 1999.99
  }
  ```

### **4. Atualizar Produto**

  - **PATCH /product/:id**  
  Atualiza as informações de um produto existente identificado pelo id. Pode ser enviado um ou mais campos e deve ser enviado pelo menos um campo.

  **Body (JSON):**
  ```json
  {
    "qtd_estoque": 100,
    "preco": 1999.99
  }
  ```

  **Response (JSON):**
  ```json
  {
    "id": "1",
    "nome": "Smartphone X",
    "categoria": "Smartphones",
    "qtd_estoque": 100,
    "preco": 1999.99
  }
  ```

  ### **5. Excluir Produto**

  - **DELETE /product/:id**  
  Remove um produto do inventário identificado pelo id.
  A confirmação de exclusão não foi implementada nesta funcionalidade porque, geralmente, a confirmação de ações críticas como exclusão de dados é realizada no frontend. Fazer a confirmação no backend não é uma boa prática, pois implica em mais tráfego de rede e lógica adicional no servidor, o que pode impactar a performance e aumentar a complexidade do código.

  **Response:**
  - Caso a exclusão seja bem-sucedida:
    Status: `204 No Content`
  
  - Caso o id informado não exista no inventário:
    Status: `404 Not Found`
    ```json
    {
      "message": "Produto não encontrado."
    }
    ```