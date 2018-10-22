import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Code } from './code';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
// import { catchError, map, tap } from 'rxjs/operators';
import { Client } from 'elasticsearch-browser';
import {IndexDocumentParams, SearchParams, SearchResponse} from 'elasticsearch';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
      if (!this.esClient) {
          this.connect();
      }
  }
    private esClient: Client;

  // TODO:: config this based on env
  private esBase = 'https://search-tesseract-nebula-qr6ds2kuloefbk63ne3miucjo4.us-west-2.es.amazonaws.com';
  // 'https://search-tesseract-nebula-qr6ds2kuloefbk63ne3miucjo4.us-west-2.es.amazonaws.com';
  private codesUrl = this.esBase + '/adam-sandbox/code';
  private search_endpoint = '/_search';
  private filter_path = ['hits.hits._source', 'hits.hits._id'];
  private codesIndex = 'adam-sandbox';
  private docType = 'code';

    static processResponse(response: SearchResponse<Code>) {
        return response.hits.hits.map(hit => {
            const code = hit._source;
            code.id = +hit._id;
            return code;
        }).sort((c1, c2) => (+c1.resolved - +c2.resolved) || c2.id - c1.id);
        // Sort first by coercing Booleans to sortable numbers, bubble resolved cases to the bottom,
        // then reverse order by ID
    }


    private connect() {
        this.esClient = new Client({
            host: this.esBase,
            log: 'trace'
        });
    }

    private params(onlyUnresolved: boolean): SearchParams {
        // TODO:: clean up control structure
        if (onlyUnresolved) {
            return {
                index: this.codesIndex,
                filterPath: this.filter_path,
                body: {
                    'query': {
                        'term': {'resolved': false}
                    }
                }
            };
        } else {
            return {
                index: this.codesIndex,
                filterPath: this.filter_path
            };
        }
    }

  getCodes(): Promise<SearchResponse<Code>> {
      this.log('Requesting codes...');
      return this.esClient.search(this.params(false));
  }

  getUnresolvedCodes(): Promise<SearchResponse<Code>> {
    this.log('Requesting unresolved codes...');
      return this.esClient.search(this.params(true));

  }

  getCode(id: number): Observable<Code> {
    const url = `${this.codesUrl}/${id}`;
    return null;
    // return this.http.get<Code>(url).pipe(
    //     tap(_ => this.log(`fetched code id=${id}`),
    //     catchError(this.handleError<Code>(`getCode id=${id}`)))
    // );
  }

  updateCode(code: Code): Promise<any> {
        const codeID = code.id;
        return this.esClient.index({
            index: this.codesIndex,
            type: this.docType,
            id: codeID,
            body: code,
            refresh: 'wait_for'
        });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {

      // TODO:: send the error to remote logging infrastructure
        console.error(error);

        // TODO:: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CodeService: ${message}`);
  }


}
