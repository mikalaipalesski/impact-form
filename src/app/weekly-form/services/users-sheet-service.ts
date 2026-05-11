import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImpactMember } from '../model/weekly-stepper-model';
import { environment } from '../../../environments/environment';

const ENCODED_RANGE = 'Sheet1!A:B';

@Injectable({
  providedIn: 'root',
})
export class UsersSheetService {
  /*
   * Keep your Google Sheet URL private by calling your backend endpoint.
   * Backend should fetch from Google Sheet and return normalized JSON.
   */
  private readonly http = inject(HttpClient);
  private readonly usersApiUrl = '/api/weekly-form/users';
  private readonly sheetRange = 'A:A';

  loadUsers(): Observable<ImpactMember[]> {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${environment.spreadsheetId}/values/${ENCODED_RANGE}?key=${environment.googleSheetsApiKey}`;

    return this.http
      .get<{ values?: string[][] }>(apiUrl)
      .pipe(map((response) => this.mapFirstColumnToUsers(response.values ?? [])));
  }

  private mapFirstColumnToUsers(rows: string[][]): ImpactMember[] {
    return rows
      .map((row) => ({ name: row[0]?.trim() || '', rank: row[1]?.trim() || '' }))
      .filter((user) => Boolean(user.name));
  }
}
