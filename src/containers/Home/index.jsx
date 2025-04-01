import { Banner, Container } from './styles';
import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';

export function Home() {

    return (
        <main>
            <Banner>
                <h1>Bem-Vindo</h1>
            </Banner>
            <Container>
                <div>
                    <CategoriesCarousel />
                    <OffersCarousel />

                </div>
            </Container>
        </main>
    )

}