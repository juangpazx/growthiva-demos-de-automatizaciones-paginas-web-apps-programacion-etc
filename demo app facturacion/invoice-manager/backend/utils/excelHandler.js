/**
 * Manejador de archivos Excel
 * Crea, lee y actualiza archivos Excel con datos de facturas
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * Crea o abre un archivo Excel
 * @returns {Object} - Workbook de XLSX
 */
function initializeExcel() {
  try {
    const excelPath = config.excelFile;
    
    // Verificar si el archivo ya existe
    if (fs.existsSync(excelPath)) {
      console.log(`[EXCEL] Abriendo archivo existente: ${excelPath}`);
      return XLSX.readFile(excelPath);
    } else {
      console.log(`[EXCEL] Creando nuevo archivo Excel...`);
      
      // Crear un nuevo workbook
      const workbook = XLSX.utils.book_new();
      
      // Crear la hoja con encabezados
      const worksheetData = [
        ['Fecha', 'Proveedor', 'Monto', 'Número de Factura', 'Categoría', 'Ruta de Imagen', 'Fecha de Registro']
      ];
      
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      
      // Ajustar ancho de columnas
      worksheet['!cols'] = [
        { wch: 12 },  // Fecha
        { wch: 25 },  // Proveedor
        { wch: 15 },  // Monto
        { wch: 18 },  // Número de Factura
        { wch: 15 },  // Categoría
        { wch: 40 },  // Ruta de Imagen
        { wch: 18 }   // Fecha de Registro
      ];
      
      // Agregar la hoja al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Facturas');
      
      // Crear el directorio si no existe
      const dir = path.dirname(excelPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Guardar el archivo
      XLSX.writeFile(workbook, excelPath);
      console.log(`[EXCEL] Archivo creado exitosamente: ${excelPath}`);
      
      return workbook;
    }
  } catch (error) {
    console.error(`[EXCEL] Error inicializando Excel:`, error.message);
    throw new Error(`Error en manejo de Excel: ${error.message}`);
  }
}

/**
 * Agrega una fila de datos al Excel
 * @param {Object} invoiceData - Datos de la factura
 * @param {string} imagePath - Ruta de la imagen guardada
 * @returns {boolean} - true si se guardó exitosamente
 */
function addInvoiceToExcel(invoiceData, imagePath) {
  try {
    console.log(`[EXCEL] Agregando factura al Excel...`);
    
    // Abrir el archivo Excel
    const workbook = initializeExcel();
    const worksheet = workbook.Sheets['Facturas'];
    
    // Convertir los datos existentes a un array
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    // Preparar la nueva fila
    const newRow = {
      'Fecha': invoiceData.fecha || 'N/A',
      'Proveedor': invoiceData.proveedor || 'N/A',
      'Monto': invoiceData.monto || 'N/A',
      'Número de Factura': invoiceData.numeroFactura || 'N/A',
      'Categoría': invoiceData.categoria || 'Otros',
      'Ruta de Imagen': imagePath,
      'Fecha de Registro': new Date().toLocaleString('es-ES')
    };
    
    // Agregar la nueva fila
    data.push(newRow);
    
    // Crear una nueva hoja con los datos actualizados
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    
    // Ajustar ancho de columnas
    newWorksheet['!cols'] = [
      { wch: 12 },  // Fecha
      { wch: 25 },  // Proveedor
      { wch: 15 },  // Monto
      { wch: 18 },  // Número de Factura
      { wch: 15 },  // Categoría
      { wch: 40 },  // Ruta de Imagen
      { wch: 18 }   // Fecha de Registro
    ];
    
    // Reemplazar la hoja en el workbook
    workbook.Sheets['Facturas'] = newWorksheet;
    
    // Guardar el archivo actualizado
    XLSX.writeFile(workbook, config.excelFile);
    console.log(`[EXCEL] Factura agregada exitosamente`);
    
    return true;
  } catch (error) {
    console.error(`[EXCEL] Error agregando factura:`, error.message);
    throw new Error(`Error agregando factura a Excel: ${error.message}`);
  }
}

/**
 * Obtiene todas las facturas del Excel
 * @returns {Array} - Array de facturas
 */
function getAllInvoices() {
  try {
    console.log(`[EXCEL] Leyendo todas las facturas...`);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(config.excelFile)) {
      console.log(`[EXCEL] Archivo no existe, retornando array vacío`);
      return [];
    }
    
    // Leer el archivo
    const workbook = XLSX.readFile(config.excelFile);
    const worksheet = workbook.Sheets['Facturas'];
    
    // Convertir a JSON, omitiendo la fila de encabezados
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`[EXCEL] ${data.length} facturas leídas`);
    return data;
  } catch (error) {
    console.error(`[EXCEL] Error leyendo facturas:`, error.message);
    return [];
  }
}

module.exports = {
  initializeExcel,
  addInvoiceToExcel,
  getAllInvoices
};
