export class Product {
    id: number;
    code: string;
    name: string;
    description: string;
    stock: number;
    color: string;

    constructor(id: number, code: string, name:string, description:string, stock: number, color: string){
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.color = color;
    }

    
}

