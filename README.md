# 🎮 GameZone - E-commerce de Videojuegos

Una aplicación web moderna de e-commerce para videojuegos construida con React, Bootstrap y la API de RAWG.

## ✨ Características

- 🏠 **Página de inicio** con carousel destacado
- 🎯 **Catálogo completo** con scroll infinito
- 🔍 **Búsqueda avanzada** de juegos
- 📊 **Sistema de ordenamiento** (relevancia, alfabético, rating, fecha)
- 🛒 **Carrito de compras** con persistencia local
- 💝 **Lista de deseos** funcional
- 💰 **Sistema de precios dinámico** basado en rating y popularidad
- 📱 **Diseño completamente responsive**
- 🎨 **Interfaz moderna** con Bootstrap 5

## 🚀 Tecnologías Utilizadas

- **React 19.1.1** - Framework principal
- **React Router DOM** - Navegación SPA
- **Bootstrap 5** + React Bootstrap - UI/UX
- **Vite** - Herramienta de desarrollo
- **RAWG API** - Base de datos de videojuegos
- **Context API** - Gestión de estado global
- **LocalStorage** - Persistencia de datos

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- NPM o Yarn
- API Key de RAWG (gratuita)

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd GameZone
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   ```bash
   cp .env.example .env
   ```

4. **Obtén tu API Key:**
   - Ve a [RAWG API](https://rawg.io/apidocs)
   - Regístrate gratis
   - Copia tu API key

5. **Edita el archivo .env:**
   ```env
   VITE_RAWG_API_KEY=tu_api_key_aqui
   ```

6. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 📁 Estructura del Proyecto

```
GameZone/
├── public/
│   └── vite.svg
├── src/
│   ├── Components/
│   │   ├── Navigation.jsx      # Barra de navegación
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── ShoppingCart.jsx    # Carrito lateral
│   │   └── PriceTag.jsx        # Etiqueta de precio
│   ├── Pages/
│   │   ├── Home.jsx            # Página principal
│   │   ├── Games.jsx           # Catálogo de juegos
│   │   ├── GameDetail.jsx      # Detalles del juego
│   │   ├── Wishlist.jsx        # Lista de deseos
│   │   └── About.jsx           # Acerca de
│   ├── context/
│   │   ├── CartContext.jsx     # Contexto del carrito
│   │   └── WishlistContext.jsx # Contexto de wishlist
│   ├── services/
│   │   └── gamesAPI.js         # Servicio API
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .env.example                # Variables de entorno ejemplo
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Funcionalidades Principales

### 🏠 Página de Inicio
- Carousel destacado con juegos populares
- Navegación intuitiva
- Diseño atractivo y moderno

### 🎮 Catálogo de Juegos
- **Scroll infinito** para cargar más contenido
- **Filtros de ordenamiento:**
  - 🎯 Relevancia (rating × popularidad)
  - 🔤 Alfabético (A-Z / Z-A)
  - ⭐ Mejor valorados
  - 📅 Fecha de lanzamiento
- **Búsqueda en tiempo real**
- **Cards informativas** con rating, géneros y precios

### 🛒 Sistema de Compras
- **Carrito persistente** con localStorage
- **Lista de deseos** completamente funcional
- **Precios dinámicos** basados en algoritmo propio
- **Sistema de descuentos** aleatorio
- **Notificaciones toast** para acciones

### 📱 Responsive Design
- Optimizado para móviles, tablets y desktop
- Bootstrap 5 para consistencia visual
- Navegación adaptativa

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la build
npm run preview

# Linting
npm run lint
```

## 🌐 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_RAWG_API_KEY` | API Key de RAWG | ✅ Sí |

## 📸 Screenshots

### Página de Inicio
- Carousel destacado con juegos populares
- Navegación clara y accesible

### Catálogo de Juegos
- Grid responsive con información detallada
- Filtros y búsqueda avanzada
- Scroll infinito

### Carrito de Compras
- Offcanvas lateral moderno
- Gestión completa de productos
- Cálculo automático de totales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **RAWG** por su excelente API de videojuegos
- **React Team** por el increíble framework
- **Bootstrap** por los componentes UI
- **Vite** por la herramienta de desarrollo rápida

## 📞 Contacto

**Desarrollador:** [Tu Nombre]
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

⭐ ¡Dale una estrella al proyecto si te gustó!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
