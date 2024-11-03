export abstract class ServiceRepository<T> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T | null>;
}