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
export default function Home() {
  const form = useForm<IVaultSchema>({
    resolver: zodResolver(VaultSchema),
    defaultValues: VaultSchemaDefaults,
  });

  function onDeposit(values: IVaultSchema) {
    console.log(values);
  }

  function onWithdraw(values: IVaultSchema) {
    console.log(values);
  }
  return (
    <div className="">
      <div className="">
        <p>Wallet Address: 2VqX4q2pTN883jrNw8EdpjjcnK7gPGWgLGCbpWASjAhU</p>
        <p>1 SOL</p>

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
      <div className="border border-gray-400 rounded-xl p-4">
        <p>Wallet Address: 2VqX4q2pTN883jrNw8EdpjjcnK7gPGWgLGCbpWASjAhU</p>
        <p>1 SOL</p>
      </div>
    </div>
  );
}
2;
