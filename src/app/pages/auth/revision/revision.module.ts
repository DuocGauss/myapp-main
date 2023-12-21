import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisionPageRoutingModule } from './revision-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RevisionPage } from './revision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisionPageRoutingModule,
    SharedModule
  ],
  declarations: [RevisionPage]
})
export class RevisionPageModule {}
