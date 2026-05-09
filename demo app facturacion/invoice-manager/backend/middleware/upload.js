/**
 * Middleware para manejo de carga de archivos con Multer
 * Configura las restricciones y el almacenamiento de archivos
 */

const multer = require('multer');
const path = require('path');
const { ensureUploadDirectory, generateUniqueFileName, validateFile } = require('../utils/fileOrganizer');
const config = require('../config/config');

// Configurar el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Obtener la ruta del directorio para hoy
      const uploadPath = ensureUploadDirectory();
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      // Generar nombre único para el archivo
      const uniqueName = generateUniqueFileName(file.originalname);
      cb(null, uniqueName);
    } catch (error) {
      cb(error);
    }
  }
});

// Configurar filtro de archivos
const fileFilter = (req, file, cb) => {
  try {
    // Validar el archivo
    const validation = validateFile(file.originalname, file.size);
    
    if (!validation.valid) {
      console.log(`[UPLOAD] Archivo rechazado: ${validation.error}`);
      cb(new Error(validation.error));
    } else {
      console.log(`[UPLOAD] Archivo validado: ${file.originalname}`);
      cb(null, true);
    }
  } catch (error) {
    cb(error);
  }
};

// Crear instancia de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
});

module.exports = upload;
