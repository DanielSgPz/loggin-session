import { Router } from 'express'
import { Producto } from '../../models/productos.js'

export const productosRouter = Router()

productosRouter.get('/productos', async (req, res) => {
    if (!req.session['user']) {
        return res.redirect('/')
    }
    console.log(req.query)
    let opciones = {}
    const filtro = (!req.query.filtro) ? '' : { category: req.query.filtro }
    const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 10, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones }
    const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones }
    const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones }
    opciones = { lean: true, ...opciones }
    const paginado = await Producto.paginate(filtro, opciones)
    const pagesNavBar = []
    for (let i = 1; i <= paginado.totalPages; i++) {
        const page = i
        const status = (i === paginado.page) ? 'active' : ''
        pagesNavBar.push({ page, status })
    }

    const results = {
        status: 'success',
        payload: paginado.docs,
        totalPages: paginado.totalPages,
        prevPage: paginado.prevPage,
        nextPage: paginado.nextPage,
        page: paginado.page,
        hasPrevPage: paginado.hasPrevPage,
        hasNextPage: paginado.hasNextPage,
        prevLink: `/?pagina=${paginado.prevPage}`,
        nextLink: `/?pagina=${paginado.nextPage}`,
        navBar: pagesNavBar
    }
    const isAdmin = (req.session['user'].level === 'admin') ? true : false
    res.render('productos', {
        titulo: 'Lista de Productos',
        results: results,
        user: req.session['user'],
        isAdmin
    })
})

productosRouter.get('/init', async (req, res) => {
    const dataSet = [
       
    {
        title: "Helado de Vainilla",
        description: "Clásico helado cremoso de vainilla.",
        code: "Vainilla-01",
        price: 3.99,
        status: true,
        stock: 50,
        category: "Helados Tradicional",
        image: "https://ejemplo.com/helado-vainilla.jpg"
      },
      {
        title: "Helado de Chocolate",
        description: "Delicioso helado de chocolate hecho con cacao de alta calidad.",
        code: "Chocolate-01",
        price: 4.49,
        status: true,
        stock: 40,
        category: "Helados Tradicional",
        image: "https://ejemplo.com/helado-chocolate.jpg"
      },
      {
        title: "Helado de Fresa",
        description: "Fresco y delicioso helado de fresa hecho con frutas naturales.",
        code: "Fresa-01",
        price: 4.99,
        status: true,
        stock: 35,
        category: "Helados Tradicional",
        image: "https://ejemplo.com/helado-fresa.jpg"
      },
      {
        title: "Helado de Menta",
        description: "Refrescante helado con sabor a menta, perfecto para los días calurosos.",
        code: "Menta-01",
        price: 4.79,
        status: true,
        stock: 30,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-menta.jpg"
      },
      {
        title: "Helado de Limón",
        description: "Refrescante helado con el sabor cítrico y fresco del limón.",
        code: "Limon-01",
        price: 4.59,
        status: true,
        stock: 25,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-limon.jpg"
      },
      {
        title: "Helado de Coco",
        description: "Helado cremoso con el sabor tropical y dulce del coco.",
        code: "Coco-01",
        price: 5.29,
        status: true,
        stock: 20,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-coco.jpg"
      },
      {
        title: "Helado de Nube",
        description: "Helado suave y esponjoso con sabor a algodón de azúcar.",
        code: "Nube-01",
        price: 4.99,
        status: true,
        stock: 30,
        category: "Helados Azucar",
        image: "https://ejemplo.com/helado-nube.jpg"
      },
      {
        title: "Helado de Pistacho",
        description: "Helado con el distintivo sabor y color del pistacho.",
        code: "Pistacho-01",
        price: 5.49,
        status: true,
        stock: 28,
        category: "Helados Frutos Secos",
        image: "https://ejemplo.com/helado-pistacho.jpg"
      },
      {
        title: "Helado de Mora",
        description: "Helado con sabor agridulce de moras frescas.",
        code: "Mora-01",
        price: 4.79,
        status: true,
        stock: 22,
        category: "Helados Tradicional",
        image: "https://ejemplo.com/helado-mora.jpg"
      },
      {
        title: "Helado de Mango",
        description: "Helado tropical con el sabor dulce y jugoso del mango.",
        code: "Mango-01",
        price: 5.99,
        status: true,
        stock: 18,
        category: "Helados Tradicional",
        image: "https://ejemplo.com/helado-mango.jpg"
      },
      {
        title: "Helado de Tiramisú",
        description: "Helado inspirado en el famoso postre italiano Tiramisú.",
        code: "Tiramisu-01",
        price: 5.79,
        status: true,
        stock: 24,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-tiramisu.jpg"
      },
      {
        title: "Helado de Piña Colada",
        description: "Helado con el sabor tropical de piña y coco, como el cóctel Piña Colada.",
        code: "PinaColada-01",
        price: 6.29,
        status: true,
        stock: 15,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-pinacolada.jpg"
      },
      {
        title: "Helado de Avellana",
        description: "Helado con el sabor tostado y cremoso de la avellana.",
        code: "Avellana-01",
        price: 5.49,
        status: true,
        stock: 27,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-avellana.jpg"
      },
      {
        title: "Helado de Algodón de Azúcar",
        description: "Helado con el sabor dulce y esponjoso del algodón de azúcar.",
        code: "Algodon-01",
        price: 4.89,
        status: true,
        stock: 23,
        category: "Helados",
        image: "https://ejemplo.com/helado-algodonazucar.jpg"
      },
      {
        title: "Helado Baklava",
        description: "Helado con trozos de baklava, nueces y miel, inspirado en el postre turco.",
        code: "Baklava-01",
        price: 6.99,
        status: true,
        stock: 20,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-baklava.jpg"
      },
      {
        title: "Helado de Dátiles y Nueces",
        description: "Helado con el sabor dulce de los dátiles y el crujiente de las nueces.",
        code: "DatilesNueces-01",
        price: 6.49,
        status: true,
        stock: 18,
        category: "Helados ",
        image: "https://ejemplo.com/helado-datilesnueces.jpg"
      },
      {
        title: "Helado de Rosa",
        description: "Helado con sabor floral a rosa, típico en la gastronomía árabe.",
        code: "Rosa-01",
        price: 5.79,
        status: true,
        stock: 25,
        category: "Helados",
        image: "https://ejemplo.com/helado-rosa.jpg"
      },
      {
        title: "Helado de Café Árabe",
        description: "Helado con el sabor intenso y aromático del café árabe.",
        code: "CafeArabe-01",
        price: 5.99,
        status: true,
        stock: 22,
        category: "Helados Especiales",
        image: "https://ejemplo.com/helado-cafe-arabe.jpg"
      },
      {
        title: "Helado de Cardamomo",
        description: "Helado con el sabor cálido y especiado del cardamomo, común en la cocina de Medio Oriente.",
        code: "Cardamomo-01",
        price: 5.49,
        status: true,
        stock: 20,
        category: "Helados",
        image: "https://ejemplo.com/helado-cardamomo.jpg"
      },
      {
        title: "Helado de Granada",
        description: "Helado con el sabor agridulce de la granada, fruta popular en la región.",
        code: "Granada-01",
        price: 6.29,
        status: true,
        stock: 19,
        category: "Helados",
        image: "https://ejemplo.com/helado-granada.jpg"
      },
      {
        title: "Helado de Higos",
        description: "Helado con el sabor dulce y suave de los higos frescos.",
        code: "Higos-01",
        price: 6.49,
        status: true,
        stock: 17,
        category: "Helados",
        image: "https://ejemplo.com/helado-higos.jpg"
      },
      {
        title: "Helado de Jengibre y Miel",
        description: "Helado con la combinación picante del jengibre y la dulzura de la miel.",
        code: "JengibreMiel-01",
        price: 6.79,
        status: true,
        stock: 15,
        category: "Helados",
        image: "https://ejemplo.com/helado-jengibremiel.jpg"
      },
      {
        title: "Helado de Sésamo",
        description: "Helado con el sabor característico y tostado del sésamo.",
        code: "Sesamo-01",
        price: 5.79,
        status: true,
        stock: 21,
        category: "Helados",
        image: "https://ejemplo.com/helado-sesamo.jpg"
      },
      {
        title: "Helado de Pistacho y Rosas",
        description: "Helado con una combinación de sabores de pistacho y esencia de rosas.",
        code: "PistachoRosas-01",
        price: 6.99,
        status: true,
        stock: 16,
        category: "Helados",
        image: "https://ejemplo.com/helado-pistachorosas.jpg"
      }
    ]
    await Producto.deleteMany()
    await Producto.insertMany(dataSet)
    res.send('Base de datos creada')

})