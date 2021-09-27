export interface UsuariosResponse {
    ok: boolean;
    usuario: Usuario;
    token: string;
}

export interface UsuarioResponse {
    ok: boolean;
    usuario: Usuario;
}

export interface ListUsuariosResponse {
    ok: boolean;
    cantidad: number;
    usuarios: Usuario[];
}

export interface Usuario {
    img: string;
    role: string;
    estado: boolean;
    google: boolean;
    facebook: boolean;
    twitter: boolean;
    _id: string;
    fullname: string;
    email: string;
    __v: number;
}
