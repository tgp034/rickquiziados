import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { KnobModule } from 'primeng/knob';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-admin-init',
  standalone: true,
  imports: [InputGroupModule,InputGroupAddonModule,AvatarModule,AvatarGroupModule,InputMaskModule,KnobModule,FormsModule],
  templateUrl: './admin-init.component.html',
  styleUrl: './admin-init.component.scss'
})
export class AdminInitComponent {
  //create a user and pass 
  user: string = '';
  pass: string = '';
  visibleSanta: boolean = false;
  visibleMorty: boolean = false;
  visibleRick: boolean = false;
  constructor() { }
  //function validate pass 
  validatePass(){
    if(this.pass === 'admin' && this.user === 'admin'){
      this.visibleSanta = true;
      //redirect to admin panel
      setTimeout(() => {
        window.location.href = '/adminpanel';
      }, 2000);
    }else{
      this.visibleMorty = true;
      this.visibleRick = true;
      setTimeout(() => {
        this.visibleMorty = false;
      }, 4000);
    }
  }
}
