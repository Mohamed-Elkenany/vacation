export const initialStatePost = {
    description: "",
    imageUrl: [],
    publicId:''
};

export const reducer = (state = initialStatePost, action) => {
    switch (action.type) {
        case "ADD_DESCRIPTION": {
            return {
                ...state,
                description: action.payload
            }
        }
        case "ADD_IMAGE": {
            return {
                ...state,
                imageUrl: action.payload
            }
        }
        case "ADD_PUBLICID": {
            return {
                ...state,
                publicId: action.payload
            }
        }
    }
}