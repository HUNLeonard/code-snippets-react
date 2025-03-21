import Popup from '../../common/Popup'
import { AdminHeader } from '../adminLayout.tsx/AdminHeader'
import Header from './Header'
// import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className='relative max-w-8xl mx-auto min-h-screen '>
        <AdminHeader />
        <Outlet />
        <Popup />
      </div>
      {/* <Footer /> */}
    </>
  )
}
