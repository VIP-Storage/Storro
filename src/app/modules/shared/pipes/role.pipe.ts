import {Pipe, PipeTransform} from '@angular/core';
import {Role} from "../../../data/enums";

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: Role): string {
    switch (value) {
      case Role.SiteOwner:
        return 'Site Owner';
      case Role.StaffMember:
        return 'Staff Member';
      default:
        return value;
    }
  }

}
