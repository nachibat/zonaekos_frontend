export interface ListSeriesResponse {
    ok: boolean;
    total: number;
    series: Serie[];
}

export interface SeriesBusqueda {
    ok: boolean;
    total_registros: number;
    series: Serie[];
}

export interface SerieResponse {
    ok: boolean;
    serieEncontrada: Serie;
}

export interface TotalResponse {
    ok: boolean;
    total: number;
}

export interface SerieOK {
    ok: boolean;
    serie: Serie;
}

export interface Serie {
    categoria: string;
    poster_path: string;
    backdrop_path: string;
    _id: string;
    title: string;
    uri: string;
    original_title: string;
    overview: string;
    genre: string;
    __v: number;
    modified: Date;
}

export interface ListCapitulos {
    ok: boolean;
    total: number;
    capitulos: Capitulo[];
}

export interface CapituloOK {
    ok: boolean;
    capitulo: Capitulo;
}

export interface Capitulo {
    title: null;
    overview: null;
    stream_link_ori: null;
    stream_link_lat: string;
    download_link: null;
    publish_date: Date;
    reported: boolean;
    _id: string;
    serie: SerieRes;
    season: number;
    chapter: number;
    release_date: Date;
    __v: number;
}

export interface SerieRes {
    _id: string;
    title: string;
}

export interface ReporteCapitulos {
    ok: boolean;
    capituloReportado: CapituloReportado[];
}

export interface CapituloReportado {
    title: string;
    overview: string;
    stream_link_ori: string;
    stream_link_lat: string;
    download_link: null;
    publish_date: Date;
    reported: boolean;
    _id: string;
    serie: SerieReportada;
    season: number;
    chapter: number;
    release_date: Date;
    __v: number;
}

export interface SerieReportada {
    poster_path: string;
    _id: string;
    title: string;
}


