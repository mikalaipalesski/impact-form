import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeeklyFormUser {
  name: string;
}

const GOOGLE_SHEETS_API_KEY = 'AIzaSyCSfNxOaoHHajIJUujZKbefFr3qtffSsns';
const SPREADSHEET_ID = '1E-Tmv0Wk0cFGDtxkzRFrdAIxGM_Z8I7n8EVYcdrugU8';
const ENCODED_RANGE = 'Sheet1!A:A';

@Injectable({
  providedIn: 'root'
})
export class UsersSheetService {
  /*
   * Keep your Google Sheet URL private by calling your backend endpoint.
   * Backend should fetch from Google Sheet and return normalized JSON.
   */
  private readonly usersApiUrl = '/api/weekly-form/users';
  private readonly sheetRange = 'A:A';

  constructor(private readonly http: HttpClient) {}

  loadUsers(): Observable<WeeklyFormUser[]> {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ENCODED_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
    
    return this.http
      .get<{ values?: string[][] }>(apiUrl)
      .pipe(map((response) => this.mapFirstColumnToUsers(response.values ?? [])));
  }

  private mapFirstColumnToUsers(rows: string[][]): WeeklyFormUser[] {
    return rows
      .map((row) => row[0]?.trim())
      .filter((name): name is string => Boolean(name))
      .map((name) => ({ name }));
  }
}
