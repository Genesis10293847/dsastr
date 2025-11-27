import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-relief-distribution',
  imports: [CommonModule, FormsModule],
  templateUrl: './relief-distribution.html',
  styleUrl: './relief-distribution.css',
})
export class ReliefDistribution {
  title = signal('Municipal Disaster Response Information System Using Angular and Firebase');

  reliefbarangay = signal('');
  reliefdate = signal('');
  reliefnumberOfFamilies = signal(0);
  reliefItems = signal('');
  reliefdistributedBy = signal('');

  relief: any[] = [];


  constructor(private firestore: Firestore) {
    const reliefsCollection = collection(this.firestore, 'relief_distribution');
    collectionData(reliefsCollection, { idField: 'id' })
    .subscribe(data => {
      this.relief = data;
    });
  }


  addrelief() {
    const barangay = this.reliefbarangay();
    const date = this.reliefdate();
    const families = this.reliefnumberOfFamilies();
    const items = this.reliefItems();
    const distributed = this.reliefdistributedBy();

    if (barangay && date && families && items && distributed) {
      const reliefsCollection = collection(this.firestore, 'relief_distribution');
      addDoc(reliefsCollection, { 
        barangay: barangay, 
        date: date, 
        families: families, 
        items: items, 
        distributed: distributed 
      });
      this.reliefbarangay.set('');
      this.reliefdate.set('');
      this.reliefnumberOfFamilies.set(0);
      this.reliefItems.set('');
      this.reliefdistributedBy.set('');
    } else {
      alert('Please fill in all fields');
    }
  }


  deleterelief(id: string) {
    const reliefsDoc = doc(this.firestore, `relief_distribution/${id}`);
    deleteDoc(reliefsDoc);
  }


  updaterelief(id: string, newbarangay: string, newdate: string, newfamilies: number, newitems: string, newdistributed: string) {
    const reliefsDoc = doc(this.firestore, `relief_distribution/${id}`);
    updateDoc(reliefsDoc, { 
      barangay: newbarangay, 
      date: newdate, 
      families: newfamilies, 
      items: newitems, 
      distributed: newdistributed 
    });
  }
}
