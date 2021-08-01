import {
  SET_DATA,
  EDIT_DATA,
  DELETE_DATA,
  SET_USERID,
  SET_LOGOUT,
} from "./todoType";

export const setData = (data: { [k: string]: any }) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const editData = (data: { [k: string]: any }) => {
  return {
    type: EDIT_DATA,
    payload: data,
  };
};

export const deleteData = (id: number) => {
  return {
    type: DELETE_DATA,
    payload: id,
  };
};

export const setUserLoginData = (data: { [k: string]: any }) => {
  return {
    type: SET_USERID,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: SET_LOGOUT,
  };
};
