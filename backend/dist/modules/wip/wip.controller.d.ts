import { WipService } from './wip.service';
export declare class WipController {
    private readonly wipService;
    constructor(wipService: WipService);
    findAll(): Promise<import("./wip.entity").Wip[]>;
    getEcarts(): Promise<any[]>;
    findOne(id: string): Promise<import("./wip.entity").Wip>;
    create(body: any): Promise<import("./wip.entity").Wip>;
    update(id: string, body: any): Promise<import("./wip.entity").Wip>;
}
