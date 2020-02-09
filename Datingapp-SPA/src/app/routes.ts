
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
export const routes: Routes = [
         { path: '', component: HomeComponent },
         {
           path: '',
           canActivate: [AuthGuard],
           runGuardsAndResolvers:'always',
           children: [
             {
               path: 'member',
               component: MemberListComponent,
               canActivate: [AuthGuard]
             },
             { path: 'messages', component: MessagesComponent },
             { path: 'lists', component: ListsComponent }
           ]
         },
         { path: '**', redirectTo: '', pathMatch: 'full' }
       ];