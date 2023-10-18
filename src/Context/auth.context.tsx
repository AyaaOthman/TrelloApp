import jwtDecode from 'jwt-decode';
import {createContext, useReducer} from 'react'

interface IAuthState {
    isLoggedIn: boolean;
    token: string;
    id: string
}

interface ITokenDecoded {
    id: string;
    email: string;
    iat: number
}

export const AuthContext = createContext({})

function reducer(state: IAuthState , action: any ) {
    switch(action.type) {
        case 'login':
            return {...action.payload, isLoggedIn: true}
        case 'logout':
            return {isLoggedIn: false}
        default: 
            return state
    }
}

const AuthContextProvider:React.FC = ({children}: React.PropsWithChildren) => {

    const [state, dispatch] = useReducer<any>(reducer, {isLoggedIn: false, token: null, id: null})

    const login = (token: string) => {
        const decode = jwtDecode<ITokenDecoded>(token)
        console.log(token);
        if (!decode?.id) {
            return false
        } 
        localStorage.setItem('token', token)
        // dispatch({type: 'login', payload: {...decode, token}})
        return true
    }

    const logOut = () => {
        localStorage.removeItem('token')
        // dispatch({type: 'logout'})
    }


    return <AuthContext.Provider value={{state, login, logOut}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider