-- Migration: Module-sample
-- Module: module-sample
-- Created: 2026-06-17T11:55:34.662Z
--
-- 1 table created
--
-- This migration was auto-generated based on schema changes.
-- Review the SQL statements before running in production.

CREATE TABLE IF NOT EXISTS "public"."items" (
  "id" TEXT PRIMARY KEY DEFAULT generate_id('itm'),
  "name" TEXT NOT NULL,
  "note" TEXT NULL,
  "created_at" DATE NOT NULL DEFAULT now(),
  "updated_at" DATE NULL,
  "deleted_at" DATE NULL
);
