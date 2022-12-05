import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TicketsService} from "../tickets.service";

/**
 * Component responsible to delete selected tickets.
 */
@Component({
  selector: 'app-delete-selected',
  templateUrl: './delete-selected.component.html',
  styleUrls: ['./delete-selected.component.css']
})
export class DeleteSelectedComponent implements OnInit {

  /** The event emitter to signalize when the status changes. */
  @Output() done = new EventEmitter();

  /**
   * Class constructor
   *
   * @param ticketsService  The service that manages tickets.
   */
  constructor(private ticketsService: TicketsService) { }

  /**
   * Lifecycle hook after the component is initialized.
   *
   * @public
   */
  ngOnInit(): void {
  }

  /**
   * Deletes the selected tickets.
   *
   * @public
   */
  onDelete(){
    this.ticketsService.deleteSelected()
    this.done.emit()
  }
}
