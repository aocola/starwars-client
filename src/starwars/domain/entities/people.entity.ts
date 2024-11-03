export interface PeopleAttributes {
    nombre: string;
    anioNacimiento: string;
    colorOjos: string;
    genero: string;
    colorCabello: string;
    altura: string;
    masa: string;
    colorPiel: string;
    mundoOrigen: string;
    peliculas: string[];
    especies: string[];
    navesEspaciales: string[];
    vehiculos: string[];
}

export class People {
    constructor(private attributes: PeopleAttributes) {}

    static create(attributes: PeopleAttributes): People {
        return new People(attributes);
    }

    toValue(): PeopleAttributes {
        return { ...this.attributes };
    }
}
