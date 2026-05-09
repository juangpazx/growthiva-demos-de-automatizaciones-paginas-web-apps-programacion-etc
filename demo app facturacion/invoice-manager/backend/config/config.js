/**
 * Configuración general de la aplicación
 * Define las rutas, puertos y variables de entorno
 */

require('dotenv').config();
const path = require('path');

module.exports = {
  // Puerto del servidor
  port: process.env.PORT || 3000,
  
  // Entorno (development, production)
  env: process.env.NODE_ENV || 'development',
  
  // Directorio de carga de archivos
  uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
  
  // Ruta completa del archivo Excel
  excelFile: process.env.EXCEL_FILE || 'public/facturas.xlsx',
  
  // Idioma para OCR (spa = español)
  ocrLanguage: process.env.OCR_LANGUAGE || 'spa',
  
  // Extensiones de archivo permitidas
  allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
  
  // Tamaño máximo de archivo (10MB)
  maxFileSize: 10 * 1024 * 1024,
  
  // Configuración CORS
  corsOptions: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }
};
