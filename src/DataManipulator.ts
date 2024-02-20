import { ServerRespond } from "./DataStreamer";

export interface Row {
    price_1: number;
    price_2: number;
    ratio: number;
    timestamp: Date;
    upper_bound: number;
    lower_bound: number;
    trigger_alert: number | undefined;
}

export class DataManipulator {
    static generateRow(serverResponds: ServerRespond[]) {
        const price1 =
            (serverResponds[0].top_ask.price +
                serverResponds[0].top_bid.price) /
            2;
        const price2 =
            (serverResponds[1].top_ask.price +
                serverResponds[1].top_bid.price) /
            2;

        const ratio = price1 / price2;

        const lowerBound = 1 - 0.04;
        const upperBound = 1 + 0.04;

        return {
            price_1: price1,
            price_2: price2,
            ratio: ratio,
            timestamp:
                serverResponds[0].timestamp > serverResponds[1].timestamp
                    ? serverResponds[0].timestamp
                    : serverResponds[1].timestamp,
            upper_bound: upperBound,
            lower_bound: lowerBound,
            trigger_alert:
                ratio > upperBound || ratio < lowerBound ? ratio : undefined,
        };
    }
}
