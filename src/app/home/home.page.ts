//para crear un servicio escribimos ionic generate service api/equipo
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TeamService } from '../api/team.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  id = ''
  bandera = false
  team:Team = {name:'', trophy:'', image:''}
  ListTeam:Team[]

  constructor(private teamService:TeamService,
              public toastController: ToastController,
              public alertController: AlertController){
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
   
  public delete():void{
    this.teamService.deleteTeam(this.id).subscribe(
      (response) => { 
         this.presentToast(response)
         this.loadTeam()
       },
      (error) => { console.log(error) })
  }

   public getId(id:string):void{
     this.id = id
     this.presentAlertConfirm()
   }

   public getTeam():void{ }

   public clearInput():void{
     this.team.name = '';
     this.team.trophy = '';
     this.team.image = '';
   }

   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Desea Eliminar</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            return false;
          }
        }, {
          text: 'Okay',
          handler: () => {
           this.delete()
          }
        }
      ]
    });

    await alert.present();
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
