import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  // initialize variables
  entries: any[];
  sortedEntries: any[];
  noOfShares = 1;
  trues = [];
  watchlist = [];
  maxPrice = 500;
  // tslint:disable-next-line: max-line-length
  block1 = { gsx$company: { $t: '' }, gsx$companyid: { $t: '' }, gsx$price: { $t: '' }, gsx$possibleraise1: { $t: 0 }, gsx$possibleraise5: { $t: 0 }, gsx$firstfib: { $t: 0 }, gsx$secondfib: { $t: 0 }, gsx$thirdfib: { $t: 0 }, gsx$fourthfib: { $t: 0 }, gsx$fifthfib: { $t: 0 }, gsx$strengthpercent: { $t: '' }, gsx$gainspercent: { $t: '' }, gsx$volume: { $t: 0 } };
  // tslint:disable-next-line: max-line-length
  block2 = { gsx$company: { $t: '' }, gsx$companyid: { $t: '' }, gsx$price: { $t: '' }, gsx$possibleraise1: { $t: 0 }, gsx$possibleraise5: { $t: 0 }, gsx$firstfib: { $t: 0 }, gsx$secondfib: { $t: 0 }, gsx$thirdfib: { $t: 0 }, gsx$fourthfib: { $t: 0 }, gsx$fifthfib: { $t: 0 }, gsx$strengthpercent: { $t: '' }, gsx$gainspercent: { $t: '' }, gsx$volume: { $t: 0 }  };
  // tslint:disable-next-line: max-line-length
  block3 = { gsx$company: { $t: '' }, gsx$companyid: { $t: '' }, gsx$price: { $t: '' }, gsx$possibleraise1: { $t: 0 }, gsx$possibleraise5: { $t: 0 }, gsx$firstfib: { $t: 0 }, gsx$secondfib: { $t: 0 }, gsx$thirdfib: { $t: 0 }, gsx$fourthfib: { $t: 0 }, gsx$fifthfib: { $t: 0 }, gsx$strengthpercent: { $t: '' }, gsx$gainspercent: { $t: '' }, gsx$volume: { $t: 0 }  };
  // tslint:disable-next-line: max-line-length
  block4 = { gsx$company: { $t: '' }, gsx$companyid: { $t: '' }, gsx$price: { $t: '' }, gsx$possibleraise1: { $t: 0 }, gsx$possibleraise5: { $t: 0 }, gsx$firstfib: { $t: 0 }, gsx$secondfib: { $t: 0 }, gsx$thirdfib: { $t: 0 }, gsx$fourthfib: { $t: 0 }, gsx$fifthfib: { $t: 0 }, gsx$strengthpercent: { $t: '' }, gsx$gainspercent: { $t: '' }, gsx$volume: { $t: 0 }  };
  // tslint:disable-next-line: max-line-length
  block5 = { gsx$company: { $t: '' }, gsx$companyid: { $t: '' }, gsx$price: { $t: '' }, gsx$possibleraise1: { $t: 0 }, gsx$possibleraise5: { $t: 0 }, gsx$firstfib: { $t: 0 }, gsx$secondfib: { $t: 0 }, gsx$thirdfib: { $t: 0 }, gsx$fourthfib: { $t: 0 }, gsx$fifthfib: { $t: 0 }, gsx$strengthpercent: { $t: '' }, gsx$gainspercent: { $t: '' }, gsx$volume: { $t: 0 }  };

  finalresult: any = [];
  url: any = 'https://spreadsheets.google.com/feeds/list/19uzbY-l1vZHbjtbHE41j4i5nbWKtpf0N3kZbCA58URU/od6/public/values?alt=json';
  maUrl: any = 'https://spreadsheets.google.com/feeds/list/1L-6_aZ5U66NR-yxzCs8KIc1Dg0OUB7yYfK9cLunpSa8/od6/public/values?alt=json';
  private updateSubscription: Subscription;
  constructor(private httpclient: HttpClient) {
    this.httpclient = httpclient;
    this.getMAData(this.maxPrice);
  }

  // refresh data for every 30 seconds
  ngOnInit() {
    this.updateSubscription = interval(30000).subscribe(
      (val) => {
        this.getMAData(this.maxPrice);
      });
  }


  getMAData(maxPrice: number) {
      this.httpclient.get(this.maUrl).subscribe(
      (result: any) => {
        this.finalresult = result;
        this.trues = this.finalresult.feed.entry.filter(k => {
          return k.gsx$status.$t === 'TRUE' && k.gsx$volume.$t > 10000000;
        });

        this.sortedEntries = this.sortDataByGains(); // sorting
        console.log(this.sortedEntries);

        this.watchlist = this.sortedEntries.slice(5, 15);
        this.entries = this.sortedEntries.slice(0, 5); // take only top 5 records

        this.block1 = this.entries[0];
        this.block2 = this.entries[1];
        this.block3 = this.entries[2];
        this.block4 = this.entries[3];
        this.block5 = this.entries[4];

      });
  }

  sortData() {
    return this.trues.sort((a, b) => {
      return (b.gsx$strengthpercent.$t - a.gsx$strengthpercent.$t);
    });
  }

  sortDataByGains() {
    return this.trues.sort((a, b) => {
      return (b.gsx$gainspercent.$t - a.gsx$gainspercent.$t);
    });
  }

}





