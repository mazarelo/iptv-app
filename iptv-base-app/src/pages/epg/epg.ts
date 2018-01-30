

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EpgProvider } from '../../providers/epg/epg';

@Component({
  selector: 'page-epg',
  templateUrl: 'epg.html'
})
export class EpgModalPage implements OnInit {
  private item
  public epgData
  private current = new Date().getTime()

  constructor(
    private epgProvider: EpgProvider,
    private navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.item = this.navParams.get('item')
  }
  
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  isNumber(val) { 
    return typeof val === 'number'; 
  }

  convertToPercentage(number){
    return number.toString() + '%'
  }

  ngOnInit(){
    this.epgProvider.getChannelEPG(this.item.id, this.item.groupName).subscribe( data => {
      console.log('CHANNEL EPG:', data)
      let response: any = data;
      response.sort( el=>{
        return new Date(el._start).getTime()
      })
      response.forEach(el=>{
        el.current = false
        el.status = this.getCurrentEPGTimeBar(el)
        if(typeof el.status == 'number'){
          el.current = true
        }
      })
      
      this.epgData = data
    })
  }

  getCurrentEPGTimeBar(programme){
      let stop = new Date(programme._stop).getTime()
      let start = new Date(programme._start).getTime()

      let output = Math.floor(( (this.current - start) * 100 / (stop - start) ))
      
      if(output >= 100){
        return 'ENDED'
      }else if(output < 0){        
        return 'UP COMMING'
      }else{
        return output
      }
  }
 
  ionViewWillLeave(){
  }
  
  ionViewDidLoad(){
  }

}



