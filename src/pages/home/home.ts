import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  public url = "../../assets/slider.json";
  public sliders: Array<any>;
  public controls: any; 

  private observer: any;
  constructor(public navCtrl: NavController, private http: HttpClient) {
    
  }

  public makeRequest(url: string) {
    return this.http.get(url);
  }

  ngOnInit() {
    this.slides.pager = true;
    this.observer = this.makeRequest(this.url).subscribe(
      data => { 
      this.controls = data["slider"].controls;
      this.sliders = data["slider"].urls;
      this.setUpSlider();
    },
      error => console.log(error)
    );
  }
  setUpSlider() {
    this.slides.paginationClickable = true;
    this.slides.autoplay = this.controls.transitionDelay;
    this.slides.effect = this.controls.effect;
    this.slides.loop = this.controls.loop;
    this.slides.speed = this.controls.speed;
  }
  slideLeft() {
    this.slides.slidePrev(this.controls.speed);
  }
  slideRight() {
    this.slides.slideNext(this.controls.speed);
  }
  ngDestroy() {
    if (this.observer) {
      this.observer.unsubscribe();
    }
  }
}
