import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-evacuation-center',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './evacuation-center.html',
  styleUrl: './evacuation-center.css',
})

export class EvacuationCenter {
title = signal('Evacuation Center');

centername = signal('');
centerbarangay = signal('');
centercapacity = signal<number | null>(null);
centercurrentPopulation = signal<number | null>(null);
centerstatus = signal('');

center: any[] = [];

constructor(private firestore: Firestore) {
const centerCollection = collection(this.firestore, 'evacuation_centers');
collectionData(centerCollection, { idField: 'id' }).subscribe(data => {
this.center = data; // Assign to array so Angular detects changes
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
addDoc(centerCollection, { name, barangay , capacity , population , status });
this.centername.set('');
this.centerbarangay.set('');
this.centercapacity.set(null);
this.centercurrentPopulation.set(null);
this.centerstatus.set('');
}
}

deletecenter(id: string) {
const incedentDoc = doc(this.firestore, `evacuation_centers/${id}`);
deleteDoc(incedentDoc);
}

updatecenter(id: string, newname: string, newbarangay: string, newcapacity: number, newpopulation: number, newstatus: string) {
const centerDoc = doc(this.firestore, `evacuation_centers/${id}`);
updateDoc(centerDoc, { name: newname, barangay: newbarangay, capacity: newcapacity, population: newpopulation, status: newstatus});
}
}