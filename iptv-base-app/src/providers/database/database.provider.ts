import { Injectable, EventEmitter } from '@angular/core';
// tslint:disable-next-line
import PouchDB from 'pouchdb';

@Injectable()
export class DatabaseProvider {

  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();
 
  public constructor() {
    this.initDb();
  }

  public initDb() {
    if (!this.isInstantiated) {
      this.database = new PouchDB('channels');
      this.isInstantiated = true;
    }
  }
 
  public fetch() {
    return this.database.allDocs({ include_docs: true });
  }
 
  public get(id: string) { 
    return this.database.get(id);
  }
 
  public put(id: string, document: any) { 
    document._id = id;
    return this.get(id).then((result) => {
      document._rev = result._rev;
      return this.database.put(document);
    },                       (error) => {
      if (error.status === '404') {
        return this.database.put(document);
      } 

      return new Promise((resolve, reject) => {
        reject(error);
      });
    });
  }
 
  public sync(remote: string) { 
    const remoteDatabase = new PouchDB(remote);
    this.database.sync(remoteDatabase, {
      live: true,
    }).on('change', (change) => {
      this.listener.emit(change);
    });
  }
 
  public getChangeListener() {
    return this.listener;
  }
}
