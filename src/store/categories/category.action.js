import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {createAction} from '../../utils/reducer/reducer.utils'
import { CATEGORIES_ACTION_TYPE } from './category,types'

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,categories)

export const fetchCategoriesFaild = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,error)

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFaild(error));
  }
}
