import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-evacuation-center',
  imports: [CommonModule, FormsModule],
  templateUrl: './evacuation-center.html',
  styleUrl: './evacuation-center.css',
})
export class EvacuationCenter {
  title = signal('Evacuation Center');

  centername = signal('');
  centerbarangay = signal('');
  centercapacity = signal(0);
  centercurrentPopulation = signal(0);
  centerstatus = signal('');

  center: any[] = [];

  constructor(private firestore: Firestore) {
    const centerCollection = collection(this.firestore, 'evacuation_centers');
    collectionData(centerCollection, { idField: 'id' }).subscribe(data => {
      this.center = data;
    });
  }

  addcenter(){
    const name = this.centername();
    const barangay = this.centerbarangay();
    const capacity = this.centercapacity();
    const population = this.centercurrentPopulation();
    const status = this.centerstatus();

    if (name && barangay && capacity && population && status) {
      const centerCollection = collection(this.firestore, 'evacuation_centers');
      addDoc(centerCollection, { name, barangay, capacity, population, status });
      this.centername.set('');
      this.centerbarangay.set('');
      this.centercapacity.set(0);
      this.centercurrentPopulation.set(0);
      this.centerstatus.set('');
    } else {
      alert('null');
    }
  }

  deletecenter(id: string) {
    const centerDoc = doc(this.firestore, `evacuation_centers/${id}`);
    deleteDoc(centerDoc);
  }

  updatecenter(id: string, newname: string, newbarangay: string, newcapacity: number, newpopulation: number, newstatus: string) {
    const centerDoc = doc(this.firestore, `evacuation_centers/${id}`);
    updateDoc(centerDoc, { name: newname, barangay: newbarangay, capacity: newcapacity, population: newpopulation, status: newstatus});
  }
}
