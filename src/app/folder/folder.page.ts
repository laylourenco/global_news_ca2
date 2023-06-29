import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticlesEntity } from '../interfaces/news-response';
import { NewsapiService } from '../services/newsapi.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const APIKEY_WEATHER = environment.apikey_weather;
const URLBASE_WEATHER = environment.urlbase_weather;

interface WeatherResponse {
  main: {
    temp: number;
  };
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  newsList: ArticlesEntity[];
  weatherTemp: any;
  todayDate = new Date();
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsApiService: NewsapiService,
    public httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTopHeadlines();
    this.loadData();
  }

  getTopHeadlines() {
    this.newsApiService
      .getTopCountryHeadlines('ie', this.folder)
      .pipe(map((res) => res.articles))
      .subscribe((news) => (this.newsList = news));
  }

  loadData() {
    this.httpClient
      .get<WeatherResponse>(`${URLBASE_WEATHER}/weather?q=${"Ireland"}&appid=${APIKEY_WEATHER}`)
      .subscribe(results => {
        console.log(results);
        this.weatherTemp = results['main']
        this.cityName = results['name']
        console.log(this.weatherTemp);
        this.weatherDetails = results['weather'][0]
        console.log(this.weatherDetails);
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
      });
  }
}
