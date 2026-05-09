# Contributing

Gracias por tu interés en contribuir a Invoice Manager.

## Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu cambio:
   ```bash
git checkout -b feature/nombre-de-tu-cambio
```
3. Realiza tus cambios.
4. Haz commit con un mensaje claro:
   ```bash
git commit -m "Agregar descripción breve del cambio"
```
5. Envía un pull request al repositorio principal.

## Buenas prácticas

- Mantén el código limpio y legible.
- Agrega comentarios cuando sea necesario.
- No añadas archivos de configuración locales en el commit.
- Asegúrate de que `.env` y `public/facturas.xlsx` no se compartan.

## Reportar problemas

Si encuentras un error, abre un issue en GitHub describiendo:
- Pasos para reproducirlo
- Comportamiento esperado
- Comportamiento actual

## Desarrollo local

```bash
npm install
npm run dev
```

El servidor se ejecuta en `http://localhost:3000`.
