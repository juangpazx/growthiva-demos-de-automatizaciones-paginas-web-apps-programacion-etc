/**
 * Procesador de OCR usando Tesseract.js
 * Extrae texto de imágenes de facturas
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFParse } = require('pdf-parse');
const { createWorker } = require('tesseract.js');
const config = require('../config/config');

/**
 * Extrae texto de un PDF si contiene texto seleccionable.
 * @param {string} pdfPath - Ruta del PDF
 * @returns {Promise<string|null>} - Texto extraído o null si no se puede extraer
 */
async function extractTextFromPdf(pdfPath) {
  try {
    const parser = new PDFParse({ url: pdfPath });
    const data = await parser.getText();
    const text = String(data.text || '').trim();

    return text.length > 20 ? text : null;
  } catch (error) {
    console.warn(`[PDF] No se pudo extraer texto del PDF: ${error.message}`);
    return null;
  }
}

/**
 * Convierte un PDF a imagen PNG temporal para OCR.
 * @param {string} pdfPath - Ruta del PDF
 * @returns {Promise<string>} - Ruta del archivo PNG generado
 */
async function convertPdfToPng(pdfPath) {
  const outputFile = `${pdfPath}.png`;
  await sharp(pdfPath, { density: 300 })
    .png()
    .toFile(outputFile);
  return outputFile;
}

/**
 * Procesa una imagen usando OCR
 * @param {string} imagePath - Ruta de la imagen a procesar
 * @returns {Promise<string>} - Texto extraído de la imagen
 */
async function processImageWithOCR(imagePath) {
  const tempFiles = [];

  try {
    console.log(`[OCR] Procesando imagen: ${imagePath}`);

    const ext = path.extname(imagePath).toLowerCase();
    let ocrInput = imagePath;

    if (ext === '.pdf') {
      const pdfText = await extractTextFromPdf(imagePath);
      if (pdfText) {
        console.log('[OCR] Texto extraído directamente del PDF');
        return pdfText;
      }

      console.log('[OCR] PDF sin texto seleccionable, intentando convertir a imagen para OCR');
      try {
        ocrInput = await convertPdfToPng(imagePath);
        tempFiles.push(ocrInput);
      } catch (pdfError) {
        console.warn(`[OCR] No se pudo convertir PDF a imagen: ${pdfError.message}`);
        throw new Error('No se pudo procesar el PDF como imagen. Use un JPG/PNG o un PDF con texto seleccionable.');
      }
    }

    let worker;
    try {
      worker = createWorker({
        logger: message => {
          const progress = Math.round((message.progress || 0) * 100);
          console.log(`[OCR] ${message.status || 'status'} ${progress}%`);
        }
      });

      await worker.load();
      await worker.loadLanguage(config.ocrLanguage);
      await worker.initialize(config.ocrLanguage);

      const { data: { text } } = await worker.recognize(ocrInput);
      console.log(`[OCR] Texto extraído exitosamente`);
      return text;
    } finally {
      if (worker) {
        try {
          await worker.terminate();
        } catch (terminateError) {
          console.warn('[OCR] Error terminando worker de Tesseract:', terminateError.message);
        }
      }
    }

    console.log(`[OCR] Texto extraído exitosamente`);
    return text;
  } catch (error) {
    console.error(`[OCR] Error procesando imagen:`, error.message || error);
    throw new Error(`Error en OCR: ${error.message || 'Error desconocido'}`);
  } finally {
    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
          console.log(`[OCR] Archivo temporal eliminado: ${file}`);
        } catch (cleanupError) {
          console.warn(`[OCR] No se pudo eliminar archivo temporal: ${file}`, cleanupError.message);
        }
      }
    });
  }
}

/**
 * Extrae datos clave del texto OCR usando expresiones regulares
 * @param {string} text - Texto extraído del OCR
 * @returns {Object} - Datos extraídos (fecha, proveedor, monto, etc.)
 */
function extractInvoiceData(text) {
  try {
    console.log(`[EXTRACCIÓN] Extrayendo datos de factura...`);

    // Objeto para almacenar los datos extraídos
    const invoiceData = {
      fecha: null,
      proveedor: null,
      monto: null,
      numeroFactura: null,
      categoria: null,
      textoCompleto: text
    };

    // Buscar fecha (formatos: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD)
    const dateRegex = /(\d{1,2}[-\/]\d{1,2}[-\/]\d{4}|\d{4}[-\/]\d{1,2}[-\/]\d{1,2})/;
    const dateMatch = text.match(dateRegex);
    if (dateMatch) {
      invoiceData.fecha = dateMatch[0];
    }

    // Buscar montos (números con 2 decimales)
    const moneyRegex = /\$?\s*(\d+[.,]\d{2})/g;
    const moneyMatches = text.match(moneyRegex);
    if (moneyMatches && moneyMatches.length > 0) {
      invoiceData.monto = moneyMatches[moneyMatches.length - 1];
    }

    // Buscar número de factura (palabras seguidas de números)
    const invoiceRegex = /(?:factura|invoice|n[º°]|#)[\s:]*([a-zA-Z0-9-]+)/i;
    const invoiceMatch = text.match(invoiceRegex);
    if (invoiceMatch) {
      invoiceData.numeroFactura = invoiceMatch[1];
    }

    // Buscar proveedor (RUC, empresa, empresa name pattern)
    const providerRegex = /(?:empresa|company|proveedor|de:)[\s]*([a-zA-Z\s&.,]+)/i;
    const providerMatch = text.match(providerRegex);
    if (providerMatch) {
      invoiceData.proveedor = providerMatch[1].trim();
    }

    // Detectar categoría basado en palabras clave
    invoiceData.categoria = detectCategory(text);

    console.log(`[EXTRACCIÓN] Datos extraídos:`, invoiceData);
    return invoiceData;
  } catch (error) {
    console.error(`[EXTRACCIÓN] Error extrayendo datos:`, error.message);
    return null;
  }
}

/**
 * Detecta la categoría de la factura basado en palabras clave
 * @param {string} text - Texto completo de la factura
 * @returns {string} - Categoría detectada
 */
function detectCategory(text) {
  const lowerText = text.toLowerCase();

  // Diccionario de palabras clave por categoría
  const categories = {
    'Servicios': ['servicio', 'consultoria', 'asesoría', 'mantenimiento', 'limpieza'],
    'Materiales': ['material', 'producto', 'equipo', 'herramienta', 'suministro'],
    'Transporte': ['transporte', 'envio', 'flete', 'logistica', 'delivery'],
    'Alimentos': ['alimento', 'comida', 'bebida', 'restaurante', 'cafeteria'],
    'Publicidad': ['publicidad', 'anuncio', 'marketing', 'publicación', 'campaña'],
    'Viaje': ['hotel', 'vuelo', 'pasaje', 'viaje', 'hospedaje'],
    'Otros': []
  };

  // Buscar coincidencias en el texto
  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }

  return 'Otros';
}

module.exports = {
  processImageWithOCR,
  extractInvoiceData
};
