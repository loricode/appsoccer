//para crear un servicio escribimos ionic generate service api/equipo
import { Component } from '@angular/core';
import {TeamService} from '../api/team.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  ListTeam:Team[]

  constructor(public teamService:TeamService)
   {
     this.LoadTeam();
   }
  
  public LoadTeam():void{
    this.teamService.getTeams().subscribe(
      (response) => { 
        this.ListTeam = response
       },
      (error) => {
        console.log(error);
      }
    )
    
  }
}
