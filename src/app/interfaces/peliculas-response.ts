export interface PeliculasResponse {
    ok: boolean;
    total_registros: number;
    peliculas: Pelicula[];
}

export interface PeliculaOk {
    ok: boolean;
    peliculaDB: Pelicula;
}

export interface Pelicula {
    backdrop_path: string;
    poster_path: string;
    download_link: string;
    _id: string;
    title: string;
    original_title: string;
    overview: string;
    publish_date: Date;
    release_date: Date;
    vote_average: number;
    vote_count: number;
    genre: string;
    __v: number;
    categoria: string;
    stream_link: string;
    stream_link_en: string;
}
