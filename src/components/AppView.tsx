import '../index.css'
import { useState, ChangeEvent } from 'react';
import { useContext } from 'react'
import { UserContext } from '../App'
import { BaseTable } from './BaseTable'
import { BaseLoader } from './BaseLoader'
import { ToastContainer } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { UserContexType } from '../types';

function AppView() {
    const { paginationCount, isLoader, handleChange, filterData } = useContext<UserContexType>(UserContext);
    const [currentPage, setCurrentPage] = useState(Number(new URLSearchParams(window.location.search).get('page')) || 1);


    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        handleChange(event, value);
    };
    return (
        <div className='bg-gray-200 min-h-screen flex flex-col gap-6 p-6'>
            <ToastContainer />
            {isLoader && <BaseLoader />}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" type='number' onInput={() => { filterData(event?.target.value) }} />
            <BaseTable />
            <div className='block ml-auto'>
                <Stack spacing={2}>
                    <Pagination count={paginationCount} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Stack>
            </div>
        </div>
    )
}
export default AppView;
