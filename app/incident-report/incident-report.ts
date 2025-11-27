import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-incident-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-report.html',
  styleUrl: './incident-report.css',
})
export class IncidentReport {
  title = signal('Municipal Disaster Response Information System Using Angular and Firebase');


  incidentlocation = signal('');
  incidentdate = signal<Date | null>(null);
  incidentType = signal('');
  incidentdamageLevel = signal('');
  incidentremarks = signal('');


  incedent: any[] = [];


  constructor(private firestore: Firestore) {
    const incidentCollection = collection(this.firestore, 'disaster_incidents');
    collectionData(incidentCollection, { idField: 'id' })
    .subscribe(data => {
      this.incedent = data; // Assign to array so Angular detects changes
    });
  }


  addincident() {
    const location = this.incidentlocation();
    const date = this.incidentdate();
    const type = this.incidentType();
    const damage = this.incidentdamageLevel();
    const remarks = this.incidentremarks();




    if (location && date && type && damage && remarks) {
      const incedentCollection = collection(this.firestore, 'disaster_incidents');
      addDoc(incedentCollection, { location, date, type, damage, remarks });
      this.incidentlocation.set('');
      this.incidentdate.set(null);
      this.incidentType.set('');
      this.incidentdamageLevel.set('');
      this.incidentremarks.set('');
    }
  }


  deleteincident(id: string) {
    const disasterDoc = doc(this.firestore, `disaster_incidents/${id}`);
    deleteDoc(disasterDoc);
  }


  updateincident(id: string, newlocation: string, newdate: Date, newtype: string, newdamage: string, newremarks: string) {
    const incidentDoc = doc(this.firestore, `disaster_incidents/${id}`);
    updateDoc(incidentDoc, { location: newlocation, date: newdate, type: newtype, damage: newdamage, remarks: newremarks });
  }

}
