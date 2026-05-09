#!/usr/bin/env node

/**
 * Script para convertir facturas HTML a PDF
 * Uso: node convertir_facturas.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

console.log(`\n${colors.blue}╔════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.blue}║  Convertidor de Facturas HTML a PDF   ║${colors.reset}`);
console.log(`${colors.blue}╚════════════════════════════════════════╝${colors.reset}\n`);

const ejemplosDir = path.join(__dirname);
const facturas = [
  'factura_1_servicios.html',
  'factura_2_materiales.html',
  'factura_3_transporte.html',
  'factura_4_alimentos.html',
  'factura_5_publicidad.html'
];

/**
 * Método 1: Usar Puppeteer (si está disponible)
 */
async function convertirConPuppeteer() {
  try {
    const puppeteer = require('puppeteer');
    console.log(`${colors.green}✓ Puppeteer encontrado. Iniciando conversión...${colors.reset}\n`);

    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox']
    });

    for (const factura of facturas) {
      const rutaHTML = path.join(ejemplosDir, factura);
      const rutaPDF = rutaHTML.replace('.html', '.pdf');
      
      const page = await browser.newPage();
      await page.goto(`file://${rutaHTML}`, { waitUntil: 'networkidle0' });
      await page.pdf({ path: rutaPDF, format: 'A4', margin: { top: '20px', bottom: '20px' } });
      
      console.log(`${colors.green}✓${colors.reset} ${factura} → ${path.basename(rutaPDF)}`);
    }

    await browser.close();
    console.log(`\n${colors.green}¡Conversión completada exitosamente!${colors.reset}\n`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Método 2: Mostrar instrucciones para conversión manual
 */
function mostrarInstruccionesManual() {
  console.log(`${colors.yellow}ℹ  Para convertir HTML a PDF, sigue estos pasos:${colors.reset}\n`);
  console.log(`${colors.blue}Opción A: Convertir con el Navegador${colors.reset}`);
  console.log(`  1. Abre este archivo en tu navegador:`);
  console.log(`     ${path.join(ejemplosDir, facturas[0])}\n`);
  console.log(`  2. Presiona Ctrl + P (o Cmd + P en Mac)`);
  console.log(`  3. En la ventana de impresión:`);
  console.log(`     - Destino: "Guardar como PDF"`);
  console.log(`     - Formato: A4`);
  console.log(`     - Haz clic en "Guardar"\n`);

  console.log(`${colors.blue}Opción B: Instalar Puppeteer${colors.reset}`);
  console.log(`  1. Ejecuta: npm install puppeteer`);
  console.log(`  2. Luego vuelve a ejecutar este script\n`);

  console.log(`${colors.blue}Opción C: Usar una Herramienta Online${colors.reset}`);
  console.log(`  1. Ve a: https://cloudconvert.com/`);
  console.log(`  2. Sube los archivos HTML`);
  console.log(`  3. Convierte a PDF\n`);
}

/**
 * Verificar archivos existentes
 */
function verificarArchivos() {
  console.log(`${colors.blue}Verificando archivos HTML...${colors.reset}\n`);
  
  let archivosEncontrados = 0;
  
  for (const factura of facturas) {
    const rutaHTML = path.join(ejemplosDir, factura);
    if (fs.existsSync(rutaHTML)) {
      console.log(`${colors.green}✓${colors.reset} ${factura}`);
      archivosEncontrados++;
    } else {
      console.log(`${colors.red}✗${colors.reset} ${factura} (no encontrado)`);
    }
  }

  console.log(`\n${colors.green}${archivosEncontrados}/${facturas.length}${colors.reset} archivos encontrados\n`);
  return archivosEncontrados === facturas.length;
}

/**
 * Función principal
 */
async function main() {
  try {
    // Verificar archivos
    if (!verificarArchivos()) {
      console.log(`${colors.red}✗ Algunos archivos no fueron encontrados${colors.reset}\n`);
      return;
    }

    // Intentar con Puppeteer
    const exitoPuppeteer = await convertirConPuppeteer();
    
    if (!exitoPuppeteer) {
      // Si Puppeteer no está disponible, mostrar instrucciones
      mostrarInstruccionesManual();
      console.log(`${colors.yellow}Nota:${colors.reset} Para automatizar la conversión, instala Puppeteer:\n`);
      console.log(`  npm install puppeteer\n`);
      console.log(`Luego ejecuta nuevamente este script.\n`);
    }

  } catch (error) {
    console.error(`${colors.red}Error:${colors.reset}`, error.message);
  }
}

// Ejecutar
main();
