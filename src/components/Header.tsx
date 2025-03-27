import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const [searchFilter, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })
    

    const {pathname} = useLocation();

    const isHome = useMemo(() => pathname === '/', [pathname]);

    const fetchCategories = useAppStore(state => state.fetchCategories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    const categories = useAppStore(state => state.categories)

    const showNotificacion = useAppStore(state => state.showNotificacion)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if(Object.values(searchFilter).includes('')){


            showNotificacion({
                text: 'Todos los Campos Son obligatorios',
                error: true
            })


            return
        }

        const recipes = searchRecipes(searchFilter)
        console.log(recipes)
        
    }

  return (
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img src="/logo.svg" alt="logotipo"
                        className="w-32" 
                    />
                </div>

                <nav className="flex gap-4">
                    <NavLink to="/" 
                     className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    
                     }
                    >Inicio</NavLink>
                    <NavLink to="/favoritos" 
                    
                    
                    className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    
                     }
                    
                    >Favoritos</NavLink>
                </nav>

            </div>

            {isHome && (
                <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg
                 shadow space-y-6"
                 onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <label htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"
                        >Nombre o Ingredientes
                        </label>

                        <input 
                        type="text" 
                        id="ingredient"
                        name="ingredient" 
                            className="p-3 w-full rounded-lg focus:outline-none bg-white"
                            placeholder="Nombre o Ingrediente. Ej. Vodka, Ron, etc."
                        onChange={handleChange}
                        />

                    </div>

                    <div className="space-y-4">
                        <label htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg "
                        >Categoría
                        </label>

                        <select
                       
                        id="category"
                        name="category" 
                            className="p-3 w-full rounded-lg focus:outline-none bg-white"
                            onChange={handleChange }
                        >
                            <option value="">--Seleccione una categoría--</option>
                            {categories.drinks.map(category => (
                                <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                            ))}
                            
                        
                        </select>

                    </div>
                    <input 
                        type="submit"
                        value="Buscar Recetas"
                        className="cursor-pointer bg-orange-800 hover:bg-orange-900
                        text-white uppercase font-extrabold w-full p-2 rounded-lg" 
                        
                    
                    />
                </form>

            )}


        </div>

    </header>
  )
}
