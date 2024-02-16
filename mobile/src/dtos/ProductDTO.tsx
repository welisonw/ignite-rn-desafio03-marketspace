import { PaymentMethodDTO } from './PaymentMethodsDTO';
// import { UserDTO } from './UserDTO';
import { ProductImagesDTO } from './ProductImagesDTO';

export interface ProductDTO {
	id: string;
	name: string;
	description: string;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	payment_methods: PaymentMethodDTO[];
	// user_id: string;
	// user: UserDTO;
	is_active: boolean;
	product_images: ProductImagesDTO[];
}
