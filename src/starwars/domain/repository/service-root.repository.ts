export abstract class ServiceRootRepository<T> {
    abstract get(): Promise<T>;
}