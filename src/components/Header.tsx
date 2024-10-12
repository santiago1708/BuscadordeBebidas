import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'
import ErrorMessage from './ErrorMessage'

export default function Header() {

    const {pathname} = useLocation()

    const isHome = useMemo(() => pathname === '/' ,[pathname])
    const [searchFilters, setSearchFilter] = useState({
        ingredient: '',
        category: ''

    })
    const [error, setError] = useState('')

    const fetCategory = useAppStore((state) => state.fetCategory)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {fetCategory()},[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilters, 
            [e.target.name]:  e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')) {
            setError('Todos los campos son obligatorios')
            showNotification({
                text: 'No se pudo realizar la busqueda',
                error: true
            })
            return
        }
        setError('')
        searchRecipes(searchFilters)

    }
    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-10 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="Logotipo"  className="w-32"/>
                    </div>

                    <nav className='flex gap-5'>
                        <NavLink 
                            to='/' 
                            className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                        <NavLink 
                            to='/Favorites' 
                            className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6' onSubmit={handleSubmit}>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <div className='space-y-4'>
                            <label 
                                className='block text-white uppercase font-extrabold text-lg' 
                                htmlFor="ingredient"
                            >Nombre o Ingredientes</label>
                            <input 
                                id='ingredient' 
                                name='ingredient' 
                                type="text" 
                                className='p-3 w-full rounded-lg focus:outline-none' 
                                placeholder='Nombre o ingrediente. Ej. Vodka, Tequila, Café, etc'
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                                />
                        </div>
                        <div className='space-y-4'>
                            <label 
                                className='block text-white uppercase font-extrabold text-lg' 
                                htmlFor="category"
                            >Categoria</label>
                            <select 
                                id='category' 
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit"
                            value='Buscar receta' 
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg uppercase p-2'
                        />

                    </form>
                )}
            </div>
        </header>
    )
}
