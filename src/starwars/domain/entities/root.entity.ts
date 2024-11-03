export interface RootAttributes {
    peliculas: string;
    personas: string;
    planetas: string;
    especies: string;
    navesEspaciales: string;
    vehiculos: string;
}

export class Root {
    constructor(private attributes: RootAttributes) {}

    static create(attributes: RootAttributes): Root {
        return new Root(attributes);
    }

    toValue(): RootAttributes {
        return { ...this.attributes };
    }
}
