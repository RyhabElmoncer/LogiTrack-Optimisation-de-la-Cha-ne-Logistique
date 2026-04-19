import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
export declare class StocksService {
    private stockRepo;
    constructor(stockRepo: Repository<Stock>);
    findAll(search?: string): Promise<Stock[]>;
    findOne(id: number): Promise<Stock>;
    calculerDOH(id: number): Promise<{
        doh: number;
        statut: string;
    }>;
    getArticlesSurstock(): Promise<Stock[]>;
    create(data: Partial<Stock>): Promise<Stock>;
    update(id: number, data: Partial<Stock>): Promise<Stock>;
    remove(id: number): Promise<void>;
}
