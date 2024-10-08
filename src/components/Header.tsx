import { useEffect, useMemo } from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {

    const {pathname} = useLocation()

    const isHome = useMemo(() => pathname === '/' ,[pathname])
    const fetCategory = useAppStore((state) => state.fetCategory)
    const categories = useAppStore((state) => state.categories)

    useEffect(() => {fetCategory()})

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
                    <form className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'>
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
                                placeholder='Nombre o ingrediente. Ej. Vodka, Tequila, Café, etc'/>
                        </div>
                        <div className='space-y-4'>
                            <label 
                                className='block text-white uppercase font-extrabold text-lg' 
                                htmlFor="ingredient"
                            >Categoria</label>
                            <select 
                                id='ingredient' 
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none'
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
