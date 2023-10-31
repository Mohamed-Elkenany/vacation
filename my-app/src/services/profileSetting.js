export const initialState = {
    userName,
    banner,
    avatar,
    bio,
}

export const reducer = (state,action) => {
    switch (action.type) {
        case "AVATAR": {
            return {
                ...state,
                avatar : action.payload
            }
        }
        case "BANNER": {
            return {
                ...state,
                banner : action.payload
            }
        }
        case "BIO": {
            return {
                ...state,
                bio : action.payload
            }
        }
        case "USERNAME": {
            return {
                ...state,
                userName : action.payload
            }
        }
    }
}