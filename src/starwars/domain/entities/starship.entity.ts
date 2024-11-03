export interface StarshipAttributes {
    nombre: string;
    modelo: string;
    claseNaveEspacial: string;
    fabricante: string;
    costoEnCreditos: string;
    longitud: string;
    tripulacion: string;
    pasajeros: string;
    velocidadMaximaAtmosfera: string;
    calificacionHiperimpulsor: string;
    mglt: string;
    capacidadCarga: string;
    consumibles: string;
    peliculas: string[];
    pilotos: string[];
}

export class Starship {
    constructor(private attributes: StarshipAttributes) {}

    static create(attributes: StarshipAttributes): Starship {
        return new Starship(attributes);
    }

    toValue(): StarshipAttributes {
        return { ...this.attributes };
    }
}
