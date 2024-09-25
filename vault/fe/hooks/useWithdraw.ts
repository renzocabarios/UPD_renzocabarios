import { useMutation } from "@tanstack/react-query";

import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorVault, IAnchorVault } from "@/lib/idl";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface IWithdrawArgs {
  amount: number;
}

export default function useWithdraw() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const { publicKey } = useWallet();

  const mutation = useMutation({
    mutationFn: async (value: IWithdrawArgs) => {
      if (publicKey) {
        const provider = new AnchorProvider(
          connection,
          wallet as unknown as Wallet
        );

        const program = new Program<IAnchorVault>(AnchorVault, provider);

        const tx = await program.methods
          .withdraw(new BN(value.amount * LAMPORTS_PER_SOL))
          .accounts({
            signer: publicKey,
          })
          .rpc();

        return tx;
      }

      return null;
    },
  });

  return { ...mutation };
}
