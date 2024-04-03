import styles from './card.module.css';
import Paragraph from 'antd/es/typography/Paragraph';
import Link from 'next/link';
import {Nft} from "@/shared/models/nft.model";

export function Card({ name, ownerAddress, rawAddress, address, imageUrl, description }: Nft) {
    return (
        <div className={styles.cardContainer}>

            <div className={styles.thumbnailContainer}>
                <Link href={`${rawAddress}`}>
                    <img
                        className={styles.zoomImage}
                        src={imageUrl}
                        alt={name}
                    ></img>
                </Link>
            </div>

            <div className={styles.infoContainer}>

                <Paragraph className={styles.address} ellipsis>
                    {address} / {rawAddress}
                </Paragraph>

                <Paragraph className={styles.owner} ellipsis>
                    owner: {ownerAddress}
                </Paragraph>

                <Paragraph className={styles.name} ellipsis>
                    {name}
                </Paragraph>

                <Paragraph
                    className={styles.description}
                    ellipsis={{ rows: 2, tooltip: description }}>
                    {description}
                </Paragraph>
            </div>
        </div>
    );
}
