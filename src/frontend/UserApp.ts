import { UserController } from "./controllers/UserController";


const appElement : HTMLElement = document.querySelector('#app') as HTMLElement;

console.log('login form');

if (appElement) {
    let usercontroller: UserController = new UserController(appElement);
}

