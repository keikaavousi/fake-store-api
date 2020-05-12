const Ordering = require('../model/ordering')

module.exports.getOrdering = (req,res) => {
    Ordering.findOne().sort({id: -1})
    .then(ordering=>{
        if(ordering==null){
            const ordering = new Ordering ({
                startTime: '0:0',
                endTime:'0:0',
                date:new Date(),
                enabled:false
            })
            ordering.save()
            .then(order=>{
                res.json(order)
            })
        }
        else{
            res.json(ordering)
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.updateOrdering = (req,res) => {
    const id = req.body.id

    const editedOrdering = {
      startTime: req.body.startTime,
      endTime:req.body.endTime,
      date:req.body.date,
      enabled:req.body.enabled
    }
    Ordering.findByIdAndUpdate(id,editedOrdering, {new: true})
    .then(
        ordering => {
         res.json(ordering)
      }
    )
    .catch(
      err => console.log(err)
    )
}