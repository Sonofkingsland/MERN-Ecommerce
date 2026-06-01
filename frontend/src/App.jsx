// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Shop } from './pages/Shop'
import { About } from './pages/About'
import { Cart } from './pages/Cart'
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { Profile } from './pages/Profile'
import { ReturnPolicy } from './pages/ReturnPolicy'
import { Register } from './pages/Register'
import {Login} from './pages/Login'
import { ProductDetails } from './pages/productDetails'
import { Toaster } from 'react-hot-toast'
import { Checkout } from './pages/Checkout'
import { OrderSuccess } from './pages/OrderSuccess'
import { AdminDashboard } from './admin/AdminDashboard'
import { Addproduct } from './admin/Addproduct'
import { Adminproducts } from './admin/Adminproducts'
import { EditProducts } from './admin/EditProducts'
import { AdminOrders } from './admin/AdminOrders'
import { AdminUsers } from './admin/AdminUsers'
// import './App.css'

function App() {

  return (
    <>
    <Toaster/>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/ordersuccess' element={<OrderSuccess/>}/>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/return-policy' element={<ReturnPolicy/>}/>


        <Route path='/profile' element={<Profile/>}/>
         <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
       

        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/admin/add-product' element={<Addproduct/>}/>
        <Route path='/admin/products' element={<Adminproducts/>}/>
        <Route path='/admin/edit-product/:id' element={<EditProducts/>}/>
        <Route path='/admin/orders' element={<AdminOrders/>}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
