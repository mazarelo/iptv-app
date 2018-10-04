import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DownloadProvider {
  constructor(
    private transfer: FileTransfer, 
    private file: File,
  ) { }

  download(url) {
    return new Observable((observer) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let fileName = url.split('/');
      fileName = fileName[fileName.length - 1];
      console.log('DOWNLOAD START', fileName, url);

      fileTransfer.download(url, this.file.dataDirectory + fileName, true).then((entry) => {
        console.log('download complete: ' + entry.toURL());        
        observer.next(entry);
      },                                                                        (error) => {
        // handle error
        console.log('Error Download file');
        observer.next(false);
      });
    });
  }
}
