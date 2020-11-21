import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  url:string = 'http://localhost/apiteam/';

  constructor(private http:HttpClient) {}
  
  public getTeams(){
    return this.http.get<Team[]>(this.url)
  }

  public addTeam(team:Team){
    const formData = new FormData()
    formData.append("name", team.name)
    formData.append("trophy", team.trophy)
    formData.append("image", team.image)
    return this.http.post(this.url, formData)
  }

  public deleteTeam(id:string){
    return this.http.delete(this.url+'?id='+id)
  }

  public getTeam(id:string){
    return this.http.get<Team>(this.url+'?id='+id)
  }

  public updateTeam(team:Team){
    return this.http.put(this.url, team)
  }


}
