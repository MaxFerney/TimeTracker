import { Mongo } from 'meteor/mongo';

export const TimesCollectionAccess = new Mongo.Collection('stored_times');
