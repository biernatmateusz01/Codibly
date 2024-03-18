export interface Support{
    url: string,
    text: string
}

export interface Product {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string,
}

export interface PaginationProps{
    count: number,
    handleChangePage: void
}

