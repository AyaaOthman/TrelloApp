import React, {useContext} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../Context/auth.context';

function GoogleAuth() {
    const {login} = useContext(AuthContext)
    return (
        <div className='flex items-center z-10 justify-center'>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    await axios.post('http://localhost:5000/cont-with-gmail', {credintial: credentialResponse.credential})
                        .then(({data}) => {
                            login(data.token)
                        })
                        .catch(err => {
                            toast.error('something went wrong please try again')
                        })
                }}
                onError={() => {
                    toast.error('login falis')
                }}
                size='large'
                shape='pill'
                type='standard'
                text='continue_with'
            />
        </div>    
    )
}
export default GoogleAuth