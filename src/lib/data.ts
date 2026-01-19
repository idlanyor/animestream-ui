export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  url?: string;
}

export interface Anime {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  banner: string;
  genre: string[];
  rating: string;
  year: number;
  type: "TV" | "Movie" | "Batch" | string;
  status: "Ongoing" | "Completed" | string;
  episodes: Episode[];
  trailerUrl?: string;
  synopsis?: string;
  japanese?: string;
  producers?: string;
  studios?: string;
}

export interface APIAnime {
  title: string;
  poster: string;
  episodes?: string;
  releasedOn?: string;
  releaseDate?: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  type?: string;
  score?: string;
  rank?: number;
}

export interface APIHomeResponse {
  data: {
    recent: { animeList: APIAnime[] };
    batch: { animeList: APIAnime[] };
    movie: { animeList: APIAnime[] };
    top10: { animeList: APIAnime[] };
  };
}

export interface APIDetailResponse {
  data: {
    title: string;
    poster: string;
    score: {
      value: string;
      users: string;
    };
    japanese: string;
    synonyms?: string;
    english?: string;
    status: string;
    type: string;
    source?: string;
    duration: string;
    episodes?: number | null;
    season?: string;
    studios: string;
    producers: string;
    aired?: string;
    trailer?: string;
    synopsis: {
      paragraphs: string[];
      connections: any[];
    };
    genreList: { title: string; genreId: string; href: string; samehadakuUrl: string }[];
    episodeList: { title: string | number; episodeId: string; href: string; samehadakuUrl: string }[];
  };
}

export interface APIGenre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

export interface APIGenreListResponse {
  data: {
    genreList: APIGenre[];
  };
}

export interface APIGenreDetailResponse {
  data: {
    animeList: APIAnime[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export interface APIEpisodeDetailResponse {
  data: {
    title: string;
    animeId: string;
    poster: string;
    releasedOn: string;
    defaultStreamingUrl: string;
    hasPrevEpisode: boolean;
    prevEpisode: {
      title: string;
      episodeId: string;
      href: string;
      samehadakuUrl: string;
    } | null;
    hasNextEpisode: boolean;
    nextEpisode: {
      title: string;
      episodeId: string;
      href: string;
      samehadakuUrl: string;
    } | null;
    synopsis: {
      paragraphs: string[];
      connections: any[];
    };
    genreList: APIGenre[];
    server: {
      qualities: {
        title: string;
        serverList: {
          title: string;
          serverId: string;
          href: string;
        }[];
      }[];
    };
    downloadUrl: {
      formats: {
        title: string;
        qualities: {
          title: string;
          urls: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
    recommendedEpisodeList: {
      title: string;
      poster: string;
      releaseDate: string;
      episodeId: string;
      href: string;
      samehadakuUrl: string;
    }[];
  };
}

export interface APIServerResponse {
  data: {
    url: string; // This could be an iframe or a direct link
    type: "iframe" | "direct" | string;
  };
}

export interface APIScheduleAnime {
  title: string;
  poster: string;
  type: string;
  score: string;
  estimation: string;
  genres: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
}

export interface APIScheduleResponse {
  status: string;
  creator: string;
  message: string;
  data: {
    days: {
      day: string;
      animeList: APIScheduleAnime[];
    }[];
  };
}

export const MOCK_ANIME: Anime[] = [
  // Keeping mock for fallback or initial dev
];

const BASE_URL = "https://www.sankavollerei.com/anime/samehadaku";

export async function getHomeData(): Promise<APIHomeResponse> {
  const res = await fetch(`${BASE_URL}/home`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch home data");
  return res.json();
}

export async function getServerDetail(serverId: string): Promise<APIServerResponse['data']> {
  const res = await fetch(`${BASE_URL}/server/${serverId}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch server detail");
  const json: APIServerResponse = await res.json();
  return json.data;
}

export async function getEpisodeDetail(id: string): Promise<APIEpisodeDetailResponse['data']> {
  const res = await fetch(`${BASE_URL}/episode/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch episode detail");
  const json: APIEpisodeDetailResponse = await res.json();
  return json.data;
}

export async function getGenres(): Promise<APIGenre[]> {
  try {
    const res = await fetch(`${BASE_URL}/genres`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      console.error("Failed to fetch genres, status:", res.status);
      return [];
    }
    const json: APIGenreListResponse = await res.json();
    return json.data.genreList || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function getAnimeByGenre(genreId: string, page: number = 1): Promise<{ animeList: Anime[], pagination: APIGenreDetailResponse['pagination'] }> {
  const res = await fetch(`${BASE_URL}/genres/${genreId}?page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch anime by genre");
  const json: APIGenreDetailResponse = await res.json();
  return {
    animeList: json.data.animeList.map(a => transformAPIAnime(a)),
    pagination: json.pagination
  };
}

export async function getAnimeDetail(id: string): Promise<Anime> {
  try {
    const url = `${BASE_URL}/anime/${id}`;
    console.log("Fetching anime detail from:", url);
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      console.error(`Failed to fetch anime detail: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch anime detail: ${res.status}`);
    }
    const json: APIDetailResponse = await res.json();
    const data = json.data;

  const description = data.synopsis.paragraphs.join("\n\n");
  const title = data.title || data.english || data.japanese || "Unknown Title";

    return {
      id: id,
      title: title,
      description: description,
      thumbnail: data.poster,
      banner: data.poster,
      genre: data.genreList.map(g => g.title),
      rating: data.score.value.trim(),
      year: data.aired ? new Date(data.aired.split(" to ")[0]).getFullYear() : 2026,
      type: data.type,
      status: data.status,
      episodes: data.episodeList.map((ep, i) => {
        const episodeNumber = typeof ep.title === 'number' 
          ? ep.title 
          : ep.title 
            ? parseInt(ep.title.toString()) || (data.episodeList.length - i)
            : (data.episodeList.length - i);
        
        return {
          id: ep.episodeId,
          number: episodeNumber,
          title: `Episode ${ep.title || episodeNumber}`,
          thumbnail: data.poster,
          duration: data.duration
        };
      }).reverse(),
      japanese: data.japanese,
      producers: data.producers,
      studios: data.studios,
      synopsis: description
    };
  } catch (error) {
    console.error("Error in getAnimeDetail:", error);
    throw error;
  }
}

export async function getSearchAnime(query: string, page: number = 1): Promise<{ animeList: Anime[], pagination: APIGenreDetailResponse['pagination'] }> {
  const res = await fetch(`${BASE_URL}/search?q=${query}&page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch search results");
  const json: APIGenreDetailResponse = await res.json();
  return {
    animeList: json.data.animeList.map(a => transformAPIAnime(a)),
    pagination: json.pagination
  };
}

export async function getRecentAnime(page: number = 1): Promise<Anime[]> {
  const res = await fetch(`${BASE_URL}/recent?page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data.recent.animeList as APIAnime[]).map(a => transformAPIAnime(a));
}

export async function getMovies(page: number = 1): Promise<{ animeList: Anime[], pagination: APIGenreDetailResponse['pagination'] }> {
  const res = await fetch(`${BASE_URL}/movies?page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  const json: APIGenreDetailResponse = await res.json();
  return {
    animeList: json.data.animeList.map(a => transformAPIAnime(a, "Movie")),
    pagination: json.pagination
  };
}

export async function getPopularAnime(): Promise<Anime[]> {
  const res = await fetch(`${BASE_URL}/popular`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch popular anime");
  const json = await res.json();
  return (json.data.animeList as APIAnime[]).map(a => transformAPIAnime(a, a.type || "TV"));
}

export async function getOngoingAnime(page: number = 1): Promise<{ animeList: Anime[], pagination: APIGenreDetailResponse['pagination'] }> {
  const res = await fetch(`${BASE_URL}/ongoing?page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch ongoing anime");
  const json: APIGenreDetailResponse = await res.json();
  return {
    animeList: json.data.animeList.map(a => transformAPIAnime(a, a.type || "TV")),
    pagination: json.pagination
  };
}

export async function getSchedule(): Promise<APIScheduleResponse['data']> {
  const res = await fetch(`${BASE_URL}/schedule`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch schedule");
  const json: APIScheduleResponse = await res.json();
  return json.data;
}

export async function getCompletedAnime(page: number = 1): Promise<{ animeList: Anime[], pagination: APIGenreDetailResponse['pagination'] }> {
  const res = await fetch(`${BASE_URL}/completed?page=${page}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error("Failed to fetch completed anime");
  const json: APIGenreDetailResponse = await res.json();
  return {
    animeList: json.data.animeList.map(a => transformAPIAnime(a, a.type || "TV")),
    pagination: json.pagination
  };
}

export function transformAPIAnime(apiAnime: APIAnime, type: string = "TV"): Anime {
  return {
    id: apiAnime.animeId,
    title: apiAnime.title,
    description: "",
    thumbnail: apiAnime.poster,
    banner: apiAnime.poster,
    genre: [],
    rating: apiAnime.score || "N/A",
    year: apiAnime.releaseDate ? new Date(apiAnime.releaseDate).getFullYear() : 2026,
    type: type,
    status: apiAnime.releasedOn || "Released",
    episodes: [], // Episodes are handled in detail or not needed for cards
  };
}
