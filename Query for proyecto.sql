CREATE DATABASE EmployeeDB
GO
USE EmployeeDB
GO
	CREATE TABLE [dbo].[CUOTAS](
	[idCuota] [int] IDENTITY(1,1) NOT NULL,
	[nombreCuota] [varchar](50) NULL,
	[cuota] [decimal](10, 2) NULL,
	[estado] [bit] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CUOTAS] ADD  DEFAULT ((1)) FOR [estado]
GO


CREATE TABLE [dbo].[trasn_factura](
	[idtransFactura] [int] IDENTITY(1,1) NOT NULL,
	[fechaVencimiento] [varchar](50) NULL,
	[monto] [int] NULL,
	[saldo] [int] NULL,
	[pago] [int] NULL,
	[sobra] [int] NULL,
	[estado] [bit] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[trasn_factura] ADD  DEFAULT ((1)) FOR [estado]
GO


	
	truncate table trasn_factura
	SELECT*FROM trasn_factura
GO
	INSERT INTO trasn_factura
	VALUES ('20/05/2020',714,714,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('10/05/2021',118,118,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('1/02/2020',150,150,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('17/08/2020',112,112,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('16/08/2020',178,178,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('18/04/2021',89,89,0,0,1)
	INSERT INTO trasn_factura
	VALUES ('14/05/2020',79,79,0,0,1)
GO



----OTRO CASO --------------
	truncate table trasn_factura

	INSERT INTO trasn_factura
	VALUES (600,600,0,0,1)
	INSERT INTO trasn_factura
	VALUES (200,200,0,0,1)
	INSERT INTO trasn_factura
	VALUES (350,350,0,0,1)
	INSERT INTO trasn_factura
	VALUES (50,50,0,0,1)
	INSERT INTO trasn_factura
	VALUES (300,300,0,0,1)
