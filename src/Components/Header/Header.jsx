import React, { useEffect, useState } from 'react'
import './style.scss';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai"
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setlastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('')
  const [showsearch, setShowSearch] = useState('');
  const navigate = useNavigate()
  const location = useLocation()

  const scrollNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide')
      }
      else {
        setShow('show')
      }
    }
    else {
      setShow('top')
    }
    setlastScrollY(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar)
    return () => {
      window.addEventListener('scroll', scrollNavbar)
    }
  }, [lastScrollY])


  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShow(false);
  }
  const searchHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  }
  const navigateHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie')
    }
    else {
      navigate('/explore/tv')
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <header className={`header ${mobileMenu ? 'mobileDisplay' : ""} ${show}`}>
      <ContentWrapper>
        <div className='logo' onClick={() => navigate('/')}>
          <h3>MovieFlix</h3>
        </div>
        <ul className='menu-Items'>
          <li className='menu-item' onClick={() => navigateHandler('movie')}>Movies</li>
          <li className='menu-item' onClick={() => navigateHandler('tv')}>Tv Shows</li>
          <li className='menu-item'>
            <FaSearch onClick={openSearch} />
          </li>
        </ul>
        <div className='mobile-menu'>
          <FaSearch onClick={openSearch} />
          {mobileMenu ? <AiOutlineClose onClick={() => setMobileMenu(false)} /> : <HiMenu onClick={openMobileMenu} />}
        </div>
      </ContentWrapper>

      {showsearch && (<div className='search-bar'>
        <ContentWrapper>
          <div className='search-input'>
            <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={searchHandler} placeholder='Searches for movies,Tv shows' />
            <AiOutlineClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>)}

    </header>
  )
}

export default Header