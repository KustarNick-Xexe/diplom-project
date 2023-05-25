const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Роуты для грузов ----------------------------------------------------------------
router.get('/cargos', async (req, res, next) => {
  try {
    const cargos = await prisma.cargo.findMany();
    res.json(cargos);
  } catch (error) {
    next(error);
  }
});

router.get('/cargos/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) }, include: { plan: true } });
    res.json(cargo);
  } catch (error) {
    next(error);
  }
});

router.post('/cargos', async (req, res, next) => {
  try {
    const id = parseInt(req.body.idClient);
    await prisma.cargo.create({ data: req.body });
    const client = await prisma.client.findUnique({
      where: { id: id },
      include: { cargos: true },
    });

    if (client) {
      const demand = client.cargos.reduce((sum, cargo) => sum + cargo.weight, 0);
      await prisma.client.update({
        where: { id: parseInt(client.id) },
        data: { demand: demand }
      });

      const updatedClient = await prisma.client.findUnique({
        where: { id: id },
        include: { cargos: true },
      });
      res.json({ ...updatedClient, demand: demand });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/cargos/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const cargo = await prisma.cargo.findUnique({
      where: { id: parseInt(id) },
    });

    const client = await prisma.client.findUnique({
      where: { id: cargo.idClient },
      include: { cargos: true },
    });

    if (client) {
      const oldWeight = cargo.weight;

      const newCargo = await prisma.cargo.update({ where: { id: parseInt(id) }, data: req.body });

      const demand = client.demand - oldWeight + newCargo.weight;

      await prisma.client.update({
        where: { id: client.id },
        data: { demand: demand, }
      });

      const updatedClient = await prisma.client.findUnique({
        where: { id: client.id },
        include: { cargos: true },
      });

      res.json({ ...updatedClient, demand: demand });
    } else {
      res.status(404).json({ message: "Client not found" });
    }

    res.json(cargo);
  } catch (error) {
    next(error);
  }
});

router.delete('/cargos/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cargo = await prisma.cargo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cargo) {
      return res.status(404).json({ message: "Cargo not found" });
    }

    const client = await prisma.client.findUnique({
      where: { id: cargo.idClient },
      include: { cargos: true },
    });

    if (client) {
      const demand = client.demand - cargo.weight;

      await prisma.cargo.delete({ where: { id: parseInt(id) } });

      await prisma.client.update({
        where: { id: client.id },
        data: { demand: demand, }
      });

      const updatedClient = await prisma.client.findUnique({
        where: { id: client.id },
        include: { cargos: true },
      });

      res.json({ ...updatedClient, demand: demand });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    next(error);
  }
});


//Роуты для ТС ----------------------------------------------------------------
router.get('/vehicles', async (req, res, next) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

router.get('/vehicles/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.findUnique({ where: { id: parseInt(id) }, include: { plan: true } });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

router.post('/vehicles', async (req, res, next) => {
  try {
    const vehicle = await prisma.vehicle.create({ data: req.body });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

router.put('/vehicles/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.update({ where: { id: parseInt(id) }, data: req.body });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

router.delete('/vehicles/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.delete({ where: { id: parseInt(id) } });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

//Роуты для клиентов ----------------------------------------------------------------
router.get('/clients', async (req, res, next) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.get('/clients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({ where: { id: parseInt(id) } });
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.post('/clients', async (req, res, next) => {
  try {
    const client = await prisma.client.create({ data: req.body });
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.put('/clients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.update({ where: { id: parseInt(id) }, data: req.body });
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.delete('/clients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.delete({ where: { id: parseInt(id) } });
    res.json(client);
  } catch (error) {
    next(error);
  }
});

//Роуты для планов ----------------------------------------------------------------
router.get('/plans', async (req, res, next) => {
  try {
    const plans = await prisma.plan.findMany({ include: { cargo: true, vehicle: true } });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get('/plans/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.findUnique({ where: { id: parseInt(id) }, include: { cargo: true, vehicle: true } });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.post('/plans', async (req, res, next) => {
  try {
    const plan = await prisma.plan.create({ data: req.body, include: { cargo: true, vehicle: true } });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.put('/plans/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.update({ where: { id: parseInt(id) }, data: req.body, include: { cargo: true, vehicle: true } });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.delete('/plans/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.delete({ where: { id: parseInt(id) }, include: { cargo: true, vehicle: true } });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

//Роуты для путей ----------------------------------------------------------------
router.get('/distances', async (req, res, next) => {
  try {
    const distances = await prisma.distance.findMany({ include: { client1: true, client2: true } });
    res.json(distances);
  } catch (error) {
    next(error);
  }
});

router.get('/distances/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const distance = await prisma.distance.findUnique({ where: { id: parseInt(id) }, include: { client1: true, client2: true } });
    res.json(distance);
  } catch (error) {
    next(error);
  }
});

router.post('/distances', async (req, res, next) => {
  try {
    const distance = await prisma.distance.create({ data: req.body, include: { client1: true, client2: true } });
    res.json(distance);
  } catch (error) {
    next(error);
  }
});

router.put('/distances/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const distance = await prisma.distance.update({ where: { id: parseInt(id) }, data: req.body, include: { client1: true, client2: true } });
    res.json(distance);
  } catch (error) {
    next(error);
  }
});

router.delete('/distances/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const distance = await prisma.distance.delete({ where: { id: parseInt(id) }, include: { client1: true, client2: true } });
    res.json(distance);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

