import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewsResponse } from '../interfaces/news-response';

@Injectable({
  providedIn: 'root',
})
export class NewsapiService {
  topHeadlinesPath = environment.baseURL;
  weatherPath = environment.urlbase_weather;

  constructor(private http: HttpClient) {}

  getTopCountryHeadlines(
    country: string,
    category: string
  ): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(
      this.topHeadlinesPath +
        `?country=${country}&category=${category}&pageSize=10&apiKey=${environment.apiKey}`
    );
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `${this.weatherPath}/weather?q=${encodeURIComponent(
        city
      )}&appid=${environment.apikey_weather}`
    );
  }
}
