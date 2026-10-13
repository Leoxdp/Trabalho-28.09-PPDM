import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from 'styled-components/native';
import { Text } from "react-native";
import { useState } from "react";
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  categoryName: string;
  description: string;
}


const categories: Category[] = [{ id: '1', name: 'Todos' }, { id: '2', name: 'Eletrônicos' }, { id: '3', name: 'Roupas' },
  { id: '4', name: 'Livros' }, { id: '5', name: 'Esportes' }, { id: '6', name: 'Casa' }];

const products: Product[] = [
  { id: '1',  name: 'Fone de ouvido com fio',     price: 89.9,   rating: 4.3, categoryName: 'Eletrônicos', description: 'Fone intra-auricular com microfone e controle no cabo. Conector P2 compatível com celular e notebook.', image: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/537696/xlarge/Fones-De-Ouvido-Lenovo-Intra-auriculares-Gen-2-4xd1j77352_1784923152.png' },
  { id: '2',  name: 'Bola de futebol Copa 2026',            price: 129.9,  rating: 4.6, categoryName: 'Esportes',    description: 'Bola de futebol de campo com estampa da Copa do Mundo 2026. Boa para treinos e partidas com os amigos.', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS1Abvzc3YVpkMVrXU6esU6CTggtn92aWPOklEhPUO5AtUcxkYYjWRZKwOKc390WAEula8SBSJ9rNrPwr4N37CMXEZOJ9xR15dYuQq2pNvc_oGD0PZ0KBmexqnsTmtMDuTDEh1SXd8&usqp=CAc' },
  { id: '3',  name: 'Camiseta básica branca',     price: 49.9,   rating: 4.2, categoryName: 'Roupas',      description: 'Camiseta branca de gola redonda e corte reto. Peça coringa para combinar com qualquer look.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2Uga-X48_vDWRz29FQgXU7aXkK--WsqeKkqhViqntrRhkOyAKmCp4onL_HUCaEpcnw-fIJkIovFn2wU3AWiWvDoxb2uWGKAiQXesyNJm6ZY8eS6x6d6GdXkPxvgTOct0DjTeNnpQ&usqp=CAc' },
  { id: '4',  name: 'Luminária de mesa flexível',          price: 159.9,  rating: 4.5, categoryName: 'Casa',        description: 'Luminária com haste flexível para direcionar a luz. Ideal para mesa de estudo ou escritório.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSlC5NBnMxV390tcsh6f9Fr0z6WlUSaMKKzfxew7EN8vsOsfrgQyI9X7hG7ikr1LAsTiHAHCIppoT6ET_Ll8ssnPGQstNsg7NwOehwLSQz8g-rQdhSv_b8n55sswE7SJhJcJibM6g&usqp=CAc' },
  { id: '5',  name: 'Box clássicos da literatura', price: 119.9, rating: 4.8, categoryName: 'Livros',      description: 'Coleção especial de Sherlock Holmes com 6 volumes em box. Ótima para fãs de mistério e histórias de detetive.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRc4wSa0wt9J53Dfg-OHvVSha296rtGp8YWAnG_7rYlGUsLs7RZzOb_egRfy2B569T--y5UFP91sAY4N0w7B5DLRgcvEBh7KKcBgTSWmQoK_C1tBBBzd0w7rviKC0qYfPhH0wu6fRqpr4I&usqp=CAc' },
  { id: '6',  name: 'Notebook de 15,6 polegadas',             price: 3899.0, rating: 4.4, categoryName: 'Eletrônicos', description: 'Notebook com tela de 15,6 polegadas para estudo e trabalho. Prático para usar em casa ou levar na mochila.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBEMwprnINfwqk05UJJ5eVUBEpimhTUBnF3ZhcYdz0H30Pryu5U7F4ztIi0Kf7SM7rvo7S7eOlg41Oku-AIRAbTTX-3BO8qQtoXojTW_sQC_L1-QuWF7BmwQjKlxJhFRglHOfjug&usqp=CAc' },
  { id: '7',  name: 'Calça jeans masculina azul',                price: 179.9,  rating: 4.1, categoryName: 'Roupas',      description: 'Calça jeans azul de corte reto e lavagem clara. Confortável e resistente para o uso diário.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQzjmdDMMgGf4oLkaMZ0CbD5tArnQ7efDU0yeC331HhZ0yVgu4kbGE23jFoBK4Pt31InL7DqR1eOIoGLuvyV7kIyBamsASXOqKYFVUGV7gVnl1RyzpQJHWCMA' },
  { id: '8',  name: 'Kit de halteres sextavados',            price: 249.9,  rating: 4.7, categoryName: 'Esportes',    description: 'Kit de halteres sextavados para treino de força em casa. Pegada firme para vários tipos de exercício.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhP9S5mREIaSKR4tKsf4XitJE-vsaXVO8qL0JiDj_MkzI4Vo8LhcOG4myV0saCOGBlMaj1dgqB4SYRP_6Rj2vKDYcDC0AcL0QloKaYlYuJF3vsIB2T3Azk9w' },
  { id: '9',  name: 'Caneca branca de cerâmica',  price: 34.9,   rating: 4.0, categoryName: 'Casa',        description: 'Caneca de cerâmica branca para café, chá ou chocolate quente. Design simples que combina com qualquer cozinha.', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTPA3uOZKv1hXeEW6QnCZuSA7eWuNcyzdhphta6GX_SuAdcC8qWC4vTOxTcb0ZEh_381Ab3MyHj9ePb2u_n74UnrcO6ljHCIcGMtjDGWj88YTD4wWDVj5qlsQ' },
  { id: '10', name: 'Box coleção Harry Potter',          price: 189.9,  rating: 4.6, categoryName: 'Livros',      description: 'Box da saga Harry Potter, de J.K. Rowling. Perfeito para ler ou presentear quem é fã da série.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSAReEGguz5DOesIaeFHgCT68uX0ECUujc6wlviQvoiDkjOkQl9buv0SIF9zzC64-9ayins5PYoI76cQjlHbvmnIgiai4isJzLeQ1qGVxWTgWMlXKvRrCOTuQ' },
  { id: '11', name: 'Smartphone iPhone 16 preto',                  price: 1899.0, rating: 4.5, categoryName: 'Eletrônicos', description: 'Smartphone da Apple com câmera dupla e tela de alta resolução. Rápido para fotos, apps e jogos.', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQRz0YDcWQN70I1HOUkKS7xmwRMugLMI-9j-Q_zC0_Mk5nrHzkO20u6QdsmItBfjd4f3wF5bJF8Qi6EUxVSZEJlDpgOEWWccyPr9N5wWuY3YxdoRzSNFbpGFow' },
  { id: '12', name: 'Kit com 4 almofadas cinza',           price: 99.9,   rating: 4.2, categoryName: 'Casa',        description: 'Kit com 4 almofadas decorativas em tons de cinza. Deixam o sofá ou a cama mais aconchegantes.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgbKuzueRd_1x1rc7XomLwMrLIPp0xfZR9lHoxAmHTwqwZDC0uv0KdEJrTjIFOwvWlruKcLO_zfRKrtS_QiAD_vDkeO-MI6APBchCxl5m9IcjT6H2uKGEOsg' },
  { id: '13', name: 'Tênis casual vermelho',      price: 299.9,  rating: 4.4, categoryName: 'Roupas',      description: 'Tênis casual com solado e cadarços brancos. Confortável e fácil de combinar no dia a dia.', image: 'https://static.netshoes.com.br/produtos/tenis-baw-four/16/QNL-1077-016/QNL-1077-016_zoom1.jpg' },
  { id: '14', name: 'Raquete de padel preta e laranja',           price: 459.9,  rating: 4.3, categoryName: 'Esportes',    description: 'Raquete de padel com furos na face e alça de segurança no cabo. Boa para treinos e jogos com os amigos.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrL8q5WdPgN7t04ufe-47ULRe-6afXsCjEXoHQc1RvZe9qDYHCm5Tm0qb4AVr5T_0QTlq-x3JxAePuM9sIkCayDXSiXUpLOjLLDJnLT7oorBs9vl4RwGu8sQ' },
  { id: '15', name: 'Kit livros de romance Ali Hazelwood',      price: 89.9,   rating: 4.1, categoryName: 'Livros',      description: 'Kit com dois romances de Ali Hazelwood: A Razão do Amor e A Hipótese do Amor. Leitura leve e divertida.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRDcFXhOHt_OLXpxcDQePSWaaiwm4vKTXxm3e18UgjVxlQx5xvYF2RnhoKo0zsP2cYobrLuQS8owJ31NFtfN1TVKvFO5JzhERIQwZoOw8ASOsW9CAIfvoJ7Dg' },
  { id: '16', name: 'Vaso com planta decorativa',            price: 69.9,   rating: 4.7, categoryName: 'Casa',        description: 'Vaso branco com planta decorativa com frutinhas. Traz mais vida e cor para qualquer ambiente.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT_y2y8sFXXrMLJqMMbmHXXVSag0uZcDPtjdIGAFiUng3DUu5M5Mzq5EWEB_FHczVncLRbGGRx0DpWK5cA5T4KAJP7VGOf_7vTA6bxVmxJI7IlYWc-C1F9O' },
  { id: '17', name: 'Jaqueta de couro marrom clássica',           price: 549.9,  rating: 4.6, categoryName: 'Roupas',      description: 'Jaqueta de couro marrom com zíper frontal e estilo clássico. Esquenta nos dias frios e combina com jeans.', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTAaDn-MMYnGWS33L7h06W45PD4DCnaQfAeupp40p4hWDMyGS8a5h8ntUzDilnskTJ5iX365Um_0LZJ7GIzg9BrRFYJVUOcxsae70J7grsswVRcB1Qe5Gjr' },
  { id: '18', name: 'Monitor gamer LG UltraGear 24"',                price: 899.0,  rating: 4.4, categoryName: 'Eletrônicos', description: 'Monitor LG UltraGear de 24 polegadas com imagem nítida. Ótimo para trabalho, estudo e jogos.', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRykQtcL4dgUiY8Tl13fJ4H-3t3PR1p_Y4Y_5oeIutACCwD7Z6Sz1ekrFYgestWzu2eu4b58XNB8-TbSm0LQnc1bw-S4bJIp29hlekFbcjAHWUGa-FBQ6q9' },
  { id: '19', name: 'Bola de basquete Penalty',           price: 149.9,  rating: 4.5, categoryName: 'Esportes',    description: 'Bola de basquete Penalty com boa aderência na quadra. Ideal para treinos e jogos com os amigos.', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcStbQCNQmVCHsz3Y47Jcy1qdUmRDqH4bxBfr2rhqc_Xcd3U7UTWkcm9pOnqAcMGf1Q3LO_O9P3_YVIgUz0na6rHMvaV9JBt' },
  { id: '20', name: 'Kit leitura infantojuvenil', price: 74.9,   rating: 4.9, categoryName: 'Livros',      description: 'Box de livros infantojuvenis com o tema Leitura é o melhor presente. Incentiva o hábito da leitura.', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ_-DAZxEhrggMTCeYnfMWjGiRCucC0N40dWOF_-IfYX3RYkmkwSejrIcOlO3P6oVp2dTwag31SN-7E7b07kcZdJ5b2Pa-atB8dhx2C8ySjLUvKQdiWvRCYtEfM' },
];



export default function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const [busca, setBusca] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  
  const produtosFiltrados = products
    .filter((produto) => categoriaSelecionada === 'Todos' || produto.categoryName === categoriaSelecionada)
    .filter((produto) => produto.name.toLowerCase().includes(busca.toLowerCase()));

  return (
    <SafeAreaProvider>
     <ScreenContainer>
      <Header>
        <ScreenTitle>FakeStore</ScreenTitle>
        <SearchInput placeholder="Pesquisar..." value={busca} onChangeText={setBusca} />
      </Header>
      <CategoryList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryChip
            onPress={() => setCategoriaSelecionada(item.name)}
            style={{ backgroundColor: categoriaSelecionada === item.name ? '#000' : '#eee' }}
          >
            <CategoryTitle>
              <CategoryTitle style={{ color: categoriaSelecionada === item.name ? '#fff' : '#000' }}>
                {item.name}
              </CategoryTitle>
            </CategoryTitle>
          </CategoryChip>
        )}
        />
      
      <ProductGrid
        data={produtosFiltrados}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard>
            <ProductImage source={{ uri: item.image }} resizeMode="contain" />
            <ProductInfo>
              <ProductTitle>{item.name}</ProductTitle>
              <ProductPrice>R$ {item.price.toFixed(2).replace(".", ",")}</ProductPrice>
              <ProductRating>★ {item.rating}</ProductRating>
            </ProductInfo>
          </ProductCard>
        )}
      />
      <BottomBar>
        <BottomBarButton>
          <Ionicons name="home-outline" size={26} color="#000" />
        </BottomBarButton>
        <BottomBarButton>
          <Ionicons name="search-outline" size={26} color="#000" />
        </BottomBarButton>
        <BottomBarButton>
          <Ionicons name="cart-outline" size={26} color="#000" />
        </BottomBarButton>
        <BottomBarButton>
          <Ionicons name="person-outline" size={26} color="#000" />
        </BottomBarButton>
      </BottomBar>    
     </ScreenContainer>
    </SafeAreaProvider>
  );
}

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const Header = styled.View`

`;

const ScreenTitle = styled.Text`
  margin: 16px;
  color: #000;
  font-size: 24px;
  font-weight: bold;  
`;

const SearchInput = styled.TextInput`
  background-color: #ffffff;
  border-width: 1px;
  border-radius: 16px;
  border-color: #000000;
  padding: 8px;
  margin: 16px;
`;

const CategoryList = styled(FlatList<Category>)`
  flex-shrink: 0;
  margin: 16px;
  flex-grow: 0;
`;

const CategoryChip = styled.Pressable`
  padding: 6px 14px;
  margin-right: 8px;
  border-radius: 16px;
  background-color: #eee;
`;

const CategoryTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const ProductGrid = styled(FlatList<Product>)`
  flex-shrink: 1;
  margin: 16px;`;

const ProductCard = styled.Pressable`
  flex: 1;
  margin: 8px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2; 
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 8px;
`;

const ProductInfo = styled.View`
  padding: 8px;
`;

const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ProductPrice = styled.Text`
  color: #888;
  margin-top: 4px;
`;

const ProductRating = styled.Text`
  color: #f1c40f;
  margin-top: 4px;
`;  

const BottomBar = styled.View`
  height: 60px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

const BottomBarButton = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  
`;    

const BottomBarIcon = styled.Text`
  font-size: 24px;
`;


