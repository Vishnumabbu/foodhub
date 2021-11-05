const Restaurant = require("./restaurant.model");
const Meal = require("../meal/meal.model");
const _ = require("lodash");
const multer = require("multer");

var ObjectId = require('mongodb').ObjectID;

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of restaurants
exports.index = function (req, res) {
  Restaurant.find(function (err, restaurants) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, restaurants);
  });
};

// Get a single restaurant
exports.show = function (req, res) {
  Restaurant.findById(req.params.id)
    .populate("_meals")
    .exec(function (err, restaurant) {
      if (err) {
        return handleError(res, err);
      }

      if (!restaurant) {
        return res.send(404);
      }

      return res.json(restaurant);
    });
};

exports.create = function (req, res) {
  Meal.create(req.body._meals, function (err) {
    if (err) {
      console.log(req.body);

      return handleError(res, err);
    }
    const _meals = [];

    for (let i = 0; i < arguments[1].length; i++) {
      _meals.push(arguments[1][i]._id);
    }

    const _restaurant = req.body;
    console.log(req.body);
    _restaurant._meals = _meals;

    Restaurant.create(_restaurant, function (err, restaurant) {
      if (err) {
        console.log(err);
        return handleError(res, err);
      }

      restaurant.populate();

      return res.json(201, restaurant);
    });
  });
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

// router.post("/uploadImage", auth, (req, res) => {

//   upload(req, res, err => {
//       if (err) {
//           // console.log(err);
//           return res.json({ success: false, err })
//       }
//       return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
//   })

// });

exports.upload = function (req, res) {
  console.log("upload api");

  upload(req, res, (err) => {
    if (err) {
      // console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

exports.image = function(req,res){

  var id = req.body.id;
  id = ObjectId.createFromHexString(id);

  Restaurant.findOne(id,(err,docs)=>{
    if(err || !docs){
      return res.json({
        'success':false
      })
    }
    return res.json({
      'success':true,
      'image':docs.image
    })
  })
}

exports.rating = async function (req, res) {

  console.log(ObjectId);

  const num = req.body.num;
  var id = req.body.id.id;

  // console.log('caame')
  console.log(id);

  try {
    // console.log(id);
    id = ObjectId.createFromHexString(id);
    console.log(id);

    const rest = await Restaurant.findById(id);
    // console.log("came");
    rest.rating = (rest.rating + num);
    rest.num = rest.num + 1;

    rest.total = (rest.rating/rest.num);

    Restaurant.findByIdAndUpdate(id, rest, { new: true }, (err, docs) => {
      if (err || !docs) {
        return res.json({
          'success': false,
          'err': 'first',
        });
      }
      return res.json({
        success: true,
        doc:docs
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({
      'success': false,
      'err': 'second',
    });
  }
};

// Updates an existing restaurant in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if (err) {
      return handleError(res, err);
    }
    if (!restaurant) {
      return res.send(404);
    }
    const updated = _.merge(restaurant, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, restaurant);
    });
  });
};

// Deletes a restaurant from the DB.
exports.destroy = function (req, res) {
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if (err) {
      return handleError(res, err);
    }
    if (!restaurant) {
      return res.send(404);
    }
    restaurant.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
