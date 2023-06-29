import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticlesEntity } from '../interfaces/news-response';
import { NewsapiService } from '../services/newsapi.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const APIKEY_WEATHER = environment.apikey_weather;
const URLBASE_WEATHER = environment.urlbase_weather;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  newsList: ArticlesEntity[];
  weatherTemp: any;

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
      .get(`${URLBASE_WEATHER}/weather?q=Dublin&appid=${APIKEY_WEATHER}`)
      .subscribe((results: any) => {
        console.log(results);
        this.weatherTemp = results?.main;
        console.log(this.weatherTemp);
      });
  }
}
