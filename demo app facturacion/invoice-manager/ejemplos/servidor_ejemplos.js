#!/usr/bin/env node

/**
 * Servidor para visualizar y convertir facturas de ejemplo
 * Uso: node servidor_ejemplos.js
 * Acceso: http://localhost:3001
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const ejemplosDir = __dirname;

// Servir archivos estáticos
app.use(express.static(ejemplosDir));

// Página principal con lista de facturas
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Facturas de Ejemplo - Invoice Manager</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
      <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-blue-600">
            <i class="fas fa-file-invoice mr-2"></i> Facturas de Ejemplo
          </h1>
          <p class="text-gray-600 text-sm mt-1">Invoice Manager - Sistema de Gestión de Facturas</p>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Panel de Instrucciones -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4 text-gray-900">
              <i class="fas fa-book text-blue-600 mr-2"></i> Cómo Usar
            </h2>
            
            <div class="space-y-4 text-sm text-gray-700">
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Paso 1: Ver Factura</h3>
                <p>Haz clic en cualquiera de las facturas abajo para verla en el navegador.</p>
              </div>
              
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Paso 2: Convertir a PDF</h3>
                <ol class="list-decimal list-inside space-y-1 ml-2">
                  <li>Con la factura abierta, presiona <kbd class="bg-gray-200 px-2 py-1 rounded">Ctrl + P</kbd></li>
                  <li>Selecciona "Guardar como PDF"</li>
                  <li>Guarda el archivo</li>
                </ol>
              </div>

              <div>
                <h3 class="font-bold text-gray-900 mb-2">Paso 3: Usar en la App</h3>
                <ol class="list-decimal list-inside space-y-1 ml-2">
                  <li>Ve a <a href="http://localhost:3000" class="text-blue-600 underline">http://localhost:3000</a></li>
                  <li>Sube el PDF o JPG</li>
                  <li>¡La app procesa automáticamente!</li>
                </ol>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                <i class="fas fa-lightbulb text-blue-600 mr-2"></i>
                <strong>Tip:</strong> Todos los archivos son completamente funcionales para probar el OCR.
              </div>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-4 text-gray-900">
              <i class="fas fa-chart-bar text-green-600 mr-2"></i> Facturas Disponibles
            </h2>
            
            <div class="space-y-3">
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded p-3">
                <i class="fas fa-briefcase text-blue-600 mr-2"></i>
                <span class="font-semibold">1 Factura de Servicios</span>
                <span class="text-sm text-gray-600 block">TechConsulting - $12,390.00</span>
              </div>

              <div class="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded p-3">
                <i class="fas fa-cube text-green-600 mr-2"></i>
                <span class="font-semibold">1 Factura de Materiales</span>
                <span class="text-sm text-gray-600 block">SuplyStore - $7,678.26</span>
              </div>

              <div class="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded p-3">
                <i class="fas fa-truck text-blue-600 mr-2"></i>
                <span class="font-semibold">1 Factura de Transporte</span>
                <span class="text-sm text-gray-600 block">Transportes Rápido - $5,015.00</span>
              </div>

              <div class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded p-3">
                <i class="fas fa-utensils text-orange-600 mr-2"></i>
                <span class="font-semibold">1 Factura de Alimentos</span>
                <span class="text-sm text-gray-600 block">Gourmet Perú - $9,841.20</span>
              </div>

              <div class="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded p-3">
                <i class="fas fa-bullhorn text-purple-600 mr-2"></i>
                <span class="font-semibold">1 Factura de Publicidad</span>
                <span class="text-sm text-gray-600 block">CreativeAds - $6,319.20</span>
              </div>

              <div class="mt-4 p-3 bg-gray-100 rounded">
                <strong class="text-lg">Total:</strong> <span class="text-2xl font-bold text-green-600">5 Facturas</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjetas de Facturas -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">
            <i class="fas fa-list text-blue-600 mr-2"></i> Ver y Descargar
          </h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Factura 1 -->
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-gray-900">Servicios</h3>
                  <p class="text-sm text-gray-600">TechConsulting Perú</p>
                </div>
                <i class="fas fa-briefcase text-blue-600 text-xl"></i>
              </div>
              <p class="text-2xl font-bold text-green-600 mb-4">$12,390.00</p>
              <div class="space-y-2">
                <a href="/factura_1_servicios.html" target="_blank" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded transition text-center text-sm">
                  <i class="fas fa-eye mr-1"></i> Ver Factura
                </a>
              </div>
            </div>

            <!-- Factura 2 -->
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-gray-900">Materiales</h3>
                  <p class="text-sm text-gray-600">SuplyStore Perú</p>
                </div>
                <i class="fas fa-cube text-green-600 text-xl"></i>
              </div>
              <p class="text-2xl font-bold text-green-600 mb-4">$7,678.26</p>
              <div class="space-y-2">
                <a href="/factura_2_materiales.html" target="_blank" class="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded transition text-center text-sm">
                  <i class="fas fa-eye mr-1"></i> Ver Factura
                </a>
              </div>
            </div>

            <!-- Factura 3 -->
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-gray-900">Transporte</h3>
                  <p class="text-sm text-gray-600">Transportes Rápido</p>
                </div>
                <i class="fas fa-truck text-blue-600 text-xl"></i>
              </div>
              <p class="text-2xl font-bold text-green-600 mb-4">$5,015.00</p>
              <div class="space-y-2">
                <a href="/factura_3_transporte.html" target="_blank" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded transition text-center text-sm">
                  <i class="fas fa-eye mr-1"></i> Ver Factura
                </a>
              </div>
            </div>

            <!-- Factura 4 -->
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-gray-900">Alimentos</h3>
                  <p class="text-sm text-gray-600">Distribuidora Gourmet</p>
                </div>
                <i class="fas fa-utensils text-orange-600 text-xl"></i>
              </div>
              <p class="text-2xl font-bold text-green-600 mb-4">$9,841.20</p>
              <div class="space-y-2">
                <a href="/factura_4_alimentos.html" target="_blank" class="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-3 rounded transition text-center text-sm">
                  <i class="fas fa-eye mr-1"></i> Ver Factura
                </a>
              </div>
            </div>

            <!-- Factura 5 -->
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-gray-900">Publicidad</h3>
                  <p class="text-sm text-gray-600">CreativeAds Perú</p>
                </div>
                <i class="fas fa-bullhorn text-purple-600 text-xl"></i>
              </div>
              <p class="text-2xl font-bold text-green-600 mb-4">$6,319.20</p>
              <div class="space-y-2">
                <a href="/factura_5_publicidad.html" target="_blank" class="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-3 rounded transition text-center text-sm">
                  <i class="fas fa-eye mr-1"></i> Ver Factura
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-bold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i> ¿Necesitas Ayuda?
          </h3>
          <p class="text-gray-700 mb-3">
            1. Abre cualquiera de las 5 facturas de ejemplo arriba<br>
            2. Presiona Ctrl+P para convertir a PDF<br>
            3. Sube el PDF a <a href="http://localhost:3000" class="text-blue-600 underline font-medium">la app principal</a><br>
            4. ¡El OCR procesará automáticamente los datos!
          </p>
          <p class="text-sm text-gray-600">
            <strong>Total de facturas de ejemplo:</strong> 5 facturas diferentes<br>
            <strong>Monto total de ejemplo:</strong> $41,243.66<br>
            <strong>Categorías cubiertas:</strong> Servicios, Materiales, Transporte, Alimentos, Publicidad
          </p>
        </div>
      </main>
    </body>
    </html>
  `;

  res.send(html);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log('VISOR DE FACTURAS DE EJEMPLO');
  console.log('='.repeat(50));
  console.log(`✓ Servidor ejecutándose en: http://localhost:${PORT}`);
  console.log(`✓ Facturas de ejemplo: 5 disponibles`);
  console.log(`✓ Instrucciones: Abre http://localhost:${PORT} en tu navegador`);
  console.log('='.repeat(50) + '\n');
});
