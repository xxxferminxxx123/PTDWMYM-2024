USE [EmployeeDB]
GO
/****** Object:  StoredProcedure [dbo].[proc_get_cuotas]    Script Date: 5/04/2024 04:40:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[proc_get_cuotas]
AS
BEGIN
SELECT*FROM CUOTAS
END