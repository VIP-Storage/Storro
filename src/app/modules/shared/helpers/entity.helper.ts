import {Account} from "../../../data/types/accounts";
import {User} from "../../../data/types";

export class EntityHelper {
  static fullName(entity: Account | User) {
    if (entity.hasOwnProperty('accountHolder')) {
      const accountEntity: Account = entity as Account;

      return this.fullNameBuilder(accountEntity.accountHolder.firstName, accountEntity.accountHolder.lastName)
    }

    const userEntity: User = entity as User;

    return this.fullNameBuilder(userEntity.firstName, userEntity.lastName);
  }

  static initials(entity: Account | User) {
    const fullName = this.fullName(entity).split(' ');

    return fullName[0].charAt(0) + fullName[1].charAt(0);
  }

  private static fullNameBuilder(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
  }
}
