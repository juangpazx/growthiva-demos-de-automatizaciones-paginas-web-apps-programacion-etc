const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeLib = require('qrcode');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Archivo CSV de respaldo local
const csvFilePath = path.join(__dirname, 'leads.csv');

// Inicializar el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "v2" }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Variables para mantener contexto de conversación
const conversationHistory = {};
let qrGenerated = false; // Bandera para evitar múltiples QR

// Autenticación con Google Sheets (Opcional)
async function saveToGoogleSheets(nombre, telefono, mensaje) {
    try {
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            saveToLocalCSV(nombre, telefono, mensaje);
            return;
        }

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            Fecha: new Date().toLocaleString(),
            Nombre: nombre,
            Telefono: telefono,
            Mensaje: mensaje
        });
        console.log('✅ Lead guardado en Google Sheets.');
    } catch (error) {
        console.error('❌ Error Google Sheets:', error.message);
        saveToLocalCSV(nombre, telefono, mensaje);
    }
}

// Guardado local en CSV
function saveToLocalCSV(nombre, telefono, mensaje) {
    const header = "Fecha,Nombre,Telefono,Mensaje\n";
    const date = new Date().toLocaleString();
    const row = `"${date}","${nombre}","${telefono}","${mensaje.replace(/"/g, '""')}"\n`;
    
    if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, header + row);
    } else {
        fs.appendFileSync(csvFilePath, row);
    }
}

// Función para generar respuestas inteligentes
async function generarRespuesta(mensajeCliente, numeroTelefono) {
    const mensaje = mensajeCliente.toLowerCase().trim();
    
    if (!conversationHistory[numeroTelefono]) {
        conversationHistory[numeroTelefono] = [];
    }
    conversationHistory[numeroTelefono].push(mensaje);
    
    // Saludos iniciales
    if (mensaje.match(/^(hola|hi|buenos días|buenas noches|buenos tardes|saludos|¿?qué tal\??)/)) {
        return "¡Hola! 👋 Bienvenido a Clínica Dental Sonrisa Plus.\n\nSoy tu asistente virtual de atención al cliente. Te puedo ayudar con:\n\n📍 Información sobre ubicación y horarios\n💰 Precios y tratamientos\n👨‍⚕️ Nuestro equipo médico\n📅 Agendar citas\n🚨 Urgencias dentales\n\n¿En qué puedo ayudarte hoy?";
    }
    
    if (mensaje.includes('precio') || mensaje.includes('costo') || mensaje.includes('cuánto')) {
        if (mensaje.includes('implante')) {
            return "💎 IMPLANTE DENTAL\n\nPrecio: 900€ - 1.200€\n(Incluye implante + corona)\n\nEspecialista: Dr. Javier Ruiz\n\n¿Deseas agendar consulta?";
        }
        if (mensaje.includes('blanquea')) {
            return "✨ BLANQUEAMIENTO DENTAL\n\n• Blanqueamiento LED: 150€\n• Combinado (clínica + férulas): 250€\n\n¡Promoción 2x1 disponible!\n\n¿Te interesa?";
        }
        if (mensaje.includes('ortodoncia') || mensaje.includes('bracket')) {
            return "😁 ORTODONCIA\n\n• Metálica: 1.500€ - 1.900€\n• Estética: 2.000€ - 2.400€\n• Invisible: desde 1.800€\n\nPrimer valoración: GRATIS\n\n¿Quieres agendar?";
        }
        return "💰 SERVICIOS Y PRECIOS\n\n• Limpieza: 45€\n• Empastes: 45-90€\n• Implantes: 900-1.200€\n• Ortodoncia: desde 1.500€\n\nPresupuestos CERRADOS sin sorpresas.\nFinanciación 12 meses sin intereses.\n\n¿Cuál te interesa?";
    }
    
    if (mensaje.includes('horario') || mensaje.includes('abierto') || mensaje.includes('cierre')) {
        return "🕒 HORARIOS\n\n📅 Lunes-Viernes: 9:00-14:00 y 16:00-20:00\n📅 Sábados: 9:00-13:00\n📅 Domingos: Cerrado\n\n🚨 URGENCIAS: Atendemos con cita rápida\n\n¿Necesitas cita urgente?";
    }
    
    if (mensaje.includes('ubicación') || mensaje.includes('dónde') || mensaje.includes('dirección')) {
        return "📍 UBICACIÓN\n\nCalle Salud 25, Málaga Centro\n\n🚌 Transporte:\n• Frente a parada autobús\n• 3 minutos del metro\n• Estacionamiento disponible\n\n¿Necesitas indicaciones?";
    }
    
    if (mensaje.includes('contacto') || mensaje.includes('teléfono') || mensaje.includes('email')) {
        return "📞 CONTACTO\n\n☎️ Teléfono: 600 123 456\n📱 WhatsApp: 600 123 456\n📧 Email: info@sonrisaplus.es\n🌐 Web: www.sonrisaplus.es\n\n¿Hay algo más?";
    }
    
    if (mensaje.includes('médico') || mensaje.includes('doctor') || mensaje.includes('equipo')) {
        return "👨‍⚕️ NUESTRO EQUIPO\n\n🦷 Dra. Laura Martínez - Odontología General\n👨‍⚕️ Dr. Javier Ruiz - Implantes y Cirugía\n👩‍⚕️ Dra. Ana Torres - Ortodoncia\n\nTodo certificado y con amplia experiencia.\n\n¿Deseas agendar?";
    }
    
    if (mensaje.includes('niño') || mensaje.includes('infantil') || mensaje.includes('hijo')) {
        return "👶 SERVICIOS INFANTILES\n\n✅ Revisión: GRATIS\n✅ Limpieza + flúor: 30€\n✅ Empaste: 35-50€\n\nAtención amable y especializada para niños.\n\n¿Quieres agendar?";
    }
    
    if (mensaje.includes('miedo') || mensaje.includes('ansiedad') || mensaje.includes('asusta')) {
        return "💙 ENTENDEMOS TU PREOCUPACIÓN\n\nOfrecemos:\n✅ Atención especial para ansiedad\n✅ Equipo empático y comprensivo\n✅ Trabajamos a tu ritmo\n\nTe sentirás cómodo y seguro.\n\n¿Agendar consulta?";
    }
    
    if (mensaje.includes('urgencia') || mensaje.includes('dolor') || mensaje.includes('duele')) {
        return "🚨 URGENCIAS\n\nAtendemos urgencias con PRIORIDAD.\n\n☎️ LLAMA AHORA: 600 123 456\n📱 WhatsApp: 600 123 456\n\nDescribe tu problema para ayudarte.";
    }
    
    if (mensaje.includes('cita') || mensaje.includes('agendar') || mensaje.includes('reservar')) {
        return "📅 AGENDAR CITA\n\nContáctanos por:\n\n1️⃣ ☎️ Teléfono: 600 123 456\n2️⃣ 📱 WhatsApp: 600 123 456\n3️⃣ 📧 Email: info@sonrisaplus.es\n\n¿Cuál servicio necesitas?";
    }
    
    if (mensaje.includes('promoción') || mensaje.includes('descuento') || mensaje.includes('oferta')) {
        return "🎁 PROMOCIONES VIGENTES\n\n✨ Limpieza + Revisión + Radiografía: 45€\n✨ Blanqueamiento 2x1\n✨ 10% estudiantes y mayores 65 años\n✨ Financiación 12 meses sin intereses\n\n¡Aprovecha!";
    }
    
    if (mensaje.includes('garantía') || mensaje.includes('política')) {
        return "✅ GARANTÍA Y POLÍTICAS\n\n🛡️ Garantía en implantes y prótesis\n💯 Presupuestos cerrados sin sorpresas\n🤝 Citas puntuales garantizadas\n💳 Financiación flexible\n\nTu confianza es importante.";
    }
    
    if (mensaje.includes('tecnolog') || mensaje.includes('radiografía')) {
        return "🛠️ TECNOLOGÍA MODERNA\n\n📷 Radiografía digital de baja radiación\n🔬 Escáner intraoral 3D\n💡 Blanqueamiento LED\n🎨 Diseño de sonrisa (DSD)\n🔒 Esterilización ISO\n\nÚltima generación.";
    }
    
    if (mensaje.includes('financiación') || mensaje.includes('pago') || mensaje.includes('cuotas')) {
        return "💳 FINANCIACIÓN\n\n✅ Hasta 12 meses sin intereses\n✅ Planes flexibles\n✅ Adaptamos a tu presupuesto\n\nContáctanos para opciones específicas.";
    }
    
    // Respuesta por defecto
    return "¡Gracias por tu mensaje! 😊\n\nPuedes escribir:\n\n• 'Precios'\n• 'Horarios'\n• 'Cita'\n• 'Ubicación'\n• 'Equipo'\n• 'Urgencia'\n\n¿Qué necesitas?";
}

// Eventos de WhatsApp
client.on('qr', async (qr) => {
    if (qrGenerated) return; // Evitar múltiples QR
    qrGenerated = true;
    
    console.log('\n======================================================');
    console.log('📱 GENERANDO CÓDIGO QR...');
    
    try {
        const qrPath = path.join(__dirname, 'qr.png');
        await qrcodeLib.toFile(qrPath, qr);
        console.log('✅ QR GUARDADO: ' + qrPath);
        console.log('Por favor escanea el archivo qr.png con WhatsApp');
    } catch (err) {
        console.error('Error QR:', err.message);
    }
    console.log('======================================================\n');
});

client.on('ready', () => {
    console.log('\n✅ ¡Bot conectado y listo para mensajes!');
    qrGenerated = true;
});

client.on('message', async (message) => {
    if (message.from.includes('@g.us') || message.from === 'status@broadcast') return;

    const contact = await message.getContact();
    const nombre = contact.pushname || 'Usuario';
    const telefono = contact.number || message.from.split('@')[0];
    const mensajeCliente = message.body;

    console.log(`\n📩 Mensaje: ${nombre} - ${mensajeCliente}`);

    await saveToGoogleSheets(nombre, telefono, mensajeCliente);

    const respuesta = await generarRespuesta(mensajeCliente, telefono);
    await message.reply(respuesta);
    console.log('📤 Respuesta enviada');
});

client.on('disconnected', () => {
    console.log('⚠️ Bot desconectado');
});

// Iniciar
console.log('Iniciando bot...');
client.initialize();
