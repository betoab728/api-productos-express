"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield producto_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const nuevoProducto = yield producto_1.default.create(body);
        // Devuelve un código de estado 201 y el nuevo producto creado en el cuerpo de la respuesta
        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: nuevoProducto,
        });
    }
    catch (error) {
        // Devuelve un código de estado 500 en caso de error
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const product = yield producto_1.default.findByPk(id);
        if (product) {
            yield product.update(body);
            res.status(200).json({
                message: 'Producto actualizado correctamente',
            });
        }
        else {
            res.status(404).json({
                message: `No existe un producto`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.'
        });
    }
});
exports.updateProduct = updateProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield producto_1.default.findByPk(id);
        if (product) {
            yield product.destroy();
            res.json({
                message: 'Producto eliminado correctamente'
            });
        }
        else {
            res.status(404).json({
                message: `No existe un Producto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Ocurrio un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.'
        });
    }
});
exports.deleteProduct = deleteProduct;
