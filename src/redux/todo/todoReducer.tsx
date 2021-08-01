import {
  SET_DATA,
  EDIT_DATA,
  DELETE_DATA,
  SET_USERID,
  SET_LOGOUT,
} from "./todoType";

const initialState = {
  taskData: [],
  userName: "",
  userId: "",
};

const TodoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERID: {
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    }
    case SET_LOGOUT: {
      return initialState;
    }
    case SET_DATA: {
      const {
        taskName,
        description,
        startTime,
        endTime,
        taskId,
      } = action.payload;
      return {
        ...state,
        taskData: [
          ...state.taskData,
          {
            taskName,
            description,
            startTime,
            endTime,
            taskId,
          },
        ],
      };
    }
    case EDIT_DATA: {
      const originalData = state.taskData;
      const {
        taskName,
        description,
        startTime,
        endTime,
        taskId,
      } = action.payload;
      const newData = originalData.map((r: any) =>
        r.taskId === action.payload.taskId
          ? {
              taskName,
              description,
              startTime,
              endTime,
              taskId,
            }
          : { ...r }
      );
      return {
        ...state,
        taskData: newData,
      };
    }
    case DELETE_DATA: {
      const val = action.payload;
      let index: any = "";
      const gotData = state.taskData;
      state.taskData.map((ele: any, i: number) =>
        ele.taskId === val ? (index = i) : ""
      );
      gotData.splice(index, 1);
      return {
        ...state,
        taskData: gotData,
      };
    }

    default:
      return state;
  }
};

export default TodoReducer;
