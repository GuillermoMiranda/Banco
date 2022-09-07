export interface Heroe { //esta interface se crea en quicktype.io copiando el resultado de la consulta de postman y copiando el resultado en esta interface. Al resultado que se obtiene se le indica que el campo id es optativo agregandole el "?" y por otro lado se agrega un campo mas en la interface que es el alt_img? que sera una imagen, alternativa (por eso el ?) que sera un url.
    id?:               string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
