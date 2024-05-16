import DB from '../dao';

export class BaseService {
  protected db: DB;

  constructor() {
    this.db = DB.createInstance();
  }
}
