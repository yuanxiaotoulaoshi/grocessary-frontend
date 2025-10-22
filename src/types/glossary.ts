export interface GlossaryItem{
    id:string;
    cnName:string;
    enName:string;
    categoryLevel1:string;
    categoryLevel2:string;
    currentMetadata:string;
}

export interface CategoryInfo{
    [key:string]:string[];
}