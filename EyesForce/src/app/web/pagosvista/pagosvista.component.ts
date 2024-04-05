import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ServicepagosService } from 'src/app/service/servicepagos/servicepagos.service';
import { DialogComponent } from '../pagos/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogvistapagosComponent } from '../pagos/dialogvistapagos/dialogvistapagos.component';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  idtransFactura: number;
  fechaVencimiento: string;
  monto: number;
  saldo: number;
  pago: number;
  sobra: number;
}
@Component({
  selector: 'app-pagosvista',
  templateUrl: './pagosvista.component.html',
  styleUrls: ['./pagosvista.component.css']
})
export class PagosvistaComponent implements OnInit {
  displayedColumns: string[] = ['select', 'idtransFactura', 'fechaVencimiento', 'monto', 'saldo', 'pago', 'sobra'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(false, []); // Configurar la selección única
  showPagarModal: boolean = false;
  monto: any;

  constructor(private servicePagos: ServicepagosService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerDatosPagos();
  }


  obtenerDatosPagos(){
    this.servicePagos.getTrasnFactura().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener datos de trasn_factura:', error);
      }
    );
  
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
    
      // Seleccionar cada fila individualmente
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idtransFactura + 1}`;
    }
    pagar() {
      const selectedRow = this.selection.selected[0]; // Obtener el elemento seleccionado
      // Aquí debes implementar la lógica para realizar el pago para el elemento seleccionado
      console.log('Pago realizado para el elemento:', selectedRow);
    }

    openPagarModal() {
      this.showPagarModal = true;
    }
  
    closePagarModal() {
      this.showPagarModal = false;
    }
  
    realizarPago() {
      // Lógica para realizar el pago con el monto ingresado
      console.log('Monto ingresado:', this.monto);
      // Aquí puedes agregar la lógica para enviar el monto y realizar el pago
      this.closePagarModal(); // Cierra el modal después de realizar el pago
    }


    openDialog(): void {
      const dialogRef = this.dialog.open(DialogvistapagosComponent, {
        width: '250px'
      });
      const selectedRow = this.selection.selected[0]; // Obtener el elemento seleccionado


      dialogRef.afterClosed().subscribe(numeroCuotas => {
        console.log('El monto:', numeroCuotas);
    
        const cuotas: any = {
          id_trans_factura: selectedRow.idtransFactura,
          monto:numeroCuotas
        };
        console.log(selectedRow.idtransFactura);
    
        this.servicePagos.ejecutarProcedimiento(cuotas)
          .subscribe(
            response => {
              console.log('Monto pagado!');
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Pago Cuota",
                showConfirmButton: false,
                timer: 1500
              });
              this.obtenerDatosPagos();

            },
            error => {
              console.error('Error al ejecutar el procedimiento:', error);
            }
          );
      });
    
    }

    isSaldoNegativo(row: PeriodicElement): boolean {
      return row && row.saldo < 0;
    }
    
    getRowClass(row: PeriodicElement): string {
      return this.isSaldoNegativo(row) ? 'saldo-negativo' : '';
    }
    
}
