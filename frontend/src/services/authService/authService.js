import JwtDecode from "jwt-decode"
import NameItem from '../../config/sessionStorage'

const Authenticate = (page) => {
    var jwt;
    if(sessionStorage.getItem(NameItem.ACCESS_TOKEN) !== null){
        jwt = JwtDecode(sessionStorage.getItem(NameItem.ACCESS_TOKEN))
        var exp = jwt.exp;
        if (exp < Date.now()/1000){
            return false;
        }
        switch(page){
            case '':
                if(!jwt.customer_id)
                    return false
                break;
            case '/employee':
                if(!jwt.employee_id)
                    return false
                break;
            case '/admin':
                if(!jwt.admin_id)
                    return false
                break;
            default: 
        }
        return true
    } else {
        return false
    }
}

export function isAuthen(page) {
    if (Authenticate(page)){
        return true;
    } else {
        return false
    };
}
 
