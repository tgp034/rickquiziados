import { Routes } from '@angular/router';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminInitComponent } from './components/admin-init/admin-init.component';
import { ScoresComponent } from './components/scores/scores.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { PersonajeComponent } from './components/busqueda-personajes/personaje.component';
import { JuegoComponent } from './components/juego/juego.component';

import { EndGameComponent } from './components/end-game/end-game.component';

export const routes: Routes = [
    { path: '', component: PantallaInicioComponent },
    { path: 'notfound', component: NotFoundComponent},
    { path: 'scores', component: ScoresComponent},
    { path: 'game', component: JuegoComponent},
    { path: 'endgame', component: EndGameComponent},
    { path: 'admin', component: AdminInitComponent},
    { path: 'adminpanel', component: AdminPanelComponent},
    { path: 'character', component: PersonajeComponent},
    // { path: '', redirectTo: '/Inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' },  

];
