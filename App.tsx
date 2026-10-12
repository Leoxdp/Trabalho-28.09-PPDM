import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from 'styled-components/native';
import { Text } from "react-native";
import { useState } from "react";

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
}


const categories: Category[] = [{ id: '1', name: 'Todos' }, { id: '2', name: 'Eletrônicos' }, { id: '3', name: 'Roupas' },
  { id: '4', name: 'Livros' }, { id: '5', name: 'Esportes' }, { id: '6', name: 'Casa' }];

const products: Product[] = [
  { id: '1',  name: 'Fone de ouvido com fio',     price: 89.9,   rating: 4.3, categoryName: 'Eletrônicos', image: 'https://images.pexels.com/photos/4195323/pexels-photo-4195323.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '2',  name: 'Bola de futebol',            price: 129.9,  rating: 4.6, categoryName: 'Esportes',    image: 'https://images.pexels.com/photos/8455350/pexels-photo-8455350.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '3',  name: 'Camiseta básica branca',     price: 49.9,   rating: 4.2, categoryName: 'Roupas',      image: 'https://images.pexels.com/photos/11671964/pexels-photo-11671964.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '4',  name: 'Luminária de mesa',          price: 159.9,  rating: 4.5, categoryName: 'Casa',        image: 'https://images.pexels.com/photos/6825324/pexels-photo-6825324.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '5',  name: 'Box clássicos da literatura', price: 119.9, rating: 4.8, categoryName: 'Livros',      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '6',  name: 'Notebook 15,6"',             price: 3899.0, rating: 4.4, categoryName: 'Eletrônicos', image: 'https://images.pexels.com/photos/16037283/pexels-photo-16037283.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '7',  name: 'Calça jeans',                price: 179.9,  rating: 4.1, categoryName: 'Roupas',      image: 'https://images.pexels.com/photos/2129970/pexels-photo-2129970.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '8',  name: 'Kit de halteres',            price: 249.9,  rating: 4.7, categoryName: 'Esportes',    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '9',  name: 'Caneca branca de cerâmica',  price: 34.9,   rating: 4.0, categoryName: 'Casa',        image: 'https://images.pexels.com/photos/2105285/pexels-photo-2105285.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '10', name: 'Coleção capa dura',          price: 189.9,  rating: 4.6, categoryName: 'Livros',      image: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '11', name: 'Smartphone 128GB',           price: 1899.0, rating: 4.5, categoryName: 'Eletrônicos', image: 'https://images.pexels.com/photos/7887812/pexels-photo-7887812.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '12', name: 'Kit de almofadas',           price: 99.9,   rating: 4.2, categoryName: 'Casa',        image: 'https://images.pexels.com/photos/9316208/pexels-photo-9316208.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '13', name: 'Tênis casual vermelho',      price: 299.9,  rating: 4.4, categoryName: 'Roupas',      image: 'https://images.pexels.com/photos/914929/pexels-photo-914929.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '14', name: 'Raquete de padel',           price: 459.9,  rating: 4.3, categoryName: 'Esportes',    image: 'https://images.pexels.com/photos/4536850/pexels-photo-4536850.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '15', name: 'Kit livros de romance',      price: 89.9,   rating: 4.1, categoryName: 'Livros',      image: 'https://images.pexels.com/photos/10556717/pexels-photo-10556717.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '16', name: 'Vaso com planta',            price: 69.9,   rating: 4.7, categoryName: 'Casa',        image: 'https://images.pexels.com/photos/8086275/pexels-photo-8086275.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '17', name: 'Jaqueta de couro',           price: 549.9,  rating: 4.6, categoryName: 'Roupas',      image: 'https://images.pexels.com/photos/12181646/pexels-photo-12181646.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '18', name: 'Monitor 24"',                price: 899.0,  rating: 4.4, categoryName: 'Eletrônicos', image: 'https://images.pexels.com/photos/6045231/pexels-photo-6045231.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '19', name: 'Bola de basquete',           price: 149.9,  rating: 4.5, categoryName: 'Esportes',    image: 'https://images.pexels.com/photos/16955708/pexels-photo-16955708.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '20', name: 'Kit leitura infantojuvenil', price: 74.9,   rating: 4.9, categoryName: 'Livros',      image: 'https://images.pexels.com/photos/7054519/pexels-photo-7054519.jpeg?auto=compress&cs=tinysrgb&w=300' },
];



export default function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  
  return (
    <SafeAreaProvider>
     <ScreenContainer>
      <Header>
        <ScreenTitle>FakeStore</ScreenTitle>
        <SearchInput placeholder="Pesquisar..." />
      </Header>
      <CategoryList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryChip
            onPress={() => setCategoriaSelecionada(item.name)}
          >
            <CategoryTitle>{item.name}</CategoryTitle>
          </CategoryChip>
        )}
        />
      
      <ProductGrid
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard>
            <ProductImage source={{ uri: item.image }} />
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
          <Text>Início</Text>
        </BottomBarButton>
        <BottomBarButton>
          <Text>Pesquisa</Text>
        </BottomBarButton>
        <BottomBarButton>
          <Text>Carrinho</Text>
        </BottomBarButton>
        <BottomBarButton>
          <Text>Perfil</Text>
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


