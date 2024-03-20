import '../index.css'
import { useContext } from 'react'
import { UserContext } from '../App'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { BaseModal } from './BaseModal'
import { BaseTable } from './BaseTable'
import { BaseLoader } from './BaseLoader'
import { ToastContainer } from 'react-toastify';

function AppView() {
    const { showedModal, data, paginationCount, isLoader, modalData, handleChange, onClick, filterData, closeModal } = useContext(UserContext);
    return (
        <div className='bg-gray-200 min-h-screen flex flex-col gap-6 p-6'>
            <ToastContainer />
            {isLoader && <BaseLoader />}
            {showedModal && <BaseModal modalData={modalData} closeModal={closeModal} />}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" type='number' onInput={() => { filterData(event?.target.value) }} />
            <BaseTable data={data} onClick={onClick} />
            <div className='block ml-auto'>
                <Stack spacing={2}>
                    <Pagination count={paginationCount} variant="outlined" shape="rounded" onChange={handleChange} />
                </Stack>
            </div>
        </div>
    )
}
export default AppView
