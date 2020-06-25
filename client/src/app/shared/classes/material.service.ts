import { ElementRef } from '@angular/core';


declare  var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
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
  static initModal( ref: ElementRef ): MaterialInstance {
    return  M.Modal.init(ref.nativeElement);
  }
  static initToltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }
  static initDatepicer(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(
      ref.nativeElement, {
        format: 'dd.mm.yyyy',
        showClearBtn: true,
        onClose
      }
    );
  }
}
