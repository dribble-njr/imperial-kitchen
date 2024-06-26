import DB from '../dao';

export abstract class BaseService {
  protected db: DB;

  constructor() {
    this.db = DB.createInstance();
  }
}
