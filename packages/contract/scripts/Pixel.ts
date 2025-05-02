import hre from 'hardhat';
import { vars } from 'hardhat/config';
import { privateKeyToAccount } from 'viem/accounts';

async function main() {
  const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY') as `0x${string}`;
  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);
}

main()
  .then((r) => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
