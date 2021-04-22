import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  constructor(private httpClient:HttpClient) { }

  uploadDocument(formData: FormData):Observable<Document>{
    return this.httpClient.post<Document>("http://localhost:9090/rc-upload",formData);
  }
}
