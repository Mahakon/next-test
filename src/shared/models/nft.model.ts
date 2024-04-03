export type NftAddress = string;

export type NftRawAddress = string;

export type WalletAddress = string;

export type Nft = {
    address: NftAddress;
    rawAddress: NftRawAddress;
    ownerAddress: WalletAddress;
    name: string;
    description: string;
    imageUrl: string;
}
