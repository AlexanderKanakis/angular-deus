export interface MovieRentals {
    uuid: string
    movie: string
    user: string
    rental_date: string
    return_date: string | null
    isPaid: boolean
}