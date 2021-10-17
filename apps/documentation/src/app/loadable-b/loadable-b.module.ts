import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadableBComponent } from './loadable-b.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadableBComponent],
  bootstrap: [LoadableBComponent],
  exports: [LoadableBComponent]
})
export class LoadableBModule {
}
