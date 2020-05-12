const Media = require('../model/media')


// module.exports.addMedia = (req,res) => {
//     console.log(req.body)
//    const media = new Media({
//        title: req.body.title,
//        url: req.file.filename
//    })
//    media.save()
//    .then(()=>{
//        res.json({
//            "result":"created"
//        })
//    })
//    .catch(err=>{
//        console.log(err)
//    })
// }



module.exports.addMedia = (req,res) => {
    res.json({
        url: req.file.filename
    })
}

module.exports.getMedia = (req,res) => {
    Media.find().select().sort({_id:-1})
 
    .then(media=>{
        console.log(media)
        res.json(media)
    })
    .catch(err=>{
        console.log(err)
    })
}


module.exports.getSingleMedia = (req,res) => {
    const id = req.params.id
    Media.findById(id)
    .then(media => {
        res.json(media)
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.deleteMedia = (req,res) => {
    const id = req.params.id
    Media.findByIdAndDelete(id)
    .then(() => {
        res.json({
            "result" : "deleted"
        })
    })
    .catch(err=>{
        console.log(err)
    })
}


module.exports.editMedia = (req,res) => {
    const id = req.params.id
    console.log(req.body)
    const editedMedia = {
      title: req.body.title,
    //    alt: req.body.alt,
    //    caption: req.body.caption,
       url:req.body.url
    }
    Media.findByIdAndUpdate(id,editedMedia, {new: true})
    .then(
      media => {
         res.json(media)
      }
    )
    .catch(
      err => console.log(err)
    )
}


