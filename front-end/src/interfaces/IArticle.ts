export interface IArticles{
    // id(id: string);
    // el Record lo que hace es crear un objeto que le estamos diciendo 
    //que primero le pasasmos un numero y luego la interface
    byId: Record<string, IArticle>;
    order: string[];
    selectedId: string | null;
}

export interface IArticle {
    _id: string;
    img: string;
    description: string;
    categori: string;
    preci: string;
}

