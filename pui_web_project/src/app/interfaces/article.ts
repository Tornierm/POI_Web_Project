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

export interface IndividualArticle {
    aut: number,
    category: string,
    id?: number,
    id_user: number,
    is_deleted: number,
    is_public: number,
    abstract: string,
    subtitle: string,
    image_data: string, 
    image_description: string, 
    image_media_type: string,
    title: string,
    body?: string,
    update_date: Date,
    username: string,
}

export const convertArticle = (article: IndividualArticle): Partial<IndividualArticle> => {
    let newArticle: Partial<IndividualArticle> = {
        aut: article.aut,
        category: article.category,
        id_user: article.id_user,
        is_deleted: article.is_deleted,
        is_public: article.is_public,
        abstract: article.abstract,
        subtitle: article.subtitle,
        image_data: article.image_data,
        image_media_type: article.image_media_type,
        title: article.title,
        body: article.body,
        update_date: article.update_date,
        username: article.username,
    };
    return newArticle;
}

