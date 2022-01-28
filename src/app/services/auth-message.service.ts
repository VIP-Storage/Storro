import {Injectable} from '@angular/core';
import {IResponse} from "../data/response/response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthMessageService {

  getErrorMessage(response: IResponse) {
    if (!response.success) {
      const responseData: { message: string, status: number } = response.data as unknown as any;

      if (!!responseData) {
        const [scope, message] = responseData.message.split('.');

        return AuthMessageService.getMessage(scope, message);
      }
    }

    return response.errorMessage;
  }

  getMessageDetails(rawResponse: { [key: string]: string }): { scope: string, message: string } {
    const [scope, rawMessage] = rawResponse.message.split('.');

    const message = AuthMessageService.getMessage(scope, rawMessage, rawResponse.email);

    return {message, scope};
  }

  getDataValue<T>(response: IResponse, key: string): T | null {
    if (response.data && response.data.hasOwnProperty(key)) {
      return (response.data as any)[key];
    }

    return null;
  }


  private static getMessage(scope: string, message: string, email: string | null = null) {
    switch (scope) {
      case 'LOGIN':
        return AuthMessageService.getLoginMessage(message);
      case 'REGISTRATION':
        return AuthMessageService.getRegistrationMessage(message, email);
      case 'RESET_PASSWORD':
        return AuthMessageService.getOtherMessage(message);
      default:
        return message;
    }
  }

  private static getLoginMessage(message: string) {
    switch (message) {
      case 'EMAIL_CODE_NOT_VALID':
        return 'This token is invalid';
      case 'EMAIL_VERIFIED':
        return 'Your email has been verified successfully. \nClick the button below to login with your new account!'
      case 'EMAIL_RESENT':
        return 'A password reset email has been sent. \n Please check your inbox.';
      case 'USER_NOT_FOUND':
        return 'User cannot be found with that email address.';
      case 'INVALID_PASSWORD':
        return 'Invalid password.';
      default:
        return message;
    }
  }

  private static getRegistrationMessage(message: string, email: string | null = null) {
    switch (message) {
      case 'USER_ALREADY_EXISTS':
        return 'You already have an account registered with this email address.';
      case 'USER_REGISTERED_SUCCESSFULLY':
        const validEmail = (email ? email : 'your email');
        return `You have successfully created an account. \n A verification email has been sent to ${validEmail}.`;
      default:
        return message;
    }
  }

  private static getOtherMessage(message: string) {
    switch (message) {
      case 'EMAIL_SENT_RECENTLY':
        return 'A password reset email has recently been sent already.';
      case 'PASSWORD_CHANGED':
        return 'Your password was changed successfully';
      default:
        return message;
    }
  }


}
