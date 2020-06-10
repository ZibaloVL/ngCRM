import { ElementRef } from '@angular/core';

declare  var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export class MaterialService {
  static toast( message: string) {
    M.toast({
      html: message
    });
  }
  static initializeFloatingActionButton( ref: ElementRef ) {
    M.FloatingActionButton.init( ref.nativeElement );
  }
  static updateTextInputs() {
    M.updateTextFields(); // debag error  of text fields
  }
  static initModal( ref ): MaterialService {
    return  M.Modal.init(ref.nativeElement);
  }
}
