export interface IProduct {
    id:           number;
    productName:  string;
    slug:         string;
    description:  string;
    active:       boolean;
    isFeatured:   boolean;
    taste:        string;
    origin:       string;
    price:        number;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    category:     Category | null;
    images:       Image[];
}

export interface Category {
    id:           number;
    categoryName: string;
    slug:         string;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    mainImage:    MainImage;
}

export interface MainImage {
    id:                number;
    name:              string;
    alternativeText:   string;
    caption:           string;
    width:             number;
    height:            number;
    formats:           MainImageFormats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    created_at:        Date;
    updated_at:        Date;
}

export interface MainImageFormats {
    thumbnail: Medium;
}

export interface Medium {
    ext:    string;
    url:    string;
    hash:   string;
    mime:   string;
    name:   string;
    path:   null;
    size:   number;
    width:  number;
    height: number;
}

export interface Image {
    id:                number;
    name:              string;
    alternativeText:   string;
    caption:           string;
    width:             number;
    height:            number;
    formats:           ImageFormats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    created_at:        Date;
    updated_at:        Date;
}

export interface ImageFormats {
    small:     Medium;
    medium:    Medium;
    thumbnail: Medium;
}
