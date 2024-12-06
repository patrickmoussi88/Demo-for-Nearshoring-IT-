import {Document} from "./Document";
import {DocumentNode} from "./DocumentNode";

export interface DocumentFlatNode {
  expandable: boolean;
  document: DocumentNode;
  level: number;
}
