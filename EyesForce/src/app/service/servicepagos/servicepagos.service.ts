import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagos } from 'src/app/clases/pagos/pagos';


@Injectable({
  providedIn: 'root'
})
export class ServicepagosService {

  constructor(private http: HttpClient) { }
  
  private apiUrl = 'http://localhost:5000/api/pagos/procedimiento/trasn_factura';

  // Ejemplo de función para consumir una API
  obtenerDatos(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/pagos/procedimiento/getCuotas');
  }

  ejecutarProcedimiento(pagos : Pagos): Observable<any> {
    return this.http.post('http://localhost:5000/api/pagos/procedimiento/pagar', pagos);
  }

  crearCuotas(cuotas: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/pagos/procedimiento/crearCuotas',cuotas );
  }

  getTrasnFactura(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
