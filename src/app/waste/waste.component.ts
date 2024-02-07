import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})
export class WasteComponent implements OnInit {
  tableData: any[] = [
    { date: '2023-05-23', time: '09:00 AM', panchayat: 'Sample Panchayat', vehicleNumber: 'ABC123', bagNumber: '001', weightCenter: '50 kg', weightMRF: '48 kg' },
    { date: '2023-05-23', time: '10:30 AM', panchayat: 'Another Panchayat', vehicleNumber: 'XYZ789', bagNumber: '002', weightCenter: '45 kg', weightMRF: '42 kg' },
    // Add more objects for additional rows
  ];
  constructor(private http: HttpClient, private modalService: ModalService) { }
  bags: any;
  taluk: any;
  panchayatList: any;
  selectedValue: string | undefined;
  panchayat: any;

  ngOnInit(): void {
    console.log(this.tableData)
    this.http.get(`${Urls.TALUK}`).subscribe((res: any) => {
      this.taluk = res;
      console.log(this.taluk)
      // this.distfunct(this.taluk[0]);
    })
    this.callBags();
  }
  openModal(d: any) {
    this.modalService.openModal(d);
  }
  distfunct(e: { id: string; }) {
    this.bags = null;
    console.log(e)
    this.panchayatList = [];
    this.selectedValue = e.id;
    this.http.get(`${Urls.TALUK}/${e.id}/panchayats`).subscribe((res: any) => {
      console.log(res)
      this.panchayat = res;
      // this.callcenter(this.panchayat[0])
    })
  }

  callcenter(e: any) {
    console.log(e)
    this.http.get(`${Urls.PANCH}/${e.id}/bagsFromPanchayats`).subscribe((res: any) => {
      this.bags = res;
      this.bags.forEach((bag: { weightAtMRF: any; bagNumber: any }) => {
        console.log(bag.weightAtMRF, bag.bagNumber)
      });
      console.log(res)
    })
  }
  callBags(){
    this.http.get(`${Urls.BAGS}`).subscribe((res: any) => {
      this.bags = res;
      this.bags.forEach((bag: { weightAtMRF: any; bagNumber: any }) => {
        console.log(bag.weightAtMRF, bag.bagNumber)
      });
      console.log(res)
    })
  }
  openAddBag(){
    console.log("openbag")
    this.modalService.openModalB()
  }
}
