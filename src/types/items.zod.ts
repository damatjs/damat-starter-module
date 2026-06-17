// This file is auto-generated. Do not edit it manually.
// Re-generate by running: bun run codegen

import { z } from "@damatjs/deps/zod";

export const newItemsSchema = z.object({
  name: z.string(),
  note: z.string().nullable().optional(),
}).strict();

export type NewItemsInput = z.infer<typeof newItemsSchema>;

export const updateItemsSchema = z.object({
  name: z.string().optional(),
  note: z.string().nullable().optional(),
}).strict();

export type UpdateItemsInput = z.infer<typeof updateItemsSchema>;

export const ItemsQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  note: z.string().nullable().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().nullable().optional(),
  deleted_at: z.coerce.date().nullable().optional(),
  limit: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().min(0).optional(),
  orderBy: z.string().optional(),
  orderDir: z.enum(['asc', 'desc']).optional(),
}).strict();

export type ItemsQuery = z.infer<typeof ItemsQuerySchema>;

export const ItemsIdSchema = z.string();

export type ItemsId = z.infer<typeof ItemsIdSchema>;
