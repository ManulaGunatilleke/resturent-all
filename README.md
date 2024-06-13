### Resturent System

Technology Stacks and used for the System 
 -  Java Script(Language)
 -  Node.js
 -  Express.js
 -  React Library 
 -  Tailwind CSS
 -  NoSQL(MongoDB)
 -  Container(Docker)

## Set up the project 

### 1. Clone the repository:

``` bash
git clone https://github.com/ManulaGunatilleke/resturent-all.git
```
### 2. Backend navigation:

- Go to inside restaurant-service folder

``` bash
cd restaurant-frontend 
```

### 3. Install dependencies for backend:

``` bash
npm init 
```
-Note -: install required libraries by using "npm i {Name of the Library}"

### 4. Backend .env file configurations:

- MONGODB_URL = (MONGODB_URL)

### 5. Frontend navigation:

- Go to inside restaurant-frontend folder
  
``` bash
cd restaurant-frontend 
```

### 6. Install dependencies for frontend:

``` bash
npm init
```
-Note -: install required libraries by using "npm i {Name of the Library}"

### 7. Build Dockerfile for backend and frontend:

``` bash
docker build -t restaurant-service .

docker build -t restaurant-frontend .

```
-Note -: You need to install Docker to your Device based on the OS
         Link -: https://docs.docker.com/desktop/
         
### 8. Build docker-compose.yml:

``` bash
docker-compose up --build
```

### 9. Open project in the browser:

``` bash
Local -: http://localhost:3000
```
