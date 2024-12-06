export interface IcreateDTO {
    title:string,
    contents:string,
}

export interface Iblog extends IcreateDTO {
    id:string,
    date:string,
}