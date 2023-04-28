var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tarefas', async function(req, res, next) {
  try{
    // resgate as tarefas
    const result = await global.db.recuperarTarefas();
    
    // informa pelo console
    console.log(result)

    // envia o resultado em json para quem pediu
    res.json(result)
  }catch(error){
    res.redirect('/?erro='+error)
  }
});

router.get('/tarefas/:id', async function(req, res, next) {
  try{
    // resgate as tarefas
    const tarefaId = req.params.id
    const result = await global.db.recuperarTarefa(tarefaId);
    
    // informa pelo console
    console.log(result)

    // envia o resultado em json para quem pediu
    res.json(result)
  }catch(error){
    res.redirect('/?erro='+error)
  }
});

module.exports = router;
