import { jobDB } from '../connections/index'
import { Schema, InferSchemaType } from 'mongoose'

const ListingSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    publishedAt: { type: Date },
    status: { type: String, enum: ['active', 'deleted', 'draft'], default: 'draft', required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { collection: 'listings', timestamps: true },
)

export type IListingJob = InferSchemaType<typeof ListingSchema>

const ListingJob = jobDB.model<IListingJob>('ListingJob', ListingSchema)

export default ListingJob
