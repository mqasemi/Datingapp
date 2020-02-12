import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class PreventUnsavedChange implements CanDeactivate<MemberEditComponent>{

    canDeactivate(component:MemberEditComponent){
        if( component.editForm.dirty){
           return confirm(' are you sure continue ? any unsaved change will be lost');
        }
        return true;
    }
}