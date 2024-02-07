import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dt = moment().format('llll')
x= 20;
  @ViewChild('content', { static: false }) content: ElementRef | undefined;
  generatePDF() {
    const content = [
      { alignment: 'center',
      image: 'data:image/png;base64,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',width: 200},
      { text: 'Collection at MRF as of '+this.dt.toString(), style: 'header' }, // Header
      { text: 'Waste collection' }, // Add space
      { text: 'Total waste ='+this.total+'kg' }, // Add space
      {text: '\n'},// Add space

      // Table
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            ['Name', 'Weight'], // Table header
            ...this.wList.map((item: { name: any; totalAmount: any; }) => [item.name, item.totalAmount+'kg']), // Dynamic data
          ],
          style: 'tableStyle',
        },
        layout: 'full', // Add table borders
      },
      {text: '\n'},// Add space
      {text: '\n'},// Add space
      // { text: 'Collection at MRF as of '+this.dt.toString(), style: 'header' }, // Header
      { text: 'Bale' }, // Add space
      { text: 'Total bale = '+this.baletotal+'kg' },
      {text: '\n'},// Add space

      // Table
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*','*', '*', '*',],
          body: [
            ['Name', 'Weight','Number of bale','Material','date'], // Table header
            ...this.bale.map((item: { responsible: any; quantity: string; bales: any; material: any; date: string | any[]; }) => [item.responsible, item.quantity+'kg',item.bales,item.material,item.date.slice(0.9)]), // Dynamic data
          ],
          style: 'tableStyle',
        },
        layout: 'full', // Add table borders
      },
    ];

    const docDefinition = {
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginTop: 25
        },
        tableStyle: {
          margin: [0, 5, 0, 15], // [left, top, right, bottom]
          fontSize: 10,
          fillColor: '#f2f2f2',
          alignment: 'center',
          border: '1px solid #000'
        },
        // imagestyle: {
        //   width: '150px'
        // }
      },
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    /* encode the created pdf */
    pdfDocGenerator.getBase64((encodedString: string) => {
      // Convert the base64 encoded string to a Uint8Array
      const uint8Array = this.base64ToUint8Array(encodedString);

      // Check if the conversion was successful
      if (uint8Array) {
        this.onSubmit(encodedString); // Pass the Uint8Array to your onSubmit function
      } else {
        // Handle the error, e.g., show an error message to the user
        console.error('Error converting base64 to Uint8Array');
      }
    });
  /*----------------------------------------*/
    console.log(pdfDocGenerator)
    this.pdfdoc = pdfDocGenerator;
pdfDocGenerator.download(this.dt.toString());
// const pdfBase64 = btoa(pdfDocGenerator);
// console.log(pdfBase64)
// pdfDocGenerator.getBase64((dataUri: any)=>{
//   console.log(dataUri)
//   const htmlMessage = `
//   <p>Dear recipient,</p>
//   <p>Please find the PDF document attached below:</p>
//   <a href= "${`data:application/pdf;base64,`+dataUri}" download="MRF-doc.pdf">Download PDF</a>
// `;
// })
}
  constructor(private http: HttpClient, private modalService: ModalService) {

   }
  //  binaryPdf:any;
   pdfdoc:any;
  wList: any;
  today = new Date();
  total=0;
  bale:any;
baletotal=0;
  ngOnInit(): void {
    this.http.get(`${Urls.BALE}`).subscribe((res=>{
      console.log(res)
      this.bale =res;
      this.bale.forEach((element: any) => {
        this.baletotal = this.baletotal+Number(element.quantity);
      });
    }))
    this.http.get(`${Urls.AGGR}`).subscribe((res: any) => {
      this.wList = res;
      console.log(res,this.today)
//       this.wList.forEach((element: any) => {
//         this.http.delete(`${Urls.AGGR}/${element.id}`).subscribe((res=>{
//           console.log(res)
//         }))
// });
     this.calcTotal()
    })
  }
  calcTotal(){
    this.wList.forEach((element: any) => {
      console.log(element)
      this.total = this.total+element.totalAmount
    });
  }

  duration(t: any) {
    console.log(t)
  }
  openModal() {
    // this.modalService.openModalH();
    const dialogRef = this.modalService.openModalH();

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload()
    });
  }

  onSubmit(pdfData: any) {
    console.log(pdfData, typeof(pdfData), typeof[pdfData])
  //   const attachments = [
  //     {
  //         filename: 'attachment.pdf',
  //         type: 'application/pdf',
  //         content: this.binaryPdf
  //     }
  // ];
    // const textPayload = JSON.stringify(this.pdfdoc);
// console.log("this is message" +message)
// console.log("THis is payload" +textPayload)
    this.http.post(`${Urls.SendEmail}`, { from: 'nripen@baeru.in', to: 'nchakrawarty@gmail.com,nripen@tip.agency', subject: 'Daily production from MRF', text: 'Hi, this is a generated mail from MRF center, it contains details of collection, please find attachment.In case of any misleading or wrong data, please contact support. Thank you. PFA',attachments:[pdfData,this.dt.toString() ] }).subscribe((res => {
      console.log(res)
      this.http.post(`${Urls.Emailsave}`, { from: 'nripen@baeru.in', to: 'nchakrawarty@gmail.com,nripen@tip.agency', subject: 'Daily production from MRF', text: JSON.stringify(res) }).subscribe((res => {
        console.log('saved', res)
        alert("Data saved and Mail sent")
        window.location.reload()
      }))
    }))
  }

  // Helper function to convert base64 to Uint8Array
  base64ToUint8Array(base64: string): Uint8Array | null {
    try {
      if (typeof atob !== 'undefined') {
        const binaryString = window.atob(base64);
        const length = binaryString.length;
        const uint8Array = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }

        return uint8Array;
      } else {
        console.error('window.atob is not available.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding base64:', error);
      return null; // Return null or handle the error as needed
    }
  }
}


