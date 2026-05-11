import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeeklyFormValue } from '../model/weekly-form-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubmitWeeklyService {
  private readonly http = inject(HttpClient);
  private readonly scriptUrl = environment.googleAppsScriptUrl ?? '';

  submitWeekly(weeklyFormValue: WeeklyFormValue): Observable<string> {
    if (!this.scriptUrl) {
      throw new Error('Google Apps Script URL is not configured.');
    }

    const clientDate = new Date().toLocaleString('en-US', {
      timeZoneName: 'short',
    });

    const rows = this.buildRows(weeklyFormValue);

    // FIX: Completely omit 'Content-Type' or set it to 'text/plain'.
    // Do NOT use 'application/json' as it triggers the CORS pre-flight OPTIONS request.
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain;charset=utf-8',
      }),
      responseType: 'text' as 'json', // This tells Angular not to try and parse the response as JSON
    };

    // We MUST stringify the data ourselves because we are lying and saying it's text/plain
    const payload = JSON.stringify({ values: rows, clientDate });

    return this.http.post<string>(this.scriptUrl, payload, httpOptions);
  }

  buildRows(weeklyFormValue: WeeklyFormValue): (string | number)[][] {
    return weeklyFormValue.impactMemberValues.map((memberValue) => [
      weeklyFormValue.currentMember?.name || 'Unknown Author',
      memberValue.member.name,
      this.mapTraitValue(memberValue.communication),
      this.mapTraitValue(memberValue.discipline),
      this.mapTraitValue(memberValue.effectiveness),
      this.mapTraitValue(memberValue.integration),
      memberValue.messageComment,
    ]);
  }

  private mapTraitValue(value: boolean | null | undefined): number {
    if (value === true) return 1;
    if (value === false) return -1;
    return 0;
  }
}
