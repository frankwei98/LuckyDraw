export const network = {
  1: {
    default: true,
    name: 'Main Ethereum Network',
    contract: '0x8b481c5af4734501ea8b6a0c3502e001dd883d3d',
    rpc: 'https://mainnet.infura.io/2CEbuqs01htfmb4oL5EB'
  },
  2: {
    name: 'Morden Test Network',
    contract: ''
  },
  3: {
    // default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '0xc5f73d596378ec0535cf0fdb16eb6fc13d966978',
    rpc: 'https://ropsten.infura.io/2CEbuqs01htfmb4oL5EB'
  },
  4: {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: 'https://rinkeby.infura.io/2CEbuqs01htfmb4oL5EB'
  },
  42: {
    // default: true,
    name: 'Kovan Test Network',
    contract: '0xb760ada4f12e5d29eff2d9eef3bca94b574a1f2f',
    rpc: 'https://kovan.infura.io/2CEbuqs01htfmb4oL5EB'
  },
  5: {
    // default: true,
    name: 'Private Network',
    contract: '0x58a84ee22f8e6f371db58393b9d65420cf068573',
    rpc: 'http://127.0.0.1:7546'
  }
}

export const defaultNetwork = Object.values(network).find(net => net.default)
