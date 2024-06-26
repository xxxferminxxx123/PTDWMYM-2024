USE [EmployeeDB]
GO
/****** Object:  StoredProcedure [dbo].[pagarv3]    Script Date: 5/04/2024 04:40:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[pagarv3]
(@MONTOX INT,
 @idtransFacturax INT)
AS
BEGIN
    DECLARE @saldoActualizado INT;	

    IF EXISTS(SELECT 1 FROM trasn_factura WHERE idtransFactura = @idtransFacturax AND monto < @MONTOX AND estado = 1)
    BEGIN
        -- Verificar si el registro actual ya ha sido afectado por una sobra en un registro anterior
        IF EXISTS (SELECT 1 FROM trasn_factura WHERE idtransFactura = @idtransFacturax AND sobra > 0)
        BEGIN
            -- No permitir el pago si ya ha sido afectado por una sobra anteriormente
            THROW 50001, 'No se puede realizar el pago. El registro ya ha sido afectado por una sobra anteriormente.', 1;
            RETURN;
        END

        BEGIN TRY

				UPDATE CUOTAS
				SET estado = 0
				WHERE idCuota = (
					SELECT TOP 1 idCuota
					FROM CUOTAS
					WHERE estado = 1
					ORDER BY idCuota ASC
				);
            UPDATE trasn_factura 
            SET sobra = ABS(@MONTOX - (monto + (SELECT saldo FROM trasn_factura WHERE idtransFactura = @idtransFacturax - 1))),
                pago = ABS(@MONTOX),
                saldo = ABS(monto + (SELECT saldo FROM trasn_factura WHERE idtransFactura = @idtransFacturax - 1))
            WHERE idtransFactura = @idtransFacturax;

            WHILE EXISTS(SELECT 1 FROM trasn_factura WHERE (SELECT sobra FROM trasn_factura WHERE idtransFactura = @idtransFacturax) > 0 AND estado = 1)
            BEGIN
                UPDATE trasn_factura 
                SET saldo = ABS(saldo - (SELECT sobra FROM trasn_factura WHERE idtransFactura = @idtransFacturax)), 
                    sobra = ABS(CASE 
                                    WHEN saldo > (SELECT sobra FROM trasn_factura WHERE idtransFactura = @idtransFacturax) THEN 0
                                    WHEN saldo = (SELECT sobra FROM trasn_factura WHERE idtransFactura = @idtransFacturax) THEN 0
                                    ELSE (SELECT sobra FROM trasn_factura WHERE idtransFactura = @idtransFacturax) - saldo
                                END)
                WHERE idtransFactura = @idtransFacturax + 1;

                SET @idtransFacturax = @idtransFacturax + 1;
            END
        END TRY
        BEGIN CATCH
            -- Handle the error
            PRINT 'An error occurred: ' + ERROR_MESSAGE();
            -- Rollback transaction if necessary
            ROLLBACK;
            -- Raise error again to be caught by outer TRY...CATCH blocks
            THROW;
        END CATCH
    END
    ELSE IF EXISTS(SELECT 1 FROM trasn_factura WHERE idtransFactura = @idtransFacturax AND monto > @MONTOX AND estado = 1)
    BEGIN
        BEGIN TRY
			UPDATE CUOTAS
			SET estado = 0
			WHERE idCuota = (
				SELECT TOP 1 idCuota
				FROM CUOTAS
				WHERE estado = 1
				ORDER BY idCuota ASC
			);
            UPDATE trasn_factura 
            SET saldo = (saldo - @MONTOX),
                pago = ABS(@MONTOX)
            WHERE idtransFactura = @idtransFacturax;

            UPDATE trasn_factura
            SET saldo = monto - (SELECT saldo FROM trasn_factura WHERE idtransFactura = @idtransFacturax)
            WHERE idtransFactura = @idtransFacturax + 1;
        END TRY
        BEGIN CATCH
            -- Handle the error
            PRINT 'An error occurred: ' + ERROR_MESSAGE();
            -- Rollback transaction if necessary
            ROLLBACK;
            -- Raise error again to be caught by outer TRY...CATCH blocks
            THROW;
        END CATCH
    END

END
