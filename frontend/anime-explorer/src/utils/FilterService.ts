import type { Anime } from "../model/Anime.ts";

export interface FilterPayload {
    search?: string;
    genre?: string;
    season?: string;
    year?: string;
    status?: string;
    sortBy?: string;
}

export class FilterService {

    /**
     * Applies all filters and sorting to the anime list
     */
    static applyFilters(animeList: Anime[], payload: FilterPayload): Anime[] {
        if (!animeList || animeList.length === 0) return [];

        let filteredAnime = [...animeList];

        // Apply all filters
        filteredAnime = this.applySearchFilter(filteredAnime, payload.search);
        filteredAnime = this.applyGenreFilter(filteredAnime, payload.genre);
        filteredAnime = this.applySeasonFilter(filteredAnime, payload.season);
        filteredAnime = this.applyYearFilter(filteredAnime, payload.year);
        filteredAnime = this.applyStatusFilter(filteredAnime, payload.status);

        // Apply sorting
        filteredAnime = this.applySorting(filteredAnime, payload.sortBy);

        return filteredAnime;
    }

    /**
     * Apply search filter to anime list
     */
    private static applySearchFilter(animeList: Anime[], searchTerm?: string): Anime[] {
        if (!searchTerm || !searchTerm.trim()) return animeList;

        const search = searchTerm.toLowerCase().trim();
        return animeList.filter(anime =>
            anime.animeName!.toLowerCase().includes(search) ||
            anime.animeNameJp?.toLowerCase().includes(search) ||
            anime.animeDescription!.toLowerCase().includes(search) ||
            anime.animeGenres?.some(genre => genre.toLowerCase().includes(search))
        );
    }

    /**
     * Apply genre filter to anime list
     */
    private static applyGenreFilter(animeList: Anime[], genre?: string): Anime[] {
        if (!genre) return animeList;

        return animeList.filter(anime =>
            anime.animeGenres?.some(animeGenre =>
                animeGenre.toLowerCase().replace(/\s+/g, '-') === genre
            )
        );
    }

    /**
     * Apply season filter to anime list
     */
    private static applySeasonFilter(animeList: Anime[], season?: string): Anime[] {
        if (!season) return animeList;

        return animeList.filter(anime => {
            return anime.season?.toLowerCase() === season.toLowerCase();
        });
    }

    /**
     * Apply year filter to anime list
     */
    private static applyYearFilter(animeList: Anime[], year?: string): Anime[] {
        if (!year) return animeList;

        const targetYear = parseInt(year);
        return animeList.filter(anime => anime.animeReleaseDate === targetYear);
    }

    /**
     * Apply status filter to anime list
     */
    private static applyStatusFilter(animeList: Anime[], status?: string): Anime[] {
        if (!status) return animeList;

        const statusMap: { [key: string]: string } = {
            'completed': 'Completed',
            'airing': 'Currently Airing',
            'upcoming': 'Upcoming'
        };

        const mappedStatus = statusMap[status];
        if (!mappedStatus) return animeList;

        return animeList.filter(anime => anime.animeStatus === mappedStatus);
    }

    /**
     * Apply sorting to anime list
     */
    private static applySorting(animeList: Anime[], sortBy?: string): Anime[] {
        if (!sortBy) return animeList;

        const sortedList = [...animeList];

        switch (sortBy) {
            case 'popularity':
                return sortedList.sort((a, b) => (b.animeViews || 0) - (a.animeViews || 0));

            case 'rating':
                return sortedList.sort((a, b) => (b.animeRating || 0) - (a.animeRating || 0));

            case 'release':
                return sortedList.sort((a, b) => (b.animeReleaseDate || 0) - (a.animeReleaseDate || 0));

            case 'atoz':
                return sortedList.sort((a, b) => a!.animeName!.localeCompare(b.animeName!));

            default:
                return sortedList;
        }
    }

    /**
     * Get unique genres from anime list for filter options
     */
    static getUniqueGenres(animeList: Anime[]): { label: string; value: string }[] {
        if (!animeList || animeList.length === 0) return [];

        const allGenres = animeList.flatMap(anime => anime.animeGenres || []);
        const uniqueGenres = [...new Set(allGenres)];

        return uniqueGenres
            .sort()
            .map(genre => ({
                label: genre,
                value: genre.toLowerCase().replace(/\s+/g, '-')
            }));
    }

    /**
     * Get unique years from anime list for filter options
     */
    static getUniqueYears(animeList: Anime[]): { label: string; value: string }[] {
        if (!animeList || animeList.length === 0) return [];

        const allYears = animeList
            .map(anime => anime.animeReleaseDate)
            .filter(year => year != null);
        const uniqueYears = [...new Set(allYears)];

        return uniqueYears
            .sort((a, b) => b! - a!)
            .map(year => ({
                label: year!.toString(),
                value: year!.toString()
            }));
    }

    /**
     * Check if any filters are active
     */
    static hasActiveFilters(payload: FilterPayload, searchTerm: string): boolean {
        return Object.entries(payload).some(([key, value]) => {
            if (key === 'sortBy') return false; // Don't count sorting as active filter
            return value && value.trim() !== '';
        }) || searchTerm.trim() !== '';
    }

    /**
     * Get empty filter payload
     */
    static getEmptyFilterPayload(): FilterPayload {
        return {
            search: '',
            genre: '',
            season: '',
            year: '',
            status: '',
            sortBy: 'popularity'
        };
    }

    /**
     * Validate filter payload
     */
    static validateFilterPayload(payload: FilterPayload): boolean {
        // Add validation logic as needed
        if (payload.year && isNaN(parseInt(payload.year))) {
            return false;
        }
        return true;
    }

    /**
     * Get filter summary for display
     */
    static getFilterSummary(payload: FilterPayload): string {
        const activeFilters = [];

        if (payload.search?.trim()) activeFilters.push(`Search: "${payload.search}"`);
        if (payload.genre) activeFilters.push(`Genre: ${payload.genre}`);
        if (payload.season) activeFilters.push(`Season: ${payload.season}`);
        if (payload.year) activeFilters.push(`Year: ${payload.year}`);
        if (payload.status) activeFilters.push(`Status: ${payload.status}`);

        return activeFilters.length > 0 ? activeFilters.join(', ') : 'No filters applied';
    }
}