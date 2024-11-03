export interface FilmAttributes {
    titulo: string;
    episodioId: number;
    aperturaTexto: string;
    director: string;
    productor: string;
    fechaEstreno: string;
    especies: string[];
    navesEspaciales: string[];
    vehiculos: string[];
    personajes: string[];
    planetas: string[];
}

export class Film {
    constructor(private attributes: FilmAttributes) {}

    static create(attributes: FilmAttributes): Film {
        return new Film(attributes);
    }

    toValue(): FilmAttributes {
        return { ...this.attributes };
    }
}
