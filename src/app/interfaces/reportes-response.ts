export interface ReportesResponse {
    ok: boolean;
    reportes: Reporte[];
}

export interface ReporteResponse {
    ok: boolean;
    reporte: Reporte;
}

export interface ListReporteResponse {
    ok: boolean;
    total: number;
    reportes: Reporte[];
}

export interface Reporte {
    _id: string;
    usuario: Usuario;
    pelicula: Pelicula;
    estado: boolean;
    fecha: Date;
    __v: number;
}

export interface Pelicula {
    poster_path: string;
    _id: string;
    title: string;
}

export interface Usuario {
    img: string;
    _id: string;
    fullname: string;
    email: string;
}

