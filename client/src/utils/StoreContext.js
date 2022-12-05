import React, { useState, useContext } from 'react';

export const StoreContext = React.createContext();
export const useStore = () => useContext(StoreContext);

// NOTE: Context does not work currently, state is unable to change dynamically
export default function StoreProvider({ children })
{
    const [storeId, setStoreId] = useState('');
    const [username, setUsername] = useState('');
    
    return (
        <StoreContext.Provider value={{ username, storeId }}>
            {children}
        </StoreContext.Provider>
    )
}