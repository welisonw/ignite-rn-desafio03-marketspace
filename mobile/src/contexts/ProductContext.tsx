import { PropsWithChildren, createContext } from 'react';

export const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }: PropsWithChildren) => {
	return (
		<ProductContext.Provider value={{  }}>{children}</ProductContext.Provider>
	);
};
