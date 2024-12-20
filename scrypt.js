// Elementos del DOM
const input_mes = document.getElementById('input_mes');
const resultado = document.getElementById('resultado');
const input_meses_futuros = document.getElementById('input_meses_futuros');
const resultado_fecha = document.getElementById('resultado_fecha');

// Configuración de formato de moneda
const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

// Nombres de los meses
const nombres_meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Event listeners para inputs (permite calcular al presionar Enter)
input_mes.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calcular_precio();
});

input_meses_futuros.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') calcular_fecha_futura();
});

// Función para calcular precio mensual
function calcular_precio() {
    const precio_value = parseInt(input_mes.value);

    if (!precio_value || precio_value <= 0) {
        mostrarResultado(resultado, 'Por favor ingrese un precio válido', true);
        return;
    }

    const precio = precio_value * 4;
    mostrarResultado(resultado, `Total mensual: ${formatoMoneda.format(precio)}`);
}

// Función para calcular fecha futura
function calcular_fecha_futura() {
    const meses = parseInt(input_meses_futuros.value);
    
    if (!meses || meses <= 0) {
        mostrarResultado(resultado_fecha, 'Por favor ingrese un número válido de meses', true);
        return;
    }

    const fecha_actual = new Date();
    const fecha_futura = new Date(fecha_actual);
    fecha_futura.setMonth(fecha_actual.getMonth() + meses);

    const mes_futuro = nombres_meses[fecha_futura.getMonth()];
    const año_futuro = fecha_futura.getFullYear();

    mostrarResultado(resultado_fecha, `${mes_futuro} ${año_futuro}`);
}

// Función auxiliar para mostrar resultados
function mostrarResultado(elemento, mensaje, esError = false) {
    elemento.textContent = mensaje;
    elemento.style.color = esError ? '#ef4444' : '#10b981';
    elemento.style.opacity = '0';
    elemento.style.transition = 'opacity 0.3s ease';
    
    requestAnimationFrame(() => {
        elemento.style.opacity = '1';
    });
}