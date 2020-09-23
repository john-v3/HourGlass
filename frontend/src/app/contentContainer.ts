export interface ContentContainer{

  // MongoSchema
  title: String;
  author: String;
  privacyLevel: String;
  timePosted: Date;
  link: String;
  text: String;
  file: String;

  // Angular exclusive

}

/*
    title: {type: String},
    author: {type: mongoose.Types.ObjectId},
    privacyLevel: {type: String},
    timePosted: {type: mongoose.Schema.Types.Date},
    link: {type: String},
    text: {type: String},
    file: {type: mongoose.Types.ObjectId}

*/
