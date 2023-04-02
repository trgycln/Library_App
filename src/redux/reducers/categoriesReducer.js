import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: true,
  success: false,
  categories: [],
  error: false,
  errorMessage: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.categoryActions.GET_CATEGORİES_START:
      return {
        ...state,
        pending: true,
      };

    case actionTypes.categoryActions.GET_CATEGORİES_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        categories: action.payload,
      };

    case actionTypes.categoryActions.GET_CATEGORİES_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMessage: action.payload,
      };

    case actionTypes.categoryActions.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case actionTypes.categoryActions.DELETE_CATEGORY:
      const filteredCategories = state.categories.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        categories: filteredCategories,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
