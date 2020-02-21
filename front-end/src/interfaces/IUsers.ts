export interface IUsers{
    // id(id: string);
    // el Record lo que hace es crear un objeto que le estamos diciendo 
    //que primero le pasasmos un numero y luego la interface
    byId: Record<string, IUser>;
    order: string[];
    selectedId: string | null;
}

export interface IUser {
    _id: string;
    username: string;
    email: string;
    img: string;
}

// si viene de mongo el id es un string.
// Si viene de MsQl el id es numerico.