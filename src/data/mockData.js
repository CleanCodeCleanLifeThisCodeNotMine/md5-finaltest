import ProductType from '../models/ProductType';
import Product from '../models/Product';

export const productTypes = [
    new ProductType('PT001', 'Body'),
    new ProductType('PT002', 'Pants'),
    new ProductType('PT003', 'Dress'),
    new ProductType('PT004', 'Accessories')
];

export const products = [
    new Product('P001', 'Gucci Shirt', '15/03/2025', 150, productTypes[0]),
    new Product('P002', 'Prada Pants', '20/02/2025', 100, productTypes[1]),
    new Product('P003', 'Channel Dress', '10/01/2025', 50, productTypes[2]),
    new Product('P004', 'Chanel Jacket', '05/03/2025', 80, productTypes[0]),
    new Product('P005', 'Prada Trousers', '25/02/2025', 120, productTypes[1]),
    new Product('P006', 'Cho Mo Skirt', '12/01/2025', 70, productTypes[2]),
    new Product('P007', 'Louis Vuitton Belt', '18/03/2025', 200, productTypes[3]),
    new Product('P008', 'Dong Xuan Hat', '22/02/2025', 180, productTypes[3])
];