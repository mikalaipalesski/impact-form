import { inject, Pipe, PipeTransform } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { MemberValueFormControls } from "../../model/weekly-form-model";

@Pipe({
  name: "formErrorMessage",
  standalone: true,
  pure: false,
})
export class FormErrorPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(form: FormGroup<MemberValueFormControls> | null): string | null {
    if (!form) {
      return null;
    }

    const error = form.errors?.["formIncomplete"];
    return typeof error === "string" ? (this.translate.instant(error) as string) : null;
  }
}
