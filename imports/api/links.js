import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');

export const TimeCollection = new Mongo.Collection('times');
