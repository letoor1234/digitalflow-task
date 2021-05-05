const reducer = (state = { token: "" }, action) => {
    switch (action.type) {
        case "SUCCESS_AUTH": {
            return {
                ...state,
                token: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
