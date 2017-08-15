import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'firebase/app';
import { Profile } from "../../models/profile/profile.interface";
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { LoadingController, Loading } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {

  private authUser: User;
  public userProfile: Profile;
  private loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  ngOnInit(): void {
    this.loader.present();

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = profile;
      this.userProfile.avatar = "assets/img/profile-placeholder";
      this.existingProfile.emit(this.userProfile);
      this.loader.dismiss();
    });
  }

  constructor(private data: DataService, private auth: AuthService, private loading: LoadingController, private imagePicker: ImagePicker) {
    this.loader = this.loading.create({
      content: 'Loading Profile...'
    });

    this.existingProfile = new EventEmitter<Profile>();
  }

  openGallery() {
    const options = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };

      this.imagePicker.getPictures(options).then((image) => {
  
        console.log('Image URI: ' + image);

        this.userProfile.avatar = image;

        this.loader.present();
        this.existingProfile.emit(this.userProfile);
        this.loader.dismiss();
      
      }, (err) => { 
        console.error(err);
      });
  }
    
}


