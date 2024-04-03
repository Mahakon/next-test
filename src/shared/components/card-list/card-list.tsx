import {List} from "antd";
import {Nft} from "@/shared/models/nft.model";
import VirtualList from 'rc-virtual-list';
import {Card} from "@/shared/components/card/card";

const ContainerHeight = 600;

export default function CardList({ cards, onLoad }: { cards: Nft[], onLoad: () => void }) {
    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            onLoad();
        }
    };

    return (
        <List>
            <VirtualList
                data={cards}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}>

                {(card: Nft) => (
                    <List.Item key={card.address}>
                        <Card {...card}></Card>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}
