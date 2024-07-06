import { Request, Response } from "express";
import Producto from "../models/producto";

export const getProducts = async  (req: Request, res: Response) => {

    const listProducts = await Producto.findAll();
    res.json(listProducts) 
}
export const createProduct = async (req: Request, res: Response) => {     

    const { body } = req;

    try {
        const nuevoProducto = await Producto.create(body);

        // Devuelve un código de estado 201 y el nuevo producto creado en el cuerpo de la respuesta
        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: nuevoProducto,
        });
    } catch (error) {
        // Devuelve un código de estado 500 en caso de error
        res.status(500).json({
            message: 'Error al crear el producto',
            error:(error as Error).message,
        });
    }

}

export const updateProduct = async (req: Request, res: Response) => {

    const { body } = req    ;
    const { id } = req.params;

    try {

        const product = await Producto.findByPk(id);

        if (product) {

            await product.update(body);
 
            res.status(200).json({
                message: 'Producto actualizado correctamente',
                
            });
        }

         else {
            res.status(404).json({
                message: `No existe un producto`
            })

         }
    } catch (error) {
      console.log(error);
        res.status(500).json({
            message: 'Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.'
        });
    }
    
}




export const getProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (product) {
        res.json(product)
    } else {

        res.status(404).json({
            msg: `No existe un producto con el id ${id}`    
        })

    }

}

export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const product = await Producto.findByPk(id);
    
        if (product) {
            await product.destroy();
            res.json({
                message: 'Producto eliminado correctamente'
            })
        } else {
            res.status(404).json({
                message: `No existe un Producto con el id ${id}`    
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Ocurrio un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.'
        });
    }
  
}


