import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SquadLeadMemberValue } from './squad-lead-form/squad-lead-form-model';
import { ImpactMember } from '../model/member-model';

@Injectable({
  providedIn: 'root',
})
export class SubmitSLService {
  private readonly http = inject(HttpClient);
  private readonly scriptUrl = environment.gsScriptLink ?? '';

  submitSLFeedback(
    feedbackData: SquadLeadMemberValue[],
    formSender: ImpactMember,
  ): Observable<string> {
    if (!this.scriptUrl) {
      throw new Error('Google Apps Script URL is not configured.');
    }

    const clientDate = new Date().toLocaleString('en-US', {
      timeZoneName: 'short',
    });

    const rows = this.buildRows(feedbackData, formSender);

    // Use 'text/plain' to avoid CORS pre-flight OPTIONS requests which Google Apps Script doesn't handle well
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
      responseType: 'text' as 'json',
    };

    const payload = JSON.stringify({
      formType: 'sl',
      values: rows,
      clientDate,
    });

    return this.http.post<string>(this.scriptUrl, payload, httpOptions);
  }

  private buildRows(
    feedbackData: SquadLeadMemberValue[],
    formSender: ImpactMember,
  ): (string | number)[][] {
    const reporterName = formSender.name ?? 'Unknown';

    return feedbackData.map((entry) => [reporterName, entry.member.name, entry.feedback]);
  }
}
