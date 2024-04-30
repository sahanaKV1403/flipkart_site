import { createContext, useContext, useState } from "react"
const AddressContext = createContext();

export const AddressContextProvider = ({children}) => {
    const [address, setAddress] = useState([]);
  
    return (
        <AddressContext.Provider value={{ address, setAddress}}>
            {children}
        </AddressContext.Provider>
    )
}
export const useAddressContext = () => useContext(AddressContext)
