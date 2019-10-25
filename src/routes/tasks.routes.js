import { Router } from "Express";
import app from "../server";
const router = Router();

//Database connection
import { connect } from "../database"
import { ObjectID } from "mongodb"


router.get('/', async (req, res) => {
  const db = await connect();
  const result = await db.collection('tasks').find({}).toArray();
  
  res.json(result);
});

router.post('/', async(req, res) => {
  const db = await connect();
  //const {title, description} = req.body;
  const task = {
    title: req.body.title,
    description: req.body.description
  };
  const result = await db.collection('tasks').insert(task);
  res.json(result.ops[0]);
});

router.get('/:id', async(req, res) => {
  const db = await connect();
  const {id} = req.params;
  const result = await db.collection('tasks').findOne({_id: ObjectID(id)});
    
  res.json(result);

});

router.delete('/:id', async (req, res) => {
  const db = await connect();
  const {id} = req.params;
  const result = await db.collection('tasks').deleteOne({ _id: ObjectID(id)});

  res.json({
    message: `Task ${id} deleted`,
    result
  });
});

router.put('/:id', async(req, res) => {
  const db = await connect();
  const {id} = req.params;
  const updateTask = {
    title: req.body.title,
    description: req.body.description
  };

  const result = await db.collection('tasks').updateOne({_id: ObjectID(id)}, {$set: updateTask});

  res.json({
    message: `Task ${id} Updated`,
    result
  });
});




export default router;