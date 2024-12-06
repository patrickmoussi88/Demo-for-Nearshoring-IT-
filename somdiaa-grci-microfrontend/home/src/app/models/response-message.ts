export interface ResponseMessage<T>{
    status:number;
    message:string;
    data:T;
}
