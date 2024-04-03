import {Nft, NftAddress} from "@/shared/models/nft.model";

export class ApiService {
    static async loadNftAddressList(): Promise<NftAddress[]> {
        // next app that request notion api as in notion api cors is enabled so cant be request from frontend side
        const res = await fetch(
            `https://notion-page-api-e2b314ac8522.herokuapp.com/nft/address/list`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Revalidate at most after 10 mins
                next: { revalidate: 600 }
            }
        );

        const json = await res.json();

        if (!json) {
            return [];
        }

        return json as string[]
    }

    static async loadNftList(addressList: NftAddress[]): Promise<Nft[]> {
        const list = []

        // ton api has too little rate limit and do not have handler where several nft could be requested
        // @ts-ignore
        for (const [i, address] of addressList.entries()) {
            if (i !== 0) {
                await new Promise(resolve => setTimeout(resolve, 2000))
            }
            list.push(await ApiService.loadNft(address))
        }

        return list.reduce<Nft[]>((prev, cur) => {
            if (cur === null) {
                return prev;
            }

            return [...prev, cur]
        }, []);
    }

    static async loadNft(address: NftAddress): Promise<Nft | null> {
        try {
            const res = await fetch(
                `https://tonapi.io/v2/nfts/${address}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store'
                }
            );

            const json = await res.json();

            if (!json) {
                return null;
            }

            return {
                address,
                rawAddress: json['address'],
                ownerAddress: json['owner']['address'],
                name: json['metadata']['name'],
                description: json['collection']['description'],
                imageUrl: json['previews'][3]['url']
            } as Nft
        } catch (e) {
            return null;
        }
    }
}
