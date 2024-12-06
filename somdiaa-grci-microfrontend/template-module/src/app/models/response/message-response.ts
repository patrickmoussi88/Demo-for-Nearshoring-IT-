export interface MessageResponse<T>{
  message:string;
  status:number;
  data:T;
}
