-- ============================================================
-- Rino Riyadi Wana Research — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT        NOT NULL,
  slug            TEXT        UNIQUE NOT NULL,
  excerpt         TEXT,
  content         TEXT        NOT NULL DEFAULT '',
  cover_image_url TEXT,
  category        TEXT        NOT NULL DEFAULT 'Research',
  tags            TEXT[],
  published       BOOLEAN     NOT NULL DEFAULT false,
  read_time       INTEGER     NOT NULL DEFAULT 5,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row-Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public: read published articles only
CREATE POLICY "Public read published"
  ON articles FOR SELECT
  USING (published = true);

-- Authenticated (you, the admin): full access
CREATE POLICY "Admin full access"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage: create via Supabase Dashboard
-- 1. Go to Storage → New bucket
-- 2. Name: "article-images"
-- 3. Toggle ON "Public bucket"
-- 4. Save
-- ============================================================
