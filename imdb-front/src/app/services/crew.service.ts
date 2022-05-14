import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CrewDTO} from "../interfaces/crewDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getCrewById(id: number): Observable<CrewDTO> {
    return this.http.get(this.baseUrl + '/lock/crew/get/' + `${id}`) as Observable<CrewDTO>;
  }

}
