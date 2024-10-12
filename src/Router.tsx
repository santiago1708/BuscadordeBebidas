import { lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Layout from './layouts/Layout'

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export default function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<IndexPage/>} index />
                    <Route path='/Favorites' element={
                        <Suspense fallback='Cargando...'>
                            <FavoritesPage />
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
