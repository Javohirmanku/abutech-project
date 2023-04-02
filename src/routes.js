import {LOGIN_API,DEGREE_API} from "./const";

export const host = process.env.LOGIN_API;

const routes = {
    login: [LOGIN_API, 'api/login'].join('/'),
    getDegree: (city) => [DEGREE_API,`data/2.5/weather?q=${city}&appid=65a20f6e7b164b917f907f42549ad89b`].join('/')
};

export default routes;
