import { Router } from "Express";
import app from "../server";

const router = Router();
router.get('/', (req, res) => {
  res.send('Tasks');
});

export default router;