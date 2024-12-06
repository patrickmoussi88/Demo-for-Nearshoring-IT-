import { Channel } from "./channel";
import { MessageLevel } from "./message-Level";
import { MessageStatus } from "./message-status";

export interface NotificationResponse{
    content:string
    status:MessageStatus;
    channel:Channel;
    userId:number;
    subject:string;
    date:Date;
    messageLevel: MessageLevel;
}