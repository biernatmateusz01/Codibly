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

export interface UserContexType {
    data?: Product[],
    paginationCount?: number,
    isLoader?: boolean,
    handleChange?: void,
    filterData?: void
}