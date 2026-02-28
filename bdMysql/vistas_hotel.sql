-- ==========================================
-- CATALOGO DE 10 VISTAS SQL (FLUIDEZ DE DATOS)
-- Better Homes Hotel - Base de Datos: hotel_db
-- ==========================================

USE hotel_db;

-- 1. view_ocupacion_actual: ¿Qué habitaciones están ocupadas HOY?
-- Muestra las habitaciones que tienen una reservación activa en la fecha actual.
CREATE OR REPLACE VIEW view_ocupacion_actual AS
SELECT
    hab.numero AS habitacion,
    hab.tipo,
    CONCAT(h.nombre, ' ', h.apellido) AS huesped,
    r.fecha_entrada,
    r.fecha_salida AS salida_prevista
FROM
    habitaciones hab
    JOIN reservaciones r ON hab.id_habitacion = r.id_habitacion
    JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE
    CURDATE() BETWEEN r.fecha_entrada AND r.fecha_salida
    AND r.estado = 'activa';

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_ocupacion_actual;

-- 2. view_disponibilidad_real: Habitaciones listas para ser vendidas.
-- Filtra solo aquellas que están marcadas como disponibles.
CREATE OR REPLACE VIEW view_disponibilidad_real AS
SELECT
    numero,
    tipo,
    precio_noche,
    piso,
    capacidad
FROM habitaciones
WHERE
    disponible = TRUE;

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_disponibilidad_real WHERE tipo = 'suite';

-- 3. view_detalle_ingresos: Reporte financiero por reservación.
-- Calcula los ingresos proyectados o reales por cada estancia.
CREATE OR REPLACE VIEW view_detalle_ingresos AS
SELECT r.id_reservacion, hab.numero AS habitacion, DATEDIFF(
        r.fecha_salida, r.fecha_entrada
    ) AS noches, r.precio_total, r.estado
FROM
    reservaciones r
    JOIN habitaciones hab ON r.id_habitacion = hab.id_habitacion
WHERE
    r.estado IN ('completada', 'activa');

-- Búsqueda de ejemplo en Workbench:
-- SELECT SUM(precio_total) AS ingresos_totales FROM view_detalle_ingresos;

-- 4. view_clientes_vip: Top 10 de clientes con mayor consumo.
-- Identifica a los huéspedes que más dinero han aportado al hotel.
CREATE OR REPLACE VIEW view_clientes_vip AS
SELECT
    h.nombre,
    h.apellido,
    h.email,
    SUM(r.precio_total) AS gasto_total,
    COUNT(r.id_reservacion) AS total_reservas
FROM huespedes h
    JOIN reservaciones r ON h.id_huesped = h.id_huesped
WHERE
    r.estado != 'cancelada'
GROUP BY
    h.id_huesped
ORDER BY gasto_total DESC
LIMIT 10;

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_clientes_vip;

-- 5. view_llegadas_hoy: Planificación de recepciones (Check-ins).
-- Lista los huéspedes que llegan hoy.
CREATE OR REPLACE VIEW view_llegadas_hoy AS
SELECT r.id_reservacion, CONCAT(h.nombre, ' ', h.apellido) AS huesped, hab.numero AS habitacion, r.notas
FROM
    reservaciones r
    JOIN huespedes h ON r.id_huesped = h.id_huesped
    JOIN habitaciones hab ON r.id_habitacion = hab.id_habitacion
WHERE
    r.fecha_entrada = CURDATE()
    AND r.estado = 'activa';

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_llegadas_hoy;

-- 6. view_salidas_hoy: Planificación de limpieza (Check-outs).
-- Lista las habitaciones que se desocupan hoy.
CREATE OR REPLACE VIEW view_salidas_hoy AS
SELECT hab.numero AS habitacion, hab.tipo, r.fecha_salida, CONCAT(h.nombre, ' ', h.apellido) AS huesped
FROM
    habitaciones hab
    JOIN reservaciones r ON hab.id_habitacion = r.id_habitacion
    JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE
    r.fecha_salida = CURDATE()
    AND r.estado = 'activa';

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_salidas_hoy;

-- 7. view_popularidad_habitaciones: Análisis de demanda por tipo.
-- Ayuda a identificar qué tipos de habitación rinden más.
CREATE OR REPLACE VIEW view_popularidad_habitaciones AS
SELECT
    hab.tipo,
    COUNT(r.id_reservacion) AS total_reservas,
    AVG(
        DATEDIFF(
            r.fecha_salida,
            r.fecha_entrada
        )
    ) AS promedio_noches
FROM
    habitaciones hab
    LEFT JOIN reservaciones r ON hab.id_habitacion = r.id_habitacion
GROUP BY
    hab.tipo
ORDER BY total_reservas DESC;

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_popularidad_habitaciones;

-- 8. view_analisis_cancelaciones: Auditoría de pérdida de ingresos.
-- Muestra cuánto se dejó de ganar por cancelaciones.
CREATE OR REPLACE VIEW view_analisis_cancelaciones AS
SELECT
    r.id_reservacion,
    h.nombre,
    h.apellido,
    r.precio_total AS monto_perdido,
    r.creado_en AS fecha_reserva
FROM reservaciones r
    JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE
    r.estado = 'cancelada';

-- Búsqueda de ejemplo en Workbench:
-- SELECT SUM(monto_perdido) FROM view_analisis_cancelaciones;

-- 9. view_ingresos_mensuales: Consolidado contable periódico.
-- Agrupa los ingresos por mes y año.
CREATE OR REPLACE VIEW view_ingresos_mensuales AS
SELECT
    YEAR(fecha_entrada) AS anio,
    MONTH(fecha_entrada) AS mes,
    SUM(precio_total) AS total_ingresos,
    COUNT(*) AS cantidad_reservas
FROM reservaciones
WHERE
    estado IN ('activa', 'completada')
GROUP BY
    anio,
    mes
ORDER BY anio DESC, mes DESC;

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_ingresos_mensuales WHERE anio = 2024;

-- 10. view_estancias_largas: Identificación de clientes frecuentes.
-- Filtra estancias de más de una semana.
CREATE OR REPLACE VIEW view_estancias_largas AS
SELECT
    CONCAT(h.nombre, ' ', h.apellido) AS huesped,
    h.email,
    r.fecha_entrada,
    r.fecha_salida,
    DATEDIFF(
        r.fecha_salida,
        r.fecha_entrada
    ) AS dias_estancia
FROM reservaciones r
    JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE
    DATEDIFF(
        r.fecha_salida,
        r.fecha_entrada
    ) > 7
    AND r.estado != 'cancelada';

-- Búsqueda de ejemplo en Workbench:
-- SELECT * FROM view_estancias_largas ORDER BY dias_estancia DESC;