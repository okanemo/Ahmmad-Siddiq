const initialValue = {
    user: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
}

const ReducerData = (state = initialValue, action) => {
    switch (action.type) {
        case "GET_USER_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_USER_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "GET_USER":
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          user: action.payload
        };
        default:
            return state;
    }
};

export default ReducerData;