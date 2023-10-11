export interface Article {
    id: number,
    id_user: number,
    abstract: string,
    subtitle: string,
    body?: string,
    update_date: Date,
    category: string,
    title: string,
    thumbnail_image: string,
    thumbnail_media_type: string
}

