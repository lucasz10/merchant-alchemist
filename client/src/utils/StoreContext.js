import React, { useState, useContext } from 'react';

export const StoreContext = React.createContext();
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children })
{
    // TESTING: Store ID obtained from user login/signup
    // const store = useRef('638c09ae51336820bcd95f18');
    const [storeId, setStoreId] = useState('638c09ae51336820bcd95f18');

    return (
        <StoreContext.Provider value={{ storeId, setStoreId }}>
            {children}
        </StoreContext.Provider>
    )
}