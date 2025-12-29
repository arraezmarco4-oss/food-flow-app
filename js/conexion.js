// js/conexion.js

// 1. Intentamos obtener las llaves desde el Snippet de Netlify
// Si no existen (porque estamos en local), intentará buscarlas en el config.js
const supabaseUrl = window.CONFIG?.SUPABASE_URL || (typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_URL : null);
const supabaseKey = window.CONFIG?.SUPABASE_KEY || (typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_KEY : null);

// 2. Verificación de seguridad en la consola
if (!supabaseUrl || !supabaseKey) {
    console.error("⚠️ Error: No se encontraron las llaves de conexión.");
}

// 3. Crear el cliente de conexión
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
