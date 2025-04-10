import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles.css'
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckoutForm() {

    const { cartProducts, clearCart } = useCart();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink }, } = useLocation()

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha, tente novamente')
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((product) => {
                    return { id: product.id, quantity: product.quantity, price: product.price }
                });



                const { status } =
                    await api.post('/orders', { products }, {
                        validateStatus: () => true,
                    },
                    );



                if (status === 201 || status === 200) {

                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
                    }, 3000)
                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!')
                } else if (status === 400) {
                    toast.error('Falha ao realizar pedido!')
                } else {
                    throw new Error()
                }

            }
            catch (error) {
                toast.error('Falha no sistema! Tente novamente mais tarde!')
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar agora"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div id="dpm-annotation">
                <p>
                    Os mérodos de pagamento são disponibilizados de acordo com a sua região.&nbsp;
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="dpm-integration-checker"
                    >
                        Ver métodos de pagamento.
                    </a>
                </p>
            </div>
        </div>
    );
}