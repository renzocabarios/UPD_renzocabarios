import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { AnchorVault } from "@/lib/idl";

export default function useGetBalance() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const query = useQuery({
    queryFn: async () => {
      if (wallet?.publicKey) {
        const [vaultAddress] = PublicKey.findProgramAddressSync(
          [new PublicKey(wallet?.publicKey).toBuffer()],
          new PublicKey(AnchorVault.address)
        );

        return (await connection.getBalance(vaultAddress)) / LAMPORTS_PER_SOL;
      }

      return null;
    },
    queryKey: [],
  });

  return { ...query };
}
