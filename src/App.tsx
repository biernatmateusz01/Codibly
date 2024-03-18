import { useState, useEffect } from 'react'
import './index.css'
import { BaseModal } from './components/BaseModal'
import { BaseTable } from './components/BaseTable'
import { Product } from './types'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import _ from 'lodash';

function App() {
  const [showedModal, setShowedModal] = useState<boolean>(false)
  const [data, setData] = useState<Product[] | null>(null)
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [modalData, setModalData] = useState<Product | null>(null)
  const [productId, setProductId] = useState<number | null>(null)

  const fetchElements = async (page: number, id?: number) => {
    try {
      let url = productId ? `https://reqres.in/api/products?page=${page}&id=${id}` : `https://reqres.in/api/products?page=${page}`

      const response = await fetch(url);
      const data = await response.json()
      setData(data.data)
      setCount(data.total_pages)
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error)
    } finally {
      console.log('finalyy')
    }
  }

  useEffect(() => {
    fetchElements(1)
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

  const filterData = _.debounce((id: number) => {
    setProductId(id)
    fetchElements(page, id)

  }, 1000);

  return (
    <>
      <div className='bg-gray-200 min-h-screen flex flex-col gap-6 p-6'>
        {showedModal && <BaseModal modalData={modalData} closeModal={closeModal} />}
        <TextField id="outlined-basic" label="Outlined" variant="outlined" type='number' onInput={() => {filterData(event?.target.value)}} />
        <BaseTable data={data} onClick={onClick} />
        <div className='block ml-auto'>
          <Stack spacing={2}>
            <Pagination count={count} variant="outlined" shape="rounded" onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </>
  )
}

export default App;
