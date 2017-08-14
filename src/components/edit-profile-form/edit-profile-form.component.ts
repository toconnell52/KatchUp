import { Component, OnDestroy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from "firebase/app";
import { Camera, CameraOptions } from "@ionic-native/camera";


@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnDestroy, OnInit {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profilePic: string;
  @Output() saveProfileResult: EventEmitter<Boolean>;
  @Input() profile: Profile;
 
  constructor(private data: DataService, private auth: AuthService, private camera: Camera) {
    this.saveProfileResult = new EventEmitter<Boolean>();

    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
        this.authenticatedUser = user;
    });
  }

  async saveProfile() {
    
    if (this.authenticatedUser){
      this.profile.avatar = this.getProfilePicture();
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
    
  }

  getProfilePicture(): string {

    var options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
	  correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      var image = <HTMLImageElement>document.getElementById('myImage');
      image.src = imageData
      this.profilePic = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.error(err);
    });

    return this.profilePic;
  }

  ngOnInit(): void {
    if (!this.profile) {
      this.profile = {} as Profile;
      this.profile.avatar = "assets/img/profile-placeholder.png";
    }
  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

}
