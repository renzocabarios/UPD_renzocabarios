use anchor_lang::prelude::*;
use anchor_lang::system_program::transfer;
use anchor_lang::system_program::Transfer;
declare_id!("39q87wUrAWA1LKiUtD7eiZdKJ6DhuoB5jVAznpuEqy1t");

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn deposit(ctx: Context<Vault>, amount: u64) -> Result<()> {
        ctx.accounts.deposit(amount)
    }
    pub fn withdraw(ctx: Context<Vault>, amount: u64) -> Result<()> {
        ctx.accounts.withdraw(amount, &[ctx.bumps.vault])
    }
}

#[derive(Accounts)]
pub struct Vault<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut, seeds = [signer.key().as_ref()], bump)]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> Vault<'info> {
    pub fn deposit(&mut self, amount: u64) -> Result<()> {
        let accounts = Transfer {
            from: self.signer.to_account_info(),
            to: self.vault.to_account_info(),
        };

        let ctx = CpiContext::new(self.system_program.to_account_info(), accounts);

        transfer(ctx, amount)
    }

    pub fn withdraw(&mut self, amount: u64, bump: &[u8]) -> Result<()> {
        let signer_seeds = [&[self.signer.to_account_info().key.as_ref(), bump][..]];
        let accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.signer.to_account_info(),
        };

        let ctx = CpiContext::new_with_signer(
            self.system_program.to_account_info(),
            accounts,
            &signer_seeds,
        );

        transfer(ctx, amount)
    }
}
