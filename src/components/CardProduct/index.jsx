import PropTypes from "prop-types";
import { Container, Cardimage } from "./styles";
import { CartButton } from "../CartButton";


export function CardProduct({ product }) {
    console.log(product);
    return (
        <Container>
            <Cardimage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
            </div>
            <CartButton></CartButton>
        </Container>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object,
}