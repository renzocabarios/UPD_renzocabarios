"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IVaultSchema,
  VaultSchema,
  VaultSchemaDefaults,
} from "@/lib/schema/vault.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useMounted from "@/hooks/useMounted";
import useDeposit from "@/hooks/useDeposit";
import useWithdraw from "@/hooks/useWithdraw";
import useGetVaults from "@/hooks/useGetVaults";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import useGetBalance from "@/hooks/useGetBalance";
export default function Home() {
  const mounted = useMounted();

  const { publicKey } = useWallet();

  const { mutate: deposit, isPending: depositIsPending } = useDeposit();
  const { mutate: withdraw, isPending: withdrawIsPending } = useWithdraw();
  const { data } = useGetBalance();
  const form = useForm<IVaultSchema>({
    resolver: zodResolver(VaultSchema),
    defaultValues: VaultSchemaDefaults,
  });

  function onDeposit(values: IVaultSchema) {
    deposit({ ...values });
  }

  function onWithdraw(values: IVaultSchema) {
    withdraw({ ...values });
  }

  if (!mounted) {
    return <></>;
  }

  if (depositIsPending || withdrawIsPending) {
    return (
      <>
        <p>It is loading</p>
      </>
    );
  }
  return (
    <div className="">
      <WalletMultiButton />

      <div className="">
        <p>Wallet Address: {publicKey?.toString() ?? ""}</p>
        <p>{data} SOL</p>

        <Form {...form}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button onClick={form.handleSubmit(onDeposit)}>Deposit</Button>
          <Button onClick={form.handleSubmit(onWithdraw)}>Withdraw</Button>
        </Form>
      </div>
    </div>
  );
}
2;
