import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadableAComponent } from './loadable-a.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadableAComponent],
  bootstrap: [LoadableAComponent],
  exports: [LoadableAComponent]
})
export class LoadableAModule {
}
