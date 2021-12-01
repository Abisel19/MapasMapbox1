import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MapCustomService} from "src/app/services/map-custom.service";
import {Socket} from "ngx-socket-io";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Ruta } from 'src/app/models/ruta';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  modeInput = 'start';
  wayPoints: WayPoints = {start: null, end: null};
  lista:string[]=["Las americas","bbb","tal", "estas"];
  seleccionado:string[]=[];
  public token: string;
  httpOptions = {
    headers: new HttpHeaders()
  };
  public cuenta: Ruta;
  constructor(private mapCustomService: MapCustomService, private renderer2: Renderer2,
              private socket: Socket, public httpVar:HttpClient,
              private authService: AuthService, ) {
                this.token = authService.retornarToken();
                this.httpOptions.headers = new HttpHeaders({
                  'Authorization': `Bearer ${this.token}`
                });
                this.cuenta = {ruta: ''}
  }

  ngOnInit(): void {
    this.mapCustomService.buildMap()
      .then(({geocoder, map}) => {
        // this.asGeoCoder
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        );
        console.log('*** TODO BIEN *****');
      })
      .catch((err) => {
        console.log('******* ERROR ******', err);
      });

    this.mapCustomService.cbAddress.subscribe((getPoint) => {
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
        console.log('Hola aqui esta el punto');
        console.log(getPoint);
      }
      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });

    this.socket.fromEvent('position')
      .subscribe(({coords}) => {
        console.log('******* DESDE SERVER ****', coords);
        this.mapCustomService.addMarkerCustom(coords);
      })
  }
  // ruta(){
  //     console.log(this.seleccionado);
  // }
  ruta(){
    // this.error=false;
    // this.reportesUsers = [];
   // console.log(this.cuenta);
    this.httpVar.post('http://127.0.0.1:8000/api/obtenerruta',this.cuenta,this.httpOptions)
    .subscribe(data=>{
      const coordenada_a = data['coordenada_a'];
      const coordenada_b = data['coordenada_b'];
      // console.log(data['coordenada_a']);
      this.drawRoute(coordenada_a, coordenada_b);
      // for(let key in data){
        
      //   console.log(key['coordenada_a']);
      // }
      // if(data){
      //   if(data[0]){
      //     //console.log("entro");
      //     // for (let key in data) {
      //     //   let customObj = new ReporteUserCuenta(
      //     //     data[key]['id'],
      //     //     data[key]['id_tiporeporte'],
      //     //     data[key]['id_usuario'],
      //     //     data[key]['id_cuenta'],
      //     //     data[key]['region'],
      //     //     data[key]['manzana'],
      //     //     data[key]['lote'],
      //     //     data[key]['imagen'],
      //     //     data[key]['descripcion'],
      //     //     data[key]['tiporeporte'],
      //     //     data[key]['email'],
      //     //     data[key]['estatus'],
      //     //     data[key]['name'],
      //     //     null,
      //     //     null
      //     //     );
      //     //   this.reportesUsers.push(customObj);
      //     // }
          
      //   }else{
      //     // this.reportesUsers = null;
      //     // if(data){
      //     //   this.mensajeError = data['error'];
      //     // }
      //     // this.error = true;
      //     console.log('fallor');
          
      //   }
        
      // }else{
      //   // this.reportesUsers = null;
      //   //   if(data){
      //   //     this.mensajeError = data['error'];
      //   //   }
      //   //   this.error = true;
      //   console.log('error');
      // }
      
      
    })
  }
  drawRoute(ca:string, cb:string): void {
    console.log(ca);
    console.log(cb);
    let inicio = [ca]
    
    let final = [
      cb
    ]
    // console.log('***** PUNTOS de ORIGEN y DESTINO', this.wayPoints)
    const coords = [
      inicio,
      final
    ];
    console.log('Coordenadas');
    console.log(coords);

    this.mapCustomService.loadCoords(coords);
  }

  changeMode(mode: string): void {
    this.modeInput = mode;
  }

  testMarker(): void {
    this.mapCustomService.addMarkerCustom([-8.628139488926513, 41.159082702543635]);
  }
}

export class WayPoints {
  start: any;
  end: any
}