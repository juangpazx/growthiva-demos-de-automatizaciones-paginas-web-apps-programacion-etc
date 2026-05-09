# Demos de Automatización con IA
Proyectos creados por Juan usando codigo, vs code, APIS, paginas web, etc.

## Descripción del proyecto

Este repositorio contiene una demo de automatización para capturar leads desde WhatsApp. El flujo principal del proyecto es:

- Recibir mensajes entrantes desde WhatsApp usando `whatsapp-web.js`.
- Guardar la información del cliente en un archivo CSV local.
- Opcionalmente guardar los leads en Google Sheets si se configura la API de Google.
- Responder automáticamente a los mensajes con respuestas predefinidas.

## ¿Usa IA esta versión?

En esta versión del proyecto no se está usando un servicio personalizado de IA. El bot responde con reglas y respuestas programadas en `demo whatsapp leads automatitation/index.js`. Es un asistente basado en patrones de texto, no en un modelo generativo conectado a datos privados de la empresa.

## ¿Cómo se usa la IA con un servicio personalizado?

Cuando se integra un servicio personalizado sí se usa Inteligencia Artificial. En ese caso, el chatbot se configura con los datos de la empresa y el flujo puede incluir:

- entrenamiento o prompt design con información de productos y servicios.
- respuestas adaptadas al tono y políticas de la marca.
- consulta de FAQ y datos internos del negocio.
- generación de respuestas dinámicas en lugar de respuestas fijas.

Este repositorio demuestra la captura de leads y el envío de respuestas en WhatsApp. Para extenderlo a un chatbot IA personalizado, se puede conectar una API de modelo generativo y cargar el contexto corporativo de la empresa para que el bot responda con conocimiento real del negocio.

## Instalación básica

```bash
cd "demo whatsapp leads automatitation"
npm install
```

## Configuración

Copiar un archivo `.env` con las siguientes variables si se desea usar Google Sheets:

- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## Ejecución

```bash
node index.js
```

Luego escanear el QR con WhatsApp para conectar el bot.
