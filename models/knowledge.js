import { Schema, model, models } from 'mongoose';

const KnowledgeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Knowledge = models.Knowledge || model('Knowledge', KnowledgeSchema);

export default Knowledge;