Projeto de Sistema de Cobrança

Este projeto é um sistema de cobrança desenvolvido em Node.js com Express. O sistema processa arquivos CSV para gerar boletos, envia e-mails com informações de cobrança e realiza a validação e controle de boletos já processados.


Estrutura de Arquivos
src/
    controllers/: Contém os controladores do aplicativo.
    routes/: Define as rotas da API.
    services/: Contém a lógica de negócios e serviços.
    utils/: Utilitários e funções auxiliares.
Dockerfile: Arquivo de configuração para construir a imagem Docker.




Funcionalidades
Processa arquivos CSV para gerar boletos.
Envia e-mails com detalhes do boleto gerado.
Controla e evita a geração de boletos duplicados.


Tecnologias Utilizadas
Node.js: Ambiente de execução para JavaScript no servidor.
Express: Framework web para Node.js.
UUID: Para geração de IDs únicos para os boletos.
Logger: Para registro de logs de operação.


Requisitos
Node.js >= 14.x
npm





Instalação


Clone o repositório:

git clone https://github.com/gabdreux/Kanastra_Desafio.git
cd repo


Instale as dependências:

npm install


Para iniciar o servidor em modo de desenvolvimento:
npm run dev





Docker

Construir a Imagem Docker
Para construir a imagem Docker, use o comando:

docker build -t kanastra-server-imagem .


Executar o Container
Para criar e iniciar um container a partir da imagem, use:

docker run -d -p 3000:3000 kanastra-server-imagem



Testar a API
Para testar a funcionalidade de geração de boletos, faça um GET na rota api/gerar-boleto:

curl http://localhost:3000/api/gerar-boletos