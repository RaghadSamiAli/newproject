import { gql } from 'apollo-server-express';

import userSchema from './User';
import authorSchema from './Author';
import bookSchema from './Book';
import categorySchema from './Category';
import couponeSchema from './Coupone';
import faqSchema from './Faq';
import featuredbookSchema from './Featuredbook';
import languageSchema from './Language';
import notificationSchema from './Notification';
import orderSchema from './Order';
import bookreqSchema from './Bookreq';
import shippingaddScema from './Shippingadd';
import profileSchema from './Profile';
import itemSchema from './Item'
const linkedSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkedSchema,shippingaddScema,itemSchema, bookreqSchema, orderSchema, profileSchema, notificationSchema, languageSchema, userSchema, authorSchema, bookSchema, categorySchema, couponeSchema, faqSchema, featuredbookSchema];