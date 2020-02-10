
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
export const routes: Routes = [
         { path: '', component: HomeComponent },
         {
           path: '',
           canActivate: [AuthGuard],
           runGuardsAndResolvers:'always',
           children: [
             {
               path: 'member',
               component: MemberListComponent, resolve: { users: MemberListResolver}
             },
             {
              path: 'member/:id',
              component: MemberDetailComponent,
              resolve:{user: MemberDetailResolver}
            },
             { path: 'messages', component: MessagesComponent },
             { path: 'lists', component: ListsComponent }
           ]
         },
         { path: '**', redirectTo: '', pathMatch: 'full' }
       ];
