import { Transaction } from './txns';

export interface Bid {
    bid_id: number,
    info: Transaction,
    is_selected: boolean,
    bid_end_date: string,
    is_active: boolean,
}