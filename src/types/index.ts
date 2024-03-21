export interface Product {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string,
}

export interface PaginationProps {
    count: number,
    handleChangePage: void
}

export interface ModalProps {
    modalData: Product,
    closeModal: React.MouseEventHandler<HTMLButtonElement>
}

export interface DataContextType {
    value: string,
    isLoader: boolean,
    currentPage: number,
    paginationCount: number,
    data: Product[];
    handleValueChange: (event: React.FormEvent<HTMLDivElement>) => void
    handleCurrentPageChange: (value: number) => void,
}