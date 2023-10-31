
export const loginInitState = {
    email: '',
    password: '',
}

export const reducer = (state, action) => {
    switch (action.type) {
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
    }
}