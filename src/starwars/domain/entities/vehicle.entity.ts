export interface VehicleAttributes {
    nombre: string;
    modelo: string;
    claseVehiculo: string;
    fabricante: string;
    longitud: string;
    costoEnCreditos: string;
    tripulacion: string;
    pasajeros: string;
    velocidadMaximaAtmosfera: string;
    capacidadCarga: string;
    consumibles: string;
    peliculas: string[];
    pilotos: string[];
}

export class Vehicle {
    constructor(private attributes: VehicleAttributes) {}

    static create(attributes: VehicleAttributes): Vehicle {
        return new Vehicle(attributes);
    }

    toValue(): VehicleAttributes {
        return { ...this.attributes };
    }
}
