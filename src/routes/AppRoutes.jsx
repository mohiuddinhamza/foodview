import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/user/UserRegister'
import UserLogin from '../pages/user/UserLogin'
import Home from '../pages/Home'
import FoodPartnerRegister from '../pages/partner/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/partner/FoodPartnerLogin'
import AuthSelectionUser from '../pages/AuthSelection/AuthSelectionUser'
import AuthSelectionPartner from '../pages/AuthSelection/AuthSelectionPartner'
import FeedPage from '../pages/UserInterface/FeedPage'


const AppRoutes = () => {
  return (
    <div>
       <Routes>
           <Route path='/' element={<Home />} />
           
           <Route path='/auth/select/user' element={<AuthSelectionUser/>} />
           <Route path='/auth/select/partner' element={<AuthSelectionPartner/>} />
           <Route path='/user/register' element={<UserRegister />} />
           <Route path='/user/login' element={<UserLogin />} />
           <Route path='/food-partner/register' element={<FoodPartnerRegister/>} />
           <Route path='/food-partner/login' element={<FoodPartnerLogin/>} />
           <Route path='/feed'element={<FeedPage />} />

       </Routes>
    </div>
  )
}

export default AppRoutes