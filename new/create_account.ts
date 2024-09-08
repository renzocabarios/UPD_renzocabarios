import bs58 from "bs58";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  Signer,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
(async () => {
  const decoded = bs58.decode(
    "5gQWXvxghHYQKLm2F4vAa4JKE87YdcynKrkWT2AuheFLDKS3EAjLDWZHUkVmkov3gNRQLh6p6VSRvfc9HGjEHcZn"
  );

  const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
  const NEW_KEYPAIR = Keypair.generate();

  const CONNECTION = new Connection(clusterApiUrl("devnet"));
  const { lastValidBlockHeight, blockhash } =
    await CONNECTION.getLatestBlockhash();

  const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(0);

  const tx = new Transaction();

  tx.instructions = [
    SystemProgram.createAccount({
      fromPubkey: MY_KEYPAIR.publicKey,
      newAccountPubkey: NEW_KEYPAIR.publicKey,
      lamports: minimumRent,
      space: 0,
      programId: SystemProgram.programId,
    }),
  ];
  tx.lastValidBlockHeight = lastValidBlockHeight;
  tx.recentBlockhash = blockhash;
  tx.feePayer = MY_KEYPAIR.publicKey;
  tx.sign(MY_KEYPAIR, NEW_KEYPAIR);

  const serialized = tx.serialize();
  const txHash = await CONNECTION.sendRawTransaction(serialized);
  console.log(txHash);
})();
