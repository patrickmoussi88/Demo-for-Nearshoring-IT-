export interface UserResponse{
    id:number;
    firstName:String;
    lastName:string;
    username:string;
    isAccountLocked:string;
    lastLogin:Date;
    groupeId:number;
    perimetreIds:number[];
    metierIds:number[];
}
