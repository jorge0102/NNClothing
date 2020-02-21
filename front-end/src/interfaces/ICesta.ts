export interface ICestas {
    order: ICesta[];
}

export interface ICesta {
    _id: string;
    img: string;
    description: string;
    categori: string;
    preci: string;
    stock: [{
        talla: string;
        color: string;
        unidades: string;
    }]
}

