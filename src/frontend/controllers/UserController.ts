import { User } from "../models/User";
import { validate } from "class-validator";
import autobind from "autobind-decorator";

// Tạo lớp  (tìm kiếm id play) 
export class UserController {
  constructor(public element: HTMLElement) {
    const button = element.querySelector("#play"); //

    // console.log("UserController constructor");
    // phương thức xữ lý sự kiên click
    button?.addEventListener("click", this.processPlayButtonClick);
  }
  @autobind
  processPlayButtonClick(event: Event) {
    event.preventDefault();

    console.log("Event ...");

    const form = this.element.querySelector("form") as HTMLFormElement; // tìm kiếm 
    const usernameElement = this.element.querySelector("#username") as HTMLInputElement; 
    const helpId = this.element.querySelector("#UsernameHelpId");

    if (usernameElement) {
      let user: User = new User(usernameElement.value);

      validate(user).then((errors) => {
        if (errors.length > 0) { // kiểm tra khi leng > 0 thì hiển thị lỗi nname > 3 ký tự
          if (helpId) {
            helpId.className = "form-text text-white visible";
          }
        } else {
          form.submit();
        }
      });
    }
  }
}
