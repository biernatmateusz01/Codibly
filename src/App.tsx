import { createContext, useState, useEffect } from 'react';
import AppView from './components/AppView';
import { Product } from './types'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
export const UserContext = createContext()
import { updateUrl } from '../src/utils/updateUrl';


function App() {
  const [data, setData] = useState<Product[] | null>(null)
  const [paginationCount, setPaginationCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isLoader, setIsLoader] = useState<boolean>(false)

  const fetchElements = async (page: number, id?: number) => {
    updateUrl(page, id)
    setIsLoader(true);
    try {
      let url = `https://reqres.in/api/products?page=${page}&per_page=5`;
      if (id != null) {
        url += `&id=${id}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.data) {
        id ? setData([data.data]) : setData(data.data);
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
  };

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id')
    const page = Number(new URLSearchParams(window.location.search).get('page'))
    id  ? fetchElements(page != 0 ? page : 1, Number(id)) : fetchElements(page != 0 ? page : 1)
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchElements(value)
  };

  const filterData = debounce((id: number) => {
    fetchElements(page, id)
  }, 1000);

  const context = { data, paginationCount, isLoader, handleChange, filterData }

  return (
    <UserContext.Provider value={context}>
      <AppView />
    </UserContext.Provider>
  );
}


export default App