import { NotificationResponse } from "./notification-response";

export interface NotificationPage{
    content:NotificationResponse[];
    totalPages:number;
    totalElements:number;
    numberOfElements:number;
    pageNumber:number;
    pageSize:number;
}