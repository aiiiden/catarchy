import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { vars } from 'hardhat/config';
import { privateKeyToAccount } from 'viem/accounts';

const QuestModule = buildModule('Pixel', (m) => {
  const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY') as `0x${string}`;

  const account = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const quest = m.contract('Pixel', [account.address]);

  return {
    quest,
  };
});

export default QuestModule;
