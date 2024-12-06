import {DocumentRelatedContent} from "./DocumentRelatedContent";

export class Document {
  id!: number;
  isFolder!: boolean;
  perimetreId!: number;
  metierId!: number;
  titre!: string;
  description!: string;
  fileName!: string;
  nature!: string;
  dateCreate!: string;
  isSupprim!: boolean;
  documentRelatedContent!: DocumentRelatedContent;
  document!: Document;
  fichier!: string;
}
