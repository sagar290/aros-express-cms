import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@app/shared/components/confirm-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface config {
  accept: string,
  type: string
}

interface info {
  url: string,
  limit: number
}

interface classConfig {
  full_width: boolean
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() info: info
  @Input() config: config
  @Input() class: classConfig
  @Output() onFileUploaded: EventEmitter<any> = new EventEmitter();
  fileByteArray: any = []
  fileName
  fileSize

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  get confirm(): Observable<any> {
    const message = `<span>Name: ${this.fileName}</span><br><span>Size: ${(this.fileSize / 1000).toFixed(1)}kb</span>`;
    const dialogData = new ConfirmDialogModel('Confirm upload!', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { minWidth: '300px', maxWidth: '500px', data: dialogData });
    return dialogRef.afterClosed()
  }

  processFileForS3(event) {
    let files = event.target.files
    if (files) {
      let file = files[0]

      if (file.size < this.info.limit) {
        let file_name = file['name']
        this.fileName = file['name']
        this.fileSize = file['size']
        let file_type = file['type']
        if (file_name && file_type) {
          let file_names = file_name.split('.')
          let file_extension = file_names[file_names.length - 1]
          if (file_extension) {
            this.confirm.subscribe(isTrue => {
              if (isTrue) {
                this.getS3SignedLink(file, file_extension, file_type)
              }
            })
          }
        }
      } else {
        this.snackBar.open(`File size: ${(file.size / 1000).toFixed(1)}kb but Limit: 250kb`, 'close', {
          duration: 7000
        })
      }
    }
  }

  getS3SignedLink(file, extension, type) {
    let timeString = new Date().toISOString()
    this.api.postS3SignedLink(timeString, extension, type, `crm/${this.config.type}/`).subscribe(
      (response: any) => {
        const signedLink = response[0].signedLink
        if (signedLink) {
          this.convertFileToBinary(file, extension, type, timeString, signedLink)
        }
      }
    )
  }

  convertFileToBinary(file, extension, type, timeString, signedLink) {
    let instance = this;
    var reader = new FileReader();
    reader.onload = processFile(file);
    reader.readAsArrayBuffer(file);
    function processFile(theFile) {
      return function (e) {
        var theBytes = e.target.result;
        instance.fileByteArray.push(theBytes);
        for (var i = 0; i < instance.fileByteArray.length; i++) {
          if (instance.fileByteArray[i] && signedLink) {
            instance.uploadFileToS3(instance.fileByteArray[i], extension, type, timeString, signedLink);
          }
        }
      }
    }
  }
  uploadFileToS3(fileByteArray, fileExtension, fileType, timeString, signedLink) {
    this.api.putFileToS3(fileByteArray, signedLink, fileType).subscribe(
      (response: any) => {
        this.forwardFileInfo(`https://lms10.s3.ap-southeast-1.amazonaws.com/crm/${this.config.type}/${timeString}.${fileExtension}`)
      }
    )
  }

  forwardFileInfo(url) {
    this.info.url = url
    this.onFileUploaded.emit(url)
  }

}
