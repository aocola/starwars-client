```markdown
# API Node.js con Serverless Framework

## Descripción

Esta es una API desarrollada en Node.js utilizando el framework Serverless para su despliegue en AWS. La API integra datos de la [Star Wars API (SWAPI)](https://swapi.py4e.com/documentation) y permite almacenar información personalizada en una base de datos. Los atributos de los modelos han sido traducidos del inglés al español. La API cuenta con dos endpoints principales: uno para crear un recurso y otro para obtener los recursos almacenados.

---

## Tecnologías Utilizadas

- **Node.js**
- **Serverless Framework**
- **AWS Lambda**
- **API Gateway**
- **DynamoDB/MySQL** (según configuración)
- **Star Wars API (SWAPI)**

---

## Endpoints

### 1. **POST /film-post**
**Descripción:** Crea un nuevo recurso de tipo "Película" y lo almacena en la base de datos.

**Request Body (JSON):**
```json
{
  "titulo": "Una Nueva Esperanza",
  "director": "George Lucas",
  "productores": ["Gary Kurtz", "George Lucas"],
  "fecha_lanzamiento": "1977-05-25"
}
```

**Response (201 - Creado):**
```json
{
  "success": true,
  "message": "Operación satisfactoria",
  "data": {
    "id": "12345",
    "titulo": "Una Nueva Esperanza",
    "director": "George Lucas",
    "productores": ["Gary Kurtz", "George Lucas"],
    "fecha_lanzamiento": "1977-05-25"
  }
}
```

**Errores:**
- **400 - Solicitud incorrecta:** Problema con el formato del cuerpo de la solicitud.
- **500 - Error interno del servidor:** Problema con la base de datos o la lógica de negocio.

---

### 2. **GET /film-post**
**Descripción:** Recupera todos los recursos almacenados de tipo "Película".

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Operación satisfactoria",
  "data": [
    {
      "id": "12345",
      "titulo": "Una Nueva Esperanza",
      "director": "George Lucas",
      "productores": ["Gary Kurtz", "George Lucas"],
      "fecha_lanzamiento": "1977-05-25"
    }
  ]
}
```

**Errores:**
- **500 - Error interno del servidor:** Problema con la base de datos o la lógica de negocio.

---

### 3. **GET /film/:id**
**Descripción:** Recupera un recurso específico de tipo "Película" por su ID.

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Operación satisfactoria",
  "data": {
    "id": "12345",
    "titulo": "Una Nueva Esperanza",
    "director": "George Lucas",
    "productores": ["Gary Kurtz", "George Lucas"],
    "fecha_lanzamiento": "1977-05-25"
  }
}
```

**Errores:**
- **404 - No encontrado:** El ID especificado no existe.
- **500 - Error interno del servidor:** Problema con la base de datos o la lógica de negocio.

---

### 4. **GET /swapi/films**
**Descripción:** Obtiene una lista de películas desde la Star Wars API (SWAPI).

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "Operación satisfactoria",
  "data": [
    {
      "titulo": "A New Hope",
      "episodio_id": 4,
      "director": "George Lucas",
      "fecha_lanzamiento": "1977-05-25"
    },
    {
      "titulo": "The Empire Strikes Back",
      "episodio_id": 5,
      "director": "Irvin Kershner",
      "fecha_lanzamiento": "1980-05-17"
    }
  ]
}
```

---

## Instalación y Configuración

### Pre-requisitos
- Node.js v14 o superior
- AWS CLI configurado
- Serverless Framework instalado

### Pasos
1. Clonar este repositorio:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar las credenciales de AWS:
   ```bash
   aws configure
   ```

4. Desplegar el proyecto:
   ```bash
   serverless deploy
   ```

---

## Uso

### Crear una Película
```bash
curl -X POST https://<api-gateway-url>/film-post \
-H "Content-Type: application/json" \
-d '{
  "titulo": "El Imperio Contraataca",
  "director": "Irvin Kershner",
  "productores": ["Gary Kurtz", "George Lucas"],
  "fecha_lanzamiento": "1980-05-17"
}'
```

### Obtener Películas
```bash
curl -X GET https://<api-gateway-url>/film-post
```

### Integración con SWAPI
```bash
curl -X GET https://<api-gateway-url>/swapi/films
```

---

## Buenas Prácticas Implementadas

1. Uso de controladores y servicios separados para mantener la lógica de negocio aislada.
2. Traducción de los campos del inglés al español para mayor claridad.
3. Manejo centralizado de respuestas con el formato `ResponseDto`.
4. Integración con SWAPI mediante servicios externos.
5. Documentación clara para endpoints y estructura del proyecto.

---

## Mejoras Futuras

- Autenticación y autorización.
- Paginación en los endpoints de listado.
- Más endpoints para otras entidades de SWAPI.
- Monitoreo y logging avanzado con AWS CloudWatch.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT.
```