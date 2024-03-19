import './index.css'
import { useState, useEffect } from 'react'
import { BaseModal } from './components/BaseModal'
import { BaseTable } from './components/BaseTable'
import { BaseLoader } from './components/BaseLoader'
import { Product } from './types'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';

function App() {
  const [showedModal, setShowedModal] = useState<boolean>(false)
  const [data, setData] = useState<Product[] | null>(null)
  const [paginationCount, setPaginationCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [modalData, setModalData] = useState<Product | null>(null)

  const fetchElements = async (page: number, id?: number) => {
    setIsLoader(true)
    const newUrl = id ? `${window.location.origin}${window.location.pathname}?page=${page}&id=${id}` : `${window.location.origin}${window.location.pathname}?page=${page}`;
    window.history.replaceState(null, '', newUrl);
    try {
      let url = id != null ? `https://reqres.in/api/products?page=${page}&id=${id}` : `https://reqres.in/api/products?page=${page}`
      const response = await fetch(url);
      const data = await response.json()
      if(data.data){
        id ? setData([data.data]) : setData(data.data)
      }
      setPaginationCount(data.total_pages)
      toast.success("Wow so easy!")
    } catch (error) {
      toast.error('Something went wrong :(', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoader(false)
    }
  }

  useEffect(() => {
    const id = Number(new URLSearchParams(window.location.search).get('id'))
    const page = Number(new URLSearchParams(window.location.search).get('page'))
    id != 0 ? fetchElements(page != 0 ? page : 1, id) : fetchElements(page != 0 ? page : 1)
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchElements(value)
  };


  const onClick = (row: Product) => {
    setModalData(row)
    setShowedModal(true)
  }

  const closeModal = () => {
    setShowedModal(false)
  }


  const filterData = debounce((id: number) => {
    fetchElements(page, id)
  }, 1000);


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

export default App;
