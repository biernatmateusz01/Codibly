import { useDataContext } from '../context/dataContext';
import { ToastContainer } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { BaseTable } from './BaseTable'
import { BaseLoader } from './BaseLoader'
import '../index.css'

function AppView() {
    const { value, handleValueChange, isLoader, currentPage, handleCurrentPageChange, paginationCount } = useDataContext();

    return (
        <div className='bg-gray-200 min-h-screen flex flex-col gap-6 p-6'>
            <ToastContainer />
            {isLoader && <BaseLoader />}
            <TextField id="outlined-basic" label="Find" variant="outlined" type='number' value={value} onInput={(event) => handleValueChange(event)} />
            <BaseTable />
            <div className='block ml-auto'>
                <Stack spacing={2}>
                    <Pagination count={paginationCount} page={currentPage} onChange={(_, value) => handleCurrentPageChange(value)} variant="outlined" shape="rounded" />
                </Stack>
            </div>
        </div>
    )
}
export default AppView;
