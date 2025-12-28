# 🍔 Food Flow - Sistema de Gestión de Pedidos

![Versión](img.shields.io)
![Licencia](img.shields.io)

**Food Flow** es una Single Page Application (SPA) diseñada para establecimientos de comida. Permite a los clientes visualizar un menú dinámico, gestionar un carrito de compras en tiempo real y registrar pedidos en una base de datos en la nube.

## 🚀 Características Principales

- **Menú Dinámico:** Los productos se cargan directamente desde una base de datos en la nube.
- **Gestión de Estado (Carrito):** Lógica avanzada para agregar, sumar cantidades y calcular totales sin recargar la página.
- **Persistencia de Datos:** Los pedidos se guardan en una arquitectura relacional (Tablas de Pedidos y Detalles).
- **Seguridad Garantizada:** Implementación de políticas **RLS (Row Level Security)** para proteger la integridad de los datos.

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Grid & Flexbox), JavaScript Vanilla (ES6+).
- **Backend as a Service:** [Supabase](supabase.com) (PostgreSQL).
- **Despliegue:** [Netlify](www.netlify.com).

## 📁 Arquitectura del Proyecto

```text
/
├── css/
│   └── style.css       # Estilos modernos y responsive
├── js/
│   ├── supabaseClient.js # Configuración y conexión con la API
│   ├── menu.js           # Lógica de renderizado dinámico del menú
│   └── carrito.js        # Lógica de negocio (Estado del carrito y persistencia)
└── index.html            # Estructura principal de la SPA

``` 


 ## 🔒 Seguridad y Buenas Prácticas

En este proyecto se aplicaron conceptos de seguridad esenciales para un entorno de producción:
Variables de Entorno: Gestión de claves API fuera del código fuente.
Row Level Security (RLS): Configuración de políticas en PostgreSQL para permitir el registro de pedidos públicos pero restringir la edición de precios al administrador.
Modelado de Datos: Estructura relacional con llaves foráneas (Foreign Keys) para mantener la integridad entre productos y pedidos.


## 👨‍💻 Sobre mí
Desarrollador enfocado en soluciones Full-Stack con tecnologías modernas. Este proyecto demuestra mi capacidad para integrar servicios de backend en la nube con interfaces de usuario interactivas y eficientes.

Proyecto desarrollado con fines de portafolio profesional - 2025.



