import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useDebounce } from "use-debounce";
import { toast } from 'react-toastify';
import { DataContextType, Product } from "../types/index"
import { updateUrl } from '../utils/updateUrl'

const initialState: DataContextType = {
    value: '',
    isLoader: false,
    currentPage: 0,
    data: [],
    paginationCount: 0,
    // @ts-ignore
    handleValueChange: (event: React.FormEvent<HTMLDivElement>) => { },
    // @ts-ignore
    handleCurrentPageChange: (value: number) => { },
}


const DataContext = createContext<DataContextType>(initialState);

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const id = new URLSearchParams(window.location.search).get('id');
    const page = new URLSearchParams(window.location.search).get('page');
    const [value, setValue] = useState(id ? id : '');
    const [debouncedValue] = useDebounce(value, 1000);
    const [data, setData] = useState<Product[]>([]);
    const [isLoader, setIsLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
    const [paginationCount, setPaginationCount] = useState(0);

    const handleValueChange = (event: React.FormEvent<HTMLDivElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }

    const handleCurrentPageChange = (value: number) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        const fetchData = async () => {
            setIsLoader(true);
            try {
                let url = `https://reqres.in/api/products?page=${currentPage}&per_page=5`;
                if (value) url += `&id=${value}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                if (data.data) {
                    Array.isArray(data.data) ? setData(data.data) : setData([data.data]);
                    setPaginationCount(data.total_pages);
                }
            } catch (error) {
                toast.error('Something went wrong :(', {
                    position: "top-right",
                    autoClose: 5000,
                });
            } finally {
                setIsLoader(false);
            }

            updateUrl(currentPage, value)
        }

        fetchData();
    }, [currentPage, debouncedValue])

    return (
        <DataContext.Provider value={{ data, value, isLoader, currentPage, paginationCount, handleValueChange, handleCurrentPageChange }}>
            {children}
        </DataContext.Provider>
    )
}