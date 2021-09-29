import { Component } from '@angular/core';
import { Marketplace } from './model/marketplace';
import { RestApiService } from './shared/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pvu-tool';

  Marketplace: Array<Marketplace> = [];

  originalRate: number = 550;

  tax: number = 550;

  page:number = 1;
  globalFilter: string = 'price';

  constructor(
    public restApi: RestApiService
  ) { 
  }

  ngOnInit() {
    this.loadEmployees()
  }

  OnInput(taxInput:any)
  {
    this.tax = taxInput;

    this.loadEmployees();
  }

  SumRate()
  {
    this.tax = this.tax + this.tax*0.1;
    this.loadEmployees();
  }

  Reset()
  {
    this.tax = this.originalRate;

    this.loadEmployees();
  }

  loadMore()
  {
    this.page += 1;

    this.loadEmployees(this.page);
  }

  loadEmployees(cPage:number=1) {

    return this.restApi.getEmployees(this.tax, cPage).subscribe((data: Array<Marketplace>) => {

      data.forEach(element => {
        this.Marketplace.push(element);        
      });

      this.setFilter(this.globalFilter);
    })    
  }

  setFilter(filter:string){
    
    this.globalFilter = filter;

    if(this.globalFilter == "price")
      this.Marketplace.sort((x, y) => (x.Price < y.Price ? -1:1));
    if(this.globalFilter == "nftroi")
      this.Marketplace.sort((x, y) => (x.NFTSellROI < y.NFTSellROI ? -1:1));
    if(this.globalFilter == "withdrawroi")
      this.Marketplace.sort((x, y) => (x.WithdrawROI < y.WithdrawROI ? -1:1));
    if(this.globalFilter == "leperhour")
      this.Marketplace.sort((x, y) => (x.AverageHour < y.AverageHour ? -1:1));
  }

}
