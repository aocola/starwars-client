export class NotFoundException extends Error{
    constructor(public readonly id:string){
        super(`Record not found ${id}`);
    }
}