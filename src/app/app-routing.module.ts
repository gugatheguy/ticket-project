import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {BoardComponent} from "./tickets/board/board.component";
import {CreateTicketComponent} from "./tickets/create-ticket/create-ticket.component";
import {EditTicketComponent} from "./tickets/edit-ticket/edit-ticket.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const approutes: Routes = [
   {path: '', redirectTo: "/board", pathMatch: "full"},
   {path: 'board', component: BoardComponent},
   {path: 'ticket/create', component: CreateTicketComponent},
   {path: 'ticket/:id', component: EditTicketComponent},
   {path: '**', pathMatch:"full", component:PageNotFoundComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(approutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
