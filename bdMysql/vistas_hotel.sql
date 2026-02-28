-- ==========================================
-- CATALOGO COMPLETO DE VISTAS SQL (15 VISTAS)
-- Better Homes Hotel - Base de Datos: hotel_db
-- ==========================================

USE hotel_db;

-- ==========================================
-- PARTE 1: INDICADORES BÁSICOS DE ANÁLISIS
-- ==========================================

-- 1. view_total_habitaciones_libres: Cantidad de habitaciones libres
CREATE OR REPLACE VIEW view_total_habitaciones_libres AS
SELECT COUNT(*) AS total_disponibles
FROM habitaciones
WHERE
    disponible = TRUE;

-- 2. view_total_huespedes: Cantidad de Usuarios registrados
CREATE OR REPLACE VIEW view_total_huespedes AS
SELECT COUNT(*) AS total_registrados
FROM huespedes;

-- 3. view_conteo_reservas_mensuales: Cantidad de reservaciones por mes
CREATE OR REPLACE VIEW view_conteo_reservas_mensuales AS
SELECT YEAR(fecha_entrada) AS anio, MONTH(fecha_entrada) AS mes, COUNT(*) AS total_reservas
FROM reservaciones
GROUP BY
    anio,
    mes
ORDER BY anio DESC, mes DESC;

-- 4. view_huespedes_frecuentes: Usuarios Frecuentes
CREATE OR REPLACE VIEW view_huespedes_frecuentes AS
SELECT CONCAT(h.nombre, ' ', h.apellido) AS huesped, h.email, COUNT(r.id_reservacion) AS total_estancias
FROM huespedes h
    JOIN reservaciones r ON h.id_huesped = h.id_huesped
GROUP BY
    h.id_huesped
ORDER BY total_estancias DESC;

-- 5. view_habitaciones_populares: Habitaciones más utilizadas
CREATE OR REPLACE VIEW view_habitaciones_populares AS
SELECT hab.numero, hab.tipo, COUNT(r.id_reservacion) AS veces_reservada
FROM
    habitaciones hab
    JOIN reservaciones r ON hab.id_habitacion = r.id_habitacion
GROUP BY
    hab.id_habitacion
ORDER BY veces_reservada DESC;

-- ==========================================
-- PARTE 2: CATÁLOGO DE GESTIÓN PROFESIONAL
-- ==========================================

-- 1. view_ocupacion_actual: ¿Qué habitaciones están ocupadas HOY?
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

-- 2. view_disponibilidad_real: Habitaciones listas para ser vendidas.
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

-- 3. view_detalle_ingresos: Reporte financiero por reservación.
CREATE OR REPLACE VIEW view_detalle_ingresos AS
SELECT r.id_reservacion, hab.numero AS habitacion, DATEDIFF(
        r.fecha_salida, r.fecha_entrada
    ) AS noches, r.precio_total, r.estado
FROM
    reservaciones r
    JOIN habitaciones hab ON r.id_habitacion = hab.id_habitacion
WHERE
    r.estado IN ('completada', 'activa');

-- 4. view_clientes_vip: Top 10 de clientes con mayor consumo.
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

-- 5. view_llegadas_hoy: Planificación de recepciones (Check-ins).
CREATE OR REPLACE VIEW view_llegadas_hoy AS
SELECT r.id_reservacion, CONCAT(h.nombre, ' ', h.apellido) AS huesped, hab.numero AS habitacion, r.notas
FROM
    reservaciones r
    JOIN huespedes h ON r.id_huesped = h.id_huesped
    JOIN habitaciones hab ON r.id_habitacion = hab.id_habitacion
WHERE
    r.fecha_entrada = CURDATE()
    AND r.estado = 'activa';

-- 6. view_salidas_hoy: Planificación de limpieza (Check-outs).
CREATE OR REPLACE VIEW view_salidas_hoy AS
SELECT hab.numero AS habitacion, hab.tipo, r.fecha_salida, CONCAT(h.nombre, ' ', h.apellido) AS huesped
FROM
    habitaciones hab
    JOIN reservaciones r ON hab.id_habitacion = r.id_habitacion
    JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE
    r.fecha_salida = CURDATE()
    AND r.estado = 'activa';

-- 7. view_popularidad_habitaciones: Análisis de demanda por tipo.
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

-- 8. view_analisis_cancelaciones: Auditoría de pérdida de ingresos.
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

-- 9. view_ingresos_mensuales: Consolidado contable periódico.
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

-- 10. view_estancias_largas: Identificación de clientes frecuentes (> 7 días).
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