import {Chanel} from "./chanel";
import { MessageLevel } from "./message-level";
import {MessageStatus} from "./message-status";

export interface NotificationResponse{
  content:string
  status:MessageStatus;
  channel:Chanel;
  userId:number;
  subject:string;
  date:Date;
  messageLevel: MessageLevel;
}
