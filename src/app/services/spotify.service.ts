import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class SpotifyService {
  private clientId: string = '73aa9d0997c34a3498d9b89d9559a6e0';
  private clientSecret: string = '8a62a32938734c8299cbc4fbf51d4499';
  private tokenUrl: string = 'https://accounts.spotify.com/api/token';
  private baseURL: string = 'https://api.spotify.com/v1';

  private accessToken: string = 'BQD1SmXOBV3V785TheOPo-EA2EYnvHuZqkWfWnB26t7wA95_TADmSzlh40kcYt92jvlHNboI7unAspjB_DgGcaZIfsDCpsGBy1h3V_ZmiWSlhw9IYIg';  // Aquí almacenaremos el token

  constructor(private http: HttpClient) {};

  getCanciones (artista: string):Observable <any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    const url = `${this.baseURL}/search?q=${artista}&type=track&limit=10`;
    return this.http.get<any>(url, { headers })
  }

}
