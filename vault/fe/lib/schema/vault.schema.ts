"use client";

import { z } from "zod";

export const VaultSchema = z.object({
  amount: z.coerce.number().positive(),
});

export type IVaultSchema = z.infer<typeof VaultSchema>;

export const VaultSchemaDefaults: IVaultSchema = {
  amount: 0,
};
