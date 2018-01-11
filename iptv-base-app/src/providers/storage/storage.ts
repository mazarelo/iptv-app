import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
@Injectable()
export class StorageProvider {

	constructor(
		private nativeStorage: NativeStorage,
		private storage: Storage
	) { }

    public set(name: string, data: object): Promise<any>{
			return this.storage.set(name, JSON.stringify(data))
			/*.then(
           () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
				);
			*/
    }

    public get(name: string){
      return this.storage.get(name)
	}

	public remove(name: string){
		return this.storage.remove(name)
	}

	public listAll(){
		return this.storage.keys()
	}

	public clear(){
		return this.storage.clear()
	}

}