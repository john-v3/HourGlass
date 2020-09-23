import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

import { MessageService } from './message.service'
import { ContentContainer } from './contentContainer'

// Injectable marks the class as one that
// participates in the dependency injection system.
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private contentContainerURL = 'http://localhost:5000/content/getAll'  // URL to backend

  constructor(
    private http: HttpClient, // Can now make http requests
    private messageService: MessageService // from hero example
    ) { }


    // Call to MessageService to log a message
    private log(message: string){
      this.messageService.add(`DbService: ${message}`)
    }

    // Get Content
    getContent(): Observable<ContentContainer[]>
    {
      return this.http.get<ContentContainer[]>(this.contentContainerURL)
    }
}
