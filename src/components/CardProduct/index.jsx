import PropTypes from "prop-types";
import { Container, Cardimage } from "./styles";
import { CartButton } from "../CartButton";
import { useCart } from "../../hooks/CartContext";

export function CardProduct({ product }) {
    const { putProductInCart } = useCart();

    return (
        <Container>
            <Cardimage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
            </div>
            <CartButton onClick={() => putProductInCart(product)}></CartButton>
        </Container>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object,
}