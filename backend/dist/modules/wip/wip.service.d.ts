import { Repository } from 'typeorm';
import { Wip } from './wip.entity';
export declare class WipService {
    private wipRepo;
    constructor(wipRepo: Repository<Wip>);
    findAll(): Promise<Wip[]>;
    findOne(id: number): Promise<Wip>;
    getEcarts(): Promise<any[]>;
    create(data: Partial<Wip>): Promise<Wip>;
    update(id: number, data: Partial<Wip>): Promise<Wip>;
}
