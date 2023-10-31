export const registerInit = {
    fName:'',
    lName:'',
    email:'',
    password:'',
    userName: '',
    image: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'FNAME': {
            return {
                ...state,
                fName: action.fName,
            }
        }
        case 'LNAME': {
            return {
                ...state,
                lName: action.lName,
            }
        }
        case 'USERNAME': {
            return {
                ...state,
                userName: action.userName,
            }
        }
        case 'EMAIL': {
            return {
                ...state,
                email: action.email,
            }
        }
        case 'PASSWORD': {
            return {
                ...state,
                password: action.password,
            }
        }
        case 'ADDIMAGE': {
            return {
                ...state,
                image: action.image,
            }
        }
        default:
            return state;
    }
}