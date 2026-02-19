import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Ordenes from '../pages/Ordenes'
import Croquis from '../pages/Croquis'
import Desglose from '../pages/Desglose'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>

          <Route index element={<Navigate to="/ordenes" replace />} />

          <Route path={'ordenes'} element={<Ordenes />} />
          <Route path={'desglose'} element={<Desglose />} />
          <Route path={'croquis'} element={<Croquis />} />

        </Route>
      </Routes>

    </BrowserRouter>
  )
}
