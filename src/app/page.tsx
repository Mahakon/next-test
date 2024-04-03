import {ApiService} from "@/shared/services/api.service";
import NftListContainer from "@/shared/components/nft-list-container/nft-list-container";

const limit = 5;
export default async function Home() {
  const nftAddressList = await ApiService.loadNftAddressList()

  return (
      <NftListContainer nftAddressList={nftAddressList}>
      </NftListContainer>
  );
}
