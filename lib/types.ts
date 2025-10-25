export interface LogbookData {
  vehicleNumber: string
  ownerName: string
  chassisNumber: string
  engineNumber: string
  model: string
  color: string
  dateOfRegistration: string
  remarks?: string
  createdAt: string
}

export interface ServiceRecord {
  id: string
  serviceType: string
  description: string
  serviceDate: string
  cost: string
  technician: string
  notes?: string
  createdAt: string
}