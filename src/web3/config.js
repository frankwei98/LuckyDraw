
export const network = {
  1: {
    default: true,
    name: 'Main Ethereum Network',
    contract: '0x9f87c89d4b96628f3f5bc6ab981bab71997d99bb',
    rpc: 'https://mainnet.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  2: {
    name: 'Morden Test Network',
    contract: ''
  },
  3: {
    // default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '0xd17c1d983030970a8b55f2df647aa351f71430e6',
    rpc: 'https://ropsten.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  4: {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: 'https://rinkeby.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  42: {
    // default: true,
    name: 'Kovan Test Network',
    contract: '0x88b194b61bb0c2f84ba7acad53b54f2cbe05a425',
    rpc: 'https://kovan.infura.io/lTETGFVyQX99UKQ98BN4'
  },
  5: {
    // default: true,
    name: 'Private Network',
    contract: '0x828a929fc03cacf7e5ff09771d8ae9d5ca17344d',
    rpc: 'http://127.0.0.1:7546'
  }
}

export const defaultNetwork = Object.values(network).find(net => net.default)
