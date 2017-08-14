import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserChatPage } from './user-chat';
import { ComponentsModule } from "../../components/components.module";

 
@NgModule({
  declarations: [
      UserChatPage
    ],
  imports: [
      IonicPageModule.forChild(UserChatPage),
      ComponentsModule
    ],
  exports: [
      UserChatPage
    ]
})

export class UserChatPageModule{}