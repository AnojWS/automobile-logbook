export interface LogbookData {
  identifierNumber: string
  vehicleType: string
  bodyType: string
  colour: string
  registrationPlateNumber: string
  registrationExpiry: string
  yearOfManufacture: string
  identifierType: string
  make: string
  model: string
  engineNumber: string
  stateVehicleRegistered: string
  yearMonthCompliance: string
  createdAt: string
}

export interface ServiceRecord {
  recordId: string
  serviceDate: string
  serviceType: string
  serviceCenterDealerName: string
  cost: string
  odometerReading: string
  nextServiceDue: string
  serviceDescription: string
  technicianMechanicName: string
  additionalNotes?: string
  createdAt: string
}