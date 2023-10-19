import jwtDecode from 'jwt-decode';
import {createContext, useReducer} from 'react'

interface ITokenDecoded {
    id: string;
    email: string;
    iat: number
}

interface IAuthState {
    isLoggedIn: boolean;
    token: string;
    id: string
}

enum ACTION_TYPES {
    LOGIN,
    LOGOUT
}

interface ActionPayload extends ITokenDecoded {
    isLoggedIn: boolean;
    token: string
}

type ReducerAction = {
    type: ACTION_TYPES,
    payload?: ActionPayload
}

export interface IAuthContext {
    state: IAuthState
    login: (token: string) => boolean
    logOut: () => void
}

const initialState: IAuthState = {
    token: '',
    id: '',
    isLoggedIn: false
}

export const AuthContext = createContext<IAuthContext>({
    state: initialState,
    login: () => false,
    logOut: () => {},
})


function reducer(state: IAuthState , action: ReducerAction ): IAuthState {
    switch(action.type) {
        case ACTION_TYPES.LOGIN:
            if (!action.payload) return initialState
            return {...action.payload}
        case ACTION_TYPES.LOGOUT:
            return initialState
        default: 
            return state
    }
}

const AuthContextProvider = ({children}: React.PropsWithChildren) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const login = (token: string) => {
        const decode = jwtDecode<ITokenDecoded>(token)
        if (!decode?.id) {
            return false
        } 
        localStorage.setItem('token', token)
        dispatch({type: ACTION_TYPES.LOGIN, payload: {...decode, token, isLoggedIn: true}})
        return true
    }

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch({type: ACTION_TYPES.LOGOUT})
    }

    return <AuthContext.Provider value={{state, login, logOut}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider