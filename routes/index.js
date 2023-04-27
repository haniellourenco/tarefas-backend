var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tarefas', async function(req, res, next) {
  try{
    // resgate as postagens
    const result = await global.db.recuperarTarefas();
    
    // informa pelo console
    console.log(result)

    // envia o resulado em json para quem pediu
    res.json(result)
  }catch(error){
    res.redirect('/?erro='+error)
  }
});

module.exports = router;
