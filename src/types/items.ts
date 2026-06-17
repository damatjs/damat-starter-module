// This file is auto-generated. Do not edit it manually.
// Re-generate by running: bun run codegen

export interface Items {
  id: string;
  name: string;
  note: string | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export type NewItems = {
  name: string;
  note?: string | null;
};

export type UpdateItems = Partial<Omit<Items, 'id'>>;
