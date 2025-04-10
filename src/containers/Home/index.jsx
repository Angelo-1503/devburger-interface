import { Banner, Container } from './styles';
import { CategoriesCarousel, OffersCarousel } from '../../components';
import { useUser } from '../../hooks/UserContext';

export function Home() {
  console.log(useUser());
  return (
    <main>
      <Banner>
        <h1>Bem-Vindo!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </main>
  );
}
