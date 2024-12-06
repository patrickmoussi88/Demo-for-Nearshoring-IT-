export class Features {
    title!: string;
    index!: number;
    src!: string;
    alt!: string;
    collapse!: boolean;
    id!: string;
    link!: string;
     authorities!:string[];
    items!:{name: string, class: string, pathModule: string,authorities:string[]}[]
    //navbar_items!:{name: string, class: string, pathModule: string}[]
}
