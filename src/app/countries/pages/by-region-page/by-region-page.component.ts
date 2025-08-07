import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type'
import { CountriesService } from '../../services/countries.service';



@Component({
  selector: 'app-by-region-page',
  standalone: false,
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public countries:Country[]=[];
  public regions:Region[]=['Africa','Americas','Asia','Europe','Oceania'];
  public isLoading:boolean = false;
  public selectedRegion?:Region;
  
  constructor(
    private countriesService:CountriesService
  ){}

  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion=this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region:Region){
    this.isLoading = true;
    this.selectedRegion=region;
    this.countriesService.searchRegion(region)
    .subscribe(country=>{
      this.countries=country;
      this.isLoading = false;
    })
  }
}
