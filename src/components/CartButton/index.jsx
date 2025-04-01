import Cart from "../../assets/Carrinho.svg";
import { ContainerButton } from "./styles";


export function CartButton({ ...props }) {
    return (
        <ContainerButton {...props}>
            <img src={Cart} alt="carrinho-de-compras" />
        </ContainerButton>
    )
}