import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Cargar datos desde archivos separados
const customers = JSON.parse(
  fs.readFileSync(path.resolve('./data/customers.json'), 'utf-8')
);
const products = JSON.parse(
  fs.readFileSync(path.resolve('./data/products.json'), 'utf-8')
);
const invoices = JSON.parse(
  fs.readFileSync(path.resolve('./data/invoices.json'), 'utf-8')
);

// Rutas para cada entidad
server.get('/customers', (req, res) => res.json(customers));
server.get('/products', (req, res) => res.json(products));
server.get('/invoices', (req, res) => res.json(invoices));

// Ruta para obtener un cliente por ID
server.get('/customers/:id', (req, res) => {
  const customer = customers.find(
    (cust) => cust.id === parseInt(req.params.id, 10)
  );
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// Ruta para obtener un producto por ID
server.get('/products/:id', (req, res) => {
  const product = products.find(
    (prod) => prod.id === parseInt(req.params.id, 10)
  );
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Ruta para obtener una factura por ID y sus relaciones
server.get('/invoices/:id/details', (req, res) => {
  const invoiceId = parseInt(req.params.id, 10);
  const invoice = invoices.find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const customer = customers.find((cust) => cust.id === invoice.customerId);
  const relatedProducts = invoice.items.map((item) => {
    const product = products.find((prod) => prod.id === item.productId);
    return { ...product, quantity: item.quantity };
  });

  res.json({
    ...invoice,
    customer,
    products: relatedProducts,
  });
});

// Ruta con filtros y paginación
server.get('/invoices', (req, res) => {
  const { customerId, status, _page = 1, _limit = 10 } = req.query;

  let filteredInvoices = invoices;

  if (customerId) {
    filteredInvoices = filteredInvoices.filter(
      (inv) => inv.customerId === parseInt(customerId, 10)
    );
  }
  if (status) {
    filteredInvoices = filteredInvoices.filter((inv) => inv.status === status);
  }

  const start = (_page - 1) * _limit;
  const end = start + parseInt(_limit, 10);

  res.json({
    total: filteredInvoices.length,
    data: filteredInvoices.slice(start, end),
  });
});

// Ruta para crear una nueva factura
server.post('/invoices', (req, res) => {
  const newInvoice = req.body;
  newInvoice.id = invoices.length ? invoices[invoices.length - 1].id + 1 : 1;

  invoices.push(newInvoice);
  fs.writeFileSync(
    path.resolve('./data/invoices.json'),
    JSON.stringify(invoices, null, 2)
  );

  res.status(201).json(newInvoice);
});

// Ruta para actualizar una factura
server.put('/invoices/:id', (req, res) => {
  const invoiceId = parseInt(req.params.id, 10);
  const updatedInvoice = req.body;

  const index = invoices.findIndex((inv) => inv.id === invoiceId);
  if (index === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  invoices[index] = { ...invoices[index], ...updatedInvoice };
  fs.writeFileSync(
    path.resolve('./data/invoices.json'),
    JSON.stringify(invoices, null, 2)
  );

  res.json(invoices[index]);
});

// Ruta para eliminar una factura
server.delete('/invoices/:id', (req, res) => {
  const invoiceId = parseInt(req.params.id, 10);
  const index = invoices.findIndex((inv) => inv.id === invoiceId);

  if (index === -1) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  invoices.splice(index, 1);
  fs.writeFileSync(
    path.resolve('./data/invoices.json'),
    JSON.stringify(invoices, null, 2)
  );

  res.status(204).end();
});

// Usar middlewares de json-server
server.use(middlewares);

// Iniciar el servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
