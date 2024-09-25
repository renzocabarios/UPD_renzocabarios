import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorVault } from "@/lib/idl";

export default function useGetVaults() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const query = useQuery({
    queryFn: async () => {
      const provider = new AnchorProvider(
        connection,
        wallet as unknown as Wallet
      );

      const program = new Program(AnchorVault, provider);

      // @ts-ignore
      return await program.account.vault.all();
    },
    queryKey: [],
  });

  return { ...query };
}
