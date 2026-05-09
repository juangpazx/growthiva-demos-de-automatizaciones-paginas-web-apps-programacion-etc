/**
 * Organizador de archivos
 * Maneja la creación de directorios y organización de imágenes por fecha
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * Obtiene la ruta de la carpeta por fecha (AAAA-MM-DD)
 * @param {Date} date - Fecha para crear la ruta
 * @returns {string} - Ruta de la carpeta
 */
function getDateFolderPath(date = new Date()) {
  // Formatea la fecha como YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const dateFolder = `${year}-${month}-${day}`;
  return path.join(config.uploadDir, dateFolder);
}

/**
 * Crea la estructura de carpetas por fecha si no existe
 * @returns {string} - Ruta de la carpeta creada
 */
function ensureUploadDirectory() {
  try {
    const uploadPath = getDateFolderPath();
    
    // Crear directorio si no existe (recursivamente)
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log(`[FILE] Directorio creado: ${uploadPath}`);
    }
    
    return uploadPath;
  } catch (error) {
    console.error(`[FILE] Error creando directorio:`, error.message);
    throw new Error(`Error creando directorio: ${error.message}`);
  }
}

/**
 * Genera un nombre de archivo único basado en timestamp
 * @param {string} originalName - Nombre original del archivo
 * @returns {string} - Nombre único para el archivo
 */
function generateUniqueFileName(originalName) {
  // Obtener la extensión del archivo
  const ext = path.extname(originalName);
  
  // Generar timestamp único
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  
  // Crear nombre único
  const uniqueName = `${timestamp}-${random}${ext}`;
  
  console.log(`[FILE] Nombre único generado: ${uniqueName}`);
  return uniqueName;
}

/**
 * Obtiene la ruta relativa para acceso web del archivo
 * @param {string} uploadPath - Ruta completa del archivo guardado
 * @returns {string} - Ruta relativa para acceso web
 */
function getWebPath(uploadPath) {
  // Convertir ruta de Windows a formato web
  const relativePath = path.relative(process.cwd(), uploadPath);
  const webPath = '/' + relativePath.replace(/\\/g, '/');
  
  return webPath;
}

/**
 * Obtiene información del archivo guardado
 * @param {string} filePath - Ruta del archivo
 * @returns {Object} - Información del archivo
 */
function getFileInfo(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }
    
    const stats = fs.statSync(filePath);
    
    return {
      path: filePath,
      webPath: getWebPath(filePath),
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime
    };
  } catch (error) {
    console.error(`[FILE] Error obteniendo info del archivo:`, error.message);
    return null;
  }
}

/**
 * Verifica si un archivo es válido según extensión y tamaño
 * @param {string} fileName - Nombre del archivo
 * @param {number} fileSize - Tamaño del archivo en bytes
 * @returns {Object} - { valid: boolean, error: string }
 */
function validateFile(fileName, fileSize) {
  // Verificar extensión
  const ext = path.extname(fileName).toLowerCase();
  if (!config.allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `Extensión no permitida: ${ext}. Permitidas: ${config.allowedExtensions.join(', ')}`
    };
  }
  
  // Verificar tamaño
  if (fileSize > config.maxFileSize) {
    const maxSizeMB = Math.round(config.maxFileSize / (1024 * 1024));
    return {
      valid: false,
      error: `Tamaño de archivo excede el límite de ${maxSizeMB}MB`
    };
  }
  
  return { valid: true };
}

module.exports = {
  getDateFolderPath,
  ensureUploadDirectory,
  generateUniqueFileName,
  getWebPath,
  getFileInfo,
  validateFile
};
