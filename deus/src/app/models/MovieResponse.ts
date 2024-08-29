import { Movie } from "./Movie";

export interface MovieResults {
    count: number,
    next: string,
    previous: string,
    results: Movie[]
}