import { StocksService } from './stocks.service';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    findAll(search?: string): Promise<import("./stock.entity").Stock[]>;
    getSurstock(): Promise<import("./stock.entity").Stock[]>;
    findOne(id: string): Promise<import("./stock.entity").Stock>;
    calculerDOH(id: string): Promise<{
        doh: number;
        statut: string;
    }>;
    create(body: any): Promise<import("./stock.entity").Stock>;
    update(id: string, body: any): Promise<import("./stock.entity").Stock>;
    remove(id: string): Promise<void>;
}
