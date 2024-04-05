import { Component, OnInit } from '@angular/core';
import { ServicepagosService } from 'src/app/service/servicepagos/servicepagos.service'; 
import { Pagos } from 'src/app/clases/pagos/pagos';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  idtransFactura: number;
  fechaVencimiento: string;
  monto: number;
  saldo: number;
  pago: number;
  sobra: number;
  estado: string;
}
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  trasnFacturaData: any[] = [];
  displayedColumns: string[] = ['select', 'idtransFactura', 'fechaVencimiento', 'monto', 'saldo', 'pago', 'sobra', 'estado'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  items: any[] = [];
  cuotaPagar: number = 0;
  pagoExitoso: boolean = false; // Nueva propiedad para indicar si el pago fue exitoso


  constructor(private servicePagos: ServicepagosService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  
  obtenerDatos() {
    this.servicePagos.obtenerDatos().subscribe(
      (data) => {
        this.items = data.map((item: any) => ({
          title: item.nombreCuota,
          content:item.cuota,
          estado:item.estado
        }));
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  pagarCuota(montos : number) {
    const montoNumerico: number = !isNaN(Number(montos)) ? Number(montos) : 0;

    const pagos: Pagos = {
      
      monto: montoNumerico,
      id_trans_factura: 3
    };

    this.servicePagos.ejecutarProcedimiento(pagos)
      .subscribe(
        response => {
          console.log('Pago Exitoso!');
          this.pagoExitoso = true; // Establecer pagoExitoso a true

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });



        },
        error => {
          console.error('Error al ejecutar el procedimiento:', error);
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(numeroCuotas => {
      console.log('El número seleccionado es:', numeroCuotas);
  
      const cuotas: any = {
        numeroCuotas: numeroCuotas,
      };
  
      this.servicePagos.crearCuotas(cuotas)
        .subscribe(
          response => {
            console.log('Cuotas Creadas!');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Cuotas creadas",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            console.error('Error al ejecutar el procedimiento:', error);
          }
        );
    });
  }
  

  

}
