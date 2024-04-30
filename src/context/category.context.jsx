import { createContext, useContext, useState } from "react"


const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [category,setCategory]=useState("");
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
        {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => useContext(CategoryContext)

