USE [EmployeeDB]
GO
/****** Object:  StoredProcedure [dbo].[proc_cuotas_crearCuotas]    Script Date: 5/04/2024 04:40:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[proc_cuotas_crearCuotas]
(
    @numeroCuotas int
)
AS
BEGIN
    DECLARE @monto DECIMAL(10,2);
    DECLARE @montoFinal DECIMAL(10,2);
    DECLARE @autc INT;

    -- Assigning the sum of 'monto' column from 'trasn_factura' table to @montoFinal
    SELECT @montoFinal = SUM(monto) FROM trasn_factura;

    -- Calculating installment amount
    SET @monto = @montoFinal / @numeroCuotas;

    -- Initializing counter
    SET @autc = 0;

    -- Loop to insert installments
    WHILE (@autc < @numeroCuotas)
    BEGIN
        INSERT INTO CUOTAS (nombreCuota, cuota)
        VALUES ('CO-0' + CAST(@autc + 1 AS VARCHAR), @monto);

        -- Incrementing counter
        SET @autc = @autc + 1;
    END;
END;


