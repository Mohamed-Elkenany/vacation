export const inittialState = {
    country: null,
    city: null,
    State: null,
    vacationType:null,
    description: null,
    image: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'EDIT_COUNTRY': {
            return {
                ...state,
                country: action.payload,
            }
        }
        case 'EDIT_CITY': {
            return {
                ...state,
                city: action.payload,
            }
        }
        case 'EDIT_STATE': {
            return {
                ...state,
                State: action.payload,
            }
        }
        case 'EDIT_DESCRIPTION': {
            return {
                ...state,
                description: action.payload,
            }
        }
        case 'EDIT_VACATION': {
            return {
                ...state,
                vacationType: action.payload,
            }
        }
        case 'EDIT_IMAGE': {
            return {
                ...state,
                image: action.payload,
            }
        }
    }
}

export default reducer;

