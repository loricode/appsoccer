//para crear un servicio escribimos ionic generate service api/equipo
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TeamService } from '../api/team.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  bandera = false
  team:Team = {name:'', trophy:'', image:''}
  ListTeam:Team[]

  constructor(private teamService:TeamService,
              public toastController: ToastController){
     this.loadTeam(); 
  }

  public openAndCloseModal():void{ this.bandera = !this.bandera }

  public loadTeam():void{
    this.teamService.getTeams().subscribe(
      (response) => { 
        this.ListTeam = response
       },
      (error) => { console.log(error) })
  }

  public save():void{
    this.teamService.addTeam(this.team).subscribe(
      (response) => { 
         this.presentToast(response)
         this.clearInput()
         this.loadTeam()
       },
      (error) => { console.log(error) })    
   }
   
   public delete():void{ }

   public getTeam():void{ }

   public clearInput():void{
     this.team.name = '';
     this.team.trophy = '';
     this.team.image = '';
   }

   async presentToast(message) {
    const toast = await this.toastController.create({
      message:message.msg ,
      duration: 2000,
      color:"primary"
    });
    toast.present();
   }

}
