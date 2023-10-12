export interface Article {
    aut: number,
    category: string,
    id: number,
    id_user: number,
    is_deleted: number,
    is_public: number,
    abstract: string,
    subtitle: string,
    thumbnail_image: string, 
    thumbnail_media_type: string,
    title: string,
    body?: string,
    update_date: Date,
    username: string,
}

