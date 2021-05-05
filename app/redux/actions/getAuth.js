const SUCCESS_AUTH = "SUCCESS_AUTH";

const successAuth = (payload) => ({
    type: SUCCESS_AUTH,
    payload,
});

export default successAuth;
