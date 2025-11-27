import { Routes } from '@angular/router';
import { EvacuationCenter } from './evacuation-center/evacuation-center';
import { IncidentReport } from './incident-report/incident-report';
import { ReliefDistribution } from './relief-distribution/relief-distribution';

export const routes: Routes = [
    {path: '', component: EvacuationCenter},
    {path: 'incident-report', component: IncidentReport},
    {path: 'relief-distribution', component: ReliefDistribution}
];
