# Movie Browser (NextJs)

<div style="text-align: center;">
    <img src="/public/logo.svg" alt="Movie Browser Logo" width="200" />
</div>

## Descripción

**Movie Browser** es una aplicación web diseñada para explorar y buscar información sobre películas. La aplicación está desplegada y accesible en el siguiente enlace: [Movie Browser en Vercel](https://movie-spa-next-movie-browser.vercel.app/).

## Funcionalidades

- **Búsqueda de películas**: Encuentra información detallada sobre tus películas favoritas.
- **Detalles de películas**: Consulta sinopsis, reparto, calificaciones. relacionados, etc.
- **Interfaz amigable**: Diseño intuitivo y responsivo para una experiencia de usuario óptima.

## Tecnologías utilizadas

- **NextJs 15.3.1**: Biblioteca principal para la construcción de la interfaz de usuario.
- **App Router**: Manejo de rutas y navegación dentro de la aplicación.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones modernas.
- **CSS Modules**: Estilización modular y reutilizable.

## Estructura de carpetas
/
├── .env.local
├── .env.local.example
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── .next/
├── public/
│   ├── logo.svg
│   └── placeholder.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── movie/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   ├── components/
│   │   ├── MovieCard.tsx
│   │   └── SearchBar.tsx
│   ├── interfaces/
│   │   └── movie.ts
│   ├── services/
│   │   └── movie.ts
│   └── app/
│       └── globals.css


## Clonar y ejecutar el proyecto

Sigue estos pasos para clonar y ejecutar la aplicación en tu entorno local:

1. Clona el repositorio desde GitHub:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd movie-spa-next
    ```

2. Crea un archivo `.env.local` basado en el ejemplo proporcionado:
    ```bash
    cp .env.local.example .env.local
    ```
    Asegúrate de completar las variables necesarias en el archivo `.env.local`.

3. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Desplegar la aplicación

Para construir la aplicación para producción, utiliza el siguiente comando:
```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos optimizados para producción.

## Notas adicionales

- Asegúrate de tener Node.js y npm instalados en tu sistema.
- Consulta el archivo `package.json` para más detalles sobre las dependencias y scripts disponibles.

¡Disfruta explorando películas con **Movie Browser**!  
