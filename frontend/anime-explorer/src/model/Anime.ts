export interface Anime {
    animeId?: string;
    animeName?: string;
    animeNameJp?: string;
    animeImage?: string;
    animePoster?: string;
    animePvUrl?: string;
    animeDescription?: string;
    animeRating?: number;
    animeReleaseDate?: number;
    animeViews: number;
    animeStatus?: string;
    animeGenres?: string[];
    animeStudio?: string[];
    rank?: number;
    season?: string;
}