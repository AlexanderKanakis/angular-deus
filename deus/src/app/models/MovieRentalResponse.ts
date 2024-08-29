import { MovieRentals } from "./MovieRentals";

export interface MovieRentalResults {
    count: number,
    next: string,
    previous: string,
    results: MovieRentals[]
}