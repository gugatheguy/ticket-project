import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TicketsComponent } from './tickets/tickets.component';
import {AppRoutingModule} from "./app-routing.module";
import { BoardComponent } from './tickets/board/board.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { EditTicketComponent } from './tickets/edit-ticket/edit-ticket.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BoardColumnComponent } from './tickets/board/board-column/board-column.component';
import { TicketComponent } from './tickets/board/board-column/ticket/ticket.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateUserComponent } from './tickets/create-user/create-user.component';
import { ChangeSelectedStatusComponent } from './tickets/change-selected-status/change-selected-status.component';
import { DeleteSelectedComponent } from './tickets/delete-selected/delete-selected.component';
import { ChangeSelectedUserComponent } from './tickets/change-selected-user/change-selected-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TicketsComponent,
    BoardComponent,
    CreateTicketComponent,
    EditTicketComponent,
    PageNotFoundComponent,
    BoardColumnComponent,
    TicketComponent,
    ChangeSelectedStatusComponent,
    DeleteSelectedComponent,
    ChangeSelectedUserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    CreateUserComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
