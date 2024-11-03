export interface PlanetAttributes {
    nombre: string;
    diametro: string;
    periodoRotacion: string;
    periodoOrbital: string;
    gravedad: string;
    poblacion: string;
    clima: string;
    terreno: string;
    aguaSuperficie: string;
    residentes: string[];
    peliculas: string[];
}

export class Planet {
    constructor(private attributes: PlanetAttributes) {}

    static create(attributes: PlanetAttributes): Planet {
        return new Planet(attributes);
    }

    toValue(): PlanetAttributes {
        return { ...this.attributes };
    }
}
