'use client';

import {Empty, message, Spin} from "antd";
import {Nft, NftAddress} from "@/shared/models/nft.model";
import {useEffect, useState} from "react";
import {ApiService} from "@/shared/services/api.service";
import styles from './nft-list-container.module.css';
import CardList from "@/shared/components/card-list/card-list";

const limit = 5;

export default function NftListContainer({ nftAddressList }: { nftAddressList: NftAddress[] }) {
    const [nftList, setNftList] = useState<Nft[]>([])
    const [pagination, setPagination] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async function load() {
            setIsLoading(true)

            const nftList = await ApiService.loadNftList(nftAddressList.slice(
                    limit * (pagination - 1), limit * pagination
                )
            );

            setNftList((prevState) => [...prevState,...nftList])

            setPagination((prevValue) => prevValue + 1)

            setIsLoading(false)
        })()

    }, []);

    const onLoad = async () => {
        const nftList = await ApiService.loadNftList(nftAddressList.slice(
                (pagination - 1),  pagination
            )
        );

        setNftList((prevState) => [...prevState,...nftList])

        setPagination((prevValue) => prevValue + 1)

        message.success(`${nftList.length} more items loaded!`);
    }

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Spin />
            </div>
        );
    }

    if (!nftList && !isLoading) {
        return (
            <div className={styles.emptyContainer}>
                <Empty />
            </div>
        );
    }

    return (
        <CardList cards={nftList} onLoad={onLoad}>
        </CardList>
    );
}
