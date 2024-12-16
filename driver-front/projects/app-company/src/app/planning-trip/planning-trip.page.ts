import { Component, OnInit } from '@angular/core';
import { PlanningTrip } from '../models/PlannigTrip';
import { PlanningService } from '../service/planning.service';
import { TypeEnum, Type2LabelMapping } from '../models/TypeTrip.enum';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Plugins,FilesystemDirectory } from '@capacitor/core'
const { Filesystem} = Plugins;
import { from } from 'rxjs';

const { prototype } = Plugins;
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-planning-trip',
  templateUrl: './planning-trip.page.html',
  styleUrls: ['./planning-trip.page.scss'],
})
export class PlanningTripPage implements OnInit {

  myDate: String = new Date().toISOString();
  myDate1: String = new Date().toISOString();
  tripPlan: PlanningTrip = new PlanningTrip();
  public Type2LabelMapping = Type2LabelMapping;
  public types = Object.values(TypeEnum);
  private Hidden: boolean = true;
  tripList: PlanningTrip[] = [];
  tripList1: PlanningTrip[] = [];
  pdfObj = null;
  logoData = null;
  id: number;
  companyId = 1 ;
  pj = null;


  constructor(private servicePlan: PlanningService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private http: HttpClient,
    private fileOpener: FileOpener,
    private emailComposer: EmailComposer,
    private plt: Platform) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.GetAlltrips();
    this.loadLocalAssetToBase64();
  }



  GetAlltrips() {
    this.servicePlan.getListPlanTrip(this.companyId).subscribe(reponse => {
      console.log(reponse);
      this.tripList = reponse;
    });
  }
 
  /*
    showAndHide(){
      if(this.Hidden === true){
        this.Hidden = false;
        document.getElementById("ShowHide").hidden = false;
      }else if(this.Hidden === false){
        this.Hidden = true;
        document.getElementById("ShowHide").hidden = true;
      }
    }
    */

  OnDelete(trip: PlanningTrip) {
    this.servicePlan.deletePlanTrip(trip.id,this.companyId).subscribe(response => this.GetAlltrips());
  }
  async presentAlertReservationConfirm(trip: PlanningTrip) {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really <strong>want to send this ticket ?15</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.createPdf(trip);
            trip.reservationNB = trip.reservationNB + 1 ;
            this.servicePlan.editPlanTrip(trip.id,trip).subscribe(() => {
              console.log("nb reservation : ",trip.reservationNB);
            });
            
          }
        }
      ]
    });

    await alert.present();
  }

 

  async presentAlertConfirm(trip: PlanningTrip) {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really <strong>want to delete this trip planning</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

            this.OnDelete(trip);


          }
        }
      ]
    });

    await alert.present();
  }

  loadLocalAssetToBase64() {
    this.http.get('./assets/bus.jpg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoData = reader.result;
        }
        reader.readAsDataURL(res);
      });
  }

  createPdf(trip: PlanningTrip) {

    this.servicePlan.getPlanTrip(trip.id, this.companyId).subscribe(response => {
      console.log("the id : ",trip.id);
      this.tripPlan = response;
      
    let logo = { image: this.logoData, width: 50 };
    const docDefinition = {
      watermark: { text: 'Company App', color: 'blue', opacity: 0.2, bold: true },
      content: [
        {
          columns: [
            logo,
            {
              text: "Trip ticket ",
              alignement: 'right',
              style: 'header'
            }
          ]
        },
        { text: "Depart City : " + this.tripPlan.departCity, style: 'sub_header' },
        { text: "Depart date : " + this.tripPlan.departDate, style: 'sub_header' },
        { text: "Depart hour : " + this.tripPlan.departHour, style: 'sub_header' },
        { text: "arrival City : " + this.tripPlan.arrivalCity, style: 'sub_header' },
        { text: "arrival date : " + this.tripPlan.arrivalDate, style: 'sub_header' },
        { text: "arrival hour : " + this.tripPlan.arrivalHour, style: 'sub_header' },
        { text: "trip type : " + this.tripPlan.type, style: 'sub_header' },
        { text: "trip price : " + this.tripPlan.tripPrice + " €", style: 'sub_header' },

      ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          //alignment: 'right'
          margin: [0, 15, 0, 0]
        },
        sub_header: {
          fontSize: 14,
          //alignment: 'right'
          margin: [0, 15, 0, 0]
        }
      },
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.sendPdf(); 
  })
  }

  sendPdf(){
    if (this.plt.is('capacitor')){
      this.pdfObj.getBase64(async (data) => {
        try {
          let path = `pdf/ticket_${Date.now()}.pdf`;

          const result = await Filesystem.writeFile({
            path,
            data,
            directory: FilesystemDirectory.Documents,
            recursive:true
          });
         // this.fileOpener.open(`${result.uri}`,'application/pdf');
         let email = {
          to : 'amiine.selmii@gmail.com',
          attachments: [
            `${result.uri}`,'application/pdf'
           
          ],
          subject: 'Your Ticket is here',
          body: 'have a nice trip'
        };
        this.emailComposer.open(email);

        }catch (e) {
          console.error('enable to write file',e)
        }
        
          });

    }else {
      this.pdfObj.download();
    }

  }
  

}
