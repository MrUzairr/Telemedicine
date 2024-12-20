import { Navigate } from "react-router-dom";

function Protected({isAuth,children}){
    if(isAuth){
        return children;
    }
    else{
        console.log(children)
        return <Navigate to='/signin'/>
    }
}

export default Protected;