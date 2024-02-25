import React, { useEffect,Suspense,lazy} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFromApi } from './utils/api'
import { Routes,Route, BrowserRouter} from 'react-router-dom';
const Home = lazy(()=> import('./Pages/Home/Home'))
const Details = lazy(()=> import('./Pages/Details/Details'))
const Explore = lazy(()=> import('./Pages/Explore/Explore'))
const PageNotFound = lazy(()=> import('./Pages/404/PageNotFound'))
const SearchResults = lazy(()=> import('./Pages/SearchResults/SearchResults'))

import {getApiConfiguration} from './Store/homeSlice';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';



const App = () => {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=> state.home)
  console.log(url)

  useEffect(()=>{
    fetchApiConfig();
  },[]);
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration").then((res)=>{
      console.log(res)

      const url ={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url))
    });
  };
  return (
      <BrowserRouter>
        <Suspense fallback={<div className='loader'></div>}>
          <Header/>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path='/:mediaType/:id' Component={Details}/>
          <Route path='/search/:query' Component={SearchResults}/>
          <Route path='/explore/:mediaType' Component={Explore}/>
          <Route path='*' Component={PageNotFound}/>
        </Routes>
        <Footer/>
        </Suspense>
      </BrowserRouter>
      
  )
}

export default App