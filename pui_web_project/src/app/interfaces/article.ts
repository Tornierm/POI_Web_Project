export interface Article {
    id: number,
    id_user: number,
    abstract: string,
    subtitle: string,
    body?: string,
    update_date: Date,
    category: string,
    title: string,
    image_data: string, 
    image_media_type: string,
    imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
}

