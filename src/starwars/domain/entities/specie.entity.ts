export interface SpecieAttributes {
    nombre: string;
    clasificacion: string;
    designacion: string;
    alturaPromedio: string;
    esperanzaVidaPromedio: string;
    coloresOjos: string;
    coloresCabello: string;
    coloresPiel: string;
    idioma: string;
    mundoOrigen: string;
    personas: string[];
    peliculas: string[];
}

export class Specie {
    constructor(private attributes: SpecieAttributes) {}

    static create(attributes: SpecieAttributes): Specie {
        return new Specie(attributes);
    }

    toValue(): SpecieAttributes {
        return { ...this.attributes };
    }
}
    