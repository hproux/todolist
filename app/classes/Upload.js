export default class Upload {

    constructor(media, mediatype, title) {
        cloudinary.v2.uploader.upload(data.file,
            {
                ressource_type: "video",
                cloud_name: "smarttodo",
                api_key: "676368154725325",
                name: this.toDo.title,
                api_secret: "GbqhbfwdmCddvWpvS5RiXOg1zHc",
            }, (err, result) => {
                if (err) throw new Error(err.message);
                if (result) {
                    console.log(result);
                }
            }
        )
    }
}
