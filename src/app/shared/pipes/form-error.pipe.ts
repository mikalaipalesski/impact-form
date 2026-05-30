import { inject, Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MemberValueFormControls } from '../../weekly-form/model/weekly-form-model';
import { SquadLeadMemberFormControls } from '../../squad-lead-feeback/squad-lead-form/squad-lead-form-model';

@Pipe({
  name: 'formErrorMessage',
  standalone: true,
  pure: false,
})
export class FormErrorPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(form: FormGroup | null): string | null {
    if (!form) {
      return null;
    }

    const error = form.errors?.['formIncomplete'];
    return typeof error === 'string' ? (this.translate.instant(error) as string) : null;
  }
}
