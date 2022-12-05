
/**
 * Class responsible to the ticket module.
 */
export class Ticket{

  /**
   * Class constructor
   *
   * @param id            The ticket's id.
   * @param title         The ticket's title.
   * @param description   The ticket's description.
   * @param user          The id from the ticket's user.
   * @param status        The ticket's status.
   * @param creationDate  The ticket's creation date.
   * @param editDate      The ticket's edit date.
   */
  constructor(public id: number,
              public title: string,
              public description: string,
              public user: number,
              public status: string,
              public creationDate: Date,
              public editDate: Date){}
}
