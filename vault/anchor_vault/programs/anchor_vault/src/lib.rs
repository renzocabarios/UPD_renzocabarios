use anchor_lang::prelude::*;

declare_id!("39q87wUrAWA1LKiUtD7eiZdKJ6DhuoB5jVAznpuEqy1t");

#[program]
pub mod anchor_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
