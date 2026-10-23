-- ========================================================
-- ALTERNIKA QR STUDIO - ESQUEMA DE BASE DE DATOS SUPABASE
-- ========================================================
-- Instrucciones:
-- 1. Entra a tu proyecto en https://supabase.com
-- 2. Ve a la pestaña "SQL Editor" en el menú lateral izquierdo
-- 3. Pega todo este código y presiona "Run"
-- ========================================================

-- 1. Crear tabla de códigos QR dinámicos
CREATE TABLE IF NOT EXISTS public.dynamic_qrs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  scan_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.dynamic_qrs ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de seguridad (Acceso para lectura, inserción, actualización y borrado)
CREATE POLICY "Permitir lectura publica de dynamic_qrs"
  ON public.dynamic_qrs FOR SELECT
  USING (true);

CREATE POLICY "Permitir insercion publica de dynamic_qrs"
  ON public.dynamic_qrs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir actualizacion de dynamic_qrs"
  ON public.dynamic_qrs FOR UPDATE
  USING (true);

CREATE POLICY "Permitir eliminacion de dynamic_qrs"
  ON public.dynamic_qrs FOR DELETE
  USING (true);

-- 4. Función RPC para incremento atómico de contador de escaneos
CREATE OR REPLACE FUNCTION increment_qr_scan(target_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.dynamic_qrs
  SET scan_count = COALESCE(scan_count, 0) + 1,
      updated_at = NOW()
  WHERE UPPER(code) = UPPER(target_code);
END;
$$ LANGUAGE plpgsql;

-- 5. Insertar registros iniciales de demostración (Opcional)
INSERT INTO public.dynamic_qrs (code, business_name, destination_url, scan_count, is_active)
VALUES
  ('2026A1', 'Alternika Digital Card', 'https://alternika.com.mx/maurojas', 14, true),
  ('2026A2', 'WhatsApp Directo Mauro', 'https://wa.me/525522965764', 28, true)
ON CONFLICT (code) DO NOTHING;

-- 6. Control de soluciones vendidas (opcional si ya creaste la tabla)
ALTER TABLE public.dynamic_qrs ADD COLUMN IF NOT EXISTS is_sold BOOLEAN DEFAULT FALSE;
