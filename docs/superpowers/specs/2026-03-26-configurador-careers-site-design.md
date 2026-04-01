# Configurador de Sitio de Empleos — Design Spec

## Overview

Aplicación React standalone (Vite) que permite a admins de Humand configurar y personalizar un careers site público. El output es un JSON de configuración + ZIP con assets, entregable a Humand Ops para deploy. Todo client-side, sin backend.

## Stack

- **React 18** con hooks (no class components)
- **Vite** como bundler
- **CSS vanilla** con custom properties (tokens). No Tailwind ni librerías UI externas.
- **JSZip + file-saver** para la exportación
- **Roboto** (400, 600) de Google Fonts

---

## Arquitectura

### Layout principal

Wizard de 4 pasos con layout de 3 columnas:

```
┌──────────────────────────────────────────────────────────┐
│  Header: "Configuración Sitio de Empleos"   [Guardar borrador] [X]  │
├────────────┬─────────────────────┬───────────────────────┤
│  Sidebar   │   Panel de          │   Vista previa        │
│  (nav)     │   configuración     │   (live preview)      │
├────────────┴─────────────────────┴───────────────────────┤
│  Footer: [Atrás]                            [Siguiente]  │
└──────────────────────────────────────────────────────────┘
```

- **Sidebar:** Nav vertical con los 4 pasos. Paso activo resaltado con fondo brand. Pasos completados con check verde. Clicables para navegación directa.
- **Panel central:** Formulario del paso activo. Scroll independiente.
- **Panel derecho:** Preview en vivo. Toggle desktop (ancho completo) / mobile (~375px centrado). Barra tipo browser con URL ilustrativa. Badge "Los datos son ilustrativos". El preview hace scroll/focus automático a la zona correspondiente al campo que se está editando (highlight con borde azul).
- **Footer fijo:** "Atrás" (link style) y "Siguiente" (primary button). En paso 4: "Exportar" (o "Volver a exportar" post-export).
- **Botón X (cerrar):** Cierra el configurador. Si hay cambios sin guardar, muestra diálogo de confirmación: "Tienes cambios sin guardar. ¿Deseas salir?" con opciones "Cancelar" y "Salir sin guardar". Para el prototipo, navega a una pantalla vacía o recarga.

### Preview: Focus dinámico

El preview resalta con borde azul la zona correspondiente a lo que se está editando en el panel. Este comportamiento es uniforme para todas las áreas: header, contenido, footer, hero, cards, etc. Cuando el campo activo cambia, el preview hace scroll suave a la zona correspondiente y aplica el highlight.

### Navegación

- "Siguiente" valida campos obligatorios del paso actual, avanza si ok.
- "Atrás" vuelve al anterior sin validar.
- Click en sidebar navega directamente sin validar.
- "Guardar borrador" persiste todo el estado en localStorage.

---

## Pre-paso: Conexión de Instance ID

Se muestra cuando el admin accede por URL directa (no desde admin panel).

### UI
Card centrada sobre fondo neutral:
- Icono Humand arriba
- Título: "Conecta tu comunidad de Humand"
- Descripción: "Ingresa el Instance ID o el nombre de tu comunidad para vincular el configurador del sitio de empleos."
- Searchable dropdown con lista hardcodeada (4-5 opciones con ID + nombre)
- Helper: "Si no lo tienes, consulta con..."

### Estados
1. **Inicial:** Dropdown cerrado, placeholder "Selecciona"
2. **Buscando:** Dropdown abierto, input de texto filtra opciones. Cada opción muestra "ID: XX" + nombre.
3. **Seleccionado:** Input muestra el nombre seleccionado + botón X para limpiar + chevron. Debajo aparece card de confirmación con check verde: "[Nombre] — Comunidad conectada". Botón "Comenzar configuración" (primary, full width).

### Datos de ejemplo
```javascript
const MOCK_INSTANCES = [
  { id: 12, name: 'Opción 1' },
  { id: 13, name: 'Squid Squad' },
  { id: 14, name: 'Opción 3' },
  { id: 15, name: 'Opción 4' },
];
```

---

## Paso 1: Configuración general

**Descripción:** "Datos básicos del sitio, encabezado y pie de página. Esta configuración aplica a todas las páginas."

### Sección: Información básica

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| Nombre del sitio | Input texto | Sí | Helper: "Aparece en la pestaña del navegador" |
| URL de la página | Input texto | Sí | Prefijo visual `jobs.humand.co/`. Helper: "Se agrega al final de jobs.humand.co/ para formar la dirección de tu sitio." Contador chars (ej: 11/30). Max 30 chars. Caracteres permitidos: `a-z`, `0-9`, `-`. Auto-transforma a lowercase y reemplaza espacios por `-`. Botón X para limpiar. |
| Favicon | File upload | No | Formatos: JPG, PNG hasta 50mb. Helper: "Resolución recomendada: 64x64px" |

### Sección: Encabezado
- Descripción: "La barra superior con tu logo que aparece en todas las páginas."
- **Logo** (obligatorio): File upload. Helper: "Se recomienda un logo en colores claros para garantizar buena visibilidad en todas las páginas del sitio."

### Sección: Pie de página
- Descripción: "La barra inferior con enlaces legales que aparece en todas las páginas."
- **URL política de privacidad** (obligatorio): Input URL.
- **URL de la empresa** (opcional): Input URL + botón X. Helper: "Si se completa, el nombre del sitio aparece en el pie de página con un enlace a esta dirección." Sin límite de caracteres.

### Preview (Paso 1)
Mockup de browser con:
- Tab mostrando nombre del sitio (o placeholder)
- URL bar: `https://jobs.humand.co/[slug]`
- Header con logo subido (o placeholder gris)
- Contenido skeleton (líneas/bloques grises)
- Footer: "Powered by Humand ©" | nombre sitio (si URL empresa) | "Política de privacidad" | "Gestionar Cookies"
- Focus dinámico uniforme: la zona que corresponde al campo activo se resalta con borde azul.

---

## Paso 2: Página de inicio

**Descripción:** "Es la página de bienvenida de tu sitio de empleos. Puedes configurar el encabezado principal, una sección informativa opcional, y ver cómo se muestran los empleos destacados."

### Toggle principal
**"Mostrar página de inicio"** — Toggle on/off.

**Si OFF:**
- Solo se muestra el toggle.
- Preview: empty state con icono info — "La página de inicio no está activa. Los candidatos accederán directamente al listado de empleos."
- Los datos NO se borran (si reactiva, vuelven).

**Si ON:** Se muestran las secciones siguientes.

### Sección: Sección principal (hero)

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| Título | Input texto | Sí | |
| Imagen | File upload | Sí | Helper: "Resolución recomendada: 1440x600px" |

- Info box: "El botón 'Explorar empleos' es fijo y no configurable."

### Sección: Sección informativa
- Toggle inline (label a la izquierda, toggle a la derecha). Descripción: "Imágenes, títulos y descripciones sobre tu empresa, cultura o beneficios."

**Cuando ON:**
- Checkbox: "Añadir título y descripción a la sección" (opcional). Cuando checked, muestra campos Título y Descripción. Si unchecked, los valores de título y descripción se omiten del JSON exportado.
- Cards en formato accordion colapsable:
  - Cada card: Imagen* (file upload), Título* (input), Descripción* (textarea, 0/250 contador)
  - Mínimo 1 card siempre. No hay máximo.
  - Botón "Eliminar" dentro del contenido del accordion (al fondo), solo visible cuando hay más de 1 card.
  - Botón "+ Añadir card" debajo de todas las cards.

**Cuando OFF:** Sección colapsada, sin campos.

### Info: Empleos destacados
Banner informativo (no configurable): "Empleos destacados: Se muestran automáticamente cuando hay 3 o más empleos publicados. Si hay menos, esta sección no aparece en el sitio."

### Preview (Paso 2)
- Hero: imagen de fondo + título en blanco + botón "Explorar empleos"
- Sección informativa (si activa): título de sección + descripción + cards en grid (lado a lado cuando hay más de una)
- "Empleos destacados": 3 cards de ejemplo (Departamento + Nombre empleo + flecha)
- Botón "Explorar empleos"
- Footer

---

## Paso 3: Lista de empleos

**Descripción:** "Es la página principal donde los candidatos buscan y exploran los empleos disponibles."

### Sección: Encabezado

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| Título | Input texto + botón X | Sí | |
| Descripción | Textarea (0/250) | No | |
| Imagen | File upload | No | Info box: "Esta imagen se usa también como fondo en el detalle del empleo y en el formulario de aplicación. Si no se sube, se muestra un fondo gris oscuro." |

### Preview (Paso 3)
- Header con logo
- Encabezado: imagen de fondo (o gris oscuro) con título + descripción en blanco superpuestos
- Barra de búsqueda: "Busca por título o departamento" + botón "Filtros"
- Contador: "80 empleos disponibles"
- 5 job cards de ejemplo (Departamento + Nombre empleo + flecha ›)
- Botón "Cargar más"
- Footer

---

## Paso 4: Exportar

**Descripción panel:** "Resumen de configuración — Revisa tu configuración y descarga los archivos para subir a Humand Ops. Al exportar se descargan dos archivos, uno JSON con la configuración completa del sitio y un ZIP con todas las imágenes y logos que se usaron."

### Resumen read-only
Secciones colapsables (abiertas por defecto), cada una con:
- Header: icono de estado + nombre de sección + chevron collapse
  - Check verde: todo completo
  - Warning amarillo (triángulo): campos obligatorios pendientes
- Contenido: subsecciones con pares clave-valor (label izquierda, valor derecha)
  - Archivos subidos: "Subido"
  - Campos vacíos obligatorios: "Pendiente" en rojo
- Botón "Editar [sección]" (secondary) al pie de cada sección → navega al paso correspondiente

### Secciones del resumen

**Configuración general:**
- Información básica: Nombre del sitio, URL de la página (con prefijo jobs.humand.co/), Favicon
- Encabezado: Logo
- Pie de página: URL política de privacidad, URL de la empresa

**Página de inicio:**
- Si `homePage.enabled` es false: muestra "Desactivada" y no muestra subsecciones.
- Si enabled: Sección principal (Título, Imagen), Sección informativa (Título, Descripción, Cards con nombre de cada card)

**Lista de empleos:**
- Title: Título, Descripción, Imagen

### Estados del export
1. **Con pendientes:** Botón "Exportar" deshabilitado. Secciones con warning muestran "Pendiente" en campos faltantes.
2. **Listo para exportar:** Botón "Exportar" habilitado (primary).
3. **Post-export exitoso:** Banner verde "Configuración exportada — Los archivos se descargaron correctamente: [slug]-config.json y [slug]-assets.zip". Botón cambia a "Volver a exportar". Todos los pasos en sidebar con check verde.

### Archivos generados
- `[slug]-config.json`: JSON con toda la configuración (sin archivos binarios, solo referencias a archivos en el ZIP)
- `[slug]-assets.zip`: ZIP con todos los archivos subidos (logo, favicon, imágenes)

### Esquema del JSON exportado
```json
{
  "instanceId": 13,
  "instanceName": "Squid Squad",
  "general": {
    "siteName": "Squid Squad",
    "urlSlug": "squid-squad",
    "favicon": "assets/favicon.png",
    "logo": "assets/logo.png",
    "privacyUrl": "https://www.enlace.com",
    "companyUrl": "https://www.squid-squad.com"
  },
  "homePage": {
    "enabled": true,
    "hero": {
      "title": "Título principal",
      "image": "assets/hero.jpg"
    },
    "infoSection": {
      "enabled": true,
      "title": "Lo que hacemos en Squid Squad",
      "description": "Descripción de la sección...",
      "cards": [
        {
          "title": "Oportunidades Infinitas",
          "description": "Descripción de la card...",
          "image": "assets/card-1.jpg"
        }
      ]
    }
  },
  "jobList": {
    "title": "Forma parte de nuestro equipo",
    "description": "Descripción opcional...",
    "image": "assets/joblist-header.jpg"
  }
}
```

**Notas del JSON:**
- Los archivos se referencian con ruta relativa `assets/[nombre]` que coincide con la estructura dentro del ZIP.
- Si `homePage.enabled` es false, el objeto `homePage` se incluye igualmente con `enabled: false` y los datos que tenga.
- Si `infoSection.showTitleDescription` es false, `title` y `description` se omiten del JSON de la sección informativa.
- Campos opcionales vacíos (favicon, companyUrl, etc.) se incluyen como `null`.

### Estructura del ZIP
```
[slug]-assets.zip
├── favicon.png          (si se subió)
├── logo.png
├── hero.jpg             (si home page activa)
├── card-1.jpg           (por cada card)
├── card-2.jpg
└── joblist-header.jpg   (si se subió)
```

### Error en export
Si la generación del ZIP o la descarga falla, se muestra un banner rojo: "Error al exportar. Intenta nuevamente." con opción de reintentar.

---

## Componente: File Upload

### Estado vacío
- Border: 1.5px dashed neutral-300
- Contenido centrado: "Elija un archivo o arrástrelo aquí" + "Formatos permitidos: PDF, JPG o PNG hasta 50mb" + link "Subir archivo" con icono upload
- Hover: border brand-400, background #f1f4fd

### Estado con archivo
- Contenedor con: icono de imagen (azul) + nombre de archivo + tamaño + formato
- Botones: descarga (icono) + eliminar (icono papelera)
- Helper debajo (si aplica)

---

## Estado global (ConfiguratorContext)

```javascript
{
  instanceId: null,          // ID de la comunidad seleccionada
  instanceName: null,        // Nombre de la comunidad
  currentStep: 0,            // 0-3
  exported: false,           // Si ya se exportó al menos una vez

  general: {
    siteName: '',
    urlSlug: '',
    favicon: null,           // { file: File, name, size, type }
    logo: null,              // { file: File, name, size, type }
    privacyUrl: '',
    companyUrl: '',
  },

  homePage: {
    enabled: true,
    hero: {
      title: '',
      image: null,
    },
    infoSection: {
      enabled: false,
      showTitleDescription: false,  // checkbox
      title: '',
      description: '',
      cards: [{ id: uuid(), title: '', description: '', image: null }],  // min 1
    },
  },

  jobList: {
    title: '',
    description: '',
    image: null,
  },
}
```

### Persistencia
- "Guardar borrador": serializa estado a localStorage (archivos como base64).
- Al cargar: restaura desde localStorage si existe.

---

## Validación

- Se ejecuta al clickear "Siguiente" (no preventiva).
- Campos obligatorios marcados con * en el label.
- Error inline debajo del campo en rojo (#e74444).
- No se deshabilita el botón "Siguiente" preventivamente.
- Paso 2 con toggle OFF: no valida campos de página de inicio.
- Paso 4: verifica completitud de todos los pasos. Secciones incompletas muestran warning amarillo y campos sin completar dicen "Pendiente".

### Campos obligatorios por paso
- **Paso 1:** siteName, urlSlug, logo, privacyUrl
- **Paso 2 (si enabled):** hero.title, hero.image. Si infoSection.enabled: cada card debe tener image, title, description.
- **Paso 3:** title

---

## Design System Tokens

### Tipografía
- Fuente: Roboto (400, 600)
- Letter-spacing: 0.2px siempre
- Line-height: 1.4 (excepto 32px → 1.3)

| Uso | Size | Weight |
|-----|------|--------|
| Título de página | 18px | 600 |
| Título de sección | 16px | 600 |
| Labels de campo | 14px | 600 |
| Body / descripciones | 14px | 400 |
| Helpers / hints | 12px | 400 |
| Badges / micro | 10px | 400 |

### Colores
```css
--text-default: #303036;
--text-lighter: #636271;
--text-placeholder: #aaaaba;
--brand-400: #6f93eb;
--brand-500: #496be3;
--brand-600: #3851d8;
--brand-700: #2f3fc6;
--neutral-50: #f5f6f8;
--neutral-100: #eeeef1;
--neutral-150: #E9E9ED;
--neutral-200: #dfe0e6;
--neutral-300: #cbcdd6;
--neutral-400: #b5b6c4;
--red-500: #e74444;
--green-600: #28c040;
--yellow-500: #f0b623;
--white: #ffffff;
--background-page: #f5f6f8;
```

### Espaciado (base 8px)
```
2px / 4px   → icon + label
8px / 16px  → padding interno
12px        → items de lista, campos
24px        → agrupación dentro de sección
32px / 40px → separación entre secciones
64px        → grandes bloques
```

### Border Radius
- 1–39px altura: 4px
- 40–71px: 8px
- +72px: 16px
- Badges/chips: 999px

### Sombras
```css
/* Cards accionables */
box-shadow: -1px 4px 8px 0px rgba(233, 233, 244, 1);
/* Dropdowns, hover */
box-shadow: -1px 8px 16px 0px rgba(170, 170, 186, 0.45);
/* Bottom sheets mobile */
box-shadow: 0px -2px 24px 0px rgba(103, 103, 121, 0.50);
```

### Inputs
- Altura: 40px, padding: 12px horizontal
- Border: 1px solid neutral-200, radius: 8px
- Font: 14px/400, placeholder: text-placeholder (#aaaaba)
- Focus: border-color brand-400

### Botones
- Altura: 40px, padding: 20px horizontal, radius: 8px, font: 14px/600
- Primary: bg brand-500, color white, hover brand-600
- Secondary: bg white, border neutral-200, color text-default, hover neutral-50
- Link: sin bg ni border, color brand-500

---

## Estructura de archivos

```
claude_configurador/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── context/
│   │   └── ConfiguratorContext.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── WizardShell.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── PreviewPanel.jsx
│   │   │   └── StepFooter.jsx
│   │   ├── ui/
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── SearchSelect.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── InfoBox.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Accordion.jsx
│   │   └── preview/
│   │       ├── BrowserFrame.jsx
│   │       ├── PreviewGeneral.jsx
│   │       ├── PreviewHome.jsx
│   │       ├── PreviewJobList.jsx
│   │       └── PreviewFooter.jsx
│   ├── steps/
│   │   ├── InstanceConnect.jsx
│   │   ├── GeneralConfig.jsx
│   │   ├── HomePage.jsx
│   │   ├── JobList.jsx
│   │   └── Export.jsx
│   ├── utils/
│   │   ├── exportConfig.js
│   │   └── validation.js
│   └── styles/
│       ├── tokens.css
│       └── global.css
├── package.json
└── vite.config.js
```
