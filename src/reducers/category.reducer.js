import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: "",
    message:""
};


const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                id: category.id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id == parentId){
            const newCategory = {
                id: category.id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }
    return myCategories;
}


export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log('updated categoires', updatedCategories);
            
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
                message: action.payload.message
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
         case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}