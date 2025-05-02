import { ronin, saigon, sepolia } from 'viem/chains';
import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import { vars } from 'hardhat/config';

import 'hardhat-deploy';

const ADMIN_PRIVATE_KEY = vars.get('ADMIN_PRIVATE_KEY');
const ETHERSCAN_API_KEY = vars.get('ETHERSCAN_API_KEY');

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia: {
      url: sepolia.rpcUrls.default.http[0],
      accounts: [ADMIN_PRIVATE_KEY],
    },
    saigon: {
      url: saigon.rpcUrls.default.http[0],
      accounts: [ADMIN_PRIVATE_KEY],
    },
    ronin: {
      url: ronin.rpcUrls.default.http[0],
      accounts: [ADMIN_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
